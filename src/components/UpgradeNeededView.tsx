import { 
  Calendar, 
  DollarSign, 
  Utensils, 
  Share2, 
  SearchCode, 
  Star, 
  Sliders, 
  Clock, 
  UserCheck, 
  Calculator, 
  MessageSquareCode,
  ShieldAlert, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { motion } from 'motion/react';
import { TabId } from '../types';

interface UpgradeNeededViewProps {
  attemptedTabId: TabId;
  requiredPlan: 'Gold' | 'Diamond';
  language?: 'EN' | 'VI' | 'DE';
  onUnlockClick: () => void;
}

const getTabIcon = (tabId: TabId) => {
  switch (tabId) {
    case 'shift-planner':
      return <Calendar className="w-8 h-8" strokeWidth={1.5} />;
    case 'payroll':
      return <DollarSign className="w-8 h-8" strokeWidth={1.5} />;
    case 'book-table':
      return <Utensils className="w-8 h-8" strokeWidth={1.5} />;
    case 'social-post':
      return <Share2 className="w-8 h-8" strokeWidth={1.5} />;
    case 'seo-opt':
      return <SearchCode className="w-8 h-8" strokeWidth={1.5} />;
    case 'reviews':
      return <Star className="w-8 h-8" strokeWidth={1.5} />;
    case 'marketing-setting':
      return <Sliders className="w-8 h-8" strokeWidth={1.5} />;
    case 'catering-inquiries':
      return <Clock className="w-8 h-8" strokeWidth={1.5} />;
    case 'checkin':
      return <UserCheck className="w-8 h-8" strokeWidth={1.5} />;
    case 'leave-calculator':
      return <Calculator className="w-8 h-8" strokeWidth={1.5} />;
    case 'chatbot':
      return <MessageSquareCode className="w-8 h-8" strokeWidth={1.5} />;
    default:
      return <ShieldAlert className="w-8 h-8" strokeWidth={1.5} />;
  }
};

const BENEFIT_MAP: {
  [key in TabId]?: {
    EN: { title: string; desc: string };
    VI: { title: string; desc: string };
    DE: { title: string; desc: string };
  };
} = {
  'shift-planner': {
    EN: {
      title: 'Automated Shift Scheduling & Hourly Optimization',
      desc: 'Optimize staff allocation, minimize coverage gaps, and automatically balance shift schedules to cut down labor overhead.',
    },
    VI: {
      title: 'Tối ưu xếp ca & quản lý lịch làm việc tự động',
      desc: 'Tự động sắp xếp thời gian làm việc, cân đối nhân lực chính xác theo giờ cao điểm và giảm thiểu sai sót lịch trình.',
    },
    DE: {
      title: 'Automatisierte Schichtplanung & Stundenoptimierung',
      desc: 'Optimieren Sie den Personaleinsatz, minimieren Sie Lücken und gleichen Sie Schichtpläne automatisch aus, um Kosten zu senken.',
    },
  },
  'payroll': {
    EN: {
      title: 'End-to-End Automated Salary & Wage Computation',
      desc: 'Sync hours automatically with attendance files to process salary tiers, taxes, and benefit metrics error-free.',
    },
    VI: {
      title: 'Tự động hóa hoàn toàn quy trình tính lương & chấm công',
      desc: 'Đồng bộ hóa dữ liệu chấm công thời gian thực để tự động tính toán bảng lương, thưởng và khấu trừ thuế chuẩn xác tuyệt đối.',
    },
    DE: {
      title: 'Vollautomatische Lohn- und Gehaltsabrechnung',
      desc: 'Synchronisieren Sie Stunden fehlerfrei mit Anwesenheitsdaten, um Gehaltsstufen, Steuern und Zusatzleistungen zu berechnen.',
    },
  },
  'book-table': {
    EN: {
      title: 'Smart Table Reservation & Floor Map Seating',
      desc: 'Max out restaurant footprint with interactive visual mapping, live walk-in waiting list registers, and SMS alerts.',
    },
    VI: {
      title: 'Quản lý đặt bàn thông minh & tối ưu hóa xếp chỗ',
      desc: 'Tối đa hóa công suất phục vụ của nhà hàng với sơ đồ bàn trực quan, quản lý danh sách chờ thời gian thực và tự động báo SMS.',
    },
    DE: {
      title: 'Intelligente Tischreservierung & Sitzplatzoptimierung',
      desc: 'Maximieren Sie die Restaurantauslastung mit interaktiven Grundrissen, Live-Wartelisten und automatischen SMS-Benachrichtigungen.',
    },
  },
  'social-post': {
    EN: {
      title: 'AI-Powered Cross-Channel Social Auto-Posting',
      desc: 'Instantly schedule, distribute, and track organic engagement campaigns directly across Instagram, Facebook, and Google.',
    },
    VI: {
      title: 'Tự động đăng bài truyền thông & tiếp cận khách hàng AI',
      desc: 'Tự động lên lịch, biên soạn nội dung và phát hành bài viết chất lượng cao lên mạng xã hội để thu hút thực khách tự động.',
    },
    DE: {
      title: 'KI-gestütztes automatisches Posten in sozialen Medien',
      desc: 'Planen und verteilen Sie Kampagnen direkt auf Instagram, Facebook und Google und verfolgen Sie organische Interaktionen.',
    },
  },
  'seo-opt': {
    EN: {
      title: 'Deep Digital Footprint SEO Review & Performance Optimizer',
      desc: 'Run complete local discoverability diagnostics to boost your Google Maps ranking and attract organic search customers.',
    },
    VI: {
      title: 'Đánh giá & tối ưu hóa tìm kiếm SEO nhà hàng toàn diện',
      desc: 'Kiểm tra chuẩn SEO, cải thiện thứ hạng tìm kiếm địa phương trên Google Maps để dẫn dắt lượng lớn khách vãng lai tới nhà hàng.',
    },
    DE: {
      title: 'Umfassende SEO-Analyse & Suchmaschinen-Optimierung',
      desc: 'Führen Sie lokale Diagnosen durch, um Ihr Ranking in Google Maps zu verbessern und mehr organische Suchanfragen zu gewinnen.',
    },
  },
  'reviews': {
    EN: {
      title: 'Instant AI Voice Assistant Review Responder',
      desc: 'Generate personalized, polite, and brand-consistent answers to customer feedback instantly to bolster public scores.',
    },
    VI: {
      title: 'Trợ lý AI tự động phản hồi đánh giá & chăm sóc danh tiếng',
      desc: 'Tự động phân tích tâm lý khách hàng và viết phản hồi cá nhân hóa chuẩn thương hiệu, cải thiện 1.2x điểm số đánh giá trực tuyến.',
    },
    DE: {
      title: 'KI-gestützter automatischer Bewertungs-Beantworter',
      desc: 'Generieren Sie personalisierte, markenkonforme Antworten auf Kundenfeedback im Handumdrehen, um Ihren Score zu maximieren.',
    },
  },
  'marketing-setting': {
    EN: {
      title: 'Smart Personalization Marketing & Campaigns Setting',
      desc: 'Deploy target campaigns, loyalty tiers, and redeemable vouchers according to customer dine-in behavior trends.',
    },
    VI: {
      title: 'Thiết lập chiến dịch tiếp thị cá nhân hóa thông minh',
      desc: 'Thiết kế các ưu đãi đặc quyền, voucher sinh nhật và hạng thành viên trung thành tương thích chính xác với thị hiếu ăn uống.',
    },
    DE: {
      title: 'Intelligente personalisierte Marketingkampagnen',
      desc: 'Erstellen Sie zielgerichtete Kampagnen, Loyalitätsstufen und Gutscheine basierend auf dem Konsumverhalten Ihrer Gäste.',
    },
  },
  'catering-inquiries': {
    EN: {
      title: 'End-to-End Enterprise Catering Inquiry Pipeline',
      desc: 'Centralize custom events requests, build responsive quotation items, and trace down corporate bookings smoothly.',
    },
    VI: {
      title: 'Tiếp nhận & xử lý yêu cầu đặt tiệc sự kiện quy mô lớn',
      desc: 'Quản lý toàn bộ yêu cầu tiệc cưới, hội nghị, tính toán báo giá chi tiết và hỗ trợ doanh nghiệp thanh toán thuận tiện.',
    },
    DE: {
      title: 'Professionelles Management von Catering-Anfragen',
      desc: 'Zentralisieren Sie Veranstaltungsanfragen, erstellen Sie Angebote und verwalten Sie Firmenbuchungen reibungslos.',
    },
  },
  'checkin': {
    EN: {
      title: 'Frictionless Cloud Attendance & Tablet Check-In',
      desc: 'Equip your staff with rapid security PIN registers, GPS boundary validation, and real-time shifts check-in metrics.',
    },
    VI: {
      title: 'Điểm danh & chấm công thông minh trên máy tính bảng',
      desc: 'Cung cấp cho nhân sự giao diện vào ca nhanh gọn qua mã PIN hoặc QR bảo mật, tự động đối chiếu định vị địa lý tại chi nhánh.',
    },
    DE: {
      title: 'Reibungsloses digitales Zeiterfassungssystem',
      desc: 'Rüsten Sie Ihre Mitarbeiter mit schnellen PIN-Check-ins, GPS-Grenzenprüfung und Echtzeit-Schichtdaten aus.',
    },
  },
  'leave-calculator': {
    EN: {
      title: 'Dynamic Annual Paid Leave Calculator & Entitlement tracker',
      desc: 'Track roll-over vacation slots, design automated approval workflows, and trace historic days off transparently.',
    },
    VI: {
      title: 'Tự động tính toán & quản lý ngày nghỉ phép trực tuyến',
      desc: 'Hệ thống tự dồn ngày phép thừa, thiết kế quy trình duyệt nghỉ tự động và hiển thị lịch sử xin phép của từng nhân sự minh bạch.',
    },
    DE: {
      title: 'Dynamischer Urlaubsrechner & Urlaubsanspruchs-Planer',
      desc: 'Verwalten Sie Urlaubsansprüche, richten Sie Genehmigungsworkflows ein und verfolgen Sie Abwesenheiten transparent.',
    },
  },
  'chatbot': {
    EN: {
      title: 'Sophisticated 24/7 Conversational AI Customer Assistant',
      desc: 'Deliver immediate allergen checklists, prompt seat bookings, and resolve menus search requests directly round the clock.',
    },
    VI: {
      title: 'Trợ lý ảo AI chăm sóc khách hàng tự động 24/7',
      desc: 'Giải đáp tức thì các câu hỏi về thành phần món ăn, đặt bàn trực tiếp, và hỗ trợ khách hàng tìm kiếm thực đơn thâu đêm suốt sáng.',
    },
    DE: {
      title: 'Unterstützung durch intelligenten 24/7 KI-Chatbot',
      desc: 'Beantworten Sie Allergiefragen direkt, erfassen Sie Tischreservierungen und helfen Sie Gästen rund um die Uhr.',
    },
  },
};

export default function UpgradeNeededView({
  attemptedTabId,
  requiredPlan,
  language = 'EN',
  onUnlockClick,
}: UpgradeNeededViewProps) {
  const activeLanguage = language as 'EN' | 'VI' | 'DE';
  const benefit = BENEFIT_MAP[attemptedTabId];

  // Default content fallback in case the tab isn't cataloged
  const content = benefit ? benefit[activeLanguage] : {
    EN: {
      title: 'Premium Smart Business Operational Feature',
      desc: 'Requires an active account subscription upgrade. Enhance operations by leveraging modern visual interfaces.'
    },
    VI: {
      title: 'Tính năng quản trị vận hành cao cấp',
      desc: 'Yêu cầu kích hoạt gói dịch vụ nâng cao. Tối ưu năng suất hoạt động bằng việc áp dụng các giải pháp tự động trực quan.'
    },
    DE: {
      title: 'Premium-Betriebsfunktion für Unternehmen',
      desc: 'Erfordert ein aktives Abonnement-Upgrade. Verbessern Sie Ihre Abläufe durch moderne visuelle Schnittstellen.'
    }
  }[activeLanguage];

  // Localized CTA wording
  const ctaText = `Unlock ${requiredPlan} Plan`;

  return (
    <div className="flex items-center justify-center py-6 px-4 select-none font-sans" id="upgrade-needed-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-md border-t-0 border-r border-b border-l border-[#1C1814]/15 rounded-2xl p-7 text-center space-y-6 shadow-[0_12px_28px_rgba(75,70,92,0.15)] relative overflow-hidden"
      >
        {/* Header content: Icon & Badge alignment */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-1">
          {/* Circular Icon Holder */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
            requiredPlan === 'Gold' 
              ? 'bg-amber-50 text-amber-600 ring-4 ring-amber-500/10' 
              : 'bg-[#7553FF]/10 text-[#7553FF] ring-4 ring-[#7553FF]/10'
          }`}>
            {getTabIcon(attemptedTabId)}
          </div>

          {/* Premium styled required plan badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[14px] font-normal ${
            requiredPlan === 'Gold'
              ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
              : 'bg-[#7553FF]/10 text-[#7553FF] border border-[#7553FF]/20'
          }`}>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>{requiredPlan} Plan</span>
          </div>
        </div>

        {/* Main central copywriting block */}
        <div className="space-y-3">
          <h2 className="text-[18px] md:text-[20px] font-bold text-[#1C1814] tracking-tight leading-snug">
            {content.title}
          </h2>
          <p className="text-[14px] text-slate-700 leading-relaxed font-normal">
            {content.desc}
          </p>
        </div>

        {/* Premium sole CTA Upgrade Trigger button */}
        <div className="pt-2">
          <button
            onClick={onUnlockClick}
            className={`w-full py-3.5 px-5 text-white font-bold text-[14px] rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group border-none ${
              requiredPlan === 'Gold'
                ? 'bg-amber-600 hover:bg-amber-700 shadow-[0_2px_8px_rgba(217,119,6,0.3)]'
                : 'bg-[#7553FF] hover:bg-[#623EE2] shadow-[0_2px_8px_rgba(117,83,255,0.3)]'
            }`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
