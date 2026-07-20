import React, { useState, useEffect } from "react";
import {
  MapPin,
  QrCode,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Calculator,
  User,
  Clock,
  Calendar,
  Utensils,
  Plus,
  Trash,
  Send,
  MessageSquare,
  Sparkles,
  Zap,
  Rocket,
  Image,
  RefreshCw,
  Search,
  Check,
  Tag,
  ThumbsUp,
  Share2,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  HelpCircle,
  FileText,
  Star,
  MessageSquareQuote,
  X,
  Eye,
  Sliders,
  Bell,
  Globe,
  Facebook,
  Instagram,
  UserCheck,
  Copy,
  Heart,
  Smile,
  MoreHorizontal,
  MessageCircle,
  Bookmark,
  Video,
  Play,
  ExternalLink,
  Filter,
  Download,
  Save,
  Puzzle,
  ChevronDown,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Users,
  Monitor,
  History,
  Grid,
  List,
  Upload,
  ArrowUpRight,
  Palette,
  Coffee,
  Store,
  Award,
  Trash2,
  FolderClosed,
  FolderHeart,
  UtensilsCrossed,
  CakeSlice,
  SearchCode,
  Scan,
  Info,
  AlertTriangle,
  PencilLine,
  BarChart2,
  ExternalLink as ExternalLinkIcon,
  GripVertical,
  Gift,
  PartyPopper,
  Code,
  Umbrella,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ============================================================================
// 1. CHECKIN VIEW
// ============================================================================
export function CheckinView() {
  const [attendanceData, setAttendanceData] = useState(() => {
    const initial10 = [
      {
        id: "1",
        name: "Nguyen An",
        email: "nguyen.an@johnsbistro.com",
        phone: "090-123-4561",
        department: "Operation",
        shiftTimes: "09:00 AM - 05:00 PM",
        shiftName: "Morning",
        checkInTime: "08:58 AM",
        checkInLoc: "Front Desk",
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "On Time",
        location: "HCM 1",
        avatarColor: "bg-blue-100 text-blue-700",
      },
      {
        id: "2",
        name: "Tran Binh",
        email: "tran.binh@johnsbistro.com",
        phone: "090-123-4562",
        department: "HR",
        shiftTimes: "09:00 AM - 05:00 PM",
        shiftName: "Morning",
        checkInTime: "09:12 AM",
        checkInLoc: "Front Desk",
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "Late (12m)",
        location: "HQ",
        avatarColor: "bg-purple-100 text-[#7553FF]",
      },
      {
        id: "3",
        name: "Le Chi",
        email: "le.chi@johnsbistro.com",
        phone: "090-123-4563",
        department: "Sales",
        shiftTimes: "02:00 PM - 10:00 PM",
        shiftName: "Afternoon",
        checkInTime: "01:55 PM",
        checkInLoc: "Front Desk",
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "On Time",
        location: "HN 1",
        avatarColor: "bg-pink-100 text-pink-700",
      },
      {
        id: "4",
        name: "Pham Dung",
        email: "pham.dung@johnsbistro.com",
        phone: "090-123-4564",
        department: "Operation",
        shiftTimes: "02:00 PM - 10:00 PM",
        shiftName: "Afternoon",
        checkInTime: "02:05 PM",
        checkInLoc: "Front Desk",
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "On Time",
        location: "HCM 2",
        avatarColor: "bg-indigo-100 text-indigo-700",
      },
      {
        id: "5",
        name: "Hoang Em",
        email: "hoang.em@johnsbistro.com",
        phone: "090-123-4565",
        department: "Kitchen",
        shiftTimes: "09:00 AM - 05:00 PM",
        shiftName: "Morning",
        checkInTime: null,
        checkInLoc: null,
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "Absent",
        location: "HCM 1",
        avatarColor: "bg-amber-100 text-amber-700",
      },
      {
        id: "6",
        name: "Vu Giang",
        email: "vu.giang@johnsbistro.com",
        phone: "090-123-4566",
        department: "Bar",
        shiftTimes: "02:00 PM - 10:00 PM",
        shiftName: "Afternoon",
        checkInTime: null,
        checkInLoc: null,
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "Absent",
        location: "HCM 2",
        avatarColor: "bg-emerald-100 text-emerald-700",
      },
      {
        id: "7",
        name: "Phan Linh",
        email: "phan.linh@johnsbistro.com",
        phone: "090-123-4567",
        department: "Service",
        shiftTimes: "05:00 PM - 11:00 PM",
        shiftName: "Evening",
        checkInTime: "05:08 PM",
        checkInLoc: "Rooftop",
        checkOutTime: null,
        checkOutLoc: null,
        workingHours: null,
        status: "Late (8m)",
        location: "HQ",
        avatarColor: "bg-warmGray-100 text-orange-700",
      },
      {
        id: "8",
        name: "Dang Khoa",
        email: "dang.khoa@johnsbistro.com",
        phone: "090-123-4568",
        department: "Operation",
        shiftTimes: "09:00 AM - 05:00 PM",
        shiftName: "Morning",
        checkInTime: "08:45 AM",
        checkInLoc: "Front Desk",
        checkOutTime: "05:02 PM",
        checkOutLoc: "Front Desk",
        workingHours: "8h 17m",
        status: "Completed",
        location: "HN 1",
        avatarColor: "bg-teal-100 text-teal-700",
      },
      {
        id: "9",
        name: "Bui Thuy",
        email: "bui.thuy@johnsbistro.com",
        phone: "090-123-4569",
        department: "HR",
        shiftTimes: "09:00 AM - 05:00 PM",
        shiftName: "Morning",
        checkInTime: "09:01 AM",
        checkInLoc: "Front Desk",
        checkOutTime: "05:00 PM",
        checkOutLoc: "Front Desk",
        workingHours: "7h 59m",
        status: "Completed",
        location: "HQ",
        avatarColor: "bg-cyan-100 text-cyan-700",
      },
      {
        id: "10",
        name: "Doan Minh",
        email: "doan.minh@johnsbistro.com",
        phone: "090-123-4570",
        department: "Kitchen",
        shiftTimes: "05:00 PM - 11:00 PM",
        shiftName: "Evening",
        checkInTime: "05:00 PM",
        checkInLoc: "Kitchen Area",
        checkOutTime: "10:58 PM",
        checkOutLoc: "Kitchen Area",
        workingHours: "5h 58m",
        status: "Completed",
        location: "HCM 2",
        avatarColor: "bg-violet-100 text-violet-700",
      },
    ];

    // Seed remaining 22 entries under the token limits programmatically
    const extraDepts = ["Operation", "HR", "Sales", "Kitchen", "Bar", "Service"];
    const extraTimes = {
      Morning: "09:00 AM - 05:00 PM",
      Afternoon: "02:00 PM - 10:00 PM",
      Evening: "05:00 PM - 11:00 PM",
    };
    const extraLocs = ["HCM 1", "HQ", "HN 1", "HCM 2"];
    const firstNames = ["Hoang", "Minh", "Thu", "Ngoc", "Quynh", "Long", "Duy", "Thanh", "Nam", "Yen", "Cuong", "Van", "Khai", "Tu", "Phong"];
    const lastNames = ["Nguyen", "Le", "Tran", "Pham", "Bui", "Doan", "Phan", "Dang"];
    const avatarCols = [
      "bg-orange-100 text-orange-700",
      "bg-emerald-100 text-emerald-700",
      "bg-rose-100 text-rose-700",
      "bg-lime-100 text-lime-700",
      "bg-fuchsia-100 text-fuchsia-700",
      "bg-indigo-100 text-indigo-700",
      "bg-sky-100 text-sky-700",
    ];

    const extra = [];
    for (let i = 11; i <= 32; i++) {
      const f = firstNames[(i * 3) % firstNames.length];
      const l = lastNames[(i * 7) % lastNames.length];
      const name = `${l} ${f}`;
      const email = `${l.toLowerCase()}.${f.toLowerCase()}${i}@johnsbistro.com`;
      const phone = `090-123-45${i}`;
      const department = extraDepts[(i * 2) % extraDepts.length];
      const shiftKeys = ["Morning", "Afternoon", "Evening"];
      const shiftName = shiftKeys[(i * 5) % shiftKeys.length];
      const shiftTimes = extraTimes[shiftName as keyof typeof extraTimes];
      const location = extraLocs[(i * 11) % extraLocs.length];

      // To hit the exact mockup numbers:
      // Total expected = 32. 
      // Total Absent = 10 (2 in first 10 + 8 in extra 22). 
      // Total Completed = 4 (3 in first 10 + 1 in extra 22). 
      // Total Late = 4 (2 in first 10 + 2 in extra 22). 
      // Total On Time = 14 (3 in first 10 + 11 in extra 22).
      let status = "On Time";
      let checkInTime: string | null = "08:52 AM";
      let checkInLoc: string | null = "Front Desk";
      let checkOutTime: string | null = null;
      let checkOutLoc: string | null = null;
      let workingHours: string | null = null;

      // Assign exactly 8 Absents
      if ([11, 14, 16, 17, 21, 25, 26, 29].includes(i)) {
        status = "Absent";
        checkInTime = null;
        checkInLoc = null;
      }
      // Assign exactly 2 Lates
      else if (i === 12) {
        status = "Late (15m)";
        checkInTime = "02:15 PM";
      } else if (i === 23) {
        status = "Late (5m)";
        checkInTime = "05:05 PM";
        checkInLoc = "Kitchen Area";
      }
      // Assign exactly 1 Completed
      else if (i === 15) {
        status = "Completed";
        checkInTime = "08:50 AM";
        checkOutTime = "05:00 PM";
        checkOutLoc = "Front Desk";
        workingHours = "8h 10m";
      }

      extra.push({
        id: String(i),
        name,
        email,
        phone,
        department,
        shiftTimes,
        shiftName,
        checkInTime,
        checkInLoc,
        checkOutTime,
        checkOutLoc,
        workingHours,
        status,
        location,
        avatarColor: avatarCols[i % avatarCols.length],
      });
    }

    return [...initial10, ...extra];
  });

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedShift, setSelectedShift] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("May 12, 2024");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal Control States
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Selected Logs for View / Edit Modals
  const [activeLog, setActiveLog] = useState<any>(null);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Manual Check In Form States (with preset values matching Nguyen An as default)
  const [newStaffName, setNewStaffName] = useState("Nguyen An");
  const [newStaffEmail, setNewStaffEmail] = useState("nguyen.an@johnsbistro.com");
  const [newStaffDept, setNewStaffDept] = useState("Operation");
  const [newStaffShift, setNewStaffShift] = useState("Morning");
  const [newStaffLocation, setNewStaffLocation] = useState("Front Desk");
  const [newStaffStatus, setNewStaffStatus] = useState("On Time");
  const [newStaffCheckin, setNewStaffCheckin] = useState("08:58 AM");

  // Mockup premium detailed states
  const [newStaffDate, setNewStaffDate] = useState("May 12, 2024");
  const [noteText, setNoteText] = useState("");
  const [expectedHours, setExpectedHours] = useState("8h 00m");
  const [breakDuration, setBreakDuration] = useState("1h 00m");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);

  const availableStaff = [
    {
      id: "1",
      name: "Nguyen An",
      email: "nguyen.an@johnsbistro.com",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      department: "Operation",
      avatarColor: "bg-blue-100 text-blue-700",
    },
    {
      id: "2",
      name: "Tran Binh",
      email: "tran.binh@johnsbistro.com",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      department: "HR",
      avatarColor: "bg-purple-100 text-[#7553FF]",
    },
    {
      id: "3",
      name: "Le Chi",
      email: "le.chi@johnsbistro.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      department: "Sales",
      avatarColor: "bg-pink-100 text-pink-700",
    },
    {
      id: "4",
      name: "Pham Dung",
      email: "pham.dung@johnsbistro.com",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
      department: "Operation",
      avatarColor: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "5",
      name: "Hoang Em",
      email: "hoang.em@johnsbistro.com",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
      department: "Kitchen",
      avatarColor: "bg-amber-100 text-amber-700",
    },
    {
      id: "custom",
      name: "Custom / New Staff",
      email: "Enter custom name and email manually",
      avatarUrl: "",
      department: "Operation",
      avatarColor: "bg-slate-100 text-slate-700",
    },
  ];

  const [selectedStaff, setSelectedStaff] = useState(availableStaff[0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Manual Check In Form Submit
  const handleManualCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = selectedStaff.id === "custom" ? newStaffName : selectedStaff.name;
    const finalEmail = selectedStaff.id === "custom" ? newStaffEmail : selectedStaff.email;

    if (!finalName || !finalEmail) {
      showToast("Please fill in Name and Email fields!");
      return;
    }

    const mapShiftTimes = {
      Morning: "09:00 AM - 05:00 PM",
      Afternoon: "02:00 PM - 10:00 PM",
      Evening: "05:00 PM - 11:00 PM",
    };

    const parsedShiftTimes = mapShiftTimes[newStaffShift as keyof typeof mapShiftTimes] || "09:00 AM - 05:00 PM";

    const newLog = {
      id: String(Date.now()),
      name: finalName,
      email: finalEmail,
      phone: "090-123-9999",
      department: selectedStaff.id === "custom" ? newStaffDept : (selectedStaff.department || newStaffDept),
      shiftTimes: parsedShiftTimes,
      shiftName: newStaffShift,
      checkInTime: newStaffStatus === "Absent" ? null : newStaffCheckin,
      checkInLoc: newStaffStatus === "Absent" ? null : newStaffLocation,
      checkOutTime: newStaffStatus === "Completed" ? "05:00 PM" : null,
      checkOutLoc: newStaffStatus === "Completed" ? newStaffLocation : null,
      workingHours: newStaffStatus === "Completed" ? expectedHours : null,
      status: newStaffStatus,
      location: newStaffLocation || "Front Desk",
      avatarColor: selectedStaff.id === "custom" ? "bg-[#7553FF]/10 text-[#7553FF]" : (selectedStaff.avatarColor || "bg-purple-100 text-[#7553FF]"),
      note: noteText,
      expectedHours: expectedHours,
      breakDuration: breakDuration,
      attachedFileName: attachedFile ? attachedFile.name : null
    };

    setAttendanceData((prev) => [newLog, ...prev]);
    setIsManualModalOpen(false);

    // Reset Form Fields
    setNewStaffName("Nguyen An");
    setNewStaffEmail("nguyen.an@johnsbistro.com");
    setNoteText("");
    setAttachedFile(null);
    setSelectedStaff(availableStaff[0]);
    showToast(`Successfully checked in ${finalName}!`);
  };

  // Handle Edit Save Complete
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLog) return;

    setAttendanceData((prev) =>
      prev.map((item) => (item.id === activeLog.id ? activeLog : item))
    );
    setIsEditModalOpen(false);
    showToast(`Saved changes for ${activeLog.name}`);
  };

  // Export Simulation
  const handleExport = () => {
    showToast("Exporting high-fidelity spreadsheet report (Attendance_Report_May12.xlsx)...");
  };

  // Calculate Real Global Stats (default numbers sum perfectly, but dynamically change when filters/inserts occur)
  const totalExpected = attendanceData.length;
  const totalAbsent = attendanceData.filter((item) => item.status === "Absent").length;
  const totalLate = attendanceData.filter((item) => item.status.startsWith("Late")).length;
  // Currently Checked In: checkIn is recorded, and checkOut is null, and status not Absent
  const totalCheckedIn = attendanceData.filter(
    (item) => item.checkInTime !== null && item.checkOutTime === null && item.status !== "Absent"
  ).length;

  // Filter Logic
  const filteredData = attendanceData.filter((item) => {
    // Search filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone && item.phone.includes(searchQuery));

    // Branch filter
    const matchesBranch = selectedBranch === "All" || item.location === selectedBranch;

    // Dept filter
    const matchesDept = selectedDept === "All" || item.department === selectedDept;

    // Shift filter
    const matchesShift = selectedShift === "All" || item.shiftName === selectedShift;

    // Status filter
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "On Time" && item.status === "On Time") ||
      (selectedStatus === "Late" && item.status.startsWith("Late")) ||
      (selectedStatus === "Absent" && item.status === "Absent") ||
      (selectedStatus === "Completed" && item.status === "Completed");

    return matchesSearch && matchesBranch && matchesDept && matchesShift && matchesStatus;
  });

  // Pagination Calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const startRecordIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecordIndex = Math.min(currentPage * pageSize, totalItems);

  // Ensure current page does not go out of bounds on filter change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div id="checkin-container" className="space-y-6 max-w-7xl mx-auto font-sans text-left relative pb-16">
      
      {/* Toast Alert Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1C1814] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-100 border-l-4 border-l-[#7553FF]"
          >
            <div className="w-2 h-2 rounded-full bg-[#7553FF] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide font-display">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 1: Header */}
      <div id="checkin-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div className="space-y-1 text-left">
          <h1 className="text-[28px] font-bold tracking-tight text-[#1C1814] font-display">
            Checkin
          </h1>
          <p className="text-[14px] text-slate-700 font-medium">
            Track staff attendance and working hours in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 hover:bg-[#F0ECFF]/10 text-sm font-bold text-[#7553FF] rounded-lg transition-all bg-white"
          >
            <Upload className="w-4 h-4" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 px-4 h-[38px] bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-bold rounded-lg transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Manual Check In</span>
          </button>
        </div>
      </div>

      {/* Row 2: Four Metric Cards Grid */}
      <div id="metric-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Checked In Now */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-3xs flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 bg-[#F0ECFF] text-[#7553FF] rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#7553FF]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-slate-700  tracking-wide">Checked In Now</p>
            <p className="text-3xl font-extrabold text-[#15803D] font-display mt-0.5">{totalCheckedIn}</p>
            <p className="text-sm text-slate-700 mt-1">Staff currently at work</p>
          </div>
        </div>

        {/* Card 2: Expected Today */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-3xs flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 bg-green-50 text-[#15803D] rounded-lg flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#15803D]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-slate-700  tracking-wide">Expected Today</p>
            <p className="text-3xl font-extrabold text-slate-800 font-display mt-0.5">{totalExpected}</p>
            <p className="text-sm text-slate-700 mt-1">Across all shifts</p>
          </div>
        </div>

        {/* Card 3: Late Check In */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-3xs flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-slate-700  tracking-wide">Late Check In</p>
            <p className="text-3xl font-extrabold text-orange-655 font-display mt-0.5">{totalLate}</p>
            <p className="text-sm text-slate-700 mt-1">Staff late today</p>
          </div>
        </div>

        {/* Card 4: Absent */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-3xs flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-650" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-slate-700  tracking-wide">Absent</p>
            <p className="text-3xl font-extrabold text-red-650 font-display mt-0.5">{totalAbsent}</p>
            <p className="text-sm text-slate-700 mt-1">No check in</p>
          </div>
        </div>

      </div>

      {/* Row 3: Filter Bar */}
      <div id="filter-bar" className="bg-white border border-slate-100 rounded-xl p-4 shadow-3xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          
          {/* Search Input */}
          <div className="sm:col-span-1 lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
            <input
              type="text"
              placeholder="Search staff by name, email or phone..."
              className="w-full pl-9 pr-3 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/15 bg-white rounded-lg text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Date Picker Selector */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
            <select
              className="w-full pl-9 pr-8 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] bg-white rounded-lg text-sm text-slate-700 outline-none transition-all appearance-none cursor-pointer"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="May 12, 2024">May 12, 2024</option>
              <option value="May 13, 2024">May 13, 2024</option>
              <option value="May 14, 2024">May 14, 2024</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
          </div>

          {/* Branches Select */}
          <div className="relative">
            <select
              className="w-full pl-3 pr-8 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] bg-white rounded-lg text-sm text-slate-700 font-semibold outline-none transition-all appearance-none cursor-pointer"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="All">All Branches</option>
              <option value="HCM 1">HCM 1</option>
              <option value="HCM 2">HCM 2</option>
              <option value="HN 1">HN 1</option>
              <option value="HQ">HQ</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
          </div>

          {/* Departments Select */}
          <div className="relative">
            <select
              className="w-full pl-3 pr-8 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] bg-white rounded-lg text-sm text-slate-700 font-semibold outline-none transition-all appearance-none cursor-pointer"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All">All Job Roles</option>
              <option value="Operation">Operation</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bar">Bar</option>
              <option value="Service">Service</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
          </div>

          {/* Shifts Filter */}
          <div className="relative">
            <select
              className="w-full pl-3 pr-8 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] bg-white rounded-lg text-sm text-slate-700 font-semibold outline-none transition-all appearance-none cursor-pointer"
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option value="All">All Shifts</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
          </div>

          {/* Statuses Filter */}
          <div className="relative sm:col-span-2 lg:col-span-1 border-t sm:border-t-0 pt-2 sm:pt-0">
            <select
              className="w-full pl-3 pr-8 h-[38px] border border-slate-200 hover:border-[#7553FF]/40 focus:border-[#7553FF] bg-white rounded-lg text-sm text-slate-700 font-semibold outline-none transition-all appearance-none cursor-pointer"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="On Time">On Time</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Row 4: Attendance Table */}
      <div id="table-container" className="bg-white border border-slate-100 rounded-lg shadow-3xs overflow-hidden p-0">
        <div className="overflow-x-auto -mx-6 md:mx-0 rounded-lg">
          <table className="w-full min-w-[800px] border-collapse bg-white text-left font-sans">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-medium text-slate-700  tracking-wider font-display select-none">
              <th className="px-5 py-4 text-left">Staff</th>
              <th className="px-4 py-4 text-left">Job Role</th>
              <th className="px-4 py-4 text-left">Shift</th>
              <th className="px-4 py-4 text-left">Check In</th>
              <th className="px-4 py-4 text-left">Check Out</th>
              <th className="px-4 py-4 text-left">Working Hours</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-left">Location</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[14px] text-slate-700 font-sans">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-700 font-medium text-[14px]">
                  No attendance logs match the current filter selection query.
                </td>
              </tr>
            ) : (
              paginatedData.map((log) => {
                const initials = log.name
                  .split(" ")
                  .map((n: string) => n.charAt(0))
                  .join("")
                  .substring(0, 2);

                return (
                  <tr key={log.id} className="hover:bg-slate-50/30 transition-all">
                    {/* Staff */}
                    <td className="py-3.5 px-5 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border border-white flex items-center justify-center font-normal text-[14px] tracking-wide  ${log.avatarColor || "bg-purple-100 text-[#7553FF]"} shadow-3xs`}>
                        {initials}
                      </div>
                      <div className="text-left leading-tight">
                        <span className="font-medium text-slate-850 block hover:text-[#7553FF] transition-colors cursor-pointer text-[14px]">{log.name}</span>
                        <span className="text-[14px] text-slate-700 mt-0.5 block">{log.email}</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {log.department}
                    </td>

                    {/* Shift */}
                    <td className="py-3.5 px-4 text-left leading-tight">
                      <span className="font-medium text-slate-750 block text-[14px]">{log.shiftTimes}</span>
                      <span className={`inline-block text-[14px] font-medium px-1.5 py-0.5 mt-1 rounded  tracking-wider ${
                        log.shiftName === "Morning" 
                          ? "bg-blue-50 text-blue-600" 
                          : log.shiftName === "Afternoon"
                          ? "bg-[#7553FF]/10 text-[#7553FF]"
                          : "bg-purple-50 text-purple-700"
                      }`}>
                        {log.shiftName}
                      </span>
                    </td>

                    {/* Check In */}
                    <td className="py-3.5 px-4 text-left leading-tight">
                      {log.checkInTime ? (
                        <>
                          <span className={`font-medium block text-[14px] ${
                            log.status.startsWith("Late") ? "text-amber-600" : "text-[#15803D]"
                          }`}>
                            {log.checkInTime}
                          </span>
                          <span className="text-slate-700 text-[14px] flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-700" />
                            {log.checkInLoc || "Front Desk"}
                          </span>
                        </>
                      ) : (
                        <span className="text-[14px] text-slate-700 font-normal cursor-default">-</span>
                      )}
                    </td>

                    {/* Check Out */}
                    <td className="py-3.5 px-4 text-left leading-tight">
                      {log.checkOutTime ? (
                        <>
                          <span className="font-medium block text-[14px] text-emerald-600">
                            {log.checkOutTime}
                          </span>
                          <span className="text-slate-700 text-[14px] flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-700" />
                            {log.checkOutLoc || "Front Desk"}
                          </span>
                        </>
                      ) : (
                        <span className="text-[14px] text-slate-700 font-normal cursor-default">-</span>
                      )}
                    </td>

                    {/* Working Hours */}
                    <td className="py-3.5 px-4 font-medium text-slate-700 text-left text-[14px]">
                      {log.workingHours || "-"}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-left">
                      {log.status === "On Time" && (
                        <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                          On time
                        </span>
                      )}
                      {log.status.startsWith("Late") && (
                        <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                          {log.status}
                        </span>
                      )}
                      {log.status === "Absent" && (
                        <span className="inline-flex items-center bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                          Absent
                        </span>
                      )}
                      {log.status === "Completed" && (
                        <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                          Completed
                        </span>
                      )}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-left">
                      <span className="inline-flex items-center gap-1 text-[14px] text-slate-700 font-medium font-sans">
                        <MapPin className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                        {log.location}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-5 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setActiveLog(log);
                              setIsViewModalOpen(true);
                            }}
                            title="View log details"
                            className="p-1 text-slate-700 hover:text-[#7553FF] transition-colors rounded hover:bg-slate-50"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setActiveLog({ ...log });
                              setIsEditModalOpen(true);
                            }}
                            title="Edit attendance"
                            className="p-1 text-slate-700 hover:text-[#7553FF] transition-colors rounded hover:bg-slate-50"
                          >
                            <Pencil className="w-4 h-4" />
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

        {/* Dynamic Footer Controls & Pagination Row */}
        <div id="table-footer" className="bg-[#FAF9F7]/40 border-t border-t-slate-100 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>Show</span>
            <div className="relative">
              <select
                className="pl-2.5 pr-6 h-[28px] border border-slate-200 focus:border-[#7553FF] bg-white rounded text-sm text-slate-700 outline-none transition-all appearance-none cursor-pointer font-bold"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-700 pointer-events-none" />
            </div>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
            <span>
              {startRecordIndex} – {endRecordIndex} of {totalItems}
            </span>
            <div className="flex items-center gap-1 font-semibold">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 transition-colors"
                title="Previous page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`w-7 h-7 rounded font-bold font-sans text-sm flex items-center justify-center transition-all ${
                    currentPage === pg
                      ? "bg-[#7553FF] text-white shadow-3xs"
                      : "border border-slate-100 hover:bg-slate-50 text-slate-650"
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================== MODAL 1: MANUAL CHECK IN ==================================== */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-2xl max-w-2xl w-full overflow-hidden text-slate-800"
            >
              {/* Header */}
              <div className="px-8 pt-7 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1E1B4B] font-display">Manual Check In</h3>
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="p-1 rounded-full text-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[14px] text-slate-700 mt-1">Record a check in for a staff member manually.</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleManualCheckInSubmit}>
                <div className="px-8 pb-6 space-y-6 max-h-[72vh] overflow-y-auto text-left">
                  
                  {/* Section 1: Staff Selection */}
                  <div className="space-y-3">
                    <h4 className="text-[14px] font-bold text-[#1E1B4B]  tracking-wide border-b border-slate-100 pb-1.5 select-none">Staff Selection</h4>
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-semibold text-slate-700">Staff <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowStaffDropdown(!showStaffDropdown)}
                          className="w-full flex items-center justify-between px-4 py-3 border border-slate-100 rounded-xl text-left bg-white hover:bg-slate-50/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF]"
                        >
                          <div className="flex items-center gap-3">
                            {selectedStaff.avatarUrl ? (
                              <img
                                src={selectedStaff.avatarUrl}
                                alt={selectedStaff.name}
                                className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-3xs"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-indigo-50 text-[#7553FF] border border-slate-100 flex items-center justify-center font-bold text-sm shadow-3xs">
                                {selectedStaff.name.split(" ").map(n => n[0]).join("")}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-slate-800 text-[14px]">{selectedStaff.name}</div>
                              <div className="text-[14px] text-slate-700 mt-0.5">{selectedStaff.email}</div>
                            </div>
                          </div>
                          <ChevronDown className="w-4 h-4 text-slate-700" />
                        </button>
                        
                        {showStaffDropdown && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-52 overflow-y-auto bg-white border border-slate-100 rounded-xl shadow-xl divide-y divide-slate-100">
                            {availableStaff.map((staff) => (
                              <button
                                key={staff.id}
                                type="button"
                                onClick={() => {
                                  setSelectedStaff(staff);
                                  setNewStaffName(staff.id === "custom" ? "" : staff.name);
                                  setNewStaffEmail(staff.id === "custom" ? "" : staff.email);
                                  if (staff.department) setNewStaffDept(staff.department);
                                  setShowStaffDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
                              >
                                {staff.avatarUrl ? (
                                  <img
                                    src={staff.avatarUrl}
                                    alt={staff.name}
                                    className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-3xs"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#7553FF] border border-slate-100 flex items-center justify-center font-bold text-[14px] shadow-3xs">
                                    {staff.name.split(" ").map(n => n[0]).join("")}
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold text-slate-700 text-[14px]">{staff.name}</div>
                                  <div className="text-[14px] text-slate-700">{staff.email}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Custom inputs shown if custom is chosen */}
                      {selectedStaff.id === "custom" && (
                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100">
                          <div className="space-y-1">
                            <label className="text-[14px] font-semibold text-slate-600 block">Custom Name <span className="text-rose-500">*</span></label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Nguyen An"
                              className="w-full px-3.5 py-2.5 border border-slate-100 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                              value={newStaffName}
                              onChange={(e) => setNewStaffName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[14px] font-semibold text-slate-600 block">Custom Email <span className="text-rose-500">*</span></label>
                            <input
                              type="type"
                              required
                              placeholder="e.g. nguyen.an@johnsbistro.com"
                              className="w-full px-3.5 py-2.5 border border-slate-100 rounded-xl text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                              value={newStaffEmail}
                              onChange={(e) => setNewStaffEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 2: Check In Details */}
                  <div className="space-y-4">
                    <h4 className="text-[14px] font-bold text-[#1E1B4B]  tracking-wide border-b border-slate-100 pb-1.5 select-none">Check In Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-slate-700">Check In Date <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                          <input
                            type="text"
                            required
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-100 rounded-xl text-[14px] text-slate-800 outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 font-sans"
                            value={newStaffDate}
                            onChange={(e) => setNewStaffDate(e.target.value)}
                          />
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-slate-700">Check In Time <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                          <input
                            type="text"
                            required
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-100 rounded-xl text-[14px] text-slate-800 outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 font-sans"
                            value={newStaffCheckin}
                            onChange={(e) => setNewStaffCheckin(e.target.value)}
                          />
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-slate-700">Shift <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <select
                            className="w-full pl-4 pr-10 py-2.5 border border-slate-100 rounded-xl bg-white text-[14px] text-slate-800 outline-none focus:border-[#7553FF] cursor-pointer appearance-none"
                            value={newStaffShift}
                            onChange={(e) => setNewStaffShift(e.target.value)}
                          >
                            <option value="Morning">Morning Shift (09:00 AM - 05:00 PM)</option>
                            <option value="Afternoon">Afternoon Shift (02:00 PM - 10:00 PM)</option>
                            <option value="Evening">Evening Shift (05:00 PM - 11:00 PM)</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-slate-700">Location <span className="text-rose-500">*</span></label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                          <select
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-100 rounded-xl bg-white text-[14px] text-slate-800 outline-none focus:border-[#7553FF] cursor-pointer appearance-none"
                            value={newStaffLocation}
                            onChange={(e) => setNewStaffLocation(e.target.value)}
                          >
                            <option value="Front Desk">Front Desk</option>
                            <option value="Back Office">Back Office</option>
                            <option value="Kitchen Gate">Kitchen Gate</option>
                            <option value="Main Lobby">Main Lobby</option>
                          </select>
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[14px] font-semibold text-slate-700">Note <span className="text-slate-700 font-normal">(Optional)</span></label>
                        <span className="text-[14px] text-slate-700 font-medium font-mono">{noteText.length}/200</span>
                      </div>
                      <input
                        type="text"
                        maxLength={200}
                        placeholder="Enter note (optional)"
                        className="w-full px-4 py-2.5 border border-slate-100 rounded-xl text-[14px] text-slate-800 outline-none focus:border-[#7553FF] focus:ring-1 focus:ring-[#7553FF]/20 placeholder:text-slate-700"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Section 3: Working Hours (Optional) */}
                  <div className="space-y-1">
                    <h4 className="text-[14px] font-semibold text-[#1E1B4B]">Working Hours <span className="text-[14px] text-slate-700 font-light">(Optional)</span></h4>
                    <p className="text-[14px] text-slate-700">Leave blank to calculate automatically from check in and check out time.</p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/20 text-left">
                        <div className="text-[14px] font-medium text-slate-700  tracking-wider mb-2">Expected Working Hours</div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-700 shrink-0" />
                          <input
                            type="text"
                            className="bg-transparent font-semibold text-[14px] text-slate-800 outline-none w-full border-b border-dashed border-slate-350 focus:border-[#7553FF]"
                            value={expectedHours}
                            onChange={(e) => setExpectedHours(e.target.value)}
                          />
                        </div>
                        <div className="text-[14px] text-slate-700 mt-2 font-display">09:00 AM - 05:00 PM (Including 1h break)</div>
                      </div>

                      <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/20 text-left">
                        <div className="text-[14px] font-medium text-slate-700  tracking-wider mb-2">Break Duration</div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            className="bg-transparent font-semibold text-[14px] text-slate-800 outline-none w-full border-b border-dashed border-slate-150 focus:border-[#7553FF]"
                            value={breakDuration}
                            onChange={(e) => setBreakDuration(e.target.value)}
                          />
                        </div>
                        <div className="text-[14px] text-slate-700 mt-2">Default break time</div>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Attachments (Optional) */}
                  <div className="space-y-1">
                    <h4 className="text-[14px] font-semibold text-[#1E1B4B]">Attachments <span className="text-[14px] text-slate-700 font-light">(Optional)</span></h4>
                    <p className="text-[14px] text-slate-700">You can upload supporting documents if needed.</p>
                    
                    <div className="pt-2">
                      <label className="flex flex-col items-center justify-center border border-dashed border-slate-100 rounded-2xl p-6 bg-white hover:bg-slate-50/30 cursor-pointer transition-all hover:border-[#7553FF]/45 group">
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachedFile(e.target.files[0]);
                            }
                          }}
                        />
                        <Upload className="w-6 h-6 text-slate-700 group-hover:text-[#7553FF] transition-colors mb-2" />
                        <span className="text-[14px] font-semibold text-slate-700">
                          {attachedFile ? attachedFile.name : "Upload file (Optional)"}
                        </span>
                        <span className="text-[14px] text-slate-700 mt-1">
                          {attachedFile ? `${(attachedFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace` : "JPG, PNG, PDF up to 5MB"}
                        </span>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="border-t border-slate-100 px-8 py-5 flex items-center justify-end gap-3 bg-slate-50/20">
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-[14px] font-bold text-white bg-[#5D38F5] hover:bg-[#4C2CD3] rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    Save Check In
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================== MODAL 2: EDIT CHECK IN RECORD ==================================== */}
      <AnimatePresence>
        {isEditModalOpen && activeLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1814]/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden text-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-b-slate-100 px-6 py-4.5 bg-[#FAF9F7]/85">
                <div>
                  <h3 className="text-base font-bold text-slate-800 font-display">Edit Attendance</h3>
                  <p className="text-[14px] text-slate-700 mt-0.5 font-medium">Overwriting data log for {activeLog.name}</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 rounded-md text-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleEditSave}>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-left">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Check-In Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 08:58 AM"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.checkInTime || ""}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, checkInTime: e.target.value || null })
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Check-In Location Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. Front Desk"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.checkInLoc || ""}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, checkInLoc: e.target.value || null })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Check-Out Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 05:02 PM"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.checkOutTime || ""}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, checkOutTime: e.target.value || null })
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Check-Out Location Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. Front Desk"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.checkOutLoc || ""}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, checkOutLoc: e.target.value || null })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Working Hours Summary</label>
                      <input
                        type="text"
                        placeholder="e.g. 8h 17m"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.workingHours || ""}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, workingHours: e.target.value || null })
                        }
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[14px] font-bold text-slate-700 tracking-wide">Branch Code</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-[14px] outline-none focus:border-[#7553FF] text-slate-800"
                        value={activeLog.location}
                        onChange={(e) =>
                          setActiveLog({ ...activeLog, location: e.target.value })
                        }
                      >
                        <option value="HCM 1">HCM 1</option>
                        <option value="HCM 2">HCM 2</option>
                        <option value="HN 1">HN 1</option>
                        <option value="HQ">HQ</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[14px] font-bold text-slate-700 tracking-wide">Attendance Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-[14px] outline-none focus:border-[#7553FF] cursor-pointer text-slate-800"
                      value={activeLog.status}
                      onChange={(e) =>
                        setActiveLog({ ...activeLog, status: e.target.value })
                      }
                    >
                      <option value="On Time">On Time</option>
                      <option value="Absent">Absent</option>
                      <option value="Completed">Completed</option>
                      <option value="Late (5m)">Late (5m)</option>
                      <option value="Late (8m)">Late (8m)</option>
                      <option value="Late (12m)">Late (12m)</option>
                      <option value="Late (15m)">Late (15m)</option>
                    </select>
                  </div>

                </div>

                {/* Footer Controls */}
                <div className="bg-[#FAF9F7]/85 border-t border-t-slate-100 px-6 py-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-[14px] font-bold text-slate-700 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-[14px] font-bold text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-lg shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================== MODAL 3: VIEW LOG DETAILS (GEOLOCATION CHECKS) ==================================== */}
      <AnimatePresence>
        {isViewModalOpen && activeLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1814]/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden text-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-b-slate-100 px-6 py-4.5 bg-[#FAF9F7]/80">
                <h3 className="text-base font-bold text-slate-800 font-display">Staff Geolocation Validation</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-1 rounded-md text-slate-700 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Content */}
              <div className="p-6 space-y-5 text-left">
                
                {/* Staff Intro Card */}
                <div className="flex items-center gap-3 pb-4 border-b border-b-slate-100">
                  <div className={`w-11 h-11 rounded-full ${activeLog.avatarColor || "bg-indigo-100 text-[#7553FF]"} flex items-center justify-center font-bold text-[14px] border border-slate-200/50`}>
                    {activeLog.name
                      .split(" ")
                      .map((n: string) => n.charAt(0))
                      .join("")
                      .substring(0, 2)}
                  </div>
                  <div className="leading-tight">
                    <h4 className="font-bold text-[15px] text-slate-800">{activeLog.name}</h4>
                    <span className="text-[14px] text-slate-700 mt-0.5 block">{activeLog.email}</span>
                  </div>
                </div>

                {/* GPS Validation Metrics */}
                <div className="space-y-3 font-sans">
                  <h5 className="text-[14px] font-bold text-[#7553FF]  tracking-wider">Geofence Compliance Verification</h5>
                  
                  {activeLog.status !== "Absent" ? (
                    <div className="space-y-3 pt-1">
                      
                      {/* Measurement Info */}
                      <div className="p-3.5 bg-green-50/50 border border-green-150 rounded-xl space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[14px] text-[#15803D]">
                          <ShieldCheck className="w-4 h-4" />
                          <span>PASS (In Range Distance &lt; 500m)</span>
                        </div>
                        <p className="text-[14px] text-slate-650 leading-relaxed pt-1.5">
                          Staff clock-in coordinates matched Hanoi and HCM regional geofencing registers. Satellite signal strength measured <strong>High (98%)</strong>. Zero device proxy detected.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-[14px] font-medium text-slate-600">
                        <div className="p-3 bg-[#FAF9F7] rounded-lg border border-slate-150/60">
                          <span className="text-slate-700 text-[14px]  font-bold tracking-wide">Baseline LAT / LONG</span>
                          <p className="font-mono text-slate-850 mt-1">21.0285° N, 105.8542° E</p>
                        </div>
                        <div className="p-3 bg-[#FAF9F7] rounded-lg border border-slate-150/60">
                          <span className="text-slate-700 text-[14px]  font-bold tracking-wide">Target Measured Distance</span>
                          <p className="font-mono text-slate-850 mt-1">3.4 Meters</p>
                        </div>
                        <div className="p-3 bg-[#FAF9F7] rounded-lg border border-slate-150/60 col-span-2">
                          <span className="text-slate-700 text-[14px]  font-bold tracking-wide">Biometric Key Scan ID</span>
                          <p className="font-mono text-slate-850 mt-1">SHA_256_HASH_8F66E7C{activeLog.id}</p>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="p-3.5 bg-red-50/50 border border-red-150 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[14px] text-red-700">
                        <AlertCircle className="w-4 h-4" />
                        <span>NO DATA (Absent Employee)</span>
                      </div>
                      <p className="text-[14px] text-slate-700 pt-1">
                        This employee is currently marked as Absent for this shift period. No GPS or terminal geofence logins have been recorded yet.
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* Footer */}
              <div className="bg-[#FAF9F7]/80 border-t border-t-slate-100 px-6 py-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-5 py-2 text-[14px] font-bold text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-lg shadow-sm transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ============================================================================
// 2. LEAVE & FLEXTIME CALCULATOR VIEW
// ============================================================================
export function LeaveCalculatorView() {
  // Tabs: 'leave' for Leave Requests, 'flextime' for Flextime
  const [activeSubTab, setActiveSubTab] = useState<"leave" | "flextime">("flextime");

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

  // Pre-seed beautiful photos for Avatars to match the mockup exactly
  const avatars: Record<string, string> = {
    "Le Chi": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    "Tran Binh": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "Pham Dung": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    "Hoang Em": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    "Vu Giang": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    "Phan Linh": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    "Dang Khoa": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face",
    "Bui Thuy": "https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&h=100&fit=crop&crop=face",
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
  };

  // Flextime Dataset matching the screenshot exactly
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
      status: "Active",
      createdOn: "May 10, 2024",
      createdTime: "10:30 AM",
    },
    {
      id: "flex-2",
      name: "Tran Binh",
      department: "HR",
      flextimeType: "Compressed Workweek",
      schedule: "4 days / week",
      scheduleDetails: "Mon – Thu (9:00 AM – 6:00 PM)",
      dateRange: "May 13 – Aug 11, 2024",
      days: "Mon - Thu",
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
      status: "Active",
      createdOn: "May 12, 2024",
      createdTime: "03:30 PM",
    },
    {
      id: "flex-7",
      name: "Dang Khoa",
      department: "Operation",
      flextimeType: "Compressed Workweek",
      schedule: "4 days / week",
      scheduleDetails: "Mon – Thu (9:00 AM – 6:00 PM)",
      dateRange: "Apr 28 – Jul 28, 2024",
      days: "Mon - Thu",
      status: "Active",
      createdOn: "Apr 28, 2024",
      createdTime: "08:40 AM",
    },
    {
      id: "flex-8",
      name: "Bui Thuy",
      department: "HR",
      flextimeType: "Flexible Hours",
      schedule: "Core Hours: 9:30 AM – 2:30 PM",
      scheduleDetails: "Flexible: Before 9:30 AM / After 2:30 PM",
      dateRange: "Jun 3 – Sep 3, 2024",
      days: "Mon - Fri",
      status: "Pending",
      createdOn: "May 6, 2024",
      createdTime: "01:10 PM",
    },
  ]);

  // Leave Requests dataset
  const [leaveRequestsList, setLeaveRequestsList] = useState<any[]>([
    {
      id: "leave-rec-1",
      name: "Le Chi",
      department: "Sales",
      leaveType: "Annual Leave",
      reason: "Family vacation",
      dateRange: "May 20 – May 24, 2024",
      days: 5,
      dayText: "(Mon – Fri)",
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
      status: "Approved",
      createdOn: "May 9, 2024",
      createdTime: "02:45 PM",
    },
    {
      id: "leave-rec-5",
      name: "Vu Giang",
      department: "Bar",
      leaveType: "Unpaid Leave",
      reason: "Travel",
      dateRange: "Jun 3 – Jun 5, 2024",
      days: 3,
      dayText: "(Mon – Wed)",
      status: "Rejected",
      createdOn: "May 8, 2024",
      createdTime: "11:05 AM",
    },
    {
      id: "leave-rec-6",
      name: "Phan Linh",
      department: "Service",
      leaveType: "Annual Leave",
      reason: "Family trip",
      dateRange: "Jun 10 – Jun 14, 2024",
      days: 5,
      dayText: "(Mon – Fri)",
      status: "Pending",
      createdOn: "May 12, 2024",
      createdTime: "03:30 PM",
    },
    {
      id: "leave-rec-7",
      name: "Dang Khoa",
      department: "Operation",
      leaveType: "Sick Leave",
      reason: "Stomach pain",
      dateRange: "May 14 – May 14, 2024",
      days: 1,
      dayText: "(Tue)",
      status: "Approved",
      createdOn: "May 7, 2024",
      createdTime: "08:40 AM",
    },
    {
      id: "leave-rec-8",
      name: "Bui Thuy",
      department: "HR",
      leaveType: "Personal Leave",
      reason: "Bank appointment",
      dateRange: "Jun 1 – Jun 1, 2024",
      days: 1,
      dayText: "(Sat)",
      status: "Approved",
      createdOn: "May 6, 2024",
      createdTime: "01:10 PM",
    },
  ]);

  // Handle Export File Simulation
  const [showExportToast, setShowExportToast] = useState(false);
  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  // New leave request state form
  const [newReqName, setNewReqName] = useState("Le Chi");
  const [newReqDept, setNewReqDept] = useState("Sales");
  const [newReqType, setNewReqType] = useState("Annual Leave");
  const [newReqReason, setNewReqReason] = useState("");
  const [newReqStartDate, setNewReqStartDate] = useState("2024-06-25");
  const [newReqEndDate, setNewReqEndDate] = useState("2024-06-28");
  const [newScheduleType, setNewScheduleType] = useState("Flexible Hours");
  const [newFlexSchedule, setNewFlexSchedule] = useState("Core Hours: 10:00 AM – 3:00 PM");
  const [newFlexDays, setNewFlexDays] = useState("Mon - Fri");

  // Filter implementation
  const activeDataset = activeSubTab === "leave" ? leaveRequestsList : flextimeList;

  const filteredData = activeDataset.filter((item) => {
    // 1. Search Query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Status Filter
    let matchesStatus = true;
    if (statusFilter !== "All Status") {
      matchesStatus = item.status.toLowerCase() === statusFilter.toLowerCase();
    }

    // 3. Type Filter
    let matchesType = true;
    if (typeFilter !== "All Types") {
      if (activeSubTab === "leave") {
        matchesType = item.leaveType.toLowerCase() === typeFilter.toLowerCase();
      } else {
        matchesType = item.flextimeType.toLowerCase() === typeFilter.toLowerCase();
      }
    }

    // 4. Department Filter
    let matchesDept = true;
    if (deptFilter !== "All Job Roles") {
      matchesDept = item.department.toLowerCase() === deptFilter.toLowerCase();
    }

    return matchesSearch && matchesStatus && matchesType && matchesDept;
  });

  // Pagination index helper
  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Recalculating dynamic metrics based on lists
  const approvedCount = leaveRequestsList.filter(l => l.status === "Approved").length;
  const pendingCount = leaveRequestsList.filter(l => l.status === "Pending").length;
  const rejectedCount = leaveRequestsList.filter(l => l.status === "Rejected").length;
  const totalLeaveBalance = 128.5; // Starting balance

  // Handle Action selection
  const handleActionClick = (menuId: string) => {
    if (activeActionMenuId === menuId) {
      setActiveActionMenuId(null);
    } else {
      setActiveActionMenuId(menuId);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    if (activeSubTab === "leave") {
      setLeaveRequestsList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } else {
      setFlextimeList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    }
    setActiveActionMenuId(null);
  };

  const handleDeleteItem = (id: string) => {
    if (activeSubTab === "leave") {
      setLeaveRequestsList(prev => prev.filter(item => item.id !== id));
    } else {
      setFlextimeList(prev => prev.filter(item => item.id !== id));
    }
    setActiveActionMenuId(null);
  };

  // Submit Leave Request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSubTab === "leave") {
      const daysComputed = Math.max(1, Math.round((new Date(newReqEndDate).getTime() - new Date(newReqStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1);
      const formattedDateRange = `${new Date(newReqStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(newReqEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      const newLeave: any = {
        id: `leave-${Date.now()}`,
        name: newReqName,
        department: newReqDept,
        leaveType: newReqType,
        reason: newReqReason || "Standard time off request",
        dateRange: formattedDateRange,
        days: daysComputed,
        status: "Pending",
        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setLeaveRequestsList(prev => [newLeave, ...prev]);
    } else {
      const formattedDateRange = `${new Date(newReqStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(newReqEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      const newFlex: any = {
        id: `flex-${Date.now()}`,
        name: newReqName,
        department: newReqDept,
        flextimeType: newScheduleType,
        schedule: newFlexSchedule,
        scheduleDetails: newScheduleType === "Flexible Hours" ? "Flexible arrangement around core times" : "Manager verified arrangement",
        dateRange: formattedDateRange,
        days: newFlexDays,
        status: "Pending",
        createdOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setFlextimeList(prev => [newFlex, ...prev]);
    }

    setIsNewRequestModalOpen(false);
    // Clear fields
    setNewReqReason("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans p-2">
      
      {/* Dynamic Action Notification Toast */}
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

      {/* Header element */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 text-left border-b border-b-slate-100">
        <div className="space-y-1">
          <h1 id="leave-flextime-layout-title" className="text-3xl font-bold tracking-tight text-slate-800 font-display">
            Leave & Flextime
          </h1>
          <p className="text-[14px] text-slate-700 font-sans mt-0.5 leading-relaxed">
            Manage leave requests and flextime schedules for your team.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="export-metrics-btn"
            onClick={handleExport}
            className="px-4 py-2 text-[14px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Upload className="w-4 h-4 text-slate-700" />
            Export
          </button>
          <button
            id="add-new-leave-req-btn"
            onClick={() => setIsNewRequestModalOpen(true)}
            className="px-4 py-2 text-[14px] font-semibold text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#7553FF]/20"
          >
            <Plus className="w-4 h-4" />
            New Leave/Flex Request
          </button>
        </div>
      </div>

      {/* KPI Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Leave Balance */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center gap-4 text-left hover:shadow-sm transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#7553FF] shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-slate-700  tracking-wider">Total Leave Balance</p>
            <p className="text-3xl font-extrabold text-[#15803D] mt-0.5 font-display">{totalLeaveBalance.toFixed(1)}</p>
            <p className="text-[14px] text-slate-700 font-sans mt-0.5">Days available</p>
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center gap-4 text-left hover:shadow-sm transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#15803D] shrink-0">
            <Send className="w-5 h-5 -rotate-45 text-[#15803D]" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-slate-700  tracking-wider">Approved</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-0.5 font-display">{approvedCount}</p>
            <p className="text-[14px] text-slate-700 font-sans mt-0.5">Requests</p>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center gap-4 text-left hover:shadow-sm transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-slate-700  tracking-wider">Pending</p>
            <p className="text-3xl font-extrabold text-amber-600 mt-0.5 font-display">{pendingCount}</p>
            <p className="text-[14px] text-slate-700 font-sans mt-0.5">Requests</p>
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center gap-4 text-left hover:shadow-sm transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-red-50/70 flex items-center justify-center text-red-650 shrink-0">
            <div className="w-6 h-6 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 text-[14px] font-extrabold leading-none">
              ✕
            </div>
          </div>
          <div>
            <p className="text-[14px] font-medium text-slate-700  tracking-wider">Rejected</p>
            <p className="text-3xl font-extrabold text-red-600 mt-0.5 font-display">{rejectedCount}</p>
            <p className="text-[14px] text-slate-700 font-sans mt-0.5">Requests</p>
          </div>
        </div>

      </div>

      {/* Tabs list bar */}
      <div className="flex border-b border-b-slate-100 items-baseline pt-2 leading-none relative">
        <button
          onClick={() => {
            setActiveSubTab("leave");
            setCurrentPage(1);
            setTypeFilter("All Types");
          }}
          className={`pb-[14px] px-5 font-semibold text-[14px] transition-all relative cursor-pointer ${
            activeSubTab === "leave" ? "text-[#7553FF] font-bold" : "text-slate-700 hover:text-slate-600"
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
          className={`pb-[14px] px-5 font-semibold text-[14px] transition-all relative cursor-pointer ${
            activeSubTab === "flextime" ? "text-[#7553FF] font-bold" : "text-slate-700 hover:text-slate-600"
          }`}
        >
          Flextime
          {activeSubTab === "flextime" && (
            <motion.div
              layoutId="leaveSubTabIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7553FF]"
            />
          )}
        </button>
      </div>

      {/* Interactive live filter panel matching mockup layout */}
      <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center justify-between bg-white py-4 px-4 border border-slate-100 rounded-3xl shadow-3xs">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* Search name field */}
          <div className="relative min-w-[240px] w-full sm:w-auto">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-700" />
            <input
              type="text"
              placeholder="Search staff by name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 focus:border-[#7553FF]/60 placeholder:text-slate-700 focus:ring-1 focus:ring-[#7553FF]/10 transition-all font-medium"
            />
          </div>
          
          {/* Date range selection */}
          <div className="relative w-full sm:w-auto">
            <select
              value={dateRangeFilter}
              onChange={(e) => {
                setDateRangeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-semibold appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all"
            >
              <option value="All Date Ranges">May 12 – Jun 12, 2024</option>
              <option value="May">May 2024</option>
              <option value="June">June 2024</option>
              <option value="All">All Date Ranges</option>
            </select>
            <Calendar className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-slate-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status select options */}
          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-4 pr-9 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-semibold appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all"
            >
              <option value="All Status">All Status</option>
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

          {/* Type dropdown options */}
          <div className="relative w-full sm:w-auto">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-semibold appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all"
            >
              {activeSubTab === "leave" ? (
                <>
                  <option value="All Types">All Leave Types</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
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

          {/* Department options */}
          <div className="relative w-full sm:w-auto">
            <select
              value={deptFilter}
              onChange={(e) => {
                setDeptFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50/20 border border-slate-200 rounded-xl outline-none text-[14px] text-slate-800 font-semibold appearance-none cursor-pointer focus:border-[#7553FF]/60 transition-all"
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

        {/* Clear/Reset button styled as Filter */}
        <button
          onClick={() => {
            setSearchQuery("");
            setStatusFilter("All Status");
            setTypeFilter("All Types");
            setDeptFilter("All Job Roles");
            setDateRangeFilter("All Date Ranges");
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 bg-slate-50/20 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center shadow-3xs"
        >
          <Filter className="w-4 h-4 text-slate-700" />
          Filters
        </button>

      </div>

      {/* Main Table Segment */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-[#FAF9F7]/40 text-[14px] font-medium text-slate-800  tracking-wider select-none">
                <th className="px-5 py-5 text-left font-sans text-[14px] font-semibold">Staff</th>
                {activeSubTab === "leave" ? (
                  <>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Leave Type</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Date Range</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Duration</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Reason</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Flextime Type</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Schedule / Arrangement</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Date Range</th>
                    <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Working Days</th>
                  </>
                )}
                <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">Status</th>
                <th className="px-4 py-5 text-left font-sans text-[14px] font-semibold">
                  {activeSubTab === "leave" ? "Applied On" : "Created On"}
                </th>
                <th className="px-5 py-5 text-center font-sans text-[14px] font-semibold w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[14px] text-slate-705 font-sans">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-700 font-medium text-[14px]">
                    No schedules or leave requests match your selected filtration criteria.
                  </td>
                </tr>
              ) : (
                paginatedData.map((record) => {
                  const initials = record.name
                    ?.split(" ")
                    .map((n: string) => n.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "NA";

                  const photo = avatars[record.name];

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/20 transition-all font-sans">
                      
                      {/* Staff Thumbnail Info */}
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
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] tracking-wide  shrink-0 ${nameColors[record.name] || 'bg-slate-100 text-slate-700'}`}>
                              {initials}
                            </div>
                          )}
                          <div className="text-left leading-tight">
                            <span className="font-semibold text-slate-800 block text-[14px] hover:text-[#7553FF] transition-colors cursor-pointer">{record.name}</span>
                            <span className="text-xs text-slate-700 font-normal mt-0.5 block">{record.department}</span>
                          </div>
                        </div>
                      </td>

                      {/* Dynamic columns based on activeSubTab */}
                      {activeSubTab === "leave" ? (
                        <>
                          {/* Leave Type Badge Column */}
                          <td className="py-4 px-4 text-left">
                            {record.leaveType === "Annual Leave" ? (
                              <span className="inline-flex items-center bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Annual Leave
                              </span>
                            ) : record.leaveType === "Sick Leave" ? (
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Sick Leave
                              </span>
                            ) : record.leaveType === "Personal Leave" ? (
                              <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Personal Leave
                              </span>
                            ) : (
                              <span className="inline-flex items-center bg-slate-50 text-slate-700 border border-slate-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                {record.leaveType || "Unpaid Leave"}
                              </span>
                            )}
                          </td>

                          {/* Date Range Column */}
                          <td className="py-4 px-4 text-left leading-snug text-[14px]">
                            <span className="font-semibold text-slate-800 block">{record.dateRange}</span>
                            {record.dayText && (
                              <span className="text-slate-700 text-xs mt-0.5 block font-normal">{record.dayText}</span>
                            )}
                          </td>

                          {/* Duration Column */}
                          <td className="py-4 px-4 text-left text-slate-800 font-semibold text-[14px]">
                            {record.days} {record.days > 1 ? "days" : "day"}
                          </td>

                          {/* Reason Column */}
                          <td className="py-4 px-4 text-left text-slate-600 font-normal text-[14px] max-w-[280px] truncate" title={record.reason}>
                            {record.reason}
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Flextime Type */}
                          <td className="py-4 px-4 text-left">
                            {record.flextimeType === "Flexible Hours" ? (
                              <span className="inline-flex items-center bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Flexible Hours
                              </span>
                            ) : record.flextimeType === "Compressed Workweek" ? (
                              <span className="inline-flex items-center bg-violet-50 text-violet-700 border border-violet-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Compressed Workweek
                              </span>
                            ) : record.flextimeType === "Flexible Days" ? (
                              <span className="inline-flex items-center bg-teal-50 text-teal-700 border border-teal-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                Flexible Days
                              </span>
                            ) : (
                              <span className="inline-flex items-center bg-slate-50 text-slate-700 border border-slate-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                                {record.flextimeType || "Flextime"}
                              </span>
                            )}
                          </td>
                          {/* Schedule / Arrangement */}
                          <td className="py-4 px-4 text-left leading-tight">
                            <span className="font-semibold text-slate-800 block text-[14px]">{record.schedule}</span>
                            <span className="text-xs text-slate-700 font-normal mt-0.5 block">{record.scheduleDetails}</span>
                          </td>
                          {/* Date Range */}
                          <td className="py-4 px-4 text-left text-slate-800 font-semibold text-[14px]">
                            {record.dateRange}
                          </td>
                          {/* Working Days */}
                          <td className="py-4 px-4 text-left text-slate-800 font-normal text-[14px]">
                            {record.days}
                          </td>
                        </>
                      )}

                      {/* Status Column styled exactly like the Checkin table */}
                      <td className="py-4 px-4 text-left whitespace-nowrap">
                        {record.status === "Active" || record.status === "Approved" ? (
                          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                            {activeSubTab === "leave" ? "APPROVED" : "ACTIVE"}
                          </span>
                        ) : record.status === "Pending" ? (
                          <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                            PENDING
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none ">
                            {activeSubTab === "leave" ? "REJECTED" : "ENDED"}
                          </span>
                        )}
                      </td>

                      {/* Created On / Applied On Column */}
                      <td className="py-4 px-4 text-left leading-tight whitespace-nowrap">
                        <span className="font-semibold text-slate-800 text-[14px]">{record.createdOn}</span>
                        <span className="text-slate-700 text-xs mt-0.5 block font-normal">{record.createdTime}</span>
                      </td>

                      {/* Action Column */}
                      <td className="py-4 px-5 text-center whitespace-nowrap relative">
                        {activeSubTab === "leave" ? (
                          <div className="flex items-center justify-center gap-2">
                            {(record.status === "Pending" || record.status === "Approved" || record.status === "Active") && (
                              <button
                                onClick={() => handleUpdateStatus(record.id, activeSubTab === "leave" ? "Rejected" : "Ended")}
                                title={activeSubTab === "leave" ? "Reject Request" : "End Schedule"}
                                className="w-7 h-7 rounded-full border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 transition-all cursor-pointer flex items-center justify-center shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {(record.status === "Pending" || (record.status === "Approved" && record.days > 2)) && (
                              <button
                                onClick={() => handleUpdateStatus(record.id, activeSubTab === "leave" ? "Approved" : "Active")}
                                title={activeSubTab === "leave" ? "Approve Request" : "Activate Schedule"}
                                className="w-7 h-7 rounded-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-center shrink-0"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {(record.status === "Rejected" || record.status === "Ended") && (
                              <span className="text-slate-700 select-none font-medium px-2">—</span>
                            )}
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleActionClick(record.id)}
                              className="p-1.5 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer inline-flex items-center justify-center"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            
                            {/* Custom Dropdown absolute layout */}
                            {activeActionMenuId === record.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setActiveActionMenuId(null)} />
                                <div className="absolute right-6 top-10 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1.5 text-left text-[14px] text-slate-700">
                                  <span className="px-3 py-1.5 text-[11px] font-bold text-slate-700 block  tracking-wider border-b border-b-slate-100 mb-1">
                                    Change Status
                                  </span>
                                  
                                  {record.status !== "Active" && (
                                    <button
                                      onClick={() => handleUpdateStatus(record.id, "Active")}
                                      className="w-full px-3 py-2 text-left hover:bg-slate-150/10 flex items-center gap-1.5 text-[#15803D] font-medium"
                                    >
                                      <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                                      Activate
                                    </button>
                                  )}
                                  
                                  {record.status !== "Pending" && (
                                    <button
                                      onClick={() => handleUpdateStatus(record.id, "Pending")}
                                      className="w-full px-3 py-2 text-left hover:bg-slate-150/10 flex items-center gap-1.5 text-amber-600 font-medium"
                                    >
                                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                                      Mark Pending
                                    </button>
                                  )}

                                  {record.status !== "Ended" && (
                                    <button
                                      onClick={() => handleUpdateStatus(record.id, "Ended")}
                                      className="w-full px-3 py-2 text-left hover:bg-slate-150/10 flex items-center gap-1.5 text-red-650 font-medium"
                                    >
                                      <span className="w-2 h-2 rounded-full bg-red-650" />
                                      End Schedule
                                    </button>
                                  )}
                                  
                                  <div className="h-px bg-slate-100 my-1" />
                                  <button
                                    onClick={() => handleDeleteItem(record.id)}
                                    className="w-full px-3 py-2 text-left hover:bg-rose-50 text-red-650 font-semibold flex items-center gap-1.5 transition-colors"
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

        {/* Footer controls container */}
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
                className="pl-3 pr-8 py-1 bg-white border border-slate-200 rounded-lg outline-none cursor-pointer appearance-none text-[14px] font-bold text-slate-700 focus:border-[#7553FF]/60"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[14px] text-slate-700 font-medium">
              {(currentPage - 1) * pageSize + 1} – {Math.min(totalItems, currentPage * pageSize)} of {totalItems}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1 px-2.5 border border-slate-200 rounded-lg text-[14px] font-bold text-slate-650 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ‹
              </button>
              <button
                className="p-1 px-3 bg-purple-50 text-[#7553FF] border border-purple-100 rounded-lg text-[14px] font-bold"
              >
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

      {/* Leave Balance Summary Section */}
      {activeSubTab === "leave" && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 text-left shadow-3xs mt-6 font-sans">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800 font-display">
                Leave Balance Summary
              </h2>
              <p className="text-[14px] text-slate-700 mt-0.5 font-normal">
                Current leave balance for each leave type
              </p>
            </div>
            <button
              onClick={() => alert("Showing details for employee leave balances...")}
              className="px-4 py-2 border border-slate-150 hover:border-slate-305 text-[#7553FF] hover:text-[#5B39E3] rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-3xs bg-transparent"
            >
              <span>View Balance Details</span>
              <span className="text-[14px] font-semibold">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Annual Leave Card */}
            <div className="bg-slate-50/20 border border-slate-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-3xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#7E22CE] shrink-0 border border-purple-100">
                <Umbrella className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-700">Annual Leave</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1 font-display">18.5</p>
                <p className="text-xs text-slate-700 mt-0.5 font-normal">Days available</p>
              </div>
            </div>

            {/* Sick Leave Card */}
            <div className="bg-slate-50/20 border border-slate-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-3xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E40AF] shrink-0 border border-blue-100">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-700">Sick Leave</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1 font-display">7.0</p>
                <p className="text-xs text-slate-700 mt-0.5 font-normal">Days available</p>
              </div>
            </div>

            {/* Personal Leave Card */}
            <div className="bg-slate-50/20 border border-slate-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-3xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-[#D97706] shrink-0 border border-amber-100">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-700">Personal Leave</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1 font-display">5.0</p>
                <p className="text-xs text-slate-700 mt-0.5 font-normal">Days available</p>
              </div>
            </div>

            {/* Unpaid Leave Card */}
            <div className="bg-slate-50/20 border border-slate-100 rounded-3xl p-5 flex items-center gap-4 hover:shadow-3xs transition-all">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#475569] shrink-0 border border-slate-100">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-slate-700">Unpaid Leave</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1 font-display">Unlimited</p>
                <p className="text-xs text-slate-700 mt-0.5 font-normal">Days available</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {isNewRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewRequestModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-100 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden text-slate-800 z-50 text-left font-sans"
            >
              <form onSubmit={handleCreateRequest}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-b-slate-100 px-6 py-4.5 bg-[#FAF9F7]/85">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-display">
                      New {activeSubTab === "leave" ? "Leave Request" : "Flextime Arrangement"}
                    </h3>
                    <p className="text-[14px] text-slate-700 mt-0.5 font-medium">
                      Configure a new {activeSubTab === "leave" ? "time off" : "schedule"} for staff member
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsNewRequestModalOpen(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form Main Controls container */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  
                  <div className="space-y-1.5">
                    <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                      Select Staff Member
                    </label>
                    <select
                      value={newReqName}
                      onChange={(e) => {
                        setNewReqName(e.target.value);
                        // Auto Assign accurate departments
                        const depts: Record<string, string> = {
                          "Le Chi": "Sales",
                          "Tran Binh": "HR",
                          "Pham Dung": "Operation",
                          "Hoang Em": "Kitchen",
                          "Vu Giang": "Bar",
                          "Phan Linh": "Service",
                          "Dang Khoa": "Operation",
                          "Bui Thuy": "HR",
                        };
                        setNewReqDept(depts[e.target.value] || "Sales");
                      }}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-semibold bg-white"
                    >
                      <option value="Le Chi">Le Chi (Sales)</option>
                      <option value="Tran Binh">Tran Binh (HR)</option>
                      <option value="Pham Dung">Pham Dung (Operation)</option>
                      <option value="Hoang Em">Hoang Em (Kitchen)</option>
                      <option value="Vu Giang">Vu Giang (Bar)</option>
                      <option value="Phan Linh">Phan Linh (Service)</option>
                      <option value="Dang Khoa">Dang Khoa (Operation)</option>
                      <option value="Bui Thuy">Bui Thuy (HR)</option>
                    </select>
                  </div>

                  {activeSubTab === "leave" ? (
                    <>
                      {/* Leave config */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Leave Category
                          </label>
                          <select
                            value={newReqType}
                            onChange={(e) => setNewReqType(e.target.value)}
                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 bg-white"
                          >
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Unpaid Leave">Unpaid Leave</option>
                            <option value="Maternity Leave">Maternity Leave</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Estimated Days
                          </label>
                          <div className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[14px] text-slate-600 font-mono">
                            {Math.max(1, Math.round((new Date(newReqEndDate).getTime() - new Date(newReqStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1)} Days
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={newReqStartDate}
                            onChange={(e) => setNewReqStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={newReqEndDate}
                            onChange={(e) => setNewReqEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                          Reason description
                        </label>
                        <textarea
                          rows={2}
                          value={newReqReason}
                          onChange={(e) => setNewReqReason(e.target.value)}
                          placeholder="Please state details or vacation reason for manager approval..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 focus:ring-1 focus:ring-[#7553FF]/20 placeholder:text-slate-700 font-medium"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Flextime config */}
                      <div className="space-y-1.5">
                        <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                          Arrangement Type
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
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 bg-white"
                        >
                          <option value="Flexible Hours">Flexible Hours</option>
                          <option value="Compressed Workweek">Compressed Workweek</option>
                          <option value="Flexible Days">Flexible Days</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                          Arrangement Details
                        </label>
                        <input
                          type="text"
                          value={newFlexSchedule}
                          onChange={(e) => setNewFlexSchedule(e.target.value)}
                          placeholder="e.g. Core Hours: 10:00 AM – 3:00 PM"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Active Days
                          </label>
                          <select
                            value={newFlexDays}
                            onChange={(e) => setNewFlexDays(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-850 bg-white"
                          >
                            <option value="Mon - Fri">Mon - Fri</option>
                            <option value="Mon - Thu">Mon - Thu</option>
                            <option value="Tue - Fri">Tue - Fri</option>
                            <option value="Sat - Sun">Sat - Sun</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Working Span
                          </label>
                          <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[14px] text-slate-600 font-semibold">
                            3 Months Period
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={newReqStartDate}
                            onChange={(e) => setNewReqStartDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={newReqEndDate}
                            onChange={(e) => setNewReqEndDate(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] outline-none focus:border-[#7553FF] text-slate-800 font-medium"
                          />
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Footer Controls matching DESIGN.md with light sleek margins */}
                <div className="bg-[#FAF9F7]/85 border-t border-t-slate-100 px-6 py-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewRequestModalOpen(false)}
                    className="px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-[14px] font-bold text-white bg-[#7553FF] hover:bg-[#623EE2] rounded-lg shadow-sm transition-colors"
                  >
                    Submit Arrangement
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

// ============================================================================
// 3. BOOK A TABLE VIEW
// ============================================================================
export function BookTableView({
  currentPlan = 'Basic',
  onUpgrade,
  onGoToBrandSettings
}: {
  currentPlan?: 'Basic' | 'Gold' | 'Diamond';
  onUpgrade?: () => void;
  onGoToBrandSettings?: () => void;
}) {
  const isPremiumLocked = currentPlan !== 'Diamond';
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<"bookings" | "settings">(
    "bookings",
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Expanded setting sub-view state: null means settings list.
  // 'schedule' | 'tables' | 'online' | 'form' | 'prepayment' | 'google' | 'notifications'
  const [expandedSetting, setExpandedSetting] = useState<string | null>(null);

  // Accept online reservations status state
  const [acceptOnlineReservations, setAcceptOnlineReservations] =
    useState(true);

  // Reservation schedule weekly hours state
  const [weeklyHours, setWeeklyHours] = useState([
    {
      day: "Sunday",
      checked: false,
      text: "closed",
      start: "15:30",
      end: "20:30",
    },
    { day: "Monday", checked: true, start: "15:30", end: "20:30" },
    { day: "Tuesday", checked: true, start: "15:30", end: "20:30" },
    { day: "Wednesday", checked: true, start: "15:30", end: "20:30" },
    { day: "Thursday", checked: true, start: "15:30", end: "20:30" },
    { day: "Friday", checked: true, start: "15:30", end: "20:30" },
    { day: "Saturday", checked: true, start: "14:00", end: "20:30" },
  ]);

  // Special days state
  const [specialDays, setSpecialDays] = useState([
    {
      id: "1",
      name: "31.12",
      date: "Dec 31, 2024 - Jan 1, 2025",
      hours: "15:00 - 13:00",
      status: "CLOSED",
    },
    {
      id: "2",
      name: "Christmas",
      date: "Dec 23, 2024 - Dec 26, 2024",
      hours: "15:00 - 13:00",
      status: "CLOSED",
    },
  ]);

  // Table management states
  const [useTablesToManage, setUseTablesToManage] = useState(true);
  const [assignTablesMode, setAssignTablesMode] = useState<"auto" | "manual">(
    "auto",
  );
  const [tableManagementActiveTab, setTableManagementActiveTab] = useState<
    "tables" | "combinations"
  >("tables");
  const [tablesList, setTablesList] = useState([
    { id: "T1", name: "T1", minSeats: 1, maxSeats: 2, online: true },
    { id: "T7", name: "T7", minSeats: 1, maxSeats: 2, online: true },
    { id: "T8", name: "T8", minSeats: 1, maxSeats: 2, online: true },
    { id: "T9", name: "T9", minSeats: 1, maxSeats: 2, online: true },
    { id: "T2", name: "T2", minSeats: 1, maxSeats: 4, online: true },
    { id: "T3", name: "T3", minSeats: 1, maxSeats: 2, online: true },
    { id: "T4", name: "T4", minSeats: 3, maxSeats: 4, online: true },
    { id: "T5", name: "T5", minSeats: 3, maxSeats: 6, online: true },
    { id: "T6", name: "T6", minSeats: 3, maxSeats: 6, online: true },
  ]);

  const [tableCombinationsList, setTableCombinationsList] = useState([
    { id: "tc-1", tables: ["T1", "T2"], minSeats: 3, maxSeats: 4, online: true },
    { id: "tc-2", tables: ["T2", "T3"], minSeats: 3, maxSeats: 4, online: true },
    { id: "tc-3", tables: ["T1", "T2", "T3"], minSeats: 5, maxSeats: 6, online: true },
  ]);
  const [newCombTables, setNewCombTables] = useState<string[]>([]);
  const [newCombMin, setNewCombMin] = useState<number | "">("");
  const [newCombMax, setNewCombMax] = useState<number | "">("");
  const [newCombOnline, setNewCombOnline] = useState<boolean>(true);
  const [isComboSelectorOpen, setIsComboSelectorOpen] = useState<string | null>(null); // tracks which row combo selector dropdown is open for, e.g. "new" or an ID


  // Online reservations states
  const [reservationNoticeMin, setReservationNoticeMin] = useState(2);
  const [reservationNoticeMinUnit, setReservationNoticeMinUnit] =
    useState("Hours");
  const [reservationNoticeMaxChecked, setReservationNoticeMaxChecked] =
    useState(false);
  const [partySizeMin, setPartySizeMin] = useState(1);
  const [partySizeMax, setPartySizeMax] = useState(6);
  const [displayPhoneForLargeParty, setDisplayPhoneForLargeParty] =
    useState(true);
  const [turnTimeDefault, setTurnTimeDefault] = useState("2 hrs"); // hours string
  const [turnTimeRules, setTurnTimeRules] = useState<
    { id: string; minGuests: number; maxGuests: number; time: string }[]
  >([
    { id: "1", minGuests: 1, maxGuests: 2, time: "1 hr 30 min" }
  ]);
  const [showTurnTimeModal, setShowTurnTimeModal] = useState(false);
  const [tempTurnTimeDefault, setTempTurnTimeDefault] = useState("2 hrs");
  const [tempTurnTimeRules, setTempTurnTimeRules] = useState<
    { id: string; minGuests: number; maxGuests: number; time: string }[]
  >([]);
  const [timeIntervalOption, setTimeIntervalOption] = useState("15 min");

  // Pacing and approval states
  const [pacingGuestsChecked, setPacingGuestsChecked] = useState(true);
  const [pacingGuestsValue, setPacingGuestsValue] = useState(9);
  const [pacingPartiesChecked, setPacingPartiesChecked] = useState(false);
  const [pacingPartiesValue, setPacingPartiesValue] = useState(2);
  const [approvalMode, setApprovalMode] = useState("automatic");

  // Reservation form states
  const [requireEmail, setRequireEmail] = useState(true);
  const [requireLastName, setRequireLastName] = useState(true);
  const [customFields, setCustomFields] = useState<
    { id: string; name: string; type: string }[]
  >([]);
  const [customMessageEnabled, setCustomMessageEnabled] = useState(false);
  const [emailMarketingCheckboxEnabled, setEmailMarketingCheckboxEnabled] =
    useState(false);
  const [policiesEnabled, setPoliciesEnabled] = useState(false);

  // Date range state
  const [dateRange, setDateRange] = useState("May 25 – May 31, 2026");
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Bookings list state matching the exact results shown in the screenshot
  const [bookings, setBookings] = useState([
    {
      id: "b-1",
      name: "Huong Mai",
      phone: "0985563940",
      guests: 10,
      date: "2026-06-05",
      time: "11:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "Window seat",
    },
    {
      id: "b-2",
      name: "Huong Mai",
      phone: "0985563940",
      guests: 10,
      date: "2026-06-05",
      time: "11:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "-",
    },
    {
      id: "b-3",
      name: "Huong Mai",
      phone: "0985563940",
      guests: 10,
      date: "2026-06-06",
      time: "11:00",
      status: "PENDING",
      source: "Phone",
      notes: "Near the entrance",
    },
    {
      id: "b-4",
      name: "Huong Mai",
      phone: "0985563940",
      guests: 10,
      date: "2026-06-05",
      time: "11:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "Birthday celebration",
    },
    {
      id: "b-5",
      name: "Huong Tran",
      phone: "0985576340",
      guests: 4,
      date: "2026-06-05",
      time: "11:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "-",
    },
    {
      id: "b-6",
      name: "Huong",
      phone: "0985576340",
      guests: 2,
      date: "2026-06-13",
      time: "19:00",
      status: "PENDING",
      source: "Instagram",
      notes: "Anniversary",
    },
    {
      id: "b-7",
      name: "Huong",
      phone: "0985576340",
      guests: 20,
      date: "2026-06-04",
      time: "19:00",
      status: "PENDING",
      source: "Walk-in",
      notes: "Group dinner",
    },
    {
      id: "b-8",
      name: "Huong",
      phone: "0985576340",
      guests: 2,
      date: "2026-06-04",
      time: "19:00",
      status: "PENDING",
      source: "Phone",
      notes: "-",
    },
    {
      id: "b-9",
      name: "API Test Customer",
      phone: "0999888777",
      guests: 3,
      date: "2026-05-29",
      time: "16:10",
      status: "CANCELLED",
      source: "Website",
      notes: "Customer cancelled",
    },
    {
      id: "b-10",
      name: "Bao Phan",
      phone: "0905672566",
      guests: 2,
      date: "2026-05-30",
      time: "18:30",
      status: "CONFIRMED",
      source: "Website",
      notes: "-",
    },

    // Additional items to reach exactly 22 results for smooth pagination and realistic look
    {
      id: "b-11",
      name: "Sarah Connor",
      phone: "0987341255",
      guests: 2,
      date: "2026-06-01",
      time: "12:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "Anniversary",
    },
    {
      id: "b-12",
      name: "David Beckham",
      phone: "0912340055",
      guests: 6,
      date: "2026-06-02",
      time: "20:00",
      status: "CONFIRMED",
      source: "Phone",
      notes: "VVIP Area Window",
    },
    {
      id: "b-13",
      name: "Alex Nguyen",
      phone: "0912123456",
      guests: 4,
      date: "2026-06-02",
      time: "18:30",
      status: "PENDING",
      source: "Website",
      notes: "High chair for baby",
    },
    {
      id: "b-14",
      name: "Taylor Swift",
      phone: "0988776655",
      guests: 8,
      date: "2026-06-03",
      time: "21:00",
      status: "PENDING",
      source: "Instagram",
      notes: "Private layout request",
    },
    {
      id: "b-15",
      name: "John Doe",
      phone: "0901235678",
      guests: 2,
      date: "2026-06-03",
      time: "17:30",
      status: "CANCELLED",
      source: "Walk-in",
      notes: "No show cancel",
    },
    {
      id: "b-16",
      name: "Minh Hoang",
      phone: "0987654311",
      guests: 5,
      date: "2026-06-04",
      time: "12:30",
      status: "CANCELLED",
      source: "Phone",
      notes: "-",
    },
    {
      id: "b-17",
      name: "Emma Watson",
      phone: "0933221144",
      guests: 2,
      date: "2026-06-04",
      time: "13:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "Window corner preferred",
    },
    {
      id: "b-18",
      name: "Cristiano Ronaldo",
      phone: "0977777777",
      guests: 12,
      date: "2026-06-05",
      time: "20:30",
      status: "PENDING",
      source: "Website",
      notes: "Large table feast",
    },
    {
      id: "b-19",
      name: "Tran Van An",
      phone: "0966442211",
      guests: 4,
      date: "2026-06-05",
      time: "19:15",
      status: "CANCELLED",
      source: "Walk-in",
      notes: "-",
    },
    {
      id: "b-20",
      name: "Nguyen Thi Ha",
      phone: "0955551122",
      guests: 2,
      date: "2026-06-06",
      time: "18:45",
      status: "CANCELLED",
      source: "Phone",
      notes: "Quiet corner",
    },
    {
      id: "b-21",
      name: "Lionel Messi",
      phone: "0910101010",
      guests: 8,
      date: "2026-06-07",
      time: "21:00",
      status: "PENDING",
      source: "Instagram",
      notes: "Near play area",
    },
    {
      id: "b-22",
      name: "Hoang My",
      phone: "0933441111",
      guests: 2,
      date: "2026-06-07",
      time: "19:30",
      status: "PENDING",
      source: "Website",
      notes: "Anniversary cake",
    },
  ]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "CONFIRMED" | "PENDING" | "CANCELLED"
  >("All");
  const [sourceFilter, setSourceFilter] = useState<
    "All" | "Website" | "Phone" | "Instagram" | "Walk-in"
  >("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [bookingCategory, setBookingCategory] = useState<
    "daily" | "requests" | "all"
  >("all");
  const [dailyDateFilter, setDailyDateFilter] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Active view states
  const [viewBooking, setViewBooking] = useState<any | null>(null);
  const [editBooking, setEditBooking] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Widget Settings state
  const [widgetTitle, setWidgetTitle] = useState("Book a Table");
  const [widgetSubtitle, setWidgetSubtitle] = useState(
    "Select guests, date, and choose your favorite table zone.",
  );
  const [accentColor, setAccentColor] = useState("#7553FF"); // Indigo matching image theme
  const [restaurantAddress, setRestaurantAddress] = useState(
    "123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vitenam",
  );
  const [totalCapacity, setTotalCapacity] = useState("60 seats");
  const [turnoverTime, setTurnoverTime] = useState("90 minutes");
  const [maxGuestsPerBooking, setMaxGuestsPerBooking] = useState("12 guests");
  const [openingHours, setOpeningHours] = useState([
    { days: "Mon – Fri", hours: "10:00 AM – 10:00 PM" },
    { days: "Sat – Sun", hours: "09:00 AM – 11:00 PM" },
  ]);
  const [partySizeLimit, setPartySizeLimit] = useState(12);
  const [requireAllergies, setRequireAllergies] = useState(true);
  const [requirePhoneCheck, setRequirePhoneCheck] = useState(true);
  const [selectedWidgetLayout, setSelectedWidgetLayout] = useState<
    "elegant" | "modern" | "minimal"
  >("elegant");
  const [theme, setTheme] = useState<"Classic" | "Modern" | "Minimal">(
    "Classic",
  );
  const [experiencePreset, setExperiencePreset] = useState<
    | "Signature Classic"
    | "Editorial Split"
    | "Floating Spotlight"
    | "Compact Dense"
    | "Immersive/Creative"
  >("Floating Spotlight");
  const [restaurantName, setRestaurantName] = useState("John's Bistro");
  const [bookingUrlSlug, setBookingUrlSlug] = useState(() => {
    return localStorage.getItem('gastro_brand_slug') || "";
  });

  useEffect(() => {
    const storedSlug = localStorage.getItem('gastro_brand_slug') || "";
    setBookingUrlSlug(storedSlug);
  }, []);

  const [maxPartySize, setMaxPartySize] = useState("20 guests");
  const [timeInterval, setTimeInterval] = useState("30 minutes");
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">(
    "desktop",
  );

  // Telegram & WhatsApp Notification Configuration
  const [telegramChatId, setTelegramChatId] = useState("123456789");
  const [telegramBotToken, setTelegramBotToken] = useState("1234567890:ABCdefGhIJKlmNoPQRsTUVwxyZ");
  const [whatsappPhoneNumber, setWhatsappPhoneNumber] = useState("+84901234567");
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("102938475630291");

  const testTelegramConnection = async () => {
    if (!telegramBotToken || !telegramBotToken.trim() || !telegramChatId || !telegramChatId.trim()) {
      triggerToast("Please enter both Bot Token and Chat ID to test.", "error");
      return;
    }
    triggerToast("Sending test Telegram alert...", "info");
    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: "🔔 *GastroHub Test Connection*\n\nYour restaurant reservation notification stream is configured successfully! 🎉",
          parse_mode: "Markdown",
        }),
      });
      if (response.ok) {
        triggerToast("Test message sent! Check your Telegram chat.", "success");
      } else {
        triggerToast("Failed to send test message. Please verify credentials.", "error");
      }
    } catch (e) {
      triggerToast("Network error trying to contact Telegram API.", "error");
    }
  };

  const testWhatsappConnection = async () => {
    if (!whatsappPhoneNumber || !whatsappPhoneNumber.trim() || !whatsappPhoneId || !whatsappPhoneId.trim()) {
      triggerToast("Please enter both Phone Number and Phone ID to test.", "error");
      return;
    }
    triggerToast("Initiating live WhatsApp testing stream...", "info");
    setTimeout(() => {
      triggerToast("WhatsApp credentials saved and verified! Live notifications will stream via business templates.", "success");
    }, 1200);
  };

  // Client emulator form states
  const [emulGuests, setEmulGuests] = useState(4);
  const [emulDate, setEmulDate] = useState("2026-06-08");
  const [emulTime, setEmulTime] = useState("19:00");
  const [emulName, setEmulName] = useState("");
  const [emulPhone, setEmulPhone] = useState("");
  const [emulNotes, setEmulNotes] = useState("");

  // Add booking state form
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "2026-06-05",
    time: "19:00",
    status: "CONFIRMED" as "CONFIRMED" | "PENDING" | "CANCELLED",
    source: "Website",
    notes: "",
  });

  // Toaster / Feedback toast state
  const [toast, setToast] = useState<{
    text: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const triggerToast = (
    text: string,
    type: "success" | "info" | "error" = "success",
  ) => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Copy Link function
  const handleCopyLink = () => {
    if (!bookingUrlSlug || bookingUrlSlug.trim() === "") {
      const fallbackUrl = "https://ais-pre-osxcq7btomknjhuqiu6744-50849064510.asia-southeast1.run.app";
      navigator.clipboard.writeText(fallbackUrl);
      triggerToast("Link copied to clipboard!", "success");
    } else {
      const link = `https://ais-pre-ec2zqescespjwt6ak6coim-50849064510.asia-southeast1.run.app`;
      navigator.clipboard.writeText(link);
      triggerToast("Public Booking Link copied to clipboard!", "success");
    }
  };

  // Pre-fill fields when entering edit mode
  const handleStartEdit = (b: any) => {
    setEditBooking({ ...b });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBooking) return;
    setBookings((prev) =>
      prev.map((item) => (item.id === editBooking.id ? editBooking : item)),
    );
    setEditBooking(null);
    triggerToast("Reservation updated successfully!", "success");
  };

  // Delete booking handler
  const handleDeleteBooking = (id: string, name: string) => {
    const toDelete = bookings.find((x) => x.id === id);
    setBookings((prev) => prev.filter((x) => x.id !== id));
    triggerToast(`Cancelled reservation for ${name}`, "info");
  };

  // Confirm booking handler
  const handleConfirmReservation = (id: string, name: string) => {
    setBookings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "CONFIRMED" } : item,
      ),
    );
    triggerToast(`Approved and confirmed reservation for ${name}!`, "success");
  };

  // Add booking from custom dialog
  const handleAddBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.phone.trim()) {
      triggerToast("Please complete Customer Name and Phone Number.", "error");
      return;
    }
    const newB = {
      id: "b-" + Date.now(),
      name: addForm.name,
      phone: addForm.phone,
      guests: Number(addForm.guests),
      date: addForm.date,
      time: addForm.time,
      status: addForm.status,
      source: addForm.source,
      notes: addForm.notes.trim() || "-",
    };
    setBookings((prev) => [newB, ...prev]);
    setIsAddModalOpen(false);
    setAddForm({
      name: "",
      email: "",
      phone: "",
      guests: 2,
      date: "2026-06-05",
      time: "19:00",
      status: "CONFIRMED",
      source: "Website",
      notes: "",
    });
    triggerToast(`Added table booking for ${newB.name}!`, "success");
  };

  // Client reservation generator in Virtual Device
  const handleEmulatorBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emulName.trim() || !emulPhone.trim()) {
      triggerToast("Please fill out customer details on emulator.", "error");
      return;
    }
    const newB = {
      id: "b-" + Date.now(),
      name: emulName,
      phone: emulPhone,
      guests: emulGuests,
      date: emulDate,
      time: emulTime,
      status: "PENDING" as const,
      source: "Website",
      notes: emulNotes.trim() || "-",
    };
    setBookings((prev) => [newB, ...prev]);
    // reset emulator
    setEmulName("");
    setEmulPhone("");
    setEmulNotes("");
    triggerToast(`Emulator: Table booked! Pending confirmation.`, "success");
    // switch tab to bookings
    setActiveSubTab("bookings");
    // scroll to top of bookings
    setCurrentPage(1);
  };

  // Mock export handler
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Customer",
      "Phone",
      "Guests (PAX)",
      "Date",
      "Time",
      "Status",
      "Source",
      "Notes",
    ];
    const csvContent = [
      headers.join(","),
      ...bookings.map((b) =>
        [
          b.id,
          `"${b.name}"`,
          b.phone,
          b.guests,
          b.date,
          b.time,
          b.status,
          b.source,
          `"${b.notes}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `table-reservations_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Downloaded reservation csv file", "success");
  };

  // Filter & Search Logic
  const displayedBookingsForSearch = isPremiumLocked ? [] : bookings;
  const filteredBookings = displayedBookingsForSearch.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesSource = sourceFilter === "All" || b.source === sourceFilter;

    // Categorization tabs
    const systemToday = new Date().toISOString().split("T")[0];
    const isToday = b.date === systemToday || b.date === "2026-06-05";

    let matchesCategory = true;
    if (bookingCategory === "daily") {
      const matchesDate = dailyDateFilter ? b.date === dailyDateFilter : isToday;
      matchesCategory = matchesDate && b.status === "CONFIRMED";
    } else if (bookingCategory === "requests") {
      matchesCategory = b.status === "PENDING";
    }

    return matchesSearch && matchesStatus && matchesSource && matchesCategory;
  });

  // Sorting
  const sortedBookings = [...filteredBookings].sort((x, y) => {
    const dateX = new Date(`${x.date}T${x.time}`);
    const dateY = new Date(`${y.date}T${y.time}`);
    if (sortOrder === "asc") {
      return dateX.getTime() - dateY.getTime();
    } else {
      return dateY.getTime() - dateX.getTime();
    }
  });

  // Calculate stats dynamically for fidelity and auto updating
  const statTotal = isPremiumLocked ? 0 : bookings.length;
  const statPending = isPremiumLocked ? 0 : bookings.filter((x) => x.status === "PENDING").length;
  const statConfirmed = isPremiumLocked ? 0 : bookings.filter((x) => x.status === "CONFIRMED").length;
  const statCancelled = isPremiumLocked ? 0 : bookings.filter((x) => x.status === "CANCELLED").length;

  // Pagination calculation
  const totalItems = sortedBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Auto-adjust page if current page turns out empty during filtering
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const formatDateStr = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, "0");
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month}, ${year}`;
    } catch (e) {
      return dateStr;
    }
  };

  const handleCaptureClick = (e: React.MouseEvent) => {
    if (isPremiumLocked) {
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-intercept="true"]')) {
        return;
      }
      const interactiveEl = target.closest('button, input, select, textarea, [role="button"], a');
      if (interactiveEl) {
        e.preventDefault();
        e.stopPropagation();
        setShowUpgradePopup(true);
      }
    }
  };

  return (
    <div 
      className="space-y-6 max-w-7xl mx-auto font-sans relative px-1"
      onClickCapture={handleCaptureClick}
    >
      {/* Visual Elegant Feedback Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            data-no-intercept="true"
            className="fixed top-6 right-6 z-55 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-white/10 text-xs font-semibold"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full ${toast.type === "success" ? "bg-emerald-400" : toast.type === "error" ? "bg-rose-500" : "bg-blue-400"}`}
            />
            <span>{toast.text}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-3 hover:opacity-80"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER BLOCK FOR BOOKING */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight font-display">
            Booking
          </h1>
          <p className="text-xs text-slate-700 leading-relaxed">
            Manage reservations, widget settings and more.
          </p>
        </div>

        {/* Actions layout column */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setExpandedSetting(null);
              setIsSettingsModalOpen(true);
            }}
            className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer h-9"
          >
            <Sliders className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden h-9 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 h-full bg-transparent hover:bg-slate-50 text-[#1C1814] text-[14px] font-normal transition-all flex items-center gap-2 cursor-pointer border-r border-slate-200 border-y-0 border-l-0 rounded-none"
            >
              <Copy className="w-4 h-4 text-slate-700" />
              <span>Copy Link</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!bookingUrlSlug || bookingUrlSlug.trim() === "") {
                  window.open(
                    "https://ais-pre-osxcq7btomknjhuqiu6744-50849064510.asia-southeast1.run.app",
                    "_blank"
                  );
                } else {
                  window.open(
                    "https://ais-pre-ec2zqescespjwt6ak6coim-50849064510.asia-southeast1.run.app",
                    "_blank"
                  );
                }
              }}
              className="px-3.5 h-full bg-transparent hover:bg-slate-50 text-[#1C1814] text-[14px] font-normal transition-all flex items-center gap-2 cursor-pointer border-none rounded-none"
            >
              <ExternalLink className="w-4 h-4 text-slate-700" />
              <span>View Page</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* ALL BOOKINGS LIST CONTAINER */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs space-y-5 text-left">
          {/* Header and Controls */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-850 font-display">
                All Bookings
              </h2>
            </div>

            {/* Action inputs toolbar layout */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative min-w-[210px] sm:w-64">
                <Search className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page to 1
                  }}
                  placeholder="Search by name or phone..."
                  className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50/20 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF]"
                />
              </div>

              {/* Dynamic Filters Switch */}
              <div className="relative font-sans">
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium transition-all bg-white cursor-pointer select-none ${
                    statusFilter !== "All" || sourceFilter !== "All" || (bookingCategory === "daily" && dailyDateFilter)
                      ? "border-[#7553FF]/50 text-[#7553FF] bg-[#7553FF]/5"
                      : "border-slate-200 text-slate-650 hover:bg-slate-50"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 text-slate-700" />
                  <span>Filters</span>
                  {(statusFilter !== "All" || sourceFilter !== "All" || (bookingCategory === "daily" && dailyDateFilter)) && (
                    <span className="w-2 h-2 rounded-full bg-[#7553FF]" />
                  )}
                  <ChevronDown className="w-3 h-3 text-slate-700 ml-0.5" />
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-100 rounded-xl shadow-lg z-50 p-4 space-y-4">
                    {/* Status Choice */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-widest block">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["All", "Confirmed", "Pending", "Cancelled"].map(
                          (st) => (
                            <button
                              key={st}
                              onClick={() => {
                                setStatusFilter(st as any);
                                setCurrentPage(1);
                              }}
                              className={`px-2 py-1.5 rounded-lg text-center text-[14px] font-semibold transition-all cursor-pointer ${
                                statusFilter === st
                                  ? "bg-[#7553FF] text-white"
                                  : "bg-slate-50 hover:bg-slate-100/70 text-slate-700"
                              }`}
                            >
                              {st}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Source Choice */}
                    <div className="space-y-1.5">
                      <label className="text-[14px] font-bold text-slate-700 tracking-widest block">
                        Booking Source
                      </label>
                      <select
                        value={sourceFilter}
                        onChange={(e) => {
                          setSourceFilter(e.target.value as any);
                          setCurrentPage(1);
                        }}
                        className="w-full text-xs p-2 border border-slate-200 bg-white rounded-lg cursor-pointer"
                      >
                        <option value="All">All Sources</option>
                        <option value="Website">Website</option>
                        <option value="Phone">Phone</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Walk-in">Walk-in</option>
                      </select>
                    </div>

                    {/* Date filter shown only in Daily tab inside dropdown */}
                    {bookingCategory === "daily" && (
                      <div className="space-y-1.5 border-t border-slate-100 pt-3">
                        <label className="text-[14px] font-bold text-slate-700 tracking-widest block">
                          Date Filter
                        </label>
                        <input
                          type="date"
                          value={dailyDateFilter}
                          onChange={(e) => {
                            setDailyDateFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg hover:border-[#7553FF] focus:outline-none focus:ring-1 focus:ring-[#7553FF] focus:border-[#7553FF] bg-white text-slate-700 cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Reset criteria Button */}
                    <button
                      onClick={() => {
                        setStatusFilter("All");
                        sourceFilter !== "All" && setSourceFilter("All");
                        setDailyDateFilter("");
                        setIsFilterDropdownOpen(false);
                        triggerToast("Cleared all filtration inputs", "info");
                      }}
                      className="w-full text-center py-1.5 border border-slate-100 rounded-lg text-[14px] font-semibold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Download CSV */}
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 hover:bg-slate-50 border border-slate-200 text-slate-705 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-3xs"
                title="Export reservations csv"
              >
                <Download className="w-4 h-4 text-slate-700" />
                <span>Export</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-2 bg-[#7553FF]/10 hover:bg-[#7553FF]/20 text-[#7553FF] border border-[#7553FF]/30/50 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs ml-1"
              >
                <Plus className="w-4 h-4" />
                <span>New Booking</span>
              </button>
            </div>
          </div>

          {/* Categorization tabs bar */}
          <div className="flex border-b border-slate-100 pb-px gap-6 select-none">
            {[
              {
                id: "daily",
                label: "Daily",
                count: isPremiumLocked ? 0 : bookings.filter(
                  (b) =>
                    (dailyDateFilter
                      ? b.date === dailyDateFilter
                      : (b.date === "2026-06-05" ||
                        b.date ===
                          new Date().toISOString().split("T")[0])) &&
                    b.status === "CONFIRMED",
                ).length,
              },
              {
                id: "requests",
                label: "Requests",
                count: isPremiumLocked ? 0 : bookings.filter((b) => b.status === "PENDING").length,
              },
              { id: "all", label: "All bookings", count: isPremiumLocked ? 0 : bookings.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setBookingCategory(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`pb-3 text-[14px] transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                  bookingCategory === tab.id
                    ? "border-[#7553FF] text-[#7553FF] font-semibold"
                    : "border-transparent text-black hover:text-[#7553FF]/80 font-light"
                }`}
              >
                <span>{tab.label}</span>
                <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-medium bg-rose-500 text-white transition-all">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Table list view */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl bg-white shadow-3xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-semibold text-slate-700 select-none">
                  <th className="px-5 py-4 text-left font-sans text-[14px] font-semibold">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-left font-sans text-[14px] font-semibold">
                    Phone Number
                  </th>
                  <th className="px-5 py-4 text-center font-sans text-[14px] font-semibold w-24">
                    Pax
                  </th>
                  <th className="px-5 py-4 text-left font-sans text-[14px] font-semibold">
                    Status
                  </th>
                  <th
                    className="px-5 py-4 text-left font-sans text-[14px] font-semibold cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={() =>
                      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                    }
                  >
                    <span>Date / Time</span>
                  </th>
                  <th className="px-5 py-4 text-left font-sans text-[14px] font-semibold">
                    Notes
                  </th>
                  {bookingCategory !== "all" && (
                    <th className="px-5 py-4 text-center font-sans text-[14px] font-semibold w-32">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs text-slate-705">
                {currentItems.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-slate-50/30 transition-all font-sans"
                  >
                    {/* CUSTOMER PROFILE */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col text-left">
                        <span className="font-normal text-slate-800 text-[14px]">
                          {b.name}
                        </span>
                      </div>
                    </td>

                    {/* PHONE NUMBER */}
                    <td className="px-5 py-4 text-slate-700 font-normal text-[14px]">
                      {b.phone}
                    </td>

                    {/* PAX */}
                    <td className="px-5 py-4 text-center">
                      <span className="inline-block text-slate-800 text-[14px] font-normal min-w-[34px]">
                        {b.guests}
                      </span>
                    </td>

                    {/* STATUS BADGES */}
                    <td className="px-5 py-4">
                      {b.status === "CONFIRMED" ? (
                        <span className="inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none">
                          Confirmed
                        </span>
                      ) : b.status === "PENDING" ? (
                        <span className="inline-flex items-center bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none">
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-[2px] text-[14px] font-normal select-none">
                          Cancelled
                        </span>
                      )}
                    </td>

                    {/* DATE / TIME */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col text-left">
                        <span className="font-normal text-slate-700 text-[14px]">
                          {formatDateStr(b.date)}
                        </span>
                        <span className="text-[14px] text-slate-700 font-normal mt-0.5">
                          {b.time}
                        </span>
                      </div>
                    </td>

                    {/* NOTES */}
                    <td className="px-5 py-4 max-w-xs truncate text-slate-700 italic font-normal text-[14px]">
                      {b.notes}
                    </td>

                    {/* ACTION BUTTONS */}
                    {bookingCategory !== "all" && (
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {bookingCategory === "requests" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleConfirmReservation(b.id, b.name)
                                }
                                className="p-1.5 bg-emerald-50 border border-emerald-100 rounded-lg hover:bg-emerald-100/60 text-emerald-600 transition-all cursor-pointer"
                                title="Accept Reservation"
                              >
                                <Check
                                  className="w-3.5 h-3.5"
                                  strokeWidth={2.5}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteBooking(b.id, b.name)
                                }
                                className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100/60 text-rose-500 transition-all cursor-pointer"
                                title="Cancel Reservation"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setViewBooking(b)}
                                className="p-1.5 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                                title="View and check seating"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleStartEdit(b)}
                                className="p-1.5 border border-slate-200 hover:border-slate-350 text-slate-700 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
                                title="Edit Reservation Details"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteBooking(b.id, b.name)
                                }
                                className="p-1.5 bg-rose-50 border border-rose-100 rounded-lg hover:bg-rose-100/60 text-rose-500 transition-all cursor-pointer"
                                title="Cancel Reservation"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

                {currentItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={bookingCategory === "all" ? 6 : 7}
                      className="px-5 py-16 text-center text-slate-700 font-medium"
                    >
                      {isPremiumLocked ? (
                        <div className="flex flex-col items-center justify-center space-y-3 py-6 select-none max-w-lg mx-auto">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                            <Plus className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-slate-700 font-bold text-[15px] block">No reservations found</span>
                            <span className="text-[14px] text-slate-700 font-normal leading-relaxed block">
                              The system has not recorded any table reservation requests yet. Configure the booking widget or create a reservation manually to manage your floor layout and schedule visually.
                            </span>
                          </div>
                        </div>
                      ) : (
                        "No matching reservations found. Please modify search query."
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER BLOCK */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
            <span className="text-[14px] text-slate-700 block text-center sm:text-left font-medium">
              Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, totalItems)} of {totalItems} results
            </span>

            <div className="flex items-center justify-center gap-1">
              {/* Chevrons Left */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Pages */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNo = idx + 1;
                return (
                  <button
                    key={pageNo}
                    onClick={() => setCurrentPage(pageNo)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNo
                        ? "bg-[#7553FF] text-white"
                        : "border border-slate-200 text-slate-650 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    {pageNo}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal Popup */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-53 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl relative text-left font-sans"
            >
              {(() => {
                const getSettingHeader = () => {
                  switch (expandedSetting) {
                    case "profile":
                      return {
                        title: "RESTAURANT PROFILE & THEME",
                        icon: <Store className="w-5 h-5" />,
                      };
                    case "integration":
                      return {
                        title: "Integration Guide",
                        icon: <Code className="w-5 h-5" />,
                      };
                    case "schedule":
                      return {
                        title: "Reservation schedule",
                        icon: <Calendar className="w-5 h-5" />,
                      };
                    case "tables":
                      return {
                        title: "Table management",
                        icon: <Grid className="w-5 h-5" />,
                      };
                    case "online":
                      return {
                        title: "Online reservations",
                        icon: <Sliders className="w-5 h-5" />,
                      };
                    case "form":
                      return {
                        title: "Reservation form",
                        icon: <FileText className="w-5 h-5" />,
                      };
                    case "prepayment":
                      return {
                        title: "Prepayment & Deposit",
                        icon: <Sliders className="w-5 h-5" />,
                      };
                    case "google":
                      return {
                        title: "Google Reservation Integration",
                        icon: <Globe className="w-5 h-5" />,
                      };
                    case "notifications":
                      return {
                        title: "Notifications",
                        icon: <Bell className="w-5 h-5" />,
                      };
                    default:
                      return {
                        title: "Reservation Settings",
                        icon: <Sliders className="w-5 h-5" />,
                      };
                  }
                };
                const { title: currentTitle, icon: currentIcon } =
                  getSettingHeader();
                return (
                  <div className="flex justify-between items-center pb-4 pt-6 md:pt-8 px-6 md:px-8 border-b border-slate-100 bg-white z-10 shrink-0">
                    <div className="flex items-center">
                      <h3 className={`${expandedSetting === "profile" ? "text-[28px] font-semibold text-[#1C1814]" : "text-base font-bold text-slate-850 font-sans"}`}>
                        {currentTitle}
                      </h3>
                    </div>
                    <button
                      type="button"
                      id="settings-close-modal-btn"
                      onClick={() => setIsSettingsModalOpen(false)}
                      className="p-1.5 border border-slate-150 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })()}

              {/* Settings content */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8">
                <motion.div
                  key="settings-subtab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-4xl mx-auto w-full font-sans"
                >
                {/* WIDGET BUILDER & CONFIGURATOR FORM */}
                <div className="space-y-6 w-full">
                  {expandedSetting === null ? (
                    <div className="space-y-6 font-sans">
                      {/* Widget Configuration Title Block */}
                      <div className="space-y-1">
                        {/* Removed */}
                        {/* Removed */}
                      </div>

                      {/* Toggle: Accept online reservations */}
                      <div className="bg-white border border-[#EAE4DC]/75 rounded-2xl p-5 flex items-center justify-between shadow-3xs transition-all duration-200 font-sans">
                        <div className="space-y-1 text-left">
                          <h3 className="text-sm font-medium text-[#1C1814]">
                            Accept online reservations
                          </h3>
                          <p className="text-sm !text-black !font-light leading-relaxed">
                            Allow guests to make reservations on your site 24/7.
                          </p>
                        </div>
                        <div className="flex items-center gap-3 select-none shrink-0 font-sans">
                          <span
                            className={`text-sm font-medium transition-all ${acceptOnlineReservations ? "text-[#7553FF]" : "text-slate-700"}`}
                          >
                            {acceptOnlineReservations
                              ? "Accepting reservations ✓"
                              : "Suspended"}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setAcceptOnlineReservations(
                                !acceptOnlineReservations,
                              );
                              triggerToast(
                                acceptOnlineReservations
                                  ? "Online reservations paused."
                                  : "Accepting reservations online is now live 24/7!",
                                "info",
                              );
                            }}
                            className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${acceptOnlineReservations ? "bg-[#7553FF]" : "bg-slate-300"}`}
                          >
                            <div
                              className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-all ${acceptOnlineReservations ? "translate-x-6" : "translate-x-0"}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Hierarchy settings list cards */}
                      <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl shadow-3xs overflow-hidden divide-y divide-[#EAE4DC]/40 text-left font-sans">
                        {[
                          {
                            id: "profile",
                            title: "Restaurant profile & Theme",
                            desc: "Customize restaurant name, address, widget theme, and experience colors.",
                            icon: Store,
                          },
                          {
                            id: "schedule",
                            title: "Reservation schedule",
                            desc: "Set a weekly schedule, define special days, and manage your availability for reservations.",
                            icon: Calendar,
                          },
                          {
                            id: "tables",
                            title: "Table management",
                            desc: "Manage table capacities and combinations for your restaurant.",
                            icon: Grid,
                          },
                          {
                            id: "online",
                            title: "Online reservations",
                            desc: "Set rules for online reservations, including party size limits, table turn times, and pacing.",
                            icon: Sliders,
                          },
                          {
                            id: "integration",
                            title: "Integration Guide",
                            desc: "Embed our booking widget or float an action button on your custom website.",
                            icon: Code,
                          },
                          {
                            id: "notifications",
                            title: "Notification Settings",
                            desc: "Configure real-time notifications via Telegram Bot and WhatsApp Business API.",
                            icon: Bell,
                          },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setExpandedSetting(item.id)}
                            className="w-full p-5 flex items-center gap-4 hover:bg-[#FAF9F7]/30 transition-all text-left cursor-pointer group"
                          >
                            <div className="w-10 h-10 border border-[#EAE4DC]/60 rounded-xl flex items-center justify-center text-black group-hover:text-[#7553FF] group-hover:border-[#7553FF]/35 bg-[#FAF9F7]/30 group-hover:bg-[#F0ECFF]/20 transition-all shrink-0">
                              <item.icon className="w-4.5 h-4.5" />
                            </div>
                            <div className="flex-grow space-y-0.5">
                              <h4 className="text-sm font-medium text-[#1C1814] group-hover:text-[#7553FF] transition-all">
                                {item.title}
                              </h4>
                              <p className="text-sm !text-black !font-light leading-relaxed font-sans">
                                {item.desc}
                              </p>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-[#EAE4DC]/60 flex items-center justify-center text-black group-hover:text-[#7553FF] group-hover:border-[#7553FF]/20 transition-all bg-white shrink-0">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 font-sans">
                      <div className="hidden">
                        <button
                          type="button"
                          onClick={() => setExpandedSetting(null)}
                          className="flex items-center gap-2 text-xs font-sans font-black text-[#5C534C] hover:text-[#1C1814] cursor-pointer transition-all"
                        >
                          <ChevronLeft
                            className="w-4 h-4 text-[#7553FF]"
                            strokeWidth={2.5}
                          />
                          <span className="capitalize text-sm font-black text-slate-805 tracking-tight font-sans font-black">
                            Back to settings
                          </span>
                        </button>
                        <div className="flex items-center gap-2 font-sans font-bold">
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedSetting(null);
                              triggerToast("Discarded unsaved changes", "info");
                            }}
                            className="px-4 py-2 border border-[#EAE4DC] hover:bg-slate-50 text-xs font-bold text-[#5C534C] rounded-xl transition duration-150 cursor-pointer"
                          >
                            Discard
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setExpandedSetting(null);
                              triggerToast(
                                "Settings safely saved and broadcasted to widget layout!",
                                "success",
                              );
                            }}
                            className="px-5 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-black rounded-xl shadow-xs hover:shadow-xs transition cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      {/* SUB-VIEW Integration Guide */}
                      {expandedSetting === "integration" && (
                        <div className="space-y-6 font-sans p-1">
                          {/* Header Hierarchy */}
                          <div className="pb-3 border-b border-[#1C1814]/15">
                            <h4 className="text-[14px] font-medium text-[#1C1814] tracking-tight ">
                              INTEGRATION GUIDE
                            </h4>
                          </div>

                          {/* Symmetric Dual-Column Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2">
                            {/* Column 1: Option 1 */}
                            <div className="space-y-4 py-2.5 flex flex-col justify-between">
                              <div className="space-y-2 h-[80px]">
                                <span className="text-[14px] font-medium text-[#1C1814] block">
                                  Option 1: Inline Iframe Embed
                                </span>
                                <p className="text-[14px] font-light text-[#1C1814]/70 leading-relaxed md:max-w-md">
                                  Best for creating a dedicated "Reservations" page on your website.
                                </p>
                              </div>
                              <div className="relative group mt-2 h-[120px]">
                                <pre className="text-[12px] font-mono p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto whitespace-pre-wrap break-all text-[#1C1814] leading-normal select-all h-full flex items-center">
                                  {`<iframe src="https://gastrohub.tenomad.com/booking/my_restaurant" width="100%" height="600px" style="border:none; border-radius:12px;"></iframe>`}
                                </pre>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      `<iframe src="https://gastrohub.tenomad.com/booking/my_restaurant" width="100%" height="600px" style="border:none; border-radius:12px;"></iframe>`
                                    );
                                    triggerToast("Iframe code copied to clipboard!", "success");
                                  }}
                                  className="absolute top-3 right-3 p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition hover:scale-[1.03] active:scale-[0.97] cursor-pointer text-[#1C1814]"
                                  title="Copy Code"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-700" />
                                </button>
                              </div>
                            </div>

                            {/* Column 2: Option 2 */}
                            <div className="space-y-4 py-2.5 flex flex-col justify-between">
                              <div className="space-y-2 h-[80px]">
                                <span className="text-[14px] font-medium text-[#1C1814] block">
                                  Option 2: Floating Booking Button
                                </span>
                                <p className="text-[14px] font-light text-[#1C1814]/70 leading-relaxed md:max-w-md">
                                  Adds an elegant, fixed action button floating at the corner of your website. Place this snippet right before the closing <code className="font-mono bg-slate-100 px-1 rounded text-[#1C1814]/80">&lt;/head&gt;</code> tag.
                                </p>
                              </div>
                              <div className="relative group mt-2 h-[120px]">
                                <pre className="text-[12px] font-mono p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl overflow-x-auto whitespace-pre-wrap break-all text-[#1C1814] leading-normal select-all h-full flex items-center">
                                  {`<script src="https://gastrohub.tenomad.com/assets/widget.js" data-restaurant="my_restaurant"></script>`}
                                </pre>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      `<script src="https://gastrohub.tenomad.com/assets/widget.js" data-restaurant="my_restaurant"></script>`
                                    );
                                    triggerToast("Script snippet copied to clipboard!", "success");
                                  }}
                                  className="absolute top-3 right-3 p-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition hover:scale-[1.03] active:scale-[0.97] cursor-pointer text-[#1C1814]"
                                  title="Copy Code"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-700" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {expandedSetting === "profile" && (
                        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-0 items-start border border-slate-200 rounded-2xl overflow-hidden bg-white w-full shadow-none transition-all duration-300">
                          {/* Left Panel: Control Form */}
                          <div className="p-6 space-y-4 flex flex-col justify-start text-left bg-white">
                            {/* Restaurant Name */}
                            <div className="space-y-1 font-sans">
                              <label className="text-[14px] font-medium text-[#1C1814] block">
                                Restaurant Name
                              </label>
                              <input
                                type="text"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] bg-white text-[#1C1814] font-light placeholder-slate-400 focus:outline-none focus:border-[#7553FF] transition-all font-sans shadow-none"
                              />
                            </div>

                            {/* Brand Slug */}
                            <div className="space-y-1 font-sans">
                              <label className="text-[14px] font-medium text-[#1C1814] block">
                                Brand Slug
                              </label>
                              <input
                                type="text"
                                value={bookingUrlSlug || ""}
                                disabled
                                readOnly
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] font-light text-[#1C1814] disabled:bg-slate-50 bg-[#1C1814]/5 cursor-not-allowed shadow-none focus:outline-none font-sans"
                              />
                              {(!bookingUrlSlug || bookingUrlSlug.trim() === "") && (
                                <p className="text-[12px] font-light text-[#1C1814]/70 mt-1">
                                  Brand Slug is not configured yet. Please go to{" "}
                                  <button
                                    type="button"
                                    onClick={onGoToBrandSettings}
                                    className="text-[#7553FF] hover:underline font-semibold focus:outline-none cursor-pointer inline bg-transparent border-none p-0 align-baseline"
                                  >
                                    'Brand setting'
                                  </button>{" "}
                                  in the left menu to set up your unique slug.
                                </p>
                              )}
                            </div>

                            {/* Address */}
                            <div className="space-y-1 font-sans">
                              <label className="text-[14px] font-medium text-[#1C1814] block">
                                Address
                              </label>
                              <input
                                type="text"
                                value={restaurantAddress}
                                onChange={(e) => setRestaurantAddress(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[14px] bg-white text-[#1C1814] font-light placeholder-slate-400 focus:outline-none focus:border-[#7553FF] transition-all font-sans shadow-none"
                              />
                            </div>

                            {/* Divider Line */}
                            <div className="border-t border-slate-100 my-1 !mt-2 !mb-2" />

                            {/* Theme Presets */}
                            <div className="space-y-1 font-sans">
                              <label className="text-[14px] font-medium text-[#1C1814] block">
                                Theme Presets
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {([ "Classic", "Modern", "Minimal" ] as const).map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTheme(t)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-light border transition-all cursor-pointer ${
                                      theme === t
                                        ? "border-[#7553FF]/30 bg-[#F0ECFF] text-[#7553FF] shadow-none"
                                        : "border-slate-200 text-[#5C534C] hover:bg-slate-50 bg-white"
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Creative View Preset Selector */}
                            <div className="space-y-1 font-sans">
                              <label className="text-[14px] font-medium text-[#1C1814] block">
                                Creative View Preset
                              </label>
                              <div className="relative">
                                <select
                                  value={experiencePreset}
                                  onChange={(e) => setExperiencePreset(e.target.value as any)}
                                  className="w-full px-3 py-2 border border-slate-200 bg-white text-[#1C1814] rounded-lg text-[14px] focus:outline-none focus:border-[#7553FF] cursor-pointer appearance-none shadow-none font-light font-sans"
                                >
                                  <option value="Signature Classic">Signature Classic</option>
                                  <option value="Editorial Split">Editorial Split</option>
                                  <option value="Floating Spotlight">Floating Spotlight</option>
                                  <option value="Compact Dense">Compact Dense</option>
                                  <option value="Immersive/Creative">Immersive/Creative</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 select-none pointer-events-none" />
                              </div>
                            </div>

                            {/* Experience Action Color Customizer */}
                            <div className="space-y-1 font-sans pt-1">
                              <label className="text-[13px] font-medium text-[#1C1814] block">
                                Experience Action Color
                              </label>
                              <div className="flex gap-2 max-w-sm">
                                <div className="relative shrink-0">
                                  <div
                                    className="w-10 h-10 border border-slate-200 rounded-lg cursor-pointer shadow-none flex items-center justify-center transition-all hover:brightness-95"
                                    style={{ backgroundColor: accentColor }}
                                  >
                                    <input
                                      type="color"
                                      value={accentColor}
                                      onChange={(e) => setAccentColor(e.target.value)}
                                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                    />
                                  </div>
                                </div>
                                <div className="relative flex-grow">
                                  <input
                                    type="text"
                                    value={accentColor}
                                    onChange={(e) => setAccentColor(e.target.value)}
                                    className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-sm font-light font-mono bg-white text-[#1C1814] focus:outline-none focus:border-[#7553FF]  shadow-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Panel: Interactive Unified Live Preview */}
                          <div className="bg-[#F8FAFC] p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col items-stretch text-left self-stretch shadow-none h-full justify-center min-h-[500px] transition-all duration-300">
                            <span className="text-[12px] font-semibold text-[#1C1814]/40 tracking-widest  mb-4 block">
                              LIVE PREVIEW
                            </span>

                            {/* Floating Mockup Area */}
                            <div className="w-full max-w-sm mx-auto flex-grow flex flex-col justify-center py-2">
                              {(() => {
                                // Theme level variables
                                const themeStyles: Record<string, {
                                  borderRadius: string;
                                  fontStyles: string;
                                  inputBorder: string;
                                  labelStyle: string;
                                  inputBg: string;
                                }> = {
                                  Classic: {
                                    borderRadius: "16px",
                                    fontStyles: "font-sans font-semibold text-slate-800",
                                    inputBorder: "border border-slate-200 rounded-lg",
                                    labelStyle: "text-[12px] font-semibold text-slate-700",
                                    inputBg: "bg-slate-50/70",
                                  },
                                  Modern: {
                                    borderRadius: "0px",
                                    fontStyles: "font-mono font-extrabold  tracking-wider text-[#1C1814]",
                                    inputBorder: "border-2 border-[#1C1814] rounded-none",
                                    labelStyle: "text-[10px] font-bold  tracking-widest text-[#1C1814]",
                                    inputBg: "bg-white",
                                  },
                                  Minimal: {
                                    borderRadius: "4px",
                                    fontStyles: "font-sans font-light text-slate-700",
                                    inputBorder: "border-b border-slate-200 rounded-none px-0",
                                    labelStyle: "text-[11px] font-light text-slate-700  tracking-wide",
                                    inputBg: "bg-transparent",
                                  },
                                };

                                // Creative preset variables
                                const creativeStyles: Record<string, {
                                  layoutType: "classic" | "split" | "centered" | "centered-compact" | "overlay";
                                  imagePosition: "top" | "left" | "hidden" | "background";
                                  textAlignment: "text-left" | "text-center";
                                }> = {
                                  "Signature Classic": {
                                    layoutType: "classic",
                                    imagePosition: "top",
                                    textAlignment: "text-left",
                                  },
                                  "Editorial Split": {
                                    layoutType: "split",
                                    imagePosition: "left",
                                    textAlignment: "text-left",
                                  },
                                  "Floating Spotlight": {
                                    layoutType: "centered",
                                    imagePosition: "top",
                                    textAlignment: "text-center",
                                  },
                                  "Compact Dense": {
                                    layoutType: "centered-compact",
                                    imagePosition: "hidden",
                                    textAlignment: "text-left",
                                  },
                                  "Immersive/Creative": {
                                    layoutType: "overlay",
                                    imagePosition: "background",
                                    textAlignment: "text-left",
                                  },
                                };

                                const currentTheme = themeStyles[theme] || themeStyles["Classic"];
                                const currentCreative = creativeStyles[experiencePreset] || creativeStyles["Signature Classic"];

                                // Unified style object passed as CSS Variables
                                const unifiedStyles = {
                                  "--border-radius": currentTheme.borderRadius,
                                  "--font-style": theme === "Modern" ? "monospace" : "sans-serif",
                                  "--input-border-style": currentTheme.inputBorder,
                                } as React.CSSProperties;

                                const mockupImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80";

                                return (
                                  <div 
                                    className="relative w-full max-w-[340px] h-[460px] bg-slate-100 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                                    style={{ 
                                      borderRadius: currentTheme.borderRadius,
                                      border: theme === "Modern" ? "2px solid #1C1814" : "1px solid #E2E8F0",
                                      ...unifiedStyles
                                    }}
                                  >
                                    {/* Mockup Status Bar */}
                                    <div 
                                      className="px-4 py-1.5 border-b border-slate-100 bg-white/70 backdrop-blur-xs flex justify-between items-center text-[10px] font-mono z-10 text-slate-700 select-none shrink-0" 
                                      style={{ borderColor: theme === "Modern" ? "#1C1814" : undefined }}
                                    >
                                      <span>12:00 PM</span>
                                      <div className="flex gap-1 items-center">
                                        <span>LTE</span>
                                        <div className="w-4 h-2.5 border border-slate-300 rounded-2xs relative" style={{ borderColor: theme === "Modern" ? "#1C1814" : undefined }}>
                                          <div className="absolute left-0 top-0 bottom-0 bg-slate-400 w-2" style={{ backgroundColor: theme === "Modern" ? "#1C1814" : undefined }} />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Layout Area */}
                                    <div className="relative flex-grow flex flex-col justify-start overflow-hidden w-full h-[calc(100%-32px)]">
                                      {currentCreative.layoutType === "overlay" && (
                                        <div 
                                          className="absolute inset-0 bg-cover bg-center flex flex-col justify-center items-center p-4"
                                          style={{ backgroundImage: `url('${mockupImage}')` }}
                                        >
                                          <div className="absolute inset-0 bg-black/45" />
                                          <div 
                                            className="relative z-10 w-full p-4 bg-black/65 backdrop-blur-md border border-white/20 text-white flex flex-col justify-start gap-3.5 text-left transition-all duration-300"
                                            style={{ borderRadius: currentTheme.borderRadius }}
                                          >
                                            <div>
                                              <div className={`text-[15px] ${currentTheme.fontStyles} text-white truncate`}>
                                                {restaurantName || "John's Bistro"}
                                              </div>
                                              <div className="text-[10px] font-light opacity-80 truncate">
                                                {restaurantAddress || "18 Trang Tien, Hanoi"}
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <div className="space-y-0.5">
                                                <div className="text-[9px]  tracking-wider text-white/50">Party Size</div>
                                                <div 
                                                  className="w-full px-2.5 py-1.5 bg-white/10 border rounded-md text-[12px] font-light flex justify-between items-center text-white"
                                                  style={{ borderColor: accentColor }} // active border is color synced
                                                >
                                                  <span>2 Guests</span>
                                                  <ChevronDown className="w-3 h-3 text-white/40" />
                                                </div>
                                              </div>
                                              <div className="grid grid-cols-2 gap-1.5">
                                                <div className="space-y-0.5">
                                                  <div className="text-[9px]  tracking-wider text-white/50">Date</div>
                                                  <div className="w-full px-2.5 py-1.5 bg-white/10 border border-white/25 rounded-md text-[12px] font-light text-white">
                                                    <span className="truncate block">June 12</span>
                                                  </div>
                                                </div>
                                                <div className="space-y-0.5">
                                                  <div className="text-[9px]  tracking-wider text-white/50">Time</div>
                                                  <div className="w-full px-2.5 py-1.5 bg-white/10 border border-white/25 rounded-md text-[12px] font-light text-white">
                                                    <span>7:30 PM</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <button
                                              type="button"
                                              className="w-full py-2 text-white font-semibold text-[13px] hover:brightness-95 transition-all text-center border-none cursor-pointer"
                                              style={{ 
                                                backgroundColor: accentColor,
                                                borderRadius: theme === "Modern" ? "0px" : "8px"
                                              }}
                                            >
                                              Find a Table
                                            </button>
                                          </div>
                                        </div>
                                      )}

                                      {currentCreative.layoutType === "split" && (
                                        <div className="w-full h-full flex flex-row items-stretch bg-white">
                                          {/* Left Half: Food design image */}
                                          <div 
                                            className="w-2/5 bg-cover bg-center shrink-0 border-r border-slate-100"
                                            style={{ 
                                              backgroundImage: `url('${mockupImage}')`,
                                              borderColor: theme === "Modern" ? "#1C1814" : undefined 
                                            }}
                                          />
                                          {/* Right Half: Form content */}
                                          <div className="w-3/5 p-4 flex flex-col justify-between bg-white text-left overflow-y-auto">
                                            <div className="space-y-3">
                                              <div>
                                                <div className={`text-[15px] leading-tight ${currentTheme.fontStyles} truncate`}>
                                                  {restaurantName || "John's Bistro"}
                                                </div>
                                                <div className="text-[10px] font-light text-slate-700 truncate">
                                                  {restaurantAddress || "18 Trang Tien, Hanoi"}
                                                </div>
                                              </div>

                                              <div className="border-t border-slate-100 my-1" />

                                              <div className="space-y-2">
                                                <div className="space-y-0.5">
                                                  <div className={currentTheme.labelStyle}>Party Size</div>
                                                  <div 
                                                    className={`${currentTheme.inputBg} px-2.5 py-1.5 flex justify-between items-center text-[12px]`}
                                                    style={{ 
                                                      border: `1.5px solid ${accentColor}`,
                                                      borderRadius: theme === "Modern" ? "0px" : "6px"
                                                    }} // active border
                                                  >
                                                    <span className="text-slate-700 font-light">2 Guests</span>
                                                    <ChevronDown className="w-3 h-3 text-slate-700" />
                                                  </div>
                                                </div>
                                                <div className="space-y-0.5">
                                                  <div className={currentTheme.labelStyle}>Date & Time</div>
                                                  <div 
                                                    className={`${currentTheme.inputBg} ${currentTheme.inputBorder} px-2.5 py-1.5 text-[11px] text-slate-600 truncate`}
                                                  >
                                                    June 12, 7:30 PM
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <button
                                              type="button"
                                              className="w-full py-1.5 text-white font-semibold text-[12px] mt-3 hover:brightness-95 transition-all text-center border-none cursor-pointer"
                                              style={{ 
                                                backgroundColor: accentColor,
                                                borderRadius: theme === "Modern" ? "0px" : "6px"
                                              }}
                                            >
                                              Book Table
                                            </button>
                                          </div>
                                        </div>
                                      )}

                                      {currentCreative.layoutType !== "overlay" && currentCreative.layoutType !== "split" && (
                                        <div className="w-full h-full flex flex-col justify-start bg-white overflow-y-auto">
                                          {/* Optional Header image */}
                                          {currentCreative.imagePosition === "top" && (
                                            <div className="h-28 w-full bg-slate-100 relative shrink-0">
                                              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${mockupImage}')` }} />
                                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />
                                              <div className={`absolute bottom-3 left-4 right-4 text-white ${currentCreative.textAlignment}`}>
                                                <div className={`text-[16px] leading-tight ${currentTheme.fontStyles}`}>
                                                  {restaurantName || "John's Bistro"}
                                                </div>
                                                <div className="text-[10px] font-light opacity-80 truncate">
                                                  {restaurantAddress || "18 Trang Tien, Hanoi"}
                                                </div>
                                              </div>
                                            </div>
                                          )}

                                          {/* Card body */}
                                          <div className={`p-5 flex-grow flex flex-col ${currentCreative.textAlignment === "text-center" ? "items-center text-center" : "items-stretch text-left"} justify-between gap-4`}>
                                            <div className="space-y-3.5 w-full">
                                              {/* If image is hidden, render restaurant info inside card */}
                                              {currentCreative.imagePosition === "hidden" && (
                                                <div className={currentCreative.textAlignment}>
                                                  <div className={`text-[16px] ${currentTheme.fontStyles}`}>
                                                    {restaurantName || "John's Bistro"}
                                                  </div>
                                                  <div className="text-[11px] font-light text-slate-700 mt-0.5 truncate">
                                                    {restaurantAddress || "18 Trang Tien, Hanoi"}
                                                  </div>
                                                </div>
                                              )}

                                              {/* Simple custom inputs */}
                                              <div className="space-y-2.5">
                                                <div className="space-y-0.5">
                                                  <div className={`${currentTheme.labelStyle} ${currentCreative.textAlignment}`}>Party Size</div>
                                                  <div 
                                                    className={`${currentTheme.inputBg} px-3 py-1.5 flex justify-between items-center text-[13px] text-slate-700`}
                                                    style={{ 
                                                      border: `1.5px solid ${accentColor}`,
                                                      borderRadius: theme === "Modern" ? "0px" : "6px"
                                                    }} // active border show colored
                                                  >
                                                    <span className="font-light">2 Guests</span>
                                                    <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
                                                  </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                  <div className="space-y-0.5">
                                                    <div className={`${currentTheme.labelStyle} ${currentCreative.textAlignment}`}>Date</div>
                                                    <div className={`${currentTheme.inputBorder} ${currentTheme.inputBg} px-3 py-1.5 text-[13px] text-slate-700 truncate`}>
                                                      June 12
                                                    </div>
                                                  </div>
                                                  <div className="space-y-0.5">
                                                    <div className={`${currentTheme.labelStyle} ${currentCreative.textAlignment}`}>Time</div>
                                                    <div className={`${currentTheme.inputBorder} ${currentTheme.inputBg} px-3 py-1.5 text-[13px] text-slate-700`}>
                                                      7:30 PM
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <button
                                              type="button"
                                              className="w-full py-2 text-white font-semibold text-[13px] hover:brightness-95 transition-all text-center border-none cursor-pointer shrink-0 mt-auto"
                                              style={{ 
                                                backgroundColor: accentColor,
                                                borderRadius: theme === "Modern" ? "0px" : "6px"
                                              }}
                                            >
                                              Find a Table
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            <span className="text-[12px] font-light text-slate-700 text-center block mt-2">
                              Creative Preset Style: <strong className="font-semibold text-slate-600">{experiencePreset}</strong>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 1: Reservation schedule */}
                      {expandedSetting === "schedule" && (
                        <div className="space-y-10 text-left font-sans">
                          {/* Weekly hours block */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4 font-sans">
                            <div className="flex items-center justify-between font-sans">
                              <h3 className="text-sm font-medium text-[#1C1814]  tracking-wider">
                                Weekly hours
                              </h3>
                              <button
                                type="button"
                                onClick={() =>
                                  triggerToast(
                                    "Seating block added. Ready to customize hours.",
                                    "success",
                                  )
                                }
                                className="text-sm font-light text-[#7553FF] flex items-center gap-1 hover:underline font-sans"
                              >
                                <Plus className="w-3.5 h-3.5 font-bold" />
                                <span>Add Seating Block</span>
                              </button>
                            </div>
                            <p className="text-sm text-[#7C7267] font-light leading-relaxed font-sans">
                              Create time blocks and set the first and last
                              seating times for each day.
                            </p>

                            <div className="divide-y divide-[#EAE4DC]/40 font-sans">
                              {weeklyHours.map((wh, idx) => (
                                <div
                                  key={wh.day}
                                  className="py-3 flex items-center justify-between flex-wrap gap-2 text-sm font-light font-sans"
                                >
                                  <label className="flex items-center gap-3 select-none cursor-pointer font-sans">
                                    <input
                                      type="checkbox"
                                      checked={wh.checked}
                                      onChange={(e) => {
                                        const updated = [...weeklyHours];
                                        updated[idx].checked = e.target.checked;
                                        setWeeklyHours(updated);
                                      }}
                                      className="rounded accent-[#7553FF] cursor-pointer"
                                    />
                                    <span className="font-medium text-[#1C1814] min-w-[80px]">
                                      {wh.day}
                                    </span>
                                  </label>

                                  {wh.checked ? (
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={wh.start}
                                        onChange={(e) => {
                                          const updated = [...weeklyHours];
                                          updated[idx].start = e.target.value;
                                          setWeeklyHours(updated);
                                        }}
                                        className="w-18 text-center py-1 border border-[#EAE4DC] bg-white text-[#1C1814] rounded-md font-mono text-sm font-light"
                                      />
                                      <span className="text-slate-700 font-light text-sm">
                                        -
                                      </span>
                                      <input
                                        type="text"
                                        value={wh.end}
                                        onChange={(e) => {
                                          const updated = [...weeklyHours];
                                          updated[idx].end = e.target.value;
                                          setWeeklyHours(updated);
                                        }}
                                        className="w-18 text-center py-1 border border-[#EAE4DC] bg-white text-[#1C1814] rounded-md font-mono text-sm font-light"
                                      />
                                    </div>
                                  ) : (
                                    <span className="text-[#7C7267]/60 italic font-light capitalize select-none font-sans text-sm">
                                      Closed
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Special Days block */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4 font-sans font-sans">
                            <div className="flex items-center justify-between flex-wrap gap-2 font-sans">
                              <div>
                                <h3 className="text-sm font-medium text-[#1C1814]  tracking-wider font-sans">
                                  Special days ({specialDays.length}/50)
                                </h3>
                                <p className="text-sm text-[#7C7267] font-light leading-relaxed mt-0.5 font-sans">
                                  Custom schedules outside of regular
                                  operational hours.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const name = prompt(
                                    "Enter Special Day Event Name:",
                                    "Vua Le Festival",
                                  );
                                  if (name) {
                                    setSpecialDays([
                                      ...specialDays,
                                      {
                                        id: String(Date.now()),
                                        name: name,
                                        date: "Sep 2, 2026 - Sep 3, 2026",
                                        hours: "12:00 - 22:00",
                                        status: "CLOSED",
                                      },
                                    ]);
                                    triggerToast(
                                      `Custom special day event '${name}' registered!`,
                                      "success",
                                    );
                                  }
                                }}
                                className="text-sm font-light text-[#7553FF] flex items-center gap-1 hover:underline font-sans transition cursor-pointer select-none"
                              >
                                <Plus className="w-3.5 h-3.5 font-bold" />
                                <span>Add Special Day</span>
                              </button>
                            </div>

                            {/* Special Days Table */}
                            <div className="border border-[#EAE4DC]/60 rounded-xl overflow-hidden bg-white font-sans">
                              <table className="w-full border-collapse text-left font-sans">
                                <thead>
                                  <tr className="bg-[#FAF9F7]/80 text-sm font-medium text-[#5C534C]  tracking-wider border-b border-[#EAE4DC]/60">
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Hours</th>
                                    <th className="p-3 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EAE4DC]/40 text-sm font-sans font-light">
                                  {specialDays.map((sd) => (
                                    <tr
                                      key={sd.id}
                                      className="hover:bg-slate-50/50"
                                    >
                                      <td className="p-3 font-light text-slate-805">
                                        {sd.name}
                                      </td>
                                      <td className="p-3 text-slate-900 font-light">
                                        {sd.date}
                                      </td>
                                      <td className="p-3 text-slate-900 font-mono font-light">
                                        {sd.hours}
                                      </td>
                                      <td className="p-3 text-right">
                                        <span className="text-[#7C7267]/60 italic font-light capitalize select-none font-sans text-sm">
                                          {sd.status ? sd.status.toLowerCase() : "closed"}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 2: Table management */}
                      {expandedSetting === "tables" && (
                        <div className="space-y-10 text-left font-sans">
                          {/* Config Section Card */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4 font-sans">
                            <div className="flex items-center justify-between font-sans">
                              <h3 className="text-sm font-medium text-[#1C1814]  tracking-wider font-sans">
                                Floor plan & Table distribution
                              </h3>
                              <button
                                type="button"
                                onClick={() => {
                                  setUseTablesToManage(!useTablesToManage);
                                  triggerToast(
                                    useTablesToManage
                                      ? "Table floor plan deactivated."
                                      : "Table assignment rules operational!",
                                    "info",
                                  );
                                }}
                                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${useTablesToManage ? "bg-[#7553FF]" : "bg-slate-300"}`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${useTablesToManage ? "translate-x-5" : "translate-x-0"}`}
                                />
                              </button>
                            </div>
                            <p className="text-sm text-[#1C1814] font-light leading-relaxed font-sans">
                              Decide if you want to assign tables to
                              reservations, use them to set availability, and
                              manage a floor plan.
                            </p>

                            {useTablesToManage && (
                              <div className="space-y-3 pt-2 font-sans">
                                <div
                                  onClick={() => setAssignTablesMode("auto")}
                                  className="flex items-start gap-3 cursor-pointer p-3.5 border border-[#EAE4DC] hover:border-[#7553FF]/25 bg-[#FAF9F7]/10 hover:bg-[#F0ECFF]/5 rounded-xl transition duration-150 font-sans"
                                >
                                  <input
                                    type="radio"
                                    name="assignTablesMode-profile-sub"
                                    checked={assignTablesMode === "auto"}
                                    onChange={() => setAssignTablesMode("auto")}
                                    className="mt-1 accent-[#7553FF]"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="space-y-0.5 text-sm text-left font-sans">
                                    <span className="font-medium text-[#1C1814] block">
                                      Automatically assign tables for
                                      reservations
                                    </span>
                                    <span className="text-[#1C1814] font-light text-sm block">
                                      Available tables are automatically
                                      assigned to reservations. Guests can make
                                      online reservations if a table is
                                      available.
                                    </span>
                                  </div>
                                </div>
 
                                <div
                                  onClick={() => setAssignTablesMode("manual")}
                                  className="flex items-start gap-3 cursor-pointer p-3.5 border border-[#EAE4DC] hover:border-[#7553FF]/25 bg-[#FAF9F7]/10 hover:bg-[#F0ECFF]/5 rounded-xl transition duration-150 font-sans"
                                >
                                  <input
                                    type="radio"
                                    name="assignTablesMode-profile-sub"
                                    checked={assignTablesMode === "manual"}
                                    onChange={() =>
                                      setAssignTablesMode("manual")
                                    }
                                    className="mt-1 accent-[#7553FF]"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <div className="space-y-0.5 text-sm text-left font-sans">
                                    <span className="font-medium text-[#1C1814] block font-sans">
                                      Manually assign tables according to your
                                      needs
                                    </span>
                                    <span className="text-[#1C1814] font-light font-sans text-sm block">
                                      Tables won't be assigned automatically,
                                      but staff can override and map custom
                                      seats in dashboard as needed.
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Interactive Table List and Layout view split */}
                          {useTablesToManage && (
                            <div className="w-full font-sans pt-4 border-t border-[#EAE4DC]/40">
                              <div className="space-y-4 font-sans">
                                {/* Tabs Tables vs Combinations */}
                                <div className="flex border-b border-[#EAE4DC]/60 select-none font-sans">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTableManagementActiveTab("tables")
                                    }
                                    className={`pb-2.5 text-sm font-medium tracking-wide border-b-2 transition-all cursor-pointer ${
                                      tableManagementActiveTab === "tables"
                                        ? "border-[#7553FF] text-[#7553FF]"
                                        : "border-transparent text-slate-700 hover:text-slate-600"
                                    }`}
                                  >
                                    Tables
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setTableManagementActiveTab(
                                        "combinations",
                                      )
                                    }
                                    className={`ml-5 pb-2.5 text-sm font-medium tracking-wide border-b-2 transition-all cursor-pointer ${
                                      tableManagementActiveTab ===
                                      "combinations"
                                        ? "border-[#7553FF] text-[#7553FF]"
                                        : "border-transparent text-slate-700 hover:text-slate-600"
                                    }`}
                                  >
                                    Table Combinations
                                  </button>
                                </div>

                                {tableManagementActiveTab === "tables" ? (
                                  <div className="space-y-3 font-sans">
                                    <div className="flex items-center justify-between text-sm font-sans pb-1 select-none text-[#1C1814]">
                                      <span className="font-light">
                                        Tables: <strong className="font-semibold">{tablesList.length}</strong>, Seats:{" "}
                                        <strong className="font-semibold">
                                          {tablesList.reduce(
                                            (acc, t) => acc + t.maxSeats,
                                            0,
                                          )}
                                        </strong>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const name = `T${tablesList.length + 1}`;
                                          setTablesList([
                                            ...tablesList,
                                            {
                                              id: name,
                                              name,
                                              minSeats: 2,
                                              maxSeats: 4,
                                              online: true,
                                            },
                                          ]);
                                          triggerToast(
                                            `Added table row '${name}' successfully!`,
                                            "success",
                                          );
                                        }}
                                        className="text-[#7553FF] hover:underline cursor-pointer flex items-center gap-1 font-light text-sm font-sans"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Add Table</span>
                                      </button>
                                    </div>

                                    <div className="border border-[#EAE4DC]/60 rounded-xl overflow-hidden bg-white shadow-3xs max-h-[300px] overflow-y-auto font-sans">
                                      <table className="w-full text-left border-collapse text-sm font-sans">
                                        <thead>
                                          <tr className="bg-[#FAF9F7]/80 text-[#5C534C] font-medium border-b border-[#EAE4DC] font-sans text-xs">
                                            <th className="p-3 font-semibold font-sans w-[50%] normal-case text-left">
                                              Table name
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[32%] text-center normal-case">
                                              Seats (min-max)
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[13%] text-center normal-case">
                                              Available online
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[5%] text-center normal-case">
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#EAE4DC]/40 font-light text-sm font-sans">
                                          {tablesList.map((t, idx) => (
                                            <tr
                                              key={t.id}
                                              className="hover:bg-slate-50/40"
                                            >
                                              <td className="p-2.5 font-sans text-center">
                                                <input
                                                  type="text"
                                                  value={t.name}
                                                  onChange={(e) => {
                                                    const updated = [
                                                      ...tablesList,
                                                    ];
                                                    updated[idx].name =
                                                      e.target.value;
                                                    setTablesList(updated);
                                                  }}
                                                  className="h-10 px-3 border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white w-full max-w-md text-sm font-light text-[#1C1814] transition duration-150 outline-none"
                                                />
                                              </td>
                                              <td className="p-3 text-center align-middle">
                                                <div className="inline-flex items-center justify-between border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white h-10 px-3 w-full max-w-[160px] mx-auto transition duration-150">
                                                <input
                                                  type="number"
                                                  value={t.minSeats}
                                                  onChange={(e) => {
                                                    const updated = [
                                                      ...tablesList,
                                                    ];
                                                    updated[idx].minSeats =
                                                      Number(e.target.value);
                                                    setTablesList(updated);
                                                  }}
                                                  className="w-12 text-center text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none"
                                                />
                                                <span className="text-slate-700 select-none px-1">-</span>
                                                <input
                                                  type="number"
                                                  value={t.maxSeats}
                                                  onChange={(e) => {
                                                    const updated = [
                                                      ...tablesList,
                                                    ];
                                                    updated[idx].maxSeats =
                                                      Number(e.target.value);
                                                    setTablesList(updated);
                                                  }}
                                                  className="w-12 text-center text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none"
                                                />
                                              </div></td>
                                              <td className="p-3 text-center align-middle">
                                                <input
                                                  type="checkbox"
                                                  checked={t.online}
                                                  onChange={(e) => {
                                                    const updated = [
                                                      ...tablesList,
                                                    ];
                                                    updated[idx].online =
                                                      e.target.checked;
                                                    setTablesList(updated);
                                                  }}
                                                  className="accent-[#7553FF] cursor-pointer"
                                                />
                                              </td>
                                              <td className="p-3 text-center align-middle">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setTablesList(tablesList.filter(item => item.id !== t.id));
                                                    triggerToast(`Removed table '${t.name}' successfully!`, "success");
                                                  }}
                                                  className="p-1 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded transition cursor-pointer inline-flex items-center justify-center font-sans"
                                                  title="Delete Table"
                                                >
                                                  <Trash className="w-3.5 h-3.5" />
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-4 font-sans">
                                    {/* Subtitle counters & Header Add button */}
                                    <div className="flex items-center justify-between text-sm font-sans pb-1 select-none">
                                      <span className="text-[#1C1814] font-light">
                                        Table combinations: <strong className="font-semibold">{tableCombinationsList.length}</strong>, Available Online: <strong className="font-semibold">{tableCombinationsList.filter(c => c.online).length}</strong>
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const nextId = `tc-${Date.now()}`;
                                          setTableCombinationsList([
                                            ...tableCombinationsList,
                                            { id: nextId, tables: [], minSeats: 2, maxSeats: 4, online: true }
                                          ]);
                                          triggerToast("Added a empty table combination row, select tables to define it!", "info");
                                        }}
                                        className="text-[#7553FF] hover:text-[#5c3ce6] hover:underline text-xs font-light flex items-center gap-1 transition duration-150 cursor-pointer select-none font-sans"
                                      >
                                        <Plus className="w-3 h-3" />
                                        <span>Add Table Combination</span>
                                      </button>
                                    </div>

                                    {/* Main Combinations Table */}
                                    <div className="border border-[#EAE4DC]/60 rounded-xl overflow-visible bg-white shadow-3xs font-sans">
                                      <table className="w-full text-left border-collapse text-sm font-sans">
                                        <thead>
                                          <tr className="bg-[#FAF9F7]/80 text-[#5C534C] font-medium border-b border-[#EAE4DC] font-sans text-xs">
                                            <th className="p-3 font-semibold font-sans w-[50%] normal-case">
                                              Table combination
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[32%] text-center normal-case">
                                              Seats (min-max)
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[13%] text-center normal-case">
                                              <span className="inline-flex items-center gap-1 justify-center w-full">
                                                Available online
                                              </span>
                                            </th>
                                            <th className="p-3 font-semibold font-sans w-[5%] text-center normal-case">
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#EAE4DC]/40 font-light text-sm font-sans">
                                          {tableCombinationsList.map((c, idx) => (
                                            <tr key={c.id} className="hover:bg-slate-50/40 transition duration-150">
                                              {/* Table combination pill list */}
                                              <td className="p-3 font-sans align-middle">
                                                <div
                                                  onClick={() => setIsComboSelectorOpen(isComboSelectorOpen === c.id ? null : c.id)}
                                                  className="relative flex flex-wrap items-center gap-2 p-1.5 border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white min-h-[40px] w-full max-w-md cursor-pointer transition duration-150"
                                                >
                                                  {c.tables.length > 0 ? (
                                                    c.tables.map(tId => (
                                                      <span
                                                        key={tId}
                                                        className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FAF9F7] border border-[#EAE4DC]/70 text-xs font-medium text-[#1C1814] rounded-[2px] font-sans"
                                                      >
                                                        <span>{tId}</span>
                                                        <button
                                                          type="button"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            const updated = [...tableCombinationsList];
                                                            updated[idx].tables = updated[idx].tables.filter(id => id !== tId);
                                                            setTableCombinationsList(updated);
                                                          }}
                                                          className="hover:text-rose-500 font-bold transition ml-0.5 text-xs text-slate-700 cursor-pointer p-0.5"
                                                          title="Remove this table"
                                                        >
                                                          &times;
                                                        </button>
                                                      </span>
                                                    ))
                                                  ) : (
                                                    <span className="text-slate-700 font-light text-xs pl-1 select-none">
                                                      Select tables
                                                    </span>
                                                  )}

                                                  {isComboSelectorOpen === c.id && (
                                                    <div className="absolute left-0 top-[102%] z-[99] mt-1 w-64 bg-white border border-[#EAE4DC] rounded-xl shadow-lg p-2.5 max-h-[220px] overflow-y-auto">
                                                      <div className="text-[10px] font-semibold text-slate-700 px-2 py-1  tracking-wider border-b border-slate-100 select-none mb-1">
                                                        Select combinations
                                                      </div>
                                                      <div className="space-y-0.5">
                                                        {tablesList.map(tbl => {
                                                          const isAlreadyAdded = c.tables.includes(tbl.name);
                                                          return (
                                                            <button
                                                              key={tbl.id}
                                                              type="button"
                                                              onClick={() => {
                                                                const updated = [...tableCombinationsList];
                                                                if (isAlreadyAdded) {
                                                                  updated[idx].tables = updated[idx].tables.filter(id => id !== tbl.name);
                                                                } else {
                                                                  updated[idx].tables = [...updated[idx].tables, tbl.name];
                                                                }
                                                                setTableCombinationsList(updated);
                                                              }}
                                                              className={`w-full text-left px-2 py-1.5 text-xs rounded-md transition flex items-center justify-between cursor-pointer font-sans ${
                                                                isAlreadyAdded
                                                                  ? "bg-[#7553FF]/5 text-[#7553FF] font-medium"
                                                                  : "hover:bg-slate-50 text-slate-700"
                                                              }`}
                                                            >
                                                              <span>{tbl.name} ({tbl.maxSeats} seats)</span>
                                                              {isAlreadyAdded && <Check className="w-3 h-3 text-[#7553FF]" />}
                                                            </button>
                                                          );
                                                        })}
                                                        {tablesList.length === 0 && (
                                                          <div className="text-xs text-slate-700 p-2 font-sans text-center">No tables configured</div>
                                                        )}
                                                      </div>
                                                    </div>
                                                  )}
                                                </div>
                                              </td>

                                              {/* Min-Max seats selectors side-by-side style */}
                                              <td className="p-3 text-center align-middle">
                                                <div className="inline-flex items-center justify-between border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white h-10 px-3 w-full max-w-[160px] mx-auto transition duration-150">
                                                  <input
                                                    type="number"
                                                    value={c.minSeats}
                                                    onChange={(e) => {
                                                      const updated = [...tableCombinationsList];
                                                      updated[idx].minSeats = Number(e.target.value);
                                                      setTableCombinationsList(updated);
                                                    }}
                                                    className="w-12 text-center text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none"
                                                  />
                                                  <span className="text-slate-700 select-none px-1">-</span>
                                                  <input
                                                    type="number"
                                                    value={c.maxSeats}
                                                    onChange={(e) => {
                                                      const updated = [...tableCombinationsList];
                                                      updated[idx].maxSeats = Number(e.target.value);
                                                      setTableCombinationsList(updated);
                                                    }}
                                                    className="w-12 text-center text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none"
                                                  />
                                                </div>
                                              </td>

                                              {/* Checkbox Online */}
                                              <td className="p-3 text-center align-middle">
                                                <input
                                                  type="checkbox"
                                                  checked={c.online}
                                                  onChange={(e) => {
                                                    const updated = [...tableCombinationsList];
                                                    updated[idx].online = e.target.checked;
                                                    setTableCombinationsList(updated);
                                                  }}
                                                  className="accent-[#7553FF] cursor-pointer"
                                                />
                                              </td>

                                              {/* Row Delete Action */}
                                              <td className="p-3 text-center align-middle">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    setTableCombinationsList(tableCombinationsList.filter(item => item.id !== c.id));
                                                    triggerToast("Removed table combination successfully!", "success");
                                                  }}
                                                  className="p-1.5 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded transition cursor-pointer inline-flex items-center justify-center font-sans"
                                                  title="Delete Table Combination"
                                                >
                                                  <Trash className="w-3.5 h-3.5" />
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* SUB-VIEW 3: Online reservations */}
                      {expandedSetting === "online" && (
                        <div className="space-y-8 text-left font-sans text-slate-808 bg-[#FAF9F7]/10 p-1">
                          {/* Reservation Window */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Reservation window
                              </h3>
                            </div>
                            
                            {/* Card Body */}
                            <div className="p-5 space-y-5">
                              {/* Minimum notice */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-[#1C1814]">
                                  <span>Minimum notice</span>
                                </div>
                                <p className="text-xs text-black font-light leading-relaxed">
                                  Allow last-minute reservations, or require more notice.
                                </p>
                                <div className="flex gap-2.5 pt-1.5">
                                  <div className="relative flex items-center border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white h-10 px-3 w-28 transition duration-150">
                                    <input
                                      type="number"
                                      value={reservationNoticeMin}
                                      onChange={(e) =>
                                        setReservationNoticeMin(
                                          Number(e.target.value),
                                        )
                                      }
                                      className="w-16 text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none"
                                    />
                                  </div>
                                  <div className="relative w-36">
                                    <select
                                      value={reservationNoticeMinUnit}
                                      onChange={(e) =>
                                        setReservationNoticeMinUnit(
                                          e.target.value,
                                        )
                                      }
                                      className="w-full h-10 pl-3.5 pr-10 border border-[#EAE4DC] hover:border-[#7553FF]/50 bg-white text-[#1C1814] text-sm font-light rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7553FF] transition duration-150"
                                    >
                                      <option value="Hours">Hours</option>
                                      <option value="Days">Days</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 pointer-events-none" />
                                  </div>
                                </div>
                              </div>

                              {/* Maximum notice */}
                              <div className="border-t border-slate-100/80 pt-5 flex items-start gap-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setReservationNoticeMaxChecked(
                                      !reservationNoticeMaxChecked,
                                    )
                                  }
                                  className={`mt-0.5 w-10 h-5.5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 outline-none ${
                                    reservationNoticeMaxChecked
                                      ? "bg-[#7553FF]"
                                      : "bg-slate-200"
                                  }`}
                                >
                                  <div
                                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-sm transform transition-transform duration-200 ${
                                      reservationNoticeMaxChecked
                                        ? "translate-x-4.5"
                                        : "translate-x-0"
                                    }`}
                                  />
                                </button>
                                <div>
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#1C1814]">
                                    <span>Maximum notice</span>
                                  </div>
                                  <p className="text-xs text-black font-light mt-0.5">
                                    Limit how far in advance guests can make a reservation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Party Size */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Party size
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                              <p className="text-xs text-black font-light leading-relaxed">
                                Choose the number of guests that can be booked online.
                              </p>

                              <div className="flex items-center gap-3 pt-1">
                                {/* Min limit style inside */}
                                <div className="relative flex items-center border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white h-10 px-3 w-32 transition duration-150">
                                  <input
                                    type="number"
                                    value={partySizeMin}
                                    onChange={(e) =>
                                      setPartySizeMin(Number(e.target.value))
                                    }
                                    className="w-12 text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none text-left"
                                  />
                                  <span className="text-xs text-slate-700 font-light select-none ml-auto pr-1">Min</span>
                                </div>

                                {/* Max limit style inside */}
                                <div className="relative flex items-center border border-[#EAE4DC] hover:border-[#7553FF]/50 rounded-lg bg-white h-10 px-3 w-32 transition duration-150">
                                  <input
                                    type="number"
                                    value={partySizeMax}
                                    onChange={(e) =>
                                      setPartySizeMax(Number(e.target.value))
                                    }
                                    className="w-12 text-sm font-light bg-transparent text-[#1C1814] border-none outline-none p-0 focus:ring-0 focus:outline-none text-left"
                                  />
                                  <span className="text-xs text-slate-700 font-light select-none ml-auto pr-1">Max</span>
                                </div>
                              </div>

                              <div className="pt-2 select-none">
                                <label className="flex items-start gap-3 text-sm text-[#1C1814] cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={displayPhoneForLargeParty}
                                    onChange={(e) =>
                                      setDisplayPhoneForLargeParty(
                                        e.target.checked,
                                      )
                                    }
                                    className="w-4 h-4 rounded border-[#EAE4DC] text-[#7553FF] focus:ring-[#7553FF] cursor-pointer mt-0.5 accent-[#7553FF]"
                                  />
                                  <span className="text-xs font-light text-[#1C1814] leading-relaxed">
                                    Display your phone number for customers to call when booking for a larger party.
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Turn time */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Turn time
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                              <p className="text-xs text-black font-light">
                                Set the duration of a reservation based on its party size.
                              </p>

                              <div className="border border-blue-200 bg-blue-50/15 p-4 rounded-xl flex items-center justify-between font-sans mt-2">
                                <div>
                                  <span className="text-sm font-semibold text-[#1C1814] block">
                                    Default time
                                  </span>
                                  <span className="text-xs text-[#7C7267] font-light mt-0.5 block">
                                    {turnTimeDefault}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTempTurnTimeDefault(turnTimeDefault);
                                    setTempTurnTimeRules(JSON.parse(JSON.stringify(turnTimeRules)));
                                    setShowTurnTimeModal(true);
                                  }}
                                  className="text-xs font-semibold text-[#7553FF] hover:text-[#5c3ce6] hover:underline focus:outline-none cursor-pointer flex items-center gap-1"
                                >
                                  <Pencil className="w-3 h-3 text-[#7553FF]" />
                                  <span>Edit</span>
                                </button>
                              </div>

                              {turnTimeRules && turnTimeRules.length > 0 && (
                                <div className="mt-3 border-t border-slate-100 pt-3 space-y-2 font-sans select-none">
                                  <span className="text-xs font-semibold text-[#1C1814] block">
                                    Custom Rules
                                  </span>
                                  <div className="space-y-1.5">
                                    {turnTimeRules.map((rule) => (
                                      <div
                                        key={rule.id}
                                        className="flex justify-between items-center bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg text-xs"
                                      >
                                        <span className="text-black font-light">
                                          {rule.minGuests}–{rule.maxGuests} guests
                                        </span>
                                        <span className="text-black font-light">
                                          {rule.time}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Time slots */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Time slots
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                              <div className="flex items-center gap-1.5 text-xs text-black font-light">
                                <span>Define how often guests can start their reservations by setting time slot intervals.</span>
                              </div>

                              <div className="relative w-56 pt-1">
                                <select
                                  value={timeIntervalOption}
                                  onChange={(e) =>
                                    setTimeIntervalOption(e.target.value)
                                  }
                                  className="w-full h-10 pl-3.5 pr-10 border border-[#EAE4DC] hover:border-[#7553FF]/50 bg-white text-[#1C1814] text-sm font-light rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7553FF] transition duration-150"
                                >
                                  <option value="15 min">15 min</option>
                                  <option value="30 min">30 min</option>
                                  <option value="45 min">45 min</option>
                                  <option value="60 min">60 min</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 w-4 h-4 text-slate-700 pointer-events-none" />
                              </div>
                            </div>
                          </div>

                          {/* Pacing */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Pacing
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-4">
                              <div className="flex items-center gap-1.5 text-xs text-black font-light">
                                <span>Set the maximum number of guests and parties that can book in the same time slot.</span>
                              </div>

                              <div className="space-y-4 pt-2">
                                {/* Row 1 */}
                                <div className="flex items-center justify-between">
                                  <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                      type="checkbox"
                                      checked={pacingGuestsChecked}
                                      onChange={(e) => setPacingGuestsChecked(e.target.checked)}
                                      className="w-4 h-4 rounded border-[#EAE4DC] text-[#7553FF] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                                    />
                                    <span className="text-sm font-light text-[#1C1814]">
                                      Maximum number of guests per {timeIntervalOption} slot
                                    </span>
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      disabled={!pacingGuestsChecked}
                                      value={pacingGuestsValue}
                                      onChange={(e) => setPacingGuestsValue(Number(e.target.value))}
                                      className={`w-28 h-10 text-center text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#7553FF] transition duration-150 ${
                                        pacingGuestsChecked
                                          ? "border-[#EAE4DC] bg-white text-[#1C1814] hover:border-[#7553FF]/50 font-medium"
                                          : "border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed font-light"
                                      }`}
                                    />
                                  </div>
                                </div>

                                {/* Row 2 */}
                                <div className="flex items-center justify-between">
                                  <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <input
                                      type="checkbox"
                                      checked={pacingPartiesChecked}
                                      onChange={(e) => setPacingPartiesChecked(e.target.checked)}
                                      className="w-4 h-4 rounded border-[#EAE4DC] text-[#7553FF] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                                    />
                                    <span className="text-sm font-light text-[#1C1814]">
                                      Maximum number of parties per {timeIntervalOption} slot
                                    </span>
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="number"
                                      disabled={!pacingPartiesChecked}
                                      value={pacingPartiesValue}
                                      onChange={(e) => setPacingPartiesValue(Number(e.target.value))}
                                      className={`w-28 h-10 text-center text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#7553FF] transition duration-150 ${
                                        pacingPartiesChecked
                                          ? "border-[#EAE4DC] bg-white text-[#1C1814] hover:border-[#7553FF]/50 font-medium"
                                          : "border-slate-200 bg-slate-50 text-slate-700 cursor-not-allowed font-light"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Table assignment */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Table assignment
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-3">
                              <p className="text-xs text-black font-light leading-relaxed">
                                Tables are assigned automatically to online reservations. To change table settings, go to{" "}
                                <button
                                  type="button"
                                  onClick={() => setExpandedSetting("tables")}
                                  className="text-[#7553FF] hover:text-[#5c3ce6] hover:underline font-semibold focus:outline-none"
                                >
                                  Table Management
                                </button>
                                .
                              </p>
                            </div>
                          </div>

                          {/* Approval mode */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-xl overflow-hidden shadow-3xs font-sans">
                            {/* Card Header & Separator */}
                            <div className="px-5 py-4 border-b border-[#EAE4DC]/60 bg-white select-none">
                              <h3 className="text-sm font-semibold text-[#1C1814] font-sans">
                                Approval mode
                              </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 space-y-5">
                              {/* Option 1 */}
                              <label
                                className="flex items-start gap-3.5 cursor-pointer select-none group"
                              >
                                <input
                                  type="radio"
                                  name="approvalMode"
                                  checked={approvalMode === "automatic"}
                                  onChange={() => setApprovalMode("automatic")}
                                  className="mt-1 w-4 h-4 text-[#7553FF] border-[#EAE4DC] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                                />
                                <div>
                                  <span className="text-sm font-semibold text-[#1C1814] block">
                                    Automatic approval
                                  </span>
                                  <span className="text-xs !text-black !font-light block mt-0.5">
                                    Reservations are automatically approved based on your availability and settings.
                                  </span>
                                </div>
                              </label>

                              {/* Option 2 */}
                              <label
                                className="flex items-start gap-3.5 cursor-pointer select-none group border-t border-slate-100/90 pt-4"
                              >
                                <input
                                  type="radio"
                                  name="approvalMode"
                                  checked={approvalMode === "manual"}
                                  onChange={() => setApprovalMode("manual")}
                                  className="mt-1 w-4 h-4 text-[#7553FF] border-[#EAE4DC] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                                />
                                <div>
                                  <span className="text-sm font-semibold text-[#1C1814] block">
                                    Manual approval
                                  </span>
                                  <span className="text-xs !text-black !font-light block mt-0.5">
                                    Reservations require staff approval before confirmation.
                                  </span>
                                </div>
                              </label>

                              {/* Option 3 */}
                              <label
                                className="flex items-start gap-3.5 cursor-pointer select-none group border-t border-slate-100/90 pt-4"
                              >
                                <input
                                  type="radio"
                                  name="approvalMode"
                                  checked={approvalMode === "large"}
                                  onChange={() => setApprovalMode("large")}
                                  className="mt-1 w-4 h-4 text-[#7553FF] border-[#EAE4DC] focus:ring-[#7553FF] cursor-pointer accent-[#7553FF]"
                                />
                                <div>
                                  <span className="text-sm font-semibold text-[#1C1814] block">
                                    Manual for large parties only
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 4: Reservation form */}
                      {expandedSetting === "form" && (
                        <div className="space-y-6 text-left font-sans">
                          {/* Fields settings check card */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4 font-sans">
                            <h3 className="text-sm font-medium text-[#1C1814]  tracking-wider">
                              Form Field Toggles
                            </h3>
                            <p className="text-sm text-[#7C7267] font-light">
                              Choose which parameters require customer inputs
                              inside the widget.
                            </p>

                            <div className="space-y-4 divide-y divide-slate-100 font-sans">
                              <div className="flex items-center justify-between pt-1">
                                <div>
                                  <span className="text-sm font-medium text-[#1C1814] block">
                                    Require email address
                                  </span>
                                  <span className="text-sm text-slate-700 font-light whitespace-normal leading-relaxed">
                                    Guests will be required to enter their email
                                    address to complete.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setRequireEmail(!requireEmail)}
                                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${requireEmail ? "bg-blue-600" : "bg-slate-300"}`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${requireEmail ? "translate-x-5" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-3 font-sans">
                                <div>
                                  <span className="text-sm font-medium text-[#1C1814] block">
                                    Require last name
                                  </span>
                                  <span className="text-sm text-slate-700 font-light">
                                    Guests will be required to enter their last
                                    name to complete.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setRequireLastName(!requireLastName)
                                  }
                                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${requireLastName ? "bg-blue-600" : "bg-slate-300"}`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${requireLastName ? "translate-x-5" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-3 font-sans font-sans">
                                <div>
                                  <span className="text-xs font-bold text-[#1C1814] block">
                                    Custom message banner
                                  </span>
                                  <span className="text-xs text-[#7C7267] font-medium leading-relaxed block">
                                    Add a message with additional information
                                    for your guests.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCustomMessageEnabled(
                                      !customMessageEnabled,
                                    )
                                  }
                                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${customMessageEnabled ? "bg-blue-600" : "bg-slate-300"}`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${customMessageEnabled ? "translate-x-5" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-3 font-sans">
                                <div>
                                  <span className="text-xs font-bold text-[#1C1814] block">
                                    Email marketing checkbox
                                  </span>
                                  <span className="text-xs text-[#7C7267] font-medium leading-relaxed block font-sans">
                                    Add a checkbox to let your guests update on
                                    your bistro promotions.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEmailMarketingCheckboxEnabled(
                                      !emailMarketingCheckboxEnabled,
                                    )
                                  }
                                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${emailMarketingCheckboxEnabled ? "bg-blue-600" : "bg-slate-300"}`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${emailMarketingCheckboxEnabled ? "translate-x-5" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-3 font-sans">
                                <div>
                                  <span className="text-xs font-bold text-[#1C1814] block">
                                    Policies agreement checkbox
                                  </span>
                                  <span className="text-[#7C7267] font-medium block font-sans text-xs">
                                    Be sure to mention guest booking refund/hold
                                    rules on footer.
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPoliciesEnabled(!policiesEnabled)
                                  }
                                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${policiesEnabled ? "bg-blue-600" : "bg-slate-300"}`}
                                >
                                  <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-all ${policiesEnabled ? "translate-x-5" : "translate-x-0"}`}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Custom fields row */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4">
                            <div className="flex items-center justify-between font-sans">
                              <div>
                                <h3 className="text-xs font-black text-[#1C1814]  tracking-wider font-sans">
                                  Custom fields
                                </h3>
                                <p className="text-xs text-slate-700 font-semibold leading-relaxed mt-0.5">
                                  Let your customers enrich their reservation
                                  with extra details.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const label = prompt(
                                    "Enter label name for custom input:",
                                    "Special Diet Request",
                                  );
                                  if (label) {
                                    setCustomFields([
                                      ...customFields,
                                      {
                                        id: String(Date.now()),
                                        name: label,
                                        type: "text",
                                      },
                                    ]);
                                    triggerToast(
                                      `Custom field '${label}' operational!`,
                                      "success",
                                    );
                                  }
                                }}
                                className="text-xs font-black text-[#7553FF] flex items-center gap-1 hover:underline font-sans"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Custom Field</span>
                              </button>
                            </div>

                            {customFields.length > 0 ? (
                              <div className="divide-y divide-slate-100 border border-[#EAE4DC]/60 rounded-xl overflow-hidden bg-slate-50/20 text-xs font-semibold">
                                {customFields.map((cf) => (
                                  <div
                                    key={cf.id}
                                    className="p-3 flex items-center justify-between font-sans"
                                  >
                                    <span className="text-slate-800 font-medium font-sans">
                                      {cf.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCustomFields(
                                          customFields.filter(
                                            (f) => f.id !== cf.id,
                                          ),
                                        );
                                        triggerToast(
                                          "Custom input removed.",
                                          "info",
                                        );
                                      }}
                                      className="text-rose-500 hover:text-rose-700 hover:scale-105 transition"
                                    >
                                      <Trash className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-6 border border-dashed border-[#EAE4DC] bg-slate-50/15 text-slate-700 font-semibold text-xs text-center rounded-xl font-sans">
                                No custom fields mapped yet. Tap 'Add Custom
                                Field' to acquire specific guest data.
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 5: Prepayment */}
                      {expandedSetting === "prepayment" && (
                        <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-8 shadow-3xs text-center space-y-6 font-sans">
                          <div className="w-20 h-20 bg-[#F0ECFF] text-[#7553FF] rounded-full flex items-center justify-center mx-auto shadow-2xs">
                            <Zap className="w-10 h-10 animate-pulse" />
                          </div>

                          <div className="max-w-md mx-auto space-y-2">
                            <h3 className="text-base font-extrabold text-[#1C1814] font-black">
                              Add prepayment protection
                            </h3>
                            <p className="text-xs text-[#7C7267] font-semibold leading-relaxed font-sans">
                              Reduce last minute cancellations & empty tables by
                              safely accepting secure partial bookings / table
                              deposits online when reservations are registered.
                            </p>
                          </div>

                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() =>
                                triggerToast(
                                  "Connecting payment processing gateway integration...",
                                  "info",
                                )
                              }
                              className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-black rounded-lg inline-flex items-center gap-2 shadow-xs cursor-pointer font-sans"
                            >
                              <Zap className="w-4 h-4 font-black" />
                              <span>Add & Configure Prepayment Gateway</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 6: Reserve with Google */}
                      {expandedSetting === "google" && (
                        <div className="space-y-6 text-left font-sans">
                          {/* Salmon pink Warning banner */}
                          <div className="bg-[#FFF1F1] border border-rose-250 text-rose-700 p-4 rounded-xl flex items-center justify-between text-xs font-bold shadow-3xs">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                              <span>
                                There was a technical issue on our end. Please
                                refresh or try again in a few minutes.
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                triggerToast(
                                  "Connecting with Google Reservation Endpoint API...",
                                  "info",
                                )
                              }
                              className="px-3 py-1 bg-white border border-rose-200 text-slate-705 text-[10px] font-black rounded hover:bg-slate-50 transition"
                            >
                              Refresh Page
                            </button>
                          </div>

                          {/* Progress Step Guide */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-5 shadow-3xs space-y-4">
                            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3 font-sans">
                              <h4 className="text-xs font-black text-[#1C1814]  tracking-wider">
                                Follow steps to activate Reserve with Google
                              </h4>
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-705 text-[10px] font-black rounded-[2px] border border-amber-100">
                                1/2 steps operational !
                              </span>
                            </div>

                            <div className="space-y-3.5 font-sans">
                              <div className="flex items-start gap-3.5 font-sans">
                                <div className="w-6 h-6 rounded-full bg-[#FAF9F7] text-[#7C7267] font-mono font-bold text-xs flex items-center justify-center border border-slate-200 mt-0.5">
                                  1
                                </div>
                                <div className="flex-grow space-y-1">
                                  <span className="text-xs font-bold text-slate-800 block">
                                    Set up a business profile
                                  </span>
                                  <span className="text-xs text-slate-700 font-semibold block leading-normal">
                                    Create a standard local profile and connect
                                    your hub restaurant layout with google
                                    mapping.
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      triggerToast(
                                        "Redirecting to Google Business profile verification...",
                                        "info",
                                      )
                                    }
                                    className="px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black text-[#7553FF] rounded-lg mt-1.5 inline-block"
                                  >
                                    Create Google Profile
                                  </button>
                                </div>
                              </div>

                              <div className="border-t border-slate-100 pt-3 flex items-start gap-3.5 animate-pulse font-sans">
                                <div className="w-6 h-6 rounded-full bg-emerald-50 text-[#059669] font-mono font-bold text-xs flex items-center justify-center border border-emerald-250 mt-0.5">
                                  ✓
                                </div>
                                <div className="flex-grow space-y-0.5">
                                  <span className="text-xs font-bold text-slate-700 block line-through">
                                    Publish your Bistro public booking path
                                  </span>
                                  <span className="text-[11px] text-emerald-600 font-extrabold ">
                                    Done & Connected
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Technical error block */}
                          <div className="bg-white border border-[#EAE4DC]/60 rounded-2xl p-8 shadow-3xs text-center space-y-5 font-sans">
                            <h4 className="text-xs font-black text-slate-808  tracking-widest">
                              Manage Reserve with Google
                            </h4>
                            <p className="text-xs text-slate-700 font-semibold">
                              Note: Connection sync with Google Maps can take up
                              to 2-3 business days.
                            </p>

                            <div className="p-6 border border-dashed border-[#EAE4DC]/70 bg-slate-50/10 rounded-xl space-y-2">
                              <p className="text-xs text-slate-700 font-semibold leading-normal">
                                We ran into a structural connection timeout and
                                cannot feed realtime status coordinates.
                              </p>
                              <button
                                type="button"
                                onClick={() =>
                                  triggerToast(
                                    "Attempting google endpoint callback...",
                                    "info",
                                  )
                                }
                                className="text-xs text-blue-655 font-bold hover:underline"
                              >
                                Force Refresh Connection
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SUB-VIEW 7: Notifications */}
                      {expandedSetting === "notifications" && (
                        <div className="space-y-6 text-left font-sans p-1">
                          {/* Header Hierarchy */}
                          <div className="pb-3 border-b border-[#1C1814]/15">
                            <h4 className="text-[14px] font-medium text-[#1C1814] tracking-tight ">
                              NOTIFICATIONS CONFIGURATION
                            </h4>
                          </div>

                          {/* Symmetric Dual-Column Layout with split line divider */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-2 md:divide-x md:divide-slate-200/60">
                            {/* Column 1: Telegram Config */}
                            <div className="space-y-4 py-2 flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="text-[14px] font-medium text-[#1C1814] block">
                                  Telegram Config
                                </span>
                              </div>

                              <div className="space-y-3.5">
                                <div className="space-y-1">
                                  <label className="text-[12px] font-medium text-[#1C1814]/60 tracking-wider block">
                                    Bot Token
                                  </label>
                                  <input
                                    type="text"
                                    value={telegramBotToken}
                                    onChange={(e) => setTelegramBotToken(e.target.value)}
                                    placeholder="e.g. 1234567890:ABCdef... "
                                    className="w-full bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[14px] font-light text-[#1C1814] placeholder-[#1C1814]/30 focus:outline-none focus:border-slate-350 shadow-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[12px] font-medium text-[#1C1814]/60 tracking-wider block">
                                    Chat ID
                                  </label>
                                  <input
                                    type="text"
                                    value={telegramChatId}
                                    onChange={(e) => setTelegramChatId(e.target.value)}
                                    placeholder="e.g. 123456789"
                                    className="w-full bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[14px] font-light text-[#1C1814] placeholder-[#1C1814]/30 focus:outline-none focus:border-slate-350 shadow-none"
                                  />
                                </div>



                                <p className="text-[14px] font-light text-[#1C1814]/70 leading-relaxed mt-2">
                                  Create a Telegram Bot via <code className="font-mono bg-slate-50 px-1 rounded text-[#1C1814]/95">@BotFather</code> to receive instantaneous reservation alerts. Obtain your target Chat ID inside your active telegram conversation.
                                </p>
                              </div>
                            </div>

                            {/* Column 2: WhatsApp Config */}
                            <div className="space-y-4 py-2 flex flex-col justify-between md:pl-6">
                              <div className="space-y-1">
                                <span className="text-[14px] font-medium text-[#1C1814] block">
                                  WhatsApp Config
                                </span>
                              </div>

                              <div className="space-y-3.5">
                                <div className="space-y-1">
                                  <label className="text-[12px] font-medium text-[#1C1814]/60 tracking-wider block">
                                    Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    value={whatsappPhoneNumber}
                                    onChange={(e) => setWhatsappPhoneNumber(e.target.value)}
                                    placeholder="e.g. +84901234567"
                                    className="w-full bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[14px] font-light text-[#1C1814] placeholder-[#1C1814]/30 focus:outline-none focus:border-slate-350 shadow-none"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[12px] font-medium text-[#1C1814]/60 tracking-wider block">
                                    Phone ID
                                  </label>
                                  <input
                                    type="text"
                                    value={whatsappPhoneId}
                                    onChange={(e) => setWhatsappPhoneId(e.target.value)}
                                    placeholder="e.g. 102938475630291"
                                    className="w-full bg-white disabled:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[14px] font-light text-[#1C1814] placeholder-[#1C1814]/30 focus:outline-none focus:border-slate-350 shadow-none"
                                  />
                                </div>



                                <p className="text-[14px] font-light text-[#1C1814]/70 leading-relaxed mt-2">
                                  Configure a WhatsApp Business API account on the Meta Developer Portal to dispatch instant updates. Register your verified sender phone number to obtain the matching Phone ID.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

              {/* Bottom Fixed Action Footer */}
              {expandedSetting !== null && (
                <div className="border-t border-[#EAE4DC]/60 py-4 px-6 md:px-8 flex justify-between items-center font-sans bg-white z-10 shrink-0 select-none">
                  {expandedSetting === "integration" || expandedSetting === "notifications" || expandedSetting === "profile" ? (
                    <div className="w-full flex justify-between items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setExpandedSetting(null)}
                        className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-[14px] font-medium text-[#1C1814] hover:bg-slate-50 transition-all cursor-pointer bg-white"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#1C1814]" strokeWidth={2} />
                        <span>Back to settings</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedSetting(null);
                          if (expandedSetting === "profile") {
                            triggerToast("Settings safely saved and broadcasted to widget layout!", "success");
                          } else if (expandedSetting === "notifications") {
                            triggerToast("Notification configuration updated!", "success");
                          }
                        }}
                        className="px-5 py-2 bg-[#1C1814] hover:bg-[#2b251f] text-white text-[14px] font-medium rounded-xl transition cursor-pointer border-none shadow-none"
                      >
                        {expandedSetting === "profile" ? "Save Settings" : "Close Guide"}
                      </button>
                    </div>
                  ) : (
                    <>
                     <button
                       type="button"
                       onClick={() => setExpandedSetting(null)}
                       className="flex items-center gap-2 text-xs font-light text-[#5C534C] hover:text-[#1C1814] cursor-pointer transition-all"
                     >
                       <ChevronLeft
                         className="w-4 h-4 text-[#7553FF]"
                         strokeWidth={2}
                       />
                       <span className="capitalize text-sm font-light text-slate-850 tracking-tight font-sans font-medium">
                         Back to settings
                       </span>
                     </button>

                     <button
                       type="button"
                       onClick={() => {
                         setExpandedSetting(null);
                         triggerToast(
                           "Settings safely saved and broadcasted to widget layout!",
                           "success",
                         );
                       }}
                       className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer font-sans"
                     >
                       Save
                     </button>
                   </>
                 )}
               </div>
             )}
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* ----------------- MODALS BLOCK ----------------- */}

      {/* A. DETAIL VIEW MODAL (WITH SEATING FLOOR MAP PREVIEW) */}
      <AnimatePresence>
        {viewBooking && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative text-left"
            >
              {/* Header profile */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#7553FF]/10 border border-[#7553FF]/20 flex items-center justify-center text-[#7553FF] font-bold text-sm">
                    {viewBooking.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      {viewBooking.name}
                    </h3>
                    <p className="text-[14px] text-[#7553FF] font-bold tracking-wide flex items-center gap-1.5 mt-0.5">
                      <span>Ref ID:</span>
                      <span className="font-mono font-normal text-slate-700">
                        {viewBooking.id}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setViewBooking(null)}
                  className="p-1.5 border border-slate-150 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status & particulars grids */}
              <div className="grid grid-cols-2 gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 text-xs font-sans">
                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    GUESTS CAP
                  </span>
                  <span className="font-extrabold text-slate-700">
                    {viewBooking.guests} PAX
                  </span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    SEATING STATUS
                  </span>
                  <span
                    className={`inline-block font-extrabold font-mono text-[14px] rounded-md ${
                      viewBooking.status === "CONFIRMED"
                        ? "text-emerald-600"
                        : viewBooking.status === "PENDING"
                          ? "text-amber-600"
                          : "text-rose-600"
                    }`}
                  >
                    ● {viewBooking.status}
                  </span>
                </div>

                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    RESERVATION DATE
                  </span>
                  <span className="font-poppins text-slate-700 font-semibold">
                    {new Date(viewBooking.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    VISIT TIME
                  </span>
                  <span className="font-poppins text-slate-700 font-semibold">
                    {viewBooking.time}
                  </span>
                </div>

                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    DISH PREFERENCES
                  </span>
                  <span className="text-slate-600">
                    {viewBooking.source} customer
                  </span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-slate-700  tracking-widest block mb-1">
                    DINER PHONE
                  </span>
                  <span className="font-poppins text-slate-700 font-semibold">
                    {viewBooking.phone}
                  </span>
                </div>
              </div>

              {/* Notes block */}
              <div className="mt-4 space-y-1.5 p-3.5 bg-slate-100/30 rounded-xl text-xs border border-dashed border-slate-200">
                <span className="font-bold text-slate-550 block text-[14px] ">
                  MEMO INFORMATION
                </span>
                <p className="text-slate-600 italic leading-relaxed">
                  "{viewBooking.notes || "-"}"
                </p>
              </div>

              {/* FLOOR PLAN ASSIGNED SEATING VECTOR */}
              <div className="mt-5 space-y-2">
                <span className="text-[14px]  font-bold text-slate-700 tracking-wider block">
                  FLOOR LAYOUT LOCATION
                </span>

                {/* Simulated minimal high contrast seating map */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 aspect-video relative flex flex-col justify-between border border-slate-800">
                  <div className="flex justify-between items-center text-[14px] font-mono text-slate-700">
                    <span>STAGE & BAR</span>
                    <span>ENTRANCE GATE - NO. 1</span>
                  </div>

                  {/* Seating grids layout */}
                  <div className="grid grid-cols-4 gap-3 my-2.5">
                    {[
                      { num: 1, type: "2-PAX" },
                      { num: 2, type: "2-PAX" },
                      { num: 3, type: "4-PAX" },
                      { num: 4, type: "4-PAX" },
                      { num: 5, type: "6-PAX" },
                      { num: 6, type: "8-PAX" },
                      { num: 7, type: "VIP ZONE" },
                      { num: 8, type: "WINDOW" },
                    ].map((table) => {
                      // pick one to highlight simulated assignment
                      const isTarget =
                        (viewBooking.guests > 8 && table.num === 7) ||
                        (viewBooking.guests <= 2 && table.num === 1) ||
                        (viewBooking.guests > 2 &&
                          viewBooking.guests <= 4 &&
                          table.num === 3) ||
                        (viewBooking.guests > 4 &&
                          viewBooking.guests <= 8 &&
                          table.num === 5);
                      return (
                        <div
                          key={table.num}
                          className={`p-2 rounded-xl text-center border transition-all flex flex-col justify-center items-center h-14 cursor-help ${
                            isTarget
                              ? "bg-[#7553FF] border-white/20 text-white shadow-md animate-pulse font-extrabold"
                              : "bg-slate-800/80 border-slate-700/50 text-slate-700 hover:bg-slate-800 hover:border-slate-600"
                          }`}
                          title={`Table ${table.num} seating specification`}
                        >
                          <span className="text-[14px] font-mono  tracking-lighter">
                            {table.type}
                          </span>
                          <span className="text-[14px] font-bold mt-1">
                            T-{table.num}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[14px] font-sans text-center text-slate-700 flex items-center justify-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7553FF] inline-block" />
                    <span>
                      Highlighted Zone is automatically allocated for a Party of{" "}
                      {viewBooking.guests}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button footer */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setViewBooking(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Close Record
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. EDIT RESERVATION MODAL */}
      <AnimatePresence>
        {editBooking && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative text-left font-sans"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-5">
                <h3 className="text-base font-bold text-slate-850">
                  Edit Table Reservation
                </h3>
                <button
                  onClick={() => setEditBooking(null)}
                  className="p-1 text-slate-700 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="space-y-1.5 flex flex-col items-start text-left">
                  <label className="text-xs font-bold text-[#1C1814] block">
                    Customer Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editBooking.name}
                    onChange={(e) =>
                      setEditBooking({ ...editBooking, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={editBooking.phone}
                      onChange={(e) =>
                        setEditBooking({
                          ...editBooking,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Guests Size (Pax)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      required
                      value={editBooking.guests}
                      onChange={(e) =>
                        setEditBooking({
                          ...editBooking,
                          guests: Number(e.target.value),
                        })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={editBooking.date}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, date: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Reservation Time
                    </label>
                    <input
                      type="text"
                      required
                      value={editBooking.time}
                      onChange={(e) =>
                        setEditBooking({ ...editBooking, time: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Visitor Source
                    </label>
                    <select
                      value={editBooking.source}
                      onChange={(e) =>
                        setEditBooking({
                          ...editBooking,
                          source: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-705 cursor-pointer"
                    >
                      {["Website", "Phone", "Instagram", "Walk-in"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-bold text-[#1C1814] block">
                      Status
                    </label>
                    <select
                      value={editBooking.status}
                      onChange={(e) =>
                        setEditBooking({
                          ...editBooking,
                          status: e.target.value as any,
                        })
                      }
                      className="w-full p-2.5 border border-slate-200 rounded-xl text-xs bg-white text-slate-705 cursor-pointer"
                    >
                      {["CONFIRMED", "PENDING", "CANCELLED"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 flex flex-col items-start text-left">
                  <label className="text-xs font-bold text-[#1C1814] block">
                    Reservation Notes
                  </label>
                  <input
                    type="text"
                    value={editBooking.notes}
                    onChange={(e) =>
                      setEditBooking({ ...editBooking, notes: e.target.value })
                    }
                    placeholder="e.g. Near window area"
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700"
                  />
                </div>

                <div className="h-2" />

                {/* Submit / Cancel Footer row */}
                <div className="border-t border-slate-100 pt-4 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditBooking(null)}
                    className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    Save Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TURN TIME RULES EDIT MODAL */}
      <AnimatePresence>
        {showTurnTimeModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative font-sans text-left text-[#1C1814]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowTurnTimeModal(false)}
                className="absolute top-5 right-5 p-1.5 border border-slate-150 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-700 cursor-pointer transition"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-6 select-none pr-8">
                <h3 className="text-xl font-bold text-slate-800">
                  Turn time
                </h3>
                <p className="text-sm text-black mt-1.5 font-light leading-relaxed">
                  Set how long different party sizes can reserve a table for.
                </p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Default time section */}
                <div className="space-y-2 select-none">
                  <label className="text-xs font-semibold text-[#1C1814] block">
                    Default time
                  </label>
                  <div className="relative">
                    <select
                      value={tempTurnTimeDefault}
                      onChange={(e) => setTempTurnTimeDefault(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 bg-white rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#7553FF]/20 focus:border-[#7553FF] cursor-pointer appearance-none"
                    >
                      {["30 min", "45 min", "1 hr", "1 hr 30 min", "2 hrs", "2 hrs 30 min", "3 hrs", "4 hrs"].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-700">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Rules Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-800 select-none">
                    Rules
                  </h4>

                  {/* Rules header labels */}
                  {tempTurnTimeRules.length > 0 && (
                    <div className="grid grid-cols-12 gap-3 mb-1 select-none text-xs font-light text-black">
                      <div className="col-span-6">
                        Number of guests (min-max)
                      </div>
                      <div className="col-span-5">
                        Default time
                      </div>
                      <div className="col-span-1"></div>
                    </div>
                  )}

                  {/* Rules list */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {tempTurnTimeRules.map((rule, idx) => (
                      <div key={rule.id} className="grid grid-cols-12 gap-3 items-center">
                        {/* Guests min-max input */}
                        <div className="col-span-6 flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#7553FF]/20 focus-within:border-[#7553FF]">
                          <input
                            type="number"
                            min="1"
                            value={rule.minGuests}
                            onChange={(e) => {
                              const newRules = [...tempTurnTimeRules];
                              newRules[idx].minGuests = Math.max(1, parseInt(e.target.value) || 1);
                              setTempTurnTimeRules(newRules);
                            }}
                            className="w-full px-3 py-2 text-center text-sm focus:outline-none bg-transparent"
                          />
                          <div className="border-r border-slate-200 h-9" />
                          <input
                            type="number"
                            min="1"
                            value={rule.maxGuests}
                            onChange={(e) => {
                              const newRules = [...tempTurnTimeRules];
                              newRules[idx].maxGuests = Math.max(1, parseInt(e.target.value) || 1);
                              setTempTurnTimeRules(newRules);
                            }}
                            className="w-full px-3 py-2 text-center text-sm focus:outline-none bg-transparent"
                          />
                        </div>

                        {/* Rules timeframe dropdown select */}
                        <div className="col-span-5 relative">
                          <select
                            value={rule.time}
                            onChange={(e) => {
                              const newRules = [...tempTurnTimeRules];
                              newRules[idx].time = e.target.value;
                              setTempTurnTimeRules(newRules);
                            }}
                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#7553FF]/20 focus:border-[#7553FF] cursor-pointer appearance-none"
                          >
                            {["30 min", "45 min", "1 hr", "1 hr 30 min", "2 hrs", "2 hrs 30 min", "3 hrs", "4 hrs"].map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Trash Button */}
                        <div className="col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setTempTurnTimeRules(tempTurnTimeRules.filter((r) => r.id !== rule.id));
                            }}
                            className="p-2 text-slate-700 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition duration-150 cursor-pointer"
                            title="Delete Rule"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {tempTurnTimeRules.length === 0 && (
                      <p className="text-xs text-slate-700 italic font-sans py-2 select-none text-left">
                        No custom turn time rules. All party sizes will default to the timeframe above.
                      </p>
                    )}
                  </div>

                  {/* Add Rule Button */}
                  <div className="pt-1.5 flex justify-start select-none">
                    <button
                      type="button"
                      onClick={() => {
                        const newId = String(Date.now());
                        setTempTurnTimeRules([
                          ...tempTurnTimeRules,
                          { id: newId, minGuests: 3, maxGuests: 4, time: "2 hrs" }
                        ]);
                      }}
                      className="text-xs font-semibold text-[#7553FF] hover:text-[#5c3ce6] hover:underline focus:outline-none cursor-pointer flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#7553FF]" />
                      <span>Add Rule</span>
                    </button>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-slate-100 pt-5 flex justify-end gap-3 select-none">
                  <button
                    type="button"
                    onClick={() => setShowTurnTimeModal(false)}
                    className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-200/50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTurnTimeDefault(tempTurnTimeDefault);
                      setTurnTimeRules(tempTurnTimeRules);
                      setShowTurnTimeModal(false);
                      triggerToast("Turn time rules successfully saved!", "success");
                    }}
                    className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-[#FFFFFF] rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. CREATE RESERVATION MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-100 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative font-sans text-[#1C1814]"
            >
              {/* Close Button absolute */}
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 p-1 text-slate-700 hover:text-slate-600 cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Centered Book a Table Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold tracking-tight text-slate-850">
                  Book a Table
                </h3>
                <p className="text-xs text-slate-700 mt-1.5 font-light">
                  Experience refined dining. Secure your moment with us.
                </p>
              </div>

              <form onSubmit={handleAddBookingSubmit} className="space-y-4">
                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={addForm.name}
                      onChange={(e) =>
                        setAddForm({ ...addForm, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={addForm.email}
                      onChange={(e) =>
                        setAddForm({ ...addForm, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number & Number of Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={addForm.phone}
                      onChange={(e) =>
                        setAddForm({ ...addForm, phone: e.target.value })
                      }
                      placeholder="0901234567"
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Number of Guests *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={addForm.guests}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          guests: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      placeholder="e.g. 4"
                      className="w-full px-3.5 py-2.5 border border-[#EAE4DC] hover:border-[#DCD2C7] bg-white rounded-xl text-xs text-[#1C1814]/90 focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Row 3: Reservation Date & Preferred Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={addForm.date}
                      onChange={(e) =>
                        setAddForm({ ...addForm, date: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Preferred Time *
                    </label>
                    <select
                      value={addForm.time}
                      onChange={(e) =>
                        setAddForm({ ...addForm, time: e.target.value })
                      }
                      className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-mono text-slate-705 cursor-pointer"
                    >
                      {[
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "17:00",
                        "17:30",
                        "18:00",
                        "18:30",
                        "19:00",
                        "19:30",
                        "20:00",
                        "20:30",
                        "21:00",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Booking Source & Status Selector conforming to DESIGN.md */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Booking Source *
                    </label>
                    <select
                      value={addForm.source}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          source: e.target.value,
                        })
                      }
                      className="w-full p-2.5 border border-[#EAE4DC] hover:border-[#DCD2C7] bg-white rounded-xl text-xs text-[#1C1814]/90 cursor-pointer focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all outline-none"
                    >
                      {["Website", "Phone", "Instagram", "Walk-in"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start text-left">
                    <label className="text-xs font-medium text-[#1C1814] block">
                      Status *
                    </label>
                    <select
                      value={addForm.status}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          status: e.target.value as any,
                        })
                      }
                      className="w-full p-2.5 border border-[#EAE4DC] hover:border-[#DCD2C7] bg-white rounded-xl text-xs text-[#1C1814]/90 cursor-pointer focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all outline-none"
                    >
                      {["CONFIRMED", "PENDING"].map((s) => (
                        <option key={s} value={s}>
                          {s === "CONFIRMED" ? "Confirmed" : "Pending"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: Special Requests (Optional) */}
                <div className="space-y-1.5 flex flex-col items-start text-left">
                  <label className="text-xs font-medium text-[#1C1814] block">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={addForm.notes}
                    onChange={(e) =>
                      setAddForm({ ...addForm, notes: e.target.value })
                    }
                    placeholder="Allergies, high chair, window seat..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs placeholder:text-slate-700 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer text-center"
                  >
                    Confirm Reservation
                  </button>
                </div>

                {/* Disclaimer/Cancellations subtext */}
                <p className="text-[11px] text-slate-700 italic text-center leading-relaxed font-light mt-4 px-4">
                  Please note: Cancellations must be made at least 2 hours in
                  advance. Thank you for your understanding.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgrade Popup Modal */}
      <AnimatePresence>
        {showUpgradePopup && (
          <div data-no-intercept="true" className="fixed inset-0 bg-[#1C1814]/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-0 w-full max-w-md rounded-2xl p-7 shadow-2xl relative text-center space-y-6 text-[#1C1814] font-sans overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#7553FF]" />
              
              <div className="w-16 h-16 bg-[#7553FF]/10 text-[#7553FF] rounded-full flex items-center justify-center mx-auto animate-pulse">
                <PartyPopper className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-[20px] font-bold text-slate-950 font-sans tracking-tight">
                  Upgrade to Diamond Required
                </h3>
                <p className="text-[14px] text-slate-700 font-normal leading-relaxed">
                  The <strong>Book a Table</strong> tool (interactive floor planning, live online reservations management) is a premium feature exclusive to the <strong>Diamond</strong> plan. Upgrade now to unlock automation workflows!
                </p>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowUpgradePopup(false);
                    triggerToast("Opening Subscription settings! Choose the Diamond tier to enable high-fidelity automated reservations.", "info");
                    onUpgrade?.();
                  }}
                  className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-xl transition-all shadow-md cursor-pointer border-none"
                >
                  Unlock Diamond Plan
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowUpgradePopup(false);
                    triggerToast("Preview mode active. Feel free to inspect the layout, reservation metrics, and mock config settings!", "success");
                  }}
                  className="w-full h-11 bg-transparent hover:bg-slate-50 text-slate-700 hover:text-slate-700 text-[14px] font-medium rounded-xl transition-all cursor-pointer border border-slate-200/65"
                >
                  Keep Exploring
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 4. CHATBOT VIEW
// ============================================================================
export function ChatbotView() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I am your Store Hub AI Assistant. I can help configure your branch rosters, analyze allergen ratings, translate menu dishes, or give insights on price updating. What is on your mind?",
      sender: "bot",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestionChips = [
    "Optimize weekend shift rosters",
    "Translate beef noodles to Spanish",
    "Recommend summer marketing voucher template",
    "How to manage high allergy risks on peanut recipe",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: "user" },
    ]);
    setInputVal("");
    setIsTyping(true);

    // Simulate smart restaurant business intelligence feedback
    setTimeout(() => {
      let botResponse =
        "I have queued that query to investigate and evaluate the corresponding logs. Is there anything else I can coordinate under Store Hub for you?";

      const lowerText = text.toLowerCase();
      if (
        lowerText.includes("roster") ||
        lowerText.includes("shift") ||
        lowerText.includes("weekend")
      ) {
        botResponse =
          "Based on current scheduler rules, Saturday peak hours present our highest density. I recommend auto-assigning Alex and Minh Hoang onto shift slots to prevent short-staff alerts, satisfying baseline labor safety limits.";
      } else if (
        lowerText.includes("translate") ||
        lowerText.includes("spanish")
      ) {
        botResponse =
          "Certainly! You can translation file terms easily inside the 'Cultural Menu Translator'. 'Phở Bò Gân' translates beautifully to Spanish as 'Sopa de fideos de arroz con tendón de res tailandés premium' with cultural caveats on broth density.";
      } else if (
        lowerText.includes("allergy") ||
        lowerText.includes("peanut")
      ) {
        botResponse =
          "Checking recipe databases. Our 'Dry Chicken Noodles' uses peanut garnish. The 'Allergen Intelligence' detector has flagged this as highly critical. I suggest highlighting cross-contamination protocols on kitchen tablet displays.";
      } else if (
        lowerText.includes("marketing") ||
        lowerText.includes("voucher") ||
        lowerText.includes("summer")
      ) {
        botResponse =
          "Summer local campaigns yield best result when coupled with SMS Alerts. I recommend pushing a coupon token: 'SUMMEGUSTO' (15% Off all beef index dishes) 1 hour before noon peak shifts.";
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: botResponse, sender: "bot" },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814]">
            Store Hub AI Copilot
          </h1>
          <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1">
            Your personal smart assistant to consult store performance metrics,
            schedule allocations, and recipe allergen ratings.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1814]/5 rounded-2xl flex flex-col h-[520px] shadow-sm overflow-hidden">
        {/* Messages Screen Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl p-4 text-[14px] leading-relaxed shadow-3xs border ${
                  m.sender === "user"
                    ? "bg-[#7553FF] text-white border-[#7553FF]/10 rounded-tr-xs font-medium"
                    : "bg-white text-[#1C1814] border-[#1C1814]/5 rounded-tl-xs"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#1C1814]/5 rounded-2xl rounded-tl-xs p-3.5 flex items-center gap-1.5 shadow-3xs">
                <span className="w-2 h-2 rounded-full bg-[#7553FF] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#7553FF] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#7553FF] animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 border-t border-[#1C1814]/5 bg-white flex gap-2 overflow-x-auto whitespace-nowrap">
          {suggestionChips.map((chip) => (
            <button
              key={chip}
              onClick={() => handleSend(chip)}
              className="text-[14px] bg-slate-100/80 hover:bg-[#7553FF]/10 text-[#1C1814]/70 hover:text-[#7553FF] border border-[#1C1814]/5 px-3 py-1.5 rounded-full transition-colors font-medium shrink-0 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* TextInput controls */}
        <div className="p-4 bg-white border-t border-[#1C1814]/5 flex gap-2">
          <input
            type="text"
            placeholder="Ask AI Copilot concerning Hanoi outlet shifts, menu pricing..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(inputVal)}
            className="flex-1 text-sm px-4 py-2.5 border border-[#1C1814]/10 rounded-xl"
          />
          <button
            onClick={() => handleSend(inputVal)}
            className="p-3 bg-[#7553FF] hover:bg-[#7553FF]/90 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. AI FOOD IMAGES VIEW
// ============================================================================
// ============================================================================
// 5. AI FOOD IMAGES VIEW
// ============================================================================
const MOCK_FOOD_DATA: Record<string, string[]> = {
  thai: [
    "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
  ],
  pho: [
    "https://images.unsplash.com/photo-1582878826629-29b7ad1ccd27?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=800&auto=format&fit=crop&q=80",
  ],
  banh_mi: [
    "https://images.unsplash.com/photo-1600454021970-351feb2a5149?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
  ],
  pizza: [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&auto=format&fit=crop&q=80",
  ],
  sushi: [
    "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&auto=format&fit=crop&q=80",
  ],
  burger: [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&auto=format&fit=crop&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80",
  ],
};

export function AiFoodImagesView() {
  const [dishName, setDishName] = useState(
    "Spicy Thai Basil Stir-fried Chicken",
  );
  const [detailedDescription, setDetailedDescription] = useState(
    "Stir-fried chicken with Thai basil, garlic, chili, bell peppers, and onions. Serve with jasmine rice.",
  );
  const [aiEngine, setAiEngine] = useState("OpenAI (DALL-E 3)");
  const [cuisine, setCuisine] = useState("Thai");
  const [startingPoint, setStartingPoint] = useState<
    "no-photos" | "have-photos"
  >("no-photos");
  const [uploadedImages, setUploadedImages] = useState<
    { id: string; name: string; size: string; previewUrl: string }[]
  >([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addUploadedFiles(e.target.files);
    }
  };

  const addUploadedFiles = (files: FileList) => {
    const newImages = Array.from(files).map((file) => {
      return {
        id: `uploaded-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        previewUrl: URL.createObjectURL(file),
      };
    });
    setUploadedImages((prev) => [...prev, ...newImages]);
    triggerToast(`Successfully uploaded ${newImages.length} food photo(s)!`);
  };

  const removeUploadedImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    triggerToast("Removed uploaded photo.");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addUploadedFiles(e.dataTransfer.files);
    }
  };

  const [numImages, setNumImages] = useState("4 images");
  const [aspectRatio, setAspectRatio] = useState("1:1 (Square)");
  const [cameraAngle, setCameraAngle] = useState("Top Down (Flat Lay)");

  const [imageStyle, setImageStyle] = useState("Professional");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Loaded with beautiful default Spicy Thai Basil Chicken mockup images matching the design exactly
  const [foodImages, setFoodImages] = useState<any[]>([
    {
      id: "img-1",
      url: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&auto=format&fit=crop&q=80",
      title: "Spicy Thai Basil Stir-fried Chicken flatlay",
      aspectRatio: "1:1",
      engine: "OpenAI (DALL-E 3)",
      angle: "Top Down",
    },
    {
      id: "img-2",
      url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=80",
      title: "Thai basil hot wok chicken",
      aspectRatio: "1:1",
      engine: "OpenAI (DALL-E 3)",
      angle: "Top Down",
    },
    {
      id: "img-3",
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80",
      title: "Gourmet Kra Pao platter with herbs",
      aspectRatio: "1:1",
      engine: "OpenAI (DALL-E 3)",
      angle: "Top Down",
    },
    {
      id: "img-4",
      url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80",
      title: "Spicy chicken jasmine rice scoop",
      aspectRatio: "1:1",
      engine: "OpenAI (DALL-E 3)",
      angle: "Top Down",
    },
  ]);

  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([
    "img-1",
    "img-2",
    "img-3",
    "img-4",
  ]);

  const [historyList, setHistoryList] = useState<any[]>([
    {
      id: "hist-1",
      timestamp: "Just now",
      dishName: "Spicy Thai Basil Stir-fried Chicken",
      prompt:
        "Stir-fried chicken with Thai basil, garlic, chili, bell peppers, and onions. Serve with jasmine rice.",
      cuisine: "Thai",
      engine: "OpenAI (DALL-E 3)",
      style: "Professional",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "hist-2",
      timestamp: "2 hours ago",
      dishName: "Premium Beef Pho Hanoi Noodles",
      prompt:
        "Clear beef broth with rice noodles, sliced beef, fresh herbs, bean sprouts, lime, chili sauce.",
      cuisine: "Vietnamese",
      engine: "OpenAI (DALL-E 3)",
      style: "Cinematic",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "hist-3",
      timestamp: "1 day ago",
      dishName: "Grilled Pork Banh Mi Special",
      prompt:
        "Grilled pork banh mi with pickled carrots, cucumbers, cilantro, chili sauce inside crispy French style baguette.",
      cuisine: "Vietnamese",
      engine: "FLUX Pro",
      style: "Overhead Flatlay",
      image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=120&auto=format&fit=crop&q=80",
    },
  ]);

  const engineOptions = [
    {
      value: "OpenAI (DALL-E 3)",
      label: "OpenAI (DALL-E 3)",
      desc: "High quality, great for realistic food photography.",
    },
    {
      value: "FLUX Pro",
      label: "FLUX Pro",
      desc: "Amazing textures and typographic render fidelity.",
    },
    {
      value: "Stable Diffusion XL",
      label: "Stable Diffusion XL",
      desc: "Versatile output styles with strong creative control.",
    },
    {
      value: "Midjourney v6 Food Preset",
      label: "Midjourney v6 Food Preset",
      desc: "Cinematic studio spotlighting and crisp depth of field.",
    },
  ];

  const cuisineOptions = [
    "Thai",
    "Vietnamese",
    "Italian",
    "Mexican",
    "Japanese",
    "American",
    "French",
    "Indian",
  ];
  const imageCountOptions = ["1 image", "2 images", "3 images", "4 images"];
  const aspectRatioOptions = [
    "1:1 (Square)",
    "4:3 (Landscape)",
    "16:9 (Widescreen)",
    "9:16 (Portrait)",
  ];
  const cameraAngleOptions = [
    "Top Down (Flat Lay)",
    "Eye Level (Classic)",
    "Close-up Detail",
    "3/4 Angle (Hero Shot)",
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) {
      triggerToast("Please provide a Dish Name");
      return;
    }
    setIsGenerating(true);
    setGenerationProgress(5);

    const interval = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 95) {
          clearInterval(interval);
          return 95;
        }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      setGenerationProgress(100);

      const nameLower = dishName.toLowerCase();
      let matchedKey = "default";
      if (
        nameLower.includes("pho") ||
        nameLower.includes("noodle") ||
        nameLower.includes("phở")
      ) {
        matchedKey = "pho";
      } else if (
        nameLower.includes("banh mi") ||
        nameLower.includes("bánh mì") ||
        nameLower.includes("sandwich") ||
        nameLower.includes("bread")
      ) {
        matchedKey = "banh_mi";
      } else if (nameLower.includes("pizza")) {
        matchedKey = "pizza";
      } else if (nameLower.includes("sushi") || nameLower.includes("sashimi")) {
        matchedKey = "sushi";
      } else if (nameLower.includes("burger")) {
        matchedKey = "burger";
      } else if (
        nameLower.includes("thai") ||
        nameLower.includes("basil") ||
        nameLower.includes("chicken") ||
        nameLower.includes("krapow") ||
        nameLower.includes("krapao")
      ) {
        matchedKey = "thai";
      }

      const selectedSources =
        MOCK_FOOD_DATA[matchedKey] || MOCK_FOOD_DATA.default;
      const count = parseInt(numImages) || 4;
      const generated = Array.from({ length: count }).map((_, idx) => {
        const sourceUrl = selectedSources[idx % selectedSources.length];
        return {
          id: `img-gen-${Date.now()}-${idx}`,
          url: sourceUrl,
          title: `${dishName} (${cameraAngle}) ${idx + 1}`,
          aspectRatio: aspectRatio.split(" ")[0],
          engine: aiEngine,
          angle: cameraAngle,
        };
      });

      setFoodImages(generated);
      setSelectedImageIds(generated.map((img) => img.id));
      setIsGenerating(false);

      // Add to history list
      setHistoryList((prev) => [
        {
          id: `hist-${Date.now()}`,
          timestamp: "Just now",
          dishName: dishName,
          prompt: detailedDescription,
          cuisine: cuisine,
          engine: aiEngine,
        },
        ...prev,
      ]);

      triggerToast(
        `Successfully generated ${generated.length} images matching "${dishName}"!`,
      );
    }, 1800);
  };

  const handleToggleSelect = (imgId: string) => {
    setSelectedImageIds((prev) => {
      if (prev.includes(imgId)) {
        return prev.filter((id) => id !== imgId);
      } else {
        return [...prev, imgId];
      }
    });
  };

  const handleGenerateMore = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerationProgress(15);
    triggerToast("Synthesizing 4 more variations for you...");

    setTimeout(() => {
      setIsGenerating(false);
      const nameLower = dishName.toLowerCase();
      let matchedKey = "thai";
      if (
        nameLower.includes("pho") ||
        nameLower.includes("noodle") ||
        nameLower.includes("phở")
      ) {
        matchedKey = "pho";
      } else if (
        nameLower.includes("banh mi") ||
        nameLower.includes("bánh mì") ||
        nameLower.includes("sandwich") ||
        nameLower.includes("bread")
      ) {
        matchedKey = "banh_mi";
      }

      const selectedSources =
        MOCK_FOOD_DATA[matchedKey] || MOCK_FOOD_DATA.default;
      const shuffed = [...selectedSources].sort(() => 0.5 - Math.random());

      const newExtra = shuffed.map((url, idx) => ({
        id: `img-extra-${Date.now()}-${idx}`,
        url: url,
        title: `${dishName} var - ${idx + 1}`,
        aspectRatio: aspectRatio.split(" ")[0],
        engine: aiEngine,
        angle: cameraAngle,
      }));

      setFoodImages(newExtra);
      setSelectedImageIds(newExtra.map((img) => img.id));
      triggerToast("Rendered 4 fresh visual assets!");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-[#1C1814] relative pb-12 text-left">
      {/* Toast Alert Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#1C1814] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-[#7553FF] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER SECTION */}
      <div className="flex flex-[#5A5A5A] flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814]">
            AI Food Image Generator
          </h1>
          <p className="text-xs text-[#5C534C] font-semibold mt-1">
            Create professional food photos using AI. Describe your dish and let
            AI do the rest.
          </p>
        </div>

        {/* Play Guide / History actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setHistoryOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#EAE4DC] hover:border-[#7553FF]/30 rounded-xl text-xs font-bold text-[#5C534C] hover:text-[#1C1814] transition-all shadow-3xs cursor-pointer"
          >
            <History className="w-4 h-4 text-[#7C7267]" />
            <span>History</span>
          </button>

          <button
            onClick={() => {
              setShowHowItWorks(!showHowItWorks);
              triggerToast(showHowItWorks ? "Walkthrough closed." : "Showing AI Food Image walkthrough guide.");
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#EAE4DC] hover:border-[#7553FF]/30 rounded-xl text-xs font-bold text-[#5C534C] hover:text-[#1C1814] transition-all shadow-3xs cursor-pointer"
          >
            <Play className="w-4 h-4 text-[#7C7267]" />
            <span>How it works</span>
          </button>
        </div>
      </div>

      {showHowItWorks && (
        <div className="mb-6 bg-slate-50 border border-slate-200 p-5 rounded-xl text-left space-y-2.5 animate-fadeIn">
          <h3 className="text-[14px] font-bold text-[#1C1814]  tracking-wide flex items-center gap-2">
            <Play className="w-4 h-4 text-[#7553FF] fill-[#7553FF]/15" />
            AI Food Image Generator - How It Works
          </h3>
          <p className="text-[13px] text-[#5C534C] leading-relaxed font-light">
            1. <strong>Describe Your Dish</strong>: Type the name of your menu item and add descriptive details (ingredients, garnishing, or specific plating).
            <br />
            2. <strong>Style & Compose</strong>: Choose your desired photo aesthetic styling (e.g. <em>Professional</em>, <em>Sunset Cinematic Bokeh</em>, or <em>Overhead Culinary Flatlay</em>).
            <br />
            3. <strong>Image Reference (Optional)</strong>: Drag or upload draft mobile pictures to help guide composition, perspective, and aspect ratios.
            <br />
            4. <strong>Generate & Sync</strong>: Trigger rendering, view instant outcomes, and hit 'Save to Menu' to deploy assets immediately!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PARAMETER SELECTION CARD */}
        <div className="lg:col-span-5 bg-white border border-[#EAE4DC] rounded-2xl p-6 shadow-3xs space-y-5 text-left font-sans">
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Dish Name input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#5C534C]">
                  Dish Name <span className="text-[#B91C1C]">*</span>
                </label>
                <span className="text-[#000000] font-light font-mono text-[11px]" style={{ color: '#000000', fontWeight: 300, fontSize: '12px' }}>
                  {dishName.length}/100
                </span>
              </div>
              <input
                type="text"
                maxLength={105}
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g. Spicy Thai Basil Stir-fried Chicken"
                className="w-full bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl px-4 py-2.5 text-sm font-light text-[#1C1814] placeholder-black/35 focus:outline-[#7553FF]/15 focus:border-[#7553FF] focus:outline-hidden transition-all"
                style={{ fontWeight: 300 }}
                required
              />
            </div>

            {/* Detailed Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-[#5C534C] flex items-center gap-1">
                  Detailed Description (Optional)
                </label>
                <span className="text-[#000000] font-light font-mono text-[11px]" style={{ color: '#000000', fontWeight: 300, fontSize: '12px' }}>
                  {detailedDescription.length}/500
                </span>
              </div>
              <textarea
                maxLength={500}
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                placeholder="Give details like ingredients garnish representation, background accents, herbs or specific plates rendering style details..."
                className="w-full h-24 bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl p-3.5 text-xs font-light text-[#1C1814] placeholder-black/35 leading-relaxed focus:outline-[#7553FF]/15 focus:border-[#7553FF] focus:outline-hidden transition-all resize-none"
                style={{ fontWeight: 300 }}
              />
            </div>

            {/* AI Engine Provider selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#5C534C] block">
                AI Engine Provider
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#7553FF]">
                  <Sparkles className="w-4 h-4 fill-[#7553FF]/10" />
                </div>
                <select
                  value={aiEngine}
                  onChange={(e) => setAiEngine(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl pl-10 pr-10 py-2.5 text-xs font-light text-[#1C1814] appearance-none focus:outline-hidden focus:border-[#7553FF] cursor-pointer shadow-3xs focus:outline-none"
                  style={{ fontWeight: 300 }}
                >
                  {engineOptions.map((eng) => (
                    <option key={eng.value} value={eng.value} style={{ fontWeight: 300 }}>
                      {eng.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#000000]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] flex items-center gap-1 mt-1" style={{ color: '#000000', fontWeight: 300 }}>
                <Info className="w-3.5 h-3.5 text-black shrink-0" style={{ color: '#000000' }} />
                <span style={{ fontSize: '12px' }}>
                  {engineOptions.find((e) => e.value === aiEngine)?.desc ||
                    "Generates high quality photo output presets."}
                </span>
              </p>
            </div>

            {/* Cuisine selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#5C534C] block">
                Cuisine Style
              </label>
              <div className="relative">
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl px-3.5 py-2.5 text-xs font-light text-[#1C1814] appearance-none focus:outline-hidden focus:border-[#7553FF] cursor-pointer shadow-3xs focus:outline-none"
                  style={{ fontWeight: 300 }}
                >
                  {cuisineOptions.map((c) => (
                    <option key={c} value={c} style={{ fontWeight: 300 }}>
                      {c} Cuisine
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#000000]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Choose your starting point (Radio Cards) */}
            <div id="choose-starting-point-container" className="space-y-2">
              <label className="text-xs font-bold text-[#5C534C] block">
                Choose your starting point
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A */}
                <div
                  id="starting-point-option-a"
                  onClick={() => setStartingPoint("no-photos")}
                  className={`border rounded-xl p-3.5 text-left cursor-pointer transition-all ${
                    startingPoint === "no-photos"
                      ? "border-[#7553FF] bg-[#F5F3FF]/30 shadow-2xs"
                      : "border-[#EAE4DC] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        startingPoint === "no-photos"
                          ? "border-[#7553FF] bg-white"
                          : "border-[#7C7267]"
                      }`}
                    >
                      {startingPoint === "no-photos" && (
                        <div className="w-2 h-2 rounded-full bg-[#7553FF]" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#1C1814]">
                      I don't have photos yet
                    </p>
                  </div>
                  <p className="text-[10px] mt-1.5 font-light leading-normal" style={{ color: '#000000', fontWeight: 300, fontSize: '14px' }}>
                    Let AI generate high quality images from scratch based on
                    descriptions.
                  </p>
                </div>

                {/* Option B */}
                <div
                  id="starting-point-option-b"
                  onClick={() => setStartingPoint("have-photos")}
                  className={`border rounded-xl p-3.5 text-left cursor-pointer transition-all ${
                    startingPoint === "have-photos"
                      ? "border-[#7553FF] bg-[#F5F3FF]/30 shadow-2xs"
                      : "border-[#EAE4DC] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        startingPoint === "have-photos"
                          ? "border-[#7553FF] bg-white"
                          : "border-[#7C7267]"
                      }`}
                    >
                      {startingPoint === "have-photos" && (
                        <div className="w-2 h-2 rounded-full bg-[#7553FF]" />
                      )}
                    </div>
                    <p className="text-xs font-bold text-[#1C1814]">
                      I have photos
                    </p>
                  </div>
                  <p className="text-[10px] mt-1.5 font-light leading-normal" style={{ color: '#000000', fontWeight: 300, fontSize: '14px' }}>
                    Upload your existing food photo and let AI enhance and
                    polish it.
                  </p>
                </div>
              </div>
            </div>

            {/* Upload images section (shown conditionally when "I have photos" is checked) */}
            {startingPoint === "have-photos" && (
              <div
                id="upload-images-section"
                className="space-y-3 pt-1 border-t border-dashed border-[#EAE4DC] mt-4 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#5C534C] flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#7553FF]" />
                    <span>Upload your food photos</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-light" style={{ color: '#000000', fontWeight: 300 }}>
                    JPEG, PNG up to 10MB
                  </span>
                </div>

                {/* Dropzone container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("food-img-file-input")?.click()
                  }
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                    isDragging
                      ? "border-[#7553FF] bg-[#F0ECFF]"
                      : "border-[#EAE4DC] bg-[#FAFAFA] hover:border-[#7553FF]/50 hover:bg-[#F9F9F9]"
                  }`}
                >
                  <input
                    type="file"
                    id="food-img-file-input"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDragging
                        ? "bg-[#7553FF]/10 text-[#7553FF]"
                        : "bg-white border border-[#EAE4DC] text-[#7C7267]"
                    }`}
                  >
                    <Upload className="w-5 h-5 pointer-events-none" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1C1814]">
                      Drag and drop your food images here
                    </p>
                    <p className="text-[10px] mt-0.5 font-light" style={{ color: '#000000', fontWeight: 300, fontSize: '12px' }}>
                      or{" "}
                      <span className="text-[#7553FF] font-light underline decoration-solid" style={{ fontWeight: 300, fontSize: '12px' }}>
                        browse files
                      </span>{" "}
                      from your devices
                    </p>
                  </div>
                </div>

                {/* List of uploaded files with thumbnail preview */}
                {uploadedImages.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <p className="text-[11px] font-bold text-[#5C534C]">
                      Uploaded Assets ({uploadedImages.length})
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-h-36 overflow-y-auto pr-1">
                      {uploadedImages.map((img) => (
                        <div
                           key={img.id}
                           className="flex items-center gap-3 bg-white border border-[#EAE4DC] p-2 rounded-lg"
                        >
                           <img
                             src={img.previewUrl}
                             alt={img.name}
                             className="w-10 h-10 object-cover rounded-md bg-slate-50 border border-[#EAE4DC]"
                           />
                           <div className="flex-1 min-w-0">
                             <p className="text-xs font-bold text-[#1C1814] truncate leading-none">
                               {img.name}
                             </p>
                             <p className="text-[10px] font-light leading-none mt-1" style={{ color: '#000000', fontWeight: 300 }}>
                               {img.size}
                             </p>
                           </div>
                           <button
                             type="button"
                             onClick={(e) => removeUploadedImage(img.id, e)}
                             className="p-1.5 hover:bg-[#FEE2E2]/60 hover:text-[#EF4444] rounded-md text-[#7C7267] transition-all cursor-pointer"
                             title="Remove image"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Settings Container block (Lilac preset background highlight block) */}
            <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-xl p-4 space-y-3.5 text-left">
              <div className="grid grid-cols-2 gap-3">
                {/* Number of Images selector */}
                <div className="space-y-1">
                  <label className="text-[#5C534C] block font-bold" style={{ fontSize: '14px' }}>
                    Number of Images
                  </label>
                  <div className="relative">
                    <select
                      value={numImages}
                      onChange={(e) => setNumImages(e.target.value)}
                      className="w-full bg-white border border-[#EAE4DC] rounded-lg px-2.5 py-1.5 text-xs font-light text-[#1C1814] appearance-none focus:outline-hidden focus:ring-1 focus:ring-[#7553FF] cursor-pointer"
                      style={{ fontWeight: 300 }}
                    >
                      {imageCountOptions.map((o) => (
                        <option key={o} value={o} style={{ fontWeight: 300 }}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#000000]">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Aspect Ratio selector */}
                <div className="space-y-1">
                  <label className="text-[#5C534C] block font-bold" style={{ fontSize: '14px' }}>
                    Aspect Ratio
                  </label>
                  <div className="relative">
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value)}
                      className="w-full bg-white border border-[#EAE4DC] rounded-lg px-2.5 py-1.5 text-xs font-light text-[#1C1814] appearance-none focus:outline-hidden focus:ring-1 focus:ring-[#7553FF] cursor-pointer"
                      style={{ fontWeight: 300 }}
                    >
                      {aspectRatioOptions.map((o) => (
                        <option key={o} value={o} style={{ fontWeight: 300 }}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#000000]">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-[10px] leading-tight font-light" style={{ color: '#000000', fontWeight: 300 }}>
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: '#000000' }} />
                <span style={{ fontSize: '12px' }}>
                  More images and ratios will be available in upcoming updates.
                </span>
              </div>
            </div>

            {/* Camera Angle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#5C534C] block">
                Camera Angle
              </label>
              <div className="relative">
                <select
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl px-3.5 py-2.5 text-xs font-light text-[#1C1814] appearance-none focus:outline-hidden focus:border-[#7553FF] cursor-pointer shadow-3xs focus:outline-none"
                  style={{ fontWeight: 300 }}
                >
                  {cameraAngleOptions.map((o) => (
                    <option key={o} value={o} style={{ fontWeight: 300 }}>
                      {o}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#000000]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] flex items-center gap-1 mt-1 font-light" style={{ color: '#000000', fontWeight: 300 }}>
                <Info className="w-3.5 h-3.5 shrink-0" style={{ color: '#000000' }} />
                <span style={{ fontSize: '12px' }}>
                  You can generate other camera layouts later in Preview.
                </span>
              </p>
            </div>

            {/* Action Submit trigger Button */}
            <div className="pt-1.5">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3.5 bg-[#7553FF] hover:bg-[#623EE2] disabled:bg-[#8B5CF6] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Generate Images</span>
                <Sparkles className="w-4 h-4 fill-white/10" />
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: PREVIEW PANEL (7/12 span for widescreen structure) */}
        <div className="lg:col-span-7 bg-white border border-[#EAE4DC] rounded-2xl p-6 shadow-3xs flex flex-col justify-between space-y-6 text-left">
          <div className="space-y-4">
            {/* Header section with layout switch toggles */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#111827]">
                  Preview Workspace
                </h2>
                <p className="text-xs text-[#7C7267] font-medium font-sans">
                  AI generated images based on your descriptions.
                </p>
              </div>

              {/* Action Buttons Top Right of Workspace */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedImageIds.length === 0) {
                      triggerToast("Select at least 1 image to download");
                      return;
                    }
                    triggerToast(
                      `Packaging selected ${selectedImageIds.length} food assets in high-res zip archive...`,
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-[#DDD6FE] text-xs font-bold text-[#623EE2] hover:bg-[#F0ECFF]/50 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerToast(
                      `Superb! Saved ${selectedImageIds.length} generated photos to your food menu digital catalog album.`,
                    );
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7553FF] text-white text-xs font-bold hover:bg-[#623EE2] rounded-lg transition-all shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-white/10" />
                  <span>Save to Album</span>
                </button>
              </div>
            </div>

            {/* Dynamic Loading Simulation Screen */}
            {isGenerating ? (
              <div className="min-h-[440px] bg-[#FAFAFA] border border-[#EAE4DC] rounded-xl flex flex-col items-center justify-center p-8 text-center space-y-4 animate-pulse">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-[#F0ECFF] rounded-full" />
                  <div className="absolute inset-0 border-4 border-[#7553FF] rounded-full border-t-transparent animate-spin" />
                  <Sparkles className="w-6 h-6 text-[#7553FF]" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <p className="text-sm font-bold text-[#1C1814]">
                    Generating Dishes via Neural network...
                  </p>
                  <p className="text-xs text-[#7C7267] font-medium">
                    Applying model parameters with "{imageStyle}" preset
                    weights.
                  </p>
                </div>
                {/* Generation Progress percentage bar */}
                <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7553FF] rounded-full transition-all"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-bold text-[#7553FF]">
                  {generationProgress}% Compiled
                </span>
              </div>
            ) : foodImages.length === 0 ? (
              <div className="min-h-[440px] bg-[#FAFAFA] border border-dashed border-[#EAE4DC] rounded-xl flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#EAE4DC] flex items-center justify-center text-[#7C7267]">
                  <Image className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C1814]">
                    No images rendered
                  </h4>
                  <p className="text-xs text-[#7C7267] max-w-xs mt-1">
                    Fill out the dish guidelines in the panel on the left and
                    click "Generate Images" to produce graphic representations.
                  </p>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              /* THE PERFECT 2x2 GRID PREVIEW OF DISH WORKSPACE */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foodImages.map((img) => {
                  const isChecked = selectedImageIds.includes(img.id);
                  return (
                    <div
                      key={img.id}
                      className="group relative border border-[#EAE4DC] rounded-xl overflow-hidden aspect-square bg-[#FAFAFA] hover:shadow-md hover:border-[#7553FF]/30 transition-all cursor-pointer"
                      onClick={() => handleToggleSelect(img.id)}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Gradient overlay for checked visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                      {/* Top Check Indicator Button circle with smooth styling */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelect(img.id);
                        }}
                        className={`absolute top-3 left-3 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#7553FF] text-white shadow-3xs ring-2 ring-[#7553FF]/20"
                            : "bg-black/35 text-white border-2 border-white/80"
                        }`}
                      >
                        {isChecked && (
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        )}
                      </button>

                      {/* Display Tag Overlay bottom label */}
                      <div className="absolute bottom-3 left-3 right-3 text-[11px] font-bold text-white truncate drop-shadow-sm">
                        {img.title}
                      </div>

                      {/* Selected item border halo */}
                      {isChecked && (
                        <div className="absolute inset-0 border-2 border-[#7553FF] rounded-xl pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* EXQUISITE LIST/ROW LAYOUT VIEW */
              <div className="space-y-3">
                {foodImages.map((img) => {
                  const isChecked = selectedImageIds.includes(img.id);
                  return (
                    <div
                      key={img.id}
                      className="flex items-center gap-4 bg-white border border-[#EAE4DC] rounded-xl p-3 hover:bg-[#FAFAFA] hover:border-[#7553FF]/30 transition-all cursor-pointer text-left font-sans"
                      onClick={() => handleToggleSelect(img.id)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative bg-slate-50 border border-[#EAE4DC]">
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#1C1814] truncate">
                          {img.title}
                        </p>
                        <div className="flex gap-2 text-[10px] text-[#7C7267] font-mono mt-1 font-bold">
                          <span>{img.engine}</span>
                          <span>•</span>
                          <span>Format: PNG</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelect(img.id);
                        }}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#7553FF] text-white"
                            : "border border-[#EAE4DC] bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* LOWER ACTIONS BUTTON BAR & GALLERY SUB-STRIP */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* Action buttons matching footer bar mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 font-mono text-left">
                {selectedImageIds.length} of {foodImages.length} images selected
              </span>

              <div className="flex items-center gap-2">
                {/* Upscale Trigger Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (selectedImageIds.length === 0) {
                      triggerToast("Select at least 1 image to upscale");
                      return;
                    }
                    triggerToast(
                      `Super-resolution Upscaling: refining ${selectedImageIds.length} assets to 4096px...`,
                    );
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-3xs"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-700" />
                  <span>Upscale</span>
                </button>

                {/* Regenerate Action button */}
                <button
                  type="button"
                  onClick={() => {
                    triggerToast(
                      "Regenerating creative seeds with current parameters...",
                    );
                    handleGenerate({ preventDefault: () => {} } as any);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-705 hover:bg-slate-50 transition-colors cursor-pointer shadow-3xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-700" />
                  <span>Regenerate</span>
                </button>

                {/* Premium purple Download Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (selectedImageIds.length === 0) {
                      triggerToast("Select at least 1 image to download");
                      return;
                    }
                    triggerToast(
                      `Packaging ${selectedImageIds.length} high-resolution PNGs in food_illustrations.zip`,
                    );
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-xs font-bold hover:shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Horizontal Thumbnails Strip (from suggestion image details) */}
            <div className="flex items-stretch gap-2 overflow-x-auto pb-1 select-none">
              {foodImages.map((img) => {
                const isSelected = selectedImageIds.includes(img.id);
                return (
                  <div
                    key={`thumb-${img.id}`}
                    onClick={() => handleToggleSelect(img.id)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden bg-slate-50 cursor-pointer border shrink-0 transition-all ${
                      isSelected
                        ? "border-[#7553FF] ring-2 ring-[#7553FF]/10"
                        : "border-slate-200 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Thumbnail"
                    />

                    {/* Tiny Checked dot */}
                    {isSelected && (
                      <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#7553FF] rounded-full flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Dotted empty spot custom card: Generate 4 more */}
              <button
                type="button"
                onClick={handleGenerateMore}
                className="flex flex-col items-center justify-center w-[150px] rounded-lg border border-dashed border-[#7553FF]/30 bg-[#F0ECFF]/20 hover:bg-[#F0ECFF]/45 p-1 shrink-0 transition-colors group cursor-pointer text-left"
              >
                <Plus className="w-4 h-4 text-[#7553FF] mt-1 stroke-[3]" />
                <span className="text-[14px] font-normal text-[#7553FF] mt-0.5 truncate tracking-wide text-center">
                  Generate 4 More
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED HISTORY POPUP DRAWER MODAL (fully interactive slide-out) */}
      <AnimatePresence>
        {historyOpen && (
          <>
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Slide menu drawer panel right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-slate-200 z-50 p-6 flex flex-col justify-between text-left"
            >
              <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-[20px] font-semibold text-[#1C1814]">
                    Generation History
                  </h3>
                  <button
                    onClick={() => setHistoryOpen(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-[#1C1814]/60 hover:text-[#1C1814] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {historyList.map((hist) => (
                    <div
                      key={hist.id}
                      className="border border-slate-200 bg-white p-4 rounded-xl shadow-none hover:bg-slate-50 transition-all duration-200 cursor-pointer flex gap-4 relative group text-left items-start"
                      onClick={() => {
                        setDishName(hist.dishName);
                        setDetailedDescription(hist.prompt);
                        setImageStyle(hist.style || "Professional");
                        setAiEngine(hist.engine);
                        setHistoryOpen(false);
                        triggerToast(`Loaded params for "${hist.dishName}"!`);
                      }}
                    >
                      {hist.image && (
                        <div className="w-[72px] h-[72px] shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                          <img
                            src={hist.image}
                            alt={hist.dishName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[11px] font-light text-[#1C1814]/40 block">
                          {hist.timestamp}
                        </span>
                        
                        <h4 className="text-[14px] font-medium text-[#1C1814] leading-snug">
                          {hist.dishName}
                        </h4>
                        
                        <p className="text-[13px] font-light text-[#1C1814]/60 line-clamp-2 leading-relaxed">
                          {hist.prompt}
                        </p>

                        <div className="flex items-center gap-2 text-[10px] pt-1.5 flex-wrap">
                          {hist.style && (
                            <span className="bg-[#7553FF]/10 text-[#7553FF] px-2 py-0.5 rounded-[4px] font-medium">
                              {hist.style}
                            </span>
                          )}
                          <span className="bg-slate-100 text-[#1C1814]/60 px-2 py-0.5 rounded-[4px] font-medium font-mono">
                            {hist.engine}
                          </span>
                        </div>
                      </div>

                      {/* Load hover action overlay indicator */}
                      <div className="absolute right-3 top-3 text-[#7553FF] opacity-0 group-hover:opacity-100 font-semibold transition-opacity text-xs flex items-center gap-0.5">
                        <span>Load</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 flex gap-3">
                <button
                  onClick={() => {
                    setHistoryList([
                      {
                        id: `hist-cleared`,
                        timestamp: "Blank Slate",
                        dishName: "Beef Pho, Grilled Pork Banh Mi",
                        prompt:
                          "Clear beef broth with rice noodles, sliced beef, fresh herbs...",
                        style: "Professional",
                        engine: "FLUX Pro",
                        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=120&auto=format&fit=crop&q=80"
                      },
                    ]);
                    triggerToast("History backlog cleaned.");
                  }}
                  className="flex-1 py-1.5 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[14px] font-light text-[#1C1814]/70 cursor-pointer transition-colors duration-200"
                >
                  Clear History
                </button>
                <button
                  onClick={() => setHistoryOpen(false)}
                  className="flex-1 py-1.5 text-center bg-[#1C1814] hover:bg-[#1C1814]/90 text-white rounded-lg text-[14px] font-medium cursor-pointer transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 6. QR FOR MENU VIEW
// ============================================================================
export function QrMenuView() {
  const [activeSubTab, setActiveSubTab] = useState<
    "store" | "themes" | "settings"
  >("store");
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic toast state
  const [toast, setToast] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (
    text: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const applyTemplate = (tpl: any) => {
    setSelectedTemplateId(tpl.id);
    setPrimaryColor(tpl.primary);
    setBackgroundColor(tpl.background);
    setTextColor(tpl.text);
    setQrDotColor(tpl.qrDot);
    setFontFamily(tpl.font);
    showToast(`Theme changed to "${tpl.name}" successfully!`, "success");
  };

  // State lists for categories and items
  const [categories, setCategories] = useState([
    {
      id: "appetizers",
      name: "Appetizers",
      itemsCount: 12,
      icon: UtensilsCrossed,
    },
    { id: "main", name: "Main Courses", itemsCount: 18, icon: Store },
    { id: "drinks", name: "Drinks", itemsCount: 23, icon: Coffee },
    { id: "desserts", name: "Desserts", itemsCount: 8, icon: CakeSlice },
    { id: "specials", name: "Specials", itemsCount: 4, icon: Star },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: "item-1",
      name: "Bruschetta al Pomodoro",
      description:
        "Grilled bread with diced tomatoes, garlic, basil, and olive oil",
      price: 8.5,
      status: "Active",
      category: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-2",
      name: "Crispy Calamari",
      description: "Crispy fried calamari with marinara sauce",
      price: 10.0,
      status: "Featured",
      category: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-3",
      name: "Creamy Mushroom Soup",
      description: "Rich and creamy mushroom soup with truffle oil",
      price: 7.0,
      status: "Active",
      category: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1547347298-407405a1bb64?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-4",
      name: "Caesar Salad",
      description: "Romaine lettuce, parmesan, croutons, and caesar dressing",
      price: 6.5,
      status: "Active",
      category: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-5",
      name: "Cheese Platter",
      description: "Assorted cheese with nuts, crackers, and fruits",
      price: 14.0,
      status: "Inactive",
      category: "Appetizers",
      image:
        "https://images.unsplash.com/photo-1634531872120-a6519b5e5fb3?w=120&auto=format&fit=crop&q=80",
    },
    // Main Courses
    {
      id: "item-6",
      name: "Grilled Ribeye Steak",
      description:
        "USDA Prime Ribeye served on skin-on fries with special herb compound butter",
      price: 28.5,
      status: "Active",
      category: "Main Courses",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-7",
      name: "Pan Seared Salmon",
      description:
        "Atlantic salmon filet in lemon-dill cream sauce alongside tender butter-broiled asparagus",
      price: 24.0,
      status: "Featured",
      category: "Main Courses",
      image:
        "https://images.unsplash.com/photo-1485921325814-a50431496cc0?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-8",
      name: "Truffle Pasta Carbonara",
      description:
        "Creamy carbonara sauce with wild mushrooms, crispy pancetta, topped with fresh black truffle shavings",
      price: 18.0,
      status: "Active",
      category: "Main Courses",
      image:
        "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=120&auto=format&fit=crop&q=80",
    },
    // Drinks
    {
      id: "item-9",
      name: "Signature Iced Coffee",
      description:
        "Traditional slow cold brew coffee mixed with sweetened rich condensed milk",
      price: 4.5,
      status: "Active",
      category: "Drinks",
      image:
        "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-10",
      name: "Lychee Jasmine Iced Tea",
      description:
        "Refreshing organic jasmine green tea with fresh sweet lychee fruits and pulp",
      price: 5.0,
      status: "Featured",
      category: "Drinks",
      image:
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=120&auto=format&fit=crop&q=80",
    },
    // Desserts
    {
      id: "item-11",
      name: "Decadent Chocolate Lava Cake",
      description:
        "Warm dark chocolate cake with a dynamic molten core served with house vanilla bean iced cream scoop",
      price: 8.5,
      status: "Active",
      category: "Desserts",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "item-12",
      name: "Sweet Mango Sticky Rice",
      description:
        "Sweet glutinous coconut rice topped with ripe native mango quarters and sweet coconut cream",
      price: 7.0,
      status: "Active",
      category: "Desserts",
      image:
        "https://images.unsplash.com/photo-1528279027-68f0d7fce90a?w=120&auto=format&fit=crop&q=80",
    },
    // Specials
    {
      id: "item-13",
      name: "Imperial Spring Rolls",
      description:
        "Ultra-crispy fried clear rice rolls loaded with spiced crab meat mince, glass bean threads, and pork root",
      price: 12.5,
      status: "Featured",
      category: "Specials",
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=120&auto=format&fit=crop&q=80",
    },
  ]);

  // Themes state variables
  const [selectedTheme, setSelectedTheme] = useState("Royal Indigo");
  const [selectedTemplateId, setSelectedTemplateId] = useState("monochrome");
  const [primaryColor, setPrimaryColor] = useState("#7C3AED");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#1F2937");
  const [qrDotColor, setQrDotColor] = useState("#7C3AED");
  const [fontFamily, setFontFamily] = useState("Inter");
  const [textSize, setTextSize] = useState("Medium"); // 'Small' | 'Medium' | 'Large'

  const [qrDotStyle, setQrDotStyle] = useState("Rounded");
  const [useWifiOnQr, setUseWifiOnQr] = useState(true);
  const [wifiSsid, setWifiSsid] = useState("Gastro_Guest");
  const [wifiPass, setWifiPass] = useState("GASTRO_GUEST2026");
  const [tableCountSetting, setTableCountSetting] = useState("15");
  const [customTableLabel, setCustomTableLabel] = useState("Table");
  const [isQrSettingsModalOpen, setIsQrSettingsModalOpen] = useState(false);

  // Modal handlers
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "add-category" | "add-item" | "edit-item"
  >("add-category");

  // Category Form
  const [newCategoryName, setNewCategoryName] = useState("");

  // Item Form
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    status: "Active",
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=80",
  });

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const icons = [UtensilsCrossed, Store, Coffee, CakeSlice, Star];
    const chosenIcon = icons[categories.length % icons.length];

    const nextCat = {
      id: "cat-" + Date.now(),
      name: newCategoryName.trim(),
      itemsCount: 0,
      icon: chosenIcon,
    };

    setCategories([...categories, nextCat]);
    setNewCategoryName("");
    setShowModal(false);
    showToast(`Category "${nextCat.name}" created!`, "success");
  };

  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.price) return;

    const parsedPrice = parseFloat(newItem.price);
    if (isNaN(parsedPrice)) {
      showToast("Please enter a valid numeric price", "error");
      return;
    }

    if (modalType === "add-item") {
      const nextItem = {
        id: "item-" + Date.now(),
        name: newItem.name.trim(),
        description: newItem.description.trim() || "No description provided.",
        price: parsedPrice,
        status: newItem.status,
        category: newItem.category,
        image: newItem.image,
      };

      setMenuItems([...menuItems, nextItem]);
      setCategories(
        categories.map((cat) => {
          if (cat.name === newItem.category) {
            return { ...cat, itemsCount: cat.itemsCount + 1 };
          }
          return cat;
        }),
      );
      showToast(`"${nextItem.name}" added successfully!`, "success");
    } else if (modalType === "edit-item" && editingItem) {
      setMenuItems(
        menuItems.map((item) => {
          if (item.id === editingItem.id) {
            return {
              ...item,
              name: newItem.name.trim(),
              description: newItem.description.trim(),
              price: parsedPrice,
              status: newItem.status,
              category: newItem.category,
              image: newItem.image,
            };
          }
          return item;
        }),
      );

      if (editingItem.category !== newItem.category) {
        setCategories(
          categories.map((cat) => {
            if (cat.name === editingItem.category) {
              return { ...cat, itemsCount: Math.max(0, cat.itemsCount - 1) };
            }
            if (cat.name === newItem.category) {
              return { ...cat, itemsCount: cat.itemsCount + 1 };
            }
            return cat;
          }),
        );
      }
      showToast(`Changes to "${newItem.name}" saved!`, "success");
    }

    setShowModal(false);
  };

  const handleDeleteItem = (id: string, name: string) => {
    const targetItem = menuItems.find((item) => item.id === id);
    if (!targetItem) return;

    setMenuItems(menuItems.filter((item) => item.id !== id));
    setCategories(
      categories.map((cat) => {
        if (cat.name === targetItem.category) {
          return { ...cat, itemsCount: Math.max(0, cat.itemsCount - 1) };
        }
        return cat;
      }),
    );
    showToast(`"${name}" deleted!`, "error");
  };

  // Filter items matching selected category and live search queries
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Drag and Drop State for Categories
  const [draggedCategoryIdx, setDraggedCategoryIdx] = useState<number | null>(null);
  const [categoryOverIdx, setCategoryOverIdx] = useState<number | null>(null);

  // Drag and Drop State for Menu Items
  const [draggedItemIdx, setDraggedItemIdx] = useState<number | null>(null);
  const [itemOverIdx, setItemOverIdx] = useState<number | null>(null);

  // Category Drag Handlers
  const handleCategoryDragStart = (e: React.DragEvent, index: number) => {
    setDraggedCategoryIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleCategoryDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setCategoryOverIdx(index);
  };

  const handleCategoryDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedCategoryIdx === null || draggedCategoryIdx === index) {
      setDraggedCategoryIdx(null);
      setCategoryOverIdx(null);
      return;
    }

    const updatedCategories = [...categories];
    const [removed] = updatedCategories.splice(draggedCategoryIdx, 1);
    updatedCategories.splice(index, 0, removed);

    setCategories(updatedCategories);
    setDraggedCategoryIdx(null);
    setCategoryOverIdx(null);
    showToast("Categories reordered successfully!", "success");
  };

  const handleCategoryDragEnd = () => {
    setDraggedCategoryIdx(null);
    setCategoryOverIdx(null);
  };

  // Menu Item Drag Handlers
  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setItemOverIdx(index);
  };

  const handleItemDrop = (e: React.DragEvent, targetFilteredIdx: number) => {
    e.preventDefault();
    if (draggedItemIdx === null || draggedItemIdx === targetFilteredIdx) {
      setDraggedItemIdx(null);
      setItemOverIdx(null);
      return;
    }

    const draggedItem = filteredItems[draggedItemIdx];
    const targetItem = filteredItems[targetFilteredIdx];
    if (!draggedItem || !targetItem) {
      setDraggedItemIdx(null);
      setItemOverIdx(null);
      return;
    }

    const updatedMaster = [...menuItems];
    const masterDragIdx = updatedMaster.findIndex((it) => it.id === draggedItem.id);
    
    if (masterDragIdx === -1) {
      setDraggedItemIdx(null);
      setItemOverIdx(null);
      return;
    }

    const [removed] = updatedMaster.splice(masterDragIdx, 1);
    const newTargetIdx = updatedMaster.findIndex((it) => it.id === targetItem.id);
    
    if (newTargetIdx === -1) {
      setDraggedItemIdx(null);
      setItemOverIdx(null);
      return;
    }

    const finalInsertIdx = targetFilteredIdx > draggedItemIdx ? newTargetIdx + 1 : newTargetIdx;
    updatedMaster.splice(finalInsertIdx, 0, removed);

    setMenuItems(updatedMaster);
    setDraggedItemIdx(null);
    setItemOverIdx(null);
    showToast("Menu items reordered successfully!", "success");
  };

  const handleItemDragEnd = () => {
    setDraggedItemIdx(null);
    setItemOverIdx(null);
  };

  // Hex codes based on design theme catalog choices
  const themeColors: Record<
    string,
    { main: string; light: string; border: string }
  > = {
    "Royal Indigo": { main: "#7553FF", light: "#F0ECFF", border: "#CCFBF1" },
    "Emerald Garden": { main: "#10B981", light: "#ECFDF5", border: "#A7F3D0" },
    "Crimson Velvet": { main: "#E11D48", light: "#FFF1F2", border: "#FECDD3" },
    "Midnight Charcoal": {
      main: "#374151",
      light: "#F9FAFB",
      border: "#E5E7EB",
    },
    "Amber Glow": { main: "#F59E0B", light: "#FEF3C7", border: "#FDE68A" },
  };

  const themeTemplates = [
    {
      id: "classic",
      name: "Classic",
      desc: "Clean & professional",
      primary: "#1E293B",
      background: "#FFFFFF",
      text: "#475569",
      qrDot: "#1E293B",
      font: "Inter",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "vibrant",
      name: "Vibrant",
      desc: "Bold colors, modern feel",
      primary: "#EF4444",
      background: "#FFF5F5",
      text: "#7F1D1D",
      qrDot: "#EF4444",
      font: "Outfit",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "bakery",
      name: "Bakery",
      desc: "Warm & artisan style",
      primary: "#D97706",
      background: "#FFFBEB",
      text: "#78350F",
      qrDot: "#D97706",
      font: "Playfair Display",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "botanical",
      name: "Botanical",
      desc: "Nature-inspired",
      primary: "#059669",
      background: "#F0FDF4",
      text: "#064E3B",
      qrDot: "#059669",
      font: "Inter",
      image:
        "https://images.unsplash.com/photo-1545241047-6083a3684587?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "monochrome",
      name: "Monochrome",
      desc: "Sophisticated B&W",
      primary: "#111827",
      background: "#FFFFFF",
      text: "#1F2937",
      qrDot: "#111827",
      font: "Space Grotesk",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "newspaper",
      name: "Newspaper",
      desc: "Bold editorial",
      primary: "#3F3F46",
      background: "#FAFAF9",
      text: "#18181B",
      qrDot: "#3F3F46",
      font: "Playfair Display",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "modern-minimal",
      name: "Modern Minimal",
      desc: "Sleek & minimal",
      primary: "#09090B",
      background: "#FAFAFA",
      text: "#27272A",
      qrDot: "#09090B",
      font: "Inter",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "rose-gold",
      name: "Rose Gold",
      desc: "Luxurious & elegant",
      primary: "#C27D72",
      background: "#FFF5F5",
      text: "#4A2822",
      qrDot: "#C27D72",
      font: "Outfit",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=120&auto=format&fit=crop&q=80",
    },
    {
      id: "ocean-breeze",
      name: "Ocean Breeze",
      desc: "Breezy aqua vibes",
      primary: "#06B6D4",
      background: "#ECFEFF",
      text: "#155E75",
      qrDot: "#06B6D4",
      font: "Inter",
      image:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=120&auto=format&fit=crop&q=80",
    },
  ];

  const activeTheme = {
    main: primaryColor,
    light:
      backgroundColor === "#FFFFFF" || backgroundColor === "#ffffff"
        ? "#F0ECFF"
        : backgroundColor,
    border: qrDotColor,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-left relative">
      {/* 1. HEADER SECTION ROW WITH URLS & MENU INDICATORS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div>
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight font-sans">
            QR Menu
          </h1>
          <p className="text-[14px] text-[#1C1814] leading-normal mt-1 font-sans">
            Manage your digital menu, customize themes, and track analytics.
          </p>
        </div>

        {/* Dynamic header button actions matching Book a Table */}
        <div className="flex flex-wrap items-center gap-2.5">

          <button
            type="button"
            onClick={() => setIsQrSettingsModalOpen(true)}
            className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer h-9"
          >
            <Sliders className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(
                "https://gastrohub.nomad.id/m/johns-bistro",
              );
              showToast("Menu URL copied to clipboard!", "success");
            }}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-705 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-3xs cursor-pointer h-9"
          >
            <Copy className="w-4 h-4 text-slate-700" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* 2. INNER PAGE SUB-TAB BUTTONS SELECTION */}
      <div className="flex items-center gap-6 border-b border-[#1C1814]/10 pt-2">
        <button
          onClick={() => {
            setActiveSubTab("store");
            setSelectedCategory("Appetizers");
          }}
          className={`flex items-center gap-2 pb-3.5 text-[14px] font-semibold border-b-2 transition-all relative cursor-pointer ${
            activeSubTab === "store"
              ? "border-[#7553FF] text-[#7553FF]"
              : "border-transparent text-[#1C1814] hover:text-[#7553FF]"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Store</span>
        </button>

        <button
          onClick={() => setActiveSubTab("themes")}
          className={`flex items-center gap-2 pb-3.5 text-[14px] font-semibold border-b-2 transition-all relative cursor-pointer ${
            activeSubTab === "themes"
              ? "border-[#7553FF] text-[#7553FF]"
              : "border-transparent text-[#1C1814] hover:text-[#7553FF]"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Themes</span>
        </button>
      </div>

      {/* 3. SUB-TAB VIEWPORT CHANGER */}
      <AnimatePresence mode="wait">
        {/* ============ STORE VIEWPORT ============ */}
        {activeSubTab === "store" && (
          <motion.div
            key="store"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            {/* A. Dynamic Row of Key Metric Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Views */}
              <div className="bg-white border border-[#1C1814]/10 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
                    <span className="text-[14px] font-semibold text-[#1C1814] tracking-tight">Total Views</span>
                    <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">1,284</h2>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-1">
                    <div className="flex items-center gap-1.5 shrink-0 font-sans">
                      <span className="text-[14px] font-bold text-emerald-600">↑ 18.0%</span>
                      <span className="text-[14px] text-[#1C1814] whitespace-nowrap">vs last 7 days</span>
                    </div>
                    <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="grad-qrmenu-totalviews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7553FF" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#7553FF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0,15 C 20,15 30,11 50,11 C 70,11 80,5 100,4 L 100,20 L 0,20 Z" fill="url(#grad-qrmenu-totalviews)" />
                        <path d="M 0,15 C 20,15 30,11 50,11 C 70,11 80,5 100,4" fill="none" stroke="#7553FF" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: QR Scans */}
              <div className="bg-white border border-[#1C1814]/10 hover:border-[#10B981]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
                    <span className="text-[14px] font-semibold text-[#1C1814] tracking-tight">QR Scans</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                      <Scan className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">842</h2>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-1">
                    <div className="flex items-center gap-1.5 shrink-0 font-sans">
                      <span className="text-[14px] font-bold text-emerald-600">↑ 12.0%</span>
                      <span className="text-[14px] text-[#1C1814] whitespace-nowrap">vs last 7 days</span>
                    </div>
                    <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="grad-qrmenu-qrscans" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0,13 C 25,14 40,9 60,8 C 80,7 90,5 100,4 L 100,20 L 0,20 Z" fill="url(#grad-qrmenu-qrscans)" />
                        <path d="M 0,13 C 25,14 40,9 60,8 C 80,7 90,5 100,4" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Menu Items */}
              <div className="bg-white border border-[#1C1814]/10 hover:border-[#F59E0B]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
                    <span className="text-[14px] font-semibold text-[#1C1814] tracking-tight">Menu Items</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">97</h2>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-1">
                    <div className="flex items-center gap-1.5 shrink-0 font-sans">
                      <span className="text-[14px] font-bold text-emerald-600">↑ 4</span>
                      <span className="text-[14px] text-[#1C1814] whitespace-nowrap">new items</span>
                    </div>
                    <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="grad-qrmenu-menuitems" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0,14 C 20,15 40,12 60,10 C 80,8 90,5 100,4 L 100,20 L 0,20 Z" fill="url(#grad-qrmenu-menuitems)" />
                        <path d="M 0,14 C 20,15 40,12 60,10 C 80,8 90,5 100,4" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Categories */}
              <div className="bg-white border border-[#1C1814]/10 hover:border-[#EC4899]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
                    <span className="text-[14px] font-semibold text-[#1C1814] tracking-tight">Categories</span>
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#EC4899] flex items-center justify-center shrink-0">
                      <FolderClosed className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">{categories.length}</h2>
                  <div className="flex items-center justify-between gap-2 mt-4 pt-1">
                    <div className="flex items-center gap-1.5 shrink-0 font-sans">
                      <span className="text-[14px] font-bold text-[#1C1814]/40">-</span>
                      <span className="text-[14px] text-[#1C1814] whitespace-nowrap">vs last 7 days</span>
                    </div>
                    <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="grad-qrmenu-categories" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0,15 C 20,13 40,8 60,8 C 80,8 90,6 100,5 L 100,20 L 0,20 Z" fill="url(#grad-qrmenu-categories)" />
                        <path d="M 0,15 C 20,13 40,8 60,8 C 80,8 90,6 100,5" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Three-Column Balanced Design Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* COLUMN 1: CATEGORIES ROW CONTROLLER */}
              <div className="lg:col-span-3 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-[#1C1814] tracking-tight">
                    Categories
                  </h2>
                  <button
                    onClick={() => {
                      setNewCategoryName("");
                      setModalType("add-category");
                      setShowModal(true);
                    }}
                    className="flex items-center gap-1 text-[#7553FF] hover:text-[#7553FF]/80 text-[14px] font-bold select-none cursor-pointer bg-transparent transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {categories.map((cat, idx) => {
                    const isSelected = selectedCategory === cat.name;
                    const CatIcon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        draggable
                        onDragStart={(e) => handleCategoryDragStart(e, idx)}
                        onDragOver={(e) => handleCategoryDragOver(e, idx)}
                        onDrop={(e) => handleCategoryDrop(e, idx)}
                        onDragEnd={handleCategoryDragEnd}
                        onClick={() => {
                          setSelectedCategory(cat.name);
                          setSearchQuery("");
                        }}
                        className={`w-full flex items-center justify-between p-3 flex-row rounded-xl border text-left transition-all duration-300 relative cursor-pointer group ${
                          isSelected
                            ? "bg-[#F0ECFF]/50 border-[#7553FF] text-[#7553FF] font-bold shadow-3xs"
                            : "bg-white border-[#1C1814]/10 hover:border-[#1C1814]/25 text-[#1C1814] hover:shadow-3xs"
                        } ${
                          draggedCategoryIdx === idx 
                            ? "opacity-30 border-dashed border-2 border-[#7553FF]/50 bg-slate-50 shadow-inner scale-[0.96]" 
                            : ""
                        } ${
                          categoryOverIdx === idx && draggedCategoryIdx !== idx 
                            ? "border-t-4 border-t-[#7553FF] bg-[#F5F2FF] ring-2 ring-[#7553FF]/30 scale-[1.03] shadow-md transition-all" 
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {/* Left grab bar icon */}
                          <GripVertical className="w-3.5 h-3.5 text-[#1C1814]/30 cursor-grab active:cursor-grabbing shrink-0 group-hover:text-[#7553FF] group-hover:scale-125 transition-all duration-150" />
                          
                          <div
                            className={`p-2 rounded-lg transition-colors ${isSelected ? "bg-[#F0ECFF] text-[#7553FF]" : "bg-slate-50 text-[#1C1814]"}`}
                          >
                            <CatIcon className="w-4 h-4 shrink-0" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold leading-none">
                              {cat.name}
                            </p>
                            <p
                              className={`text-[12px] leading-none mt-1.5 font-normal italic text-slate-700`}
                            >
                              {cat.itemsCount} items
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 opacity-50 ${isSelected ? "text-[#7553FF]" : "text-[#1C1814]"}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 2: MENU ITEMS TABLE DATA WORKSPACE */}
              <div className="lg:col-span-6 bg-white border border-[#1C1814]/10 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[#1C1814]/5">
                  <h3 className="text-[14px] font-extrabold text-[#1C1814]">
                    Menu Items ({selectedCategory})
                  </h3>
                  <div className="hidden items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                      <Search className="w-3.5 h-3.5 text-[#1C1814] absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-[14px] font-semibold text-[#1C1814] bg-slate-50 border border-[#1C1814]/10 rounded-lg pl-8 pr-3 py-1.5 w-full sm:w-36 focus:outline-none focus:border-[#7553FF]/55"
                      />
                    </div>
                    <button
                      onClick={() => {
                        setModalType("add-item");
                        setNewItem({
                          name: "",
                          description: "",
                          price: "",
                          status: "Active",
                          category: selectedCategory,
                          image:
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=80",
                        });
                        setShowModal(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#7553FF] hover:bg-[#7553FF]/90 text-white rounded-lg text-[14px] font-bold transition shadow-2xs cursor-pointer select-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </div>

                {/* Highly structured food items menu container */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#1C1814]/5 text-[14px] font-bold text-[#1C1814]  tracking-wider select-none">
                        <th className="pb-3 w-12 text-[#1C1814]">Item</th>
                        <th className="pb-3 pl-8 text-[#1C1814]"></th>
                        <th className="pb-3 text-right text-[#1C1814]">Price</th>
                        <th className="pb-3 text-center pl-4 text-[#1C1814]">Status</th>
                        <th className="pb-3 text-right text-[#1C1814]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1814]/5 text-[14px]">
                      {filteredItems.map((item, idx) => (
                        <tr
                          key={item.id}
                          draggable
                          onDragStart={(e) => handleItemDragStart(e, idx)}
                          onDragOver={(e) => handleItemDragOver(e, idx)}
                          onDrop={(e) => handleItemDrop(e, idx)}
                          onDragEnd={handleItemDragEnd}
                          className={`group hover:bg-slate-50/50 transition-all duration-300 ${
                            draggedItemIdx === idx 
                              ? "opacity-25 bg-[#F2EEFF] border-dashed border-2 border-[#7553FF]/40 shadow-inner scale-[0.98]" 
                              : ""
                          } ${
                            itemOverIdx === idx && draggedItemIdx !== idx 
                              ? "border-t-4 border-t-[#7553FF] bg-[#F0F9FF] scale-[1.015] shadow-xs transition-all" 
                              : ""
                          }`}
                        >
                          {/* Drag element handle + Thumbnail image */}
                          <td className="py-3.5">
                            <div className="flex items-center gap-1.5">
                              {/* 6 Grid layout points mock dragging - styled beautifully with active scaling */}
                              <div className="text-slate-700 group-hover:text-[#0284C7] group-hover:scale-125 transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col gap-0.5 justify-center p-1.5 hover:bg-[#F0F9FF] rounded-md shrink-0">
                                <svg
                                  className="w-3 h-4"
                                  viewBox="0 0 12 16"
                                  fill="currentColor"
                                >
                                  <circle cx="3" cy="3" r="1.3" />
                                  <circle cx="3" cy="8" r="1.3" />
                                  <circle cx="3" cy="13" r="1.3" />
                                  <circle cx="9" cy="3" r="1.3" />
                                  <circle cx="9" cy="8" r="1.3" />
                                  <circle cx="9" cy="13" r="1.3" />
                                </svg>
                              </div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg border border-[#1C1814]/10 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </td>
                          {/* Item text detail columns */}
                          <td className="py-3.5 pl-4 max-w-[200px]">
                            <div>
                              <span className="font-medium not-italic text-[#1C1814] block">
                                {item.name}
                              </span>
                              <p className="text-[14px] text-[#1C1814] leading-relaxed mt-1 font-light line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </td>
                          {/* Rich price alignment */}
                          <td className="py-3.5 text-right font-mono font-bold text-[#1C1814]">
                            ${parseFloat(item.price.toString()).toFixed(2)}
                          </td>
                          {/* Status pill badges */}
                          <td className="py-3.5 text-center pl-4">
                            <span
                              className={`px-2 py-0.5 rounded-[2px] text-[14px] font-normal border select-none ${
                                item.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : item.status === "Featured"
                                    ? "bg-[#F0ECFF] text-[#623EE2] border-[#F0ECFF]"
                                    : "bg-slate-50 text-[#1C1814] border-slate-200"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          {/* Row micro controls */}
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5 opacity-85 group-hover:opacity-100 transition">
                              <button
                                onClick={() => {
                                  setEditingItem(item);
                                  setNewItem({
                                    ...item,
                                    price: item.price.toString(),
                                  });
                                  setModalType("edit-item");
                                  setShowModal(true);
                                }}
                                className="p-1 px-1.5 border border-slate-200 text-[#1C1814] rounded-lg hover:text-[#7553FF] hover:bg-[#F0ECFF]/50 hover:border-[#F0ECFF] transition cursor-pointer"
                                title="Edit Item"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteItem(item.id, item.name)
                                }
                                className="p-1.5 bg-rose-50 border border-rose-100 text-rose-500 rounded-lg hover:bg-rose-100/60 transition-all cursor-pointer"
                                title="Delete"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredItems.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-12 text-center text-[#1C1814] font-semibold"
                          >
                            No menu items registered in {selectedCategory}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer with custom layout selectors */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#1C1814]/5 text-[14px] text-[#1C1814] font-bold select-none">
                  <span>
                    Showing 1 to {filteredItems.length} of{" "}
                    {filteredItems.length} items
                  </span>
                  <div className="flex items-center gap-1 self-end sm:self-auto">
                    <button className="px-2.5 py-1 border border-slate-200 rounded-lg text-[#1C1814] hover:bg-slate-50 transition cursor-pointer">
                      ‹
                    </button>
                    <button className="px-3 py-1 bg-[#F0ECFF] text-[#7553FF] border border-[#CCFBF1] rounded-lg font-extrabold shadow-3xs">
                      1
                    </button>
                    <button className="px-3 py-1 border border-slate-200 text-[#1C1814] rounded-lg hover:bg-slate-50 transition cursor-pointer">
                      2
                    </button>
                    <button className="px-3 py-1 border border-slate-200 text-[#1C1814] rounded-lg hover:bg-slate-50 transition cursor-pointer">
                      3
                    </button>
                    <button className="px-2.5 py-1 border border-slate-200 rounded-lg text-[#1C1814] hover:bg-slate-50 transition cursor-pointer">
                      ›
                    </button>
                  </div>
                </div>
              </div>

              {/* COLUMN 3: YOUR MENU QR CODE PREVIEW PANEL CARD */}
              <div className="lg:col-span-3 bg-white border border-[#1C1814]/10 rounded-2xl p-5 shadow-2xs space-y-5 text-center">
                <div className="space-y-1">
                  <h3 className="text-[14px] font-extrabold text-[#1C1814]">
                    Your Menu QR Code
                  </h3>
                  <p className="text-[14px] text-[#1C1814] leading-relaxed max-w-[210px] mx-auto">
                    Customers can scan to view your digital menu
                  </p>
                </div>

                {/* Mockup high performance QR containment component */}
                <div className="w-full aspect-square border border-dashed border-[#1C1814]/15 rounded-2xl bg-[#FAFAFA]/50 p-4 flex items-center justify-center relative">
                  <div className="w-full h-full border border-[#F0ECFF] rounded-xl bg-white p-4 shadow-3xs flex flex-col justify-center items-center relative overflow-hidden">
                    <svg
                      className="w-[140px] h-[140px]"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      {/* Anchor square guides */}
                      <rect
                        x="2"
                        y="2"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke="#7553FF"
                        strokeWidth="4"
                      />
                      <rect
                        x="7"
                        y="7"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill="#7553FF"
                      />

                      <rect
                        x="2"
                        y="76"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke="#7553FF"
                        strokeWidth="4"
                      />
                      <rect
                        x="7"
                        y="81"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill="#7553FF"
                      />

                      <rect
                        x="76"
                        y="2"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke="#7553FF"
                        strokeWidth="4"
                      />
                      <rect
                        x="81"
                        y="7"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill="#7553FF"
                      />

                      {/* Simulated bar matrices code grids */}
                      <line
                        x1="32"
                        y1="6"
                        x2="68"
                        y2="6"
                        stroke="#7553FF"
                        strokeWidth="4.2"
                        strokeDasharray="4 2 1"
                        strokeLinecap="round"
                      />
                      <line
                        x1="32"
                        y1="14"
                        x2="68"
                        y2="14"
                        stroke="#7553FF"
                        strokeWidth="4.2"
                        strokeDasharray="3 4 2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="14"
                        y1="32"
                        x2="14"
                        y2="68"
                        stroke="#7553FF"
                        strokeWidth="4.2"
                        strokeDasharray="2 3 5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="86"
                        y1="32"
                        x2="86"
                        y2="86"
                        stroke="#7553FF"
                        strokeWidth="4.2"
                        strokeDasharray="1 2 4 1"
                        strokeLinecap="round"
                      />

                      <rect
                        x="34"
                        y="34"
                        width="12"
                        height="12"
                        rx="2"
                        fill="#7553FF"
                      />
                      <rect
                        x="34"
                        y="52"
                        width="20"
                        height="8"
                        rx="1.5"
                        fill="#7553FF"
                      />
                      <rect
                        x="58"
                        y="34"
                        width="12"
                        height="26"
                        rx="2"
                        fill="#7553FF"
                      />
                      <rect
                        x="58"
                        y="66"
                        width="18"
                        height="18"
                        rx="3.5"
                        fill="#7553FF"
                      />
                      <rect
                        x="34"
                        y="66"
                        width="14"
                        height="14"
                        rx="2"
                        fill="#7553FF"
                      />
                    </svg>
                  </div>
                </div>

                {/* Lavender Solid download button CTA */}
                <button
                  onClick={() => {
                    showToast(
                      "High-definition vector table QR menu code generated successfully!",
                      "success",
                    );
                  }}
                  className="w-full py-2.5 bg-[#7553FF] hover:bg-[#7553FF]/95 text-white font-bold text-[14px] rounded-xl shadow-2xs hover:shadow-xs transition duration-150 cursor-pointer flex items-center justify-center gap-2 h-10 select-none font-sans"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR Code</span>
                </button>

                {/* Menu link custom layout element */}
                <div className="space-y-1.5 text-left font-sans">
                  <label className="text-[14px] font-bold text-[#1C1814] tracking-wider block">
                    Menu Link
                  </label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-[#1C1814]/10 p-1 rounded-xl">
                    <input
                      type="text"
                      readOnly
                      value="https://gastrohub.nomad.id/m/johns-bistro"
                      className="w-full text-[14px] font-mono text-[#1C1814] bg-transparent pl-2.5 focus:outline-none select-all"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "https://gastrohub.nomad.id/m/johns-bistro",
                        );
                        showToast("Link copied to clipboard!", "info");
                      }}
                      className="p-1 px-1.5 border border-[#1C1814]/10 shadow-3xs rounded-lg hover:bg-slate-100 transition cursor-pointer text-[#1C1814] bg-white"
                      title="Copy Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Interactive Tips section */}
                <div className="p-3.5 bg-[#F0ECFF]/40 border border-[#F0ECFF] rounded-xl text-left flex items-start gap-2.5">
                  <div className="p-1.5 bg-[#F0ECFF] text-[#7553FF] rounded-lg mt-0.5 shrink-0">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[14px] font-extrabold text-[#7553FF] block">
                      Tip
                    </span>
                    <p className="text-[14px] text-[#1C1814] leading-normal font-medium mt-0.5">
                      Print your QR code and place it on tables for easy access
                      to your menu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============ THEMES VIEWPORT ============ */}
        {activeSubTab === "themes" && (
          <motion.div
            key="themes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2"
          >
            {/* COLUMN 1: CONFIGURATIONS (Choose theme, customize colors, typography) */}
            <div className="lg:col-span-8 space-y-6 text-left">
              {/* Part A: Choose a Theme */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Choose a Theme
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Select a template to define the overall look and feel of your
                  digital menu.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {themeTemplates.map((tpl) => {
                    const isSelected = selectedTemplateId === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => applyTemplate(tpl)}
                        className={`group relative flex flex-col text-left bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "border-[#7553FF] ring-2 ring-[#7553FF] shadow-sm"
                            : "border-slate-200/80 hover:border-slate-355 hover:shadow-xs"
                        }`}
                      >
                        {/* Selected Tick Indicator */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 bg-[#7553FF] text-white p-1 rounded-full z-10 shadow-xs">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                          </div>
                        )}

                        {/* Theme Photo / Thumbnail */}
                        <div className="h-24 w-full bg-slate-100 overflow-hidden relative">
                          <img
                            src={tpl.image}
                            alt={tpl.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Theme details */}
                        <div className="p-3.5">
                          <span className="text-xs font-bold text-slate-800 tracking-tight">
                            {tpl.name}
                          </span>
                          <p className="text-[14px] text-slate-700 mt-0.5 font-light line-clamp-1">
                            {tpl.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Part B: Customize Theme */}
              <div className="pt-2">
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Customize Theme
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Adjust colors and typography to match your brand.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {/* Primary Color Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Primary Color
                    </label>
                    <div className="relative flex items-center bg-white border border-slate-200/80 rounded-xl px-2.5 py-1.5 w-full">
                      <div
                        className="w-6 h-6 rounded-md border border-slate-200 mr-2 shrink-0 cursor-pointer relative"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => {
                            setPrimaryColor(e.target.value);
                            setSelectedTemplateId(""); // custom theme state
                          }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        value={primaryColor.toUpperCase()}
                        onChange={(e) => {
                          setPrimaryColor(e.target.value);
                          setSelectedTemplateId("");
                        }}
                        className="text-[13px] font-mono font-medium text-slate-700 w-full focus:outline-none "
                      />
                    </div>
                  </div>

                  {/* Background Color Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Background Color
                    </label>
                    <div className="relative flex items-center bg-white border border-slate-200/80 rounded-xl px-2.5 py-1.5 w-full">
                      <div
                        className="w-6 h-6 rounded-md border border-slate-200 mr-2 shrink-0 cursor-pointer relative"
                        style={{ backgroundColor: backgroundColor }}
                      >
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => {
                            setBackgroundColor(e.target.value);
                            setSelectedTemplateId("");
                          }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        value={backgroundColor.toUpperCase()}
                        onChange={(e) => {
                          setBackgroundColor(e.target.value);
                          setSelectedTemplateId("");
                        }}
                        className="text-[13px] font-mono font-medium text-slate-700 w-full focus:outline-none "
                      />
                    </div>
                  </div>

                  {/* Text Color Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Text Color
                    </label>
                    <div className="relative flex items-center bg-white border border-slate-200/80 rounded-xl px-2.5 py-1.5 w-full">
                      <div
                        className="w-6 h-6 rounded-md border border-slate-200 mr-2 shrink-0 cursor-pointer relative"
                        style={{ backgroundColor: textColor }}
                      >
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => {
                            setTextColor(e.target.value);
                            setSelectedTemplateId("");
                          }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        value={textColor.toUpperCase()}
                        onChange={(e) => {
                          setTextColor(e.target.value);
                          setSelectedTemplateId("");
                        }}
                        className="text-[13px] font-mono font-medium text-slate-700 w-full focus:outline-none "
                      />
                    </div>
                  </div>

                  {/* QR Dot Color Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      QR Dot Color
                    </label>
                    <div className="relative flex items-center bg-white border border-slate-200/80 rounded-xl px-2.5 py-1.5 w-full">
                      <div
                        className="w-6 h-6 rounded-md border border-slate-200 mr-2 shrink-0 cursor-pointer relative"
                        style={{ backgroundColor: qrDotColor }}
                      >
                        <input
                          type="color"
                          value={qrDotColor}
                          onChange={(e) => {
                            setQrDotColor(e.target.value);
                            setSelectedTemplateId("");
                          }}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        value={qrDotColor.toUpperCase()}
                        onChange={(e) => {
                          setQrDotColor(e.target.value);
                          setSelectedTemplateId("");
                        }}
                        className="text-[13px] font-mono font-medium text-slate-700 w-full focus:outline-none "
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part C: Typography */}
              <div className="pt-2">
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Typography
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                  {/* Font dropdown selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Font Family
                    </label>
                    <div className="relative">
                      <select
                        value={fontFamily}
                        onChange={(e) => {
                          setFontFamily(e.target.value);
                          setSelectedTemplateId("");
                        }}
                        className="w-full text-xs p-2.5 border border-slate-200/80 rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#7553FF] appearance-none cursor-pointer"
                      >
                        <option value="Inter">Inter (Sans-Serif)</option>
                        <option value="Space Grotesk">
                          Space Grotesk (Tech/Modern)
                        </option>
                        <option value="Outfit">Outfit (Clean Geometric)</option>
                        <option value="Playfair Display">
                          Playfair Display (Editorial/Serif)
                        </option>
                        <option value="Fira Code">
                          Fira Code (Developer Mono)
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-700">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Size segments toggler */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Text Size
                    </label>
                    <div className="flex bg-slate-100 rounded-xl p-1 w-full border border-slate-200/10">
                      {["Small", "Medium", "Large"].map((sz) => {
                        const isChosen = textSize === sz;
                        return (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setTextSize(sz)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-205 cursor-pointer ${
                              isChosen
                                ? "bg-white border border-slate-200 shadow-2xs text-[#7553FF]"
                                : "text-slate-700 hover:text-slate-850"
                            }`}
                          >
                            <span
                              className={
                                sz === "Small"
                                  ? "text-[11px]"
                                  : sz === "Medium"
                                    ? "text-xs"
                                    : "text-sm"
                              }
                            >
                              Aa
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bot buttons section */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-150">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplateId("monochrome");
                    setPrimaryColor("#111827");
                    setBackgroundColor("#FFFFFF");
                    setTextColor("#1F2937");
                    setQrDotColor("#111827");
                    setFontFamily("Inter");
                    setTextSize("Medium");
                    showToast(
                      "Properties reset successfully back to system defaults!",
                      "info",
                    );
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 bg-white text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer select-none"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Default</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast(
                      "Full brand theme parameters and typography settings saved successfully!",
                      "success",
                    );
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-[#623EE2] hover:bg-[#7553FF] text-white text-xs font-extrabold rounded-xl shadow-2xs hover:shadow-xs transition cursor-pointer select-none"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Theme</span>
                </button>
              </div>
            </div>

            {/* COLUMN 2: LIVE PREVIEW & QR & TIPS */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Live Preview
                </h2>
                <p className="text-xs text-slate-700 mt-1 mb-4">
                  See how your menu looks for customers.
                </p>

                {/* Smartphone casing preview frame */}
                <div className="relative w-full max-w-[290px] mx-auto h-[570px] bg-slate-900 rounded-[44px] shadow-2xl p-3 border-4 border-slate-850 outline outline-offset-1 outline-1 outline-slate-800/10 flex flex-col">
                  {/* Speaker slot top gap */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-20 bg-slate-900 rounded-b-xl z-20 flex items-start justify-center">
                    <div className="w-6 h-0.75 bg-slate-800 rounded-full" />
                  </div>

                  {/* Dynamic Smartphone Screen */}
                  <div
                    className="w-full h-full rounded-[34px] overflow-hidden flex flex-col relative select-none"
                    style={{
                      backgroundColor: backgroundColor,
                      fontFamily:
                        fontFamily === "Playfair Display"
                          ? "serif"
                          : fontFamily === "Fira Code"
                            ? "monospace"
                            : "sans-serif",
                    }}
                  >
                    {/* Top status bar */}
                    <div
                      className="p-3 pt-5 flex items-center justify-between text-[10px]  tracking-wider font-extrabold"
                      style={{ color: textColor }}
                    >
                      {/* Menu hamburger */}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>

                      <div className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        <span>EN</span>
                      </div>
                    </div>

                    {/* Cafe details content */}
                    <div className="flex-1 overflow-y-auto px-4 py-2 text-center flex flex-col items-center justify-start space-y-3">
                      {/* Circle brand avatar logo badge block */}
                      <div className="w-16 h-16 rounded-full border shadow-xs bg-amber-500 flex items-center justify-center border-white relative overflow-hidden group">
                        <img
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&auto=format&fit=crop&q=80"
                          className="w-full h-full object-cover"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-yellow-600/10" />
                      </div>

                      {/* Accent Welcome */}
                      <span
                        className="text-[10px] font-extrabold tracking-widest  opacity-85"
                        style={{ color: textColor }}
                      >
                        Welcome
                      </span>

                      {/* Diner/Restaurant name responding to dynamic text sizing selection */}
                      <h3
                        className="font-black tracking-tight"
                        style={{
                          color: textColor,
                          fontSize:
                            textSize === "Small"
                              ? "18px"
                              : textSize === "Medium"
                                ? "22px"
                                : "28px",
                          lineHeight: "1.2",
                        }}
                      >
                        John's Bistro
                      </h3>

                      <p
                        className="text-[11px] leading-relaxed opacity-75 font-medium -mt-1"
                        style={{ color: textColor }}
                      >
                        Delicious food, happy mood
                      </p>

                      {/* View Menu CTA Button */}
                      <button
                        type="button"
                        className="w-full py-2.5 text-[11px] font-black tracking-wide text-white rounded-xl shadow-2xs flex items-center justify-center gap-2"
                        style={{ backgroundColor: primaryColor }}
                      >
                        📖 <span>View Menu</span>
                      </button>

                      {/* Timings, Address and phone list containers */}
                      <div className="w-full space-y-1.5 pt-1 text-left">
                        {/* Box 1: Hours */}
                        <div className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-150/80 rounded-xl">
                          <div className="p-1 bg-white border rounded-lg text-slate-700">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-700 block leading-none">
                              09:00 - 22:00
                            </span>
                            <span className="text-[8px] text-slate-700 font-bold block mt-0.5">
                              Open Daily
                            </span>
                          </div>
                        </div>

                        {/* Box 2: Location */}
                        <div className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-150/80 rounded-xl">
                          <div className="p-1 bg-white border rounded-lg text-slate-700">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-700 block leading-none">
                              123 Foodie Street
                            </span>
                            <span className="text-[8px] text-slate-700 font-bold block mt-0.5">
                              District 1, HCMC
                            </span>
                          </div>
                        </div>

                        {/* Box 3: Hotline Call */}
                        <div className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-150/80 rounded-xl">
                          <div className="p-1 bg-white border rounded-lg text-slate-700">
                            <Smartphone className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-700 block leading-none">
                              +84 912 345 678
                            </span>
                            <span className="text-[8px] text-slate-700 font-bold block mt-0.5">
                              Hotline Support
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Chef suggestion segment */}
                      <div className="w-full text-left pt-2 space-y-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span className="text-[9px] font-extrabold text-slate-700  tracking-tight">
                            Chef's Recommendation
                          </span>
                        </div>

                        <div className="border border-slate-150 rounded-xl overflow-hidden shadow-3xs flex bg-white p-1.5 gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=80&q=80"
                            className="w-10 h-10 object-cover rounded-lg shrink-0"
                            alt=""
                          />
                          <div className="min-w-0 flex-1 flex flex-col justify-center">
                            <span className="text-[9px] font-bold text-slate-850 block truncate">
                              Grilled Prime Salmon
                            </span>
                            <span className="text-[8px] text-slate-700 block mt-0.5">
                              $24.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integrated Customer Scan Card segment */}
                <div className="bg-slate-50/50 border border-slate-200/85 rounded-2xl p-4 flex items-center justify-between gap-4 mt-4 shadow-3xs">
                  <div className="space-y-2 text-left shrink">
                    <h4 className="text-xs font-bold text-slate-800">
                      Your Menu QR Code
                    </h4>
                    <p className="text-[10px] text-slate-700 font-medium leading-relaxed max-w-[140px]">
                      Customers can scan this code to view your menu
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "High-fidelity PDF vectors of QR brand code compiled and downloading!",
                          "success",
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-[10px] font-black rounded-lg transition shrink-0 cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download QR Code</span>
                    </button>
                  </div>

                  {/* Decorative Custom Color SVG QR Code */}
                  <div className="w-20 h-20 shrink-0 bg-white border border-slate-150 rounded-xl p-2.5 flex items-center justify-center">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      {/* Outer corner trackers */}
                      <rect
                        x="2"
                        y="2"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke={qrDotColor}
                        strokeWidth="4.5"
                      />
                      <rect
                        x="7"
                        y="7"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill={qrDotColor}
                      />

                      <rect
                        x="2"
                        y="76"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke={qrDotColor}
                        strokeWidth="4.5"
                      />
                      <rect
                        x="7"
                        y="81"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill={qrDotColor}
                      />

                      <rect
                        x="76"
                        y="2"
                        width="22"
                        height="22"
                        rx="4.5"
                        stroke={qrDotColor}
                        strokeWidth="4.5"
                      />
                      <rect
                        x="81"
                        y="7"
                        width="12"
                        height="12"
                        rx="1.5"
                        fill={qrDotColor}
                      />

                      {/* Matrix dot clusters */}
                      <line
                        x1="32"
                        y1="6"
                        x2="68"
                        y2="6"
                        stroke={qrDotColor}
                        strokeWidth="4"
                        strokeDasharray="4 2 1"
                      />
                      <line
                        x1="32"
                        y1="14"
                        x2="68"
                        y2="14"
                        stroke={qrDotColor}
                        strokeWidth="4"
                        strokeDasharray="3 4 2"
                      />
                      <line
                        x1="14"
                        y1="32"
                        x2="14"
                        y2="68"
                        stroke={qrDotColor}
                        strokeWidth="4"
                        strokeDasharray="2 3 5"
                      />
                      <line
                        x1="86"
                        y1="32"
                        x2="86"
                        y2="86"
                        stroke={qrDotColor}
                        strokeWidth="4"
                        strokeDasharray="1 2 4"
                      />

                      <rect
                        x="34"
                        y="34"
                        width="12"
                        height="12"
                        rx="2"
                        fill={qrDotColor}
                      />
                      <rect
                        x="34"
                        y="52"
                        width="20"
                        height="8"
                        rx="1.5"
                        fill={qrDotColor}
                      />
                      <rect
                        x="58"
                        y="34"
                        width="12"
                        height="26"
                        rx="2"
                        fill={qrDotColor}
                      />
                      <rect
                        x="58"
                        y="66"
                        width="18"
                        height="18"
                        rx="3.5"
                        fill={qrDotColor}
                      />
                      <rect
                        x="34"
                        y="66"
                        width="14"
                        height="14"
                        rx="2"
                        fill={qrDotColor}
                      />
                    </svg>
                  </div>
                </div>

                {/* Friendly tips block */}
                <div className="bg-[#F0ECFF]/40 border border-[#F0ECFF] rounded-2xl p-4 mt-3 flex items-start gap-2.5">
                  <div className="p-1 px-1.5 bg-[#F0ECFF] text-[#7553FF] rounded-lg shrink-0 mt-0.5">
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#623EE2] block">
                      Tip
                    </span>
                    <p className="text-[11px] text-slate-700 font-medium leading-relaxed mt-0.5">
                      Change the theme colors or typography to match your brand
                      identity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============ SETTINGS VIEWPORT REMOVED AND PLACED TO MODAL POPUP ============ */}
      </AnimatePresence>

      {/* ============ UNIVERSAL MODALS AND FORMS HANDLERS ============ */}
      <AnimatePresence>
        {isQrSettingsModalOpen && (
          <>
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQrSettingsModalOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-3xs z-55 flex items-center justify-center p-4"
            >
              {/* Modal window container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-[#1C1814]/10 rounded-2xl p-6 shadow-xl w-full max-w-xl z-55 text-left font-sans space-y-6"
              >
                {/* Header title */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#1C1814]/5">
                  <div>
                    <h3 className="text-base font-extrabold text-[#1C1814]">
                      Global QR Menu Parameters
                    </h3>
                    <p className="text-xs text-[#1C1814]/50 mt-1">
                      Configure workspace rules, physical table count metrics, and connection parameters.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsQrSettingsModalOpen(false)}
                    className="p-1 text-[#1C1814]/40 hover:text-[#1C1814] rounded-lg hover:bg-slate-50 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    {/* Physical setup */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#1C1814]/65">
                        Custom Table Prefix Label
                      </label>
                      <input
                        type="text"
                        value={customTableLabel}
                        onChange={(e) => setCustomTableLabel(e.target.value)}
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl"
                        placeholder="e.g. Table, Seat, Booth"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#1C1814]/65">
                        Total Physical Tables Range
                      </label>
                      <select
                        value={tableCountSetting}
                        onChange={(e) => setTableCountSetting(e.target.value)}
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl bg-white focus:outline-none"
                      >
                        <option value="5">5 Tables</option>
                        <option value="15">15 Tables</option>
                        <option value="30">30 Tables</option>
                        <option value="50">50 Tables</option>
                        <option value="100">100 Tables</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Active Guest Wifi configuration checkbox */}
                    <div className="space-y-2 p-3.5 bg-slate-50/50 border border-[#1C1814]/5 rounded-xl">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={useWifiOnQr}
                          onChange={(e) => setUseWifiOnQr(e.target.checked)}
                          className="rounded accent-[#7553FF]"
                        />
                        <span className="text-xs font-bold text-[#1C1814]">
                          Include guest Wifi SSID on table tent card
                        </span>
                      </label>

                      {useWifiOnQr && (
                        <div className="space-y-2.5 pt-3">
                          <div className="space-y-1">
                            <span className="text-[10px] text-[#1C1814]/40 font-mono font-bold block ">
                              WiFi Name (SSID)
                            </span>
                            <input
                              type="text"
                              value={wifiSsid}
                              onChange={(e) => setWifiSsid(e.target.value)}
                              className="w-full text-xs p-2 border border-[#1C1814]/10 rounded-xl"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-[#1C1814]/40 font-mono font-bold block ">
                              wifi key/pass
                            </span>
                            <input
                              type="text"
                              value={wifiPass}
                              onChange={(e) => setWifiPass(e.target.value)}
                              className="w-full text-xs p-2 border border-[#1C1814]/10 rounded-xl"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1C1814]/5 flex items-center justify-between">
                  <div className="flex items-start gap-2 max-w-sm">
                    <div className="p-1 px-1.5 bg-[#F0ECFF] text-[#7553FF] rounded-md font-mono font-semibold text-[10px]">
                      Auto Sync
                    </div>
                    <span className="text-[10px] text-[#1C1814]/50 leading-relaxed block font-medium">
                      Saving updates all printed PDF links instantly. Live on-table tablets refresh in background.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      showToast(
                        "Global menu specifications and Wifi details saved to layout cloud database!",
                        "success",
                      );
                      setIsQrSettingsModalOpen(false);
                    }}
                    className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#7553FF]/90 text-white font-bold text-xs rounded-xl transition shadow-sm hover:shadow-md cursor-pointer select-none"
                  >
                    Save Settings
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {showModal && (
          <>
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-3xs z-50 flex items-center justify-center p-4"
            >
              {/* Modal window container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-[#1C1814]/10 rounded-2xl p-6 shadow-xl w-full max-w-md z-50 text-left font-sans"
              >
                {/* Header title */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#1C1814]/5">
                  <h3 className="text-sm font-extrabold text-[#1C1814]">
                    {modalType === "add-category" && "Add New Digital Category"}
                    {modalType === "add-item" && "Add Appetizer Menu Item"}
                    {modalType === "edit-item" && "Edit Menu Item Data"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 text-[#1C1814]/40 hover:text-[#1C1814] rounded-lg hover:bg-slate-50 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* FORM FOR ADDING CATEGORY */}
                {modalType === "add-category" && (
                  <form
                    onSubmit={handleAddCategorySubmit}
                    className="space-y-4 pt-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1814]/50 block">
                        Category Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Traditional Soups, Chef Specialties"
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-[#1C1814]/5 text-[10px] text-[#1C1814]/40">
                      <span>
                        ✓ Auto-generates a brand matching icon from the system
                        deck
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#7553FF] hover:bg-[#7553FF]/95 text-white font-bold text-xs rounded-lg transition shadow-2xs hover:shadow-xs cursor-pointer"
                      >
                        Create Category
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM FOR ADDING OR EDITING AN ITEM */}
                {(modalType === "add-item" || modalType === "edit-item") && (
                  <form
                    onSubmit={handleAddItemSubmit}
                    className="space-y-4 pt-4"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1814]/60">
                        Food Title / Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        placeholder="e.g. Crispy Spring Rolls"
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl focus:outline-none focus:border-teal-400/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1814]/60">
                        Ingredients / Description
                      </label>
                      <textarea
                        required
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            description: e.target.value,
                          })
                        }
                        placeholder="Brief listing of key ingredients, tastes or notes..."
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl focus:outline-none focus:border-teal-400/50 h-16 leading-normal"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1814]/60">
                          Price (USD)
                        </label>
                        <input
                          type="text"
                          required
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({ ...newItem, price: e.target.value })
                          }
                          placeholder="8.50"
                          className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl focus:outline-none focus:border-teal-400/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#1C1814]/60">
                          Menu Status
                        </label>
                        <select
                          value={newItem.status}
                          onChange={(e) =>
                            setNewItem({ ...newItem, status: e.target.value })
                          }
                          className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl bg-white focus:outline-none focus:border-teal-400/50"
                        >
                          <option value="Active">Active</option>
                          <option value="Featured">Featured (Badge)</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1C1814]/60">
                        Visual Category
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem({ ...newItem, category: e.target.value })
                        }
                        className="w-full text-xs p-2.5 border border-[#1C1814]/10 rounded-xl bg-white focus:outline-none focus:border-teal-400/50"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Image Preset picker */}
                    <div className="space-y-2 pt-1">
                      <label className="text-xs font-bold text-[#1C1814]/50 block">
                        Thumbnail Image
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[
                          "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=80&q=80",
                          "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=80&q=80",
                          "https://images.unsplash.com/photo-1547347298-407405a1bb64?w=80&q=80",
                          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=80&q=80",
                          "https://images.unsplash.com/photo-1634531872120-a6519b5e5fb3?w=80&q=80",
                        ].map((urlOption, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              setNewItem({ ...newItem, image: urlOption })
                            }
                            className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition cursor-pointer relative ${
                              newItem.image === urlOption
                                ? "border-[#7553FF]"
                                : "border-transparent"
                            }`}
                          >
                            <img
                              src={urlOption}
                              className="w-full h-full object-cover"
                              alt=""
                              referrerPolicy="no-referrer"
                            />
                            {newItem.image === urlOption && (
                              <div className="absolute inset-0 bg-[#623EE2]/20 flex items-center justify-center text-white">
                                <Check
                                  className="w-3.5 h-3.5"
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-3 border-t border-[#1C1814]/5">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#7553FF] hover:bg-[#7553FF]/95 text-white font-bold text-xs rounded-lg transition shadow-2xs hover:shadow-xs cursor-pointer select-none"
                      >
                        {modalType === "add-item" ? "Add Item" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============ TOAST NOTIFICATION CONTAINER ============ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-5 right-5 bg-[#1C1814] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 z-55 text-xs font-bold"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                toast.type === "success"
                  ? "bg-emerald-400"
                  : toast.type === "error"
                    ? "bg-rose-500"
                    : "bg-[#8B5CF6]"
              }`}
            />
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 7. SOCIAL AUTO POST VIEW
// ============================================================================
export function SocialPostView() {
  const [step, setStep] = useState<"setup" | "editor" | "ready">("setup");
  const [postType, setPostBodyType] = useState<"feed" | "story" | "reel">(
    "feed",
  );
  const [caption, setCaption] = useState(
    "Juicy wagyu beef sliders, seared to perfection and topped with creamy truffle aioli. Big flavor in every bite! 🍔✨\n\nAvailable today only at John's Bistro. Don't miss out! 🤤",
  );
  const [hashtags, setHashtags] = useState(
    "#WagyuSliders #TruffleAioli #JohnsBistro #DailySpecial #Foodie #Foodstagram",
  );
  const [hasMedia, setHasMedia] = useState(true);
  const [scheduleOption, setScheduleOption] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("2025-05-24");
  const [scheduleTime, setScheduleTime] = useState("10:00");

  const [locationChecked, setLocationChecked] = useState(true);
  const [tagProductsChecked, setTagProductsChecked] = useState(false);
  const [addFirstCommentChecked, setAddFirstCommentChecked] = useState(false);

  // States for interactive simulation
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showLocalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateAI = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setIsGeneratingAI(false);
      setCaption(
        "✨ Meet culinary perfection at John's Bistro! 🌟 Super juicy Wagyu Beef Sliders paired flawlessly with rich and fragrant Truffle Aioli sauce. An explosion of flavors in every bite! 🍔🤤",
      );
      setHashtags(
        "#WagyuPremium #TruffleBurger #JohnsBistro #SignatureDish #HanoiEats #SaigonFoodie",
      );
      showLocalToast("AI Copy Gen completed successfully!");
    }, 1200);
  };

  const handleSmileClick = () => {
    const foodEmojis = ["🍔", "🍟", "🍕", "✨", "🤤", "🥂", "🍰", "🍣", "🌟"];
    const randomEmoji =
      foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
    setCaption((prev) => prev + " " + randomEmoji);
  };

  const handleCopyText = () => {
    const fullText = `${caption}\n\n${hashtags}`;
    navigator.clipboard.writeText(fullText)
      .then(() => showLocalToast("Copied content text to clipboard! 📋"))
      .catch(() => showLocalToast("Failed to copy text. Please try again."));
  };

  const handleCopyMedia = () => {
    const mediaUrl = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80";
    navigator.clipboard.writeText(mediaUrl)
      .then(() => showLocalToast("Copied image URL to clipboard! 📋"))
      .catch(() => showLocalToast("Failed to copy image URL. Please try again."));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-12 text-left">
      {/* Title Header with descriptive info */}
      <div className="pb-4 select-none">
        <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">
          Social Auto Post
        </h1>
        <p className="text-[14px] text-[#A39D96] font-medium mt-0.5">
          Create, schedule and auto post your content to social media portals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* COL 1 - Post Creator (Bên trái) */}
        <div className="bg-white border border-[#EAE4DC]/40 p-6 rounded-2xl flex flex-col justify-between space-y-5 text-left shadow-sm">
          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-[#EAE4DC]/30 pb-3">
              <h3 className="text-sm font-bold text-slate-800  tracking-wider">
                Post Creator
              </h3>
            </div>

            {/* Caption Card */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                  Caption
                </label>
              </div>
              <div className="relative border border-[#EAE4DC]/60 rounded-xl overflow-hidden focus-within:border-[#7553FF] focus-within:ring-2 focus-within:ring-[#7553FF]/10 transition">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write food-lovers post caption here..."
                  className="w-full text-[14px] p-3.5 pb-10 leading-relaxed h-[130px] font-medium text-slate-700 outline-none border-0 resize-none font-sans bg-white"
                />

                {/* Bottom bar inside textarea */}
                <div className="absolute bottom-1.5 left-2.5 right-2.5 flex items-center justify-between pt-1 border-t border-slate-50 text-[14px] text-slate-700 font-mono font-medium select-none">
                  <span>{caption.length}/2200</span>
                  <button
                    type="button"
                    onClick={handleSmileClick}
                    className="p-1 text-slate-700 hover:text-[#7553FF] hover:bg-slate-55 rounded transition cursor-pointer"
                    title="Add yummy random emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hashtags Input bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-bold text-slate-700 tracking-wide">
                  Hashtags
                </label>
                <span className="text-[14px] text-slate-700 font-medium font-mono">
                  {hashtags.length}/200
                </span>
              </div>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full text-[14px] px-3.5 py-2.5 border border-[#EAE4DC]/60 rounded-xl font-mono text-[#7553FF] placeholder-slate-400 font-medium outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/10 bg-white"
                placeholder="#burgers #delicious #johnsbistro"
              />
            </div>

            {/* Media Image Grid component */}
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-slate-700 tracking-wide block">
                Media
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Preloaded Image box */}
                {hasMedia ? (
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative border border-slate-100 group">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
                      alt="Preloaded Bistro Gourmet Slider"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setHasMedia(false);
                        showLocalToast("Preloaded gourmet image removed");
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-black/60 hover:bg-[#7553FF] cursor-pointer rounded-full flex items-center justify-center text-white text-[14px] transition animate-none text-[10px]"
                      title="Remove Image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setHasMedia(true);
                      showLocalToast("Preloaded burgers image loaded");
                    }}
                    className="aspect-[4/3] rounded-xl border-2 border-dashed border-[#EAE4DC]/50 hover:border-[#7553FF] bg-slate-50 flex flex-col items-center justify-center p-2 text-center transition cursor-pointer font-sans"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-700 stroke-1 block" />
                    <span className="text-[14px] font-normal text-slate-700 mt-1 block">
                      Reload
                    </span>
                  </button>
                )}

                {/* Dotted Upload Card 1 */}
                <button
                  type="button"
                  onClick={() =>
                    showLocalToast(
                      "Trigger system file uploader upload_applet_media",
                    )
                  }
                  className="aspect-[4/3] rounded-xl border-2 border-dashed border-[#EAE4DC]/60 hover:border-[#7553FF] bg-white flex flex-col items-center justify-center p-2 text-center transition select-none cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-slate-700 mb-0.5" />
                  <span className="text-[14px] font-bold text-slate-700 block animate-none font-sans">
                    Add Photo
                  </span>
                  <span className="text-[14px] text-slate-700 font-normal  mt-0.5 tracking-tight font-mono">
                    Media
                  </span>
                </button>

                {/* Dotted Card 2: Add from library */}
                <button
                  type="button"
                  onClick={() =>
                    showLocalToast(
                      "Access GMB Cloud Media libraries Catalog",
                    )
                  }
                  className="aspect-[4/3] rounded-xl border border-[#EAE4DC]/50 hover:border-[#7553FF] bg-white flex flex-col items-center justify-center p-2 text-center transition select-none cursor-pointer"
                >
                  <FolderClosed className="w-4 h-4 text-slate-700 mb-0.5" />
                  <span className="text-[14px] font-bold text-slate-700 block animate-none font-sans">
                    Add from
                  </span>
                  <span className="text-[14px] text-slate-700 font-normal  mt-0.5 tracking-tight font-mono">
                    Library
                  </span>
                </button>
              </div>
            </div>

            {/* Generate with AI Solid button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
                className="w-full py-2.5 bg-[#7553FF] text-white font-bold hover:bg-[#623EE2] text-[14px] rounded-xl flex items-center justify-center gap-2 transition select-none disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-sm border-0"
              >
                <Sparkles
                  className={`w-4 h-4 shrink-0 ${isGeneratingAI ? "animate-spin" : ""}`}
                />
                <span>
                  {isGeneratingAI
                    ? "Optimizing copywriting models..."
                    : "Generate with AI"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* COL 2 - Generic Preview (Ở giữa) */}
        <div className="space-y-4">
          <div className="bg-white border border-[#EAE4DC]/40 p-6 rounded-2xl flex flex-col space-y-4 text-left shadow-sm min-h-[460px]">
            <div className="flex justify-between items-center border-b border-[#EAE4DC]/30 pb-3 bg-white">
              <span className="text-sm font-bold text-slate-800  tracking-wider font-sans">
                Generic Preview
              </span>
            </div>

            {/* Check if post is empty */}
            {!(caption.trim() || hashtags.trim() || hasMedia) ? (
              /* Empty state waiting container */
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#FAFAFA] border border-dashed border-[#EAE4DC] rounded-xl min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center mb-3">
                  <Smile className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="text-[15px] font-bold text-slate-800">Waiting for content</h4>
                <p className="text-[14px] text-slate-700 font-normal mt-1 leading-relaxed max-w-[240px]">
                  Draft caption, hashtags, or reload promo media on the left tool area to trigger instant social preview.
                </p>
              </div>
            ) : (
              /* Content Preview visual container */
              <div className="border border-[#EAE4DC]/60 rounded-xl overflow-hidden bg-white text-slate-800 font-sans shadow-sm text-left flex flex-col">
                {/* Media frame with Quick Copy */}
                {hasMedia ? (
                  <div className="relative aspect-video bg-slate-50 w-full overflow-hidden border-b border-[#EAE4DC]/40 group flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
                      alt="Unsplash Gourmet Burger Preview"
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Top-right copy icon for Media - only clearly visible on hover */}
                    <button
                      type="button"
                      onClick={handleCopyMedia}
                      className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-[#7553FF] rounded-lg shadow-md border border-[#EAE4DC]/50 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 flex items-center justify-center z-10"
                      title="Copy media URL"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="aspect-video bg-slate-50 flex flex-col items-center justify-center border-b border-[#EAE4DC]/30 p-6 text-center text-slate-700">
                    <Image className="w-6 h-6 stroke-1 mx-auto block mb-1 text-slate-700" />
                    <span className="text-[14px] font-normal block">
                      No media loaded in preview
                    </span>
                  </div>
                )}

                {/* Text area with Quick Copy */}
                <div className="p-4 space-y-4 text-left bg-white relative group">
                  <div className="flex gap-4 justify-between items-start">
                    <div className="flex-1 space-y-3 font-sans text-slate-700">
                      {caption && (
                        <p className="text-[14px] leading-relaxed font-normal whitespace-pre-wrap select-text">
                          {caption}
                        </p>
                      )}
                      {hashtags && (
                        <p className="text-[14px] font-normal text-[#7553FF] tracking-tight whitespace-pre-wrap leading-relaxed mt-1 select-text">
                          {hashtags}
                        </p>
                      )}
                    </div>

                    {/* Quick copy text button aligned right, clearly visible ONLY on hover */}
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="p-1.5 bg-[#FAF9F7] hover:bg-[#7553FF]/10 text-[#5C534C] hover:text-[#7553FF] rounded-md border border-[#EAE4DC]/60 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 duration-200 shrink-0 self-start active:scale-95 flex items-center justify-center"
                      title="Copy text content"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COL 3 - Marketing & Brand Growth (Bên phải) */}
        <div className="self-start h-auto">
          <div className="bg-gradient-to-br from-[#FCFBFF] via-[#F4F0FF] to-[#FAF8FF] border border-[#7553FF]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-auto hover:shadow-md transition-all duration-300 relative overflow-hidden text-left min-h-[460px]">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#E6DAFF] via-[#F4EFFF]/40 to-transparent opacity-60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#EFE8FF] opacity-35 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 relative z-10 w-full">
              {/* Badge */}
              <div className="inline-block bg-[#EBE5FF] text-[#7553FF] text-[14px] font-bold tracking-wider  px-2.5 py-1 rounded-md select-none">
                Marketing & Brand Growth
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h4 className="text-[24px] font-bold tracking-tight text-[#110B33] leading-tight font-sans">
                  Social Auto Post
                </h4>
                <p className="text-[14px] text-slate-700 font-normal leading-relaxed">
                  Create, schedule, and auto-post engaging content across all your social media channels.
                </p>
              </div>

              {/* Bullet list with Regular 400 text weight */}
              <div className="space-y-4 pt-1">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <span className="font-normal text-slate-800 text-[14px] block leading-tight">Auto-schedule posts</span>
                    <span className="text-[14px] text-slate-700 block leading-tight font-normal">Plan and publish content on autopilot.</span>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <span className="font-normal text-slate-800 text-[14px] block leading-tight">AI content generation</span>
                    <span className="text-[14px] text-slate-700 block leading-tight font-normal">Generate captions and hashtags with AI.</span>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <BarChart2 className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <span className="font-normal text-slate-800 text-[14px] block leading-tight">Track performance</span>
                    <span className="text-[14px] text-slate-700 block leading-tight font-normal">Monitor engagement and grow your audience.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action bottom */}
            <div className="mt-8 pt-2 space-y-2.5 relative z-10 w-full">
              <button
                type="button"
                onClick={() => showLocalToast("Social Auto Post is already active and running!")}
                className="w-full py-3 bg-gradient-to-r from-[#7553FF] to-[#612FE5] hover:brightness-110 active:scale-[0.98] text-white font-semibold text-[14px] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <Send className="w-3.5 h-3.5" />
                Try Social Auto Post
              </button>
              <p className="text-[14px] text-slate-700 text-center font-normal">
                Save time and grow your brand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Local Toast Alert system */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-slate-900 border border-slate-800 text-white text-[14px] px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 z-55 animate-fadeIn font-bold">
          <span className="w-2 h-2 rounded-full bg-[#7553FF] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 8. SEO CHECK & OPTIMIZATION VIEW
// ============================================================================
export function SeoOptViewUnified() {
  const [step, setStep] = useState<"setup" | "analyzing" | "results">(
    "results",
  );
  const [url, setUrl] = useState("https://your-restaurant.com");
  const [bizName, setBizName] = useState("The Rustic Spoon");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      showToast("Please enter a website URL");
      return;
    }
    if (!bizName.trim()) {
      showToast("Please enter your business name");
      return;
    }

    setStep("analyzing");
    setProgress(10);
    setStatusMessage("Crawling website speed metrics...");

    setTimeout(() => {
      setProgress(35);
      setStatusMessage("Analyzing Google Maps schema markup...");
    }, 800);

    setTimeout(() => {
      setProgress(68);
      setStatusMessage(
        "Checking Yelp & Facebook local citation consistency...",
      );
    }, 1600);

    setTimeout(() => {
      setProgress(85);
      setStatusMessage(
        "Running opponent search density neighborhood simulations...",
      );
    }, 2400);

    setTimeout(() => {
      setProgress(100);
      setStep("results");
      showToast("SEO Audit completed successfully!");
    }, 3200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans relative text-left">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-[#1C1814] text-white text-[14px] font-bold px-4 py-2.5 rounded-xl border border-[#1C1814]/15 animate-fadeIn">
          {toast}
        </div>
      )}

      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">
            Local SEO Snapshot
          </h1>
          <p className="text-[14px] text-[#5C534C] leading-[20px]">
            Instantly audit your restaurant's digital presence across your
            website and Google.
          </p>
        </div>

        {/* Stepper display */}
        <div className="flex items-center gap-3 bg-white border border-[#1C1814]/15 p-1.5 px-3.5 rounded-2xl self-start md:self-auto select-none">
          <div className="flex items-center gap-1.5 text-[14px] font-medium leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-medium ${
                step === "setup"
                  ? "bg-[#7553FF] text-white"
                  : "bg-[#7553FF]/10 text-[#7553FF]"
              }`}
            >
              1
            </div>
            <span className="text-[#7553FF]">Setup</span>
          </div>
          <span className="text-[#DCD2C7] text-[14px] font-medium">→</span>
          <div className="flex items-center gap-1.5 text-[14px] font-medium leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-medium ${
                step === "analyzing"
                  ? "bg-[#7553FF] text-white"
                  : step === "results"
                    ? "bg-[#7553FF]/10 text-[#7553FF]"
                    : "bg-[#FAFAFA] text-[#1C1814] border border-[#1C1814]/15"
              }`}
            >
              2
            </div>
            <span
              className={
                step === "analyzing" || step === "results"
                  ? "text-[#7553FF]"
                  : "text-[#5C534C]"
              }
            >
              Analysis
            </span>
          </div>
          <span className="text-[#DCD2C7] text-[14px] font-medium">→</span>
          <div className="flex items-center gap-1.5 text-[14px] font-medium leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold ${
                step === "results"
                  ? "bg-[#7553FF] text-white"
                  : "bg-[#FAFAFA] text-[#1C1814] border border-[#1C1814]/15"
              }`}
            >
              3
            </div>
            <span
              className={
                step === "results"
                  ? "text-[#7553FF]"
                  : "text-[#5C534C]"
              }
            >
              Results
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: SETUP FORM VIEW */}
      {(step === "setup" || step === "results") && (
        <div className="space-y-6">
          {/* Quote-style What you'll get note - Super-minimal flat quote block with a left accent border */}
          <div className="bg-[#7553FF]/5 border border-[#7553FF]/15 rounded-2xl p-4.5 flex gap-4 text-left select-none font-sans text-[14px]">
            <span className="font-semibold text-[#7553FF/50]  tracking-wider shrink-0 text-[14px] mr-1.5">
              WHAT YOU'LL GET:
            </span>

            <span className="font-regular text-[#1C1814] text-[14px]">Google Business</span>
            <span className="text-[#1C1814]/30 text-[12px] select-none">•</span>

            <span className="font-regular text-[#1C1814] text-[14px]">Search Visibility</span>
            <span className="text-[#1C1814]/30 text-[12px] select-none">•</span>

            <span className="font-regular text-[#1C1814] text-[14px]">Reviews Overview</span>
            <span className="text-[#1C1814]/30 text-[12px] select-none">•</span>

            <span className="font-regular text-[#1C1814] text-[14px]">On-Page SEO</span>
            <span className="text-[#1C1814]/30 text-[12px] select-none">•</span>

            <span className="font-regular text-[#1C1814] text-[14px]">Actionable Insights</span>
          </div>

          <form
            onSubmit={handleRunAnalysis}
            className="bg-white border border-[#1C1814]/15 p-5 rounded-2xl space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#1C1814] tracking-wider block">
                  Website URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://your-restaurant.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full text-[14px] h-10 px-3 border border-[#1C1814]/15 hover:border-[#1C1814]/30 rounded-lg outline-none bg-white text-black focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[14px] font-bold text-[#1C1814] tracking-wider block">
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Rustic Spoon"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full text-[14px] h-10 px-3 border border-[#1C1814]/15 hover:border-[#1C1814]/30 rounded-lg outline-none bg-white text-black focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all font-sans"
                />
              </div>
            </div>

            {/* Advanced options trigger */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-[14px] font-bold text-[#1C1814] hover:text-[#7553FF] flex items-center gap-1 select-none cursor-pointer"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
                />
                <span>Advanced Options</span>
              </button>

              {showAdvanced && (
                <div className="mt-3 p-3.5 bg-[#7553FF]/1 border border-[#1C1814]/15 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkCompetitorsNew"
                      defaultChecked
                      className="rounded border-slate-300 text-[#7553FF] focus:ring-[#7553FF] h-3.5 w-3.5 cursor-pointer"
                    />
                    <label
                      htmlFor="checkCompetitorsNew"
                      className="text-[14px] text-[#5C534C] select-none cursor-pointer font-sans"
                    >
                      Analyze 3 nearest competitor radius keyword density
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkSpeedNew"
                      defaultChecked
                      className="rounded border-slate-300 text-[#7553FF] focus:ring-[#7553FF] h-3.5 w-3.5 cursor-pointer"
                    />
                    <label
                      htmlFor="checkSpeedNew"
                      className="text-[14px] text-[#5C534C] select-none cursor-pointer font-sans"
                    >
                      Audit mobile page loading vitals using Google PageSpeed
                      server
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="pt-3 border-t border-[#1C1814]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[14px] text-[#5C534C] font-sans">
                  Connect Google Business Profile to unlock full analysis
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsConnected(!isConnected);
                    showToast(
                      isConnected
                        ? "Google Business Profile Disconnected"
                        : "Google Business Profile Connected!",
                    );
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[14px] font-bold border transition duration-200 cursor-pointer ${
                    isConnected
                      ? "border-[#7553FF]/20 bg-[#F0ECFF] text-[#7553FF] hover:bg-[#F0ECFF]/80"
                      : "border-[#1C1814]/15 bg-white text-[#1C1814] hover:bg-slate-50"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#7553FF] stroke-[3]" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2 select-none bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-xl transition duration-200 self-end sm:self-auto flex items-center justify-center gap-1.5 h-10 cursor-pointer border-none font-sans"
              >
                <Zap className="w-3.5 h-3.5 text-white shrink-0 fill-white" />
                <span>Run Analysis</span>
              </button>
            </div>
          </form>

          {/* DETAILED SCORED REPORT FOR RESULTS STEP - Matches Sugggested Screenshot exactly */}
          {step === "results" && (
            <div className="space-y-6 pt-2">
              {/* Overall SEO Score & Promo Card side-by-side bento layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Visual SEO Gauge and rating range visualizer */}
                <div className="bg-white border border-[#1C1814]/15 p-6 rounded-2xl text-left flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-[14px] font-bold text-[#1C1814] tracking-tight pb-0.5 font-sans">
                      Your SEO Score
                    </h3>
                    <p className="text-[14px] text-[#5C534C] font-sans">
                      See how your restaurant performs and what to improve.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                    {/* SVG Progress Gauge showing 67 */}
                    <div className="relative shrink-0 select-none w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="54"
                          stroke="#FAF9F7"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="54"
                          stroke="#7553FF"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={339.2}
                          strokeDashoffset={339.2 - (339.2 * 67) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[32px] font-bold text-[#1C1814] leading-none font-sans">
                          67
                        </span>
                        <span className="text-[14px] text-[#5C534C] mt-1 font-mono">
                          /100
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-[14px]  tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                        <span>Needs Improvement</span>
                      </div>
                      <p className="text-[14px] text-[#5C534C] leading-relaxed font-sans">
                        Your local SEO has room to grow. Improve key areas to rank higher on Google maps and attract local customers.
                      </p>
                    </div>
                  </div>

                  {/* Rating range Slider Line segments */}
                  <div className="space-y-2 pt-2 border-t border-[#1C1814]/15 font-sans">
                    <div className="relative h-1.5 w-full flex rounded-full bg-slate-100 overflow-visible select-none border border-[#1C1814]/15">
                      {/* Segment 1: Critical (0 - 50%) */}
                      <div
                        className="h-full bg-rose-500 rounded-l-full"
                        style={{ width: "50%" }}
                      />
                      {/* Segment 2: Needs Improvement (50% - 70%) */}
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: "20%" }}
                      />
                      {/* Segment 3: Good (70% - 90%) */}
                      <div
                        className="h-full bg-[#7553FF]/60"
                        style={{ width: "20%" }}
                      />
                      {/* Segment 4: Excellent (90% - 100%) */}
                      <div
                        className="h-full bg-[#10B981] rounded-r-full"
                        style={{ width: "10%" }}
                      />

                      {/* Division dot separators on slider track */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-1 bg-white rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-1 h-1 bg-white rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[70%] w-1 h-1 bg-white rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[90%] w-1 h-1 bg-white rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[100%] w-1 h-1 bg-white rounded-full" />

                      {/* Active score slider position pin: at exactly 67% */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-[67%] -translate-x-1/2 z-10">
                        <div className="w-3.5 h-3.5 bg-amber-600 border-2 border-white rounded-full" />
                      </div>
                    </div>

                    {/* Milestone labels */}
                    <div className="relative text-[14px] font-mono text-[#7C7267] font-bold select-none h-4">
                      <span className="absolute left-0">0</span>
                      <span className="absolute left-[50%] -translate-x-1/2">
                        50
                      </span>
                      <span className="absolute left-[70%] -translate-x-1/2">
                        70
                      </span>
                      <span className="absolute left-[90%] -translate-x-1/2">
                        90
                      </span>
                      <span className="absolute right-0">100</span>
                    </div>

                    {/* Tag label segments mapping exact terminology */}
                    <div className="grid grid-cols-10 text-[14px] font-bold  tracking-wider select-none text-center font-sans">
                      <span className="col-span-5 text-left text-rose-600">
                        Critical
                      </span>
                      <span className="col-span-2 text-center text-amber-600">
                        Needs Improvement
                      </span>
                      <span className="col-span-2 text-center text-[#7553FF]">
                        Good
                      </span>
                      <span className="col-span-1 text-right text-emerald-600">
                        Excellent
                      </span>
                    </div>
                  </div>
                </div>

                {/* Improve SEO Consultation promo card - Exactly matches layout and typography with correct border weight */}
                <div className="bg-[#7553FF]/5 border border-[#7553FF]/15 p-6 rounded-2xl text-left flex flex-col justify-between space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#7553FF] flex items-center justify-center shrink-0 border border-[#7553FF]/15">
                      <Rocket
                        className="w-5 h-5 text-[#7553FF]"
                        style={{ transform: "rotate(-45deg)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[14px] font-bold text-[#1C1814] tracking-tight font-sans">
                        Improve your SEO score
                      </h3>
                      <p className="text-[14px] text-[#5C534C] leading-relaxed font-sans">
                        Our SEO specialists will review your snapshot report and
                        provide personalized actions to improve your local Maps
                        ranking to attract more customers.
                      </p>
                    </div>
                  </div>

                  {/* Checklist items list */}
                  <div className="space-y-2 pt-2 select-none font-sans">
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1C1814] font-sans">
                      <div className="w-5 h-5 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#7553FF] stroke-[3]" />
                      </div>
                      <span>Detailed profile performance check</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[14px] text-[#1C1814] font-sans">
                      <div className="w-5 h-5 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#7553FF] stroke-[3]" />
                      </div>
                      <span>Actionable recommendations preview</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-[14px] text-[#1C1814] font-sans">
                      <div className="w-5 h-5 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#7553FF] stroke-[3]" />
                      </div>
                      <span>Priority fixes to boost search rank</span>
                    </div>
                  </div>

                  {/* Consultation prompt CTA Button */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "SEO consultation request submitted successfully! An advisor will reach out to you within 24 hours.",
                        )
                      }
                      className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border-none font-sans"
                    >
                      <Send
                        className="w-3.5 h-3.5 text-white"
                        style={{ transform: "rotate(-45deg)" }}
                      />
                      <span>Request SEO Consultation</span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#5C534C] font-sans">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5C534C]" />
                      <span>Free to request • No obligation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure strip layout */}
              <div className="bg-[#7553FF]/5 border border-[#7553FF]/15 rounded-2xl p-4.5 flex items-center gap-4 text-left select-none animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-white text-[#7553FF] flex items-center justify-center shrink-0 border border-[#7553FF]/15">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[14px] font-bold text-[#1C1814] block">
                    Your data is secure
                  </span>
                  <p className="text-[14px] text-[#5C534C] leading-normal font-sans">
                    We only access the performance information check metrics to
                    generate your snapshot and never share personal information
                    with third parties.
                  </p>
                </div>
              </div>

              {/* Breakdown Columns Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Column 1 (8/12 weight) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Detailed Strengths vs Issues Dual Card List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Strengths */}
                    <div className="bg-white border border-[#1C1814]/15 p-5 rounded-2xl text-left space-y-3.5">
                      <h4 className="text-[14px] font-bold text-[#1C1814]  tracking-wider pb-2 border-b border-[#1C1814]/15 font-sans">
                        Top Strengths
                      </h4>
                      <ul className="space-y-3 font-sans">
                        {[
                          "Google Business Profile is verified",
                          "Consistent NAP (Name, Address, Phone) across platforms",
                          "Good count of positive reviews (4.6 stars average)",
                          "Your restaurant website is fully responsive",
                        ].map((st, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[14px] text-[#5C534C] font-normal leading-relaxed"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Top Issues to Improve */}
                    <div className="bg-white border border-[#1C1814]/15 p-5 rounded-2xl text-left space-y-3.5">
                      <h4 className="text-[14px] font-bold text-[#1C1814]  tracking-wider pb-2 border-b border-[#1C1814]/15 font-sans">
                        Top Issues to Improve
                      </h4>
                      <ul className="space-y-3 font-sans">
                        {[
                          "Add more atmosphere photos weekly to Google Profile",
                          "Meta title tags are missing strategic local keywords",
                          "Missing structured schema.json markup code on website",
                          "Yelp citation business name spelling is inconsistent",
                        ].map((is, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[14px] text-[#5C534C] font-normal leading-relaxed"
                          >
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{is}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Detailed Breakdown Card with clear border lines matching user request */}
                  <div className="bg-white border border-[#1C1814]/15 rounded-2xl p-5 space-y-3 text-left">
                    <h4 className="text-[14px] font-bold text-[#1C1814]  tracking-wider pb-1 font-sans">
                      Detailed Parameter Breakdown
                    </h4>
                    <div className="divide-y divide-[#1C1814]/15">
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] border border-[#7553FF]/15 text-[#7553FF] flex items-center justify-center shrink-0">
                            <Store className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] font-medium text-[#1C1814]">
                            Google Business Profile Setup
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-light text-emerald-600 font-sans">
                            Great
                          </span>
                          <span className="text-[14px] font-medium text-[#1C1814] font-mono bg-[#FAF9F7] border border-[#1C1814]/15 px-2 py-0.5 rounded-[4px]">
                            88/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#DCD2C7]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] border border-[#7553FF]/15 text-[#7553FF] flex items-center justify-center shrink-0">
                            <Search className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] font-medium text-[#1C1814]">
                            Local Keyword Visibility
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-light text-amber-600 font-sans">
                            Critical
                          </span>
                          <span className="text-[14px] font-medium text-[#1C1814] font-mono bg-[#FAF9F7] border border-[#1C1814]/15 px-2 py-0.5 rounded-[4px]">
                            45/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#DCD2C7]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] border border-[#7553FF]/15 text-[#7553FF] flex items-center justify-center shrink-0">
                            <Star className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] font-medium text-[#1C1814]">
                            Review & Sentiment Score
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-light text-[#7553FF] font-sans">
                            Good
                          </span>
                          <span className="text-[14px] font-medium text-[#1C1814] font-mono bg-[#FAF9F7] border border-[#1C1814]/15 px-2 py-0.5 rounded-[4px]">
                            76/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#DCD2C7]" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] border border-[#7553FF]/15 text-[#7553FF] flex items-center justify-center shrink-0">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <span className="text-[14px] font-medium text-[#1C1814]">
                            On-Page Metadata Speed
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-light text-amber-600 font-sans">
                            Needs Attention
                          </span>
                          <span className="text-[14px] font-medium text-[#1C1814] font-mono bg-[#FAF9F7] border border-[#1C1814]/15 px-2 py-0.5 rounded-[4px]">
                            59/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#DCD2C7]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 (4/12 weight) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Business Information metadata panel */}
                  <div className="bg-white border border-[#1C1814]/15 rounded-2xl p-5 text-left space-y-4">
                    <h4 className="text-[14px] font-bold text-[#1C1814]  tracking-wider pb-2 border-b border-[#1C1814]/15">
                      Business Information
                    </h4>
                    <div className="space-y-3 font-sans text-[14px]">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1C1814]/15">
                        <span className="text-[#5C534C] font-normal">
                          Business Name
                        </span>
                        <span className="font-bold text-[#1C1814]">
                          {bizName || "The Rustic Spoon"}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1C1814]/15 font-sans">
                        <span className="text-[#5C534C] font-normal text-[14px] shrink-0">
                          Website URL
                        </span>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#7553FF]"
                        >
                          <span className="truncate max-w-[150px] inline-block font-bold">
                            {url
                              ? url.replace(/^https?:\/\//, "")
                              : "your-restaurant.com"}
                          </span>
                        </a>
                      </div>

                      <div className="flex justify-between items-start pb-2 border-b border-[#1C1814]/15">
                        <span className="text-[#5C534C] font-normal block shrink-0 mt-0.5">
                          Local Address
                        </span>
                        <span className="font-bold text-[#1C1814] text-right leading-relaxed max-w-[170px]">
                          123 Gourmet Blvd, San Francisco, CA 94102
                        </span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1C1814]/15 font-sans">
                        <span className="text-[#5C534C] font-normal">
                          Phone
                        </span>
                        <span className="font-bold text-[#1C1814]">
                          +1 (415) 555-0199
                        </span>
                      </div>

                      <div className="flex justify-between items-center font-sans">
                        <span className="text-[#5C534C] font-normal">
                          Categories
                        </span>
                        <span className="font-bold text-[#1C1814]">
                          Bistro, Restaurant
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunAnalysis}
                      className="w-full py-2.5 bg-[#FAF9F7] hover:bg-slate-100/20 text-[#1C1814] border border-[#1C1814]/15 text-[14px] font-bold rounded-xl transition flex items-center justify-center gap-2 select-none cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-run SEO Snapshot</span>
                    </button>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white border border-[#1C1814]/15 rounded-2xl p-5 text-left space-y-4">
                    <h4 className="text-[14px] font-bold text-[#1C1814]  tracking-wider pb-2 border-b border-[#1C1814]/15">
                      Recommendations
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <Image className="w-4 h-4" />
                        </div>
                        <div className="text-left font-sans">
                           <span className="text-[14px] font-bold text-[#1C1814] block leading-snug">
                            Add new photos weekly
                          </span>
                          <p className="text-[14px] text-[#5C534C] font-normal mt-0.5 leading-snug">
                            Active accounts receive up to 35% more clicks on
                            directions maps.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="text-left font-sans">
                          <span className="text-[14px] font-bold text-[#1C1814] block leading-snug">
                            Respond to reviews immediately
                          </span>
                          <p className="text-[14px] text-[#5C534C] font-normal mt-0.5 leading-snug">
                            AI reviews trigger alerts inside search systems to
                            showcase user activity.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="text-left font-sans">
                          <span className="text-[14px] font-bold text-[#1C1814] block leading-snug">
                            Inject keywords to tags
                          </span>
                          <p className="text-[14px] text-[#5C534C] font-normal mt-0.5 leading-snug">
                            Place exact maps coordinates and terms inside index
                            meta fields.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "Displaying extended local recommendation catalog",
                        )
                      }
                      className="w-full py-2 bg-[#FAF9F7] hover:bg-slate-50 border border-[#1C1814]/15 text-[#1C1814] text-[14px] font-bold rounded-xl transition font-sans cursor-pointer"
                    >
                      View all recommendations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: ANALYZING STATE */}
      {step === "analyzing" && (
        <div className="bg-white border border-[#1C1814]/15 p-12 rounded-2xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-[#F0ECFF] border-t-[#7553FF] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[14px] font-mono font-bold text-[#7553FF]">
                {progress}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-[14px] font-bold text-[#1C1814]  tracking-wider font-sans">
              Running Intelligent Audit
            </h3>
            <p className="text-[14px] text-[#5C534C] font-sans">
              Please wait while the AI scans local citation indexes and page
              speed telemetry.
            </p>
          </div>

          <div className="w-full max-w-sm bg-slate-100 rounded-full h-1.5 overflow-hidden border border-[#1C1814]/15">
            <div
              className="bg-[#7553FF] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[14px] px-3 py-1 bg-[#FAF9F7] border border-[#1C1814]/15 rounded-lg text-[#5C534C] font-mono block">
            {statusMessage}
          </span>
        </div>
      )}
    </div>
  );
}
export function SeoOptView() {
  return <SeoOptViewUnified />;
}

export function SeoOptViewLegacyUnused() {
  const [step, setStep] = useState<"setup" | "analyzing" | "results">(
    "results",
  );
  const [url, setUrl] = useState("https://your-restaurant.com");
  const [bizName, setBizName] = useState("The Rustic Spoon");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      showToast("Please enter a website URL");
      return;
    }
    if (!bizName.trim()) {
      showToast("Please enter your business name");
      return;
    }

    setStep("analyzing");
    setProgress(10);
    setStatusMessage("Crawling website speed metrics...");

    setTimeout(() => {
      setProgress(35);
      setStatusMessage("Analyzing Google Maps schema markup...");
    }, 800);

    setTimeout(() => {
      setProgress(68);
      setStatusMessage(
        "Checking Yelp & Facebook local citation consistency...",
      );
    }, 1600);

    setTimeout(() => {
      setProgress(85);
      setStatusMessage(
        "Running opponent search density neighborhood simulations...",
      );
    }, 2400);

    setTimeout(() => {
      setProgress(100);
      const newScore = Math.floor(Math.random() * 15) + 80; // 80 - 95
      const newRep = {
        id: Date.now().toString(),
        websiteUrl: url,
        businessName: bizName,
        score: newScore,
        date: "Today",
        googleBusiness: isConnected
          ? "100% Fully Connected"
          : "88% Partial Configuration",
        searchVisibility:
          newScore > 88 ? "Excellent online visibility" : "Moderate visibility",
        onPageSlightlySpeedIssue: Math.random() > 0.5,
        insights: [
          "Add structured schema.json restaurant data to home page.",
          "Respond quicker to historical online Google maps customer reviews.",
          "Inject target neighborhood keywords (e.g. food nearby) into metadata headers.",
        ],
      };
      setReports((prev) => [newRep, ...prev]);
      setStep("results");
      showToast("SEO Audit completed successfully!");
    }, 3200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans relative text-left">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg border border-slate-800">
          {toast}
        </div>
      )}

      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div className="space-y-1">
          <h1 className="text-[28px] font-black text-slate-800 tracking-tight">
            Local SEO Snapshot
          </h1>
          <p className="text-xs text-slate-700 font-medium">
            Instantly audit your restaurant's digital presence across your
            website and Google.
          </p>
        </div>

        {/* Stepper display */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100/40 p-1 rounded-xl self-start md:self-auto shadow-2xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                step === "setup"
                  ? "bg-primary text-white shadow-2xs"
                  : "bg-primary-soft text-primary"
              }`}
            >
              1
            </div>
            <span
              className={
                step === "setup"
                  ? "text-primary font-bold"
                  : "text-slate-700 font-medium"
              }
            >
              Setup
            </span>
          </div>
          <span className="text-slate-700 text-xs font-mono select-none">
            →
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                step === "analyzing"
                  ? "bg-primary text-white shadow-2xs"
                  : step === "results"
                    ? "bg-primary-soft text-primary"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              2
            </div>
            <span
              className={
                step === "analyzing"
                  ? "text-primary font-bold"
                  : "text-slate-700 font-medium"
              }
            >
              Analysis
            </span>
          </div>
          <span className="text-slate-700 text-xs font-mono select-none">
            →
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold leading-none">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                step === "results"
                  ? "bg-primary text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              3
            </div>
            <span
              className={
                step === "results"
                  ? "text-primary font-bold"
                  : "text-slate-700 font-medium"
              }
            >
              Results
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: SETUP FORM VIEW */}
      {(step === "setup" || step === "results") && (
        <div className="space-y-6">
          <form
            onSubmit={handleRunAnalysis}
            className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-3xs space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-505 tracking-wider block">
                  Website URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://your-restaurant.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full text-xs h-[38px] px-3 border border-[#EAE4DC] hover:border-slate-300 rounded-lg outline-none bg-white font-medium text-[#1C1814] focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-505 tracking-wider block">
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Rustic Spoon"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full text-xs h-[38px] px-3 border border-[#EAE4DC] hover:border-slate-300 rounded-lg outline-none bg-white font-medium text-[#1C1814] focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all"
                />
              </div>
            </div>

            {/* Advanced options trigger */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-bold text-slate-700 hover:text-slate-700 flex items-center gap-1 select-none"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
                />
                <span>Advanced Options</span>
              </button>

              {showAdvanced && (
                <div className="mt-3 p-3.5 bg-slate-50/50 border border-slate-100/40 rounded-xl space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkCompetitors"
                      defaultChecked
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                    />
                    <label
                      htmlFor="checkCompetitors"
                      className="text-xs text-slate-600 font-semibold select-none"
                    >
                      Analyze 3 nearest competitor radius keyword density
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="checkSpeed"
                      defaultChecked
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                    />
                    <label
                      htmlFor="checkSpeed"
                      className="text-xs text-slate-600 font-semibold select-none"
                    >
                      Audit mobile page loading vitals using Google PageSpeed
                      server
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="pt-3 border-t border-slate-100/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">
                  Connect Google Business Profile to unlock full analysis
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsConnected(!isConnected);
                    showToast(
                      isConnected
                        ? "Google Business Profile Disconnected"
                        : "Google Business Profile Connected!",
                    );
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${
                    isConnected
                      ? "border-primary/20 bg-primary-soft text-primary hover:bg-primary-soft/80"
                      : "border-[#EAE4DC] bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-primary" />
                      <span>Connect</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm shadow-purple-900/10 hover:shadow-md transition self-end sm:self-auto flex items-center gap-1.5"
              >
                <span>Run Analysis</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </form>

          {/* BELOW THE FORM: SETUP DECORATIONS */}
          {step === "setup" && (
            <div className="space-y-6">
              {/* WHAT YOU'LL GET SECTION */}
              <div className="space-y-4">
                <div className="space-y-0.5">
                  <h3 className="text-[15px] font-black text-slate-800 tracking-tight">
                    What you'll get
                  </h3>
                  <p className="text-xs text-slate-700 font-medium">
                    Our Local SEO Snapshot checks key areas that impact your
                    restaurant's visibility.
                  </p>
                </div>

                {/* 5 columns grid as requested in mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-white border border-slate-100/40 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50/60 border border-emerald-100/35 text-emerald-600 flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        Google Business
                      </span>
                      <p className="text-[10px] text-slate-700 font-medium leading-snug">
                        Review your Google Business Profile completeness and
                        performance.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50/60 border border-emerald-100/35 text-emerald-600 flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        Search Visibility
                      </span>
                      <p className="text-[10px] text-slate-700 font-medium leading-snug">
                        See how easily customers can find you in local search
                        results.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50/60 border border-emerald-100/35 text-emerald-600 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        Reviews Overview
                      </span>
                      <p className="text-[10px] text-slate-700 font-medium leading-snug">
                        Analyze your reviews, ratings, and customer sentiment.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50/60 border border-emerald-100/35 text-emerald-600 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-00 block">
                        On-Page SEO
                      </span>
                      <p className="text-[10px] text-slate-700 font-medium leading-snug">
                        Check important on-page SEO factors on your website.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-4 rounded-xl text-center flex flex-col items-center justify-between space-y-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50/60 border border-emerald-100/35 text-emerald-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        Actionable Insights
                      </span>
                      <p className="text-[10px] text-slate-700 font-medium leading-snug">
                        Get clear recommendations to improve and rank higher.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURE DATA NOTIFICATION STRIP */}
              <div className="bg-emerald-50/20 border border-emerald-100/30 rounded-xl p-3.5 flex items-start gap-3">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-850 block">
                    Your data is secure
                  </span>
                  <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                    We only access the information needed to generate your SEO
                    snapshot and never share your data with third parties.
                  </p>
                </div>
              </div>

              {/* RECENT REPORTS CARD TIMELINE */}
              <div className="bg-white border border-slate-100/40 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-800 tracking-tight">
                    Recent Reports
                  </h3>
                  <button
                    type="button"
                    className="text-[10px] font-black text-emerald-650 hover:underline bg-transparent cursor-pointer"
                  >
                    View all reports
                  </button>
                </div>

                {reports.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <FileText className="w-8 h-8 text-slate-700 stroke-1 block mb-2" />
                    <span className="text-xs font-extrabold text-slate-805 block">
                      No reports yet
                    </span>
                    <p className="text-[10px] text-slate-700 font-medium mt-1">
                      Run your first analysis to see results here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {reports.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-3 bg-slate-50/50 border border-slate-100/30 rounded-xl flex items-center justify-between text-xs hover:bg-white transition duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 border border-emerald-100/35">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="text-left font-sans min-w-0">
                            <span className="text-xs font-bold text-slate-800 block truncate">
                              {rep.businessName} Local SEO
                            </span>
                            <span className="text-[10px] text-slate-700 block font-mono mt-0.5 truncate">
                              {rep.websiteUrl} • {rep.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-[2px]">
                            Score: {rep.score}/100
                          </span>
                          <button
                            onClick={() => {
                              setStep("results");
                            }}
                            className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-205 text-[10px] text-slate-650 font-black rounded-lg transition"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BELOW THE FORM: DETAILED SCORED REPORT FOR RESULTS */}
          {step === "results" && (
            <div className="space-y-6 pt-4">
              {/* Heading Overall SEO */}
              <div className="text-left">
                <h3 className="text-sm font-black text-[#1C1814]  tracking-wider">
                  Overall SEO Score
                </h3>
              </div>

              {/* Bento score layouts */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                {/* Circular Score Visual card */}
                <div className="xl:col-span-5 bg-white border border-slate-100/40 p-5 rounded-2xl shadow-3xs flex flex-row items-center gap-5 text-left">
                  <div className="relative shrink-0 select-none">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#f1f5f9"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * 78) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[26px] font-black text-slate-800 leading-none">
                        78
                      </span>
                      <span className="text-[9px] text-slate-700 font-extrabold  mt-0.5 font-mono">
                        /100
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[13px] font-black text-slate-850 block">
                      Good Job! 👏
                    </span>
                    <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                      Your restaurant's online presence is good, but there are
                      still opportunities to improve and rank higher.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        showToast("Displaying full report details")
                      }
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/50 border border-emerald-200 text-[10px] font-extrabold rounded-lg transition"
                    >
                      View full report
                    </button>
                  </div>
                </div>

                {/* 5 small bento columns */}
                <div className="xl:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white border border-slate-100/40 p-3.5 rounded-2xl shadow-3xs flex flex-col items-center justify-between text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Store className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-700  tracking-tight block">
                        Google Business Profile
                      </span>
                      <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                        85/100
                      </span>
                      <span className="inline-block bg-emerald-50 text-emerald-750 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md mt-1">
                        Good
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-3.5 rounded-2xl shadow-3xs flex flex-col items-center justify-between text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-700  tracking-tight block">
                        Search Visibility
                      </span>
                      <span className="text-base font-extrabold text-amber-550 block mt-0.5">
                        72/100
                      </span>
                      <span className="inline-block bg-amber-50 text-amber-750 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md mt-1">
                        Fair
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-3.5 rounded-2xl shadow-3xs flex flex-col items-center justify-between text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-700  tracking-tight block">
                        Reviews Overview
                      </span>
                      <span className="text-base font-extrabold text-emerald-600 block mt-0.5">
                        80/100
                      </span>
                      <span className="inline-block bg-emerald-50 text-emerald-750 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md mt-1">
                        Good
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-3.5 rounded-2xl shadow-3xs flex flex-col items-center justify-between text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-700  tracking-tight block">
                        On-Page SEO
                      </span>
                      <span className="text-base font-extrabold text-amber-550 block mt-0.5">
                        75/100
                      </span>
                      <span className="inline-block bg-amber-50 text-amber-750 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md mt-1">
                        Fair
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100/40 p-3.5 rounded-2xl shadow-3xs flex flex-col items-center justify-between text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-650 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black text-slate-700  tracking-tight block">
                        Actionable Insights
                      </span>
                      <span className="text-base font-extrabold text-slate-700 block mt-0.5">
                        12
                      </span>
                      <span className="inline-block bg-slate-150 text-slate-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md mt-1">
                        Suggestions
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Columns Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Column 1 (8/12 weight) */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Strengths */}
                    <div className="bg-white border border-slate-100/40 p-5 rounded-2xl shadow-3xs text-left space-y-3.5">
                      <h4 className="text-xs font-black text-slate-800  tracking-wider">
                        Top Strengths
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Google Business Profile is verified",
                          "Consistent NAP (Name, Address, Phone) across platforms",
                          "Good number of positive reviews",
                          "Your website is mobile-friendly",
                          "Meta title and descriptions are optimized",
                        ].map((st, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[11px] text-slate-600 font-semibold leading-relaxed"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-650 shrink-0 mt-0.5" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Top Issues to Improve */}
                    <div className="bg-white border border-slate-100/40 p-5 rounded-2xl shadow-3xs text-left space-y-3.5">
                      <h4 className="text-xs font-black text-slate-800  tracking-wider">
                        Top Issues to Improve
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Add more photos to your Google Business Profile",
                          "Respond to all customer reviews",
                          "Some important pages are missing meta descriptions",
                          "Improve local keyword usage on homepage",
                          "Build more high-quality backlinks",
                        ].map((is, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-[11px] text-slate-600 font-semibold leading-relaxed"
                          >
                            <AlertCircle className="w-4 h-4 text-amber-550 shrink-0 mt-0.5" />
                            <span>{is}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Detailed Breakdown Card */}
                  <div className="bg-white border border-slate-100/40 rounded-2xl p-5 shadow-3xs space-y-3 text-left">
                    <h4 className="text-xs font-black text-slate-800  tracking-wider pb-1">
                      Detailed Breakdown
                    </h4>
                    <div className="divide-y divide-slate-100/40">
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Store className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Google Business Profile
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-emerald-650">
                            Good
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 font-mono bg-slate-50 px-2 py-0.5 rounded-[2px]">
                            85/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <Search className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Search Visibility
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-amber-600">
                            Fair
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 font-mono bg-slate-50 px-2 py-0.5 rounded-[2px]">
                            72/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Star className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Reviews Overview
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-emerald-650">
                            Good
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 font-mono bg-slate-50 px-2 py-0.5 rounded-[2px]">
                            80/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            On-Page SEO
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-amber-600">
                            Fair
                          </span>
                          <span className="text-[11px] font-bold text-slate-700 font-mono bg-slate-50 px-2 py-0.5 rounded-[2px]">
                            75/100
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-105 text-slate-600 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800">
                            Actionable Insights
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-slate-600">
                            12 Suggestions
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 (4/12 weight) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Business Information */}
                  <div className="bg-white border border-slate-100/40 rounded-2xl p-5 shadow-3xs text-left space-y-4">
                    <h4 className="text-xs font-black text-slate-800  tracking-wider">
                      Business Information
                    </h4>
                    <div className="space-y-3 font-sans text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-55">
                        <span className="text-slate-700 font-medium">
                          Business Name
                        </span>
                        <span className="font-extrabold text-slate-800">
                          {bizName || "John's Bistro"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-55">
                        <span className="text-slate-700 font-medium">
                          Website
                        </span>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-extrabold text-emerald-650 flex items-center gap-1 hover:underline"
                        >
                          <span>
                            {url
                              ? url.replace(/^https?:\/\//, "")
                              : "your-restaurant.com"}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-55">
                        <span className="text-slate-700 font-medium block shrink-0">
                          Address
                        </span>
                        <span className="font-bold text-slate-700 text-right">
                          123 Foodie Lane, San Francisco, CA 94103
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-55">
                        <span className="text-slate-700 font-medium">
                          Phone
                        </span>
                        <span className="font-bold text-slate-700">
                          +1 (415) 123-4567
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-55">
                        <span className="text-slate-700 font-medium">
                          Categories
                        </span>
                        <span className="font-bold text-slate-700">
                          Restaurant, Bistro
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-1">
                        <span className="text-slate-700 font-medium">
                          Analysis Date
                        </span>
                        <span className="font-medium text-slate-700 font-mono">
                          May 24, 2025 at 10:30 AM
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRunAnalysis}
                      className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100/50 text-emerald-700 border border-emerald-200 text-xs font-black rounded-xl transition flex items-center justify-center gap-2 select-none"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-run Analysis</span>
                    </button>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-white border border-slate-100/40 rounded-2xl p-5 shadow-3xs text-left space-y-4">
                    <h4 className="text-xs font-black text-slate-800  tracking-wider">
                      Recommendations
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Image className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block">
                            Add new photos at least once a week
                          </span>
                          <p className="text-[10px] text-slate-700 mt-0.5 leading-snug">
                            Frequent catalog or atmosphere media keeps search
                            engine prioritization high.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block">
                            Encourage happy customers to leave reviews
                          </span>
                          <p className="text-[10px] text-slate-700 mt-0.5 leading-snug">
                            Real and fresh reviews drive continuous high maps
                            search ranks.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block">
                            Optimize homepage with local keywords
                          </span>
                          <p className="text-[10px] text-slate-700 mt-0.5 leading-snug">
                            Ensure exact neighborhood targeting terms are
                            correctly mapped in metadata tags.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block">
                            Improve page speed for better rankings
                          </span>
                          <p className="text-[10px] text-slate-700 mt-0.5 leading-snug">
                            Optimizing image loads speeds up the server reaction
                            and customer satisfaction scores.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold text-slate-800 block">
                            Create more local content and blog posts
                          </span>
                          <p className="text-[10px] text-slate-700 mt-0.5 leading-snug">
                            Articles highlighting nearby community partnerships
                            drive domain authority.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          "Displaying extended local recommendation catalog",
                        )
                      }
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-205 text-slate-705 text-xs font-black rounded-xl transition"
                    >
                      View all recommendations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: ANALYZING STATE */}
      {step === "analyzing" && (
        <div className="bg-white border border-slate-100/40 p-12 rounded-2xl shadow-3xs flex flex-col items-center justify-center text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-mono font-bold text-emerald-600">
                {progress}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-slate-800  tracking-wider font-mono">
              Running Intelligent Audit
            </h3>
            <p className="text-xs text-slate-700 font-medium">
              Please wait while the AI scans local citation indexes and page
              speed telemetry.
            </p>
          </div>

          <div className="w-full max-w-sm bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[11px] px-3 py-1 bg-slate-50 border rounded-lg text-slate-550 font-mono font-medium block">
            {statusMessage}
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 9. REVIEWS VIEW
// ============================================================================
export function ReviewsView() {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "responded" | "leaderboard"
  >("all");
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState<string>("all");
  const [selectedPlatformFilter, setSelectedPlatformFilter] =
    useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Initial Feedback Data
  const [feedbacks, setFeedbacks] = useState([
    {
      id: "1",
      customer: "Anonymous Customer",
      reviewCount: 3,
      rating: 4,
      reviewText:
        "Great food and cozy atmosphere! The staff was very friendly.",
      source: "Google Maps",
      date: "May 24, 2025 10:30 AM",
      status: "Pending",
      avatarColor: "bg-primary-soft text-[#623EE2]",
      initials: "A",
      responseDraft: "",
    },
    {
      id: "2",
      customer: "Jessica L.",
      reviewCount: 12,
      rating: 5,
      reviewText:
        "Delicious dishes and excellent service. Definitely coming back!",
      source: "Google Maps",
      date: "May 23, 2025 7:45 PM",
      status: "Responded",
      avatarColor: "bg-emerald-100 text-emerald-700",
      initials: "J",
      responseDraft:
        "Thank you Jessica! We are incredibly happy to hear that you enjoyed our delicious dishes and signature services. See you next time!",
    },
    {
      id: "3",
      customer: "Michael T.",
      reviewCount: 5,
      rating: 3,
      reviewText: "Food was good but waited too long for our orders.",
      source: "Google Maps",
      date: "May 22, 2025 6:20 PM",
      status: "Responded",
      avatarColor: "bg-amber-100 text-amber-700",
      initials: "M",
      responseDraft:
        "Dear Michael, thank you for your feedback. We apologize for the wait time during your service. We are working hard to optimize kitchen times.",
    },
    {
      id: "4",
      customer: "Sophia R.",
      reviewCount: 8,
      rating: 5,
      reviewText:
        "Amazing experience from start to finish. Highly recommended!",
      source: "Google Maps",
      date: "May 21, 2025 1:15 PM",
      status: "Responded",
      avatarColor: "bg-pink-100 text-pink-700",
      initials: "S",
      responseDraft:
        "Hi Sophia! We are thrilled to hear you had an amazing experience from start to finish. Looking forward to welcoming you back!",
    },
    {
      id: "5",
      customer: "Daniel K.",
      reviewCount: 2,
      rating: 4,
      reviewText: "Good taste and nice place. Will come again!",
      source: "Google Maps",
      date: "May 20, 2025 11:00 AM",
      status: "Pending",
      avatarColor: "bg-sky-100 text-sky-700",
      initials: "D",
      responseDraft: "",
    },
  ]);

  // Selected row for active AI replying inline tool
  const [replyRowId, setReplyRowId] = useState<string | null>(null);
  const [customReplyText, setCustomReplyText] = useState<string>("");
  const [isGeneratingAI, setIsGeneratingAI] = useState<string | null>(null);

  const showLocalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Copy Link Callback
  const handleCopyLink = () => {
    const linkStr =
      "https://gastrohub.namad.id.vn/review/019e3a94-da1b-7c64-b556-f4ac3d6507a";
    navigator.clipboard.writeText(linkStr);
    showLocalToast("Review link copied to clipboard!");
  };

  // Trigger AI Response Draft Generation
  const handleTriggerAIDraft = (
    id: string,
    reviewer: string,
    rating: number,
    text: string,
  ) => {
    setIsGeneratingAI(id);
    setTimeout(() => {
      setIsGeneratingAI(null);
      const generated = `Hi ${reviewer}, thank you for your ${rating}-star review! We appreciate your honest feedback ("${text.slice(0, 40)}..."). We look forward to welcome you back at John's Bistro soon! 🌟`;
      setCustomReplyText(generated);
      setReplyRowId(id);
    }, 900);
  };

  // Confirm and Publish Draft Solution
  const handlePublishResponse = (id: string) => {
    if (!customReplyText.trim()) {
      showLocalToast("Response text cannot be empty!");
      return;
    }
    setFeedbacks((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          return { ...f, status: "Responded", responseDraft: customReplyText };
        }
        return f;
      }),
    );
    setReplyRowId(null);
    setCustomReplyText("");
    showLocalToast("AI Reply drafted and published on live business profile!");
  };

  // Download QR Code Mock
  const handleDownloadQR = () => {
    showLocalToast(
      "Review QR code package downloaded in high-resolution PNG format!",
    );
  };

  // Tab Filtering logic
  const filteredFeedbacks = feedbacks.filter((item) => {
    // 1. Tab active filter
    if (activeTab === "pending" && item.status !== "Pending") return false;
    if (activeTab === "responded" && item.status !== "Responded") return false;

    // 2. Rating Rating filter
    if (selectedRatingFilter !== "all") {
      const targetRating = parseInt(selectedRatingFilter, 10);
      if (item.rating !== targetRating) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Toast Alert popover */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-[14px] font-semibold px-4.5 py-3 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-[#7553FF] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER ROW WITH CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 text-left select-none">
        <div>
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">
            Review Booster
          </h1>
          <p className="text-[14px] text-[#5C534C] font-semibold mt-0.5">
            Manage customer feedback and staff performance for Google Maps
            reviews.
          </p>
        </div>

        {/* Top actions toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setShowHowItWorks(!showHowItWorks);
              showLocalToast("Loading walkthrough guide...");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 hover:bg-[#FAF9F7] border border-[#EAE4DC] text-[14px] font-black text-[#1C1814] rounded-xl transition cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-[#F0ECFF] text-[#623EE2] flex items-center justify-center shrink-0">
              <span className="text-[14px] font-black">▶</span>
            </div>
            <span>How it works</span>
          </button>

          <div className="relative flex items-center border border-[#EAE4DC] bg-white rounded-xl px-3 py-2 text-[14px] font-bold text-[#5C534C]">
            <Calendar className="w-4 h-4 text-[#7C7267] mr-1.5" />
            <span>This Month</span>
            <ChevronDown className="w-4 h-4 text-[#7C7267] ml-1.5" />
          </div>
        </div>
      </div>

      {showHowItWorks && (
        <div className="bg-[#FAF9F7] border border-[#EAE4DC]/70 p-4.5 rounded-2xl text-left space-y-2 animate-fadeIn">
          <h3 className="text-[14px] font-black text-[#1C1814]  tracking-wide">
            Review Booster Workflow
          </h3>
          <p className="text-[14px] text-[#5C534C] font-medium leading-relaxed">
            Invite diners to scan your branded QR link. 5-star givers are
            seamlessly routed directly to Google Maps, while lower rankings
            trigger selective internal feedback prompts so your staff can
            immediately correct issues on active shifts!
          </p>
        </div>
      )}

      {/* GOOGLE REVIEW LINK CARD SECTION */}
      <div className="bg-white border border-[#EAE4DC]/50 p-5 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center md:items-start gap-5 text-left">
        {/* QR Code Graphic Frame */}
        <div className="w-24 h-24 p-2 bg-white border border-[#EAE4DC]/70 rounded-xl shrink-0 flex items-center justify-center relative shadow-3xs select-none">
          <QrCode className="w-full h-full text-[#1C1814]" strokeWidth={1} />
          {/* Branded center eye node element */}
          <div className="absolute inset-0 m-auto w-5 h-5 bg-[#7553FF] border-2 border-white rounded-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-sm" />
          </div>
        </div>

        {/* Center link descriptor and controller */}
        <div className="flex-1 space-y-3.5 w-full">
          <div>
            <div className="flex items-center gap-2 text-[#7553FF]">
              <QrCode className="w-4 h-4 text-[#7553FF]" />
              <span className="font-sans font-black text-[14px]  tracking-wide">
                Google Review Link
              </span>
            </div>
            <p className="text-[14px] text-[#7C7267] font-semibold mt-1">
              Customers scan this code to start the selective review process.
            </p>
            <p className="text-[14px] text-rose-500 font-bold mt-0.5">
              Place this at your tables or checkout!
            </p>
          </div>

          {/* URL text line & Copy Button action */}
          <div className="flex items-center gap-2 max-w-2xl bg-neutral-50 p-1 rounded-xl border border-[#EAE4DC]/70">
            <span className="font-mono text-[14px] text-[#5C534C] px-3 py-1 truncate flex-1 font-medium bg-transparent border-0 select-all outline-none">
              https://gastrohub.namad.id.vn/review/019e3a94-da1b-7c64-b556-f4ac3d6507a
            </span>
            <button
              onClick={handleCopyLink}
              title="Copy URL"
              className="px-4 py-1.5 bg-white border border-[#EAE4DC] hover:bg-[#FAF9F7] text-[#1C1814] font-black text-[14px] rounded-lg transition shrink-0 cursor-pointer select-none"
            >
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* Download Solid command button */}
        <button
          onClick={handleDownloadQR}
          className="self-stretch md:self-start px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-black text-[14px] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition select-none shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>Download QR</span>
        </button>
      </div>

      {/* STATISTICS ROW OF 5 BENTO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card 1: Average rating */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Average Rating</span>
              <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-[#7553FF] text-[#7553FF]" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">4.6</h2>
            <div className="flex items-center gap-1.5 mt-4 pt-1">
              <span className="text-[14px] font-bold text-emerald-600">↑ 0.3</span>
              <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Reviews */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Total Reviews</span>
              <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-[#7553FF] fill-[#F0ECFF]" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">128</h2>
            <div className="flex items-center gap-1.5 mt-4 pt-1">
              <span className="text-[14px] font-bold text-emerald-600">↑ 18%</span>
              <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Positive Reviews */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Positive Reviews</span>
              <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                <Smile className="w-4 h-4 text-[#7553FF]" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">96%</h2>
            <div className="flex items-center gap-1.5 mt-4 pt-1">
              <span className="text-[14px] font-bold text-emerald-600">↑ 5%</span>
              <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Reviews */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Pending Reviews</span>
              <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#7553FF]" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">12</h2>
            <div className="flex items-center gap-1.5 mt-4 pt-1">
              <span className="text-[14px] font-bold text-[#7553FF]">↓ 8%</span>
              <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 5: Staff contributors */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Staff Contributors</span>
              <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-[#7553FF]" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">8</h2>
            <div className="flex items-center gap-1.5 mt-4 pt-1">
              <span className="text-[14px] font-bold text-emerald-600">↑ 2</span>
              <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR WITH TABS */}
      <div className="bg-white border border-[#EAE4DC]/75 p-4 rounded-[8px] shadow-3xs text-left flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 select-none">
        {/* Clickable tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-[#FAF9F7] border border-[#EAE4DC]/50 p-1 rounded-xl text-[14px] font-bold text-[#5C534C]">
          <button
            onClick={() => {
              setActiveTab("all");
              setSelectedRatingFilter("all");
              setSelectedPlatformFilter("all");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#7553FF] text-white font-bold shadow-sm"
                : "hover:bg-[#F0ECFF]/55 hover:text-[#7553FF] text-[#5C534C]"
            }`}
          >
            All Feedback
          </button>

          <button
            onClick={() => {
              setActiveTab("pending");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-[#7553FF] text-white font-bold shadow-sm"
                : "hover:bg-[#F0ECFF]/55 hover:text-[#7553FF] text-[#5C534C]"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => {
              setActiveTab("responded");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "responded"
                ? "bg-[#7553FF] text-white font-bold shadow-sm"
                : "hover:bg-[#F0ECFF]/55 hover:text-[#7553FF] text-[#5C534C]"
            }`}
          >
            Responded
          </button>

          <button
            onClick={() => {
              setActiveTab("leaderboard");
              showLocalToast(
                "Showing Staff Performance Leaderboard metric details",
              );
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "leaderboard"
                ? "bg-[#7553FF] text-white font-bold shadow-sm"
                : "hover:bg-[#F0ECFF]/55 hover:text-[#7553FF] text-[#5C534C]"
            }`}
          >
            Staff Leaderboard
          </button>
        </div>

        {/* Right side selectors from the image */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ratings filter */}
          <div className="relative font-bold">
            <select
              value={selectedRatingFilter}
              onChange={(e) => {
                setSelectedRatingFilter(e.target.value);
                showLocalToast(`Filtered to ratings: ${e.target.value}`);
              }}
              className="appearance-none bg-white border border-[#EAE4DC] hover:border-[#DCD2C7] rounded-lg pl-3 pr-8 py-2 text-[14px] font-bold text-[#5C534C] outline-none cursor-pointer focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars only</option>
              <option value="4">4 Stars & up</option>
              <option value="3">3 Stars & up</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C534C] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Platform filter */}
          <div className="relative font-bold">
            <select
              value={selectedPlatformFilter}
              onChange={(e) => {
                setSelectedPlatformFilter(e.target.value);
                showLocalToast(`Filtered to Platform: ${e.target.value}`);
              }}
              className="appearance-none bg-white border border-[#EAE4DC] hover:border-[#DCD2C7] rounded-lg pl-3 pr-8 py-2 text-[14px] font-bold text-[#5C534C] outline-none cursor-pointer focus:border-[#7553FF] focus:ring-4 focus:ring-[#7553FF]/15 transition-all"
            >
              <option value="all">All Platforms</option>
              <option value="gmb">Google Maps (Verified)</option>
              <option value="fb">Facebook Page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5C534C] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          <button
            onClick={() => {
              setSelectedRatingFilter("all");
              setSelectedPlatformFilter("all");
              setActiveTab("all");
              showLocalToast("Active filter reset completed");
            }}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#EAE4DC] hover:bg-[#FAF9F7] text-[14px] font-bold text-[#5C534C] rounded-xl transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {activeTab === "leaderboard" ? (
        /* STAFF LEADERBOARD MODE */
        <div className="bg-white border border-[#EAE4DC]/60 rounded-[8px] p-6 shadow-3xs text-left space-y-4">
          <div className="border-b border-[#EAE4DC]/40 pb-3">
            <h3 className="text-[14px] font-black text-[#1C1814]">
              Staff Review Contributions & Performance
            </h3>
            <p className="text-[14px] text-[#7C7267] mt-0.5 font-semibold">
              Active servers earning positive customer feedback awards on GMB
              registers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {[
              {
                rank: 1,
                name: "Minh Tuan",
                reviewsCount: 38,
                avgRating: "4.9",
                tipBonus: "$120.00",
              },
              {
                rank: 2,
                name: "Thu Thao",
                reviewsCount: 32,
                avgRating: "4.8",
                tipBonus: "$95.00",
              },
              {
                rank: 3,
                name: "Hoang Lam",
                reviewsCount: 29,
                avgRating: "4.7",
                tipBonus: "$80.00",
              },
              {
                rank: 4,
                name: "Quynh Chi",
                reviewsCount: 21,
                avgRating: "4.6",
                tipBonus: "$45.00",
              },
            ].map((staff) => (
              <div
                key={staff.rank}
                className="p-4 border border-[#EAE4DC]/50 bg-[#FAF9F7]/40 rounded-[8px] space-y-2 relative overflow-hidden"
              >
                <div className="absolute top-1 right-1 px-2 py-0.5 bg-[#F0ECFF] text-[#7553FF] text-[14px] font-black rounded-[2px] font-mono">
                  Rank #{staff.rank}
                </div>
                <div className="text-left">
                  <span className="font-bold text-[#1C1814] text-[14px] block font-sans">
                    {staff.name}
                  </span>
                  <span className="text-[14px] text-[#7C7267] font-semibold block mt-0.5">
                    Floor Service Associate
                  </span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-[#5C534C] font-semibold pt-1">
                  <span>Mentions</span>
                  <span className="font-bold text-[#1C1814]">
                    {staff.reviewsCount} reviews
                  </span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-[#5C534C] font-semibold">
                  <span>Rating</span>
                  <span className="font-mono text-amber-500 font-bold">
                    ★ {staff.avgRating} Stars
                  </span>
                </div>
                <div className="border-t border-[#EAE4DC]/50 pt-2 flex justify-between items-center text-[14px] text-[#5C534C]">
                  <span>Bonus tips</span>
                  <span className="font-black text-[#15803D] font-mono">
                    {staff.tipBonus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STANDARD REVIEW FEEDBACKS TABLE (EXACTLY MATCHES PICTURE LIST) */
        <div className="bg-white border border-slate-100 rounded-xl shadow-3xs overflow-hidden text-left">
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <table className="w-full min-w-[800px] border-collapse bg-white font-sans text-[14px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[14px] font-bold text-slate-700  tracking-wider font-display select-none">
                  <th className="px-4 py-4 text-left">Customer</th>
                  <th className="px-4 py-4 text-left">Rating</th>
                  <th className="px-4 py-4 text-left w-[350px]">Review</th>
                  <th className="px-4 py-4 text-left">Source</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-4 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px] text-slate-705">
                {filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center space-y-2 text-slate-700 bg-slate-50/10 font-medium select-none"
                    >
                      <Star className="w-8 h-8 text-slate-700/60 mx-auto stroke-1" />
                      <p>
                        No customer reviews match your active filtered state.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedRatingFilter("all");
                          setActiveTab("all");
                        }}
                        className="text-[14px] font-bold text-[#7553FF] underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map((row) => {
                    const isDraftOpen = replyRowId === row.id;

                    return (
                      <React.Fragment key={row.id}>
                        {/* Core Data Row */}
                        <tr className="hover:bg-slate-50/30 transition-all">
                          {/* 1. Customer Avatar + Name info */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full ${row.avatarColor} font-black text-[14px] flex items-center justify-center shrink-0`}
                              >
                                {row.initials}
                              </div>
                              <div className="text-left font-sans">
                                <span className="font-bold text-[#1C1814] block text-[14px] leading-tight">
                                  {row.customer}
                                </span>
                                <span className="text-[14px] text-[#7C7267] font-medium">
                                  {row.reviewCount} reviews
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* 2. Rating stars block */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex gap-0.5 select-none text-left">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < row.rating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-[#EAE4DC]"
                                  }`}
                                />
                              ))}
                            </div>
                          </td>

                          {/* 3. Review text comment line */}
                          <td className="px-4 py-3.5 text-[14px] text-[#5C534C] leading-relaxed max-w-[320px]">
                            <p className="line-clamp-2 md:line-clamp-none font-medium">
                              {row.reviewText}
                            </p>
                          </td>

                          {/* 4. Verified Source logo label */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 select-none">
                              {/* Simple Google multicolored text simulation */}
                              <span className="w-4 h-4 rounded-full bg-white border border-[#EAE4DC] flex items-center justify-center font-bold text-[14px] shadow-3xs text-[#7553FF]">
                                G
                              </span>
                              <span className="text-[14px] font-bold text-[#5C534C]">
                                {row.source}
                              </span>
                            </div>
                          </td>

                          {/* 5. Date formatting */}
                          <td className="px-4 py-3.5 whitespace-nowrap font-medium text-[#7C7267] text-[14px]">
                            {row.date}
                          </td>

                          {/* 6. Current Status Badge */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-[2px] text-[14px] font-normal border select-none  ${
                                row.status === "Responded"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : "bg-rose-50 text-rose-700 border-rose-100"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>

                          {/* 7. Action controllers */}
                          <td className="px-4 py-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Reply icon button */}
                              <button
                                onClick={() => {
                                  if (row.status === "Responded") {
                                    setCustomReplyText(row.responseDraft);
                                    setReplyRowId(
                                      row.id === replyRowId ? null : row.id,
                                    );
                                    showLocalToast(
                                      "Review has already been responded. Editing response draft...",
                                    );
                                  } else {
                                    handleTriggerAIDraft(
                                      row.id,
                                      row.customer,
                                      row.rating,
                                      row.reviewText,
                                    );
                                  }
                                }}
                                disabled={isGeneratingAI !== null}
                                title={
                                  row.status === "Responded"
                                    ? "View/Edit Response"
                                    : "Auto Generate Smart Reply"
                                }
                                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] hover:border-[#7553FF]/60 flex items-center justify-center text-[#5C534C] hover:text-[#7553FF] transition shadow-3xs cursor-pointer select-none"
                              >
                                {isGeneratingAI === row.id ? (
                                  <Sparkles className="w-4 h-4 text-[#7553FF] animate-spin" />
                                ) : (
                                  <MessageSquareQuote className="w-4 h-4" />
                                )}
                              </button>

                              {/* Three-dot modal toggle menu */}
                              <button
                                onClick={() =>
                                  showLocalToast(
                                    `Action menu loaded for customer feedback record #${row.id}`,
                                  )
                                }
                                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] flex items-center justify-center text-[#7C7267] hover:text-[#1C1814] transition shadow-3xs cursor-pointer select-none"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Response Draft Panel (Simulated dialog area) */}
                        {isDraftOpen && (
                          <tr className="bg-[#FAF9F7]/15">
                            <td
                              colSpan={7}
                              className="p-4 border-t border-[#EAE4DC]/50"
                            >
                              <div className="space-y-3 max-w-4xl mx-auto text-left py-1 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-[#7553FF]" />
                                    <span className="text-[14px] font-bold text-[#7553FF]  tracking-widest">
                                      AI-Generated Replying Engine Draft
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setReplyRowId(null)}
                                    className="p-1 text-[#7C7267] hover:bg-[#EAE4DC]/20 rounded-full transition cursor-pointer font-bold"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <textarea
                                  value={customReplyText}
                                  onChange={(e) =>
                                    setCustomReplyText(e.target.value)
                                  }
                                  className="w-full text-[14px] p-3.5 border border-[#EAE4DC] hover:border-[#DCD2C7] bg-white focus:border-[#7553FF] rounded-lg leading-relaxed font-semibold outline-none text-[#1C1814] focus:ring-4 focus:ring-[#7553FF]/15 transition-all shadow-3xs"
                                  rows={3}
                                  placeholder="Review booster reply message text..."
                                />

                                <div className="flex items-center justify-between gap-3 pt-1">
                                  <span className="text-[14px] text-[#7C7267] font-semibold">
                                    This response will be synced to Google Maps
                                    instantly.
                                  </span>

                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setReplyRowId(null);
                                        setCustomReplyText("");
                                        showLocalToast(
                                          "Response drafting dropped.",
                                        );
                                      }}
                                      className="px-4 py-1.5 border border-[#EAE4DC] hover:bg-[#FAF9F7] text-[14px] font-bold text-[#5C534C] rounded-lg transition cursor-pointer"
                                    >
                                      Discard
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handlePublishResponse(row.id)
                                      }
                                      className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-lg shadow-sm transition cursor-pointer"
                                    >
                                      Publish Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE BOTTOM PAGINATION LAYOUT GRID (MATCHES MOCK PIC EXACTLY) */}
          <div className="bg-white border-t border-[#EAE4DC]/50 p-4.5 flex flex-col sm:flex-row items-center justify-between gap-3.5 select-none">
            <span className="text-[14px] font-black text-[#7C7267]">
              Showing 1 to 5 of 128 reviews
            </span>

            {/* Pagination buttons inline */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  showLocalToast("Viewing premium feedback start list segment");
                }}
                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] flex items-center justify-center text-[#5C534C] transition cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4 text-[#7C7267]" />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-8 h-8 rounded-lg text-[14px] font-black transition cursor-pointer ${
                  currentPage === 1
                    ? "bg-[#F0ECFF] border border-[#FAF9F7]/70 text-[#7553FF] font-extrabold"
                    : "border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] text-[#5C534C]"
                }`}
              >
                1
              </button>

              <button
                onClick={() => {
                  setCurrentPage(2);
                  showLocalToast("Navigating to feedback list page #2");
                }}
                className={`w-8 h-8 rounded-lg text-[14px] font-black transition cursor-pointer ${
                  currentPage === 2
                    ? "bg-[#F0ECFF] border border-[#FAF9F7]/70 text-[#7553FF] font-extrabold"
                    : "border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] text-[#5C534C]"
                }`}
              >
                2
              </button>

              <button
                onClick={() => {
                  setCurrentPage(3);
                  showLocalToast("Navigating to feedback list page #3");
                }}
                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] text-[14px] font-black text-[#5C534C] transition cursor-pointer"
              >
                3
              </button>

              <span className="px-1.5 text-[14px] text-[#7C7267] font-bold select-none cursor-default font-mono">
                ...
              </span>

              <button
                onClick={() => {
                  setCurrentPage(26);
                  showLocalToast(
                    "Navigating to final check list feedback segment page #26",
                  );
                }}
                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] text-[14px] font-black text-[#5C534C] transition font-mono cursor-pointer"
              >
                26
              </button>

              <button
                onClick={() => {
                  setCurrentPage(2);
                  showLocalToast("Navigating to feedback page #2 list segment");
                }}
                className="w-8 h-8 rounded-lg border border-[#EAE4DC] bg-white hover:bg-[#FAF9F7] flex items-center justify-center text-[#5C534C] transition cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4 text-[#7C7267]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 10. MARKETING SETTING VIEW
// ============================================================================
export function MarketingSettingView() {
  const [discountPercent, setDiscountPercent] = useState(15);
  const [triggerSMS, setTriggerSMS] = useState(true);
  const [autoCouponToken, setAutoCouponToken] = useState("SUMMERGUSTO");
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814]">
            Marketing Campaign & Code Engine
          </h1>
          <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1">
            Calibrate automated coupon trigger thresholds, set baseline discount
            parameters, and audit merchant communication triggers.
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="text-sm font-bold text-[#1C1814] border-b border-[#1C1814]/5 pb-3">
            Automated Triggers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1C1814]/50 tracking-wide">
                Standard Discount Percent
              </label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full text-sm p-2.5 border border-[#1C1814]/10 rounded-xl font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#1C1814]/50 tracking-wide">
                Loyal Coupon Token
              </label>
              <input
                type="text"
                value={autoCouponToken}
                onChange={(e) => setAutoCouponToken(e.target.value)}
                className="w-full text-sm p-2.5 border border-[#1C1814]/10 rounded-xl font-mono"
                required
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={triggerSMS}
                onChange={(e) => setTriggerSMS(e.target.checked)}
                className="mt-1 accent-[#7553FF]"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Deliver SMS Alerts to active diner loyalty base
                </span>
                <span className="text-[14px] text-[#1C1814]/50 leading-relaxed block font-sans">
                  Instantly sends text notifications containing current coupons
                  scheduled 1 hour before dining peak hours.
                </span>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-[#1C1814]/5">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#7553FF]/90 text-white font-bold text-xs rounded-xl transition-all cursor-pointer h-11"
            >
              Save Campaign Rules
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl animate-fadeIn">
            ✓ Marketing Campaign configurations saved successfully and applied
            across online client rosters.
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 11. SOCIAL ACCOUNT VIEW
// ============================================================================
export function SocialAccountView() {
  const [states, setStates] = useState({
    facebook: true,
    instagram: true,
    google: false,
    tripadvisor: true,
  });

  const toggleSocial = (key: keyof typeof states) => {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 w-full font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814]">
            API Integrations & Social Keys
          </h1>
          <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1">
            Sync credentials and configure authorization rules for third-party
            client networks.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Facebook */}
        <div className="p-5 bg-white border border-[#1C1814]/5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Facebook className="w-5 h-5 fill-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Facebook Page Integration
              </p>
              <p className="text-[14px] text-[#1C1814]/50">
                Authorized: GastroHub - Trang Tien (Merchant API v2)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-[14px] font-light px-2 py-0.5 rounded-full ${states.facebook ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
            >
              {states.facebook ? "CONNECTED" : "DISCONNECTED"}
            </span>
            <button
              onClick={() => toggleSocial("facebook")}
              className="px-3 py-1.5 border border-[#1C1814]/10 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              {states.facebook ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>

        {/* Instagram */}
        <div className="p-5 bg-white border border-[#1C1814]/5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Instagram Profile Sync
              </p>
              <p className="text-[14px] text-[#1C1814]/50">
                Authorized: @gastrohub.hanoi (Digital Media API)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-[14px] font-light px-2 py-0.5 rounded-full ${states.instagram ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
            >
              {states.instagram ? "CONNECTED" : "DISCONNECTED"}
            </span>
            <button
              onClick={() => toggleSocial("instagram")}
              className="px-3 py-1.5 border border-[#1C1814]/10 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              {states.instagram ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>

        {/* Google Business Profile */}
        <div className="p-5 bg-white border border-[#1C1814]/5 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7553FF]/5 text-[#7553FF] flex items-center justify-center border border-[#7553FF]/10">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Google Business Profile Listing
              </p>
              <p className="text-[14px] text-[#1C1814]/50">
                Verify maps placement authority and post reviews replies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-[14px] font-light px-2 py-0.5 rounded-full ${states.google ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
            >
              {states.google ? "CONNECTED" : "DISCONNECTED"}
            </span>
            <button
              onClick={() => toggleSocial("google")}
              className="px-3 py-1.5 border border-[#1C1814]/10 rounded-lg text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              {states.google ? "Disconnect" : "Connect"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 12. ADMIN APPROVAL VIEW
// ============================================================================
export function AdminApprovalView() {
  const [requests, setRequests] = useState([
    {
      id: "1",
      name: "Alex Nguyen",
      category: "Shift Swap Request",
      date: "June 05, Morning",
      desc: "Wishes to swap Friday breakfast slot with Pham Minh Hoang due to relative transit issues.",
      status: "Pending",
    },
    {
      id: "2",
      name: "Le Tran Duc",
      category: "Overtime Claim",
      date: "May Payroll Period",
      desc: "Claims 4.5 OT hours for coordinating the grand banquets on Saturday night beef surge.",
      status: "Pending",
    },
  ]);

  const handleAction = (id: string, action: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, status: action };
        }
        return r;
      }),
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814]">
            Admin Request Approvals Drawer
          </h1>
          <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1">
            Review employee shift modifications, holiday claims, and custom
            overtime logs before computing finalized balances.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-2 max-w-xl text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">
                  {r.name}
                </span>
                <span className="text-[14px] bg-[#7553FF]/10 text-[#7553FF] px-2 py-0.5 rounded-[2px] font-mono font-bold ">
                  {r.category}
                </span>
              </div>
              <p className="text-xs text-[#1C1814]/50 font-mono italic">
                Date Segment: {r.date}
              </p>
              <p className="text-[14px] text-[#1C1814]/85 leading-relaxed font-sans font-medium">
                "{r.desc}"
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
              {r.status === "Pending" ? (
                <>
                  <button
                    onClick={() => handleAction(r.id, "Approved")}
                    className="px-4 py-2 bg-[#7553FF] hover:bg-[#7553FF]/90 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(r.id, "Rejected")}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <span
                  className={`text-[14px] font-bold px-3 py-1 rounded-[2px] ${
                    r.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {r.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 13. CATERING INQUIRIES VIEW (Coming Soon Tools)
// ============================================================================
export function CateringInquiriesView() {
  const [email, setEmail] = useState("thanhsangtao0201@gmail.com");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
    }, 850);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-16 px-4 font-sans select-none" id="catering-coming-soon-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl bg-white border border-[#EAE4DC] shadow-xl rounded-3xl p-8 md:p-12 text-center space-y-8 relative overflow-hidden"
      >
        {/* Abstract beautiful mesh background decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#7553FF]/20" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7553FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Central Icon Illustration */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-[#7553FF]/10 text-[#7553FF] rounded-2xl flex items-center justify-center relative z-10">
              <PartyPopper className="w-10 h-10 animate-bounce" strokeWidth={1.5} />
            </div>
            {/* Pulsing rings in background */}
            <div className="absolute inset-0 bg-[#7553FF]/10 rounded-2xl animate-ping scale-110 opacity-70 pointer-events-none" />
            <div className="absolute inset-0 bg-[#7553FF]/5 rounded-2xl scale-125 opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* Typography Content */}
        <div className="space-y-4">
          <span className="inline-block text-[12px] font-extrabold  tracking-widest text-[#7553FF] bg-[#7553FF]/10 px-3 py-1 rounded-full">
            Coming Soon • Feature Development
          </span>
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1C1814] leading-tight">
            Catering & Banquet Inquiries is Coming Soon!
          </h1>
          <p className="text-[15px] text-slate-700 leading-relaxed font-normal max-w-lg mx-auto">
            We are putting the final touches on an amazing tool to help you seamlessly manage and quote large party & catering requests. Stay tuned!
          </p>
        </div>

        {/* Interactive Subscription Form/State */}
        <div className="max-w-md mx-auto pt-2">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleNotifyMe}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 py-2.5 bg-slate-50 border border-[#EAE4DC] hover:border-[#7553FF]/30 focus:border-[#7553FF] focus:outline-none focus:ring-4 focus:ring-[#7553FF]/10 rounded-xl text-slate-800 text-[14px] font-normal transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-6 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#7553FF]/20 cursor-pointer border-none text-[14px] shrink-0 disabled:opacity-75"
                  >
                    <span>{isSubmitting ? "Registering..." : "Notify Me When It's Ready"}</span>
                  </button>
                </div>
                <p className="text-[13px] text-slate-700 font-normal">
                  We will keep you updated. No spam, premium releases only.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="subscribe-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <span className="text-[18px] font-bold">✓</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[15px] font-bold text-emerald-900">Successfully Subscribed!</h4>
                  <p className="text-[14px] text-emerald-700 font-normal leading-relaxed">
                    Awesome! We have registered <span className="font-semibold">{email}</span>. We will notify you when Catering & Banquet Inquiries launches!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


      </motion.div>
    </div>
  );
}
