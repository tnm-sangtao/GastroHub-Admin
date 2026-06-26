/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Calendar,
  DollarSign,
  Languages,
  ShieldAlert,
  Settings,
  FileText,
  X,
  MapPin,
  Calculator,
  Utensils,
  MessageSquareCode,
  Image,
  QrCode,
  Share2,
  SearchCode,
  Star,
  Sliders,
  Globe,
  UserCheck,
  Clock,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
}

export default function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const commands = [
    { id: 'dashboard', name: 'Open Dashboard (Overview)', category: 'Navigation', icon: Sparkles, tab: 'dashboard' },
    { id: 'shift-planner', name: 'Shift Planner & Work Schedules', category: 'HR & Operations', icon: Calendar, tab: 'shift-planner' },
    { id: 'staff-roles', name: 'Staff & Roles Directory', category: 'HR & Operations', icon: Users, tab: 'staff-roles' },
    { id: 'payroll', name: 'Payroll & Tips Management', category: 'HR & Operations', icon: DollarSign, tab: 'payroll' },
    { id: 'checkin', name: 'Checkin & GPS Attendance Tracker', category: 'HR & Operations', icon: MapPin, tab: 'checkin' },
    { id: 'leave-calculator', name: 'Leave & Flextime Calculator', category: 'HR & Operations', icon: Calculator, tab: 'leave-calculator' },
    { id: 'book-table', name: 'Table Booking App (Reservations)', category: 'Application & Plugins', icon: Utensils, tab: 'book-table' },
    { id: 'chatbot', name: 'AI Customer Service Chatbot Assistant', category: 'Application & Plugins', icon: MessageSquareCode, tab: 'chatbot' },
    { id: 'menu-translator', name: 'Cultural Menu Translator (Menu Translation)', category: 'Smart Menu Solutions', icon: Languages, tab: 'menu-translator' },
    { id: 'ai-food-images', name: 'AI Real-Time Food Images Generator', category: 'Smart Menu Solutions', icon: Image, tab: 'ai-food-images' },
    { id: 'price-update', name: 'Dynamic Price Update & Optimization', category: 'Smart Menu Solutions', icon: FileText, tab: 'price-update' },
    { id: 'qr-menu', name: 'Interactive QR Code Menu Designer', category: 'Smart Menu Solutions', icon: QrCode, tab: 'qr-menu' },
    { id: 'allergen-tool', name: 'Allergen Intelligence Scanner', category: 'Smart Menu Solutions', icon: ShieldAlert, tab: 'allergen-tool' },
    { id: 'social-post', name: 'Social Auto Post Producer & Planner', category: 'Marketing & Brand', icon: Share2, tab: 'social-post' },
    { id: 'seo-opt', name: 'Local SEO Audit & Analytics Booster', category: 'Marketing & Brand', icon: SearchCode, tab: 'seo-opt' },
    { id: 'reviews', name: 'AI Guest Review Responder Engine', category: 'Marketing & Brand', icon: Star, tab: 'reviews' },
    { id: 'marketing-setting', name: 'Campaign & Brand Promotion Settings', category: 'Marketing & Brand', icon: Sliders, tab: 'marketing-setting' },
    { id: 'settings', name: 'Branch & Location Configurations', category: 'Settings', icon: Settings, tab: 'settings' },
    { id: 'social-account', name: 'Social Media Accounts Integration', category: 'Settings', icon: Globe, tab: 'social-account' },
    { id: 'catering-inquiries', name: 'Catering & Dynamic Bulk Inquiries', category: 'Coming Soon', icon: Clock, tab: 'catering-inquiries' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1C1814]/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Dialog Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-[#1C1814]/5 overflow-hidden z-10"
        >
          {/* Header Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1C1814]/5">
            <Search className="w-5 h-5 text-[#1C1814]/40" strokeWidth={1.75} />
            <input
              autoFocus
              type="text"
              placeholder="Search tasks or navigate quickly... (Arrow keys or Click)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-hidden font-sans text-sm text-[#1C1814] placeholder-[#1C1814]/40 h-8"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#1C1814]/5 rounded-sm transition-colors text-[#1C1814]/40 hover:text-[#1C1814]/80"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[320px] overflow-y-auto p-2">
            {filteredCommands.length > 0 ? (
              <div className="space-y-1">
                {/* Categorized rendering logic */}
                {Array.from(new Set(filteredCommands.map((c) => c.category))).map((cat) => (
                  <div key={cat} className="space-y-1">
                    <p className="px-3 pt-2 pb-1 text-[14px] font-semibold text-[#1C1814]/40 tracking-wider uppercase font-display">
                      {cat}
                    </p>
                    {filteredCommands
                      .filter((c) => c.category === cat)
                      .map((cmd) => {
                        const IconComponent = cmd.icon;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              onNavigate(cmd.tab as TabId);
                              onClose();
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#7553FF]/5 group text-left transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-md bg-[#1C1814]/5 group-hover:bg-[#7553FF]/10 group-hover:text-[#7553FF] text-[#1C1814]/70 transition-colors">
                                <IconComponent className="w-4 h-4" strokeWidth={1.75} />
                              </div>
                              <span className="font-sans text-sm font-medium text-[#1C1814] group-hover:text-[#7553FF] transition-colors">
                                {cmd.name}
                              </span>
                            </div>
                            <span className="text-[14px] text-[#1C1814]/30 group-hover:text-[#7553FF]/60 font-mono">
                              ↵ Enter
                            </span>
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-[#1C1814]/40 font-sans">
                No matching commands or functions found.
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#FAFAFA] border-t border-[#1C1814]/5 text-[14px] text-[#1C1814]/40 font-sans">
            <div className="flex gap-4">
              <span><kbd className="bg-white px-1.5 py-0.5 rounded-md border border-[#1C1814]/10 shadow-2xs font-mono text-[14px]">↑↓</kbd> to navigate</span>
              <span><kbd className="bg-white px-1.5 py-0.5 rounded-md border border-[#1C1814]/10 shadow-2xs font-mono text-[14px]">Esc</kbd> to close</span>
            </div>
            <span>Store Hub Quick Ops</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
