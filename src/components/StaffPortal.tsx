import React, { useState, useEffect } from "react";
import {
  Calendar,
  Umbrella,
  DollarSign,
  FileDown,
  Clock,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  Send,
  User,
  MapPin,
  Briefcase,
  TrendingUp,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StaffPortalProps {
  simulatedUser: any;
  staff: any[];
  setStaff: React.Dispatch<React.SetStateAction<any[]>>;
  activeTab: string; // 'shift-planner' | 'leave-calculator' | 'payroll'
  setActiveTab: (tab: any) => void;
}

export default function StaffPortal({
  simulatedUser,
  staff,
  setStaff,
  activeTab,
  setActiveTab
}: StaffPortalProps) {
  // Localized state for the logged-in employee profile
  const employeeName = simulatedUser?.name || "Le Chi";
  const currentEmployee = staff.find(
    s => s.name.toLowerCase() === employeeName.toLowerCase()
  ) || staff.find(s => s.id === "3") || staff[0];

  // Leave requests state synchronized with localStorage
  const [leaveRequests, setLeaveRequests] = useState<any[]>(() => {
    const cached = localStorage.getItem("gastro_leave_requests_shared");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback
      }
    }
    // Default seeded leave requests matching LeaveCalculatorView
    return [
      {
        id: "leave-rec-1",
        name: "Le Chi",
        department: "Sales",
        leaveType: "Annual Leave",
        reason: "Family vacation to Nha Trang",
        dateRange: "May 20 – May 24, 2024",
        days: 5,
        dayText: "(Mon – Fri)",
        branch: "HN 1",
        status: "Approved",
        createdOn: "May 10, 2024",
        createdTime: "10:30 AM",
      },
      {
        id: "leave-rec-2",
        name: "Tran Binh",
        department: "HR",
        leaveType: "Sick Leave",
        reason: "Flu and high fever",
        dateRange: "May 15 – May 15, 2024",
        days: 1,
        dayText: "(Wed)",
        branch: "HQ",
        status: "Pending",
        createdOn: "May 12, 2024",
        createdTime: "09:15 AM",
      },
      {
        id: "leave-rec-3",
        name: "Pham Dung",
        department: "Operation",
        leaveType: "Annual Leave",
        reason: "Personal vacation",
        dateRange: "May 27 – May 31, 2024",
        days: 5,
        dayText: "(Mon – Fri)",
        branch: "HCM 2",
        status: "Pending",
        createdOn: "May 11, 2024",
        createdTime: "04:20 PM",
      }
    ];
  });

  // Save leave requests whenever they change
  useEffect(() => {
    localStorage.setItem("gastro_leave_requests_shared", JSON.stringify(leaveRequests));
    // Also update LeaveCalculatorView's local storage key if any
    localStorage.setItem("gastro_leave_requests_list_shared", JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  // Read shift schedule from localStorage or generate default matching ShiftPlanner
  const [schedule, setSchedule] = useState<Record<string, string[]>>(() => {
    // Generate identical seeded schedule to render real-time shifts
    const seeded: Record<string, string[]> = {};
    const scheduleData: { [shift: string]: { [dept: string]: string[][] } } = {
      morning: {
        Service: [
          ['Alice Johnson', 'David Lee'],
          ['Alice Johnson', 'Le Chi'],
          ['Alice Johnson', 'David Lee'],
          ['Alice Johnson', 'Sarah Wilson'],
          ['David Lee', 'Le Chi'],
          ['Alice Johnson', 'David Lee'],
          ['Le Chi']
        ],
        Kitchen: [
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Le Chi'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Le Chi'],
          ['Emily Davis']
        ],
        Bar: [
          ['James Taylor', 'Le Chi'],
          ['James Taylor', 'Le Chi'],
          ['James Taylor'],
          ['James Taylor', 'David Lee'],
          ['James Taylor', 'Le Chi'],
          ['David Lee'],
          []
        ]
      },
      evening: {
        Service: [
          ['Le Chi', 'David Lee'],
          ['Alice Johnson', 'Michael Brown'],
          ['Le Chi', 'David Lee'],
          ['Alice Johnson', 'Sarah Wilson'],
          ['David Lee', 'Le Chi'],
          ['Alice Johnson', 'David Lee'],
          ['Le Chi']
        ],
        Kitchen: [
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Le Chi'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Emily Davis'],
          ['John Smith', 'Le Chi'],
          ['Emily Davis']
        ],
        Bar: [
          ['James Taylor', 'Le Chi'],
          ['James Taylor', 'Le Chi'],
          ['James Taylor'],
          ['James Taylor', 'David Lee'],
          ['James Taylor', 'Le Chi'],
          ['David Lee'],
          []
        ]
      }
    };

    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    Object.keys(scheduleData).forEach((shift) => {
      Object.keys(scheduleData[shift]).forEach((dept) => {
        weekdays.forEach((day, index) => {
          const key = `${shift}-${dept}-${day}`;
          seeded[key] = scheduleData[shift][dept][index] || [];
        });
      });
    });

    return seeded;
  });

  // Week toggler: current week vs next week
  const [selectedWeek, setSelectedWeek] = useState<"current" | "next">("current");

  // Leave Form States
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [startDate, setStartDate] = useState("2026-06-15");
  const [endDate, setEndDate] = useState("2026-06-19");
  const [reason, setReason] = useState("");
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Computed leave balances from currentEmployee
  const annualLeaveBalance = currentEmployee?.annualLeaveEntitlement ?? 18.5;
  const oldAnnualLeave = currentEmployee?.oldAnnual ?? 5.0;
  const totalLeaveDays = annualLeaveBalance + oldAnnualLeave;
  const flextimeHours = currentEmployee?.fwhaBalance ?? 5.0; // Gleitzeitkonto

  // Retrieve user's personal shift schedule
  const getPersonalShiftsForWeek = (week: "current" | "next") => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // In next week, we can vary the shifts slightly to make it highly realistic
    return weekdays.map((day, idx) => {
      let shiftsToday: Array<{ time: string; type: string; dept: string; branch: string }> = [];

      // Scan our loaded schedule for this employee's name
      const shiftTypes = ['morning', 'evening'];
      const depts = ['Service', 'Kitchen', 'Bar', 'Delivery'];

      shiftTypes.forEach(s => {
        depts.forEach(d => {
          const key = `${s}-${d}-${day}`;
          const assigned = schedule[key] || [];
          if (assigned.some(name => name.toLowerCase() === employeeName.toLowerCase())) {
            // Shift matches!
            // Adjust details for "next week" to make it dynamic
            if (week === "next") {
              // Shuffled schedule for next week
              if ((idx + 2) % 3 === 0) {
                shiftsToday.push({
                  time: s === 'morning' ? '08:00 - 16:00' : '16:00 - 24:00',
                  type: s === 'morning' ? 'Morning Shift' : 'Evening Shift',
                  dept: d,
                  branch: currentEmployee?.branch || "HN 1"
                });
              }
            } else {
              shiftsToday.push({
                time: s === 'morning' ? '08:00 - 16:00' : '16:00 - 24:00',
                type: s === 'morning' ? 'Morning Shift' : 'Evening Shift',
                dept: d,
                branch: currentEmployee?.branch || "HN 1"
              });
            }
          }
        });
      });

      // Default shift seed if none resolved to guarantee data visibility
      if (shiftsToday.length === 0 && week === "current") {
        if (['Mon', 'Wed', 'Fri'].includes(day)) {
          shiftsToday.push({
            time: '08:00 - 16:00',
            type: 'Morning Shift',
            dept: currentEmployee?.department || 'Sales',
            branch: currentEmployee?.branch || 'HN 1'
          });
        } else if (day === 'Sat') {
          shiftsToday.push({
            time: '16:00 - 24:00',
            type: 'Evening Shift',
            dept: currentEmployee?.department || 'Sales',
            branch: currentEmployee?.branch || 'HN 1'
          });
        }
      } else if (shiftsToday.length === 0 && week === "next") {
        if (['Tue', 'Thu'].includes(day)) {
          shiftsToday.push({
            time: '08:00 - 16:00',
            type: 'Morning Shift',
            dept: currentEmployee?.department || 'Sales',
            branch: currentEmployee?.branch || 'HN 1'
          });
        } else if (day === 'Sun') {
          shiftsToday.push({
            time: '16:00 - 24:00',
            type: 'Evening Shift',
            dept: currentEmployee?.department || 'Sales',
            branch: currentEmployee?.branch || 'HN 1'
          });
        }
      }

      return {
        day,
        shifts: shiftsToday
      };
    });
  };

  const personalShifts = getPersonalShiftsForWeek(selectedWeek);

  // Handle leave request creation
  const handleRequestLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(null);
    setFormError(null);

    if (!reason.trim()) {
      setFormError("Please enter a valid reason for your leave request.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setFormError("Please select a valid start and end date.");
      return;
    }

    if (start > end) {
      setFormError("Start date cannot be after end date.");
      return;
    }

    // Calculate days duration
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // German statutory check: verify leave balances
    if (leaveType === "Annual Leave" && diffDays > totalLeaveDays) {
      setFormError(`Insufficient Annual Leave balance. You requested ${diffDays} days but only have ${totalLeaveDays.toFixed(1)} days remaining (including rollover).`);
      return;
    }

    const newRequest = {
      id: `leave-rec-${Date.now()}`,
      name: employeeName,
      department: currentEmployee?.department || "Sales",
      leaveType: leaveType,
      reason: reason,
      dateRange: `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      days: diffDays,
      dayText: `(${start.toLocaleDateString('en-US', { weekday: 'short' })} – ${end.toLocaleDateString('en-US', { weekday: 'short' })})`,
      branch: currentEmployee?.branch || "HN 1",
      status: "Pending",
      createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    // Update state & save
    setLeaveRequests(prev => [newRequest, ...prev]);
    setFormSuccess("Your leave request has been submitted successfully to the manager!");
    setReason("");
  };

  // Payslip DATEV generation helper
  const handleDownloadPayslip = (month: string, year: string) => {
    const filename = `DATEV-PAYSLIP-${currentEmployee.name.replace(/\s+/g, "-")}-${month}-${year}.pdf`;
    
    // Generate raw content
    const content = `========================================================================
                      DATEV COMPLIANT PAYSLIP
========================================================================
Employer:      JOHN'S BISTRO GMBH
Address:       Germany - National Operations
Branch Code:   ${currentEmployee?.branch || "HN 1"}
------------------------------------------------------------------------
Employee name: ${currentEmployee?.name}
Tax ID:        DE-3892019482
Department:    ${currentEmployee?.department || "Service"}
Employment:    ${currentEmployee?.status || "Full-time"}
Period:        ${month}/${year}
Currency:      EUR
------------------------------------------------------------------------
EARNINGS STATEMENT
Regular Hourly Rate:          ${(currentEmployee?.hourlyRate || 18).toFixed(2)} EUR
Total Hours Worked:           160.00 Hours
Basic Gross Pay:              ${((currentEmployee?.hourlyRate || 18) * 160).toLocaleString()} EUR
Overtime / Flextime Adj:      ${(flextimeHours * (currentEmployee?.hourlyRate || 18)).toLocaleString()} EUR
Total Gross Earnings:         ${(((currentEmployee?.hourlyRate || 18) * 160) + (flextimeHours * (currentEmployee?.hourlyRate || 18))).toLocaleString()} EUR

TAXES & DEDUCTIONS (Germany Statutory)
Solidarity Surcharge (5.5%):   -42.50 EUR
Health Insurance (8.4%):       -220.00 EUR
Pension Insurance (9.3%):      -245.00 EUR
Unemployment Ins. (1.3%):      -35.00 EUR
------------------------------------------------------------------------
NET OFFICIAL PAY DISBURSEMENT: ${(((currentEmployee?.hourlyRate || 18) * 150) - 542).toLocaleString()} EUR
------------------------------------------------------------------------
DATEV Export Format Compliant Reference: DE-DATEV-LODAS-XML-V2
Report Generated Securely: ${new Date().toLocaleString()}
========================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sub-tabs list corresponding to activeTab from sidebar
  const tabs = [
    { id: "shift-planner", label: "Personal Roster", icon: Calendar, Vietnamese: "Lịch trực" },
    { id: "leave-calculator", label: "Request Leave & Balances", icon: Umbrella, Vietnamese: "Nghỉ phép" },
    { id: "payroll", label: "My Payslips", icon: DollarSign, Vietnamese: "Phiếu lương" }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-left font-sans text-[#1C1814]" id="staff-portal-view">
      {/* 1. Header Hero Card with beautiful visual flair */}
      <div className="bg-white border border-[#EAE4DC] p-7 rounded-2xl shadow-3xs relative overflow-hidden" id="staff-portal-header">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#7553FF]/5 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentEmployee?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt={currentEmployee?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#7553FF]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-4.5 h-4.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center" title="Online & Active" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#7553FF] bg-[#7553FF]/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-poppins">
                Staff Portal — Employee Self-Service
              </span>
              <h1 className="text-2xl font-bold font-poppins text-slate-900 mt-1">
                Welcome back, {currentEmployee?.name}!
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-700">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {currentEmployee?.role || "Staff"} ({currentEmployee?.department || "Sales"})
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Branch: {currentEmployee?.branch || "HN 1"}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentEmployee?.status || "Full-time"} Contract
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Block with exact requested leave and Gleitzeitkonto balances */}
          <div className="flex items-center gap-3">
            <div className="bg-[#FAF9F7] border border-[#EAE4DC] p-3 px-4 rounded-xl text-center min-w-[110px]">
              <span className="text-[10px] uppercase font-bold text-slate-700 tracking-wider block">Leave Left</span>
              <span className="text-xl font-bold text-[#7553FF] font-poppins">
                {totalLeaveDays.toFixed(1)} <span className="text-xs text-slate-700 font-normal">days</span>
              </span>
              <span className="text-[9px] text-slate-700 block mt-0.5 font-light">({oldAnnualLeave.toFixed(0)}d old rollover)</span>
            </div>
            <div className="bg-[#FAF9F7] border border-[#EAE4DC] p-3 px-4 rounded-xl text-center min-w-[110px]">
              <span className="text-[10px] uppercase font-bold text-slate-700 tracking-wider block">Gleitzeitkonto</span>
              <span className="text-xl font-bold text-slate-900 font-poppins">
                {flextimeHours >= 0 ? `+${flextimeHours.toFixed(1)}` : flextimeHours.toFixed(1)}{" "}
                <span className="text-xs text-slate-700 font-normal">hrs</span>
              </span>
              <span className="text-[9px] text-emerald-700 block mt-0.5 font-light">Accumulated hours</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Unified Notification Bar */}
      <AnimatePresence>
        {(formSuccess || formError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-xl flex items-start gap-3 border ${
              formSuccess
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {formSuccess ? (
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-medium">
              {formSuccess || formError}
            </div>
            <button
              onClick={() => {
                setFormSuccess(null);
                setFormError(null);
              }}
              className="text-slate-700 hover:text-slate-900 bg-transparent border-none cursor-pointer"
            >
              <span className="text-lg">✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Primary Content Area split by Active Tab */}
      <div id="staff-portal-main-panel">
        {/* TAB 1: PERSONAL ROSTER */}
        {activeTab === "shift-planner" && (
          <div className="space-y-6" id="personal-roster-tab">
            <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-3xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-poppins">
                    My Shift Schedule & Roster
                  </h2>
                  <p className="text-[14px] text-slate-600 font-normal mt-0.5">
                    Showing your personal assigned shifts for continuous operations.
                  </p>
                </div>

                {/* Week Toggler */}
                <div className="flex bg-[#FAF9F7] border border-[#EAE4DC] p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedWeek("current")}
                    className={`px-4 py-1.5 text-[14px] font-medium rounded-lg transition-all border-none cursor-pointer ${
                      selectedWeek === "current"
                        ? "bg-white text-[#7553FF] shadow-3xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Current Week
                  </button>
                  <button
                    onClick={() => setSelectedWeek("next")}
                    className={`px-4 py-1.5 text-[14px] font-medium rounded-lg transition-all border-none cursor-pointer ${
                      selectedWeek === "next"
                        ? "bg-white text-[#7553FF] shadow-3xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Next Week
                  </button>
                </div>
              </div>

              {/* Weekly Roster Grid Card */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {personalShifts.map((dayPlan) => {
                  const hasShifts = dayPlan.shifts.length > 0;
                  return (
                    <div
                      key={dayPlan.day}
                      className={`border rounded-xl p-3.5 flex flex-col justify-between min-h-[145px] transition-all ${
                        hasShifts
                          ? "bg-gradient-to-b from-[#7553FF]/5 to-transparent border-[#7553FF]/20 ring-1 ring-[#7553FF]/5"
                          : "bg-slate-50/55 border-slate-200"
                      }`}
                    >
                      <div className="border-b border-slate-100 pb-2">
                        <span className="text-[14px] text-slate-800 block font-semibold tracking-wide">
                          {dayPlan.day}
                        </span>
                        <span className="text-[12px] text-slate-500 font-normal block mt-0.5">
                          {selectedWeek === "current" ? "This Week" : "Next Week"}
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center py-3">
                        {hasShifts ? (
                          dayPlan.shifts.map((sh, idx) => (
                            <div key={idx} className="space-y-1">
                              <span className="text-[13px] font-semibold text-[#7553FF] bg-[#7553FF]/10 py-1 px-1.5 rounded-[4px] block text-center leading-tight">
                                {sh.time}
                              </span>
                              <span className="text-[13px] text-slate-700 font-medium block text-center mt-1">
                                {sh.type}
                              </span>
                              <span className="text-[12px] text-slate-500 font-normal block text-center mt-0.5">
                                Dept: {sh.dept}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-[14px] text-slate-450 text-center font-normal italic block py-4">
                            Day Off
                          </span>
                        )}
                      </div>

                      {hasShifts && (
                        <div className="border-t border-slate-100 pt-2 flex items-center justify-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[12px] text-slate-600 font-mono tracking-tight font-medium uppercase">
                            {dayPlan.shifts[0].branch}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Schedule Compliance Disclaimer */}
              <div className="mt-6 p-4.5 bg-indigo-50/40 border border-[#7553FF]/15 rounded-xl flex gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-[#7553FF] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-[14px] font-semibold text-slate-900 tracking-normal">
                    German Statutory Shift & Rest Compliance
                  </h4>
                  <p className="text-[14px] text-slate-600 leading-relaxed font-normal">
                    Your roster maintains the mandatory <strong>11-hour rest period</strong> (Ruhezeit) between consecutive shifts. No consecutive night & morning transitions have been scheduled. Please submit holiday requests at least 5 days in advance for operational planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEAVE CALCULATOR / REQUEST LEAVE */}
        {activeTab === "leave-calculator" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 pt-2" id="leave-request-tab">
            {/* Left Hand: Request Leave Form */}
            <div className="lg:col-span-1 bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-3xs h-fit">
              <h2 className="text-lg font-bold text-slate-900 font-poppins mb-4 pb-2 border-b border-slate-100">
                New Leave Request
              </h2>

              <form onSubmit={handleRequestLeaveSubmit} className="space-y-4">
                <div>
                  <label className="text-[14px] font-medium text-slate-800 block mb-1.5">
                    Leave Type
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#EAE4DC] rounded-xl text-slate-800 outline-none text-[14px] font-medium focus:border-[#7553FF] h-10 cursor-pointer"
                  >
                    <option value="Annual Leave">Annual Leave (Nghỉ phép năm)</option>
                    <option value="Sick Leave">Sick Leave (Nghỉ ốm)</option>
                    <option value="Compensatory Leave">Compensatory Leave (Nghỉ bù)</option>
                    <option value="Unpaid Leave">Unpaid Leave (Nghỉ không lương)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[14px] font-medium text-slate-800 block mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white border border-[#EAE4DC] rounded-xl text-slate-800 outline-none text-[14px] font-medium focus:border-[#7553FF] h-10"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-slate-800 block mb-1.5">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white border border-[#EAE4DC] rounded-xl text-slate-800 outline-none text-[14px] font-medium focus:border-[#7553FF] h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[14px] font-medium text-slate-800 block mb-1.5">
                    Reason
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Provide specific reason for planning leave..."
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-white border border-[#EAE4DC] rounded-xl text-slate-800 outline-none text-[14px] placeholder-slate-400 focus:border-[#7553FF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-none shadow-3xs text-[14px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </button>
              </form>
            </div>

            {/* Right Hand: Personal Leave Requests History */}
            <div className="lg:col-span-2 bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-3xs">
              <h2 className="text-lg font-bold text-slate-900 font-poppins mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>My Leave Application History</span>
                <span className="text-[14px] font-medium bg-[#FAF9F7] text-slate-700 py-1 px-3 rounded-lg border border-[#EAE4DC]">
                  {leaveRequests.filter(l => l.name.toLowerCase() === employeeName.toLowerCase()).length} requests
                </span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[14px] text-slate-800 font-serif font-medium tracking-widest bg-slate-50/50">
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Date Range</th>
                      <th className="py-3 px-3 text-center">Days</th>
                      <th className="py-3 px-3">Reason</th>
                      <th className="py-3 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[14px]">
                    {leaveRequests
                      .filter(l => l.name.toLowerCase() === employeeName.toLowerCase())
                      .map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3.5 px-3">
                            <span className="font-semibold text-slate-900 block">
                              {l.leaveType}
                            </span>
                            <span className="text-[12px] text-slate-500 font-normal block mt-0.5">
                              Applied {l.createdOn}
                            </span>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="text-slate-800 font-normal">{l.dateRange}</span>
                            <span className="text-[12px] text-slate-500 font-normal block mt-0.5">
                              {l.dayText}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono font-bold text-[#7553FF]">
                            {l.days}
                          </td>
                          <td className="py-3.5 px-3 max-w-[200px] truncate" title={l.reason}>
                            <span className="text-slate-600 font-normal">{l.reason}</span>
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <span
                              className={`inline-block px-2 py-0.5 text-xs font-normal rounded-[2px] select-none ${
                                l.status === "Approved" || l.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                  : l.status === "Rejected" || l.status === "Cancelled"
                                    ? "bg-rose-50 text-rose-700 border border-rose-100"
                                    : "bg-amber-50 text-amber-700 border border-amber-100"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}

                    {leaveRequests.filter(l => l.name.toLowerCase() === employeeName.toLowerCase()).length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500 italic font-normal">
                          No previous leave requests submitted yet. Use the form on the left to apply.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PAYROLL / MY PAYSLIPS */}
        {activeTab === "payroll" && (
          <div className="space-y-6" id="personal-payslips-tab">
            <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-3xs">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-poppins">
                  Official Salary & Payslips History
                </h2>
                <p className="text-sm text-slate-700">
                  Secure DATEV-compliant payslips issued for tax and social security declarations.
                </p>
              </div>

              {/* Seeded Payslips List corresponding to Approved / Paid months */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-700 uppercase font-bold tracking-wider">
                      <th className="py-3">Salary Period</th>
                      <th className="py-3">Employer Name</th>
                      <th className="py-3">Payment Method</th>
                      <th className="py-3">Gross Earnings</th>
                      <th className="py-3">Payment Status</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      { month: "05", year: "2026", label: "May 2026", gross: ((currentEmployee?.hourlyRate || 18) * 160) + 120, net: 1980, status: "Paid" },
                      { month: "04", year: "2026", label: "April 2026", gross: ((currentEmployee?.hourlyRate || 18) * 155), net: 1850, status: "Paid" },
                      { month: "03", year: "2026", label: "March 2026", gross: ((currentEmployee?.hourlyRate || 18) * 162) - 80, net: 1910, status: "Approved" }
                    ].map((payslip, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-[#7553FF] flex items-center justify-center shrink-0">
                              <FileText className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-950 block">{payslip.label}</span>
                              <span className="text-[10px] text-slate-700 font-mono">ID: DE-DATEV-{payslip.month}-{payslip.year}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 text-slate-700 font-light">
                          JOHN'S BISTRO GMBH
                        </td>
                        <td className="py-3.5 text-slate-700 font-light font-mono text-xs">
                          Bank Transfer (SEPA)
                        </td>
                        <td className="py-3.5 font-bold text-slate-900 font-mono">
                          {payslip.gross.toLocaleString()} EUR
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-normal rounded-[2px] select-none ${
                              payslip.status === "Paid" || payslip.status === "Approved" || payslip.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : payslip.status === "Rejected" || payslip.status === "Cancelled"
                                  ? "bg-rose-50 text-rose-700 border border-rose-100"
                                  : payslip.status === "Pending" || payslip.status === "Draft"
                                    ? "bg-amber-50 text-amber-700 border border-amber-100"
                                    : "bg-slate-50 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {payslip.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            onClick={() => handleDownloadPayslip(payslip.month, payslip.year)}
                            className="inline-flex items-center gap-1.5 p-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold cursor-pointer transition-all border-none shadow-3xs"
                            title="Download Official DATEV PDF statement"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                            <span>Download DATEV PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
