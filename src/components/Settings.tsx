/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Store,
  Globe,
  Save,
  CheckCircle,
  CreditCard,
  Check,
  Zap,
  Sparkles,
  ExternalLink,
  Lock,
  ShieldCheck,
  HelpCircle,
  Clock,
  X,
  Upload,
  Image,
  Trash2,
  Plus,
  Edit2,
  Briefcase,
  AlertCircle,
  FileText,
  DollarSign,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import RolePermission from './RolePermission';
import { SocialAccountView } from './ExtraViews';

const planDetails = {
  Basic: {
    name: 'GastroHub Basic Plan',
    badge: 'BASIC',
    price: '$49.00/mo',
    badgeClass: 'bg-white/10 text-white border border-white/25 shadow-xs',
    badgeStyle: { color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.25)' }
  },
  Gold: {
    name: 'GastroHub Gold Plan',
    badge: 'GOLD',
    price: '$99.00/mo',
    badgeClass: 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/35 shadow-xs',
    badgeStyle: { color: '#a7f3d0', backgroundColor: 'rgba(16, 185, 129, 0.25)', borderColor: 'rgba(52, 211, 153, 0.35)' }
  },
  Diamond: {
    name: 'GastroHub Diamond Plan',
    badge: 'DIAMOND',
    price: '$199.00/mo',
    badgeClass: 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/35 shadow-xs',
    badgeStyle: { color: '#c7d2fe', backgroundColor: 'rgba(99, 102, 241, 0.3)', borderColor: 'rgba(129, 140, 248, 0.35)' }
  }
};

const modalPlanDetails = {
  Basic: [
    "Smart Menu suite & digital menus",
    "Crew profile & permissions settings",
    "AI Brand & SEO growth kit access",
    "Digital business metric dashboard"
  ],
  Gold: [
    "Everything inside Basic plan suite",
    "Interactive Shift Planner tool",
    "Team hours tracking & timesheets"
  ],
  Diamond: [
    "Full computational Payroll calculation",
    "GPS check-in physical coordinates",
    "Attendance & leave calculators",
    "Table reserving & dining floor maps",
    "24/7 dedicated priority VIP support"
  ]
};

const planRanks = {
  Basic: 1,
  Gold: 2,
  Diamond: 3
};

interface SettingsProps {
  storeName: string;
  setStoreName: (name: string) => void;
  currentPlan: 'Basic' | 'Gold' | 'Diamond';
  onUpgrade: (plan: 'Basic' | 'Gold' | 'Diamond') => void;
  initialTab?: 'info' | 'notifications' | 'security' | 'subscription' | 'permissions' | 'social';
  staff?: any[];
  setStaff?: React.Dispatch<React.SetStateAction<any[]>>;
  simulatedUser?: any;
}

const planFeatures = {
  Basic: [
    'Smart Menu Solutions (All sub-modules)',
    'Staff & Roles (Crew profiles & permission management)',
    'All Marketing & Brand Growth tools: Social Auto Post, SEO Check, Review Responder, Campaign Settings',
    'Catering Inquiries (Advanced catering events manager & bookings - Coming Soon)',
    'Brand Settings & complete platform configuration',
    'Dashboard business intelligence overview',
  ],
  Gold: [
    'All features of the Basic plan',
    'Shift Planner (Interactive shift scheduling, timesheets & assignments)',
  ],
  Diamond: [
    'Payroll (Automated clock-in, wage ledger & leaves computational audits)',
    'Checkin & GPS Attendance Tracking (Strict geo-coordinates constraint timesheets)',
    'Leave & Flextime Calculator (Computation engine for employee time off)',
    'Book a Table (Direct visual dining reservations & floor mapping)',
    '24/7 VIP priority support & direct engineering access',
  ],
};

