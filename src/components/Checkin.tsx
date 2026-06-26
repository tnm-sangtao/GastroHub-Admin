import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
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

export default function CheckinView() {
  // --- STATE ---
  
  // Simulated Date: default to "2026-06-24"
  const [currentSimulatedDate, setCurrentSimulatedDate] = useState("2026-06-24");

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
    // Expects "HH:MM" (24h) or "hh:mm AM/PM"
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
    shiftStartStr: string
  ): { status: string; minutesLate: number } => {
    const checkin = parseTime(checkinStr);
    const start = parseTime(shiftStartStr);

    const checkinMinutes = checkin.hours * 60 + checkin.minutes;
    const startMinutes = start.hours * 60 + start.minutes;

    const diff = checkinMinutes - startMinutes;

    if (diff <= 5) {
      return { status: "On Time", minutesLate: 0 };
    } else {
      return { status: `Late (${diff}m)`, minutesLate: diff };
    }
  };

  // Break Deduction and Net Hours Calculator
  const calculateWorkedHours = (
    checkinStr: string,
    checkoutStr: string,
    breakStr: string | null
  ): string => {
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

    if (breakStr && breakStr.trim() !== "") {
      // Parse custom break e.g. "1h 00m" or "30m" or "1.5" or manual minutes
      if (breakStr.includes("h")) {
        const parts = breakStr.split("h");
        const h = parseInt(parts[0]) || 0;
        const m = parseInt(parts[1]) || 0;
        breakMin = h * 60 + m;
      } else {
        breakMin = parseFloat(breakStr) * 60 || 0;
      }
    } else {
      // Default Auto-Deduction Rule:
      // Subtract exactly 1.0 hour if gross total is 5 hours (300 minutes) or more.
      if (grossMin >= 5 * 60) {
        breakMin = 60;
      }
    }

    const netMin = Math.max(0, grossMin - breakMin);
    const netHrs = Math.floor(netMin / 60);
    const netMins = netMin % 60;

    return `${netHrs}h ${netMins < 10 ? "0" + netMins : netMins}m`;
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

    // Branch Verification Lock
    if (consoleLocation !== sched.branch) {
      setLocationError(
        `You are at the wrong branch of work. Timekeeping cannot be done.`
      );
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
    const { status } = calculateShiftStatus(consoleTime, sched.startTime);

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
    };

    setAttendanceData((prev) => [newRecord, ...prev]);
    showToast(`Check-In successful for ${sched.employeeName} as "${status}"!`);
  };

  // PRIMARY CHECK-OUT TRIGGER (BREAK DEDUCTION & OVERNIGHT DAY ROLL)
  const handleClockOut = (recordId: string, checkoutTime24h: string = "17:00") => {
    setAttendanceData((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;

        const sched = scheduledShifts.find((s) => s.employeeId === rec.employeeId);
        const outHours = parseInt(checkoutTime24h.split(":")[0]);
        const outMins = parseInt(checkoutTime24h.split(":")[1]);
        const formattedCheckoutTime = formatTimeString(outHours, outMins);

        // Compute working hours (applying Break Deduction Engine rules)
        const netHoursStr = calculateWorkedHours(
          rec.checkInTime!,
          formattedCheckoutTime,
          consoleBreak !== "" ? consoleBreak : null
        );

        // Determine target log date based on Overnight Shift Day-Roll Rule
        // If shift crosses midnight, bind work records to the END date
        let targetDate = rec.date;
        if (sched?.isOvernight) {
          // Increment date by 1 day
          const d = new Date(rec.date);
          d.setDate(d.getDate() + 1);
          targetDate = d.toISOString().split("T")[0];
        }

        showToast(`Check-Out processed for ${rec.name}. Net Hours: ${netHoursStr}`);

        return {
          ...rec,
          checkOutTime: formattedCheckoutTime,
          checkOutLoc: rec.checkInLoc,
          breakDuration: consoleBreak !== "" ? `${consoleBreak}h` : null,
          workingHours: netHoursStr,
          status: "Completed",
          date: targetDate, // Overnight day roll rule
        };
      })
    );
  };

  // REACTIVE BACKGROUND ABSENT STATE ENGINE TRIGGER
  // Triggered manually to simulate "60 minutes past shift end"
  const triggerAbsentCheck = () => {
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

  // ADMINISTRATIVE MANUAL OVERRIDE SUBMISSION
  const handleManualOverrideSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const employee = scheduledShifts.find((s) => s.employeeId === manualEmployeeId);
    if (!employee) return;

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
    const workingHours = calculateWorkedHours(
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
      breakDuration: manualBreak !== "" ? `${manualBreak}h` : null,
      workingHours: workingHours,
      status: "Completed",
      location: manualBranch,
      avatarColor: employee.avatarColor,
      date: manualDate,
      reasonNote: manualReason,
      documentProof: manualAttachmentName || "Proof_Attached.pdf",
    };

    setAttendanceData((prev) => [newRecord, ...prev]);
    setIsManualModalOpen(false);

    // Reset Form
    setManualReason("");
    setManualBreak("");
    setManualAttachmentName("");
    showToast(`Retroactive attendance recorded successfully for ${employee.employeeName}.`);
  };

  // --- STATS COMPUTATION ---
  const stats = useMemo(() => {
    const logs = attendanceData.filter((d) => d.date === currentSimulatedDate);
    const totalExpected = scheduledShifts.length;
    const completed = logs.filter((d) => d.status === "Completed").length;
    const late = logs.filter((d) => d.status.startsWith("Late")).length;
    const absent = logs.filter((d) => d.status === "Absent").length;
    const active = logs.filter((d) => d.checkInTime && !d.checkOutTime).length;

    return { totalExpected, completed, late, absent, active };
  }, [attendanceData, currentSimulatedDate, scheduledShifts]);

  // --- FILTER & SEARCH ---
  const filteredRecords = useMemo(() => {
    return attendanceData.filter((item) => {
      // Date filter
      if (item.date !== selectedFilterDate) return false;

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
  }, [attendanceData, searchQuery, selectedBranch, selectedDept, selectedStatus, selectedFilterDate]);

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
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-medium transition-all shadow-xs rounded-lg border-none cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Manual Admin Override</span>
          </button>
        </div>
      </div>

      {/* METRIC BOXES - STYLED EXACTLY TO MATCH STAFF & ROLES STATS */}
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

      {/* CORE MODULE A: INTERACTIVE SIMULATION CONSOLE */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#7553FF] inline-block rounded-full" />
            <h2 className="text-base font-medium tracking-tight text-slate-800">
              Interactive Hardware Check-In Simulator (Check-In Console)
            </h2>
          </div>
          <button
            onClick={triggerAbsentCheck}
            className="text-[14px] bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium py-1.5 px-3.5 rounded-lg transition-colors cursor-pointer"
            title="Auto absent is run if 60 minutes elapse past shift end and no checkin exists."
          >
            Run Active Absent State Check (+60m Past Shift End)
          </button>
        </div>

        <p className="text-[14px] text-slate-700 leading-relaxed">
          This console simulates physical fingerprint or tablet branch verification. Change the simulated device location to test the **Branch Lock Logic** mismatch block, and adjust check-in times to observe the **Grace Window & State Machine** calculations.
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
                <span className="text-[14px] font-medium text-amber-800 uppercase block tracking-wider">Location Mismatch Checked</span>
                <p className="text-[14px] text-slate-700 leading-tight">
                  {locationError}
                </p>
                <div className="text-[14px] text-slate-700">
                  Expected branch for this employee shift: <strong className="text-slate-700 font-medium">{scheduledShifts.find(s => s.employeeId === consoleEmployee)?.branch}</strong>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* Emp selector */}
          <div className="space-y-1">
            <label className="text-[14px] font-medium text-slate-700 block tracking-wider">1. Employee</label>
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
              className="w-full h-10 border border-slate-200 bg-white px-3.5 text-[14px] focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
            >
              {scheduledShifts.map((s) => (
                <option key={s.employeeId} value={s.employeeId}>
                  {s.employeeName} ({s.shiftName} - Expected: {s.branch})
                </option>
              ))}
            </select>
          </div>

          {/* Simulated Location */}
          <div className="space-y-1">
            <label className="text-[14px] font-medium text-slate-700 block tracking-wider">2. Simulated Device Branch</label>
            <select
              value={consoleLocation}
              onChange={(e) => {
                setConsoleLocation(e.target.value);
                setLocationError(null);
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3.5 text-[14px] focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
            >
              <option value="HCM 1">HCM 1 Branch Office</option>
              <option value="HCM 2">HCM 2 Restaurant Floor</option>
              <option value="HN 1">HN 1 Bistro</option>
              <option value="HQ">HQ Administrative Office</option>
            </select>
          </div>

          {/* Simulated Time */}
          <div className="space-y-1">
            <label className="text-[14px] font-medium text-slate-700 block tracking-wider">3. Simulate Time (24h)</label>
            <input
              type="time"
              value={consoleTime}
              onChange={(e) => {
                setConsoleTime(e.target.value);
                setLocationError(null);
              }}
              className="w-full h-10 border border-slate-200 bg-white px-3.5 text-[14px] focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium font-mono"
            />
          </div>

          {/* Action Trigger */}
          <div className="flex items-end">
            <button
              onClick={handleClockIn}
              className="w-full h-10 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] transition-all shadow-xs rounded-lg flex items-center justify-center gap-2 border-none cursor-pointer"
            >
              Simulate Instant Check-In
            </button>
          </div>

        </div>

        {/* Break override modifier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
          <div className="space-y-1 md:col-span-3">
            <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Custom Break Duration Override (Optional - e.g. "0.5" for 30m, "1.5" for 90m)</label>
            <input
              type="text"
              placeholder="Leave blank for automatic 1-hour auto-deduction (shifts >= 5h)"
              value={consoleBreak}
              onChange={(e) => setConsoleBreak(e.target.value)}
              className="w-full h-10 border border-slate-200 bg-white px-3.5 text-[14px] focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800"
            />
          </div>
          <div className="flex items-end pb-1">
            <div className="text-[14px] text-slate-700 leading-tight">
              * Auto break deduces 1.0 hr on shifts &gt;= 5 hrs if none specified.
            </div>
          </div>
        </div>
      </div>

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
          <div className="flex items-center gap-2 border border-slate-200 bg-white px-3.5 py-2 rounded-xl text-[14px] shadow-3xs">
            <span className="text-slate-500 font-medium">Date:</span>
            <select
              value={selectedFilterDate}
              onChange={(e) => setSelectedFilterDate(e.target.value)}
              className="bg-transparent text-slate-800 font-medium cursor-pointer focus:outline-none border-none p-0 pr-1.5 focus:ring-0 text-[14px]"
            >
              <option value="2026-06-24">June 24, 2026 (Today)</option>
              <option value="2026-06-25">June 25, 2026 (Tomorrow)</option>
            </select>
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
                      <div className="text-[14px] space-y-1 font-mono">
                        <div>
                          <span className="text-slate-700 uppercase font-sans mr-1 text-[14px]">In:</span> 
                          {item.checkInTime ? (
                            <span className="text-slate-700 font-medium">{item.checkInTime}</span>
                          ) : (
                            <span className="text-slate-700 font-sans italic font-normal">Not started</span>
                          )}
                        </div>
                        <div>
                          <span className="text-slate-700 uppercase font-sans mr-1 text-[14px]">Out:</span>
                          {item.checkOutTime ? (
                            <span className="text-slate-700 font-medium">{item.checkOutTime}</span>
                          ) : (
                            <span className="text-slate-700 font-sans italic font-normal">—</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Break Duration / Auto deduction warning */}
                    <td className="px-5 py-4 text-left text-[14px] font-sans">
                      {item.checkInTime && item.checkOutTime ? (
                        item.breakDuration ? (
                          <span className="text-slate-700 font-medium font-mono">{item.breakDuration} (Manual)</span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-slate-700 font-medium font-mono block">1h 00m</span>
                            <span className="inline-flex items-center text-[14px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[2px] w-fit uppercase">
                              Auto-Deducted
                            </span>
                          </div>
                        )
                      ) : (
                        <span className="text-slate-700">—</span>
                      )}
                    </td>

                    {/* Net Hours */}
                    <td className="px-5 py-4 font-mono font-medium text-slate-800 text-[14px] text-left">
                      {item.workingHours ? (
                        <span>{item.workingHours}</span>
                      ) : (
                        <span className="text-slate-700">—</span>
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 text-[14px] font-sans font-medium rounded-[2px] select-none tracking-wide uppercase ${badgeClass}`}>
                            {item.status.toUpperCase()}
                          </span>
                        );
                      })()}
                    </td>

                    {/* Actions: Check-out retroactive or view */}
                    <td className="px-5 py-4 text-right">
                      {item.checkInTime && !item.checkOutTime ? (
                        <div className="flex items-center justify-end gap-2">
                          <input
                            type="time"
                            defaultValue="17:00"
                            id={`out-time-${item.id}`}
                            className="w-24 h-8 border border-slate-200 text-[14px] px-2 font-mono rounded-lg focus:border-[#7553FF] outline-none text-slate-800"
                          />
                          <button
                            onClick={() => {
                              const inputEl = document.getElementById(`out-time-${item.id}`) as HTMLInputElement;
                              handleClockOut(item.id, inputEl?.value || "17:00");
                            }}
                            className="bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-medium py-1.5 px-3 rounded-lg transition-colors shadow-none border-none cursor-pointer"
                          >
                            Check Out
                          </button>
                        </div>
                      ) : (
                        <div className="text-[14px] text-slate-700 space-y-0.5 text-right flex flex-col items-end">
                          {item.reasonNote && (
                            <span className="block text-[14px] text-slate-700 italic truncate max-w-[150px]" title={item.reasonNote}>
                              "{item.reasonNote}"
                            </span>
                          )}
                          {item.documentProof && (
                            <span className="inline-flex items-center gap-1 text-[14px] text-slate-700">
                              <FileText className="w-[14px] h-[14px] text-slate-700" />
                              {item.documentProof}
                            </span>
                          )}
                          {!item.reasonNote && !item.documentProof && (
                            <span className="text-slate-700 italic font-normal">No notes</span>
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
                  <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Target Employee</label>
                  <select
                    value={manualEmployeeId}
                    onChange={(e) => setManualEmployeeId(e.target.value)}
                    className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
                  >
                    {scheduledShifts.map((s) => (
                      <option key={s.employeeId} value={s.employeeId}>
                        {s.employeeName} ({s.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date Selector */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Shift Date</label>
                    <input
                      type="date"
                      value={manualDate}
                      onChange={(e) => setManualDate(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
                      required
                    />
                  </div>

                  {/* Branch Selector */}
                  <div className="space-y-1">
                    <label className="text-[14px] font-medium text-slate-700 block tracking-wider">Branch Selector</label>
                    <select
                      value={manualBranch}
                      onChange={(e) => setManualBranch(e.target.value)}
                      className="w-full h-10 border border-slate-200 bg-white px-3.5 focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 outline-none rounded-lg text-slate-800 font-medium"
                    >
                      <option value="HCM 1">HCM 1</option>
                      <option value="HCM 2">HCM 2</option>
                      <option value="HN 1">HN 1</option>
                      <option value="HQ">HQ</option>
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
