import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Users, 
  Search, 
  Save, 
  Lock, 
  Plus, 
  Trash2, 
  Check, 
  Globe, 
  X, 
  AlertCircle,
  Edit2,
  DollarSign,
  Briefcase,
  Layers,
  CreditCard,
  FileText,
  RefreshCw,
  TrendingUp,
  Settings as SettingsIcon,
  ToggleLeft,
  ArrowRight,
  Download,
  AlertTriangle,
  Terminal,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Design tokens matching DESIGN.md Vuexy theme
const colors = {
  primary: '#7553FF',
  primarySoft: '#F0ECFF',
  primaryHover: '#623EE2',
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#1D4ED8',
  slate: {
    50: '#FAF9F7',
    100: '#EAE4DC',
    200: '#DCD2C7',
    700: '#5C534C',
    800: '#1C1814',
  }
};

// Types corresponding to PRD section 2
export interface TenantBrand {
  brandId: string;
  brandName: string;
  vatId: string;
  localTaxId: string;
  subscriptionPlanId: 'Free' | 'Gold' | 'Diamond';
  subscriptionStatus: 'Trial' | 'Active' | 'Past Due' | 'Suspended';
  ownerEmail: string;
  creationDate: string;
  billingAddress: string;
  creditBalance: number;
}

// Types corresponding to PRD section 3
export interface SubscriptionPlanConfig {
  planId: 'Free' | 'Gold' | 'Diamond';
  planName: string;
  enabledModules: string[];
  signupGiftCredits: number;
  defaultPriceMonthly: number;
}

// Types corresponding to PRD section 5
export interface SuperAdminRole {
  roleId: string;
  roleName: string;
  description: string;
  assignedUsersCount: number;
  isSystem: boolean;
  permissions: {
    brands: { read: boolean; create: boolean; write: boolean; delete: boolean };
    plans: { read: boolean; create: boolean; write: boolean; delete: boolean };
    admins: { read: boolean; create: boolean; write: boolean; delete: boolean };
    billing: { read: boolean; write: boolean }; // Billing only has Read and Write per PRD matrix
  };
}

// Initial Data corresponding to PRD-Super-Admin
const INITIAL_BRANDS: TenantBrand[] = [
  {
    brandId: 'brand-b1',
    brandName: 'Sabai Dee Frankfurt',
    vatId: 'DE811234567',
    localTaxId: '04/123/45678',
    subscriptionPlanId: 'Gold',
    subscriptionStatus: 'Past Due',
    ownerEmail: 'owner@sabaidee-frankfurt.de',
    creationDate: '2026-01-15',
    billingAddress: 'Kaiserstraße 12, 60311 Frankfurt am Main, Germany',
    creditBalance: 450
  },
  {
    brandId: 'brand-b2',
    brandName: "John's Bistro Munich",
    vatId: 'DE987654321',
    localTaxId: '09/456/78912',
    subscriptionPlanId: 'Diamond',
    subscriptionStatus: 'Active',
    ownerEmail: 'john@johnsbistro.de',
    creationDate: '2025-11-01',
    billingAddress: 'Marienplatz 8, 80331 München, Germany',
    creditBalance: 3200
  },
  {
    brandId: 'brand-b3',
    brandName: 'Pizzeria Bella Italia Berlin',
    vatId: 'DE123456789',
    localTaxId: '12/789/12345',
    subscriptionPlanId: 'Free',
    subscriptionStatus: 'Trial',
    ownerEmail: 'luigi@bellaitalia.de',
    creationDate: '2026-07-02',
    billingAddress: 'Alexanderplatz 2, 10178 Berlin, Germany',
    creditBalance: 0 // Out of credits for AI testing
  },
  {
    brandId: 'brand-b4',
    brandName: 'Hofbräuhaus Stuttgart',
    vatId: 'DE345678912',
    localTaxId: '14/345/67890',
    subscriptionPlanId: 'Gold',
    subscriptionStatus: 'Suspended',
    ownerEmail: 'info@hofbraeuhaus-stuttgart.de',
    creationDate: '2025-05-10',
    billingAddress: 'Schlossplatz 4, 70173 Stuttgart, Germany',
    creditBalance: 120
  }
];

const INITIAL_PLAN_CONFIGS: SubscriptionPlanConfig[] = [
  {
    planId: 'Free',
    planName: 'Free Starter',
    enabledModules: [
      'Staff & Roles', 
      'Shift Planner', 
      'Role & Permission', 
      'Social account', 
      'Admin approval',
      'Menu Translator', 
      'AI Food Images', 
      'Menu Price Update', 
      'QR For Menu', 
      'Allergen Intelligence'
    ],
    signupGiftCredits: 300,
    defaultPriceMonthly: 0.00
  },
  {
    planId: 'Gold',
    planName: 'Gold Business',
    enabledModules: [
      'Staff & Roles', 
      'Shift Planner', 
      'Role & Permission', 
      'Social account', 
      'Admin approval',
      'Menu Translator', 
      'AI Food Images', 
      'Menu Price Update', 
      'QR For Menu', 
      'Allergen Intelligence',
      'Checkin', 
      'Leave & Flec Calc', 
      'Payroll'
    ],
    signupGiftCredits: 1000,
    defaultPriceMonthly: 99.00
  },
  {
    planId: 'Diamond',
    planName: 'Diamond Enterprise',
    enabledModules: [
      'Staff & Roles', 
      'Shift Planner', 
      'Role & Permission', 
      'Social account', 
      'Admin approval',
      'Menu Translator', 
      'AI Food Images', 
      'Menu Price Update', 
      'QR For Menu', 
      'Allergen Intelligence',
      'Checkin', 
      'Leave & Flec Calc', 
      'Payroll',
      'DATEV Export' // Rich tax accounting export
    ],
    signupGiftCredits: 3000,
    defaultPriceMonthly: 199.00
  }
];

