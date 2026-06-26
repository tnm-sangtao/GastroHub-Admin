---
name: Vuexy Inspired SaaS Design System — Merged Edition
version: 2.0.0
status: production
last_updated: 2026-06-04
source_note: "Vuexy component structure + DESIGN.md v1.1 color system & card radius."

tokens:
  color:
    brand:
      primary: "#7553FF"
      primary_soft: "#F0ECFF"
      primary_hover: "#623EE2"
      primary_pressed: "#4E25C4"
      secondary: "#A8AAAE"
      success: "#15803D"
      info: "#1D4ED8"
      warning: "#B45309"
      danger: "#B91C1C"
    light:
      canvas: "#FAFAFA"
      surface: "#FFFFFF"
      surface_soft: "#FAF9F7"
      surface_muted: "#F4F0EB"
      border: "#EAE4DC"
      border_soft: "#DCD2C7"
      text_primary: "#1C1814"
      text_secondary: "#5C534C"
      text_muted: "#7C7267"
      icon: "#5C534C"
    dark:
      canvas: "#25293C"
      surface: "#2F3349"
      surface_soft: "#34384F"
      surface_muted: "#3B4057"
      border: "#434968"
      border_soft: "#3C415C"
      text_primary: "#D0D4F1"
      text_secondary: "#B6BEE3"
      text_muted: "#7C84A8"
      icon: "#B6BEE3"
  typography:
    font_family: "Poppins"
    font_weight_cap: "Bold (700)"
    display:
      size: "40px"
      line_height: "48px"
      weight: 700
      letter_spacing: "-0.02em"
    h1:
      size: "32px"
      line_height: "40px"
      weight: 700
      letter_spacing: "-0.02em"
    h2:
      size: "26px"
      line_height: "34px"
      weight: 700
      letter_spacing: "-0.015em"
    h3:
      size: "22px"
      line_height: "30px"
      weight: 700
    body:
      size: "15px"
      line_height: "22px"
      weight: 400
    body_sm:
      size: "13px"
      line_height: "20px"
      weight: 400
    caption:
      size: "12px"
      line_height: "16px"
      weight: 600
  radius:
    xs: "4px"
    sm: "4px"
    md: "6px"
    lg: "8px"
    xl: "8px"
    "2xl": "8px"
    "3xl": "8px"
    pill: "999px"
  spacing:
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "20px"
    6: "24px"
    8: "32px"
    10: "40px"
    12: "48px"
    16: "64px"
  shadow:
    card: "0 4px 18px rgba(75, 70, 92, 0.10)"
    card_hover: "0 8px 28px rgba(75, 70, 92, 0.14)"
    dropdown: "0 6px 24px rgba(75, 70, 92, 0.18)"
    focus: "0 0 0 3px rgba(117, 83, 255, 0.18)"
  component:
    button_height_md: "38px"
    input_height_md: "38px"
    sidebar_width: "260px"
    topbar_height: "64px"
---

# Vuexy Inspired DESIGN.md — Merged Edition

> Vuexy component structure & layout system merged with DESIGN.md v1.1 color philosophy and card radius.
> Colors: DESIGN.md v1.1 (Purple primary, Charcoal text, Cream canvas).
> Card radius: 8px conforming to the [4px - 8px] system rule.
> Everything else: Vuexy original.

---

## 1. Design DNA

Vuexy-inspired UI should feel:

- Clean, modern, polished, and dashboard-first.
- Soft but structured.
- Lightly colorful, never childish.
- Dense enough for SaaS data products, but not visually noisy.
- Built from reusable admin components: sidebar, topbar, cards, tables, charts, forms, tabs, drawers, dialogs, and app modules.

The style is not brutalist, not glass-heavy, not minimal-black-white. It is a modern admin SaaS style with **purple** as the main identity color.

---

## 2. Visual Principles

### Soft structure
Use cards, panels, subtle borders, and soft shadows. Avoid harsh black borders. Prefer `box-shadow` and beige dividers.

### Calm density
Vuexy-style dashboards can contain many modules, but each card must have a clear role. Group information by task, not by decoration.

### Teal as the product accent
Primary purple `#7553FF` is used for active states, main CTAs, selected navigation, charts, badges, progress, and focus rings.

