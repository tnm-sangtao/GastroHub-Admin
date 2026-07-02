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
  CheckSquare
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

    // Reset Form
    setManualReason("");
    setManualBreak("");
    setManualAttachmentName("");
    setManualCompensatoryHours("0");
    showToast(`Retroactive attendance recorded successfully for ${employee.employeeName}.`);
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

      {/* BRAND POLICIES & SIMULATION PRESETS */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs text-left grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 inline-block rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Access Permission Simulator</span>
          </div>
          <p className="text-[13px] text-slate-600 leading-normal">
            Toggle the active simulated profile to test branch visibility restrictions. Branch managers and staff are barred from viewing or editing logs of other branches.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <span className="text-[13px] font-medium text-slate-700 whitespace-nowrap">Simulate As:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = simulatedUsers.find(u => u.id === e.target.value);
                if (found) {
                  setCurrentUser(found);
                  if (found.role !== 'Admin') {
                    setSelectedBranch(found.assignedBranches[0]);
                  } else {
                    setSelectedBranch("All");
                  }
                  showToast(`Simulating active user: ${found.name} (${found.role} role)`);
                }
              }}
              className="border border-slate-200 bg-[#FAF9F7] px-3 py-1.5 text-xs rounded-lg text-slate-800 font-semibold outline-none focus:ring-1 focus:ring-[#7553FF] cursor-pointer"
            >
              {simulatedUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-mono text-slate-600">
              <span className="font-semibold text-slate-700">Bound to:</span>
              <span>{currentUser.assignedBranches.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#7553FF] inline-block rounded-full" />
            <span className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Operational Engine Mode</span>
          </div>
          <p className="text-[13px] text-slate-600 leading-normal">
            Switch between full **Integrated Mode** (verifies shifts, grace windows, absent checks) and **Standalone Mode** (unconstrained clock-in/out log capture with default status values).
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setWorkMode('Integrated');
                  showToast("Switched to Integrated Mode (Full shift verification enabled)");
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${workMode === 'Integrated' ? 'bg-[#7553FF] text-white border-[#7553FF]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Integrated Mode
              </button>
              <button
                onClick={() => {
                  setWorkMode('Standalone');
                  showToast("Switched to Standalone Mode (Simple log capture mode active)");
                }}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${workMode === 'Standalone' ? 'bg-[#7553FF] text-white border-[#7553FF]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                Standalone Mode
              </button>
            </div>

            <div className="text-[11px] text-slate-500 leading-tight">
              {workMode === 'Integrated' 
                ? "✓ Shift validation, Late status (grace +5m), Absent auto-checks, Compensatory exemption." 
                : "✓ Simple Checked-in / Completed log records. No shift timing rules or late flags."
              }
            </div>
          </div>
        </div>
      </div>

      {/* CORE MODULE A: INTERACTIVE SIMULATION CONSOLE */}
      {currentUser.role !== 'Staff' && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#7553FF] inline-block rounded-full animate-pulse" />
            <h2 className="text-base font-medium tracking-tight text-slate-800">
              Interactive Hardware Check-In Simulator (Check-In Console)
            </h2>
          </div>
          {workMode === 'Integrated' && (
            <button
              onClick={triggerAbsentCheck}
              className="text-[13px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
              title="Auto absent is run if 60 minutes elapse past shift end and no checkin exists."
            >
              Run Active Absent State Check (+60m Past Shift End)
            </button>
          )}
        </div>

        <p className="text-[13px] text-slate-600 leading-relaxed">
          This console simulates physical fingerprint, web portal, or tablet branch verification. Change the simulated device location to test the **Branch Lock Logic** mismatch block, and adjust check-in times to observe the **Grace Window & State Machine** calculations.
        </p>

        {/* Location mismatch warning guardrail container */}
        <AnimatePresence>
          {locationError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-amber-50/60 border border-amber-200 p-4 flex items-start gap-3 rounded-xl shadow-3xs"
            >
              <AlertCircle className="w-[14px] h-[14px] text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[13px] font-semibold text-amber-800 uppercase block tracking-wider">Location Mismatch Blocked</span>
                <p className="text-[13px] text-slate-700 leading-tight">
                  {locationError}
                </p>
                <div className="text-[12px] text-slate-600">
                  Expected branch for this employee shift: <strong className="text-slate-700 font-medium">{scheduledShifts.find(s => s.employeeId === consoleEmployee)?.branch}</strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          
          {/* Emp selector */}
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">1. Employee</label>
            <select
              value={consoleEmployee}
              onChange={(e) => {
                setConsoleEmployee(e.target.value);
                setLocationError(null);
                const sched = scheduledShifts.find((s) => s.employeeId === e.target.value);
                if (sched) {
                  setConsoleTime(sched.startTime);
                }
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
            >
              {availableEmployeesForSim.map((s) => (
                <option key={s.employeeId} value={s.employeeId}>
                  {s.employeeName} ({s.shiftName} - Expected: {s.branch})
                </option>
              ))}
            </select>
          </div>

          {/* Simulated Location */}
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">2. Device Location</label>
            <select
              value={consoleLocation}
              onChange={(e) => {
                setConsoleLocation(e.target.value);
                setLocationError(null);
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
            >
              <option value="HCM 1">HCM 1 Branch Office</option>
              <option value="HCM 2">HCM 2 Restaurant Floor</option>
              <option value="HN 1">HN 1 Bistro</option>
              <option value="HQ">HQ Administrative Office</option>
            </select>
          </div>

          {/* Device Type */}
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">3. Device/Channel</label>
            <select
              value={consoleDeviceType}
              onChange={(e) => {
                setConsoleDeviceType(e.target.value as 'Web Browser' | 'Mobile App');
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
            >
              <option value="Web Browser">Web Portal (PC)</option>
              <option value="Mobile App">Mobile App (GPS/WiFi)</option>
            </select>
          </div>

          {/* Simulated Time */}
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">4. Simulate Time (24h)</label>
            <input
              type="time"
              value={consoleTime}
              onChange={(e) => {
                setConsoleTime(e.target.value);
                setLocationError(null);
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800 font-medium font-mono"
            />
          </div>

          {/* Action Trigger */}
          <div className="flex items-end">
            <button
              onClick={handleClockIn}
              className="w-full h-10 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[13px] transition-all shadow-xs rounded-lg flex items-center justify-center gap-2 border-none cursor-pointer"
            >
              Simulate Instant Check-In
            </button>
          </div>

        </div>

        {/* Dynamic Compensatory and Break Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">Custom Break Duration Override (Optional)</label>
            <input
              type="text"
              placeholder="e.g. 0.5 for 30m, 1.5 for 90m. Leave blank for dynamic auto break."
              value={consoleBreak}
              onChange={(e) => setConsoleBreak(e.target.value)}
              className="w-full h-10 border border-slate-200 bg-white px-3.5 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[12px] font-semibold text-slate-700 block tracking-wider uppercase">Approved Compensatory Leave Hours (Late Arrival Exemption)</label>
            <select
              value={consoleCompensatoryHours}
              onChange={(e) => setConsoleCompensatoryHours(e.target.value)}
              className="w-full h-10 border border-slate-200 bg-white px-3 text-[13px] focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF] outline-none rounded-lg text-slate-800 font-medium cursor-pointer"
            >
              <option value="0">None (Standard grace +5 mins applies)</option>
              <option value="0.5">0.5 Hours (Late up to 30 mins exempted)</option>
              <option value="1.0">1.0 Hour (Late up to 60 mins exempted)</option>
              <option value="1.5">1.5 Hours (Late up to 90 mins exempted)</option>
              <option value="2.0">2.0 Hours (Late up to 120 mins exempted)</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 italic">
          * Auto break settings: {brandAutoBreak ? `Enabled (First Tier: ${breakThreshold1Min}m for shifts >= ${breakThreshold1Start}h, Second Tier: ${breakThreshold2Min}m for shifts >= ${breakThreshold2Start}h)` : "Disabled (No automatic breaks applied)"}.
        </div>
      </div>
      )}

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
            <span className="text-slate-500 font-medium">Dept:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent text-slate-800 font-medium cursor-pointer focus:outline-none border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
            >
              <option value="All">All Departments</option>
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
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Staff Member</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Department</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Shift Details</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Simulated Logs</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Break Details</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-left">Work Hours</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-center">Status</th>
                <th className="px-5 py-4 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-[14px] text-slate-700 font-sans">
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
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-5 py-4 text-[14px] text-slate-700 font-sans text-left">
                      {item.department}
                    </td>

                    {/* Shift & Branch */}
                    <td className="px-5 py-4 text-left">
                      <div className="space-y-0.5">
                        <div className="font-medium text-[14px] text-slate-800">{item.shiftName} Shift</div>
                        <div className="text-[14px] text-slate-700 font-sans">{item.shiftTimes}</div>
                        <span className="inline-flex items-center gap-1 text-[14px] text-slate-700 font-medium">
                          <MapPin className="w-[14px] h-[14px] text-slate-700" />
                          {item.location}
                        </span>
                      </div>
                    </td>

                    {/* Check-in/Check-out logs */}
                    <td className="px-5 py-4 text-left">
                      <div className="text-[13px] space-y-1 font-mono">
                        <div>
                          <span className="text-slate-500 uppercase font-sans mr-1 text-[11px]">In:</span> 
                          {item.checkInTime ? (
                            <span className="text-slate-700 font-medium">{item.checkInTime}</span>
                          ) : (
                            <span className="text-slate-400 font-sans italic font-normal">Not started</span>
                          )}
                          {item.deviceType && (
                            <span className="ml-1.5 inline-flex items-center text-[9px] px-1 bg-slate-100 text-slate-500 rounded border border-slate-200">
                              {item.deviceType === "Mobile App" ? "📱 Mobile" : "💻 Web"}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-slate-500 uppercase font-sans mr-1 text-[11px]">Out:</span>
                          {item.checkOutTime ? (
                            <span className="text-slate-700 font-medium">{item.checkOutTime}</span>
                          ) : (
                            <span className="text-slate-400 font-sans italic font-normal">—</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Break Duration / Auto deduction warning */}
                    <td className="px-5 py-4 text-left text-[13px] font-sans">
                      {item.checkInTime && item.checkOutTime ? (
                        item.breakDuration ? (
                          <div className="space-y-0.5">
                            <span className="text-slate-700 font-medium font-mono block">{item.breakDuration}</span>
                            {!item.breakDuration.includes("(Manual)") && item.breakDuration !== "0h 00m" && (
                              <span className="inline-flex items-center text-[10px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase">
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

                    {/* Net Hours */}
                    <td className="px-5 py-4 font-mono font-medium text-slate-800 text-[13px] text-left">
                      {item.workingHours ? (
                        <span>{item.workingHours}</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>

                    {/* Highly aesthetic Status Badge with Soft backgrounds */}
                    <td className="px-5 py-4 text-center">
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
                          <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-sans font-semibold rounded select-none tracking-wide uppercase ${badgeClass}`}>
                            {item.status.toUpperCase()}
                          </span>
                        );
                      })()}
                    </td>

                    {/* Actions: Check-out retroactive or view */}
                    <td className="px-5 py-4 text-right">
                      {item.status === "Absent" ? (
                        <div className="flex flex-col items-end gap-2">
                          {resolvingAbsentLogId === item.id ? (
                            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-2 text-left max-w-xs shadow-sm">
                              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                                Policy: <strong className="text-[#7553FF]">{forgetBehavior}</strong>
                              </div>
                              {forgetBehavior === "Snap to Shift" ? (
                                <p className="text-[12px] text-slate-600 leading-snug">
                                  Prefills planned hours: <strong className="text-slate-700">{scheduledShifts.find(s => s.employeeId === item.employeeId)?.startTime} - {scheduledShifts.find(s => s.employeeId === item.employeeId)?.endTime}</strong>
                                </p>
                              ) : (
                                <div className="space-y-1">
                                  <span className="text-[11px] text-slate-500 block">Enter actual times:</span>
                                  <div className="flex gap-1">
                                    <input
                                      type="time"
                                      value={resolveCheckinTime}
                                      onChange={(e) => setResolveCheckinTime(e.target.value)}
                                      className="border border-slate-200 bg-white p-1 rounded font-mono text-[11px] w-20 outline-none"
                                    />
                                    <input
                                      type="time"
                                      value={resolveCheckoutTime}
                                      onChange={(e) => setResolveCheckoutTime(e.target.value)}
                                      className="border border-slate-200 bg-white p-1 rounded font-mono text-[11px] w-20 outline-none"
                                    />
                                  </div>
                                </div>
                              )}
                              <div className="flex gap-1.5 pt-1 justify-end">
                                <button
                                  onClick={() => handleResolveAbsent(item.id, resolveCheckinTime, resolveCheckoutTime)}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] px-2.5 py-1 rounded font-semibold cursor-pointer border-none"
                                >
                                  Apply
                                </button>
                                <button
                                  onClick={() => setResolvingAbsentLogId(null)}
                                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] px-2.5 py-1 rounded font-semibold cursor-pointer border-none"
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
                              className="bg-amber-600 hover:bg-amber-700 text-white text-[12px] font-semibold py-1 px-2.5 rounded transition-colors cursor-pointer border-none"
                            >
                              Resolve Absent Shift
                            </button>
                          )}
                        </div>
                      ) : item.checkInTime && !item.checkOutTime ? (
                        <div className="flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] text-slate-500 font-medium">Comp. Hours (Approved):</span>
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              max="4"
                              defaultValue="0"
                              id={`comp-out-${item.id}`}
                              className="w-12 h-7 border border-slate-200 text-center text-xs font-sans rounded outline-none text-slate-800"
                              title="Compensatory hours for early checkout"
                            />
                          </div>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="time"
                              defaultValue="17:00"
                              id={`out-time-${item.id}`}
                              className="w-24 h-8 border border-slate-200 text-[13px] px-2 font-mono rounded-lg focus:border-[#7553FF] outline-none text-slate-800"
                            />
                            <button
                              onClick={() => {
                                const inputEl = document.getElementById(`out-time-${item.id}`) as HTMLInputElement;
                                const compEl = document.getElementById(`comp-out-${item.id}`) as HTMLInputElement;
                                handleClockOut(item.id, inputEl?.value || "17:00", Number(compEl?.value) || 0);
                              }}
                              className="bg-[#7553FF] hover:bg-[#623EE2] text-white text-[13px] font-medium py-1.5 px-3 rounded-lg transition-colors shadow-none border-none cursor-pointer"
                            >
                              Check Out
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[13px] text-slate-600 space-y-0.5 text-right flex flex-col items-end">
                          {item.reasonNote && (
                            <span className="block text-[13px] text-slate-600 italic truncate max-w-[180px]" title={item.reasonNote}>
                              "{item.reasonNote}"
                            </span>
                          )}
                          {item.documentProof && (
                            <span className="inline-flex items-center gap-1 text-[12px] text-slate-500 font-medium">
                              <FileText className="w-[12px] h-[12px] text-slate-400" />
                              {item.documentProof}
                            </span>
                          )}
                          {item.compensatoryHours && Number(item.compensatoryHours) > 0 && (
                            <span className="inline-flex items-center text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase font-semibold">
                              Compensated: {item.compensatoryHours}h
                            </span>
                          )}
                          {!item.reasonNote && !item.documentProof && (!item.compensatoryHours || Number(item.compensatoryHours) === 0) && (
                            <span className="text-slate-400 italic font-normal text-[12px]">No notes</span>
                          )}
                        </div>
                      )}
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
                <span className="text-[18px] font-medium text-slate-800">Retroactive Manual Check-In Override</span>
                <button
                  onClick={() => setIsManualModalOpen(false)}
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
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-[14px] font-medium rounded-lg cursor-pointer text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-medium rounded-lg border-none cursor-pointer"
                  >
                    Save & Record Logs
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
