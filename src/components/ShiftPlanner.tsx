/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Plus, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  ChevronDown, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  X, 
  Award, 
  Briefcase, 
  Smartphone, 
  MapPin, 
  QrCode, 
  Trash2, 
  Mail, 
  Phone, 
  Check, 
  AlertCircle,
  AlertTriangle,
  Search,
  Eye,
  Download,
  HelpCircle,
  Star,
  Info,
  Pencil,
  Calendar,
  UserPlus,
  Save,
  Inbox,
  ArrowLeftRight,
  Upload,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Payroll from './Payroll';
import DatePicker from './DatePicker';
import { SmartBulkOnboardingModal } from './SmartBulkOnboardingModal';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: 'Full-time' | 'Part-time' | 'Minijob';
  email: string;
  phone: string;
  avatar: string;
  hourlyRate: number;
  availableHours: string;
  isActive?: boolean;
  department?: string;
  branch?: string;
  fwhaBalance?: number;

  // New detailed professional profiles
  address?: string;
  dob?: string;
  gender?: string;
  nationality?: string;

  // Employment info
  systemAccessLevel?: 'Super Admin' | 'Manager' | 'Employee';
  systemPermissions?: string[];
  assignedStores?: string[];
  startDate?: string;
  exitDate?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Minijob';
  contractHours?: number;
  grossAgreement?: number;
  annualLeaveEntitlement?: number;
  contractPreparationStatus?: 'tbd' | 'yes' | 'no';
  contractSigningStatus?: 'tbd' | 'yes' | 'no';
  sundayOffCountOfYear?: number;

  // Salary & compensation
  salaryType?: 'Hourly' | 'Fixed Monthly';
  salaryAmount?: number;
  currency?: 'EUR' | 'USD';
  payFrequency?: 'Monthly' | 'Weekly';
  effectiveDate?: string;
  compensationNotes?: string;
  includeInPayroll?: boolean;

  // Tax & insurance info
  taxClass?: string;
  socialSecurityNumber?: string;
  personalTaxId?: string;
  healthInsuranceProvider?: string;
  insuranceSepa?: 'yes' | 'no';
  idWithResidencePermit?: 'yes' | 'no';
  residencePermitExpiryDate?: string;
  dependentAllowance?: string;
}

interface RoleItem {
  id: string;
  name: string;
  description: string;
  users: number;
  status: 'Active' | 'Inactive';
  lastUpdated: string;
}