### Neutral content surfaces
The main background is warm cream `#FAFAFA`, not gray-lavender. Cards are white in light mode and dark navy-gray in dark mode.

### Dashboard first
This system is optimized for admin dashboards, CRM, analytics, e-commerce admin, healthcare admin, booking admin, learning admin, and SaaS management tools.

---

## 3. Color System

### Light Mode

| Token | Value | Usage |
|---|---|---|
| Page background | `#FAFAFA` | Cream canvas |
| Card surface | `#FFFFFF` | Elevated surface |
| Surface soft | `#FAF9F7` | Nested panels |
| Surface muted | `#F4F0EB` | Inputs, alternating rows |
| Border | `#EAE4DC` | Dividers, card borders |
| Border soft | `#DCD2C7` | Subtle separators |
| Primary text | `#1C1814` | Headlines, body |
| Secondary text | `#5C534C` | Labels, metadata |
| Muted text | `#7C7267` | Placeholders, captions |
| Primary accent | `#7553FF` | CTAs, active states |

### Dark Mode

| Token | Value |
|---|---|
| Page background | `#25293C` |
| Card surface | `#2F3349` |
| Elevated surface | `#34384F` |
| Primary text | `#D0D4F1` |
| Secondary text | `#B6BEE3` |
| Border | `#434968` |
| Primary accent | `#7553FF` |

### Primary Purple Scale

| Step | Hex |
|---|---|
| 50 | `#F0ECFF` |
| 100 | `#DDD6FE` |
| 200 | `#C4B5FD` |
| 300 | `#A78BFA` |
| 400 | `#8B5CF6` |
| **500 / Base** | **`#7553FF`** |
| 600 | `#623EE2` |
| 700 | `#4E25C4` |
| 800 | `#3B1D9E` |
| 900 | `#2D1578` |

### Semantic Colors

| Role | Hex | Notes |
|---|---|---|
| **Success** | `#15803D` | Green-700, contrast 6.1:1 |
| **Warning** | `#B45309` | Amber-700, contrast 4.8:1 |
| **Danger** | `#B91C1C` | Red-700, contrast 6.5:1 |
| **Info** | `#1D4ED8` | Blue-700, contrast 6.9:1 |

> ⚠️ **Rule**: Never use Primary Purple `#7553FF` as Success color.

Use semantic colors sparingly. Do not turn every card into a different color.

### Semantic Color Soft Backgrounds (Badges)

| Role | Background | Text |
|---|---|---|
| Success | `rgba(21, 128, 61, 0.12)` | `#15803D` |
| Warning | `rgba(180, 83, 9, 0.12)` | `#B45309` |
| Danger | `rgba(185, 28, 28, 0.12)` | `#B91C1C` |
| Info | `rgba(29, 78, 216, 0.12)` | `#1D4ED8` |
| Primary | `rgba(117, 83, 255, 0.12)` | `#7553FF` |

---

## 4. Typography

Poppins is the mandatory font family for all text elements across the entire application interface. Regular typography fallback must always be standard Poppins.

- **Weight Limits**: The absolute maximum font weight allowed is **Bold (700)**. Use of `font-extrabold`, `font-black`, `font-[800]`, or `font-[900]` is strictly forbidden. Any text previously styled with those must be adjusted to standard `font-bold` (`weight: 700`) to maintain a clean and streamlined appearance.
- **Size Pairings**:
  - Page title: 26–32px, weight 700.
  - Section title: 18–22px, weight 700.
  - Card title: 15–17px, weight 600 or 700.
  - Body: 14–15px, weight 400.
  - Caption/meta: 12–13px, weight 600.

Avoid oversized marketing typography or any other non-Poppins fonts inside admin screens.

---

## 5. Layout

### App Shell

Use a persistent sidebar and topbar for desktop dashboards.

- Sidebar width: 260px.
- Topbar height: 64px.
- Page padding: 24px desktop, 16px tablet, 12px mobile.
- Main grid gap: 24px desktop, 16px mobile.

### Sidebar

Sidebar should feel soft and spacious.

Rules:
- Active item uses primary purple background tint or gradient.
- Icons should be outline icons, preferably Hugeicons or Tabler-style.
- Avoid dense nested menus unless necessary.
- Keep label text short.

