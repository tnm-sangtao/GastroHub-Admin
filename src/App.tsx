/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  DollarSign,
  Languages,
  Shield,
  ShieldAlert,
  Settings as SettingsIcon,
  Search,
  Bell,
  ChevronDown,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  Store,
  Grid,
  MapPin,
  TrendingUp,
  FileText,
  Calculator,
  Utensils,
  MessageSquareCode,
  Image,
  QrCode,
  Share2,
  SearchCode,
  Star,
  Sliders,
  UserCheck,
  Clock,
  Users,
  User,
  LogOut,
  LogIn,
  Lock,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom subcomponents
import { TabId } from './types';
import CommandPalette from './components/CommandPalette';
import Dashboard from './components/Dashboard';
import ShiftPlanner from './components/ShiftPlanner';
import Payroll from './components/Payroll';
import PriceUpdate from './components/PriceUpdate';
import MenuTranslator from './components/MenuTranslator';
import AllergenTool from './components/AllergenTool';
import Settings from './components/Settings';
import RolePermission from './components/RolePermission';
import UpgradeNeededView from './components/UpgradeNeededView';
import ProfileSettingsModal from './components/ProfileSettingsModal';

// Imported modular views matching the new menu table architecture
import CheckinView from './components/Checkin';
import LeaveCalculatorView from './components/LeaveCalculatorView';
import {
  BookTableView,
  ChatbotView,
  AiFoodImagesView,
  QrMenuView,
  SocialPostView,
  SeoOptView,
  ReviewsView,
  MarketingSettingView,
  CateringInquiriesView
} from './components/ExtraViews';

