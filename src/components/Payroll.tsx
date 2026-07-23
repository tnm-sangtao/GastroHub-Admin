import { useState, useEffect } from 'react';
import {
  FileDown,
  Calendar,
  ShieldAlert,
  CheckCircle,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  SlidersHorizontal,
  Users,
  Clock,
  TrendingUp,
  FileText,
  HelpCircle,
  AlertTriangle,
  Lock,
  Unlock,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  Plus,
  Coins,
  ShieldCheck,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
export interface PayrollEmployee {
  id: string;
  name: string;
  role: string;
  department: string; // 'Service' | 'Kitchen' | 'Bar' | 'Office'
  branch: string; // 'HCM 1' | 'HCM 2' | 'HN 1' | 'HQ'
  avatar?: string;
  contractType: 'Hourly' | 'Monthly' | 'Minijob';
  baseRate: number; // base hourly rate or hourly equivalent
  monthlyContractSalary?: number; // fixed monthly salary
  actualHours: number; // actual hours worked in current period
  standardHours: number; // contractual hours
  fwhaBalance: number; // FWHA balance in hours
  unpaidLeaves: number; // days of unpaid leaves
  sickLeavesWithCert: number; // sick leaves with certificate
  taxClass: string;
  healthProvider: string;
  socialSecurityNo: string;
  taxId: string;
  dependentAllowance: number;
  eveningHours: number;
  nightHours: number;
  sundayHours: number;
  holidayHours: number;
  tips: number;
  tipsLocked: boolean;
  foodDeduction: number;
  adjustment: number;
  adjustmentNote: string;
  taxesAndInsuranceRate: number;
}

interface PayrollProps {
  staff?: any[];
  setStaff?: (staff: any[]) => void;
  simulatedUser?: any;
}

// --- Pre-seeded Example Data from PRD-005 ---
const defaultPayrollEmployees: PayrollEmployee[] = [
  {
    id: 'staff-10',
    name: 'Hoang Phat Nguyen',
    role: 'Service',
    department: 'Service',
    branch: 'HCM 1',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
    contractType: 'Hourly',
    baseRate: 22.27,
    actualHours: 168.0,
    standardHours: 168.0,
    fwhaBalance: 0.0,
    unpaidLeaves: 0,
    sickLeavesWithCert: 0,
    taxClass: 'Class 1',
    healthProvider: 'Techniker Krankenkasse (TK)',
    socialSecurityNo: '12 150895 N 042',
    taxId: '92 847 150 293',
    dependentAllowance: 0.0,
    eveningHours: 18.0,
    nightHours: 4.0,
    sundayHours: 16.0,
    holidayHours: 8.0,
    tips: 580.14,
    tipsLocked: true, // Preset to match PRD exact table
    foodDeduction: 123.39,
    adjustment: 0.0,
    adjustmentNote: '',
    taxesAndInsuranceRate: 0.259, // ~25.9% estimated tax + insurance
  },
  {
    id: 'staff-9',
    name: 'Xuan Binh Tran',
    role: 'Chef',
    department: 'Kitchen',
    branch: 'HCM 1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    contractType: 'Monthly',
    baseRate: 15.00,
    monthlyContractSalary: 2152.00,
    actualHours: 180.0,
    standardHours: 160.0,
    fwhaBalance: 10.0, // Existing old balance
    unpaidLeaves: 0,
    sickLeavesWithCert: 0,
    taxClass: 'Class 3',
    healthProvider: 'AOK Bayern',
    socialSecurityNo: '15 240590 T 102',
    taxId: '45 291 302 918',
    dependentAllowance: 1.0,
    eveningHours: 10.0,
    nightHours: 8.0,
    sundayHours: 12.0,
    holidayHours: 0.0,
    tips: 340.0,
    tipsLocked: true,
    foodDeduction: 100.00,
    adjustment: 0.0,
    adjustmentNote: '',
    taxesAndInsuranceRate: 0.20,
  },
  {
    id: 'staff-12',
    name: 'Mai Anh Tran Thi',
    role: 'Office',
    department: 'Office',
    branch: 'HCM 1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    contractType: 'Minijob',
    baseRate: 15.00,
    actualHours: 48.0,
    standardHours: 40.20,
    fwhaBalance: 0.0,
    unpaidLeaves: 0,
    sickLeavesWithCert: 0,
    taxClass: 'Minijob',
    healthProvider: 'Knappschaft-Bahn-See',
    socialSecurityNo: '22 181102 M 203',
    taxId: '81 304 291 039',
    dependentAllowance: 0.0,
    eveningHours: 0.0,
    nightHours: 0.0,
    sundayHours: 0.0,
    holidayHours: 0.0,
    tips: 80.0,
    tipsLocked: true,
    foodDeduction: 0.0,
    adjustment: 0.0,
    adjustmentNote: '',
    taxesAndInsuranceRate: 0.0,
  },
  {
    id: 'staff-1',
    name: 'Nguyen An',
    role: 'Operation',
    department: 'Service',
    branch: 'HCM 1',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    contractType: 'Hourly',
    baseRate: 35.00,
    actualHours: 140.0,
    standardHours: 160.0,
    fwhaBalance: 5.0,
    unpaidLeaves: 1,
    sickLeavesWithCert: 2,
    taxClass: 'Class 1',
    healthProvider: 'Techniker Krankenkasse (TK)',
    socialSecurityNo: '11 120395 A 031',
    taxId: '12 345 678 901',
    dependentAllowance: 0.0,
    eveningHours: 8.0,
    nightHours: 0.0,
    sundayHours: 4.0,
    holidayHours: 0.0,
    tips: 150.0,
    tipsLocked: false,
    foodDeduction: 80.0,
    adjustment: 0.0,
    adjustmentNote: '',
    taxesAndInsuranceRate: 0.25,
  },
  {
    id: 'staff-3',
    name: 'Le Chi',
    role: 'Sales',
    department: 'Service',
    branch: 'HN 1',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    contractType: 'Hourly',
    baseRate: 25.00,
    actualHours: 150.0,
    standardHours: 160.0,
    fwhaBalance: 0.0,
    unpaidLeaves: 0,
    sickLeavesWithCert: 0,
    taxClass: 'Class 2',
    healthProvider: 'Barmer',
    socialSecurityNo: '14 021198 C 045',
    taxId: '98 765 432 109',
    dependentAllowance: 1.0,
    eveningHours: 15.0,
    nightHours: 4.0,
    sundayHours: 8.0,
    holidayHours: 0.0,
    tips: 210.0,
    tipsLocked: false,
    foodDeduction: 60.0,
    adjustment: 0.0,
    adjustmentNote: '',
    taxesAndInsuranceRate: 0.22,
  },
  {
    id: 'staff-6',
    name: 'Vu Giang',
    role: 'Bar',
    department: 'Bar',
    branch: 'HCM 2',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    contractType: 'Hourly',
    baseRate: 16.00,
    actualHours: 120.0,
    standardHours: 120.0,
    fwhaBalance: -4.0,
    unpaidLeaves: 0,
    sickLeavesWithCert: 0,
    taxClass: 'Class 1',
    healthProvider: 'AOK Hessen',
    socialSecurityNo: '23 051202 G 115',
    taxId: '54 203 104 928',
    dependentAllowance: 0.0,
    eveningHours: 14.0,
    nightHours: 12.0,
    sundayHours: 0.0,
    holidayHours: 4.0,
    tips: 110.0,
    tipsLocked: false,
    foodDeduction: 40.0,
    adjustment: 20.0,
    adjustmentNote: 'Travel expense support',
    taxesAndInsuranceRate: 0.15,
  }
];

export default function Payroll({ staff = [], setStaff, simulatedUser }: PayrollProps) {
  // Config parameters from localStorage
  const [lowIncomeThreshold] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_low_income_threshold') || '603.00');
  });
  const [eveningShiftPremiumEnabled] = useState<boolean>(() => {
    return localStorage.getItem('gastro_evening_shift_premium_enabled') !== 'false';
  });
  const [eveningShiftPremiumRate] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_evening_shift_premium_rate') || '10') / 100;
  });
  const [nightShiftPremiumRate] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_night_shift_premium_rate') || '25') / 100;
  });
  const [sundayPremiumRate] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_sunday_premium_rate') || '50') / 100;
  });
  const [holidayPremiumRate] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_holiday_premium_rate') || '125') / 100;
  });

  const [tipWeightKitchen] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_weight_kitchen') || '0.8');
  });
  const [tipWeightService] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_weight_service') || '1.0');
  });
  const [tipWeightBar] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_weight_bar') || '0.9');
  });
  const [tipDistributionMethod] = useState<'Weight-based' | 'Percentage-based'>(() => {
    return (localStorage.getItem('gastro_tip_distribution_method') as 'Weight-based' | 'Percentage-based') || 'Weight-based';
  });
  const [tipPctKitchen] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_pct_kitchen') || '30');
  });
  const [tipPctService] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_pct_service') || '50');
  });
  const [tipPctBar] = useState<number>(() => {
    return parseFloat(localStorage.getItem('gastro_tip_pct_bar') || '20');
  });

  // Wage accounting codes
  const [codeBaseSalary] = useState<string>(() => {
    return localStorage.getItem('gastro_code_base_salary') || '1000';
  });
  const [codeEveningPremium] = useState<string>(() => {
    return localStorage.getItem('gastro_code_evening_premium') || '2400';
  });
  const [codeNightPremium] = useState<string>(() => {
    return localStorage.getItem('gastro_code_night_premium') || '2500';
  });
  const [codeSundayPremium] = useState<string>(() => {
    return localStorage.getItem('gastro_code_sunday_premium') || '2600';
  });
  const [codeHolidayPremium] = useState<string>(() => {
    return localStorage.getItem('gastro_code_holiday_premium') || '2700';
  });
  const [codeTipsDistribution] = useState<string>(() => {
    return localStorage.getItem('gastro_code_tips_distribution') || '5000';
  });
  const [codeOvertimePayout] = useState<string>(() => {
    return localStorage.getItem('gastro_code_overtime_payout') || '2800';
  });

  const maxFwhaHours = 40.0;
  const minFwhaHours = -20.0;

  // State Management
  const [employees, setEmployees] = useState<PayrollEmployee[]>(() => {
    const cached = localStorage.getItem('gastro_payroll_employees_v2');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { /* ignore */ }
    }
    return defaultPayrollEmployees;
  });

  const [ledger, setLedger] = useState<'internal' | 'tax'>('internal');
  const [payrollState, setPayrollState] = useState<'Draft' | 'TaxVersionCreated' | 'TaxVersionAdjusted' | 'Approved' | 'Paid'>(() => {
    return (localStorage.getItem('gastro_payroll_state') as any) || 'Draft';
  });

  const [totalTipPool, setTotalTipPool] = useState<number>(1000.14); // Matches remaining tip pools nicely
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedContract, setSelectedContract] = useState('All Contracts');
  
  // Modals & Panels
  const [activeEmployee, setActiveEmployee] = useState<PayrollEmployee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<PayrollEmployee | null>(null);
  const [compensatoryLeaveEmp, setCompensatoryLeaveEmp] = useState<PayrollEmployee | null>(null);
  const [compensatoryHours, setCompensatoryHours] = useState<number>(8);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportTemplate, setExportTemplate] = useState<'DATEV' | 'BMD' | 'CSV'>('DATEV');
  const [showStateResetWarning, setShowStateResetWarning] = useState<string | null>(null);

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState<Array<{ id: string; time: string; user: string; action: string; note: string }>>(() => {
    const cached = localStorage.getItem('gastro_payroll_audit');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) { }
    }
    return [
      { id: '1', time: '2026-06-01 09:00', user: 'System', action: 'Initialize', note: 'Payroll period June 2026 initialized as Draft.' }
    ];
  });

  // Keep state synced to localStorage
  useEffect(() => {
    localStorage.setItem('gastro_payroll_employees_v2', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('gastro_payroll_state', payrollState);
  }, [payrollState]);

  useEffect(() => {
    localStorage.setItem('gastro_payroll_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Syncing with shared staff state from props
  useEffect(() => {
    if (staff && staff.length > 0) {
      // Find active staff who are included in payroll but not in our list yet
      const activePayrollStaff = staff.filter(s => s.isActive && s.includeInPayroll);
      const updatedList = [...employees];
      let mutated = false;

      activePayrollStaff.forEach(s => {
        const exists = updatedList.some(e => e.id === s.id || e.name.toLowerCase() === s.name.toLowerCase());
        if (!exists) {
          updatedList.push({
            id: s.id || `staff-${Math.random().toString(36).substr(2, 9)}`,
            name: s.name,
            role: s.role || 'Staff',
            department: s.department || 'Service',
            branch: s.branch || 'HCM 1',
            contractType: s.status === 'Part-time' ? 'Minijob' : (s.salaryType === 'Monthly' ? 'Monthly' : 'Hourly'),
            baseRate: s.hourlyRate || 15.00,
            monthlyContractSalary: s.salaryType === 'Monthly' ? (s.hourlyRate * 160 || 2400) : undefined,
            actualHours: 120.0,
            standardHours: 160.0,
            fwhaBalance: 0.0,
            unpaidLeaves: 0,
            sickLeavesWithCert: 0,
            taxClass: 'Class 1',
            healthProvider: 'AOK',
            socialSecurityNo: '12 345678 S 098',
            taxId: '45 123 987 564',
            dependentAllowance: 0,
            eveningHours: 0,
            nightHours: 0,
            sundayHours: 0,
            holidayHours: 0,
            tips: 0,
            tipsLocked: false,
            foodDeduction: 0,
            adjustment: 0,
            adjustmentNote: '',
            taxesAndInsuranceRate: 0.20,
          });
          mutated = true;
        }
      });

      if (mutated) {
        setEmployees(updatedList);
      }
    }
  }, [staff]);

  // Access check
  const userAccessType = (() => {
    if (!simulatedUser) return 'Staff';
    const roleName = simulatedUser.role || 'Staff';
    if (roleName.toLowerCase() === 'owner' || simulatedUser.systemAccessLevel === 'Admin') {
      return 'Admin';
    }
    // Check custom roles dataScope
    try {
      const customRolesStr = localStorage.getItem('gastro_custom_roles');
      if (customRolesStr) {
        const customRoles = JSON.parse(customRolesStr);
        const matched = customRoles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
        if (matched) {
          if (matched.dataScope === 'Brand-wide') {
            return 'Admin';
          } else {
            return 'Manager';
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    if (roleName.toLowerCase() === 'manager') {
      return 'Manager';
    }
    return 'Staff';
  })();

  const allowedBranches = simulatedUser?.assignedStores || (simulatedUser?.branch ? [simulatedUser.branch] : ['HCM 1']);
  const isAdmin = userAccessType === 'Admin';
  const userBranch = allowedBranches[0] || 'HCM 1';
  const displayLedger = isAdmin ? ledger : 'tax'; // Force tax ledger for employee

  // Add audit log helper
  const addLog = (action: string, note: string) => {
    const newLog = {
      id: Math.random().toString(),
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: simulatedUser?.name || 'Admin',
      action,
      note
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- Calculations Engine ---
  const departmentWeights: Record<string, number> = {
    'Service': tipWeightService,
    'Kitchen': tipWeightKitchen,
    'Bar': tipWeightBar,
    'Office': 0.5,
    'Management': 0.5,
  };

  const getWeight = (dept: string) => departmentWeights[dept] || 1.0;

  // Calculate dynamic tips
  const recalculateTips = (targetPool: number) => {
    // 1. Gather all employees that are visible/included
    const lockedSum = employees
      .filter(e => e.tipsLocked)
      .reduce((sum, e) => sum + e.tips, 0);

    const unlockedEmps = employees.filter(e => !e.tipsLocked);
    const remainingPool = Math.max(0, targetPool - lockedSum);

    if (tipDistributionMethod === 'Percentage-based') {
      const deptPcts: Record<string, number> = {
        'Service': tipPctService,
        'Kitchen': tipPctKitchen,
        'Bar': tipPctBar,
        'Office': 0,
        'Management': 0
      };

      const deptUnlockedHours: Record<string, number> = {};
      unlockedEmps.forEach(e => {
        const d = e.department || 'Service';
        deptUnlockedHours[d] = (deptUnlockedHours[d] || 0) + e.actualHours;
      });

      const activePctSum = Object.keys(deptUnlockedHours).reduce((sum, d) => {
        return sum + (deptUnlockedHours[d] > 0 ? (deptPcts[d] || 0) : 0);
      }, 0) || 100;

      const updated = employees.map(e => {
        if (e.tipsLocked) return e;
        const d = e.department || 'Service';
        const dHours = deptUnlockedHours[d] || 0;
        if (dHours === 0) return { ...e, tips: 0 };
        const dPct = deptPcts[d] || 0;
        const dPool = remainingPool * (dPct / activePctSum);
        const myTips = parseFloat(((e.actualHours / dHours) * dPool).toFixed(2));
        return { ...e, tips: myTips };
      });

      setEmployees(updated);
      addLog('Recalculate Tips', `Recalculated tip pool (€${targetPool.toFixed(2)}) using Percentage-based allocation. Locked tips: €${lockedSum.toFixed(2)}.`);
    } else {
      const totalUnlockedWeightedHours = unlockedEmps.reduce(
        (sum, e) => sum + (e.actualHours * getWeight(e.department)),
        0
      );

      const updated = employees.map(e => {
        if (e.tipsLocked) return e;
        if (totalUnlockedWeightedHours === 0) {
          return { ...e, tips: 0 };
        }
        const myWeightedHours = e.actualHours * getWeight(e.department);
        const calculatedTips = parseFloat(((myWeightedHours / totalUnlockedWeightedHours) * remainingPool).toFixed(2));
        return { ...e, tips: calculatedTips };
      });

      setEmployees(updated);
      addLog('Recalculate Tips', `Recalculated tip pool (€${targetPool.toFixed(2)}) using Weight-based allocation. Locked tips: €${lockedSum.toFixed(2)}.`);
    }
  };

  // Handle single employee calculation
  const getEmployeeCalculatedDetails = (emp: PayrollEmployee, activeLedger: 'internal' | 'tax') => {
    // Hourly rates & basic pay
    let baseSalary = 0;
    let actualHoursToReport = emp.actualHours;
    let fwhaAdded = 0;
    let fwhaPayout = 0;
    let currentFwhaBalance = emp.fwhaBalance;

    if (emp.contractType === 'Monthly') {
      baseSalary = emp.monthlyContractSalary || (emp.baseRate * emp.standardHours);
      // FWHA calculation
      const fwhaDiff = emp.actualHours - emp.standardHours;
      fwhaAdded = fwhaDiff;
      currentFwhaBalance = emp.fwhaBalance + fwhaDiff;
      
      // Auto cash-out if over max threshold (+40h)
      if (currentFwhaBalance > maxFwhaHours) {
        const excess = currentFwhaBalance - maxFwhaHours;
        fwhaPayout = excess * emp.baseRate;
        currentFwhaBalance = maxFwhaHours;
      }
      actualHoursToReport = emp.standardHours; // reported standard contract hours
    } else {
      baseSalary = emp.actualHours * emp.baseRate;
    }

    // Special Premiums (night, sunday, holiday, evening)
    const eveningPremium = eveningShiftPremiumEnabled ? (emp.eveningHours * emp.baseRate * eveningShiftPremiumRate) : 0;
    const nightPremium = emp.nightHours * emp.baseRate * nightShiftPremiumRate;
    const sundayPremium = emp.sundayHours * emp.baseRate * sundayPremiumRate;
    const holidayPremium = emp.holidayHours * emp.baseRate * holidayPremiumRate;
    const totalPremiums = eveningPremium + nightPremium + sundayPremium + holidayPremium;

    // Gross and tips
    let totalTips = emp.tips;
    let deductionUnpaid = emp.unpaidLeaves * (baseSalary / 30); // simplistic daily deduction
    let totalActualIncome = baseSalary + totalPremiums + totalTips + emp.adjustment - deductionUnpaid + fwhaPayout;

    // Dual ledger caps (Minijob)
    let isMinijobCapped = false;
    let minijobCashPay = 0;
    let reportedBaseSalary = baseSalary;
    let reportedPremiums = totalPremiums;
    let reportedTips = totalTips;
    let reportedGross = totalActualIncome;
    let taxesAndInsurance = 0;

    if (emp.contractType === 'Minijob') {
      if (totalActualIncome > lowIncomeThreshold) {
        isMinijobCapped = true;
        minijobCashPay = totalActualIncome - lowIncomeThreshold;
        
        // Under Official / Tax ledger, we report exactly the lowIncomeThreshold
        reportedBaseSalary = lowIncomeThreshold;
        reportedPremiums = 0;
        reportedTips = 0;
        reportedGross = lowIncomeThreshold;
        actualHoursToReport = parseFloat((lowIncomeThreshold / emp.baseRate).toFixed(2));
      } else {
        reportedGross = totalActualIncome;
      }
      taxesAndInsurance = 0; // minijobs exempt under threshold
    } else {
      // Tax estimation
      reportedGross = baseSalary + totalPremiums + totalTips + emp.adjustment - deductionUnpaid;
      taxesAndInsurance = reportedGross * emp.taxesAndInsuranceRate;
    }

    // Food allowance deduction (Sachbezug)
    const activeFoodDeduction = emp.foodDeduction;

    // Net Payouts
    let internalNetTransfer = totalActualIncome - activeFoodDeduction - minijobCashPay; // what's wired officially in internal mode
    let officialNetPayout = reportedGross - activeFoodDeduction - taxesAndInsurance; // Auszahlung official

    if (activeLedger === 'internal') {
      return {
        baseSalary,
        eveningPremium,
        nightPremium,
        sundayPremium,
        holidayPremium,
        totalPremiums,
        tips: totalTips,
        deductionUnpaid,
        fwhaAdded,
        fwhaPayout,
        finalFwhaBalance: currentFwhaBalance,
        totalActualIncome,
        foodDeduction: activeFoodDeduction,
        cashPay: minijobCashPay + fwhaPayout,
        taxesAndInsurance: totalActualIncome * emp.taxesAndInsuranceRate,
        netTransfer: internalNetTransfer,
        reportedHours: emp.actualHours,
        isCapped: isMinijobCapped
      };
    } else {
      // Tax Ledger
      return {
        baseSalary: reportedBaseSalary,
        eveningPremium: emp.contractType === 'Minijob' && isMinijobCapped ? 0 : eveningPremium,
        nightPremium: emp.contractType === 'Minijob' && isMinijobCapped ? 0 : nightPremium,
        sundayPremium: emp.contractType === 'Minijob' && isMinijobCapped ? 0 : sundayPremium,
        holidayPremium: emp.contractType === 'Minijob' && isMinijobCapped ? 0 : holidayPremium,
        totalPremiums: reportedPremiums,
        tips: reportedTips,
        deductionUnpaid,
        fwhaAdded,
        fwhaPayout: 0,
        finalFwhaBalance: currentFwhaBalance,
        totalActualIncome: reportedGross,
        foodDeduction: activeFoodDeduction,
        cashPay: 0,
        taxesAndInsurance,
        netTransfer: officialNetPayout,
        reportedHours: actualHoursToReport,
        isCapped: isMinijobCapped
      };
    }
  };

  // --- Trigger State Machine Reset ---
  const handleDataModification = (empId: string, updatedFields: Partial<PayrollEmployee>) => {
    const executeUpdate = () => {
      setEmployees(prev => prev.map(e => {
        if (e.id === empId) {
          const merged = { ...e, ...updatedFields };
          return merged;
        }
        return e;
      }));

      // Reset state if Approved or Paid
      if (payrollState === 'Approved' || payrollState === 'Paid') {
        setPayrollState('Draft');
        addLog('State Reverted', `Data modified for employee ID ${empId}. Payroll period reset from ${payrollState} to Draft.`);
      } else if (payrollState === 'TaxVersionCreated') {
        setPayrollState('TaxVersionAdjusted');
        addLog('State Progressed', `Custom adjustments applied to official Tax ledger for employee ID ${empId}.`);
      }
    };

    if (payrollState === 'Approved' || payrollState === 'Paid') {
      setShowStateResetWarning(empId);
      // We will let the confirmation handle it
    } else {
      executeUpdate();
    }
  };

  const confirmModification = (empId: string, updatedFields: Partial<PayrollEmployee>) => {
    setEmployees(prev => prev.map(e => {
      if (e.id === empId) {
        return { ...e, ...updatedFields };
      }
      return e;
    }));
    const oldState = payrollState;
    setPayrollState('Draft');
    setShowStateResetWarning(null);
    addLog('State Reverted', `Confirmed modification for employee ID ${empId}. Payroll state reset from ${oldState} to Draft.`);
  };

  // --- Filter and Search ---
  const filteredEmployees = employees.filter(emp => {
    if (userAccessType === 'Staff') {
      if (simulatedUser) {
        return emp.name.toLowerCase().includes(simulatedUser.name.toLowerCase());
      }
      return false;
    }
    if (userAccessType === 'Manager') {
      if (!allowedBranches.includes(emp.branch)) {
        return false;
      }
    } else {
      // Admin branch filter
      if (selectedBranch !== 'All Branches' && emp.branch !== selectedBranch) {
        return false;
      }
    }
    // 3. Contract filter
    if (selectedContract !== 'All Contracts' && emp.contractType !== selectedContract) {
      return false;
    }
    // 4. Search query
    const searchLower = searchQuery.toLowerCase();
    return emp.name.toLowerCase().includes(searchLower) || emp.role.toLowerCase().includes(searchLower);
  });

  // KPI Metrics
  const calculatedMetrics = filteredEmployees.map(e => getEmployeeCalculatedDetails(e, displayLedger));
  const totalReportedHours = calculatedMetrics.reduce((sum, item) => sum + item.reportedHours, 0);
  const totalGrossCost = calculatedMetrics.reduce((sum, item) => sum + item.totalActualIncome, 0);
  const totalNetPayout = calculatedMetrics.reduce((sum, item) => sum + item.netTransfer, 0);
  const totalCashPayout = calculatedMetrics.reduce((sum, item) => sum + item.cashPay, 0);

  // --- Compensatory Leave booking ---
  const handleBookCompensatoryLeave = () => {
    if (!compensatoryLeaveEmp) return;
    const emp = compensatoryLeaveEmp;
    
    // Check FWHA balance
    if (emp.fwhaBalance < compensatoryHours) {
      alert(`Employee ${emp.name} only has ${emp.fwhaBalance.toFixed(1)}h in their FWHA account, which is insufficient for ${compensatoryHours}h of compensatory leave.`);
      return;
    }

    const updatedBalance = emp.fwhaBalance - compensatoryHours;
    handleDataModification(emp.id, { fwhaBalance: updatedBalance });
    addLog('Compensatory Leave', `Approved ${compensatoryHours}h of compensatory leave for ${emp.name}. Balance reduced to ${updatedBalance.toFixed(1)}h.`);
    setCompensatoryLeaveEmp(null);
  };

  // --- Export File generators ---
  const getDATEVPreview = () => {
    let output = `[DATEV ASCII-Import | Payroll June 2026]\n`;
    output += `Format: CSV | Client ID: JB-HCM99 | Consultant: 10294\n`;
    output += `========================================================\n`;
    output += `EmpNo,TaxId,SocialSecNum,TaxClass,ReportedHours,BaseWage,BaseWageCode,ExemptPremiums,ExemptTips,TipsCode,NetPayout,AccountingCode\n`;
    employees.forEach((emp, index) => {
      const calc = getEmployeeCalculatedDetails(emp, 'tax');
      output += `${100 + index},"${emp.taxId}","${emp.socialSecurityNo}","${emp.taxClass}",${calc.reportedHours.toFixed(2)},${calc.baseSalary.toFixed(2)},"${codeBaseSalary}",${calc.totalPremiums.toFixed(2)},${calc.tips.toFixed(2)},"${codeTipsDistribution}",${calc.netTransfer.toFixed(2)},"Code-F (${codeEveningPremium}/${codeNightPremium}/${codeSundayPremium}/${codeHolidayPremium})"\n`;
    });
    return output;
  };

  const getBMDPreview = () => {
    let output = `[BMD Lohnimport | Version 4.3 | Austria Standard]\n`;
    output += `Client: JOHNS_BISTRO_VIETNAM | Period: 2026-06\n`;
    output += `========================================================\n`;
    output += `PERSNR;NAME;SVNR;STKL;HOURS;BASE;BASE_CODE;PREMIUMS;PREMIUMS_CODES;TIPS;TIPS_CODE;NET_PAYOUT;S_CODE\n`;
    employees.forEach((emp, index) => {
      const calc = getEmployeeCalculatedDetails(emp, 'tax');
      output += `${1000 + index};"${emp.name}";"${emp.socialSecurityNo}";"${emp.taxClass}";${calc.reportedHours.toFixed(2)};${calc.baseSalary.toFixed(2)};"${codeBaseSalary}";${calc.totalPremiums.toFixed(2)};"(${codeEveningPremium},${codeNightPremium},${codeSundayPremium},${codeHolidayPremium})";${calc.tips.toFixed(2)};"${codeTipsDistribution}";${calc.netTransfer.toFixed(2)};"F_EXEMPT"\n`;
    });
    return output;
  };

  const getCSVPreview = () => {
    let output = `Employee Name,Branch,Role,Contract Type,Reported Hours,Base Salary,Base Salary Code,Premiums,Premiums Codes,Tips,Tips Code,Sachbezug,Estimated Tax,Net Payout\n`;
    employees.forEach(emp => {
      const calc = getEmployeeCalculatedDetails(emp, displayLedger);
      output += `"${emp.name}","${emp.branch}","${emp.role}","${emp.contractType}",${calc.reportedHours.toFixed(2)},${calc.baseSalary.toFixed(2)},"${codeBaseSalary}",${calc.totalPremiums.toFixed(2)},"(${codeEveningPremium},${codeNightPremium},${codeSundayPremium},${codeHolidayPremium})",${calc.tips.toFixed(2)},"${codeTipsDistribution}",${calc.foodDeduction.toFixed(2)},${calc.taxesAndInsurance.toFixed(2)},${calc.netTransfer.toFixed(2)}\n`;
    });
    return output;
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-16 font-sans text-slate-700 antialiased" id="payroll-workspace">
      
      {/* ⚠️ Access limit warning for employees */}
      {!isAdmin && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 px-6 py-3 text-sm flex items-center gap-2" id="employee-access-banner">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>🔒 Employee Mode ({simulatedUser?.name || 'Staff'}):</strong> Internal payroll ledger is hidden to protect commercial data. You are authorized to access, edit, and export the Tax & Accounting ledger for the <strong>{userBranch}</strong> branch only.
          </span>
        </div>
      )}

      {/* State Reset dialog if edit occurs on Approved/Paid */}
      {showStateResetWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" id="state-reset-warning-dialog">
          <div className="bg-white p-6 max-w-md w-full rounded-lg border border-slate-200 shadow-xl">
            <div className="flex gap-3 text-amber-700 mb-4">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-slate-800 text-base">Revert Payroll status to Draft?</h3>
                <p className="text-sm mt-1 text-slate-700">
                  Payroll is currently in <strong>{payrollState}</strong> status. Any modification to hours, rate, or allowances will automatically revert the status to <strong>Draft</strong> and require re-approval to prevent tax discrepancy.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowStateResetWarning(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50"
              >
                Cancel Changes
              </button>
              <button 
                onClick={() => {
                  const emp = employees.find(e => e.id === showStateResetWarning);
                  if (emp && editingEmployee) {
                    confirmModification(emp.id, editingEmployee);
                    setEditingEmployee(null);
                  } else {
                    setShowStateResetWarning(null);
                  }
                }}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700"
              >
                Confirm & Revert to Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flat Header Layout */}
      <div className="w-full pt-6" id="payroll-header">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-2 border-b border-[#EAE4DC]">
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#7553FF] bg-[#7553FF]/10 px-2 py-0.5 rounded-[2px]  tracking-wider font-sans">HR & Finance</span>
              <span className="text-[12px] text-slate-700 font-mono">Period: June 2026</span>
            </div>
            <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight flex items-center gap-2.5 font-sans">
              <Coins className="w-[24px] h-[24px] text-[#7553FF]" />
              <span>Payroll Reconciliation & Settlement</span>
            </h1>
            <p className="text-[14px] text-slate-700 font-normal leading-relaxed font-sans">
              Dual-ledger payroll system: Automatic reconciliation of internal costs and official tax reporting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowExportModal(true)}
              className="h-10 px-4 bg-white border border-[#EAE4DC] hover:bg-slate-50 text-slate-700 font-medium text-[14px] rounded-lg transition-all flex items-center gap-2 cursor-pointer select-none"
              id="btn-export-reports"
            >
              <FileDown className="w-[16px] h-[16px]" />
              <span>Export Reports</span>
            </button>
            
            {/* State Actions */}
            {isAdmin && (
              <div className="flex items-center gap-2">
                {payrollState === 'Draft' && (
                  <button 
                    onClick={() => {
                      setPayrollState('TaxVersionCreated');
                      addLog('Create Tax Ledger', 'Successfully cloned Internal Ledger data into Official Tax Ledger and applied auto-capping filters.');
                    }}
                    className="h-10 px-4 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-lg transition-all flex items-center gap-2 border-none cursor-pointer select-none shadow-sm"
                  >
                    <Plus className="w-[16px] h-[16px]" />
                    <span>Create Tax Version</span>
                  </button>
                )}

                {(payrollState === 'TaxVersionCreated' || payrollState === 'TaxVersionAdjusted') && (
                  <button 
                    onClick={() => {
                      setPayrollState('Approved');
                      addLog('Approve Payroll', 'Approved payroll statements for all branches. Transitioned ledger status to Approved.');
                    }}
                    className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[14px] rounded-lg transition-all flex items-center gap-2 border-none cursor-pointer select-none shadow-sm"
                  >
                    <UserCheck className="w-[16px] h-[16px]" />
                    <span>Approve Payroll</span>
                  </button>
                )}

                {payrollState === 'Approved' && (
                  <button 
                    onClick={() => {
                      setPayrollState('Paid');
                      addLog('Execute Payment', 'Marked payroll as fully paid. Direct transfers processed to bank accounts.');
                    }}
                    className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[14px] rounded-lg transition-all flex items-center gap-2 border-none cursor-pointer select-none shadow-sm"
                  >
                    <CheckCircle2 className="w-[16px] h-[16px]" />
                    <span>Record Fully Paid</span>
                  </button>
                )}

                {payrollState === 'Paid' && (
                  <span className="h-10 px-4 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[14px] font-normal rounded-lg flex items-center gap-2">
                    <ShieldCheck className="w-[16px] h-[16px] text-emerald-600" />
                    <span>Completed & Settled</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-6" id="payroll-dashboard-body">
        {userAccessType === 'Staff' ? (
          (() => {
            const emp = employees.find(e => e.name.toLowerCase().includes(simulatedUser?.name?.toLowerCase() || '')) || employees[0];
            if (!emp) {
              return (
                <div className="bg-white border border-[#EAE4DC] rounded-xl p-8 text-center text-slate-750">
                  No personal earnings record could be resolved. Please contact the administrator.
                </div>
              );
            }
            const calc = getEmployeeCalculatedDetails(emp, 'tax');
            return (
              <div className="space-y-6 max-w-2xl mx-auto text-left" id="personal-earnings-dashboard">
                <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-3xs">
                  <h2 className="text-xl font-medium text-slate-900 tracking-tight mb-1">My Pay Stub & Earnings History</h2>
                  <p className="text-sm text-slate-700 mb-6">Showing secure official pay stub for the current period. Commercial rosters and company cost summaries are restricted.</p>
                  
                  <div className="border border-dashed border-slate-300 p-6 bg-[#FAF9F7]/40 rounded-xl font-sans text-slate-800" id="payslip-paper">
                    
                    {/* Header Details */}
                    <div className="flex justify-between border-b border-slate-200 pb-4 mb-4">
                      <div className="text-left">
                        <h3 className="font-semibold text-sm text-slate-900">JOHN'S BISTRO GMBH</h3>
                        <p className="text-xs text-slate-700">Branch Code: {emp.branch}</p>
                        <p className="text-xs text-slate-700">Germany - National Operations</p>
                      </div>
                      <div className="text-right">
                        <h4 className="font-medium text-xs text-[#7553FF]  tracking-wider">Individual Payslip Statement</h4>
                        <p className="text-xs text-slate-700 font-mono">Period: 06/2026</p>
                        <p className="text-xs text-slate-700 font-mono">Created: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Employee Profile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-slate-200 pb-4 mb-4 bg-slate-50/50 p-3 rounded-lg text-left">
                      <div className="space-y-1">
                        <p><strong className="text-slate-900 font-medium">Employee:</strong> {emp.name}</p>
                        <p><strong className="text-slate-900 font-medium">Role:</strong> {emp.role}</p>
                        <p><strong className="text-slate-900 font-medium">Contract Type:</strong> {emp.contractType}</p>
                        <p><strong className="text-slate-900 font-medium">Social Security No:</strong> {emp.socialSecurityNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p><strong className="text-slate-900 font-medium">Tax ID:</strong> {emp.taxId}</p>
                        <p><strong className="text-slate-900 font-medium">Tax Class:</strong> {emp.taxClass}</p>
                        <p><strong className="text-slate-900 font-medium">Health Insurance:</strong> {emp.healthProvider}</p>
                        <p><strong className="text-slate-900 font-medium">Dependent Allowance:</strong> {emp.dependentAllowance}</p>
                      </div>
                    </div>

                    {/* Operational performance stats */}
                    <div className="mb-4 text-xs grid grid-cols-3 gap-2 text-left">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-[10px]">Actual Hours</span>
                        <span className="font-mono font-medium text-xs">{emp.actualHours.toFixed(1)}h</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-[10px]">Standard Hours</span>
                        <span className="font-mono font-medium text-xs">{emp.standardHours.toFixed(1)}h</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-[10px]">Certified Sick Leave</span>
                        <span className="font-mono font-medium text-xs text-rose-700">{emp.sickLeavesWithCert} days</span>
                      </div>
                    </div>

                    {/* Financial item breakdown */}
                    <div className="mb-4 text-left">
                      <h4 className="font-medium text-xs text-slate-800  tracking-wide border-b border-slate-200 pb-1 mb-2">Gross Earnings</h4>
                      <table className="w-full text-xs text-slate-700">
                        <tbody>
                          <tr className="border-b border-slate-50 py-1">
                            <td className="py-1">Agreed Base Salary {emp.contractType === 'Monthly' ? '(Salary)' : `(Hourly @ €${emp.baseRate})`}</td>
                            <td className="text-right py-1 font-mono">€{calc.baseSalary.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                          </tr>
                          
                          {calc.eveningPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Evening Shift Premium (10% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.eveningPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.nightPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Night Shift Premium (25% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.nightPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.sundayPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Sunday Premium (50% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.sundayPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.holidayPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Holiday Premium (125% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.holidayPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {calc.tips > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-[#7553FF]">
                              <td className="py-1">Allocated Tips (Tax Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.tips.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {emp.adjustment !== 0 && (
                            <tr className="border-b border-slate-50 py-1">
                              <td className="py-1">Adjustment / Other ({emp.adjustmentNote || 'Adjustment'})</td>
                              <td className="text-right py-1 font-mono">€{emp.adjustment.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {calc.deductionUnpaid > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1">Unpaid Leave Deduction ({emp.unpaidLeaves} days)</td>
                              <td className="text-right py-1 font-mono">-€{calc.deductionUnpaid.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Deductions */}
                    <div className="mb-4 text-left">
                      <h4 className="font-medium text-xs text-slate-800  tracking-wide border-b border-slate-200 pb-1 mb-2">Deductions & Offsets</h4>
                      <table className="w-full text-xs text-slate-700">
                        <tbody>
                          {calc.foodDeduction > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1">Sachbezug Food Allowance Deduction</td>
                              <td className="text-right py-1 font-mono">-€{calc.foodDeduction.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.taxesAndInsurance > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1">Estimated Tax & Social Security ({ (emp.taxesAndInsuranceRate*100).toFixed(0) }%)</td>
                              <td className="text-right py-1 font-mono">-€{calc.taxesAndInsurance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals Summary */}
                    <div className="border-t-2 border-slate-400 pt-4 mt-4 flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl" id="payslip-totals">
                      <div className="text-left leading-tight">
                        <span className="text-[10px] text-slate-400 block  font-medium">Payment Method: Bank Transfer</span>
                        <span className="text-xs font-semibold font-sans">OFFICIAL NET DISBURSEMENT</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-mono font-medium">
                          €{calc.netTransfer.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* FWHA summary if Monthly */}
                    {emp.contractType === 'Monthly' && (
                      <div className="mt-4 text-xs text-slate-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100 flex items-center justify-between">
                        <span>📊 <strong>Flex Work Hour Account (FWHA):</strong> Previous: <strong className="font-mono">{emp.fwhaBalance.toFixed(1)}h</strong> | Delta: <strong className="font-mono">{(emp.actualHours - emp.standardHours).toFixed(1)}h</strong></span>
                        <span>Ending: <strong className="font-mono">{calc.finalFwhaBalance.toFixed(1)}h</strong></span>
                      </div>
                    )}

                  </div>

                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => {
                        const text = getCSVPreview();
                        const blob = new Blob([text], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `payslip-${emp.id}-personal.txt`;
                        a.click();
                      }}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      <FileDown className="w-4 h-4" />
                      Download Personal Statement
                    </button>
                  </div>
                </div>
              </div>
            );
          })()
        ) : (
          <>
            {/* State Machine Stepper */}
            <div className="bg-white border border-[#1C1814]/5 rounded-lg p-5 mb-6 shadow-sm" id="state-machine-stepper">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">Payroll Status:</span>
              <span className={`px-2 py-0.5 text-xs font-normal rounded-[2px] border ${
                payrollState === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                payrollState === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                'bg-blue-50 text-blue-700 border-blue-200'
              }  tracking-wide`}>
                {payrollState}
              </span>
            </div>
            
            {/* Steps Visual */}
            <div className="flex items-center gap-2 text-[14px] font-medium text-slate-700 w-full md:w-auto overflow-x-auto py-1">
              {[
                { key: 'Draft', label: '1. Draft' },
                { key: 'TaxVersionCreated', label: '2. Tax Version Created' },
                { key: 'TaxVersionAdjusted', label: '3. Tax Adjusted' },
                { key: 'Approved', label: '4. Approved' },
                { key: 'Paid', label: '5. Settled & Paid' }
              ].map((step, idx) => {
                const isActive = payrollState === step.key;
                const isCompleted = ['Draft', 'TaxVersionCreated', 'TaxVersionAdjusted', 'Approved', 'Paid'].indexOf(payrollState) >= idx;
                return (
                  <div key={step.key} className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2 py-1 rounded-[2px] ${
                      isActive ? 'bg-[#7553FF] text-white' : isCompleted ? 'bg-[#7553FF]/20 text-[#7553FF]' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {step.label}
                    </span>
                    {idx < 4 && <span className="text-slate-700">→</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dual Ledger Toggler for Admins */}
        {isAdmin && (
          <div className="flex bg-white p-1 rounded-lg border border-[#EAE4DC] mb-6 w-fit" id="ledger-toggler-wrapper">
            <button
              onClick={() => setLedger('internal')}
              className={`flex-1 py-2 px-2 text-center text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                ledger === 'internal'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Internal Ledger (Actual Costs)
            </button>
            <button
              onClick={() => setLedger('tax')}
              className={`flex-1 py-2 px-2 text-center text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                ledger === 'tax'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Official Tax Ledger (Accounting)
            </button>
          </div>
        )}

        {/* 📊 KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" id="kpi-cards-grid">
          
          <div className="bg-white border border-[#1C1814]/5 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-slate-700  tracking-wider mb-1">Total Reported Hours</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                {totalReportedHours.toFixed(1)}h
              </h3>
              <p className="text-sm text-slate-700 mt-1">Calculated via {displayLedger === 'internal' ? 'Internal Ledger' : 'Official Tax Ledger'}</p>
            </div>
            <div className="p-3 bg-[#7553FF]/10 rounded-lg">
              <Clock className="w-6 h-6 text-[#7553FF]" />
            </div>
          </div>

          <div className="bg-white border border-[#1C1814]/5 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-slate-700  tracking-wider mb-1">Total Gross Personnel Costs</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                €{totalGrossCost.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-slate-700 mt-1">Includes premiums & adjustments</p>
            </div>
            <div className="p-3 bg-[#7553FF]/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#7553FF]" />
            </div>
          </div>

          <div className="bg-white border border-[#1C1814]/5 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-slate-700  tracking-wider mb-1">Net Bank Transfers</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                €{totalNetPayout.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-slate-700 mt-1">Officially wired to bank accounts</p>
            </div>
            <div className="p-3 bg-[#7553FF]/10 rounded-lg">
              <FileText className="w-6 h-6 text-[#7553FF]" />
            </div>
          </div>

          <div className="bg-white border border-[#1C1814]/5 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-slate-700  tracking-wider mb-1">Total Cash Payments</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
                €{totalCashPayout.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-slate-700 mt-1">FWHA overflow & Minijob caps</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Coins className="w-6 h-6 text-indigo-600" />
            </div>
          </div>

        </div>

        {/* Dynamic Tip Pool Distribution Controller Card */}
        {isAdmin && (
          <div className="bg-white border border-[#1C1814]/5 rounded-lg p-6 mb-6 shadow-sm" id="dynamic-tips-controller">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-[#7553FF]" />
              <h2 className="text-lg font-bold text-slate-900 font-sans">Dynamic Tip Pool Allocation System</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700  tracking-wider mb-1.5">Total Period Tip Pool (EUR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-700 text-sm">€</span>
                  <input
                    type="number"
                    value={totalTipPool}
                    onChange={(e) => setTotalTipPool(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full h-10 pl-7 pr-3 py-2 border border-[#EAE4DC] text-slate-800 text-sm focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/20 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => recalculateTips(totalTipPool)}
                  className="w-full h-10 bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 border-none cursor-pointer select-none"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>
                    {tipDistributionMethod === 'Percentage-based'
                      ? 'Distribute by Department Percentages'
                      : 'Distribute by Weighted Hours'}
                  </span>
                </button>
              </div>

              <div className="text-sm text-slate-700 border-l border-[#EAE4DC] pl-4 py-1">
                <span className="font-semibold block mb-0.5 text-slate-800">
                  {tipDistributionMethod === 'Percentage-based' ? 'Percentage allocation rules:' : 'Weighted allocation rules:'}
                </span>
                {tipDistributionMethod === 'Percentage-based' ? (
                  <>Service: <span className="font-mono font-medium">{tipPctService}%</span> | Kitchen: <span className="font-mono font-medium">{tipPctKitchen}%</span> | Bar: <span className="font-mono font-medium">{tipPctBar}%</span></>
                ) : (
                  <>Service: <span className="font-mono font-medium">{tipWeightService}</span> | Kitchen: <span className="font-mono font-medium">{tipWeightKitchen}</span> | Bar: <span className="font-mono font-medium">{tipWeightBar}</span> | Office/Other: <span className="font-mono font-medium">0.5</span></>
                )}. Manual edits below trigger <strong>Lock</strong> mode.
              </div>
            </div>
          </div>
        )}

        {/* 🔍 Filters Bar */}
        <div className="bg-white border border-[#1C1814]/5 p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between" id="filter-bar">
          
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-700 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search staff, roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-3 py-2 border border-[#EAE4DC] text-slate-800 text-sm focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/20 rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            
            {isAdmin && (
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="h-10 px-3 border border-[#EAE4DC] text-slate-700 text-sm rounded-lg focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/20"
              >
                <option value="All Branches">All Branches</option>
                <option value="HCM 1">HCM 1 Branch</option>
                <option value="HCM 2">HCM 2 Branch</option>
                <option value="HN 1">HN 1 Branch</option>
                <option value="HQ">Headquarters (HQ)</option>
              </select>
            )}

            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="h-10 px-3 border border-[#EAE4DC] text-slate-700 text-sm rounded-lg focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/20"
            >
              <option value="All Contracts">All Contracts</option>
              <option value="Hourly">Hourly Contracts</option>
              <option value="Monthly">Monthly Contracts</option>
              <option value="Minijob">Minijob (Capped)</option>
            </select>
            
            <button
              onClick={() => {
                setSelectedBranch('All Branches');
                setSelectedContract('All Contracts');
                setSearchQuery('');
              }}
              className="h-10 w-10 border border-[#EAE4DC] text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              title="Reset filters"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* 📋 Main Data Table */}
        <div className="bg-white border border-[#1C1814]/5 rounded-xl overflow-hidden shadow-sm" id="main-payroll-table-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9F7] border-b border-[#EAE4DC]">
                  <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest">Employee Name</th>
                  <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest">Contract Type</th>
                  
                  {/* Ledger-specific Columns */}
                  {displayLedger === 'internal' ? (
                    <>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Actual Hours</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Base Salary</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Exempt Premiums</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Tips</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Meal Deduction</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Cash Pay Out</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right bg-[#7553FF]/5">Net Bank Payout</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Tax-Reported Hours</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Taxable Salary</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Tax-Exempt Premiums</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Reported Tips</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right">Taxes & Social Security</th>
                      <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-right bg-[#7553FF]/5">Official Net Payout</th>
                    </>
                  )}
                  <th className="py-4 px-5 text-[14px] font-serif font-medium text-slate-800  tracking-widest text-center">FWHA & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-700 text-sm">
                      No payroll records found matching the active filters.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map(emp => {
                    const calc = getEmployeeCalculatedDetails(emp, displayLedger);
                    const staffMember = staff.find(s => s.id === emp.id || s.name.toLowerCase() === emp.name.toLowerCase());
                    const exitDate = staffMember?.exitDate;
                    return (
                      <tr key={emp.id} className="hover:bg-slate-50/50 transition-all cursor-pointer">
                        
                        {/* Name & Role */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={emp.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                              alt={emp.name}
                              className="w-10 h-10 rounded-full object-cover border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-sans font-medium text-slate-900 block text-[14px] leading-[20px]">{emp.name}</span>
                                {exitDate && (
                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-medium bg-red-100 text-red-800 border border-red-200  tracking-wider">
                                    Exit: {exitDate}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[12px] text-slate-700">{emp.role}</span>
                                <span className="text-[12px] text-[#7553FF] px-1 bg-[#7553FF]/10 rounded-[2px] font-mono font-normal">{emp.branch}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Contract Badge (Flat Style) */}
                        <td className="py-4 px-5">
                          <span className={`px-2 py-0.5 text-xs font-normal rounded-[2px] border ${
                            emp.contractType === 'Minijob' ? 'bg-[#7553FF]/10 text-[#7553FF] border-[#7553FF]/20' :
                            emp.contractType === 'Monthly' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            'bg-slate-50 text-slate-700 border-slate-200'
                          }  tracking-wide`}>
                            {emp.contractType}
                          </span>
                        </td>

                        {/* --- Internal Ledger Columns --- */}
                        {displayLedger === 'internal' ? (
                          <>
                            {/* Actual Hours */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              {calc.reportedHours.toFixed(1)}h
                            </td>

                            {/* Base Salary */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              €{calc.baseSalary.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Premiums */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              <span className="text-emerald-700">€{calc.totalPremiums.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                            </td>

                            {/* Tips */}
                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5 font-mono text-sm text-slate-800">
                                {isAdmin ? (
                                  <div className="flex items-center gap-1">
                                    <button 
                                      onClick={() => handleDataModification(emp.id, { tipsLocked: !emp.tipsLocked })}
                                      className={`p-1 rounded-md transition-colors ${emp.tipsLocked ? 'text-[#7553FF] bg-[#7553FF]/10' : 'text-slate-700 hover:bg-slate-100'}`}
                                      title={emp.tipsLocked ? "Manual override active (Locked)" : "Unlocked (Auto-distributed)"}
                                    >
                                      {emp.tipsLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                                    </button>
                                    <input
                                      type="number"
                                      step="0.01"
                                      value={emp.tips}
                                      onChange={(e) => {
                                        const value = parseFloat(e.target.value) || 0;
                                        handleDataModification(emp.id, { tips: value, tipsLocked: true });
                                      }}
                                      className="w-16 text-right border border-[#EAE4DC] focus:outline-none focus:border-[#7553FF] py-0.5 px-1 rounded-md text-xs"
                                    />
                                  </div>
                                ) : (
                                  <span>€{calc.tips.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                                )}
                              </div>
                            </td>

                            {/* Food Deduction */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-rose-700">
                              -€{calc.foodDeduction.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Cash Pay (Out-of-tax overflows) */}
                            <td className="py-4 px-5 text-right font-mono text-sm">
                              {calc.cashPay > 0 ? (
                                <span className="text-[#7553FF] font-medium">€{calc.cashPay.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                              ) : (
                                <span className="text-slate-700">-</span>
                              )}
                            </td>

                            {/* Final bank transfer (Internal Ledger) */}
                            <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-slate-900 bg-[#7553FF]/5">
                              €{calc.netTransfer.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>
                          </>
                        ) : (
                          // --- Tax Ledger Columns ---
                          <>
                            {/* Reported Hours (Minijob scale downs shown here!) */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              <div className="flex flex-col items-end">
                                <span>{calc.reportedHours.toFixed(1)}h</span>
                                {calc.isCapped && (
                                  <span className="text-xs text-[#7553FF] font-sans font-medium  tracking-wider bg-[#7553FF]/10 px-1 mt-0.5 rounded-[2px]">Scaled down (Minijob)</span>
                                )}
                              </div>
                            </td>

                            {/* Base wage */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              €{calc.baseSalary.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Exempt Premiums */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-emerald-700">
                              €{calc.totalPremiums.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Reported Tips */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-slate-800">
                              €{calc.tips.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Taxes & Social security */}
                            <td className="py-4 px-5 text-right font-mono text-sm text-rose-700">
                              {calc.taxesAndInsurance > 0 ? (
                                <span>-€{calc.taxesAndInsurance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span>
                              ) : (
                                <span className="text-emerald-700 font-medium">Exempt (0%)</span>
                              )}
                            </td>

                            {/* Auszahlung (Official Net) */}
                            <td className="py-4 px-5 text-right font-mono text-sm font-semibold text-indigo-700 bg-[#7553FF]/5">
                              €{calc.netTransfer.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                            </td>
                          </>
                        )}

                        {/* FWHA / Actions Column */}
                        <td className="py-4 px-5">
                          <div className="flex items-center justify-center gap-2">
                            {/* FWHA Indicator for Monthly */}
                            {emp.contractType === 'Monthly' ? (
                              <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md" title="Flex Work Hour Account (FWHA)">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-xs font-mono font-medium text-blue-800">{calc.finalFwhaBalance.toFixed(1)}h</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-700 font-mono">-</span>
                            )}

                            {/* View payslip */}
                            <button
                              onClick={() => setActiveEmployee(emp)}
                              className="p-1 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                              title="View Payslip Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit rates (Admin only) */}
                            {isAdmin && (
                              <button
                                onClick={() => setEditingEmployee(emp)}
                                className="p-1 text-slate-700 hover:text-[#7553FF] hover:bg-[#7553FF]/10 rounded-md transition-colors"
                                title="Adjust hours & premiums"
                              >
                                <SlidersHorizontal className="w-4 h-4" />
                              </button>
                            )}

                            {/* Apply Compensatory Leave (Monthly only, Admin only) */}
                            {isAdmin && emp.contractType === 'Monthly' && (
                              <button
                                onClick={() => setCompensatoryLeaveEmp(emp)}
                                className="p-1 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                title="Book compensatory leave (FWHA deduction)"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Logs and state histories */}
        <div className="bg-white border border-[#1C1814]/5 rounded-lg p-6 mt-6 shadow-sm" id="audit-log-section">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#7553FF]" />
              <h2 className="text-base font-bold text-slate-900 font-sans">Settlement Audit Trail (Audit Log Trail)</h2>
            </div>
            <span className="text-sm text-slate-700">Strict regulatory tracking under EU Lohnsteuer-Richtlinien.</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2.5 font-mono text-sm text-slate-700 divide-y divide-slate-50">
            {auditLogs.map(log => (
              <div key={log.id} className="pt-2 flex justify-between gap-4">
                <div>
                  <span className="text-slate-700">[{log.time}]</span>{' '}
                  <span className="text-[#7553FF] font-semibold">{log.action}:</span>{' '}
                  <span className="text-slate-800">{log.note}</span>
                </div>
                <span className="text-[#7553FF] font-sans text-xs  font-semibold">User: {log.user}</span>
              </div>
            ))}
          </div>
        </div>
        </>
        )}
      </div>

      {/* --- SLIDEOUT DRAWER: PAYSLIP DETAIL --- */}
      <AnimatePresence>
        {activeEmployee && (() => {
          const emp = activeEmployee;
          const calc = getEmployeeCalculatedDetails(emp, displayLedger);
          return (
            <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" id="payslip-drawer-overlay">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
                id="payslip-drawer-content"
              >
                
                {/* Header */}
                <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between bg-[#FAF9F7]">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 font-sans">Payslip Statement Details</h2>
                    <p className="text-sm text-slate-700 mt-0.5">Ledger Mode: <strong>{displayLedger === 'internal' ? 'Internal Payroll' : 'Federal Accounting & Taxes'}</strong></p>
                  </div>
                  <button 
                    onClick={() => setActiveEmployee(null)}
                    className="p-1 text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body - Paper lookalike slip */}
                <div className="flex-1 overflow-y-auto p-6" id="payslip-document-wrapper">
                  <div className="border border-dashed border-slate-300 p-6 bg-amber-50/10 rounded-lg font-sans text-slate-800" id="payslip-paper">
                    
                    {/* Header Details */}
                    <div className="flex justify-between border-b border-slate-200 pb-4 mb-4">
                      <div className="text-left">
                        <h3 className="font-bold text-sm text-slate-900">JOHN'S BISTRO GMBH</h3>
                        <p className="text-sm text-slate-700">Branch Code: {emp.branch}</p>
                        <p className="text-sm text-slate-700">Germany - National Operations</p>
                      </div>
                      <div className="text-right">
                        <h4 className="font-bold text-xs text-[#7553FF]  tracking-wider">Individual Payslip Statement</h4>
                        <p className="text-sm text-slate-700 font-mono">Period: 06/2026</p>
                        <p className="text-sm text-slate-700 font-mono">Created: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Employee Profile Cards */}
                    <div className="grid grid-cols-2 gap-4 text-sm border-b border-slate-200 pb-4 mb-4 bg-slate-50/50 p-3 rounded-lg text-left">
                      <div className="space-y-1">
                        <p><strong className="text-slate-900 font-medium">Employee:</strong> {emp.name}</p>
                        <p><strong className="text-slate-900 font-medium">Role:</strong> {emp.role}</p>
                        <p><strong className="text-slate-900 font-medium">Contract Type:</strong> {emp.contractType}</p>
                        <p><strong className="text-slate-900 font-medium">Social Security No:</strong> {emp.socialSecurityNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p><strong className="text-slate-900 font-medium">Tax ID:</strong> {emp.taxId}</p>
                        <p><strong className="text-slate-900 font-medium">Tax Class:</strong> {emp.taxClass}</p>
                        <p><strong className="text-slate-900 font-medium">Health Insurance Provider:</strong> {emp.healthProvider}</p>
                        <p><strong className="text-slate-900 font-medium">Dependent Allowance:</strong> {emp.dependentAllowance}</p>
                      </div>
                    </div>

                    {/* Exit Settlement Alert */}
                    {(() => {
                      const staffMember = staff.find(s => s.id === emp.id || s.name.toLowerCase() === emp.name.toLowerCase());
                      const exitDate = staffMember?.exitDate;
                      if (!exitDate) return null;
                      
                      const fwhaBal = emp.fwhaBalance;
                      let fwhaMsg = "";
                      if (fwhaBal > 0) {
                        fwhaMsg = `Employee has a positive FWHA balance of +${fwhaBal.toFixed(1)}h surplus. Please arrange cash settlement outside of the system.`;
                      } else if (fwhaBal < 0) {
                        fwhaMsg = `Employee has a negative FWHA balance of ${fwhaBal.toFixed(1)}h deficit. Please arrange deductions or clawback outside of the system.`;
                      } else {
                        fwhaMsg = `Employee has a neutral (0.0h) FWHA balance. No outstanding flextime hours settlement required.`;
                      }

                      return (
                        <div className="mb-4 bg-red-50/70 border border-red-200/60 p-3.5 rounded-lg text-xs leading-relaxed text-red-800 flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <span className="font-bold text-red-900 block  tracking-wider mb-0.5">⚠️ Exit Settlement Warning</span>
                            <p className="font-normal text-red-800">
                              This employee is scheduled for termination/exit on <strong>{exitDate}</strong>.
                            </p>
                            <p className="font-semibold text-red-900 mt-1">
                              {fwhaMsg}
                            </p>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Operational performance stats */}
                    <div className="mb-4 text-sm grid grid-cols-3 gap-2 text-left">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-xs">Actual Attendance Hours</span>
                        <span className="font-mono font-semibold text-xs">{emp.actualHours.toFixed(1)}h</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-xs">Standard Contractual Hours</span>
                        <span className="font-mono font-semibold text-xs">{emp.standardHours.toFixed(1)}h</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-slate-700 block text-xs">Certified Sick Leave</span>
                        <span className="font-mono font-semibold text-xs text-rose-700">{emp.sickLeavesWithCert} days</span>
                      </div>
                    </div>

                    {/* Financial item breakdown */}
                    <div className="mb-4 text-left">
                      <h4 className="font-bold text-xs text-slate-800  tracking-wide border-b border-slate-200 pb-1 mb-2">Gross Earnings Breakdown</h4>
                      <table className="w-full text-sm text-slate-700">
                        <tbody>
                          <tr className="border-b border-slate-50 py-1">
                            <td className="py-1">Agreed Base Salary {emp.contractType === 'Monthly' ? '(Salary)' : `(Hourly @ €${emp.baseRate})`}</td>
                            <td className="text-right py-1 font-mono">€{calc.baseSalary.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                          </tr>
                          
                          {/* Premiums if existing */}
                          {calc.eveningPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Evening Shift Premium (10% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.eveningPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.nightPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Night Shift Premium (25% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.nightPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.sundayPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Sunday Premium (50% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.sundayPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.holidayPremium > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-emerald-800">
                              <td className="py-1">Holiday Premium (125% - Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.holidayPremium.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {calc.tips > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-[#7553FF]">
                              <td className="py-1">Allocated Tips (Tax Exempt)</td>
                              <td className="text-right py-1 font-mono">€{calc.tips.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {emp.adjustment !== 0 && (
                            <tr className="border-b border-slate-50 py-1">
                              <td className="py-1">Adjustment / Other ({emp.adjustmentNote || 'Adjustment'})</td>
                              <td className="text-right py-1 font-mono">€{emp.adjustment.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {calc.fwhaPayout > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-indigo-700 font-semibold">
                              <td className="py-1">FWHA Excess Payout (+40h Capped Out)</td>
                              <td className="text-right py-1 font-mono">€{calc.fwhaPayout.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}

                          {calc.deductionUnpaid > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1">Unpaid Leave Deduction ({emp.unpaidLeaves} days)</td>
                              <td className="text-right py-1 font-mono">-€{calc.deductionUnpaid.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Deductions */}
                    <div className="mb-4 text-left">
                      <h4 className="font-bold text-xs text-slate-800  tracking-wide border-b border-slate-200 pb-1 mb-2">Deductions & Offsets Details</h4>
                      <table className="w-full text-sm text-slate-700">
                        <tbody>
                          {calc.foodDeduction > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1 font-sans">Sachbezug Food Allowance Deduction</td>
                              <td className="text-right py-1 font-mono">-€{calc.foodDeduction.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {calc.taxesAndInsurance > 0 && (
                            <tr className="border-b border-slate-50 py-1 text-rose-700">
                              <td className="py-1">Estimated Tax & Social Security ({ (emp.taxesAndInsuranceRate*100).toFixed(0) }%)</td>
                              <td className="text-right py-1 font-mono">-€{calc.taxesAndInsurance.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                          {emp.contractType === 'Minijob' && calc.isCapped && displayLedger === 'internal' && (
                            <tr className="border-b border-slate-50 py-1 text-indigo-700">
                              <td className="py-1">Cash Pay Overflow (Exempt over €603)</td>
                              <td className="text-right py-1 font-mono">-€{(emp.actualHours * emp.baseRate + calc.tips - lowIncomeThreshold).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals Summary */}
                    <div className="border-t-2 border-slate-400 pt-4 mt-4 flex justify-between items-center bg-slate-900 text-white p-4 rounded-lg" id="payslip-totals">
                      <div className="text-left">
                        <span className="text-xs text-slate-400 block  font-semibold">Payment Method: Bank Transfer</span>
                        <span className="text-sm font-bold font-sans">
                          {displayLedger === 'internal' ? 'BANK TRANSFER NET AMOUNT (BANK NET)' : 'OFFICIAL NET DISBURSEMENT (AUSZAHLUNG)'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-mono font-bold">
                          €{calc.netTransfer.toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* FWHA summary if Monthly */}
                    {emp.contractType === 'Monthly' && (
                      <div className="mt-4 text-xs text-slate-700 bg-blue-50 p-2.5 rounded-lg border border-blue-100 flex items-center justify-between">
                        <span>📊 <strong>Flex Work Hour Account (FWHA):</strong> Previous Balance: <strong className="font-mono">{emp.fwhaBalance.toFixed(1)}h</strong> | Period Delta: <strong className="font-mono">{(emp.actualHours - emp.standardHours).toFixed(1)}h</strong></span>
                        <span>Ending Balance: <strong className="font-mono">{calc.finalFwhaBalance.toFixed(1)}h</strong></span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Footer buttons */}
                <div className="p-4 border-t border-[#EAE4DC] bg-[#FAF9F7] flex gap-3 justify-end">
                  <button 
                    onClick={() => {
                      const text = displayLedger === 'internal' ? getCSVPreview() : getDATEVPreview();
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `payslip-${emp.id}-${displayLedger}.txt`;
                      a.click();
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    Download Declaration File
                  </button>
                  <button 
                    onClick={() => setActiveEmployee(null)}
                    className="px-4 py-2 border border-[#EAE4DC] text-slate-700 text-sm rounded-lg hover:bg-[#FAF9F7] cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* --- MODAL: EDIT EMPLOYEE RATES & HOURS --- */}
      {editingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" id="edit-employee-modal">
          <div className="bg-white rounded-lg border border-[#EAE4DC] shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-5 border-b border-[#EAE4DC] bg-[#FAF9F7] flex justify-between items-center">
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-base">Adjust Hours & Premiums</h3>
                <p className="text-xs text-slate-700 mt-0.5">{editingEmployee.name} | {editingEmployee.role}</p>
              </div>
              <button onClick={() => setEditingEmployee(null)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto" id="edit-modal-fields">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Actual Work Hours</label>
                  <input
                    type="number"
                    value={editingEmployee.actualHours}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, actualHours: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Agreed Hourly Rate (€/h)</label>
                  <input
                    type="number"
                    value={editingEmployee.baseRate}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, baseRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
              </div>

              {/* Special Premiums Hours inputs */}
              <div className="border-t border-[#EAE4DC] pt-3">
                <h4 className="text-xs font-bold text-[#7553FF]  tracking-wider mb-2">Special Shift Hours (Premium Hours)</h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <label className="block text-slate-700 mb-1">Evening Hours (Shift premium 10%)</label>
                    <input
                      type="number"
                      value={editingEmployee.eveningHours}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, eveningHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-[#EAE4DC] text-sm focus:outline-none focus:border-[#7553FF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Night Hours (Shift premium 25%)</label>
                    <input
                      type="number"
                      value={editingEmployee.nightHours}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, nightHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-[#EAE4DC] text-sm focus:outline-none focus:border-[#7553FF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Sunday Hours (Shift premium 50%)</label>
                    <input
                      type="number"
                      value={editingEmployee.sundayHours}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, sundayHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-[#EAE4DC] text-sm focus:outline-none focus:border-[#7553FF] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1">Holiday Hours (Shift premium 125%)</label>
                    <input
                      type="number"
                      value={editingEmployee.holidayHours}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, holidayHours: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-[#EAE4DC] text-sm focus:outline-none focus:border-[#7553FF] rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Deductions & other adjustments */}
              <div className="border-t border-[#EAE4DC] pt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Unpaid Leaves (Days)</label>
                  <input
                    type="number"
                    value={editingEmployee.unpaidLeaves}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, unpaidLeaves: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Certified Sick Leaves (Days)</label>
                  <input
                    type="number"
                    value={editingEmployee.sickLeavesWithCert}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, sickLeavesWithCert: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Adjustment / Extra Allowance (€)</label>
                  <input
                    type="number"
                    value={editingEmployee.adjustment}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, adjustment: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Adjustment Reason / Note</label>
                  <input
                    type="text"
                    value={editingEmployee.adjustmentNote}
                    onChange={(e) => setEditingEmployee({ ...editingEmployee, adjustmentNote: e.target.value })}
                    className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                  />
                </div>
              </div>

            </div>

            <div className="p-4 bg-[#FAF9F7] border-t border-[#EAE4DC] flex justify-end gap-3">
              <button 
                onClick={() => setEditingEmployee(null)}
                className="px-4 py-2 border border-[#EAE4DC] text-slate-700 text-sm rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (editingEmployee) {
                    if (payrollState === 'Approved' || payrollState === 'Paid') {
                      setShowStateResetWarning(editingEmployee.id);
                    } else {
                      handleDataModification(editingEmployee.id, editingEmployee);
                      setEditingEmployee(null);
                    }
                  }
                }}
                className="px-4 py-2 bg-[#7553FF] text-white text-sm font-medium rounded-lg hover:bg-[#6042E0] cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: COMPENSATORY LEAVE DEDUCTION FROM FWHA --- */}
      {compensatoryLeaveEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" id="compensatory-leave-modal">
          <div className="bg-white rounded-lg border border-[#EAE4DC] shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="p-5 border-b border-[#EAE4DC] bg-[#FAF9F7] text-left">
              <h3 className="font-bold text-slate-800 text-base">Book Compensatory Leave</h3>
              <p className="text-xs text-slate-700 mt-0.5">{compensatoryLeaveEmp.name}</p>
            </div>

            <div className="p-5 space-y-4 text-left">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-xs text-blue-800">
                <span className="font-bold block mb-1">FWHA Account Status:</span>
                Current Balance: <strong className="font-mono">{compensatoryLeaveEmp.fwhaBalance.toFixed(1)} hours</strong>. <br />
                Booking compensatory leave deducts 1-to-1 from the accumulated FWHA balance without reducing the base salary of the employee.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">Compensatory Hours to Book</label>
                <input
                  type="number"
                  value={compensatoryHours}
                  onChange={(e) => setCompensatoryHours(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 border border-[#EAE4DC] text-sm text-slate-800 focus:outline-none focus:border-[#7553FF] rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F7] border-t border-[#EAE4DC] flex justify-end gap-3">
              <button onClick={() => setCompensatoryLeaveEmp(null)} className="px-3 py-1.5 border text-xs text-slate-700 rounded-lg cursor-pointer">Cancel</button>
              <button 
                onClick={handleBookCompensatoryLeave}
                className="px-3 py-1.5 bg-[#7553FF] text-white text-xs font-medium rounded-lg hover:bg-[#6042E0] cursor-pointer"
              >
                Approve FWHA Deduction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: EXPORT DATA TO TAX AUTHORITIES --- */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" id="export-reports-modal">
          <div className="bg-white rounded-lg border border-[#EAE4DC] shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="p-5 border-b border-[#EAE4DC] bg-[#FAF9F7] flex justify-between items-center">
              <div className="text-left">
                <h3 className="font-bold text-slate-800 text-base">Export Tax & Accounting Declarations</h3>
                <p className="text-xs text-slate-700 mt-0.5">Compatible with national accounting standards (DATEV, BMD, CSV)</p>
              </div>
              <button onClick={() => setShowExportModal(false)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer">
                <X className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex gap-4 text-left">
                {[
                  { key: 'DATEV', label: 'DATEV Standard (Germany)', desc: 'Export ASCII CSV compatible with the DATEV declaration portal.' },
                  { key: 'BMD', label: 'BMD Lohn (Austria)', desc: 'Export BMD standard format Lohnimport 4.3 for Tax authorities.' },
                  { key: 'CSV', label: 'Standard CSV (International)', desc: 'Export full payroll CSV file for internal reconciliation.' }
                ].map(tmpl => (
                  <button
                    key={tmpl.key}
                    onClick={() => setExportTemplate(tmpl.key as any)}
                    className={`flex-1 p-3 text-left border rounded-lg transition-all cursor-pointer ${
                      exportTemplate === tmpl.key 
                        ? 'border-[#7553FF] bg-[#7553FF]/5 shadow-sm' 
                        : 'border-[#EAE4DC] hover:bg-[#FAF9F7]'
                    }`}
                  >
                    <span className="font-bold text-xs block text-slate-900">{tmpl.label}</span>
                    <span className="text-[10px] text-slate-700 mt-1 block leading-relaxed">{tmpl.desc}</span>
                  </button>
                ))}
              </div>

              {/* Text Preview */}
              <div className="text-left">
                <span className="block text-xs font-semibold text-slate-800 mb-1">File Preview:</span>
                <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-auto h-52 leading-relaxed">
                  {exportTemplate === 'DATEV' && getDATEVPreview()}
                  {exportTemplate === 'BMD' && getBMDPreview()}
                  {exportTemplate === 'CSV' && getCSVPreview()}
                </pre>
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F7] border-t border-[#EAE4DC] flex justify-end gap-3">
              <button 
                onClick={() => {
                  const text = exportTemplate === 'DATEV' ? getDATEVPreview() : (exportTemplate === 'BMD' ? getBMDPreview() : getCSVPreview());
                  const blob = new Blob([text], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `payroll-export-${exportTemplate.toLowerCase()}-june2026.txt`;
                  a.click();
                  addLog('Export File', `Successfully generated and downloaded ${exportTemplate} formatted payroll statements.`);
                  setShowExportModal(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Download File (.TXT/.CSV)</span>
              </button>
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-[#EAE4DC] text-slate-700 text-sm rounded-lg hover:bg-[#FAF9F7] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