### Cards

Cards are the core surface. Card radius is **8px**.

Default card:

```css
background: var(--surface);
border-radius: 8px;
box-shadow: 0 4px 18px rgba(75, 70, 92, 0.10);
border: 1px solid rgba(28, 24, 20, 0.06);
padding: 24px;
```

Hover card:

```css
transform: translateY(-1px);
box-shadow: 0 8px 28px rgba(75, 70, 92, 0.14);
```

Do not use heavy shadows or thick borders.

### Flat Page Headers

To ensure maximum visual cleanliness, consistency, and structural focus, and to prevent redundant card grouping across all views:
- **No Card Formatting**: Page headers must NEVER be placed inside floating card containers. Do not use background colors (`bg-white`), shadow classes, background grids, border card wrapping, or heavy inner cell padding (e.g. do not apply `bg-white`, `shadow-[...]`, `p-6` or `px-y` to the page-level parent header wrapper).
- **Flat Layout**: Use a standard flat flex or columnar row with automatic layout spacing.
- **Divider Line**: Separate the flat header from the page content below using a thin bottom border separator (`border-b border-[#EAE4DC]` or similar border tones) and a subtle bottom offset spacing of `pb-6`.
- **Alignments & Actions**: Standardize alignment text-left for title labels while reserving space on the right (flex-row layout) for triggers, select controls, or actions.
- **Typography**: Display titles matching standard `text-2xl` font-bold text-slate-900/charcoal paired with sub-caption `text-xs` descriptions.

---

## 6. Components

### Buttons

Primary button:
- Background: `#7553FF`
- Text: white
- Radius: 6–8px
- Height: 38–40px
- Shadow: soft purple shadow only for primary CTA

```css
background: #7553FF;
color: #FFFFFF;
border-radius: 6px;
box-shadow: 0 2px 6px rgba(117, 83, 255, 0.35);
```

Secondary button:
- White or transparent surface.
- Subtle beige border `#EAE4DC`.
- Text uses primary `#1C1814` or teal.

Ghost button:
- Used in tables, toolbars, row actions.
- Hover background: very soft purple `rgba(117, 83, 255, 0.08)` or warm gray.

### Inputs

```css
height: 38px;
border: 1px solid #EAE4DC;
border-radius: 6px;
background: #FFFFFF;
color: #1C1814;
```

Focus:

```css
border-color: #7553FF;
box-shadow: 0 0 0 3px rgba(117, 83, 255, 0.18);
```

### Tables

- Header background: warm cream `#FAF9F7`.
- Row height: 48–56px.
- Use subtle beige dividers `#EAE4DC`.
- Use badges for status.
- Keep actions aligned right.
- Avoid overusing zebra stripes.

### Badges

Use soft backgrounds with colored text. See Semantic Color Soft Backgrounds table above.

### KPI Cards

KPI cards should be compact and calm.

Structure:
- Small icon capsule.
- Metric label.
- Main value.
- Trend chip.
- Optional tiny sparkline.

Do not make every KPI card visually equal. Prioritize the most important metric.

### Charts

Preferred colors:
- Primary purple: `#7553FF`
- Success green: `#15803D`
- Info blue: `#1D4ED8`
- Warning amber: `#B45309`
- Danger red: `#B91C1C`
- Neutral gray: `#7C7267`

Rules:
- Avoid rainbow palettes.
- Max 3 colors per chart.
- Use soft gridlines at 10% opacity.
- Tooltips should be card-like with soft shadow.
- Legends should be small and readable.

### Modals and Drawers

Modal:
- Radius: 6–8px.
- Padding: 24px.
- Shadow: dropdown shadow.

Drawer:
- Width: 420–560px.
- Use sticky footer actions.
- Forms should be grouped into sections.

---

## 7. Icons

Preferred icon style:
- Outline icons.
- Rounded stroke caps.
- 1.5–2px stroke.
- Hugeicons, Tabler Icons, or Feather-like icons.

Do not mix filled, duotone, and outline icons in the same navigation.

Icon containers:

```css
width: 38px;
height: 38px;
border-radius: 8px;
background: rgba(117, 83, 255, 0.12);
color: #7553FF;
```

