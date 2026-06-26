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
  Languages, 
  Settings as SettingsIcon, 
  Share2, 
  X, 
  AlertCircle,
  Eye,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const getInitials = (name: string) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

interface PermissionItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface PermissionGroup {
  category: string;
  icon: any;
  permissions: PermissionItem[];
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  key: string;
  memberCount: number;
  isSystem: boolean;
  permissionGroups: PermissionGroup[];
}

const INITIAL_ROLES: RoleData[] = [
  {
    id: 'role-1',
    name: 'Owner',
    key: 'owner',
    description: 'Full administrative access and ultimate control over the restaurant branch, including billing, subscription plan tiering, and team roster access.',
    memberCount: 2,
    isSystem: true,
    permissionGroups: [
      {
        category: 'HR & Operations',
        icon: Users,
        permissions: [
          { id: 'hr_shift_read', name: 'View Shift Planner', description: 'Can view weekly and daily calendars, shift assignments', enabled: true },
          { id: 'hr_shift_write', name: 'Publish & Override Shifts', description: 'Can schedule, modify, assign and delete crew work hours', enabled: true },
          { id: 'hr_payroll_write', name: 'Calculate Audits & Base Salaries', description: 'Can process and edit payroll files, tips, flex ratios', enabled: true },
          { id: 'hr_leave_write', name: 'Approve Floating Leave & Excuses', description: 'Can accept or decline sick calls and holiday requests', enabled: true }
        ]
      },
      {
        category: 'Smart Menu Solutions',
        icon: Languages,
        permissions: [
          { id: 'menu_translate', name: 'AI Menu Translation', description: 'Can generate multilingual menus using translation dictionaries', enabled: true },
          { id: 'menu_price_update', name: 'Batch Price Adjuster', description: 'Can change pricing data and export sheets to main branch databases', enabled: true },
          { id: 'menu_allergen', name: 'Allergen Intelligence Core', description: 'Can tag safety items, edit ingredient descriptions and override lists', enabled: true }
        ]
      },
      {
        category: 'Marketing & Brand Growth',
        icon: Share2,
        permissions: [
          { id: 'mktg_social_auto', name: 'Social Auto-Post Publisher', description: 'Can sync credentials and schedule visual feed updates', enabled: true },
          { id: 'mktg_responder', name: 'AI Google Review Responder', description: 'Can post automated answers and feedback summaries to reviews', enabled: true }
        ]
      },
      {
        category: 'System Configuration',
        icon: SettingsIcon,
        permissions: [
          { id: 'sys_brand_edit', name: 'Branch Identity & Global Rules', description: 'Can update hotline, physical coordinate parameters, and logo configurations', enabled: true },
          { id: 'sys_billing_edit', name: 'Plan Subscriptions & Billing Accounts', description: 'Can view invoice trails and upgrade membership tiers', enabled: true }
        ]
      }
    ]
  },
  {
    id: 'role-2',
    name: 'Manager',
    key: 'manager',
    description: 'Operational team supervisor with powers to organize workflows, resolve scheduling conflicts, adjust menus and respond to business reviews.',
    memberCount: 4,
    isSystem: true,
    permissionGroups: [
      {
        category: 'HR & Operations',
        icon: Users,
        permissions: [
          { id: 'hr_shift_read', name: 'View Shift Planner', description: 'Can view weekly and daily calendars, shift assignments', enabled: true },
          { id: 'hr_shift_write', name: 'Publish & Override Shifts', description: 'Can schedule, modify, assign and delete crew work hours', enabled: true },
          { id: 'hr_payroll_write', name: 'Calculate Audits & Base Salaries', description: 'Can process and edit payroll files, tips, flex ratios', enabled: false },
          { id: 'hr_leave_write', name: 'Approve Floating Leave & Excuses', description: 'Can accept or decline sick calls and holiday requests', enabled: true }
        ]
      },
      {
        category: 'Smart Menu Solutions',
        icon: Languages,
        permissions: [
          { id: 'menu_translate', name: 'AI Menu Translation', description: 'Can generate multilingual menus using translation dictionaries', enabled: true },
          { id: 'menu_price_update', name: 'Batch Price Adjuster', description: 'Can change pricing data and export sheets to main branch databases', enabled: true },
          { id: 'menu_allergen', name: 'Allergen Intelligence Core', description: 'Can tag safety items, edit ingredient descriptions and override lists', enabled: true }
        ]
      },
      {
        category: 'Marketing & Brand Growth',
        icon: Share2,
        permissions: [
          { id: 'mktg_social_auto', name: 'Social Auto-Post Publisher', description: 'Can sync credentials and schedule visual feed updates', enabled: true },
          { id: 'mktg_responder', name: 'AI Google Review Responder', description: 'Can post automated answers and feedback summaries to reviews', enabled: true }
        ]
      },
      {
        category: 'System Configuration',
        icon: SettingsIcon,
        permissions: [
          { id: 'sys_brand_edit', name: 'Branch Identity & Global Rules', description: 'Can update hotline, physical coordinate parameters, and logo configurations', enabled: false },
          { id: 'sys_billing_edit', name: 'Plan Subscriptions & Billing Accounts', description: 'Can view invoice trails and upgrade membership tiers', enabled: false }
        ]
      }
    ]
  },
  {
    id: 'role-3',
    name: 'Accountant',
    key: 'accountant',
    description: 'Financial auditor with specialized access to payroll ledger outputs, time-clock variables, and branch tax settings.',
    memberCount: 1,
    isSystem: true,
    permissionGroups: [
      {
        category: 'HR & Operations',
        icon: Users,
        permissions: [
          { id: 'hr_shift_read', name: 'View Shift Planner', description: 'Can view weekly and daily calendars, shift assignments', enabled: true },
          { id: 'hr_shift_write', name: 'Publish & Override Shifts', description: 'Can schedule, modify, assign and delete crew work hours', enabled: false },
          { id: 'hr_payroll_write', name: 'Calculate Audits & Base Salaries', description: 'Can process and edit payroll files, tips, flex ratios', enabled: true },
          { id: 'hr_leave_write', name: 'Approve Floating Leave & Excuses', description: 'Can accept or decline sick calls and holiday requests', enabled: false }
        ]
      },
      {
        category: 'Smart Menu Solutions',
        icon: Languages,
        permissions: [
          { id: 'menu_translate', name: 'AI Menu Translation', description: 'Can generate multilingual menus using translation dictionaries', enabled: false },
          { id: 'menu_price_update', name: 'Batch Price Adjuster', description: 'Can change pricing data and export sheets to main branch databases', enabled: false },
          { id: 'menu_allergen', name: 'Allergen Intelligence Core', description: 'Can tag safety items, edit ingredient descriptions and override lists', enabled: false }
        ]
      },
      {
        category: 'Marketing & Brand Growth',
        icon: Share2,
        permissions: [
          { id: 'mktg_social_auto', name: 'Social Auto-Post Publisher', description: 'Can sync credentials and schedule visual feed updates', enabled: false },
          { id: 'mktg_responder', name: 'AI Google Review Responder', description: 'Can post automated answers and feedback summaries to reviews', enabled: false }
        ]
      },
      {
        category: 'System Configuration',
        icon: SettingsIcon,
        permissions: [
          { id: 'sys_brand_edit', name: 'Branch Identity & Global Rules', description: 'Can update hotline, physical coordinate parameters, and logo configurations', enabled: false },
          { id: 'sys_billing_edit', name: 'Plan Subscriptions & Billing Accounts', description: 'Can view invoice trails and upgrade membership tiers', enabled: true }
        ]
      }
    ]
  },
  {
    id: 'role-4',
    name: 'Kitchen & Bar Crew',
    key: 'kitchen_crew',
    description: 'Back-of-house specialists focused on shift check-ins, preparation list accuracy, food photo AI enhancements, and allergen lookups.',
    memberCount: 8,
    isSystem: true,
    permissionGroups: [
      {
        category: 'HR & Operations',
        icon: Users,
        permissions: [
          { id: 'hr_shift_read', name: 'View Shift Planner', description: 'Can view weekly and daily calendars, shift assignments', enabled: true },
          { id: 'hr_shift_write', name: 'Publish & Override Shifts', description: 'Can schedule, modify, assign and delete crew work hours', enabled: false },
          { id: 'hr_payroll_write', name: 'Calculate Audits & Base Salaries', description: 'Can process and edit payroll files, tips, flex ratios', enabled: false },
          { id: 'hr_leave_write', name: 'Approve Floating Leave & Excuses', description: 'Can accept or decline sick calls and holiday requests', enabled: false }
        ]
      },
      {
        category: 'Smart Menu Solutions',
        icon: Languages,
        permissions: [
          { id: 'menu_translate', name: 'AI Menu Translation', description: 'Can generate multilingual menus using translation dictionaries', enabled: false },
          { id: 'menu_price_update', name: 'Batch Price Adjuster', description: 'Can change pricing data and export sheets to main branch databases', enabled: false },
          { id: 'menu_allergen', name: 'Allergen Intelligence Core', description: 'Can tag safety items, edit ingredient descriptions and override lists', enabled: true }
        ]
      },
      {
        category: 'Marketing & Brand Growth',
        icon: Share2,
        permissions: [
          { id: 'mktg_social_auto', name: 'Social Auto-Post Publisher', description: 'Can sync credentials and schedule visual feed updates', enabled: false },
          { id: 'mktg_responder', name: 'AI Google Review Responder', description: 'Can post automated answers and feedback summaries to reviews', enabled: false }
        ]
      },
      {
        category: 'System Configuration',
        icon: SettingsIcon,
        permissions: [
          { id: 'sys_brand_edit', name: 'Branch Identity & Global Rules', description: 'Can update hotline, physical coordinate parameters, and logo configurations', enabled: false },
          { id: 'sys_billing_edit', name: 'Plan Subscriptions & Billing Accounts', description: 'Can view invoice trails and upgrade membership tiers', enabled: false }
        ]
      }
    ]
  }
];

