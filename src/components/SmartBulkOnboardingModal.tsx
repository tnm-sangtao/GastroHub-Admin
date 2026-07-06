import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Upload, Check, AlertCircle, Database, Columns, 
  FileText, ArrowRight, ArrowLeft, Users, CheckCircle2, Trash2
} from 'lucide-react';

interface SmartBulkOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any[];
  setStaff: (newStaff: any[]) => void;
}

// 1. Synonym Dictionary for Smart Auto-Mapping
const ALIAS_DICTIONARY: Record<string, string[]> = {
  name: ['name', 'fullname', 'full name', 'mitarbeiter-name', 'mitarbeiter name', 'họ tên', 'họ và tên', 'tên nhân viên', 'employee name', 'name des mitarbeiters', 'mã nhân viên', 'nhân viên'],
  email: ['email', 'email address', 'email-adresse', 'email adresse', 'thư điện tử', 'địa chỉ email', 'mail', 'emailadresse'],
  startDate: ['start date', 'startdate', 'eintrittsdatum', 'ngày vào làm', 'ngày bắt đầu', 'join date', 'hire date', 'eintritt'],
  salaryAmount: ['salaryamount', 'salary amount', 'salary', 'hourly rate', 'hourlyrate', 'stundenlohn', 'lương', 'lương giờ', 'wage', 'stundensatz'],
  taxClass: ['tax class', 'taxclass', 'steuerklasse', 'bậc thuế', 'lớp thuế', 'steuer-klasse'],
  personalTaxId: ['personal tax id', 'personaltaxid', 'steuer-id', 'steuer id', 'mã số thuế', 'tax id', 'personal tax number', 'steueridentifikationsnummer', 'mst'],
  dob: ['dob', 'date of birth', 'birthdate', 'birth date', 'geburtsdatum', 'ngày sinh', 'geburtstag'],
  workingDaysPerWeek: ['working days', 'working days per week', 'arbeitstage', 'số ngày làm việc', 'workingdaysperweek', 'days per week', 'arbeitstage pro woche'],
  role: ['role', 'job role', 'position', 'vai trò', 'chức vụ', 'phòng ban', 'department', 'abteilung'],
  phone: ['phone', 'phone number', 'telefon', 'số điện thoại', 'sđt', 'telephone', 'telefonnummer', 'mobil']
};

// 2. System Fields Definition
const SYSTEM_FIELDS = [
  { key: 'name', label: 'Full Name', required: true, description: 'Full name of the staff member' },
  { key: 'email', label: 'Email Address', required: true, description: 'Unique contact email address' },
  { key: 'startDate', label: 'Start Date', required: true, description: 'Format: YYYY-MM-DD' },
  { key: 'role', label: 'Job Role', required: false, description: 'Default: Service (Kitchen, Manager, etc.)' },
  { key: 'salaryAmount', label: 'Wage / Hourly Rate', required: false, description: 'Hourly salary amount (EUR). Default: 20' },
  { key: 'taxClass', label: 'Tax Class', required: false, description: 'From 1 to 6 under German tax law' },
  { key: 'personalTaxId', label: 'Personal Tax ID', required: false, description: 'Must contain exactly 11 digits' },
  { key: 'dob', label: 'Date of Birth', required: false, description: 'Must be 18+ years old (YYYY-MM-DD)' },
  { key: 'workingDaysPerWeek', label: 'Working Days/Week', required: false, description: 'Used to calculate statutory minimum annual leave' },
  { key: 'phone', label: 'Phone Number', required: false, description: 'Direct contact phone number' },
  { key: 'socialSecurityNumber', label: 'Social Security Number', required: false, description: 'German social security number (Sozialversicherungsnummer)' }
];

const SAMPLE_PASTE_DATA = `Employee Name\tEmail Address\tStart Date\tHourly Rate\tTax Class\tPersonal Tax ID\tDate of Birth\tWorking Days
John Smith\tjohn.smith@tenohub.com\t2026-07-01\t22.5\t3\t12345678901\t1994-05-12\t5
Jane Doe\tjane.doe@tenohub.com\t2026-06-15\t18.0\t1\t98765432101\t2002-11-20\t5
David Miller\tinvalid-email\t2026-08-01\t25.0\t7\t12345\t2012-01-01\t5
Anna Müller\tanna.m@gastro.de\t2026-05-01\t21.0\t4\t55544433322\t1998-03-15\t5`;

