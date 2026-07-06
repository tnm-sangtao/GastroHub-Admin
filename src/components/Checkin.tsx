import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "./DatePicker";
import {
  Upload,
  Plus,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  Search,
  ChevronDown,
  MapPin,
  Check,
  FileText,
  X,
  Filter,
  User,
  Coffee,
  CheckSquare,
  Pencil
} from "lucide-react";

// Types for the Attendance Module
export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  shiftName: string; // "Morning", "Afternoon", "Evening", "Overnight"
  shiftTimes: string; // "09:00 AM - 05:00 PM"
  checkInTime: string | null; // e.g., "08:58 AM" or "19:15"
  checkInLoc: string | null;
  checkOutTime: string | null;
  checkOutLoc: string | null;
  breakDuration: string | null; // e.g., "1h 00m" or null (triggers auto-deduction)
  workingHours: string | null; // Net hours
  status: string; // "On Time", "Late (15m)", "Absent", "Completed"
  location: string; // e.g., "HCM 1", "HCM 2", "HN 1", "HQ"
  avatarColor: string;
  date: string; // "YYYY-MM-DD"
  reasonNote?: string;
  documentProof?: string;
  compensatoryHours?: string | number | null;
  deviceType?: string | null;
}

interface ScheduledShift {
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  branch: string; // "HCM 1", "HCM 2", "HN 1", "HQ"
  shiftName: string;
  startTime: string; // "09:00" or "19:00"
  endTime: string; // "17:00" or "03:00"
  isOvernight?: boolean;
  avatarColor: string;
}

export interface SimulatedUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff';
  assignedBranches: string[];
}

interface HistoricalLog {
  date: string;
  shiftName: string;
  checkin: string;
  checkout: string;
  breakTime: string;
  workHours: string;
  status: string;
}

function getHistoricalLogsForEmployee(employeeId: string): HistoricalLog[] {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  if (employeeId === "emp-1") {
    const fixedLogs: HistoricalLog[] = [
      { date: "Jan 10, 2026", shiftName: "Morning (09:00 - 17:00)", checkin: "08:55 AM", checkout: "05:00 PM", breakTime: "1h 00m", workHours: "7h 05m", status: "ON TIME" },
      { date: "Jan 18, 2026", shiftName: "Morning (09:00 - 17:00)", checkin: "09:18 AM", checkout: "05:00 PM", breakTime: "1h 00m", workHours: "6h 42m", status: "LATE (18M)" },
      { date: "Jan 25, 2026", shiftName: "Morning (09:00 - 17:00)", checkin: "09:00 AM", checkout: "05:00 PM", breakTime: "1h 00m", workHours: "7h 00m", status: "COMPLETED" },
      { date: "Feb 10, 2026", shiftName: "Morning (09:00 - 17:00)", checkin: "08:55 AM", checkout: "05:00 PM", breakTime: "1h 00m", workHours: "7h 05m", status: "ON TIME" },
      { date: "Feb 18, 2026", shiftName: "Morning (09:00 - 17:00)", checkin: "08:57 AM", checkout: "05:00 PM", breakTime: "1h 00m", workHours: "7h 03m", status: "ON TIME" }
    ];
    
    const logs: HistoricalLog[] = [...fixedLogs];
    let lateAdded = 1; // Jan 18 is late
    let dayCounter = 1;
    
    for (let m = 0; m < 12; m++) {
      const monthStr = months[m];
      const targetCount = 3; // 3 per month -> 36 total
      
      while (logs.filter(l => l.date.startsWith(monthStr)).length < targetCount) {
        dayCounter = (dayCounter * 7 + 3) % 25 + 1;
        const dateStr = `${monthStr} ${dayCounter}, 2026`;
        
        if (logs.some(l => l.date === dateStr)) continue;
        
        let isLate = false;
        if (lateAdded < 4 && m > 1 && logs.filter(l => l.status.startsWith("LATE")).length < 4) {
          isLate = true;
          lateAdded++;
        }
        
        const checkInMin = isLate ? (10 + (dayCounter % 15)) : (50 + (dayCounter % 10));
        const checkInHour = isLate ? 9 : 8;
        const checkInStr = `${checkInHour.toString().padStart(2, '0')}:${checkInMin.toString().padStart(2, '0')} AM`;
        
        const formattedWorkHours = isLate 
          ? `6h ${(60 - checkInMin).toString().padStart(2, '0')}m`
          : `7h ${(60 - (checkInMin >= 50 ? checkInMin - 50 : checkInMin)).toString().padStart(2, '0')}m`;
          
        logs.push({
          date: dateStr,
          shiftName: "Morning (09:00 - 17:00)",
          checkin: checkInStr,
          checkout: "05:00 PM",
          breakTime: "1h 00m",
          workHours: formattedWorkHours,
          status: isLate ? `LATE (${checkInMin}M)` : (dayCounter % 2 === 0 ? "ON TIME" : "COMPLETED")
        });
      }
    }
    
    return logs.sort((a, b) => {
      const mA = months.indexOf(a.date.split(" ")[0]);
      const mB = months.indexOf(b.date.split(" ")[0]);
      if (mA !== mB) return mA - mB;
      const dA = parseInt(a.date.split(" ")[1]);
      const dB = parseInt(b.date.split(" ")[1]);
      return dA - dB;
    }).slice(0, 36);
  }
  
  const empConfigs: Record<string, { total: number, late: number, shift: string, start: string, end: string, isPM: boolean, breakD: string }> = {
    "emp-2": { total: 34, late: 5, shift: "Morning (09:00 - 17:00)", start: "09:00 AM", end: "05:00 PM", isPM: false, breakD: "1h 00m" },
    "emp-3": { total: 30, late: 3, shift: "Afternoon (14:00 - 22:00)", start: "02:00 PM", end: "10:00 PM", isPM: true, breakD: "1h 00m" },
    "emp-4": { total: 42, late: 2, shift: "Afternoon (14:00 - 22:00)", start: "02:00 PM", end: "10:00 PM", isPM: true, breakD: "1h 00m" },
    "emp-5": { total: 28, late: 2, shift: "Morning (09:00 - 17:00)", start: "09:00 AM", end: "05:00 PM", isPM: false, breakD: "1h 00m" },
    "emp-6": { total: 25, late: 8, shift: "Afternoon (14:00 - 22:00)", start: "02:00 PM", end: "10:00 PM", isPM: true, breakD: "1h 00m" },
    "emp-7": { total: 48, late: 0, shift: "Overnight (19:00 - 03:00)", start: "07:00 PM", end: "03:00 AM", isPM: true, breakD: "1h 00m" }
  };
  
  const config = empConfigs[employeeId];
  if (!config) return [];
  
  const logs: HistoricalLog[] = [];
  let latesAdded = 0;
  let dayCounter = 5;
  
  for (let m = 0; m < 12; m++) {
    const monthStr = months[m];
    const targetCount = Math.ceil(config.total / 12);
    
    while (logs.filter(l => l.date.startsWith(monthStr)).length < targetCount && logs.length < config.total) {
      dayCounter = (dayCounter * 7 + 11) % 25 + 1;
      const dateStr = `${monthStr} ${dayCounter}, 2026`;
      
      if (logs.some(l => l.date === dateStr)) continue;
      
      const isLate = latesAdded < config.late && (logs.length % 5 === 0 || latesAdded === 0);
      if (isLate) latesAdded++;
      
      let checkinStr = "";
      let checkoutStr = config.end;
      let statusStr = "ON TIME";
      let workHoursStr = "7h 00m";
      
      if (employeeId === "emp-7") {
        checkinStr = "07:00 PM";
        statusStr = "COMPLETED";
        workHoursStr = "7h 00m";
      } else if (config.isPM) {
        if (isLate) {
          const lateMin = 5 + (dayCounter % 20);
          checkinStr = `02:${lateMin.toString().padStart(2, '0')} PM`;
          statusStr = `LATE (${lateMin}M)`;
          workHoursStr = `6h ${(60 - lateMin).toString().padStart(2, '0')}m`;
        } else {
          const min = (dayCounter % 10);
          checkinStr = min === 0 ? "02:00 PM" : `01:${(60 - min).toString().padStart(2, '0')} PM`;
          statusStr = min % 3 === 0 ? "COMPLETED" : "ON TIME";
          workHoursStr = min === 0 ? "7h 00m" : `7h ${min.toString().padStart(2, '0')}m`;
        }
      } else {
        if (isLate) {
          const lateMin = 5 + (dayCounter % 20);
          checkinStr = `09:${lateMin.toString().padStart(2, '0')} AM`;
          statusStr = `LATE (${lateMin}M)`;
          workHoursStr = `6h ${(60 - lateMin).toString().padStart(2, '0')}m`;
        } else {
          const min = (dayCounter % 10);
          checkinStr = min === 0 ? "09:00 AM" : `08:${(60 - min).toString().padStart(2, '0')} AM`;
          statusStr = min % 3 === 0 ? "COMPLETED" : "ON TIME";
          workHoursStr = min === 0 ? "7h 00m" : `7h ${min.toString().padStart(2, '0')}m`;
        }
      }
      
      logs.push({
        date: dateStr,
        shiftName: config.shift,
        checkin: checkinStr,
        checkout: checkoutStr,
        breakTime: config.breakD,
        workHours: workHoursStr,
        status: statusStr
      });
    }
  }
  
  return logs.sort((a, b) => {
    const mA = months.indexOf(a.date.split(" ")[0]);
    const mB = months.indexOf(b.date.split(" ")[0]);
    if (mA !== mB) return mA - mB;
    const dA = parseInt(a.date.split(" ")[1]);
    const dB = parseInt(b.date.split(" ")[1]);
    return dA - dB;
  }).slice(0, config.total);
}

