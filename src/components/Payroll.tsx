/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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
  Plus,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Users,
  Clock,
  TrendingUp,
  FileText,
  HelpCircle,
  Check,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StaffPayroll {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  hours: number;
  hasOT: boolean;
  otHours: number;
  rateType: 'Hourly' | 'Salary';
  rate: number;
  rateText: string;
  grossPay: number;
  deductions: number;
  netPay: number;
}

export default function Payroll() {
  // 8 staff items in the mockup
  const [staffData, setStaffData] = useState<StaffPayroll[]>([
    {
      id: "staff-1",
      name: "Le Chi",
      role: "Sales",
      department: "Service",
      location: "HQ",
      hours: 40.00,
      hasOT: false,
      otHours: 0,
      rateType: "Hourly",
      rate: 22.00,
      rateText: "$22.00",
      grossPay: 880.00,
      deductions: 66.00,
      netPay: 814.00,
    },
    {
      id: "staff-2",
      name: "Tran Binh",
      role: "HR",
      department: "Management",
      location: "HQ",
      hours: 38.50,
      hasOT: false,
      otHours: 0,
      rateType: "Hourly",
      rate: 25.00,
      rateText: "$25.00",
      grossPay: 962.50,
      deductions: 72.19,
      netPay: 890.31,
    },
    {
      id: "staff-3",
      name: "Pham Dung",
      role: "Operation",
      department: "Kitchen",
      location: "HQ",
      hours: 45.25,
      hasOT: true,
      otHours: 5.25,
      rateType: "Hourly",
      rate: 20.00,
      rateText: "$20.00",
      grossPay: 1005.00,
      deductions: 75.38,
      netPay: 929.62,
    },
    {
      id: "staff-4",
      name: "Hoang Em",
      role: "Kitchen",
      department: "Kitchen",
      location: "Kitchen Area",
      hours: 40.00,
      hasOT: false,
      otHours: 0,
      rateType: "Hourly",
      rate: 18.00,
      rateText: "$18.00",
      grossPay: 720.00,
      deductions: 54.00,
      netPay: 666.00,
    },
    {
      id: "staff-5",
      name: "Vu Giang",
      role: "Bar",
      department: "Bar",
      location: "HQ",
      hours: 42.00,
      hasOT: true,
      otHours: 2.00,
      rateType: "Hourly",
      rate: 19.00,
      rateText: "$19.00",
      grossPay: 835.00,
      deductions: 62.63,
      netPay: 772.37,
    },
    {
      id: "staff-6",
      name: "Phan Linh",
      role: "Service",
      department: "Service",
      location: "Front Desk",
      hours: 38.00,
      hasOT: false,
      otHours: 0,
      rateType: "Hourly",
      rate: 18.50,
      rateText: "$18.50",
      grossPay: 703.00,
      deductions: 52.73,
      netPay: 650.27,
    },
    {
      id: "staff-7",
      name: "Dang Khoa",
      role: "Operation",
      department: "Kitchen",
      location: "Kitchen Area",
      hours: 44.50,
      hasOT: true,
      otHours: 4.50,
      rateType: "Hourly",
      rate: 20.00,
      rateText: "$20.00",
      grossPay: 980.00,
      deductions: 73.50,
      netPay: 906.50,
    },
    {
      id: "staff-8",
      name: "Bui Thuy",
      role: "HR",
      department: "Management",
      location: "HQ",
      hours: 36.00,
      hasOT: false,
      otHours: 0,
      rateType: "Salary",
      rate: 900.00,
      rateText: "$900.00 /week",
      grossPay: 900.00,
      deductions: 67.50,
      netPay: 832.50,
    },
  ]);

  // Filters State
  const [selectedPeriod, setSelectedPeriod] = useState("May 12 – May 18, 2024");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("All Employment Types");
  const [searchQuery, setSearchQuery] = useState("");

  const [activeTab, setActiveTab] = useState<"summary" | "payments" | "history">("summary");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);
  
  // Interactive UI elements
  const [activeEmployee, setActiveEmployee] = useState<StaffPayroll | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffPayroll | null>(null);
  const [payrollStatus, setPayrollStatus] = useState<"Draft" | "Processed">("Draft");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter Data
  const filteredStaff = staffData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === "All Departments" || item.department === selectedDepartment;
    const matchesLoc = selectedLocation === "All Locations" || item.location === selectedLocation;
    const matchesType = selectedEmploymentType === "All Employment Types" || item.rateType === selectedEmploymentType;
    return matchesSearch && matchesDept && matchesLoc && matchesType;
  });

  // KPI calculations based on current table data
  const totalPayrollCost = filteredStaff.reduce((sum, item) => sum + item.netPay, 0);
  const totalEmployees = filteredStaff.length;
  const totalHours = filteredStaff.reduce((sum, item) => sum + item.hours, 0);
  const avgHourlyRate = totalEmployees === 0 ? 0 : filteredStaff.reduce((sum, item) => {
    if (item.rateType === "Salary") return sum + 25.00; // estimated fallback for salary avg
    return sum + item.rate;
  }, 0) / totalEmployees;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(filteredStaff.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleDeleteStaff = (id: string) => {
    setStaffData((prev) => prev.filter((item) => item.id !== id));
    setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    setActiveActionMenuId(null);
  };

  const handleEditStaffClick = (staff: StaffPayroll) => {
    setEditingStaff({ ...staff });
    setIsEditModalOpen(true);
    setActiveActionMenuId(null);
  };

  const handleSaveEdit = () => {
    if (editingStaff) {
      setStaffData((prev) =>
        prev.map((item) => {
          if (item.id === editingStaff.id) {
            // calculate gross and net
            let gross = editingStaff.hours * editingStaff.rate;
            if (editingStaff.rateType === "Salary") {
              gross = editingStaff.rate;
            }
            const deductions = gross * 0.075; // dynamic deduction rate 7.5%
            const net = gross - deductions;
            return {
              ...editingStaff,
              grossPay: parseFloat(gross.toFixed(2)),
              deductions: parseFloat(deductions.toFixed(2)),
              netPay: parseFloat(net.toFixed(2)),
            };
          }
          return item;
        })
      );
      setIsEditModalOpen(false);
      setEditingStaff(null);
    }
  };

  const handleRunPayrollSubmit = () => {
    setPayrollStatus("Processed");
    setIsSubmitModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-[1300px] mx-auto pb-16 font-sans text-left">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 select-none">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight font-display">
            Payroll
          </h1>
          <p className="text-sm text-slate-700 mt-1 font-normal">
            Process payroll, manage payments and view payroll history.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert("Excel file containing current payroll summary with 32 staff records has been downloaded successfully!")}
            className="px-4 py-2 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-3xs"
          >
            <FileDown className="w-4 h-4 text-slate-700" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-3xs hover:-translate-y-px"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Run Payroll</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Payroll Cost */}
        <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex items-center gap-4 hover:shadow-card_hover shadow-card transition-all">
          <div className="w-12 h-12 rounded-md bg-[#F5F3FF] flex items-center justify-center text-[#7553FF] shrink-0 border border-purple-100/50">
            <FileText className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider">Total Payroll Cost</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-700 cursor-pointer" title="Sum of all net payouts for this period" />
            </div>
            <p className="text-xl font-bold text-[#1C1814] mt-1 font-sans">
              ${totalPayrollCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-700 mt-0.5 font-normal">May 12 – May 18, 2024</p>
          </div>
        </div>

        {/* Total Employees */}
        <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex items-center gap-4 hover:shadow-card_hover shadow-card transition-all">
          <div className="w-12 h-12 rounded-md bg-[#EEFDF4] flex items-center justify-center text-[#15803D] shrink-0 border border-emerald-100">
            <Users className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider">Total Employees</span>
            <p className="text-xl font-bold text-[#1C1814] mt-1 font-sans">
              {totalEmployees}
            </p>
            <p className="text-xs text-slate-700 mt-0.5 font-normal">Active employees</p>
          </div>
        </div>

        {/* Total Hours */}
        <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex items-center gap-4 hover:shadow-card_hover shadow-card transition-all">
          <div className="w-12 h-12 rounded-md bg-[#EFF6FF] flex items-center justify-center text-[#1D4ED8] shrink-0 border border-blue-100">
            <Clock className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider">Total Hours</span>
            <p className="text-xl font-bold text-[#1C1814] mt-1 font-sans">
              {totalHours.toFixed(2)}h
            </p>
            <p className="text-xs text-slate-700 mt-0.5 font-normal">All hours</p>
          </div>
        </div>

        {/* Average Hourly Rate */}
        <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex items-center gap-4 hover:shadow-card_hover shadow-card transition-all">
          <div className="w-12 h-12 rounded-md bg-[#FFFBEB] flex items-center justify-center text-[#B45309] shrink-0 border border-amber-100">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider">Average Hourly Rate</span>
            <p className="text-xl font-bold text-[#1C1814] mt-1 font-sans">
              ${avgHourlyRate.toFixed(2)}
            </p>
            <p className="text-xs text-slate-700 mt-0.5 font-normal">Across all employees</p>
          </div>
        </div>

        {/* Payroll Status */}
        <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex items-center gap-4 hover:shadow-card_hover shadow-card transition-all">
          <div className="w-12 h-12 rounded-md bg-[#FEF2F2] flex items-center justify-center text-[#B91C1C] shrink-0 border border-rose-100">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <span className="text-xs text-slate-700 font-semibold uppercase tracking-wider block">Payroll Status</span>
            <div className="mt-1.5 flex items-center">
              {payrollStatus === "Draft" ? (
                <span className="inline-flex items-center gap-1.5 bg-[#FAF9F7] text-slate-650 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block shrink-0" />
                  Draft
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-[#EEFDF4] text-[#15803D] px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border border-emerald-200 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block shrink-0" />
                  Approved
                </span>
              )}
            </div>
            <p className="text-xs text-slate-700 mt-1 font-normal">
              {payrollStatus === "Draft" ? "Not submitted" : "Processed & Disbursed"}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Action Filter Row */}
      <div className="bg-white border border-[#EAE4DC] rounded-lg p-5 flex flex-col gap-4 select-none shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Calendar Selector */}
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-700 absolute left-3 top-3 pointer-events-none" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-8 font-sans text-[14px] font-semibold text-slate-700 focus:outline-none focus:border-[#7553FF] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20opacity%3D%220.8%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_10px_center] bg-no-repeat w-[260px]"
              >
                <option value="May 12 – May 18, 2024">May 12 – May 18, 2024</option>
                <option value="May 05 – May 11, 2024">May 05 – May 11, 2024</option>
                <option value="Apr 28 – May 04, 2024">Apr 28 – May 04, 2024</option>
              </select>
            </div>

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-2 px-3.5 font-sans text-[14px] font-semibold text-slate-700 focus:outline-none focus:border-[#7553FF] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20opacity%3D%220.8%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_10px_center] bg-no-repeat pr-8 w-[180px]"
            >
              <option value="All Departments">All Departments</option>
              <option value="Service">Service</option>
              <option value="Management">Management</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bar">Bar</option>
            </select>

            {/* Location Filter */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-2 px-3.5 font-sans text-[14px] font-semibold text-slate-700 focus:outline-none focus:border-[#7553FF] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20opacity%3D%220.8%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_10px_center] bg-no-repeat pr-8 w-[180px]"
            >
              <option value="All Locations">All Locations</option>
              <option value="HQ">HQ</option>
              <option value="Kitchen Area">Kitchen Area</option>
              <option value="Front Desk">Front Desk</option>
            </select>

            {/* Employment Types */}
            <select
              value={selectedEmploymentType}
              onChange={(e) => setSelectedEmploymentType(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl py-2 px-3.5 font-sans text-[14px] font-semibold text-slate-700 focus:outline-none focus:border-[#7553FF] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20opacity%3D%220.8%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_10px_center] bg-no-repeat pr-8 w-[210px]"
            >
              <option value="All Employment Types">All Employment Types</option>
              <option value="Hourly">Hourly</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 text-slate-700 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search staff by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 font-sans text-[14px] focus:outline-none focus:border-[#7553FF] text-slate-755"
              />
            </div>
            <button
              onClick={() => {
                setSelectedDepartment("All Departments");
                setSelectedLocation("All Locations");
                setSelectedEmploymentType("All Employment Types");
                setSearchQuery("");
                alert("Filters reset to default!");
              }}
              className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-3xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs segment */}
      <div className="border-b border-slate-100 flex gap-6 text-[14px] font-semibold font-sans mt-8 select-none">
        <button
          onClick={() => setActiveTab("summary")}
          className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${
            activeTab === "summary"
              ? "border-[#7553FF] text-[#7553FF] font-bold"
              : "border-transparent text-slate-700 hover:text-slate-600"
          }`}
        >
          Payroll Summary
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${
            activeTab === "payments"
              ? "border-[#7553FF] text-[#7553FF] font-bold"
              : "border-transparent text-slate-700 hover:text-slate-600"
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-2.5 px-1 border-b-2 transition-all cursor-pointer ${
            activeTab === "history"
              ? "border-[#7553FF] text-[#7553FF] font-bold"
              : "border-transparent text-slate-700 hover:text-slate-600"
          }`}
        >
          Payroll History
        </button>
      </div>

      {/* 4. MAIN CONTENT TABS */}
      <AnimatePresence mode="wait">
        {activeTab === "summary" && (
          <motion.div
            key="summary-view"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-4"
          >
            {/* Sub header for active payroll summary status */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-3 select-none">
              <div className="text-left">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Payroll Summary
                  </h2>
                  <span className="bg-[#EEF2FF] text-[#5B39E3] text-xs px-2.5 py-0.5 rounded-full font-semibold select-none border border-[#DDD6FE]">
                    Draft
                  </span>
                </div>
                <p className="text-[13px] text-slate-700 mt-1 font-normal">
                  Review and confirm payroll before submitting.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 font-sans text-[14px]">
                <span className="text-slate-700 font-medium">
                  Pay Period: May 12 – May 18, 2024
                </span>
                <button
                  onClick={() => {
                    if (filteredStaff.length > 0) {
                      setActiveEmployee(filteredStaff[0]);
                    } else {
                      alert("No staff in the list!");
                    }
                  }}
                  className="px-4 py-2 border border-[#7553FF]/20 hover:border-[#7553FF] text-[#7553FF] hover:bg-[#F5F3FF] rounded-xl text-[14px] font-semibold transition-all flex items-center gap-2 cursor-pointer bg-white"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Payslip</span>
                </button>
              </div>
            </div>

            {/* MAIN TABLE */}
            <div className="bg-white border border-[#EAE4DC] rounded-lg overflow-hidden shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#FAF9F7]/40 text-[13px] font-semibold text-slate-700 uppercase tracking-wider select-none">
                      <th className="px-5 py-4 text-left w-12">
                        <input
                          type="checkbox"
                          checked={filteredStaff.length > 0 && selectedRows.length === filteredStaff.length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#7553FF] focus:ring-[#7553FF] cursor-pointer"
                        />
                      </th>
                      <th className="px-5 py-4 text-left font-sans text-[13px]">Staff</th>
                      <th className="px-4 py-4 text-left font-sans text-[13px]">Department</th>
                      <th className="px-4 py-4 text-left font-sans text-[13px]">Location</th>
                      <th className="px-4 py-4 text-center font-sans text-[13px]">Hours</th>
                      <th className="px-4 py-4 text-left font-sans text-[13px]">Rate Type</th>
                      <th className="px-4 py-4 text-right font-sans text-[13px]">Rate</th>
                      <th className="px-4 py-4 text-right font-sans text-[13px]">Gross Pay</th>
                      <th className="px-4 py-4 text-right font-sans text-[13px]">Deductions</th>
                      <th className="px-5 py-4 text-center font-sans text-[13px]">Net Pay</th>
                      <th className="px-5 py-4 text-center font-sans text-[13px] w-14"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[14px] text-slate-600 font-sans">
                    {filteredStaff.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="py-12 text-center text-slate-700 font-normal">
                          <AlertTriangle className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                          <p>No payroll records found matching the active filters.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredStaff.map((record) => {
                        const isChecked = selectedRows.includes(record.id);
                        const photo = avatars[record.name];
                        const initials = record.name.split(" ").map(n => n[0]).join("");

                        return (
                          <tr
                            key={record.id}
                            className={`hover:bg-slate-50/20 transition-all font-sans ${
                              isChecked ? "bg-indigo-50/10" : ""
                            }`}
                          >
                            <td className="py-4 px-5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => handleToggleRow(record.id, e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-[#7553FF] focus:ring-[#7553FF] cursor-pointer"
                              />
                            </td>
                            {/* Staff Info */}
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
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wide uppercase shrink-0 ${nameColors[record.name] || 'bg-slate-150 text-slate-605'}`}>
                                    {initials}
                                  </div>
                                )}
                                <div className="text-left leading-tight">
                                  <span className="font-semibold text-slate-800 block text-[14px]">
                                    {record.name}
                                  </span>
                                  <span className="text-xs text-slate-700 font-normal mt-0.5 block">
                                    {record.role}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Department */}
                            <td className="py-4 px-4 text-left text-slate-700 font-normal text-[14px]">
                              {record.department}
                            </td>

                            {/* Location */}
                            <td className="py-4 px-4 text-left text-slate-600 font-normal text-[14px]">
                              {record.location}
                            </td>

                            {/* Hours Worked */}
                            <td className="py-4 px-4 text-center leading-tight">
                              <span className="font-semibold text-slate-800 text-[14px]">
                                {record.hours.toFixed(2)}
                              </span>
                              {record.hasOT && (
                                <span className="text-[#7553FF] text-[11px] font-semibold mt-0.5 block bg-[#F0ECFF] rounded px-1.5 py-0.5 w-fit mx-auto select-none">
                                  OT {record.otHours.toFixed(2)}h
                                </span>
                              )}
                            </td>

                            {/* Rate Type */}
                            <td className="py-4 px-4 text-left">
                              <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-md ${
                                record.rateType === "Salary"
                                  ? "bg-purple-50 text-purple-700 border border-purple-100"
                                  : "bg-blue-50 text-blue-700 border border-blue-100"
                              }`}>
                                {record.rateType}
                              </span>
                            </td>

                            {/* Rate */}
                            <td className="py-4 px-4 text-right font-semibold text-slate-800 text-[14px] whitespace-pre-line">
                              {record.rateType === "Salary" ? `$${record.rate.toFixed(2)} /week` : `$${record.rate.toFixed(2)}`}
                            </td>

                            {/* Gross Pay */}
                            <td className="py-4 px-4 text-right font-semibold text-slate-800 text-[14px]">
                              ${record.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Deductions */}
                            <td className="py-4 px-4 text-right text-slate-700 font-normal text-[14px]">
                              ${record.deductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </td>

                            {/* Net Pay (The premium green bg tag!) */}
                            <td className="py-4 px-5 text-center whitespace-nowrap">
                              <span className="inline-block bg-[#F0FDF4] text-[#166534] text-[14px] font-bold px-4 py-1.5 rounded-xl text-center min-w-[95px]">
                                ${record.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </span>
                            </td>

                            {/* Options action dots */}
                            <td className="py-4 px-5 text-center relative">
                              <button
                                onClick={() => setActiveActionMenuId(activeActionMenuId === record.id ? null : record.id)}
                                className="w-8 h-8 rounded-full border border-transparent hover:border-slate-200 text-slate-700 hover:text-slate-800 transition-all flex items-center justify-center cursor-pointer"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {/* Dropdown Action menu details */}
                              {activeActionMenuId === record.id && (
                                <>
                                  <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setActiveActionMenuId(null)}
                                  />
                                  <div className="absolute right-4 top-10 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 py-1.5 text-left text-[14px] text-slate-700">
                                    <button
                                      onClick={() => handleEditStaffClick(record)}
                                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                                    >
                                      <span>⚙ Edit Rates</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setActiveEmployee(record);
                                        setActiveActionMenuId(null);
                                      }}
                                      className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-[#7553FF]"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>View Payslip</span>
                                    </button>
                                    <div className="h-px bg-slate-100 my-1" />
                                    <button
                                      onClick={() => handleDeleteStaff(record.id)}
                                      className="w-full px-3.5 py-2 text-left hover:bg-rose-50 text-[#B91C1C] font-semibold flex items-center gap-2 transition-colors"
                                    >
                                      <span>✕ Remove</span>
                                    </button>
                                  </div>
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

              {/* Table pagination footer */}
              <div className="border-t border-slate-100 py-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 select-none bg-[#FAF9F7]/10">
                <div className="flex items-center gap-2.5 font-sans text-[14px] text-slate-700">
                  <span>Show</span>
                  <select className="border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold focus:outline-none">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span>per page</span>
                </div>

                <div className="flex items-center gap-4 text-[14px]">
                  <span className="text-slate-700 font-medium">1 – 8 of 32</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all cursor-pointer">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 bg-[#F0ECFF] text-[#7553FF] font-bold rounded-lg border border-[#DDD6FE] text-xs">
                      1
                    </button>
                    <button className="px-3 py-1 hover:bg-slate-50 text-slate-700 rounded-lg text-xs" onClick={() => alert("Moving to page 2...")}>
                      2
                    </button>
                    <button className="px-3 py-1 hover:bg-slate-50 text-slate-700 rounded-lg text-xs" onClick={() => alert("Moving to page 3...")}>
                      3
                    </button>
                    <button className="px-3 py-1 hover:bg-slate-50 text-slate-700 rounded-lg text-xs" onClick={() => alert("Moving to page 4...")}>
                      4
                    </button>
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all cursor-pointer" onClick={() => alert("Moving to next page...")}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "payments" && (
          <motion.div
            key="payments-view"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-4 text-left"
          >
            <div className="bg-white border border-[#EAE4DC] rounded-lg p-6 shadow-card">
              <h2 className="text-lg font-bold text-slate-800">Direct Bank Payouts</h2>
              <p className="text-sm text-slate-700 mt-1">Beneficiary list and transaction status synchronized for this period.</p>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#FAF9F7]/40 text-[13px] font-semibold text-slate-700 uppercase tracking-wider select-none text-left">
                      <th className="py-4 px-4 font-sans">Payment Ref</th>
                      <th className="py-4 px-4 font-sans">Staff Beneficiary</th>
                      <th className="py-4 px-4 font-sans">Bank Branch</th>
                      <th className="py-4 px-4 font-sans">Account No.</th>
                      <th className="py-4 px-4 text-right font-sans">Gross Amount</th>
                      <th className="py-4 px-4 text-center font-sans">Direct Transfer Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[14px] text-slate-700 font-sans">
                    {[
                      { ref: "PMT-876251", name: "Le Chi", bank: "Techcombank Ho Chi Minh", acc: "1902847551029", amount: 880.00, status: "SUCCESS" },
                      { ref: "PMT-876252", name: "Tran Binh", bank: "Vietcombank Ha Noi", acc: "1002947118274", amount: 962.50, status: "SUCCESS" },
                      { ref: "PMT-876253", name: "Pham Dung", bank: "MB Bank Da Nang", acc: "982736410293", amount: 1005.00, status: "SUCCESS" },
                      { ref: "PMT-876254", name: "Hoang Em", bank: "Sacombank Nha Trang", acc: "060281940591", amount: 720.00, status: "SUCCESS" },
                      { ref: "PMT-876255", name: "Vu Giang", bank: "ACB Bank Can Tho", acc: "1029475103", amount: 835.00, status: "PENDING" },
                    ].map((tx) => (
                      <tr key={tx.ref} className="hover:bg-slate-50/10">
                        <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">{tx.ref}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{tx.name}</td>
                        <td className="py-3.5 px-4 text-slate-600">{tx.bank}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-550">{tx.acc}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-800">${tx.amount.toFixed(2)}</td>
                        <td className="py-3.5 px-4 text-center">
                          {tx.status === "SUCCESS" ? (
                            <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7] px-2.5 py-0.5 rounded-full text-xs font-semibold select-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block shrink-0" />
                              SUCCESS
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-[#FFFBEB] text-[#92400E] border border-[#FEF3C7] px-2.5 py-0.5 rounded-full text-xs font-semibold select-none animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block shrink-0" />
                              PROCESSING
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            key="history-view"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="space-y-4 text-left"
          >
            <div className="bg-white border border-[#EAE4DC] rounded-lg p-6 shadow-card">
              <h2 className="text-lg font-bold text-slate-800">Historical Statements</h2>
              <p className="text-sm text-slate-700 mt-1">View locked and submitted statements for previous accounting terms.</p>
              
              <div className="overflow-x-auto mt-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#FAF9F7]/40 text-[13px] font-semibold text-slate-700 uppercase tracking-wider select-none text-left">
                      <th className="py-4 px-4 font-sans">Period Range</th>
                      <th className="py-4 px-4 text-center font-sans">Submissions</th>
                      <th className="py-4 px-4 text-right font-sans">Total Payroll Cost</th>
                      <th className="py-4 px-4 text-right font-sans">Total Hours Worked</th>
                      <th className="py-4 px-4 font-sans pl-12">Disbursed Date</th>
                      <th className="py-4 px-4 text-center font-sans">Statement Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[14px] text-slate-700 font-sans">
                    {[
                      { period: "May 05 – May 11, 2024", count: "32 Employees", cost: 27950.00, hours: 1220.00, date: "May 13, 2024" },
                      { period: "Apr 28 – May 04, 2024", count: "30 Employees", cost: 25420.50, hours: 1180.25, date: "May 06, 2024" },
                      { period: "Apr 21 – Apr 27, 2024", count: "31 Employees", cost: 26850.10, hours: 1205.50, date: "Apr 29, 2024" },
                      { period: "Apr 14 – Apr 20, 2024", count: "29 Employees", cost: 24100.00, hours: 1110.00, date: "Apr 22, 2024" },
                    ].map((history) => (
                      <tr key={history.period} className="hover:bg-slate-50/10">
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{history.period}</td>
                        <td className="py-3.5 px-4 text-center text-slate-600">{history.count}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#166534]">${history.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="py-3.5 px-4 text-right text-slate-600">{history.hours.toFixed(2)}h</td>
                        <td className="py-3.5 px-4 pl-12 text-slate-700">{history.date}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1.5 bg-[#FAF9F7] text-[#1C1814] border border-slate-200 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block shrink-0" />
                            LOCKED & SAVED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. PAYSLIP DETAIL DRAWER/MODAL DISPLAY */}
      <AnimatePresence>
        {activeEmployee && (
          <>
            {/* Backdrop slide panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEmployee(null)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40"
            />

            {/* Slide-out pay receipt panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto text-left font-sans"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1 text-left">
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-purple-50 text-[#7553FF] rounded-md uppercase tracking-wider">
                      RESTAURANT CORPORATE PAYSLIP
                    </span>
                    <h2 className="text-xl font-bold text-slate-800 mt-2">{activeEmployee.name}</h2>
                    <p className="text-xs text-slate-700 font-medium">{activeEmployee.role} • {activeEmployee.department} Department</p>
                  </div>
                  <button
                    onClick={() => setActiveEmployee(null)}
                    className="p-2 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full text-slate-700 transition-all cursor-pointer inline-flex items-center justify-center shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Payout summary boxes */}
                  <div className="p-4 bg-slate-50/50 rounded-md border border-[#EAE4DC] space-y-3.5">
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-700 font-medium">Standard Hours Rate:</span>
                      <span className="font-semibold text-slate-800">
                        {activeEmployee.rateType === "Salary" ? `${activeEmployee.rateText}` : `$${activeEmployee.rate.toFixed(2)}/hr`}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[13px] pt-2 border-t border-slate-100">
                      <span className="text-slate-700 font-medium">Gross Hours Worked:</span>
                      <span className="font-semibold text-slate-800">
                        {activeEmployee.hours.toFixed(2)}h
                      </span>
                    </div>

                    {activeEmployee.hasOT && (
                      <div className="flex justify-between items-center text-[13px] pt-2 border-t border-slate-100">
                        <span className="text-purple-600 font-medium">Overtime Hours Multiplier:</span>
                        <span className="font-semibold text-purple-700 font-mono">
                          +{activeEmployee.otHours.toFixed(2)}h (at 1.5x rate)
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[13px] pt-2 border-t border-slate-100">
                      <span className="text-slate-700 font-bold block pt-1">Total Gross Earnings:</span>
                      <span className="font-bold text-slate-800 pt-1 text-sm">
                        ${activeEmployee.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Deductions panel */}
                  <div className="p-4 bg-rose-50/20 rounded-md border border-rose-100/40 space-y-2.5">
                    <p className="text-[11px] font-bold text-[#B91C1C] uppercase tracking-wider block">Deductions Breakdown</p>
                    <div className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-700 font-medium">Income Tax & Social Ins. (7.5%):</span>
                      <span className="font-semibold text-[#B91C1C]">
                        -${activeEmployee.deductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* NET PAYOUT OUTCOME CARD */}
                  <div className="p-5 bg-[#7553FF]/5 rounded-md border border-[#7553FF]/15 text-center space-y-1.5">
                    <p className="text-[11px] font-bold text-[#7553FF] uppercase tracking-widest">NET SETTLED PAYOUT</p>
                    <p className="text-3xl font-bold text-slate-800 font-display">
                      ${activeEmployee.netPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[11px] text-slate-700 font-normal">Transferred via bank wire transfer</p>
                  </div>
                </div>

                {/* Company policy warning terms */}
                <div className="p-3 bg-[#FAF9F7] rounded-xl border border-slate-150/60 text-[12px] text-slate-700 font-normal select-none leading-relaxed">
                  <span className="font-semibold text-slate-700 block mb-0.5">Note:</span> This statement belongs to Restaurant Operations Staff. Incurred tax rates are calculated based on automatic labor timesheet coordinates.
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    alert(`Payroll statement PDF receipt for ${activeEmployee.name} downloaded successfully!`);
                  }}
                  className="w-full py-3 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all h-12 flex items-center justify-center gap-2 cursor-pointer shadow-3xs hover:-translate-y-px"
                >
                  <FileDown className="w-4 h-4 text-white" />
                  <span>Download PDF Statement</span>
                </button>
                <button
                  onClick={() => setActiveEmployee(null)}
                  className="w-full py-2.5 bg-white border border-slate-200 hover:border-slate-350 text-slate-600 font-semibold text-xs rounded-xl h-10 cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. MODAL TO CONFIRM RUN PAYROLL */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmitModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg max-w-md w-full shadow-2xl border border-[#EAE4DC] overflow-hidden z-50 p-6 space-y-6 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-md bg-indigo-50 text-[#7553FF] shrink-0 flex items-center justify-center border border-purple-100">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight font-display">
                    Review and Submit Payroll?
                  </h3>
                  <p className="text-sm text-slate-700 font-normal leading-relaxed">
                    You are preparing to finalize the current payroll list of **{totalEmployees} staff**. Total cost is **${totalPayrollCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}**.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#F5F3FF] text-[#7553FF] rounded-md text-[13px] space-y-2 border border-purple-100">
                <p className="font-bold">What happens next?</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 font-normal">
                  <li>Automatic salary bank direct slips are drafted.</li>
                  <li>Draft status moves to Approved level.</li>
                  <li>Notifications dispatched to employees.</li>
                </ul>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-600 font-semibold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRunPayrollSubmit}
                  className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Confirm and Disburse
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. MODAL SUCCESS COMPLETED PAYRUN */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg max-w-md w-full shadow-2xl border border-[#EAE4DC] overflow-hidden z-50 p-6 space-y-5 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <Check className="w-8 h-8 font-bold" />
              </div>

              <div className="space-y-1.5 text-center">
                <h3 className="text-xl font-bold text-[#1C1814] tracking-tight font-display">
                  Payroll Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-700 font-normal">
                  The statement period has been successfully processed and locked.
                </p>
              </div>

              <div className="p-4 bg-slate-50 text-slate-650 rounded-md text-[14px] leading-relaxed select-none text-left space-y-1">
                <p className="font-semibold text-slate-700">Audit Trail details:</p>
                <p>• Value Payout: <strong>${totalPayrollCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></p>
                <p>• Employees count: <strong>{totalEmployees} active records</strong></p>
                <p>• Date processed: <strong>June 23, 2026 09:12 PM</strong></p>
              </div>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="w-full py-3 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all cursor-pointer h-12 inline-flex items-center justify-center shadow-3xs"
              >
                Okay, Perfect!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. EDIT RATES & DETAILS MODAL */}
      <AnimatePresence>
        {isEditModalOpen && editingStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg max-w-md w-full shadow-2xl border border-[#EAE4DC] overflow-hidden z-50 p-6 space-y-5 text-left font-sans"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 font-display">Update Rates & Hours</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1 hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Employee Name readout */}
                <div className="text-sm select-none leading-tight">
                  <span className="text-slate-700 block font-normal text-xs uppercase tracking-wider">Employee</span>
                  <span className="text-slate-800 font-bold block mt-1 text-[15px]">{editingStaff.name} ({editingStaff.role})</span>
                </div>

                {/* Hours Worked input */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-700 font-semibold uppercase tracking-wider block">Worked Hours</label>
                  <input
                    type="number"
                    step="0.05"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[14px] text-slate-800 focus:outline-none focus:border-[#7553FF]"
                    value={editingStaff.hours}
                    onChange={(e) => setEditingStaff({ ...editingStaff, hours: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                {/* Overtime check toggle */}
                <div className="flex items-center justify-between py-1 select-none">
                  <span className="text-sm text-slate-700 font-medium">Includes Paid Overtime</span>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-350 text-[#7553FF] focus:ring-[#7553FF] cursor-pointer"
                    checked={editingStaff.hasOT}
                    onChange={(e) => setEditingStaff({ ...editingStaff, hasOT: e.target.checked, otHours: e.target.checked ? 3.0 : 0 })}
                  />
                </div>

                {editingStaff.hasOT && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-700 font-semibold uppercase tracking-wider block">OT Hours count</label>
                    <input
                      type="number"
                      step="0.05"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[14px] text-slate-800 focus:outline-none focus:border-[#7553FF]"
                      value={editingStaff.otHours}
                      onChange={(e) => setEditingStaff({ ...editingStaff, otHours: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                )}

                {/* Rate details price */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-700 font-semibold uppercase tracking-wider block">
                    {editingStaff.rateType === "Salary" ? "Weekly Salary ($)" : "Hourly Rate ($)"}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[14px] text-slate-800 focus:outline-none focus:border-[#7553FF]"
                    value={editingStaff.rate}
                    onChange={(e) => setEditingStaff({ ...editingStaff, rate: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-650 hover:bg-slate-50 font-semibold text-[13px] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold rounded-xl text-[13px] transition-all cursor-pointer shadow-3xs"
                >
                  Apply Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