const menuStructure = [
  {
    title: 'HR & Operations',
    submenus: [
      { label: 'Shift Planner', tabId: 'shift-planner' as TabId, icon: Calendar },
      { label: 'Staff & Roles', tabId: 'staff-roles' as TabId, icon: Users },
      { label: 'Checkin', tabId: 'checkin' as TabId, icon: MapPin },
      { label: 'Leave & Flec Calc', tabId: 'leave-calculator' as TabId, icon: Calculator },
      { label: 'Payroll', tabId: 'payroll' as TabId, icon: DollarSign }
    ]
  },
  {
    title: 'Application & Plug in',
    submenus: [
      { label: 'Book a Table', tabId: 'book-table' as TabId, icon: Utensils }
    ]
  },
  {
    title: 'Smart Menu Solutions',
    submenus: [
      { label: 'Menu Translator', tabId: 'menu-translator' as TabId, icon: Languages },
      { label: 'AI Food Images', tabId: 'ai-food-images' as TabId, icon: Image },
      { label: 'Menu Price Update', tabId: 'price-update' as TabId, icon: FileText },
      { label: 'QR For Menu', tabId: 'qr-menu' as TabId, icon: QrCode },
      { label: 'Allergen Intelligence', tabId: 'allergen-tool' as TabId, icon: ShieldAlert }
    ]
  },
  {
    title: 'Marketing & Brand Growth',
    submenus: [
      { label: 'Social Auto Post', tabId: 'social-post' as TabId, icon: Share2 },
      { label: 'SEO Check & Opt', tabId: 'seo-opt' as TabId, icon: SearchCode },
      { label: 'Review Responder', tabId: 'reviews' as TabId, icon: Star },
      { label: 'Campaign Setting', tabId: 'marketing-setting' as TabId, icon: Sliders }
    ]
  },
  {
    title: 'Coming Soon Tools',
    submenus: [
      { label: 'Catering Inquiries', tabId: 'catering-inquiries' as TabId, icon: Clock }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'Basic' | 'Gold' | 'Diamond'>('Basic');
  const [settingsSubTab, setSettingsSubTab] = useState<'info' | 'notifications' | 'security' | 'subscription' | 'permissions'>('info');

  // Shared Staff list of 10 employees with full details in Vietnamese / English formats
  const [staff, setStaff] = useState<any[]>(() => {
    const cached = localStorage.getItem('gastro_staff_list_shared');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fall back to defaults
      }
    }
    return [
      { id: '1', name: 'Nguyen An', role: 'Operation', status: 'Full-time', email: 'nguyen.an@johnsbistro.com', phone: '090-111-2222', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80', hourlyRate: 35, availableHours: '24/7 On call', isActive: true, department: 'Operation', branch: 'HCM 1', dob: '1995-03-12', gender: 'Male', address: '123 Nguyen Hue, Q1, HCM', systemAccessLevel: 'Employee', systemPermissions: ['Store Manager'], startDate: '2024-01-10', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-01-10', notes: 'Top performer', includeInPayroll: true },
      { id: '2', name: 'Tran Binh', role: 'HR', status: 'Full-time', email: 'tran.binh@johnsbistro.com', phone: '090-333-4444', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80', hourlyRate: 20, availableHours: '9:00 - 17:00', isActive: true, department: 'HR', branch: 'HQ', dob: '1990-05-24', gender: 'Male', address: '456 Ba Trieu, Hoan Kiem, HN', systemAccessLevel: 'Employee', systemPermissions: ['Accountant'], startDate: '2023-06-15', salaryType: 'Monthly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2023-06-15', notes: 'HR Lead', includeInPayroll: true },
      { id: '3', name: 'Le Chi', role: 'Sales', status: 'Full-time', email: 'le.chi@johnsbistro.com', phone: '090-555-6666', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=85', hourlyRate: 25, availableHours: 'Mon-Fri 8:00 - 16:00', isActive: true, department: 'Sales', branch: 'HN 1', dob: '1998-11-02', gender: 'Female', address: '789 Le Loi, Hai Chau, DN', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2024-02-01', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-02-01', notes: 'Excellent sales rep', includeInPayroll: true },
      { id: '4', name: 'Pham Dung', role: 'Operation', status: 'Part-time', email: 'pham.dung@johnsbistro.com', phone: '090-777-8888', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a65c6?w=100&h=100&fit=crop&q=80', hourlyRate: 22, availableHours: 'Flexible check-in', isActive: false, department: 'Operation', branch: 'HCM 2', dob: '2001-08-15', gender: 'Male', address: '101 Tran Hung Dao, Q5, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2024-03-01', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-03-01', notes: 'On hold', includeInPayroll: false },
      { id: '5', name: 'Hoang Em', role: 'Kitchen', status: 'Full-time', email: 'hoang.em@johnsbistro.com', phone: '090-999-0000', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80', hourlyRate: 18, availableHours: 'Mornings daily', isActive: true, department: 'Kitchen', branch: 'HCM 1', dob: '1997-01-20', gender: 'Female', address: '202 CMT8, Q3, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2023-11-15', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2023-11-15', notes: 'Prep chef', includeInPayroll: true },
      { id: '6', name: 'Vu Giang', role: 'Bar', status: 'Part-time', email: 'vu.giang@johnsbistro.com', phone: '090-123-5555', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80', hourlyRate: 16, availableHours: 'Flexible check-in', isActive: true, department: 'Bar', branch: 'HCM 2', dob: '2002-12-05', gender: 'Male', address: '303 Nguyen Trai, Q5, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2024-04-01', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-04-01', notes: 'Bartender assistant', includeInPayroll: true },
      { id: '7', name: 'Doan Trang', role: 'HR', status: 'Full-time', email: 'doan.trang@johnsbistro.com', phone: '090-555-5555', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80', hourlyRate: 22, availableHours: 'Mornings daily', isActive: true, department: 'HR', branch: 'HQ', dob: '1993-07-14', gender: 'Female', address: '404 Kim Ma, Ba Dinh, HN', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2023-09-01', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2023-09-01', notes: 'Recruiter', includeInPayroll: true },
      { id: '8', name: 'Tran Long', role: 'Sales', status: 'Part-time', email: 'tran.long@johnsbistro.com', phone: '090-666-6666', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&q=80', hourlyRate: 19, availableHours: 'Flexible check-in', isActive: true, department: 'Sales', branch: 'HN 1', dob: '1999-09-09', gender: 'Male', address: '505 Dien Bien Phu, Binh Thanh, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2024-01-15', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-01-15', notes: 'Part-time sales', includeInPayroll: true },
      { id: '9', name: 'Vo Hoang', role: 'Operation', status: 'Full-time', email: 'vo.hoang@johnsbistro.com', phone: '090-777-1111', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80', hourlyRate: 21, availableHours: 'Flexible check-in', isActive: true, department: 'Operation', branch: 'HCM 1', dob: '1996-02-28', gender: 'Male', address: '606 Hoang Van Thu, Tan Binh, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2023-12-01', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2023-12-01', notes: 'Floor lead', includeInPayroll: true },
      { id: '10', name: 'Ngo Quynh', role: 'Kitchen', status: 'Part-time', email: 'ngo.quynh@johnsbistro.com', phone: '090-888-2222', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80', hourlyRate: 17, availableHours: 'Mornings daily', isActive: true, department: 'Kitchen', branch: 'HCM 1', dob: '2000-06-18', gender: 'Female', address: '707 Cach Mang Thang Tam, Q10, HCM', systemAccessLevel: 'Employee', systemPermissions: [], startDate: '2024-02-15', salaryType: 'Hourly', currency: 'EUR', payFrequency: 'Monthly', effectiveFrom: '2024-02-15', notes: 'Dishwasher', includeInPayroll: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gastro_staff_list_shared', JSON.stringify(staff));
  }, [staff]);

  const [superAdminProfile, setSuperAdminProfile] = useState(() => {
    const cached = localStorage.getItem('gastro_super_admin_profile');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: 'Super Admin (Owner)',
      email: 'admin@johnsbistro.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      password: 'admin-password-123'
    };
  });

  useEffect(() => {
    localStorage.setItem('gastro_super_admin_profile', JSON.stringify(superAdminProfile));
  }, [superAdminProfile]);

  const [activeSimulatedUserId, setActiveSimulatedUserId] = useState<string>('super-admin');

  // Compute simulated profile
  const activeSimulatedUser = (() => {
    if (activeSimulatedUserId === 'super-admin') {
      return {
        id: 'super-admin',
        name: superAdminProfile.name,
        email: superAdminProfile.email,
        systemAccessLevel: 'Admin',
        systemPermissions: ['Store Manager', 'Accountant', 'Admin'],
        role: 'Owner',
        avatar: superAdminProfile.avatar
      };
    }
    const found = staff.find(s => s.id === activeSimulatedUserId);
    if (found) {
      let calcRole = found.role || 'Staff';
      if (found.id === '1') calcRole = 'Manager';
      if (found.id === '2') calcRole = 'Accountant';
      if (found.id === '3') calcRole = 'Staff';

      return {
        id: found.id,
        name: found.name,
        email: found.email || `${found.name.toLowerCase().replace(/\s+/g, '.')}@johnsbistro.com`,
        systemAccessLevel: found.systemAccessLevel || 'Employee',
        systemPermissions: found.systemPermissions || [],
        role: calcRole,
        avatar: found.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
      };
    }
    return {
      id: 'employee-basic',
      name: 'Regular Employee',
      email: 'employee@johnsbistro.com',
      systemAccessLevel: 'Employee',
      systemPermissions: [],
      role: 'Staff',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    };
  })();

  // Filter menu groups dynamically depending on current simulation account's permissions
  const getFilteredMenuStructure = () => {
    if (activeSimulatedUser.systemAccessLevel === 'Admin') {
      return menuStructure;
    }

    return menuStructure.map(group => {
      const allowedSubs = group.submenus.filter(sub => {
        return isTabAllowedForSimulatedUser(sub.tabId);
      });

      return {
        ...group,
        submenus: allowedSubs
      };
    }).filter(group => group.submenus.length > 0);
  };

  const isTabAllowedForSimulatedUser = (tabId: TabId) => {
    if (activeSimulatedUser.systemAccessLevel === 'Admin') return true;
    
    // Default self-service tabs are always visible
    if (['dashboard', 'catering-inquiries'].includes(tabId)) {
      return true;
    }

    const userPermissions = activeSimulatedUser.systemPermissions || [];
    if (userPermissions.length === 0) {
      // If no roles are assigned, they only see self-service dashboard
      return false;
    }

    // Load roles to check dynamic permissions
    const cachedRoles = (() => {
      const cached = localStorage.getItem('gastro_custom_roles');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (e) {
          // ignore
        }
      }
      return [];
    })();

    const fallbackRoles = [
      {
        name: 'Owner',
        key: 'owner',
        permissionGroups: [
          {
            category: 'Operations',
            permissions: [
              { id: 'hr_shift_write', enabled: true },
              { id: 'hr_shift_read', enabled: true },
              { id: 'hr_payroll_write', enabled: true },
              { id: 'hr_leave_write', enabled: true }
            ]
          },
          {
            category: 'Menu',
            permissions: [
              { id: 'menu_dictionary', enabled: true },
              { id: 'menu_translate', enabled: true },
              { id: 'menu_allergen', enabled: true },
              { id: 'menu_price_update', enabled: true }
            ]
          },
          {
            category: 'Marketing',
            permissions: [
              { id: 'mktg_campaign', enabled: true },
              { id: 'mktg_social_auto', enabled: true },
              { id: 'mktg_responder', enabled: true }
            ]
          },
          {
            category: 'System',
            permissions: [
              { id: 'sys_brand_edit', enabled: true },
              { id: 'sys_brand_assets', enabled: true },
              { id: 'sys_billing_edit', enabled: true }
            ]
          }
        ]
      },
      {
        name: 'Manager',
        key: 'manager',
        permissionGroups: [
          {
            category: 'Operations',
            permissions: [
              { id: 'hr_shift_write', enabled: true },
              { id: 'hr_shift_read', enabled: true },
              { id: 'hr_payroll_write', enabled: false },
              { id: 'hr_leave_write', enabled: true }
            ]
          },
          {
            category: 'Menu',
            permissions: [
              { id: 'menu_dictionary', enabled: true },
              { id: 'menu_translate', enabled: true },
              { id: 'menu_allergen', enabled: true },
              { id: 'menu_price_update', enabled: true }
            ]
          },
          {
            category: 'Marketing',
            permissions: [
              { id: 'mktg_campaign', enabled: true },
              { id: 'mktg_social_auto', enabled: true },
              { id: 'mktg_responder', enabled: true }
            ]
          },
          {
            category: 'System',
            permissions: [
              { id: 'sys_brand_edit', enabled: false },
              { id: 'sys_brand_assets', enabled: false },
              { id: 'sys_billing_edit', enabled: false }
            ]
          }
        ]
      },
      {
        name: 'Accountant',
        key: 'accountant',
        permissionGroups: [
          {
            category: 'Operations',
            permissions: [
              { id: 'hr_shift_write', enabled: false },
              { id: 'hr_shift_read', enabled: true },
              { id: 'hr_payroll_write', enabled: true },
              { id: 'hr_leave_write', enabled: true }
            ]
          },
          {
            category: 'Menu',
            permissions: [
              { id: 'menu_dictionary', enabled: false },
              { id: 'menu_translate', enabled: false },
              { id: 'menu_allergen', enabled: false },
              { id: 'menu_price_update', enabled: false }
            ]
          },
          {
            category: 'Marketing',
            permissions: [
              { id: 'mktg_campaign', enabled: false },
              { id: 'mktg_social_auto', enabled: false },
              { id: 'mktg_responder', enabled: false }
            ]
          },
          {
            category: 'System',
            permissions: [
              { id: 'sys_brand_edit', enabled: false },
              { id: 'sys_brand_assets', enabled: false },
              { id: 'sys_billing_edit', enabled: true }
            ]
          }
        ]
      },
      {
        name: 'Kitchen & Bar Crew',
        key: 'kitchen_crew',
        permissionGroups: [
          {
            category: 'Operations',
            permissions: [
              { id: 'hr_shift_write', enabled: false },
              { id: 'hr_shift_read', enabled: true },
              { id: 'hr_payroll_write', enabled: false },
              { id: 'hr_leave_write', enabled: false }
            ]
          },
          {
            category: 'Menu',
            permissions: [
              { id: 'menu_dictionary', enabled: false },
              { id: 'menu_translate', enabled: false },
              { id: 'menu_allergen', enabled: true },
              { id: 'menu_price_update', enabled: false }
            ]
          },
          {
            category: 'Marketing',
            permissions: [
              { id: 'mktg_campaign', enabled: false },
              { id: 'mktg_social_auto', enabled: false },
              { id: 'mktg_responder', enabled: false }
            ]
          },
          {
            category: 'System',
            permissions: [
              { id: 'sys_brand_edit', enabled: false },
              { id: 'sys_brand_assets', enabled: false },
              { id: 'sys_billing_edit', enabled: false }
            ]
          }
        ]
      }
    ];

    const rolesToUse = cachedRoles.length > 0 ? cachedRoles : fallbackRoles;
    
    const matchedRoles = rolesToUse.filter(role => 
      userPermissions.some((upName: string) => 
        role.name.toLowerCase() === upName.toLowerCase() ||
        role.key.toLowerCase() === upName.toLowerCase() ||
        (upName.toLowerCase() === 'store manager' && role.key.toLowerCase() === 'manager')
      )
    );

    const allowedPermissionIds = new Set<string>();
    matchedRoles.forEach(role => {
      role.permissionGroups?.forEach((group: any) => {
        group.permissions?.forEach((perm: any) => {
          if (perm.enabled) {
            allowedPermissionIds.add(perm.id);
          }
        });
      });
    });

    const TAB_PERMISSION_MAPPING: Record<TabId, string> = {
      'dashboard': 'always_allowed',
      'shift-planner': 'hr_shift_read',
      'staff-roles': 'hr_shift_write',
      'checkin': 'hr_shift_read',
      'leave-calculator': 'hr_leave_write',
      'payroll': 'hr_payroll_write',
      'book-table': 'app_book_table',
      'chatbot': 'always_allowed',
      'menu-translator': 'menu_translate',
      'ai-food-images': 'menu_translate',
      'price-update': 'menu_price_update',
      'qr-menu': 'menu_translate',
      'allergen-tool': 'menu_allergen',
      'social-post': 'mktg_social_auto',
      'seo-opt': 'mktg_social_auto',
      'reviews': 'mktg_responder',
      'marketing-setting': 'mktg_social_auto',
      'settings': 'sys_brand_edit',
      'role-permission': 'sys_billing_edit',
      'social-account': 'sys_brand_edit',
      'catering-inquiries': 'always_allowed'
    };

    const requiredPerm = TAB_PERMISSION_MAPPING[tabId];
    if (!requiredPerm) return false;
    if (requiredPerm === 'always_allowed') return true;

    return allowedPermissionIds.has(requiredPerm);
  };

  // Tiered access control check helper functions
  function getRequiredPlan(tabId: TabId): 'Basic' | 'Gold' | 'Diamond' {
    if (tabId === 'dashboard') return 'Basic';
    const allowedBasic: TabId[] = [
      // Smart Menu Solutions
      'menu-translator',
      'ai-food-images',
      'price-update',
      'qr-menu',
      'allergen-tool',
      'chatbot',
      
      // Staff & Roles
      'staff-roles',
      
      // Marketing & Brand Growth (UNLOCKED IN BASIC!)
      'social-post',
      'seo-opt',
      'reviews',
      'marketing-setting',
      
      // Settings
      'settings',
      'role-permission',
      'social-account',
      'catering-inquiries'
    ];
    if (allowedBasic.includes(tabId)) return 'Basic';
    if (tabId === 'shift-planner') return 'Gold';
    return 'Diamond';
  }

  function isTabLocked(tabId: TabId, plan: 'Basic' | 'Gold' | 'Diamond'): boolean {
    const required = getRequiredPlan(tabId);
    if (required === 'Basic') return false;
    if (required === 'Gold') {
      return plan === 'Basic';
    }
    if (required === 'Diamond') {
      return plan === 'Basic' || plan === 'Gold';
    }
    return false;
  }

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState('GastroHub - Trang Tien');
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'EN' | 'VI' | 'DE'>('EN');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  function handleTabClick(tabId: TabId) {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    if (tabId === 'settings') {
      setSettingsSubTab('info');
    } else if (tabId === 'role-permission' as TabId) {
      setSettingsSubTab('permissions');
      setActiveTab('settings');
      return;
    } else if (tabId === 'social-account' as TabId) {
      setSettingsSubTab('social');
      setActiveTab('settings');
      return;
    }
    setActiveTab(tabId);
  }

  // Keyboard shortcut listeners (⌘K to open search, ⌘B to collapse sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // ⌘B or Ctrl+B sidebar toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const storeOptions = [
    'GastroHub - Trang Tien',
    'GastroHub - Nguyen Du',
    'GastroHub - Thao Dien (HCM)'
  ];

  const recentNotifications = [
    { id: '1', title: 'Alex requested leave', desc: 'Staff Alex Nguyen requested off for this Saturday evening shift.', type: 'alert' },
    { id: '2', title: 'Beef index alert', desc: 'System advises updating Pho price by +10% due to prime beef market surges.', type: 'price' },
    { id: '3', title: 'Payroll consolidated', desc: 'May payroll statement has been successfully balanced and processed.', type: 'payroll' }
  ];

  // Helper function to render sidebar content in a single place to maintain consistency
  const renderSidebarContent = (isMobileLayout: boolean) => {
    const collapsed = isMobileLayout ? false : isSidebarCollapsed;
    return (
      <div className="flex flex-col h-full justify-between">
        {/* Top Section */}
        <div className="space-y-0 flex flex-col flex-1 min-h-0">
          {/* A. Logo & Store drop selector */}
          <div className="p-4 border-b border-slate-200 relative flex items-center justify-between pb-3 h-[58px]">
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
               <div className="w-9 h-9 rounded-[8px] bg-gradient-to-tr from-[#7553FF] to-[#7553FF]/70 flex items-center justify-center text-white shrink-0">
                <Store className="w-5 h-5" strokeWidth={2} />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <span className="text-[15px] font-sans leading-none text-[#1C1814] font-bold">GastroHub</span>
                </div>
              )}
            </div>

            {/* Language Selection & Mobile Close */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
                  className="text-[18px] leading-none shrink-0 select-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1C1814]/5 transition-all cursor-pointer bg-transparent border-none"
                  title="Change Language"
                >
                  {currentLanguage === 'EN' ? '🇺🇸' : currentLanguage === 'VI' ? '🇻🇳' : '🇩🇪'}
                </button>

                <AnimatePresence>
                  {isLanguageDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-full right-0 mt-1.5 w-[140px] bg-white border border-slate-200 rounded-[8px] p-1 z-50 font-sans"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setCurrentLanguage('EN');
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-sm font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 border-none ${
                            currentLanguage === 'EN'
                              ? 'bg-[#7553FF]/10 text-[#7553FF]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[14px]">🇺🇸</span>
                          <span>English</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentLanguage('VI');
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-sm font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 border-none ${
                            currentLanguage === 'VI'
                              ? 'bg-[#7553FF]/10 text-[#7553FF]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[14px]">🇻🇳</span>
                          <span>Vietnamese</span>
                        </button>
                        <button
                          onClick={() => {
                            setCurrentLanguage('DE');
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-sm font-bold rounded-md transition-colors cursor-pointer flex items-center gap-2 border-none ${
                            currentLanguage === 'DE'
                              ? 'bg-[#7553FF]/10 text-[#7553FF]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[14px]">🇩🇪</span>
                          <span>German</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isMobileLayout && (
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-slate-800 transition cursor-pointer border-none bg-transparent"
                  title="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Plan Selector Widget for Testing */}
          {!collapsed ? (
            <div className="mx-3 mt-3.5 p-3 bg-indigo-500/5 border border-slate-200 rounded-xl text-center space-y-2 shrink-0 select-none pb-3" id="sidebar-plan-selector">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#7553FF]/70 tracking-wider px-0.5">
                <span>Access Plan</span>
                <span className="text-[9px] bg-[#7553FF]/15 text-[#7553FF] px-1.5 py-0.5 rounded-md font-mono font-bold">{currentPlan}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-white border border-slate-200 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setCurrentPlan('Basic')}
                  className={`py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer border-none ${
                    currentPlan === 'Basic'
                      ? 'bg-[#7553FF] text-white animate-fadeIn'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setCurrentPlan('Gold')}
                  className={`py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer border-none ${
                    currentPlan === 'Gold'
                      ? 'bg-[#7553FF] text-white animate-fadeIn'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => setCurrentPlan('Diamond')}
                  className={`py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer border-none ${
                    currentPlan === 'Diamond'
                      ? 'bg-[#7553FF] text-white animate-fadeIn'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Diam.
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-3 shrink-0 select-none" id="sidebar-plan-indicator-collapsed">
              <button
                onClick={() => {
                  const sequence: ('Basic' | 'Gold' | 'Diamond')[] = ['Basic', 'Gold', 'Diamond'];
                  const nextIndex = (sequence.indexOf(currentPlan) + 1) % 3;
                  setCurrentPlan(sequence[nextIndex]);
                }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white cursor-pointer border-none bg-[#7553FF] hover:bg-[#623EE2] transition-colors`}
                title={`Current plan: ${currentPlan}. Click to toggle.`}
              >
                {currentPlan === 'Basic' ? 'B' : currentPlan === 'Gold' ? 'G' : 'D'}
              </button>
            </div>
          )}

          {/* Simulated Role Dropdown Selector */}
          {!collapsed ? (
            <div className="mx-3 mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 shrink-0 select-none font-sans" id="sidebar-role-simulator">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1C1814]/50 tracking-wider px-0.5">
                <Users className="w-3.5 h-3.5 text-[#7553FF]" strokeWidth={2.5} />
                <span>Simulate Role</span>
              </div>
              <select
                value={activeSimulatedUserId}
                onChange={(e) => {
                  setActiveSimulatedUserId(e.target.value);
                  setActiveTab('dashboard');
                }}
                className="w-full text-[13px] font-medium bg-white border border-slate-200 rounded-lg p-1.5 text-[#1C1814] focus:outline-none focus:border-[#7553FF] cursor-pointer"
              >
                <option value="super-admin">👑 Admin (Brand Owner)</option>
                <option value="1">💼 Store Manager</option>
                <option value="2">👥 HR / Accountant</option>
                <option value="3">🚶 Staff</option>
              </select>
            </div>
          ) : (
            <div className="flex justify-center mt-2 shrink-0 select-none" id="sidebar-role-indicator-collapsed">
              <button
                onClick={() => {
                  const roles = ['super-admin', '1', '2', '3'];
                  const nextIdx = (roles.indexOf(activeSimulatedUserId) + 1) % roles.length;
                  setActiveSimulatedUserId(roles[nextIdx]);
                  setActiveTab('dashboard');
                }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-slate-100 hover:bg-slate-200 text-[#1C1814] cursor-pointer border-none"
                title="Toggle simulated role"
              >
                {activeSimulatedUserId === 'super-admin' ? '👑' : activeSimulatedUserId === '1' ? '💼' : activeSimulatedUserId === '2' ? '👥' : '🚶'}
              </button>
            </div>
          )}

          {/* C. Middle Navigation List (Grouped) */}
          <nav className="px-2 py-4 space-y-3 flex-1 overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-slate-200">
            {/* Direct Dashboard Link */}
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  handleTabClick('dashboard');
                  if (isMobileLayout) setIsMobileSidebarOpen(false);
                }}
                title={collapsed ? "Dashboard" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-[8px] text-left transition-all cursor-pointer relative group ${
                  collapsed ? 'justify-center' : ''
                } ${
                  activeTab === 'dashboard'
                    ? 'bg-[#7553FF]/10 text-[#7553FF]'
                    : 'text-[#1C1814]/70 hover:bg-[#FAFAFA]'
                }`}
              >
                {activeTab === 'dashboard' && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#7553FF] rounded-r-full" />
                )}
                <Grid className="w-4.5 h-4.5 shrink-0" strokeWidth={activeTab === 'dashboard' ? 2 : 1.75} />
                {!collapsed && (
                  <span className={`text-[14px] leading-[20px] ${activeTab === 'dashboard' ? 'text-[#7553FF] font-medium' : 'text-[#1C1814]/85 font-normal'}`}>
                    Dashboard
                  </span>
                )}
              </button>
            </div>

            {/* Grouped sections */}
            {getFilteredMenuStructure().map((group) => (
              <div key={group.title} className="space-y-1 pt-1.5">
                {!collapsed ? (
                  <span className="px-3 text-[11px] font-bold tracking-wider text-[#1C1814]/40 font-poppins block">
                    {group.title}
                  </span>
                ) : (
                  <div className="w-8 h-[1px] bg-slate-200 mx-auto my-1" />
                )}

                <div className="space-y-0.5 font-sans">
                  {group.submenus.map((sub) => {
                    const SubIcon = sub.icon;
                    const isSelected = activeTab === sub.tabId;
                    const isLocked = isTabLocked(sub.tabId, currentPlan);
                    const requiredPlan = getRequiredPlan(sub.tabId);
                    const isComingSoon = sub.tabId === 'catering-inquiries';
                    return (
                      <button
                        key={sub.tabId}
                        onClick={() => {
                          handleTabClick(sub.tabId);
                          if (isMobileLayout) setIsMobileSidebarOpen(false);
                        }}
                        title={collapsed ? `${sub.label}${isLocked ? ` (Requires ${requiredPlan})` : ''}` : undefined}
                        className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-left transition-all relative group cursor-pointer ${
                          collapsed ? 'justify-center' : ''
                        } ${
                          isSelected
                            ? 'bg-[#7553FF]/10 text-[#7553FF]'
                            : 'text-[#1C1814]/70 hover:bg-[#FAFAFA]'
                        }`}
                      >
                        {isSelected && !collapsed && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#7553FF] rounded-r-full" />
                        )}
                        <div className={`relative flex items-center shrink-0 ${(isLocked && !isComingSoon) ? 'opacity-55' : ''}`}>
                          <SubIcon className="w-4 h-4 shrink-0" strokeWidth={isSelected ? 2 : 1.75} />
                        </div>
                        {!collapsed && (
                          <span className={`text-[14px] leading-[25px] truncate ${isSelected ? 'text-[#7553FF] font-medium' : 'text-[#1C1814]/85 font-normal'} ${(isLocked && !isComingSoon) ? 'opacity-55 font-normal text-[#1C1814]/70' : ''}`}>
                            {sub.label}
                          </span>
                        )}
                        {!collapsed && (isLocked || isComingSoon) && (
                          <span 
                            className={`ml-auto shrink-0 border text-[9px] font-bold tracking-wider px-1 py-0.5 rounded-md leading-none select-none transition-all duration-300 ${
                              isComingSoon
                                ? 'bg-slate-50 text-slate-700 border-slate-200'
                                : requiredPlan === 'Gold'
                                  ? 'bg-amber-50/70 text-amber-700 border-amber-200/50'
                                  : 'bg-[#7553FF]/10 text-[#7553FF] border-[#7553FF]/20'
                            }`}
                          >
                            {isComingSoon ? 'Soon' : requiredPlan.toLowerCase()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Layout Footer Container */}
        <div className="p-4 border-t border-slate-200 bg-white mt-auto shrink-0">
          {!collapsed ? (
            <>
              {/* Row 1: User Profile & Bell */}
              <div className="flex items-center justify-between gap-2 relative select-none">
                {isLoggedIn ? (
                  <div 
                    id="user-profile-trigger"
                    onClick={() => setIsUserPopoverOpen((prev) => !prev)}
                    className="flex flex-1 items-center gap-3 min-w-0 bg-[#1C1814]/5 hover:bg-[#1C1814]/10 transition-all cursor-pointer p-2 px-3 rounded-[8px] relative selection-none"
                  >
                    {activeSimulatedUser.avatar ? (
                      <img 
                        src={activeSimulatedUser.avatar} 
                        alt={activeSimulatedUser.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center font-bold text-[16px] shrink-0 font-poppins selection:bg-transparent">
                        {activeSimulatedUser.name ? activeSimulatedUser.name.charAt(0).toUpperCase() : 'A'}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold text-[#1C1814] leading-tight truncate font-poppins">{activeSimulatedUser.name}</p>
                      <p className="text-[14px] text-slate-700 leading-none truncate font-poppins mt-0.5">{activeSimulatedUser.role}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-[8px] transition-all cursor-pointer select-none font-poppins h-[38px] border-none"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}

                <AnimatePresence>
                  {isUserPopoverOpen && isLoggedIn && (
                    <>
                      {/* Overlay backdrop to capture clicks outside */}
                      <div 
                        className="fixed inset-0 z-40 bg-transparent" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserPopoverOpen(false);
                        }} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-16 left-0 w-[215px] bg-white border border-slate-200 rounded-[8px] p-3 z-50 text-left font-sans"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="space-y-1">
                          {/* Profile Settings */}
                          <button
                            onClick={() => {
                              setIsUserPopoverOpen(false);
                              setIsProfileSettingsOpen(true);
                              if (isMobileLayout) setIsMobileSidebarOpen(false);
                            }}
                            className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-[8px] hover:bg-[#1C1814]/5 text-left text-[14px] font-sans text-[#1C1814] font-medium transition-all cursor-pointer select-none"
                          >
                            <User className="w-5 h-5 text-[#1C1814]/70 shrink-0" strokeWidth={1.8} />
                            <span className="leading-none">Profile Settings</span>
                          </button>
                          {/* Brand setting */}
                          <button
                            onClick={() => {
                              setSettingsSubTab('info');
                              setActiveTab('settings');
                              setIsUserPopoverOpen(false);
                              if (isMobileLayout) setIsMobileSidebarOpen(false);
                            }}
                            className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-[8px] hover:bg-[#1C1814]/5 text-left text-[14px] font-sans text-[#1C1814] font-medium transition-all cursor-pointer select-none"
                          >
                            <Store className="w-5 h-5 text-[#1C1814]/70 shrink-0" strokeWidth={1.8} />
                            <span className="leading-none">Brand setting</span>
                          </button>
                          {/* Logout */}
                          <button
                            onClick={() => {
                              setIsUserPopoverOpen(false);
                              setIsLoggedIn(false);
                              if (isMobileLayout) setIsMobileSidebarOpen(false);
                            }}
                            className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-[8px] hover:bg-red-50 text-left text-[14px] font-sans text-red-600 font-bold transition-all cursor-pointer select-none"
                          >
                            <LogOut className="w-5 h-5 text-red-600 shrink-0" strokeWidth={1.8} />
                            <span className="leading-none">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Bell Alert Button - Only visible when logged in */}
                {isLoggedIn && (
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsNotificationOpen(!isNotificationOpen);
                      }}
                      className="p-1.5 hover:bg-[#1C1814]/5 rounded-lg text-[#1C1814]/85 hover:text-[#7553FF] transition-all relative cursor-pointer font-sans bg-transparent border-none"
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <AnimatePresence>
                      {isNotificationOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          className="absolute bottom-12 right-[-140px] w-[320px] bg-white border border-slate-200 rounded-[8px] p-4 z-50 space-y-3 font-poppins text-left"
                        >
                          <div className="flex items-center justify-between border-b border-b-slate-200 pb-2">
                            <h4 className="text-[11px] font-bold text-[#1C1814]/40 tracking-wider font-poppins">
                              Latest Notifications
                            </h4>
                            <span className="w-2 h-2 bg-[#7553FF] rounded-full animate-pulse" />
                          </div>
                          <div className="space-y-2 max-h-[240px] overflow-y-auto pr-0.5 scrollbar-thin">
                            {recentNotifications.map((n) => (
                              <div
                                key={n.id}
                                className="text-left p-2 rounded-[8px] hover:bg-[#FAFAFA] transition-all border border-transparent hover:border-slate-200 flex items-start gap-3"
                              >
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                                    n.type === 'alert'
                                      ? 'bg-amber-500'
                                      : n.type === 'price'
                                      ? 'bg-[#7553FF]'
                                      : 'bg-blue-500'
                                    }`}
                                />
                                <div className="space-y-1 min-w-0">
                                  <p className="text-[14px] font-bold text-[#1C1814] tracking-tight">{n.title}</p>
                                  <p className="text-[14px] text-[#1C1814]/60 leading-relaxed font-normal">{n.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Collapsed view
            <div className="flex flex-col items-center gap-4 relative select-none">
              {isLoggedIn ? (
                <div 
                  onClick={() => setIsUserPopoverOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-[#1C1814] text-white flex items-center justify-center font-bold text-[18px] shrink-0 font-poppins selection:bg-transparent cursor-pointer hover:opacity-85 transition-opacity overflow-hidden"
                >
                  {activeSimulatedUser.avatar ? (
                    <img 
                      src={activeSimulatedUser.avatar} 
                      alt={activeSimulatedUser.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    activeSimulatedUser.name ? activeSimulatedUser.name.charAt(0).toUpperCase() : 'A'
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-10 h-10 rounded-full bg-[#7553FF]/10 text-[#7553FF] hover:bg-[#7553FF]/20 flex items-center justify-center shrink-0 transition-all cursor-pointer border-none"
                  title="Login"
                >
                  <LogIn className="w-5 h-5" strokeWidth={2.2} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1C1814] flex flex-col lg:flex-row w-full overflow-x-hidden">
      {/* A. MOBILE STICKY HEADER NAVBAR */}
      <header className="lg:hidden h-[58px] border-b border-slate-200 items-center justify-between px-4 bg-white sticky top-0 z-40 w-full flex select-none shrink-0">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-700 transition cursor-pointer border-none bg-transparent"
          title="Open menu"
        >
          <Menu className="w-6 h-6 animate-pulse" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-[8px] bg-gradient-to-tr from-[#7553FF] to-[#7553FF]/70 flex items-center justify-center text-white shrink-0">
            <Store className="w-5 h-5" strokeWidth={2} />
          </div>
          <span className="text-[15px] font-sans text-slate-900 font-bold">GastroHub</span>
        </div>
        
        <div className="w-9 h-9" />
      </header>

      {/* B. FIXED DESKTOP SIDEBAR PANEL */}
      <aside
        className={`bg-white border-r border-[#E2E8F0] h-screen sticky top-0 hidden lg:flex flex-col justify-between transition-all duration-300 relative z-20 shrink-0 ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {renderSidebarContent(false)}
      </aside>

      {/* C. SLIDE-OUT RESPONSIVE DRAWER FOR TABLET & MOBILE */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1C1814]/30 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            {/* Drawer Container */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 bg-white border-r border-[#E2E8F0] h-screen w-[260px] flex flex-col justify-between z-50 lg:hidden font-sans"
            >
              {renderSidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* RIGHT MAIN VIEW CONTENT PANEL */}
      <main className="flex-1 min-w-0 overflow-y-auto h-screen p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {(() => {
              // Check access block for simulated account
              if (!isTabAllowedForSimulatedUser(activeTab)) {
                return (
                  <div className="bg-white border border-[#EAE4DC] rounded-[8px] p-8 text-center max-w-xl mx-auto mt-12 space-y-4 shadow-none select-none">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#1C1814] font-sans">Access Restricted</h3>
                    <p className="text-[14px] text-slate-700 font-sans leading-relaxed">
                      Your current simulation account is <strong>{activeSimulatedUser.name}</strong> (level <em>Employee</em>). You do not have permission to view or edit this management section.
                    </p>
                    <div className="pt-2">
                      <p className="text-xs text-slate-700 font-sans mb-3">Please use the <strong>Simulator Panel</strong> above to switch to an account with appropriate permissions:</p>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveSimulatedUserId('super-admin')}
                          className="px-3 py-1 bg-[#7553FF] text-white rounded text-xs font-bold cursor-pointer border-none"
                        >
                          Switch to Super Admin
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              const isLocked = isTabLocked(activeTab, currentPlan) && activeTab !== 'book-table';
              const renderedComponent = (
                <>
                  {activeTab === 'dashboard' && (
                    <Dashboard 
                      onNavigate={handleTabClick} 
                      isLoggedIn={isLoggedIn} 
                      onLogin={() => setIsLoginModalOpen(true)} 
                    />
                  )}
                  {activeTab === 'shift-planner' && (
                    <ShiftPlanner 
                      initialSubTab="schedule" 
                      staff={staff} 
                      setStaff={setStaff} 
                      simulatedUser={activeSimulatedUser} 
                    />
                  )}
                  {activeTab === 'staff-roles' && (
                    <ShiftPlanner 
                      initialSubTab="staff" 
                      staff={staff} 
                      setStaff={setStaff} 
                      simulatedUser={activeSimulatedUser} 
                    />
                  )}
                  {activeTab === 'checkin' && <CheckinView simulatedUser={activeSimulatedUser} />}
                  {activeTab === 'leave-calculator' && (
                    <LeaveCalculatorView 
                      staff={staff} 
                      setStaff={setStaff}
                      simulatedUser={activeSimulatedUser} 
                    />
                  )}
                  {activeTab === 'payroll' && (
                    <Payroll 
                      staff={staff} 
                      setStaff={setStaff} 
                      simulatedUser={activeSimulatedUser} 
                    />
                  )}
                  {activeTab === 'book-table' && (
                    <BookTableView 
                      currentPlan={currentPlan}
                      onUpgrade={() => {
                        setSettingsSubTab('subscription');
                        setActiveTab('settings');
                      }}
                      onGoToBrandSettings={() => handleTabClick('settings')}
                    />
                  )}
                  {activeTab === 'chatbot' && <ChatbotView />}
                  {activeTab === 'menu-translator' && <MenuTranslator />}
                  {activeTab === 'ai-food-images' && <AiFoodImagesView />}
                  {activeTab === 'price-update' && <PriceUpdate />}
                  {activeTab === 'qr-menu' && <QrMenuView />}
                  {activeTab === 'allergen-tool' && <AllergenTool />}
                  {activeTab === 'social-post' && <SocialPostView />}
                  {activeTab === 'seo-opt' && <SeoOptView />}
                  {activeTab === 'reviews' && <ReviewsView />}
                  {activeTab === 'marketing-setting' && <MarketingSettingView />}
                  {activeTab === 'settings' && (
                    <Settings 
                      storeName={currentStore} 
                      setStoreName={setCurrentStore} 
                      currentPlan={currentPlan}
                      onUpgrade={setCurrentPlan}
                      initialTab={settingsSubTab}
                      staff={staff}
                      setStaff={setStaff}
                      simulatedUser={activeSimulatedUser}
                    />
                  )}
                  {activeTab === 'catering-inquiries' && <CateringInquiriesView />}
                </>
              );

              if (isLocked) {
                return (
                  <div className="relative w-full h-full min-h-[500px]">
                    {/* Background preview blurred */}
                    <div className="filter blur-md opacity-35 select-none pointer-events-none w-full h-full overflow-hidden">
                      {renderedComponent}
                    </div>
                    {/* Centered notification paywall card */}
                    <div className="absolute inset-x-0 top-0 bottom-0 z-10 flex items-center justify-center p-4 bg-black/[0.01]">
                      <UpgradeNeededView
                        attemptedTabId={activeTab}
                        requiredPlan={getRequiredPlan(activeTab) as 'Gold' | 'Diamond'}
                        language={currentLanguage}
                        onUnlockClick={() => {
                          setSettingsSubTab('subscription');
                          setActiveTab('settings');
                        }}
                      />
                    </div>
                  </div>
                );
              }

              return renderedComponent;
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Shortcut triggered Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(tab) => {
          handleTabClick(tab);
          setIsCommandPaletteOpen(false);
        }}
      />

      {/* Beautiful SaaS Login Modal Popup */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-[#1C1814]/40 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-t-0 border-r border-b border-l border-[#1C1814]/15 w-full max-w-md rounded-2xl p-7 relative space-y-6 text-[#1C1814] font-sans"
            >
              <div className="flex items-center justify-between border-b border-[#1C1814]/15 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#7553FF]/10 flex items-center justify-center text-[#7553FF]">
                    <LogIn className="w-4 h-4" />
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900 font-sans">
                    Login to GastroHub
                  </h3>
                </div>
                {/* Close (X) button at top-right corner */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-slate-800 transition-colors cursor-pointer border-none text-[15px]"
                  title="Close login modal"
                >
                  ✕
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                  setIsLoginModalOpen(false);
                }}
                className="space-y-4 font-sans"
              >
                <div>
                  <label className="text-[14px] font-bold text-slate-600 block mb-1.5 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@gastrohub.com"
                    defaultValue="admin@gastrohub.com"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#1C1814]/15 rounded-lg text-[#1C1814] font-medium placeholder-slate-400 focus:outline-none focus:border-[#7553FF] focus:ring-3 focus:ring-[#7553FF]/15 h-10 transition-all font-sans text-[14px]"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-bold text-slate-600 block mb-1.5 tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    defaultValue="••••••••"
                    required
                    className="w-full px-3 py-2 bg-white border border-[#1C1814]/15 rounded-lg text-[#1C1814] font-medium placeholder-slate-400 focus:outline-none focus:border-[#7553FF] focus:ring-3 focus:ring-[#7553FF]/15 h-10 transition-all font-sans text-[14px]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 font-sans text-[14px] cursor-pointer border-none"
                  >
                    <span>Log In</span>
                  </button>
                </div>

                {/* Subtext info */}
                <p className="text-[14px] text-slate-700 font-normal text-center mt-4">
                  Don't have an account?{" "}
                  <span className="text-[#7553FF] font-medium hover:underline cursor-pointer">
                    Sign up
                  </span>
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ProfileSettingsModal
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
        activeUser={activeSimulatedUser}
        onSave={(updatedData) => {
          if (activeSimulatedUserId === 'super-admin') {
            setSuperAdminProfile(prev => ({
              ...prev,
              name: updatedData.name,
              email: updatedData.email,
              avatar: updatedData.avatar,
              ...(updatedData.newPassword ? { password: updatedData.newPassword } : {})
            }));
          } else {
            setStaff(prevStaff => prevStaff.map(s => {
              if (s.id === activeSimulatedUserId) {
                return {
                  ...s,
                  name: updatedData.name,
                  email: updatedData.email,
                  avatar: updatedData.avatar
                };
              }
              return s;
            }));
          }
        }}
      />
    </div>
  );
}

