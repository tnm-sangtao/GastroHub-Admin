/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Languages, 
  Search, 
  FileUp, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Info, 
  Check, 
  Eye, 
  History, 
  Plus, 
  ChevronRight, 
  MoreVertical, 
  Download, 
  ArrowRight, 
  FileText, 
  X,
  RefreshCw,
  Trash2,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DictionaryTerm } from '../types';
import { initialDictionary } from '../mockData';

interface TranslationJob {
  id: string;
  name: string;
  source: string;
  target: string;
  pages: number;
  created: string;
  status: 'Completed' | 'Review' | 'Pending' | 'Processing';
  // Detailed menu items matching this file
  menuData?: {
    originalLang: string;
    translatedLang: string;
    categories: {
      originalCategory: string;
      translatedCategory: string;
      items: {
        originalName: string;
        translatedName: string;
        price: string;
      }[];
    }[];
  };
}

export default function MenuTranslator() {
  // Global dictionary state
  const [dictionary, setDictionary] = useState<DictionaryTerm[]>(initialDictionary);
  const [targetLang, setTargetLang] = useState('English');
  const [sourceLang, setSourceLang] = useState('German');
  
  // Slide Over / Modal Drawer for Dictionary
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  
  // Custom term state
  const [newKeyword, setNewKeyword] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newCultureNote, setNewCultureNote] = useState('');

  // Local Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Simulation parameters
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; pages: number } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  
  // Active selected job for preview layout
  const [activeJobId, setActiveJobId] = useState<string>('job-1');
  const [translationStage, setTranslationStage] = useState<'idle' | 'pending' | 'translating' | 'completed'>('idle');

  // Hardcoded mockup translation jobs with real data
  const [jobs, setJobs] = useState<TranslationJob[]>([
    { 
      id: 'job-1', 
      name: 'Dinner Menu.pdf', 
      source: 'German', 
      target: 'English', 
      pages: 12, 
      created: 'May 31, 2025 10:30 AM', 
      status: 'Completed',
      menuData: {
        originalLang: 'German',
        translatedLang: 'English',
        categories: [
          {
            originalCategory: 'Vorspeisen',
            translatedCategory: 'Appetizers',
            items: [
              { originalName: 'Gemischter Salat', translatedName: 'Mixed Salad', price: '€6,50' },
              { originalName: 'Tomatensuppe', translatedName: 'Tomato Soup', price: '€5,80' }
            ]
          },
          {
            originalCategory: 'Hauptgerichte',
            translatedCategory: 'Main Courses',
            items: [
              { originalName: 'Wiener Schnitzel', translatedName: 'Wiener Schnitzel', price: '€18,90' },
              { originalName: 'Lachsfilet', translatedName: 'Salmon Fillet', price: '€19,50' }
            ]
          }
        ]
      }
    },
    { 
      id: 'job-2', 
      name: 'Getränke Karte.pdf', 
      source: 'German', 
      target: 'English', 
      pages: 6, 
      created: 'May 30, 2025 4:15 PM', 
      status: 'Completed',
      menuData: {
        originalLang: 'German',
        translatedLang: 'English',
        categories: [
          {
            originalCategory: 'Alkoholfreie Getränke',
            translatedCategory: 'Non-Alcoholic Drinks',
            items: [
              { originalName: 'Apfelschorle', translatedName: 'Apple Spritzer', price: '€4,20' },
              { originalName: 'Hausgemachte Zitronenlimonade', translatedName: 'Homemade Lemon Lemonade', price: '€4,90' }
            ]
          },
          {
            originalCategory: 'Biere',
            translatedCategory: 'Beers',
            items: [
              { originalName: 'Münchner Hell', translatedName: 'Munich Lager', price: '€4,80' },
              { originalName: 'Weißbier', translatedName: 'Wheat Beer', price: '€5,20' }
            ]
          }
        ]
      }
    },
    { 
      id: 'job-3', 
      name: 'Speisekarte.pdf', 
      source: 'German', 
      target: 'English', 
      pages: 10, 
      created: 'May 29, 2025 2:22 PM', 
      status: 'Review',
      menuData: {
        originalLang: 'German',
        translatedLang: 'English',
        categories: [
          {
            originalCategory: 'Tagessuppen',
            translatedCategory: 'Soup of the Day',
            items: [
              { originalName: 'Grießnockerlsuppe', translatedName: 'Semolina Dumpling Soup', price: '€5,50' },
              { originalName: 'Kartoffelsuppe mit Croutons', translatedName: 'Potato Soup with Croutons', price: '€5,90' }
            ]
          },
          {
            originalCategory: 'Schmankerl',
            translatedCategory: 'Bavarian Specialties',
            items: [
              { originalName: 'Schweinsbraten mit Knödel', translatedName: 'Roast Pork with Potato Dumplings', price: '€16,50' },
              { originalName: 'Kässpätzle mit Röstzwiebeln', translatedName: 'Cheese Spätzle with Roasted Onions', price: '€14,80' }
            ]
          }
        ]
      }
    },
    { 
      id: 'job-4', 
      name: 'Wein Liste.pdf', 
      source: 'German', 
      target: 'English', 
      pages: 4, 
      created: 'May 28, 2025 11:05 AM', 
      status: 'Pending',
      menuData: {
        originalLang: 'German',
        translatedLang: 'English',
        categories: [
          {
            originalCategory: 'Weißweine',
            translatedCategory: 'White Wines',
            items: [
              { originalName: 'Riesling Trocken', translatedName: 'Dry Riesling', price: '€7,50' },
              { originalName: 'Grüner Veltliner', translatedName: 'Grüner Veltliner', price: '€6,80' }
            ]
          },
          {
            originalCategory: 'Rotweine',
            translatedCategory: 'Red Wines',
            items: [
              { originalName: 'Spätburgunder', translatedName: 'Pinot Noir', price: '€8,20' }
            ]
          }
        ]
      }
    },
    { 
      id: 'job-5', 
      name: 'Lunch Menu.pdf', 
      source: 'German', 
      target: 'English', 
      pages: 8, 
      created: 'May 27, 2025 9:45 AM', 
      status: 'Pending',
      menuData: {
        originalLang: 'German',
        translatedLang: 'English',
        categories: [
          {
            originalCategory: 'Mittagsmotive',
            translatedCategory: 'Lunch Specials',
            items: [
              { originalName: 'Putenschnitzel', translatedName: 'Turkey Escalope', price: '€12,90' },
              { originalName: 'Gemüse-Curry', translatedName: 'Vegetable Curry', price: '€11,50' }
            ]
          }
        ]
      }
    }
  ]);

  // Handle auto toast dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message: msg, type });
  };

  const domainCategories = ['All', 'Vietnamese Cuisine', 'Northern Cuisine', 'Specialty Drinks', 'Condiments', 'Appetizers'];

  const filteredDictionary = dictionary.filter((item) => {
    const matchesSearch =
      item.keyword.toLowerCase().includes(search.toLowerCase()) ||
      item.translation.toLowerCase().includes(search.toLowerCase()) ||
      item.culturalNote.toLowerCase().includes(search.toLowerCase());
    
    if (domainFilter === 'All') return matchesSearch;
    return matchesSearch && item.domain === domainFilter;
  });

  const handleAddTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword || !newTranslation) return;
    
    const term: DictionaryTerm = {
      keyword: newKeyword,
      domain: 'Custom Choice',
      translation: newTranslation,
      culturalNote: newCultureNote || 'Context-aware culinary translation mapped by merchant.'
    };

    setDictionary([term, ...dictionary]);
    setNewKeyword('');
    setNewTranslation('');
    setNewCultureNote('');
    triggerToast(`Added "${newKeyword}" to your Cultural Dictionary!`, 'success');
  };

  // Select simulated preset files
  const handleSimulateFileSelect = (name: string, pages: number) => {
    setSelectedFile({
      name,
      size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      pages
    });
    setTranslationStage('pending');
    triggerToast(`File "${name}" selected successfully. Ready to translate!`, 'success');
  };

  // Triggering the progress sequence
  const startTranslationSequence = () => {
    const fileName = selectedFile?.name || 'Quick_Menu_Draft.pdf';
    const totalPages = selectedFile?.pages || 5;

    setIsTranslating(true);
    setTranslationProgress(0);
    setTranslationStage('translating');

    // Dynamic countdown timer representing processing
    const interval = setInterval(() => {
      setTranslationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment progress by randomized amount for realistic look
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 450);

    // Complete the transaction simulated sequence
    setTimeout(() => {
      clearInterval(interval);
      setTranslationProgress(100);
      setIsTranslating(false);
      setTranslationStage('completed');

      const generatedId = `job-${Date.now()}`;
      const newJob: TranslationJob = {
        id: generatedId,
        name: fileName,
        source: sourceLang,
        target: targetLang,
        pages: totalPages,
        created: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed',
        menuData: {
          originalLang: sourceLang,
          translatedLang: targetLang,
          categories: [
            {
              originalCategory: 'Spezialitäten des Hauses',
              translatedCategory: 'House Specialties',
              items: [
                { originalName: 'Original Wiener Kalbsschnitzel', translatedName: 'Classic Viennese Veal Schnitzel', price: '€24,50' },
                { originalName: 'Gegrilltes Zanderfilet', translatedName: 'Grilled Pike-Perch Fillet', price: '€22,90' },
                { originalName: 'Frischer Spargel mit Sauce Hollandaise', translatedName: 'Fresh Asparagus with Hollandaise Sauce', price: '€16,50' }
              ]
            },
            {
              originalCategory: 'Nachspeisen',
              translatedCategory: 'Desserts',
              items: [
                { originalName: 'Apfelstrudel mit Vanilleeis', translatedName: 'Apple Strudel with Vanilla Ice Cream', price: '€6,90' }
              ]
            }
          ]
        }
      };

      setJobs([newJob, ...jobs]);
      setActiveJobId(generatedId);
      setSelectedFile(null);
      triggerToast('AI Deep Localized Translation successful!', 'success');
    }, 4500);
  };

  const handleDownloadSimulation = (fileName: string) => {
    triggerToast(`Downloading translated PDF: ${fileName}`, 'success');
  };

  // Get active menu data to show layout preview below
  const activeJob = jobs.find(j => j.id === activeJobId) || jobs[0];

  return (
    <div className="space-y-8 max-w-[1280px] mx-auto pb-20 px-4 md:px-0">
      
      {/* Toast Alert Popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-[999] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 font-sans text-[14px] leading-[20px] font-semibold text-white ${
              toast.type === 'success' ? 'bg-[#7553FF]' : toast.type === 'error' ? 'bg-rose-600' : 'bg-slate-800'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4.5 h-4.5 shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header exactly matches Menu Translator branding and styling */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight font-display leading-tight">
            Menu Translator
          </h1>
          <p className="text-[14px] text-slate-700 font-sans leading-[20px]">
            Translate menu items and adjust layouts with real-time AI capabilities.
          </p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsDictionaryOpen(true);
              triggerToast('Opening Custom Cultural Glossary Database', 'info');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50/80 active:bg-slate-100 text-[#1C1814] font-semibold text-[14px] leading-[20px] rounded-xl transition-all shadow-3xs cursor-pointer"
          >
            <BookOpen className="w-4.5 h-4.5 text-[#7553FF]" />
            <span>Dictionary</span>
          </button>
          
          <button 
            onClick={() => {
              setSelectedFile(null);
              setIsTranslating(false);
              setTranslationProgress(0);
              setTranslationStage('idle');
              triggerToast('Ready to upload a brand new translated draft.', 'info');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#7553FF] hover:bg-[#623EE2] text-white font-semibold text-[14px] leading-[20px] rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>New Translation</span>
          </button>
        </div>
      </div>

      {/* Primary Row: Left side is Upload, Right side is Preview progress / results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Upload Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-3xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight leading-[20px]">
              Upload Menu PDF
            </h2>
            <p className="text-[14px] text-slate-700 font-sans leading-[20px]">
              Upload your menu file to start translation.
            </p>
          </div>

          {/* Dotted file dropzone area */}
          <div 
            className={`border border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center min-h-[220px] relative ${
              selectedFile 
                ? 'border-[#7553FF]/40 bg-[#F0ECFF]/15' 
                : 'border-[#7553FF]/20 bg--white hover:bg-slate-50/20'
            }`}
          >
            {/* Folder / File Icon holder with a soft lilac background inside */}
            <div className="w-12 h-12 bg-[#F0ECFF] text-[#7553FF] rounded-2xl flex items-center justify-center mb-4 transition-all shadow-3xs">
              <FileUp className="w-5 h-5 stroke-[2.5]" />
            </div>

            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-[14px] font-bold text-slate-800 leading-[20px]">
                  Selected: {selectedFile.name}
                </p>
                <p className="text-xs text-slate-700 font-mono">
                  Size: {selectedFile.size} • Pages: {selectedFile.pages} pages
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    setTranslationStage('idle');
                  }}
                  className="text-xs text-rose-500 font-semibold hover:underline mt-2 cursor-pointer flex items-center gap-1 mx-auto"
                >
                  <Trash2 className="w-3 h-3" /> Clear file selection
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 font-sans">
                <p className="text-[15px] font-bold text-slate-800 leading-[20px]">
                  Drag & drop your PDF here
                </p>
                <div className="flex items-center justify-center gap-1 text-[14px]">
                  <span className="text-slate-700">or</span>
                  <button 
                    onClick={() => handleSimulateFileSelect('Dinner_Menu_Bavarian.pdf', 6)} 
                    className="font-bold text-[#7553FF] hover:underline cursor-pointer"
                  >
                    click to browse files
                  </button>
                </div>
                <p className="text-xs text-slate-700 font-poppins !mt-4">
                  Supports PDF up to 50MB
                </p>
              </div>
            )}
          </div>

          {/* Source and Target selection */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* SOURCE LANGUAGE SELECT CARD */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest block font-sans">
                Source Language
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <span className="text-[16px]">
                    {sourceLang === 'German' ? '🇩🇪' : '🇻🇳'}
                  </span>
                </span>
                <select 
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-[14px] text-slate-750 font-semibold appearance-none focus:outline-none focus:border-[#7553FF] cursor-pointer shadow-3xs"
                >
                  <option value="German">German</option>
                  <option value="Vietnamese">Vietnamese</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* TARGET LANGUAGE SELECT CARD */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-widest block font-sans">
                Target Language
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <span className="text-[16px]">
                    {targetLang === 'English' ? '🇺🇸' : '🇯🇵'}
                  </span>
                </span>
                <select 
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-2.5 text-[14px] text-slate-755 font-semibold appearance-none focus:outline-none focus:border-[#7553FF] cursor-pointer shadow-3xs"
                >
                  <option value="English">English</option>
                  <option value="Japanese">Japanese</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 rotate-90 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Primary CTA Translation execution */}
          <button
            onClick={startTranslationSequence}
            disabled={isTranslating}
            className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] disabled:bg-slate-100 disabled:text-slate-700 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            {isTranslating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Translating... {translationProgress}%</span>
              </>
            ) : (
              <>
                <span>Start Translation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Right Side: Preview Card, matching screenshot details */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-3xs flex flex-col justify-between h-full min-h-[460px]">
          
          {/* Card Upper Row */}
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <div className="space-y-0.5 text-left">
              <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight leading-[20px]">
                Preview
              </h2>
              <p className="text-[14px] text-slate-700 font-sans leading-[20px]">
                Preview your translated menu before finalizing.
              </p>
            </div>

            {/* Download Menu Button at Card Header Top-Right with smart tooltip guidance */}
            {translationStage === 'idle' ? (
              <button
                disabled
                className="flex items-center gap-1 px-3 py-1.5 border border-[#EAE4DC] bg-[#FAF9F7] text-[13px] font-semibold text-[#7C7267] rounded-lg shadow-none cursor-not-allowed transition-all shrink-0 opacity-50 font-poppins"
                title="Upload menu first to translate"
              >
                <Download className="w-4 h-4" />
                <span>Download Menu</span>
              </button>
            ) : translationStage === 'pending' || translationStage === 'translating' ? (
              <div className="relative group shrink-0 font-poppins">
                <button
                  disabled
                  className="flex items-center gap-1 px-3 py-1.5 border border-[#EAE4DC] bg-[#FAF9F7] text-[13px] font-semibold text-[#7C7267] rounded-lg shadow-none cursor-not-allowed transition-all"
                >
                  <Download className="w-4 h-4 text-[#7C7267]" />
                  <span>Download Menu</span>
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-[#1C1814] text-white text-[11.5px] px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap z-30 font-medium leading-[14px]">
                  {translationStage === 'translating' ? 'Translation in progress...' : 'Select languages and click Start Translation.'}
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleDownloadSimulation(activeJob.name)}
                className="flex items-center gap-1 px-3 py-1.5 border border-[#7553FF]/20 hover:bg-[#7553FF]/5 text-[13px] font-bold text-[#7553FF] rounded-lg shadow-3xs cursor-pointer transition-all shrink-0 bg-white font-poppins"
              >
                <Download className="w-4 h-4" />
                <span>Download Menu</span>
              </button>
            )}
          </div>

          {/* Preview Box Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            {translationStage === 'idle' ? (
              /* State 1: Ready for Menu Translation (No File Selected) */
              <div className="flex flex-col items-center justify-center space-y-4 max-w-sm text-center">
                <div className="w-16 h-16 bg-[#FAF9F7] border border-[#EAE4DC] text-[#7C7267] rounded-lg flex items-center justify-center shadow-3xs transition-all ring-4 ring-[#7553FF]/5">
                  <Globe className="w-7 h-7 stroke-[1.2]" />
                </div>
                <div className="space-y-1.5 px-2">
                  <h3 className="text-base font-bold text-[#1C1814] leading-snug font-poppins">
                    Ready for Menu Translation
                  </h3>
                  <p className="text-[14px] text-[#5C534C] font-sans leading-relaxed">
                    Upload your restaurant's PDF menu on the left panel to begin your localized translation.
                  </p>
                </div>
              </div>
            ) : translationStage === 'pending' ? (
              /* State 2: Menu Ready to Translate (File Uploaded, Pending Selection) */
              <div className="flex flex-col items-center justify-center space-y-4 max-w-md text-center font-poppins">
                <div className="w-16 h-16 bg-[#F0ECFF] border border-[#7553FF]/10 text-[#7553FF] rounded-lg flex items-center justify-center shadow-3xs transition-all ring-4 ring-[#7553FF]/10 animate-pulse">
                  <Sparkles className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5 px-4">
                  <h3 className="text-base font-bold text-[#7553FF] leading-snug">
                    Menu Ready to Translate
                  </h3>
                  <p className="text-[14px] text-[#5C534C] leading-relaxed font-semibold font-sans">
                    Menu file <strong className="text-[#1C1814] font-bold">"{selectedFile?.name || 'Dinner_Menu.pdf'}"</strong> is uploaded. Select source and target language and click <strong className="text-[#7553FF] font-bold">Start Translation</strong> to proceed.
                  </p>
                </div>
              </div>
            ) : translationStage === 'translating' ? (
              /* State 3: Translating Progress Ring */
              <div className="flex flex-col items-center justify-center space-y-4">
                
                {/* SVG circular progress ring styled precisely like screenshot */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="48"
                      stroke="#7553FF"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={2 * Math.PI * 48 * (1 - translationProgress / 100)}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="48"
                      stroke="#7553FF"
                      strokeWidth="6"
                      fill="transparent"
                      className="opacity-10"
                    />
                  </svg>
                  
                  {/* Central Text Progress Indicator */}
                  <div className="absolute font-bold text-2xl text-[#1C1814] tracking-tight font-poppins">
                    {translationProgress}%
                  </div>
                </div>
 
                <div className="space-y-1 text-center font-poppins">
                  <h3 className="text-[16px] font-bold text-[#1C1814]">Translating Menu</h3>
                  <p className="text-[14px] text-[#5C534C] font-sans">AI is translating your menu items with local context...</p>
                </div>
              </div>
            ) : (
              /* State 4: Translation Completed (Visual stats summary and success confirmation) */
              <div className="w-full max-w-md px-2 space-y-4">
                {/* Success Banner Header */}
                <div className="flex items-center gap-3 bg-[rgba(21,128,61,0.12)] border border-[rgba(21,128,61,0.2)] p-3 rounded-lg">
                  <div className="w-8 h-8 rounded bg-[#15803D] text-white flex items-center justify-center shadow-sm shrink-0 font-bold">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="text-left font-poppins">
                    <h4 className="text-[14px] font-bold text-[#15803D] leading-snug">Translation completed successfully!</h4>
                    <p className="text-[14px] text-[#15803D]/85 font-sans">Your bilingual localized draft is ready for review and export.</p>
                  </div>
                </div>
 
                {/* Grid of details */}
                <div className="bg-[#FAF9F7] border border-[#EAE4DC] rounded-lg p-4 space-y-3.5 text-left shadow-card">
                  <div className="flex items-center justify-between border-b border-[#EAE4DC] pb-2 text-[14px] font-poppins">
                    <span className="text-[#7C7267] font-medium">Activity Log ID:</span>
                    <span className="font-bold font-mono text-[#5C534C]">{activeJob.id}</span>
                  </div>
 
                  <div className="space-y-2.5 font-sans">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#5C534C]">Menu Name:</span>
                      <span className="font-bold text-[#1C1814] truncate max-w-[200px]" title={activeJob.name}>
                        {activeJob.name}
                      </span>
                    </div>
 
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#5C534C]">Localization Route:</span>
                      <span className="font-bold font-poppins text-[#7553FF] bg-[rgba(117,83,255,0.12)] px-2.5 py-0.5 rounded text-[14px]">
                        {activeJob.source} → {activeJob.target}
                      </span>
                    </div>
 
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-[#5C534C] font-normal">Document Pages:</span>
                      <span className="font-bold font-mono text-[#1C1814]">{activeJob.pages} pages</span>
                    </div>
 
                    {activeJob.menuData && (
                      <>
                        <div className="flex justify-between items-center text-[14px]">
                          <span className="text-[#5C534C]">Menu Categories:</span>
                          <span className="font-bold text-[#1C1814]">
                            {activeJob.menuData.categories.length} categories
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[14px]">
                          <span className="text-[#5C534C]">Translated Items:</span>
                          <span className="font-bold text-[#1C1814]">
                            {activeJob.menuData.categories.reduce((acc, cat) => acc + cat.items.length, 0)} items
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
 
                <p className="text-[14px] text-[#7C7267] font-medium text-center font-sans">
                  Use the live workspace editor below to adjust translations or download your high-fidelity menu PDF.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Live Translated Content Preview Block (Side-by-Side Original / Translated Layout) */}
      {translationStage === 'completed' && (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-3xs space-y-6">
          
          {/* Header line */}
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div className="space-y-0.5 text-left">
              <h3 className="text-base font-bold text-slate-800">Live Workspace Layout Preview</h3>
              <p className="text-xs text-slate-700 font-sans">Active interactive draft mapped dynamically for document: <strong className="text-slate-650 font-bold">{activeJob.name}</strong></p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-[2px] font-mono">
              {activeJob.source} → {activeJob.target}
            </span>
          </div>

          {/* Categories mapped side-by-side matching original/translated layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#1C1814]/10">
            
            {/* Left Side: Original Panel */}
            <div className="space-y-6 text-left p-[12px] border-none">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-widest pl-1">
                Original ({activeJob.source})
              </div>
              
              {activeJob.menuData?.categories.map((cat, cIdx) => (
                <div key={cIdx} className="space-y-3.5">
                  <h4 className="text-[15px] font-bold text-[#1C1814] tracking-tight bg-slate-50/50 py-1 px-2.5 rounded-lg border border-slate-100 font-sans inline-block">
                    {cat.originalCategory}
                  </h4>
                  
                  <div className="space-y-2.5 pl-2.5">
                    {cat.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-700 font-medium">{item.originalName}</span>
                        <span className="font-poppins text-slate-650 font-bold whitespace-nowrap">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Translated Panel */}
            <div className="space-y-6 text-left md:pl-8 p-[12px] border-none">
              <div className="text-xs font-bold text-[#7553FF] uppercase tracking-widest pl-1">
                Translated ({activeJob.target})
              </div>

              {activeJob.menuData?.categories.map((cat, cIdx) => (
                <div key={cIdx} className="space-y-3.5">
                  <h4 className="text-[15px] font-bold text-[#7553FF] tracking-tight bg-[#7553FF]/5 py-1 px-2.5 rounded-lg border border-[#7553FF]/10 font-sans inline-block">
                    {cat.translatedCategory}
                  </h4>
                  
                  <div className="space-y-2.5 pl-2.5">
                    {cat.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-850 font-bold">{item.translatedName}</span>
                        <span className="font-poppins text-slate-650 font-bold whitespace-nowrap">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Footer Warning Note exactly as illustrated in screenshot */}
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs text-slate-700 italic">
              Preview is AI-generated and may not be 100% final.
            </p>
            <div className="text-xs text-slate-700 font-sans font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-505 bg-emerald-550 inline-block animate-pulse" />
              <span>Interactive Layout Sandbox active</span>
            </div>
          </div>

        </div>
      )}

      {/* Row 4: Recent Translations Ledger */}
      <div id="recent-ledger" className="bg-white border border-gray-100 rounded-3xl p-6 shadow-3xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="space-y-1">
            <h2 className="text-[18px] font-bold text-[#1C1814] tracking-tight leading-[20px]">
              Recent Translations
            </h2>
            <p className="text-[14px] text-slate-700 font-sans leading-[20px]">
              View and manage your recent translation jobs.
            </p>
          </div>
          <button 
            onClick={() => triggerToast('Primary ledger displays total records', 'info')}
            className="text-[13px] font-bold text-[#7553FF] hover:underline flex items-center gap-1 self-start sm:self-center cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs List table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-50">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-100">
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase">File Name</th>
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase">Source → Target</th>
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase text-center">Pages</th>
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase">Created</th>
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase text-center">Status</th>
                <th className="py-4 px-5 font-sans font-bold text-slate-700 text-xs tracking-wider uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[14px] text-slate-700 font-medium">
              {jobs.map((job) => (
                <tr 
                  key={job.id} 
                  className={`hover:bg-slate-50/40 transition-colors cursor-pointer ${activeJobId === job.id ? 'bg-[#7553FF]/5' : ''}`}
                  onClick={() => {
                    setActiveJobId(job.id);
                    setTranslationStage('completed');
                    triggerToast(`Swapped layout workspace preview to: ${job.name}`, 'info');
                  }}
                >
                  {/* File Name info */}
                  <td className="py-4 px-5 font-sans font-bold text-slate-800">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-rose-500 shrink-0" />
                      <span className="truncate max-w-[180px]" title={job.name}>{job.name}</span>
                    </div>
                  </td>

                  {/* Route details */}
                  <td className="py-4 px-5 text-slate-700">
                    <div className="flex items-center gap-2 font-poppins text-[13px] font-semibold text-slate-550">
                      <span>{job.source}</span>
                      <span className="text-[#7553FF]">→</span>
                      <span>{job.target}</span>
                    </div>
                  </td>

                  {/* Pages value */}
                  <td className="py-4 px-5 text-center font-mono font-bold text-slate-650">
                    {job.pages}
                  </td>

                  {/* Created timestamp */}
                  <td className="py-4 px-5 text-slate-700 text-[13px]">
                    {job.created}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 text-center">
                    {job.status === 'Completed' && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded-[2px] text-xs font-normal">
                        Completed
                      </span>
                    )}
                    {job.status === 'Review' && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-[2px] text-xs font-normal">
                        Review
                      </span>
                    )}
                    {job.status === 'Pending' && (
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-[2px] text-xs font-normal">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Operational actions */}
                  <td className="py-4 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setActiveJobId(job.id);
                          setTranslationStage('completed');
                          triggerToast(`Now previewing menu layout for ${job.name}`, 'info');
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-[#7553FF] transition-all cursor-pointer"
                        title="View Detailed Translation Workspace"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDownloadSimulation(job.name)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-[#7553FF] transition-all cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => triggerToast('Secondary tools menu triggered', 'info')}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 hover:text-slate-600 transition-all cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3 font-sans text-[14px]">
          <span className="text-slate-700 font-medium">Showing 1 to 5 of 5 entries</span>
          
          <div className="flex items-center gap-1.5 self-center">
            <button className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-semibold select-none cursor-pointer">
              «
            </button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-semibold select-none cursor-pointer">
              ‹
            </button>
            <button className="px-3 py-1 bg-[#7553FF] border border-[#7553FF] text-white rounded-md transition-all font-bold select-none cursor-pointer">
              1
            </button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-semibold select-none cursor-pointer">
              ›
            </button>
            <button className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-semibold select-none cursor-pointer">
              »
            </button>
          </div>
        </div>

      </div>

      {/* FULL CULTURAL DICTIONARY SLIDING OVERLAY */}
      <AnimatePresence>
        {isDictionaryOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end font-sans">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDictionaryOpen(false)}
              className="absolute inset-0 bg-[#1C1814] backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-2xl bg-[#FFFFFF] h-full shadow-2xl flex flex-col z-20 border-l border-[#1C1814]/15"
            >
              {/* Header with standard Design.md padding and bg */}
              <div className="p-6 border-b border-[#1C1814]/15 flex items-center justify-between bg-[#FAFAFA]">
                <div className="space-y-1 text-left">
                  <h3 className="text-[20px] font-bold text-[#1C1814] tracking-tight flex items-center gap-2 font-sans">
                    <BookOpen className="w-5 h-5 text-[#7553FF]" />
                    Cultural Dictionary Database
                  </h3>
                  <p className="text-[14px] text-[#5C534C] font-sans leading-[20px]">
                    Glossary of culinary terminology with contextual descriptions.
                  </p>
                </div>
                <button 
                  onClick={() => setIsDictionaryOpen(false)}
                  className="p-2 hover:bg-[#1C1814]/5 rounded-full text-[#5C534C] hover:text-[#1C1814] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Search & Spacing block */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5C534C] w-4.5 h-4.5" />
                    <input 
                      type="text" 
                      placeholder="Search glossary database..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-[38px] bg-white border border-[#1C1814]/15 rounded-[6px] pl-10 pr-4 text-[14px] text-[#1C1814] outline-none focus:border-[#7553FF] focus:shadow-focus focus:ring-0 font-sans transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 py-1">
                    <Filter className="w-4 h-4 text-[#5C534C] mr-1.5 shrink-0" />
                    {domainCategories.map((term) => (
                      <button
                        key={term}
                        onClick={() => setDomainFilter(term)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-[6px] transition-all cursor-pointer ${
                          domainFilter === term
                            ? 'bg-[#7553FF] text-white shadow-3xs'
                            : 'bg-[#FAF9F7] text-[#5C534C] border border-[#1C1814]/15 hover:bg-[#FAF9F7] hover:border-[#1C1814]/15'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dictionary Database Table with perfect borders and font-weights */}
                <div className="overflow-hidden border border-[#1C1814]/15 rounded-[8px]">
                  <table className="w-full text-left font-sans text-[14px]">
                    <thead>
                      <tr className="bg-[#FAF9F7] text-[#5C534C] border-b border-[#1C1814]/15 text-xs font-bold uppercase tracking-wider">
                        <th className="py-3 px-4 text-[#1C1814]">Word</th>
                        <th className="py-3 px-4 text-[#1C1814]">Translation</th>
                        <th className="py-3 px-4 text-[#1C1814]">Explanation Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1814]/15 text-[#1C1814]">
                      {filteredDictionary.length > 0 ? (
                        filteredDictionary.map((item, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF9F7] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-[#1C1814]">{item.keyword}</td>
                            <td className="py-3.5 px-4 font-bold text-[#7553FF]">{item.translation}</td>
                            <td className="py-3.5 px-4 text-[#5C534C] text-[13px] font-normal leading-relaxed">{item.culturalNote}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-8 text-center text-[#5C534C] font-sans">
                            No cultural glossary records match "{search}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Dictionary add glossary item entry form */}
                <form onSubmit={handleAddTerm} className="p-5 bg-[#FAF9F7] border border-[#1C1814]/15 rounded-[8px] space-y-4 text-left">
                  <h4 className="text-[14px] font-bold text-[#1C1814] flex items-center gap-1.5 uppercase tracking-wide">
                    <Plus className="w-5 h-5 text-[#7553FF]" />
                    Add Term to Dictionary Database
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-[14px]">
                    <div className="space-y-1.5 animate-fadeIn">
                       <label className="text-[12px] font-semibold text-[#5C534C] uppercase tracking-wider block">Vietnamese Keyword</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Banh xeo"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        className="w-full h-[38px] bg-white border border-[#1C1814]/15 px-3.5 rounded-[6px] font-sans text-[14px] text-[#1C1814] outline-none focus:border-[#7553FF] focus:shadow-focus focus:ring-0 transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 animate-fadeIn">
                       <label className="text-[12px] font-semibold text-[#5C534C] uppercase tracking-wider block">Standard Translation</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Crispy Savory Crepe"
                        value={newTranslation}
                        onChange={(e) => setNewTranslation(e.target.value)}
                        className="w-full h-[38px] bg-white border border-[#1C1814]/15 px-3.5 rounded-[6px] font-sans text-[14px] text-[#1C1814] outline-none focus:border-[#7553FF] focus:shadow-focus focus:ring-0 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[12px] font-semibold text-[#5C534C] uppercase tracking-wider block">Context / Culinary Explanations</label>
                    <textarea 
                      placeholder="e.g. Crispy pancake containing pork, bean sprouts, served wrapped in seasonal leaves..."
                      value={newCultureNote}
                      onChange={(e) => setNewCultureNote(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-[#1C1814]/15 p-3 rounded-[6px] font-sans text-[14px] text-[#1C1814] outline-none focus:border-[#7553FF] focus:shadow-focus focus:ring-0 resize-none transition-all"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 h-[38px] bg-[#7553FF] hover:bg-[#623EE2] text-white font-bold text-xs rounded-[6px] shadow-xs hover:shadow-sm transition-colors cursor-pointer flex items-center justify-center font-sans"
                    >
                      Save to Glossary
                    </button>
                  </div>
                </form>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