export default function Settings({
  storeName,
  setStoreName,
  currentPlan,
  onUpgrade,
  initialTab = 'info',
  staff,
  setStaff,
  simulatedUser
}: SettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'brand_info' | 'store_management' | 'notification' | 'system_access' | 'hr_payroll'>(
    'brand_info'
  );
  
  const [localToast, setLocalToast] = useState<{ message: string; type: 'success' | 'info' | 'redirect' } | null>(null);
  const [subscribingPlan, setSubscribingPlan] = useState<'Basic' | 'Gold' | 'Diamond' | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(initialTab === 'subscription');
  const [modalSubscribing, setModalSubscribing] = useState<'Basic' | 'Gold' | 'Diamond' | null>(null);

  const activePlanPriceText = () => {
    if (billingInterval === 'annual') {
      if (currentPlan === 'Basic') return '$39.00/mo';
      if (currentPlan === 'Gold') return '$79.00/mo';
      return '$159.00/mo';
    } else {
      if (currentPlan === 'Basic') return '$49.00/mo';
      if (currentPlan === 'Gold') return '$99.00/mo';
      return '$199.00/mo';
    }
  };

  const getButtonProps = (plan: 'Basic' | 'Gold' | 'Diamond') => {
    const currentRank = planRanks[currentPlan];
    const targetRank = planRanks[plan];
    
    if (currentRank === targetRank) {
      return {
        text: 'Current Plan',
        isDisabled: true,
        className: 'bg-slate-100 text-slate-700 cursor-not-allowed border-none'
      };
    } else if (targetRank < currentRank) {
      return {
        text: 'DOWNGRADE',
        isDisabled: false,
        className: 'bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#E11D48] border border-[#FEE2E2] hover:border-[#FCA5A5]'
      };
    } else {
      return {
        text: 'UPGRADE',
        isDisabled: false,
        className: 'bg-[#7553FF] hover:bg-[#623EE2] text-white border-none shadow-xs'
      };
    }
  };

  const handleModalSubscription = (plan: 'Basic' | 'Gold' | 'Diamond') => {
    setModalSubscribing(plan);
    setTimeout(() => {
      onUpgrade(plan);
      setModalSubscribing(null);
      setIsPricingModalOpen(false);
      triggerLocalToast(`Plan updated successfully! Your ${plan} plan is now active.`, 'success');
    }, 1500);
  };

  const triggerLocalToast = (message: string, type: 'success' | 'info' | 'redirect' = 'info') => {
    setLocalToast({ message, type });
    setTimeout(() => {
      setLocalToast(null);
    }, 4500);
  };

  const handleSubscribe = (plan: 'Basic' | 'Gold' | 'Diamond') => {
    setSubscribingPlan(plan);
    setTimeout(() => {
      onUpgrade(plan);
      setSubscribingPlan(null);
      triggerLocalToast(`Payment successful! Your ${plan} plan is now active.`, 'success');
    }, 1500);
  };

  const handleManageBilling = () => {
    triggerLocalToast("Redirecting to Stripe Customer Portal...", "redirect");
  };

  useEffect(() => {
    if (initialTab) {
      if (initialTab === 'subscription') {
        setActiveSubTab('brand_info');
        setIsPricingModalOpen(true);
      } else if (initialTab === 'info') {
        setActiveSubTab('brand_info');
      } else if (initialTab === 'notifications') {
        setActiveSubTab('notification');
      } else if (initialTab === 'permissions') {
        setActiveSubTab('system_access');
      } else if (initialTab === 'security') {
        setActiveSubTab('hr_payroll');
      } else {
        setActiveSubTab('brand_info');
      }
    }
  }, [initialTab]);

  // 2.1 Tab: Brand Info states
  const [brandName, setBrandName] = useState(() => {
    return localStorage.getItem('gastro_brand_name') || storeName || 'Gastro Hub';
  });
  const [brandId] = useState(() => {
    let id = localStorage.getItem('gastro_brand_id');
    if (!id) {
      id = 'e57fa873-4f96-41b4-9276-85764d26da5c';
      localStorage.setItem('gastro_brand_id', id);
    }
    return id;
  });
  const [ownerName, setOwnerName] = useState(() => {
    return localStorage.getItem('gastro_brand_owner') || 'Nguyen An';
  });
  const [contactEmail, setContactEmail] = useState(() => {
    return localStorage.getItem('gastro_contact_email') || 'contact@gastrohub.com';
  });
  const [contactPhone, setContactPhone] = useState(() => {
    return localStorage.getItem('gastro_contact_phone') || '+49 89 12345678';
  });
  const [mainOfficeAddress, setMainOfficeAddress] = useState(() => {
    return localStorage.getItem('gastro_main_office_address') || 'Karlsplatz 1, 80335 München, Germany';
  });
  const [brandCountry, setBrandCountry] = useState(() => {
    return localStorage.getItem('gastro_brand_country') || 'DE';
  });
  const [localTaxId, setLocalTaxId] = useState(() => {
    return localStorage.getItem('gastro_local_tax_id') || '21/123/45678';
  });
  const [vatId, setVatId] = useState(() => {
    return localStorage.getItem('gastro_vat_id') || 'DE812345678';
  });
  const [branchLogoUrl, setBranchLogoUrl] = useState(() => {
    return localStorage.getItem('gastro_branch_logo_url') || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80';
  });
  const [branchCoverUrl, setBranchCoverUrl] = useState(() => {
    return localStorage.getItem('gastro_branch_cover_url') || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80';
  });

  // 2.2 Tab: Store Management states
  const [stores, setStores] = useState<{
    id: string;
    name: string;
    address: string;
    phone: string;
    timezone: string;
    operatingHours: string;
    status: 'Active' | 'Inactive';
    forgetCheckinBehavior?: 'Snap to Shift' | 'Snap to Actual';
  }[]>(() => {
    const cached = localStorage.getItem('gastro_stores');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return parsed.map((s: any) => ({
          ...s,
          forgetCheckinBehavior: s.forgetCheckinBehavior || 'Snap to Shift'
        }));
      } catch (e) {}
    }
    return [
      {
        id: "store-1",
        name: "Gastro Hub Munich",
        address: "Karlsplatz 1, 80335 München, Germany",
        phone: "+49 89 555-1234",
        timezone: "Europe/Berlin",
        operatingHours: "08:00 - 22:00",
        status: "Active",
        forgetCheckinBehavior: "Snap to Shift"
      },
      {
        id: "store-2",
        name: "Gastro Hub Vienna",
        address: "Stephansplatz 2, 1010 Wien, Austria",
        phone: "+43 1 555-4321",
        timezone: "Europe/Vienna",
        operatingHours: "09:00 - 23:00",
        status: "Active",
        forgetCheckinBehavior: "Snap to Actual"
      },
      {
        id: "store-3",
        name: "Gastro Hub Paris",
        address: "15 Rue de Rivoli, 75001 Paris, France",
        phone: "+33 1 555-6789",
        timezone: "Europe/Paris",
        operatingHours: "10:00 - 00:00",
        status: "Inactive",
        forgetCheckinBehavior: "Snap to Shift"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gastro_stores', JSON.stringify(stores));
  }, [stores]);

  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any | null>(null);
  const [storeFormName, setStoreFormName] = useState('');
  const [storeFormAddress, setStoreFormAddress] = useState('');
  const [storeFormPhone, setStoreFormPhone] = useState('');
  const [storeFormTimezone, setStoreFormTimezone] = useState('Europe/Berlin');
  const [storeFormHours, setStoreFormHours] = useState('08:00 - 22:00');
  const [storeFormStatus, setStoreFormStatus] = useState<'Active' | 'Inactive'>('Active');
  const [storeFormForgetBehavior, setStoreFormForgetBehavior] = useState<'Snap to Shift' | 'Snap to Actual'>('Snap to Shift');

  // 2.3 Tab: Notification states
  const [notifRules, setNotifRules] = useState<{
    id: string;
    event: string;
    audience: string;
    email: boolean;
    webPush: boolean;
    mobile: boolean;
  }[]>(() => {
    const cached = localStorage.getItem('gastro_notification_rules');
    if (cached) {
      try { return JSON.parse(cached); } catch (e) {}
    }
    return [
      {
        id: 'rule-1',
        event: 'Leave Request Created',
        audience: 'Admin / Employee with Leave Approval',
        email: true,
        webPush: true,
        mobile: false
      },
      {
        id: 'rule-2',
        event: 'Shift Swap Request',
        audience: 'Admin / Employee with Shift Planner',
        email: false,
        webPush: true,
        mobile: false
      },
      {
        id: 'rule-3',
        event: 'Roster Published',
        audience: 'Employee in Roster',
        email: true,
        webPush: false,
        mobile: true
      },
      {
        id: 'rule-4',
        event: 'Leave/Swap Request Decided',
        audience: 'Employee who requested',
        email: false,
        webPush: false,
        mobile: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gastro_notification_rules', JSON.stringify(notifRules));
  }, [notifRules]);

  // 2.5 Tab: HR & Payroll compliance states
  const [payrollRegion, setPayrollRegion] = useState(() => {
    return localStorage.getItem('gastro_payroll_region') || 'Bayern';
  });
  const [lowIncomeThreshold, setLowIncomeThreshold] = useState(() => {
    return localStorage.getItem('gastro_low_income_threshold') || '603.00';
  });
  const [autoBreakDeduction, setAutoBreakDeduction] = useState(() => {
    return localStorage.getItem('gastro_auto_break_deduction') === 'true';
  });
  const [breakThreshold1Min, setBreakThreshold1Min] = useState(() => {
    return localStorage.getItem('gastro_break_threshold_1_min') || '30';
  });
  const [breakThreshold1Start, setBreakThreshold1Start] = useState(() => {
    return localStorage.getItem('gastro_break_threshold_1_start') || '6.0';
  });
  const [breakThreshold1End, setBreakThreshold1End] = useState(() => {
    return localStorage.getItem('gastro_break_threshold_1_end') || '9.0';
  });
  const [breakThreshold2Min, setBreakThreshold2Min] = useState(() => {
    return localStorage.getItem('gastro_break_threshold_2_min') || '45';
  });
  const [breakThreshold2Start, setBreakThreshold2Start] = useState(() => {
    return localStorage.getItem('gastro_break_threshold_2_start') || '9.0';
  });
  const [forgetCheckinBehavior, setForgetCheckinBehavior] = useState(() => {
    return localStorage.getItem('gastro_forget_checkin_behavior') || 'Snap to Shift';
  });

  const [fwMaxPositive, setFwMaxPositive] = useState(() => {
    return localStorage.getItem('gastro_fw_max_positive') || '+40.0';
  });
  const [fwMaxNegative, setFwMaxNegative] = useState(() => {
    return localStorage.getItem('gastro_fw_max_negative') || '-20.0';
  });
  const [annualLeaveRollover, setAnnualLeaveRollover] = useState(() => {
    return localStorage.getItem('gastro_annual_leave_rollover') === 'true';
  });
  const [leaveRolloverRate, setLeaveRolloverRate] = useState(() => {
    return localStorage.getItem('gastro_leave_rollover_rate') || '8.0';
  });
  const [overtimePayoutCycle, setOvertimePayoutCycle] = useState(() => {
    return localStorage.getItem('gastro_overtime_payout_cycle') || 'Monthly';
  });

  const [brandSalaryType, setBrandSalaryType] = useState(() => {
    return localStorage.getItem('gastro_brand_salary_type') || 'Hourly Rate';
  });
  const [nightShiftPremiumEnabled, setNightShiftPremiumEnabled] = useState(() => {
    return localStorage.getItem('gastro_night_shift_premium_enabled') !== 'false';
  });
  const [nightShiftPremiumRate, setNightShiftPremiumRate] = useState(() => {
    return localStorage.getItem('gastro_night_shift_premium_rate') || '25';
  });
  const [nightShiftStartTime, setNightShiftStartTime] = useState(() => {
    return localStorage.getItem('gastro_night_shift_start_time') || '22:00';
  });
  const [sundayPremiumEnabled, setSundayPremiumEnabled] = useState(() => {
    return localStorage.getItem('gastro_sunday_premium_enabled') !== 'false';
  });
  const [sundayPremiumRate, setSundayPremiumRate] = useState(() => {
    return localStorage.getItem('gastro_sunday_premium_rate') || '50';
  });
  const [holidayPremiumEnabled, setHolidayPremiumEnabled] = useState(() => {
    return localStorage.getItem('gastro_holiday_premium_enabled') !== 'false';
  });
  const [holidayPremiumRate, setHolidayPremiumRate] = useState(() => {
    return localStorage.getItem('gastro_holiday_premium_rate') || '125';
  });

  const [eveningShiftPremiumEnabled, setEveningShiftPremiumEnabled] = useState(() => {
    return localStorage.getItem('gastro_evening_shift_premium_enabled') !== 'false';
  });
  const [eveningShiftPremiumRate, setEveningShiftPremiumRate] = useState(() => {
    return localStorage.getItem('gastro_evening_shift_premium_rate') || '10';
  });
  const [eveningShiftStartTime, setEveningShiftStartTime] = useState(() => {
    return localStorage.getItem('gastro_evening_shift_start_time') || '18:00';
  });

  const [enableTipDistribution, setEnableTipDistribution] = useState(() => {
    return localStorage.getItem('gastro_enable_tip_distribution') !== 'false';
  });
  const [tipWeightKitchen, setTipWeightKitchen] = useState(() => {
    return localStorage.getItem('gastro_tip_weight_kitchen') || '0.8';
  });
  const [tipWeightService, setTipWeightService] = useState(() => {
    return localStorage.getItem('gastro_tip_weight_service') || '1.0';
  });
  const [tipWeightBar, setTipWeightBar] = useState(() => {
    return localStorage.getItem('gastro_tip_weight_bar') || '0.9';
  });

  const [allowVacationRollover, setAllowVacationRollover] = useState(() => {
    return localStorage.getItem('gastro_allow_vacation_rollover') || 'Yes';
  });
  const [vacationRolloverExpiryDate, setVacationRolloverExpiryDate] = useState(() => {
    return localStorage.getItem('gastro_vacation_rollover_expiry_date') || '31/03';
  });
  const [vacationRolloverRemainderAction, setVacationRolloverRemainderAction] = useState(() => {
    return localStorage.getItem('gastro_vacation_rollover_remainder_action') || 'Convert to Flextime';
  });

  const [codeEveningPremium, setCodeEveningPremium] = useState(() => {
    return localStorage.getItem('gastro_code_evening_premium') || '2400';
  });
  const [codeTipsDistribution, setCodeTipsDistribution] = useState(() => {
    return localStorage.getItem('gastro_code_tips_distribution') || '5000';
  });

  const [codeBaseSalary, setCodeBaseSalary] = useState(() => {
    return localStorage.getItem('gastro_code_base_salary') || '1000';
  });
  const [codeNightPremium, setCodeNightPremium] = useState(() => {
    return localStorage.getItem('gastro_code_night_premium') || '2010';
  });
  const [codeSundayPremium, setCodeSundayPremium] = useState(() => {
    return localStorage.getItem('gastro_code_sunday_premium') || '2020';
  });
  const [codeHolidayPremium, setCodeHolidayPremium] = useState(() => {
    return localStorage.getItem('gastro_code_holiday_premium') || '2030';
  });
  const [codeOvertimePayout, setCodeOvertimePayout] = useState(() => {
    return localStorage.getItem('gastro_code_overtime_payout') || '3010';
  });
  const [exportTemplate, setExportTemplate] = useState(() => {
    return localStorage.getItem('gastro_export_template') || 'DATEV (Đức)';
  });

  const [isSaved, setIsSaved] = useState(false);

  // Dynamic Validation helpers
  const getTaxIdValidationError = () => {
    if (brandCountry === 'DE') {
      const deRegex = /^(13|21)\/\d{3}\/\d{5}$/;
      if (localTaxId && !deRegex.test(localTaxId)) {
        return "Germany Steuernummer format is 13/XXX/XXXXX or 21/XXX/XXXXX";
      }
    }
    if (brandCountry === 'AT') {
      const atRegex = /^\d{9}$/;
      if (localTaxId && !atRegex.test(localTaxId)) {
        return "Austria Tax ID must be 9 digits";
      }
    }
    return "";
  };

  const getVatIdValidationError = () => {
    if (!vatId) return "";
    const prefix = vatId.substring(0, 2).toUpperCase();
    if (prefix !== brandCountry) {
      return `VAT ID must start with selected country code (${brandCountry})`;
    }
    const rest = vatId.substring(2);
    if (rest.length < 2 || rest.length > 12) {
      return "VAT ID length must be 4 to 14 characters (including country code)";
    }
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    if (!alphanumeric.test(rest)) {
      return "VAT ID must contain only alphanumeric characters after country code";
    }
    return "";
  };

  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const [logoDragActive, setLogoDragActive] = useState(false);
  const [coverDragActive, setCoverDragActive] = useState(false);

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setBranchLogoUrl(objectUrl);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setBranchCoverUrl(objectUrl);
    }
  };

  const handleLogoDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setLogoDragActive(true);
    } else if (e.type === "dragleave") {
      setLogoDragActive(false);
    }
  };

  const handleCoverDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setCoverDragActive(true);
    } else if (e.type === "dragleave") {
      setCoverDragActive(false);
    }
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLogoDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setBranchLogoUrl(objectUrl);
    }
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setBranchCoverUrl(objectUrl);
    }
  };

  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();

    const taxErr = getTaxIdValidationError();
    const vatErr = getVatIdValidationError();
    if (taxErr || vatErr) {
      triggerLocalToast("Please resolve all validation errors in Brand Info before saving", "info");
      return;
    }
    
    // Save Brand Info
    localStorage.setItem('gastro_brand_name', brandName);
    localStorage.setItem('gastro_brand_owner', ownerName);
    localStorage.setItem('gastro_contact_email', contactEmail);
    localStorage.setItem('gastro_contact_phone', contactPhone);
    localStorage.setItem('gastro_main_office_address', mainOfficeAddress);
    localStorage.setItem('gastro_brand_country', brandCountry);
    localStorage.setItem('gastro_local_tax_id', localTaxId);
    localStorage.setItem('gastro_vat_id', vatId);
    localStorage.setItem('gastro_brand_id', brandId);
    localStorage.setItem('gastro_branch_logo_url', branchLogoUrl);
    localStorage.setItem('gastro_branch_cover_url', branchCoverUrl);
    
    // Save HR & Payroll compliance settings
    localStorage.setItem('gastro_payroll_region', payrollRegion);
    localStorage.setItem('gastro_low_income_threshold', lowIncomeThreshold);
    localStorage.setItem('gastro_auto_break_deduction', autoBreakDeduction ? 'true' : 'false');
    localStorage.setItem('gastro_break_threshold_1_min', breakThreshold1Min);
    localStorage.setItem('gastro_break_threshold_1_start', breakThreshold1Start);
    localStorage.setItem('gastro_break_threshold_1_end', breakThreshold1End);
    localStorage.setItem('gastro_break_threshold_2_min', breakThreshold2Min);
    localStorage.setItem('gastro_break_threshold_2_start', breakThreshold2Start);
    localStorage.setItem('gastro_forget_checkin_behavior', forgetCheckinBehavior);
    
    localStorage.setItem('gastro_fw_max_positive', fwMaxPositive);
    localStorage.setItem('gastro_fw_max_negative', fwMaxNegative);
    localStorage.setItem('gastro_annual_leave_rollover', annualLeaveRollover ? 'true' : 'false');
    localStorage.setItem('gastro_leave_rollover_rate', leaveRolloverRate);
    localStorage.setItem('gastro_overtime_payout_cycle', overtimePayoutCycle);
    
    localStorage.setItem('gastro_brand_salary_type', brandSalaryType);
    localStorage.setItem('gastro_evening_shift_premium_enabled', eveningShiftPremiumEnabled ? 'true' : 'false');
    localStorage.setItem('gastro_evening_shift_premium_rate', eveningShiftPremiumRate);
    localStorage.setItem('gastro_evening_shift_start_time', eveningShiftStartTime);
    localStorage.setItem('gastro_night_shift_premium_enabled', nightShiftPremiumEnabled ? 'true' : 'false');
    localStorage.setItem('gastro_night_shift_premium_rate', nightShiftPremiumRate);
    localStorage.setItem('gastro_night_shift_start_time', nightShiftStartTime);
    localStorage.setItem('gastro_sunday_premium_enabled', sundayPremiumEnabled ? 'true' : 'false');
    localStorage.setItem('gastro_sunday_premium_rate', sundayPremiumRate);
    localStorage.setItem('gastro_holiday_premium_enabled', holidayPremiumEnabled ? 'true' : 'false');
    localStorage.setItem('gastro_holiday_premium_rate', holidayPremiumRate);

    localStorage.setItem('gastro_enable_tip_distribution', enableTipDistribution ? 'true' : 'false');
    localStorage.setItem('gastro_tip_weight_kitchen', tipWeightKitchen);
    localStorage.setItem('gastro_tip_weight_service', tipWeightService);
    localStorage.setItem('gastro_tip_weight_bar', tipWeightBar);

    localStorage.setItem('gastro_allow_vacation_rollover', allowVacationRollover);
    localStorage.setItem('gastro_vacation_rollover_expiry_date', vacationRolloverExpiryDate);
    localStorage.setItem('gastro_vacation_rollover_remainder_action', vacationRolloverRemainderAction);
    
    localStorage.setItem('gastro_code_base_salary', codeBaseSalary);
    localStorage.setItem('gastro_code_evening_premium', codeEveningPremium);
    localStorage.setItem('gastro_code_night_premium', codeNightPremium);
    localStorage.setItem('gastro_code_sunday_premium', codeSundayPremium);
    localStorage.setItem('gastro_code_holiday_premium', codeHolidayPremium);
    localStorage.setItem('gastro_code_tips_distribution', codeTipsDistribution);
    localStorage.setItem('gastro_code_overtime_payout', codeOvertimePayout);
    localStorage.setItem('gastro_export_template', exportTemplate);
    
    if (setStoreName) {
      setStoreName(brandName);
    }
    
    setIsSaved(true);
    triggerLocalToast("Configuration saved successfully! Changes synchronized across the brand.", "success");
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto pb-16 font-sans">
      
      {/* Global Local Toast */}
      <AnimatePresence>
        {localToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            data-no-intercept="true"
            className="fixed bottom-6 right-6 z-[99999] flex items-center gap-3.5 bg-slate-900 border border-white/10 text-white px-5 py-4 rounded-2xl shadow-2xl text-[14px] font-sans"
          >
            {localToast.type === 'redirect' ? (
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              </div>
            ) : localToast.type === 'success' ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5" />
              </div>
            )}
            <span className="font-medium text-slate-700">{localToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 text-left">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">
            Brand Settings & Compliance Hub
          </h1>
          <p className="text-[14px] text-slate-700 font-sans leading-relaxed">
            Configure brand-wide structures, synchronize store locations, manage notification priorities, assign staff privileges, and verify strict German & EU payroll regulations.
          </p>
        </div>
      </div>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 text-[#15803D] rounded-xl flex items-center gap-3 text-sm"
        >
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>Brand-wide parameters updated successfully! All compliance metrics and branch details are active.</span>
        </motion.div>
      )}

      {/* Top Horizontal Navigation Layout */}
      <div className="border-b border-[#1C1814]/10 flex items-center gap-1 overflow-x-auto pb-px text-left w-full mb-8 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveSubTab('brand_info')}
          className={`flex items-center gap-2 px-5 pb-3 pt-2 border-b-2 font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap bg-transparent ${
            activeSubTab === 'brand_info'
              ? 'border-[#7553FF] text-[#7553FF]'
              : 'border-transparent text-slate-700 hover:text-[#7553FF]'
          }`}
        >
          <Briefcase className="w-4 h-4 shrink-0" />
          <span>Brand Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('store_management')}
          className={`flex items-center gap-2 px-5 pb-3 pt-2 border-b-2 font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap bg-transparent ${
            activeSubTab === 'store_management'
              ? 'border-[#7553FF] text-[#7553FF]'
              : 'border-transparent text-slate-700 hover:text-[#7553FF]'
          }`}
        >
          <Store className="w-4 h-4 shrink-0" />
          <span>Store Management</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('notification')}
          className={`flex items-center gap-2 px-5 pb-3 pt-2 border-b-2 font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap bg-transparent ${
            activeSubTab === 'notification'
              ? 'border-[#7553FF] text-[#7553FF]'
              : 'border-transparent text-slate-700 hover:text-[#7553FF]'
          }`}
        >
          <Bell className="w-4 h-4 shrink-0" />
          <span>Notification</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('system_access')}
          className={`flex items-center gap-2 px-5 pb-3 pt-2 border-b-2 font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap bg-transparent ${
            activeSubTab === 'system_access'
              ? 'border-[#7553FF] text-[#7553FF]'
              : 'border-transparent text-slate-700 hover:text-[#7553FF]'
          }`}
        >
          <Lock className="w-4 h-4 shrink-0" />
          <span>System Access</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('hr_payroll')}
          className={`flex items-center gap-2 px-5 pb-3 pt-2 border-b-2 font-bold text-[14px] transition-all cursor-pointer whitespace-nowrap bg-transparent ${
            activeSubTab === 'hr_payroll'
              ? 'border-[#7553FF] text-[#7553FF]'
              : 'border-transparent text-slate-700 hover:text-[#7553FF]'
          }`}
        >
          <DollarSign className="w-4 h-4 shrink-0" />
          <span>HR & Payroll Compliance</span>
        </button>
      </div>

      {/* Content Area Container: expanded to full-width */}
      <div className="w-full">
          
          {/* TAB 1: BRAND INFO */}
          {activeSubTab === 'brand_info' && (
            <div className="space-y-6 text-left">
              
              {/* Premium dark modern 'Manage Plan' block */}
              <div 
                className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md border border-white/10 text-left relative overflow-hidden"
                style={{ 
                  background: currentPlan === 'Basic'
                    ? 'linear-gradient(135deg, #7553FF, #4F38B3)'
                    : currentPlan === 'Gold'
                    ? 'linear-gradient(135deg, #F59E0B, #FFBE51, #FF8C00)'
                    : 'linear-gradient(135deg, #7654FF, #EDC7FF, #3C73FF)', 
                  borderTop: 'none' 
                }}
              >
                <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                
                <div className="space-y-3 relative z-10">
                  <span className="text-[14px] font-normal text-white tracking-widest block font-mono" style={{ color: '#ffffff', fontWeight: 'normal' }}>
                    Your Current Plan
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div id="current-plan-title" className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none m-0" style={{ color: '#ffffff', fontWeight: 700 }} >
                        {planDetails[currentPlan].name}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider leading-none shrink-0 ${planDetails[currentPlan].badgeClass}`} style={{ ...planDetails[currentPlan].badgeStyle, color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}>
                        {planDetails[currentPlan].badge}
                      </span>
                    </div>
                    <p className="text-[14px] text-white font-sans leading-relaxed mt-2.5 font-normal" style={{ color: '#ffffff' }}>
                      Status: <span className="text-white font-bold font-sans" style={{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Active</span> | Next billing date: July 10, 2026 ({activePlanPriceText()})
                    </p>
                    <p className="text-[14px] font-sans leading-relaxed mt-1 font-normal" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      Remaining Credit: {currentPlan === 'Basic' ? '$15.00' : currentPlan === 'Gold' ? '$45.00' : '$100.00'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="px-6 py-2.5 bg-white hover:bg-slate-100 active:bg-slate-200 text-[#1C1814] font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 h-11 border-none shrink-0 self-start md:self-auto relative z-10 font-sans"
                >
                  <span>CHANGE PLAN</span>
                  <ExternalLink 
                    className="w-4 h-4" 
                    style={{ 
                      color: currentPlan === 'Basic' 
                        ? '#7553FF' 
                        : currentPlan === 'Gold' 
                        ? '#E38306' 
                        : '#7654FF' 
                    }} 
                  />
                </button>
              </div>

              {/* Form Settings wrapper */}
              <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm">
                <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight border-b border-[#1C1814]/5 pb-3">
                  Brand core Details
                </h2>

                <form onSubmit={handleSaveAllSettings} className="space-y-6 pt-6 font-sans">
                  
                  {/* Basic Specifications */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 tracking-wider mb-4 border-l-4 border-[#7553FF] pl-2.5">
                      Basic Specifications
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      {/* Brand Name */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Brand / Store Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none"
                          required
                        />
                        <span className="text-[10px] text-slate-500">
                          Note: Brand name is not necessarily unique.
                        </span>
                      </div>

                      {/* Brand ID (UUID) */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Brand ID (UUID)
                        </label>
                        <input
                          type="text"
                          value={brandId}
                          readOnly
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-mono text-slate-500 cursor-not-allowed shadow-none"
                        />
                        <span className="text-[10px] text-slate-500">
                          Unique workspace UUID identifier.
                        </span>
                      </div>

                      {/* Owner Name */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Owner Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-4">
                      {/* Contact Email */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Contact Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none"
                          required
                        />
                      </div>

                      {/* Contact Phone */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Contact Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Physical Address & EU VAT Registry */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 tracking-wider mb-4 border-l-4 border-[#7553FF] pl-2.5">
                      Tax & Financial Settings
                    </h3>

                    <div className="space-y-1.5 flex flex-col mb-4">
                      <label className="text-xs font-bold text-slate-500 tracking-wider">
                        Main Office Headquarters Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={mainOfficeAddress}
                        onChange={(e) => setMainOfficeAddress(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      {/* Active Country Selection */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Operating Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={brandCountry}
                          onChange={(e) => setBrandCountry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] h-[38px] cursor-pointer"
                        >
                          <option value="DE">Germany (DE)</option>
                          <option value="AT">Austria (AT)</option>
                          <option value="FR">France (FR)</option>
                          <option value="ES">Spain (ES)</option>
                          <option value="IT">Italy (IT)</option>
                        </select>
                      </div>

                      {/* Local Tax ID with dynamic standard hints */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider flex items-center justify-between">
                          <span>Local Tax ID <span className="text-red-500">*</span></span>
                          {brandCountry === 'DE' && <span className="text-[10px] text-[#7553FF] font-mono font-bold">Steuernummer</span>}
                        </label>
                        <input
                          type="text"
                          value={localTaxId}
                          onChange={(e) => setLocalTaxId(e.target.value)}
                          placeholder={brandCountry === 'DE' ? '21/123/45678' : brandCountry === 'AT' ? '123456789' : 'Local Tax Code'}
                          className={`w-full bg-white border rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none ${
                            getTaxIdValidationError() ? 'border-amber-400 bg-amber-50/25' : 'border-slate-200'
                          }`}
                          required
                        />
                        {getTaxIdValidationError() && (
                          <span className="text-[11px] text-amber-600 font-medium">
                            ⚠️ {getTaxIdValidationError()}
                          </span>
                        )}
                      </div>

                      {/* European Union VAT ID */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider flex items-center justify-between">
                          <span>EU VAT Number <span className="text-red-500">*</span></span>
                          <span className="text-[10px] text-[#7553FF] font-mono font-bold">USt-IdNr</span>
                        </label>
                        <input
                          type="text"
                          value={vatId}
                          onChange={(e) => setVatId(e.target.value)}
                          placeholder={`${brandCountry}812345678`}
                          className={`w-full bg-white border rounded-xl py-2 px-4 text-[14px] font-light text-[#1C1814] focus:outline-hidden focus:border-[#7553FF] shadow-none ${
                            getVatIdValidationError() ? 'border-amber-400 bg-amber-50/25' : 'border-slate-200'
                          }`}
                          required
                        />
                        {getVatIdValidationError() && (
                          <span className="text-[11px] text-amber-600 font-medium">
                            ⚠️ {getVatIdValidationError()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Fixed Currency Indicator */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start mt-4">
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Settlement Currency
                        </label>
                        <div className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 px-4 text-[14px] font-medium text-slate-700 flex items-center justify-between">
                          <span>Euro (EUR)</span>
                          <span className="font-bold text-xs bg-slate-200 text-slate-800 px-2 py-0.5 rounded-sm font-mono">FIXED TO EUR</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Imagery & Identity (Logo & Banner) */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800 tracking-wider mb-4 border-l-4 border-[#7553FF] pl-2.5">
                      Brand Imagery Assets
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Logo Upload */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Brand Logo Accent
                        </label>
                        <input
                          type="file"
                          ref={logoFileInputRef}
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          className="hidden"
                        />
                        {branchLogoUrl ? (
                          <div className="w-full flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl bg-white h-[140px] relative">
                            <img 
                              src={branchLogoUrl} 
                              alt="Brand Logo" 
                              className="w-20 h-20 object-cover rounded-full border border-slate-200 shadow-3xs"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setBranchLogoUrl("")}
                              className="text-[12px] font-light text-red-500 cursor-pointer mt-2 hover:underline bg-transparent border-none"
                            >
                              Remove Logo
                            </button>
                          </div>
                        ) : (
                          <div
                            onDragEnter={handleLogoDrag}
                            onDragOver={handleLogoDrag}
                            onDragLeave={handleLogoDrag}
                            onDrop={handleLogoDrop}
                            onClick={() => logoFileInputRef.current?.click()}
                            className={`w-full h-[140px] border-2 border-dashed ${
                              logoDragActive ? "border-[#7553FF] bg-slate-50" : "border-slate-200"
                            } rounded-xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors shadow-none`}
                          >
                            <Upload className="w-[18px] h-[18px] text-[#1C1814]/40" />
                            <p className="text-[13px] font-light text-[#1C1814]/70 mt-2 text-center">
                              Click to upload or drag logo
                            </p>
                          </div>
                        )}
                        <span className="text-[11px] font-light text-slate-500">
                          Primary brand icon used on receipt logs and invoice printouts.
                        </span>
                      </div>

                      {/* Cover Banner Upload */}
                      <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-500 tracking-wider">
                          Cover Page Banner
                        </label>
                        <input
                          type="file"
                          ref={coverFileInputRef}
                          accept="image/*"
                          onChange={handleCoverFileChange}
                          className="hidden"
                        />
                        {branchCoverUrl ? (
                          <div className="w-full flex flex-col items-center justify-center p-2 border border-slate-200 rounded-xl bg-white h-[140px]">
                            <img 
                              src={branchCoverUrl} 
                              alt="Cover Banner" 
                              className="w-full h-20 object-cover rounded-lg border border-slate-100"
                              referrerPolicy="no-referrer"
                            />
                            <button
                              type="button"
                              onClick={() => setBranchCoverUrl("")}
                              className="text-[12px] font-light text-red-500 cursor-pointer mt-2 hover:underline bg-transparent border-none"
                            >
                              Remove Cover
                            </button>
                          </div>
                        ) : (
                          <div
                            onDragEnter={handleCoverDrag}
                            onDragOver={handleCoverDrag}
                            onDragLeave={handleCoverDrag}
                            onDrop={handleCoverDrop}
                            onClick={() => coverFileInputRef.current?.click()}
                            className={`w-full h-[140px] border-2 border-dashed ${
                              coverDragActive ? "border-[#7553FF] bg-slate-50" : "border-slate-200"
                            } rounded-xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors shadow-none`}
                          >
                            <Upload className="w-[18px] h-[18px] text-[#1C1814]/40" />
                            <p className="text-[13px] font-light text-[#1C1814]/70 mt-2 text-center">
                              Click to upload or drag banner
                            </p>
                          </div>
                        )}
                        <span className="text-[11px] font-light text-slate-500">
                          Displayed at the top of client menu websites.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Action bar */}
                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 h-11 border-none font-sans"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Brand configurations</span>
                    </button>
                  </div>

                </form>
              </div>

            </div>
          )}

          {/* TAB 2: STORE MANAGEMENT */}
          {activeSubTab === 'store_management' && (
            <div className="space-y-6 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                <div>
                  <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight">
                    Store Locations
                  </h2>
                  <p className="text-[14px] text-slate-700 mt-1 font-sans">
                    Synchronize, audit, and coordinate branch offices linked to your global GastroHub business subscription.
                  </p>
                </div>
                     <button
                  type="button"
                  onClick={() => {
                    setEditingStore(null);
                    setStoreFormName('');
                    setStoreFormAddress('');
                    setStoreFormPhone('');
                    setStoreFormTimezone('Europe/Berlin');
                    setStoreFormHours('08:00 - 22:00');
                    setStoreFormStatus('Active');
                    setStoreFormForgetBehavior('Snap to Shift');
                    setIsStoreModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border-none shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Store Branch</span>
                </button>
              </div>

              {/* Grid list of Stores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stores.map((st) => (
                  <div 
                    key={st.id} 
                    className={`bg-white rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 relative shadow-3xs ${
                      st.status === 'Active' ? 'border-slate-100' : 'border-slate-200 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <span className={`px-2.5 pt-[4px] pb-[4px] rounded-[2px] border text-[10px] font-mono font-normal tracking-wide leading-none ${
                          st.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`} style={{ fontWeight: 'normal', borderRadius: '2px', borderWidth: '1px', paddingTop: '4px', paddingBottom: '4px' }}>
                          {st.status}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStore(st);
                              setStoreFormName(st.name);
                              setStoreFormAddress(st.address);
                              setStoreFormPhone(st.phone);
                              setStoreFormTimezone(st.timezone);
                              setStoreFormHours(st.operatingHours);
                              setStoreFormStatus(st.status);
                              setStoreFormForgetBehavior(st.forgetCheckinBehavior || 'Snap to Shift');
                              setIsStoreModalOpen(true);
                            }}
                            className="w-7 h-7 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center transition border-none cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${st.name}?`)) {
                                setStores(stores.filter(s => s.id !== st.id));
                                triggerLocalToast("Store removed successfully!", "success");
                              }
                            }}
                            className="w-7 h-7 hover:bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center transition border-none cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-[16px] font-bold text-slate-900 truncate leading-snug">
                        {st.name}
                      </h3>
                      <p className="text-[13px] text-slate-700 font-sans font-normal mt-1 leading-normal line-clamp-2 min-h-[40px]">
                        {st.address}
                      </p>

                      <div className="mt-4 space-y-2 pt-3 border-t border-slate-100 text-[12px] font-sans">
                        <div className="flex items-center gap-1.5 text-slate-700 font-normal">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{st.operatingHours} ({st.timezone})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-normal">
                          <AlertCircle className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Forget: <strong className="text-slate-900">{st.forgetCheckinBehavior || 'Snap to Shift'}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-normal">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>ID: <code className="bg-slate-100 px-1 py-0.5 rounded-sm font-mono text-[11px]">{st.id}</code></span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-[11px] font-mono font-bold text-slate-700 tracking-wider">
                      <span>CONTACT: {st.phone}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal popup to add or edit stores */}
              <AnimatePresence>
                {isStoreModalOpen && (
                  <div className="fixed inset-0 z-[99999] overflow-y-auto">
                    <div className="min-h-screen flex items-center justify-center p-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsStoreModalOpen(false)}
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-3xs"
                      />

                      <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 15 }}
                        className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 text-left z-10 space-y-4 border border-slate-100 font-sans"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <h3 className="text-md font-bold text-slate-900">
                            {editingStore ? 'Edit Branch Office' : 'Create Store Location'}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setIsStoreModalOpen(false)}
                            className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition border-none cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-3 pt-2 text-[13px]">
                          {/* Name */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Branch Name *</label>
                            <input
                              type="text"
                              value={storeFormName}
                              onChange={(e) => setStoreFormName(e.target.value)}
                              placeholder="Gastro Hub Munich"
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                              required
                            />
                          </div>

                          {/* Address */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Address *</label>
                            <input
                              type="text"
                              value={storeFormAddress}
                              onChange={(e) => setStoreFormAddress(e.target.value)}
                              placeholder="Karlsplatz 1, 80335 München"
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                              required
                            />
                          </div>

                          {/* Phone */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Contact Hotline *</label>
                            <input
                              type="text"
                              value={storeFormPhone}
                              onChange={(e) => setStoreFormPhone(e.target.value)}
                              placeholder="+49 89 555-1234"
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                              required
                            />
                          </div>

                          {/* Timezone */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Store Timezone</label>
                            <select
                              value={storeFormTimezone}
                              onChange={(e) => setStoreFormTimezone(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                            >
                              <option value="Europe/Berlin">Europe/Berlin (Munich)</option>
                              <option value="Europe/Vienna">Europe/Vienna (Vienna)</option>
                              <option value="Europe/Paris">Europe/Paris (Paris)</option>
                              <option value="Europe/London">Europe/London (London)</option>
                            </select>
                          </div>

                          {/* Operating Hours */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Daily Hours</label>
                            <input
                              type="text"
                              value={storeFormHours}
                              onChange={(e) => setStoreFormHours(e.target.value)}
                              placeholder="08:00 - 22:00"
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                            />
                          </div>

                          {/* Status */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Store Status</label>
                            <select
                              value={storeFormStatus}
                              onChange={(e) => setStoreFormStatus(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>

                          {/* Forget Check-in Behavior */}
                          <div className="space-y-1">
                            <label className="text-slate-700 font-bold tracking-wider text-[11px]">Forget Check-in Behavior</label>
                            <select
                              value={storeFormForgetBehavior}
                              onChange={(e) => setStoreFormForgetBehavior(e.target.value as any)}
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-[#7553FF]"
                            >
                              <option value="Snap to Shift">Snap to Shift</option>
                              <option value="Snap to Actual">Snap to Actual</option>
                            </select>
                            <span className="text-[10px] text-slate-500 leading-tight block">
                              Calculate work hours matching shift limits (Snap to Shift) or actual verified adjustings (Snap to Actual).
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setIsStoreModalOpen(false)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition border-none cursor-pointer"
                          >
                            Cancel
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (!storeFormName || !storeFormAddress || !storeFormPhone) {
                                alert('Please complete all mandatory fields');
                                return;
                              }
                              
                              if (editingStore) {
                                // Update
                                setStores(stores.map(s => s.id === editingStore.id ? {
                                  ...s,
                                  name: storeFormName,
                                  address: storeFormAddress,
                                  phone: storeFormPhone,
                                  timezone: storeFormTimezone,
                                  operatingHours: storeFormHours,
                                  status: storeFormStatus,
                                  forgetCheckinBehavior: storeFormForgetBehavior
                                } : s));
                                triggerLocalToast("Branch details updated", "success");
                              } else {
                                // Add
                                const newId = `store-${Date.now()}`;
                                setStores([
                                  ...stores,
                                  {
                                    id: newId,
                                    name: storeFormName,
                                    address: storeFormAddress,
                                    phone: storeFormPhone,
                                    timezone: storeFormTimezone,
                                    operatingHours: storeFormHours,
                                    status: storeFormStatus,
                                    forgetCheckinBehavior: storeFormForgetBehavior
                                  }
                                ]);
                                triggerLocalToast("New branch created", "success");
                              }
                              setIsStoreModalOpen(false);
                            }}
                            className="px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-bold rounded-xl transition border-none cursor-pointer"
                          >
                            Save location
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 3: NOTIFICATIONS */}
          {activeSubTab === 'notification' && (
            <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm text-left space-y-6">
              <div>
                <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight border-b border-[#1C1814]/5 pb-3">
                  Brand Notification Rules
                </h2>
                <p className="text-[14px] text-slate-700 mt-2 font-sans">
                  Define automated transmission priorities for key business operations. Adjust target alert scopes across global, email, and mobile push notification channels.
                </p>
              </div>

              <div className="overflow-x-auto font-sans pt-2">
                <table className="w-full text-left text-slate-800 text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="py-3 px-4 font-bold tracking-wider text-[11px] text-slate-700">Event Name</th>
                      <th className="py-3 px-4 font-bold tracking-wider text-[11px] text-slate-700">Target Audience</th>
                      <th className="py-3 px-4 font-bold tracking-wider text-[11px] text-slate-700 text-center">Email</th>
                      <th className="py-3 px-4 font-bold tracking-wider text-[11px] text-slate-700 text-center">Web Push</th>
                      <th className="py-3 px-4 font-bold tracking-wider text-[11px] text-slate-700 text-center">Mobile SMS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifRules.map((rule) => (
                      <tr key={rule.id} className="border-b border-slate-100 hover:bg-slate-50/75 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900">{rule.event}</td>
                        <td className="py-3.5 px-4 text-slate-600 font-sans">{rule.audience}</td>
                        
                        {/* Email Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={rule.email}
                            onChange={(e) => {
                              setNotifRules(notifRules.map(r => r.id === rule.id ? { ...r, email: e.target.checked } : r));
                              triggerLocalToast("Email notification rules modified", "success");
                            }}
                            className="accent-[#7553FF] cursor-pointer"
                          />
                        </td>

                        {/* Web Push */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={rule.webPush}
                            onChange={(e) => {
                              setNotifRules(notifRules.map(r => r.id === rule.id ? { ...r, webPush: e.target.checked } : r));
                              triggerLocalToast("Web push parameters updated", "success");
                            }}
                            className="accent-[#7553FF] cursor-pointer"
                          />
                        </td>

                        {/* Mobile Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={rule.mobile}
                            onChange={(e) => {
                              setNotifRules(notifRules.map(r => r.id === rule.id ? { ...r, mobile: e.target.checked } : r));
                              triggerLocalToast("Mobile broadcast preferences synchronized", "success");
                            }}
                            className="accent-[#7553FF] cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs font-normal text-slate-700 flex items-start gap-2.5 leading-relaxed font-sans mt-4">
                <Info className="w-4 h-4 text-[#7553FF] shrink-0 mt-0.5" />
                <span>
                  Rules configured above instantly override standard employee workspace settings. Highly critical system updates (such as account passwords or database state changes) are delivered via all direct channels by default.
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM ACCESS (RolePermission wrapper with strict clearance warning) */}
          {activeSubTab === 'system_access' && (
            <div className="space-y-6 text-left">
              {simulatedUser?.systemAccessLevel !== 'Admin' ? (
                // Chặn truy cập và hiển thị thông báo lỗi nếu không có vai trò Admin
                <div className="bg-white border border-rose-200 rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-xl mx-auto space-y-6 my-10 font-sans">
                  <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500">
                    <Lock className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      You do not have permission to access this feature
                    </h2>
                    <p className="text-slate-600 font-sans text-[14px] leading-relaxed">
                      Only accounts with the <strong>Admin</strong> role are permitted to access this configuration page. Employees and standard privilege groups are restricted from viewing or modifying the System Access settings.
                    </p>
                  </div>
                  <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-xl text-left text-xs font-normal text-rose-800 leading-normal">
                    <strong>Current Simulated Account Details:</strong>
                    <ul className="list-disc pl-4 mt-1.5 space-y-1 font-mono">
                      <li>Full Name: {simulatedUser?.name || "Nguyen An"}</li>
                      <li>Role: {simulatedUser?.role || "Crew Profile"}</li>
                      <li>System Access Level: {simulatedUser?.systemAccessLevel || "Employee"}</li>
                    </ul>
                  </div>
                </div>
              ) : (
                // Hiển thị bình thường nếu là Admin
                <div className="space-y-4">
                  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                    <h2 className="text-[18px] font-bold text-slate-900 tracking-tight mb-1">
                      System Access Control
                    </h2>
                    <p className="text-slate-600 font-sans text-xs leading-relaxed">
                      Configure custom security roles, permission levels, and access blocks for restaurant staff and administrators.
                    </p>
                  </div>

                  <RolePermission 
                    staff={staff} 
                    setStaff={setStaff} 
                    simulatedUser={simulatedUser} 
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 5: HR & PAYROLL COMPLIANCE (German & European labor computational parameters) */}
          {activeSubTab === 'hr_payroll' && (
            <div className="space-y-6 text-left">
              
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#7553FF]/10 text-[#7553FF] rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
                      EU & German Labor Compliance
                    </h2>
                    <p className="text-slate-600 font-sans text-xs mt-0.5 leading-relaxed">
                      Configure federal specifications for German Mini-job limits, automated meal break schedules, FWHA (Arbeitszeitkonto) thresholds, and special premium taxation rules (SFN-Zuschläge).
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveAllSettings} className="space-y-6 font-sans">
                
                {/* 2.5.1 LOCAL LABOR COMPLIANCE (Đức & Áo) */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Local Labor Regulations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Region Selection */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider">
                        Federal Land / Region (German Bundesland)
                      </label>
                      <select
                        value={payrollRegion}
                        onChange={(e) => setPayrollRegion(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-[14px] font-light text-[#1C1814]"
                      >
                        <option value="Bayern">Bayern (Bavaria)</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Hessen">Hessen</option>
                        <option value="Nordrhein-Westfalen">Nordrhein-Westfalen (NRW)</option>
                        <option value="Wien">Wien (Austria)</option>
                      </select>
                    </div>

                    {/* Mini-job low income limit */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider flex items-center justify-between">
                        <span>Mini-Job Geringfügigkeitsgrenze (€)</span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded-sm font-mono font-bold">GERMANY</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          value={lowIncomeThreshold}
                          onChange={(e) => setLowIncomeThreshold(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-4 pr-10 text-[14px] font-light text-[#1C1814]"
                        />
                        <span className="absolute right-4 top-2 text-slate-400 font-mono text-sm">EUR</span>
                      </div>
                      <span className="text-[11px] font-light text-slate-500">
                        Default: €603.00/month (standard German statutory ceiling limit since Jan 2026).
                      </span>
                    </div>
                  </div>

                  {/* Meal Break Deductions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3.5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoBreakDeduction}
                        onChange={(e) => setAutoBreakDeduction(e.target.checked)}
                        className="mt-1 accent-[#7553FF] rounded-xs"
                      />
                      <div>
                        <span className="text-[14px] leading-[21px] font-bold text-slate-800 block">Enforce Statutory Break Deductions (Ruhepausen)</span>
                        <span className="text-xs text-slate-500 font-sans">
                          Automatically deduct unpaid rest breaks if physical shift hours exceed thresholds, matching German ArbZG §4.
                        </span>
                      </div>
                    </label>

                    {autoBreakDeduction && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-sans">
                        {/* Threshold 1 */}
                        <div className="space-y-2 text-left">
                          <span className="font-bold text-slate-700 block tracking-wider text-[10px]">Threshold 1: Shifts &gt; 6 hours</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-500 block">Deduct Min</label>
                              <input 
                                type="number" 
                                value={breakThreshold1Min} 
                                onChange={(e) => setBreakThreshold1Min(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono" 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500 block">Trigger Hour</label>
                              <input 
                                type="number" 
                                step="0.1"
                                value={breakThreshold1Start} 
                                onChange={(e) => setBreakThreshold1Start(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono" 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Threshold 2 */}
                        <div className="space-y-2 text-left">
                          <span className="font-bold text-slate-700 block tracking-wider text-[10px]">Threshold 2: Shifts &gt; 9 hours</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] text-slate-500 block">Deduct Min</label>
                              <input 
                                type="number" 
                                value={breakThreshold2Min} 
                                onChange={(e) => setBreakThreshold2Min(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono" 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-slate-500 block">Trigger Hour</label>
                              <input 
                                type="number" 
                                step="0.1"
                                value={breakThreshold2Start} 
                                onChange={(e) => setBreakThreshold2Start(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2.5.2 FLEXIBLE WORKING HOURS ACCOUNT (FWHA / ARBEITSZEITKONTO) */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Arbeitszeitkonto (FWHA) parameters
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Max Positive Credit */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider">
                        Maximum positive credit limit (Plusstunden)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fwMaxPositive}
                          onChange={(e) => setFwMaxPositive(e.target.value)}
                          placeholder="+40.0"
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-4 pr-10 text-[14px] font-light text-[#1C1814] font-mono"
                        />
                        <span className="absolute right-4 top-2 text-slate-400 text-sm">hours</span>
                      </div>
                      <span className="text-[11px] font-light text-slate-500">
                        Excess hours are capped or flagged for automatic payout audits.
                      </span>
                    </div>

                    {/* Max Negative Debt */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider">
                        Maximum negative debt limit (Minusstunden)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={fwMaxNegative}
                          onChange={(e) => setFwMaxNegative(e.target.value)}
                          placeholder="-20.0"
                          className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-4 pr-10 text-[14px] font-light text-[#1C1814] font-mono"
                        />
                        <span className="absolute right-4 top-2 text-slate-400 text-sm">hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Overtime & Holiday rollover */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={annualLeaveRollover}
                        onChange={(e) => setAnnualLeaveRollover(e.target.checked)}
                        className="mt-1 accent-[#7553FF] rounded-xs"
                      />
                      <div>
                        <span className="text-[14px] leading-[21px] font-bold text-slate-800 block">Annual Leave Rollover Policy (Urlaub Mitnahme)</span>
                        <span className="text-xs text-slate-500 font-sans">
                          Allow employees to roll over unused legal annual holiday credits into the next calendar year Q1.
                        </span>
                      </div>
                    </label>

                    {annualLeaveRollover && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 block tracking-wider">Rollover Rate Ceiling</label>
                          <input 
                            type="number" 
                            value={leaveRolloverRate} 
                            onChange={(e) => setLeaveRolloverRate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400">Maximum Rollover Days allowed (Default: 8.0 days).</span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 block tracking-wider">Overtime Compensation Cycle</label>
                          <select 
                            value={overtimePayoutCycle} 
                            onChange={(e) => setOvertimePayoutCycle(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs w-full h-[32px]"
                          >
                            <option value="Monthly">Payout Monthly (Overtime ledgers)</option>
                            <option value="Quarterly">Roll into FWHA Quarterly</option>
                            <option value="Annual">Annual Settled (Gastro Hub Auto)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2.5.3 PHỤ CẤP ĐẶC BIỆT & TAX-FREE PREMIUM RATES */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Special premiums (SFN-Zuschläge) & Tax Exceptions
                  </h3>

                  <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl text-xs font-sans font-normal leading-relaxed">
                    🌟 <strong>Statutory German EStG § 3b Policy:</strong> Night, Sunday, and holiday premiums are completely exempt from standard wage tax and social security contributions if kept within the default statutory percentage limits configured below.
                  </div>

                  <div className="space-y-1 flex flex-col">
                    <label className="text-xs font-bold text-slate-500 tracking-wider">Statutory Base Salary Model</label>
                    <select
                      value={brandSalaryType}
                      onChange={(e) => setBrandSalaryType(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-[14px]"
                    >
                      <option value="Hourly Rate">Hourly rate basis (EStG standard computed)</option>
                      <option value="Fixed Salary">Fixed monthly salary with dynamic divisor quotients</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                    {/* Evening Premium */}
                    <div className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/50">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={eveningShiftPremiumEnabled}
                          onChange={(e) => setEveningShiftPremiumEnabled(e.target.checked)}
                          className="accent-[#7553FF] rounded-xs"
                        />
                        <span className="text-xs font-bold text-slate-800 tracking-wider">Evening Premium</span>
                      </label>
                      {eveningShiftPremiumEnabled && (
                        <div className="space-y-1.5 text-xs">
                          <label className="text-[10px] text-slate-500 block">Rate Exception (%)</label>
                          <input 
                            type="number" 
                            value={eveningShiftPremiumRate} 
                            onChange={(e) => setEveningShiftPremiumRate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                          <label className="text-[10px] text-slate-500 block mt-1">Start Hour</label>
                          <input 
                            type="text" 
                            value={eveningShiftStartTime} 
                            onChange={(e) => setEveningShiftStartTime(e.target.value)}
                            placeholder="18:00"
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                        </div>
                      )}
                    </div>

                    {/* Night Premium */}
                    <div className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/50">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={nightShiftPremiumEnabled}
                          onChange={(e) => setNightShiftPremiumEnabled(e.target.checked)}
                          className="accent-[#7553FF] rounded-xs"
                        />
                        <span className="text-xs font-bold text-slate-800 tracking-wider">Night Premium</span>
                      </label>
                      {nightShiftPremiumEnabled && (
                        <div className="space-y-1.5 text-xs">
                          <label className="text-[10px] text-slate-500 block">Rate Exception (%)</label>
                          <input 
                            type="number" 
                            value={nightShiftPremiumRate} 
                            onChange={(e) => setNightShiftPremiumRate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                          <label className="text-[10px] text-slate-500 block mt-1">Start Hour (ArbZG §2)</label>
                          <input 
                            type="text" 
                            value={nightShiftStartTime} 
                            onChange={(e) => setNightShiftStartTime(e.target.value)}
                            placeholder="22:00"
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                        </div>
                      )}
                    </div>

                    {/* Sunday Premium */}
                    <div className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/50">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sundayPremiumEnabled}
                          onChange={(e) => setSundayPremiumEnabled(e.target.checked)}
                          className="accent-[#7553FF] rounded-xs"
                        />
                        <span className="text-xs font-bold text-slate-800 tracking-wider">Sunday Premium</span>
                      </label>
                      {sundayPremiumEnabled && (
                        <div className="space-y-1.5 text-xs">
                          <label className="text-[10px] text-slate-500 block">Rate Exception (%)</label>
                          <input 
                            type="number" 
                            value={sundayPremiumRate} 
                            onChange={(e) => setSundayPremiumRate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">Max tax-exempt: 50%</span>
                        </div>
                      )}
                    </div>

                    {/* Holiday Premium */}
                    <div className="border border-slate-100 p-4 rounded-xl space-y-3 bg-slate-50/50">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={holidayPremiumEnabled}
                          onChange={(e) => setHolidayPremiumEnabled(e.target.checked)}
                          className="accent-[#7553FF] rounded-xs"
                        />
                        <span className="text-xs font-bold text-slate-800 tracking-wider">Holiday Premium</span>
                      </label>
                      {holidayPremiumEnabled && (
                        <div className="space-y-1.5 text-xs">
                          <label className="text-[10px] text-slate-500 block">Rate Exception (%)</label>
                          <input 
                            type="number" 
                            value={holidayPremiumRate} 
                            onChange={(e) => setHolidayPremiumRate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400 mt-1 block">Max tax-exempt: 125%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2.5.3b DYNAMIC TIP DISTRIBUTION SETTINGS */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Dynamic Tip Distribution Settings
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Configure automated tip pool allocation weightings for different departments.
                  </p>

                  <div className="pt-2 space-y-3.5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableTipDistribution}
                        onChange={(e) => setEnableTipDistribution(e.target.checked)}
                        className="mt-1 accent-[#7553FF] rounded-xs"
                      />
                      <div>
                        <span className="text-[14px] leading-[21px] font-bold text-slate-800 block">Enable Automated Tip Distribution</span>
                        <span className="text-xs text-slate-500 font-sans">
                          Calculate and distribute periodic tips based on department-specific weight quotients.
                        </span>
                      </div>
                    </label>

                    {enableTipDistribution && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 block tracking-wider">Kitchen Tip Weight</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={tipWeightKitchen} 
                            onChange={(e) => setTipWeightKitchen(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400">Default Kitchen weight: 0.8</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 block tracking-wider">Service Tip Weight</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={tipWeightService} 
                            onChange={(e) => setTipWeightService(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400">Default Service weight: 1.0</span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-500 block tracking-wider">Bar Tip Weight</label>
                          <input 
                            type="number" 
                            step="0.1"
                            value={tipWeightBar} 
                            onChange={(e) => setTipWeightBar(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg p-1.5 text-xs font-mono w-full" 
                          />
                          <span className="text-[10px] text-slate-400">Default Bar weight: 0.9</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2.5.3c VACATION ROLLOVER POLICY SETTINGS */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Vacation Rollover Policy Settings
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Configure rules for rolling over unused holiday balances into the next calendar year.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 tracking-wider block">Allow Vacation Rollover</label>
                      <select
                        value={allowVacationRollover}
                        onChange={(e) => setAllowVacationRollover(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl p-2 text-xs w-full h-[38px] cursor-pointer"
                      >
                        <option value="Yes">Yes (Allow unused days to roll over)</option>
                        <option value="No">No (Unused days forfeit on Dec 31st)</option>
                      </select>
                    </div>

                    {allowVacationRollover === 'Yes' && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 tracking-wider block">Expiry Date for Rollover</label>
                          <select
                            value={vacationRolloverExpiryDate}
                            onChange={(e) => setVacationRolloverExpiryDate(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl p-2 text-xs w-full h-[38px] cursor-pointer"
                          >
                            <option value="31/03">March 31st (Next Year Q1)</option>
                            <option value="30/06">June 30th (Next Year H1)</option>
                            <option value="Never">Never (Does not expire)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 tracking-wider block">Action on Unused Rollover</label>
                          <select
                            value={vacationRolloverRemainderAction}
                            onChange={(e) => setVacationRolloverRemainderAction(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl p-2 text-xs w-full h-[38px] cursor-pointer"
                          >
                            <option value="Expire">Forfeit (Expire to 0)</option>
                            <option value="Convert to Flextime">Convert to Gleitzeit/Flextime (1 Day = 8.0 hrs)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* 2.5.4 BOOKKEEPING EXPORTS & WAGE CODE MAPPINGS */}
                <div className="bg-white border border-[#1C1814]/5 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 tracking-wider border-l-4 border-[#7553FF] pl-2.5">
                    Accounting Wage Codes (Lohnarten Export Mappings)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Export Template Selector */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider">Export Ledger Template</label>
                      <select
                        value={exportTemplate}
                        onChange={(e) => setExportTemplate(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-[14px]"
                      >
                        <option value="DATEV (Đức)">DATEV Lodas / LuG (Germany)</option>
                        <option value="BMD (Áo)">BMD Payroll format (Austria)</option>
                        <option value="Lexoffice">Lexoffice direct sync (API)</option>
                        <option value="Standard CSV">Standard Unified Payroll CSV ledger</option>
                      </select>
                    </div>

                    {/* Base Salary Code */}
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-500 tracking-wider font-sans">Base Salary Wage Code</label>
                      <input
                        type="text"
                        value={codeBaseSalary}
                        onChange={(e) => setCodeBaseSalary(e.target.value)}
                        placeholder="1000"
                        className="w-full bg-white border border-slate-200 rounded-xl py-2 px-4 text-[14px] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-2 font-mono text-xs">
                    {/* Code Evening */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Evening Wage Code</label>
                      <input 
                        type="text" 
                        value={codeEveningPremium} 
                        onChange={(e) => setCodeEveningPremium(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>

                    {/* Code Night */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Night Wage Code</label>
                      <input 
                        type="text" 
                        value={codeNightPremium} 
                        onChange={(e) => setCodeNightPremium(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>

                    {/* Code Sunday */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Sunday Wage Code</label>
                      <input 
                        type="text" 
                        value={codeSundayPremium} 
                        onChange={(e) => setCodeSundayPremium(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>

                    {/* Code Holiday */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Holiday Wage Code</label>
                      <input 
                        type="text" 
                        value={codeHolidayPremium} 
                        onChange={(e) => setCodeHolidayPremium(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>

                    {/* Code Tips Distribution */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Tips Wage Code</label>
                      <input 
                        type="text" 
                        value={codeTipsDistribution} 
                        onChange={(e) => setCodeTipsDistribution(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>

                    {/* Code Overtime Payout */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 tracking-wider font-sans">Overtime Wage Code</label>
                      <input 
                        type="text" 
                        value={codeOvertimePayout} 
                        onChange={(e) => setCodeOvertimePayout(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-1.5 w-full font-mono text-xs" 
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action bar */}
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 h-11 border-none"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Compliance Settings</span>
                  </button>
                </div>

              </form>
            </div>
          )}

      </div>

      {/* PRICING PACKAGES MODAL (POPUP) */}
      <AnimatePresence>
        {isPricingModalOpen && (
          <div className="fixed inset-0 z-[99999] overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              
              {/* Backdrop Blur Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  if (modalSubscribing === null) {
                    setIsPricingModalOpen(false);
                  }
                }}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Modal Card Window */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative bg-white rounded-3xl w-full max-w-5xl shadow-2xl p-6 md:p-8 text-left z-10 space-y-6 border border-slate-100 border-t-0 my-8 font-sans"
              >
                
                {/* Header of Modal */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div className="space-y-1 text-left">
                    <h3 className="text-[20px] font-bold text-slate-900 tracking-tight font-sans">
                      Change Your GastroHub Plan
                    </h3>
                    <p className="text-[14px] text-slate-700 font-sans font-normal leading-relaxed">
                      Select a membership package that best matches your restaurant branch operation size.
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={modalSubscribing !== null}
                    onClick={() => setIsPricingModalOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-700 flex items-center justify-center transition border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Switcher nhộng at top of popup */}
                <div className="flex justify-center items-center py-1">
                  <div className="inline-flex items-center p-1 bg-slate-100/95 rounded-full border border-slate-200/60">
                    <button
                      type="button"
                      disabled={modalSubscribing !== null}
                      onClick={() => setBillingInterval('monthly')}
                      className={`px-5 py-2 text-[14px] font-bold rounded-full transition-all duration-200 cursor-pointer border-none leading-none disabled:cursor-not-allowed ${
                        billingInterval === 'monthly'
                          ? 'bg-white text-[#7553FF] shadow-xs'
                          : 'bg-transparent text-slate-700 hover:text-slate-800 font-sans'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      disabled={modalSubscribing !== null}
                      onClick={() => setBillingInterval('annual')}
                      className={`px-5 py-2 text-[14px] font-bold rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 border-none leading-none disabled:cursor-not-allowed ${
                        billingInterval === 'annual'
                          ? 'bg-white text-[#7553FF] shadow-xs'
                          : 'bg-transparent text-slate-700 hover:text-slate-800 font-sans'
                      }`}
                    >
                      <span>Annual</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 tracking-wide rounded-full font-sans">
                        Save 20%
                      </span>
                    </button>
                  </div>
                </div>

                {/* Simplified Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch pt-2 font-sans">
                  
                  {/* Basic */}
                  {(() => {
                    const planName = 'Basic';
                    const activePrice = billingInterval === 'monthly' ? '$49' : '$39';
                    const subLabel = billingInterval === 'annual' ? 'Billed annually ($468/yr)' : 'Billed monthly';
                    const isCurrent = currentPlan === planName;
                    
                    const btnProps = getButtonProps(planName);
                    
                    return (
                      <div className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                        isCurrent ? 'border-[#7553FF] ring-2 ring-[#7553FF]/15 shadow-sm' : 'border-slate-100 shadow-3xs'
                      }`}>
                        {isCurrent && (
                          <span className="absolute -top-3 right-5 px-2.5 py-0.5 bg-[#7553FF] text-white text-[12px] font-bold tracking-wider rounded-full font-mono">
                            Active
                          </span>
                        )}
                        <div className="space-y-4">
                          <div className="text-left space-y-1">
                            <span className="text-[12px] text-slate-700 font-bold block tracking-widest font-mono">Starter</span>
                            <h4 className="text-[16px] font-bold text-slate-800">Basic Plan</h4>
                          </div>

                          <div className="flex flex-col text-left">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold tracking-tight text-slate-950">{activePrice}</span>
                              <span className="text-[14px] font-medium text-slate-700 font-sans">/mo</span>
                            </div>
                            <span className="text-[12px] text-slate-700 mt-0.5 font-normal font-sans">
                              {subLabel}
                            </span>
                          </div>

                          <div className="h-px bg-slate-100" />

                          <div className="space-y-2">
                            <span className="text-[12px] font-bold text-slate-700 tracking-wider block font-mono">Included Features:</span>
                            <ul className="space-y-2">
                              {modalPlanDetails.Basic.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-slate-700 leading-normal font-normal text-[14px]">
                                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-normal font-sans text-slate-700">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-5">
                          <button
                            type="button"
                            disabled={isCurrent || modalSubscribing !== null}
                            onClick={() => handleModalSubscription(planName)}
                            className={`w-full h-10 font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${btnProps.className}`}
                          >
                            <CreditCard className="w-4 h-4 shrink-0 opacity-80" />
                            <span>{modalSubscribing === planName ? 'Processing...' : btnProps.text}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Gold */}
                  {(() => {
                    const planName = 'Gold';
                    const activePrice = billingInterval === 'monthly' ? '$99' : '$79';
                    const subLabel = billingInterval === 'annual' ? 'Billed annually ($948/yr)' : 'Billed monthly';
                    const isCurrent = currentPlan === planName;
                    
                    const btnProps = getButtonProps(planName);
                    
                    return (
                      <div className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                        isCurrent ? 'border-[#7553FF] ring-2 ring-[#7553FF]/15 shadow-sm' : 'border-slate-100 shadow-3xs'
                      }`}>
                        {isCurrent && (
                          <span className="absolute -top-3 right-5 px-2.5 py-0.5 bg-[#7553FF] text-white text-[12px] font-bold tracking-wider rounded-full font-mono">
                            Active
                          </span>
                        )}
                        <div className="space-y-4">
                          <div className="text-left space-y-1">
                            <span className="text-[12px] text-slate-700 font-bold block tracking-widest font-mono">Team Power</span>
                            <h4 className="text-[16px] font-bold text-slate-800 font-sans">Gold Plan</h4>
                          </div>

                          <div className="flex flex-col text-left">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold tracking-tight text-slate-950 font-sans">{activePrice}</span>
                              <span className="text-[14px] font-medium text-slate-700 font-sans">/mo</span>
                            </div>
                            <span className="text-[12px] text-slate-700 mt-0.5 font-normal font-sans">
                              {subLabel}
                            </span>
                          </div>

                          <div className="h-px bg-slate-100" />

                          <div className="space-y-2">
                            <span className="text-[12px] font-bold text-slate-700 tracking-wider block font-mono">Included Features:</span>
                            <ul className="space-y-2">
                              {modalPlanDetails.Gold.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-slate-700 leading-normal font-normal text-[14px]">
                                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-normal font-sans text-slate-700">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-5">
                          <button
                            type="button"
                            disabled={isCurrent || modalSubscribing !== null}
                            onClick={() => handleModalSubscription(planName)}
                            className={`w-full h-10 font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${btnProps.className}`}
                          >
                            <CreditCard className="w-4 h-4 shrink-0 opacity-80" />
                            <span>{modalSubscribing === planName ? 'Processing...' : btnProps.text}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Diamond */}
                  {(() => {
                    const planName = 'Diamond';
                    const activePrice = billingInterval === 'monthly' ? '$199' : '$159';
                    const subLabel = billingInterval === 'annual' ? 'Billed annually ($1908/yr)' : 'Billed monthly';
                    const isCurrent = currentPlan === planName;
                    
                    const btnProps = getButtonProps(planName);
                    
                    return (
                      <div className={`bg-gradient-to-b from-white to-indigo-50/25 border-2 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative ${
                        isCurrent ? 'border-indigo-600 ring-2 ring-indigo-600/15 shadow-md' : 'border-slate-200 shadow-xs'
                      }`}>
                        {isCurrent ? (
                          <span className="absolute -top-3 right-5 px-2.5 py-0.5 bg-indigo-600 text-white text-[12px] font-bold tracking-wider rounded-full font-mono">
                            Active
                          </span>
                        ) : (
                          <span className="absolute -top-3 right-5 px-2.5 py-0.5 bg-gradient-to-r from-[#7553FF] to-indigo-600 text-white text-[11px] font-bold tracking-wider rounded-full flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 fill-white" />
                            <span>Premium</span>
                          </span>
                        )}
                        <div className="space-y-4">
                          <div className="text-left space-y-1">
                            <span className="text-[12px] text-indigo-600 font-bold block tracking-widest font-mono">Enterprise Elite</span>
                            <h4 className="text-[16px] font-bold text-[#7553FF] font-sans">Diamond Plan</h4>
                          </div>

                          <div className="flex flex-col text-left">
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold tracking-tight text-indigo-600 font-sans">{activePrice}</span>
                              <span className="text-[14px] font-medium text-slate-700 font-sans">/mo</span>
                            </div>
                            <span className="text-[12px] text-indigo-600 mt-0.5 font-normal font-sans">
                              {subLabel}
                            </span>
                          </div>

                          <div className="h-px bg-slate-100" />

                          <div className="space-y-2">
                            <span className="text-[12px] font-bold text-[#7553FF] tracking-wider block font-mono">Included Features:</span>
                            <ul className="space-y-2">
                              {modalPlanDetails.Diamond.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-slate-700 leading-normal font-normal text-[14px]">
                                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                  <span className="font-normal font-sans text-slate-700">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-5">
                          <button
                            type="button"
                            disabled={isCurrent || modalSubscribing !== null}
                            onClick={() => handleModalSubscription(planName)}
                            className={`w-full h-10 font-bold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${btnProps.className}`}
                          >
                            <CreditCard className="w-4 h-4 shrink-0 opacity-80" />
                            <span>{modalSubscribing === planName ? 'Processing...' : btnProps.text}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                </div>

                {/* Sub-footer details */}
                <div className="pt-2 text-center text-slate-700 font-sans font-normal text-xs leading-normal">
                  Payments are secure and processed with bank-level encryption. No hidden fees or lock-ins.
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