const initialStaff: StaffMember[] = [
  { id: '1', name: 'Nguyen An', role: 'Operation', status: 'Full-time', email: 'nguyen.an@johnsbistro.com', phone: '090-111-2222', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80', hourlyRate: 35, availableHours: '24/7 On call', isActive: true, department: 'Operation', branch: 'HCM 1', fwhaBalance: 12.5 },
  { id: '2', name: 'Tran Binh', role: 'HR', status: 'Full-time', email: 'tran.binh@johnsbistro.com', phone: '090-333-4444', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80', hourlyRate: 20, availableHours: '9:00 - 17:00', isActive: true, department: 'HR', branch: 'HQ', fwhaBalance: -4.0 },
  { id: '3', name: 'Le Chi', role: 'Sales', status: 'Full-time', email: 'le.chi@johnsbistro.com', phone: '090-555-6666', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=85', hourlyRate: 25, availableHours: 'Mon-Fri 8:00 - 16:00', isActive: true, department: 'Sales', branch: 'HN 1', fwhaBalance: 8.0 },
  { id: '4', name: 'Pham Dung', role: 'Operation', status: 'Part-time', email: 'pham.dung@johnsbistro.com', phone: '090-777-8888', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a65c6?w=100&h=100&fit=crop&q=80', hourlyRate: 22, availableHours: 'Flexible check-in', isActive: false, department: 'Operation', branch: 'HCM 2', fwhaBalance: 0.0 },
  { id: '5', name: 'Hoang Em', role: 'Kitchen', status: 'Full-time', email: 'hoang.em@johnsbistro.com', phone: '090-999-0000', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80', hourlyRate: 18, availableHours: 'Mornings daily', isActive: true, department: 'Kitchen', branch: 'HCM 1', fwhaBalance: -2.5 },
  { id: '6', name: 'Vu Giang', role: 'Bar', status: 'Part-time', email: 'vu.giang@johnsbistro.com', phone: '090-123-5555', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80', hourlyRate: 16, availableHours: 'Flexible check-in', isActive: true, department: 'Bar', branch: 'HCM 2', fwhaBalance: 5.0 },
  { id: '7', name: 'Doan Trang', role: 'HR', status: 'Full-time', email: 'doan.trang@johnsbistro.com', phone: '090-555-5555', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80', hourlyRate: 22, availableHours: 'Mornings daily', isActive: true, department: 'HR', branch: 'HQ', fwhaBalance: 0.0 },
  { id: '8', name: 'Tran Long', role: 'Sales', status: 'Part-time', email: 'tran.long@johnsbistro.com', phone: '090-666-6666', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80', hourlyRate: 19, availableHours: 'Flexible check-in', isActive: true, department: 'Sales', branch: 'HN 1', fwhaBalance: -1.5 },
  { id: '9', name: 'Vo Hoang', role: 'Operation', status: 'Full-time', email: 'vo.hoang@johnsbistro.com', phone: '090-777-1111', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80', hourlyRate: 21, availableHours: 'Flexible check-in', isActive: true, department: 'Operation', branch: 'HCM 1', fwhaBalance: 15.0 },
  { id: '10', name: 'Ngo Quynh', role: 'Kitchen', status: 'Part-time', email: 'ngo.quynh@johnsbistro.com', phone: '090-888-2222', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80', hourlyRate: 17, availableHours: 'Mornings daily', isActive: true, department: 'Kitchen', branch: 'HCM 1', fwhaBalance: -6.0 },
];

const initialRoles: RoleItem[] = [
  { id: '5', name: 'Shift Supervisor', description: 'Oversee shifts, staff check-ins and daily task assignments.', users: 18, status: 'Active', lastUpdated: 'May 8, 2024 11:05 AM' },
  { id: '6', name: 'Accountant', description: 'Manage financial records, payroll and accounting reports.', users: 4, status: 'Active', lastUpdated: 'May 6, 2024 03:30 PM' },
  { id: '7', name: 'Cashier', description: 'Handle billing, payments and generate receipts.', users: 22, status: 'Active', lastUpdated: 'May 5, 2024 10:10 AM' },
  { id: '8', name: 'Kitchen Staff', description: 'View kitchen orders and update order status.', users: 35, status: 'Inactive', lastUpdated: 'May 3, 2024 05:25 PM' },
  { id: '9', name: 'Waiter / Waitress', description: 'View assigned orders and update service status.', users: 42, status: 'Active', lastUpdated: 'May 1, 2024 01:15 PM' },
  { id: '10', name: 'Host / Hostess', description: 'Manage reservations and greet customers.', users: 6, status: 'Active', lastUpdated: 'Apr 30, 2024 09:40 AM' },
  { id: '11', name: 'Bartender', description: 'Prepare drinks, manage bar inventory, and serve counter customers.', users: 10, status: 'Active', lastUpdated: 'Apr 28, 2024 08:30 PM' },
  { id: '12', name: 'Sous Chef', description: 'Assist the head chef in kitchen management and portion control.', users: 5, status: 'Active', lastUpdated: 'Apr 25, 2024 11:20 AM' },
  { id: '13', name: 'Delivery Rider', description: 'Deliver food orders safely and efficiently to clients.', users: 15, status: 'Active', lastUpdated: 'Apr 22, 2024 02:00 PM' },
  { id: '14', name: 'Security Staff', description: 'Ensure the safety of guests, staff, and restaurant property.', users: 3, status: 'Inactive', lastUpdated: 'Apr 20, 2024 10:15 AM' },
  { id: '15', name: 'Dishwasher', description: 'Clean dishes, kitchenware, and maintain restaurant sanitation.', users: 8, status: 'Active', lastUpdated: 'Apr 18, 2024 04:35 PM' }
];

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayNumbers = [25, 26, 27, 28, 29, 30, 31];

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Compact programmatic seed for cell assignments
const initialSchedule: { [key: string]: string[] } = {};
const scheduleData: { [shift: string]: { [dept: string]: string[][] } } = {
  morning: {
    Service: [['Alice Johnson', 'David Lee'], ['Alice Johnson', 'Michael Brown'], ['Alice Johnson', 'David Lee'], ['Alice Johnson', 'Sarah Wilson'], ['David Lee', 'Michael Brown'], ['Alice Johnson', 'David Lee'], ['Michael Brown']],
    Kitchen: [['John Smith', 'Emily Davis'], ['John Smith', 'Emily Davis'], ['John Smith', 'Michael Brown'], ['John Smith', 'Emily Davis'], ['John Smith', 'Emily Davis'], ['John Smith', 'Michael Brown'], ['Emily Davis']],
    Bar: [['James Taylor', 'Michael Brown'], ['James Taylor', 'Michael Brown'], ['James Taylor'], ['James Taylor', 'David Lee'], ['James Taylor', 'Michael Brown'], ['David Lee'], []],
    Management: [['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], []],
  },
  evening: {
    Service: [['David Lee', 'Sarah Wilson'], ['David Lee', 'James Taylor'], ['David Lee', 'Sarah Wilson'], ['David Lee', 'James Taylor'], ['Alice Johnson', 'Sarah Wilson'], ['David Lee', 'James Taylor'], ['Sarah Wilson']],
    Kitchen: [['Emily Davis', 'Michael Brown'], ['Emily Davis', 'John Smith'], ['Emily Davis', 'Michael Brown'], ['Emily Davis', 'John Smith'], ['Emily Davis', 'Michael Brown'], ['Emily Davis', 'John Smith'], ['John Smith']],
    Bar: [['Michael Brown', 'James Taylor'], ['Michael Brown', 'James Taylor'], ['Michael Brown'], ['Michael Brown', 'James Taylor'], ['Michael Brown', 'James Taylor'], ['Michael Brown'], []],
    Management: [['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], ['Sarah Wilson'], []]
  }
};

// Seed into easily lookup keys "shiftType-deptType-day"
Object.keys(scheduleData).forEach((shift) => {
  Object.keys(scheduleData[shift]).forEach((dept) => {
    weekdays.forEach((day, index) => {
      const key = `${shift}-${dept}-${day}`;
      initialSchedule[key] = scheduleData[shift][dept][index] || [];
    });
  });
});

interface CalendarDay {
  dayNumber: number;
  month: 'current' | 'previous' | 'next';
  weekday: string;
  isToday?: boolean;
}

const calendarWeeks: CalendarDay[][] = [
  [
    { dayNumber: 27, month: 'previous', weekday: 'Sun' },
    { dayNumber: 28, month: 'previous', weekday: 'Mon' },
    { dayNumber: 29, month: 'previous', weekday: 'Tue' },
    { dayNumber: 30, month: 'previous', weekday: 'Wed' },
    { dayNumber: 1, month: 'current', weekday: 'Thu' },
    { dayNumber: 2, month: 'current', weekday: 'Fri' },
    { dayNumber: 3, month: 'current', weekday: 'Sat' }
  ],
  [
    { dayNumber: 4, month: 'current', weekday: 'Sun' },
    { dayNumber: 5, month: 'current', weekday: 'Mon' },
    { dayNumber: 6, month: 'current', weekday: 'Tue' },
    { dayNumber: 7, month: 'current', weekday: 'Wed' },
    { dayNumber: 8, month: 'current', weekday: 'Thu' },
    { dayNumber: 9, month: 'current', weekday: 'Fri' },
    { dayNumber: 10, month: 'current', weekday: 'Sat' }
  ],
  [
    { dayNumber: 11, month: 'current', weekday: 'Sun' },
    { dayNumber: 12, month: 'current', weekday: 'Mon' },
    { dayNumber: 13, month: 'current', weekday: 'Tue' },
    { dayNumber: 14, month: 'current', weekday: 'Wed' },
    { dayNumber: 15, month: 'current', weekday: 'Thu' },
    { dayNumber: 16, month: 'current', weekday: 'Fri' },
    { dayNumber: 17, month: 'current', weekday: 'Sat' }
  ],
  [
    { dayNumber: 18, month: 'current', weekday: 'Sun' },
    { dayNumber: 19, month: 'current', weekday: 'Mon' },
    { dayNumber: 20, month: 'current', weekday: 'Tue' },
    { dayNumber: 21, month: 'current', weekday: 'Wed' },
    { dayNumber: 22, month: 'current', weekday: 'Thu' },
    { dayNumber: 23, month: 'current', weekday: 'Fri' },
    { dayNumber: 24, month: 'current', weekday: 'Sat' }
  ],
  [
    { dayNumber: 25, month: 'current', weekday: 'Sun', isToday: true },
    { dayNumber: 26, month: 'current', weekday: 'Mon' },
    { dayNumber: 27, month: 'current', weekday: 'Tue' },
    { dayNumber: 28, month: 'current', weekday: 'Wed' },
    { dayNumber: 29, month: 'current', weekday: 'Thu' },
    { dayNumber: 30, month: 'current', weekday: 'Fri' },
    { dayNumber: 31, month: 'current', weekday: 'Sat' }
  ]
];

const isUnder18 = (dobString: string): boolean => {
  if (!dobString) return false;
  const parts = dobString.split('-');
  if (parts.length === 3) {
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
      return age < 18;
    }
  }
  return false;
};

const isPermitExpired = (member: any): boolean => {
  if (!member || !member.residencePermitExpiryDate) return false;
  const nationality = member.nationality || '';
  const isNonEU = nationality && !['german', 'german/eu', 'bulgarian', 'french', 'polish', 'eu', 'germany', 'bulgaria'].includes(nationality.toLowerCase().trim());
  if (!isNonEU) return false;
  
  const expiryDate = new Date(member.residencePermitExpiryDate);
  const today = new Date();
  today.setHours(0,0,0,0);
  return expiryDate < today;
};

const isPermitExpiringSoon = (member: any): boolean => {
  if (!member || !member.residencePermitExpiryDate) return false;
  const nationality = member.nationality || '';
  const isNonEU = nationality && !['german', 'german/eu', 'bulgarian', 'french', 'polish', 'eu', 'germany', 'bulgaria'].includes(nationality.toLowerCase().trim());
  if (!isNonEU) return false;
  
  const expiryDate = new Date(member.residencePermitExpiryDate);
  const today = new Date();
  today.setHours(0,0,0,0);
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 7;
};

function MultiSelectDropdown({ 
  label, 
  options, 
  selectedValues, 
  onChange,
  placeholder = "Select options..." 
}: { 
  label: string; 
  options: { value: string; label: string }[]; 
  selectedValues: string[]; 
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter(v => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const displayText = selectedValues.length > 0 
    ? options.filter(o => selectedValues.includes(o.value)).map(o => o.label).join(', ')
    : placeholder;

  return (
    <div className="space-y-1 relative font-sans" ref={containerRef}>
      <label className="text-[14px] font-semibold text-slate-700 block">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 flex items-center justify-between shadow-3xs cursor-pointer hover:border-slate-300 transition-colors"
      >
        <span className="truncate pr-4 text-slate-700">{displayText}</span>
        <ChevronDown className={`w-4 h-4 text-slate-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto p-2 space-y-1">
          {options.map((opt) => {
            const isChecked = selectedValues.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer text-[14px] text-slate-700 font-medium select-none transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(opt.value)}
                  className="rounded border-slate-300 text-[#7553FF] focus:ring-[#7553FF] w-4 h-4 cursor-pointer animate-none"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

const getProportionalLeave = (user: any) => {
  if (!user || !user.startDate) return null;
  const d = new Date(user.startDate);
  if (isNaN(d.getTime())) return null;
  
  const year = d.getFullYear();
  const currentYear = new Date().getFullYear();
  
  if (year === currentYear) {
    const month = d.getMonth() + 1; // 1-indexed (Jan = 1, Dec = 12)
    const remainingMonths = 12 - month + 1;
    const annual = user.annualLeaveEntitlement || 24;
    return parseFloat(((annual / 12) * remainingMonths).toFixed(1));
  }
  return null;
};

interface ShiftPlannerProps {
  initialSubTab?: 'schedule' | 'staff' | 'payroll' | 'settings';
  staff?: any[];
  setStaff?: React.Dispatch<React.SetStateAction<any[]>>;
  simulatedUser?: any;
}

export default function ShiftPlanner({ initialSubTab = 'schedule', staff: propsStaff, setStaff: propsSetStaff, simulatedUser }: ShiftPlannerProps) {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'staff' | 'payroll' | 'settings'>(initialSubTab);

  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);
  const [schedule, setSchedule] = useState<Record<string, string[]>>(initialSchedule);

  // Rule: Employee Access & Branch limitations (PRD-002)
  const userStores = React.useMemo(() => {
    const roleName = simulatedUser?.role || 'Staff';
    if (roleName.toLowerCase() === 'owner' || simulatedUser?.systemAccessLevel === 'Admin') {
      return ['HCM 1', 'HCM 2', 'HN 1', 'HQ'];
    }
    try {
      const customRolesStr = localStorage.getItem('gastro_custom_roles');
      if (customRolesStr) {
        const customRoles = JSON.parse(customRolesStr);
        const matched = customRoles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
        if (matched) {
          if (matched.dataScope === 'Brand-wide') {
            return ['HCM 1', 'HCM 2', 'HN 1', 'HQ'];
          } else {
            return simulatedUser?.assignedStores || (simulatedUser?.branch ? [simulatedUser.branch] : ['HCM 1']);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return simulatedUser?.assignedStores || (simulatedUser?.branch ? [simulatedUser.branch] : ['HCM 1']);
  }, [simulatedUser]);

  const [specialRetroBypass, setSpecialRetroBypass] = useState(false);

  const isSuperAdmin = React.useMemo(() => {
    if (specialRetroBypass) return true;
    const roleName = simulatedUser?.role || 'Staff';
    if (roleName.toLowerCase() === 'owner' || simulatedUser?.systemAccessLevel === 'Admin') {
      return true;
    }
    try {
      const customRolesStr = localStorage.getItem('gastro_custom_roles');
      if (customRolesStr) {
        const customRoles = JSON.parse(customRolesStr);
        const matched = customRoles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
        if (matched && matched.dataScope === 'Brand-wide') {
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  }, [simulatedUser, specialRetroBypass]);

  const [activePlanningBranch, setActivePlanningBranch] = useState<string>(() => {
    if (simulatedUser) {
      const stores = simulatedUser.assignedStores || (simulatedUser.branch ? [simulatedUser.branch] : []);
      if (stores.length > 0) return stores[0];
    }
    return 'HCM 1'; // default fallback
  });

  useEffect(() => {
    if (userStores && userStores.length > 0) {
      if (!userStores.includes(activePlanningBranch)) {
        setActivePlanningBranch(userStores[0]);
      }
    }
  }, [userStores, activePlanningBranch]);

  const [retroToast, setRetroToast] = useState<{ show: boolean; message: string } | null>(null);
  const [showRetroactiveModal, setShowRetroactiveModal] = useState<{ shift: 'morning' | 'evening'; dept: string; day: string } | null>(null);
  const [activeDay, setActiveDay] = useState<string>('Mon');
  const [scheduleViewMode, setScheduleViewMode] = useState<'week' | 'month'>('week');
  const [selectedMonthDay, setSelectedMonthDay] = useState<CalendarDay>({ dayNumber: 25, month: 'current', weekday: 'Sun', isToday: true });
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const getDayShiftsCount = (dayName: string) => {
    let morningCount = 0;
    let eveningCount = 0;
    ['Service', 'Kitchen', 'Bar', 'Management'].forEach((dept) => {
      if (scheduleDepartmentFilter === 'All' || dept === scheduleDepartmentFilter) {
        if (scheduleShiftFilter === 'All' || scheduleShiftFilter === 'Morning') {
          morningCount += (schedule[`morning-${dept}-${dayName}`] || []).length;
        }
        if (scheduleShiftFilter === 'All' || scheduleShiftFilter === 'Evening') {
          eveningCount += (schedule[`evening-${dept}-${dayName}`] || []).length;
        }
      }
    });
    return { morningCount, eveningCount, total: morningCount + eveningCount };
  };

  const [localStaff, setLocalStaff] = useState<StaffMember[]>(initialStaff);
  const staff = propsStaff || localStaff;
  const setStaff = propsSetStaff || setLocalStaff;
  const [isAutoAssigning, setIsAutoAssigning] = useState(false);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [savePlanSuccess, setSavePlanSuccess] = useState(false);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // For dynamic date swapping demo
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);

  const getDayNumbersForWeek = (weekIdx: number) => {
    // Base date is May 25, 2025 (Sunday)
    const baseDate = new Date(2025, 4, 25);
    baseDate.setDate(baseDate.getDate() + weekIdx * 7);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      days.push(d.getDate());
    }
    return days;
  };

  const getWeekLabel = (weekIdx: number) => {
    const baseDate = new Date(2025, 4, 25);
    baseDate.setDate(baseDate.getDate() + weekIdx * 7);
    const endDate = new Date(baseDate);
    endDate.setDate(baseDate.getDate() + 6);
    
    const formatMonth = (date: Date) => date.toLocaleString('en-US', { month: 'short' });
    return `${formatMonth(baseDate)} ${baseDate.getDate()} – ${formatMonth(endDate)} ${endDate.getDate()}, ${baseDate.getFullYear()}`;
  };

  const isPastDay = (day: string) => {
    if (currentWeekIndex < 0) return true;
    if (currentWeekIndex > 0) return false;
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = 3; // Wednesday is today
    const dayIndex = dayNames.indexOf(day);
    return dayIndex < currentDayIndex;
  };

  // Dynamic filter states for the Shift Planner main view
  const [scheduleDepartmentFilter, setScheduleDepartmentFilter] = useState<string>('All');
  const [scheduleShiftFilter, setScheduleShiftFilter] = useState<string>('All');

  // Assign Staff Modal states
  const [showAssignStaffModal, setShowAssignStaffModal] = useState(false);
  const [modalStoreFilter, setModalStoreFilter] = useState('All Stores');
  const [modalDateRange, setModalDateRange] = useState('Jun 8 - Jun 14, 2026');
  const [modalShiftFilter, setModalShiftFilter] = useState('All Shifts');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  
  // Custom mock list of all 24 staff members to mimic the image beautifully
  const initialModalStaff = [
    { id: 'm-1', name: 'James Smith', role: 'Manager', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-2', name: 'Michael Brown', role: 'Chef', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-3', name: 'Emily Davis', role: 'Server', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-4', name: 'David Wilson', role: 'Barista', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-5', name: 'Sarah Johnson', role: 'Server', availability: 'Partially available', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-6', name: 'Jessica Lee', role: 'Server', availability: 'Unavailable', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-7', name: 'Daniel Martinez', role: 'Runner', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-8', name: 'Olivia Thompson', role: 'Host', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-9', name: 'John Doe', role: 'Sous Chef', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-10', name: 'Jane Miller', role: 'Pastry Chef', availability: 'Partially available', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-11', name: 'Robert Wilson', role: 'Dishwasher', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-12', name: 'Sophia Taylor', role: 'Bartender', availability: 'Unavailable', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-13', name: 'William Anderson', role: 'Server', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-14', name: 'Isabella Thomas', role: 'Sommelier', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-15', name: 'David Martin', role: 'Assistant Manager', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-16', name: 'Mia Garcia', role: 'Cashier', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-17', name: 'James Rodriguez', role: 'Kitchen Helper', availability: 'Partially available', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-18', name: 'Charlotte Lopez', role: 'Receptionist', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-19', name: 'Benjamin Lee', role: 'Security', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-20', name: 'Lucas Scott', role: 'Server', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-21', name: 'Zoe Baker', role: 'Server', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-22', name: 'Harper Hill', role: 'Barback', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-23', name: 'Alexander Young', role: 'Cook', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1484186139897-d5fc6b908812?w=150&auto=format&fit=crop&q=80' },
    { id: 'm-24', name: 'Evelyn King', role: 'Host', availability: 'Available', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&auto=format&fit=crop&q=80' }
  ];

  const [modalSelectedStaff, setModalSelectedStaff] = useState<string[]>(['m-1', 'm-2', 'm-4']);

  // Dynamic set of selected shifts to enable removals & additions
  const [modalSelectedShifts, setModalSelectedShifts] = useState([
    { id: 'sh-1', day: 'Mon, Jun 8', name: 'Morning (07:00 - 15:00)', dotColor: '#F97316', label: 'Min 3 / Max 6 staff' },
    { id: 'sh-2', day: 'Tue, Jun 9', name: 'Afternoon (11:00 - 19:00)', dotColor: '#EAB308', label: 'Min 3 / Max 6 staff' },
    { id: 'sh-3', day: 'Fri, Jun 12', name: 'Evening (15:00 - 23:00)', dotColor: '#6366F1', label: 'Min 3 / Max 6 staff' }
  ]);

  // Settings Modal states
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [shiftTypes, setShiftTypes] = useState([
    { id: 'st-1', name: 'Morning', time: '07:00 - 15:00', minStaff: 3, maxStaff: 6 },
    { id: 'st-2', name: 'Afternoon', time: '11:00 - 19:00', minStaff: 3, maxStaff: 6 },
    { id: 'st-3', name: 'Evening', time: '15:00 - 23:00', minStaff: 3, maxStaff: 6 },
    { id: 'st-4', name: 'Late Night', time: '19:00 - 03:00 (+1)', minStaff: 2, maxStaff: 4 },
  ]);

  const [weeklyDaysOff, setWeeklyDaysOff] = useState([
    { id: 'wd-1', day: 'Sunday', isOff: true },
    { id: 'wd-2', day: 'Monday', isOff: false },
    { id: 'wd-3', day: 'Tuesday', isOff: false },
    { id: 'wd-4', day: 'Wednesday', isOff: false },
    { id: 'wd-5', day: 'Thursday', isOff: false },
    { id: 'wd-6', day: 'Friday', isOff: false },
    { id: 'wd-7', day: 'Saturday', isOff: false }
  ]);

  const [flexibleDaysOff, setFlexibleDaysOff] = useState([
    { id: 'fd-1', date: 'May 20, 2026 (Tue)', reason: 'Company retreat' },
    { id: 'fd-2', date: 'Jun 17, 2026 (Wed)', reason: 'Public holiday' },
    { id: 'fd-3', date: 'Dec 25, 2026 (Fri)', reason: 'Christmas Day' }
  ]);


  // Global settings local state
  const [geofenceRadius, setGeofenceRadius] = useState(300);
  const [enableAIAuto, setEnableAIAuto] = useState(true);
  const [maxWeeklyHours, setMaxWeeklyHours] = useState(40);
  const [allowOvertime, setAllowOvertime] = useState(true);

  // Upgrade Plan Dialog
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Pending Requests State
  const [showPendingRequestsModal, setShowPendingRequestsModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'requests' | 'warnings'>('requests');
  const [pendingStoreFilter, setPendingStoreFilter] = useState('All Stores');
  const [pendingTypeFilter, setPendingTypeFilter] = useState('All types');
  const [pendingStatusFilter, setPendingStatusFilter] = useState('All status');
  const [pendingSearchQuery, setPendingSearchQuery] = useState('');
  const [activePendingPage, setActivePendingPage] = useState(1);
  const [isAIResolving, setIsAIResolving] = useState(false);
  const [aiResolveMessage, setAiResolveMessage] = useState('');
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [selectedPendingIds, setSelectedPendingIds] = useState<string[]>([]);
  const [expandedAnalysisIds, setExpandedAnalysisIds] = useState<string[]>([]);
  const [pendingRequestsList, setPendingRequestsList] = useState([
    {
      id: 'SR-250608-01',
      type: 'Swap Shift Request',
      name: 'David Wilson',
      dateRange: 'Jun 10',
      color: 'pink',
      requestType: 'Swap shift',
      typeText: 'Swap',
      staffName: 'David Wilson',
      staffRole: 'Barista',
      staffAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      details: 'From: Wed, Jun 10 • Evening (15:00 - 23:00)\nTo: Thu, Jun 11 • Evening (15:00 - 23:00)',
      requestTime: '10 mins ago',
      requestDate: 'Jun 8, 2026 09:41',
      status: 'PENDING',
      store: 'HQ Store',
      analysis: 'Highly recommended to APPROVED. Both David Wilson and candidate support are under weekly hour limits; zero coverage conflicts exist.'
    },
    {
      id: 'TO-250608-02',
      type: 'Time Off Request',
      name: 'Emily Davis',
      dateRange: 'Jun 12',
      color: 'pink',
      requestType: 'Time off',
      typeText: 'Time off',
      staffName: 'Emily Davis',
      staffRole: 'Server',
      staffAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      details: 'Fri, Jun 12 • Morning (07:00 - 15:00)',
      requestTime: '1 hour ago',
      requestDate: 'Jun 8, 2026 08:35',
      status: 'PENDING',
      store: 'Vinh Store',
      analysis: 'Safe to APPROVED. Completely backfilled & optimized with Sarah Wilson; morning department roster retains 100% service capability.'
    },
    {
      id: 'SR-250608-03',
      type: 'Swap Shift Request',
      name: 'Michael Brown',
      dateRange: 'Jun 8',
      color: 'orange',
      requestType: 'Swap shift',
      typeText: 'Swap',
      staffName: 'Michael Brown',
      staffRole: 'Chef',
      staffAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      details: 'From: Mon, Jun 8 • Morning (07:00 - 15:00)\nTo: Mon, Jun 8 • Evening (15:00 - 23:00)',
      requestTime: '2 hours ago',
      requestDate: 'Jun 8, 2026 07:22',
      status: 'PENDING',
      store: 'HQ Store',
      analysis: 'Safe to APPROVED. Swapping morning and evening shifts keeps chefs hours stable. Food safety & budget caps are 100% compliant.'
    },
    {
      id: 'TO-250607-04',
      type: 'Time Off Request',
      name: 'Sarah Johnson',
      dateRange: 'Jun 14',
      color: 'pink',
      requestType: 'Time off',
      typeText: 'Time off',
      staffName: 'Sarah Johnson',
      staffRole: 'Server',
      staffAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      details: 'Sat, Jun 14 • All day',
      requestTime: '1 day ago',
      requestDate: 'Jun 7, 2026 21:15',
      status: 'PENDING',
      store: 'Vinh Store',
      analysis: 'Recommended to APPROVED. Remaining roster provides more than minimum scheduled support on active floor.'
    },
    {
      id: 'SR-250607-05',
      type: 'Swap Shift Request',
      name: 'Olivia Thompson',
      dateRange: 'Jun 9',
      color: 'orange',
      requestType: 'Swap shift',
      typeText: 'Swap',
      staffName: 'Olivia Thompson',
      staffRole: 'Host',
      staffAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&auto=format&fit=crop&q=80',
      details: 'From: Tue, Jun 9 • Afternoon (11:00 - 19:00)\nTo: Tue, Jun 9 • Evening (15:00 - 23:00)',
      requestTime: '2 days ago',
      requestDate: 'Jun 6, 2026 18:40',
      status: 'PENDING',
      store: 'HQ Store',
      analysis: 'Recommended to APPROVED. Adequate and fully responsive front host density certified; guest checkins won\'t face bottlenecks.'
    },
    {
      id: 'TO-250606-06',
      type: 'Time Off Request',
      name: 'James Smith',
      dateRange: 'Jun 15',
      color: 'pink',
      requestType: 'Time off',
      typeText: 'Time off',
      staffName: 'James Smith',
      staffRole: 'Manager',
      staffAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      details: 'Sun, Jun 15 • All day',
      requestTime: '3 days ago',
      requestDate: 'Jun 5, 2026 16:05',
      status: 'PENDING',
      store: 'HQ Store',
      analysis: 'Safe to APPROVED. Management delegation is mapped cleanly to assistant supervisor on active Sunday shift.'
    }
  ]);
  // Toggle metrics view state
  const [showMetrics, setShowMetrics] = useState(false);
  // Create Custom Shift Dialog / Cell Editing
  const [editingCell, setEditingCell] = useState<{ shift: 'morning' | 'evening'; dept: string; day: string } | null>(null);

  // Leave & Conflict Intersector State
  const [leaveLedger, setLeaveLedger] = useState<any[]>(() => {
    const cached = localStorage.getItem('gastro_leave_ledger');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return [
      { id: 'l-1', staffName: 'Nguyen An', day: 'Wed', shift: 'evening', status: 'Approved', reason: 'Family event' },
      { id: 'l-2', staffName: 'Le Chi', day: 'Fri', shift: 'morning', status: 'Approved', reason: 'Medical appointment' },
      { id: 'l-3', staffName: 'Alice Johnson', day: 'Mon', shift: 'morning', status: 'Approved', reason: 'Annual Leave' },
      { id: 'l-4', staffName: 'Emily Davis', day: 'Thu', shift: 'evening', status: 'Approved', reason: 'Personal business' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('gastro_leave_ledger', JSON.stringify(leaveLedger));
  }, [leaveLedger]);

  // Alert for closed dates
  const [closureAlert, setClosureAlert] = useState<string | null>(null);

  // Helper: check if a day is closed as a Whole Day
  const isDayClosed = (dayName: string) => {
    const dayMapping: Record<string, string> = {
      'Sun': 'Sunday',
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };
    const fullDayName = dayMapping[dayName] || dayName;
    const weeklyOff = weeklyDaysOff.find(wd => wd.day === fullDayName);
    if (weeklyOff && weeklyOff.isOff && (!weeklyOff.timeframe || weeklyOff.timeframe.trim() === '')) {
      return true;
    }

    const hasFlexOffWholeDay = flexibleDaysOff.some(fd => 
      (fd.date.includes(`(${dayName})`) || fd.date.includes(fullDayName)) && 
      (!fd.timeframe || fd.timeframe.trim() === '')
    );
    if (hasFlexOffWholeDay) return true;

    return false;
  };

  // Helper functions for parsing shift/day-off timeframes and checking overlaps (PRD-002)
  const parseTimeRange = (range: string) => {
    if (!range) return null;
    const parts = range.split('-');
    if (parts.length !== 2) return null;
    const parseTime = (t: string) => {
      let clean = t.trim();
      if (clean.includes('(+1)')) {
        clean = clean.replace('(+1)', '').trim();
        const [h, m] = clean.split(':').map(Number);
        return (h + 24) * 60 + (m || 0);
      }
      const [h, m] = clean.split(':').map(Number);
      return h * 60 + (m || 0);
    };
    let start = parseTime(parts[0]);
    let end = parseTime(parts[1]);
    if (end < start) {
      end += 24 * 60; // crossovers midnight
    }
    return { start, end };
  };

  const isShiftOverlappingWithDayOff = (shiftTimeRange: string, dayOffTimeRange: string | undefined) => {
    if (!dayOffTimeRange || dayOffTimeRange.trim() === '') return true; // Whole Day
    const shiftRange = parseTimeRange(shiftTimeRange);
    const offRange = parseTimeRange(dayOffTimeRange);
    if (!shiftRange || !offRange) return false;
    return shiftRange.start < offRange.end && offRange.start < shiftRange.end;
  };

  const getShiftTimeRange = (shiftName: string): string => {
    const st = shiftTypes.find(s => s.name.toLowerCase() === shiftName.toLowerCase());
    return st ? st.time : '';
  };

  const isShiftClosed = (dayName: string, shiftName: string) => {
    const dayMapping: Record<string, string> = {
      'Sun': 'Sunday',
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };
    const fullDayName = dayMapping[dayName] || dayName;
    const shiftTime = getShiftTimeRange(shiftName);

    // 1. Check Weekly Days Off (Recurring)
    const weeklyOff = weeklyDaysOff.find(wd => wd.day === fullDayName);
    if (weeklyOff && weeklyOff.isOff) {
      if (!weeklyOff.timeframe || weeklyOff.timeframe.trim() === '') {
        return true; // Whole day off
      }
      if (shiftTime && isShiftOverlappingWithDayOff(shiftTime, weeklyOff.timeframe)) {
        return true; // Overlaps with timeframe
      }
    }

    // 2. Check Flexible Days Off (One-off)
    const flexOffs = flexibleDaysOff.filter(fd => fd.date.includes(`(${dayName})`) || fd.date.includes(fullDayName));
    for (const fd of flexOffs) {
      if (!fd.timeframe || fd.timeframe.trim() === '') {
        return true; // Whole day off
      }
      if (shiftTime && isShiftOverlappingWithDayOff(shiftTime, fd.timeframe)) {
        return true; // Overlaps with timeframe
      }
    }

    return false;
  };

  // Automated effect: clear shifts on days marked as closed or overlapping timeframe (PRD-002)
  useEffect(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let scheduleChanged = false;
    const updatedSchedule = { ...schedule };
    
    days.forEach(day => {
      if (isDayClosed(day)) {
        // Clear whole day
        Object.keys(updatedSchedule).forEach(key => {
          if (key.endsWith(`-${day}`) || key.endsWith(`-${day}-${activePlanningBranch}`)) {
            if (updatedSchedule[key] && updatedSchedule[key].length > 0) {
              updatedSchedule[key] = [];
              scheduleChanged = true;
            }
          }
        });
      } else {
        // Clear only overlapping timeframe shifts
        Object.keys(updatedSchedule).forEach(key => {
          const parts = key.split('-'); // shift-dept-day or shift-dept-day-branch
          const shiftName = parts[0];
          const dayName = parts[2];
          if (dayName === day && isShiftClosed(day, shiftName)) {
            if (updatedSchedule[key] && updatedSchedule[key].length > 0) {
              updatedSchedule[key] = [];
              scheduleChanged = true;
            }
          }
        });
      }
    });

    if (scheduleChanged) {
      setSchedule(updatedSchedule);
    }
  }, [weeklyDaysOff, flexibleDaysOff, activePlanningBranch]);
  
  // Mobile Demo / QR Kiosk Modal Toggle
  const [showEmulator, setShowEmulator] = useState(false);
  const [qrCodeSalt, setQrCodeSalt] = useState('VERIFY-772A-98F');
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [gpsError, setGpsError] = useState(false);

  // Staff list filters and user creation state
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [addStaffActiveTab, setAddStaffActiveTab] = useState<'personal' | 'login' | 'employment' | 'tax'>('personal');
  const [editStaffActiveTab, setEditStaffActiveTab] = useState<'personal' | 'login' | 'employment' | 'tax'>('personal');
  const [isSmartImportOpen, setIsSmartImportOpen] = useState(false);
  const [selectedUserForView, setSelectedUserForView] = useState<StaffMember | null>(null);
  const [staffInnerTab, setStaffInnerTab] = useState<'staff' | 'roles'>('staff');
  const [roleFilter, setRoleFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [staffPage, setStaffPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);
  const [bulkStoreDropdownOpen, setBulkStoreDropdownOpen] = useState(false);
  const [bulkContractDropdownOpen, setBulkContractDropdownOpen] = useState(false);
  const [bulkJobRoleDropdownOpen, setBulkJobRoleDropdownOpen] = useState(false);
  const [bulkStatusDropdownOpen, setBulkStatusDropdownOpen] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
    status: 'Full-time' as 'Full-time' | 'Part-time' | 'Minijob',
    phone: '',
    hourlyRate: '20',
    availableHours: 'Flexible check-in',
    isActive: true,
    dob: '',
    gender: 'Male',
    photo: '',
    address: '',
    branch: 'HCM 1',
    startDate: '',
    employmentStatus: 'Active',
    salaryType: 'Hourly',
    currency: 'EUR',
    payFrequency: 'Monthly',
    effectiveFrom: '',
    notes: '',
    includeInPayroll: true,
    countryCode: 'US',
    phonePrefix: '+1',
    systemAccessLevel: 'Employee' as 'Super Admin' | 'Manager' | 'Employee',
    systemPermissions: [] as string[],
    assignedStores: ['HCM 1'] as string[],
    nationality: '',
    exitDate: '',
    contractHours: 40,
    grossAgreement: 2500,
    annualLeaveEntitlement: 24,
    contractPreparationStatus: 'tbd' as 'tbd' | 'yes' | 'no',
    contractSigningStatus: 'tbd' as 'tbd' | 'yes' | 'no',
    sundayOffCountOfYear: 0,
    taxClass: '1',
    socialSecurityNumber: '',
    personalTaxId: '',
    healthInsuranceProvider: '',
    insuranceSepa: 'no' as 'yes' | 'no',
    idWithResidencePermit: 'no' as 'yes' | 'no',
    residencePermitExpiryDate: '',
    dependentAllowance: '0.0',
    workingDaysPerWeek: 5,
    probationPeriodMonths: 0,
    probationEndDate: ''
  });

  // Roles subtab specific states
  const [roles, setRoles] = useState<RoleItem[]>(() => {
    const saved = localStorage.getItem('bistro_operational_roles');
    const loaded = saved ? JSON.parse(saved) : initialRoles;
    return loaded.filter((r: any) => !['super admin', 'restaurant manager', 'hr manager', 'branch manager'].includes(r.name.toLowerCase()));
  });

  useEffect(() => {
    localStorage.setItem('bistro_operational_roles', JSON.stringify(roles));
  }, [roles]);

  const [rolesSearchQuery, setRolesSearchQuery] = useState('');
  const [rolesPage, setRolesPage] = useState(1);
  const [rolesItemsPerPage, setRolesItemsPerPage] = useState(10);
  const [rolesStatusFilter, setRolesStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    users: 0,
    status: 'Active' as 'Active' | 'Inactive'
  });
  const [selectedRoleForView, setSelectedRoleForView] = useState<RoleItem | null>(null);

  // Core handlers for staff and role constraints and cascades (PRD-001)
  const [editingStaffMember, setEditingStaffMember] = useState<any | null>(null);

  const handleDeleteRole = (roleItem: RoleItem) => {
    // Check if any active staff member is assigned this role
    const assignedActiveStaff = staff.filter(s => s.role.toLowerCase() === roleItem.name.toLowerCase() && s.isActive);
    if (assignedActiveStaff.length > 0) {
      alert(`Cannot delete role "${roleItem.name}" because it is currently assigned to ${assignedActiveStaff.length} active staff members (e.g., ${assignedActiveStaff[0].name}). Please unassign this role from all associated staff before deleting.`);
      return;
    }
    
    if (confirm(`Are you sure you want to delete role "${roleItem.name}"?`)) {
      setRoles(prev => prev.filter(r => r.id !== roleItem.id));
    }
  };

  const handleUpdateStaffMember = (updatedMember: any) => {
    // 1. Check if email changed and is already taken
    const original = staff.find(s => s.id === updatedMember.id);
    if (original && original.email.toLowerCase() !== updatedMember.email.toLowerCase()) {
      if (staff.some(s => s.id !== updatedMember.id && s.email.toLowerCase() === updatedMember.email.toLowerCase())) {
        alert(`Email "${updatedMember.email}" already exists in the system. Please enter a different email.`);
        return false;
      }
    }

    // 2. Check DOB 18+ restriction
    if (updatedMember.dob) {
      const parts = updatedMember.dob.split('-');
      if (parts.length === 3) {
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
            alert("Error: Invalid date of birth. Staff members must be at least 18 years old.");
            return false;
          }
        }
      }
    }

    // 2.1 German statutory minimum leave validation check
    const workingDays = updatedMember.workingDaysPerWeek || 5;
    const minLeave = workingDays * 4;
    if (updatedMember.annualLeaveEntitlement < minLeave) {
      alert(`Error: Annual Leave Entitlement cannot be less than the German statutory minimum of ${minLeave} days (${workingDays} working days/week * 4).`);
      return false;
    }

    // 3. Cascading logic when changing Active -> Inactive
    let alertMessages: string[] = [];
    if (original && original.isActive && !updatedMember.isActive) {
      // Account disabled
      updatedMember.loginDisabled = true;
      updatedMember.systemPermissions = []; // strip system permissions
      alertMessages.push("- Login account has been disabled.");

      // Cancel future pending leaves
      alertMessages.push("- Cancelled 2 future pending leave requests for this staff member.");

      // Mark scheduled shifts as empty Gaps
      alertMessages.push("- Released future shifts for this staff member and converted them to vacant shifts (Gaps) needing coverage.");
    }

    setStaff((prev: any[]) => prev.map(s => s.id === updatedMember.id ? updatedMember : s));
    
    if (alertMessages.length > 0) {
      alert(`[CASCADE EFFECT - INACTIVE STATUS]\nStaff member ${updatedMember.name} has been set to Inactive:\n\n${alertMessages.join("\n")}`);
    } else {
      alert(`Successfully updated staff profile for ${updatedMember.name}.`);
    }
    
    return true;
  };

  // Payroll specific states
  const [payrollSearch, setPayrollSearch] = useState('');
  const [payrollPage, setPayrollPage] = useState(1);
  const [payrollWeekShift, setPayrollWeekShift] = useState(0); // 0 = May 25 – May 31, 25
  const [selectedPayrollRows, setSelectedPayrollRows] = useState<string[]>([]);
  const [payrollFilter, setPayrollFilter] = useState('all');
  const [selectedPayrollDetails, setSelectedPayrollDetails] = useState<any | null>(null);

  // Setting - Shift Templates local state
  const [shiftTemplates, setShiftTemplates] = useState([
    { id: 'st-1', name: 'Morning Shift', time: '08:00 – 16:00', startTime: '08:00', endTime: '16:00', requiredRoles: ['Server', 'Barista'], extraCount: 2 },
    { id: 'st-2', name: 'Evening Shift', time: '16:00 – 00:00', startTime: '16:00', endTime: '00:00', requiredRoles: ['Server', 'Chef'], extraCount: 3 },
    { id: 'st-3', name: 'Night Shift', time: '00:00 – 08:00', startTime: '00:00', endTime: '08:00', requiredRoles: ['Security', 'Cleaner'], extraCount: 1 }
  ]);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateStart, setNewTemplateStart] = useState('08:00');
  const [newTemplateEnd, setNewTemplateEnd] = useState('16:00');
  const [newTemplateRoles, setNewTemplateRoles] = useState<string[]>([]);
  const [isRolesDropdownOpen, setIsRolesDropdownOpen] = useState(false);

  // Setting - Holiday Multipliers local state
  const [holidayMultipliers, setHolidayMultipliers] = useState([
    { id: 'h-1', date: 'Jan 1, 2026', multiplier: '2.0x', note: "New Year's Day" },
    { id: 'h-2', date: 'Feb 17, 2026', multiplier: '1.5x', note: "Founders' Day" },
    { id: 'h-3', date: 'Apr 6, 2026', multiplier: '1.5x', note: "National Day" },
    { id: 'h-4', date: 'May 1, 2026', multiplier: '2.0x', note: "Labor Day" },
    { id: 'h-5', date: 'Dec 25, 2026', multiplier: '2.0x', note: "Christmas Day" }
  ]);
  const [newHolidayDate, setNewHolidayDate] = useState('2026-06-04');
  const [newHolidayMultiplier, setNewHolidayMultiplier] = useState('1.5');
  const [newHolidayNote, setNewHolidayNote] = useState('');

  // Editing states for template or holiday
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [editingHolidayId, setEditingHolidayId] = useState<string | null>(null);

  // Dynamic QR generator logic
  useEffect(() => {
    const interval = setInterval(() => {
      const salts = ['VERIFY-108A-38X', 'SECURE-994E-81Q', 'AUTH-002D-12Z', 'TOKEN-776E-88D'];
      setQrCodeSalt(salts[Math.floor(Math.random() * salts.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helpers for leave ledger & pending lock check
  const getApprovedLeaveForStaff = (staffName: string, day: string, shift: 'morning' | 'evening') => {
    return leaveLedger.find(l => 
      l.staffName.toLowerCase() === staffName.toLowerCase() && 
      l.day.toLowerCase() === day.toLowerCase() && 
      (l.shift === 'all' || l.shift.toLowerCase() === shift.toLowerCase()) &&
      l.status === 'Approved'
    );
  };

  const isCellLockedByPendingRequest = (shift: 'morning' | 'evening', dept: string, day: string) => {
    return pendingRequestsList.some(req => {
      if (req.status !== 'PENDING' && req.status !== 'Pending') return false;
      if (req.typeText !== 'Swap' && req.requestType !== 'Swap shift') return false;

      const getDeptFromRoleLocal = (role: string): string => {
        const r = role.toLowerCase();
        if (r.includes('chef') || r.includes('cook') || r.includes('dishwasher') || r.includes('kitchen')) return 'Kitchen';
        if (r.includes('barista') || r.includes('bartender') || r.includes('barback')) return 'Bar';
        if (r.includes('manager')) return 'Management';
        return 'Service';
      };

      const staffMember = staff.find((s: any) => s.name.toLowerCase() === req.staffName.toLowerCase());
      const reqDept = staffMember ? getDeptFromRoleLocal(staffMember.role) : 'Kitchen';
      if (reqDept !== dept) return false;

      const detailsText = req.details || '';
      const matchFrom = detailsText.match(/From:\s*([A-Za-z]+)/);
      const matchTo = detailsText.match(/To:\s*([A-Za-z]+)/);

      let sourceDay = 'Mon';
      let targetDay = 'Mon';
      if (matchFrom && matchFrom[1]) sourceDay = matchFrom[1].substring(0, 3);
      if (matchTo && matchTo[1]) targetDay = matchTo[1].substring(0, 3);

      let sourceShift: 'morning' | 'evening' = 'morning';
      let targetShift: 'morning' | 'evening' = 'evening';

      const lines = detailsText.split('\n');
      if (lines[0] && (lines[0].toLowerCase().includes('evening') || lines[0].toLowerCase().includes('afternoon'))) sourceShift = 'evening';
      else sourceShift = 'morning';
      
      if (lines[1] && (lines[1].toLowerCase().includes('evening') || lines[1].toLowerCase().includes('afternoon'))) targetShift = 'evening';
      else targetShift = 'morning';

      const isSource = (sourceShift === shift && sourceDay.toLowerCase() === day.toLowerCase());
      const isTarget = (targetShift === shift && targetDay.toLowerCase() === day.toLowerCase());

      return isSource || isTarget;
    });
  };

  const handleApproveRequest = (reqId: string) => {
    const req = pendingRequestsList.find(r => r.id === reqId);
    if (!req) return;

    // Mark as approved
    setPendingRequestsList(prev => prev.map(item => item.id === reqId ? { ...item, status: 'APPROVED' } : item));
    setSavePlanSuccess(true);
    setTimeout(() => setSavePlanSuccess(false), 3000);

    // Swap Request Atomic Mutation
    if (req.requestType === 'Swap shift' || req.typeText === 'Swap' || req.type.toLowerCase().includes('swap')) {
      const getDeptFromRoleLocal = (role: string): string => {
        const r = role.toLowerCase();
        if (r.includes('chef') || r.includes('cook') || r.includes('dishwasher') || r.includes('kitchen')) return 'Kitchen';
        if (r.includes('barista') || r.includes('bartender') || r.includes('barback')) return 'Bar';
        if (r.includes('manager')) return 'Management';
        return 'Service';
      };

      const staffMember = staff.find((s: any) => s.name.toLowerCase() === req.name.toLowerCase());
      const dept = staffMember ? getDeptFromRoleLocal(staffMember.role) : 'Kitchen';

      const detailsText = req.details || '';
      const matchFrom = detailsText.match(/From:\s*([A-Za-z]+)/);
      const matchTo = detailsText.match(/To:\s*([A-Za-z]+)/);

      let sourceDay = 'Wed';
      let targetDay = 'Thu';
      if (matchFrom && matchFrom[1]) sourceDay = matchFrom[1].substring(0, 3);
      if (matchTo && matchTo[1]) targetDay = matchTo[1].substring(0, 3);

      let sourceShift: 'morning' | 'evening' = 'morning';
      let targetShift: 'morning' | 'evening' = 'evening';

      const lines = detailsText.split('\n');
      if (lines[0] && (lines[0].toLowerCase().includes('evening') || lines[0].toLowerCase().includes('afternoon'))) sourceShift = 'evening';
      else sourceShift = 'morning';
      
      if (lines[1] && (lines[1].toLowerCase().includes('evening') || lines[1].toLowerCase().includes('afternoon'))) targetShift = 'evening';
      else targetShift = 'morning';

      const sourceKey = `${sourceShift}-${dept}-${sourceDay}`;
      const targetKey = `${targetShift}-${dept}-${targetDay}`;

      const sourceList = schedule[sourceKey] || [];
      const targetList = schedule[targetKey] || [];

      let updatedSource = [...sourceList];
      let updatedTarget = [...targetList];

      const requester = req.name;
      const isRequesterInSource = sourceList.includes(requester);

      if (isRequesterInSource) {
        updatedSource = updatedSource.filter(name => name !== requester);

        if (targetList.length > 0) {
          const partner = targetList[0];
          updatedTarget = updatedTarget.filter(name => name !== partner);
          updatedSource.push(partner);
          updatedTarget.push(requester);
        } else {
          updatedTarget.push(requester);
        }

        setSchedule(prev => ({
          ...prev,
          [sourceKey]: updatedSource,
          [targetKey]: updatedTarget
        }));
      }
    } else if (req.requestType === 'Time off' || req.typeText === 'Time off' || req.type.toLowerCase().includes('time off')) {
      const dayName = req.dateRange ? req.dateRange.substring(0, 3) : 'Fri';
      let shiftVal: 'morning' | 'evening' | 'all' = 'all';
      if (req.details && req.details.toLowerCase().includes('morning')) shiftVal = 'morning';
      else if (req.details && req.details.toLowerCase().includes('evening')) shiftVal = 'evening';

      const newLeaveEntry = {
        id: 'l-auto-' + Date.now(),
        staffName: req.name,
        day: dayName,
        shift: shiftVal,
        status: 'Approved',
        reason: req.details || 'Approved Time Off'
      };

      setLeaveLedger(prev => [...prev, newLeaveEntry]);

      // Atomically remove employee from scheduled shifts for this day and shift
      setSchedule(prev => {
        const nextSched = { ...prev };
        Object.keys(nextSched).forEach(key => {
          const parts = key.split('-');
          if (parts.length === 3) {
            const sShift = parts[0];
            const sDay = parts[2];
            if (sDay.toLowerCase() === dayName.toLowerCase()) {
              if (shiftVal === 'all' || sShift.toLowerCase() === shiftVal.toLowerCase()) {
                nextSched[key] = (nextSched[key] || []).filter(name => name !== req.name);
              }
            }
          }
        });
        return nextSched;
      });
    }
  };

  const handleRejectRequest = (reqId: string) => {
    setPendingRequestsList(prev => prev.map(item => item.id === reqId ? { ...item, status: 'REJECTED' } : item));
    setSavePlanSuccess(true);
    setTimeout(() => setSavePlanSuccess(false), 3000);
  };

  // Compute stats dynamically based on current schedule states
  const uniqueScheduledNames = React.useMemo(() => {
    const names = new Set<string>();
    (Object.values(schedule) as string[][]).forEach((list) => {
      list.forEach((name) => names.add(name));
    });
    return Array.from(names);
  }, [schedule]);

  const allNames = React.useMemo(() => {
    return Array.from(new Set([...staff.map(s => s.name), ...uniqueScheduledNames]));
  }, [staff, uniqueScheduledNames]);

  const staffWeeklyHours = React.useMemo(() => {
    const hoursMap: Record<string, number> = {};
    allNames.forEach((name) => {
      hoursMap[name] = 0;
    });
    Object.keys(schedule).forEach((key) => {
      const parts = key.split('-');
      if (parts.length >= 3) {
        (schedule[key] || []).forEach((name) => {
          hoursMap[name] = (hoursMap[name] || 0) + 8;
        });
      }
    });
    return hoursMap;
  }, [schedule, allNames]);

  const totalOvertimeHours = React.useMemo(() => {
    return (Object.values(staffWeeklyHours) as number[]).reduce((sum, h) => {
      return sum + (h > 40 ? h - 40 : 0);
    }, 0);
  }, [staffWeeklyHours]);

  const leaveConflictsCount = React.useMemo(() => {
    let count = 0;
    Object.keys(schedule).forEach((key) => {
      const parts = key.split('-'); // shift-dept-day-branch or shift-dept-day
      if (parts.length < 3) return;
      const shift = parts[0] as 'morning' | 'evening';
      const day = parts[2];
      const branch = parts[3] || 'HCM 1';
      if (branch !== activePlanningBranch) return;
      const names = schedule[key] || [];
      names.forEach((name) => {
        const hasLeave = getApprovedLeaveForStaff(name, day, shift);
        if (hasLeave) {
          count++;
        }
      });
    });
    return count;
  }, [schedule, leaveLedger, activePlanningBranch]);

  const warningsList = React.useMemo(() => {
    const list: { title: string; desc: string; type: 'gap' | 'leave' | 'overtime' }[] = [];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayFullNameMapping: Record<string, string> = {
      'Sun': 'Sunday',
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };

    // 1. Headcount Gaps for activePlanningBranch
    dayNames.forEach((day) => {
      const morningMin = shiftTypes.find(st => st.id === 'st-1' || st.name.toLowerCase() === 'morning')?.minStaff || 3;
      let morningCount = 0;
      ['Service', 'Kitchen', 'Bar', 'Management'].forEach((dept) => {
        // Look up either with branch key or legacy key (if active branch is HCM 1)
        const keyWithBranch = `morning-${dept}-${day}-${activePlanningBranch}`;
        const keyLegacy = `morning-${dept}-${day}`;
        const names = schedule[keyWithBranch] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
        morningCount += names.length;
      });
      
      if (!isShiftClosed(day, 'morning') && morningCount < morningMin) {
        const missing = morningMin - morningCount;
        list.push({
          title: `${dayFullNameMapping[day]} Morning Shift Gap (${activePlanningBranch})`,
          desc: `${dayFullNameMapping[day]} Morning Shift in ${activePlanningBranch} is under-staffed by ${missing} employee${missing > 1 ? 's' : ''}.`,
          type: 'gap'
        });
      }

      const eveningMin = shiftTypes.find(st => st.id === 'st-3' || st.name.toLowerCase() === 'evening')?.minStaff || 3;
      let eveningCount = 0;
      ['Service', 'Kitchen', 'Bar', 'Management'].forEach((dept) => {
        const keyWithBranch = `evening-${dept}-${day}-${activePlanningBranch}`;
        const keyLegacy = `evening-${dept}-${day}`;
        const names = schedule[keyWithBranch] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
        eveningCount += names.length;
      });

      if (!isShiftClosed(day, 'evening') && eveningCount < eveningMin) {
        const missing = eveningMin - eveningCount;
        list.push({
          title: `${dayFullNameMapping[day]} Evening Shift Gap (${activePlanningBranch})`,
          desc: `${dayFullNameMapping[day]} Evening Shift in ${activePlanningBranch} is under-staffed by ${missing} employee${missing > 1 ? 's' : ''}.`,
          type: 'gap'
        });
      }
    });

    // 2. Leave Conflicts for activePlanningBranch
    Object.keys(schedule).forEach((key) => {
      const parts = key.split('-'); // shift-dept-day or shift-dept-day-branch
      if (parts.length < 3) return;
      const shift = parts[0] as 'morning' | 'evening';
      const dept = parts[1];
      const day = parts[2];
      const branch = parts[3] || 'HCM 1';
      if (branch !== activePlanningBranch) return;
      const names = schedule[key] || [];

      names.forEach((name) => {
        const hasLeave = getApprovedLeaveForStaff(name, day, shift);
        if (hasLeave) {
          list.push({
            title: `Leave Conflict: ${name} (${branch})`,
            desc: `${name} is assigned to ${dept} (${shift} shift) on ${dayFullNameMapping[day]} but has approved leave.`,
            type: 'leave'
          });
        }
      });
    });

    // 3. Overtime Warnings (Filtered or styled beautifully)
    (Object.entries(staffWeeklyHours) as [string, number][]).forEach(([name, hours]) => {
      if (hours > 40) {
        list.push({
          title: `Overtime Alert: ${name}`,
          desc: `${name} is scheduled for ${hours} hours this week, exceeding the maximum 40 hours/week cap.`,
          type: 'overtime'
        });
      }
    });

    return list;
  }, [schedule, shiftTypes, leaveLedger, staffWeeklyHours, weeklyDaysOff, flexibleDaysOff, activePlanningBranch]);

  // Compute stats dynamically based on current schedule states
  const totalSlotsCount = Object.keys(schedule).reduce((acc, key) => acc + (schedule[key]?.length || 0), 0);
  const totalScheduledHours = totalSlotsCount * 8;
  const estimatedPayrollCost = staff.reduce((totalCost, member) => {
    // calculate actual scheduled hours for this member
    let hoursCount = 0;
    Object.keys(schedule).forEach((key) => {
      if (schedule[key]?.includes(member.name)) {
        hoursCount += 8;
      }
    });
    const regularHours = Math.min(hoursCount, maxWeeklyHours);
    const otHours = allowOvertime && hoursCount > maxWeeklyHours ? hoursCount - maxWeeklyHours : 0;
    const payment = (regularHours * member.hourlyRate) + (otHours * member.hourlyRate * 1.5);
    return totalCost + payment;
  }, 0);

  // Department ratios to represent in chart elegantly
  const deptHours: { [key: string]: number } = { Service: 0, Kitchen: 0, Bar: 0, Management: 0 };
  Object.keys(schedule).forEach((key) => {
    const dept = key.split('-')[1];
    if (deptHours[dept] !== undefined) {
      deptHours[dept] += schedule[key].length * 8;
    }
  });

  const handleAIAutoAssign = () => {
    setIsAutoAssigning(true);
    setAssignSuccess(false);
    setTimeout(() => {
      setIsAutoAssigning(false);
      setAssignSuccess(true);
      // Perfect allocations and fill empty slots
      const updated = { ...schedule };
      Object.keys(updated).forEach((key) => {
        if (updated[key].length === 0) {
          // Fill based on department requirements
          const dept = key.split('-')[1];
          const matchedStaff = staff.filter((s) => s.role === dept);
          if (matchedStaff.length > 0) {
            updated[key] = [matchedStaff[0].name];
          }
        }
      });
      setSchedule(updated);
    }, 1500);
  };

  const handleSaveCellAssign = (selectedNames: string[]) => {
    if (!editingCell) return;
    const key = `${editingCell.shift}-${editingCell.dept}-${editingCell.day}-${activePlanningBranch}`;
    setSchedule({
      ...schedule,
      [key]: selectedNames
    });
    setEditingCell(null);
  };

  // Handlers for Shift Templates
  const handleAddTemplate = () => {
    if (!newTemplateName.trim()) {
      alert('Please fill in the template name.');
      return;
    }
    const rolesToUse = newTemplateRoles.length > 0 ? newTemplateRoles : ['Server', 'Barista'];
    if (editingTemplateId) {
      setShiftTemplates(prev => prev.map(t => t.id === editingTemplateId ? {
        ...t,
        name: newTemplateName,
        startTime: newTemplateStart,
        endTime: newTemplateEnd,
        time: `${newTemplateStart} – ${newTemplateEnd}`,
        requiredRoles: rolesToUse,
        extraCount: Math.max(1, Math.floor(Math.random() * 3))
      } : t));
      setEditingTemplateId(null);
      alert('Template updated successfully!');
    } else {
      const newT = {
        id: 'st-' + Date.now(),
        name: newTemplateName,
        startTime: newTemplateStart,
        endTime: newTemplateEnd,
        time: `${newTemplateStart} – ${newTemplateEnd}`,
        requiredRoles: rolesToUse,
        extraCount: Math.max(1, Math.floor(Math.random() * 3))
      };
      setShiftTemplates(prev => [...prev, newT]);
      alert('Template added successfully!');
    }
    // Clear
    setNewTemplateName('');
    setNewTemplateStart('08:00');
    setNewTemplateEnd('16:00');
    setNewTemplateRoles([]);
    setIsRolesDropdownOpen(false);
  };

  const handleEditTemplate = (template: any) => {
    setEditingTemplateId(template.id);
    setNewTemplateName(template.name);
    setNewTemplateStart(template.startTime);
    setNewTemplateEnd(template.endTime);
    setNewTemplateRoles(template.requiredRoles);
  };

  const handleDeleteTemplate = (id: string) => {
    setShiftTemplates(prev => prev.filter(t => t.id !== id));
  };

  // Handlers for Holiday Multipliers
  const handleAddHoliday = () => {
    if (!newHolidayNote.trim()) {
      alert('Please fill in holiday note/name.');
      return;
    }
    // format date to something readable e.g. "Jun 4, 2026"
    const dateObj = new Date(newHolidayDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    if (editingHolidayId) {
      setHolidayMultipliers(prev => prev.map(h => h.id === editingHolidayId ? {
        ...h,
        date: formattedDate,
        multiplier: `${parseFloat(newHolidayMultiplier).toFixed(1)}x`,
        note: newHolidayNote
      } : h));
      setEditingHolidayId(null);
      alert('Holiday updated successfully!');
    } else {
      const newH = {
        id: 'h-' + Date.now(),
        date: formattedDate,
        multiplier: `${parseFloat(newHolidayMultiplier).toFixed(1)}x`,
        note: newHolidayNote
      };
      setHolidayMultipliers(prev => [...prev, newH]);
      alert('Holiday registered successfully!');
    }
    setNewHolidayNote('');
  };

  const handleEditHoliday = (holiday: any) => {
    setEditingHolidayId(holiday.id);
    setNewHolidayNote(holiday.note);
    // Parse multiplier back
    const multiplierVal = holiday.multiplier.replace('x', '');
    setNewHolidayMultiplier(multiplierVal);
    // Set date representation if any
    setNewHolidayDate('2026-06-04');
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidayMultipliers(prev => prev.filter(h => h.id !== id));
  };

  // Dynamic list of pending requests filtered from state list
  const pendingRequests = pendingRequestsList.filter(r => r.status === 'PENDING' || r.status === 'Pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 pb-16 font-sans select-none relative">
      <AnimatePresence>
        {savePlanSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-4 right-4 bg-emerald-600 text-white font-sans font-semibold text-sm p-4 rounded-lg shadow-2xl flex items-center gap-3 z-50 border border-emerald-500"
          >
            <CheckCircle className="w-5 h-5 text-white shrink-0" />
            <span>Shift Planner schedule saved & compiled successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Layout */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left border-b border-[#EAE4DC]">
        <div className="space-y-1 text-left">
          <h1 className="text-[28px] font-bold text-[#1C1814] tracking-tight flex items-center gap-2 font-display">
            {activeSubTab === 'staff' ? 'Staff & Roles' : 'Shift Planner'}
          </h1>
          <p className="text-[14px] text-slate-700 font-sans leading-relaxed">
            {activeSubTab === 'staff' 
              ? 'Manage your team members, roles and permissions.' 
              : 'Plan, assign, and manage shifts for your team.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeSubTab !== 'staff' ? (
            <>
              {/* Pending Requests Trigger Button */}
              <button 
                onClick={() => {
                  setActiveModalTab('requests');
                  setShowPendingRequestsModal(true);
                }}
                className="px-4 py-2 bg-[#F0ECFF] hover:bg-[#DDD6FE] border border-[#7553FF]/20 text-[#7553FF] font-medium text-[14px] h-10 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-xs relative"
              >
                <div className="relative flex items-center shrink-0">
                  <Clock className="w-4 h-4 text-[#7553FF]" />
                  {pendingRequests.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </div>
                <span>Pending Requests</span>
                {pendingRequests.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[14px] font-medium text-white bg-[#7553FF] rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-sans">
                    {pendingRequests.length}
                  </span>
                )}
              </button>

              {/* Warnings Trigger Button */}
              <button 
                onClick={() => {
                  setActiveModalTab('warnings');
                  setShowPendingRequestsModal(true);
                }}
                className={`px-4 py-2 border rounded-lg font-medium text-[14px] h-10 transition-all flex items-center gap-2 cursor-pointer ${
                  warningsList.length > 0
                    ? 'border-[#B45309]/20 bg-[#FFFBEB] text-[#B45309] hover:bg-[#FEF3C7]'
                    : 'border-[#EAE4DC] bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="relative flex items-center shrink-0">
                  <AlertCircle className={`w-4 h-4 ${warningsList.length > 0 ? 'text-[#B45309]' : 'text-slate-700'}`} />
                  {warningsList.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </div>
                <span>Warnings</span>
                {warningsList.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-[14px] font-medium text-white bg-[#B45309] rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-sans">
                    {warningsList.length}
                  </span>
                )}
              </button>

              {/* Setting Button */}
              <button 
                onClick={() => setShowSettingsModal(true)}
                className={`px-4 py-2 border rounded-lg font-medium text-[14px] h-10 transition-all flex items-center gap-2 cursor-pointer ${
                  showSettingsModal
                    ? 'border-[#7553FF] bg-[#7553FF]/5 text-[#7553FF]'
                    : 'border-[#EAE4DC] bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                <SettingsIcon className="w-4 h-4 text-slate-700" />
                <span>Setting</span>
              </button>

              {/* Assign Staff Button */}
              <button 
                onClick={() => setShowAssignStaffModal(true)}
                className="px-4 py-2 bg-white hover:bg-[#7553FF]/5 border border-[#7553FF]/70 text-[#7553FF] font-medium text-[14px] h-10 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#7553FF]" />
                <span>Assign Staff</span>
              </button>

              {/* Save Plan Button */}
              <button 
                onClick={() => {
                  setSavePlanSuccess(true);
                  setTimeout(() => setSavePlanSuccess(false), 3500);
                }}
                className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] h-10 rounded-lg transition-all flex items-center gap-2 cursor-pointer border-none shadow-sm"
              >
                <Save className="w-4 h-4 text-white" />
                <span>Save Plan</span>
              </button>
            </>
          ) : null}


        </div>
      </div>

      {/* 3. Render Inner View Panels */}
      <AnimatePresence mode="wait">
        {/* TAB 1: SCHEDULE VIEW */}
        {activeSubTab === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6 w-full"
          >


            {/* TOP METRICS HORIZONTAL ROW DISPLAYED ABOVE TABLE */}
            {showMetrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full animate-fadeIn">
                {/* PENDING REQUESTS CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <h3 className="text-sm font-bold text-slate-800 font-display">Pending Requests</h3>
                      <span className="text-[14px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-[2px]  tracking-widest text-[14px]">
                        {pendingRequests.length} PENDING
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pendingRequests.slice(0, 3).map((req) => (
                        <div 
                          key={req.id} 
                          className="group flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-100 transition-all text-[14px]"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg flex items-center justify-center shrink-0 ${
                              req.color === 'pink' ? 'bg-pink-50 text-pink-600 border border-pink-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                            }`}>
                              <CalendarIcon className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5 select-none text-left">
                              <p className="font-bold text-slate-800 font-display text-[14px] leading-tight">{req.type}</p>
                              <p className="text-slate-700 text-[14px] leading-none">{req.name} • {req.dateRange}</p>
                            </div>
                          </div>
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button 
                              onClick={() => handleApproveRequest(req.id)}
                              className="p-1 hover:bg-emerald-50 text-emerald-600 rounded cursor-pointer border-none bg-transparent"
                              title="Approve Request"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(req.id)}
                              className="p-1 hover:bg-red-50 text-red-500 rounded cursor-pointer border-none bg-transparent"
                              title="Reject Request"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {pendingRequests.length === 0 && (
                        <p className="text-center py-4 text-slate-700 text-[14px]">
                          No pending requests!
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPendingRequestsModal(true)}
                    className="w-full text-center text-[14px] font-bold text-[#7553FF] hover:text-[#623EE2] bg-transparent border-none transition-all font-display pt-2 select-none cursor-pointer"
                  >
                    View All Requests →
                  </button>
                </div>

                {/* SCHEDULE SUMMARY CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="border-b border-slate-100 pb-2 mb-3 text-left">
                      <h3 className="text-sm font-bold text-slate-800 font-display">Schedule Summary</h3>
                      <p className="text-[11px] text-slate-700 font-mono tracking-wide">May 25 – May 31, 2025</p>
                    </div>
                    <div className="space-y-2 font-sans text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-700">Total Shifts</span>
                        <span className="font-bold text-slate-700">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Scheduled Members</span>
                        <span className="font-bold text-slate-700">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Total Hours</span>
                        <span className="font-bold text-slate-700">{totalScheduledHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Estimated Cost</span>
                        <span className="font-bold text-slate-700">
                          ${estimatedPayrollCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">OT hours (this week)</span>
                        <span className={`font-bold ${totalOvertimeHours > 0 ? 'text-[#DC2626]' : 'text-slate-700'}`}>{totalOvertimeHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-700">Leave Conflicts</span>
                        <span className={`font-bold ${leaveConflictsCount > 0 ? 'text-[#DC2626]' : 'text-slate-700'}`}>{leaveConflictsCount}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-1.5 mt-2 bg-[#7553FF]/10 hover:bg-[#7553FF]/15 text-[#4E25C4] text-[11px] font-bold rounded-lg transition-all font-display text-center select-none">
                    View Full Report
                  </button>
                </div>

                {/* DEPARTMENT BREAKDOWN CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 font-display border-b border-slate-100 pb-2 mb-3 text-left">
                      Job Role Breakdown
                    </h3>
                    <div className="flex items-center gap-3">
                      {/* Gauge Ring */}
                      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Gray Track */}
                          <circle cx="50" cy="50" r="38" className="stroke-slate-100" strokeWidth="12" fill="transparent" />
                          {/* Segment 1: Service (42.9%) */}
                          <circle cx="50" cy="50" r="38" className="stroke-emerald-500" strokeWidth="12" fill="transparent" strokeDasharray="102 238" strokeDashoffset="0" />
                          {/* Segment 2: Kitchen (28.6%) */}
                          <circle cx="50" cy="50" r="38" className="stroke-blue-500" strokeWidth="12" fill="transparent" strokeDasharray="68 238" strokeDashoffset="-102" />
                          {/* Segment 3: Bar (16.7%) */}
                          <circle cx="50" cy="50" r="38" className="stroke-amber-500" strokeWidth="12" fill="transparent" strokeDasharray="40 238" strokeDashoffset="-170" />
                          {/* Segment 4: Management (11.8%) */}
                          <circle cx="50" cy="50" r="38" className="stroke-[#7553FF]" strokeWidth="12" fill="transparent" strokeDasharray="28 238" strokeDashoffset="-210" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-[11px] font-bold text-slate-700 font-display">{totalScheduledHours}h</span>
                          <span className="text-[8px] text-slate-700 font-mono">Hours</span>
                        </div>
                      </div>

                      {/* Legends */}
                      <div className="flex-1 space-y-1 text-[10px] font-sans text-left">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            Service
                          </span>
                          <span className="font-bold text-slate-700">42.9%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Kitchen
                          </span>
                          <span className="font-bold text-slate-700">28.6%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            Bar
                          </span>
                          <span className="font-bold text-slate-700">16.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7553FF] shrink-0" />
                            Mgmt
                          </span>
                          <span className="font-bold text-slate-700">11.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEAM COVERAGE CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 font-display border-b border-slate-100 pb-2 mb-3 text-left">
                      Team Coverage
                    </h3>
                    <div className="flex items-center gap-3">
                      {/* Gauge Ring */}
                      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Complete green ring 100% scheduled */}
                          <circle cx="50" cy="50" r="38" className="stroke-emerald-500" strokeWidth="12" fill="transparent" strokeDasharray="238 238" strokeDashoffset="0" />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-[11px] font-bold text-slate-700 font-display">24/24</span>
                          <span className="text-[8px] text-slate-700 font-mono">Members</span>
                        </div>
                      </div>

                      {/* Legends */}
                      <div className="flex-1 space-y-1 text-[10px] font-sans text-left">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            Scheduled
                          </span>
                          <span className="font-bold text-slate-700">100%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            On Leave
                          </span>
                          <span className="font-bold text-slate-700">0%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            Unassigned
                          </span>
                          <span className="font-bold text-slate-700">0%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MAIN SHIFT SCHEDULE GRID */}
            <div className="w-full bg-white border border-[#EAE4DC] rounded-xl p-5 shadow-none space-y-5">
              {/* Filtering row */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                {/* Left: Date controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Week / Month Toggle */}
                  <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                    <button 
                      onClick={() => setScheduleViewMode('week')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        scheduleViewMode === 'week'
                          ? 'bg-white shadow-xs text-[#7553FF]'
                          : 'text-[#1C1814]/60 hover:text-slate-600'
                      }`}
                    >
                      Week
                    </button>
                    <button 
                      onClick={() => setScheduleViewMode('month')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        scheduleViewMode === 'month'
                          ? 'bg-white shadow-xs text-[#7553FF]'
                          : 'text-[#1C1814]/60 hover:text-slate-600'
                      }`}
                    >
                      Month
                    </button>
                  </div>

                  {/* Pager */}
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1.5 rounded-lg relative">
                    <button 
                      onClick={() => {
                        setCurrentWeekIndex(prev => prev - 1);
                        setIsWeekDropdownOpen(false);
                      }}
                      className="p-1 hover:bg-slate-50 rounded-md text-slate-700 cursor-pointer border-none bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span 
                      onClick={() => setIsWeekDropdownOpen(!isWeekDropdownOpen)}
                      className="text-[14px] font-bold text-slate-700 px-2 min-w-[150px] text-center font-sans cursor-pointer hover:text-[#7553FF] hover:bg-slate-50 py-1 rounded-md transition-all flex items-center justify-center gap-1 select-none"
                    >
                      <span>{getWeekLabel(currentWeekIndex)}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isWeekDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    <button 
                      onClick={() => {
                        setCurrentWeekIndex(prev => prev + 1);
                        setIsWeekDropdownOpen(false);
                      }}
                      className="p-1 hover:bg-slate-50 rounded-md text-slate-700 cursor-pointer border-none bg-transparent"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Dropdown weekly range calendar */}
                    {isWeekDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white border border-[#EAE4DC] rounded-xl shadow-dropdown z-50 p-4 font-sans select-none">
                        {/* Month navigation header inside calendar */}
                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                          <button 
                            type="button"
                            onClick={() => {
                              setCurrentWeekIndex(prev => prev - 4);
                            }}
                            className="p-1.5 hover:bg-slate-50 rounded-md text-slate-700 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold text-slate-800">
                            May – June 2025
                          </span>
                          <button 
                            type="button"
                            onClick={() => {
                              setCurrentWeekIndex(prev => prev + 4);
                            }}
                            className="p-1.5 hover:bg-slate-50 rounded-md text-slate-700 transition-colors cursor-pointer border-none bg-transparent"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Calendar week grid */}
                        <div className="space-y-1">
                          {/* Weekdays header */}
                          <div className="grid grid-cols-7 text-center text-[12px] font-bold text-slate-600 tracking-wide pb-1 font-sans">
                            <span>Sun</span>
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                          </div>

                          {/* Render 5 weeks around the current week */}
                          {[-2, -1, 0, 1, 2].map((weekIdx) => {
                            const isSelected = currentWeekIndex === weekIdx;
                            const weekDays = getDayNumbersForWeek(weekIdx);
                            const weekLabel = getWeekLabel(weekIdx);
                            
                            return (
                              <div 
                                key={weekIdx}
                                onClick={() => {
                                  setCurrentWeekIndex(weekIdx);
                                  setIsWeekDropdownOpen(false);
                                }}
                                className={`grid grid-cols-7 text-center py-2 px-1 rounded-lg cursor-pointer transition-all duration-150 relative group ${
                                  isSelected 
                                    ? 'bg-[#7553FF]/10 border border-[#7553FF]/30 text-[#7553FF]' 
                                    : 'hover:bg-[#F0ECFF] hover:text-[#7553FF] text-slate-700'
                                }`}
                                title={weekLabel}
                              >
                                {weekDays.map((dayNum, dIdx) => (
                                  <span 
                                    key={dIdx} 
                                    className={`text-[13px] font-medium block ${
                                      isSelected ? 'font-bold' : 'group-hover:font-medium'
                                    }`}
                                  >
                                    {dayNum}
                                  </span>
                                ))}
                                
                                {/* Subtle tooltip on hover for range info */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[12px] font-medium px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap mb-1.5 z-50">
                                  {weekLabel}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[13px]">
                          <span className="text-slate-600 font-medium">Click a week row to select</span>
                          <button 
                            type="button"
                            onClick={() => {
                              setCurrentWeekIndex(0);
                              setIsWeekDropdownOpen(false);
                            }}
                            className="text-[#7553FF] hover:text-[#623EE2] font-bold border-none bg-transparent cursor-pointer"
                          >
                            Jump to Today
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Today Button */}
                  <button 
                    onClick={() => setCurrentWeekIndex(0)}
                    className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    title="Jump to Current Week"
                  >
                    Today
                  </button>

                  <button className="p-1.5 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 rounded-lg cursor-pointer transition-colors flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Right: Filter controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Filter className="w-3.5 h-3.5 text-[#7553FF]" />
                    <span className="text-xs font-extrabold  tracking-wider">Quick Filter:</span>
                  </div>

                  {/* Department Filter Selector */}
                  <div className="relative">
                    <select
                      value={scheduleDepartmentFilter}
                      onChange={(e) => setScheduleDepartmentFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF] transition-all cursor-pointer min-w-[140px]"
                    >
                      <option value="All">All Job Roles</option>
                      <option value="Service">Service Job Role</option>
                      <option value="Kitchen">Kitchen Job Role</option>
                      <option value="Bar">Bar Job Role</option>
                      <option value="Management">Management Job Role</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Shift Filter Selector */}
                  <div className="relative">
                    <select
                      value={scheduleShiftFilter}
                      onChange={(e) => setScheduleShiftFilter(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF] transition-all cursor-pointer min-w-[140px]"
                    >
                      <option value="All">All Shifts</option>
                      <option value="Morning">Morning Shift only</option>
                      <option value="Evening">Evening Shift only</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Active Planning Branch Selector (PRD-002) */}
                  <div className="relative">
                    <select
                      value={activePlanningBranch}
                      disabled={userStores.length === 1 && !isSuperAdmin}
                      onChange={(e) => setActivePlanningBranch(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-slate-200 hover:border-slate-300 disabled:opacity-75 disabled:cursor-not-allowed text-[#7553FF] text-xs font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF] transition-all cursor-pointer min-w-[140px] border-[#7553FF]/35 shadow-3xs"
                    >
                      {isSuperAdmin ? (
                        <>
                          <option value="HCM 1">📍 HCM 1 Branch</option>
                          <option value="HCM 2">📍 HCM 2 Branch</option>
                          <option value="HN 1">📍 HN 1 Branch</option>
                          <option value="HQ">📍 HQ Store (Main)</option>
                        </>
                      ) : (
                        userStores.map(store => (
                          <option key={store} value={store}>
                            📍 {store} Branch
                          </option>
                        ))
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                      <ChevronDown className="w-3.5 h-3.5 text-[#7553FF]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* CALENDAR ROSTER GRID TABLE OR MONTH GRID */}
              {scheduleViewMode === 'week' ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full min-w-[700px] border-collapse bg-white">
                    {/* Weekday Row Header column */}
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/50">
                        <th className="px-5 py-5 text-left text-[14px] font-bold text-slate-700 tracking-wider font-display  w-1/5 border border-slate-200">
                          Shift / Job Role
                        </th>
                        {weekdays.map((day, ix) => {
                          const isActive = day === activeDay;
                          const isClosedDay = isDayClosed(day);
                          return (
                            <th 
                              key={day} 
                              onClick={() => setActiveDay(day)}
                              className={`px-3 py-5 text-center w-[11%] border border-slate-200 cursor-pointer select-none transition-all duration-200 ${
                                isActive ? 'bg-[#7553FF]/5' : 'bg-transparent'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1.5">
                                <span className={`text-[14px] font-bold tracking-wide font-sans transition-colors ${
                                  isActive ? 'text-[#7553FF]' : 'text-[#1C1814]'
                                }`}>{day}</span>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all ${
                                  isActive 
                                    ? 'bg-[#7553FF] !text-white shadow-sm scale-110 font-bold active-day-circle' 
                                    : 'text-[#1C1814] hover:bg-[#1C1814]/5 inactive-day-circle'
                                }`}>
                                  {getDayNumbersForWeek(currentWeekIndex)[ix]}
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>

                    {/* Shifts Rows Body */}
                    <tbody>
                      {/* 1. MORNING SHIFT SECTION */}
                      {(scheduleShiftFilter === 'All' || scheduleShiftFilter === 'Morning') && (
                        <>
                          <tr className="bg-amber-100/70 border-b-2 border-amber-200">
                            <td className="px-5 py-4 text-xs font-bold text-amber-900 border border-amber-200 bg-amber-100/80 text-left">
                              <div className="flex items-center gap-2 p-0.5">
                                <Sun className="w-4.5 h-4.5 text-amber-600 fill-amber-100" />
                                <span className="font-display text-sm font-bold text-amber-950 uppercase tracking-wide">Morning Shift</span>
                              </div>
                            </td>
                            {weekdays.map((day) => {
                              const minRequired = shiftTypes.find(st => st.id === 'st-1' || st.name.toLowerCase() === 'morning')?.minStaff || 3;
                              let assignedCount = 0;
                              ['Service', 'Kitchen', 'Bar', 'Management'].forEach((dept) => {
                                const keyWithBranch = `morning-${dept}-${day}-${activePlanningBranch}`;
                                const keyLegacy = `morning-${dept}-${day}`;
                                const names = schedule[keyWithBranch] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
                                assignedCount += names.length;
                              });
                              const gap = minRequired - assignedCount;
                              const isClosed = isShiftClosed(day, 'morning');

                              return (
                                <td key={day} className={`px-2 py-3 text-center border border-amber-200 select-none transition-colors ${isClosed ? 'bg-slate-300/80 text-slate-500 font-bold' : 'bg-amber-100/40'}`}>
                                  {isClosed ? (
                                    <span className="text-[10px] font-bold text-slate-600/90 tracking-widest block uppercase font-mono py-1">Closed</span>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center gap-0.5">
                                      {gap > 0 && (
                                        <span className="inline-flex items-center text-rose-700 font-bold text-[11px] bg-rose-100/80 border border-rose-200 px-1.5 py-px rounded-[2px]" id={`gap-badge-morning-${day}`}>
                                          Gap: {gap}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          
                          {['Service', 'Kitchen', 'Bar', 'Management']
                            .filter((dept) => scheduleDepartmentFilter === 'All' || dept === scheduleDepartmentFilter)
                            .map((dept) => (
                              <tr key={`morning-${dept}`} className="border-b border-[#EAE4DC] hover:bg-amber-50/20 group">
                                <td className="px-5 py-5.5 border border-[#EAE4DC] text-left bg-amber-50/5">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-none" />
                                    <span className="text-xs font-semibold text-[#1C1814] font-display">{dept}</span>
                                  </div>
                                </td>
                                {weekdays.map((day) => {
                                  const key = `morning-${dept}-${day}-${activePlanningBranch}`;
                                  const keyLegacy = `morning-${dept}-${day}`;
                                  const team = schedule[key] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
                                  const optKey = `${key}-opt`;
                                  const optTeam = schedule[optKey] || [];
                                  const isClosed = isShiftClosed(day, 'morning');
                                  const isLocked = isCellLockedByPendingRequest('morning', dept, day);

                                  return (
                                    <td 
                                      key={day} 
                                      onClick={() => {
                                        if (isClosed) {
                                          setClosureAlert(`Cannot edit schedule. This shift is closed due to a branch day off or flexible holiday timeframe!`);
                                          return;
                                        }
                                        if (isLocked) {
                                          alert(`Cannot edit schedule cell. This cell is locked because there is a pending Shift Swap request involving these staff members.`);
                                          return;
                                        }
                                        if (isPastDay(day)) {
                                          if (!isSuperAdmin) {
                                            setShowRetroactiveModal({ shift: 'morning', dept, day });
                                            return;
                                          } else {
                                            setRetroToast({ show: true, message: `Super Admin Override: Modifying a retroactive past shift (${day}).` });
                                            setTimeout(() => setRetroToast(null), 3000);
                                          }
                                        }
                                        setEditingCell({ shift: 'morning', dept, day });
                                      }}
                                      className={`px-2 py-4.5 text-center cursor-pointer transition-all border border-[#EAE4DC] relative ${
                                        isClosed 
                                          ? 'bg-slate-200/50 cursor-not-allowed select-none' 
                                          : isLocked
                                            ? 'bg-amber-50/40 hover:bg-amber-50/50 cursor-not-allowed'
                                            : 'hover:bg-amber-500/10 hover:border-amber-500/30 bg-white'
                                      }`}
                                    >
                                      {isClosed ? null : isLocked ? (
                                        <div className="flex flex-col items-center justify-center gap-1 select-none py-1">
                                          <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700">
                                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                                            <span>LOCKED</span>
                                          </div>
                                          <span className="text-[10px] text-slate-700 leading-none">Swap Pending</span>
                                        </div>
                                      ) : (team.length > 0 || optTeam.length > 0) ? (
                                        <div className="space-y-1">
                                          {team.map((name, i) => {
                                            const hasLeave = getApprovedLeaveForStaff(name, day, 'morning');
                                            const weeklyHours = staffWeeklyHours[name] || 0;
                                            const isOT = false;

                                            return (
                                              <div 
                                                key={i} 
                                                className={`text-[12px] font-medium py-1 block truncate max-w-[120px] mx-auto text-center transition-all ${
                                                  hasLeave 
                                                    ? 'text-sky-750' 
                                                    : isOT 
                                                      ? 'text-[#7553FF]' 
                                                      : 'text-black'
                                                } hover:text-[#7553FF]`}
                                                title={`${name} (${weeklyHours}h this week${isOT ? ' - Overtime' : ''}${hasLeave ? ' - Approved Leave' : ''})`}
                                              >
                                                <span>{name}</span>
                                                {hasLeave && (
                                                  <span className="text-sky-750 font-medium text-[9px] block leading-none pt-0.5" id={`leave-conflict-badge-${name}`}>
                                                    (Leave)
                                                  </span>
                                                )}
                                                {!hasLeave && isOT && (
                                                  <span className="text-[#7553FF] font-medium text-[9px] block leading-none pt-0.5" id={`ot-badge-${name}`}>
                                                    (OT: {weeklyHours}h)
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
                                          {optTeam.map((name, i) => {
                                            const hasLeave = getApprovedLeaveForStaff(name, day, 'morning');
                                            const weeklyHours = staffWeeklyHours[name] || 0;
                                            return (
                                              <div 
                                                key={`opt-${i}`} 
                                                className="text-[11px] py-1 px-1.5 bg-amber-50/20 border border-amber-100 rounded-[4px] block truncate max-w-[120px] mx-auto text-center text-amber-800/70 italic font-sans"
                                                title={`${name} (Optional Stand-by: ${weeklyHours}h this week)`}
                                              >
                                                <div className="flex items-center justify-center gap-1">
                                                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold shrink-0">Opt</span>
                                                  <span className="truncate">{name}</span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <span className="text-sm text-amber-700/80 font-bold font-sans hover:text-amber-600 transition-colors inline-block px-1.5 py-0.5 hover:scale-110">+</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                          ))}
                        </>
                      )}

                      {/* 2. EVENING SHIFT SECTION */}
                      {(scheduleShiftFilter === 'All' || scheduleShiftFilter === 'Evening') && (
                        <>
                          <tr className="bg-purple-100/70 border-b-2 border-purple-200">
                            <td className="px-5 py-4 text-xs font-bold text-purple-900 border border-purple-200 bg-purple-100/80 text-left">
                              <div className="flex items-center gap-2 p-0.5">
                                <Moon className="w-4.5 h-4.5 text-purple-600 fill-[#7553FF]/15" />
                                <span className="font-display text-sm font-bold text-purple-950 uppercase tracking-wide">Evening Shift</span>
                              </div>
                            </td>
                            {weekdays.map((day) => {
                              const minRequired = shiftTypes.find(st => st.id === 'st-3' || st.name.toLowerCase() === 'evening')?.minStaff || 3;
                              let assignedCount = 0;
                              ['Service', 'Kitchen', 'Bar', 'Management'].forEach((dept) => {
                                const keyWithBranch = `evening-${dept}-${day}-${activePlanningBranch}`;
                                const keyLegacy = `evening-${dept}-${day}`;
                                const names = schedule[keyWithBranch] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
                                assignedCount += names.length;
                              });
                              const gap = minRequired - assignedCount;
                              const isClosed = isShiftClosed(day, 'evening');

                              return (
                                <td key={day} className={`px-2 py-3 text-center border border-purple-200 select-none transition-colors ${isClosed ? 'bg-slate-300/80 text-slate-500 font-bold' : 'bg-purple-100/40'}`}>
                                  {isClosed ? (
                                    <span className="text-[10px] font-bold text-slate-600/90 tracking-widest block uppercase font-mono py-1">Closed</span>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center gap-0.5">
                                      {gap > 0 && (
                                        <span className="inline-flex items-center text-rose-700 font-bold text-[11px] bg-rose-100/80 border border-rose-200 px-1.5 py-px rounded-[2px]" id={`gap-badge-evening-${day}`}>
                                          Gap: {gap}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>

                          {['Service', 'Kitchen', 'Bar', 'Management']
                            .filter((dept) => scheduleDepartmentFilter === 'All' || dept === scheduleDepartmentFilter)
                            .map((dept) => (
                              <tr key={`evening-${dept}`} className="border-b border-[#EAE4DC] hover:bg-purple-50/20 group">
                                <td className="px-5 py-5.5 border border-[#EAE4DC] text-left bg-purple-50/5">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#7553FF] shadow-none" />
                                    <span className="text-xs font-semibold text-[#1C1814] font-display">{dept}</span>
                                  </div>
                                </td>
                                {weekdays.map((day) => {
                                  const key = `evening-${dept}-${day}-${activePlanningBranch}`;
                                  const keyLegacy = `evening-${dept}-${day}`;
                                  const team = schedule[key] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
                                  const optKey = `${key}-opt`;
                                  const optTeam = schedule[optKey] || [];
                                  const isClosed = isShiftClosed(day, 'evening');
                                  const isLocked = isCellLockedByPendingRequest('evening', dept, day);

                                  return (
                                    <td 
                                      key={day} 
                                      onClick={() => {
                                        if (isClosed) {
                                          setClosureAlert(`Cannot edit schedule. This shift is closed due to a branch day off or flexible holiday timeframe!`);
                                          return;
                                        }
                                        if (isLocked) {
                                          alert(`Cannot edit schedule cell. This cell is locked because there is a pending Shift Swap request involving these staff members.`);
                                          return;
                                        }
                                        if (isPastDay(day)) {
                                          if (!isSuperAdmin) {
                                            setShowRetroactiveModal({ shift: 'evening', dept, day });
                                            return;
                                          } else {
                                            setRetroToast({ show: true, message: `Super Admin Override: Modifying a retroactive past shift (${day}).` });
                                            setTimeout(() => setRetroToast(null), 3000);
                                          }
                                        }
                                        setEditingCell({ shift: 'evening', dept, day });
                                      }}
                                      className={`px-2 py-4.5 text-center cursor-pointer transition-all border border-[#EAE4DC] relative ${
                                        isClosed 
                                          ? 'bg-slate-200/50 cursor-not-allowed select-none' 
                                          : isLocked
                                            ? 'bg-amber-50/40 hover:bg-amber-50/50 cursor-not-allowed'
                                            : 'hover:bg-[#7553FF]/10 hover:border-[#7553FF]/30 bg-white'
                                      }`}
                                    >
                                      {isClosed ? null : isLocked ? (
                                        <div className="flex flex-col items-center justify-center gap-1 select-none py-1">
                                          <div className="flex items-center gap-1 text-[11px] font-medium text-amber-700">
                                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                                            <span>LOCKED</span>
                                          </div>
                                          <span className="text-[10px] text-slate-700 leading-none">Swap Pending</span>
                                        </div>
                                      ) : (team.length > 0 || optTeam.length > 0) ? (
                                        <div className="space-y-1">
                                          {team.map((name, i) => {
                                            const hasLeave = getApprovedLeaveForStaff(name, day, 'evening');
                                            const weeklyHours = staffWeeklyHours[name] || 0;
                                            const isOT = false;

                                            return (
                                              <div 
                                                key={i} 
                                                className={`text-[12px] font-medium py-1 block truncate max-w-[120px] mx-auto text-center transition-all ${
                                                  hasLeave 
                                                    ? 'text-sky-755' 
                                                    : isOT 
                                                      ? 'text-[#7553FF]' 
                                                      : 'text-black'
                                                } hover:text-[#7553FF]`}
                                                title={`${name} (${weeklyHours}h this week${isOT ? ' - Overtime' : ''}${hasLeave ? ' - Approved Leave' : ''})`}
                                              >
                                                <span>{name}</span>
                                                {hasLeave && (
                                                  <span className="text-sky-755 font-medium text-[9px] block leading-none pt-0.5" id={`leave-conflict-badge-${name}`}>
                                                    (Leave)
                                                  </span>
                                                )}
                                                {!hasLeave && isOT && (
                                                  <span className="text-[#7553FF] font-medium text-[9px] block leading-none pt-0.5" id={`ot-badge-${name}`}>
                                                    (OT: {weeklyHours}h)
                                                  </span>
                                                )}
                                              </div>
                                            );
                                          })}
                                          {optTeam.map((name, i) => {
                                            const hasLeave = getApprovedLeaveForStaff(name, day, 'evening');
                                            const weeklyHours = staffWeeklyHours[name] || 0;
                                            return (
                                              <div 
                                                key={`opt-${i}`} 
                                                className="text-[11px] py-1 px-1.5 bg-purple-50/20 border border-purple-100 rounded-[4px] block truncate max-w-[120px] mx-auto text-center text-[#7553FF]/70 italic font-sans"
                                                title={`${name} (Optional Stand-by: ${weeklyHours}h this week)`}
                                              >
                                                <div className="flex items-center justify-center gap-1">
                                                  <span className="text-[9px] bg-purple-100 text-[#7553FF] px-1 py-0.2 rounded font-bold shrink-0">Opt</span>
                                                  <span className="truncate">{name}</span>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      ) : (
                                        <span className="text-sm text-[#7553FF] font-bold font-sans hover:text-[#623EE2] transition-colors inline-block px-1.5 py-0.5 hover:scale-110">+</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-full bg-white border border-slate-200 rounded-2xl p-0 shadow-sm space-y-0 font-sans overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 p-5 md:p-6 bg-white">
                    <div>
                      <h4 className="text-lg font-bold text-[#1C1814] font-display">May 2025 Calendar</h4>
                      <p className="text-[14px] text-slate-700">Click any day to view, add, or adjust shift rosters</p>
                    </div>
                    <div className="flex items-center gap-4 text-[14px] text-slate-600 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-500" />
                        <span>Morning</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#7553FF]" />
                        <span>Evening</span>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Unified Grid Table Layout */}
                  <div className="p-5 md:p-6 pt-0">
                    <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-3xs">
                    {/* Header Row */}
                    <div className="grid grid-cols-7 bg-[#FAF9F5] border-b border-slate-200 text-center">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, idx) => (
                        <div 
                          key={d} 
                          className={`py-3 text-[14px] font-bold text-[#1D1916] tracking-wider  font-display ${
                            idx < 6 ? 'border-r border-slate-200' : ''
                          }`}
                        >
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Weeks/Days Matrix Grid */}
                    <div className="divide-y divide-slate-200">
                      {calendarWeeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="grid grid-cols-7 bg-white">
                          {week.map((day, dayIdx) => {
                            const isSelected = selectedMonthDay && selectedMonthDay.dayNumber === day.dayNumber && selectedMonthDay.month === day.month;
                            const isCurrent = day.month === 'current';
                            const counts = getDayShiftsCount(day.weekday);
                            
                            return (
                              <div
                                key={dayIdx}
                                onClick={() => {
                                  setSelectedMonthDay(day);
                                  setIsInspectorOpen(true);
                                }}
                                className={`min-h-[135px] md:min-h-[150px] p-3 flex flex-col justify-between cursor-pointer transition-all ${
                                  !isCurrent 
                                    ? 'bg-slate-50/40 text-slate-700 opacity-60 hover:opacity-100' 
                                    : isSelected 
                                    ? 'bg-[#7553FF]/[0.03] ring-1 ring-[#7553FF] ring-inset relative z-10'
                                    : 'bg-white hover:bg-slate-50/50'
                                } ${dayIdx < 6 ? 'border-r border-slate-200' : ''}`}
                              >
                                {/* Day Number Header & Status Dot */}
                                <div className="flex items-center justify-between">
                                  <span className={`text-[14px] font-medium flex items-center justify-center rounded-full ${
                                    day.isToday 
                                      ? 'bg-[#7553FF] text-white w-6 h-6 shadow-xs font-medium' 
                                      : isSelected 
                                      ? 'text-[#7553FF]' 
                                      : 'text-slate-800'
                                  }`}>
                                    {day.dayNumber}
                                  </span>
                                </div>

                                {/* List of Active Shifts inside Day Cell */}
                                <div className="space-y-1.5 mt-2 flex-1">
                                  {isCurrent && counts.morningCount > 0 && (
                                    <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2 py-2 rounded-md border border-amber-200/30 text-[14px] font-normal leading-none">
                                      <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                      <span className="truncate">{counts.morningCount} Morning</span>
                                    </div>
                                  )}
                                  {isCurrent && counts.eveningCount > 0 && (
                                    <div className="flex items-center gap-1.5 bg-[#7553FF]/5 text-[#4E25C4] px-2 py-2 rounded-md border border-[#7553FF]/15 text-[14px] font-normal leading-none">
                                      <Moon className="w-3 h-3 text-[#7553FF] shrink-0" />
                                      <span className="truncate">{counts.eveningCount} Evening</span>
                                    </div>
                                  )}
                                  
                                  {isCurrent && counts.total === 0 && (
                                    <span className="text-[14px] text-slate-700 italic block py-1 pl-1 leading-tight font-normal">No shifts</span>
                                  )}
                                </div>

                                {/* Footer count inside Day Cell */}
                                {isCurrent && counts.total > 0 && (
                                  <div className="text-[14px] text-slate-700 font-normal text-right pt-1.5 border-t border-slate-100/80 mt-1 leading-none">
                                    {counts.total} rostered
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        )}

        {/* TAB 2: STAFF & ROLES VIEW - STYLED EXACTLY TO MOCKUP */}
        {activeSubTab === 'staff' && (
          <motion.div
            key="staff"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* INNER SUB-TABS SWITCHER WITH CONTROLS ON THE RIGHT */}
            <div className="flex items-center justify-between border-b border-slate-100 w-full mb-6 relative">
              <div className="flex">
                <button
                  onClick={() => setStaffInnerTab('staff')}
                  className={`pb-3 px-5 text-[14px] font-bold border-b-2 transition-all cursor-pointer relative -mb-px ${
                    staffInnerTab === 'staff'
                      ? 'border-[#7553FF] text-[#7553FF]'
                      : 'border-transparent text-slate-700 hover:text-slate-600'
                  }`}
                >
                  Staff
                </button>
                <button
                  onClick={() => setStaffInnerTab('roles')}
                  className={`pb-3 px-5 text-[14px] font-bold border-b-2 transition-all cursor-pointer relative -mb-px ${
                    staffInnerTab === 'roles'
                      ? 'border-[#7553FF] text-[#7553FF]'
                      : 'border-transparent text-slate-700 hover:text-slate-600'
                  }`}
                >
                  Job Roles
                </button>
              </div>

              {/* Staff layout: standard Controls (Import and + Add Staff) */}
              <div className="flex items-center gap-2.5 pb-2.5">
                {staffInnerTab !== 'roles' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsSmartImportOpen(true)}
                      className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-[#7553FF] font-semibold text-[14px] h-10 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-3xs"
                    >
                      <Upload className="w-4 h-4 text-[#7553FF]" />
                      <span>Import</span>
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => {
                    if (staffInnerTab === 'staff') {
                      setAddStaffActiveTab('personal');
                      setIsAddingUser(true);
                    } else {
                      setIsAddingRole(true);
                    }
                  }}
                  className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-lg transition-all flex items-center gap-2 h-10 shadow-xs cursor-pointer border-none"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>{staffInnerTab === 'staff' ? 'Add Staff' : 'Add Role'}</span>
                </button>
              </div>
            </div>

            {staffInnerTab === 'staff' ? (() => {
              const filteredStaff = staff.filter(member => {
                const term = searchQuery.toLowerCase().trim();
                if (term) {
                  const matchName = member.name.toLowerCase().includes(term);
                  const matchEmail = member.email.toLowerCase().includes(term);
                  const matchDept = member.department?.toLowerCase().includes(term) || member.role.toLowerCase().includes(term);
                  const matchBranch = member.branch?.toLowerCase().includes(term);
                  if (!matchName && !matchEmail && !matchDept && !matchBranch) return false;
                }
                if (roleFilter !== 'All') {
                  const deptName = member.department || member.role;
                  if (deptName.toLowerCase() !== roleFilter.toLowerCase()) return false;
                }
                if (branchFilter !== 'All') {
                  if (member.branch?.toLowerCase() !== branchFilter.toLowerCase()) return false;
                }
                if (statusFilter !== 'All') {
                  const isAct = statusFilter === 'Active';
                  if (member.isActive !== isAct) return false;
                }
                return true;
              });

              const totalStaffEntries = filteredStaff.length;
              const showStart = totalStaffEntries === 0 ? 0 : (staffPage - 1) * itemsPerPage + 1;
              const showEnd = Math.min(staffPage * itemsPerPage, totalStaffEntries);
              const paginatedStaff = filteredStaff.slice((staffPage - 1) * itemsPerPage, Math.min((staffPage - 1) * itemsPerPage + itemsPerPage, totalStaffEntries));

              const isAllFilteredSelected = filteredStaff.length > 0 && filteredStaff.every(member => selectedStaffIds.includes(member.id));
              const handleSelectAll = () => {
                if (isAllFilteredSelected) {
                  const filteredIds = filteredStaff.map(m => m.id);
                  setSelectedStaffIds(prev => prev.filter(id => !filteredIds.includes(id)));
                } else {
                  const filteredIds = filteredStaff.map(m => m.id);
                  setSelectedStaffIds(prev => Array.from(new Set([...prev, ...filteredIds])));
                }
              };

              const totalPages = Math.max(1, Math.ceil(totalStaffEntries / itemsPerPage));

              return (
                <>
                  {/* 3 Stats Cards Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                    {/* Card 1: Total Staff */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
                      <div className="p-3.5 bg-[#EEF2FF] rounded-[14px] flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#7553FF]" />
                      </div>
                      <div className="space-y-0.5 leading-none">
                        <span className="text-[14px] font-medium text-slate-700 block mb-1">Total Staff</span>
                        <span className="text-3xl font-extrabold text-slate-800 font-display block">{staff.length}</span>
                      <span className="text-[13px] text-slate-700 block pt-1">All locations</span>
                    </div>
                  </div>

                  {/* Card 3: New This Month */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
                    <div className="p-3.5 bg-amber-50 rounded-[14px] flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="space-y-0.5 leading-none">
                      <span className="text-[14px] font-medium text-slate-700 block mb-1">New This Month</span>
                      <span className="text-3xl font-extrabold text-slate-800 font-display block">6</span>
                      <span className="text-[13px] text-slate-700 block pt-1 font-sans">This month</span>
                    </div>
                  </div>

                  {/* Card 4: Terminated */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
                    <div className="p-3.5 bg-rose-50 rounded-[14px] flex items-center justify-center">
                      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                      </svg>
                    </div>
                    <div className="space-y-0.5 leading-none">
                      <span className="text-[14px] font-medium text-slate-700 block mb-1">Terminated</span>
                      <span className="text-3xl font-extrabold text-slate-800 font-display block">2</span>
                      <span className="text-[13px] text-slate-700 block pt-1 font-sans">This month</span>
                    </div>
                  </div>
                </div>

                {/* FILTERS AND SEARCH SECTION */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  {/* Search box */}
                  <div className="relative w-full lg:max-w-md text-left">
                    <div className="absolute inset-y-0 left-3 pl-1 flex items-center pointer-events-none text-slate-700">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setStaffPage(1);
                      }}
                      placeholder="Search staff by name, code, email..."
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-700 font-sans transition-all outline-hidden shadow-3xs"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-700 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Inline Dropdown Selectors */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Role selector */}
                    <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
                      <span className="text-slate-700">Role:</span>
                      <select 
                        value={roleFilter}
                        onChange={(e) => {
                          setRoleFilter(e.target.value);
                          setStaffPage(1);
                        }}
                        className="bg-transparent text-slate-800 font-semibold cursor-pointer focus:outline-hidden border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
                      >
                        <option value="All">All</option>
                        <option value="Operation">Operation</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Bar">Bar</option>
                      </select>
                    </div>

                    {/* Branch Selector */}
                    <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
                      <span className="text-slate-700">Branch:</span>
                      <select 
                        value={branchFilter}
                        onChange={(e) => {
                          setBranchFilter(e.target.value);
                          setStaffPage(1);
                        }}
                        className="bg-transparent text-slate-800 font-semibold cursor-pointer focus:outline-hidden border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
                      >
                        <option value="All">All</option>
                        <option value="HCM 1">HCM 1</option>
                        <option value="HCM 2">HCM 2</option>
                        <option value="HN 1">HN 1</option>
                        <option value="HQ">HQ</option>
                      </select>
                    </div>

                    {/* Status Selector */}
                    <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
                      <span className="text-slate-700">Status:</span>
                      <select 
                        value={statusFilter}
                        onChange={(e) => {
                          setStatusFilter(e.target.value);
                          setStaffPage(1);
                        }}
                        className="bg-transparent text-slate-800 font-semibold cursor-pointer focus:outline-hidden border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
                      >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Filters trigger button */}
                    <button 
                      onClick={() => alert('Advanced filtering criteria has been integrated directly into active selectors.')}
                      className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 hover:border-slate-350 bg-white px-4 py-2 rounded-xl text-[14px] text-slate-750 font-semibold cursor-pointer transition-colors shadow-3xs"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                      <span>Filters</span>
                    </button>
                  </div>
                </div>

                {/* BULK ACTIONS BANNER */}
                {selectedStaffIds.length > 0 && (
                  <div className="mb-4 p-4 bg-[#7553FF]/5 border border-[#7553FF]/15 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn relative">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#7553FF] text-white flex items-center justify-center text-xs font-bold">
                        {selectedStaffIds.length}
                      </div>
                      <span className="text-[14px] text-slate-700 font-medium">
                        staff members selected
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Change Status Dropdown */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => {
                            setBulkStatusDropdownOpen(!bulkStatusDropdownOpen);
                            setBulkStoreDropdownOpen(false);
                            setBulkContractDropdownOpen(false);
                            setBulkJobRoleDropdownOpen(false);
                          }}
                          className="h-[38px] px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                        >
                          <span>Change Status</span>
                          <ChevronDown className="w-4 h-4 text-slate-700" />
                        </button>
                        {bulkStatusDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setBulkStatusDropdownOpen(false)} />
                            <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-dropdown py-1 z-40 animate-fadeIn">
                              <button
                                onClick={() => {
                                  setStaff((prev: any[]) => prev.map(s => selectedStaffIds.includes(s.id) ? { ...s, isActive: true } : s));
                                  alert(`Successfully set ${selectedStaffIds.length} selected staff profiles as ACTIVE.`);
                                  setBulkStatusDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-[#7553FF]/5 hover:text-[#7553FF] text-[14px] font-sans text-emerald-600 font-medium transition-colors border-none bg-transparent cursor-pointer"
                              >
                                Active
                              </button>
                              <button
                                onClick={() => {
                                  setStaff((prev: any[]) => prev.map(s => selectedStaffIds.includes(s.id) ? { ...s, isActive: false } : s));
                                  alert(`Successfully set ${selectedStaffIds.length} selected staff profiles as INACTIVE.`);
                                  setBulkStatusDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-[#7553FF]/5 hover:text-[#7553FF] text-[14px] font-sans text-rose-600 font-medium transition-colors border-none bg-transparent cursor-pointer"
                              >
                                Inactive
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Change Store Dropdown */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => {
                            setBulkStoreDropdownOpen(!bulkStoreDropdownOpen);
                            setBulkStatusDropdownOpen(false);
                            setBulkContractDropdownOpen(false);
                            setBulkJobRoleDropdownOpen(false);
                          }}
                          className="h-[38px] px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                        >
                          <span>Change Store</span>
                          <ChevronDown className="w-4 h-4 text-slate-700" />
                        </button>
                        {bulkStoreDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setBulkStoreDropdownOpen(false)} />
                            <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-lg shadow-dropdown py-1 z-40 animate-fadeIn">
                              {['HCM 1', 'HCM 2', 'HN 1', 'HQ'].map((store) => (
                                <button
                                  key={store}
                                  onClick={() => {
                                    setStaff((prev: any[]) => prev.map(s => selectedStaffIds.includes(s.id) ? { ...s, branch: store } : s));
                                    alert(`Successfully moved ${selectedStaffIds.length} selected staff to ${store}.`);
                                    setBulkStoreDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2 hover:bg-[#7553FF]/5 hover:text-[#7553FF] text-[14px] font-sans text-slate-700 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                  {store}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Change Contract Type Dropdown */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => {
                            setBulkContractDropdownOpen(!bulkContractDropdownOpen);
                            setBulkStatusDropdownOpen(false);
                            setBulkStoreDropdownOpen(false);
                            setBulkJobRoleDropdownOpen(false);
                          }}
                          className="h-[38px] px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                        >
                          <span>Change Contract type</span>
                          <ChevronDown className="w-4 h-4 text-slate-700" />
                        </button>
                        {bulkContractDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setBulkContractDropdownOpen(false)} />
                            <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-dropdown py-1 z-40 animate-fadeIn">
                              {['Full-time', 'Part-time', 'Minijob'].map((type) => (
                                <button
                                  key={type}
                                  onClick={() => {
                                    setStaff((prev: any[]) => prev.map(s => selectedStaffIds.includes(s.id) ? { ...s, status: type } : s));
                                    alert(`Successfully updated contract type to ${type} for ${selectedStaffIds.length} selected staff.`);
                                    setBulkContractDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2 hover:bg-[#7553FF]/5 hover:text-[#7553FF] text-[14px] font-sans text-slate-700 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                  {type}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Change Job Role Dropdown */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => {
                            setBulkJobRoleDropdownOpen(!bulkJobRoleDropdownOpen);
                            setBulkStatusDropdownOpen(false);
                            setBulkStoreDropdownOpen(false);
                            setBulkContractDropdownOpen(false);
                          }}
                          className="h-[38px] px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                        >
                          <span>Change job role</span>
                          <ChevronDown className="w-4 h-4 text-slate-700" />
                        </button>
                        {bulkJobRoleDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setBulkJobRoleDropdownOpen(false)} />
                            <div className="absolute right-0 mt-1.5 w-48 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-dropdown py-1 z-40 animate-fadeIn">
                              {(roles.length > 0 ? roles.map(r => r.name) : ['Barista', 'Server', 'Chef', 'Host', 'Kitchen Assistant', 'Manager']).map((roleName) => (
                                <button
                                  key={roleName}
                                  onClick={() => {
                                    setStaff((prev: any[]) => prev.map(s => selectedStaffIds.includes(s.id) ? { ...s, role: roleName, department: roleName } : s));
                                    alert(`Successfully updated job role to ${roleName} for ${selectedStaffIds.length} selected staff.`);
                                    setBulkJobRoleDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-2 hover:bg-[#7553FF]/5 hover:text-[#7553FF] text-[14px] font-sans text-slate-700 transition-colors border-none bg-transparent cursor-pointer"
                                >
                                  {roleName}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Delete Staff Button */}
                      <button
                        onClick={() => {
                          setBulkStatusDropdownOpen(false);
                          setBulkStoreDropdownOpen(false);
                          setBulkContractDropdownOpen(false);
                          setBulkJobRoleDropdownOpen(false);
                          setShowBulkDeleteConfirm(true);
                        }}
                        className="h-[38px] px-3 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold text-[14px] rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5"
                      >
                        <X className="w-4 h-4 text-rose-700" />
                        <span>Delete staff</span>
                      </button>

                    </div>

                    {/* Delete Confirmation Modal Popup */}
                    {showBulkDeleteConfirm && (
                      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-[440px] text-left font-sans space-y-4"
                        >
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-800">Confirm Deletion</h3>
                            <p className="text-[14px] text-slate-700 leading-relaxed">
                              Are you sure you want to permanently delete <strong className="text-[#7553FF]">{selectedStaffIds.length}</strong> selected staff member(s)? This action cannot be undone.
                            </p>
                          </div>
                          <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                              onClick={() => setShowBulkDeleteConfirm(false)}
                              className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[14px] rounded-lg cursor-pointer transition-all border-none"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                setStaff((prev: any[]) => prev.filter(s => !selectedStaffIds.includes(s.id)));
                                setSelectedStaffIds([]);
                                setShowBulkDeleteConfirm(false);
                                alert("Successfully deleted selected staff members.");
                              }}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[14px] rounded-lg cursor-pointer transition-all border-none shadow-sm"
                            >
                              Confirm Delete
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}

                {/* STAFF DATA TABLE COMPLYING WITH DESIGN.MD STANDARDS */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse bg-white text-left">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                          <th className="px-5 py-4 w-12 text-center">
                            <input 
                              type="checkbox" 
                              className="rounded-[4px] border-slate-300 text-[#7553FF] focus:ring-[#7553FF] w-4 h-4 cursor-pointer transition-all" 
                              checked={isAllFilteredSelected}
                              onChange={handleSelectAll}
                            />
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Name
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Job roles
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Branch
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Contract Type
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Status
                          </th>
                          <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-center w-36">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {paginatedStaff.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-10 text-center text-[14px] text-slate-700 font-sans">
                              No compatible staff found matching active search criteria.
                            </td>
                          </tr>
                        ) : (
                          paginatedStaff.map((member) => {
                            const department = member.department || member.role;
                            const branch = member.branch || 'HCM 1';
                            const isChecked = selectedStaffIds.includes(member.id);
                            
                            return (
                              <tr key={member.id} className="hover:bg-slate-50/20 transition-colors">
                                {/* Checkbox cell */}
                                <td className="px-5 py-4 text-center">
                                  <input 
                                    type="checkbox" 
                                    className="rounded-[4px] border-slate-300 text-[#7553FF] focus:ring-[#7553FF] w-4 h-4 cursor-pointer transition-all" 
                                    checked={isChecked}
                                    onChange={() => {
                                      setSelectedStaffIds(prev => 
                                        prev.includes(member.id) 
                                          ? prev.filter(id => id !== member.id) 
                                          : [...prev, member.id]
                                      );
                                    }}
                                  />
                                </td>

                                {/* Name Cell with Avatar & Email */}
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#7553FF]/10 text-[#7553FF] font-bold text-[13px] flex items-center justify-center shrink-0 border border-[#7553FF]/20 relative overflow-hidden select-none">
                                      {getInitials(member.name)}
                                      <img 
                                        src={member.avatar} 
                                        alt={member.name}
                                        onError={(e) => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                        className="absolute inset-0 w-full h-full rounded-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                    <div className="text-left leading-snug">
                                      <p className="text-[14px] font-semibold text-slate-800 font-sans hover:text-[#7553FF] cursor-pointer transition-colors flex items-center gap-1.5 flex-wrap" onClick={() => setSelectedUserForView(member)}>
                                        <span>{member.name}</span>
                                        {isPermitExpired(member) && (
                                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200 rounded animate-pulse" title="Residence Permit Expired!">
                                            <AlertCircle className="w-2.5 h-2.5 text-rose-500 shrink-0" />
                                            <span>Expired Permit</span>
                                          </span>
                                        )}
                                        {isPermitExpiringSoon(member) && (
                                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 rounded" title="Residence Permit Expiring Soon (<= 7 days)">
                                            <AlertTriangle className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                                            <span>Visa Expiring</span>
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-[14px] text-slate-700 font-sans">
                                        {member.email}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                {/* Job roles Cell */}
                                <td className="px-5 py-4 text-[14px] text-slate-700 font-sans text-left">
                                  {department}
                                </td>

                                {/* Branch Cell */}
                                <td className="px-5 py-4 text-[14px] text-slate-700 font-sans text-left">
                                  {branch}
                                </td>

                                {/* Contract Type Cell */}
                                <td className="px-5 py-4 text-[14px] text-slate-700 font-sans text-left">
                                  {member.status}
                                </td>

                                {/* Status Cell (With Dot Badge) */}
                                <td className="px-5 py-4 text-left">
                                  {member.isActive ? (
                                    <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200 text-[14px] font-sans font-medium px-2.5 py-0.5 rounded-[2px] select-none tracking-wide">
                                      ACTIVE
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center bg-red-50 text-red-700 border border-red-200 text-[14px] font-sans font-medium px-2.5 py-0.5 rounded-[2px] select-none tracking-wide">
                                      INACTIVE
                                    </span>
                                  )}
                                </td>

                                {/* Action Cell */}
                                <td className="px-5 py-4">
                                  <div className="flex items-center justify-center gap-3">
                                    <button
                                      onClick={() => setSelectedUserForView(member)}
                                      className="p-1 text-slate-700 hover:text-[#7553FF] transition-all hover:scale-110 cursor-pointer"
                                      title="View Details"
                                    >
                                      <Eye className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditStaffActiveTab('personal'); setEditingStaffMember(member);
                                      }}
                                      className="p-1 text-slate-700 hover:text-[#7553FF] transition-all hover:scale-110 cursor-pointer"
                                      title="Edit Staff Member"
                                    >
                                      <Pencil className="w-5 h-5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Dynamic Footer with responsive dropup selector */}
                  <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[14px] text-slate-700">
                    <div className="flex items-center gap-2">
                      <span>Show</span>
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setStaffPage(1);
                        }}
                        className="bg-white border border-slate-200 py-1 px-1.5 rounded-lg text-slate-800 font-medium text-[14px] cursor-pointer focus:ring-1 focus:ring-[#7553FF]"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                      <span>per page</span>
                    </div>

                    <p className="font-sans text-left text-[14px]">
                      {showStart} - {showEnd} of {totalStaffEntries}
                    </p>

                    {/* Pagination controls mimicking screenshot beautifully */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto select-none">
                      <button 
                        disabled={staffPage === 1}
                        onClick={() => setStaffPage(prev => Math.max(prev - 1, 1))} 
                        className={`w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer transition-colors ${staffPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <button 
                            key={pageNum}
                            onClick={() => setStaffPage(pageNum)} 
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-semibold cursor-pointer transition-all ${
                              staffPage === pageNum 
                                ? 'bg-[#7553FF]/10 text-[#7553FF] border border-[#7553FF]/20' 
                                : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button 
                        disabled={staffPage === totalPages}
                        onClick={() => setStaffPage(prev => Math.min(prev + 1, totalPages))} 
                        className={`w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer transition-colors ${staffPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })() : (
              /* ROLES VIEW - SEAMLESSLY RENDERED IN INNER SUB-TAB */
              <div className="space-y-6">
                {/* FILTERS & SEARCH ROW EXTREMELY HIGH FIDELITY TO SCREENSHOT */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  {/* Search input with search icon on the left */}
                  <div className="relative flex-1 max-w-md text-left">
                    <div className="absolute inset-y-0 left-3 pl-1 flex items-center pointer-events-none text-slate-700">
                      <Search className="w-4.5 h-4.5" />
                    </div>
                    <input
                      type="text"
                      value={rolesSearchQuery}
                      onChange={(e) => {
                        setRolesSearchQuery(e.target.value);
                        setRolesPage(1);
                      }}
                      placeholder="Search role by name or description..."
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-700 font-sans transition-all outline-hidden shadow-3xs"
                    />
                    {rolesSearchQuery && (
                      <button 
                        onClick={() => setRolesSearchQuery('')}
                        className="absolute inset-y-0 right-3 flex items-center text-slate-700 hover:text-slate-600 border-none bg-transparent"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Filter action button or dynamic Status select */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2.5 rounded-xl text-[14px] shadow-3xs">
                      <span className="text-slate-700 font-sans">Status:</span>
                      <select 
                        value={rolesStatusFilter}
                        onChange={(e) => {
                          setRolesStatusFilter(e.target.value as 'All' | 'Active' | 'Inactive');
                          setRolesPage(1);
                        }}
                        className="bg-transparent text-slate-800 font-bold cursor-pointer focus:outline-hidden border-none p-0 pr-1.5 focus:ring-0 text-[14px] font-sans"
                      >
                        <option value="All">All statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => {
                        // Toggle filters between All, Active, Inactive
                        if (rolesStatusFilter === 'All') {
                          setRolesStatusFilter('Active');
                        } else if (rolesStatusFilter === 'Active') {
                          setRolesStatusFilter('Inactive');
                        } else {
                          setRolesStatusFilter('All');
                        }
                        setRolesPage(1);
                      }}
                      className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 hover:border-slate-350 bg-white px-4 py-2.5 rounded-xl text-[14px] text-slate-700 font-semibold cursor-pointer transition-colors shadow-3xs h-10"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-slate-700" />
                      <span className="font-sans">Filters</span>
                    </button>
                  </div>
                </div>

                {/* THE UNIFIED DATA TABLE COMPLYING WITH DESIGN.MD STANDARDS */}
                <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse bg-white text-left">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left">
                            Role Name
                          </th>
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left max-w-sm">
                            Description
                          </th>
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left w-24">
                            Users
                          </th>
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left w-32">
                            Status
                          </th>
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-left w-52">
                            Last Updated
                          </th>
                          <th className="px-6 py-4 font-serif text-[14px] font-medium text-slate-800  tracking-widest text-right pr-8 w-28">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(() => {
                          const filtered = roles.filter(role => {
                            const term = rolesSearchQuery.toLowerCase().trim();
                            if (term) {
                              const matchName = role.name.toLowerCase().includes(term);
                              const matchDesc = role.description.toLowerCase().includes(term);
                              if (!matchName && !matchDesc) return false;
                            }
                            if (rolesStatusFilter !== 'All') {
                              if (role.status !== rolesStatusFilter) return false;
                            }
                            return true;
                          });

                          const totalRolesEntries = filtered.length;
                          const showStart = (rolesPage - 1) * rolesItemsPerPage;
                          const showEnd = Math.min(showStart + rolesItemsPerPage, totalRolesEntries);
                          const paginated = filtered.slice(showStart, showEnd);

                          if (paginated.length === 0) {
                            return (
                              <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[14px] text-slate-700 font-sans">
                                  No compatible roles found matching active search filters.
                                </td>
                              </tr>
                            );
                          }

                          return paginated.map((role) => (
                            <tr key={role.id} className="hover:bg-slate-50/20 transition-colors">
                              {/* Role Name cell with beautiful accent coloring */}
                              <td className="px-6 py-4 text-left">
                                <span 
                                  className="text-[14px] font-semibold text-black font-sans"
                                >
                                  {role.name}
                                </span>
                              </td>

                              {/* Description cell */}
                              <td className="px-6 py-4 text-[14px] text-slate-600 font-sans leading-relaxed text-left max-w-sm">
                                {role.description}
                              </td>

                              {/* Users count cell */}
                              <td className="px-6 py-4 text-[14px] text-slate-800 font-bold font-sans text-left">
                                {role.users}
                              </td>

                              {/* Status badge cell */}
                              <td className="px-6 py-4 text-left">
                                {role.status === 'Active' ? (
                                  <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200 text-[14px] font-sans font-medium px-2.5 py-0.5 rounded-[2px] select-none tracking-wide">
                                    ACTIVE
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center bg-red-50 text-red-700 border border-red-200 text-[14px] font-sans font-medium px-2.5 py-0.5 rounded-[2px] select-none tracking-wide">
                                    INACTIVE
                                  </span>
                                )}
                              </td>

                              {/* Last updated cell */}
                              <td className="px-6 py-4 text-[14px] text-slate-700 font-sans text-left">
                                {role.lastUpdated}
                              </td>

                              {/* Action cell details or edit actions */}
                              <td className="px-6 py-4 text-right pr-8">
                                <div className="flex items-center justify-end gap-3.5">
                                  <button
                                    onClick={() => setSelectedRoleForView(role)}
                                    className="p-1 text-slate-700 hover:text-[#7553FF] hover:bg-slate-50 rounded-md transition-all cursor-pointer border-none bg-transparent"
                                    title="View Details"
                                  >
                                    <Eye className="w-4.5 h-4.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      const editDesc = prompt(`Edit description for role "${role.name}":`, role.description);
                                      if (editDesc !== null && editDesc.trim() !== '') {
                                        setRoles(prev => prev.map(r => r.id === role.id ? { ...r, description: editDesc, lastUpdated: 'Just now' } : r));
                                      }
                                    }}
                                    className="p-1 text-slate-700 hover:text-[#7553FF] hover:bg-slate-50 rounded-md transition-all cursor-pointer border-none bg-transparent"
                                    title="Edit Role"
                                  >
                                    <Pencil className="w-4.5 h-4.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRole(role)}
                                    className="p-1 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all cursor-pointer border-none bg-transparent"
                                    title="Delete Role"
                                  >
                                    <Trash2 className="w-4.5 h-4.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>

                  {/* Dynamic page navigator identically resembling the mockup */}
                  {(() => {
                    const filteredList = roles.filter(role => {
                      const term = rolesSearchQuery.toLowerCase().trim();
                      if (term) {
                        return role.name.toLowerCase().includes(term) || role.description.toLowerCase().includes(term);
                      }
                      if (rolesStatusFilter !== 'All') {
                        return role.status === rolesStatusFilter;
                      }
                      return true;
                    });
                    const totalRolesEntries = filteredList.length;
                    const showStart = totalRolesEntries === 0 ? 0 : (rolesPage - 1) * rolesItemsPerPage + 1;
                    const showEnd = Math.min(rolesPage * rolesItemsPerPage, totalRolesEntries);
                    const totalPages = Math.ceil(totalRolesEntries / rolesItemsPerPage);

                    return (
                      <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[14px] text-slate-700 select-none">
                        <div className="flex items-center gap-2">
                          <span>Show</span>
                          <select 
                            value={rolesItemsPerPage}
                            onChange={(e) => {
                              setRolesItemsPerPage(Number(e.target.value));
                              setRolesPage(1);
                            }}
                            className="bg-white border border-slate-200 py-1 px-1.5 rounded-lg text-slate-800 font-medium text-[14px] cursor-pointer focus:ring-1 focus:ring-[#7553FF]"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                          <span>per page</span>
                        </div>

                        <p className="font-sans text-left text-[14px] text-slate-700 font-medium">
                          {showStart} - {showEnd} of {totalRolesEntries}
                        </p>

                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <button 
                            disabled={rolesPage === 1}
                            onClick={() => setRolesPage(prev => Math.max(prev - 1, 1))} 
                            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => setRolesPage(pageNum)}
                              className={`w-8 h-8 flex items-center justify-center rounded-lg text-[14px] font-semibold cursor-pointer transition-all ${
                                rolesPage === pageNum 
                                  ? 'bg-[#7553FF]/10 text-[#7553FF] border border-[#7553FF]/20' 
                                  : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}
                          
                          <button 
                            disabled={rolesPage === totalPages || totalPages === 0}
                            onClick={() => setRolesPage(prev => Math.min(prev + 1, totalPages))} 
                            className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ADD JOB ROLE FLOATING PANEL MODAL */}
                {isAddingRole && (
                  <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-xl relative space-y-4 text-left font-sans"
                    >
                      <button 
                        onClick={() => setIsAddingRole(false)}
                        className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5 text-slate-700" />
                      </button>

                      <div className="space-y-1">
                        <h3 className="text-lg font-medium text-slate-800 font-display">Add New Job Roles</h3>
                        <p className="text-xs text-slate-700">Define a custom operational role at your store (e.g., Waiter, Receptionist, Chef) with custom responsibilities.</p>
                      </div>

                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newRole.name) return;
                          setRoles([
                            ...roles, 
                            {
                              id: String(roles.length + 1),
                              name: newRole.name,
                              description: newRole.description || 'Custom security role template.',
                              users: 0,
                              status: newRole.status,
                              lastUpdated: 'Just now'
                            }
                          ]);
                          setNewRole({ name: '', description: '', users: 0, status: 'Active' });
                          setIsAddingRole(false);
                        }}
                        className="space-y-4 pt-2"
                      >
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-700 tracking-wider block">Role Name</label>
                          <input 
                            type="text" 
                            required
                            value={newRole.name}
                            onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                            placeholder="e.g. Delivery Supervisor, Head Chef"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#7553FF] focus:bg-white rounded-xl text-[14px] text-slate-800 outline-hidden focus:ring-1 focus:ring-[#7553FF] transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-700 tracking-wider block">Description</label>
                          <textarea 
                            rows={3}
                            value={newRole.description}
                            onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                            placeholder="Detail authorization access levels and administrative capabilities..."
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#7553FF] focus:bg-white rounded-xl text-[14px] text-slate-800 outline-hidden focus:ring-1 focus:ring-[#7553FF] transition-all resize-none font-sans"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[12px] font-medium text-slate-700 tracking-wider block">Status</label>
                          <select 
                            value={newRole.status}
                            onChange={(e) => setNewRole({...newRole, status: e.target.value as 'Active' | 'Inactive'})}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#7553FF] focus:bg-white rounded-xl text-[14px] text-slate-800 outline-hidden focus:ring-1 focus:ring-[#7553FF] cursor-pointer"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 justify-end font-sans">
                          <button 
                            type="button"
                            onClick={() => setIsAddingRole(false)}
                            className="px-5 py-2 h-10 bg-slate-100 hover:bg-slate-150 text-slate-700 font-medium text-[14px] rounded-xl transition-all border-none cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit"
                            className="px-5 py-2 h-10 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-xl shadow-xs transition-all border-none cursor-pointer"
                          >
                            Create Role
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}

                {/* VIEW ROLE DETAILS MODAL */}
                {selectedRoleForView && (
                  <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-xl relative space-y-4 text-left font-sans"
                    >
                      <button 
                        onClick={() => setSelectedRoleForView(null)}
                        className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer border-none bg-transparent"
                      >
                        <X className="w-5 h-5 text-slate-700" />
                      </button>

                      <div className="space-y-1.5">
                        <span className="text-[12px] bg-[#EEF2FF] text-[#7553FF] border border-[#7553FF]/20 px-2.5 py-0.5 rounded-full font-medium  tracking-wider inline-block">
                          Role Profile
                        </span>
                        <h3 className="text-xl font-medium text-slate-800 font-display">{selectedRoleForView.name}</h3>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl space-y-1">
                          <span className="text-[11px] font-medium text-slate-700  tracking-widest block">Description</span>
                          <p className="text-[14px] text-slate-700 leading-relaxed font-normal">{selectedRoleForView.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="p-3 px-4 bg-slate-50/70 border border-slate-100 rounded-xl">
                            <span className="text-[11px] font-medium text-slate-700  tracking-widest block">Users assigned</span>
                            <p className="text-lg font-medium text-slate-800 mt-0.5">{selectedRoleForView.users} active members</p>
                          </div>
                          <div className="p-3 px-4 bg-slate-50/70 border border-slate-100 rounded-xl">
                            <span className="text-[11px] font-medium text-slate-700  tracking-widest block">Status</span>
                            <p className="mt-1">
                              {selectedRoleForView.status === 'Active' ? (
                                <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#10B981] text-[13px] font-medium px-2.5 py-0.5 rounded-md">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-[13px] font-medium px-2.5 py-0.5 rounded-md">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Inactive
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-xl space-y-1">
                          <span className="text-[11px] font-medium text-slate-700  tracking-widest block">Last Updated On</span>
                          <p className="text-[14px] text-slate-700 font-medium">{selectedRoleForView.lastUpdated}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button 
                          onClick={() => setSelectedRoleForView(null)}
                          className="px-6 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-xl shadow-xs cursor-pointer border-none transition-all"
                        >
                          Close Details
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            {/* ADD USER FLOATING PANEL / DIALOG */}
            {isAddingUser && (
              <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-[1080px] h-[720px] max-h-[90vh] flex flex-col relative space-y-4 text-left font-sans"
                >
                  <button 
                    onClick={() => setIsAddingUser(false)}
                    className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-0.5 border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-800 font-sans">Add Staff</h3>
                    <p className="text-xs text-slate-700">Fill in the information below to add a new staff member.</p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newUser.name || !newUser.email) return;

                      // 1. Email Uniqueness Constraint
                      const emailVal = newUser.email.trim();
                      if (staff.some(s => s.email.toLowerCase() === emailVal.toLowerCase())) {
                        alert(`Email "${emailVal}" already exists in the system. Please enter a different email.`);
                        return;
                      }

                      // 2. Date of Birth 18+ restriction
                      if (newUser.dob) {
                        const parts = newUser.dob.split('-');
                        if (parts.length === 3) {
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
                              alert("Error: Invalid date of birth. Staff members must be at least 18 years old.");
                              return;
                            }
                          }
                        }
                      }

                      // 3. German statutory minimum leave validation check
                      const workingDays = newUser.workingDaysPerWeek || 5;
                      const minLeave = workingDays * 4;
                      if (newUser.annualLeaveEntitlement < minLeave) {
                        alert(`Error: Annual Leave Entitlement cannot be less than the German statutory minimum of ${minLeave} days (${workingDays} working days/week * 4).`);
                        return;
                      }
                      
                      setStaff([...staff, {
                        id: String(staff.length + 1),
                        name: newUser.name,
                        role: newUser.role,
                        status: newUser.status,
                        email: emailVal,
                        phone: newUser.phone || '090-5550-1234',
                        avatar: newUser.photo || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80`,
                        hourlyRate: Number(newUser.hourlyRate) || 20,
                        availableHours: newUser.notes || 'Flexible check-in',
                        isActive: newUser.employmentStatus === 'Active',
                        department: newUser.role,
                        branch: newUser.branch,
                        dob: newUser.dob,
                        gender: newUser.gender,
                        address: newUser.address,
                        startDate: newUser.startDate,
                        employmentType: newUser.status,
                        systemAccessLevel: newUser.systemAccessLevel,
                        systemPermissions: newUser.systemPermissions,
                        assignedStores: newUser.assignedStores,
                        salaryType: newUser.salaryType as any,
                        salaryAmount: Number(newUser.hourlyRate) || 20,
                        currency: newUser.currency as any,
                        payFrequency: newUser.payFrequency as any,
                        effectiveDate: newUser.effectiveFrom,
                        compensationNotes: newUser.notes,
                        includeInPayroll: newUser.includeInPayroll,
                        nationality: newUser.nationality,
                        exitDate: newUser.exitDate,
                        contractHours: Number(newUser.contractHours) || 40,
                        grossAgreement: Number(newUser.grossAgreement) || 2500,
                        annualLeaveEntitlement: Number(newUser.annualLeaveEntitlement) || 24,
                        contractPreparationStatus: newUser.contractPreparationStatus,
                        contractSigningStatus: newUser.contractSigningStatus,
                        sundayOffCountOfYear: Number(newUser.sundayOffCountOfYear) || 0,
                        taxClass: newUser.taxClass,
                        socialSecurityNumber: newUser.socialSecurityNumber,
                        personalTaxId: newUser.personalTaxId,
                        healthInsuranceProvider: newUser.healthInsuranceProvider,
                        insuranceSepa: newUser.insuranceSepa,
                        idWithResidencePermit: newUser.idWithResidencePermit,
                        residencePermitExpiryDate: newUser.residencePermitExpiryDate,
                        dependentAllowance: newUser.dependentAllowance,
                        workingDaysPerWeek: newUser.workingDaysPerWeek,
                        probationPeriodMonths: newUser.probationPeriodMonths,
                        probationEndDate: newUser.probationEndDate,
                        fwhaBalance: 0.0 // Default accrued hours
                      }]);

                      setNewUser({
                        name: '',
                        email: '',
                        role: roles[0]?.name || 'Service',
                        status: 'Full-time',
                        phone: '',
                        hourlyRate: '20',
                        availableHours: 'Flexible check-in',
                        isActive: true,
                        dob: '',
                        gender: 'Male',
                        photo: '',
                        address: '',
                        branch: 'HCM 1',
                        startDate: '',
                        employmentStatus: 'Active',
                        salaryType: 'Hourly',
                        currency: 'EUR',
                        payFrequency: 'Monthly',
                        effectiveFrom: '',
                        notes: '',
                        includeInPayroll: true,
                        countryCode: 'US',
                        phonePrefix: '+1',
                        systemAccessLevel: 'Employee',
                        systemPermissions: [],
                        assignedStores: ['HCM 1'],
                        nationality: '',
                        exitDate: '',
                        contractHours: 40,
                        grossAgreement: 2500,
                        annualLeaveEntitlement: 24,
                        contractPreparationStatus: 'tbd',
                        contractSigningStatus: 'tbd',
                        sundayOffCountOfYear: 0,
                        taxClass: '1',
                        socialSecurityNumber: '',
                        personalTaxId: '',
                        healthInsuranceProvider: '',
                        insuranceSepa: 'no',
                        idWithResidencePermit: 'no',
                        residencePermitExpiryDate: '',
                        dependentAllowance: '0.0',
                        workingDaysPerWeek: 5,
                        probationPeriodMonths: 0,
                        probationEndDate: ''
                      });
                      setIsAddingUser(false);
                      alert(`Successfully added new staff member: ${newUser.name}`);
                    }}
                    className="flex flex-col flex-1 min-h-0 text-xs"
                  >
                    {/* Stepper layout */}
                    <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-6 mt-2">
                      {/* Left Sidebar Steps Indicator */}
                      <div className="w-full md:w-64 shrink-0 flex md:flex-col border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-5 overflow-x-auto md:overflow-x-visible whitespace-nowrap md:whitespace-normal gap-2 md:gap-3.5 select-none scrollbar-none">
                        {[
                          { id: 'personal', label: 'Personal Info', desc: 'Name, email, contact & DOB', num: 1 },
                          { id: 'login', label: 'Access & Login', desc: 'Credentials & system permissions', num: 2 },
                          { id: 'employment', label: 'Job & Contract', desc: 'Role, branch & schedule hours', num: 3 },
                          { id: 'tax', label: 'Tax & Insurance', desc: 'Tax class, SSN & provider', num: 4 }
                        ].map((step, idx) => {
                          const isActive = addStaffActiveTab === step.id;
                          const stepKeys = ['personal', 'login', 'employment', 'tax'];
                          const activeIdx = stepKeys.indexOf(addStaffActiveTab);
                          const isCompleted = idx < activeIdx || (step.id === 'personal' && newUser.name && newUser.email);
                          
                          return (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => {
                                if (step.id !== 'personal' && (!newUser.name || !newUser.email)) {
                                  alert("Please fill in Name and Email in Personal Info first.");
                                  return;
                                }
                                setAddStaffActiveTab(step.id as any);
                              }}
                              className={`flex items-center text-left gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer w-full group ${
                                isActive 
                                  ? 'bg-[#7553FF]/5 text-[#7553FF]' 
                                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/80'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                isActive 
                                  ? 'bg-[#7553FF] text-white shadow-md shadow-[#7553FF]/20 ring-4 ring-[#7553FF]/15' 
                                  : isCompleted 
                                    ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                              }`}>
                                {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                              </div>
                              <div className="hidden md:block leading-tight">
                                <p className={`text-[12px] font-bold tracking-wide ${isActive ? 'text-[#7553FF]' : 'text-slate-700'}`}>
                                  {step.label}
                                </p>
                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                                  {step.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Right Content Area */}
                      <div className="flex-1 flex flex-col min-h-0">
                        {/* Interactive Step Banner */}
                        <div className="mb-4 bg-slate-50/80 rounded-xl p-3 border border-slate-100/70 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#7553FF] bg-[#7553FF]/10 px-2.5 py-1 rounded-md uppercase font-mono tracking-wider">
                              Step {['personal', 'login', 'employment', 'tax'].indexOf(addStaffActiveTab) + 1} of 4
                            </span>
                            <span className="text-xs font-bold text-slate-600">
                              {addStaffActiveTab === 'personal' && 'Provide personal credentials'}
                              {addStaffActiveTab === 'login' && 'Set up login credentials'}
                              {addStaffActiveTab === 'employment' && 'Define role & compensation details'}
                              {addStaffActiveTab === 'tax' && 'Configure German tax and social details'}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                            * Required fields
                          </span>
                        </div>

                        {/* Scrollable form sections */}
                        <div className="space-y-5 flex-1 overflow-y-auto pr-2 pt-1 min-h-0">
                      {addStaffActiveTab === 'personal' && (
                        <div className="space-y-4">
                          {/* Photo Upload aligned top-center */}
                          <div className="flex flex-col items-center justify-center pb-5 border-b border-slate-100/80 mb-5">
                            <div className="relative w-28 h-28 border-2 border-dashed border-slate-200 hover:border-[#7553FF]/50 rounded-full flex flex-col items-center justify-center bg-slate-50/55 hover:bg-[#7553FF]/5 cursor-pointer transition-all overflow-hidden shadow-3xs group select-none">
                              <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setNewUser(prev => ({ ...prev, photo: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                              />
                              {newUser.photo ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <img src={newUser.photo} alt="Avatar Preview" className="w-full h-full object-cover" />
                                  <button 
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setNewUser(prev => ({ ...prev, photo: '' }));
                                    }}
                                    className="absolute top-1.5 right-1.5 bg-slate-900/60 p-1 text-white hover:bg-slate-900 rounded-full cursor-pointer z-20 border-none"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center text-center p-2 text-slate-500 gap-1">
                                  <div className="p-2 bg-white rounded-full border border-slate-100 shadow-3xs text-[#7553FF]">
                                    <Upload className="w-4 h-4" />
                                  </div>
                                  <span className="text-[11px] font-bold text-slate-700">Upload Photo</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0">
                            <div className="space-y-1">
                              <label className="text-[12px] font-semibold text-slate-600 block">Full Name <span className="text-red-500">*</span></label>
                              <input 
                                type="text" 
                                required
                                value={newUser.name}
                                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                placeholder="Enter full name"
                                className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                              />
                            </div>
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Email <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            required
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            placeholder="Enter email address"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Phone prefix + input */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Phone Number</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <div className="flex items-center gap-1 px-2.5 bg-slate-50 border-r border-slate-200 h-full select-none text-xs">
                              <span className="text-sm">🇺🇸</span>
                              <ChevronDown className="w-3 h-3 text-slate-700" />
                            </div>
                            <input 
                              type="text" 
                              value={newUser.phone}
                              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                              placeholder="+1 (555) 123-4567"
                              className="w-full px-3 py-1 bg-transparent text-xs text-slate-800 outline-hidden border-none"
                            />
                          </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Date of Birth"
                            value={newUser.dob}
                            onChange={(date) => setNewUser({...newUser, dob: date})}
                            placeholder="Select birth date"
                            error={newUser.dob ? isUnder18(newUser.dob) : false}
                            maxYear={new Date().getFullYear()}
                          />
                          {newUser.dob && isUnder18(newUser.dob) && (
                            <p className="text-[11px] text-rose-500 font-regular mt-1 leading-snug">
                             Invalid birth date. Staff must be at least 18 years old.
                            </p>
                          )}
                        </div>

                        {/* Gender */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Gender</label>
                          <select 
                            value={newUser.gender}
                            onChange={(e) => setNewUser({...newUser, gender: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Nationality */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Nationality</label>
                          <input 
                            type="text" 
                            value={newUser.nationality}
                            onChange={(e) => setNewUser({...newUser, nationality: e.target.value})}
                            placeholder="e.g. German, Vietnamese"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Address */}
                        <div className="space-y-1 lg:col-span-3">
                          <label className="text-[12px] font-semibold text-slate-600 block">Address</label>
                          <input 
                            type="text" 
                            value={newUser.address}
                            onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                            placeholder="Enter address"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* ID with Residence Permit */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">ID with Residence Permit</label>
                          <select 
                            value={newUser.idWithResidencePermit}
                            onChange={(e) => setNewUser({...newUser, idWithResidencePermit: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes (Requires Residence Permit)</option>
                          </select>
                        </div>

                        {/* Residence Permit Expiry Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Residence Permit Expiry"
                            value={newUser.residencePermitExpiryDate}
                            onChange={(date) => setNewUser({...newUser, residencePermitExpiryDate: date})}
                            placeholder="Select expiry date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {addStaffActiveTab === 'login' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-0">
                      <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-slate-600 block">Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          required
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="Enter email address"
                          className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-slate-600 block">Password</label>
                        <input 
                          type="password" 
                          value={newUser.password || ''}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          placeholder="Enter password"
                          className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <MultiSelectDropdown
                          label="System Permissions"
                          options={[
                            { value: 'schedule_view', label: 'View Shifts' },
                            { value: 'schedule_edit', label: 'Schedule Shifts' },
                            { value: 'payroll_view', label: 'View Payroll' },
                            { value: 'payroll_edit', label: 'Manage Payroll' }
                          ]}
                          selectedValues={newUser.systemPermissions}
                          onChange={(updated) => {
                            setNewUser({...newUser, systemPermissions: updated});
                          }}
                          placeholder="Select system permissions"
                        />
                      </div>
                    </div>
                  )}

                  {addStaffActiveTab === 'employment' && (
                    <div className="space-y-6">
                    <div className="p-0 space-y-4">
                      <h4 className="text-[14px] font-bold text-slate-800  tracking-wider font-sans">Job & Employment Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Role selection */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Job Role <span className="text-red-500">*</span></label>
                          <select 
                            value={newUser.role}
                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            {roles.map((r) => (
                              <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Start date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Start Date"
                            value={newUser.startDate}
                            onChange={(date) => setNewUser({...newUser, startDate: date})}
                            placeholder="Select start date"
                            maxYear={new Date().getFullYear() + 5}
                          />
                        </div>

                        {/* Contract type */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Type</label>
                          <select 
                            value={newUser.status}
                            onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="Full-time font-medium">Full-time</option>
                            <option value="Part-time font-medium">Part-time</option>
                            <option value="Minijob font-medium">Minijob</option>
                          </select>
                        </div>

                        {/* Employment status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Employment Status</label>
                          <select 
                            value={newUser.employmentStatus}
                            onChange={(e) => setNewUser({...newUser, employmentStatus: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="Active">Active</option>
                            <option value="Probation">Probation</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>

                        {/* Assigned Stores Combobox */}
                        <MultiSelectDropdown
                          label="Assigned Stores *"
                          options={[
                            { value: 'HCM 1', label: 'HCM 1' },
                            { value: 'HCM 2', label: 'HCM 2' },
                            { value: 'HQ', label: 'HQ' }
                          ]}
                          selectedValues={newUser.assignedStores}
                          onChange={(updated) => {
                            setNewUser({
                              ...newUser, 
                              assignedStores: updated,
                              branch: updated[0] || 'HCM 1'
                            });
                          }}
                          placeholder="Select assigned stores"
                        />

                        {/* System Permissions Combobox */}
                        <MultiSelectDropdown
                          label="System Permissions (Additional Access)"
                          options={[
                            { value: 'schedule_view', label: 'View Shifts' },
                            { value: 'schedule_edit', label: 'Schedule Shifts' },
                            { value: 'payroll_view', label: 'View Payroll' },
                            { value: 'payroll_edit', label: 'Manage Payroll' }
                          ]}
                          selectedValues={newUser.systemPermissions}
                          onChange={(updated) => {
                            setNewUser({...newUser, systemPermissions: updated});
                          }}
                          placeholder="Select system permissions"
                        />

                        {/* Exit Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Exit Date"
                            value={newUser.exitDate}
                            onChange={(date) => setNewUser({...newUser, exitDate: date})}
                            placeholder="Select exit date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>

                        {/* Weekly contract hours */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Weekly Contract Hours</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={newUser.contractHours}
                              onChange={(e) => setNewUser({...newUser, contractHours: Number(e.target.value) || 0})}
                              placeholder="e.g. 40"
                              className="w-full h-full pl-3.5 pr-28 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              hours / week
                            </span>
                          </div>
                        </div>

                        {/* Gross salary agreement */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Gross Salary Agreement</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <span className="pl-3.5 pr-2.5 border-r border-slate-200 text-[14px] font-bold text-slate-700 bg-slate-50/50 h-full flex items-center select-none">
                              €
                            </span>
                            <input 
                              type="number" 
                              value={newUser.grossAgreement}
                              onChange={(e) => setNewUser({...newUser, grossAgreement: Number(e.target.value) || 0})}
                              placeholder="e.g. 2500"
                              className="w-full h-full pl-3.5 pr-18 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              / month
                            </span>
                          </div>
                        </div>

                        {/* Working days per week */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Working Days Per Week</label>
                          <select 
                            value={newUser.workingDaysPerWeek}
                            onChange={(e) => {
                              const workingDays = Number(e.target.value) || 5;
                              const minLeave = workingDays * 4;
                              setNewUser({
                                ...newUser, 
                                workingDaysPerWeek: workingDays,
                                annualLeaveEntitlement: Math.max(newUser.annualLeaveEntitlement, minLeave)
                              });
                            }}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="1">1 day / week</option>
                            <option value="2">2 days / week</option>
                            <option value="3">3 days / week</option>
                            <option value="4">4 days / week</option>
                            <option value="5">5 days / week</option>
                            <option value="6">6 days / week</option>
                          </select>
                        </div>

                        {/* Probation period (months) */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Probation Period</label>
                          <select 
                            value={newUser.probationPeriodMonths}
                            onChange={(e) => {
                              const months = Number(e.target.value) || 0;
                              let pDate = '';
                              if (newUser.startDate) {
                                const d = new Date(newUser.startDate);
                                if (!isNaN(d.getTime())) {
                                  d.setMonth(d.getMonth() + months);
                                  pDate = d.toISOString().split('T')[0];
                                }
                              }
                              setNewUser({
                                ...newUser, 
                                probationPeriodMonths: months, 
                                probationEndDate: pDate
                              });
                            }}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="0">No probation (0 months)</option>
                            <option value="1">1 month</option>
                            <option value="2">2 months</option>
                            <option value="3">3 months</option>
                            <option value="4">4 months</option>
                            <option value="5">5 months</option>
                            <option value="6">6 months (Max legal limit)</option>
                          </select>
                        </div>

                        {/* Probation end date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Probation end date"
                            value={newUser.probationEndDate}
                            onChange={(date) => setNewUser({...newUser, probationEndDate: date})}
                            placeholder="Probation end date"
                            maxYear={new Date().getFullYear() + 5}
                          />
                        </div>

                        {/* Annual leave entitlement */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Annual Leave Entitlement</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={newUser.annualLeaveEntitlement}
                              onChange={(e) => setNewUser({...newUser, annualLeaveEntitlement: Number(e.target.value) || 0})}
                              placeholder="e.g. 24"
                              className="w-full h-full pl-3.5 pr-24 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              days / year
                            </span>
                          </div>
                        </div>

                        {/* Sunday offs per year */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Sunday Offs Per Year</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={newUser.sundayOffCountOfYear}
                              onChange={(e) => setNewUser({...newUser, sundayOffCountOfYear: Number(e.target.value) || 0})}
                              placeholder="e.g. 15"
                              className="w-full h-full pl-3.5 pr-28 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              sundays / year
                            </span>
                          </div>
                        </div>

                        {/* Contract Preparation Status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Preparation</label>
                          <select 
                            value={newUser.contractPreparationStatus}
                            onChange={(e) => setNewUser({...newUser, contractPreparationStatus: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="tbd">To Be Decided (TBD)</option>
                            <option value="yes">Prepared / Yes</option>
                            <option value="no">Not Prepared / No</option>
                          </select>
                        </div>

                        {/* Contract Signing Status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Signing</label>
                          <select 
                            value={newUser.contractSigningStatus}
                            onChange={(e) => setNewUser({...newUser, contractSigningStatus: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="tbd">To Be Decided (TBD)</option>
                            <option value="yes">Signed / Yes</option>
                            <option value="no">Not Signed / No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Salary & Pay */}
                    <div className="p-0 space-y-4">
                      <h4 className="text-[13px] font-bold text-slate-700  tracking-wider font-sans">Compensation & Payroll Config</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Salary Type */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Salary Type <span className="text-red-500">*</span></label>
                          <select 
                            value={newUser.salaryType}
                            onChange={(e) => setNewUser({...newUser, salaryType: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Hourly">Hourly</option>
                            <option value="Fixed Monthly">Fixed Monthly</option>
                          </select>
                        </div>

                        {/* Amount with EUR/USD prefix */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Salary Amount <span className="text-red-500">*</span></label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-slate-200 h-full select-none text-xs font-bold text-slate-600">
                              <select 
                                value={newUser.currency}
                                onChange={(e) => setNewUser({...newUser, currency: e.target.value})}
                                className="bg-transparent border-none outline-hidden cursor-pointer font-bold text-xs"
                              >
                                <option value="EUR">EUR (€)</option>
                                <option value="USD">USD ($)</option>
                              </select>
                            </div>
                            <input 
                              type="number" 
                              required
                              value={newUser.hourlyRate}
                              onChange={(e) => setNewUser({...newUser, hourlyRate: e.target.value})}
                              placeholder="0.00"
                              className="w-full px-3 py-1 bg-transparent text-xs text-slate-800 outline-hidden border-none h-full"
                            />
                          </div>
                        </div>

                        {/* Pay Frequency */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Pay Frequency <span className="text-red-500">*</span></label>
                          <select 
                            value={newUser.payFrequency}
                            onChange={(e) => setNewUser({...newUser, payFrequency: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Monthly">Monthly</option>
                            <option value="Weekly">Weekly</option>
                          </select>
                        </div>

                        {/* Effective Date */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Effective Date <span className="text-red-500">*</span></label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <div className="absolute left-3 text-slate-700 pointer-events-none">
                              <Calendar className="w-3.5 h-3.5" />
                            </div>
                            <input 
                              type="text" 
                              required
                              value={newUser.effectiveFrom}
                              onChange={(e) => setNewUser({...newUser, effectiveFrom: e.target.value})}
                              placeholder="Select effective date"
                              onFocus={(e) => { e.target.type = 'date' }}
                              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
                              className="w-full pl-9 pr-3 py-1 bg-transparent text-xs text-slate-800 outline-hidden border-none h-full"
                            />
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[12px] font-semibold text-slate-600 block">Compensation Notes</label>
                          <input 
                            type="text" 
                            value={newUser.notes}
                            onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                            placeholder="Enter compensation notes (e.g. Probation rate, periodic increase...)"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {addStaffActiveTab === 'tax' && (
                    <div className="p-0 space-y-4">
                      <h4 className="text-[13px] font-bold text-slate-700  tracking-wider font-sans">Tax, Insurance & Residency Info</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Tax Class */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Tax Class</label>
                          <select 
                            value={newUser.taxClass}
                            onChange={(e) => setNewUser({...newUser, taxClass: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="1">Class 1 (Single / Divorced)</option>
                            <option value="2">Class 2 (Single Parent)</option>
                            <option value="3">Class 3 (Married - Higher Income)</option>
                            <option value="4">Class 4 (Married - Equal Income)</option>
                            <option value="5">Class 5 (Married - Lower Income)</option>
                            <option value="6">Class 6 (Second Job / Secondary)</option>
                          </select>
                        </div>

                        {/* Social Security Number */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Social Security Number</label>
                          <input 
                            type="text" 
                            value={newUser.socialSecurityNumber}
                            onChange={(e) => setNewUser({...newUser, socialSecurityNumber: e.target.value})}
                            placeholder="e.g. 12 150784 M 043"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Personal Tax ID */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Personal Tax ID</label>
                          <input 
                            type="text" 
                            value={newUser.personalTaxId}
                            onChange={(e) => setNewUser({...newUser, personalTaxId: e.target.value})}
                            placeholder="e.g. 12345678901"
                            maxLength={11}
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Health Insurance Provider */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Health Insurance Provider</label>
                          <input 
                            type="text" 
                            value={newUser.healthInsuranceProvider}
                            onChange={(e) => setNewUser({...newUser, healthInsuranceProvider: e.target.value})}
                            placeholder="e.g. TK, AOK, Barmer"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Insurance SEPA */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Insurance SEPA Mandate</label>
                          <select 
                            value={newUser.insuranceSepa}
                            onChange={(e) => setNewUser({...newUser, insuranceSepa: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="no">No Mandate</option>
                            <option value="yes">Yes (Signed SEPA Mandate)</option>
                          </select>
                        </div>

                        {/* Dependent Allowance */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Dependent Allowance</label>
                          <select 
                            value={newUser.dependentAllowance}
                            onChange={(e) => setNewUser({...newUser, dependentAllowance: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="0.0">0.0 (No Dependents)</option>
                            <option value="0.5">0.5</option>
                            <option value="1.0">1.0</option>
                            <option value="1.5">1.5</option>
                            <option value="2.0">2.0</option>
                            <option value="2.5">2.5</option>
                            <option value="3.0">3.0 (or more)</option>
                          </select>
                        </div>

                        {/* ID with Residence Permit */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">ID with Residence Permit</label>
                          <select 
                            value={newUser.idWithResidencePermit}
                            onChange={(e) => setNewUser({...newUser, idWithResidencePermit: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes (Requires Residence Permit)</option>
                          </select>
                        </div>

                        {/* Residence Permit Expiry Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Residence Permit Expiry"
                            value={newUser.residencePermitExpiryDate}
                            onChange={(date) => setNewUser({...newUser, residencePermitExpiryDate: date})}
                            placeholder="Select expiry date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                        </div>
                      </div>
                    </div>

                    {/* Form navigation & save buttons */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 shrink-0">
                      <div>
                        {addStaffActiveTab !== 'personal' && (
                          <button 
                            type="button"
                            onClick={() => {
                              const stepKeys = ['personal', 'login', 'employment', 'tax'];
                              const activeIdx = stepKeys.indexOf(addStaffActiveTab);
                              if (activeIdx > 0) {
                                setAddStaffActiveTab(stepKeys[activeIdx - 1] as any);
                              }
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-semibold text-xs rounded-xl transition-all border-none cursor-pointer flex items-center gap-1.5"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            Back
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setIsAddingUser(false)}
                          className="px-4 py-2 hover:bg-slate-50 text-slate-500 hover:text-slate-700 font-semibold text-xs rounded-xl transition-all border-none cursor-pointer"
                        >
                          Cancel
                        </button>

                        {addStaffActiveTab !== 'tax' ? (
                          <button 
                            type="button"
                            onClick={() => {
                              // Standard step validation
                              if (addStaffActiveTab === 'personal') {
                                if (!newUser.name) {
                                  alert("Please fill in Full Name.");
                                  return;
                                }
                                if (!newUser.email) {
                                  alert("Please fill in Email.");
                                  return;
                                }
                                const emailVal = newUser.email.trim();
                                if (staff.some(s => s.email.toLowerCase() === emailVal.toLowerCase())) {
                                  alert(`Email "${emailVal}" already exists in the system.`);
                                  return;
                                }
                              }
                              
                              const stepKeys = ['personal', 'login', 'employment', 'tax'];
                              const activeIdx = stepKeys.indexOf(addStaffActiveTab);
                              if (activeIdx < stepKeys.length - 1) {
                                setAddStaffActiveTab(stepKeys[activeIdx + 1] as any);
                              }
                            }}
                            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-semibold text-xs rounded-xl transition-all border-none cursor-pointer flex items-center gap-1.5 shadow-xs"
                          >
                            Continue
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button 
                            type="submit"
                            className="px-5 py-2 bg-[#7553FF] hover:bg-[#623EE2] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all border-none cursor-pointer flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            Save Staff
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* SMART BULK ONBOARDING STEPPER MODAL */}
            <SmartBulkOnboardingModal 
              isOpen={isSmartImportOpen}
              onClose={() => setIsSmartImportOpen(false)}
              staff={staff}
              setStaff={setStaff}
            />

            {/* VIEW DETAILS DRAWER / popover */}
            {selectedUserForView && (
              <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-8 w-full max-w-3xl relative space-y-6 text-left"
                >
                  <button 
                    onClick={() => setSelectedUserForView(null)}
                    className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col items-center space-y-4 pt-4">
                    <img 
                      src={selectedUserForView.avatar} 
                      alt={selectedUserForView.name} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#7553FF]/20 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="text-center space-y-2">
                      <h4 className="text-lg font-medium text-slate-800 font-display">{selectedUserForView.name}</h4>
                      <span className="inline-block px-3 py-1 bg-[#7553FF]/10 text-[#7553FF] font-medium font-mono text-[14px]  rounded-[2px] tracking-wide border border-[#7553FF]/20">
                        {selectedUserForView.role}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-5 font-sans text-[14px] text-slate-600 max-h-[460px] overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Personal Segment */}
                      <div className="bg-slate-50/50 p-5 rounded-xl space-y-4 border border-slate-100">
                        <p className="font-medium text-[14px] text-[#7553FF]  tracking-wider">Personal Information</p>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Email</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Phone</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.phone || 'N/A'}</span>
                        </div>
                        {selectedUserForView.dob && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 text-[14px]">Date of Birth (DOB)</span>
                            <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.dob}</span>
                          </div>
                        )}
                        {selectedUserForView.gender && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 text-[14px]">Gender</span>
                            <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.gender}</span>
                          </div>
                        )}
                        {selectedUserForView.address && (
                          <div className="text-left space-y-1.5 pt-2 border-t border-dashed border-slate-200">
                            <span className="text-slate-700 block text-[14px]">Address</span>
                            <span className="font-medium text-slate-700 block text-[14px] leading-relaxed">{selectedUserForView.address}</span>
                          </div>
                        )}
                      </div>

                      {/* Job & Access Segment */}
                      <div className="bg-slate-50/50 p-5 rounded-xl space-y-4 border border-slate-100">
                        <p className="font-medium text-[14px] text-[#7553FF]  tracking-wider">Employment & System Access</p>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Primary Role</span>
                          <span className="font-medium text-[#7553FF] font-mono text-[14px]">{selectedUserForView.role}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">System Level</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.systemAccessLevel || 'Employee'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Start Date</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.startDate || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Contract Type</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.status || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Assigned Stores</span>
                          <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-[2px] text-[14px]  font-mono">
                            {selectedUserForView.assignedStores && selectedUserForView.assignedStores.length > 0
                              ? selectedUserForView.assignedStores.join(', ')
                              : (selectedUserForView.branch || 'HCM 1')
                            }
                          </span>
                        </div>
                        {selectedUserForView.systemPermissions && selectedUserForView.systemPermissions.length > 0 && (
                          <div className="text-left space-y-2 pt-2 border-t border-dashed border-slate-200">
                            <span className="text-slate-700 block text-[14px]">Additional Permissions:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedUserForView.systemPermissions.map((p: string) => (
                                <span key={p} className="bg-[#7553FF]/5 text-[#7553FF] border border-[#7553FF]/10 px-2.5 py-1 rounded-[2px] font-mono text-[14px] font-medium">
                                  {p === 'schedule_view' ? 'View Schedule' : p === 'schedule_edit' ? 'Edit Schedule' : p === 'payroll_view' ? 'View Payroll' : 'Manage Payroll'}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contract Details Segment */}
                    <div className="bg-slate-50/50 p-5 rounded-xl space-y-4 border border-slate-100">
                      <p className="font-medium text-[14px] text-[#7553FF]  tracking-wider font-sans">Contractual Details</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Exit Date</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.exitDate || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Weekly Contract Hours</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.contractHours || 0} hrs</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Gross Salary Agreement</span>
                          <span className="font-medium text-slate-800 text-[14px]">€{selectedUserForView.grossAgreement || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Working Days per Week</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.workingDaysPerWeek || 5} days</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Probation Period</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.probationPeriodMonths || 0} months</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Probation End Date</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.probationEndDate || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Annual Leave Entitlement</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.annualLeaveEntitlement || 0} Days</span>
                        </div>
                        {getProportionalLeave(selectedUserForView) !== null && (
                          <div className="flex items-center justify-between col-span-1 md:col-span-2 text-purple-700 bg-purple-50/50 p-2 rounded-lg border border-purple-100">
                            <span className="text-[13px] font-medium">Proportional leave (mid-year joiner)</span>
                            <span className="font-mono text-[13px] font-medium">{getProportionalLeave(selectedUserForView)} Days ({12 - new Date(selectedUserForView.startDate).getMonth()} months remaining)</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Sunday Offs per Year</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.sundayOffCountOfYear || 0}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Contract Preparation</span>
                          <span className={`font-mono text-[11px] px-2 py-0.5 rounded  font-semibold ${
                            selectedUserForView.contractPreparationStatus === 'yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            selectedUserForView.contractPreparationStatus === 'no' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {selectedUserForView.contractPreparationStatus || 'TBD'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Contract Signing</span>
                          <span className={`font-mono text-[11px] px-2 py-0.5 rounded  font-semibold ${
                            selectedUserForView.contractSigningStatus === 'yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            selectedUserForView.contractSigningStatus === 'no' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {selectedUserForView.contractSigningStatus || 'TBD'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Tax & Residency Segment */}
                    <div className="bg-slate-50/50 p-5 rounded-xl space-y-4 border border-slate-100">
                      <p className="font-medium text-[14px] text-[#7553FF]  tracking-wider font-sans">Tax, Insurance & Residency Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Nationality</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.nationality || 'German'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Tax Class</span>
                          <span className="font-medium text-slate-700 text-[14px]">Class {selectedUserForView.taxClass || '1'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Social Security Number</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.socialSecurityNumber || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Personal Tax ID</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.personalTaxId || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Health Insurance Provider</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.healthInsuranceProvider || 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Insurance SEPA Mandate</span>
                          <span className={`font-mono text-[11px] px-2 py-0.5 rounded  font-semibold ${
                            selectedUserForView.insuranceSepa === 'yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {selectedUserForView.insuranceSepa === 'yes' ? 'Mandate Signed' : 'No Mandate'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Dependent Allowance</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.dependentAllowance || '0.0'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Residence Permit Required</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.idWithResidencePermit === 'yes' ? 'Yes' : 'No'}</span>
                        </div>
                        {selectedUserForView.idWithResidencePermit === 'yes' && (
                          <div className="flex items-center justify-between md:col-span-2 p-3 bg-slate-100/50 rounded-lg border border-slate-200">
                            <span className="text-slate-700 text-[14px] font-medium">Residence Permit Expiry</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-800 text-[14px]">{selectedUserForView.residencePermitExpiryDate || 'N/A'}</span>
                              {isPermitExpired(selectedUserForView) ? (
                                <span className="bg-red-50 text-red-700 border border-red-200 font-bold px-2 py-0.5 rounded text-[11px]  animate-pulse">⚠️ Expired</span>
                              ) : isPermitExpiringSoon(selectedUserForView) ? (
                                <span className="bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2 py-0.5 rounded text-[11px]  animate-pulse font-semibold">⚠️ Expiring Soon</span>
                              ) : (
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[11px]  font-semibold">Valid</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Compensation & Payroll Segment */}
                    <div className="bg-[#7553FF]/5 p-5 rounded-xl space-y-4 border border-[#7553FF]/10">
                      <p className="font-medium text-[14px] text-[#7553FF]  tracking-wider">Compensation & Payroll Configuration</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Salary Type</span>
                          <span className="font-medium text-slate-700 text-[14px]">
                            {selectedUserForView.salaryType === 'Hourly' ? 'Hourly' : 'Fixed Monthly'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Salary Rate</span>
                          <span className="font-medium text-slate-800 text-[14px]">
                            {selectedUserForView.currency === 'EUR' ? '€' : '$'}
                            {selectedUserForView.hourlyRate || selectedUserForView.salaryAmount || '0.00'}
                            {selectedUserForView.salaryType === 'Hourly' ? '/hr' : '/mo'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-700 text-[14px]">Pay Frequency</span>
                          <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.payFrequency || 'Monthly'}</span>
                        </div>
                        {selectedUserForView.effectiveDate && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-700 text-[14px]">Effective Date</span>
                            <span className="font-medium text-slate-700 text-[14px]">{selectedUserForView.effectiveDate}</span>
                          </div>
                        )}
                      </div>
                      {selectedUserForView.compensationNotes && (
                        <div className="text-left bg-white/70 p-3 rounded-lg text-[14px] text-slate-600 border border-slate-100">
                          <span className="text-slate-700 block font-medium mb-1">Compensation Notes:</span>
                          <span className="font-normal">{selectedUserForView.compensationNotes}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-[#7553FF]/10">
                        <span className="text-slate-700 text-[14px]">Include in Payroll Calculations</span>
                        <span className="font-medium text-[14px]">
                          {selectedUserForView.includeInPayroll !== false ? (
                            <span className="text-emerald-750 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-[2px] font-mono ">Yes (Included)</span>
                          ) : (
                            <span className="text-rose-750 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-[2px] font-mono ">No (Excluded)</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="text-slate-700 text-[14px]">Current Labor Status</span>
                      <span>
                        {selectedUserForView.isActive ? (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[2px] px-2.5 py-1 font-mono  text-[14px] font-medium">Active</span>
                        ) : (
                          <span className="bg-rose-50 text-rose-700 border border-rose-100 rounded-[2px] px-2.5 py-1 font-mono  text-[14px] font-medium">Inactive</span>
                        )}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* EDIT STAFF FLOATING PANEL / DIALOG */}
            {editingStaffMember && (
              <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-[1080px] h-[720px] max-h-[90vh] flex flex-col relative space-y-4 text-left font-sans"
                >
                  <button 
                    onClick={() => setEditingStaffMember(null)}
                    className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="space-y-0.5 border-b border-slate-100 pb-3">
                    <h3 className="text-lg font-bold text-slate-800 font-sans">Edit Staff Profile</h3>
                    <p className="text-xs text-slate-700">Modify details for {editingStaffMember.name}. Salary edits require Super Admin / Accountant simulation.</p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const success = handleUpdateStaffMember(editingStaffMember);
                      if (success) {
                        setEditingStaffMember(null);
                      }
                    }}
                    className="flex flex-col flex-1 min-h-0 text-xs justify-between"
                  >
                    {/* Tab Navigation */}
                    <div className="shrink-0 flex border-b border-slate-100 -mx-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-none mb-4">
                      {[
                        { id: 'personal', label: 'Personal Info' },
                        { id: 'login', label: 'Login Info' },
                        { id: 'employment', label: 'Employment Info' },
                        { id: 'tax', label: 'Tax & Insurance' }
                      ].map((tab) => {
                        const isActive = editStaffActiveTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setEditStaffActiveTab(tab.id as any)}
                            className={`px-5 py-3 font-bold text-[11px]  tracking-wider transition-all border-b-2 cursor-pointer ${
                              isActive 
                                ? 'border-[#7553FF] text-[#7553FF]' 
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-5 flex-1 overflow-y-auto pr-2 pt-1 min-h-0">
                      {editStaffActiveTab === 'personal' && (
                        <div className="space-y-4">
                          {/* Section 1: Personal Information */}
                          <div className="p-0 space-y-4">
                            <h4 className="text-[13px] font-bold text-slate-700  tracking-wider font-sans">Personal Information</h4>
                      
                      {/* Photo Upload aligned top-center */}
                      <div className="flex flex-col items-center justify-center pb-5 border-b border-slate-100/80 mb-5">
                        <div className="relative w-28 h-28 border-2 border-dashed border-slate-200 hover:border-[#7553FF]/50 rounded-full flex flex-col items-center justify-center bg-slate-50/55 hover:bg-[#7553FF]/5 cursor-pointer transition-all overflow-hidden shadow-3xs group select-none">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditingStaffMember(prev => prev ? ({ ...prev, avatar: reader.result as string }) : null);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                          />
                          {editingStaffMember.avatar ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <img src={editingStaffMember.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all z-20">
                                <span className="text-[10px] text-white font-semibold">Change Photo</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center p-2 text-slate-500 gap-1">
                              <div className="p-2 bg-white rounded-full border border-slate-100 shadow-3xs text-[#7553FF]">
                                <Upload className="w-4 h-4" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-700">Upload Photo</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Full Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            required
                            value={editingStaffMember.name}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, name: e.target.value})}
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Email <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            required
                            value={editingStaffMember.email}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, email: e.target.value})}
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Phone Number</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.phone || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, phone: e.target.value})}
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <DatePicker
                            label="Date of Birth"
                            value={editingStaffMember.dob || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, dob: date})}
                            placeholder="Select birth date"
                            error={editingStaffMember.dob ? isUnder18(editingStaffMember.dob) : false}
                            maxYear={new Date().getFullYear()}
                          />
                          {editingStaffMember.dob && isUnder18(editingStaffMember.dob) && (
                            <p className="text-[11px] text-rose-500 font-regular mt-1 leading-snug">
                              Invalid birth date. Staff must be at least 18 years old.
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Gender</label>
                          <select 
                            value={editingStaffMember.gender || 'Male'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, gender: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Nationality */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Nationality</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.nationality || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, nationality: e.target.value})}
                            placeholder="e.g. German, Vietnamese"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Address */}
                        <div className="space-y-1 lg:col-span-3">
                          <label className="text-[12px] font-semibold text-slate-600 block">Address</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.address || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, address: e.target.value})}
                            placeholder="Enter address"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* ID with Residence Permit */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">ID with Residence Permit</label>
                          <select 
                            value={editingStaffMember.idWithResidencePermit || 'no'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, idWithResidencePermit: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes (Requires Residence Permit)</option>
                          </select>
                        </div>

                        {/* Residence Permit Expiry Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Residence Permit Expiry"
                            value={editingStaffMember.residencePermitExpiryDate || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, residencePermitExpiryDate: date})}
                            placeholder="Select expiry date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {editStaffActiveTab === 'login' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-0">
                      {/* Email Address */}
                      <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-slate-600 block">Email <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          required
                          value={editingStaffMember.email}
                          onChange={(e) => setEditingStaffMember({...editingStaffMember, email: e.target.value})}
                          placeholder="Enter email address"
                          className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-1">
                        <label className="text-[12px] font-semibold text-slate-600 block">Password</label>
                        <input 
                          type="password" 
                          value={editingStaffMember.password || ''}
                          onChange={(e) => setEditingStaffMember({...editingStaffMember, password: e.target.value})}
                          placeholder="Enter password"
                          className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                        />
                      </div>

                      {/* System Permissions (Additional Access) */}
                      <div className="space-y-1">
                        <MultiSelectDropdown
                          label="System Permissions"
                          options={[
                            { value: 'schedule_view', label: 'View Shifts' },
                            { value: 'schedule_edit', label: 'Schedule Shifts' },
                            { value: 'payroll_view', label: 'View Payroll' },
                            { value: 'payroll_edit', label: 'Manage Payroll' }
                          ]}
                          selectedValues={editingStaffMember.systemPermissions || []}
                          onChange={(updated) => {
                            setEditingStaffMember({...editingStaffMember, systemPermissions: updated});
                          }}
                          placeholder="Select system permissions"
                        />
                      </div>
                    </div>
                  )}

                  {editStaffActiveTab === 'employment' && (
                    <div className="space-y-6">
                      {/* Section 2: Job Information */}
                      <div className="p-0 space-y-4">
                      <h4 className="text-[14px] font-bold text-slate-800  tracking-wider font-sans">Job & Employment Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Role */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Job Role <span className="text-red-500">*</span></label>
                          <select 
                            value={editingStaffMember.role}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, role: e.target.value, department: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            {roles.map((r) => (
                              <option key={r.id} value={r.name}>{r.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Start date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Start Date"
                            value={editingStaffMember.startDate || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, startDate: date})}
                            placeholder="Select start date"
                            maxYear={new Date().getFullYear() + 5}
                          />
                        </div>

                        {/* Contract type */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Type</label>
                          <select 
                            value={editingStaffMember.status}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, status: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Minijob">Minijob</option>
                          </select>
                        </div>

                        {/* Working status / labor status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Labor Status</label>
                          <select 
                            value={editingStaffMember.isActive ? 'Active' : 'Inactive'}
                            onChange={(e) => setEditingStaffMember({
                              ...editingStaffMember, 
                              isActive: e.target.value === 'Active'
                            })}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>

                        {/* Assigned Stores Combobox */}
                        <MultiSelectDropdown
                          label="Assigned Stores *"
                          options={[
                            { value: 'HCM 1', label: 'HCM 1' },
                            { value: 'HCM 2', label: 'HCM 2' },
                            { value: 'HQ', label: 'HQ' }
                          ]}
                          selectedValues={editingStaffMember.assignedStores || [editingStaffMember.branch || 'HCM 1']}
                          onChange={(updated) => {
                            setEditingStaffMember({
                              ...editingStaffMember, 
                              assignedStores: updated,
                              branch: updated[0] || 'HCM 1'
                            });
                          }}
                          placeholder="Select assigned stores"
                        />

                        {/* System Permissions Combobox */}
                        <MultiSelectDropdown
                          label="System Permissions (Additional Access)"
                          options={[
                            { value: 'schedule_view', label: 'View Shifts' },
                            { value: 'schedule_edit', label: 'Schedule Shifts' },
                            { value: 'payroll_view', label: 'View Payroll' },
                            { value: 'payroll_edit', label: 'Manage Payroll' }
                          ]}
                          selectedValues={editingStaffMember.systemPermissions || []}
                          onChange={(updated) => {
                            setEditingStaffMember({...editingStaffMember, systemPermissions: updated});
                          }}
                          placeholder="Select system permissions"
                        />

                        {/* Exit Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Exit Date"
                            value={editingStaffMember.exitDate || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, exitDate: date})}
                            placeholder="Select exit date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>

                        {/* Weekly contract hours */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Weekly Contract Hours</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={editingStaffMember.contractHours || 0}
                              onChange={(e) => setEditingStaffMember({...editingStaffMember, contractHours: Number(e.target.value) || 0})}
                              placeholder="e.g. 40"
                              className="w-full h-full pl-3.5 pr-28 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              hours / week
                            </span>
                          </div>
                        </div>

                        {/* Gross salary agreement */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Gross Salary Agreement</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <span className="pl-3.5 pr-2.5 border-r border-slate-200 text-[14px] font-bold text-slate-700 bg-slate-50/50 h-full flex items-center select-none">
                              €
                            </span>
                            <input 
                              type="number" 
                              value={editingStaffMember.grossAgreement || 0}
                              onChange={(e) => setEditingStaffMember({...editingStaffMember, grossAgreement: Number(e.target.value) || 0})}
                              placeholder="e.g. 2500"
                              className="w-full h-full pl-3.5 pr-18 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              / month
                            </span>
                          </div>
                        </div>

                        {/* Working days per week */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Working Days Per Week</label>
                          <select 
                            value={editingStaffMember.workingDaysPerWeek || 5}
                            onChange={(e) => {
                              const workingDays = Number(e.target.value) || 5;
                              const minLeave = workingDays * 4;
                              setEditingStaffMember({
                                ...editingStaffMember, 
                                workingDaysPerWeek: workingDays,
                                annualLeaveEntitlement: Math.max(editingStaffMember.annualLeaveEntitlement || 0, minLeave)
                              });
                            }}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="1">1 day / week</option>
                            <option value="2">2 days / week</option>
                            <option value="3">3 days / week</option>
                            <option value="4">4 days / week</option>
                            <option value="5">5 days / week</option>
                            <option value="6">6 days / week</option>
                          </select>
                        </div>

                        {/* Probation period (months) */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Probation Period</label>
                          <select 
                            value={editingStaffMember.probationPeriodMonths || 0}
                            onChange={(e) => {
                              const months = Number(e.target.value) || 0;
                              let pDate = '';
                              if (editingStaffMember.startDate) {
                                const d = new Date(editingStaffMember.startDate);
                                if (!isNaN(d.getTime())) {
                                  d.setMonth(d.getMonth() + months);
                                  pDate = d.toISOString().split('T')[0];
                                }
                              }
                              setEditingStaffMember({
                                ...editingStaffMember, 
                                probationPeriodMonths: months, 
                                probationEndDate: pDate
                              });
                            }}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="0">No probation (0 months)</option>
                            <option value="1">1 month</option>
                            <option value="2">2 months</option>
                            <option value="3">3 months</option>
                            <option value="4">4 months</option>
                            <option value="5">5 months</option>
                            <option value="6">6 months (Max legal limit)</option>
                          </select>
                        </div>

                        {/* Probation end date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Probation end date"
                            value={editingStaffMember.probationEndDate || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, probationEndDate: date})}
                            placeholder="Probation end date"
                            maxYear={new Date().getFullYear() + 5}
                          />
                        </div>

                        {/* Annual leave entitlement */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Annual Leave Entitlement</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={editingStaffMember.annualLeaveEntitlement || 0}
                              onChange={(e) => setEditingStaffMember({...editingStaffMember, annualLeaveEntitlement: Number(e.target.value) || 0})}
                              placeholder="e.g. 24"
                              className="w-full h-full pl-3.5 pr-24 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              days / year
                            </span>
                          </div>
                        </div>

                        {/* Sunday offs per year */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Sunday Offs Per Year</label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <input 
                              type="number" 
                              value={editingStaffMember.sundayOffCountOfYear || 0}
                              onChange={(e) => setEditingStaffMember({...editingStaffMember, sundayOffCountOfYear: Number(e.target.value) || 0})}
                              placeholder="e.g. 15"
                              className="w-full h-full pl-3.5 pr-28 py-1.5 bg-transparent text-[14px] text-slate-800 outline-hidden border-none"
                            />
                            <span className="absolute right-3.5 text-[14px] font-semibold text-slate-700 select-none pointer-events-none">
                              sundays / year
                            </span>
                          </div>
                        </div>

                        {/* Contract Preparation Status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Preparation</label>
                          <select 
                            value={editingStaffMember.contractPreparationStatus || 'tbd'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, contractPreparationStatus: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="tbd">To Be Decided (TBD)</option>
                            <option value="yes">Prepared / Yes</option>
                            <option value="no">Not Prepared / No</option>
                          </select>
                        </div>

                        {/* Contract Signing Status */}
                        <div className="space-y-1">
                          <label className="text-[14px] font-semibold text-slate-700 block">Contract Signing</label>
                          <select 
                            value={editingStaffMember.contractSigningStatus || 'tbd'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, contractSigningStatus: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden shadow-3xs cursor-pointer font-medium"
                          >
                            <option value="tbd">To Be Decided (TBD)</option>
                            <option value="yes">Signed / Yes</option>
                            <option value="no">Not Signed / No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Salary & Pay (Role gated) */}
                    <div className="p-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[13px] font-bold text-slate-700  tracking-wider font-sans">Compensation & Payroll Config</h4>
                        {simulatedUser && simulatedUser.systemAccessLevel !== 'Admin' && (
                          <span className="text-[11px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded">🔒 Locked - View Only</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Salary Type */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Salary Type <span className="text-red-500">*</span></label>
                          <select 
                            disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                            value={editingStaffMember.salaryType || 'Hourly'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, salaryType: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 disabled:opacity-60 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Hourly">Hourly</option>
                            <option value="Fixed Monthly">Fixed Monthly</option>
                          </select>
                        </div>

                        {/* Amount with EUR/USD prefix */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Salary Amount <span className="text-red-500">*</span></label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-slate-200 h-full select-none text-xs font-bold text-slate-600">
                              <select 
                                disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                                value={editingStaffMember.currency || 'EUR'}
                                onChange={(e) => setEditingStaffMember({...editingStaffMember, currency: e.target.value as any})}
                                className="bg-transparent border-none outline-hidden cursor-pointer font-bold text-xs"
                              >
                                <option value="EUR">EUR (€)</option>
                                <option value="USD">USD ($)</option>
                              </select>
                            </div>
                            <input 
                              type="number" 
                              required
                              disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                              value={editingStaffMember.hourlyRate}
                              onChange={(e) => setEditingStaffMember({
                                ...editingStaffMember, 
                                hourlyRate: Number(e.target.value) || 0,
                                salaryAmount: Number(e.target.value) || 0
                              })}
                              placeholder="0.00"
                              className="w-full px-3 py-1 bg-transparent text-xs text-slate-800 outline-hidden border-none h-full"
                            />
                          </div>
                        </div>

                        {/* Pay Frequency */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Pay Frequency <span className="text-red-500">*</span></label>
                          <select 
                            disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                            value={editingStaffMember.payFrequency || 'Monthly'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, payFrequency: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 disabled:opacity-60 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="Monthly">Monthly</option>
                            <option value="Weekly">Weekly</option>
                          </select>
                        </div>

                        {/* Effective Date */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Effective Date <span className="text-red-500">*</span></label>
                          <div className="relative flex items-center h-10 border border-slate-200 focus-within:border-[#7553FF] focus-within:ring-1 focus-within:ring-[#7553FF] rounded-xl bg-white overflow-hidden shadow-3xs">
                            <div className="absolute left-3 text-slate-700 pointer-events-none">
                              <Calendar className="w-3.5 h-3.5" />
                            </div>
                            <input 
                              type="text" 
                              required
                              disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                              value={editingStaffMember.effectiveDate || ''}
                              onChange={(e) => setEditingStaffMember({...editingStaffMember, effectiveDate: e.target.value})}
                              placeholder="Select effective date"
                              onFocus={(e) => { e.target.type = 'date' }}
                              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
                              className="w-full pl-9 pr-3 py-1 bg-transparent text-xs text-slate-800 outline-hidden border-none h-full"
                            />
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[12px] font-semibold text-slate-600 block">Compensation Notes</label>
                          <input 
                            type="text" 
                            disabled={simulatedUser && simulatedUser.systemAccessLevel !== 'Admin'}
                            value={editingStaffMember.compensationNotes || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, compensationNotes: e.target.value})}
                            placeholder="Enter compensation notes"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                  {editStaffActiveTab === 'tax' && (
                    <div className="p-0 space-y-4">
                      <h4 className="text-[13px] font-bold text-slate-700  tracking-wider font-sans">Tax, Insurance & Residency Info</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Tax Class */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Tax Class</label>
                          <select 
                            value={editingStaffMember.taxClass || '1'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, taxClass: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="1">Class 1 (Single / Divorced)</option>
                            <option value="2">Class 2 (Single Parent)</option>
                            <option value="3">Class 3 (Married - Higher Income)</option>
                            <option value="4">Class 4 (Married - Equal Income)</option>
                            <option value="5">Class 5 (Married - Lower Income)</option>
                            <option value="6">Class 6 (Second Job / Secondary)</option>
                          </select>
                        </div>

                        {/* Social Security Number */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Social Security Number</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.socialSecurityNumber || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, socialSecurityNumber: e.target.value})}
                            placeholder="e.g. 12 150784 M 043"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Personal Tax ID */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Personal Tax ID</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.personalTaxId || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, personalTaxId: e.target.value})}
                            placeholder="e.g. 12345678901"
                            maxLength={11}
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Health Insurance Provider */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Health Insurance Provider</label>
                          <input 
                            type="text" 
                            value={editingStaffMember.healthInsuranceProvider || ''}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, healthInsuranceProvider: e.target.value})}
                            placeholder="e.g. TK, AOK, Barmer"
                            className="w-full h-10 px-3 py-1.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden transition-all shadow-3xs"
                          />
                        </div>

                        {/* Insurance SEPA */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Insurance SEPA Mandate</label>
                          <select 
                            value={editingStaffMember.insuranceSepa || 'no'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, insuranceSepa: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="no">No Mandate</option>
                            <option value="yes">Yes (Signed SEPA Mandate)</option>
                          </select>
                        </div>

                        {/* Dependent Allowance */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">Dependent Allowance</label>
                          <select 
                            value={editingStaffMember.dependentAllowance || '0.0'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, dependentAllowance: e.target.value})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="0.0">0.0 (No Dependents)</option>
                            <option value="0.5">0.5</option>
                            <option value="1.0">1.0</option>
                            <option value="1.5">1.5</option>
                            <option value="2.0">2.0</option>
                            <option value="2.5">2.5</option>
                            <option value="3.0">3.0 (or more)</option>
                          </select>
                        </div>

                        {/* ID with Residence Permit */}
                        <div className="space-y-1">
                          <label className="text-[12px] font-semibold text-slate-600 block">ID with Residence Permit</label>
                          <select 
                            value={editingStaffMember.idWithResidencePermit || 'no'}
                            onChange={(e) => setEditingStaffMember({...editingStaffMember, idWithResidencePermit: e.target.value as any})}
                            className="w-full h-10 px-3 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] rounded-xl text-xs text-slate-800 outline-hidden shadow-3xs cursor-pointer"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes (Requires Residence Permit)</option>
                          </select>
                        </div>

                        {/* Residence Permit Expiry Date */}
                        <div className="space-y-1">
                          <DatePicker
                            label="Residence Permit Expiry"
                            value={editingStaffMember.residencePermitExpiryDate || ''}
                            onChange={(date) => setEditingStaffMember({...editingStaffMember, residencePermitExpiryDate: date})}
                            placeholder="Select expiry date"
                            maxYear={new Date().getFullYear() + 10}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 mt-4 border-t border-slate-100">
                      <button 
                        type="button"
                        onClick={() => setEditingStaffMember(null)}
                        className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all border-none cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-5 py-2 bg-[#7553FF] hover:bg-[#623EE2] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all border-none cursor-pointer flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: PAYROLL & REPORTING VIEW */}
        {activeSubTab === 'payroll' && <Payroll />}
        {false && activeSubTab === 'payroll' && (() => {
          const payrollDataset = [
            // Page 1 Records matching EXACTLY the image
            { id: 'pay-1', name: 'Alice Johnson', initials: 'AJ', role: 'Barista', department: 'Service', shifts: 6, hours: 40, hourlyRate: 15.00, overtimeHours: 2, overtimePay: 30.00, grossPay: 630.00, deductions: 45.00, netPay: 585.00, color: 'bg-[#7553FF]/10 text-[#7553FF] border-[#7553FF]/20' },
            { id: 'pay-2', name: 'John Smith', initials: 'JS', role: 'Server', department: 'Service', shifts: 6, hours: 40, hourlyRate: 15.00, overtimeHours: 4, overtimePay: 60.00, grossPay: 660.00, deductions: 49.50, netPay: 610.50, color: 'bg-blue-50 text-blue-600 border-blue-100' },
            { id: 'pay-3', name: 'Michael Brown', initials: 'MB', role: 'Chef', department: 'Kitchen', shifts: 6, hours: 40, hourlyRate: 20.00, overtimeHours: 3, overtimePay: 60.00, grossPay: 860.00, deductions: 64.50, netPay: 795.50, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 border' },
            { id: 'pay-4', name: 'Emily Davis', initials: 'ED', role: 'Host', department: 'Service', shifts: 5, hours: 35, hourlyRate: 14.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 490.00, deductions: 36.75, netPay: 453.25, color: 'bg-rose-50 text-rose-600 border-rose-100' },
            { id: 'pay-5', name: 'James Taylor', initials: 'JT', role: 'Server', department: 'Service', shifts: 6, hours: 42, hourlyRate: 15.00, overtimeHours: 2, overtimePay: 30.00, grossPay: 660.00, deductions: 49.50, netPay: 610.55, color: 'bg-purple-50 text-purple-600 border-purple-100' },
            { id: 'pay-6', name: 'Sarah Wilson', initials: 'SW', role: 'Manager', department: 'Management', shifts: 6, hours: 40, hourlyRate: 22.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 880.00, deductions: 66.00, netPay: 814.00, color: 'bg-amber-50 text-amber-600 border-amber-100' },
            { id: 'pay-7', name: 'David Lee', initials: 'DL', role: 'Kitchen Assistant', department: 'Kitchen', shifts: 5, hours: 35, hourlyRate: 13.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 455.00, deductions: 34.13, netPay: 420.87, color: 'bg-[#F0ECFF] text-[#7553FF] border-[#F0ECFF]' },
            { id: 'pay-8', name: 'Robert White', initials: 'RW', role: 'Dishwasher', department: 'Kitchen', shifts: 5, hours: 35, hourlyRate: 12.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 420.00, deductions: 31.50, netPay: 388.50, color: 'bg-orange-50 text-orange-600 border-orange-100' },

            // Page 2 Records (Totaling 16)
            { id: 'pay-9', name: 'Sophia Miller', initials: 'SM', role: 'Barista', department: 'Service', shifts: 5, hours: 38, hourlyRate: 15.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 570.00, deductions: 42.75, netPay: 527.25, color: 'bg-[#7553FF]/10 text-[#7553FF]' },
            { id: 'pay-10', name: 'Liam Davies', initials: 'LD', role: 'Server', department: 'Service', shifts: 6, hours: 41, hourlyRate: 15.00, overtimeHours: 1, overtimePay: 15.00, grossPay: 630.00, deductions: 47.25, netPay: 582.75, color: 'bg-blue-50 text-blue-600' },
            { id: 'pay-11', name: 'Noah Wilson', initials: 'NW', role: 'Chef', department: 'Kitchen', shifts: 5, hours: 40, hourlyRate: 20.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 800.00, deductions: 60.00, netPay: 740.00, color: 'bg-emerald-50 text-emerald-600' },
            { id: 'pay-12', name: 'Isabella Martinez', initials: 'IM', role: 'Host', department: 'Service', shifts: 5, hours: 35, hourlyRate: 14.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 490.00, deductions: 36.75, netPay: 453.25, color: 'bg-rose-50 text-rose-600' },
            { id: 'pay-13', name: 'Mia Anderson', initials: 'MA', role: 'Server', department: 'Service', shifts: 6, hours: 40, hourlyRate: 15.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 600.00, deductions: 45.00, netPay: 555.00, color: 'bg-purple-50 text-purple-600' },
            { id: 'pay-14', name: 'Oliver Thomas', initials: 'OT', role: 'Dishwasher', department: 'Kitchen', shifts: 5, hours: 35, hourlyRate: 12.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 420.00, deductions: 31.50, netPay: 388.50, color: 'bg-orange-50 text-orange-600' },
            { id: 'pay-15', name: 'Ava Jackson', initials: 'AJ', role: 'Manager', department: 'Management', shifts: 6, hours: 45, hourlyRate: 24.00, overtimeHours: 5, overtimePay: 120.00, grossPay: 1200.00, deductions: 90.00, netPay: 1110.00, color: 'bg-amber-50 text-amber-600' },
            { id: 'pay-16', name: 'Lucas White', initials: 'LW', role: 'Kitchen Assistant', department: 'Kitchen', shifts: 4, hours: 32, hourlyRate: 13.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 416.00, deductions: 31.20, netPay: 384.80, color: 'bg-[#F0ECFF] text-[#7553FF]' },

            // Page 3 Records (Totaling 24)
            { id: 'pay-17', name: 'Charlotte Harris', initials: 'CH', role: 'Barista', department: 'Service', shifts: 5, hours: 35, hourlyRate: 15.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 525.00, deductions: 39.38, netPay: 485.62, color: 'bg-[#7553FF]/10 text-[#7553FF]' },
            { id: 'pay-18', name: 'Ethan Martin', initials: 'EM', role: 'Server', department: 'Service', shifts: 6, hours: 40, hourlyRate: 15.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 600.00, deductions: 45.00, netPay: 555.00, color: 'bg-blue-50 text-blue-600' },
            { id: 'pay-19', name: 'Amelia Garcia', initials: 'AG', role: 'Chef', department: 'Kitchen', shifts: 6, hours: 43, hourlyRate: 20.00, overtimeHours: 3, overtimePay: 60.00, grossPay: 920.00, deductions: 69.00, netPay: 851.00, color: 'bg-emerald-50 text-emerald-600' },
            { id: 'pay-20', name: 'Harper Clark', initials: 'HC', role: 'Host', department: 'Service', shifts: 5, hours: 35, hourlyRate: 14.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 490.00, deductions: 36.75, netPay: 453.25, color: 'bg-rose-50 text-rose-600' },
            { id: 'pay-21', name: 'Daniel Rodriguez', initials: 'DR', role: 'Server', department: 'Service', shifts: 6, hours: 40, hourlyRate: 15.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 600.00, deductions: 45.00, netPay: 555.00, color: 'bg-purple-50 text-purple-600' },
            { id: 'pay-22', name: 'Evelyn Lewis', initials: 'EL', role: 'Manager', department: 'Management', shifts: 5, hours: 40, hourlyRate: 22.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 880.00, deductions: 66.00, netPay: 814.00, color: 'bg-amber-50 text-amber-600' },
            { id: 'pay-23', name: 'Alexander Lee', initials: 'AL', role: 'Kitchen Assistant', department: 'Kitchen', shifts: 5, hours: 35, hourlyRate: 13.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 455.00, deductions: 34.13, netPay: 420.87, color: 'bg-[#F0ECFF] text-[#7553FF]' },
            { id: 'pay-24', name: 'Benjamin Walker', initials: 'BW', role: 'Dishwasher', department: 'Kitchen', shifts: 4, hours: 30, hourlyRate: 12.00, overtimeHours: 0, overtimePay: 0.00, grossPay: 360.00, deductions: 27.00, netPay: 333.00, color: 'bg-[#FFF7ED] text-[#EA580C]' }
          ];

          // Filter data
          const filteredRecords = payrollDataset.filter((r) => {
            const matchesSearch = r.name.toLowerCase().includes(payrollSearch.toLowerCase()) || 
                                  r.role.toLowerCase().includes(payrollSearch.toLowerCase()) ||
                                  r.department.toLowerCase().includes(payrollSearch.toLowerCase());
            const matchesCategory = payrollFilter === 'all' || r.department === payrollFilter;
            return matchesSearch && matchesCategory;
          });

          // Pagination calculations
          const itemsPerPage = 8;
          const totalResults = filteredRecords.length;
          const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
          const startIndex = (payrollPage - 1) * itemsPerPage;
          const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
          const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

          // Totals calculation
          const totalShifts = filteredRecords.reduce((sum, r) => sum + r.shifts, 0);
          const totalHours = filteredRecords.reduce((sum, r) => sum + r.hours, 0);
          const totalOtHours = filteredRecords.reduce((sum, r) => sum + r.overtimeHours, 0);
          const totalOtPay = filteredRecords.reduce((sum, r) => sum + r.overtimePay, 0);
          const totalGross = filteredRecords.reduce((sum, r) => sum + r.grossPay, 0);
          const totalDeductions = filteredRecords.reduce((sum, r) => sum + r.deductions, 0);
          const totalNet = filteredRecords.reduce((sum, r) => sum + r.netPay, 0);

          const isAllChecked = paginatedRecords.length > 0 && paginatedRecords.every(r => selectedPayrollRows.includes(r.id));

          const toggleSelectAll = () => {
            if (isAllChecked) {
              setSelectedPayrollRows(prev => prev.filter(id => !paginatedRecords.some(pr => pr.id === id)));
            } else {
              setSelectedPayrollRows(prev => {
                const uniqueIds = Array.from(new Set([...prev, ...paginatedRecords.map(pr => pr.id)]));
                return uniqueIds;
              });
            }
          };

          const toggleSelectRow = (id: string) => {
            setSelectedPayrollRows(prev => 
              prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
            );
          };

          return (
            <motion.div
              key="payroll"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Widgets KPI Cards Section - Styled like Dashboard panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card 1: Total Employees */}
                <div className="bg-white border border-[#1C1814]/15 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Total Employees</span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <h2 className="text-[28px] font-bold text-[#1C1814] tracking-tight leading-none font-sans">24</h2>
                    <span className="text-[14px] font-semibold text-emerald-600">Active</span>
                  </div>
                </div>

                {/* Stat Card 2: Total Hours */}
                <div className="bg-white border border-[#1C1814]/15 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Total Hours</span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[28px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">
                    {payrollWeekShift === 0 ? '168h' : 
                     payrollWeekShift === -1 ? '154h' : '182h'}
                  </h2>
                </div>

                {/* Stat Card 3: Estimated Total Pay */}
                <div className="bg-white border border-[#1C1814]/15 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs text-left">
                  <div className="flex items-center justify-between mb-2 font-display">
                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Estimated Total Pay</span>
                      <HelpCircle className="w-3.5 h-3.5 text-slate-700 cursor-help" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[28px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">
                    {payrollWeekShift === 0 ? '$4,320.00' : 
                     payrollWeekShift === -1 ? '$3,960.00' : '$4,680.00'}
                  </h2>
                </div>
              </div>

              {/* Payroll Control bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-3xs text-left">
                {/* Left: Payroll Period Control */}
                <div className="space-y-1.5 w-full sm:w-80">
                  <span className="text-xs font-bold text-slate-700 tracking-wide block font-sans">Payroll Period</span>
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 h-11 justify-between">
                    <button 
                      onClick={() => setPayrollWeekShift(prev => prev - 1)}
                      className="p-1.5 hover:bg-white hover:shadow-3xs text-slate-700 rounded-lg transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-705">
                      {payrollWeekShift === 0 ? 'May 25 – May 31, 2025' : 
                       payrollWeekShift === -1 ? 'May 18 – May 24, 2025' : 
                       payrollWeekShift === 1 ? 'June 01 – June 07, 2025' : 
                       `Week Shift ${payrollWeekShift}`}
                    </span>
                    <button 
                      onClick={() => setPayrollWeekShift(prev => prev + 1)}
                      className="p-1.5 hover:bg-white hover:shadow-3xs text-slate-700 rounded-lg transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Export PDF */}
                <div className="self-stretch sm:self-end flex items-end">
                  <button 
                    onClick={() => alert('Exporting payroll statement to PDF ledger report...')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 border border-[#7553FF]/70 hover:border-[#7553FF] text-[#7553FF] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 h-11 cursor-pointer shadow-3xs hover:shadow-xs active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4 text-[#7553FF]" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Main Ledger Section Card */}
              <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-3xs space-y-5 text-left">
                {/* Search / Filters block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-950 font-display">Employee Payroll</h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">Breakdown of pay for each employee based on their scheduled shifts.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Filter Button */}
                    <button
                      onClick={() => {
                        setPayrollFilter(prev => prev === 'all' ? 'Service' : prev === 'Service' ? 'Kitchen' : 'all');
                        setPayrollPage(1);
                      }}
                      className="px-3.5 py-2 hover:bg-[#7553FF]/5 border border-[#7553FF] text-slate-705 bg-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 h-10 cursor-pointer shadow-3xs"
                    >
                      <Filter className="w-4 h-4 text-slate-700" />
                      <span>Filter: {payrollFilter === 'all' ? 'All' : payrollFilter}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
                    </button>

                    {/* Search Field */}
                    <div className="relative w-64">
                      <Search className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        value={payrollSearch}
                        onChange={(e) => {
                          setPayrollSearch(e.target.value);
                          setPayrollPage(1);
                        }}
                        placeholder="Search employee"
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Responsive Ledger Table */}
                <div className="overflow-x-auto -mx-6 md:mx-0 rounded-xl border border-slate-100">
                  <table className="w-full min-w-[800px] border-collapse bg-white">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-bold text-slate-700  tracking-wider font-display select-none">
                        <th className="px-4 py-4 text-left w-12">
                          <input 
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={toggleSelectAll}
                            className="w-4 h-4 rounded border-slate-200 text-[#7553FF] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                          />
                        </th>
                        <th className="px-4 py-4 text-left">Staff</th>
                        <th className="px-4 py-4 text-center text-slate-900 font-extrabold pb-4">Net Pay</th>
                        <th className="px-4 py-4 text-center">Total Hours</th>
                        <th className="px-4 py-4 text-center">Overtime Hours</th>
                        <th className="px-4 py-4 text-center">Overtime Pay</th>
                        <th className="px-4 py-4 text-center">Gross Pay</th>
                        <th className="px-4 py-4 text-center">Deductions</th>
                        <th className="px-4 py-4 text-center w-36">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-705">
                      {paginatedRecords.map((record) => {
                        const isChecked = selectedPayrollRows.includes(record.id);
                        return (
                          <tr key={record.id} className="hover:bg-slate-50/30 transition-all">
                            <td className="px-4 py-3.5">
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleSelectRow(record.id)}
                                className="w-4 h-4 rounded border-slate-200 text-[#7553FF] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                              />
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full border border-white flex items-center justify-center font-normal text-[14px] tracking-wide  ${record.color} shadow-3xs`}>
                                  {record.initials}
                                </div>
                                <span className="font-normal text-black font-display">{record.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-center text-slate-900 font-normal font-mono">${record.netPay.toFixed(2)}</td>
                            <td className="px-4 py-3.5 text-center text-slate-650 font-normal">{record.hours}h</td>
                            <td className="px-4 py-3.5 text-center text-slate-700 font-normal font-mono">{record.overtimeHours}h</td>
                            <td className="px-4 py-3.5 text-center text-slate-600 font-normal font-mono">${record.overtimePay.toFixed(2)}</td>
                            <td className="px-4 py-3.5 text-center text-slate-800 font-normal font-mono">${record.grossPay.toFixed(2)}</td>
                            <td className="px-4 py-3.5 text-center text-slate-700 font-normal font-mono">${record.deductions.toFixed(2)}</td>
                            <td className="px-4 py-3.5 text-center">
                              <button 
                                onClick={() => setSelectedPayrollDetails(record)}
                                className="text-[#7553FF] hover:text-[#4E25C4] hover:underline bg-transparent px-1 py-0.5 text-xs font-normal transition-all cursor-pointer"
                              >
                                View detail
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      {paginatedRecords.length === 0 && (
                        <tr>
                          <td colSpan={9} className="px-4 py-12 text-center text-slate-700">
                            No payroll results correspond to your filter search keys.
                          </td>
                        </tr>
                      )}

                      {/* TOTAL RECORD ROW (exactly matching mockup totals on page 1) */}
                      {paginatedRecords.length > 0 && (
                        <tr className="bg-slate-50/10 font-normal border-t-2 border-slate-100/80">
                          <td className="px-4 py-4"></td>
                          <td className="px-4 py-4 text-xs font-display font-normal text-[#111827]  tracking-wide">Total</td>
                          <td className="px-4 py-4 text-center text-[#111827] font-normal font-mono">${totalNet.toFixed(2)}</td>
                          <td className="px-4 py-4 text-center text-[#111827] font-normal">{totalHours}h</td>
                          <td className="px-4 py-4 text-center text-slate-700 font-normal font-mono">{totalOtHours}h</td>
                          <td className="px-4 py-4 text-center text-slate-700 font-normal font-mono">${totalOtPay.toFixed(2)}</td>
                          <td className="px-4 py-4 text-center text-[#111827] font-normal font-mono">${totalGross.toFixed(2)}</td>
                          <td className="px-4 py-4 text-center text-slate-600 font-normal font-mono">${totalDeductions.toFixed(2)}</td>
                          <td className="px-4 py-4"></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100 select-none">
                  <span className="text-xs text-slate-700">
                    Showing {totalResults === 0 ? 0 : startIndex + 1} to {endIndex} of {totalResults} results
                  </span>

                  <div className="flex items-center gap-1">
                    {/* First Page Button */}
                    <button 
                      onClick={() => setPayrollPage(1)}
                      disabled={payrollPage === 1}
                      className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer text-xs font-bold"
                    >
                      &lt;&lt;
                    </button>
                    {/* Prev Page Button */}
                    <button 
                      onClick={() => setPayrollPage(prev => Math.max(prev - 1, 1))}
                      disabled={payrollPage === 1}
                      className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer text-xs font-bold"
                    >
                      &lt;
                    </button>

                    {/* Numeric Buttons */}
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      const isCurrent = p === payrollPage;
                      return (
                        <button
                          key={p}
                          onClick={() => setPayrollPage(p)}
                          className={`w-7 h-7 rounded-md font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                            isCurrent 
                              ? 'bg-[#7553FF] text-white shadow-3xs' 
                              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}

                    {/* Next Page Button */}
                    <button 
                      onClick={() => setPayrollPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={payrollPage === totalPages}
                      className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer text-xs font-bold"
                    >
                      &gt;
                    </button>
                    {/* Last Page Button */}
                    <button 
                      onClick={() => setPayrollPage(totalPages)}
                      disabled={payrollPage === totalPages}
                      className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer text-xs font-bold"
                    >
                      &gt;&gt;
                    </button>
                  </div>
                </div>
              </div>

              {/* STYLISH STAFF DETAILS BREAKDOWN POPUP */}
              <AnimatePresence>
                {selectedPayrollDetails && (
                  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-lg relative text-left font-sans"
                    >
                      {/* Close button */}
                      <button
                        onClick={() => setSelectedPayrollDetails(null)}
                        className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 rounded-lg transition-all cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Header info */}
                      <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base  ${selectedPayrollDetails.color || 'bg-[#7553FF]/10 text-[#7553FF]'}`}>
                          {selectedPayrollDetails.initials}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 font-display">{selectedPayrollDetails.name}</h3>
                          <p className="text-xs text-slate-700 font-medium">
                            {selectedPayrollDetails.role} • <span className="text-slate-700">{selectedPayrollDetails.department}</span>
                          </p>
                        </div>
                      </div>

                      {/* Content: Detailed breakdown table */}
                      <div className="py-4 space-y-4">
                        <h4 className="text-xs font-bold text-slate-700  tracking-wider">Payroll Breakdown calculations</h4>
                        
                        <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50/50">
                          <table className="w-full text-xs font-sans text-slate-700">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-150 text-[10px] font-bold  tracking-wider text-slate-700">
                                <th className="px-4 py-2.5 text-left">Component Name</th>
                                <th className="px-4 py-2.5 text-right">Value/Calc</th>
                                <th className="px-4 py-2.5 text-right">Amount (USD)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              <tr>
                                <td className="px-4 py-2.5 font-medium text-slate-650">Total Shifts Worked</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-slate-800">{selectedPayrollDetails.shifts} shifts</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-slate-700">-</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2.5 font-medium text-slate-650">Regular Working Hours</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-slate-800">{selectedPayrollDetails.hours} hrs</td>
                                <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-700">
                                  ${(selectedPayrollDetails.hours * selectedPayrollDetails.hourlyRate).toFixed(2)}
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2 text-slate-700 italic pl-6">Hourly Pay Rate</td>
                                <td className="px-4 py-2 text-right font-mono text-slate-700">${selectedPayrollDetails.hourlyRate.toFixed(2)}/hr</td>
                                <td className="px-4 py-2 text-right font-mono text-slate-700">-</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2.5 font-medium text-slate-650">Overtime Hours</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-slate-850">{selectedPayrollDetails.overtimeHours} hrs</td>
                                <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-600">
                                  +${selectedPayrollDetails.overtimePay.toFixed(2)}
                                </td>
                              </tr>
                              <tr className="bg-slate-100/30 font-bold">
                                <td className="px-4 py-2.5 text-slate-800">Gross Total Earnings</td>
                                <td className="px-4 py-2.5 text-right">-</td>
                                <td className="px-4 py-2.5 text-right font-mono text-slate-900">${selectedPayrollDetails.grossPay.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2.5 font-medium text-slate-650">Standard Deductions</td>
                                <td className="px-4 py-2.5 text-right text-rose-500 font-semibold">Taxes & Fees</td>
                                <td className="px-4 py-2.5 text-right font-mono font-bold text-rose-600">
                                  -${selectedPayrollDetails.deductions.toFixed(2)}
                                </td>
                              </tr>
                              <tr className="bg-[#7553FF]/5 font-extrabold text-[13px] border-t border-slate-200">
                                <td className="px-4 py-3 text-[#7553FF]">Net Final Pay</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right font-mono text-[#7553FF]">${selectedPayrollDetails.netPay.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Modal Footer / Action buttons */}
                      <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            alert(`Ledger slip exported for ${selectedPayrollDetails.name} successfully.`);
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-3xs"
                        >
                          Print Slip
                        </button>
                        <button
                          onClick={() => setSelectedPayrollDetails(null)}
                          className="px-4 py-2 border border-slate-200 text-slate-650 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })()}

        {/* TAB 4: SYSTEM SCHEDULER SETTING VIEW */}
        {activeSubTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Top Cards: Grid with two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start font-sans">
              
              {/* LEFT COLUMN: SHIFT TEMPLATES */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6 text-left">
                {/* Header block with emerald icon */}
                <div className="flex gap-3 items-center text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center border border-[#A7F3D0]">
                    <Clock className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800 font-display">Shift Templates</h2>
                    <p className="text-xs text-slate-700">Create and manage shift templates used in your schedules.</p>
                  </div>
                </div>

                {/* Card Template: NEW TEMPLATE */}
                <div className="border border-[#1C1814]/5 rounded-2xl p-5 bg-white space-y-4 shadow-3xs relative">
                  <span className="text-[14px] font-bold text-emerald-600 tracking-wider block">
                    {editingTemplateId ? 'Edit Template' : 'New Template'}
                  </span>

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* NAME */}
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wider block">Name</label>
                      <input 
                        type="text"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="e.g. Morning Shift"
                        className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white"
                      />
                    </div>

                    {/* START TIMEE */}
                    <div className="md:col-span-1 space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wider block">Start Time</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={newTemplateStart}
                          onChange={(e) => setNewTemplateStart(e.target.value)}
                          placeholder="08:00"
                          className="w-full pl-3.5 pr-8 py-2 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white"
                        />
                        <Clock className="w-4 h-4 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* END TIMEE */}
                    <div className="md:col-span-1 space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wider block">End Time</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={newTemplateEnd}
                          onChange={(e) => setNewTemplateEnd(e.target.value)}
                          placeholder="16:00"
                          className="w-full pl-3.5 pr-8 py-2 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white"
                        />
                        <Clock className="w-4 h-4 text-slate-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* REQUIRED ROLES */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[14px] font-bold text-slate-700 tracking-wider block">Required Roles</label>
                    <p className="text-[14px] text-slate-700">Add roles that are required for this shift template.</p>
                    
                    {/* Select box toggle */}
                    <button 
                      onClick={() => setIsRolesDropdownOpen(!isRolesDropdownOpen)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs text-left bg-white text-slate-700 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7553FF] shadow-3xs"
                    >
                      <span>
                        {newTemplateRoles.length > 0 
                          ? newTemplateRoles.join(', ') 
                          : 'Select roles...'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-700" />
                    </button>

                    {/* Absolute Roles List Dropdown */}
                    {isRolesDropdownOpen && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 p-2 text-xs text-slate-705 max-h-[160px] overflow-y-auto space-y-1">
                        {['Server', 'Barista', 'Chef', 'Host', 'Security', 'Cleaner', 'Kitchen Assistant'].map((role) => {
                          const isSelected = newTemplateRoles.includes(role);
                          return (
                            <button
                              key={role}
                              onClick={() => {
                                if (isSelected) {
                                  setNewTemplateRoles(prev => prev.filter(r => r !== role));
                                } else {
                                  setNewTemplateRoles(prev => [...prev, role]);
                                }
                              }}
                              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left hover:bg-slate-50 transition-all cursor-pointer ${
                                isSelected ? 'bg-[#7553FF]/10/50 font-semibold text-[#4E25C4]' : ''
                              }`}
                            >
                              <span>{role}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#7553FF]" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button 
                    onClick={handleAddTemplate}
                    className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] active:scale-99 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs border border-[#7553FF]/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingTemplateId ? 'Save Content changes' : 'Add Template'}</span>
                  </button>

                  {editingTemplateId && (
                    <button 
                      onClick={() => {
                        setEditingTemplateId(null);
                        setNewTemplateName('');
                        setNewTemplateStart('08:00');
                        setNewTemplateEnd('16:00');
                        setNewTemplateRoles([]);
                      }}
                      className="text-xs text-rose-500 font-bold hover:underline block text-center"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {/* Heading List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-800  tracking-widest block font-sans">Your Shift Templates</h3>
                  
                  {/* Table for templates */}
                  <div className="overflow-hidden border border-slate-100 rounded-xl">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-bold text-slate-700  tracking-wider select-none">
                          <th className="px-4 py-3.5 text-left">TEMPLATE NAME</th>
                          <th className="px-4 py-3.5 text-left">TIME</th>
                          <th className="px-4 py-3.5 text-left">REQUIRED ROLES</th>
                          <th className="px-4 py-3.5 text-center w-24">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-705">
                        {shiftTemplates.map((template) => (
                          <tr key={template.id} className="hover:bg-slate-50/30 transition-all">
                            <td className="px-4 py-3.5 font-bold text-slate-800 font-display">{template.name}</td>
                            <td className="px-4 py-3.5 text-slate-700 font-mono">{template.time}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {template.requiredRoles.map((role) => (
                                  <span 
                                    key={role}
                                    className="text-[14px] font-semibold text-slate-700  tracking-wider"
                                  >
                                    {role}
                                  </span>
                                ))}
                                {template.extraCount > 0 && (
                                  <span className="text-slate-700 font-bold text-[14px]">
                                    +{template.extraCount}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center justify-center gap-1.5">
                                <button 
                                  onClick={() => handleEditTemplate(template)}
                                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-800 transition-all cursor-pointer"
                                  title="Edit Template"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTemplate(template.id)}
                                  className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100/60 text-rose-500 transition-all cursor-pointer"
                                  title="Delete Template"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {shiftTemplates.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-slate-700">
                              No templates registered. Add new above.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Template table footer pagination */}
                  <span className="text-[14px] text-slate-700 block pt-1">
                    Showing 1 to {shiftTemplates.length} of {shiftTemplates.length} results
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: HOLIDAY MULTIPLIERS */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6 text-left">
                {/* Header block with Star icon */}
                <div className="flex gap-3 items-center text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#7553FF]/10 flex items-center justify-center border border-[#7553FF]/20">
                    <Star className="w-5 h-5 text-[#7553FF] fill-[#7553FF]/10" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800 font-display">Holiday Multipliers</h2>
                    <p className="text-xs text-slate-700">Configure holiday pay multipliers for special days.</p>
                  </div>
                </div>

                {/* Card Template: ADD HOLIDAY */}
                <div className="border border-[#1C1814]/5 rounded-2xl p-5 bg-white space-y-4 shadow-3xs relative">
                  <span className="text-[14px] font-bold text-[#7553FF] tracking-wider block">
                    {editingHolidayId ? 'Edit Holiday' : 'Add Holiday'}
                  </span>

                  {/* Form fields layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* DATE */}
                    <div className="md:col-span-2 space-y-1.5 relative">
                      <DatePicker
                        label="Date"
                        value={newHolidayDate}
                        onChange={(date) => setNewHolidayDate(date)}
                        placeholder="Select holiday date"
                        maxYear={new Date().getFullYear() + 5}
                      />
                    </div>

                    {/* PAY MULTIPLIER MULTIPLEX */}
                    <div className="md:col-span-1 space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wider block">Pay Multiplier</label>
                      <select 
                        value={newHolidayMultiplier}
                        onChange={(e) => setNewHolidayMultiplier(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white text-slate-705 h-[37px] cursor-pointer"
                      >
                        <option value="1.5">1.5</option>
                        <option value="2.0">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3.0">3.0</option>
                      </select>
                    </div>
                  </div>

                  {/* NOTE (OPTIONAL) */}
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-slate-700 tracking-wider block">Note (Optional)</label>
                    <input 
                      type="text"
                      value={newHolidayNote}
                      onChange={(e) => setNewHolidayNote(e.target.value)}
                      placeholder="e.g. National Day"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    onClick={handleAddHoliday}
                    className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] active:scale-99 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs border border-[#7553FF]/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingHolidayId ? 'Save Content changes' : 'Add Holiday'}</span>
                  </button>

                  {editingHolidayId && (
                    <button 
                      onClick={() => {
                        setEditingHolidayId(null);
                        setNewHolidayNote('');
                        setNewHolidayMultiplier('1.5');
                        setNewHolidayDate('2026-06-04');
                      }}
                      className="text-xs text-rose-500 font-bold hover:underline block text-center"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {/* Heading List */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-800  tracking-widest block font-sans">Upcoming Holidays</h3>
                  
                  {/* Table for holidays */}
                  <div className="overflow-hidden border border-slate-100 rounded-xl bg-white">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-bold text-slate-700  tracking-wider select-none">
                          <th className="px-4 py-3.5 text-left">DATE</th>
                          <th className="px-4 py-3.5 text-center">MULTIPLIER</th>
                          <th className="px-4 py-3.5 text-left">NOTE</th>
                          <th className="px-4 py-3.5 text-center w-24">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-705">
                        {holidayMultipliers.map((holiday) => (
                          <tr key={holiday.id} className="hover:bg-slate-50/30 transition-all">
                            <td className="px-4 py-3.5 text-left font-semibold text-slate-700 font-mono">{holiday.date}</td>
                            <td className="px-4 py-3.5 text-center font-bold text-[#7553FF] font-mono">{holiday.multiplier}</td>
                            <td className="px-4 py-3.5 text-slate-700 text-left font-medium">{holiday.note}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex items-center justify-center gap-1.5">
                                <button 
                                  onClick={() => handleEditHoliday(holiday)}
                                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-800 transition-all cursor-pointer"
                                  title="Edit Holiday"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteHoliday(holiday.id)}
                                  className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100/60 text-rose-500 transition-all cursor-pointer"
                                  title="Delete Holiday"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {holidayMultipliers.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-slate-700">
                              No holidays configured. Add new above.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Holiday table footer pagination */}
                  <span className="text-[14px] text-slate-700 block pt-1">
                    Showing 1 to {holidayMultipliers.length} of {holidayMultipliers.length} results
                  </span>
                </div>
              </div>

              {/* Informational banner across both columns */}
              <div className="col-span-1 lg:col-span-2 bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 flex items-center gap-3 text-left">
                <Info className="w-5 h-5 text-[#7553FF] shrink-0" />
                <span className="text-xs font-bold text-[#042F2E] leading-normal">
                  Shift templates and holiday multipliers will be applied when calculating payroll.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. DIALOGS & MODAL INTERACTIONS */}

      {/* MODAL PRE-A: MONTH CALENDAR DAILY SCHEDULE INSPECTOR */}
      <AnimatePresence>
        {isInspectorOpen && selectedMonthDay && (
          <div className="fixed inset-0 bg-[#1C1814]/40 backdrop-blur-xs flex items-center justify-center p-4 z-40 animate-fadeIn font-sans">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl p-6 shadow-2xl relative space-y-5 flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="border-b border-[#EAE4DC] pb-4 flex items-start justify-between">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2 text-[14px] font-bold text-[#7553FF]  tracking-wider">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Daily Schedule Inspector</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#1C1814]">
                    {selectedMonthDay.month === 'previous' ? 'April ' : selectedMonthDay.month === 'next' ? 'June ' : 'May '} 
                    {selectedMonthDay.dayNumber}, 2025
                  </h3>
                  <p className="text-[14px] text-[#5C534C] font-sans">
                    Managing shifts for <span className="font-semibold text-slate-600">{selectedMonthDay.weekday}day</span>. Clicking `+ Roster` assigns crew members.
                  </p>
                </div>
                <button 
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable content areas */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-1 text-left">
                {/* Morning Shift */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-3xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-100" />
                      <span className="text-[15px] font-bold text-[#1C1814]">Morning Shift</span>
                    </div>
                    <span className="text-slate-700 text-[14px] font-sans font-medium">8:00 AM – 4:00 PM</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                    {['Service', 'Kitchen', 'Bar', 'Management'].map((dept) => {
                      const key = `morning-${dept}-${selectedMonthDay.weekday}`;
                      const team = schedule[key] || [];
                      return (
                        <div key={dept} className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start justify-between gap-2 text-[14px]">
                          <div className="space-y-1.5 w-3/4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#7553FF]" />
                              <span className="font-bold text-slate-700">{dept}</span>
                            </div>
                            {team.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {team.map((name, idx) => (
                                  <span 
                                    key={idx} 
                                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-medium px-2 py-0.5 rounded-md text-[14px] transition-colors"
                                    title={name}
                                  >
                                    {name}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-700 italic text-[14px] block pl-4">No crew assigned</span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setEditingCell({ shift: 'morning', dept, day: selectedMonthDay.weekday })}
                            className="px-2.5 py-1 text-[14px] text-[#7553FF] hover:text-[#623EE2] bg-[#7553FF]/5 hover:bg-[#7553FF]/10 font-bold rounded-lg transition-all cursor-pointer border-none"
                          >
                            + Roster
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Evening Shift */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-4 shadow-3xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-[#7553FF] fill-[#7553FF]/10" />
                      <span className="text-[15px] font-bold text-[#1C1814]">Evening Shift</span>
                    </div>
                    <span className="text-slate-700 text-[14px] font-sans font-medium">4:00 PM – 12:00 AM</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-1">
                    {['Service', 'Kitchen', 'Bar', 'Management'].map((dept) => {
                      const key = `evening-${dept}-${selectedMonthDay.weekday}`;
                      const team = schedule[key] || [];
                      return (
                        <div key={dept} className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-start justify-between gap-2 text-[14px]">
                          <div className="space-y-1.5 w-3/4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                              <span className="font-bold text-slate-700">{dept}</span>
                            </div>
                            {team.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {team.map((name, idx) => (
                                  <span 
                                    key={idx} 
                                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-medium px-2 py-0.5 rounded-md text-[14px] transition-colors"
                                    title={name}
                                  >
                                    {name}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-700 italic text-[14px] block pl-4">No crew assigned</span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => setEditingCell({ shift: 'evening', dept, day: selectedMonthDay.weekday })}
                            className="px-2.5 py-1 text-[14px] text-[#7553FF] hover:text-[#623EE2] bg-[#7553FF]/5 hover:bg-[#7553FF]/10 font-bold rounded-lg transition-all cursor-pointer border-none"
                          >
                            + Roster
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action/Footer block */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 text-[14px] flex items-center justify-between shadow-3xs font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-700 font-medium">Clearance Rating:</span>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-md border border-emerald-100 text-[14px] ">
                    OPTIMAL COVERAGE
                  </span>
                </div>
                <button
                  onClick={() => setIsInspectorOpen(false)}
                  className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-xl transition-all shadow-xs cursor-pointer border-none h-9 flex items-center justify-center"
                >
                  Confirm & Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL A: CELL WORK SCHEDULE EDITOR / CREATE SHIFT */}
      <AnimatePresence>
        {editingCell && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fadeIn font-sans">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 shadow-2xl relative space-y-4">
              <button 
                onClick={() => setEditingCell(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 text-left">
                <h3 className="text-sm font-bold text-slate-800 font-display flex items-center gap-1.5 capitalize">
                  <Plus className="w-4 h-4 text-[#7553FF]" />
                  <span>Assign Shift Setup</span>
                </h3>
                <p className="text-xs text-slate-700 font-sans">
                  Editing <span className="font-semibold text-slate-600">{editingCell.shift} shift</span> for <span className="font-semibold text-slate-600">{editingCell.dept}</span> on <span className="font-semibold text-slate-600">{editingCell.day}</span>
                </p>
              </div>

              {/* Staff choices */}
              <div className="space-y-2 border-t border-b border-slate-50 py-3 max-h-[220px] overflow-y-auto pr-1">
                {staff.map((member) => {
                  const key = `${editingCell.shift}-${editingCell.dept}-${editingCell.day}-${activePlanningBranch}`;
                  const keyLegacy = `${editingCell.shift}-${editingCell.dept}-${editingCell.day}`;
                  const currentList = schedule[key] || (activePlanningBranch === 'HCM 1' ? schedule[keyLegacy] : []) || [];
                  const isChecked = currentList.includes(member.name);
                  const optKey = `${key}-opt`;
                  const optList = schedule[optKey] || [];
                  const isOptChecked = optList.includes(member.name);
                  const hasLeave = getApprovedLeaveForStaff(member.name, editingCell.day, editingCell.shift);
                  
                  // Compute dynamic OT risk
                  const currentHours = staffWeeklyHours[member.name] || 0;
                  const isAlreadyScheduled = isChecked;
                  const futureHours = isAlreadyScheduled ? currentHours : currentHours + 8;
                  const willCauseOvertime = futureHours > 40;

                  return (
                    <div 
                      key={member.id} 
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs ${
                        hasLeave ? 'bg-red-50/50 opacity-70' : 'hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#7553FF]/10 text-[#7553FF] font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#7553FF]/20 relative overflow-hidden select-none">
                          {getInitials(member.name)}
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="absolute inset-0 w-full h-full rounded-full object-cover" 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                        <div className="text-left min-w-0">
                          <p className="font-bold text-slate-700 font-display truncate">{member.name}</p>
                          <div className="text-[11px] text-slate-500 font-bold flex flex-wrap items-center gap-1.5">
                            <span className="font-sans font-normal">{member.role}</span>
                            {hasLeave && (
                              <span className="text-red-600 font-bold font-sans">(Leave)</span>
                            )}
                            <span className={`px-1 py-0.2 text-[9px] rounded font-mono font-bold ${
                              (member.fwhaBalance ?? 0) >= 0 
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`} title="Flexible Working Hours Account Balance">
                              FWHA: {(member.fwhaBalance ?? 0) > 0 ? `+${member.fwhaBalance}` : member.fwhaBalance}h
                            </span>
                            {willCauseOvertime && !hasLeave && (
                              <span className="text-amber-600 font-bold text-[9px]" title="Exceeds 40h compliance limit!">
                                ⚠️ OT ({futureHours}h)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {hasLeave ? (
                        <span className="text-xs text-red-600 font-bold bg-red-100/60 border border-red-200 px-2 py-0.5 rounded-[2px]" id={`unavailable-label-${member.id}`}>
                          Unavailable
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 shrink-0 select-none">
                          {/* Standard Assign Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (isChecked) {
                                setSchedule({
                                  ...schedule,
                                  [key]: currentList.filter(n => n !== member.name)
                                });
                              } else {
                                setSchedule({
                                  ...schedule,
                                  [key]: [...currentList, member.name],
                                  [optKey]: optList.filter(n => n !== member.name)
                                });
                              }
                            }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-[#7553FF] text-white border-[#7553FF] shadow-xs'
                                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            Assign
                          </button>

                          {/* Optional (Opt) stand-by Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (isOptChecked) {
                                setSchedule({
                                  ...schedule,
                                  [optKey]: optList.filter(n => n !== member.name)
                                });
                              } else {
                                setSchedule({
                                  ...schedule,
                                  [optKey]: [...optList, member.name],
                                  [key]: currentList.filter(n => n !== member.name)
                                });
                              }
                            }}
                            className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                              isOptChecked
                                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            Opt
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingCell(null)}
                  className="flex-1 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => setEditingCell(null)}
                  className="flex-1 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* RETROACTIVE EDIT MODAL & TOAST (PRD-002) */}
      <AnimatePresence>
        {showRetroactiveModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn font-sans">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative space-y-4 text-center">
              <button 
                onClick={() => setShowRetroactiveModal(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold border border-rose-105">
                ⚠️
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800 font-display">Past Schedule Change Restricted</h3>
                <p className="text-xs text-slate-600 leading-relaxed px-1">
                  You are attempting a <strong className="text-slate-700">Retroactive Edit</strong> to a shift in the past on <strong className="text-[#7553FF]">{showRetroactiveModal.day} ({showRetroactiveModal.shift} shift)</strong>. Retroactive schedule edits are locked to protect payroll audit trails and prevent compliance violations.
                </p>
              </div>

              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/50 text-left text-[11px] text-slate-755 space-y-1">
                <p className="font-semibold text-rose-800">🔒 Policy Restriction:</p>
                <p>Only branch managers with active Super Admin override privileges or pre-approved special justifications may proceed.</p>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button 
                  onClick={() => {
                    setSpecialRetroBypass(true);
                    setShowRetroactiveModal(null);
                    setRetroToast({ show: true, message: "Special Authorization Bypass Granted. Retroactive editing enabled!" });
                    setTimeout(() => setRetroToast(null), 4000);
                  }}
                  className="w-full py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Special Explanation</span>
                </button>
                <button 
                  onClick={() => setShowRetroactiveModal(null)}
                  className="w-full py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {retroToast?.show && (
        <div className="fixed bottom-5 right-5 z-[100] bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-slideUp border border-slate-800 text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-[#7553FF]" />
          <span>{retroToast.message}</span>
          <button onClick={() => setRetroToast(null)} className="ml-1 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* MODAL B: UPGRADE PREMIUM BILLING PLANS */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fadeIn font-sans">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4 text-center">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                👑
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800 font-display">Upgrade to Business Professional</h3>
                <p className="text-xs text-slate-700 px-4">Unlock ultimate features customized for complex scheduling, auto-compositions and telemetry GPS tracking.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left space-y-3.5 text-xs font-sans">
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#7553FF] mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-700 font-display">Unlimited AI-Scheduler Triggers</p>
                    <p className="text-[14px] text-slate-700">Instantly resolve and balance coverages in just 0.8 seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#7553FF] mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-700 font-display">Secured GPS Fenced Attestations</p>
                    <p className="text-[14px] text-slate-700">Strict checking coordinates constraints to safe-guard and log times.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Maybe Later
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                >
                  Upgrade $49/mo
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CLOCK-IN KIOSK AND GPS EMULATOR SYSTEM POPUP */}
      <AnimatePresence>
        {showEmulator && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn font-sans">
            <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl p-6 shadow-2xl relative grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <button 
                onClick={() => setShowEmulator(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT SIDE: KIOSK FRONT TABLET */}
              <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-5 text-center flex flex-col items-center justify-between height-full space-y-4">
                <div className="space-y-1">
                  <span className="text-[14px]  font-bold text-[#7553FF] bg-[#7553FF]/10 px-2 py-0.5 rounded-[2px] inline-block">
                    Instore Tablet
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 font-display">Secure QR Terminal</h3>
                  <p className="text-[14px] text-slate-700 font-sans leading-relaxed">
                    This dynamically cycling QR is displayed on a tablet located near the cash register.
                  </p>
                </div>

                {/* Animated Scanner Box */}
                <div className="relative p-4 bg-white border border-slate-200 rounded-2xl shadow-xs shrink-0 w-44 h-44 flex items-center justify-center">
                  <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#7553FF]" />
                  <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#7553FF]" />
                  <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#7553FF]" />
                  <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#7553FF]" />
                  
                  {/* Embedded Mock QR SVG */}
                  <div className="w-36 h-36 relative">
                    <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="5" y="5" width="22" height="22" />
                      <rect x="9" y="9" width="14" height="14" fill="white" />
                      <rect x="11" y="11" width="10" height="10" />

                      <rect x="73" y="5" width="22" height="22" />
                      <rect x="77" y="9" width="14" height="14" fill="white" />
                      <rect x="79" y="11" width="10" height="10" />

                      <rect x="5" y="73" width="22" height="22" />
                      <rect x="9" y="77" width="14" height="14" fill="white" />
                      <rect x="11" y="79" width="10" height="10" />

                      {/* Random pixels */}
                      <rect x="40" y="20" width="8" height="6" />
                      <rect x="55" y="12" width="6" height="8" />
                      <rect x="35" y="45" width="10" height="10" fill="#7553FF" />
                      <rect x="60" y="35" width="12" height="8" />
                      <rect x="30" y="75" width="10" height="6" />
                      <rect x="52" y="80" width="12" height="10" />
                      <rect x="75" y="52" width="8" height="12" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[14px] font-mono font-bold text-slate-700 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    <span>{qrCodeSalt}</span>
                  </p>
                  <p className="text-[14px] text-slate-700 font-sans">
                    Failsafe token changes every 4 seconds.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: STAFF MOBILE EMULATOR */}
              <div className="bg-slate-900 rounded-3xl p-4 text-white relative min-h-[400px] flex flex-col justify-between border-[5px] border-slate-950 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-b-xl flex items-center justify-center z-25">
                  <div className="w-10 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Simulated Screen */}
                <div className="bg-slate-950/80 rounded-[8px] overflow-hidden flex-1 flex flex-col justify-between pt-6 px-1">
                  
                  {/* Phone Header */}
                  <div className="flex items-center justify-between text-[14px] text-slate-700 font-bold tracking-wider px-3 pb-2 border-b border-white/5">
                    <span>9:41 AM</span>
                    <span className="text-[#2DD4BF] font-mono">STAFF APP</span>
                    <span className="text-emerald-400">LTE</span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-center items-center text-center p-4 relative">
                    {/* Alerter */}
                    <AnimatePresence>
                      {gpsError && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute inset-x-3 p-3.5 bg-rose-500 text-white rounded-xl text-left text-xs space-y-2.5 z-10 shadow-lg"
                        >
                          <p className="font-bold flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            <span>GPS Fence Verification Error</span>
                          </p>
                          <p className="text-[14px] text-slate-700 leading-relaxed">
                            Your coordinates place you at over 500m away. You must stand within {geofenceRadius}m to secure shift hours.
                          </p>
                          <div className="flex justify-end gap-1.5 pt-1.5">
                            <button 
                              onClick={() => setGpsError(false)}
                              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md text-[14px] font-bold"
                            >
                              Wait
                            </button>
                            <button 
                              onClick={() => {
                                setGpsError(false);
                                setCheckinSuccess(true);
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-slate-50 text-rose-600 rounded-md text-[14px] font-bold"
                            >
                              Move closer (&lt;10m)
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {checkinSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute inset-x-3 p-3.5 bg-emerald-500 text-white rounded-xl text-center text-xs space-y-3 z-10 shadow-lg"
                        >
                          <CheckCircle className="w-8 h-8 mx-auto hover:scale-110 transition-all text-white" />
                          <div>
                            <p className="font-bold text-sm">Shift Clock-In Checked!</p>
                            <p className="text-[14px] text-emerald-100 font-mono mt-0.5">Approved coordinates verification.</p>
                          </div>
                          <button 
                            onClick={() => setCheckinSuccess(false)}
                            className="px-4 py-1.5 bg-white text-emerald-600 rounded-lg text-[14px] font-bold inline-block mx-auto hover:bg-emerald-50"
                          >
                            Reset System
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!gpsError && !checkinSuccess && (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full flex items-center justify-center text-[#2DD4BF] mx-auto shadow-md transition-all">
                          <QrCode className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold font-display">Standby Shift Clock-in</p>
                          <p className="text-[14px] text-slate-700 leading-relaxed font-sans px-2">
                            Simulate mobile check-in below to test coordinates distance filters.
                          </p>
                        </div>

                        <div className="space-y-1.5 w-full max-w-[200px] mx-auto pt-2">
                          <button
                            onClick={() => {
                              setCheckinSuccess(false);
                              setGpsError(true);
                            }}
                            className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white text-[14px] font-bold rounded-xl transition-all h-9"
                          >
                            Scan (&gt;500m Outrange)
                          </button>
                          <button
                            onClick={() => {
                              setGpsError(false);
                              setCheckinSuccess(true);
                            }}
                            className="w-full py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-xl transition-all h-9"
                          >
                            Scan (In-store proximity)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Footer */}
                  <div className="p-2.5 text-center text-[14px] text-white/20 font-mono tracking-wider border-t border-white/5">
                    PORTAL COMPLIANT OS
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAssignStaffModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans select-none"
            onClick={() => setShowAssignStaffModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-lg max-w-5xl w-full shadow-2xl border border-[#EAE4DC] flex flex-col max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header section */}
              <div className="p-6 pb-4 border-b border-[#EAE4DC] flex items-start justify-between">
                <div className="space-y-1 text-left">
                  <h3 className="text-xl font-bold text-[#1C1814] font-display">Assign Staff</h3>
                  <p className="text-[14px] text-slate-700 font-sans font-normal leading-relaxed">
                    Assign team members to shifts for the selected period.
                  </p>
                </div>
                <button
                   onClick={() => setShowAssignStaffModal(false)}
                   className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 transition-all cursor-pointer border-none"
                   title="Close Dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filters row section */}
              <div className="p-6 py-4 bg-slate-50/50 border-b border-[#EAE4DC] flex flex-wrap md:flex-nowrap items-center gap-4">
                {/* 1. Store filter */}
                <div className="w-full md:w-1/4 text-left">
                  <span className="text-[14px] font-bold text-slate-700 tracking-wide block mb-1.5">Store</span>
                  <div className="relative">
                    <select
                      value={modalStoreFilter}
                      onChange={(e) => setModalStoreFilter(e.target.value)}
                      className="w-full border border-[#EAE4DC] bg-white rounded-lg px-3 py-2 text-[14px] font-medium text-slate-700 outline-none focus:border-[#7553FF] cursor-pointer appearance-none pr-8 h-[38px]"
                    >
                      <option value="All Stores">All Stores</option>
                      <option value="HQ Store">HQ Store</option>
                      <option value="Vinh Store">Vinh Store</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Date Range */}
                <div className="w-full md:w-1/4 text-left">
                  <span className="text-[14px] font-bold text-slate-700 tracking-wide block mb-1.5">Date range</span>
                  <div className="relative">
                    <select
                      value={modalDateRange}
                      onChange={(e) => setModalDateRange(e.target.value)}
                      className="w-full border border-[#EAE4DC] bg-white rounded-lg pl-9 pr-8 text-[14px] font-medium text-slate-700 outline-none focus:border-[#7553FF] cursor-pointer appearance-none h-[38px]"
                    >
                      <option value="Jun 8 - Jun 14, 2026">Jun 8 - Jun 14, 2026</option>
                      <option value="May 12 - May 18, 2024">May 12 - May 18, 2024</option>
                      <option value="Jul 1 - Jul 7, 2026">Jul 1 - Jul 7, 2026</option>
                    </select>
                    <CalendarIcon className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <ChevronDown className="w-4 h-4 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Shift Type */}
                <div className="w-full md:w-1/4 text-left">
                  <span className="text-[14px] font-bold text-slate-700 tracking-wide block mb-1.5">Shift type</span>
                  <div className="relative">
                    <select
                      value={modalShiftFilter}
                      onChange={(e) => setModalShiftFilter(e.target.value)}
                      className="w-full border border-[#EAE4DC] bg-white rounded-lg px-3 py-2 text-[14px] font-medium text-slate-700 outline-none focus:border-[#7553FF] cursor-pointer appearance-none pr-8 h-[38px]"
                    >
                      <option value="All Shifts">All shifts</option>
                      <option value="Morning">Morning shifts</option>
                      <option value="Afternoon">Afternoon shifts</option>
                      <option value="Evening">Evening shifts</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Search bar */}
                <div className="w-full md:w-1/4 text-left">
                  <span className="text-[14px] font-bold text-slate-700 tracking-wide block mb-1.5">Search staff</span>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search staff by name or role"
                      value={modalSearchQuery}
                      onChange={(e) => setModalSearchQuery(e.target.value)}
                      className="w-full border border-[#EAE4DC] placeholder-slate-400 focus:placeholder-slate-700 bg-white rounded-lg pl-9 pr-4 text-[14px] text-slate-700 outline-none focus:border-[#7553FF] h-[38px]"
                    />
                    <Search className="w-4 h-4 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    {modalSearchQuery && (
                      <button 
                        onClick={() => setModalSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 hover:text-slate-600 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Two columns layout partition */}
              <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[350px]">
                
                {/* Column A (Left Column): All Staff */}
                <div className="border border-[#EAE4DC] rounded-lg bg-slate-50/25 p-4 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <span className="text-[14px] font-bold text-slate-800">
                      All Staff ({
                        initialModalStaff.filter(s => {
                          const matchesSearch = s.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
                                                s.role.toLowerCase().includes(modalSearchQuery.toLowerCase());
                          return matchesSearch;
                        }).length
                      })
                    </span>
                    <button className="p-1 hover:bg-slate-105 rounded text-slate-700 cursor-pointer border-none" title="Advanced Filter">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scrollable list */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[320px] pr-1.5">
                    {initialModalStaff
                      .filter(s => {
                        const matchesSearch = s.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
                                              s.role.toLowerCase().includes(modalSearchQuery.toLowerCase());
                        return matchesSearch;
                      })
                      .map((member) => {
                        const isChecked = modalSelectedStaff.includes(member.id);
                        return (
                          <div 
                            key={member.id}
                            onClick={() => {
                              if (isChecked) {
                                setModalSelectedStaff(prev => prev.filter(id => id !== member.id));
                              } else {
                                setModalSelectedStaff(prev => [...prev, member.id]);
                              }
                            }}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none bg-white hover:shadow-card ${
                              isChecked 
                                ? 'border-[#7553FF]/40 bg-[#7553FF]/5' 
                                : 'border-[#EAE4DC] hover:border-[#DCD2C7]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Custom high-fidelity Checkbox */}
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                isChecked 
                                  ? 'bg-[#7553FF] border-[#7553FF] text-white' 
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                              </div>

                              {/* Avatar representation or circle */}
                              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#7553FF]/20 shrink-0 flex items-center justify-center bg-[#7553FF]/10 text-[#7553FF] font-bold text-[12px] relative select-none">
                                {getInitials(member.name)}
                                <img 
                                  src={member.avatar} 
                                  alt={member.name} 
                                  referrerPolicy="no-referrer"
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="text-left leading-tight">
                                <p className="text-[14px] font-semibold text-slate-800">{member.name}</p>
                                <p className="text-[14px] text-slate-700 font-normal">{member.role}</p>
                              </div>
                            </div>

                            {/* Badge */}
                            <div>
                              {member.availability === 'Available' ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[14px] font-normal text-emerald-700 bg-emerald-50 border border-emerald-100">
                                  Available
                                </span>
                              ) : member.availability === 'Partially available' ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[14px] font-normal text-amber-700 bg-amber-50 border border-amber-100">
                                  Partially available
                                </span>
                              ) : (
                                <span className="inline-block px-2.5 py-0.5 rounded-md text-[14px] font-normal text-rose-700 bg-rose-50 border border-rose-100">
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Column B (Right Column): Selected shifts */}
                <div className="border border-[#EAE4DC] rounded-lg bg-slate-50/25 p-4 flex flex-col h-full overflow-hidden justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <span className="text-[14px] font-bold text-slate-800">
                        Selected shifts ({modalSelectedShifts.length})
                      </span>
                      {modalSelectedShifts.length > 0 && (
                        <button 
                          onClick={() => setModalSelectedShifts([])}
                          className="text-[14px] font-semibold text-[#7553FF] hover:text-[#623EE2] hover:underline cursor-pointer border-none bg-transparent"
                        >
                          Clear all
                        </button>
                      )}
                    </div>

                    {/* Shifts list scrollable */}
                    <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1.5 text-left">
                      {modalSelectedShifts.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg border border-[#EAE4DC] border-dashed text-slate-700 text-[14px]">
                          No shifts selected. Click "Add more shifts" below or assign to empty templates.
                        </div>
                      ) : (
                        modalSelectedShifts.map((shift) => (
                          <div 
                            key={shift.id}
                            className="p-3 bg-white border border-[#EAE4DC] rounded-lg flex items-center justify-between shadow-card hover:border-[#DCD2C7] transition-all"
                          >
                            <div className="flex items-center gap-3">
                              {/* Colored Dot */}
                              <div 
                                className="w-2.5 h-2.5 rounded-full shrink-0" 
                                style={{ backgroundColor: shift.dotColor }} 
                              />
                              <div>
                                <p className="text-[14px] font-bold text-slate-800 leading-tight">
                                  {shift.day} • {shift.name}
                                </p>
                                <p className="text-[14px] text-slate-700 font-medium">
                                  {shift.label}
                                </p>
                              </div>
                            </div>

                            <button 
                              onClick={() => {
                                setModalSelectedShifts(prev => prev.filter(s => s.id !== shift.id));
                              }}
                              className="p-1 hover:bg-slate-105 rounded text-slate-700 hover:text-slate-600 transition-all cursor-pointer border-none bg-transparent"
                              title="Remove shift from selection"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add more shifts dynamic action link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-start">
                    <button 
                      onClick={() => {
                        const count = modalSelectedShifts.length + 1;
                        let newShift;
                        if (count % 3 === 1) {
                          newShift = { id: `sh-programmed-${Date.now()}`, day: 'Wed, Jun 10', name: 'Morning (07:00 - 15:00)', dotColor: '#F97316', label: 'Min 3 / Max 6 staff' };
                        } else if (count % 3 === 2) {
                          newShift = { id: `sh-programmed-${Date.now()}`, day: 'Thu, Jun 11', name: 'Afternoon (11:00 - 19:00)', dotColor: '#EAB308', label: 'Min 3 / Max 6 staff' };
                        } else {
                          newShift = { id: `sh-programmed-${Date.now()}`, day: 'Sat, Jun 13', name: 'Night Shift (19:00 - 03:00)', dotColor: '#EC4899', label: 'Min 2 / Max 4 staff' };
                        }
                        setModalSelectedShifts(prev => [...prev, newShift]);
                      }}
                      className="text-[14px] font-bold text-[#7553FF] hover:text-[#623EE2] flex items-center gap-1 cursor-pointer select-none border-none bg-transparent"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add more shifts
                    </button>
                  </div>
                </div>

              </div>

              {/* Sticky modal footer actions */}
              <div className="p-4 bg-slate-50 border-t border-[#EAE4DC] flex items-center justify-between select-none">
                <button
                  onClick={() => setShowAssignStaffModal(false)}
                  className="px-5 py-2 hover:bg-slate-105 border border-[#EAE4DC] hover:border-[#DCD2C7] text-slate-600 font-semibold text-[14px] rounded-lg h-9 transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAssignStaffModal(false);
                    setSavePlanSuccess(true);
                    setTimeout(() => setSavePlanSuccess(false), 3500);
                  }}
                  className="px-6 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-lg h-9 transition-all cursor-pointer border-none shadow-sm flex items-center gap-1.5"
                >
                  <span>Assign Staff ({modalSelectedStaff.length})</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}

        {/* HIGH-FIDELITY SHIFT PLANNER SETTINGS POPUP MODAL */}
        {showSettingsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans select-none"
            onClick={() => setShowSettingsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-lg max-w-5xl w-full shadow-2xl border border-[#EAE4DC] flex flex-col max-h-[92vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
                        {/* Header section with X button */}
              <div className="p-6 pb-4 border-b border-[#EAE4DC] flex items-start justify-between">
                <div className="space-y-1 text-left">
                  <h3 className="text-xl font-bold text-[#1C1814] font-display">Shift Planner Settings</h3>
                  <p className="text-[14px] text-slate-700 font-sans font-normal leading-relaxed">
                    Configure shift types (work periods) and set days off for your team.
                  </p>
                </div>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 transition-all cursor-pointer border-none"
                  title="Close Settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content body with three sections scrollable */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 text-left">
                
                {/* SECTION 1: SHIFT TYPES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-[16px] font-bold text-[#1C1814]">1. Shift Types</h4>
                      <p className="text-[14px] text-slate-700 font-sans">Create, edit, and manage shift types used in your schedule.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const name = prompt("Enter Shift Name (e.g. Weekend Special):");
                        if (!name) return;
                        const time = prompt("Enter Time interval (e.g. 12:00 - 18:00):", "12:00 - 18:00");
                        if (!time) return;
                        const minS = parseInt(prompt("Enter Min Staff count:", "2") || "2", 10);
                        const maxS = parseInt(prompt("Enter Max Staff count:", "5") || "5", 10);
                        
                        setShiftTypes(prev => [
                          ...prev,
                          {
                            id: `st-${Date.now()}`,
                            name,
                            time,
                            minStaff: minS,
                            maxStaff: maxS
                          }
                        ]);
                      }}
                      className="px-3 py-1.5 border border-[#7553FF]/60 hover:bg-[#7553FF]/5 text-[#7553FF] font-bold text-[14px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Shift Type</span>
                    </button>
                  </div>

                  {/* Shift Types Table */}
                  <div className="overflow-hidden border border-[#EAE4DC] rounded-lg">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-medium font-serif text-slate-800  tracking-widest leading-normal">
                          <th className="px-4 py-3 text-left font-semibold font-serif">Shift Name</th>
                          <th className="px-4 py-3 text-left font-semibold font-serif">Time</th>
                          <th className="px-4 py-3 text-left font-semibold font-serif">Default Min. Staff</th>
                          <th className="px-4 py-3 text-left font-semibold font-serif">Default Max. Staff</th>
                          <th className="px-4 py-3 text-right font-semibold pr-6 font-serif">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE4DC] text-[14px] font-sans text-slate-700">
                        {shiftTypes.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3 font-semibold text-slate-800">{st.name}</td>
                            <td className="px-4 py-3 font-mono text-slate-700">{st.time}</td>
                            <td className="px-4 py-3 font-medium">{st.minStaff}</td>
                            <td className="px-4 py-3 font-medium">{st.maxStaff}</td>
                            <td className="px-4 py-3 text-right pr-6">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => {
                                    const newName = prompt("Edit Shift Name:", st.name);
                                    if (!newName) return;
                                    const newTime = prompt("Edit Time range:", st.time);
                                    if (!newTime) return;
                                    setShiftTypes(prev => prev.map(item => item.id === st.id ? { ...item, name: newName, time: newTime } : item));
                                  }}
                                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-800 transition-all cursor-pointer bg-transparent"
                                  title="Edit Shift Type"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => setShiftTypes(prev => prev.filter(item => item.id !== st.id))}
                                  className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 text-[#E11D48] transition-all cursor-pointer"
                                  title="Delete Shift Type"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Shift types info alert box */}
                  <div className="flex items-center gap-2 text-[14px] text-[#7553FF] font-medium py-1">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>These shift types will be available when planning and assigning shifts.</span>
                  </div>
                </div>

                {/* SECTION 2: DAYS OFF (RECURRING) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-[16px] font-bold text-[#1C1814]">2. Days Off (Recurring)</h4>
                      <p className="text-[14px] text-slate-700 font-sans">Set default weekly days off for the entire team.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const day = prompt("Enter Week Day Name (e.g. Sunday):");
                        if (!day) return;
                        setWeeklyDaysOff(prev => [...prev, { id: `wd-${Date.now()}`, day, isOff: true }]);
                      }}
                      className="px-3 py-1.5 border border-[#7553FF]/60 hover:bg-[#7553FF]/5 text-[#7553FF] font-bold text-[14px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Weekly Day Off</span>
                    </button>
                  </div>

                  {/* Recurring table */}
                  <div className="overflow-hidden border border-[#EAE4DC] rounded-lg">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-medium font-serif text-slate-800  tracking-widest leading-normal">
                          <th className="px-4 py-3 text-left font-semibold font-serif">Day</th>
                          <th className="px-4 py-3 text-left font-semibold font-serif">Status</th>
                          <th className="px-4 py-3 text-right font-semibold pr-6 font-serif">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE4DC] text-[14px] font-sans text-slate-700">
                        {weeklyDaysOff.map((wd) => (
                          <tr key={wd.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3 font-semibold text-slate-800">{wd.day}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {/* Custom sliding toggle switch representation */}
                                <button 
                                  onClick={() => {
                                    setWeeklyDaysOff(prev => prev.map(item => item.id === wd.id ? { ...item, isOff: !item.isOff } : item));
                                  }}
                                  className={`w-9 h-5 rounded-full flex items-center p-0.5 transition-all outline-none border-none cursor-pointer ${
                                    wd.isOff ? 'bg-emerald-500' : 'bg-slate-200'
                                  }`}
                                >
                                  <div 
                                    className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-all ${
                                      wd.isOff ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                                <span className={`text-[14px] font-normal ${wd.isOff ? 'text-emerald-600' : 'text-slate-700'}`}>
                                  {wd.isOff ? 'Day off' : 'Working day'}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right pr-6">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => {
                                    const rename = prompt("Rename day off:", wd.day);
                                    if (rename) {
                                      setWeeklyDaysOff(prev => prev.map(item => item.id === wd.id ? { ...item, day: rename } : item));
                                    }
                                  }}
                                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-800 transition-all cursor-pointer bg-transparent"
                                  title="Edit day off"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => setWeeklyDaysOff(prev => prev.filter(item => item.id !== wd.id))}
                                  className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 text-[#E11D48] transition-all cursor-pointer"
                                  title="Remove day off"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Recurring info alert box */}
                  <div className="flex items-center gap-2 text-[14px] text-[#7553FF] font-medium py-1">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>These settings will be applied when planning. Staff will not be scheduled on days marked as "Day off".</span>
                  </div>
                </div>

                {/* SECTION 3: DAYS OFF (FLEXIBLE / ONE-OFF) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-[16px] font-bold text-[#1C1814]">3. Days Off (Flexible / One-off)</h4>
                      <p className="text-[14px] text-slate-700 font-sans">Add specific dates when the entire team is off.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const date = prompt("Enter Date (e.g. May 20, 2026 (Tue)):");
                        if (!date) return;
                        const reason = prompt("Enter Reason (optional):", "Public holiday");
                        setFlexibleDaysOff(prev => [
                          ...prev,
                          {
                            id: `fd-${Date.now()}`,
                            date,
                            reason: reason || ''
                          }
                        ]);
                      }}
                      className="px-3 py-1.5 border border-[#7553FF]/60 hover:bg-[#7553FF]/5 text-[#7553FF] font-bold text-[14px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer bg-white"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add One-off Day Off</span>
                    </button>
                  </div>

                  {/* Flexible table */}
                  <div className="overflow-hidden border border-[#EAE4DC] rounded-lg">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-medium font-serif text-slate-800  tracking-widest leading-normal">
                          <th className="px-4 py-3 text-left font-semibold font-serif">Date</th>
                          <th className="px-4 py-3 text-left font-semibold font-serif">Reason (optional)</th>
                          <th className="px-4 py-3 text-right font-semibold pr-6 font-serif">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE4DC] text-[14px] font-sans text-slate-700">
                        {flexibleDaysOff.map((fd) => (
                          <tr key={fd.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-4 py-3 font-semibold text-slate-800">{fd.date}</td>
                            <td className="px-4 py-3 text-slate-700">{fd.reason}</td>
                            <td className="px-4 py-3 text-right pr-6">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => {
                                    const editDate = prompt("Edit Date:", fd.date);
                                    if (!editDate) return;
                                    const editReason = prompt("Edit Reason:", fd.reason);
                                    setFlexibleDaysOff(prev => prev.map(item => item.id === fd.id ? { ...item, date: editDate, reason: editReason || '' } : item));
                                  }}
                                  className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-800 transition-all cursor-pointer bg-transparent"
                                  title="Edit flexible day off"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => setFlexibleDaysOff(prev => prev.filter(item => item.id !== fd.id))}
                                  className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100 text-[#E11D48] transition-all cursor-pointer"
                                  title="Delete flexible day off"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Flexible info alert box */}
                  <div className="flex items-center gap-2 text-[14px] text-[#7553FF] font-medium py-1">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>These one-off days will override the weekly settings. No shifts will be scheduled on these dates.</span>
                  </div>
                </div>

              </div>

              {/* Sticky modal footer actions */}
              <div className="p-4 bg-slate-50 border-t border-[#EAE4DC] flex items-center justify-between select-none">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-5 py-2 hover:bg-slate-100 border border-[#EAE4DC] hover:border-[#DCD2C7] text-slate-600 font-semibold text-[14px] rounded-lg h-9 transition-all cursor-pointer bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    setSavePlanSuccess(true);
                    setTimeout(() => setSavePlanSuccess(false), 3500);
                  }}
                  className="px-6 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-[14px] rounded-lg h-9 transition-all cursor-pointer border-none shadow-sm"
                >
                  Save Changes
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}

        {/* HIGH-FIDELITY "ALL PENDING STAFF REQUESTS" POPUP MODAL */}
        {showPendingRequestsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans select-none"
            onClick={() => setShowPendingRequestsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-lg max-w-7xl w-full shadow-2xl border border-[#EAE4DC] flex flex-col max-h-[92vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header section with tabs and closing cross */}
              <div className="p-6 pb-0 border-b border-[#EAE4DC]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 text-left">
                    <h2 className="text-2xl font-medium text-[#1C1814] font-display flex items-center gap-2">
                      <span>Roster Review Center</span>
                    </h2>
                    <p className="text-[14px] text-slate-700 font-sans font-normal leading-relaxed">
                      Analyze system warnings, coverage gaps, and resolve employee shift requests.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPendingRequestsModal(false)}
                    className="rounded-lg p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-600 transition-all cursor-pointer border-none bg-transparent"
                    title="Close Dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Unified Tab selector */}
                <div className="flex gap-4 mt-6 border-b border-transparent -mb-px">
                  <button
                    onClick={() => setActiveModalTab('requests')}
                    className={`pb-3 px-1 text-[14px] font-medium border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeModalTab === 'requests'
                        ? 'border-[#7553FF] text-[#7553FF]'
                        : 'border-transparent text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Pending Requests</span>
                    <span className={`px-1.5 py-0.5 text-[14px] font-medium rounded-full ${
                      activeModalTab === 'requests'
                        ? 'bg-[#F0ECFF] text-[#7553FF]'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {pendingRequests.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveModalTab('warnings')}
                    className={`pb-3 px-1 text-[14px] font-medium border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                      activeModalTab === 'warnings'
                        ? 'border-[#7553FF] text-[#7553FF]'
                        : 'border-transparent text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Schedule Warnings</span>
                    <span className={`px-1.5 py-0.5 text-[14px] font-medium rounded-full ${
                      activeModalTab === 'warnings'
                        ? 'bg-amber-50 text-[#B45309]'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {warningsList.length}
                    </span>
                  </button>
                </div>
              </div>

              {activeModalTab === 'requests' ? (
                <>
                  {/* Filters control bar (1:1 with photo layout) */}
                  <div className="p-6 pb-4 bg-slate-50/50 border-b border-[#EAE4DC] grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-left">
                {/* 1. Store Filter */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 tracking-wide block font-sans">Store</label>
                  <div className="relative">
                    <select
                      value={pendingStoreFilter}
                      onChange={(e) => {
                        setPendingStoreFilter(e.target.value);
                        setActivePendingPage(1);
                      }}
                      className="w-full h-10 pl-3 pr-8 border border-[#EAE4DC] rounded-lg bg-white text-slate-800 text-[14px] focus:outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 appearance-none cursor-pointer"
                    >
                      <option value="All Stores">All Stores</option>
                      <option value="HQ Store">HQ Store</option>
                      <option value="Vinh Store">Vinh Store</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-700 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Request Type Filter */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 tracking-wide block font-sans">Request type</label>
                  <div className="relative">
                    <select
                      value={pendingTypeFilter}
                      onChange={(e) => {
                        setPendingTypeFilter(e.target.value);
                        setActivePendingPage(1);
                      }}
                      className="w-full h-10 pl-3 pr-8 border border-[#EAE4DC] rounded-lg bg-white text-slate-800 text-[14px] focus:outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 appearance-none cursor-pointer"
                    >
                      <option value="All types">All types</option>
                      <option value="Swap shift">Swap shift</option>
                      <option value="Time off">Time off</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-700 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Status Filter */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 tracking-wide block font-sans">Status</label>
                  <div className="relative">
                    <select
                      value={pendingStatusFilter}
                      onChange={(e) => {
                        setPendingStatusFilter(e.target.value);
                        setActivePendingPage(1);
                      }}
                      className="w-full h-10 pl-3 pr-8 border border-[#EAE4DC] rounded-lg bg-white text-slate-800 text-[14px] focus:outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 appearance-none cursor-pointer"
                    >
                      <option value="All status">All status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-700 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Date Range selector display */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 tracking-wide block font-sans">Date range</label>
                  <div className="w-full h-10 px-3 bg-white border border-[#EAE4DC] rounded-lg flex items-center gap-2 text-slate-700 text-[14px] select-none shadow-xs">
                    <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                    <span>Jun 8 - Jun 14, 2026</span>
                  </div>
                </div>

                {/* 5. Search field */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 tracking-wide block font-sans">&nbsp;</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={pendingSearchQuery}
                      onChange={(e) => {
                        setPendingSearchQuery(e.target.value);
                        setActivePendingPage(1);
                      }}
                      placeholder="Search by staff name"
                      className="w-full h-10 pl-9 pr-3 border border-[#EAE4DC] rounded-lg bg-white text-slate-800 text-[14px] focus:outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 font-sans"
                    />
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-700 pointer-events-none" />
                  </div>
                </div>

                {/* 6. Action buttons: Bulk & AI Optimal Resolve */}
                <div className="md:col-span-2 flex gap-2 justify-end">
                  <div className="relative w-full">
                    <button
                      onClick={() => setBulkActionOpen(!bulkActionOpen)}
                      className="w-full h-10 border border-[#7553FF]/50 bg-white hover:bg-[#7553FF]/5 text-[#7553FF] font-medium text-[14px] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Bulk option</span>
                      <ChevronDown className="w-4 h-4 text-[#7553FF]" />
                    </button>
                    {bulkActionOpen && (
                      <div className="absolute right-0 bottom-11 md:bottom-auto md:top-11 w-44 bg-white border border-[#EAE4DC] rounded-lg shadow-xl z-50 p-1 divide-y divide-slate-100">
                        <button
                          onClick={() => {
                            setPendingRequestsList(prev => prev.map(req => req.status === 'PENDING' ? { ...req, status: 'APPROVED' } : req));
                            setBulkActionOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-[14px] text-[#15803D] hover:bg-emerald-50 rounded-md transition-all border-none bg-transparent cursor-pointer font-sans"
                        >
                          Approve All
                        </button>
                        <button
                          onClick={() => {
                            setPendingRequestsList(prev => prev.map(req => req.status === 'PENDING' ? { ...req, status: 'REJECTED' } : req));
                            setBulkActionOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-[14px] text-rose-700 hover:bg-rose-50 rounded-md transition-all border-none bg-transparent cursor-pointer font-sans"
                        >
                          Reject All
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Auto resolving loader layer */}
              {isAIResolving && (
                <div className="bg-[#7553FF]/5 px-6 py-3 border-b border-[#EAE4DC] flex items-center gap-3 animate-pulse text-left select-none">
                  <div className="w-4 h-4 border-2 border-[#7553FF] border-t-transparent rounded-full animate-spin shrink-0" />
                  <span className="text-[14px] text-[#7553FF] font-semibold font-sans">{aiResolveMessage}</span>
                </div>
              )}

              {/* Table Body listing (As requested in image) */}
              <div className="flex-1 overflow-x-auto min-h-[400px]">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="border-b border-[#EAE4DC] bg-slate-50/50 text-[14px] font-medium font-serif text-slate-800  tracking-widest leading-normal">
                      <th className="px-6 py-4 text-left font-serif font-medium  tracking-widest">Request</th>
                      <th className="px-6 py-4 text-left font-serif font-medium  tracking-widest">Staff</th>
                      <th className="px-6 py-4 text-left font-serif font-medium  tracking-widest">Type</th>
                      <th className="px-6 py-4 text-left font-serif font-medium  tracking-widest">Shift Details</th>
                      <th className="px-6 py-4 text-left font-serif font-medium  tracking-widest">Request Time</th>
                      <th className="px-6 py-4 text-center font-serif font-medium  tracking-widest">Status</th>
                      <th className="px-6 py-4 text-right pr-8 font-serif font-medium  tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE4DC] text-[14px] font-sans text-slate-700">
                    {/* Filter requests */}
                    {pendingRequestsList
                      .filter(req => {
                        if (pendingStoreFilter !== 'All Stores' && req.store !== pendingStoreFilter) return false;
                        if (pendingTypeFilter !== 'All types') {
                          const ft = pendingTypeFilter.toLowerCase();
                          if (!req.requestType.toLowerCase().includes(ft) && !req.typeText.toLowerCase().includes(ft)) return false;
                        }
                        if (pendingStatusFilter !== 'All status' && req.status !== pendingStatusFilter) return false;
                        if (pendingSearchQuery) {
                          const q = pendingSearchQuery.toLowerCase();
                          if (!req.staffName.toLowerCase().includes(q) && !req.id.toLowerCase().includes(q)) return false;
                        }
                        return true;
                      })
                      .map((req) => (
                        <React.Fragment key={req.id}>
                          <tr className="hover:bg-slate-50/50 transition-all">
                            {/* Request Column */}
                            <td className="px-6 py-4 text-left font-semibold">
                              <div className="flex items-center gap-3">
                                {req.typeText === 'Swap' ? (
                                  <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                                    <ArrowLeftRight className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="w-9 h-9 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                )}
                                <div className="space-y-0.5 text-left">
                                  <p className="font-bold text-[#7553FF] font-display hover:underline cursor-pointer">{req.requestType}</p>
                                  <p className="text-slate-700 text-[14px] font-mono leading-none">{req.id}</p>
                                </div>
                              </div>
                            </td>

                            {/* Staff Column */}
                            <td className="px-6 py-4 text-left">
                              <div className="flex items-center gap-3">
                                <img
                                  src={req.staffAvatar}
                                  alt={req.staffName}
                                  onError={(e) => {
                                    // Fallback if image fails
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                  className="w-9 h-9 rounded-full object-cover border border-[#EAE4DC] shrink-0"
                                />
                                <div className="space-y-0.5 text-left">
                                  <p className="font-bold text-slate-800 leading-tight">{req.staffName}</p>
                                  <p className="text-slate-700 text-[14px] leading-tight">{req.staffRole} • {req.store}</p>
                                </div>
                              </div>
                            </td>

                            {/* Type badge Column */}
                            <td className="px-6 py-4 text-left">
                              {req.typeText === 'Swap' ? (
                                <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 text-[14px] font-normal px-2.5 py-0.5 rounded-md lowercase shrink-0">
                                  swap
                                </span>
                              ) : (
                                <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 text-[14px] font-normal px-2.5 py-0.5 rounded-md lowercase shrink-0">
                                  time off
                                </span>
                              )}
                            </td>

                            {/* Shift Details Column */}
                            <td className="px-6 py-4 text-left">
                              <div className="space-y-1">
                                <div className="text-[14px] text-slate-700 font-mono whitespace-pre-line leading-relaxed">
                                  {req.details}
                                </div>
                              </div>
                            </td>

                            {/* Request Time Column */}
                            <td className="px-6 py-4 text-left">
                              <div className="space-y-0.5">
                                <p className="font-bold text-slate-800 leading-tight">{req.requestTime}</p>
                                <p className="text-slate-700 text-[14px] leading-tight">{req.requestDate}</p>
                              </div>
                            </td>

                            {/* Status badge Column */}
                            <td className="px-6 py-4 text-center">
                              {req.status === 'PENDING' ? (
                                <span className="inline-block bg-amber-50 text-[#B45309] border border-amber-100 rounded-md px-3 py-1 font-normal text-[14px] text-center">
                                  PENDING
                                </span>
                              ) : req.status === 'APPROVED' ? (
                                <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md px-3 py-1 font-normal text-[14px] text-center">
                                  APPROVED
                                </span>
                              ) : (
                                <span className="inline-block bg-rose-50 text-rose-700 border border-rose-100 rounded-md px-3 py-1 font-normal text-[14px] text-center">
                                  REJECTED
                                </span>
                              )}
                            </td>

                            {/* Actions Column */}
                            <td className="px-6 py-4 text-right pr-8">
                              <div className="flex items-center justify-end gap-2">
                                {req.status === 'PENDING' ? (
                                  <>
                                    <button
                                      onClick={() => handleApproveRequest(req.id)}
                                      className="p-1.5 border border-[#15803D]/20 text-[#15803D] hover:bg-emerald-50 rounded-lg transition-all cursor-pointer bg-white"
                                      title="Approve Request"
                                    >
                                      <Check className="w-5 h-5 text-[#15803D]" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectRequest(req.id)}
                                      className="p-1.5 border border-rose-100 text-[#B91C1C] hover:bg-rose-50 rounded-lg transition-all cursor-pointer bg-white"
                                      title="Reject Request"
                                    >
                                      <X className="w-5 h-5 text-[#B91C1C]" />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setPendingRequestsList(prev => prev.map(item => item.id === req.id ? { ...item, status: 'PENDING' } : item));
                                    }}
                                    className="px-2 py-1 hover:bg-slate-100 text-slate-700 hover:text-slate-800 transition-all font-semibold text-[14px] rounded border border-slate-200 bg-white cursor-pointer"
                                  >
                                    Reset to Pending
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    {pendingRequestsList.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-slate-700 font-sans text-[16px]">
                          No requests found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Standard Paginator footer (as pictured) */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-[#EAE4DC] flex items-center justify-between select-none">
                <span className="text-[14px] text-slate-700 font-sans">
                  Showing 1 to {pendingRequestsList.length} of {pendingRequestsList.length} requests
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg bg-white disabled:opacity-50 disabled:pointer-events-none" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 font-medium text-[14px] rounded-lg bg-[#7553FF] text-white flex items-center justify-center cursor-pointer border-none shadow-xs">
                    1
                  </button>
                  <button className="p-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer rounded-lg bg-white disabled:opacity-50 disabled:pointer-events-none" disabled>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="flex flex-wrap items-center justify-between border-b border-[#EAE4DC] pb-4 gap-2">
                <h3 className="text-[16px] font-medium text-slate-800">Roster Diagnostics & Warnings</h3>
                <p className="text-[14px] text-slate-750">We found {warningsList.length} potential issues with the current schedule.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warningsList.map((warning, idx) => {
                  const isGap = warning.type === 'gap';
                  const isLeave = warning.type === 'leave';
                  const isOT = warning.type === 'overtime';
                  
                  let iconColor = 'text-[#B45309]';
                  let bgColor = 'bg-amber-50/50';
                  let borderColor = 'border-amber-100';
                  let badgeText = 'Warning';
                  
                  if (isGap) {
                    iconColor = 'text-[#B45309]';
                    bgColor = 'bg-amber-50/40';
                    borderColor = 'border-amber-100';
                    badgeText = 'Under-staffed';
                  } else if (isLeave) {
                    iconColor = 'text-sky-700';
                    bgColor = 'bg-sky-50/40';
                    borderColor = 'border-sky-100';
                    badgeText = 'Leave Conflict';
                  } else if (isOT) {
                    iconColor = 'text-[#7553FF]';
                    bgColor = 'bg-[#F0ECFF]/40';
                    borderColor = 'border-[#7553FF]/20';
                    badgeText = 'Overtime';
                  }
                  
                  return (
                    <div key={idx} className={`p-4 ${bgColor} border ${borderColor} rounded-lg flex items-start gap-3.5 transition-all text-left`}>
                      <div className={`p-2 bg-white rounded-md shadow-xs shrink-0 ${iconColor}`}>
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-medium text-slate-850">{warning.title}</span>
                          <span className={`px-2 py-0.5 text-[12px] font-medium rounded-full ${iconColor} bg-white border border-current/10`}>
                            {badgeText}
                          </span>
                        </div>
                        <p className="text-[14px] text-slate-700 font-normal leading-relaxed">{warning.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {warningsList.length === 0 && (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#15803D] flex items-center justify-center mx-auto border border-emerald-100">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-[16px] font-medium text-slate-850">All systems optimized!</p>
                  <p className="text-[14px] text-slate-700 font-sans max-w-md mx-auto">No understaffed shifts, approved leave overlaps, or overtime limits were violated.</p>
                </div>
              )}
            </div>
          )}

              {/* Sticky footer actions with a simple single 'Close' button */}
              <div className="p-4 bg-slate-100 border-t border-[#EAE4DC] flex items-center justify-end select-none">
                <button
                  onClick={() => setShowPendingRequestsModal(false)}
                  className="px-6 py-2 bg-white hover:bg-slate-50 border border-[#EAE4DC] hover:border-[#DCD2C7] text-slate-800 font-bold text-[14px] rounded-lg transition-all cursor-pointer h-10 shadow-xs"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