const INITIAL_MEMBERS = [
  { name: 'Adam Sandoval', email: 'adam@gastrohub.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80' },
  { name: 'Bernice Alvarez', email: 'bernice.alv@gastrohub.com', role: 'Owner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
  { name: 'Richard Payne', email: 'richard247@gmail.com', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80' },
  { name: 'Chau Nguyen', email: 'chau.nguyen@gastrohub.com', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80' },
  { name: 'Duy Long Trinh', email: 'long.trinh@gastrohub.com', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' },
  { name: 'Kimberly Smith', email: 'kim.smith@gastrohub.com', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80' },
  { name: 'Minh Quan', email: 'quan.minh@gastrohub.com', role: 'Accountant', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80' },
  { name: 'Elena Tran', email: 'elena.t@gastrohub.com', role: 'Kitchen & Bar Crew', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop' }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'HR & Operations':
      return Users;
    case 'Smart Menu Solutions':
      return Languages;
    case 'Marketing & Brand Growth':
      return Share2;
    case 'System Configuration':
      return SettingsIcon;
    default:
      return Shield;
  }
};

interface RolePermissionProps {
  staff?: any[];
  setStaff?: React.Dispatch<React.SetStateAction<any[]>>;
  simulatedUser?: any;
}

export default function RolePermission({ staff: staffProps }: RolePermissionProps) {
  const [roles, setRoles] = useState<RoleData[]>(() => {
    const cached = localStorage.getItem('gastro_custom_roles');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return INITIAL_ROLES;
      }
    }
    return INITIAL_ROLES;
  });

  const [activeRoleId, setActiveRoleId] = useState<string>('role-1');
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);
  const [draftGroups, setDraftGroups] = useState<PermissionGroup[]>([]);
  
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleTemplate, setNewRoleTemplate] = useState('manager');
  const [newRolePermissionGroups, setNewRolePermissionGroups] = useState<PermissionGroup[]>([]);
  const [searchMemberQuery, setSearchMemberQuery] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    localStorage.setItem('gastro_custom_roles', JSON.stringify(roles));
  }, [roles]);

  useEffect(() => {
    if (showAddRoleModal) {
      const templateRole = roles.find(r => r.key === newRoleTemplate) || roles[1];
      if (templateRole) {
        setNewRolePermissionGroups(templateRole.permissionGroups.map(group => ({
          ...group,
          permissions: group.permissions.map(p => ({ ...p, enabled: p.enabled }))
        })));
      }
    }
  }, [newRoleTemplate, showAddRoleModal]);

  const handleToggleNewRolePermission = (groupIdx: number, permIdx: number) => {
    setNewRolePermissionGroups(prev => prev.map((g, gIdx) => {
      if (gIdx !== groupIdx) return g;
      const newPerms = [...g.permissions];
      newPerms[permIdx] = {
        ...newPerms[permIdx],
        enabled: !newPerms[permIdx].enabled
      };
      return {
        ...g,
        permissions: newPerms
      };
    }));
  };

  const handleOpenPermissionsModal = (role: RoleData) => {
    setEditingRole(role);
    setDraftGroups(role.permissionGroups.map(group => ({
      ...group,
      permissions: group.permissions.map(p => ({ ...p, enabled: p.enabled }))
    })));
  };

  const handleToggleDraftPermission = (groupIdx: number, permIdx: number) => {
    if (!editingRole || editingRole.key === 'owner') return; // Owner permissions are system-locked
    
    setDraftGroups(prev => prev.map((g, gIdx) => {
      if (gIdx !== groupIdx) return g;
      const newPerms = [...g.permissions];
      newPerms[permIdx] = {
        ...newPerms[permIdx],
        enabled: !newPerms[permIdx].enabled
      };
      return {
        ...g,
        permissions: newPerms
      };
    }));
  };

  const handleSaveDraftPermissions = () => {
    if (!editingRole) return;
    
    setRoles(prev => prev.map(r => {
      if (r.id !== editingRole.id) return r;
      return {
        ...r,
        permissionGroups: draftGroups
      };
    }));
    
    setEditingRole(null);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleAddNewRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newRole: RoleData = {
      id: `role-custom-${Date.now()}`,
      name: newRoleName,
      key: `custom_${newRoleName.toLowerCase().replace(/\s+/g, '_')}`,
      description: newRoleDesc || `Custom clearance level formulated for customized staff credentials.`,
      memberCount: 0,
      isSystem: false,
      permissionGroups: newRolePermissionGroups
    };

    setRoles([...roles, newRole]);
    setShowAddRoleModal(false);
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRoleTemplate('manager');
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  const handleDeleteRole = (id: string, name: string) => {
    setRoleToDelete({ id, name });
    return true;
  };

  const confirmDeleteRole = () => {
    if (!roleToDelete) return;
    const { id } = roleToDelete;
    setRoles(prev => prev.filter(r => r.id !== id));
    if (activeRoleId === id) {
      setActiveRoleId('role-2');
    }
    if (editingRole && editingRole.id === id) {
      setEditingRole(null);
    }
    setRoleToDelete(null);
  };

  return (
    <div className="space-y-6 w-full font-sans text-left">
      
      {/* Dynamic Action Toast */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-slate-900 border border-white/10 text-white px-5 py-4 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-[14px]"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium text-[14px]">Permissions successfully dispatched! Modifications applied in real-time.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flat Page Header - conforming to Rule 5 / Section 5.3 of DESIGN.md */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-2 border-b border-[#EAE4DC]">
        <div className="space-y-1.5 text-left">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight flex items-center gap-2.5 font-sans">
            <ShieldCheck className="w-[24px] h-[24px] text-[#7553FF]" />
            <span>Role & Permission Directory</span>
          </h1>
          <p className="text-[14px] text-slate-700 font-normal leading-relaxed font-sans">
            Verify workspace clearance boundaries, configure role accessibility, and govern crew licenses.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddRoleModal(true)}
          className="h-10 px-4 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-lg transition-all flex items-center gap-2 border-none cursor-pointer select-none shadow-sm"
        >
          <Plus className="w-[16px] h-[16px]" />
          <span>New Custom Role</span>
        </button>
      </div>

      {/* Roles List Table - conforming to Rule 4 & Section 12.4 of DESIGN.md */}
      <div className="bg-white border border-[#1C1814]/5 rounded-2xl shadow-sm overflow-hidden text-left">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-[16px] font-bold text-[#1C1814] font-sans">System Access Control Matrix</h3>
          <p className="text-[14px] text-slate-700 font-sans mt-0.5">Review roles, active roster footprints, and click to configure workspace operational clearances.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#FAF9F7] border-b border-[#EAE4DC]">
              <tr>
                <th className="py-4 px-5 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest w-[25%]">
                  Role Name
                </th>
                <th className="py-4 px-5 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest w-[40%]">
                  Description
                </th>
                <th className="py-4 px-5 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest w-[15%]">
                  Clearance Level
                </th>
                <th className="py-4 px-5 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest w-[12%]">
                  Active Crew
                </th>
                <th className="py-4 px-5 font-serif text-[14px] font-medium text-slate-800 uppercase tracking-widest w-[8%] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((r) => {
                const crew = INITIAL_MEMBERS.filter(m => 
                  m.role.toLowerCase() === r.name.toLowerCase() || 
                  (r.name.includes('Kitchen') && m.role.includes('Kitchen'))
                );

                return (
                  <tr 
                    key={r.id}
                    onClick={() => handleOpenPermissionsModal(r)}
                    className="hover:bg-slate-50/40 transition-all cursor-pointer group"
                  >
                    <td className="py-4 px-5 font-sans text-[14px] font-normal text-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#7553FF]/12 text-[#7553FF] flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-[14px] text-[#1C1814] block leading-snug">{r.name}</span>
                          <span className="text-[13px] text-slate-700 font-normal block mt-0.5 font-mono">{r.key}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-sans text-[14px] font-normal text-slate-700 max-w-[300px]">
                      <p className="line-clamp-2 leading-relaxed text-[14px]" title={r.description}>
                        {r.description}
                      </p>
                    </td>
                    <td className="py-4 px-5 font-sans text-[14px] font-normal text-slate-700">
                      {r.isSystem ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[2px] text-[13px] font-normal uppercase tracking-wider">
                          System Core
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-[2px] text-[13px] font-normal uppercase tracking-wider">
                          Bespoke License
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 font-sans text-[14px] font-normal text-slate-700">
                      <div className="flex items-center gap-2">
                        {/* Avatar Stack */}
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {crew.slice(0, 3).map((member, idx) => (
                            <div 
                              key={idx} 
                              className="w-[26px] h-[26px] rounded-full bg-[#7553FF]/10 text-[#7553FF] border border-white flex items-center justify-center font-bold text-[10px] relative overflow-hidden select-none shrink-0"
                              title={member.name}
                            >
                              {getInitials(member.name)}
                              <img 
                                src={member.avatar} 
                                alt={member.name} 
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                className="absolute inset-0 w-full h-full rounded-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="text-[14px] text-slate-700 font-normal whitespace-nowrap">
                          {crew.length > 0 ? `${crew.length} Active` : '0 Active'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-sans text-[14px] font-normal text-slate-700 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPermissionsModal(r);
                          }}
                          className="p-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-350 hover:text-slate-800 rounded-lg transition-all flex items-center gap-1.5 bg-white cursor-pointer select-none"
                          title="Configure Permissions"
                        >
                          {r.key === 'owner' ? <Eye className="w-3.5 h-3.5 text-slate-700" /> : <Edit2 className="w-3.5 h-3.5 text-slate-700" />}
                          <span className="text-[13px] font-medium text-slate-700">{r.key === 'owner' ? 'View' : 'Edit'}</span>
                        </button>
                        {!r.isSystem && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRole(r.id, r.name);
                            }}
                            className="p-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-350 hover:text-rose-800 rounded-lg transition-all flex items-center bg-white cursor-pointer"
                            title="Delete custom role"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Workforce Roster Crew Directory Card */}
      <div className="bg-white border border-[#1C1814]/5 rounded-lg p-6 shadow-sm space-y-5 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 text-left">
            <h3 className="text-[16px] font-bold text-[#1C1814] font-sans flex items-center gap-2">
              <Users className="w-5 h-5 text-[#7553FF]" />
              <span>Active Workforce Crew Directory</span>
            </h3>
            <p className="text-[14px] text-slate-700 font-sans">Verify roster footprints currently bound to each administrative clearance tier.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-[16px] h-[16px] text-slate-700 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search crew members..." 
              value={searchMemberQuery}
              onChange={(e) => setSearchMemberQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white border border-[#E2E8F0] rounded-lg focus:border-[#7553FF] outline-hidden text-[14px] text-[#1C1814] placeholder:text-slate-700 font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_MEMBERS.filter(m => {
            const matchesSearch = m.name.toLowerCase().includes(searchMemberQuery.toLowerCase()) || 
                                m.email.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
                                m.role.toLowerCase().includes(searchMemberQuery.toLowerCase());
            return matchesSearch;
          }).map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#ffffff] border border-[#1C1814]/5 rounded-xl hover:bg-slate-50/50 transition-colors">
              <div className="w-[38px] h-[38px] rounded-full bg-[#7553FF]/10 text-[#7553FF] font-bold text-[12px] flex items-center justify-center shrink-0 border border-[#7553FF]/20 relative overflow-hidden select-none">
                {getInitials(m.name)}
                <img 
                  src={m.avatar} 
                  alt={m.name} 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="absolute inset-0 w-full h-full rounded-full object-cover" 
                />
              </div>
              <div className="leading-tight text-left overflow-hidden flex-1">
                <p className="text-[14px] font-normal text-[#1C1814] truncate">{m.name}</p>
                <p className="text-[13px] text-slate-700 font-normal truncate mt-0.5">{m.email}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-[2px] text-[12px] font-normal uppercase tracking-wider scale-[0.9] origin-left whitespace-nowrap">
                    {m.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT PERMISSIONS MODAL */}
      <AnimatePresence>
        {editingRole && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl border border-[#1C1814]/5 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Modal Header */}
              <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between shrink-0 bg-white">
                <div className="text-left space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#7553FF]/12 text-[#7553FF] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <h3 className="text-[20px] font-serif font-bold text-[#1C1814] tracking-tight">
                      Configure {editingRole.name} Workflows
                    </h3>
                    {editingRole.key === 'owner' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-[4px] text-[13px] font-normal uppercase tracking-wider">
                        <Lock className="w-[14px] h-[14px]" />
                        <span>Immutable Core</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-[4px] text-[13px] font-normal uppercase tracking-wider">
                        Editable clearance
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] text-slate-700 font-sans mt-1">
                    {editingRole.description}
                  </p>
                </div>
                <button 
                  onClick={() => setEditingRole(null)}
                  className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-800 rounded-lg transition-all cursor-pointer border-none bg-transparent self-start shrink-0"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Scrollable Permission Matrix Content */}
              <div className="p-6 overflow-y-auto space-y-6 bg-[#FAFAFA]">
                {editingRole.key === 'owner' && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3.5 text-left">
                    <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-[14px] font-bold text-slate-900">System Owner Authority Is Encrypted</h4>
                      <p className="text-[14px] text-slate-700 font-normal leading-relaxed">
                        For operational compliance and enterprise audit security, the host Owner profile holds permanent authorization levels. Their active channels are non-adjustable.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {draftGroups.map((group, groupIdx) => {
                    const GroupIcon = getCategoryIcon(group.category);
                    return (
                      <div key={group.category} className="space-y-3.5">
                        <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-2 bg-slate-50/55 px-3 py-1.5 rounded-md">
                          <GroupIcon className="w-[16px] h-[16px] text-[#7553FF]" />
                          <h3 className="text-[14px] font-serif font-medium text-slate-800 uppercase tracking-widest">
                            {group.category}
                          </h3>
                        </div>

                        <div className="flex flex-col gap-3">
                          {group.permissions.map((perm, permIdx) => (
                            <div 
                              key={perm.id} 
                              onClick={() => {
                                if (editingRole.key !== 'owner') {
                                  handleToggleDraftPermission(groupIdx, permIdx);
                                }
                              }}
                              className={`p-4 border rounded-xl flex items-start gap-4 transition-all leading-normal bg-white ${
                                editingRole.key === 'owner' 
                                  ? 'border-[#EAE4DC] cursor-not-allowed' 
                                  : perm.enabled 
                                  ? 'border-[#7553FF]/25 bg-[#7553FF]/[0.01] shadow-[0_2px_12px_rgba(117,83,255,0.03)] cursor-pointer hover:border-[#7553FF]/40 hover:bg-[#7553FF]/[0.02]' 
                                  : 'border-[#EAE4DC] cursor-pointer hover:border-slate-350 hover:bg-slate-50/40'
                              }`}
                            >
                              {/* Custom Checked Checkbox Box */}
                              <div className="pt-0.5 shrink-0 select-none">
                                <div 
                                  className={`w-[20px] h-[20px] rounded-md border flex items-center justify-center transition-all ${
                                    perm.enabled 
                                      ? 'bg-[#7553FF] border-[#7553FF] text-white shadow-[0_2px_4px_rgba(117,83,255,0.25)]' 
                                      : 'border-[#C8BFB5] hover:border-[#7553FF] bg-white text-transparent'
                                  }`}
                                >
                                  <Check className="w-[14px] h-[14px] stroke-[3.5px]" />
                                </div>
                              </div>

                              <div className="space-y-1 text-left flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2.5">
                                  <span className="font-bold text-[14px] text-[#1C1814]">{perm.name}</span>
                                  {perm.enabled ? (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[2px] text-[11px] font-semibold uppercase tracking-wider scale-[0.9] origin-left">
                                      ACTIVE
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-[2px] text-[11px] font-semibold uppercase tracking-wider scale-[0.9] origin-left">
                                      INACTIVE
                                    </span>
                                  )}
                                </div>
                                <p className="text-[13.5px] text-slate-700 font-normal leading-relaxed font-sans mt-0.5">{perm.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="p-6 border-t border-[#EAE4DC] flex items-center justify-between shrink-0 bg-white">
                <div>
                  {!editingRole.isSystem ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteRole(editingRole.id, editingRole.name)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 hover:border-rose-350 font-medium text-[13.5px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Role</span>
                    </button>
                  ) : (
                    <span className="text-[13px] text-slate-700 font-normal uppercase tracking-wider font-mono">
                      Secure Clearance Dispatcher
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingRole(null)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-[#FAF9F7] text-slate-700 font-medium text-[14px] rounded-lg transition-all border-none cursor-pointer select-none"
                  >
                    {editingRole.key === 'owner' ? 'Close' : 'Cancel'}
                  </button>
                  {editingRole.key !== 'owner' && (
                    <button
                      type="button"
                      onClick={handleSaveDraftPermissions}
                      className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-lg transition-colors border-none flex items-center gap-1.5 cursor-pointer select-none shadow-md"
                    >
                      <Save className="w-[16px] h-[16px]" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE NEW CUSTOM ROLE MODAL - Unified metadata and permissions entry */}
      <AnimatePresence>
        {showAddRoleModal && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4">
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-white rounded-2xl border border-[#1C1814]/5 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header */}
              <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between shrink-0 bg-white">
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#7553FF]/12 text-[#7553FF] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-[20px] font-serif font-bold text-[#1C1814] tracking-tight">
                      Create Custom Role
                    </h3>
                  </div>
                  <p className="text-[14px] text-slate-700 font-sans mt-1">
                    Configure both the role metadata and specific workflow permissions in one unified dashboard.
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => setShowAddRoleModal(false)}
                  className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-800 rounded-lg transition-all cursor-pointer border-none bg-transparent self-start shrink-0"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>
              </div>

              {/* Main Scrollable Split Panel */}
              <form onSubmit={handleAddNewRole} className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EAE4DC]">
                  {/* LEFT COLUMN: Role Info */}
                  <div className="w-full md:w-80 shrink-0 p-6 space-y-5 bg-white text-left">
                    <h4 className="text-[12px] font-bold text-[#1C1814] uppercase tracking-wider border-b border-[#EAE4DC] pb-1.5">
                      Role Specifications
                    </h4>

                    {/* Role Name */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#1C1814] uppercase tracking-wider block">
                        Role Name <span className="text-rose-500 font-serif">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        placeholder="e.g. Master Sommelier"
                        className="w-full h-11 px-4 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-hidden transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#1C1814] uppercase tracking-wider block">
                        Description / Purpose
                      </label>
                      <textarea 
                        value={newRoleDesc}
                        onChange={(e) => setNewRoleDesc(e.target.value)}
                        placeholder="Describe specific responsibilities and role limits..."
                        className="w-full min-h-[100px] max-h-[180px] px-4 py-3 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-hidden transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs leading-relaxed"
                      />
                    </div>

                    {/* Base Template */}
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#1C1814] uppercase tracking-wider block">
                        Base Privileges Template <span className="text-rose-500 font-serif">*</span>
                      </label>
                      <div className="relative">
                        <select 
                          value={newRoleTemplate}
                          onChange={(e) => setNewRoleTemplate(e.target.value)}
                          className="w-full h-11 pl-4 pr-10 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 outline-hidden cursor-pointer transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs appearance-none"
                        >
                          <option value="manager" className="text-slate-800 text-[14px]">Manager base settings</option>
                          <option value="accountant" className="text-slate-800 text-[14px]">Accountant base settings</option>
                          <option value="kitchen_crew" className="text-slate-800 text-[14px]">Kitchen & Bar Crew base settings</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-[12px] text-slate-700 leading-normal block pt-1">
                        Changing template pre-populates the permission toggles on the right.
                      </span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Custom Permissions List */}
                  <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white text-left">
                    <div>
                      <h4 className="text-[12px] font-bold text-[#1C1814] uppercase tracking-wider border-b border-[#EAE4DC] pb-1.5 mb-3">
                        Customized Permissions
                      </h4>
                      <p className="text-[13px] text-slate-700 mb-4 leading-relaxed font-sans">
                        Refine permission scopes manually by toggling individual capabilities.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {newRolePermissionGroups.map((group, groupIdx) => {
                        const GroupIcon = getCategoryIcon(group.category);
                        return (
                          <div key={group.category} className="space-y-3.5">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2 px-3 py-1 bg-slate-50/50 rounded-lg">
                              <GroupIcon className="w-[15px] h-[15px] text-[#7553FF]" />
                              <h3 className="text-[13px] font-sans font-semibold text-slate-800 uppercase tracking-wider">
                                {group.category}
                              </h3>
                            </div>

                            <div className="flex flex-col gap-2.5">
                              {group.permissions.map((perm, permIdx) => (
                                <div 
                                  key={perm.id} 
                                  type="button"
                                  onClick={() => handleToggleNewRolePermission(groupIdx, permIdx)}
                                  className={`p-3.5 border rounded-xl flex items-start gap-3.5 transition-all leading-normal cursor-pointer select-none bg-white ${
                                    perm.enabled 
                                      ? 'border-[#7553FF]/25 bg-[#7553FF]/[0.01] shadow-[0_2px_8px_rgba(117,83,255,0.02)] hover:border-[#7553FF]/40 hover:bg-[#7553FF]/[0.02]' 
                                      : 'border-[#EAE4DC] hover:border-slate-350 hover:bg-slate-50/40'
                                  }`}
                                >
                                  {/* Checkbox box */}
                                  <div className="pt-0.5 shrink-0 select-none">
                                    <div 
                                      className={`w-[18px] h-[18px] rounded-md border flex items-center justify-center transition-all ${
                                        perm.enabled 
                                          ? 'bg-[#7553FF] border-[#7553FF] text-white shadow-[0_2px_4px_rgba(117,83,255,0.25)]' 
                                          : 'border-[#C8BFB5] hover:border-[#7553FF] bg-white text-transparent'
                                      }`}
                                    >
                                      <Check className="w-[12px] h-[12px] stroke-[3.5px]" />
                                    </div>
                                  </div>

                                  <div className="space-y-0.5 text-left flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-bold text-[13.5px] text-[#1C1814]">{perm.name}</span>
                                      {perm.enabled ? (
                                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider scale-[0.95] origin-left">
                                          ACTIVE
                                        </span>
                                      ) : (
                                        <span className="px-1.5 py-0.5 bg-slate-50 text-slate-700 border border-slate-100 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider scale-[0.95] origin-left">
                                          INACTIVE
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[13px] text-slate-700 font-normal leading-relaxed font-sans">{perm.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="p-6 border-t border-[#EAE4DC] flex items-center justify-end gap-3 shrink-0 bg-white">
                  <button 
                    type="button"
                    onClick={() => setShowAddRoleModal(false)}
                    className="px-5 h-11 bg-slate-100 hover:bg-[#FAF9F7] text-slate-700 font-medium text-[14px] rounded-xl transition-all border-none cursor-pointer select-none"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 h-11 bg-[#7553FF] hover:bg-[#623EE2] text-white font-medium text-[14px] rounded-xl transition-colors border-none cursor-pointer select-none shadow-md shadow-[#7553FF]/15 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5px]" />
                    <span>Create Custom Role</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM STATE-DRIVEN DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {roleToDelete && (() => {
          const activeStaffForDeletedRole = staffProps 
            ? staffProps.filter(s => s.role.toLowerCase() === roleToDelete.name.toLowerCase() && s.isActive) 
            : [];
          const hasStaff = activeStaffForDeletedRole.length > 0;

          return (
            <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[10000] p-4">
              <motion.div
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                className="bg-white rounded-2xl border border-[#1C1814]/5 p-6 w-full max-w-md relative space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  type="button"
                  onClick={() => setRoleToDelete(null)}
                  className="absolute top-5 right-5 p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-800 rounded-lg transition-all cursor-pointer border-none bg-transparent"
                >
                  <X className="w-[18px] h-[18px]" />
                </button>

                <div className="text-left space-y-3">
                  {hasStaff ? (
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/50 flex items-center justify-center shadow-xs">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/50 flex items-center justify-center shadow-xs">
                      <Trash2 className="w-6 h-6" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-[19px] font-serif font-bold text-[#1C1814] tracking-tight leading-snug">
                      {hasStaff ? 'Cannot Delete Active Role' : 'Delete Custom Role'}
                    </h3>
                    <p className="text-[13.5px] text-slate-700 font-normal mt-1 leading-relaxed">
                      {hasStaff 
                        ? `The role "${roleToDelete.name}" is currently assigned to active staff members. Please reassign or deactivate these staff members before deleting this clearance level.`
                        : `Are you sure you want to permanently delete the custom role "${roleToDelete.name}"? This action is irreversible.`}
                    </p>
                  </div>
                </div>

                {hasStaff && (
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#1C1814] uppercase tracking-wider block">
                      Associated Active Staff ({activeStaffForDeletedRole.length})
                    </label>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 max-h-[140px] overflow-y-auto font-sans">
                      {activeStaffForDeletedRole.map(s => (
                        <div key={s.id} className="flex items-center gap-2.5 text-[13.5px] text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span className="font-semibold text-slate-950">{s.name}</span>
                          <span className="text-slate-700/80">({s.email || 'No email'})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions container */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  {hasStaff ? (
                    <button 
                      type="button"
                      onClick={() => setRoleToDelete(null)}
                      className="px-5 h-11 bg-slate-100 hover:bg-[#FAF9F7] text-slate-700 font-medium text-[14px] rounded-xl transition-all border-none cursor-pointer select-none"
                    >
                      Okay, Close
                    </button>
                  ) : (
                    <>
                      <button 
                        type="button"
                        onClick={() => setRoleToDelete(null)}
                        className="px-5 h-11 bg-slate-100 hover:bg-[#FAF9F7] text-slate-700 font-medium text-[14px] rounded-xl transition-all border-none cursor-pointer select-none"
                      >
                        Cancel
                      </button>
                      <button 
                        type="button"
                        onClick={confirmDeleteRole}
                        className="px-5 h-11 bg-rose-600 hover:bg-rose-700 text-white font-medium text-[14px] rounded-xl transition-colors border-none cursor-pointer select-none shadow-md shadow-rose-600/15 flex items-center gap-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Permanently</span>
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
