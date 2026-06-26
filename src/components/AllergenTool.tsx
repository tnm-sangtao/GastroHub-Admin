/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { 
  ShieldAlert, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  RefreshCw, 
  X,
  Copy,
  ExternalLink,
  Shield,
  ArrowRight,
  Info,
  Check,
  HelpCircle,
  Clock,
  AlertCircle,
  Search,
  Wheat,
  Milk,
  Egg,
  Fish,
  Leaf,
  FileSpreadsheet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AllergenItem {
  id: number;
  name: string;
  vietnameseName: string;
  description: string;
  severity: 'Critical' | 'Caution' | 'Advisory';
  dishes: string[];
}

export default function AllergenTool() {
  const [fileAttached, setFileAttached] = useState<boolean>(false);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [menuUrl, setMenuUrl] = useState('https://gastrohub.nomad.id/m/johns-bistro');
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Workflow states
  // step: 0 (upload preparation), 1 (active loading), 2 (split screen review result)
  const [step, setStep] = useState<number>(0);
  const [activeAnalysisStep, setActiveAnalysisStep] = useState<number>(1); // 1: Extract, 2: AI, 3: Review, 4: Complete
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [statusText, setStatusText] = useState('Standby');

  // Modal selector for mandatory EU allergens 1169/2011
  const [euAllergenOpen, setEuAllergenOpen] = useState(false);

  // Search and filter states for the results table
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAllergen, setSelectedAllergen] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Define interface for Menu Items
  interface MenuItem {
    name: string;
    allergens: string[];
    risk: 'High' | 'Medium' | 'None';
    status: 'Detected' | 'No Allergens';
  }

  // Generate 128 items dynamically with exactly 74 items containing allergens (57.8%)
  const menuItems = useMemo<MenuItem[]>(() => {
    const baseItems: MenuItem[] = [
      { name: "Grilled Salmon", allergens: ["Fish"], risk: "Medium", status: "Detected" },
      { name: "Caesar Salad", allergens: ["Egg", "Milk", "Fish"], risk: "High", status: "Detected" },
      { name: "Beef Burger", allergens: ["Gluten", "Milk"], risk: "Medium", status: "Detected" },
      { name: "French Fries", allergens: [], risk: "None", status: "No Allergens" },
      { name: "Chocolate Cake", allergens: ["Gluten", "Egg", "Milk", "Soy"], risk: "High", status: "Detected" },
      { name: "Tomato Soup", allergens: [], risk: "None", status: "No Allergens" },
      { name: "Chicken Curry", allergens: ["Milk", "Mustard"], risk: "Medium", status: "Detected" },
      { name: "Greek Salad", allergens: [], risk: "None", status: "No Allergens" },
    ];

    const pool = [
      { name: "Lemon Herb Salmon Platter", allergens: ["Fish"], risk: "Medium", status: "Detected" },
      { name: "Spaghetti Carbonara", allergens: ["Gluten", "Egg", "Milk"], risk: "High", status: "Detected" },
      { name: "Crispy Spring Rolls", allergens: ["Gluten"], risk: "Medium", status: "Detected" },
      { name: "Garlic Edamame", allergens: ["Soy"], risk: "Medium", status: "Detected" },
      { name: "Assorted Vegetables", allergens: [], risk: "None", status: "No Allergens" },
      { name: "Peanuts Garnish Pho", allergens: ["Peanuts"], risk: "High", status: "Detected" },
      { name: "Chocolate Lava Muffin", allergens: ["Gluten", "Egg", "Milk"], risk: "High", status: "Detected" },
      { name: "Steamed Jasmine Rice", allergens: [], risk: "None", status: "No Allergens" },
      { name: "Shrimp Tempura Bowls", allergens: ["Crustaceans", "Gluten"], risk: "High", status: "Detected" },
      { name: "Roasted Asparagus", allergens: [], risk: "None", status: "No Allergens" },
      { name: "Honey Mustard Ribs", allergens: ["Mustard"], risk: "Medium", status: "Detected" },
      { name: "Traditional Cheese Pizza", allergens: ["Gluten", "Milk"], risk: "Medium", status: "Detected" },
      { name: "Tofu Summer Rolls", allergens: ["Soy"], risk: "Medium", status: "Detected" },
      { name: "Mushroom Risotto", allergens: ["Milk"], risk: "Medium", status: "Detected" },
      { name: "Seasonal Fresh Fruit Salad", allergens: [], risk: "None", status: "No Allergens" },
    ];

    const list = [...baseItems];
    let allergenCount = 5; // index 0,1,2,4,6 are 5 items with allergens in baseItems
    for (let i = 8; i < 128; i++) {
      const template = pool[i % pool.length];
      const hasAllergen = template.allergens.length > 0;
      
      let itemAllergens: string[] = [];
      let itemRisk: 'High' | 'Medium' | 'None' = 'None';
      let itemStatus: 'Detected' | 'No Allergens' = 'No Allergens';

      if (hasAllergen && allergenCount < 74) {
        itemAllergens = [...template.allergens];
        itemRisk = template.risk as 'High' | 'Medium' | 'None';
        itemStatus = 'Detected';
        allergenCount++;
      } else {
        itemAllergens = [];
        itemRisk = 'None';
        itemStatus = 'No Allergens';
      }

      list.push({
        name: `${template.name} #${Math.floor(i / pool.length) + 1}`,
        allergens: itemAllergens,
        risk: itemRisk,
        status: itemStatus
      });
    }
    return list;
  }, []);

  // Filter items based on criteria
  const filteredItems = useMemo<MenuItem[]>(() => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAllergen = selectedAllergen === 'All' || item.allergens.includes(selectedAllergen);
      const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
      return matchesSearch && matchesAllergen && matchesStatus;
    });
  }, [menuItems, searchTerm, selectedAllergen, selectedStatus]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // clamp current page value
  const activePage = Math.min(currentPage, totalPages || 1);

  const paginatedItems = useMemo<MenuItem[]>(() => {
    const start = (activePage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, activePage]);
  
  // Custom allergen list mockup based on Vietnamese menu
  const [detectedAllergens, setDetectedAllergens] = useState<AllergenItem[]>([
    {
      id: 1,
      name: 'Peanuts',
      vietnameseName: 'Peanuts',
      description: 'Found in garnish oil marinade & dressing sauce used for grilled rice-pancake dishes.',
      severity: 'Critical',
      dishes: ['Huong Que Bun Cha', 'Special Pork Spring Rolls']
    },
    {
      id: 2,
      name: 'Crustaceans (Shrimp)',
      vietnameseName: 'Crustaceans (Shrimp)',
      description: 'Traditional summer rolls are wrapped with fresh premium boiled tiger prawn slices.',
      severity: 'Caution',
      dishes: ['Goi Cuon Shrimp & Pork']
    },
    {
      id: 3,
      name: 'Soybeans & Wheat',
      vietnameseName: 'Soybeans & Wheat',
      description: 'Used in recipe for fermented sweet soybean paste dipping sauces.',
      severity: 'Advisory',
      dishes: ['Nha Trang Grilled Meat Skewers']
    }
  ]);

  // Mandatory 14 allergens reference catalog
  const EU_14_ALLERGENS = [
    { name: 'Cereals containing Gluten', code: 'GL', desc: 'Wheat, rye, barley, oats, spelt.' },
    { name: 'Crustaceans', code: 'CR', desc: 'Shrimps, crabs, lobsters, crawfish.' },
    { name: 'Eggs', code: 'EG', desc: 'Egg white, yolk, powdered eggs.' },
    { name: 'Fish', code: 'FI', desc: 'All species of fish and fish derivatives.' },
    { name: 'Peanuts', code: 'PE', desc: 'Peanut butter, oil, flour.' },
    { name: 'Soybeans', code: 'SO', desc: 'Soy sauce, tofu, edamame.' },
    { name: 'Milk (Lactose)', code: 'MK', desc: 'Butter, cheese, cream, milk powders.' },
    { name: 'Nuts', code: 'NU', desc: 'Almonds, hazelnuts, walnuts, cashews, pecans.' },
    { name: 'Celery', code: 'CE', desc: 'Celery stalks, leaves, seeds, celeriac.' },
    { name: 'Mustard', code: 'MU', desc: 'Seeds, powder, liquid dressings.' },
    { name: 'Sesame seeds', code: 'SE', desc: 'Sesame oil, tahini, paste, seeds.' },
    { name: 'Sulphur dioxide/Sulphites', code: 'SU', desc: 'Preservatives in dried fruits, wines.' },
    { name: 'Lupin', code: 'LU', desc: 'Lupin flour, seeds, pastries.' },
    { name: 'Molluscs', code: 'MO', desc: 'Clams, mussels, snails, oysters, squid.' }
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    triggerToast('Menu link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Drag and drop attachment simulator
  const handleSimulateDragAttach = () => {
    setFileName('CHEF_BISTRO_SPRING_MENU_2026.pdf');
    setFileSize('4.8 MB');
    setFileAttached(true);
    triggerToast('Menu PDF loaded successfully! Click Start Analysis below.');
  };

  const handleStartAnalysis = () => {
    if (!fileAttached) {
      triggerToast('Please upload a Menu PDF first!');
      return;
    }
    
    setStep(1);
    setProgressPercent(0);
    setActiveAnalysisStep(1);
    setStatusText('Extracting text content via PDF parser...');

    // Phase 1 (Extract PDF)
    setTimeout(() => {
      setProgressPercent(25);
      setActiveAnalysisStep(2);
      setStatusText('Identifying ingredients under EU 1169/2011 standard...');
    }, 1500);

    // Phase 2 (AI Analysis)
    setTimeout(() => {
      setProgressPercent(55);
      setActiveAnalysisStep(3);
      setStatusText('Validating potential allergens with kitchen recipes db...');
    }, 3200);

    // Phase 3 (Review)
    setTimeout(() => {
      setProgressPercent(85);
      setActiveAnalysisStep(4);
      setStatusText('Assembling labeling badges and report cards...');
    }, 4800);

    // Phase 4 (Complete)
    setTimeout(() => {
      setProgressPercent(100);
      setStatusText('Analysis completed successfully!');
      setTimeout(() => {
        setStep(2); // transition to results split-view
      }, 500);
    }, 6200);
  };

  const handleReset = () => {
    setStep(0);
    setFileAttached(false);
    setFileName('');
    setFileSize('');
    setProgressPercent(0);
    setActiveAnalysisStep(1);
    setStatusText('Standby');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-slate-800 font-sans text-left">
      
      {/* Toast Alert Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER SECTION CARD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div className="space-y-1 text-left">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight">Allergen Analyzer</h1>
          <p className="text-sm text-slate-700 font-medium">
            Analyze menus for allergens in compliance with EU regulations.
          </p>
        </div>

        {/* Live interactive link banner widgets matching screenshot */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5">
            <input 
              type="text" 
              readOnly 
              value={menuUrl}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-600 focus:outline-none w-56 sm:w-64"
            />
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 shadow-3xs cursor-pointer transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-slate-700" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <a
              href="https://gastrohub.nomad.id/m/johns-bistro"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#7553FF] hover:bg-[#623EE2] active:bg-[#4E25C4] text-white rounded-xl text-xs font-bold shadow-3xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-white" />
              <span>View</span>
            </a>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-150 rounded-[2px] px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Menu Live</span>
          </div>
        </div>
      </div>

      {/* PROCESS STATUS HORIZONTAL TRACKER (SOCIALLY INTEGRATED FROM RAW MOCKUP) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-4">
        <h3 className="text-xs font-extrabold text-[#111827] tracking-wider uppercase">Process Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
          
          {/* Step 1 */}
          <div className="flex items-center gap-3 bg-slate-50/40 p-3 rounded-xl border border-slate-100/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step === 2 || (step > 0 && activeAnalysisStep >= 1) ? 'bg-[#F0ECFF] text-[#7553FF]' : 'bg-slate-50 text-slate-700'
            }`}>
              <FileText className="w-5 h-5 text-[#7553FF]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] font-bold text-slate-700 block leading-tight">1. Extract PDF</span>
              <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                step === 2 || (step > 0 && activeAnalysisStep > 1)
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : step > 0 && activeAnalysisStep === 1
                  ? 'bg-[#F0ECFF] text-[#7553FF] border border-[#1C1814]/15 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {step === 2 || (step > 0 && activeAnalysisStep > 1) ? 'COMPLETED' : step > 0 && activeAnalysisStep === 1 ? 'PROCESSING' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Arrow 1 */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-full border-t-2 border-dashed border-slate-200 relative">
              <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 transform rotate-45" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 bg-slate-50/40 p-3 rounded-xl border border-slate-100/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step === 2 || (step > 0 && activeAnalysisStep >= 2) ? 'bg-[#F0ECFF] text-[#7553FF]' : 'bg-slate-50 text-slate-700'
            }`}>
              <ShieldAlert className="w-5 h-5 text-[#7553FF]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] font-bold text-slate-700 block leading-tight">2. AI Analysis</span>
              <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                step === 2 || (step > 0 && activeAnalysisStep > 2)
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : step > 0 && activeAnalysisStep === 2
                  ? 'bg-[#F0ECFF] text-[#7553FF] border border-[#1C1814]/15 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {step === 2 || (step > 0 && activeAnalysisStep > 2) ? 'COMPLETED' : step > 0 && activeAnalysisStep === 2 ? 'PROCESSING' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Arrow 2 */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-full border-t-2 border-dashed border-slate-200 relative">
              <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 transform rotate-45" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3 bg-slate-50/40 p-3 rounded-xl border border-slate-100/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step === 2 || (step > 0 && activeAnalysisStep >= 3) ? 'bg-[#F0ECFF] text-[#7553FF]' : 'bg-slate-50 text-slate-700'
            }`}>
              <RefreshCw className="w-5 h-5 text-[#7553FF] animate-spin-none" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] font-bold text-slate-700 block leading-tight">3. Review</span>
              <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                step === 2 || (step > 0 && activeAnalysisStep > 3)
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : step > 0 && activeAnalysisStep === 3
                  ? 'bg-[#F0ECFF] text-[#7553FF] border border-[#1C1814]/15 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {step === 2 || (step > 0 && activeAnalysisStep > 3) ? 'COMPLETED' : step > 0 && activeAnalysisStep === 3 ? 'PROCESSING' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Arrow 3 */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-full border-t-2 border-dashed border-slate-200 relative">
              <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 transform rotate-45" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-3 bg-slate-50/40 p-3 rounded-xl border border-slate-100/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              step === 2 || (step > 0 && progressPercent === 100) ? 'bg-[#F0ECFF] text-[#7553FF]' : 'bg-slate-50 text-slate-700'
            }`}>
              <CheckCircle className="w-5 h-5 text-[#7553FF]" />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-[11px] font-bold text-slate-700 block leading-tight">4. Complete</span>
              <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                step === 2 || (step > 0 && progressPercent === 100)
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : step > 0 && activeAnalysisStep === 4
                  ? 'bg-[#F0ECFF] text-[#7553FF] border border-[#1C1814]/15 animate-pulse'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {step === 2 || (step > 0 && progressPercent === 100) ? 'COMPLETED' : step > 0 && activeAnalysisStep === 4 ? 'PROCESSING' : 'PENDING'}
              </span>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* MAIN UPLOAD VIEW (ACTS IF STEP === 0) */}
        {step === 0 && (
          <motion.div
            key="idle-upload-workspace"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-6"
          >
            
            {/* Interactive Centered Upload Box Card */}
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[340px]">
              
              {/* Alert custom stylized tag badge */}
              <div className="w-16 h-16 rounded-full bg-[#E0F2FE] hover:bg-sky-200 text-sky-600 flex items-center justify-center transition-colors duration-300">
                <AlertTriangle className="w-7 h-7 stroke-[2]" />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-slate-850">Upload Menu PDF</h2>
                <p className="text-slate-700 font-medium text-xs max-w-md leading-relaxed font-sans">
                  AI will detect allergens based on EU Regulation No 1169/2011.
                </p>
              </div>

              {/* Dynamic Action Area depending on upload status */}
              {fileAttached ? (
                <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl w-full max-w-md flex items-center justify-between gap-4 text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 leading-normal">
                      <p className="text-xs font-bold text-slate-800 truncate">{fileName}</p>
                      <p className="text-[10px] text-slate-700 font-mono font-bold mt-0.5">{fileSize}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFileAttached(false);
                      setFileName('');
                      setFileSize('');
                    }}
                    className="p-1 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={handleSimulateDragAttach}
                    className="flex items-center gap-2 px-5 py-3 border border-[#7553FF] hover:border-[#623EE2] bg-white hover:bg-[#F0ECFF]/40 text-[#7553FF] rounded-xl text-xs font-bold transition-all shadow-3xs cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload PDF</span>
                  </button>
                  <span className="text-[11px] text-slate-700 font-mono font-bold">PDF, up to 20MB</span>
                </div>
              )}

            </div>

            {/* Additional context block with form control */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                Additional Context (Optional)
                <HelpCircle className="w-3.5 h-3.5 text-slate-700" />
              </label>
              
              <div className="relative">
                <textarea
                  value={additionalContext}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      setAdditionalContext(e.target.value);
                    }
                  }}
                  placeholder="Help the AI by providing dish ingredients or specific notes..."
                  className="w-full h-32 bg-white border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF] transition-all resize-none"
                />
                
                <span className="absolute bottom-3 right-4 text-[10px] font-mono font-bold text-slate-700 leading-none">
                  {additionalContext.length}/1000
                </span>
              </div>
            </div>

            {/* Big Action processing button */}
            <div className="pt-2">
              <button
                onClick={handleStartAnalysis}
                disabled={!fileAttached}
                className={`w-full py-4 rounded-xl text-xs font-extrabold shadow-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer h-12 uppercase tracking-wide ${
                  fileAttached 
                    ? 'bg-[#7553FF] hover:bg-[#623EE2] text-white active:scale-[0.99]' 
                    : 'bg-[#F0ECFF]/50 border border-teal-150 text-[#7553FF]/40 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 fill-white/10" />
                <span>Start Analysis</span>
              </button>
            </div>

          </motion.div>
        )}

        {/* COMPREHENSIVE MULTI-PHASE PROCESSING PIPELINE CARD */}
        {step === 1 && (
          <motion.div
            key="active-pipeline-run"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white border border-slate-150 rounded-2xl p-8 shadow-sm space-y-6 text-center">
              
              <div className="space-y-2">
                <span className="px-3 py-1 bg-[#F0ECFF] text-[#7553FF] border border-teal-150 rounded-[2px] text-[10px] font-bold font-mono tracking-wider uppercase">
                  ACTIVE AI PIPELINE
                </span>
                <h2 className="text-lg font-extrabold text-slate-850">Analysing PDF Ingredients...</h2>
                <p className="text-xs text-slate-700 font-sans max-w-sm mx-auto leading-relaxed">
                  Executing OCR parsing loops and comparing semantic terms with clinical EU databases.
                </p>
              </div>

              {/* Progress visual percent bar */}
              <div className="space-y-3 py-2">
                <div className="w-full bg-slate-100 h-3 p-0.5 rounded-full overflow-hidden border border-slate-100">
                  <div 
                    className="h-full bg-[#7553FF] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-700">
                  <span>PROGRESS RATIO: {progressPercent}%</span>
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin text-[#7553FF]" />
                    Running pipeline...
                  </span>
                </div>
              </div>

              {/* Sub-process textual detail tracker */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left text-xs space-y-3 font-medium">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    activeAnalysisStep >= 1 ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                  <span className={`${activeAnalysisStep > 1 ? 'text-slate-700 line-through' : 'text-slate-700 font-bold'}`}>
                    Extraction: Converting original PDF layer into vector lines
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    activeAnalysisStep >= 2 ? (activeAnalysisStep === 2 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500') : 'bg-slate-300'
                  }`} />
                  <span className={`${activeAnalysisStep > 2 ? 'text-slate-700 line-through' : activeAnalysisStep === 2 ? 'text-slate-700 font-bold' : 'text-slate-700'}`}>
                    AI Ingredients Analyzer: Scanning for 14 standard allergen tags
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    activeAnalysisStep >= 3 ? (activeAnalysisStep === 3 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500') : 'bg-slate-300'
                  }`} />
                  <span className={`${activeAnalysisStep > 3 ? 'text-slate-700 line-through' : activeAnalysisStep === 3 ? 'text-slate-700 font-bold' : 'text-slate-700'}`}>
                    Cross referencing: Building warning coordinates
                  </span>
                </div>
              </div>

              <div className="text-xs font-medium text-slate-700 font-mono tracking-wide">
                &ldquo;{statusText}&rdquo;
              </div>

            </div>
          </motion.div>
        )}

        {/* SPLIT SCREEN RESULT (STEP === 2) */}
        {step === 2 && (
          <motion.div
            key="split-screen-annotations"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            
            {/* Analysis Summary Row */}
            <div className="space-y-4 text-left">
              <h3 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">Analysis Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Card 1: Total Menu Items */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">Total Menu Items</span>
                    <span className="text-3xl font-extrabold text-slate-900 block leading-none">128</span>
                    <span className="text-[11px] text-slate-700 font-medium block">items analyzed</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#F0ECFF] text-[#7553FF] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#7553FF]" />
                  </div>
                </div>

                {/* Card 2: Items with Allergens */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">Items with Allergens</span>
                    <span className="text-3xl font-extrabold text-slate-900 block leading-none">74</span>
                    <span className="text-[11px] text-slate-700 font-medium block">57.8% of total</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                </div>

                {/* Card 3: Allergens Detected */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">Allergens Detected</span>
                    <span className="text-3xl font-extrabold text-slate-900 block leading-none">10</span>
                    <span className="text-[11px] text-slate-700 font-medium block">unique allergens</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                </div>

                {/* Card 4: EU Compliance */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">EU Compliance</span>
                    <span className="text-3xl font-extrabold text-emerald-600 block leading-none">92%</span>
                    <span className="text-[11px] text-slate-700 font-medium block">Good compliance</span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>

              </div>
            </div>

            {/* Split layout: Table on Left (8/12), Info sidebar on Right (4/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (Allergen Results Table Card) */}
              <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs flex flex-col justify-between text-left space-y-4">
                
                <div className="space-y-4">
                  {/* Title and control row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#111827]">Allergen Results</h3>
                      <p className="text-xs text-slate-700 font-medium font-sans mt-0.5">Review allergens detected in your menu items.</p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="text-xs font-bold text-[#7553FF] hover:text-[#623EE2] px-3 py-1.5 bg-[#F0ECFF] rounded-xl hover:bg-primary-soft transition-colors cursor-pointer self-start sm:self-auto shadow-3xs border border-[#F0ECFF]/50"
                    >
                      ← Upload Another Menu
                    </button>
                  </div>

                  {/* Filter and search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center py-1">
                    
                    {/* Search Field */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search menu item..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7553FF]/10 focus:border-[#7553FF] transition-all placeholder:text-slate-700"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                          className="p-1 hover:bg-slate-200 rounded-full absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Allergen Type Selector */}
                    <select
                      value={selectedAllergen}
                      onChange={(e) => {
                        setSelectedAllergen(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 bg-slate-50 border border-slate-205 border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 focus:outline-none shadow-3xs cursor-pointer min-w-[130px] h-9"
                    >
                      <option value="All">All Allergens</option>
                      <option value="Gluten">Gluten</option>
                      <option value="Milk">Milk</option>
                      <option value="Egg">Egg</option>
                      <option value="Fish">Fish</option>
                      <option value="Soy">Soy</option>
                      <option value="Mustard">Mustard</option>
                      <option value="Peanuts">Peanuts</option>
                    </select>

                    {/* Status Selector */}
                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 bg-slate-50 border border-slate-205 border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 focus:outline-none shadow-3xs cursor-pointer min-w-[120px] h-9"
                    >
                      <option value="All">All Status</option>
                      <option value="Detected">Detected</option>
                      <option value="No Allergens">No Allergens</option>
                    </select>

                    {/* Export button */}
                    <button
                      onClick={() => triggerToast("Allergen audit matrix exported successfully!")}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl text-xs font-extrabold text-slate-700 shadow-3xs cursor-pointer transition-colors h-9 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-700" />
                      <span>Export Report</span>
                    </button>

                  </div>

                  {/* Responsive Table of items */}
                  <div className="overflow-x-auto border border-slate-100 rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                          <th className="py-3.5 px-4 font-black">Menu Item</th>
                          <th className="py-3.5 px-4 font-black">Allergens Detected</th>
                          <th className="py-3.5 px-4 font-black">Risk Level</th>
                          <th className="py-3.5 px-4 font-black">Status</th>
                          <th className="py-3.5 px-4 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100/70">
                        {paginatedItems.map((item, index) => (
                          <tr 
                            key={index} 
                            className="bg-white hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                            {/* Menu Item Name */}
                            <td className="py-3 px-4">
                              <span className="text-xs font-extrabold text-slate-800 font-sans block">
                                {item.name}
                              </span>
                            </td>

                            {/* Allergens Detected Pills */}
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1.5 items-center">
                                {item.allergens.length > 0 ? (
                                  item.allergens.map((allergen, i) => {
                                    let labelColor = "bg-slate-50 text-slate-700 border-slate-150";
                                    if (allergen === 'Fish') labelColor = "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]";
                                    else if (allergen === 'Egg') labelColor = "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]";
                                    else if (allergen === 'Milk') labelColor = "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]";
                                    else if (allergen === 'Gluten') labelColor = "bg-[#FDF2F8] text-[#DB2777] border-[#FBCFE8]";
                                    else if (allergen === 'Soy') labelColor = "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]";
                                    else if (allergen === 'Mustard') labelColor = "bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]";
                                    else if (allergen === 'Peanuts') labelColor = "bg-[#FEF2F2] text-[#DC2626] border-[#FCA5A5]";

                                    return (
                                      <span 
                                        key={i} 
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-[2px] border ${labelColor} transition-transform group-hover:scale-102`}
                                      >
                                        {allergen}
                                      </span>
                                    );
                                  })
                                ) : (
                                  <span className="text-xs font-mono font-bold text-slate-700">-</span>
                                )}
                              </div>
                            </td>

                            {/* Risk level colored bullet */}
                            <td className="py-3 px-4">
                              {item.risk === 'High' ? (
                                <span className="text-xs font-bold text-[#EF4444] flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                                  High
                                </span>
                              ) : item.risk === 'Medium' ? (
                                <span className="text-xs font-bold text-[#F59E0B] flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                  Medium
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                                  None
                                </span>
                              )}
                            </td>

                            {/* Status badge pill */}
                            <td className="py-3 px-4">
                              {item.status === 'Detected' ? (
                                <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-[2px] bg-[#F0ECFF] text-[#7553FF] border border-[#CCFBF1]">
                                  Detected
                                </span>
                              ) : (
                                <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-[2px] bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                                  No Allergens
                                </span>
                              )}
                            </td>

                            {/* Arrow right */}
                            <td className="py-3 px-4 text-right">
                              <ChevronRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-600 transition-all transform group-hover:translate-x-0.5 inline-block" />
                            </td>
                          </tr>
                        ))}

                        {filteredItems.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-xs font-semibold text-slate-700 font-sans">
                              No dishes found matching your current filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Table Footer with Pager details */}
                {filteredItems.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-150 mt-4">
                    <span className="text-xs font-bold text-slate-700 font-mono">
                      Showing {(activePage - 1) * itemsPerPage + 1} to {Math.min(activePage * itemsPerPage, filteredItems.length)} of {filteredItems.length} items
                    </span>

                    {/* Pagination list indicators matching mockup 1, 2, 3... 16 */}
                    <div className="flex items-center gap-1">
                      
                      {/* Left bracket action */}
                      <button
                        disabled={activePage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Primary pages (pages 1 to 3, as long as it exists) */}
                      {Array.from({ length: Math.min(3, totalPages) }, (_, idx) => idx + 1).map((pg) => (
                        <button
                          key={pg}
                          onClick={() => setCurrentPage(pg)}
                          className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                            activePage === pg 
                              ? 'bg-[#7553FF] text-white shadow-3xs' 
                              : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {pg}
                        </button>
                      ))}

                      {/* Elipsis and final page */}
                      {totalPages > 3 && (
                        <>
                          <span className="text-[11px] font-bold text-slate-700 px-1 font-mono">...</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-8 h-8 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                              activePage === totalPages 
                                ? 'bg-[#7553FF] text-white shadow-3xs' 
                                : 'border border-slate-200 text-slate-650 hover:bg-slate-50'
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}

                      {/* Right bracket action */}
                      <button
                        disabled={activePage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                    </div>

                  </div>
                )}

              </div>

              {/* Right Column (Allergens Overview & Compliance Insights) */}
              <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
                
                {/* Allergens Overview Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs text-left flex flex-col justify-between h-auto">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-[#111827]">Allergens Overview</h3>
                      <p className="text-xs text-slate-700 font-medium font-sans mt-0.5">Breakdown of allergens detected.</p>
                    </div>

                    {/* Category item bars with custom circular colored badges */}
                    <div className="space-y-3 pt-2">
                      
                      {/* Gluten */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                            <Wheat className="w-4 h-4 text-pink-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Gluten</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 font-mono">28 items (21.9%)</span>
                      </div>

                      {/* Milk */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Milk className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Milk</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 font-mono">24 items (18.8%)</span>
                      </div>

                      {/* Egg */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Egg className="w-4 h-4 text-amber-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Egg</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 font-mono">18 items (14.1%)</span>
                      </div>

                      {/* Fish */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                            <Fish className="w-4 h-4 text-sky-500" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Fish</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 font-mono">15 items (11.7%)</span>
                      </div>

                      {/* Soy */}
                      <div className="flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Leaf className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Soy</span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 font-mono">9 items (7.0%)</span>
                      </div>

                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => setEuAllergenOpen(true)}
                      className="w-full py-2.5 text-center bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-extrabold text-xs rounded-xl transition-all shadow-3xs cursor-pointer"
                    >
                      View All Allergens
                    </button>
                  </div>
                </div>

                {/* Compliance Insights Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs text-left space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-[#111827]">Compliance Insights</h3>
                  </div>

                  <div className="space-y-3">
                    {/* Bullet 1 */}
                    <div className="flex items-start gap-2.5 font-sans">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-150">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold leading-normal">
                        Allergy information is provided for 74 items
                      </span>
                    </div>

                    {/* Bullet 2 */}
                    <div className="flex items-start gap-2.5 font-sans">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold leading-normal">
                        14 mandatory allergens detected
                      </span>
                    </div>

                    {/* Bullet 3 */}
                    <div className="flex items-start gap-2.5 font-sans">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span className="text-xs text-slate-600 font-semibold leading-normal">
                        Menu meets EU Regulation No 1169/2011
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => triggerToast("Full corporate allergen analysis report exported.")}
                      className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-700 font-medium" />
                      <span>View Full Report</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* FOOTER AREA STANDARD METRICS CARD */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#F0ECFF] border border-teal-150 text-[#7553FF] flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-mono">EU Standard</h4>
            <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xl font-sans">
              This tool uses the EU 1169/2011 regulation standard to identify 14 mandatory allergens.
            </p>
          </div>
        </div>

        {/* View allergen button mapping */}
        <div>
          <button
            onClick={() => setEuAllergenOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl text-xs font-bold text-slate-705 shadow-3xs cursor-pointer transition-colors"
          >
            <span>View Allergen List</span>
            <ArrowRight className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </div>

      {/* ALLERGEN CATALOGUE SIDE SLIDE OR DIALOG OVERLAY */}
      <AnimatePresence>
        {euAllergenOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setEuAllergenOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[460px] bg-white shadow-2xl z-50 p-6 flex flex-col justify-between text-left"
            >
              <div className="space-y-5 flex-1 overflow-y-auto pr-1">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#7553FF] animate-pulse" />
                    <h3 className="text-sm font-extrabold text-slate-850 uppercase tracking-widest font-mono">Mandatory EU Allergens</h3>
                  </div>
                  <button
                    onClick={() => setEuAllergenOpen(false)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-slate-650 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  According to Article 44 of EU Regulation v1169/2011, these 14 key categories must be transparently declared on customer menu sheets:
                </p>

                <div className="space-y-3.5">
                  {EU_14_ALLERGENS.map((al, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 bg-slate-50/55 hover:bg-slate-50 border border-slate-150 rounded-xl space-y-1 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-800">{idx + 1}. {al.name}</span>
                        <span className="bg-[#F0ECFF] text-[#7553FF] px-2 py-0.5 rounded-[2px] font-mono font-bold text-[9px]">
                          {al.code}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-sans font-medium">{al.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 text-right">
                <button
                  onClick={() => setEuAllergenOpen(false)}
                  className="w-full py-2.5 text-center bg-[#7553FF] hover:bg-[#623EE2] active:bg-[#4E25C4] text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer transition-colors"
                >
                  Close Reference
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
