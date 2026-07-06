import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Percent, 
  CheckCircle, 
  RefreshCw, 
  X,
  Upload,
  ChevronDown,
  Check,
  Clock,
  Info,
  FileText,
  Download,
  Sparkles,
  Eye,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuPreviewItem {
  name: string;
  description: string;
  category: 'APPETIZERS' | 'MAIN COURSES' | 'BEVERAGES';
  basePrice: number;
}

const defaultMenuItems: MenuPreviewItem[] = [
  // Appetizers
  { name: 'Tom Yum Goong', description: 'Prawns in spicy Lemongrass soup', category: 'APPETIZERS', basePrice: 8.99 },
  { name: 'Thai Spring Rolls', description: 'Prawns and vegetables with sweet chili dip', category: 'APPETIZERS', basePrice: 6.50 },
  { name: 'Green Papaya Salad', description: 'Mixed shredded papaya with peanuts', category: 'APPETIZERS', basePrice: 7.50 },
  // Main Courses
  { name: 'Pad Thai', description: 'Stir-fried rice noodles with prawns', category: 'MAIN COURSES', basePrice: 12.99 },
  { name: 'Green Curry Chicken', description: 'Chicken in green curry with coconut milk', category: 'MAIN COURSES', basePrice: 14.54 },
  { name: 'Stir-fried Basil Chicken', description: 'Chicken stir-fried with Thai basil', category: 'MAIN COURSES', basePrice: 12.50 },
  // Beverages
  { name: 'Thai Iced Tea', description: 'Authentic chilled Thai sweet milk tea', category: 'BEVERAGES', basePrice: 3.50 },
  { name: 'Lemongrass Drink', description: 'Refreshing sweet lemongrass herbal tea', category: 'BEVERAGES', basePrice: 3.25 },
];