---

## 8. Motion

Motion should be functional and subtle.

- Hover lift: `translateY(-1px)`.
- Dropdown fade + scale: 120–160ms.
- Drawer slide: 180–240ms.
- Skeleton shimmer for loading.
- Avoid bouncy cartoon motion.

Use easing:

```css
cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 9. Do / Don't

### Do
- Use soft purple as a consistent accent.
- Keep layout modular.
- Use clear information hierarchy.
- Use soft shadows and beige borders.
- Keep dashboard cards purposeful.
- Use light/dark mode tokens.
- Use outline rounded icons.

### Don't
- Do not create generic admin-template clutter.
- Do not overuse KPI cards.
- Do not use loud gradients everywhere.
- Do not use thick black borders.
- Do not mix too many chart colors.
- Do not make all surfaces pure white on pure white.
- Do not over-nest cards inside cards.

---

## 10. AI Agent Instructions

When generating UI from this DESIGN.md:

1. Follow the token values exactly unless the user overrides them.
2. Use Vuexy-inspired admin dashboard structure.
3. Keep the interface clean, soft, modern, and SaaS-ready.
4. Use primary purple `#7553FF` for active states and main actions.
5. Prefer card-based layouts with 8px radius and soft shadows.
6. Avoid generic AI dashboard clutter.
7. Use Hugeicons-style outline icons when possible.
8. For KPI dashboards, create hierarchy instead of equal card soup.
9. Support both light and dark mode.
10. Ensure all components feel like one system.

---

## 11. Tailwind Mapping

```js
colors: {
  primary: '#7553FF',
  'primary-hover': '#623EE2',
  'primary-soft': '#F0ECFF',
  success: '#15803D',
  info: '#1D4ED8',
  warning: '#B45309',
  danger: '#B91C1C',
  canvas: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#1C1814',
  secondary: '#5C534C',
  muted: '#7C7267',
  border: '#EAE4DC',
  'border-soft': '#DCD2C7',
},
borderRadius: {
  xs: '4px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '8px',   // Card radius — reduced to 8px
  '2xl': '8px',
  '3xl': '8px',
},
boxShadow: {
  card: '0 4px 18px rgba(75, 70, 92, 0.10)',
  'card-hover': '0 8px 28px rgba(75, 70, 92, 0.14)',
  dropdown: '0 6px 24px rgba(75, 70, 92, 0.18)',
  focus: '0 0 0 3px rgba(117, 83, 255, 0.18)',
}
```

---

## 12. Recent Layout & Navigation Updates (June 2026)

### 1. Cấu trúc và Bố cục mới của Leftmenu (Sidebar Layout)
- **Neo giữ Header & Footer**: Sidebar giờ đây được cấu trúc theo hệ thống cột Flex (`h-screen sticky top-0 flex flex-col justify-between`), đảm bảo thanh định hướng luôn bám sát màn hình khi cuộn nội dung chính bên phải.
- **Tối ưu hóa Spacing**: Cụm logo và điều hướng được điều chỉnh khoảng cách về sát nhau (`space-y-0`) để tạo cảm giác tinh gọn, liền mạch và chuyên nghiệp.
- **Điều chỉnh Padding & Height của Danh sách Menu**: Phần lòng điều hướng ở giữa (`nav`) được kéo dài tối đa để chiếm toàn bộ phần trống (`flex-1`) và cấu hình khoảng đệm padding trên / dưới đồng nhất là 20px (`py-5`) giúp mang lại độ thoáng tối ưu cho danh sách các đề mục.
- **Định vị Footer**: Khối thông tin cá nhân và thông báo luôn được đưa xuống cuối cùng một cách chắc chắn bằng việc phối hợp thuộc tính `mt-auto` và khả năng chống co giãn `shrink-0`.