const INITIAL_ROLES: SuperAdminRole[] = [
  {
    roleId: 'sa-role-1',
    roleName: 'Administrator',
    description: 'Supreme super admin with unrestricted read, write, and delete permissions over all brand environments, billing ledgers, and operator accounts.',
    assignedUsersCount: 3,
    isSystem: true,
    permissions: {
      brands: { read: true, create: true, write: true, delete: true },
      plans: { read: true, create: true, write: true, delete: true },
      admins: { read: true, create: true, write: true, delete: true },
      billing: { read: true, write: true }
    }
  },
  {
    roleId: 'sa-role-2',
    roleName: 'Billing Manager',
    description: 'Manages subscription plan structures, handles pricing indices, issues European VAT invoices, and audits payment failure grace periods.',
    assignedUsersCount: 2,
    isSystem: true,
    permissions: {
      brands: { read: true, create: false, write: true, delete: false },
      plans: { read: true, create: true, write: true, delete: true },
      admins: { read: true, create: false, write: false, delete: false },
      billing: { read: true, write: true }
    }
  },
  {
    roleId: 'sa-role-3',
    roleName: 'Support Staff',
    description: 'Assists active restaurant clients with workspace configurations and general questions. restricted from billing settings or account destruction.',
    assignedUsersCount: 6,
    isSystem: false,
    permissions: {
      brands: { read: true, create: true, write: true, delete: false },
      plans: { read: true, create: false, write: false, delete: false },
      admins: { read: true, create: false, write: false, delete: false },
      billing: { read: true, write: false }
    }
  },
  {
    roleId: 'sa-role-4',
    roleName: 'Read-only Operator',
    description: 'System auditor role. Can monitor subscription indices and trace brand coordinates, but strictly forbidden from modifying any parameters.',
    assignedUsersCount: 4,
    isSystem: true,
    permissions: {
      brands: { read: true, create: false, write: false, delete: false },
      plans: { read: true, create: false, write: false, delete: false },
      admins: { read: true, create: false, write: false, delete: false },
      billing: { read: true, write: false }
    }
  }
];

const TRANSACTIONS_MOCK = [
  { id: 'TX-9021', brandName: 'Sabai Dee Frankfurt', amount: 99.00, method: 'Stripe Card', status: 'Failed', date: '2026-06-01', details: 'Card Expired / Insufficient Funds' },
  { id: 'TX-9022', brandName: "John's Bistro Munich", amount: 199.00, method: 'SEPA Direct Debit', status: 'Succeeded', date: '2026-07-01', details: 'Direct Debit Cleared' },
  { id: 'TX-9023', brandName: 'Pizzeria Bella Italia Berlin', amount: 0.00, method: 'N/A', status: 'Trial Free', date: '2026-07-02', details: 'Account Provisioning' },
  { id: 'TX-9024', brandName: 'Hofbräuhaus Stuttgart', amount: 99.00, method: 'SEPA Direct Debit', status: 'Failed', date: '2026-05-10', details: 'SEPA Return: Account Closed' },
  { id: 'TX-9025', brandName: "John's Bistro Munich", amount: 80.00, method: 'Stripe Card', status: 'Succeeded', date: '2026-07-05', details: 'Top-up 1000 Credits purchase' }
];

interface SuperAdminPortalProps {
  activeTab?: string;
  setActiveTab?: (tab: any) => void;
}