// Parse CSV lines handling quote encapsulation
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

// Parse TSV lines for direct paste from Excel
const parseTSVLine = (line: string): string[] => {
  return line.split('\t').map(v => v.trim().replace(/^"|"$/g, ''));
};

export const SmartBulkOnboardingModal: React.FC<SmartBulkOnboardingModalProps> = ({
  isOpen,
  onClose,
  staff,
  setStaff
}) => {
  const [importStep, setImportStep] = useState<1 | 2 | 3 | 4>(1);
  const [fileName, setFileName] = useState<string>('');
  const [fileHeaders, setFileHeaders] = useState<string[]>([]);
  const [rawFileData, setRawFileData] = useState<any[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [validatedStaffData, setValidatedStaffData] = useState<any[]>([]);
  const [pastedText, setPastedText] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Sync state if modal is closed and re-opened
  useEffect(() => {
    if (!isOpen) {
      setImportStep(1);
      setFileName('');
      setFileHeaders([]);
      setRawFileData([]);
      setColumnMapping({});
      setValidatedStaffData([]);
      setPastedText('');
      setDragActive(false);
    }
  }, [isOpen]);

  // Handle Drag Over
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Handle input file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Main file processor
  const processFile = (file: File) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      if (isExcel) {
        alert("To ensure accurate Excel data import without installing additional libraries, you can copy (Ctrl+C) the rows directly from Excel and paste (Ctrl+V) them into the paste area below!");
      }
      
      const delimiter = file.name.endsWith('.csv') ? ',' : '\t';
      parseDataText(text, file.name, delimiter);
    };
    reader.readAsText(file);
  };

  // Helper to parse CSV/TSV text
  const parseDataText = (text: string, title: string, delimiter: string = ',') => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      alert("The file is empty or invalid.");
      return;
    }

    const firstLine = lines[0];
    const isTSV = firstLine.includes('\t') || delimiter === '\t';
    const headers = isTSV ? parseTSVLine(firstLine) : parseCSVLine(firstLine);

    const rawRows: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const rowValues = isTSV ? parseTSVLine(lines[i]) : parseCSVLine(lines[i]);
      const rowObj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        rowObj[h] = rowValues[idx] || '';
      });
      rawRows.push(rowObj);
    }

    setFileName(title || 'Custom Clipboard Data');
    setFileHeaders(headers);
    setRawFileData(rawRows);

    // Auto-map columns intelligently
    const newMapping: Record<string, string> = {};
    SYSTEM_FIELDS.forEach(field => {
      const aliases = ALIAS_DICTIONARY[field.key] || [];
      const matchedHeader = headers.find(h => {
        const normalizedH = h.toLowerCase().replace(/[\s-_]/g, '');
        return aliases.some(alias => {
          const normalizedAlias = alias.toLowerCase().replace(/[\s-_]/g, '');
          return normalizedH === normalizedAlias;
        });
      });
      if (matchedHeader) {
        newMapping[field.key] = matchedHeader;
      } else {
        newMapping[field.key] = 'skip';
      }
    });

    setColumnMapping(newMapping);
    setImportStep(2); // Move to Column Mapping
  };

  // Handle copy paste data
  const handlePasteSubmit = () => {
    if (!pastedText.trim()) {
      alert("Please paste data from your Excel sheet or spreadsheet first!");
      return;
    }
    const hasTabs = pastedText.includes('\t');
    parseDataText(pastedText, 'Clipboard Paste Table', hasTabs ? '\t' : ',');
  };

  // Load sample data instantly for testing
  const loadSampleData = () => {
    setPastedText(SAMPLE_PASTE_DATA);
    parseDataText(SAMPLE_PASTE_DATA, 'Sample Onboarding Data (Tenohub)');
  };

  // Run rigorous validation matching system criteria
  const runValidationAndValidate = (mapping: Record<string, string>) => {
    const existingStaffEmails = staff.map(s => s.email);
    const validated = rawFileData.map((rawRow, idx) => {
      const item: Record<string, any> = {
        id: String(staff.length + 1 + idx),
        _index: idx,
        _errors: {} as Record<string, string>,
        _isValid: true
      };

      SYSTEM_FIELDS.forEach(field => {
        const mappedHeader = mapping[field.key];
        if (mappedHeader && mappedHeader !== 'skip') {
          item[field.key] = (rawRow[mappedHeader] || '').trim();
        } else {
          item[field.key] = '';
        }
      });

      // Defaults for optional fields
      if (!item.role) item.role = 'Service';
      if (!item.salaryAmount) item.salaryAmount = '20';
      if (!item.taxClass) item.taxClass = '1';
      if (!item.workingDaysPerWeek) item.workingDaysPerWeek = '5';
      if (!item.phone) item.phone = '090-5550-1234';

      // 1. Name validation
      if (!item.name) {
        item._errors.name = 'Full name cannot be empty';
      }

      // 2. Email validation
      if (!item.email) {
        item._errors.email = 'Email cannot be empty';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(item.email)) {
          item._errors.email = 'Invalid email format';
        } else {
          const isDupInSystem = existingStaffEmails.some(
            e => e.toLowerCase() === item.email.toLowerCase()
          );
          const isDupInFile = rawFileData.slice(0, idx).some(prevRaw => {
            const prevMapped = mapping.email;
            const prevEmail = prevMapped && prevMapped !== 'skip' ? (prevRaw[prevMapped] || '').trim() : '';
            return prevEmail.toLowerCase() === item.email.toLowerCase();
          });

          if (isDupInSystem) {
            item._errors.email = 'Email already exists in Tenohub';
          } else if (isDupInFile) {
            item._errors.email = 'Duplicate email found in file';
          }
        }
      }

      // 3. Start Date validation (YYYY-MM-DD)
      if (!item.startDate) {
        item._errors.startDate = 'Start date cannot be empty';
      } else {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(item.startDate)) {
          item._errors.startDate = 'Requires YYYY-MM-DD format';
        } else {
          const parsed = Date.parse(item.startDate);
          if (isNaN(parsed)) {
            item._errors.startDate = 'Invalid calendar date';
          }
        }
      }

      // 4. Tax class validation (1-6)
      if (item.taxClass) {
        const taxNum = Number(item.taxClass);
        if (isNaN(taxNum) || taxNum < 1 || taxNum > 6) {
          item._errors.taxClass = 'Tax class must be between 1 and 6';
        }
      }

      // 5. Personal Tax ID check (11 digits)
      if (item.personalTaxId) {
        const taxIdClean = item.personalTaxId.replace(/\D/g, '');
        if (taxIdClean.length !== 11) {
          item._errors.personalTaxId = 'German Tax ID must be exactly 11 digits';
        }
      }

      // 6. Age 18+ check
      if (item.dob) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(item.dob)) {
          item._errors.dob = 'Requires YYYY-MM-DD format';
        } else {
          const parts = item.dob.split('-');
          const y = Number(parts[0]);
          const m = Number(parts[1]);
          const d = Number(parts[2]);
          if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            const today = new Date();
            let age = today.getFullYear() - y;
            const monthDiff = (today.getMonth() + 1) - m;
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d)) {
              age--;
            }
            if (age < 18) {
              item._errors.dob = 'Employee must be at least 18 years old';
            }
          } else {
            item._errors.dob = 'Invalid date of birth';
          }
        }
      }

      // 7. Salary check
      if (item.salaryAmount) {
        const rate = Number(item.salaryAmount);
        if (isNaN(rate) || rate <= 0) {
          item._errors.salaryAmount = 'Wage must be greater than 0';
        }
      }

      // 8. Working Days check
      if (item.workingDaysPerWeek) {
        const wDays = Number(item.workingDaysPerWeek);
        if (isNaN(wDays) || wDays < 1 || wDays > 6) {
          item._errors.workingDaysPerWeek = 'Working days must be between 1 and 6';
        }
      }

      item._isValid = Object.keys(item._errors).length === 0;
      return item;
    });

    setValidatedStaffData(validated);
    setImportStep(3); // Go to Preview & Edit
  };

  // Handle cell text changes in step 3
  const handleCellChange = (index: number, key: string, val: string) => {
    const updated = [...validatedStaffData];
    updated[index][key] = val;

    // Immediately re-validate this specific item
    const existingStaffEmails = staff.map(s => s.email);
    const item = updated[index];
    item._errors = {};

    // 1. Name validation
    if (!item.name) {
      item._errors.name = 'Full name cannot be empty';
    }

    // 2. Email validation
    if (!item.email) {
      item._errors.email = 'Email cannot be empty';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(item.email)) {
        item._errors.email = 'Invalid email format';
      } else {
        const isDupInSystem = existingStaffEmails.some(
          e => e.toLowerCase() === item.email.toLowerCase()
        );
        const isDupInFile = updated.some((prevItem, prevIdx) => {
          return prevIdx < index && prevItem.email.toLowerCase() === item.email.toLowerCase();
        });

        if (isDupInSystem) {
          item._errors.email = 'Email already exists in Tenohub';
        } else if (isDupInFile) {
          item._errors.email = 'Duplicate email found in file';
        }
      }
    }

    // 3. Start Date validation (YYYY-MM-DD)
    if (!item.startDate) {
      item._errors.startDate = 'Start date cannot be empty';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(item.startDate)) {
        item._errors.startDate = 'Requires YYYY-MM-DD format';
      } else {
        const parsed = Date.parse(item.startDate);
        if (isNaN(parsed)) {
          item._errors.startDate = 'Invalid calendar date';
        }
      }
    }

    // 4. Tax class validation (1-6)
    if (item.taxClass) {
      const taxNum = Number(item.taxClass);
      if (isNaN(taxNum) || taxNum < 1 || taxNum > 6) {
        item._errors.taxClass = 'Tax class must be between 1 and 6';
      }
    }

    // 5. Personal Tax ID check (11 digits)
    if (item.personalTaxId) {
      const taxIdClean = item.personalTaxId.replace(/\D/g, '');
      if (taxIdClean.length !== 11) {
        item._errors.personalTaxId = 'German Tax ID must be exactly 11 digits';
      }
    }

    // 6. Age 18+ check
    if (item.dob) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(item.dob)) {
        item._errors.dob = 'Requires YYYY-MM-DD format';
      } else {
        const parts = item.dob.split('-');
        const y = Number(parts[0]);
        const m = Number(parts[1]);
        const d = Number(parts[2]);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
          const today = new Date();
          let age = today.getFullYear() - y;
          const monthDiff = (today.getMonth() + 1) - m;
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d)) {
            age--;
          }
          if (age < 18) {
            item._errors.dob = 'Employee must be at least 18 years old';
          }
        } else {
          item._errors.dob = 'Invalid date of birth';
        }
      }
    }

    // 7. Salary check
    if (item.salaryAmount) {
      const rate = Number(item.salaryAmount);
      if (isNaN(rate) || rate <= 0) {
        item._errors.salaryAmount = 'Wage must be greater than 0';
      }
    }

    // 8. Working Days check
    if (item.workingDaysPerWeek) {
      const wDays = Number(item.workingDaysPerWeek);
      if (isNaN(wDays) || wDays < 1 || wDays > 6) {
        item._errors.workingDaysPerWeek = 'Working days must be between 1 and 6';
      }
    }

    item._isValid = Object.keys(item._errors).length === 0;
    setValidatedStaffData(updated);
  };

  // Remove row from import preview
  const handleRemoveRow = (index: number) => {
    const updated = validatedStaffData.filter((_, idx) => idx !== index);
    setValidatedStaffData(updated);
  };

  // Confirm and Save parsed records into App's DB state
  const handleCommitImport = (onlyValid: boolean = false) => {
    const toImport = validatedStaffData.filter(item => !onlyValid || item._isValid);
    if (toImport.length === 0) {
      alert("No valid profiles to import.");
      return;
    }

    const newStaffEntries = toImport.map((item, idx) => {
      const workingDays = Number(item.workingDaysPerWeek) || 5;
      const annualLeave = workingDays * 4; // Statutory standard German rule
      return {
        id: String(staff.length + 1 + idx),
        name: item.name,
        role: item.role || 'Service',
        status: 'Full-time',
        email: item.email,
        phone: item.phone || '090-5550-1234',
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80`,
        hourlyRate: Number(item.salaryAmount) || 20,
        availableHours: 'Flexible check-in',
        isActive: true,
        department: item.role || 'Service',
        branch: 'HCM 1',
        dob: item.dob || '1995-01-01',
        gender: 'Male',
        address: 'District 1, HCMC',
        startDate: item.startDate || new Date().toISOString().split('T')[0],
        employmentType: 'Full-time',
        systemAccessLevel: 'Employee',
        systemPermissions: [],
        assignedStores: ['HCM 1'],
        salaryType: 'Hourly',
        salaryAmount: Number(item.salaryAmount) || 20,
        currency: 'EUR',
        payFrequency: 'Monthly',
        effectiveDate: item.startDate || new Date().toISOString().split('T')[0],
        compensationNotes: 'Imported via Smart Bulk Onboarding',
        includeInPayroll: true,
        nationality: 'German',
        contractHours: 40,
        grossAgreement: 2500,
        annualLeaveEntitlement: annualLeave,
        sundayOffCountOfYear: 0,
        taxClass: item.taxClass || '1',
        socialSecurityNumber: item.socialSecurityNumber || '12345678901',
        personalTaxId: item.personalTaxId || '12345678901',
        healthInsuranceProvider: 'AOK',
        insuranceSepa: 'DE89370400440532013000',
        idWithResidencePermit: false,
        workingDaysPerWeek: workingDays,
        probationPeriodMonths: 6,
        probationEndDate: '',
        fwhaBalance: 0.0
      };
    });

    setStaff([...staff, ...newStaffEntries]);
    setImportStep(4); // Success step
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-[1200px] max-h-[90vh] flex flex-col relative text-left font-sans overflow-hidden"
      >
        {/* Header bar */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F0ECFF] text-[#7553FF] rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1C1814] tracking-tight leading-none">
                Smart Bulk Onboarding
              </h3>
              <p className="text-sm text-slate-700 mt-1.5 font-sans font-normal">
                Bulk onboard staff profiles automatically using intelligent matching and smart filters
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-700 hover:text-[#1C1814] rounded-lg transition-all cursor-pointer border-none bg-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper progress indicator */}
        <div className="px-8 py-3.5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-6 shrink-0 select-none overflow-x-auto">
          {[
            { step: 1, label: 'Upload File / Paste Data', icon: Upload },
            { step: 2, label: 'Smart Column Mapping', icon: Columns },
            { step: 3, label: 'Validate & Preview', icon: FileText },
            { step: 4, label: 'Complete Onboarding', icon: CheckCircle2 }
          ].map((s) => {
            const Icon = s.icon;
            const isActive = importStep === s.step;
            const isCompleted = importStep > s.step;
            return (
              <div key={s.step} className="flex items-center gap-2 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
                  isActive 
                    ? 'bg-[#7553FF] border-[#7553FF] text-white shadow-xs' 
                    : isCompleted 
                    ? 'bg-[#15803D]/10 border-[#15803D]/20 text-[#15803D]' 
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : s.step}
                </div>
                <span className={`text-[14px] font-medium ${
                  isActive ? 'text-[#7553FF] font-bold' : isCompleted ? 'text-[#15803D]' : 'text-slate-700'
                }`}>
                  {s.label}
                </span>
                {s.step < 4 && <ArrowRight className="w-3.5 h-3.5 text-slate-700" />}
              </div>
            );
          })}
        </div>

        {/* Dynamic step body contents */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#FAFAFA]">
          {importStep === 1 && (
            <div className="space-y-6">
              {/* Drag & drop file selector */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload-input')?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-[#7553FF] bg-[#F0ECFF]/20' 
                    : 'border-slate-200 bg-white hover:border-[#7553FF]/60 hover:bg-[#FAFAFA]'
                }`}
              >
                <input 
                  type="file" 
                  id="file-upload-input" 
                  className="hidden" 
                  accept=".csv,.tsv" 
                  onChange={handleFileChange}
                />
                <div className="w-12 h-12 bg-[#F0ECFF] text-[#7553FF] rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-[14px] font-bold text-[#1C1814] font-sans">
                  Drag and drop Excel spreadsheet (.xlsx, .xls) or CSV (.csv) here
                </p>
                <p className="text-[13px] text-slate-700 mt-1 font-normal font-sans">
                  Or click this area to browse files on your computer
                </p>
                <div className="mt-4 flex items-center gap-2 bg-[#FAF9F7] px-3 py-1.5 rounded-lg border border-[#EAE4DC] text-slate-700 text-xs font-mono">
                  <span>Flexible columns supported, auto-mapping based on alias dictionary</span>
                </div>
              </div>

              {/* Paste and sample loading panel */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-3xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-bold text-[#1C1814]">
                    Paste directly from Excel / Google Sheets
                  </h4>
                  <button 
                    onClick={loadSampleData}
                    className="text-xs text-[#7553FF] hover:text-[#623EE2] font-semibold bg-[#F0ECFF] px-3 py-1.5 rounded-lg border-none cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Load Sample Test Data
                  </button>
                </div>
                <textarea 
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="How to use: Copy (Ctrl+C) desired cells from your Excel or Sheets, then paste (Ctrl+V) into this box..."
                  rows={6}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#7553FF] focus:bg-white text-[14px] text-slate-800 placeholder-slate-700 font-mono resize-none transition-all"
                />
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={handlePasteSubmit}
                    disabled={!pastedText.trim()}
                    className={`px-5 py-2.5 rounded-lg font-bold text-[14px] flex items-center gap-2 border-none transition-all cursor-pointer ${
                      pastedText.trim() 
                        ? 'bg-[#7553FF] hover:bg-[#623EE2] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Analyze Pasted Table
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {importStep === 2 && (
            <div className="space-y-6">
              {/* Top info alert */}
              <div className="p-4 bg-[#F0ECFF] border border-[#7553FF]/20 rounded-xl flex items-start gap-3">
                <Check className="w-5 h-5 text-[#7553FF] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[14px] font-bold text-[#7553FF]">
                    Auto-recognition Successful!
                  </p>
                  <p className="text-[14px] text-slate-700 font-sans font-normal leading-normal">
                    Successfully read {fileHeaders.length} column headers from <strong>{fileName}</strong>. The system has auto-mapped matching columns. Please review and adjust mappings below before proceeding.
                  </p>
                </div>
              </div>

              {/* Column Mapping Form UI */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#FAF9F7] border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-5 text-[14px] font-medium font-serif text-slate-800  tracking-widest w-1/3">
                        System Field (Tenohub)
                      </th>
                      <th className="py-3 px-5 text-[14px] font-medium font-serif text-slate-800  tracking-widest w-1/3">
                        Mapped Column from File
                      </th>
                      <th className="py-3 px-5 text-[14px] font-medium font-serif text-slate-800  tracking-widest w-1/3">
                        Sample Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {SYSTEM_FIELDS.map((field) => {
                      const currentMappedHeader = columnMapping[field.key] || 'skip';
                      // Get a non-empty preview value from the raw data
                      const sampleRow = rawFileData.find(row => row[currentMappedHeader]);
                      const sampleValue = sampleRow && currentMappedHeader !== 'skip' ? sampleRow[currentMappedHeader] : '';

                      return (
                        <tr key={field.key} className="hover:bg-slate-50/20 transition-all">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[14px] font-semibold text-slate-800">
                                {field.label}
                              </span>
                              {field.required && (
                                <span className="text-rose-600 font-bold">*</span>
                              )}
                            </div>
                            <span className="text-xs text-slate-700 block mt-0.5 font-normal">
                              {field.description}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <select 
                              value={currentMappedHeader}
                              onChange={(e) => {
                                setColumnMapping({
                                  ...columnMapping,
                                  [field.key]: e.target.value
                                });
                              }}
                              className="w-full max-w-xs h-10 px-3 bg-white border border-slate-200 rounded-lg text-[14px] text-slate-800 focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/20 font-sans"
                            >
                              <option value="skip" className="text-slate-700">
                                {field.required ? '-- Select Required Column --' : '🚫 Skip Field'}
                              </option>
                              {fileHeaders.map(h => (
                                <option key={h} value={h}>{h}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3.5 px-5 text-[14px] text-slate-700 font-mono font-normal">
                            {currentMappedHeader !== 'skip' && sampleValue ? (
                              <span className="bg-[#FAF9F7] px-2.5 py-1 rounded-md border border-slate-150 text-slate-700">
                                {sampleValue}
                              </span>
                            ) : (
                              <span className="text-slate-700 italic">Empty</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Navigation Action Footer */}
              <div className="flex items-center justify-between py-4 sticky -bottom-6 bg-[#FAFAFA] border-t border-slate-200 z-10 -mx-6 -mb-6 px-6">
                <button 
                  onClick={() => setImportStep(1)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[14px] rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Step 1
                </button>

                <button 
                  onClick={() => {
                    // Double check required fields mapping
                    const missing = SYSTEM_FIELDS.filter(f => f.required && (!columnMapping[f.key] || columnMapping[f.key] === 'skip'));
                    if (missing.length > 0) {
                      alert(`Please map all required columns: ${missing.map(m => m.label).join(', ')}`);
                      return;
                    }
                    runValidationAndValidate(columnMapping);
                  }}
                  className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-lg transition-all flex items-center gap-2 border-none cursor-pointer shadow-xs"
                >
                  Proceed to Validation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {importStep === 3 && (
            <div className="space-y-6">
              {/* Validation Summary Cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white border border-slate-150 rounded-xl p-4 text-left shadow-3xs leading-none">
                  <span className="text-slate-700 text-[13px] block font-medium mb-1.5">Total Records Loaded</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-slate-800">{validatedStaffData.length}</span>
                    <span className="text-sm text-slate-700">staff</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-150 rounded-xl p-4 text-left shadow-3xs leading-none">
                  <span className="text-emerald-700 text-[13px] block font-medium mb-1.5">Valid (Ready)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-emerald-700">
                      {validatedStaffData.filter(i => i._isValid).length}
                    </span>
                    <span className="text-sm text-slate-700">staff</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-150 rounded-xl p-4 text-left shadow-3xs leading-none">
                  <span className="text-rose-700 text-[13px] block font-medium mb-1.5">Issues Detected</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-rose-700">
                      {validatedStaffData.filter(i => !i._isValid).length}
                    </span>
                    <span className="text-sm text-slate-700">require edits</span>
                  </div>
                </div>
              </div>

              {/* Data Preview Editable Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs">
                <div className="p-4 bg-[#FAF9F7] border-b border-slate-150 flex items-center justify-between shrink-0">
                  <span className="text-[14px] font-bold text-[#1c1814] block">
                    Data Reconciliation Table (Edit directly in the grid)
                  </span>
                  <span className="text-xs text-[#1C1814]/70">
                    * Click any cell directly to edit values and fix issues highlighted in red
                  </span>
                </div>
                
                <div className="overflow-x-auto max-h-[400px]">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead className="bg-[#FAF9F7] border-b border-slate-100 sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[80px]">
                          No.
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[120px]">
                          Status
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest">
                          Full Name *
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest">
                          Email Address *
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[140px]">
                          Start Date *
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[110px]">
                          Wage/Hour
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[100px]">
                          Tax Class
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[140px]">
                          Tax ID
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[130px]">
                          Date of Birth
                        </th>
                        <th className="py-3 px-4 text-[14px] font-serif font-medium text-slate-800  tracking-widest w-[80px]">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {validatedStaffData.map((item, index) => {
                        return (
                          <tr 
                            key={index} 
                            className={`transition-all ${
                              item._isValid 
                                ? 'bg-emerald-50/10 hover:bg-emerald-50/20' 
                                : 'bg-rose-50/10 hover:bg-rose-50/20'
                            }`}
                          >
                            <td className="py-2 px-4 text-[14px] font-bold text-slate-700">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4">
                              {item._isValid ? (
                                <span className="inline-flex px-2 py-0.5 rounded-[2px] text-xs font-normal bg-emerald-50 text-emerald-700 border border-emerald-100 select-none">
                                  VALID
                                </span>
                              ) : (
                                <span className="inline-flex px-2 py-0.5 rounded-[2px] text-xs font-normal bg-rose-50 text-rose-700 border border-rose-100 select-none">
                                  ERROR
                                </span>
                              )}
                            </td>
                            {/* Full Name cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-sans ${
                                    item._errors.name ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.name && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.name}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Email address cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.email}
                                  onChange={(e) => handleCellChange(index, 'email', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-sans ${
                                    item._errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.email && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.email}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Start date cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.startDate}
                                  onChange={(e) => handleCellChange(index, 'startDate', e.target.value)}
                                  placeholder="YYYY-MM-DD"
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-mono ${
                                    item._errors.startDate ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.startDate && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.startDate}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Wage cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.salaryAmount}
                                  onChange={(e) => handleCellChange(index, 'salaryAmount', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-mono ${
                                    item._errors.salaryAmount ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.salaryAmount && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.salaryAmount}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Tax class cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.taxClass}
                                  onChange={(e) => handleCellChange(index, 'taxClass', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-mono ${
                                    item._errors.taxClass ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.taxClass && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.taxClass}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Personal Tax ID cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.personalTaxId}
                                  onChange={(e) => handleCellChange(index, 'personalTaxId', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-mono ${
                                    item._errors.personalTaxId ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.personalTaxId && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.personalTaxId}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Date of Birth cell */}
                            <td className="py-1.5 px-3">
                              <div className="relative">
                                <input 
                                  type="text"
                                  value={item.dob}
                                  placeholder="YYYY-MM-DD"
                                  onChange={(e) => handleCellChange(index, 'dob', e.target.value)}
                                  className={`w-full px-2 py-1.5 bg-white border rounded-md text-[14px] focus:outline-none focus:border-[#7553FF] font-mono ${
                                    item._errors.dob ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                                  }`}
                                />
                                {item._errors.dob && (
                                  <div className="text-[11px] text-rose-700 font-medium mt-0.5 font-sans">
                                    {item._errors.dob}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Delete button */}
                            <td className="py-2 px-4 text-center">
                              <button 
                                onClick={() => handleRemoveRow(index)}
                                className="p-1.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 border-none bg-transparent rounded-lg cursor-pointer transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step 3 Navigation actions */}
              <div className="flex items-center justify-between py-4 sticky -bottom-6 bg-[#FAFAFA] border-t border-slate-200 z-10 -mx-6 -mb-6 px-6">
                <button 
                  onClick={() => setImportStep(2)}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[14px] rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Column Mapping
                </button>

                <div className="flex items-center gap-3">
                  {validatedStaffData.some(i => !i._isValid) && (
                    <button 
                      onClick={() => handleCommitImport(true)}
                      className="px-4 py-2.5 bg-white hover:bg-[#15803D]/5 border border-[#15803D]/30 text-[#15803D] font-bold text-[14px] rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Skip Invalid & Import Valid Rows
                    </button>
                  )}

                  <button 
                    onClick={() => handleCommitImport(false)}
                    disabled={validatedStaffData.some(i => !i._isValid)}
                    className={`px-6 py-2.5 rounded-lg font-bold text-[14px] flex items-center gap-2 border-none transition-all cursor-pointer ${
                      validatedStaffData.some(i => !i._isValid)
                        ? 'bg-slate-100 text-slate-700 cursor-not-allowed'
                        : 'bg-[#7553FF] hover:bg-[#623EE2] text-white shadow-xs'
                    }`}
                  >
                    Confirm Import List
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {importStep === 4 && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100 shadow-md"
              >
                <Check className="w-8 h-8" />
              </motion.div>
              <div className="space-y-2 max-w-md">
                <h4 className="text-xl font-bold text-[#1C1814] tracking-tight">
                  Onboarding Completed Successfully!
                </h4>
                <p className="text-[14px] text-slate-700 leading-relaxed font-sans font-normal">
                  Data has been successfully standardized and saved to the Tenohub management system. All new staff profiles have been created and set to active working status.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-lg border-none shadow-xs transition-all cursor-pointer"
                >
                  Close Onboarding Window
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