export interface CheckinViewProps {
  simulatedUser?: any;
}

export default function CheckinView({ simulatedUser }: CheckinViewProps) {
  // --- STATE ---
  
  // Simulated Date: default to "2026-06-24"
  const [currentSimulatedDate, setCurrentSimulatedDate] = useState("2026-06-24");

  // Simulated Logged-In User for Access Control Rules
  const simulatedUsers: SimulatedUser[] = [
    {
      id: "user-admin",
      name: "System Admin (All Access)",
      email: "admin@gastrohub.com",
      role: "Admin",
      assignedBranches: ["HCM 1", "HCM 2", "HN 1", "HQ"]
    },
    {
      id: "user-manager-hcm1",
      name: "HCM 1 Branch Manager (Viet An)",
      email: "vietan.hcm1@johnsbistro.com",
      role: "Manager",
      assignedBranches: ["HCM 1"]
    },
    {
      id: "user-manager-hcm2",
      name: "HCM 2 Branch Manager (Minh Khoa)",
      email: "minhkhoa.hcm2@johnsbistro.com",
      role: "Manager",
      assignedBranches: ["HCM 2"]
    },
    {
      id: "user-staff-hn1",
      name: "Le Chi (HN 1 Staff - Limited View)",
      email: "le.chi@johnsbistro.com",
      role: "Staff",
      assignedBranches: ["HN 1"]
    }
  ];
  const [currentUser, setCurrentUser] = useState<SimulatedUser>(simulatedUsers[0]);

  // Sync with global simulatedUser prop
  useEffect(() => {
    if (simulatedUser) {
      const roleName = simulatedUser.role || 'Staff';
      let mappedRole: 'Admin' | 'Manager' | 'Staff' = 'Staff';
      if (roleName.toLowerCase() === 'owner' || simulatedUser.systemAccessLevel === 'Admin') {
        mappedRole = 'Admin';
      } else if (roleName.toLowerCase() === 'manager') {
        mappedRole = 'Manager';
      }

      // Check custom roles dataScope
      let assignedBranches = simulatedUser.assignedStores || (simulatedUser.branch ? [simulatedUser.branch] : ['HCM 1']);
      try {
        const customRolesStr = localStorage.getItem('gastro_custom_roles');
        if (customRolesStr) {
          const customRoles = JSON.parse(customRolesStr);
          const matched = customRoles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
          if (matched) {
            if (matched.dataScope === 'Brand-wide') {
              assignedBranches = ['HCM 1', 'HCM 2', 'HN 1', 'HQ'];
              mappedRole = 'Admin';
            } else {
              mappedRole = 'Manager';
              assignedBranches = simulatedUser.assignedStores || (simulatedUser.branch ? [simulatedUser.branch] : ['HCM 1']);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }

      setCurrentUser({
        id: simulatedUser.id || 'dynamic',
        name: simulatedUser.name || 'Simulated User',
        email: simulatedUser.email || '',
        role: mappedRole,
        assignedBranches: assignedBranches
      });
    }
  }, [simulatedUser]);

  // Operational Mode: Integrated Mode (with shift rules/leave) vs Standalone Mode (simple log capture)
  const [workMode, setWorkMode] = useState<'Integrated' | 'Standalone'>('Integrated');

  // Dynamic Brand Configuration States loaded from Settings / localStorage
  const [brandAutoBreak, setBrandAutoBreak] = useState(true);
  const [breakThreshold1Min, setBreakThreshold1Min] = useState(30);
  const [breakThreshold1Start, setBreakThreshold1Start] = useState(6.0);
  const [breakThreshold2Min, setBreakThreshold2Min] = useState(45);
  const [breakThreshold2Start, setBreakThreshold2Start] = useState(9.0);
  const [forgetBehavior, setForgetBehavior] = useState<'Snap to Shift' | 'Snap to Actual'>('Snap to Shift');

  // Synchronize Brand Settings
  useEffect(() => {
    setBrandAutoBreak(localStorage.getItem('gastro_auto_break_deduction') !== 'false');
    setBreakThreshold1Min(Number(localStorage.getItem('gastro_break_threshold_1_min') || '30'));
    setBreakThreshold1Start(Number(localStorage.getItem('gastro_break_threshold_1_start') || '6.0'));
    setBreakThreshold2Min(Number(localStorage.getItem('gastro_break_threshold_2_min') || '45'));
    setBreakThreshold2Start(Number(localStorage.getItem('gastro_break_threshold_2_start') || '9.0'));
    setForgetBehavior((localStorage.getItem('gastro_forget_checkin_behavior') as 'Snap to Shift' | 'Snap to Actual') || 'Snap to Shift');
  }, [currentSimulatedDate]);

  // Scheduled Shifts for Today (as configured in Shift Planner)
  const [scheduledShifts] = useState<ScheduledShift[]>([
    {
      employeeId: "emp-1",
      employeeName: "Nguyen An",
      email: "nguyen.an@johnsbistro.com",
      department: "Operation",
      branch: "HCM 1",
      shiftName: "Morning",
      startTime: "09:00",
      endTime: "17:00",
      avatarColor: "bg-blue-100 text-blue-700",
    },
    {
      employeeId: "emp-2",
      employeeName: "Tran Binh",
      email: "tran.binh@johnsbistro.com",
      department: "HR",
      branch: "HQ",
      shiftName: "Morning",
      startTime: "09:00",
      endTime: "17:00",
      avatarColor: "bg-purple-100 text-[#7553FF]",
    },
    {
      employeeId: "emp-3",
      employeeName: "Le Chi",
      email: "le.chi@johnsbistro.com",
      department: "Sales",
      branch: "HN 1",
      shiftName: "Afternoon",
      startTime: "14:00",
      endTime: "22:00",
      avatarColor: "bg-pink-100 text-pink-700",
    },
    {
      employeeId: "emp-4",
      employeeName: "Pham Dung",
      email: "pham.dung@johnsbistro.com",
      department: "Operation",
      branch: "HCM 2",
      shiftName: "Afternoon",
      startTime: "14:00",
      endTime: "22:00",
      avatarColor: "bg-indigo-100 text-indigo-700",
    },
    {
      employeeId: "emp-5",
      employeeName: "Hoang Em",
      email: "hoang.em@johnsbistro.com",
      department: "Kitchen",
      branch: "HCM 1",
      shiftName: "Morning",
      startTime: "09:00",
      endTime: "17:00",
      avatarColor: "bg-amber-100 text-amber-700",
    },
    {
      employeeId: "emp-6",
      employeeName: "Vu Giang",
      email: "vu.giang@johnsbistro.com",
      department: "Bar",
      branch: "HCM 2",
      shiftName: "Afternoon",
      startTime: "14:00",
      endTime: "22:00",
      avatarColor: "bg-emerald-100 text-emerald-700",
    },
    {
      employeeId: "emp-7",
      employeeName: "Doan Minh",
      email: "doan.minh@johnsbistro.com",
      department: "Kitchen",
      branch: "HCM 2",
      shiftName: "Overnight",
      startTime: "19:00",
      endTime: "03:00",
      isOvernight: true,
      avatarColor: "bg-violet-100 text-violet-700",
    },
  ]);

  // Derived available employees list based on branch constraints of the logged-in user
  const availableEmployeesForSim = useMemo(() => {
    return scheduledShifts.filter(s => {
      if (currentUser.role === 'Admin') return true;
      return currentUser.assignedBranches.includes(s.branch);
    });
  }, [scheduledShifts, currentUser]);

  // Synchronize simulated console select on role change
  useEffect(() => {
    if (availableEmployeesForSim.length > 0) {
      const isAvailable = availableEmployeesForSim.some(e => e.employeeId === consoleEmployee);
      if (!isAvailable) {
        setConsoleEmployee(availableEmployeesForSim[0].employeeId);
        setLocationError(null);
        setConsoleTime(availableEmployeesForSim[0].startTime);
      }
    }
  }, [availableEmployeesForSim]);

  // Initial Attendance Logs State (programmed to show yesterday and today's logs)
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>(() => {
    return [
      {
        id: "log-1",
        employeeId: "emp-1",
        name: "Nguyen An",
        email: "nguyen.an@johnsbistro.com",
        department: "Operation",
        shiftName: "Morning",
        shiftTimes: "09:00 AM - 05:00 PM",
        checkInTime: "08:58 AM",
        checkInLoc: "HCM 1",
        checkOutTime: null,
        checkOutLoc: null,
        breakDuration: null,
        workingHours: null,
        status: "On Time",
        location: "HCM 1",
        avatarColor: "bg-blue-100 text-blue-700",
        date: "2026-06-24",
      },
      {
        id: "log-2",
        employeeId: "emp-2",
        name: "Tran Binh",
        email: "tran.binh@johnsbistro.com",
        department: "HR",
        shiftName: "Morning",
        shiftTimes: "09:00 AM - 05:00 PM",
        checkInTime: "09:12 AM",
        checkInLoc: "HQ",
        checkOutTime: null,
        checkOutLoc: null,
        breakDuration: null,
        workingHours: null,
        status: "Late (12m)",
        location: "HQ",
        avatarColor: "bg-purple-100 text-[#7553FF]",
        date: "2026-06-24",
      },
      {
        id: "log-3",
        employeeId: "emp-3",
        name: "Le Chi",
        email: "le.chi@johnsbistro.com",
        department: "Sales",
        shiftName: "Afternoon",
        shiftTimes: "02:00 PM - 10:00 PM",
        checkInTime: "01:55 PM",
        checkInLoc: "HN 1",
        checkOutTime: null,
        checkOutLoc: null,
        breakDuration: null,
        workingHours: null,
        status: "On Time",
        location: "HN 1",
        avatarColor: "bg-pink-100 text-pink-700",
        date: "2026-06-24",
      },
      {
        id: "log-4",
        employeeId: "emp-7",
        name: "Doan Minh",
        email: "doan.minh@johnsbistro.com",
        department: "Kitchen",
        shiftName: "Overnight",
        shiftTimes: "07:00 PM - 03:00 AM",
        checkInTime: "07:00 PM",
        checkInLoc: "HCM 2",
        checkOutTime: "03:00 AM",
        checkOutLoc: "HCM 2",
        breakDuration: null, // Triggers automatic 1.0 hour break deduction
        workingHours: "7h 00m", // (19:00 to 03:00 = 8h) - 1h break = 7h
        status: "Completed",
        location: "HCM 2",
        avatarColor: "bg-violet-100 text-violet-700",
        date: "2026-06-24", // Completed shift on overnight end date (June 24)
      }
    ];
  });

  // Interactive Live Console State
  const [consoleEmployee, setConsoleEmployee] = useState("emp-1");
  const [consoleLocation, setConsoleLocation] = useState("HCM 2"); // Default mismatch to show guardrail
  const [consoleTime, setConsoleTime] = useState("09:00");
  const [consoleBreak, setConsoleBreak] = useState("");
  const [consoleCompensatoryHours, setConsoleCompensatoryHours] = useState("0");
  const [consoleDeviceType, setConsoleDeviceType] = useState<'Web Browser' | 'Mobile App'>('Web Browser');
  const [locationError, setLocationError] = useState<string | null>(null);

  // Administrative Manual Form State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [manualEmployeeId, setManualEmployeeId] = useState("emp-1");
  const [manualDate, setManualDate] = useState("2026-06-24");
  const [manualCheckin, setManualCheckin] = useState("09:00");
  const [manualCheckout, setManualCheckout] = useState("17:00");
  const [manualBranch, setManualBranch] = useState("HCM 1");
  const [manualBreak, setManualBreak] = useState("");
  const [manualReason, setManualReason] = useState("");
  const [manualAttachmentName, setManualAttachmentName] = useState("");
  const [manualCompensatoryHours, setManualCompensatoryHours] = useState("0");

  // Forgotten Shift Resolution States
  const [resolvingAbsentLogId, setResolvingAbsentLogId] = useState<string | null>(null);
  const [resolveCheckinTime, setResolveCheckinTime] = useState("09:00");
  const [resolveCheckoutTime, setResolveCheckoutTime] = useState("17:00");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedFilterDate, setSelectedFilterDate] = useState("2026-06-24");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Tabs state
  const [activeTab, setActiveTab] = useState<'checkin' | 'summary'>('checkin');
  const [selectedDetailEmployeeId, setSelectedDetailEmployeeId] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");

  const staffSummaries = [
    {
      no: 1,
      employeeId: "emp-1",
      name: "Nguyen An",
      role: "Operation Specialist",
      avatarColor: "bg-blue-100 text-blue-700",
      flextime2025: "+12.5 hrs",
      flextime2025Value: 12.5,
      flextime2026: "+4.0 hrs",
      flextime2026Value: 4.0,
      vacationAllowance: 24,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 5,
      remaining2025: 3,
      note: "Exceptional attendance record and consistent on-time performance."
    },
    {
      no: 2,
      employeeId: "emp-2",
      name: "Tran Binh",
      role: "HR Assistant",
      avatarColor: "bg-purple-100 text-[#7553FF]",
      flextime2025: "-2.0 hrs",
      flextime2025Value: -2.0,
      flextime2026: "+1.5 hrs",
      flextime2026Value: 1.5,
      vacationAllowance: 24,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 8,
      remaining2025: 0,
      note: "Slight lateness on morning shifts but offset by extra hours."
    },
    {
      no: 3,
      employeeId: "emp-3",
      name: "Le Chi",
      role: "Sales Associate",
      avatarColor: "bg-pink-100 text-pink-700",
      flextime2025: "+8.0 hrs",
      flextime2025Value: 8.0,
      flextime2026: "-1.0 hrs",
      flextime2026Value: -1.0,
      vacationAllowance: 20,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 3,
      remaining2025: 2,
      note: "Flexible hours, works remotely when needed."
    },
    {
      no: 4,
      employeeId: "emp-4",
      name: "Pham Dung",
      role: "Operations Supervisor",
      avatarColor: "bg-indigo-100 text-indigo-700",
      flextime2025: "+15.0 hrs",
      flextime2025Value: 15.0,
      flextime2026: "+6.5 hrs",
      flextime2026Value: 6.5,
      vacationAllowance: 28,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 12,
      remaining2025: 5,
      note: "Highly reliable, candidates for promotion."
    },
    {
      no: 5,
      employeeId: "emp-5",
      name: "Hoang Em",
      role: "Kitchen Staff",
      avatarColor: "bg-amber-100 text-amber-700",
      flextime2025: "0.0 hrs",
      flextime2025Value: 0.0,
      flextime2026: "+2.0 hrs",
      flextime2026Value: 2.0,
      vacationAllowance: 24,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 2,
      remaining2025: 1,
      note: "Consistently on-time and active in team communications."
    },
    {
      no: 6,
      employeeId: "emp-6",
      name: "Vu Giang",
      role: "Bartender",
      avatarColor: "bg-emerald-100 text-emerald-700",
      flextime2025: "-5.5 hrs",
      flextime2025Value: -5.5,
      flextime2026: "-3.0 hrs",
      flextime2026Value: -3.0,
      vacationAllowance: 24,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 6,
      remaining2025: 0,
      note: "Needs coaching on schedule adherence."
    },
    {
      no: 7,
      employeeId: "emp-7",
      name: "Doan Minh",
      role: "Kitchen Sous-Chef",
      avatarColor: "bg-violet-100 text-violet-700",
      flextime2025: "+20.0 hrs",
      flextime2025Value: 20.0,
      flextime2026: "+10.0 hrs",
      flextime2026Value: 10.0,
      vacationAllowance: 30,
      vacationPeriod: "01.01.2026 - 31.12.2026",
      daysTaken: 15,
      remaining2025: 7,
      note: "Covered multiple overnight shifts in peak season."
    }
  ];

  // Success Feedback Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper: Parse hours & minutes from time strings
  const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    if (timeStr.includes("AM") || timeStr.includes("PM")) {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    } else {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return { hours, minutes };
    }
  };

  // Helper: Format 24h time to standard string
  const formatTimeString = (hours: number, minutes: number): string => {
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Automated state machine calculations
  const calculateShiftStatus = (
    checkinStr: string,
    shiftStartStr: string,
    compHoursVal: number = 0
  ): { status: string; minutesLate: number } => {
    if (workMode === 'Standalone') {
      return { status: "Checked-in", minutesLate: 0 };
    }

    const checkin = parseTime(checkinStr);
    const start = parseTime(shiftStartStr);

    const checkinMinutes = checkin.hours * 60 + checkin.minutes;
    // Add approved compensatory hours to shift start reference
    const compMinutes = Math.round(compHoursVal * 60);
    const startMinutes = start.hours * 60 + start.minutes + compMinutes;

    const diff = checkinMinutes - startMinutes;

    if (diff <= 5) {
      return { status: compHoursVal > 0 ? "On Time (Exempt)" : "On Time", minutesLate: 0 };
    } else {
      return { status: `Late (${diff}m)`, minutesLate: diff };
    }
  };

  // Break Deduction and Net Hours Calculator
  const calculateWorkedHours = (
    checkinStr: string,
    checkoutStr: string,
    breakStr: string | null
  ): { workingHours: string; breakApplied: string; isAuto: boolean } => {
    const checkin = parseTime(checkinStr);
    const checkout = parseTime(checkoutStr);

    let checkinMin = checkin.hours * 60 + checkin.minutes;
    let checkoutMin = checkout.hours * 60 + checkout.minutes;

    // Overnight rule: checkout is next day
    if (checkoutMin < checkinMin) {
      checkoutMin += 24 * 60;
    }

    const grossMin = checkoutMin - checkinMin;
    let breakMin = 0;
    let isAuto = false;

    if (breakStr && breakStr.trim() !== "") {
      if (breakStr.includes("h")) {
        const parts = breakStr.split("h");
        const h = parseInt(parts[0]) || 0;
        const m = parseInt(parts[1]) || 0;
        breakMin = h * 60 + m;
      } else if (breakStr.includes("m")) {
        breakMin = parseInt(breakStr) || 0;
      } else {
        breakMin = parseFloat(breakStr) * 60 || 0;
      }
    } else {
      if (brandAutoBreak) {
        const grossHrs = grossMin / 60;
        if (grossHrs >= breakThreshold2Start) {
          breakMin = breakThreshold2Min;
          isAuto = true;
        } else if (grossHrs >= breakThreshold1Start) {
          breakMin = breakThreshold1Min;
          isAuto = true;
        }
      }
    }

    const netMin = Math.max(0, grossMin - breakMin);
    const netHrs = Math.floor(netMin / 60);
    const netMins = netMin % 60;

    const breakHrs = Math.floor(breakMin / 60);
    const breakMins = breakMin % 60;

    return {
      workingHours: `${netHrs}h ${netMins < 10 ? "0" + netMins : netMins}m`,
      breakApplied: breakMin > 0 ? `${breakHrs}h ${breakMins < 10 ? "0" + breakMins : breakMins}m` : "0h 00m",
      isAuto
    };
  };

  // --- ACTIONS ---

  // PRIMARY CHECK-IN TRIGGER (LOCATION GUARDRAIL & BRANCH ENFORCEMENT)
  const handleClockIn = () => {
    setLocationError(null);

    // Find the target employee
    const sched = scheduledShifts.find((s) => s.employeeId === consoleEmployee);
    if (!sched) {
      showToast("Employee schedule not found.");
      return;
    }

    // Branch Verification Lock (Only in Integrated Mode or if currentUser has branch boundaries)
    if (consoleLocation !== sched.branch) {
      const errMsg = "You are at the wrong branch compared to your assigned shift. Clock-in is not permitted.";
      setLocationError(errMsg);
      showToast(errMsg);
      return;
    }

    // Access control: Check if current logged-in user is allowed to clock-in for this branch
    if (currentUser.role !== 'Admin' && !currentUser.assignedBranches.includes(consoleLocation)) {
      showToast("Access Denied: You do not work at or manage the branch " + consoleLocation);
      return;
    }

    // Check if already checked in today
    const existing = attendanceData.find(
      (a) => a.employeeId === consoleEmployee && a.date === currentSimulatedDate
    );
    if (existing && existing.checkInTime) {
      showToast(`${sched.employeeName} is already checked in today!`);
      return;
    }

    // Run State Machine for Arrival status
    const formattedCheckinTime = formatTimeString(
      parseInt(consoleTime.split(":")[0]),
      parseInt(consoleTime.split(":")[1])
    );
    const { status } = calculateShiftStatus(consoleTime, sched.startTime, Number(consoleCompensatoryHours) || 0);

    const newRecord: AttendanceRecord = {
      id: `log-${Date.now()}`,
      employeeId: consoleEmployee,
      name: sched.employeeName,
      email: sched.email,
      department: sched.department,
      shiftName: sched.shiftName,
      shiftTimes: `${formatTimeString(parseInt(sched.startTime.split(":")[0]), parseInt(sched.startTime.split(":")[1]))} - ${formatTimeString(parseInt(sched.endTime.split(":")[0]), parseInt(sched.endTime.split(":")[1]))}`,
      checkInTime: formattedCheckinTime,
      checkInLoc: consoleLocation,
      checkOutTime: null,
      checkOutLoc: null,
      breakDuration: null,
      workingHours: null,
      status: status,
      location: consoleLocation,
      avatarColor: sched.avatarColor,
      date: currentSimulatedDate,
      compensatoryHours: Number(consoleCompensatoryHours) || undefined,
      deviceType: consoleDeviceType
    };

    setAttendanceData((prev) => [newRecord, ...prev]);
    showToast(`Check-In successful for ${sched.employeeName} as "${status}"!`);
  };

  // PRIMARY CHECK-OUT TRIGGER (BREAK DEDUCTION & OVERNIGHT DAY ROLL)
  const handleClockOut = (recordId: string, checkoutTime24h: string = "17:00", checkoutCompHrs: number = 0) => {
    setAttendanceData((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;

        const sched = scheduledShifts.find((s) => s.employeeId === rec.employeeId);
        const outHours = parseInt(checkoutTime24h.split(":")[0]);
        const outMins = parseInt(checkoutTime24h.split(":")[1]);
        const formattedCheckoutTime = formatTimeString(outHours, outMins);

        // Compute working hours (applying Break Deduction Engine rules)
        const calcObj = calculateWorkedHours(
          rec.checkInTime!,
          formattedCheckoutTime,
          consoleBreak !== "" ? consoleBreak : null
        );

        // Determine target log date based on Overnight Shift Day-Roll Rule
        // If shift crosses midnight, bind work records to the END date
        let targetDate = rec.date;
        if (sched?.isOvernight) {
          const d = new Date(rec.date);
          d.setDate(d.getDate() + 1);
          targetDate = d.toISOString().split("T")[0];
        }

        // Early Check-out with Compensatory Leave support
        let finalStatus = "Completed";
        if (workMode === 'Integrated') {
          const schedEnd = parseTime(sched?.endTime || "17:00");
          const outMin = outHours * 60 + outMins;
          const endMin = schedEnd.hours * 60 + schedEnd.minutes;
          
          const compMin = Math.round(checkoutCompHrs * 60);
          const isEarlyExempt = outMin >= (endMin - compMin);

          if (outMin < endMin) {
            if (isEarlyExempt && checkoutCompHrs > 0) {
              finalStatus = "Completed (Exempt)";
            } else {
              const diffMin = endMin - outMin;
              finalStatus = `Completed (Early ${diffMin}m)`;
            }
          }
        }

        showToast(`Check-Out processed for ${rec.name}. Net Hours: ${calcObj.workingHours}`);

        return {
          ...rec,
          checkOutTime: formattedCheckoutTime,
          checkOutLoc: rec.checkInLoc,
          breakDuration: consoleBreak !== "" ? `${consoleBreak}h` : (calcObj.isAuto ? `${calcObj.breakApplied}` : null),
          workingHours: calcObj.workingHours,
          status: finalStatus,
          date: targetDate, // Overnight day roll rule
          compensatoryHours: checkoutCompHrs > 0 ? checkoutCompHrs : rec.compensatoryHours
        };
      })
    );
  };

  // REACTIVE BACKGROUND ABSENT STATE ENGINE TRIGGER
  const triggerAbsentCheck = () => {
    if (workMode === 'Standalone') {
      showToast("Check-In simulator is currently in Standalone Mode. Absent auto-checks are disabled.");
      return;
    }

    let triggeredCount = 0;
    const updated = [...attendanceData];

    // Find any employee scheduled for today who does NOT have a checkin
    scheduledShifts.forEach((sched) => {
      const hasRecord = attendanceData.some(
        (rec) => rec.employeeId === sched.employeeId && rec.date === currentSimulatedDate
      );

      if (!hasRecord) {
        // Automatically inject Absent record
        updated.unshift({
          id: `abs-${Date.now()}-${sched.employeeId}`,
          employeeId: sched.employeeId,
          name: sched.employeeName,
          email: sched.email,
          department: sched.department,
          shiftName: sched.shiftName,
          shiftTimes: `${formatTimeString(parseInt(sched.startTime.split(":")[0]), parseInt(sched.startTime.split(":")[1]))} - ${formatTimeString(parseInt(sched.endTime.split(":")[0]), parseInt(sched.endTime.split(":")[1]))}`,
          checkInTime: null,
          checkInLoc: null,
          checkOutTime: null,
          checkOutLoc: null,
          breakDuration: null,
          workingHours: null,
          status: "Absent",
          location: sched.branch,
          avatarColor: sched.avatarColor,
          date: currentSimulatedDate,
        });
        triggeredCount++;
      }
    });

    if (triggeredCount > 0) {
      setAttendanceData(updated);
      showToast(`Auto-Absent check completed. ${triggeredCount} staff marked as Absent.`);
    } else {
      showToast("All scheduled staff have checked in or already been accounted for today.");
    }
  };

  // RESOLVING FORGOTTEN (ABSENT) SHIFT
  const handleResolveAbsent = (logId: string, checkInTimeStr?: string, checkOutTimeStr?: string) => {
    setAttendanceData((prev) =>
      prev.map((rec) => {
        if (rec.id !== logId) return rec;

        const sched = scheduledShifts.find((s) => s.employeeId === rec.employeeId);
        
        let inTime = checkInTimeStr || "09:00";
        let outTime = checkOutTimeStr || "17:00";

        if (forgetBehavior === 'Snap to Shift' && sched) {
          inTime = sched.startTime;
          outTime = sched.endTime;
        }

        const formattedIn = formatTimeString(parseInt(inTime.split(":")[0]), parseInt(inTime.split(":")[1]));
        const formattedOut = formatTimeString(parseInt(outTime.split(":")[0]), parseInt(outTime.split(":")[1]));

        const calcObj = calculateWorkedHours(
          formattedIn,
          formattedOut,
          null
        );

        showToast(`Resolved forgotten shift for ${rec.name} using ${forgetBehavior} policy!`);

        return {
          ...rec,
          checkInTime: formattedIn,
          checkOutTime: formattedOut,
          checkInLoc: rec.location,
          checkOutLoc: rec.location,
          workingHours: calcObj.workingHours,
          breakDuration: calcObj.isAuto ? `${calcObj.breakApplied}` : null,
          status: "Completed",
          reasonNote: `Xử lý quên chấm công (${forgetBehavior})`
        };
      })
    );
    setResolvingAbsentLogId(null);
  };

  // Helper to convert time back to 24h format for input[type=time]
  const convertTo24h = (timeStr?: string | null) => {
    if (!timeStr) return "09:00";
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      let hrs = parseInt(match[1]);
      const mins = match[2];
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && hrs < 12) hrs += 12;
      if (ampm === "AM" && hrs === 12) hrs = 0;
      return `${String(hrs).padStart(2, '0')}:${mins}`;
    }
    return timeStr;
  };

  const handleEditClick = (record: AttendanceRecord) => {
    setEditingRecordId(record.id);
    setManualEmployeeId(record.employeeId);
    setManualDate(record.date);
    setManualBranch(record.location);
    setManualCompensatoryHours(String(record.compensatoryHours || 0));
    setManualCheckin(convertTo24h(record.checkInTime));
    setManualCheckout(convertTo24h(record.checkOutTime));
    setManualBreak(record.breakDuration ? record.breakDuration.replace('h', '').trim() : "");
    setManualReason(record.reasonNote || "");
    setManualAttachmentName(record.documentProof || "");
    setIsManualModalOpen(true);
  };

  // ADMINISTRATIVE MANUAL OVERRIDE SUBMISSION
  const handleManualOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const employee = scheduledShifts.find((s) => s.employeeId === manualEmployeeId);
    if (!employee) return;

    // Check Access Permission:
    // Only permit manual check-in for the current user's assigned branches
    if (currentUser.role !== 'Admin' && !currentUser.assignedBranches.includes(manualBranch)) {
      showToast("Proxy Clock-in restricted: You are only allowed to perform proxy clock-ins for your assigned branches (" + currentUser.assignedBranches.join(", ") + ").");
      return;
    }

    // Format times
    const formattedIn = formatTimeString(
      parseInt(manualCheckin.split(":")[0]),
      parseInt(manualCheckin.split(":")[1])
    );
    const formattedOut = formatTimeString(
      parseInt(manualCheckout.split(":")[0]),
      parseInt(manualCheckout.split(":")[1])
    );

    // Calculate worked hours applying Break Deduction Rules
    const calcObj = calculateWorkedHours(
      formattedIn,
      formattedOut,
      manualBreak !== "" ? manualBreak : null
    );

    if (editingRecordId) {
      setAttendanceData((prev) =>
        prev.map((r) => {
          if (r.id === editingRecordId) {
            return {
              ...r,
              employeeId: manualEmployeeId,
              name: employee.employeeName,
              email: employee.email,
              department: employee.department,
              shiftName: employee.shiftName,
              shiftTimes: `${formatTimeString(parseInt(employee.startTime.split(":")[0]), parseInt(employee.startTime.split(":")[1]))} - ${formatTimeString(parseInt(employee.endTime.split(":")[0]), parseInt(employee.endTime.split(":")[1]))}`,
              checkInTime: formattedIn,
              checkInLoc: manualBranch,
              checkOutTime: formattedOut,
              checkOutLoc: manualBranch,
              breakDuration: manualBreak !== "" ? `${manualBreak}h` : (calcObj.isAuto ? `${calcObj.breakApplied}` : null),
              workingHours: calcObj.workingHours,
              status: "Completed",
              location: manualBranch,
              avatarColor: employee.avatarColor,
              date: manualDate,
              reasonNote: manualReason,
              compensatoryHours: Number(manualCompensatoryHours) || undefined,
              documentProof: manualAttachmentName || r.documentProof || "Proof_Attached.pdf",
            };
          }
          return r;
        })
      );
      setIsManualModalOpen(false);
      setEditingRecordId(null);
      showToast("Attendance record updated successfully!");
    } else {
      const newRecord: AttendanceRecord = {
        id: `manual-${Date.now()}`,
        employeeId: manualEmployeeId,
        name: employee.employeeName,
        email: employee.email,
        department: employee.department,
        shiftName: employee.shiftName,
        shiftTimes: `${formatTimeString(parseInt(employee.startTime.split(":")[0]), parseInt(employee.startTime.split(":")[1]))} - ${formatTimeString(parseInt(employee.endTime.split(":")[0]), parseInt(employee.endTime.split(":")[1]))}`,
        checkInTime: formattedIn,
        checkInLoc: manualBranch,
        checkOutTime: formattedOut,
        checkOutLoc: manualBranch,
        breakDuration: manualBreak !== "" ? `${manualBreak}h` : (calcObj.isAuto ? `${calcObj.breakApplied}` : null),
        workingHours: calcObj.workingHours,
        status: "Completed",
        location: manualBranch,
        avatarColor: employee.avatarColor,
        date: manualDate,
        reasonNote: manualReason,
        compensatoryHours: Number(manualCompensatoryHours) || undefined,
        documentProof: manualAttachmentName || "Proof_Attached.pdf",
      };

      setAttendanceData((prev) => [newRecord, ...prev]);
      setIsManualModalOpen(false);
      showToast(`Retroactive attendance recorded successfully for ${employee.employeeName}.`);
    }

    // Reset Form
    setManualReason("");
    setManualBreak("");
    setManualAttachmentName("");
    setManualCompensatoryHours("0");
  };

  // --- STATS COMPUTATION ---
  const stats = useMemo(() => {
    // Filter by branch permission first
    const logs = attendanceData.filter((d) => {
      const isDate = d.date === currentSimulatedDate;
      if (!isDate) return false;
      if (currentUser.role !== 'Admin' && !currentUser.assignedBranches.includes(d.location)) {
        return false;
      }
      return true;
    });

    const activeShifts = scheduledShifts.filter(s => {
      if (currentUser.role !== 'Admin' && !currentUser.assignedBranches.includes(s.branch)) {
        return false;
      }
      return true;
    });

    const totalExpected = activeShifts.length;
    const completed = logs.filter((d) => d.status.startsWith("Completed")).length;
    const late = logs.filter((d) => d.status.startsWith("Late")).length;
    const absent = logs.filter((d) => d.status === "Absent").length;
    const active = logs.filter((d) => d.checkInTime && !d.checkOutTime).length;

    return { totalExpected, completed, late, absent, active };
  }, [attendanceData, currentSimulatedDate, scheduledShifts, currentUser]);

  // --- FILTER & SEARCH ---
  const filteredRecords = useMemo(() => {
    return attendanceData.filter((item) => {
      // Date filter
      if (item.date !== selectedFilterDate) return false;

      // Access Control: Limit views by branch
      if (currentUser.role !== 'Admin' && !currentUser.assignedBranches.includes(item.location)) {
        return false;
      }

      // Restrict regular staff simulation profiles to personal check-in/out logs only
      if (currentUser.role === 'Staff') {
        const cleanName = currentUser.name.split(" (")[0].toLowerCase();
        if (!item.name.toLowerCase().includes(cleanName)) {
          return false;
        }
      }

      // Search match
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.email.toLowerCase().includes(searchLower) ||
        item.department.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Branch/Location filter
      if (selectedBranch !== "All" && item.location !== selectedBranch) return false;

      // Department filter
      if (selectedDept !== "All" && item.department !== selectedDept) return false;

      // Status filter
      if (selectedStatus !== "All") {
        if (selectedStatus === "Late" && !item.status.startsWith("Late")) return false;
        if (selectedStatus !== "Late" && item.status !== selectedStatus) return false;
      }

      return true;
    });
  }, [attendanceData, searchQuery, selectedBranch, selectedDept, selectedStatus, selectedFilterDate, currentUser]);

  // Pagination slice
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-slate-800 p-6 space-y-6 font-sans">
      
      {/* Toast Alert Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#7553FF] text-white px-5 py-3 border border-slate-100 flex items-center gap-3 shadow-md rounded-lg"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Header with Flat Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <h1 className="text-[24px] font-medium text-slate-900 tracking-tight">
            Attendance & Time Tracking
          </h1>
          <p className="text-[14px] text-slate-600">
            Adhering strictly to PRD-003 branch lock rules, grace periods, and break deduction standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentSimulatedDate(currentSimulatedDate === "2026-06-24" ? "2026-06-25" : "2026-06-24");
              setSelectedFilterDate(currentSimulatedDate === "2026-06-24" ? "2026-06-25" : "2026-06-24");
              showToast(`Simulated date shifted to ${currentSimulatedDate === "2026-06-24" ? "June 25" : "June 24"}`);
            }}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-sm font-medium transition-all shadow-3xs rounded-lg cursor-pointer"
          >
            Switch System Day: {currentSimulatedDate}
          </button>

          <button
            onClick={() => {
              if (currentUser.role === "Staff") {
                alert("Security Restriction: Regular staff members are strictly forbidden from executing manual administrative overrides on colleagues.");
                return;
              }
              setIsManualModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-medium transition-all shadow-xs rounded-lg border-none cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Manual Admin Override</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-start pt-1">
        <div className="bg-[#EBECEE] p-1 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-8 py-2 text-[14px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'checkin'
                ? 'bg-white text-[#7553FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Checkin
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-8 py-2 text-[14px] font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'summary'
                ? 'bg-white text-[#7553FF] shadow-xs'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Summary
          </button>
        </div>
      </div>



      {activeTab === 'checkin' && (
        <>
          {/* METRIC BOXES - STYLED EXACTLY TO MATCH STAFF & ROLES STATS */}
      {currentUser.role !== 'Staff' && (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 mb-6">
        
        {/* Card 1: Active at Work */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
          <div className="p-3.5 bg-[#EEF2FF] rounded-[14px] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#7553FF]" />
          </div>
          <div className="space-y-0.5 leading-none">
            <span className="text-[14px] font-medium text-slate-700 block mb-1">Active at Work</span>
            <span className="text-3xl font-medium text-slate-800 block">{stats.active}</span>
            <span className="text-[14px] text-slate-700 block pt-1">On duty right now</span>
          </div>
        </div>

        {/* Card 2: Scheduled Today */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
          <div className="p-3.5 bg-blue-50 rounded-[14px] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-0.5 leading-none">
            <span className="text-[14px] font-medium text-slate-700 block mb-1">Scheduled Today</span>
            <span className="text-3xl font-medium text-slate-800 block">{stats.totalExpected}</span>
            <span className="text-[14px] text-slate-700 block pt-1">Active planner roster</span>
          </div>
        </div>

        {/* Card 3: Completed Shifts */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
          <div className="p-3.5 bg-emerald-50 rounded-[14px] flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-0.5 leading-none">
            <span className="text-[14px] font-medium text-slate-700 block mb-1">Completed Shifts</span>
            <span className="text-3xl font-medium text-emerald-700 block">{stats.completed}</span>
            <span className="text-[14px] text-slate-700 block pt-1">Safely checked out</span>
          </div>
        </div>

        {/* Card 4: Late Arrivals */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
          <div className="p-3.5 bg-amber-50 rounded-[14px] flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-0.5 leading-none">
            <span className="text-[14px] font-medium text-slate-700 block mb-1">Late Arrivals</span>
            <span className="text-3xl font-medium text-amber-700 block">{stats.late}</span>
            <span className="text-[14px] text-slate-700 block pt-1">Past grace period</span>
          </div>
        </div>

        {/* Card 5: Absences */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-3xs text-left">
          <div className="p-3.5 bg-rose-50 rounded-[14px] flex items-center justify-center">
            <Users className="w-5 h-5 text-rose-500" />
          </div>
          <div className="space-y-0.5 leading-none">
            <span className="text-[14px] font-medium text-slate-700 block mb-1">Absences</span>
            <span className="text-3xl font-medium text-rose-700 block">{stats.absent}</span>
            <span className="text-[14px] text-slate-700 block pt-1">No check-in recorded</span>
          </div>
        </div>

      </div>
      )}

      {/* FILTER BAR - STYLED EXACTLY AS STAFF & ROLES FOR HIGH VISUAL CONSISTENCY */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative w-full lg:max-w-md text-left">
          <div className="absolute inset-y-0 left-3 pl-1 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search staff, email, dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 rounded-xl text-[14px] text-slate-700 font-normal transition-all outline-none shadow-3xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Cohesive Dropdown Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Date Selector */}
          <div className="w-48" id="attendance-datepicker-filter">
            <DatePicker
              value={selectedFilterDate}
              onChange={(date) => {
                if (date) setSelectedFilterDate(date);
              }}
              placeholder="Select filter date"
            />
          </div>

          {/* Branch Selector */}
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
            <span className="text-slate-500 font-medium">Branch:</span>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-transparent text-slate-800 font-medium cursor-pointer focus:outline-none border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
            >
              <option value="All">All Branches</option>
              <option value="HCM 1">HCM 1</option>
              <option value="HCM 2">HCM 2</option>
              <option value="HN 1">HN 1</option>
              <option value="HQ">HQ</option>
            </select>
          </div>

          {/* Department Selector */}
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
            <span className="text-slate-500 font-medium">Job Role:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-slate-800 font-medium cursor-pointer focus:outline-none border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
            >
              <option value="All">All Job Roles</option>
              <option value="Operation">Operation</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bar">Bar</option>
            </select>
          </div>

          {/* Status Selector */}
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-slate-800 font-medium cursor-pointer focus:outline-none border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
            >
              <option value="All">All Statuses</option>
              <option value="On Time">On Time</option>
              <option value="Late">Late Arrivals</option>
              <option value="Absent">Absences</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>
      </div>

      {/* ATTENDANCE DATA TABLE - STYLED EXACTLY TO MATCH STAFF & ROLES LISTS */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse bg-white text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Staff Member</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Checkin</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Checkout</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Break</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-[14px] text-slate-700 font-sans">
                    No attendance logs found for simulated date {selectedFilterDate} matching active filters.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/20 transition-colors">
                    
                    {/* Employee Profile */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${item.avatarColor} flex items-center justify-center font-medium text-[14px] shrink-0 select-none`}>
                          {item.name.charAt(0)}
                        </div>
                        <div className="text-left leading-snug">
                          <div className="text-[14px] font-medium text-slate-800 font-sans">{item.name}</div>
                          <div className="text-[14px] text-slate-700 font-sans">{item.email}</div>
                          <div className="text-[14px] text-slate-700 font-sans mt-0.5">
                            {item.department} • {item.shiftName} Shift ({item.location})
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Checkin Column */}
                    <td className="px-5 py-4 text-left">
                      <div className="text-[14px] space-y-1 font-sans">
                        {item.checkInTime ? (
                          <>
                            <div className="font-semibold text-slate-800 font-mono flex items-center gap-1.5">
                              {item.checkInTime}
                              {item.deviceType && (
                                <span className="inline-flex items-center text-[12px] px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 font-sans">
                                  {item.deviceType === "Mobile App" ? "📱 Mobile" : "💻 Web"}
                                </span>
                              )}
                            </div>
                            <div className="text-slate-700 text-[14px] flex items-center gap-1">
                              <MapPin className="w-[14px] h-[14px] text-slate-700" />
                              {item.checkInLoc || item.location}
                            </div>
                            <div className="pt-0.5">
                              {(() => {
                                let badgeClass = "bg-slate-50 text-slate-700 border border-slate-200";
                                if (item.status === "On Time" || item.status === "Completed") {
                                  badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-100";
                                } else if (item.status.startsWith("Late")) {
                                  badgeClass = "bg-amber-50 text-amber-700 border border-amber-100";
                                } else if (item.status === "Absent") {
                                  badgeClass = "bg-rose-50 text-rose-700 border border-rose-100";
                                }
                                return (
                                  <span className={`inline-flex items-center px-2 py-0.5 text-[14px] font-sans font-semibold rounded-[2px] select-none tracking-wide ${badgeClass}`}>
                                    {item.status}
                                  </span>
                                );
                              })()}
                            </div>
                          </>
                        ) : item.status === "Absent" ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[14px] font-sans font-semibold rounded-[2px] bg-rose-50 text-rose-700 border border-rose-100 tracking-wide">
                            Absent
                          </span>
                        ) : (
                          <span className="text-slate-700 italic font-normal">Not started</span>
                        )}
                      </div>
                    </td>

                    {/* Checkout Column */}
                    <td className="px-5 py-4 text-left">
                      <div className="text-[14px] space-y-1 font-sans">
                        {item.checkOutTime ? (
                          <>
                            <div className="font-semibold text-slate-800 font-mono">
                              {item.checkOutTime}
                            </div>
                            {item.checkOutLoc && (
                              <div className="text-slate-700 text-[14px] flex items-center gap-1">
                                <MapPin className="w-[14px] h-[14px] text-slate-700" />
                                {item.checkOutLoc}
                              </div>
                            )}
                            {item.workingHours && (
                              <div className="text-slate-750 text-[14px] font-mono mt-0.5">
                                Total Worked: {item.workingHours}
                              </div>
                            )}
                          </>
                        ) : item.checkInTime ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[14px] font-sans font-semibold rounded-[2px] bg-amber-50 text-amber-700 border border-amber-100 tracking-wide">
                            Active Shift
                          </span>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )}
                      </div>
                    </td>

                    {/* Break Duration */}
                    <td className="px-5 py-4 text-left text-[14px] font-sans">
                      {item.checkInTime && item.checkOutTime ? (
                        item.breakDuration ? (
                          <div className="space-y-1">
                            <span className="text-slate-800 font-medium font-mono block">{item.breakDuration}</span>
                            {!item.breakDuration.includes("(Manual)") && item.breakDuration !== "0h 00m" && (
                              <span className="inline-flex items-center text-[14px] text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[2px]">
                                Auto-Deducted
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )
                      ) : (
                        <span className="text-slate-700">—</span>
                      )}
                    </td>

                    {/* Actions: Check-out retroactive, resolve, or edit */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex flex-col items-end gap-2">
                        {/* Always show Edit button if current user is not a regular Staff */}
                        {currentUser.role !== 'Staff' && (
                          <button
                            onClick={() => handleEditClick(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-[14px] font-medium transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 text-slate-700" />
                            <span>Edit</span>
                          </button>
                        )}

                        {item.status === "Absent" ? (
                          <div className="flex flex-col items-end gap-2 mt-1">
                            {resolvingAbsentLogId === item.id ? (
                              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-2 text-left max-w-xs shadow-sm">
                                <div className="text-[14px] text-slate-700 font-medium tracking-wider">
                                  Policy: <strong className="text-[#7553FF]">{forgetBehavior}</strong>
                                </div>
                                {forgetBehavior === "Snap to Shift" ? (
                                  <p className="text-[14px] text-slate-700 leading-snug">
                                    Prefills planned hours: <strong className="text-slate-800">{scheduledShifts.find(s => s.employeeId === item.employeeId)?.startTime} - {scheduledShifts.find(s => s.employeeId === item.employeeId)?.endTime}</strong>
                                  </p>
                                ) : (
                                  <div className="space-y-1">
                                    <span className="text-[14px] text-slate-700 block">Enter actual times:</span>
                                    <div className="flex gap-1.5">
                                      <input
                                        type="time"
                                        value={resolveCheckinTime}
                                        onChange={(e) => setResolveCheckinTime(e.target.value)}
                                        className="border border-slate-200 bg-white p-1.5 rounded font-mono text-[14px] w-24 outline-none focus:border-[#7553FF]"
                                      />
                                      <input
                                        type="time"
                                        value={resolveCheckoutTime}
                                        onChange={(e) => setResolveCheckoutTime(e.target.value)}
                                        className="border border-slate-200 bg-white p-1.5 rounded font-mono text-[14px] w-24 outline-none focus:border-[#7553FF]"
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className="flex gap-1.5 pt-1 justify-end">
                                  <button
                                    onClick={() => handleResolveAbsent(item.id, resolveCheckinTime, resolveCheckoutTime)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] px-3 py-1.5 rounded font-semibold cursor-pointer border-none"
                                  >
                                    Apply
                                  </button>
                                  <button
                                    onClick={() => setResolvingAbsentLogId(null)}
                                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[14px] px-3 py-1.5 rounded font-semibold cursor-pointer border-none"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setResolvingAbsentLogId(item.id);
                                  const sched = scheduledShifts.find(s => s.employeeId === item.employeeId);
                                  if (sched) {
                                    setResolveCheckinTime(sched.startTime);
                                    setResolveCheckoutTime(sched.endTime);
                                  }
                                }}
                                className="bg-amber-600 hover:bg-amber-700 text-white text-[14px] font-semibold py-1.5 px-3 rounded-lg transition-colors cursor-pointer border-none"
                              >
                                Resolve Absent Shift
                              </button>
                            )}
                          </div>
                        ) : item.checkInTime && !item.checkOutTime ? (
                          <div className="flex flex-col items-end gap-1.5 mt-1 border border-slate-100 p-2.5 rounded-lg bg-slate-50/50">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[14px] text-slate-700 font-medium">Comp. Hours:</span>
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max="4"
                                defaultValue="0"
                                id={`comp-out-${item.id}`}
                                className="w-12 h-8 border border-slate-200 text-center text-[14px] font-sans rounded outline-none text-slate-800"
                                title="Compensatory hours for early checkout"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="time"
                                defaultValue="17:00"
                                id={`out-time-${item.id}`}
                                className="w-24 h-8 border border-slate-200 text-[14px] px-2 font-mono rounded-lg focus:border-[#7553FF] outline-none text-slate-800"
                              />
                              <button
                                onClick={() => {
                                  const inputEl = document.getElementById(`out-time-${item.id}`) as HTMLInputElement;
                                  const compEl = document.getElementById(`comp-out-${item.id}`) as HTMLInputElement;
                                  handleClockOut(item.id, inputEl?.value || "17:00", Number(compEl?.value) || 0);
                                }}
                                className="bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-medium py-1.5 px-3 rounded-lg transition-colors shadow-none border-none cursor-pointer"
                              >
                                Check Out
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[14px] text-slate-700 space-y-0.5 text-right flex flex-col items-end mt-1">
                            {item.reasonNote && (
                              <span className="block text-[14px] text-slate-700 italic truncate max-w-[180px]" title={item.reasonNote}>
                                "{item.reasonNote}"
                              </span>
                            )}
                            {item.documentProof && (
                              <span className="inline-flex items-center gap-1 text-[14px] text-slate-700 font-medium">
                                <FileText className="w-[14px] h-[14px] text-slate-700" />
                                {item.documentProof}
                              </span>
                            )}
                            {item.compensatoryHours && Number(item.compensatoryHours) > 0 && (
                              <span className="inline-flex items-center text-[14px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-[2px] font-semibold">
                                Compensated: {item.compensatoryHours}h
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL - STYLED TO MATCH STAFF & ROLES */}
        <div className="bg-slate-50/50 border-t border-slate-100 p-4 flex items-center justify-between">
          <span className="text-[14px] text-slate-700 font-normal">
            Showing Page <strong className="text-slate-700 font-medium">{currentPage}</strong> of <strong className="text-slate-700 font-medium">{totalPages}</strong> ({filteredRecords.length} records found)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 h-8 border border-slate-200 bg-white text-[14px] font-medium text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 h-8 border border-slate-200 bg-white text-[14px] font-medium text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      </>
      )}

      {activeTab === 'summary' && (
        <div className="space-y-6 text-left">
          {/* SUMMARY TAB HEADER CARD */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs">
            <h2 className="text-[14px] font-bold text-slate-800 tracking-wider uppercase mb-1 font-serif">
              Staff Attendance & Vacation Summary
            </h2>
            <p className="text-[14px] text-slate-700 leading-relaxed">
              Click on any staff member row to view their detailed daily check-in logs for the entire year 2026. Review Flextime account balances, vacation entitlements, and overall notes.
            </p>
          </div>

          {/* SUMMARY TAB LISTING TABLE */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-3xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse bg-white text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">No.</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Name</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Flextime Account 2025</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Flextime Account 2026</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Vacation Allowance 2026</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Vacation Period</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Days Taken</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Remaining Vacation 2025</th>
                    <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-left">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staffSummaries.map((item, index) => (
                    <tr
                      key={item.employeeId}
                      onClick={() => setSelectedDetailEmployeeId(item.employeeId)}
                      className="hover:bg-[#7553FF]/5 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans">
                        {item.no}
                      </td>
                      <td className="px-5 py-4 text-left">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] ${item.avatarColor}`}>
                            {item.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div className="text-left leading-snug">
                            <div className="text-[14px] font-semibold text-slate-900 group-hover:text-[#7553FF] font-sans transition-colors">{item.name}</div>
                            <div className="text-[14px] text-slate-700 font-sans">{item.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[14px] font-medium font-mono">
                        <span className={item.flextime2025Value > 0 ? "text-emerald-700 font-semibold" : item.flextime2025Value < 0 ? "text-rose-600 font-semibold" : "text-slate-600"}>
                          {item.flextime2025}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[14px] font-medium font-mono">
                        <span className={item.flextime2026Value > 0 ? "text-emerald-700 font-semibold" : item.flextime2026Value < 0 ? "text-rose-600 font-semibold" : "text-slate-600"}>
                          {item.flextime2026}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans font-medium">
                        {item.vacationAllowance} days
                      </td>
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans font-medium">
                        {item.vacationPeriod}
                      </td>
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans font-medium">
                        {item.daysTaken} days
                      </td>
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans font-medium">
                        {item.remaining2025} days
                      </td>
                      <td className="px-5 py-4 text-[14px] text-slate-700 font-sans italic max-w-xs truncate" title={item.note}>
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CORE MODULE E: ADMINISTRATIVE MANUAL OVERRIDE DIALOG / FORM (MODAL) */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/40 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 max-w-3xl w-full p-6 text-left space-y-4 shadow-xl rounded-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[18px] font-medium text-slate-800">
                  {editingRecordId ? "Edit Attendance Record" : "Retroactive Manual Check-In Override"}
                </span>
                <button
                  onClick={() => {
                    setIsManualModalOpen(false);
                    setEditingRecordId(null);
                  }}
                  className="text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleManualOverrideSubmit} className="space-y-4 text-[14px]">
                
                {/* Employee Selector */}
                <div className="space-y-1">
                  <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Target Employee (Filtered by Branch Access)</label>
                  <select
                    value={manualEmployeeId}
                    onChange={(e) => setManualEmployeeId(e.target.value)}
                    className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
                  >
                    {availableEmployeesForSim.map((s) => (
                      <option key={s.employeeId} value={s.employeeId}>
                        {s.employeeName} ({s.department} - Expected Branch: {s.branch})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Date Selector */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Shift Date</label>
                    <DatePicker
                      value={manualDate}
                      onChange={(date) => {
                        if (date) setManualDate(date);
                      }}
                    />
                  </div>

                  {/* Branch Selector */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Branch Selector</label>
                    <select
                      value={manualBranch}
                      onChange={(e) => setManualBranch(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
                    >
                      {currentUser.role === 'Admin' ? (
                        <>
                          <option value="HCM 1">HCM 1</option>
                          <option value="HCM 2">HCM 2</option>
                          <option value="HN 1">HN 1</option>
                          <option value="HQ">HQ</option>
                        </>
                      ) : (
                        currentUser.assignedBranches.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Compensatory Leave Exemption */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Compensatory Hours</label>
                    <select
                      value={manualCompensatoryHours}
                      onChange={(e) => setManualCompensatoryHours(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3 text-[14px] focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
                    >
                      <option value="0">0 (Standard grace)</option>
                      <option value="0.5">0.5h (Late +30m free)</option>
                      <option value="1.0">1.0h (Late +60m free)</option>
                      <option value="1.5">1.5h (Late +90m free)</option>
                      <option value="2.0">2.0h (Late +120m free)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Check-In Time */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Retroactive Check-In</label>
                    <input
                      type="time"
                      value={manualCheckin}
                      onChange={(e) => setManualCheckin(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium font-mono"
                      required
                    />
                  </div>

                  {/* Check-Out Time */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Retroactive Check-Out</label>
                    <input
                      type="time"
                      value={manualCheckout}
                      onChange={(e) => setManualCheckout(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Break duration */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Break Duration Override (Hours)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 1.0 (empty for auto-deduct)"
                      value={manualBreak}
                      onChange={(e) => setManualBreak(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
                    />
                  </div>

                  {/* Proof placeholder */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Document Proof Attachment</label>
                    <input
                      type="text"
                      placeholder="e.g., Medical_Note_An.pdf"
                      value={manualAttachmentName}
                      onChange={(e) => setManualAttachmentName(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800"
                    />
                  </div>
                </div>

                {/* Mandatory Reason Note (bg-white as requested) */}
                <div className="space-y-1">
                  <label className="text-[14px] font-medium text-amber-700 block tracking-wider">Reason Note * (Mandatory)</label>
                  <textarea
                    rows={3}
                    placeholder="Provide detailed explanation for manual override..."
                    value={manualReason}
                    onChange={(e) => setManualReason(e.target.value)}
                    className="w-full border border-slate-200 bg-white p-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-normal"
                    required
                  />
                </div>

                 {/* Form Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualModalOpen(false);
                      setEditingRecordId(null);
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-[14px] font-medium rounded-lg cursor-pointer text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-medium rounded-lg border-none cursor-pointer"
                  >
                    {editingRecordId ? "Save Changes" : "Save & Record Logs"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detailed Employee Dialog (Modal) */}
      <AnimatePresence>
        {selectedDetailEmployeeId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#EAE4DC] max-w-5xl w-full h-[700px] max-h-[90vh] flex flex-col p-6 text-left shadow-2xl rounded-lg relative overflow-hidden"
            >
              {/* Header */}
              {(() => {
                const emp = staffSummaries.find(s => s.employeeId === selectedDetailEmployeeId);
                if (!emp) return null;

                const historicalLogs = getHistoricalLogsForEmployee(emp.employeeId);
                const totalShifts = historicalLogs.length;
                const lateArrivals = historicalLogs.filter(l => l.status.toUpperCase().startsWith("LATE")).length;
                const onTimeCompleted = totalShifts - lateArrivals;

                const actualLogs = attendanceData.filter(d => d.employeeId === selectedDetailEmployeeId);
                const actualLogsFormatted = actualLogs.map(l => {
                  const dateObj = new Date(l.date);
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const formattedDate = !isNaN(dateObj.getTime())
                    ? `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
                    : l.date;
                    
                  return {
                    date: formattedDate,
                    shiftName: `${l.shiftName} (${l.shiftTimes})`,
                    checkin: l.checkInTime || "Absent",
                    checkout: l.checkOutTime || "—",
                    breakTime: l.breakDuration || "1h 00m",
                    workHours: l.workingHours || "—",
                    status: l.status.toUpperCase()
                  };
                });

                const combinedLogs = [...actualLogsFormatted, ...historicalLogs];
                const filteredLogs = selectedMonth === "All"
                  ? combinedLogs
                  : combinedLogs.filter(l => l.date.startsWith(selectedMonth));

                return (
                  <>
                    <div className="flex items-start justify-between border-b border-[#EAE4DC] pb-4 flex-shrink-0">
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-indigo-50 text-[#7553FF]">
                          {emp.name.charAt(0)}
                        </div>
                        <div className="leading-snug">
                          <h3 className="text-[20px] font-bold text-slate-900 font-poppins">{emp.name}</h3>
                          <p className="text-[14px] text-slate-500 font-medium font-poppins">{emp.role} • 1-Year Check-In Log (2026)</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedDetailEmployeeId(null);
                          setSelectedMonth("All");
                        }}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer p-1.5 rounded-full hover:bg-slate-100 border-none bg-transparent transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Scrollable Modal Content */}
                    <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-6 text-left">

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Card 1: TOTAL SHIFTS */}
                        <div className="bg-[#FAF9F7] border border-[#EAE4DC] p-5 rounded-lg text-left flex flex-col justify-between h-[115px]">
                          <span className="text-[#5C534C] text-[11px] font-bold tracking-wider uppercase font-poppins">TOTAL SHIFTS</span>
                          <strong className="text-[32px] font-bold text-[#1C1814] font-poppins leading-none">
                            {totalShifts}
                          </strong>
                        </div>

                        {/* Card 2: ON-TIME / COMPLETED */}
                        <div className="bg-emerald-50/60 border border-emerald-100 p-5 rounded-lg text-left flex flex-col justify-between h-[115px]">
                          <span className="text-emerald-700 text-[11px] font-bold tracking-wider uppercase font-poppins font-semibold">ON-TIME / COMPLETED</span>
                          <strong className="text-[32px] font-bold text-emerald-700 font-poppins leading-none">
                            {onTimeCompleted}
                          </strong>
                        </div>

                        {/* Card 3: LATE ARRIVALS */}
                        <div className="bg-amber-50/60 border border-amber-100 p-5 rounded-lg text-left flex flex-col justify-between h-[115px]">
                          <span className="text-amber-700 text-[11px] font-bold tracking-wider uppercase font-poppins font-semibold">LATE ARRIVALS</span>
                          <strong className="text-[32px] font-bold text-amber-600 font-poppins leading-none">
                            {lateArrivals}
                          </strong>
                        </div>

                        {/* Card 4: FLEXTIME BAL (2026) */}
                        <div className="bg-indigo-50/60 border border-indigo-100 p-5 rounded-lg text-left flex flex-col justify-between h-[115px]">
                          <span className="text-[#7553FF] text-[11px] font-bold tracking-wider uppercase font-poppins font-semibold">FLEXTIME BAL (2026)</span>
                          <strong className="text-[32px] font-bold text-[#7553FF] font-poppins leading-none">
                            {emp.flextime2026}
                          </strong>
                        </div>
                      </div>

                    {/* Month Filters */}
                    <div className="text-left space-y-2">
                      <span className="text-slate-500 text-[11px] font-bold tracking-wider uppercase font-poppins block">FILTER BY MONTH</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["All Months", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => {
                          const isSelected = selectedMonth === (month === "All Months" ? "All" : month);
                          return (
                            <button
                              key={month}
                              onClick={() => setSelectedMonth(month === "All Months" ? "All" : month)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                                isSelected
                                  ? "bg-[#7553FF] border-[#7553FF] text-white shadow-sm"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                              }`}
                            >
                              {month}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                      {/* Detailed shift log timeline table */}
                      <div className="space-y-3 text-left">
                        <div className="bg-white border border-[#EAE4DC] rounded-lg overflow-hidden shadow-xs">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-slate-50/60 border-b border-slate-100">
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Date</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Shift Name</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Check-In</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Check-Out</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Break</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Work Hours</th>
                              <th className="px-4 py-3 font-semibold text-slate-700 text-[13px] text-left font-poppins">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans text-[13px] text-slate-700">
                            {filteredLogs.map((log, idx) => (
                              <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/40 transition-colors">
                                <td className="px-4 py-3.5 text-slate-700 font-medium font-poppins text-left">{log.date}</td>
                                <td className="px-4 py-3.5 text-slate-600 font-poppins text-left">{log.shiftName}</td>
                                <td className={`px-4 py-3.5 font-bold font-poppins text-left ${log.checkin === "Absent" ? "text-rose-600" : "text-emerald-600"}`}>
                                  {log.checkin}
                                </td>
                                <td className="px-4 py-3.5 text-slate-600 font-poppins text-left">{log.checkout}</td>
                                <td className="px-4 py-3.5 text-slate-500 font-poppins text-left">{log.breakTime}</td>
                                <td className="px-4 py-3.5 text-slate-800 font-bold font-mono text-left">{log.workHours}</td>
                                <td className="px-4 py-3.5 text-left">
                                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-normal rounded-md border ${
                                    log.status === "ON TIME" || log.status === "On Time"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                      : log.status === "COMPLETED" || log.status === "Completed"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : log.status.startsWith("LATE") || log.status.startsWith("Late")
                                      ? "bg-amber-50 text-amber-700 border-amber-100"
                                      : "bg-rose-50 text-rose-700 border-rose-100"
                                  }`}>
                                    {log.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            {filteredLogs.length === 0 && (
                              <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-sm font-poppins">
                                  No check-in logs found for this month.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    </div>

                    {/* Footer */}
                    <div className="flex justify-end pt-4 border-t border-[#EAE4DC] flex-shrink-0">
                      <button
                        onClick={() => {
                          setSelectedDetailEmployeeId(null);
                          setSelectedMonth("All");
                        }}
                        className="px-5 py-2.5 bg-[#FAF9F7] hover:bg-[#F4F0EB] text-[#1C1814] font-semibold border border-[#EAE4DC] rounded-lg text-xs cursor-pointer transition-colors font-poppins"
                      >
                        Close Summary View
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