export default function SuperAdminPortal({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }: SuperAdminPortalProps = {}) {
  const [localActiveTab, setLocalActiveTab] = useState<'overview' | 'brands' | 'plans' | 'billing' | 'roles'>('overview');

  const activeTab = (() => {
    if (!propActiveTab) return localActiveTab;
    if (propActiveTab === 'saas-overview') return 'overview';
    if (propActiveTab === 'saas-brands') return 'brands';
    if (propActiveTab === 'saas-plans') return 'plans';
    if (propActiveTab === 'saas-billing') return 'billing';
    if (propActiveTab === 'saas-roles') return 'roles';
    return 'overview';
  })();

  const setActiveTab = (tab: 'overview' | 'brands' | 'plans' | 'billing' | 'roles') => {
    if (propSetActiveTab) {
      if (tab === 'overview') propSetActiveTab('saas-overview');
      else if (tab === 'brands') propSetActiveTab('saas-brands');
      else if (tab === 'plans') propSetActiveTab('saas-plans');
      else if (tab === 'billing') propSetActiveTab('saas-billing');
      else if (tab === 'roles') propSetActiveTab('saas-roles');
    } else {
      setLocalActiveTab(tab);
    }
  };
  
  // Real reactive state persisted in localStorage
  const [brands, setBrands] = useState<TenantBrand[]>(() => {
    const cached = localStorage.getItem('gastro_saas_brands');
    return cached ? JSON.parse(cached) : INITIAL_BRANDS;
  });

  const [plans, setPlans] = useState<SubscriptionPlanConfig[]>(() => {
    const cached = localStorage.getItem('gastro_saas_plans');
    return cached ? JSON.parse(cached) : INITIAL_PLAN_CONFIGS;
  });

  const [roles, setRoles] = useState<SuperAdminRole[]>(() => {
    const cached = localStorage.getItem('gastro_saas_roles');
    return cached ? JSON.parse(cached) : INITIAL_ROLES;
  });

  const [transactions, setTransactions] = useState(TRANSACTIONS_MOCK);
  
  // Operational audit log tracking real platform adjustments
  const [auditLogs, setAuditLogs] = useState<string[]>([
    '[SYSTEM] GastroHub SaaS Control Center online.',
    '[SYSTEM] Operational audit logging active. Secure channel established.'
  ]);
  
  // Search states
  const [brandSearch, setBrandSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Trial' | 'Active' | 'Past Due' | 'Suspended'>('all');

  // Modal / Selected entity states
  const [selectedBrand, setSelectedBrand] = useState<TenantBrand | null>(null);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanConfig | null>(null);
  const [editingRole, setEditingRole] = useState<SuperAdminRole | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isNewRole, setIsNewRole] = useState(false);
  
  // Invoice state
  const [activeInvoice, setActiveInvoice] = useState<{
    invoiceNo: string;
    brand: TenantBrand;
    planConfig: SubscriptionPlanConfig;
    netAmount: number;
    vatAmount: number;
    grossAmount: number;
    billingDate: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('gastro_saas_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('gastro_saas_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('gastro_saas_roles', JSON.stringify(roles));
  }, [roles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const addLog = (log: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setAuditLogs(prev => [`[${timestamp}] ${log}`, ...prev.slice(0, 49)]);
  };

  // Generate European VAT Standard Invoice
  const generateInvoice = (brand: TenantBrand) => {
    const planConfig = plans.find(p => p.planId === brand.subscriptionPlanId) || plans[1];
    const netAmount = planConfig.defaultPriceMonthly;
    const vatRate = 0.19; // 19% standard German Mehrwertsteuer (MwSt.)
    const vatAmount = parseFloat((netAmount * vatRate).toFixed(2));
    const grossAmount = parseFloat((netAmount + vatAmount).toFixed(2));
    const invoiceNo = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const billingDate = new Date().toISOString().split('T')[0];

    setActiveInvoice({
      invoiceNo,
      brand,
      planConfig,
      netAmount,
      vatAmount,
      grossAmount,
      billingDate
    });
    addLog(`INVOICE ENGINE: Compiled compliant European standard VAT invoice ${invoiceNo} for ${brand.brandName}.`);
  };

  return (
    <div className="space-y-6 w-full font-sans text-left bg-[#FAFAFA] min-h-screen pt-6 pb-6 pl-0 pr-0">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-slate-900 border border-white/10 text-white px-5 py-4 rounded-lg shadow-lg text-[14px]"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main SaaS Platform Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-[#7553FF]/10 text-[#7553FF] rounded-2xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-700 font-medium tracking-wider">Active Brands</span>
            <h3 className="text-[24px] font-bold text-slate-900 leading-none mt-1">
              {brands.filter(b => b.subscriptionStatus === 'Active').length} <span className="text-xs text-slate-500 font-normal">/ {brands.length} Total</span>
            </h3>
            <p className="text-[11px] text-slate-700 font-sans mt-1">
              <span className="text-[#15803D] font-bold">100%</span> Platform Uptime SLA
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-700 font-medium tracking-wider">SaaS Monthly MRR</span>
            <h3 className="text-[24px] font-bold text-slate-900 leading-none mt-1">
              €{brands.reduce((acc, b) => {
                const plan = plans.find(p => p.planId === b.subscriptionPlanId);
                return acc + (b.subscriptionStatus === 'Active' ? (plan?.defaultPriceMonthly || 0) : 0);
              }, 0).toFixed(2)}
            </h3>
            <p className="text-[11px] text-slate-700 font-sans mt-1">
              German VAT (19%) excluded
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-700 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-700 font-medium tracking-wider">Failing Accounts</span>
            <h3 className="text-[24px] font-bold text-slate-900 leading-none mt-1">
              {brands.filter(b => b.subscriptionStatus === 'Past Due' || b.subscriptionStatus === 'Suspended').length}
            </h3>
            <p className="text-[11px] text-slate-700 font-sans mt-1">
              Requires SEPA Direct Debit audit
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-indigo-50 text-indigo-700 rounded-2xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-700 font-medium tracking-wider">Wallet Balance</span>
            <h3 className="text-[24px] font-bold text-slate-900 leading-none mt-1">
              {brands.reduce((acc, b) => acc + b.creditBalance, 0)} <span className="text-xs text-slate-500 font-normal">credits</span>
            </h3>
            <p className="text-[11px] text-slate-700 font-sans mt-1">
              Top-up index healthy
            </p>
          </div>
        </div>
      </div>

      {/* Main Container: Sidebar + Content */}
      <div className={propActiveTab ? "w-full" : "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"}>
        
        {/* Navigation Sidebar (Only rendered if NOT integrated in main layout) */}
        {!propActiveTab && (
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-[#EAE4DC] rounded-2xl p-4 shadow-xs text-left">
              <span className="text-xs font-semibold tracking-wider text-slate-700 block mb-3 px-1">Super Admin Subdomains</span>
              <div className="space-y-1">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
                  { id: 'brands', label: 'Brand & Tenants', icon: Globe },
                  { id: 'plans', label: 'Subscription Plans', icon: Layers },
                  { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard },
                  { id: 'roles', label: 'Operator Roles & Matrix', icon: Shield }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all text-xs font-semibold select-none border-none cursor-pointer ${
                        activeTab === item.id 
                          ? 'bg-[#7553FF] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#7553FF]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Content Panel */}
        <div className={propActiveTab ? "w-full space-y-6" : "lg:col-span-9 space-y-6"}>

          {/* Tab 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-sm text-left">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">SaaS Central Diagnostics Console</h2>
                <p className="text-xs text-slate-700 font-sans mt-0.5 leading-relaxed">
                  Real-time telemetry and subscription compliance metrics for the Gastro Hub SaaS ecosystem.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/60">
                    <span className="text-xs text-slate-700 font-semibold">Pending Invoices</span>
                    <p className="text-2xl font-bold text-amber-700 mt-1">2 Accounts</p>
                    <span className="text-[11px] text-slate-700 block mt-1 font-mono">SEPA direct debit collection pending</span>
                  </div>
                  <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/60">
                    <span className="text-xs text-slate-700 font-semibold">Active Free Trials</span>
                    <p className="text-2xl font-bold text-[#7553FF] mt-1">1 Brand</p>
                    <span className="text-[11px] text-slate-700 block mt-1 font-mono">Gift Credits: 300 / trial</span>
                  </div>
                  <div className="border border-slate-100 p-4 rounded-xl bg-slate-50/60">
                    <span className="text-xs text-slate-700 font-semibold">Security Compliance</span>
                    <p className="text-2xl font-bold text-emerald-700 mt-1">100% Guarded</p>
                    <span className="text-[11px] text-slate-700 block mt-1 font-mono">Role matrix checking enabled</span>
                  </div>
                </div>
              </div>

              {/* Live Telemetry Log Feed */}
              <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl shadow-sm font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="font-semibold text-xs text-slate-400">SaaS Platform Operations Log</span>
                  </div>
                  <button 
                    onClick={() => setAuditLogs([])} 
                    className="text-slate-400 hover:text-slate-200 text-xs border border-slate-800 px-2 py-1 rounded cursor-pointer select-none bg-transparent"
                  >
                    Clear Log
                  </button>
                </div>
                
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 text-left">
                  {auditLogs.length === 0 ? (
                    <p className="text-slate-600 italic">[Log empty. Awaiting operational activities...]</p>
                  ) : (
                    auditLogs.map((log, index) => (
                      <p key={index} className="leading-relaxed whitespace-pre-wrap font-mono">
                        {log.includes('SECURITY') ? (
                          <span className="text-rose-400 font-bold">{log}</span>
                        ) : log.includes('LIMIT') ? (
                          <span className="text-amber-400 font-bold">{log}</span>
                        ) : log.includes('INVOICE') ? (
                          <span className="text-emerald-400 font-bold">{log}</span>
                        ) : (
                          <span className="text-slate-300">{log}</span>
                        )}
                      </p>
                    ))
                  )}
                </div>
              </div>

              {/* SaaS SLA & Service Integrity Monitor */}
              <div className="bg-white border border-[#EAE4DC] rounded-2xl p-6 shadow-xs text-left space-y-4">
                <h3 className="text-base font-bold text-slate-900">SaaS SLA & Compliance Overview</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  GastroHub monitors enterprise data localization, European VAT conformance, and merchant uptime guarantees. All systems conform to GDPR storage directives.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-slate-100 p-4 rounded-xl space-y-2 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7553FF]" />
                      <h4 className="text-[13px] font-bold text-slate-800 font-sans">GDPR Data Residency</h4>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      Customer data for DE/AT/CH regions is localized in <strong className="text-[#7553FF]">eu-central-1 (Frankfurt)</strong>. Multi-zone backup storage is synchronized every 60 seconds with advanced cloud compliance checks.
                    </p>
                  </div>

                  <div className="border border-slate-100 p-4 rounded-xl space-y-2 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7553FF]" />
                      <h4 className="text-[13px] font-bold text-slate-800 font-sans">VAT Compliance Verification</h4>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      The billing engine automatically verifies European VIES VAT IDs. Standard German taxation rate is dynamically fixed to <strong className="text-[#7553FF]">19% MwSt.</strong> with direct DATEV Export enablement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: BRANDS */}
          {activeTab === 'brands' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Brand & Tenants Directories</h2>
                    <p className="text-xs text-slate-700 mt-0.5">Edit tenant subscription stages, monitor local tax certificates, and top-up client credits.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-700 absolute left-2.5 top-2.5" />
                      <input 
                        type="text" 
                        placeholder="Search brand, email, VAT..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] w-48 font-sans"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e: any) => setStatusFilter(e.target.value)}
                      className="py-1.5 px-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] font-sans"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Trial">Trial</option>
                      <option value="Active">Active</option>
                      <option value="Past Due">Past Due</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Table list of Brands */}
                <div className="overflow-x-auto mt-5 border border-slate-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Brand Name</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Owner Contact</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Plan Tier</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Uptime Status</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Wallet</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {brands.filter(b => {
                        const matchesSearch = b.brandName.toLowerCase().includes(brandSearch.toLowerCase()) || 
                                             b.ownerEmail.toLowerCase().includes(brandSearch.toLowerCase()) ||
                                             b.vatId.includes(brandSearch);
                        const matchesStatus = statusFilter === 'all' || b.subscriptionStatus === statusFilter;
                        return matchesSearch && matchesStatus;
                      }).map((b) => (
                        <tr key={b.brandId} className="hover:bg-slate-50/30 transition-all">
                          <td className="p-3 font-sans text-[14px] font-normal text-slate-900">
                            <div>
                              <span>{b.brandName}</span>
                              <span className="block font-mono text-[10px] text-slate-700 font-normal mt-0.5">{b.brandId}</span>
                            </div>
                          </td>
                          <td className="p-3 font-sans text-[14px] font-normal text-slate-700">
                            <div>
                              <span>{b.ownerEmail}</span>
                              <span className="block font-mono text-[10px] mt-0.5 text-slate-700">VAT: {b.vatId}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-[2px] text-xs font-normal border ${
                              b.subscriptionPlanId === 'Diamond' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                              b.subscriptionPlanId === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                              'bg-slate-50 text-slate-700 border-slate-100'
                            }`}>
                              {b.subscriptionPlanId}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-[2px] text-xs font-normal border inline-flex items-center gap-1 ${
                              b.subscriptionStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              b.subscriptionStatus === 'Trial' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                              'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                              <span>{b.subscriptionStatus}</span>
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[14px] font-normal text-slate-900">
                            {b.creditBalance} cr
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedBrand(b)}
                                className="px-2 py-1 bg-slate-50 border border-slate-200 hover:border-[#7553FF] hover:text-[#7553FF] rounded text-[11px] font-medium cursor-pointer"
                              >
                                Configure
                              </button>
                              <button
                                onClick={() => generateInvoice(b)}
                                title="Issue compliant PDF/VAT invoice"
                                className="px-2 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[11px] font-medium cursor-pointer flex items-center gap-1"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Invoice</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Brand Configurator Overlay / Drawer Modal */}
              <AnimatePresence>
                {selectedBrand && (
                  <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col text-left"
                    >
                      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div>
                          <span className="text-[10px] font-bold text-[#7553FF] uppercase tracking-wider">Tenant Profile Configurator</span>
                          <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">{selectedBrand.brandName}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedBrand(null)}
                          className="p-1 hover:bg-slate-100 rounded border-none cursor-pointer bg-transparent"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto bg-[#FAFAFA]">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-slate-700 font-semibold block mb-1">Status Code</label>
                            <select
                              value={selectedBrand.subscriptionStatus}
                              onChange={(e) => {
                                const newStatus = e.target.value as any;
                                setBrands(prev => prev.map(b => b.brandId === selectedBrand.brandId ? { ...b, subscriptionStatus: newStatus } : b));
                                setSelectedBrand(prev => prev ? { ...prev, subscriptionStatus: newStatus } : null);
                                addLog(`UPDATE BRAND: Manually adjusted status of ${selectedBrand.brandName} to ${newStatus}.`);
                                if (newStatus === 'Suspended') {
                                  addLog(`COMPLIANCE BLOCK: Terminated session tokens of all users bound to ${selectedBrand.brandName}.`);
                                }
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#7553FF] font-sans"
                            >
                              <option value="Trial">Trial</option>
                              <option value="Active">Active</option>
                              <option value="Past Due">Past Due</option>
                              <option value="Suspended">Suspended</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-slate-700 font-semibold block mb-1">Pricing Plan Tier</label>
                            <select
                              value={selectedBrand.subscriptionPlanId}
                              onChange={(e) => {
                                const newPlan = e.target.value as any;
                                setBrands(prev => prev.map(b => b.brandId === selectedBrand.brandId ? { ...b, subscriptionPlanId: newPlan } : b));
                                setSelectedBrand(prev => prev ? { ...prev, subscriptionPlanId: newPlan } : null);
                                addLog(`UPDATE PLAN: Upgraded plan tier of ${selectedBrand.brandName} to ${newPlan}.`);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#7553FF] font-sans"
                            >
                              <option value="Free">Free</option>
                              <option value="Gold">Gold</option>
                              <option value="Diamond">Diamond</option>
                            </select>
                          </div>
                        </div>

                        {/* Credit Adjuster */}
                        <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2.5">
                          <label className="text-xs text-slate-800 font-bold block">Credit Balance Adjuster</label>
                          <p className="text-[11px] text-slate-700">Modify available AI wallet credits directly. Top-ups reflect in real-time.</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={selectedBrand.creditBalance}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                setBrands(prev => prev.map(b => b.brandId === selectedBrand.brandId ? { ...b, creditBalance: val } : b));
                                setSelectedBrand(prev => prev ? { ...prev, creditBalance: val } : null);
                              }}
                              className="w-full p-2 bg-[#FAFAFA] border border-slate-200 rounded-lg focus:outline-none focus:border-[#7553FF] font-mono text-xs font-bold"
                            />
                            <div className="flex gap-1 shrink-0">
                              <button 
                                onClick={() => {
                                  const newVal = selectedBrand.creditBalance + 100;
                                  setBrands(prev => prev.map(b => b.brandId === selectedBrand.brandId ? { ...b, creditBalance: newVal } : b));
                                  setSelectedBrand(prev => prev ? { ...prev, creditBalance: newVal } : null);
                                  addLog(`TOP-UP CREDITS: Granted +100 credits to ${selectedBrand.brandName}.`);
                                  showToast(`Granted +100 credits to ${selectedBrand.brandName}.`);
                                }}
                                className="px-2.5 py-2 bg-[#7553FF]/10 hover:bg-[#7553FF]/18 text-[#7553FF] rounded-lg font-bold border-none cursor-pointer text-xs"
                              >
                                +100
                              </button>
                              <button 
                                onClick={() => {
                                  const newVal = Math.max(0, selectedBrand.creditBalance - 100);
                                  setBrands(prev => prev.map(b => b.brandId === selectedBrand.brandId ? { ...b, creditBalance: newVal } : b));
                                  setSelectedBrand(prev => prev ? { ...prev, creditBalance: newVal } : null);
                                  addLog(`DEBIT CREDITS: Subtracted -100 credits from ${selectedBrand.brandName}.`);
                                }}
                                className="px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg font-bold border-none cursor-pointer text-xs"
                              >
                                -100
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Tax Coordinates details */}
                        <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                          <span className="font-bold text-slate-800 block">EU Tax Coordinates</span>
                          <div className="space-y-1 bg-[#FAFAFA] p-2.5 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-700">
                            <p><strong>Local Tax ID:</strong> {selectedBrand.localTaxId}</p>
                            <p><strong>European VAT ID:</strong> {selectedBrand.vatId}</p>
                            <p><strong>Registered Address:</strong> {selectedBrand.billingAddress}</p>
                            <p><strong>Onboard Date:</strong> {selectedBrand.creationDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
                        <button
                          onClick={() => setSelectedBrand(null)}
                          className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-800"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tab 3: SUBSCRIPTION PLANS */}
          {activeTab === 'plans' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-sm">
                <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Dynamic Package Settings & Module Permissions</h2>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  Super Admins possess global authority to toggle activated functional modules, adjust standard monthly price tags, and synchronize changes instantly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {plans.map((p) => (
                    <div key={p.planId} className="border border-[#EAE4DC] bg-white rounded-2xl p-5 flex flex-col justify-between shadow-xs">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mt-1.5">{p.planName}</h3>
                        
                        <div className="mt-4 space-y-1 bg-[#FAFAFA] p-3 rounded-xl border border-slate-100">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-700">Gift Credits:</span>
                            <strong className="text-slate-900 font-mono">{p.signupGiftCredits} cr</strong>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-slate-700">Standard Price:</span>
                            <strong className="text-slate-900 font-mono">€{p.defaultPriceMonthly.toFixed(2)}/mo</strong>
                          </div>
                        </div>

                        <div className="mt-4 space-y-3">
                          <span className="text-[11px] font-bold uppercase text-slate-700 block">Activated Modules ({p.enabledModules.length})</span>
                          <div className="max-h-[140px] overflow-y-auto space-y-3 pr-1">
                            {p.enabledModules.map((m, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 font-sans">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="truncate">{m}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => setEditingPlan(p)}
                          className="w-full py-1.5 bg-slate-50 border border-slate-200 hover:border-[#7553FF] hover:text-[#7553FF] rounded-lg text-xs font-semibold cursor-pointer text-slate-800"
                        >
                          Modify Package Configuration
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Package Config Modal */}
              <AnimatePresence>
                {editingPlan && (
                  <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col text-left"
                    >
                      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div>
                          <span className="text-[10px] font-bold text-[#7553FF] uppercase tracking-wider">Dynamic Package Settings</span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">Edit Tier: {editingPlan.planName}</h3>
                        </div>
                        <button 
                          onClick={() => setEditingPlan(null)}
                          className="p-1 hover:bg-slate-100 rounded border-none cursor-pointer bg-transparent"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto bg-[#FAFAFA]">
                        
                        {/* Numeric Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-slate-700 font-bold block mb-1">Default Price (EUR / mo)</label>
                            <input
                              type="number"
                              value={editingPlan.defaultPriceMonthly}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                setPlans(prev => prev.map(p => p.planId === editingPlan.planId ? { ...p, defaultPriceMonthly: val } : p));
                                setEditingPlan(prev => prev ? { ...prev, defaultPriceMonthly: val } : null);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-700 font-bold block mb-1">Signup Gift Credits</label>
                            <input
                              type="number"
                              value={editingPlan.signupGiftCredits}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                setPlans(prev => prev.map(p => p.planId === editingPlan.planId ? { ...p, signupGiftCredits: val } : p));
                                setEditingPlan(prev => prev ? { ...prev, signupGiftCredits: val } : null);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] font-mono font-bold"
                            />
                          </div>
                        </div>

                        {/* Module checklist */}
                        <div className="space-y-2">
                          <label className="text-xs text-slate-700 font-bold block">Available Modules Checklist</label>
                          <p className="text-[11px] text-slate-700">Check or uncheck functional modules. Any change instantly modifies operational access for all active brands subscribed to this tier.</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white border border-slate-200 rounded-xl p-4 max-h-[220px] overflow-y-auto">
                            {[
                              'Staff & Roles',
                              'Shift Planner',
                              'Role & Permission',
                              'Social account',
                              'Admin approval',
                              'Menu Translator',
                              'AI Food Images',
                              'Menu Price Update',
                              'QR For Menu',
                              'Allergen Intelligence',
                              'Checkin',
                              'Leave & Flec Calc',
                              'Payroll',
                              'DATEV Export'
                            ].map((modName) => {
                              const isChecked = editingPlan.enabledModules.includes(modName);
                              return (
                                <label key={modName} className="flex items-center gap-2.5 p-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-lg text-xs cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      const updatedModules = isChecked 
                                        ? editingPlan.enabledModules.filter(m => m !== modName)
                                        : [...editingPlan.enabledModules, modName];
                                      setPlans(prev => prev.map(p => p.planId === editingPlan.planId ? { ...p, enabledModules: updatedModules } : p));
                                      setEditingPlan(prev => prev ? { ...prev, enabledModules: updatedModules } : null);
                                      addLog(`SYNC MODULES: Toggled module "${modName}" for tier "${editingPlan.planId}".`);
                                    }}
                                    className="accent-[#7553FF]"
                                  />
                                  <span>{modName}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 font-bold px-2 py-0.5 rounded uppercase font-mono">
                          Auto-synchronized
                        </span>
                        <button
                          onClick={() => {
                            setEditingPlan(null);
                            addLog(`SAVE PLAN SETTINGS: Synchronized structural settings for tier "${editingPlan.planId}".`);
                            showToast(`Configuration synchronized with Stripe billing APIs.`);
                          }}
                          className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-800"
                        >
                          Save Changes
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tab 4: BILLING & TRANSACTIONS */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fadeIn text-left">
              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-sm space-y-4">
                <div>
                  <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">SaaS Billing Ledger</h2>
                  <p className="text-xs text-slate-700 mt-0.5">Audit global SEPA Direct Debits, process payment exceptions, and verify compliant invoice formats.</p>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Transaction ID</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Brand / Client</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Clearing Method</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Amount Charged</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Gateway Status</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-right">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((tx, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/30 transition-all">
                          <td className="p-3 font-mono text-[14px] font-normal text-slate-900">{tx.id}</td>
                          <td className="p-3 font-sans text-[14px] font-normal text-slate-800">{tx.brandName}</td>
                          <td className="p-3 font-sans text-[14px] font-normal text-slate-700">{tx.method}</td>
                          <td className="p-3 font-mono text-[14px] font-normal text-slate-900">€{tx.amount.toFixed(2)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-[2px] text-xs font-normal border ${
                              tx.status === 'Succeeded' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                              tx.status === 'Failed' ? 'bg-rose-50 text-rose-700 border-rose-100 animate-pulse' :
                              'bg-slate-50 text-slate-700 border-slate-100'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                const matchedBrand = brands.find(b => b.brandName === tx.brandName);
                                if (matchedBrand) generateInvoice(matchedBrand);
                                else showToast("Brand not found for invoice compiling.");
                              }}
                              className="p-1 hover:bg-[#7553FF]/10 text-[#7553FF] rounded border border-[#7553FF]/20 bg-white cursor-pointer select-none"
                              title="Generate Invoice Form"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* European Standard Invoice PDF Generator Popup */}
              <AnimatePresence>
                {activeInvoice && (
                  <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col text-left"
                    >
                      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#7553FF]" />
                          <span className="font-bold text-slate-800 text-sm">European Standard VAT Invoice Builder</span>
                        </div>
                        <button 
                          onClick={() => setActiveInvoice(null)}
                          className="p-1 hover:bg-slate-100 rounded border-none cursor-pointer bg-transparent"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      {/* Printable Area styling conforming to strict German law */}
                      <div className="p-8 space-y-6 bg-white overflow-y-auto max-h-[75vh]" id="german-vat-invoice-printable">
                        {/* Header logo & Corporate info */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">GASTRO HUB SaaS GmbH</h2>
                            <p className="text-[10px] text-slate-700 leading-normal mt-1 font-mono">
                              Am Hauptbahnhof 4, 60329 Frankfurt am Main, Germany<br />
                              VAT Registry ID: <strong>DE329482104</strong> (MwSt. ID)<br />
                              Local Tax Number: 045/229/81204<br />
                              SaaS Invoicing Portal: admin.gastrohub.com
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-bold text-slate-700 font-mono block">RECHNUNG / INVOICE</span>
                            <h4 className="text-base font-bold text-[#7553FF] font-mono mt-0.5">{activeInvoice.invoiceNo}</h4>
                            <p className="text-[10px] text-slate-700 font-mono mt-1">Date: {activeInvoice.billingDate}</p>
                          </div>
                        </div>

                        <div className="w-full h-[1px] bg-slate-200" />

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-700 block font-semibold uppercase">Billed To (Rechnungsempfänger):</span>
                            <p className="text-[13px] text-slate-800 font-bold mt-1">{activeInvoice.brand.brandName}</p>
                            <p className="text-[11px] text-slate-700 font-mono leading-relaxed mt-0.5 whitespace-pre-line">
                              {activeInvoice.brand.billingAddress}
                            </p>
                            <p className="text-[11px] text-slate-700 mt-1">
                              Owner contact: {activeInvoice.brand.ownerEmail}
                            </p>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl font-mono text-[10px] text-slate-700">
                            <span className="font-sans font-bold text-[11px] text-slate-800 block mb-1">Customer Tax Registry</span>
                            <p><strong>Country Code:</strong> DE (Germany)</p>
                            <p><strong>Customer VAT ID:</strong> {activeInvoice.brand.vatId}</p>
                            <p><strong>Customer Tax ID:</strong> {activeInvoice.brand.localTaxId}</p>
                            <p><strong>Clearing Mode:</strong> SEPA Direct Debit</p>
                          </div>
                        </div>

                        {/* Items line */}
                        <div className="border border-slate-200 rounded-xl overflow-hidden mt-6">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-3 font-semibold text-slate-700">Functional Service Details</th>
                                <th className="p-3 font-semibold text-slate-700 text-center">Qty</th>
                                <th className="p-3 font-semibold text-slate-700 text-right">Net Price</th>
                                <th className="p-3 font-semibold text-slate-700 text-right">Total Net</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-slate-150">
                                <td className="p-3 font-sans">
                                  <strong className="text-slate-800 block">Gastro Hub SaaS Subscription — {activeInvoice.planConfig.planName}</strong>
                                  <span className="text-[11px] text-slate-700">
                                    Functional coverage: {activeInvoice.planConfig.enabledModules.slice(0, 4).join(', ')}...
                                  </span>
                                </td>
                                <td className="p-3 text-center font-mono">1</td>
                                <td className="p-3 text-right font-mono">€{activeInvoice.netAmount.toFixed(2)}</td>
                                <td className="p-3 text-right font-mono">€{activeInvoice.netAmount.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Totals & German VAT calculations */}
                        <div className="flex justify-end mt-4">
                          <div className="w-64 space-y-2 font-mono text-xs text-slate-700 text-right">
                            <div className="flex justify-between">
                              <span>Sum Net amount:</span>
                              <strong>€{activeInvoice.netAmount.toFixed(2)}</strong>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>Add Mehrwertsteuer (19% MwSt):</span>
                              <strong>€{activeInvoice.vatAmount.toFixed(2)}</strong>
                            </div>
                            <div className="w-full h-[1px] bg-slate-200 my-1" />
                            <div className="flex justify-between text-[14px] text-slate-900 font-bold">
                              <span>Gross Amount Paid:</span>
                              <strong className="text-[#7553FF]">€{activeInvoice.grossAmount.toFixed(2)}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Legally mandated compliance note */}
                        <div className="bg-slate-50/70 border border-slate-100 p-3.5 rounded-xl text-[10px] text-slate-700 font-sans leading-relaxed mt-4">
                          <strong>Legal compliance declaration:</strong> This invoice represents a compliant PDF/VAT transaction certificate formatted in accordance with Germany's Tax Harmonization Directives (UStG §14). Fees cleared automatically via pre-authorized SEPA direct debit schemes. Thank you for utilizing the Gastro Hub digital platform.
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 bg-white flex justify-between">
                        <button
                          onClick={() => {
                            addLog(`EMAIL SERVICE: Emailed compiled European invoice PDF ${activeInvoice.invoiceNo} to Brand Owner: "${activeInvoice.brand.ownerEmail}".`);
                            showToast(`Invoice successfully dispatched to ${activeInvoice.brand.ownerEmail}!`);
                          }}
                          className="px-4 py-2 bg-[#7553FF]/10 text-[#7553FF] font-semibold text-xs rounded-lg cursor-pointer hover:bg-[#7553FF]/20 flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Disptach simulated email</span>
                        </button>
                        <button
                          onClick={() => setActiveInvoice(null)}
                          className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-800"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Tab 5: ROLES & PERMISSIONS */}
          {activeTab === 'roles' && (
            <div className="space-y-6 animate-fadeIn text-left">
              
              <div className="bg-white border border-[#EAE4DC] p-6 rounded-2xl shadow-sm text-left">
                <h2 className="text-[20px] font-bold text-slate-900 tracking-tight">Super Admin Role Directory</h2>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  Vuexy Inspired operational authorization controls for Gastro Hub SaaS staff members. Governing actions at admin.gastrohub.com.
                </p>
              </div>

              {/* Roles Cards Grid - Section 5.1 of PRD */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((r) => (
                  <div key={r.roleId} className="bg-white border border-[#EAE4DC] p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-slate-500 font-semibold font-mono uppercase">
                          {r.assignedUsersCount} active accounts
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center font-bold">
                          🛡️
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-900 mt-3">{r.roleName}</h3>
                      <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                        {r.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-700">
                        {r.isSystem ? 'System locked' : 'Custom'}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEditingRole(r);
                            setIsNewRole(false);
                            setIsRoleModalOpen(true);
                          }}
                          className="px-2.5 py-1 bg-[#7553FF]/10 hover:bg-[#7553FF]/20 text-[#7553FF] rounded text-xs font-semibold cursor-pointer border-none"
                        >
                          Configure
                        </button>
                        {!r.isSystem && (
                          <button
                            onClick={() => {
                              setRoles(prev => prev.filter(item => item.roleId !== r.roleId));
                              addLog(`DELETE ROLE: Removed custom operator role "${r.roleName}".`);
                              showToast(`Role "${r.roleName}" deleted.`);
                            }}
                            className="p-1 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded border-none cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Card Add New Role - dotted card */}
                <button
                  onClick={() => {
                    setIsNewRole(true);
                    setEditingRole({
                      roleId: `sa-role-${Date.now()}`,
                      roleName: '',
                      description: '',
                      assignedUsersCount: 0,
                      isSystem: false,
                      permissions: {
                        brands: { read: true, create: false, write: false, delete: false },
                        plans: { read: true, create: false, write: false, delete: false },
                        admins: { read: true, create: false, write: false, delete: false },
                        billing: { read: true, write: false }
                      }
                    });
                    setIsRoleModalOpen(true);
                  }}
                  className="bg-slate-50/50 hover:bg-slate-50 border-2 border-dashed border-[#EAE4DC] p-5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center cursor-pointer min-h-[180px] group transition-all duration-300"
                >
                  <div className="p-3 bg-white border border-slate-200 rounded-2xl text-[#7553FF] shadow-sm group-hover:scale-105 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 text-xs block">Configure New Role</span>
                    <span className="text-[11px] text-slate-500 mt-1 leading-normal block">Add specialized permission boundaries for operator branches.</span>
                  </div>
                </button>
              </div>

              {/* Roles Matrix Table - Section 5.2 of PRD */}
              <div className="bg-white border border-[#EAE4DC] rounded-2xl p-6 shadow-sm space-y-4 mt-6 text-left">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Operator Clearance Reference Map</h3>
                  <p className="text-xs text-slate-700 leading-normal mt-0.5">Summary of system-level clearance vectors active for platform operators.</p>
                </div>

                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest w-[25%]">Functional Module / Section</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Read</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Create</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Write</th>
                        <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { key: 'brands', label: 'Brands & Tenants Management' },
                        { key: 'plans', label: 'Subscription Plan Architectures' },
                        { key: 'admins', label: 'Super Admin Operator Accounts' },
                        { key: 'billing', label: 'Billing, Invoicing & VAT Configs' }
                      ].map((row) => (
                        <tr key={row.key} className="hover:bg-slate-50/30 transition-all font-sans">
                          <td className="p-3 font-sans text-[14px] font-normal text-slate-800">{row.label}</td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-normal">✓</span>
                          </td>
                          <td className="p-3 text-center">
                            {row.key === 'billing' ? (
                              <span className="text-slate-700">-</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[2px] bg-slate-50 text-slate-700 border border-slate-100 font-normal">✓</span>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-[2px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-normal">✓</span>
                          </td>
                          <td className="p-3 text-center">
                            {row.key === 'billing' ? (
                              <span className="text-slate-700">-</span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-[2px] bg-rose-50 text-rose-700 border border-rose-100 font-normal">✓</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* EDIT / CREATE ROLE MODAL AND MATRIX TABLE */}
              <AnimatePresence>
                {isRoleModalOpen && editingRole && (
                  <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col text-left font-sans"
                    >
                      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-[#7553FF]" />
                          <h3 className="text-base font-bold text-slate-900">
                            {isNewRole ? 'Configure New Operator Role' : `Edit Operator Role: ${editingRole.roleName}`}
                          </h3>
                        </div>
                        <button 
                          onClick={() => setIsRoleModalOpen(false)}
                          className="p-1 hover:bg-slate-100 rounded border-none cursor-pointer bg-transparent"
                        >
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto bg-[#FAFAFA]">
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-slate-700 font-bold block mb-1">Role Name</label>
                            <input
                              type="text"
                              value={editingRole.roleName}
                              placeholder="e.g. Finance Auditor, Support Lead"
                              disabled={!isNewRole && editingRole.isSystem}
                              onChange={(e) => {
                                setEditingRole(prev => prev ? { ...prev, roleName: e.target.value } : null);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] font-sans font-semibold disabled:bg-slate-100"
                            />
                          </div>

                          <div>
                            <label className="text-xs text-slate-700 font-bold block mb-1">Description</label>
                            <textarea
                              value={editingRole.description}
                              placeholder="Describe structural clearance capabilities..."
                              disabled={!isNewRole && editingRole.isSystem}
                              onChange={(e) => {
                                setEditingRole(prev => prev ? { ...prev, description: e.target.value } : null);
                              }}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#7553FF] font-sans h-16 disabled:bg-slate-100"
                            />
                          </div>
                        </div>

                        {/* Interactive Matrix Table */}
                        <div className="space-y-2.5">
                          <label className="text-xs text-slate-700 font-semibold block">Permissions Matrix Table</label>
                          <p className="text-[11px] text-slate-700 leading-normal">
                            Define specific CRUD access constraints. Fields marked with <span className="text-slate-700 font-mono">-</span> represent invalid database actions.
                          </p>

                          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                  <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest">Module / Resource</th>
                                  <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Read</th>
                                  <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Create</th>
                                  <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Write</th>
                                  <th className="p-3 font-serif text-[14px] font-medium text-slate-800 tracking-widest text-center">Delete</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {/* Brands */}
                                <tr>
                                  <td className="p-3 font-semibold text-slate-800">Brands</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.brands.read}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, brands: { ...prev.permissions.brands, read: !prev.permissions.brands.read } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.brands.create}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, brands: { ...prev.permissions.brands, create: !prev.permissions.brands.create } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.brands.write}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, brands: { ...prev.permissions.brands, write: !prev.permissions.brands.write } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.brands.delete}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, brands: { ...prev.permissions.brands, delete: !prev.permissions.brands.delete } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                </tr>

                                {/* Subscription Plans */}
                                <tr>
                                  <td className="p-3 font-semibold text-slate-800">Subscription Plans</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.plans.read}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, plans: { ...prev.permissions.plans, read: !prev.permissions.plans.read } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.plans.create}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, plans: { ...prev.permissions.plans, create: !prev.permissions.plans.create } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.plans.write}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, plans: { ...prev.permissions.plans, write: !prev.permissions.plans.write } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.plans.delete}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, plans: { ...prev.permissions.plans, delete: !prev.permissions.plans.delete } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                </tr>

                                {/* Super Admin Accounts */}
                                <tr>
                                  <td className="p-3 font-semibold text-slate-800">Super Admin Accounts</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.admins.read}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, admins: { ...prev.permissions.admins, read: !prev.permissions.admins.read } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.admins.create}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, admins: { ...prev.permissions.admins, create: !prev.permissions.admins.create } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.admins.write}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, admins: { ...prev.permissions.admins, write: !prev.permissions.admins.write } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.admins.delete}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, admins: { ...prev.permissions.admins, delete: !prev.permissions.admins.delete } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                </tr>

                                {/* Billing & Payments */}
                                <tr>
                                  <td className="p-3 font-semibold text-slate-800">Billing & Payments</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.billing.read}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, billing: { ...prev.permissions.billing, read: !prev.permissions.billing.read } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center text-slate-400 font-mono">-</td>
                                  <td className="p-3 text-center">
                                    <input
                                      type="checkbox"
                                      checked={editingRole.permissions.billing.write}
                                      onChange={() => {
                                        setEditingRole(prev => {
                                          if (!prev) return null;
                                          return { ...prev, permissions: { ...prev.permissions, billing: { ...prev.permissions.billing, write: !prev.permissions.billing.write } } };
                                        });
                                      }}
                                      className="accent-[#7553FF]"
                                    />
                                  </td>
                                  <td className="p-3 text-center text-slate-400 font-mono">-</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 bg-white flex justify-between items-center">
                        <span className="text-[10px] text-[#7553FF] bg-[#7553FF]/10 font-bold px-2 py-0.5 rounded font-mono uppercase">
                          Compliance Matrix Checked
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsRoleModalOpen(false)}
                            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (!editingRole.roleName.trim()) {
                                alert("Please supply a valid role name.");
                                return;
                              }
                              
                              if (isNewRole) {
                                setRoles(prev => [...prev, editingRole]);
                                addLog(`CREATE ROLE: Programmed new custom SaaS operator role "${editingRole.roleName}".`);
                                showToast(`Custom role "${editingRole.roleName}" created!`);
                              } else {
                                setRoles(prev => prev.map(r => r.roleId === editingRole.roleId ? editingRole : r));
                                addLog(`MODIFY ROLE: Updated CRUD permission vectors for role "${editingRole.roleName}".`);
                                showToast(`Role "${editingRole.roleName}" updated successfully!`);
                              }
                              setIsRoleModalOpen(false);
                            }}
                            className="px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-lg cursor-pointer hover:bg-slate-800"
                          >
                            Save Role Matrix
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
