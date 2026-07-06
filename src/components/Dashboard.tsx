/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Activity,
  Flame,
  Coins,
  MessageSquare,
  Globe2,
  CheckSquare,
  ChevronRight,
  ArrowRight,
  Image as ImageIcon,
  Zap,
  Star,
  Users,
  Search,
  Check,
  Plus,
  Share2,
  Lock,
  Smartphone,
  Award,
  Bell,
  UtensilsCrossed,
  Clock,
  MapPin,
  ShieldAlert,
  Tag,
  Utensils,
  QrCode,
  BookOpen,
  Info,
  ChevronDown,
  Calendar,
  HelpCircle,
  Send,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TabId } from '../types';

interface DashboardProps {
  onNavigate: (tab: TabId) => void;
  isLoggedIn?: boolean;
  onLogin?: () => void;
}

export default function Dashboard({ onNavigate, isLoggedIn = false, onLogin }: DashboardProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creditsUsed, setCreditsUsed] = useState(1284);
  const [liveActivities, setLiveActivities] = useState([
    {
      id: 'act-1',
      user: 'John',
      source: 'Pizza Palace',
      action: 'created 25 AI food images',
      time: '2 mins ago',
      type: 'image',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'
    },
    {
      id: 'act-2',
      user: 'Bella Cafe',
      source: 'Bella Cafe',
      action: 'translated menu into Italian',
      time: '5 mins ago',
      type: 'translate',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
    },
    {
      id: 'act-3',
      user: 'Italian Bistro',
      source: 'Italian Bistro',
      action: 'generated 14 review responses',
      time: '8 mins ago',
      type: 'reply',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80'
    },
    {
      id: 'act-4',
      user: 'Sushi House',
      source: 'Sushi House',
      action: 'launched smart QR menu',
      time: '12 mins ago',
      type: 'qr',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80'
    }
  ]);

  // Handle a live simulated action to demonstrate interactivity
  const simulateNewActivity = () => {
    const randomNames = ['Burger Joint', 'Taco Mania', 'Paris Bakery', 'Pho Viet'];
    const randomActions = [
      'completed nutrition allergen scan',
      'auto-updated menu prices with AI',
      'optimized Google Maps SEO',
      'published social media posts'
    ];
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const act = randomActions[Math.floor(Math.random() * randomActions.length)];
    const id = 'act-' + Date.now();
    
    setLiveActivities(prev => [
      {
        id,
        user: name,
        source: name,
        action: act,
        time: 'Just now',
        type: 'simulated',
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=100&q=80`
      },
      ...prev.slice(0, 3)
    ]);

    // Increase credit count dynamically
    setCreditsUsed(prev => Math.min(prev + 12, 2000));
  };

  const [chartPeriod, setChartPeriod] = useState<'24h' | '7d' | '30d'>('24h');
  const [qaTab, setQaTab] = useState<'popular' | 'recent' | 'unanswered'>('popular');
  const [qaSearch, setQaSearch] = useState('');

  if (!isLoggedIn) {
    // Beautiful promo landing dashboard mockup
    return (
      <div className="space-y-8 max-w-[1400px] mx-auto pb-16 px-1 font-poppins selection:bg-[#7553FF]/20 select-none">
        
        {/* ========================================================== */}
        {/* I. HEADER SECTION (FLAT LAYOUT - FLAT CARD PRINCIPLE) */}
        {/* ========================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div className="space-y-1">
            <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight leading-tight">
              Welcome to GastroHub
            </h1>
            <p className="text-[14px] text-[#5C534C] font-normal">
              The all-in-one AI toolkit for modern restaurants.
            </p>
          </div>
          <button
            onClick={onLogin}
            className="self-start sm:self-auto px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-lg transition-all flex items-center gap-2 h-10 border-none cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>Try Free for 7 Days</span>
          </button>
        </div>

        {/* ========================================================== */}
        {/* II. THREE KPI CARDS VIEW */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 2: Tasks Completed */}
          <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-lg p-5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-none bg-transparent p-0">
                <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Tasks Completed (All Restaurants)</span>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803D] flex items-center justify-center">
                  <CheckSquare className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-[22px] font-bold text-[#1C1814] tracking-tight font-sans">856,142</h2>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[14px] font-semibold text-[#15803D]">↑ 26.8%</span>
                  <span className="text-[14px] text-[#7C7267]">vs yesterday</span>
                </div>
                <div className="h-7 w-20 bg-emerald-50/50 rounded px-1 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad-unlogged-2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#15803D" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,20 Q 15,10 35,22 T 70,5 T 100,8 L 100,30 L 0,30 Z"
                      fill="url(#grad-unlogged-2)"
                    />
                    <path
                      d="M 0,20 Q 15,10 35,22 T 70,5 T 100,8"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Bottom spacer block to align with Card 1 height */}
            <div className="mt-4 pt-2 border-t border-dashed border-[#EAE4DC]/30 flex items-center justify-end h-6">
              <span className="text-[14px] text-[#7C7267]/50 font-medium">Auto updating</span>
            </div>
          </div>

          {/* Card 3: Time Saved */}
          <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-lg p-5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-none bg-transparent p-0">
                <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Time Saved (All Restaurants)</span>
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#B45309] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-[22px] font-bold text-[#1C1814] tracking-tight font-sans">42,589 hrs</h2>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[14px] font-semibold text-[#15803D]">↑ 21.3%</span>
                  <span className="text-[14px] text-[#7C7267]">vs yesterday</span>
                </div>
                <div className="h-7 w-20 bg-amber-50/50 rounded px-1 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad-unlogged-3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B45309" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,25 Q 25,5 50,18 T 85,12 T 100,5 L 100,30 L 0,30 Z"
                      fill="url(#grad-unlogged-3)"
                    />
                    <path
                      d="M 0,25 Q 25,5 50,18 T 85,12 T 100,5"
                      fill="none"
                      stroke="#B45309"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Bottom spacer block to align with Card 1 height */}
            <div className="mt-4 pt-2 border-t border-dashed border-[#EAE4DC]/30 flex items-center justify-end h-6">
              <span className="text-[14px] text-[#7C7267]/50 font-medium">Realtime calculation</span>
            </div>
          </div>

          {/* Card 4: Community Members */}
          <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-lg p-5 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-none bg-transparent p-0">
                <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Community Members</span>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-[22px] font-bold text-[#1C1814] tracking-tight font-sans font-extrabold">12,842</h2>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[14px] font-semibold text-[#15803D]">↑ 1,324</span>
                  <span className="text-[14px] text-[#7C7267]">this week</span>
                </div>
                <div className="h-7 w-20 bg-blue-50/50 rounded px-1 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad-unlogged-4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,20 Q 20,8 40,22 T 80,10 T 100,5 L 100,30 L 0,30 Z"
                      fill="url(#grad-unlogged-4)"
                    />
                    <path
                      d="M 0,20 Q 20,8 40,22 T 80,10 T 100,5"
                      fill="none"
                      stroke="#1D4ED8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Outline Button Inside Card */}
            <div className="mt-4 pt-2 border-t border-dashed border-[#EAE4DC]/30 flex items-center justify-between">
              <button 
                onClick={() => {
                  const sectionEl = document.getElementById('community-qa-section');
                  if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-1.5 px-3 border border-[#EAE4DC]/40 hover:border-[#7553FF]/30 bg-[#FAFAFA] hover:bg-[#7553FF]/5 text-[#5C534C] hover:text-[#7553FF] font-bold text-sm rounded-md transition-all text-center cursor-pointer h-6 flex items-center justify-center"
              >
                View Community
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* III. MIDDLE SECTION (BAR CHART & PROMOTIONS) */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart Card (col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-[#EAE4DC]/50 rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-md font-semibold text-[#1C1814] tracking-tight leading-none animate-none">
                      Most Used Tools Across All Restaurants
                    </h3>
                    <div className="group relative cursor-help">
                      <Info className="w-4 h-4 text-[#7B7262] hover:text-[#1C1814] transition-colors shrink-0" />
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2.5 bg-[#1C1814] text-white text-[14px] rounded-[6px] shadow-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 leading-normal border border-[#EAE4DC]/40">
                        Aggregated from all verified live restaurant instances.
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#7C7267]">
                    See which tools are being used the most.
                  </p>
                </div>
                {/* Duration Pills */}
                <div className="flex gap-2 select-none">
                  {[
                    { id: '24h', label: 'Last 24 Hours' },
                    { id: '7d', label: 'Last 7 Days' },
                    { id: '30d', label: 'Last 30 Days' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setChartPeriod(p.id as any)}
                      className={`px-3 py-1.5 text-sm font-light rounded-lg transition-all border-none ${
                        chartPeriod === p.id
                          ? 'bg-[#7553FF] text-white'
                          : 'bg-white hover:bg-[#FAF9F7] text-[#5C534C] border border-[#EAE4DC]/70 hover:border-[#DCD2C7] cursor-pointer'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complete Chart Board (Y-axis + Grid + Columns) */}
              <div className="pt-8 flex items-start">
                {/* Y-Axis Label Column to the Left */}
                <div className="flex flex-col justify-between text-right pr-3 text-[14px] font-medium text-[#5C534C] select-none w-10 shrink-0 mt-[48px] h-[220px]">
                  {(() => {
                    const scaleMap = {
                      '24h': ['60K', '50K', '40K', '30K', '20K', '10K', '0'],
                      '7d': ['420K', '350K', '280K', '210K', '140K', '70K', '0'],
                      '30d': ['1.8M', '1.5M', '1.2M', '900K', '600K', '300K', '0']
                    };
                    return scaleMap[chartPeriod].map((lbl, idx) => (
                      <span key={idx}>{lbl}</span>
                    ));
                  })()}
                </div>

                {/* Main scrollable chart box */}
                <div className="flex-1 overflow-x-auto scrollbar-none relative pb-2 select-none">
                  <div className="min-w-[620px] xl:min-w-full h-80 relative flex flex-col justify-between">
                    
                    {/* Background Grid Lines (underlay) */}
                    <div className="absolute left-0 right-0 top-[48px] h-[220px] flex flex-col justify-between pointer-events-none z-0">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="w-full border-t border-slate-100/10" />
                      ))}
                    </div>

                    {/* Columns (overlay) */}
                    <div className="absolute inset-0 flex items-stretch justify-between gap-1 z-10">
                      {[
                        { name: "Menu\nTranslator", value24h: 52431, value7d: 368214, value30d: 1582231, icon: BookOpen, color: '#7553FF', bg: '#F2EEFF', tab: 'menu-translator' },
                        { name: "Book a\nTable", value24h: 41892, value7d: 292747, value30d: 1256114, icon: Utensils, color: '#EA580C', bg: '#FFF1E7', tab: 'book-table' },
                        { name: "AI Food\nImages", value24h: 34206, value7d: 239442, value30d: 1026118, icon: ImageIcon, color: '#2563EB', bg: '#EDF4FF', tab: 'ai-food-images' },
                        { name: "QR For\nMenu", value24h: 26718, value7d: 187026, value30d: 801124, icon: QrCode, color: '#0284C7', bg: '#F0F9FF', tab: 'qr-menu' },
                        { name: "SEO Check &\nOptimization", value24h: 18932, value7d: 132452, value30d: 568341, icon: TrendingUp, color: '#16A34A', bg: '#F0FDF4', tab: 'seo-opt' },
                        { name: "Shift\nPlanner", value24h: 15642, value7d: 109494, value30d: 469112, icon: Calendar, color: '#7C3AED', bg: '#FAF5FF', tab: 'shift-planner' },
                        { name: "Menu Price\nUpdate", value24h: 11324, value7d: 79268, value30d: 339021, icon: Tag, color: '#15803D', bg: '#F0FDF4', tab: 'price-update' },
                        { name: "Review", value24h: 8761, value7d: 61327, value30d: 262311, icon: HelpCircle, color: '#6366F1', bg: '#EEF2FF', tab: 'reviews' },
                        { name: "Checkin", value24h: 6432, value7d: 45024, value30d: 192942, icon: MapPin, color: '#3B82F6', bg: '#EFF6FF', tab: 'checkin' },
                        { name: "Allergen Tool\nfor Menu", value24h: 4231, value7d: 29617, value30d: 126930, icon: ShieldAlert, color: '#4F46E5', bg: '#EEF2FF', tab: 'allergen-tool' },
                      ].map((bar, idx) => {
                        const BIcon = bar.icon;
                        const value = chartPeriod === '24h' 
                          ? bar.value24h 
                          : chartPeriod === '7d' 
                            ? bar.value7d 
                            : bar.value30d;
                        
                        const maxScales = { '24h': 60000, '7d': 420000, '30d': 1800000 };
                        const scale = maxScales[chartPeriod];
                        const heightPercent = Math.min(100, Math.max(0, (value / scale) * 100));

                        // Value Formatter
                        const displayVal = (() => {
                          if (chartPeriod === '24h') return value.toLocaleString();
                          if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M';
                          if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                          return value.toLocaleString();
                        })();

                        return (
                          <div 
                            key={idx} 
                            className="flex-1 flex flex-col justify-end items-center h-full group"
                          >
                            {/* Bar & Target Value Area - 220px fixed plot height */}
                            <div className="h-[220px] w-full flex flex-col justify-end items-center relative mb-0">
                              {/* Exact value text displaying cleanly above the column */}
                              <span className={`font-light text-[#1C1814] mb-1.5 text-center select-none text-[14px]`}>
                                {displayVal}
                              </span>

                              {/* The animated dynamic gradient bar */}
                              <div 
                                style={{ height: `${heightPercent}%` }}
                                className="w-6 sm:w-8 max-w-[34px] bg-gradient-to-t from-[#7553FF] to-[#B5A6FF] rounded-t-lg group-hover:brightness-105 transition-all duration-300 relative"
                                title={`${bar.name.replace('\n', ' ')}: ${value.toLocaleString()}`}
                              >
                                {/* Subtle inner gloss white overlay to create depth */}
                                <div className="absolute inset-x-0 top-0 h-1/2 bg-white/5 rounded-t-lg" />
                              </div>
                            </div>

                            {/* Separator Line */}
                            <div className="w-full border-t border-[#EAE4DC]/10 mb-3" />

                            {/* Column text label */}
                            <span className="text-[12px] font-light text-[#5C534C] text-center w-full break-all leading-tight h-10 whitespace-pre-line group-hover:text-[#1C1814] transition-colors">
                              {bar.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <p className="text-[14px] italic text-[#7C7267] leading-none mt-4 font-normal">
              * Data is aggregated from all restaurants in the community.
            </p>
          </div>

          {/* Tools on Promotion Card (col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-[#EAE4DC]/50 rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-md font-semibold text-[#1C1814] tracking-tight leading-none">
                    Tools on Promotion
                  </h3>
                  <p className="text-sm text-[#7C7267]">
                    Limited time discounts and special offers.
                  </p>
                </div>
                <button 
                  onClick={onLogin}
                  className="text-sm font-medium text-[#7553FF] hover:text-[#623EE2] font-sans flex items-center shrink-0 cursor-pointer bg-transparent border-none"
                >
                  View all →
                </button>
              </div>

              {/* Promo list */}
              <div className="space-y-3 pt-2">
                {[
                  { title: 'AI Food Images', desc: 'Create stunning food photos with AI.', badge: '30% OFF - Ends in 3 days', color: 'rgba(180, 83, 9, 0.12)', textCol: '#B45309', tab: 'ai-food-images' },
                  { title: 'SEO Check & Opt', desc: "Boost your restaurant's Google ranking.", badge: '25% OFF - Ends in 7 days', color: 'rgba(21, 128, 61, 0.12)', textCol: '#15803D', tab: 'seo-opt' },
                  { title: 'Menu Translator', desc: 'Translate your menu to any language.', badge: '20% OFF - Ends in 5 days', color: 'rgba(29, 78, 216, 0.12)', textCol: '#1D4ED8', tab: 'menu-translator' }
                ].map((promo, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(promo.tab as any)}
                    className="p-3.5 bg-[#ffffff] border border-[#EAE4DC]/40 hover:border-[#7553FF]/20 rounded-lg flex items-center justify-between gap-3 group cursor-pointer transition-all hover:bg-white"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <span className="text-sm font-medium text-[#1C1814] tracking-tight block group-hover:text-[#7553FF]">
                        {promo.title}
                      </span>
                      <span className="text-[14px] text-[#5C534C] block leading-tight truncate">
                        {promo.desc}
                      </span>
                      <span 
                        style={{ backgroundColor: promo.color, color: promo.textCol }}
                        className="inline-block px-2.5 py-0.5 rounded-[2px] text-[14px] font-normal animate-none"
                      >
                        {promo.badge}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A8AAAE] group-hover:text-[#7553FF] shrink-0 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="mt-6 w-full py-2.5 border border-dashed border-[#7553FF]/20 hover:border-[#7553FF]/40 text-[#7553FF] bg-[#F5F2FF] hover:bg-[#F0ECFF] font-medium text-sm rounded-lg text-center transition-all cursor-pointer h-10 flex items-center justify-center border-solid"
            >
              View all promotions →
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* IV. BOTTOM SECTION (COMMUNITY JOIN & Q&A) */}
        {/* ========================================================== */}
        <div id="community-qa-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-0 pl-[1px]" style={{ borderColor: '#e2e8f0' }}>
          
          {/* Join Community Panel (col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-[#EAE4DC]/15 rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-md font-semibold text-[#1C1814] tracking-tight leading-none">
                  Join a growing community
                </h3>
                <p className="text-sm text-[#7C7267]">
                  Connect, learn and grow together with restaurant owners worldwide.
                </p>
              </div>

              {/* Connected users portraits diagram */}
              <div className="bg-[#FAF9F7] border border-[#EAE4DC]/10 rounded-lg p-4 flex flex-col items-center text-center relative overflow-hidden">
                <div className="flex items-center -space-x-3 mb-2 pt-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="User 1"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    alt="User 2"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                    alt="User 3"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#7553FF] border-2 border-white text-white font-extrabold text-[14px] flex items-center justify-center shrink-0">
                    +12k
                  </div>
                </div>
                <span className="text-sm font-bold text-[#1C1814] block leading-normal">
                  GastroHub Owner Space
                </span>
                <span className="text-[14px] text-[#15803D] font-bold block mt-0.5">
                  ↑ 1,324 new this week
                </span>
              </div>

              {/* Bullet Features */}
              <div className="space-y-4 pt-2">
                {[
                  { title: 'Ask questions', desc: 'Get help from experts and real restaurant owners.', icon: MessageSquare },
                  { title: 'Share knowledge', desc: 'Share your experience and help others succeed.', icon: Share2 },
                  { title: 'Discover ideas', desc: 'Get inspired by innovative restaurant strategies.', icon: Flame },
                  { title: 'Stay updated', desc: 'Be the first to know about new features and offers.', icon: Bell }
                ].map((item, idx) => {
                  const BulletIcon = item.icon;
                  return (
                    <div key={idx} className="flex gap-3 items-start text-left">
                      <div className="w-7 h-7 rounded-md bg-[#FAF9F7] text-[#7553FF] flex items-center justify-center shrink-0 mt-0.5 border border-[#EAE4DC]/15">
                        <BulletIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-bold text-[#1C1814] block tracking-tight leading-none mb-1">
                          {item.title}
                        </span>
                        <span className="text-[14px] text-[#5C534C] block leading-snug">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="mt-6 w-full py-2.5 border border-[#EAE4DC]/15 hover:border-[#7553FF]/60 bg-[#FAF9F7] hover:bg-white text-[#5C534C] hover:text-[#7553FF] font-black text-sm rounded-lg text-center transition-all cursor-pointer h-10 flex items-center justify-center"
            >
              View Community →
            </button>
          </div>

          {/* Q&A Panel (col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-[#EAE4DC]/15 rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-md font-semibold text-[#1C1814] tracking-tight leading-none">
                    Community Q&A
                  </h3>
                  <p className="text-sm text-[#7C7267]">
                    Ask questions, get help from admin and community members.
                  </p>
                </div>
                {/* Secondary Pill Navigation */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 select-none">
                  <div className="flex p-0.5 bg-[#FAF9F7] border border-[#EAE4DC]/15 rounded-md">
                    {[
                      { id: 'popular', label: 'Popular' },
                      { id: 'recent', label: 'Recent' },
                      { id: 'unanswered', label: 'Unanswered' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setQaTab(tab.id as any)}
                        className={`px-3 py-1 text-sm font-bold rounded-md transition-colors border-none cursor-pointer ${
                          qaTab === tab.id
                            ? 'bg-[#7553FF] text-white'
                            : 'text-[#5C534C] hover:bg-[#EAE4DC]/40'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={onLogin}
                    className="px-3.5 py-1.5 bg-[#7553FF] hover:bg-[#623EE2] text-white text-sm font-black rounded-md transition-colors cursor-pointer border-none"
                  >
                    Ask Question
                  </button>
                </div>
              </div>

              {/* Search Bar / Language Filter */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={qaSearch}
                    onChange={(e) => setQaSearch(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-[#FAF9F7] border border-[#EAE4DC]/15 focus:outline-none focus:border-[#7553FF]/60 focus:bg-white rounded-lg text-sm font-medium placeholder-gray-400 transition-all font-sans"
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7C7267] pointer-events-none" />
                </div>
                {/* Selection Dropdown */}
                <div className="relative shrink-0 select-none">
                  <button
                    onClick={onLogin}
                    className="px-3 py-2.5 bg-[#FAF9F7] hover:bg-white border border-[#EAE4DC]/15 text-sm font-bold text-[#5C534C] hover:text-[#7553FF] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer h-10"
                  >
                    <span>English</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#5C534C]" />
                  </button>
                </div>
              </div>

              {/* Question list list */}
              <div className="space-y-2.5 pt-2">
                {[
                  {
                    author: 'Maria Garcia',
                    time: '2 hours ago',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
                    question: 'How can I generate high-quality food images that attract more customers?',
                    tag: 'AI Food Images',
                    tagTab: 'ai-food-images',
                    replies: 5,
                    period: 'popular'
                  },
                  {
                    author: 'Alex Chen',
                    time: '5 hours ago',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
                    question: "What's the best way to optimize my menu for SEO?",
                    tag: 'SEO Check',
                    tagTab: 'seo-opt',
                    replies: 3,
                    period: 'popular'
                  },
                  {
                    author: 'James Wilson',
                    time: '1 day ago',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
                    question: 'How do I translate my menu to multiple languages at once?',
                    tag: 'Menu Translator',
                    tagTab: 'menu-translator',
                    replies: 8,
                    period: 'popular'
                  },
                  {
                    author: 'Sophie Martin',
                    time: '1 day ago',
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
                    question: 'Any tips for getting more bookings through the Book a Table tool?',
                    tag: 'Book a Table',
                    tagTab: 'book-table',
                    replies: 4,
                    period: 'recent'
                  },
                  {
                    author: 'Daniel Kim',
                    time: '2 days ago',
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
                    question: 'How does the Shift Planner help reduce overtime costs?',
                    tag: 'Shift Planner',
                    tagTab: 'shift-planner',
                    replies: 6,
                    period: 'recent'
                  }
                ]
                  .filter((item) => {
                    // Quick tag/question search filter
                    if (qaSearch.trim() !== '') {
                      const query = qaSearch.toLowerCase();
                      return (
                        item.question.toLowerCase().includes(query) ||
                        item.tag.toLowerCase().includes(query) ||
                        item.author.toLowerCase().includes(query)
                      );
                    }
                    // Filter by tabs
                    if (qaTab === 'unanswered') {
                      return item.replies === 0;
                    }
                    if (qaTab === 'recent') {
                      return item.period === 'recent';
                    }
                    return true;
                  })
                  .map((qa, idx) => (
                    <div
                      key={idx}
                      onClick={onLogin}
                      className="p-3.5 bg-[#FAF9F7] border border-[#EAE4DC]/15 hover:border-[#7553FF]/20 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer transition-all hover:bg-white text-left"
                    >
                      <div className="flex gap-3.5 items-start min-w-0">
                        <img
                          src={qa.avatar}
                          alt={qa.author}
                          className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-[#EAE4DC]/10"
                        />
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-sm font-black text-[#1C1814]">
                              {qa.author}
                            </span>
                            <span className="text-[14px] text-[#7C7267]">
                              • {qa.time}
                            </span>
                          </div>
                          <p className="text-sm font-bold font-sans text-[#5C534C] group-hover:text-black leading-snug">
                            {qa.question}
                          </p>
                          <div className="pt-1 select-none">
                            <span 
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigate(qa.tagTab as any);
                              }}
                              className="inline-block px-2.5 py-0.5 rounded bg-[#7553FF]/10 text-[#7553FF] text-[14px] font-normal hover:bg-[#7553FF]/20"
                            >
                              #{qa.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sm:text-right shrink-0 select-none pl-[47px] sm:pl-0">
                        <span className="inline-block text-[14px] font-extrabold text-[#7553FF] bg-[#F0ECFF] px-2.5 py-1 rounded">
                          {qa.replies} replies
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="mt-6 w-full py-2.5 border border-[#EAE4DC]/15 hover:border-[#7553FF]/60 text-[#5C534C] hover:text-[#7553FF] bg-[#FAF9F7] hover:bg-white font-bold text-sm rounded-lg text-center transition-all cursor-pointer h-10 flex items-center justify-center"
            >
              View all questions →
            </button>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-16 px-1">
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">
              Welcome to GastroHub! 👋
            </h1>
          </div>
          <p className="text-sm font-medium text-gray-500">
            The all-in-one AI toolkit for modern restaurants.
          </p>
        </div>
        
        {/* Right Buttons: Try Free for 7 days */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-5 py-2.5 bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-sm rounded-lg transition-all flex items-center gap-2 h-10 border-none cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span>Try Free for 7 days</span>
          </button>
        </div>
      </div>

      {/* 1.5 KPI METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card 2: Website Visitors */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Website Visitors</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">1,248</h2>
            <div className="flex items-center justify-between gap-2 mt-4 pt-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[14px] font-bold text-emerald-600">↑ 12.5%</span>
                <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last 7 days</span>
              </div>
              <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad-visitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,13 C 25,14 40,9 60,8 C 80,7 90,5 100,4 L 100,20 L 0,20 Z" fill="url(#grad-visitors)" />
                  <path d="M 0,13 C 25,14 40,9 60,8 C 80,7 90,5 100,4" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Menu Views (QR) */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Menu Views (QR)</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">892</h2>
            <div className="flex items-center justify-between gap-2 mt-4 pt-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[14px] font-bold text-emerald-600">↑ 23.1%</span>
                <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last 7 days</span>
              </div>
              <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad-menuviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,14 C 20,15 40,12 60,10 C 80,8 90,5 100,4 L 100,20 L 0,20 Z" fill="url(#grad-menuviews)" />
                  <path d="M 0,14 C 20,15 40,12 60,10 C 80,8 90,5 100,4" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Reviews */}
        <div className="bg-white border border-[#EAE4DC]/50 hover:border-[#7553FF]/20 rounded-2xl p-5 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 border-none bg-transparent p-0">
              <span className="text-[14px] font-semibold text-[#5C534C] tracking-tight">Reviews</span>
              <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#EC4899] flex items-center justify-center shrink-0">
                <Star className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-[32px] font-bold text-[#1C1814] tracking-tight leading-none mt-1 font-sans">23</h2>
            <div className="flex items-center justify-between gap-2 mt-4 pt-1">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[14px] font-bold text-emerald-600">↑ 15.0%</span>
                <span className="text-[14px] text-[#7C7267] whitespace-nowrap">vs last 7 days</span>
              </div>
              <div className="h-6 w-20 overflow-visible shrink-0 pb-0.5">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad-reviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0,15 C 20,13 40,8 60,8 C 80,8 90,6 100,5 L 100,20 L 0,20 Z" fill="url(#grad-reviews)" />
                  <path d="M 0,15 C 20,13 40,8 60,8 C 80,8 90,6 100,5" fill="none" stroke="#EC4899" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID - ROW 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
        {/* Column 1: Tools Usage Overview (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white border border-[#EAE4DC]/50 rounded-2xl p-5 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-md font-semibold text-[#1C1814] tracking-tight">Tools Usage Overview</h3>
                <p className="text-sm text-[#7C7267]">How you use GastroHub tools</p>
              </div>
              <div className="flex items-center gap-1 bg-[#FAF9F7] border border-[#EAE4DC]/60 px-2 py-1 rounded-lg text-sm font-light text-[#5C534C] cursor-pointer shrink-0">
                <span>Last 7d</span>
                <ChevronDown className="w-3 px-0.5" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-3">
              {/* Top: Interactive Donut Chart */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-[140px] h-[140px] relative">
                  <svg viewBox="0 0 40 40" className="w-full h-full transform -rotate-90">
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#F3F4F6" strokeWidth="6.4" />
                    {/* Category slices calculated and displayed proportionally */}
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#7553FF" strokeWidth="6.8" strokeDasharray="16.9 100" strokeDashoffset="0" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#06B6D4" strokeWidth="6.8" strokeDasharray="15.3 100" strokeDashoffset="-16.9" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#0D9488" strokeWidth="6.8" strokeDasharray="13.7 100" strokeDashoffset="-32.2" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#84CC16" strokeWidth="6.8" strokeDasharray="12.5 100" strokeDashoffset="-45.9" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#EAB308" strokeWidth="6.8" strokeDasharray="11.3 100" strokeDashoffset="-58.4" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#EC4899" strokeWidth="6.8" strokeDasharray="10.1 100" strokeDashoffset="-69.7" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#F472B6" strokeWidth="6.8" strokeDasharray="8.1 100" strokeDashoffset="-79.8" />
                    <circle cx="20" cy="20" r="15.9155" fill="none" stroke="#94A3B8" strokeWidth="6.8" strokeDasharray="12.1 100" strokeDashoffset="-87.9" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-[11px] text-[#7C7267] font-semibold  tracking-wider leading-tight block">
                      Total
                      <br />
                      Uses
                    </span>
                    <span className="text-[18px] font-bold text-[#1C1814] leading-none font-sans tracking-tight mt-1">248</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Legend descriptions displayed in single column (1 tool per row) */}
              <div className="grid grid-cols-1 gap-y-2 text-[14px] font-light text-[#5C534C] w-full px-1 flex-1">
                {[
                  { name: 'AI Food Images', val: '42 (16%)', color: 'bg-[#7553FF]' },
                  { name: 'Menu Translator', val: '38 (15%)', color: 'bg-[#06B6D4]' },
                  { name: 'QR For Menu', val: '34 (13%)', color: 'bg-[#0D9488]' },
                  { name: 'Social Auto Post', val: '31 (12%)', color: 'bg-[#84CC16]' },
                  { name: 'SEO Check & Opt.', val: '28 (11%)', color: 'bg-[#EAB308]' },
                  { name: 'Review Mgmt.', val: '25 (10%)', color: 'bg-[#EC4899]' },
                  { name: 'Book a Table', val: '20 (8%)', color: 'bg-[#F472B6]' },
                  { name: 'Others', val: '30 (12%)', color: 'bg-[#94A3B8]' },
                ].map((leg, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${leg.color} shrink-0 ${idx === 4 ? "text-[14px]" : ""}`} />
                      <span className="truncate font-light text-[#564E48] text-[14px] leading-none">{leg.name}</span>
                    </div>
                    <span className={`font-mono font-light text-slate-700 shrink-0 ${idx === 4 ? "text-[13px]" : "text-[14px]"}`}>{leg.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#EAE4DC]/30 flex justify-center mt-4">
            <button
               onClick={() => onNavigate('menu-translator')}
              className="px-4 py-1.5 border border-[#EAE4DC]/60 hover:border-[#7553FF]/30 text-sm font-medium text-[#5C534C] hover:text-[#7553FF] rounded-lg transition-colors cursor-pointer bg-white"
            >
              View All Tools Analytics
            </button>
          </div>
        </div>

        {/* Column 3: Upcoming & Reminders + Promo Stack (xl:col-span-8) */}
        <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card A: Upcoming & Reminders */}
          <div className="bg-white border border-[#EAE4DC]/50 rounded-2xl p-5 flex flex-col justify-between h-full">
            <div className="space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#EAE4DC]/30">
                  <h3 className="text-md font-semibold text-[#1C1814] tracking-tight">Upcoming & Reminders</h3>
                </div>

                <div className="space-y-4 pt-4">
                  {/* Shift Schedule */}
                  <div className="flex items-center justify-between gap-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-slate-800 block text-[14px] leading-tight mb-1">Shift Schedule</span>
                        <span className="text-[#5C534C] text-[14px] leading-tight block">Next shift starts tomorrow</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-medium text-slate-900 shrink-0">9:00 AM</span>
                  </div>

                  {/* Reservation */}
                  <div className="flex items-center justify-between gap-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-slate-800 block text-[14px] leading-tight mb-1">Reservation</span>
                        <span className="text-[#5C534C] text-[14px] leading-tight block">5 bookings today</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-medium text-slate-900 shrink-0">12:00 PM</span>
                  </div>

                  {/* AI Promotion */}
                  <div className="flex items-center justify-between gap-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-slate-800 block text-[14px] leading-tight mb-1">AI Promotion</span>
                        <span className="text-[#5C534C] text-[14px] leading-tight block">20% off on AI Food Images</span>
                      </div>
                    </div>
                    <span className="text-[14px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">Ends in 3 days</span>
                  </div>

                  {/* SEO Check */}
                  <div className="flex items-center justify-between gap-3 text-[14px]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-slate-800 block text-[14px] leading-tight mb-1">SEO Check</span>
                        <span className="text-[#5C534C] text-[14px] leading-tight block">Weekly SEO check is ready</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('settings')}
                      className="text-[14px] font-medium text-[#7553FF] hover:text-[#623EE2] bg-transparent border-none cursor-pointer shrink-0"
                    >
                      View Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE4DC]/30 flex justify-center mt-4 shrink-0">
                <button
                  onClick={() => onNavigate('menu-translator')}
                  className="text-sm font-medium text-[#7553FF] hover:text-[#623EE2] flex items-center bg-transparent border-none cursor-pointer"
                >
                  View All Activity →
                </button>
              </div>
            </div>
          </div>

          {/* Card B: Social Auto Post Promotion */}
          <div className="bg-gradient-to-br from-[#FCFBFF] via-[#F4F0FF] to-[#FAF8FF] rounded-2xl p-6.5 flex flex-col justify-between h-full transition-all duration-300 relative overflow-hidden">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#E6DAFF] via-[#F4EFFF]/40 to-transparent opacity-60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#EFE8FF] opacity-35 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              {/* Badge */}
              <div className="inline-block bg-[#EBE5FF] text-[#7553FF] text-[14px] font-extrabold tracking-wider  px-2.5 py-1 rounded-md select-none">
                Marketing & Brand Growth
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h4 className="text-[28px] font-bold tracking-tight text-[#110B33] leading-none font-sans">
                  Social Auto Post
                </h4>
                <p className="text-[14px] text-slate-700 font-normal leading-relaxed">
                  Create, schedule, and auto-post engaging content across all your social media channels.
                </p>
              </div>

              {/* Bullet list */}
              <div className="space-y-4 pt-1">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 text-[14px] block leading-none">Auto-schedule posts</span>
                    <span className="text-[14px] text-slate-700 block leading-tight">Plan and publish content on autopilot.</span>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 text-[14px] block leading-none">AI content generation</span>
                    <span className="text-[14px] text-slate-700 block leading-tight">Generate captions and hashtags with AI.</span>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EBE5FF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <BarChart2 className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800 text-[14px] block leading-none">Track performance</span>
                    <span className="text-[14px] text-slate-700 block leading-tight">Monitor engagement and grow your audience.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action bottom */}
            <div className="mt-6 pt-2 space-y-2.5 relative z-10 w-full">
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full py-3 bg-gradient-to-r from-[#7553FF] to-[#612FE5] hover:brightness-110 active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
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

      {/* 3. BENTO GRID - ROW 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8" style={{ borderColor: '#e2e8f0' }}>
        {/* Column 1: Recent Activity (xl:col-span-4) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-[#EAE4DC]/15 rounded-2xl p-5 flex flex-col justify-between h-full">
            <div className="space-y-3.5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 mb-4">
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-md font-semibold text-[#1C1814] tracking-tight">Recent Activity</h3>
                    <p className="text-sm text-[#7C7267] truncate">Your latest actions across GastroHub</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { title: 'AI Food Images', text: "Generated 8 images for 'Grilled Salmon'", time: '2 hours ago', icon: ImageIcon, bgIcon: 'bg-[#E8F2FF] text-[#2563EB]' },
                    { title: 'Menu Translator', text: 'Translated menu to Vietnamese', time: '5 hours ago', icon: Globe2, bgIcon: 'bg-emerald-50 text-emerald-600' },
                    { title: 'QR For Menu', text: 'Updated QR menu - Summer Special', time: '1 day ago', icon: QrCode, bgIcon: 'bg-indigo-50 text-indigo-600' },
                    { title: 'Review Management', text: 'Replied to 3 new reviews', time: '1 day ago', icon: Star, bgIcon: 'bg-amber-50 text-amber-500' },
                    { title: 'SEO Check & Optimization', text: 'SEO report generated for johnsbistro.com', time: '2 days ago', icon: TrendingUp, bgIcon: 'bg-rose-50 text-rose-500' },
                  ].map((act, idx) => {
                    const ActIcon = act.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${act.bgIcon}`}>
                            <ActIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[14px] font-semibold text-slate-800 block leading-none mb-1.5">{act.title}</span>
                            <span className="text-[14px] text-[#5C534C] block leading-tight truncate">{act.text}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 shrink-0 text-right">
                          <span className="px-2 py-0.5 rounded-[2px] bg-emerald-50 text-emerald-700 text-[14px] font-medium border border-emerald-100">Completed</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE4DC]/10 flex justify-center mt-4 shrink-0">
                <button
                  onClick={() => onNavigate('menu-translator')}
                  className="text-sm font-medium text-[#7553FF] hover:text-[#623EE2] flex items-center bg-transparent border-none cursor-pointer"
                >
                  View All Activity →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Top Performing Tools (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white border border-[#EAE4DC]/15 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3.5 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-md font-semibold text-[#1C1814] tracking-tight">Top Performing Tools</h3>
              <p className="text-sm text-[#7C7267]">Your most impactful tools</p>
            </div>

            <div className="min-w-full divide-y divide-[#EAE4DC]/10 mt-4 flex-1">
              {/* Table Header */}
              <div className="flex items-center text-[14px] font-bold text-[#7C7267]  tracking-wider pb-2">
                <div className="w-1/2">Tool</div>
                <div className="w-1/6 text-right pr-4">Uses</div>
                <div className="w-1/3 text-right">Impact Score</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#EAE4DC]/10 font-sans">
                {[
                  { name: 'AI Food Images', icon: ImageIcon, uses: 42, score: '92%', color: 'from-[#7553FF] to-[#9275FF]' },
                  { name: 'Menu Translator', icon: Globe2, uses: 38, score: '88%', color: 'from-[#06B6D4] to-[#22E2FF]' },
                  { name: 'QR For Menu', icon: QrCode, uses: 34, score: '81%', color: 'from-[#0D9488] to-[#14B8A6]' },
                  { name: 'Social Auto Post', icon: Share2, uses: 31, score: '76%', color: 'from-[#84CC16] to-[#A3E635]' },
                  { name: 'SEO Check & Optimization', icon: TrendingUp, uses: 28, score: '73%', color: 'from-[#EAB308] to-[#FACC15]' }
                ].map((tool, idx) => {
                  const ToolIcon = tool.icon;
                  return (
                    <div key={idx} className="flex items-center py-3.5 text-[14px]">
                      {/* Tool Name with Icon */}
                      <div className="w-1/2 flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-md bg-[#FAF9F7] text-slate-700 border border-[#EAE4DC]/15 flex items-center justify-center shrink-0">
                          <ToolIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-semibold text-slate-800 truncate text-[14px] leading-tight">{tool.name}</span>
                      </div>

                      {/* Uses count */}
                      <div className="w-1/6 text-right pr-4 font-mono font-medium text-[#5C534C] text-[14px]">
                        {tool.uses}
                      </div>

                      {/* Score text & mini progress bar */}
                      <div className="w-1/3 flex items-center justify-end gap-2 text-right">
                        <span className="font-mono font-medium text-slate-800 text-[14px] shrink-0">{tool.score}</span>
                        <div className="w-14 bg-slate-100 h-1.5 rounded-full overflow-hidden shrink-0 hidden sm:block">
                          <div 
                            className={`bg-gradient-to-r ${tool.color} h-full rounded-full`}
                            style={{ width: tool.score }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE4DC]/10 flex justify-center mt-4 shrink-0">
              <button
                onClick={() => onNavigate('menu-translator')}
                className="text-sm font-medium text-[#7553FF] hover:text-[#623EE2] flex items-center bg-transparent border-none cursor-pointer"
              >
                View Full Analytics →
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Tips & Recommendations (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white border border-[#EAE4DC]/15 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3.5 h-full flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-md font-semibold text-[#1C1814] tracking-tight">Tips & Recommendations</h3>
              <p className="text-sm text-[#7C7267]">Personalized tips to help you grow</p>
            </div>

            <div className="space-y-2.5 pt-4 flex-1">
              {[
                { text: "You're getting great engagement on Instagram! Consider posting 2 more times this week.", icon: Smartphone, bg: 'bg-[#F0ECFF] text-[#7553FF]', borderCol: 'hover:border-[#7553FF]/30' },
                { text: "Your menu hasn't been updated in 45 days. Update prices to keep information accurate.", icon: Tag, bg: 'bg-sky-50 text-sky-600', borderCol: 'hover:border-sky-300/30' },
                { text: "Responding to reviews quickly increases loyalty. You have 2 reviews waiting for a response.", icon: MessageSquare, bg: 'bg-emerald-50 text-emerald-600', borderCol: 'hover:border-emerald-300/30' },
                { text: "Your SEO score improved by 18% this week! Keep optimizing for even better results.", icon: TrendingUp, bg: 'bg-teal-50 text-teal-600', borderCol: 'hover:border-teal-300/30' }
              ].map((tip, idx) => {
                const TipIcon = tip.icon;
                return (
                  <div 
                    key={idx}
                    onClick={() => onNavigate('menu-translator')}
                    className={`p-3 bg-[#FAF9F7] border border-[#EAE4DC]/15 rounded-xl flex items-center justify-between gap-2.5 group transition-all hover:bg-white cursor-pointer ${tip.borderCol}`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${tip.bg}`}>
                        <TipIcon className="w-4 h-4" />
                      </div>
                      <p className="text-[14px] font-medium text-slate-700 leading-snug font-sans truncate transition-all duration-300">
                        {tip.text}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-[#7553FF] shrink-0 transition-colors" />
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#EAE4DC]/10 flex justify-center mt-4 shrink-0">
              <button
                onClick={() => onNavigate('menu-translator')}
                className="text-sm font-medium text-[#7553FF] hover:text-[#623EE2] flex items-center bg-transparent border-none cursor-pointer"
              >
                View All Recommendations →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. PRESET INTERACTIVE SYSTEM DIALOG POPUPS */}
      {/* ========================================================================= */}

      {/* A. Upgrade Plan Info Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-[#1C1814]/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#7553FF]/20 w-full max-w-lg rounded-3xl p-6 relative space-y-6 text-[#1C1814]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#7553FF]/10 flex items-center justify-center text-[#7553FF] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-gray-900 leading-none">Upgrade to GastroHub Pro</h3>
                    <span className="text-sm text-gray-400 mt-1 block">Unlock limitless AI creation & advanced automation tools.</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-1 px-2 hover:bg-gray-100 rounded-lg text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm">
                <div className="p-4 rounded-2xl bg-[#7553FF]/10/40 border border-[#7553FF]/20 space-y-2">
                  <span className="text-[14px] font-black text-[#7553FF]  tracking-widest block">Core Premium Features Included</span>
                  <ul className="space-y-1.5 text-sm text-gray-600 font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      Unlimited high-fidelity AI generated Food Images
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      Dynamic automated responses for Google Reviews
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      Intelligent menu translations into Japanese, Spanish, Italian & German
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      Priority localized SEO tracking and competitor analytics reports
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <div>
                    <span className="text-lg font-extrabold text-[#7553FF] block">$49<span className="text-sm text-gray-400 font-medium font-sans">/mo</span></span>
                    <span className="text-[14px] text-gray-400 font-bold  tracking-wider block">Billed monthly</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowUpgradeModal(false)}
                      className="px-4 py-2 border border-gray-100 bg-gray-50 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => {
                        setShowUpgradeModal(false);
                        alert("Thank you for choosing to upgrade and elevate your GastroHub Pro restaurant experience!");
                      }}
                      className="px-4 py-2 bg-[#7553FF] text-white rounded-xl text-sm font-extrabold hover:bg-[#623EE2] transition-colors"
                    >
                      Start Free Trial
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. Create New Task Input Dialog */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-[#1C1814]/30 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-gray-100 w-full max-w-md rounded-3xl p-6 relative space-y-5 text-[#1C1814]"
            >
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <h3 className="text-md font-extrabold flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#7553FF]" />
                  <span>Start New Smart Task</span>
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 px-2 hover:bg-gray-100 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 font-sans text-sm">
                <p className="text-sm text-gray-500 font-medium">Select the AI automation solution you want to launch now:</p>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      onNavigate('menu-translator');
                    }}
                    className="w-full p-3 bg-gray-50 border border-gray-100 hover:border-[#7553FF]/30 hover:bg-[#7553FF]/10/20 text-left rounded-2xl flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#7553FF]/20 text-[#7553FF] flex items-center justify-center font-bold">1</div>
                    <div>
                      <span className="text-sm font-extrabold block">AI Food Photo Creator</span>
                      <span className="text-[14px] text-gray-400 block leading-tight">Snaps and enhances gorgeous food presentation aesthetics</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      onNavigate('menu-translator');
                    }}
                    className="w-full p-3 bg-gray-50 border border-gray-100 hover:border-[#7553FF]/30 hover:bg-[#7553FF]/10/20 text-left rounded-2xl flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">2</div>
                    <div>
                      <span className="text-sm font-extrabold block">Smart Menu Translator</span>
                      <span className="text-[14px] text-gray-400 block leading-tight">Empowers global tourists to seamlessly appreciate your localized recipes</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      onNavigate('allergen-tool');
                    }}
                    className="w-full p-3 bg-gray-50 border border-gray-100 hover:border-[#7553FF]/30 hover:bg-[#7553FF]/10/20 text-left rounded-2xl flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#7553FF] flex items-center justify-center font-bold">3</div>
                    <div>
                      <span className="text-sm font-extrabold block">Allergen Indicator Scanner</span>
                      <span className="text-[14px] text-gray-400 block leading-tight">Analyzes your recipe registry for allergen safety risk discovery</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-50">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-100 bg-gray-50 font-bold hover:bg-gray-100 text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
