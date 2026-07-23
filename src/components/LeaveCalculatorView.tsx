import React, { useState, useEffect } from "react";
import {
  Umbrella,
  Activity,
  User,
  Clock,
  Calendar,
  Shield,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Check,
  MoreHorizontal,
  Filter,
  Upload,
  ArrowUpRight,
  Sliders,
  ChevronDown,
  Search,
  Award,
  History,
  Store,
  Sparkles,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "./DatePicker";

// Pre-seeded beautiful Unsplash avatars matching the staff members
const avatars: Record<string, string> = {
  "Le Chi": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  "Tran Binh": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "Pham Dung": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "Hoang Em": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  "Vu Giang": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
  "Phan Linh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "Dang Khoa": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face",
  "Bui Thuy": "https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&h=100&fit=crop&crop=face",
  "Nguyen An": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  "Doan Trang": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
  "Tran Long": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
  "Vo Hoang": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
  "Ngo Quynh": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100"
};

const nameColors: Record<string, string> = {
  "Le Chi": "bg-rose-100 text-rose-700",
  "Tran Binh": "bg-blue-100 text-blue-700",
  "Pham Dung": "bg-amber-100 text-amber-700",
  "Hoang Em": "bg-purple-100 text-purple-700",
  "Vu Giang": "bg-indigo-100 text-indigo-700",
  "Phan Linh": "bg-emerald-100 text-emerald-700",
  "Dang Khoa": "bg-cyan-100 text-cyan-700",
  "Bui Thuy": "bg-teal-100 text-teal-700",
  "Nguyen An": "bg-slate-100 text-slate-700",
  "Doan Trang": "bg-pink-100 text-pink-700",
  "Tran Long": "bg-orange-100 text-orange-700",
  "Vo Hoang": "bg-sky-100 text-sky-700",
  "Ngo Quynh": "bg-violet-100 text-violet-700"
};

export default function LeaveCalculatorView({
  staff = [],
  setStaff,
  simulatedUser
}: {
  staff?: any[];
  setStaff?: React.Dispatch<React.SetStateAction<any[]>>;
  simulatedUser?: any;
}) {
  // Tabs: 'leave' for Leave Requests, 'flextime' for Flextime, 'balances' for Balances Grid
  const [activeSubTab, setActiveSubTab] = useState<"leave" | "flextime" | "balances">("leave");

  // Custom simulation role for testing PRD branch hiding and authorization constraints
  const [simulationRole, setSimulationRole] = useState<string>("super-admin");

  // Synchronize simulationRole with simulatedUser prop
  React.useEffect(() => {
    if (simulatedUser) {
      const roleName = simulatedUser.role || 'Staff';
      if (roleName.toLowerCase() === 'owner' || simulatedUser.systemAccessLevel === 'Admin') {
        setSimulationRole('super-admin');
        return;
      }

      // Check custom roles dataScope
      let isBrandWide = false;
      try {
        const customRolesStr = localStorage.getItem('gastro_custom_roles');
        if (customRolesStr) {
          const customRoles = JSON.parse(customRolesStr);
          const matched = customRoles.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
          if (matched && matched.dataScope === 'Brand-wide') {
            isBrandWide = true;
          }
        }
      } catch (e) {
        console.error(e);
      }

      if (isBrandWide) {
        setSimulationRole('super-admin');
      } else if (roleName.toLowerCase() === 'manager') {
        const primaryBranch = simulatedUser.assignedStores?.[0] || simulatedUser.branch || 'HCM 1';
        if (primaryBranch.toLowerCase().includes('hcm 2') || primaryBranch.toLowerCase() === 'hcm2') {
          setSimulationRole('manager-hcm2');
        } else {
          setSimulationRole('manager-hcm1');
        }
      } else {
        setSimulationRole('employee-lechi');
      }
    }
  }, [simulatedUser]);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [deptFilter, setDeptFilter] = useState("All Job Roles");
  const [dateRangeFilter, setDateRangeFilter] = useState("All Date Ranges");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modals Toggles
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Success and Error Alert Banners to demonstrate PRD Business Rules
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [showExportToast, setShowExportToast] = useState(false);

  // Brand Rollover configurations according to PRD Section 2
  const [allowVacationRollover, setAllowVacationRollover] = useState<"Yes" | "No" | any>(() => {
    return localStorage.getItem('gastro_allow_vacation_rollover') || "Yes";
  });
  const [vacationRolloverExpiryDate, setVacationRolloverExpiryDate] = useState<string>(() => {
    const raw = localStorage.getItem('gastro_vacation_rollover_expiry_date');
    if (raw === '31/03') return 'March 31';
    if (raw === '30/06') return 'June 30';
    return raw || 'March 31';
  });
  const [vacationRolloverRemainderAction, setVacationRolloverRemainderAction] = useState<"Expire" | "Convert to Flextime" | any>(() => {
    return localStorage.getItem('gastro_vacation_rollover_remainder_action') || "Expire";
  });

  const [simulationResult, setSimulationResult] = useState<Array<{ name: string; oldAnnualBefore: number; action: string; fwhaAdd: number }> | null>(null);

  // Sync back changes to localStorage
  React.useEffect(() => {
    localStorage.setItem('gastro_allow_vacation_rollover', allowVacationRollover);
  }, [allowVacationRollover]);

  React.useEffect(() => {
    const mapped = vacationRolloverExpiryDate === 'March 31' ? '31/03' : (vacationRolloverExpiryDate === 'June 30' ? '30/06' : 'Never');
    localStorage.setItem('gastro_vacation_rollover_expiry_date', mapped);
  }, [vacationRolloverExpiryDate]);

  React.useEffect(() => {
    localStorage.setItem('gastro_vacation_rollover_remainder_action', vacationRolloverRemainderAction);
  }, [vacationRolloverRemainderAction]);

  const runExpirySimulation = () => {
    const results: Array<{ name: string; oldAnnualBefore: number; action: string; fwhaAdd: number }> = [];

    // Calculate results first using the derived employeeBalances
    Object.entries(employeeBalances).forEach(([name, balObj]) => {
      const bal = balObj as { annual: number; oldAnnual: number; sick: number; personal: number; fwha: number; assignedBranch: string };
      if (bal.oldAnnual > 0) {
        const oldVal = bal.oldAnnual;
        let action = "Expired";
        let fwhaAdd = 0;

        if (vacationRolloverRemainderAction === "Convert to Flextime") {
          fwhaAdd = oldVal * 8.0;
          action = "Converted to Flextime";
        }

        results.push({ name, oldAnnualBefore: oldVal, action, fwhaAdd });
      }
    });

    if (results.length > 0) {
      if (setStaff) {
        setStaff(prevStaff => {
          return prevStaff.map(s => {
            const bal = employeeBalances[s.name];
            if (bal && bal.oldAnnual > 0) {
              const oldVal = bal.oldAnnual;
              let fwhaAdd = 0;
              let newFwha = bal.fwha;

              if (vacationRolloverRemainderAction === "Convert to Flextime") {
                fwhaAdd = oldVal * 8.0;
                newFwha = parseFloat((bal.fwha + fwhaAdd).toFixed(1));
              }

              return {
                ...s,
                oldAnnual: 0,
                fwhaBalance: newFwha,
                annualLeaveEntitlement: s.annualLeaveEntitlement !== undefined ? s.annualLeaveEntitlement : bal.annual,
                sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : bal.sick,
                personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : bal.personal,
              };
            }
            return s;
          });
        });
      }
      setSimulationResult(results);
      setSuccessBanner(`Rollover Expiry Simulated Successfully! ${results.length} employee(s) carryover leave processed.`);
    } else {
      setSimulationResult([]);
      setSuccessBanner("Rollover Expiry Simulated Successfully! However, no employees have outstanding previous year rollover vacation. No actions were taken.");
    }
  };

  // Derive employeeBalances from staff state to avoid synchronization loops
  const employeeBalances = React.useMemo(() => {
    const initialBalances: Record<string, {
      annual: number;
      oldAnnual: number;
      sick: number;
      personal: number;
      fwha: number;
      assignedBranch: string;
    }> = {
      "Le Chi": { annual: 18.5, oldAnnual: 5.0, sick: 7.0, personal: 5.0, fwha: 5.0, assignedBranch: "HN 1" },
      "Tran Binh": { annual: 12.0, oldAnnual: 2.0, sick: 4.0, personal: 3.0, fwha: 12.0, assignedBranch: "HQ" },
      "Pham Dung": { annual: 10.0, oldAnnual: 0.0, sick: 5.0, personal: 2.0, fwha: 0.0, assignedBranch: "HCM 2" },
      "Hoang Em": { annual: 15.0, oldAnnual: 3.0, sick: 6.0, personal: 4.0, fwha: 8.0, assignedBranch: "HCM 1" },
      "Vu Giang": { annual: 8.0, oldAnnual: 1.0, sick: 3.0, personal: 2.0, fwha: 4.5, assignedBranch: "HCM 2" },
      "Phan Linh": { annual: 14.0, oldAnnual: 4.0, sick: 5.5, personal: 3.0, fwha: 2.5, assignedBranch: "HCM 1" },
      "Dang Khoa": { annual: 20.0, oldAnnual: 0.0, sick: 8.0, personal: 6.0, fwha: 10.0, assignedBranch: "HCM 1" },
      "Bui Thuy": { annual: 16.0, oldAnnual: 6.0, sick: 7.0, personal: 4.0, fwha: 6.0, assignedBranch: "HQ" },
      "Nguyen An": { annual: 24.0, oldAnnual: 3.5, sick: 10.0, personal: 8.0, fwha: 1.5, assignedBranch: "HCM 1" },
      "Doan Trang": { annual: 22.0, oldAnnual: 2.0, sick: 9.0, personal: 5.0, fwha: 3.0, assignedBranch: "HQ" },
      "Tran Long": { annual: 14.0, oldAnnual: 0.0, sick: 5.0, personal: 2.0, fwha: 1.0, assignedBranch: "HN 1" },
      "Vo Hoang": { annual: 18.0, oldAnnual: 4.0, sick: 7.0, personal: 4.0, fwha: 5.5, assignedBranch: "HCM 1" },
      "Ngo Quynh": { annual: 12.0, oldAnnual: 1.0, sick: 4.0, personal: 3.0, fwha: 0.0, assignedBranch: "HCM 1" },
    };

    if (staff && staff.length > 0) {
      staff.forEach(s => {
        const name = s.name;
        initialBalances[name] = {
          annual: s.annualLeaveEntitlement !== undefined ? s.annualLeaveEntitlement : (initialBalances[name]?.annual ?? 24),
          oldAnnual: s.oldAnnual !== undefined ? s.oldAnnual : (initialBalances[name]?.oldAnnual ?? 0),
          sick: s.sickLeaves !== undefined ? s.sickLeaves : (initialBalances[name]?.sick ?? 10),
          personal: s.personalLeaves !== undefined ? s.personalLeaves : (initialBalances[name]?.personal ?? 5),
          fwha: s.fwhaBalance !== undefined ? s.fwhaBalance : (initialBalances[name]?.fwha ?? 0),
          assignedBranch: s.branch || (initialBalances[name]?.assignedBranch || "HCM 1")
        };
      });
    }

    return initialBalances;
  }, [staff]);

  // End of year leave conversion admin tool states
  const [convertName, setConvertName] = useState("Le Chi");

  // Flextime Dataset matching the mockup and incorporating PRD attributes
  const [flextimeList, setFlextimeList] = useState<any[]>([
    {
      id: "flex-1",
      name: "Le Chi",
      department: "Sales",
      flextimeType: "Flexible Hours",
      schedule: "Core Hours: 10:00 AM – 3:00 PM",
      scheduleDetails: "Flexible: Before 10:00 AM / After 3:00 PM",
      dateRange: "May 13 – Jun 13, 2024",
      days: "Mon - Fri",
      branch: "HN 1",
      status: "Active",
      createdOn: "May 10, 2024",
      createdTime: "10:30 AM",
    },
    {
      id: "flex-2",
      name: "Tran Binh",
      department: "HR",
      flextimeType: "Compressed Workweek",
      schedule: "4 days / week (Compressed Workweek)",
      scheduleDetails: "Working days: Mon – Thu (9:00 AM – 6:00 PM). Friday is marked as Flextime Day Off.",
      dateRange: "May 13 – Aug 11, 2024",
      days: "Mon - Thu",
      branch: "HQ",
      status: "Active",
      createdOn: "May 12, 2024",
      createdTime: "09:15 AM",
    },
    {
      id: "flex-3",
      name: "Pham Dung",
      department: "Operation",
      flextimeType: "Flexible Days",
      schedule: "Choose up to 2 remote days / week",
      scheduleDetails: "With manager approval",
      dateRange: "May 20 – Aug 20, 2024",
      days: "Mon - Fri",
      branch: "HCM 2",
      status: "Pending",
      createdOn: "May 11, 2024",
      createdTime: "04:20 PM",
    },
    {
      id: "flex-4",
      name: "Hoang Em",
      department: "Kitchen",
      flextimeType: "Compressed Workweek",
      schedule: "4 days / week",
      scheduleDetails: "Tue – Fri (9:00 AM – 6:00 PM)",
      dateRange: "Jun 1 – Aug 31, 2024",
      days: "Tue - Fri",
      branch: "HCM 1",
      status: "Active",
      createdOn: "May 9, 2024",
      createdTime: "02:45 PM",
    },
    {
      id: "flex-5",
      name: "Vu Giang",
      department: "Bar",
      flextimeType: "Flexible Hours",
      schedule: "Core Hours: 11:00 AM – 4:00 PM",
      scheduleDetails: "Flexible: Before 11:00 AM / After 4:00 PM",
      dateRange: "May 5 – Jun 5, 2024",
      days: "Mon - Fri",
      branch: "HCM 2",
      status: "Ended",
      createdOn: "May 5, 2024",
      createdTime: "11:05 AM",
    },
    {
      id: "flex-6",
      name: "Phan Linh",
      department: "Service",
      flextimeType: "Flexible Days",
      schedule: "Choose up to 1 remote day / week",
      scheduleDetails: "With manager approval",
      dateRange: "May 15 – Aug 15, 2024",
      days: "Mon - Fri",
      branch: "HCM 1",
      status: "Active",
      createdOn: "May 12, 2024",
      createdTime: "03:30 PM",
    },
  ]);

  // Leave Requests dataset incorporating branch and compensatory hourly data
  const [leaveRequestsList, setLeaveRequestsList] = useState<any[]>(() => {
    const cached = localStorage.getItem("gastro_leave_requests_shared");
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
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
    },
    {
      id: "leave-rec-4",
      name: "Hoang Em",
      department: "Kitchen",
      leaveType: "Personal Leave",
      reason: "Personal matters",
      dateRange: "May 18 – May 18, 2024",
      days: 1,
      dayText: "(Sat)",
      branch: "HCM 1",
      status: "Approved",
      createdOn: "May 9, 2024",
      createdTime: "02:45 PM",
    },
    {
      id: "leave-rec-5",
      name: "Vu Giang",
      department: "Bar",
      leaveType: "Unpaid Leave",
      reason: "Backpacking Trip",
      dateRange: "Jun 3 – Jun 5, 2024",
      days: 3,
      dayText: "(Mon – Wed)",
      branch: "HCM 2",
      status: "Rejected",
      createdOn: "May 8, 2024",
      createdTime: "11:05 AM",
    },
    {
      id: "leave-rec-6",
      name: "Phan Linh",
      department: "Service",
      leaveType: "Compensatory Leave",
      reason: "Off early for dentist appointment",
      dateRange: "May 22, 2024",
      days: 0.25,
      dayText: "(2.0 hours deducted from FWHA)",
      hours: 2.0,
      isCompensatoryByHours: true,
      branch: "HCM 1",
      status: "Approved",
      createdOn: "May 12, 2024",
      createdTime: "03:30 PM",
    },
    {
      id: "leave-rec-7",
      name: "Nguyen An",
      department: "Operation",
      leaveType: "Compensatory Leave",
      reason: "Full day compensatory rest",
      dateRange: "Jun 1, 2024",
      days: 1.0,
      dayText: "(8.0 hours compensatory rest)",
      hours: 8.0,
      isCompensatoryByHours: false,
      branch: "HCM 1",
      status: "Pending",
      createdOn: "May 25, 2024",
      createdTime: "01:25 PM",
    }
  ];
  });

  useEffect(() => {
    localStorage.setItem("gastro_leave_requests_shared", JSON.stringify(leaveRequestsList));
  }, [leaveRequestsList]);

  // New request form states
  const [newReqName, setNewReqName] = useState("Le Chi");
  const [newReqDept, setNewReqDept] = useState("Sales");
  const [newReqType, setNewReqType] = useState("Annual Leave");
  const [newReqBranch, setNewReqBranch] = useState("HN 1");
  const [newReqReason, setNewReqReason] = useState("");
  const [newReqStartDate, setNewReqStartDate] = useState("2024-06-25");
  const [newReqEndDate, setNewReqEndDate] = useState("2024-06-28");

  // New Compensatory Leave fields (Nghỉ bù)
  const [isCompensatoryByHours, setIsCompensatoryByHours] = useState(false);
  const [compensatoryHoursInput, setCompensatoryHoursInput] = useState(2.0);

  // New Flextime schedule fields
  const [newScheduleType, setNewScheduleType] = useState("Flexible Hours");
  const [newFlexSchedule, setNewFlexSchedule] = useState("Core Hours: 10:00 AM – 3:00 PM");
  const [newFlexDays, setNewFlexDays] = useState("Mon - Fri");

  // 1. DETERMINE ACCESS CONTROL AND BRANCH RESTRICTIONS BASED ON ACTIVE ROLE
  const allowedBranches = (() => {
    if (simulationRole === "super-admin") {
      return ["HN 1", "HQ", "HCM 1", "HCM 2"];
    } else if (simulationRole === "manager-hcm1") {
      return ["HCM 1"];
    } else if (simulationRole === "manager-hcm2") {
      return ["HCM 2"];
    } else if (simulationRole === "employee-lechi") {
      return ["HN 1"];
    }
    return [];
  })();

  const isSimulatedAdminOrManager = simulationRole === "super-admin" || simulationRole.startsWith("manager-");

  // Filter lists based on Search, Status, Type, Dept, AND Allowed Branches for the role
  const activeDataset = activeSubTab === "leave" ? leaveRequestsList : flextimeList;

  const filteredData = activeDataset.filter((item) => {
    // Branch Access Constraint
    const isSelf = simulationRole === "employee-lechi" && item.name === "Le Chi";
    const isInBranch = allowedBranches.includes(item.branch);
    if (simulationRole === "employee-lechi" && !isSelf) {
      return false; // Regular employees can only see their own requests
    }
    if (simulationRole !== "employee-lechi" && !isInBranch) {
      return false; // Managers are restricted to their assigned stores
    }

    // Search Query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status Filter
    let matchesStatus = true;
    if (statusFilter !== "All Status") {
      matchesStatus = item.status.toLowerCase() === statusFilter.toLowerCase();
    }

    // Type Filter
    let matchesType = true;
    if (typeFilter !== "All Types") {
      if (activeSubTab === "leave") {
        matchesType = item.leaveType.toLowerCase() === typeFilter.toLowerCase();
      } else {
        matchesType = item.flextimeType.toLowerCase() === typeFilter.toLowerCase();
      }
    }

    // Department Filter
    let matchesDept = true;
    if (deptFilter !== "All Job Roles") {
      matchesDept = item.department.toLowerCase() === deptFilter.toLowerCase();
    }

    return matchesSearch && matchesStatus && matchesType && matchesDept;
  });

  // Pagination Helper
  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Recalculating dynamic metrics
  const approvedCount = leaveRequestsList.filter(l => l.status === "Approved" && (simulationRole === "super-admin" || allowedBranches.includes(l.branch))).length;
  const pendingCount = leaveRequestsList.filter(l => l.status === "Pending" && (simulationRole === "super-admin" || allowedBranches.includes(l.branch))).length;
  const rejectedCount = leaveRequestsList.filter(l => l.status === "Rejected" && (simulationRole === "super-admin" || allowedBranches.includes(l.branch))).length;

  const totalCalculatedLeaveBalance = (() => {
    if (simulationRole === "employee-lechi") {
      const bal = employeeBalances["Le Chi"];
      return bal.annual + (allowVacationRollover === "Yes" ? bal.oldAnnual : 0);
    }
    // Sum for all visible employees
    return (Object.entries(employeeBalances) as [string, any][])
      .filter(([name, data]) => simulationRole === "super-admin" || allowedBranches.includes(data.assignedBranch))
      .reduce((sum, [name, data]) => sum + data.annual + (allowVacationRollover === "Yes" ? data.oldAnnual : 0), 0);
  })();

  const handleActionClick = (menuId: string) => {
    setActiveActionMenuId(activeActionMenuId === menuId ? null : menuId);
  };

  // 2. HARD BUSINESS RULES FOR LEAVE APPROVAL & REFUND DEDUCTIONS
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setErrorBanner(null);
    setSuccessBanner(null);

    // Safety checks for role permissions
    if (!isSimulatedAdminOrManager) {
      setErrorBanner("Action blocked: Only authorized Managers or Admins can approve or decline leave requests.");
      setActiveActionMenuId(null);
      return;
    }

    if (activeSubTab === "leave") {
      const req = leaveRequestsList.find(item => item.id === id);
      if (!req) return;

      // Restrict Managers from modifying other branch data
      if (simulationRole !== "super-admin" && !allowedBranches.includes(req.branch)) {
        setErrorBanner(`Action blocked: You only have permission to approve requests for staff in your assigned branch (${allowedBranches.join(", ")}).`);
        setActiveActionMenuId(null);
        return;
      }

      const staffName = req.name;
      const balances = employeeBalances[staffName];

      if (newStatus === "Approved") {
        // SCENARIO 5: Check Compensatory Leave against FWHA / Gleitzeitkonto
        if (req.leaveType === "Compensatory Leave") {
          const hoursRequested = req.isCompensatoryByHours ? (req.hours || 0) : 8.0;
          if (!balances || balances.fwha < hoursRequested) {
            setErrorBanner(`Cannot approve compensatory rest. Available accrued hours (${balances ? balances.fwha.toFixed(1) : "0.0"} hours) for ${staffName} are insufficient for this request (${hoursRequested.toFixed(1)} hours).`);
            setActiveActionMenuId(null);
            return;
          }

          // Deduct hours from FWHA
          if (setStaff) {
            setStaff(prevStaff => prevStaff.map(s => {
              if (s.name === staffName) {
                const currentFwha = s.fwhaBalance !== undefined ? s.fwhaBalance : balances.fwha;
                return {
                  ...s,
                  fwhaBalance: parseFloat((currentFwha - hoursRequested).toFixed(1)),
                  annualLeaveEntitlement: s.annualLeaveEntitlement !== undefined ? s.annualLeaveEntitlement : balances.annual,
                  oldAnnual: s.oldAnnual !== undefined ? s.oldAnnual : balances.oldAnnual,
                  sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : balances.sick,
                  personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : balances.personal,
                };
              }
              return s;
            }));
          }
          setSuccessBanner(`Approved compensatory leave for ${staffName}. Deducted ${hoursRequested.toFixed(1)} hours from their accrued FWHA balance.`);
          
          // Emit Mock Event to Shift Planner
          console.log("leave.approved event sent for compensatory rest:", { staff: staffName, hours: hoursRequested });

        } else if (req.leaveType !== "Unpaid Leave") {
          // SCENARIO 2: Check limits on standard vacations
          const daysRequested = req.days;
          const totalAvailable = balances.annual + (allowVacationRollover === "Yes" ? balances.oldAnnual : 0);

          if (totalAvailable < daysRequested) {
            setErrorBanner(`Cannot approve leave request. Available leave balance (${totalAvailable.toFixed(1)} days) for the employee is insufficient for this request (${daysRequested.toFixed(1)} days).`);
            setActiveActionMenuId(null);
            return;
          }

          // Deduct from Rollover first, then yearly entitlement
          let remainingDeduct = daysRequested;
          let newOldAnnual = balances.oldAnnual;
          let newAnnual = balances.annual;

          if (allowVacationRollover === "Yes" && newOldAnnual > 0) {
            if (newOldAnnual >= remainingDeduct) {
              newOldAnnual -= remainingDeduct;
              remainingDeduct = 0;
            } else {
              remainingDeduct -= newOldAnnual;
              newOldAnnual = 0;
            }
          }

          newAnnual -= remainingDeduct;

          if (setStaff) {
            setStaff(prevStaff => prevStaff.map(s => {
              if (s.name === staffName) {
                return {
                  ...s,
                  oldAnnual: newOldAnnual,
                  annualLeaveEntitlement: newAnnual,
                  sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : balances.sick,
                  personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : balances.personal,
                  fwhaBalance: s.fwhaBalance !== undefined ? s.fwhaBalance : balances.fwha,
                };
              }
              return s;
            }));
          }

          setSuccessBanner(`Approved leave request (${req.leaveType}) for ${staffName}. Successfully deducted ${daysRequested} leave days.`);
          
          // Emit event leave.approved for Shift Planner integration
          const eventDetails = { event: "leave.approved", staffName, startDate: req.dateRange };
          console.log("Emitting event up to Event Broker:", eventDetails);
        } else {
          // Unpaid leave - always approve
          setSuccessBanner(`Successfully approved unpaid leave request for ${staffName} (No balance deduction).`);
        }
      } 
      
      // SCENARIO 6: Cancellation refunding logic
      else if (newStatus === "Cancelled" && req.status === "Approved") {
        if (req.leaveType === "Compensatory Leave") {
          const hoursRequested = req.isCompensatoryByHours ? (req.hours || 0) : 8.0;
          if (setStaff) {
            setStaff(prevStaff => prevStaff.map(s => {
              if (s.name === staffName) {
                const currentFwha = s.fwhaBalance !== undefined ? s.fwhaBalance : (balances?.fwha ?? 0);
                return {
                  ...s,
                  fwhaBalance: parseFloat((currentFwha + hoursRequested).toFixed(1)),
                  annualLeaveEntitlement: s.annualLeaveEntitlement !== undefined ? s.annualLeaveEntitlement : (balances?.annual ?? 24),
                  oldAnnual: s.oldAnnual !== undefined ? s.oldAnnual : (balances?.oldAnnual ?? 0),
                  sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : (balances?.sick ?? 10),
                  personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : (balances?.personal ?? 5),
                };
              }
              return s;
            }));
          }
          setSuccessBanner(`Cancelled compensatory leave for ${staffName}. Refunded ${hoursRequested.toFixed(1)} hours back to their FWHA account.`);
        } else if (req.leaveType !== "Unpaid Leave") {
          const daysRequested = req.days;
          // Refund to annual entitlement
          if (setStaff) {
            setStaff(prevStaff => prevStaff.map(s => {
              if (s.name === staffName) {
                const currentAnnual = s.annualLeaveEntitlement !== undefined ? s.annualLeaveEntitlement : (balances?.annual ?? 24);
                return {
                  ...s,
                  annualLeaveEntitlement: parseFloat((currentAnnual + daysRequested).toFixed(1)),
                  oldAnnual: s.oldAnnual !== undefined ? s.oldAnnual : (balances?.oldAnnual ?? 0),
                  sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : (balances?.sick ?? 10),
                  personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : (balances?.personal ?? 5),
                  fwhaBalance: s.fwhaBalance !== undefined ? s.fwhaBalance : (balances?.fwha ?? 0),
                };
              }
              return s;
            }));
          }
          setSuccessBanner(`Cancelled leave request for ${staffName}. Refunded ${daysRequested} leave days back to their available balance.`);
        } else {
          setSuccessBanner(`Cancelled approved unpaid leave for ${staffName}.`);
        }
      }

      setLeaveRequestsList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } else {
      setFlextimeList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      setSuccessBanner(`Successfully updated flextime schedule status to ${newStatus}.`);
    }
    setActiveActionMenuId(null);
  };

  const handleDeleteItem = (id: string) => {
    setErrorBanner(null);
    setSuccessBanner(null);

    if (!isSimulatedAdminOrManager) {
      setErrorBanner("Cannot delete: You do not have Manager or Admin privileges.");
      return;
    }

    if (activeSubTab === "leave") {
      setLeaveRequestsList(prev => prev.filter(item => item.id !== id));
    } else {
      setFlextimeList(prev => prev.filter(item => item.id !== id));
    }
    setActiveActionMenuId(null);
    setSuccessBanner("Successfully deleted record permanently.");
  };

  // 3. MANUAL LEAVE-TO-FLEXTIME CONVERTER (Quy đổi phép năm thừa)
  const handleManualConversion = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    setSuccessBanner(null);

    if (simulationRole !== "super-admin") {
      setErrorBanner("Excess leave conversion is only available for Super Admin role.");
      return;
    }

    const currentBal = employeeBalances[convertName];
    if (!currentBal || currentBal.annual <= 0) {
      setErrorBanner(`Cannot convert: ${convertName} has no remaining annual leave days available to convert.`);
      return;
    }

    const daysToConvert = currentBal.annual;
    const hoursCredited = daysToConvert * 8.0;

    if (setStaff) {
      setStaff(prevStaff => prevStaff.map(s => {
        if (s.name === convertName) {
          const balances = employeeBalances[convertName];
          const currentFwha = s.fwhaBalance !== undefined ? s.fwhaBalance : (balances?.fwha ?? 0);
          return {
            ...s,
            annualLeaveEntitlement: 0,
            fwhaBalance: parseFloat((currentFwha + hoursCredited).toFixed(1)),
            oldAnnual: s.oldAnnual !== undefined ? s.oldAnnual : (balances?.oldAnnual ?? 0),
            sickLeaves: s.sickLeaves !== undefined ? s.sickLeaves : (balances?.sick ?? 10),
            personalLeaves: s.personalLeaves !== undefined ? s.personalLeaves : (balances?.personal ?? 5),
          };
        }
        return s;
      }));
    }

    setSuccessBanner(`Success: Converted all ${daysToConvert.toFixed(1)} excess leave days of ${convertName} to ${hoursCredited.toFixed(1)} accrued hours at a rate of 1 day = 8.0 working hours.`);
  };

  // Submit new request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    setSuccessBanner(null);

    // Get assigned branch of employee being requested
    const empBranch = employeeBalances[newReqName]?.assignedBranch || "HN 1";

    if (activeSubTab === "leave") {
      let daysComputed = Math.max(1, Math.round((new Date(newReqEndDate).getTime() - new Date(newReqStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1);
      let dayText = `(${new Date(newReqStartDate).toLocaleDateString('en-US', { weekday: 'short' })} – ${new Date(newReqEndDate).toLocaleDateString('en-US', { weekday: 'short' })})`;
      let hoursRequested = daysComputed * 8.0;

      if (newReqType === "Compensatory Leave") {
        if (isCompensatoryByHours) {
          daysComputed = compensatoryHoursInput / 8.0;
          dayText = `(${compensatoryHoursInput.toFixed(1)} hours compensatory rest)`;
          hoursRequested = compensatoryHoursInput;
        } else {
          daysComputed = 1.0;
          dayText = `(8.0 hours compensatory rest)`;
          hoursRequested = 8.0;
        }
      }

      const formattedDateRange = `${new Date(newReqStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(newReqEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      
      const newLeave: any = {
        id: `leave-${Date.now()}`,
        name: newReqName,
        department: newReqDept,
        leaveType: newReqType,
        reason: newReqReason || "Submitted leave request",
        dateRange: formattedDateRange,
        days: daysComputed,
        dayText,
        hours: hoursRequested,
        isCompensatoryByHours: newReqType === "Compensatory Leave" ? isCompensatoryByHours : false,
        branch: empBranch,
        status: "Pending",
        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      setLeaveRequestsList(prev => [newLeave, ...prev]);
      setSuccessBanner(`Leave request for ${newReqName} has been successfully submitted under pending approval at branch ${empBranch}.`);
    } else {
      const formattedDateRange = `${new Date(newReqStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(newReqEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      const newFlex: any = {
        id: `flex-${Date.now()}`,
        name: newReqName,
        department: newReqDept,
        flextimeType: newScheduleType,
        schedule: newFlexSchedule,
        scheduleDetails: newScheduleType === "Flexible Hours" ? "Flexible arrangement around core times" : "Manager verified schedule",
        dateRange: formattedDateRange,
        days: newFlexDays,
        branch: empBranch,
        status: "Pending",
        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setFlextimeList(prev => [newFlex, ...prev]);
      setSuccessBanner(`Flextime arrangement for ${newReqName} has been saved successfully.`);
    }

    setIsNewRequestModalOpen(false);
    setNewReqReason("");
  };

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-2">
      
      {/* 1. DYNAMIC ACTION TOAST */}
      <AnimatePresence>
        {showExportToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#15803D] text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-[14px] font-medium"
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>Successfully exported leave and flextime records sheet (Excel/CSV)!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC SIMULATION BAR (PRD COMPLIANCE TOOL) */}
      <div className="bg-[#FAF9F7]/95 border border-slate-200/60 rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-3xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7553FF]/10 flex items-center justify-center text-[#7553FF] shrink-0 border border-[#7553FF]/20">
            <Shield className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="text-[14px] font-medium text-slate-800">PRD-004 Sandbox Simulation Controller</h4>
            <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
              Role simulation sandbox to test Store Manager permissions and branch security filters.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-slate-700 font-medium">Simulated Role:</span>
          <select
            value={simulationRole}
            onChange={(e) => {
              setSimulationRole(e.target.value);
              setCurrentPage(1);
              setErrorBanner(null);
              setSuccessBanner(null);
            }}
            className="pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl outline-none text-[13px] font-medium text-slate-800 focus:border-[#7553FF] cursor-pointer shadow-3xs"
          >
            <option value="super-admin">Super Admin (All branches)</option>
            <option value="manager-hcm1">Nguyen An (Store Manager - HCM 1)</option>
            <option value="manager-hcm2">Pham Dung (Store Manager - HCM 2)</option>
            <option value="employee-lechi">Le Chi (Employee - HN 1)</option>
          </select>
        </div>
      </div>

      {/* 3. LEAVE ALERTS AND NOTIFICATIONS FOR SCRIPTS AND SCENARIOS */}
      {errorBanner && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 border-l-4 border-rose-500 text-rose-800 p-4 rounded-xl flex items-start gap-3 text-left shadow-3xs"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-[14px]">
            <p className="font-medium">Action Blocked / Business Rule Error</p>
            <p className="mt-0.5 text-rose-700 leading-snug font-medium">{errorBanner}</p>
          </div>
        </motion.div>
      )}

      {successBanner && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 rounded-xl flex items-start gap-3 text-left shadow-3xs"
        >
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-[14px]">
            <p className="font-medium">Success Record</p>
            <p className="mt-0.5 text-emerald-700 leading-snug font-medium">{successBanner}</p>
          </div>
        </motion.div>
      )}

      {/* 4. MAIN TITLE & HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 text-left border-b border-b-slate-100">
        <div className="space-y-1">
          <h1 className="text-3xl font-medium tracking-tight text-slate-800 font-display">
            Leave & Flextime Manager
          </h1>
          <p className="text-[14px] text-slate-700 font-sans mt-0.5 leading-relaxed flex items-center gap-1.5">
            <Store className="w-4 h-4 text-[#7553FF]" />
            <span>
              {simulationRole === "super-admin" && "Global Admin Privileges — Full control and approvals."}
              {simulationRole === "manager-hcm1" && "Scope: Store HCM 1. Showing and operating staff from HCM 1 only."}
              {simulationRole === "manager-hcm2" && "Scope: Store HCM 2. Showing and operating staff from HCM 2 only."}
              {simulationRole === "employee-lechi" && "Employee Scope: Le Chi (HN 1) — Showing personal requests only."}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 text-[14px] font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
          >
            <Upload className="w-4 h-4 text-slate-750" />
            Export Data
          </button>
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="px-4 py-2 text-[14px] font-medium text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shadow-[#7553FF]/20"
          >
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </div>
      </div>

      {/* 5. KPI METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Dynamic Total Balance */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs flex items-center gap-4 text-left hover:shadow-2xs transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7553FF] shrink-0 border border-purple-100">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-700  tracking-wider">Total Available Balance</p>
            <p className="text-3xl font-medium text-[#15803D] mt-0.5 font-display">{totalCalculatedLeaveBalance.toFixed(1)}</p>
            <p className="text-xs text-slate-700 font-sans mt-0.5">Available days shown</p>
          </div>
        </div>

        {/* Approved Count */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs flex items-center gap-4 text-left hover:shadow-2xs transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#15803D] shrink-0 border border-emerald-100">
            <Send className="w-5 h-5 -rotate-45 text-[#15803D]" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-700  tracking-wider">Approved Requests</p>
            <p className="text-3xl font-medium text-slate-800 mt-0.5 font-display">{approvedCount}</p>
            <p className="text-xs text-slate-700 font-sans mt-0.5">Assigned requests</p>
          </div>
        </div>

        {/* Pending Count */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs flex items-center gap-4 text-left hover:shadow-2xs transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-700  tracking-wider">Pending Approval</p>
            <p className="text-3xl font-medium text-amber-600 mt-0.5 font-display">{pendingCount}</p>
            <p className="text-xs text-slate-700 font-sans mt-0.5">Requests needing review</p>
          </div>
        </div>

        {/* Rejected Count */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs flex items-center gap-4 text-left hover:shadow-2xs transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-red-50/70 flex items-center justify-center text-red-650 shrink-0 border border-red-100">
            <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 text-[11px] font-medium leading-none">
              ✕
            </div>
          </div>
          <div>
            <p className="text-[12px] font-medium text-slate-700  tracking-wider">Rejected Requests</p>
            <p className="text-3xl font-medium text-red-650 mt-0.5 font-display">{rejectedCount}</p>
            <p className="text-xs text-slate-700 font-sans mt-0.5">Rejected requests</p>
          </div>
        </div>

      </div>

      {/* 6. SUB-TAB BAR NAVIGATION */}
      <div className="flex border-b border-b-slate-150 items-baseline pt-2 leading-none relative" style={{ borderColor: '#e2e8f0' }}>
        <button
          onClick={() => {
            setActiveSubTab("leave");
            setCurrentPage(1);
            setTypeFilter("All Types");
          }}
          className={`pb-[14px] px-5 font-medium text-[14px] transition-all relative cursor-pointer ${
            activeSubTab === "leave" ? "text-[#7553FF]" : "text-slate-700 hover:text-slate-650"
          }`}
        >
          Leave Requests
          {activeSubTab === "leave" && (
            <motion.div
              layoutId="leaveSubTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7553FF]"
            />
          )}
        </button>

        <button
          onClick={() => {
            setActiveSubTab("flextime");
            setCurrentPage(1);
            setTypeFilter("All Types");
          }}
          className={`pb-[14px] px-5 font-medium text-[14px] transition-all relative cursor-pointer ${
            activeSubTab === "flextime" ? "text-[#7553FF]" : "text-slate-700 hover:text-slate-650"
          }`}
        >
          Flextime & Compensatory
          {activeSubTab === "flextime" && (
            <motion.div
              layoutId="leaveSubTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7553FF]"
            />
          )}
        </button>

        <button
          onClick={() => {
            setActiveSubTab("balances");
            setCurrentPage(1);
          }}
          className={`pb-[14px] px-5 font-medium text-[14px] transition-all relative cursor-pointer ${
            activeSubTab === "balances" ? "text-[#7553FF]" : "text-slate-700 hover:text-slate-650"
          }`}
        >
          Balances & Leave Settings 
          {activeSubTab === "balances" && (
            <motion.div
              layoutId="leaveSubTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7553FF]"
            />
          )}
        </button>
      </div>

      {activeSubTab !== "balances" ? (
        <>
          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center justify-between bg-white py-4 px-4 border border-slate-100 rounded-3xl shadow-3xs">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              
              {/* Search text field */}
              <div className="relative min-w-[240px] w-full sm:w-auto">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700" />
                <input
                  type="text"
                  placeholder="Search by staff name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 focus:border-[#7553FF]/60 placeholder:text-slate-700 focus:ring-1 focus:ring-[#7553FF]/10 transition-all font-medium"
                />
              </div>
              
              {/* Status Select */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-4 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-medium appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all shadow-3xs"
                >
                  <option value="All Status">All Statuses</option>
                  {activeSubTab === "leave" ? (
                    <>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </>
                  ) : (
                    <>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Ended">Ended</option>
                    </>
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Leave or Flextime Type Filter */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-medium appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all shadow-3xs"
                >
                  {activeSubTab === "leave" ? (
                    <>
                      <option value="All Types">All Leave Types</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Personal Leave">Personal Leave</option>
                      <option value="Compensatory Leave">Compensatory Leave (FWHA)</option>
                      <option value="Unpaid Leave">Unpaid Leave</option>
                    </>
                  ) : (
                    <>
                      <option value="All Types">All Flextime Types</option>
                      <option value="Flexible Hours">Flexible Hours</option>
                      <option value="Compressed Workweek">Compressed Workweek</option>
                      <option value="Flexible Days">Flexible Days</option>
                    </>
                  )}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Department Filter */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={deptFilter}
                  onChange={(e) => {
                    setDeptFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-medium appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all shadow-3xs"
                >
                  <option value="All Job Roles">All Job Roles</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                  <option value="Operation">Operation</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bar">Bar</option>
                  <option value="Service">Service</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All Status");
                setTypeFilter("All Types");
                setDeptFilter("All Job Roles");
                setDateRangeFilter("All Date Ranges");
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 bg-slate-50/25 border border-slate-200 hover:border-slate-350 text-slate-705 hover:text-slate-900 rounded-xl text-[14px] font-medium transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center shadow-3xs"
            >
              <Filter className="w-4 h-4 text-slate-700" />
              Reset Filters
            </button>
          </div>

          {/* MAIN DATA GRID TABLE */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-3xs">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-[#FAF9F7]/60 text-[14px] font-medium text-slate-800  tracking-wider select-none">
                    <th className="px-5 py-5 text-left font-sans text-[14px] font-medium">Employee / Job Role</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Branch</th>
                    {activeSubTab === "leave" ? (
                      <>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Leave Type</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Date Range</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Leave Duration</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Reason</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Flextime Type</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Arrangement Details</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Effective Period</th>
                        <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Applied Days</th>
                      </>
                    )}
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Status</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-medium">Created Date</th>
                    <th className="px-5 py-5 text-center font-sans text-[14px] font-medium w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[14px] text-slate-700 font-sans">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-700 font-medium text-[14px]">
                        No leave or flextime records match the current security filter or simulated role.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((record) => {
                      const initials = record.name?.split(" ").map((n: string) => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "NA";
                      const photo = avatars[record.name];

                      const isActiveRow = activeActionMenuId === record.id;
                      return (
                        <tr key={record.id} className={`hover:bg-slate-50/20 transition-all font-sans ${isActiveRow ? "relative z-30" : ""}`}>
                          
                          {/* Staff name & thumbnail */}
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              {photo ? (
                                <img
                                  src={photo}
                                  alt={record.name}
                                  className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-[14px] tracking-wide  shrink-0 ${nameColors[record.name] || 'bg-slate-100 text-slate-700'}`}>
                                  {initials}
                                </div>
                              )}
                              <div className="text-left leading-tight">
                                <span className="font-medium text-slate-800 block text-[14px] hover:text-[#7553FF] transition-colors cursor-pointer">{record.name}</span>
                                <span className="text-xs text-slate-700 font-normal mt-0.5 block">{record.department}</span>
                              </div>
                            </div>
                          </td>

                          {/* Branch indicator */}
                          <td className="py-4 px-4 text-left whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-800 px-2 py-1 rounded-lg border border-slate-200 text-xs font-medium font-mono">
                              <Store className="w-3.5 h-3.5 text-slate-700" />
                              {record.branch}
                            </span>
                          </td>

                          {/* Dynamic columns */}
                          {activeSubTab === "leave" ? (
                            <>
                              <td className="py-4 px-4 text-left">
                                {record.leaveType === "Annual Leave" ? (
                                  <span className="inline-flex items-center bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide select-none">
                                    Annual Leave
                                  </span>
                                ) : record.leaveType === "Sick Leave" ? (
                                  <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide select-none">
                                    Sick Leave
                                  </span>
                                ) : record.leaveType === "Compensatory Leave" ? (
                                  <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide select-none gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Compensatory Rest (FWHA)
                                  </span>
                                ) : record.leaveType === "Personal Leave" ? (
                                  <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide select-none">
                                    Personal Leave
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide select-none">
                                    {record.leaveType || "Unpaid Leave"}
                                  </span>
                                )}
                              </td>

                              <td className="py-4 px-4 text-left leading-snug text-[14px]">
                                <span className="font-medium text-slate-800 block">{record.dateRange}</span>
                                {record.dayText && (
                                  <span className="text-slate-700 text-xs mt-0.5 block font-normal">{record.dayText}</span>
                                )}
                              </td>

                              <td className="py-4 px-4 text-left text-slate-800 font-medium text-[14px]">
                                {record.leaveType === "Compensatory Leave" ? (
                                  <span className="text-emerald-700">
                                    {record.isCompensatoryByHours ? `${record.hours} hrs` : "8.0 hrs (1 day)"}
                                  </span>
                                ) : (
                                  <span>{record.days} {record.days > 1 ? "days" : "day"}</span>
                                )}
                              </td>

                              <td className="py-4 px-4 text-left text-slate-700 font-medium text-[14px] max-w-[240px] truncate" title={record.reason}>
                                {record.reason}
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-4 px-4 text-left">
                                <span className="inline-flex items-center bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide ">
                                  {record.flextimeType || "Flextime"}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-left leading-tight">
                                <span className="font-medium text-slate-800 block text-[13px]">{record.schedule}</span>
                                <span className="text-xs text-slate-700 font-normal mt-0.5 block leading-relaxed">{record.scheduleDetails}</span>
                              </td>
                              <td className="py-4 px-4 text-left text-slate-800 font-medium text-[13px] whitespace-nowrap">
                                {record.dateRange}
                              </td>
                              <td className="py-4 px-4 text-left text-slate-800 font-medium text-[13px]">
                                {record.days}
                              </td>
                            </>
                          )}

                          {/* Status Badge */}
                          <td className="py-4 px-4 text-left whitespace-nowrap">
                            {record.status === "Active" || record.status === "Approved" ? (
                              <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide  select-none">
                                {activeSubTab === "leave" ? "APPROVED" : "ACTIVE"}
                              </span>
                            ) : record.status === "Pending" ? (
                              <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide  select-none animate-pulse">
                                PENDING
                              </span>
                            ) : (
                              <span className="inline-flex items-center bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide  select-none">
                                {activeSubTab === "leave" ? "REJECTED" : "ENDED"}
                              </span>
                            )}
                          </td>

                          {/* Created date */}
                          <td className="py-4 px-4 text-left leading-tight whitespace-nowrap">
                            <span className="font-medium text-slate-850 text-[13px] block">{record.createdOn}</span>
                            <span className="text-slate-700 text-xs mt-0.5 block font-normal">{record.createdTime}</span>
                          </td>

                          {/* Action Controls */}
                          <td className={`py-4 px-5 text-center whitespace-nowrap relative ${activeActionMenuId === record.id ? "z-40" : ""}`}>
                            {activeSubTab === "leave" ? (
                              <div className="flex items-center justify-center gap-1.5">
                                {record.status === "Pending" && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateStatus(record.id, "Approved")}
                                      title="Approve Request"
                                      className="w-8 h-8 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-55 hover:text-emerald-700 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-3xs"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStatus(record.id, "Rejected")}
                                      title="Reject Request"
                                      className="w-8 h-8 rounded-full border border-rose-200 text-rose-500 hover:bg-rose-55 hover:text-rose-700 hover:border-rose-400 transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-3xs"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                                {record.status === "Approved" && (
                                  <button
                                    onClick={() => handleUpdateStatus(record.id, "Cancelled")}
                                    title="Cancel and Refund days/hours"
                                    className="px-3 py-1 text-xs font-medium rounded-lg border border-red-200 text-red-650 hover:bg-red-50 hover:border-red-400 transition-all cursor-pointer flex items-center gap-1 shadow-3xs"
                                  >
                                    <X className="w-3 h-3" />
                                    Cancel & Refund
                                  </button>
                                )}
                                {record.status === "Cancelled" && (
                                  <span className="inline-flex items-center bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide  select-none">Cancelled & Refunded</span>
                                )}
                                {record.status === "Rejected" && (
                                  <span className="inline-flex items-center bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded text-[11px] font-medium tracking-wide  select-none">Rejected</span>
                                )}
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleActionClick(record.id)}
                                  className="p-1.5 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-all cursor-pointer inline-flex items-center justify-center"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                                
                                {activeActionMenuId === record.id && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={() => setActiveActionMenuId(null)} />
                                    <div className="absolute right-6 top-10 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1.5 text-left text-[13px] text-slate-750">
                                      <span className="px-3 py-1.5 text-[10px] font-bold text-slate-700 block  tracking-wider border-b border-b-slate-100 mb-1">
                                        Change Status
                                      </span>
                                      
                                      {record.status !== "Active" && (
                                        <button
                                          onClick={() => handleUpdateStatus(record.id, "Active")}
                                          className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-1.5 text-[#15803D] font-medium"
                                        >
                                          <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                                          Set Active
                                        </button>
                                      )}
                                      
                                      {record.status !== "Pending" && (
                                        <button
                                          onClick={() => handleUpdateStatus(record.id, "Pending")}
                                          className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-1.5 text-amber-600 font-medium"
                                        >
                                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                                          Set Pending
                                        </button>
                                      )}

                                      {record.status !== "Ended" && (
                                        <button
                                          onClick={() => handleUpdateStatus(record.id, "Ended")}
                                          className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-1.5 text-red-650 font-medium"
                                        >
                                          <span className="w-2 h-2 rounded-full bg-red-650" />
                                          Set Ended
                                        </button>
                                      )}
                                      
                                      <div className="h-px bg-slate-100 my-1" />
                                      <button
                                        onClick={() => handleDeleteItem(record.id)}
                                        className="w-full px-3 py-2 text-left hover:bg-rose-50 text-red-650 font-bold flex items-center gap-1.5 transition-colors"
                                      >
                                        ✕ Delete Record
                                      </button>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="bg-white border-t border-t-slate-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[14px] text-slate-700">
                <span>Show</span>
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="pl-3 pr-8 py-1 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer appearance-none text-[14px] font-bold text-slate-750 focus:border-[#7553FF]/60"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span>records per page</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[14px] text-slate-750 font-medium">
                  {(currentPage - 1) * pageSize + 1} – {Math.min(totalItems, currentPage * pageSize)} of {totalItems} records
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1 px-2.5 border border-slate-200 rounded-lg text-[14px] font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ‹
                  </button>
                  <button className="p-1 px-3 bg-purple-50 text-[#7553FF] border border-purple-100 rounded-lg text-[14px] font-bold">
                    {currentPage}
                  </button>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="p-1 px-2.5 border border-slate-200 rounded-lg text-[14px] font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* BALANCES GRID & GERMAN HR SETTINGS & CONVERTER PANELS */
        <div className="space-y-6 text-left">
          
          {/* A. REAL-TIME EMPLOYEE LEAVE BALANCES GRID */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-slate-800 font-display">Employee Leave Balances & Accrued Hours (FWHA / Gleitzeitkonto)</h3>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                Detailed current year allowance, rolled over leave from previous year (<span className="font-medium text-purple-700 font-mono">VJ Url. üb.</span>), and cumulative flextime working hours for each employee.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 bg-slate-50/70 text-[13px] font-medium text-slate-700 ">
                    <th className="px-4 py-3 text-left font-medium">Employee Name</th>
                    <th className="px-4 py-3 text-left font-medium">Branch</th>
                    <th className="px-4 py-3 text-left font-medium">Current Leave</th>
                    <th className="px-4 py-3 text-left font-medium">Rollover Leave</th>
                    <th className="px-4 py-3 text-left font-medium">Sick Leave</th>
                    <th className="px-4 py-3 text-left font-medium">Personal Leave</th>
                    <th className="px-4 py-3 text-left text-emerald-800 bg-emerald-50/30 font-medium">Accrued Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[13px] text-slate-800">
                  {(Object.entries(employeeBalances) as [string, any][])
                    .filter(([name, bal]) => {
                      if (simulationRole === "employee-lechi") {
                        return name === "Le Chi";
                      }
                      return simulationRole === "super-admin" || allowedBranches.includes(bal.assignedBranch);
                    })
                    .map(([name, bal]) => {
                      const totalAvailable = bal.annual + (allowVacationRollover === "Yes" ? bal.oldAnnual : 0);
                      return (
                        <tr key={name} className="hover:bg-slate-50/10">
                          <td className="px-4 py-3 font-medium text-slate-800">{name}</td>
                          <td className="px-4 py-3">
                            <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs font-medium font-mono">{bal.assignedBranch}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium">{bal.annual.toFixed(1)}</span> days
                          </td>
                          <td className="px-4 py-3">
                            {allowVacationRollover === "Yes" ? (
                              <span className="text-purple-700 font-medium font-mono">+{bal.oldAnnual.toFixed(1)} days</span>
                            ) : (
                              <span className="text-slate-700 line-through">Rollover Disabled</span>
                            )}
                          </td>
                          <td className="px-4 py-3">{bal.sick.toFixed(1)} days</td>
                          <td className="px-4 py-3">{bal.personal.toFixed(1)} days</td>
                          <td className="px-4 py-3 font-medium text-emerald-800 bg-emerald-50/10 font-mono">
                            {bal.fwha.toFixed(1)} hrs
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {simulationRole !== "employee-lechi" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* B. GERMAN VACATION ROLLOVER CONFIGURATION */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7553FF] shrink-0 border border-purple-100">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-850">German Rollover Configuration</h4>
                  <p className="text-[11px] text-slate-700 font-medium">Configure rules for previous year's leave carryover and expiration</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-[13px] font-medium text-slate-700">Allow Vacation Rollover (allowVacationRollover)</span>
                  <select
                    value={allowVacationRollover}
                    onChange={(e) => setAllowVacationRollover(e.target.value as "Yes" | "No")}
                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-[#7553FF] cursor-pointer outline-none"
                  >
                    <option value="Yes">Yes (VJ Url. üb. is active)</option>
                    <option value="No">No (Expires on December 31st)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="text-[13px] font-medium text-slate-700">Rollover Expiry Date (Rollover Expiry)</span>
                  <select
                    value={vacationRolloverExpiryDate}
                    onChange={(e) => setVacationRolloverExpiryDate(e.target.value)}
                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-[#7553FF] cursor-pointer outline-none"
                  >
                    <option value="March 31">March 31st (German Default)</option>
                    <option value="June 30">June 30th</option>
                    <option value="Never">Never Expire</option>
                  </select>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <span className="text-[13px] font-medium text-slate-700">Expiry Remainder Action (Expiry Action)</span>
                  <select
                    value={vacationRolloverRemainderAction}
                    onChange={(e) => setVacationRolloverRemainderAction(e.target.value as "Expire" | "Convert to Flextime")}
                    className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium focus:border-[#7553FF] cursor-pointer outline-none"
                  >
                    <option value="Expire">Expire (Remaining rollover is wiped to 0)</option>
                    <option value="Convert to Flextime">Convert to Flextime (Credit to FWHA at 1 day = 8 hours)</option>
                  </select>
                </div>

                <div className="bg-purple-50/40 border border-purple-100 p-3 rounded-2xl flex items-start gap-2 text-xs leading-relaxed text-[#5B39E3]">
                  <Award className="w-4 h-4 text-[#7553FF] shrink-0 mt-0.5" />
                  <span>
                    <strong>German HR Standard:</strong> Rollover leave must be consumed first before deducting from the current year's standard annual leave allowance.
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={runExpirySimulation}
                    className="w-full py-2.5 bg-[#7553FF] text-white hover:bg-[#613EEA] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    Simulate Expiry Date Reached
                  </button>
                </div>

                {simulationResult && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2.5 relative text-slate-800" id="simulation-results-panel">
                    <button 
                      type="button"
                      onClick={() => setSimulationResult(null)}
                      className="absolute top-3 right-3 text-slate-500 hover:bg-slate-200/50 p-1 rounded-full cursor-pointer transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5 text-[#7553FF] font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Vacation Expiry Simulation Results</span>
                    </div>
                    {simulationResult.length === 0 ? (
                      <p className="text-slate-700">No employees had previous year's rollover leave (<span className="font-mono">VJ Url. üb.</span>) to process. No balances were modified.</p>
                    ) : (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {simulationResult.map((res, i) => (
                          <div key={i} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0 text-slate-700">
                            <span className="font-medium text-slate-800">{res.name}</span>
                            <span className="font-mono">
                              -{res.oldAnnualBefore.toFixed(1)} days VJ Url. üb. → <span className={res.fwhaAdd > 0 ? "text-emerald-700 font-bold" : "text-rose-700 font-semibold"}>
                                {res.action} {res.fwhaAdd > 0 ? `(+${res.fwhaAdd.toFixed(1)}h FWHA)` : ""}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] text-slate-500 font-medium italic pt-1">
                      Note: These changes are applied in-memory and will persist in this session's leave balances.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* C. MANUAL LEAVE CONVERTER WIDGET (PRD Section 2) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0 border border-emerald-100">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-slate-850">Leave-to-Flextime Manual Converter</h4>
                  <p className="text-[11px] text-slate-700 font-medium">Convert remaining annual leave days to accrued flextime working hours (FWHA)</p>
                </div>
              </div>

              <form onSubmit={handleManualConversion} className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-slate-700">Select Employee with Excess Leave</label>
                  <select
                    value={convertName}
                    onChange={(e) => setConvertName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium bg-white"
                  >
                    {(Object.entries(employeeBalances) as [string, any][])
                      .filter(([name, bal]) => bal.annual > 0 && (simulationRole === "super-admin" || allowedBranches.includes(bal.assignedBranch)))
                      .map(([name, bal]) => (
                        <option key={name} value={name}>
                          {name} ({bal.annual.toFixed(1)} excess leave days at {bal.assignedBranch})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-[11px] text-slate-700 font-medium">Conversion Rate</p>
                    <p className="text-sm font-medium text-slate-800 mt-0.5 font-mono">1 Day = 8.0 Hours</p>
                  </div>
                  <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3">
                    <p className="text-[11px] text-emerald-800 font-medium">Accrued Hours Credited</p>
                    <p className="text-sm font-medium text-[#15803D] mt-0.5 font-mono">
                      +{(employeeBalances[convertName] ? employeeBalances[convertName].annual * 8.0 : 0.0).toFixed(1)} hrs FWHA
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={simulationRole !== "super-admin"}
                  className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-3xs"
                >
                  <CheckCircle className="w-4 h-4" />
                  Convert & Transfer to FWHA for {convertName}
                </button>
              </form>
            </div>

          </div>
          )}
        </div>
      )}

      {/* 7. COMPRESSED WORKWEEK EXEMPTION INFORMATIVE CARD */}
      {activeSubTab === "flextime" && (
        <div className="bg-slate-50/50 border border-slate-200/60 rounded-3xl p-5 text-left flex items-start gap-3 shadow-3xs leading-relaxed">
          <History className="w-5 h-5 text-[#7553FF] shrink-0 mt-0.5" />
          <div className="text-[13.5px] text-slate-700">
            <h5 className="font-medium text-slate-800">Compressed Workweek Exemption</h5>
            <p className="mt-1">
              Employees on a <strong>Compressed Workweek</strong> (e.g., <strong>Tran Binh</strong> working 4 days from Monday to Thursday, with a flexible Friday off) are automatically recognized as having a valid Flextime schedule on Fridays. These employees will <strong>never be marked as absent</strong> on the Check-in Dashboard on their exempted days.
            </p>
          </div>
        </div>
      )}

      {/* 8. NEW LEAVE / FLEX REQUEST MODAL */}
      <AnimatePresence>
        {isNewRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewRequestModalOpen(false)}
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-3xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden text-slate-800 z-50 text-left font-sans"
            >
              <form onSubmit={handleCreateRequest}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-b-slate-100 px-6 py-4 bg-[#FAF9F7]/90">
                  <div>
                    <h3 className="text-base font-medium text-slate-800 font-display">
                      Create New Request: {activeSubTab === "leave" ? "Leave Request" : "Flextime Arrangement"}
                    </h3>
                    <p className="text-xs text-slate-700 mt-0.5 font-normal">
                      Please specify the branch and request parameters as required.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNewRequestModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-slate-650 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Elements */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  
                  {/* Select Staff member */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                      Select Employee
                    </label>
                    <select
                      value={newReqName}
                      onChange={(e) => {
                        setNewReqName(e.target.value);
                        // Autoassign department and primary branch of that employee
                        const depts: Record<string, string> = {
                          "Le Chi": "Sales",
                          "Tran Binh": "HR",
                          "Pham Dung": "Operation",
                          "Hoang Em": "Kitchen",
                          "Vu Giang": "Bar",
                          "Phan Linh": "Service",
                          "Dang Khoa": "Operation",
                          "Bui Thuy": "HR",
                          "Nguyen An": "Operation",
                          "Doan Trang": "HR",
                          "Tran Long": "Sales",
                          "Vo Hoang": "Operation",
                          "Ngo Quynh": "Kitchen"
                        };
                        setNewReqDept(depts[e.target.value] || "Sales");
                        
                        const selectedEmpBal = employeeBalances[e.target.value];
                        if (selectedEmpBal) {
                          setNewReqBranch(selectedEmpBal.assignedBranch);
                        }
                      }}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium bg-white"
                    >
                      {Object.keys(employeeBalances).map(name => (
                        <option key={name} value={name}>{name} ({employeeBalances[name].assignedBranch})</option>
                      ))}
                    </select>
                  </div>

                  {/* Branch Constraint Dropdown (Compulsory as per PRD Section 2) */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                      Required: Select Registered Branch (Store Branch)
                    </label>
                    <select
                      value={newReqBranch}
                      onChange={(e) => setNewReqBranch(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium bg-white"
                    >
                      <option value="HCM 1">HCM 1 (Bistro District 1)</option>
                      <option value="HCM 2">HCM 2 (Bistro District 5)</option>
                      <option value="HN 1">HN 1 (Bistro Hanoi)</option>
                      <option value="HQ">HQ (Headquarters)</option>
                    </select>
                    <p className="text-[11px] text-[#7553FF] font-medium leading-normal">
                      * Employees must select their specific store branch so managers of that location can process and approve requests.
                    </p>
                  </div>

                  {activeSubTab === "leave" ? (
                    <>
                      {/* Leave Categories */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                            Leave Type (Category)
                          </label>
                          <select
                            value={newReqType}
                            onChange={(e) => setNewReqType(e.target.value)}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 bg-white"
                          >
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Personal Leave">Personal Leave</option>
                            <option value="Compensatory Leave">Compensatory Leave (FWHA)</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                            Estimated Conversion
                          </label>
                          <div className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 font-medium font-mono">
                            {newReqType === "Compensatory Leave" ? (
                              isCompensatoryByHours ? `${compensatoryHoursInput.toFixed(1)} hrs` : "8.0 hrs (1 day)"
                            ) : (
                              `${Math.max(1, Math.round((new Date(newReqEndDate).getTime() - new Date(newReqStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1)} days`
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Compensatory rest hours selector */}
                      {newReqType === "Compensatory Leave" && (
                        <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl space-y-3 text-xs text-slate-800">
                          <p className="font-medium text-emerald-800 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" />
                            Book compensatory rest from accrued FWHA / Gleitzeitkonto hours
                          </p>
                          
                          <div className="flex items-center gap-6">
                            <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                              <input
                                type="radio"
                                checked={!isCompensatoryByHours}
                                onChange={() => setIsCompensatoryByHours(false)}
                                className="accent-emerald-700"
                              />
                              Full Day (Deduct 8.0 hours)
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                              <input
                                type="radio"
                                checked={isCompensatoryByHours}
                                onChange={() => setIsCompensatoryByHours(true)}
                                className="accent-emerald-700"
                              />
                              By Specific Hours
                            </label>
                          </div>

                          {isCompensatoryByHours && (
                            <div className="space-y-1">
                              <span className="font-medium text-slate-700 block">Specific Compensatory Hours (Working Hours)</span>
                              <input
                                type="number"
                                step="0.5"
                                min="0.5"
                                max="24"
                                value={compensatoryHoursInput}
                                onChange={(e) => setCompensatoryHoursInput(parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-emerald-700 font-mono font-medium"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Date Ranges */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block mb-1">
                            Start Date
                          </label>
                          <DatePicker
                            value={newReqStartDate}
                            onChange={(date) => {
                              if (date) setNewReqStartDate(date);
                            }}
                          />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block mb-1">
                            End Date
                          </label>
                          <DatePicker
                            value={newReqEndDate}
                            onChange={(date) => {
                              if (date) setNewReqEndDate(date);
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                          Reason Details
                        </label>
                        <textarea
                          rows={2}
                          value={newReqReason}
                          onChange={(e) => setNewReqReason(e.target.value)}
                          placeholder="Enter details of your request (e.g., Medical check-up, family trip, compensatory rest)..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 focus:ring-1 focus:ring-[#7553FF]/20 placeholder:text-slate-700 font-medium"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Flextime Setup */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                          Flextime Arrangement
                        </label>
                        <select
                          value={newScheduleType}
                          onChange={(e) => {
                            setNewScheduleType(e.target.value);
                            if (e.target.value === "Flexible Hours") {
                              setNewFlexSchedule("Core Hours: 10:00 AM – 3:00 PM");
                            } else if (e.target.value === "Compressed Workweek") {
                              setNewFlexSchedule("4 days / week (9:00 AM – 6:00 PM)");
                            } else {
                              setNewFlexSchedule("Choose up to 1 remote day / week");
                            }
                          }}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 bg-white"
                        >
                          <option value="Flexible Hours">Flexible Hours</option>
                          <option value="Compressed Workweek">Compressed Workweek</option>
                          <option value="Flexible Days">Flexible Days</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                          Arrangement Schedule Details
                        </label>
                        <input
                          type="text"
                          value={newFlexSchedule}
                          onChange={(e) => setNewFlexSchedule(e.target.value)}
                          placeholder="e.g., Core Hours: 10:00 AM – 3:00 PM"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                            Applied Days
                          </label>
                          <select
                            value={newFlexDays}
                            onChange={(e) => setNewFlexDays(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-850 bg-white"
                          >
                            <option value="Mon - Fri">Mon - Fri (All weekdays)</option>
                            <option value="Mon - Thu">Mon - Thu (Friday off)</option>
                            <option value="Tue - Fri">Tue - Fri (Monday off)</option>
                            <option value="Sat - Sun">Sat - Sun (Weekend schedule)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block">
                            Validity Period
                          </label>
                          <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-slate-700 font-medium font-mono">
                            3 Months Period
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block mb-1">
                            Start Date
                          </label>
                          <DatePicker
                            value={newReqStartDate}
                            onChange={(date) => {
                              if (date) setNewReqStartDate(date);
                            }}
                          />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="text-[13px] font-medium text-slate-700  tracking-wide block mb-1">
                            End Date
                          </label>
                          <DatePicker
                            value={newReqEndDate}
                            onChange={(date) => {
                              if (date) setNewReqEndDate(date);
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Footer Controls */}
                <div className="bg-[#FAF9F7]/90 border-t border-t-slate-100 px-6 py-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewRequestModalOpen(false)}
                    className="px-4 py-2 text-[14px] font-medium text-slate-700 hover:text-slate-850 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-[14px] font-medium text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Submit Request
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