export default function PriceUpdate() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [percentage, setPercentage] = useState(10);
  const [direction, setDirection] = useState<'increase' | 'decrease'>('increase');
  const [uploadedFile, setUploadedFile] = useState<{name: string, size: string} | null>({
    name: 'restaurant_menu.pdf',
    size: '2.4 MB'
  });
  const [isScanning, setIsScanning] = useState(false);
  const [scanningStatus, setScanningStatus] = useState('');
  const [statusProgress, setStatusProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const startScanningAndDetection = () => {
    if (!uploadedFile) {
      showToast('Please upload a menu PDF first!', 'error');
      return;
    }

    setIsScanning(true);
    setCurrentStep(2);
    setScanningStatus('Analyzing PDF page structure...');
    setStatusProgress(15);

    setTimeout(() => {
      setScanningStatus('Running OCR & recognizing typography pairs...');
      setStatusProgress(42);
    }, 600);

    setTimeout(() => {
      setScanningStatus('Detecting price points & currency symbols...');
      setStatusProgress(70);
    }, 1200);

    setTimeout(() => {
      setScanningStatus('Calculating dynamic adjustment values...');
      setStatusProgress(90);
    }, 1800);

    setTimeout(() => {
      setIsScanning(false);
      setCurrentStep(3);
      showToast('AI successfully scanned menu and adjusted prices!', 'success');
    }, 2300);
  };

  const resetPricesAndUpload = () => {
    setUploadedFile({
      name: 'restaurant_menu.pdf',
      size: '2.4 MB'
    });
    setCurrentStep(1);
    setPercentage(10);
    setDirection('increase');
    showToast('Reset to upload screen', 'info');
  };

  const calcPrice = (basePrice: number) => {
    const factor = direction === 'increase' ? (1 + percentage / 100) : (1 - percentage / 100);
    return (basePrice * factor).toFixed(2);
  };

  // Filter items for pages
  const appetizers = defaultMenuItems.filter(item => item.category === 'APPETIZERS');
  const mainCourses = defaultMenuItems.filter(item => item.category === 'MAIN COURSES');
  const beverages = defaultMenuItems.filter(item => item.category === 'BEVERAGES');

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto pb-16 relative text-left">
      
      {/* Toast notification system */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${
              toastMessage.type === 'success'
                ? 'bg-[#F0ECFF] border-[#7553FF] text-[#7553FF]'
                : toastMessage.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-[#F0ECFF] border-[#7553FF] text-[#7553FF]'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-[#7553FF] shrink-0" />
            )}
            <span className="text-sm font-bold font-sans">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
        <div className="space-y-1">
          <h1 className="text-[28px] font-semibold text-[#1C1814] tracking-tight flex items-center gap-2 font-sans">
            Price Updater
          </h1>
          <p className="text-sm text-[#5C534C] font-semibold font-sans">
            Detect and update prices with automated AI overlay placement.
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-[#1C1814]/15 text-[#5C534C] hover:text-[#1C1814] text-sm font-bold rounded-xl transition duration-200 flex items-center gap-1.5 cursor-pointer h-10 select-none font-sans"
          >
            <Clock className="w-4 h-4 text-[#7C7267]" />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMN 1: CONFIGURATION & UPLOAD (Always stays active / left col) */}
        <div className="lg:col-span-5 bg-white border border-[#1C1814]/15 rounded-xl p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#1C1814] tracking-tight font-sans">Upload Menu PDF</h2>
            <p className="text-sm text-[#5C534C] font-sans">Upload your menu to detect and update prices automatically.</p>
          </div>

          {/* Dotted Upload Area Container Card */}
          <div 
            onClick={() => {
              if (!uploadedFile) {
                setUploadedFile({ name: 'restaurant_menu.pdf', size: '2.4 MB' });
                showToast('Mock PDF menu loaded successfully!', 'info');
              }
            }}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300 select-none ${
              uploadedFile 
                ? 'border-[#7553FF]/30 bg-[#F0ECFF]/10 cursor-default' 
                : 'border-[#1C1814]/15 hover:border-[#7553FF]/50 bg-white hover:bg-[#FAF9F7]/50 cursor-pointer'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-[#F0ECFF]/80 flex items-center justify-center text-[#7553FF] border border-[#7553FF]/10 mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#1C1814] font-sans">Upload Menu PDF</h3>
            <p className="text-sm text-[#5C534C] mt-1 font-sans">Drag and drop your PDF file here</p>
            <span className="text-sm text-[#7C7267] font-semibold mt-0.5 font-sans">or click to browse</span>
          </div>

          {/* Uploaded file container badge */}
          {uploadedFile && (
            <div className="flex items-center justify-between p-3.5 bg-[#FAF9F7] border border-[#1C1814]/15 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-[#1C1814] block leading-tight font-sans">{uploadedFile.name}</span>
                  <span className="text-sm text-[#7C7267] font-mono block mt-1">{uploadedFile.size}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setUploadedFile(null);
                  setCurrentStep(1);
                  showToast('File attachment removed', 'info');
                }}
                className="text-sm font-bold text-[#7553FF] hover:text-[#623EE2] font-sans cursor-pointer select-none border border-[#1C1814]/15 bg-white hover:bg-[#F0ECFF] px-3 py-1.5 rounded-lg transition"
              >
                Replace
              </button>
            </div>
          )}

          {/* Option parameters dropdowns */}
          <div className="grid grid-cols-2 gap-4 pt-1 text-left">
            {/* Update direction */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#5C534C] font-sans">Update Mode</label>
              <div className="relative">
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as 'increase' | 'decrease')}
                  disabled={isScanning}
                  className="w-full text-sm p-2.5 border border-[#1C1814]/15 rounded-xl bg-white focus:outline-none focus:border-[#7553FF] focus:ring-2 focus:ring-[#7553FF]/18 appearance-none cursor-pointer font-bold text-[#1C1814] disabled:opacity-50"
                >
                  <option value="increase">Percentage Increase</option>
                  <option value="decrease">Percentage Decrease</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#5C534C]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Percentage select input */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#5C534C] font-sans">Percentage (%)</label>
              <div className="relative flex bg-white border border-[#1C1814]/15 rounded-xl px-3 py-2 focus-within:border-[#7553FF] focus-within:ring-2 focus-within:ring-[#7553FF]/18">
                <input 
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(Math.max(1, Number(e.target.value)))}
                  disabled={isScanning}
                  className="w-full text-sm font-mono font-bold text-[#1C1814] focus:outline-none disabled:opacity-50"
                />
                <span className="text-sm text-[#7C7267] shrink-0 font-bold ml-2 font-sans">%</span>
              </div>
            </div>
          </div>

          {/* Dynamic instruction box banner */}
          <div className="bg-[#F0ECFF] border border-[#7553FF]/10 rounded-xl p-3.5 flex items-start gap-2.5 text-left">
            <div className="p-1.5 bg-[#7553FF]/10 text-[#7553FF] rounded-lg shrink-0">
              <Info className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm text-[#1C1814] leading-relaxed font-regular font-sans">
              AI will detect all prices in your menu and {direction === 'increase' ? 'increase' : 'decrease'} them by <strong className="text-[#7553FF]">{percentage}%</strong>. You can review and edit the results before finalizing.
            </p>
          </div>

          {/* Submit trigger button */}
          <div className="pt-2">
            <button
              type="button"
              disabled={!uploadedFile || isScanning}
              onClick={startScanningAndDetection}
              className="w-full h-11 bg-[#7553FF] hover:bg-[#623EE2] disabled:bg-slate-200 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 select-none cursor-pointer text-sans"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{isScanning ? 'Processing...' : 'Detect Prices'}</span>
            </button>
          </div>

          {/* Lower guidelines card */}
          <div className="bg-[#FAF9F7] border border-[#1C1814]/15 rounded-xl p-4 flex items-start gap-3 mt-4 text-left">
            <div className="p-1.5 bg-white text-[#7553FF] rounded-xl shrink-0 border border-[#1C1814]/15">
              <Info className="w-4.5 h-4.5" />
            </div>
            <div className="space-y-1 font-sans">
              <span className="text-sm font-medium text-[#1C1814] block leading-snug">
                Only one PDF file can be uploaded at a time. Maximum file size: 50MB.
              </span>
              <p className="text-sm text-[#1C1814] font-light leading-relaxed">
                For best results, upload clear, high-resolution menus with visible prices.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 2: WORKINGS & PREVIEWS (Right col) */}
        <div className="lg:col-span-7">
          
          <div className="bg-white border border-[#1C1814]/15 rounded-xl p-6 text-left space-y-5">
            
            <div className="space-y-1 border-b border-[#1C1814]/15 pb-3">
              <h3 className="text-base font-bold text-[#1C1814] tracking-tight font-sans">Preview Change</h3>
              <p className="text-sm text-[#5C534C] font-sans">
                Review your updated menu with new prices.
              </p>
            </div>

            {/* ============ STATE 1: PENDING / START STATE ============ */}
            {currentStep === 1 && (
              <div className="space-y-6 py-6 animate-fadeIn">
                {/* Circular Progress Indicator */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-slate-100 fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="60"
                        className="stroke-[#7553FF]/30 fill-none"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * 0.9}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center font-sans">
                      <span className="text-2xl font-extrabold text-[#7C7267]">
                        0%
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-3 space-y-1">
                    <h4 className="text-sm font-bold text-[#1C1814] tracking-wider font-sans">
                      Scan Pending
                    </h4>
                    <p className="text-sm text-[#7C7267] font-light leading-normal max-w-[240px] mx-auto font-sans">
                      Configure parameters and click "Detect Prices" to run automated price detection preview.
                    </p>
                  </div>
                </div>

                {/* Vertical steps connector tracker list */}
                <div className="border border-[#1C1814]/15 bg-[#FAF9F7]/50 rounded-xl p-4.5 space-y-4">
                  
                  {/* Row 1 */}
                  <div className="relative flex items-center justify-between pb-1 font-sans">
                    <div className="absolute top-10 bottom-[-16px] left-[17px] w-[1.5px] bg-[#1C1814]/15" />
                    <div className="flex gap-3 items-center">
                      <div className="w-[34px] h-[34px] rounded-full bg-[#F0ECFF] flex items-center justify-center text-[#7553FF] border border-[#7553FF]/20 shrink-0">
                        <Upload className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-[#1C1814] block">Upload PDF</span>
                        <p className="text-sm text-[#7C7267] leading-none mt-0.5">
                          {uploadedFile ? 'Menu uploaded successfully' : 'Select menu file'}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {uploadedFile ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#15803D]">
                          <Check className="w-3 h-3 text-[#15803D]" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-[#1C1814]/15 bg-white" />
                      )}
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="relative flex items-center justify-between pb-1 font-sans font-medium">
                    <div className="absolute top-10 bottom-[-16px] left-[17px] w-[1.5px] bg-[#1C1814]/15" />
                    <div className="flex gap-3 items-center">
                      <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center border shrink-0 bg-slate-50 text-slate-700 border-slate-200">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold block text-[#7C7267]">Detect Prices</span>
                        <p className="text-sm text-[#7C7267] leading-none mt-0.5">AI scans and detects all prices</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className="w-5 h-5 rounded-full border border-[#1C1814]/15 bg-white" />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="relative flex items-center justify-between font-sans font-medium">
                    <div className="flex gap-3 items-center">
                      <div className="w-[34px] h-[34px] rounded-full bg-slate-50 text-slate-700 border-slate-200 shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#7C7267] block">Complete</span>
                        <p className="text-sm text-[#7C7267] leading-none mt-0.5">Download updated menu with new layout overlays</p>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className="w-5 h-5 rounded-full border border-[#1C1814]/15 bg-white" />
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ============ STATE 2: SCANNING AI VIEW ============ */}
            {currentStep === 2 && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-[#F0ECFF] border-t-[#7553FF] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-sans font-extrabold text-[#7553FF]">{statusProgress}%</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-[#1C1814] tracking-wider font-sans">Running Intelligent Scan</h3>
                  <p className="text-sm text-[#5C534C] font-sans">Please wait while the AI identifies prices and prepares overlay placements.</p>
                </div>

                <div className="w-full max-w-sm bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                  <div className="bg-[#7553FF] h-full transition-all duration-300" style={{ width: `${statusProgress}%` }} />
                </div>
                
                <span className="text-sm px-3.5 py-1.5 bg-[#FAF9F7] border border-[#1C1814]/15 rounded-lg text-[#5C534C] font-mono font-bold block">
                  {scanningStatus}
                </span>
              </div>
            )}

            {/* ============ STATE 3: RESULTS / ALL DONE SCREEN ============ */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Result header banner */}
                <div className="flex flex-col items-center text-center space-y-2 py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C1814] font-sans">All done!</h3>
                  <p className="text-sm text-emerald-700 font-bold font-sans">
                    Your menu has been updated successfully.
                  </p>
                </div>

                {/* Side-by-side Booklet Preview */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center w-full">
                  
                  {/* Booklet Left page */}
                  <div className="bg-[#FAF9F7] border border-[#1C1814]/15 rounded-xl p-5 flex-1 text-left">
                    <div className="space-y-5">
                      
                      {/* APPETIZERS SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Appetizers
                        </h4>
                        <div className="space-y-3">
                          {appetizers.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MAIN COURSES SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Main Courses
                        </h4>
                        <div className="space-y-3">
                          {mainCourses.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BEVERAGES SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Beverages
                        </h4>
                        <div className="space-y-3">
                          {beverages.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Booklet Right page (identical replica template, as in the screenshot booklet) */}
                  <div className="bg-[#FAF9F7] border border-[#1C1814]/15 rounded-xl p-5 flex-1 text-left hidden sm:block">
                    <div className="space-y-5">
                      
                      {/* APPETIZERS SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Appetizers
                        </h4>
                        <div className="space-y-3">
                          {appetizers.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* MAIN COURSES SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Main Courses
                        </h4>
                        <div className="space-y-3">
                          {mainCourses.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BEVERAGES SECTION */}
                      <div>
                        <h4 className="text-sm font-bold text-[#124E4A] tracking-widest text-center border-b border-[#1C1814]/15 pb-1 mb-3 font-serif">
                          Beverages
                        </h4>
                        <div className="space-y-3">
                          {beverages.map((item, i) => (
                            <div key={i} className="flex justify-between items-start text-sm font-medium leading-tight">
                              <div className="pr-2 min-w-0">
                                <span className="font-bold text-[#1C1814] block truncate">{item.name}</span>
                                <span className="text-sm text-[#5C534C] block font-sans font-medium mt-0.5 leading-snug">{item.description}</span>
                              </div>
                              <span className="font-extrabold text-[#7553FF] shrink-0 font-poppins text-sm">${calcPrice(item.basePrice)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Big full-width outline button underneath */}
                <div className="pt-2">
                  <button
                    onClick={() => showToast('Downloading updated menu...', 'success')}
                    className="w-full h-11 bg-white hover:bg-[#F0ECFF] border border-[#7553FF] hover:border-[#623EE2] text-[#7553FF] hover:text-[#623EE2] font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-200 select-none cursor-pointer font-sans"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>Download Updated Menu (PDF)</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL WINDOW FOR ALL RECENT HISTORY RECORDS */}
      <AnimatePresence>
        {showHistoryModal && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.25 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowHistoryModal(false)}
               className="fixed inset-0 bg-black z-40"
            />
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:max-w-md md:mx-auto bg-white border border-[#1C1814]/15 rounded-2xl p-6 z-50 text-left space-y-4 font-sans"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#1C1814]/15">
                <h3 className="font-bold text-sm text-[#1C1814]">Update Archive History</h3>
                <button 
                  onClick={() => setShowHistoryModal(false)}
                  className="p-1 bg-slate-50 border rounded-lg hover:bg-slate-100 cursor-pointer text-slate-700 hover:text-slate-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#1C1814]/15 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#1C1814] block">restaurant_menu.pdf</span>
                    <span className="text-sm text-[#7C7267] block mt-0.5">Updated 2 days ago • Increase +10%</span>
                  </div>
                  <button 
                    onClick={() => showToast('Re-downloading...', 'success')}
                    className="p-1.5 bg-white border border-[#1C1814]/15 hover:bg-[#F0ECFF] rounded-lg text-slate-700 hover:text-[#7553FF] transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#1C1814]/15 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#1C1814] block">drinks_list_may.pdf</span>
                    <span className="text-sm text-[#7C7267] block mt-0.5">Updated 2 weeks ago • Decrease -5%</span>
                  </div>
                  <button 
                    onClick={() => showToast('Re-downloading...', 'success')}
                    className="p-1.5 bg-white border border-[#1C1814]/15 hover:bg-[#F0ECFF] rounded-lg text-slate-700 hover:text-[#7553FF] transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 bg-[#FAF9F7] rounded-xl border border-[#1C1814]/15 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-[#1C1814] block">spring_lunch_special.pdf</span>
                    <span className="text-sm text-[#7C7267] block mt-0.5">Updated 1 month ago • Increase +15%</span>
                  </div>
                  <button 
                    onClick={() => showToast('Re-downloading...', 'success')}
                    className="p-1.5 bg-white border border-[#1C1814]/15 hover:bg-[#F0ECFF] rounded-lg text-slate-700 hover:text-[#7553FF] transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="px-4 py-2 border border-[#1C1814]/15 rounded-xl text-sm font-bold text-[#5C534C] hover:bg-slate-50 transition cursor-pointer"
                >
                  Close History
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