### 2. Thiết kế mới cho Live Workspace Layout Preview (Menu Translator)
- **Bỏ viền ô cứng nhắc (Borderless Panels)**: Các ô thể hiện ngôn ngữ gốc và ngôn ngữ dịch đã được loại bỏ toàn bộ viền cứng bọc ngoài (`border-none`) để nâng cao độ tối giản.
- **Tối ưu khoảng đệm cục bộ**: Thiết lập khoảng đệm đồng nhất ở mức 12px (`p-[12px]`) cho cả hai vùng nội dung giúp nội dung văn bản hiển thị gọn gàng nhưng vẫn cực kỳ trực quan.
- **Đường ngăn cách dịu mắt (Subtle Divider Line)**: Sử dụng một đường phân tuyến thanh mảnh và có tông màu nhạt (`divide-[#1C1814]/10`) để chia đôi không gian màn hình gốc - bản dịch, giúp giữ nguyên độ tách biệt thông tin mà không làm rối mắt người dùng.

### 3. Cập nhật Thiết kế cho Tool Check-in (Kích thước chữ, Thống kê & Cấu trúc Modal)
- **Chuẩn hóa kích thước font chữ tối thiểu (Minimum Typography Limit)**: Trong toàn bộ bảng dữ liệu (Table), biểu mẫu chỉnh sửa (Form inputs), nhãn phụ (Secondary labels) và hộp thoại thông tin (Modals/Inspection cards) thuộc Tool Check-in, kích thước chữ nhỏ nhất phải đạt 14px (`text-[14px]` hoặc `text-sm`). Loại bỏ hoàn toàn các loại `text-xs`, `text-[11px]` và `text-[10px]` để nâng cao khả năng tiếp cận nhanh cho người quản lý. Đồng thời nâng cấp các biểu tượng chỉ hướng đại diện (như `MapPin`) từ `w-3` lên kích thước tối thiểu `w-3.5` hoặc `w-[14px]` để tối ưu hóa sự cân bằng về mặt thị giác.
- **Tinh chỉnh trọng số chữ của khối Thống kê (Metrics & KPI Cards Weight)**: Chuyển đổi nhãn của các thẻ KPI tổng quan (như "Checked In Now", "Expected Today") từ `font-bold` (700) sang `font-medium` (500) nhằm phân tách rõ ràng cấu trúc phân cấp thông tin trước các con số khối lượng lớn (`3xl font-extrabold`).
- **Làm sạch ngôn ngữ Modal & Nền tảng nhập liệu (Clean Boarding & Control Modals)**: Đường phân cách khối và viền trong Modal được định hướng sử dụng sắc xám nhẹ thanh khiết (`border-slate-100`) thay vì các tông viền mờ tối đè lực nặng lên tiêu cự. Toàn bộ các vùng nhận dạng đầu vào của biểu mẫu `<input>` và `<select>` duy trì hiển thị thông điệp văn bản sẫm sắc (`text-slate-800`), song hành với hệ thống đầu mục in hoa quy mô 14px quý phái.

### 4. Đồng bộ hóa Thiết kế Bảng (Table Style Synchronization)
- **Chuẩn hóa Header của Table (TableHeader Font & Color)**: Toàn bộ tiêu đề cột (`th`) trong các bảng dữ liệu phải đồng nhất sử dụng font chữ có chân cao cấp (`font-serif`), kích thước chữ chuẩn 14px (`text-[14px]`), độ đậm vừa phải (`font-medium`), màu xám sậm quy phái cứng cáp (`text-slate-800`), viết hoa in nổi kèm theo khoảng cách ký tự thoáng đạt (`uppercase tracking-widest`). Vùng tiêu đề được phủ một màu nền xám dịu nhẹ (`bg-slate-50/50`), phân cách với thân bảng bằng một đường kẻ ngang mảnh mờ tinh tế (`border-b border-slate-100`).
- **Thiết kế lại Thân Bảng & Font chữ (Table Body Typography)**: Toàn bộ thông tin dòng nội dung (`td`) áp dụng font chữ không chân tinh tế Inter (`font-sans`), kích thước chữ chuẩn 14px (`text-[14px]`), sử dụng độ đậm thông thường (`font-normal`) thay cho chữ đậm làm tăng nặng thị giác (`font-bold`). Các dòng thông tin bổ sung phụ trợ (như phòng ban, thông tin chi tiết, thời gian khởi tạo) dùng sắc xám dịu mắt (`text-slate-450` hoặc tương đương) tạo dải phân cấp thanh thoát.
- **Tối giản hóa Nhãn Trạng thái (Flat Status Badges)**: Loại bỏ hoàn toàn kiểu nhãn dạng viên thuốc tròn dày đi kèm chấm tròn rườm rà. Thay vào đó, toàn bộ nhãn trạng thái sử dụng kiểu thiết kế phẳng (Flat Design) hình chữ nhật bo góc cực mảnh (`rounded-[2px]`), đi kèm viền ngoài tinh tế (`border border-{color}-100`) và nền màu cực nhạt (`bg-{color}-50`):
  - **Trạng thái Tích cực (Active / Approved / Confirmed)**: `bg-emerald-50 text-emerald-700 border-emerald-100` (In hoa: `ACTIVE`, `APPROVED`, `CONFIRMED`).
  - **Trạng thái Chờ duyệt (Pending)**: `bg-amber-50 text-amber-700 border-amber-100` (In hoa: `PENDING`).
  - **Trạng thái Bị hủy / Kết thúc (Rejected / Ended / Cancelled)**: `bg-rose-50 text-rose-700 border-rose-100` (In hoa: `REJECTED`, `ENDED`, `CANCELLED`).
- **Hiệu ứng rê chuột và Phân tách (Hover Interactions & Spacing)**: Sử dụng ngăn cách thanh mảnh giữa các dòng (`divide-y divide-slate-100`), đồng nhất padding dọc cho các ô dữ liệu (`py-4 px-4/px-5`), đi kèm hiệu ứng chuyển màu nền cực dịu khi di chuột qua (`hover:bg-slate-50/30 transition-all`). Các nút thao tác hành động phụ trợ (như Menu dấu ba chấm) sử dụng khung viền bo tinh gọn (`p-1.5 border border-slate-200 text-slate-450 hover:bg-slate-50 hover:border-slate-350 hover:text-slate-800 rounded-lg transition-all`).

### 5. Nhãn trạng thái Khả dụng của Nhân viên (Staff Availability Status Badges)
- **Kiểu dáng & Trọng số chữ**: Thay thế kiểu nhãn dạng viên thuốc bo góc toàn bộ (`rounded-full`) và chữ in đậm bằng thiết kế chữ thường/regular (`font-normal`) với kích thước chữ chuẩn 14px (`text-[14px]`) cùng bo góc vừa phải (`rounded-md` hoặc `rounded-[4px]`) để đồng nhất với hệ thống.
- **Quy chuẩn phối màu trạng thái khả dụng**:
  - **Sẵn sàng (Available)**: Sử dụng tông xanh lục bảo nhẹ nhàng (`bg-emerald-50 text-emerald-700 border border-emerald-100`).
  - **Sẵn sàng một phần (Partially available)**: Sử dụng tông hổ phách ấm áp (`bg-amber-50 text-amber-700 border border-amber-100`).
  - **Không sẵn sàng (Unavailable)**: Sử dụng tông đỏ hồng rõ ràng (`bg-rose-50 text-rose-700 border border-rose-100`).

### 6. Cải tiến và đồng bộ hóa hệ màu Slate cho Text và Icon (Slate Color System Upgrade to Slate-700)
- **Mục tiêu cải tiến**: Nâng cao tối đa độ tương phản hình ảnh (Visual Contrast Ratio) và tối ưu hóa trải nghiệm đọc (Readability/Accessibility) cho toàn bộ văn bản (text), nhãn mô tả phụ (sub-labels), và biểu tượng (icons) trên toàn hệ thống.
- **Quy chuẩn thay thế**: 
  - Toàn bộ các lớp màu văn bản và icon dùng sắc xám Slate thấp (bao gồm `text-slate-100`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-450`, `text-slate-500`) trong hệ thống được nâng cấp đồng loạt sang màu **`text-slate-700`**.
  - Việc loại bỏ các sắc xám mờ nhạt này giúp thông tin hiển thị đạt độ tương phản chuẩn WCAG AAA (> 7:1) trên nền sáng, mang lại giao diện sắc nét, chuyên nghiệp, dễ đọc và tinh tế tuyệt đối.
  - Các lớp nền (`bg-slate-X`) và viền (`border-slate-X`) dùng cho phân chia bố cục vẫn được giữ nguyên sắc xám nhạt để bảo toàn cấu trúc phân khu mềm mại của giao diện.


