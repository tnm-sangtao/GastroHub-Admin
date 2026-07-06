# Hướng Dẫn Nghiệp Vụ Luật Lao Động Đức Dành Cho Lập Trình Viên (German Labor Law Developer Reference)

Tài liệu này cung cấp các kiến thức nền tảng và ví dụ thuật toán cụ thể về luật lao động Đức áp dụng trong hệ thống **Tenohub**. Đội ngũ phát triển (Backend, Frontend, QA) sử dụng tài liệu này để đối chiếu khi viết code tính toán lương, quản lý ngày phép, và chấm công.

---

## 1. Quy Tắc Tính Ngày Phép Năm (Urlaubsberechnung)

Theo Luật Phép Liên bang Đức (**Bundesurlaubsgesetz - BUrlG**), mọi người lao động (kể cả nhân viên làm theo giờ, sinh viên làm thêm, Minijob) đều có quyền được hưởng **tối thiểu 4 tuần nghỉ phép có hưởng lương mỗi năm**.

### 1.1. Công thức tính hạn mức phép năm tối thiểu (Statutory Minimum Vacation)
Số ngày phép năm của một nhân sự phụ thuộc trực tiếp vào **số ngày làm việc thực tế trong tuần theo hợp đồng** (`workingDaysPerWeek`), không phụ thuộc vào số giờ làm việc trong ngày.

Công thức quy đổi chuẩn pháp định:
$$\text{Hạn mức phép năm tối thiểu} = \text{workingDaysPerWeek} \times 4$$

#### Các ví dụ thực tế cụ thể:
*   **Ví dụ A (Nhân viên Full-time / Part-time tiêu chuẩn - Làm 5 ngày/tuần):**
    *   Hạn mức tối thiểu: $5 \times 4 = 20$ ngày phép/năm.
    *   *Cách khấu trừ:* Khi nhân viên xin nghỉ phép 1 tuần (từ Thứ Hai đến Thứ Sáu), hệ thống trừ **5 ngày phép** của họ. Họ được nghỉ trọn vẹn 1 tuần và vẫn nhận đủ lương tuần đó.
*   **Ví dụ B (Nhân viên Minijob / Part-time làm ít ngày - Làm 2 ngày/tuần):**
    *   Hạn mức tối thiểu: $2 \times 4 = 8$ ngày phép/năm.
    *   *Cách khấu trừ:* Khi nhân viên này xin nghỉ phép 1 tuần, thực tế họ chỉ nghỉ đúng 2 ngày làm việc đã đăng ký trong tuần đó (ví dụ Thứ Bảy và Chủ Nhật). Hệ thống chỉ khấu trừ **2 ngày phép** của họ. Khi dùng hết 8 ngày phép, họ cũng đã được nghỉ trọn vẹn 4 tuần trong năm.
*   **Ví dụ C (Nhân viên làm 6 ngày/tuần):**
    *   Hạn mức tối thiểu: $6 \times 4 = 24$ ngày phép/năm. (Đây là mức sàn tối thiểu trong luật gốc của Đức vì luật cũ coi Thứ Bảy là ngày làm việc tiêu chuẩn).

> [!IMPORTANT]
> **Quy tắc thiết lập hệ thống:** 
> Khi Admin nhập `workingDaysPerWeek` trong Hồ sơ nhân viên, hệ thống tự động tính số ngày phép tối thiểu. Admin được phép sửa con số này tăng lên (ví dụ tăng lên 25, 30 ngày phép theo thỏa thuận hợp đồng tốt hơn), nhưng hệ thống **bắt buộc phải chặn** không cho phép lưu nếu giá trị nhập thấp hơn mức tối thiểu pháp định.

---

### 1.2. Thuật toán khấu trừ ngày phép khi nộp đơn (Leave Deduction Methods)
Hệ thống hỗ trợ cấu hình 2 cách trừ ngày phép để phù hợp với cách xếp ca linh hoạt của ngành dịch vụ:

*   **Cách 1: Khấu trừ theo ngày trực thực tế (Shift-based Deduction):**
    *   *Cách chạy:* Hệ thống đối chiếu khoảng thời gian xin nghỉ phép với lịch ca trực đã xếp trong module `Shift Planner`. Hệ thống chỉ trừ ngày phép đối với những ngày nhân viên thực tế có ca trực được gán.
    *   *Ví dụ:* Nhân viên xin nghỉ từ Thứ Hai đến Chủ Nhật. Lịch trực tuần đó của nhân viên chỉ có 3 ca (Thứ Hai, Thứ Tư, Thứ Sáu). Hệ thống chỉ trừ **3 ngày phép**.
*   **Cách 2: Khấu trừ theo ngày làm việc lịch chuẩn (Calendar-based Deduction):**
    *   *Cách chạy:* Hệ thống tự động trừ phép dựa theo số ngày làm việc tiêu chuẩn quy định trong hợp đồng mà không phụ thuộc vào lịch trực thực tế.
    *   *Ví dụ:* Nhân viên làm hợp đồng 5 ngày/tuần, xin nghỉ 1 tuần từ Thứ Hai đến Chủ Nhật. Hệ thống tự động trừ đúng **5 ngày phép** (từ Thứ Hai đến Thứ Sáu), bỏ qua lịch ca trực thực tế được xếp thế nào.

---

### 1.3. Quy tắc hết hạn ngày phép năm cũ (Rollover & Expiry)
*   **Thời hạn pháp định:** Ngày phép chưa sử dụng của năm cũ mặc định sẽ hết hạn vào ngày **31 tháng 3 của năm tiếp theo** (thay vì bị hủy ngay vào cuối năm 31/12).
*   **Cấu hình hệ thống:** Tại Brand Settings, hỗ trợ cấu hình:
    *   `allowVacationRollover` (Cho phép chuyển phép thừa sang năm sau): `Yes` / `No`.
    *   `vacationRolloverExpiryDate`: Mặc định là ngày **31/03** của năm mới.
    *   `vacationRolloverRemainderAction`: Khi đến mốc hết hạn (31/03), hệ thống tự động:
        *   `Expire`: Xóa bỏ số ngày phép cũ còn thừa (trừ về 0).
        *   `Convert to Flextime`: Quy đổi số ngày phép thừa sang giờ tích lũy công (FWHA / Gleitzeitkonto) với tỷ lệ **1 ngày phép = 8.0 giờ công**.

---

### 1.4. Quy tắc thời gian chờ 6 tháng (Wartezeit) & Thay đổi hợp đồng giữa chừng

Theo Luật Phép Liên bang Đức (Bundesurlaubsgesetz - BUrlG), cách tính tích lũy phép có sự khác biệt rất rõ ràng giữa nhân sự mới đi làm (dưới 6 tháng) và nhân sự đã làm lâu dài (từ tròn 6 tháng trở lên):

*   **Quy tắc tích lũy phép theo tháng (Dưới 6 tháng làm việc - Teilurlaub theo Điều 5 BUrlG):**
    *   Mỗi tháng làm việc trọn vẹn sẽ tích lũy được 1/12 tổng số ngày phép cả năm của hợp đồng đang chạy.
    *   **Hợp đồng làm 6 ngày/tuần (Hạn mức phép cả năm là 24 ngày):** Mỗi tháng làm việc trọn vẹn tích lũy được **2 ngày phép**.
    *   **Hợp đồng làm 5 ngày/tuần (Hạn mức phép cả năm là 20 ngày):** Mỗi tháng làm việc trọn vẹn tích lũy được **1,67 ngày phép**.
*   **Quy tắc nhận phép cả năm (Từ tròn 6 tháng trở lên - Wartezeit theo Điều 4 BUrlG):**
    *   Ngay khi làm việc tròn 6 tháng kể từ ngày vào làm (`entryDate`), hệ thống tự động cấp trọn gói toàn bộ số ngày phép khả dụng của cả năm hiện tại cho nhân viên sử dụng (không cần chờ tích lũy theo tháng). Từ năm thứ hai trở đi, toàn bộ phép năm sẽ tự động được cấp trọn gói vào ngày 1 tháng 1 hàng năm.
*   **Quy tắc đổi Hợp đồng lao động giữa chừng (Pro-rata Calculation):**
    *   Khi nhân viên đổi hợp đồng trong năm (ví dụ đổi số ngày làm việc/tuần), hệ thống tính lại tổng hạn mức phép cả năm dương lịch theo tỷ lệ số tháng chạy thực tế của từng hợp đồng. Nếu đổi giữa tháng, hệ thống chia tỷ lệ tích lũy của tháng đó theo số ngày thực tế chạy của mỗi hợp đồng trong tháng.
    *   Việc đổi hợp đồng không được kéo dài hay reset mốc thử việc ban đầu. Ngày kết thúc thử việc (`probationEndDate`) vẫn giữ nguyên tính từ ngày vào làm gốc (`entryDate`).

#### Ví dụ minh họa chi tiết:

*   **Ngày bắt đầu đi làm:** Ngày 01/01/2026.
*   **Ngày đổi hợp đồng:** Ngày **15/02/2026** (giữa tháng 2).
    *   *Hợp đồng cũ (từ 01/01 đến 14/02):* Làm 6 ngày/tuần (Hạn mức cả năm là **24 ngày**).
    *   *Hợp đồng mới (từ 15/02 đến 31/12):* Làm 5 ngày/tuần (Hạn mức cả năm là **20 ngày**).
*   **Thời điểm tròn 6 tháng (Hết thời gian chờ):** Ngày 30/06/2026.

Hệ thống sẽ tính toán số dư phép khả dụng qua từng tháng như sau:

##### Bước 1: Giai đoạn tích lũy theo từng tháng (Dưới 6 tháng làm việc)
*   **Tháng 1 (Tròn tháng chạy Hợp đồng cũ):**
    *   Tích lũy Tháng 1 (Hợp đồng 6 ngày/tuần): **2 ngày phép**.
    *   Số dư phép cuối Tháng 1: **2 ngày**.
*   **Tháng 2 (Tháng thay đổi hợp đồng vào ngày 15/02 - Tháng 2 có 28 ngày):**
    *   14 ngày đầu tháng (chạy HĐ cũ làm 6 ngày/tuần): **1 ngày phép**.
    *   14 ngày cuối tháng (chạy HĐ mới làm 5 ngày/tuần): **0,835 ngày phép**.
    *   Tích lũy riêng Tháng 2: **1,835 ngày phép**.
    *   Số dư phép lũy kế cuối Tháng 2: 2 ngày của tháng 1 cộng với 1 ngày và 0,835 ngày của tháng 2, tổng cộng là **3,835 ngày phép**.
*   **Tháng 3, 4, 5 (Tròn các tháng chạy Hợp đồng mới):**
    *   Tích lũy mỗi tháng (Hợp đồng làm 5 ngày/tuần): **1,67 ngày phép/tháng**.
    *   Tổng tích lũy 3 tháng này: **5,01 ngày phép**.
    *   Số dư phép lũy kế cuối Tháng 5: 3,835 ngày + 5,01 ngày = **8,845 ngày phép**.
*   **Tháng 6 (Tròn tháng chạy Hợp đồng mới):**
    *   Tích lũy Tháng 6 (Hợp đồng làm 5 ngày/tuần): **1,67 ngày phép**.
    *   Số dư phép lũy kế trước thời điểm nhảy vọt: 8,845 ngày + 1,67 ngày = **10,515 ngày phép**.

##### Bước 2: Thời điểm tròn 6 tháng làm việc (Ngày 30/06/2026)
Vào ngày này, nhân viên đã làm tròn 6 tháng. Hệ thống lập tức kích hoạt quy tắc "cấp phép cả năm" bằng cách tính tổng hạn mức phép thực tế của cả năm 2026 theo tỷ lệ thời gian chạy của mỗi hợp đồng:
1.  **Thời gian chạy HĐ cũ làm 6 ngày/tuần (01/01 đến 14/02):** Tròn 1,5 tháng.
    *   Hạn mức phép quy đổi: **3 ngày phép**.
2.  **Thời gian chạy HĐ mới làm 5 ngày/tuần (15/02 đến 31/12):** Tròn 10,5 tháng.
    *   Hạn mức phép quy đổi: **17,5 ngày phép**.
3.  **Tổng hạn mức phép thực tế của cả năm 2026:**
    *   Tổng phép cả năm = 3 ngày + 17,5 ngày = **20,5 ngày phép**.

**Kết quả trên phần mềm:** Vào ngày 01/07/2026 (ngày đầu tiên sau mốc 6 tháng), số ngày phép khả dụng của nhân viên này trên hệ thống sẽ tự động được cập nhật nhảy vọt lên con số **20,5 ngày phép** (trừ đi số ngày thực tế họ đã nghỉ phép trước đó nếu có).

---

## 2. Thời Gian Thử Việc (Probezeit)

Theo luật Đức, thời gian thử việc thường kéo dài từ 3 đến tối đa 6 tháng.
*   **Tích lũy phép:** Trong thời gian thử việc, nhân sự vẫn tích lũy ngày phép bình thường hằng tháng (ví dụ: hợp đồng 20 ngày phép/năm thì mỗi tháng tích lũy được $20 / 12 = 1.67$ ngày phép).
*   **Chặn sử dụng phép:** Nhân viên **không được phép nghỉ phép năm** trong thời gian thử việc.
*   **Logic phần mềm:**
    *   Chặn tài khoản có vai trò `Employee` tự tạo đơn xin nghỉ phép năm (`Annual Leave`) trên Staff Portal nếu ngày hiện tại nhỏ hơn ngày kết thúc thử việc (`probationEndDate`).
    *   Hệ thống tự động mở khóa tính năng nộp đơn phép khi ngày hiện tại vượt qua `probationEndDate`.
    *   Admin vẫn có quyền tạo đơn và duyệt phép đặc cách thủ công cho nhân viên thử việc từ trang quản trị (Admin Portal).

---

## 3. Quy Tắc Báo Ốm (Krankmeldung) & Trả Lương Nghỉ Ốm

Nhân viên nghỉ ốm ở Đức được bảo vệ rất kỹ, tuy nhiên có một quy tắc đặc thù trong tháng đầu tiên đi làm:

### 3.1. Quy tắc 4 tuần đầu tiên của hợp đồng (First 4-Weeks Rule)
*   **Quy định của luật:** Trong **4 tuần đầu tiên kể từ ngày bắt đầu vào làm** (`entryDate`), nếu nhân viên bị ốm, chủ doanh nghiệp **không có nghĩa vụ trả lương** cho những ngày nghỉ ốm này (theo Luật Tiếp tục chi trả lương - *Entgeltfortzahlung im Krankheitsfall*). Tiền lương những ngày này sẽ do Quỹ Bảo hiểm Y tế của nhân viên chi trả trực tiếp cho họ (gọi là *Krankengeld*).
*   **Sau 4 tuần đầu:** Nếu nhân viên bị ốm và có giấy chứng nhận của bác sĩ (Sick Leave Certificate), chủ doanh nghiệp bắt buộc phải trả 100% lương bình thường cho tối đa **6 tuần nghỉ ốm liên tục**.

### 3.2. Logic phần mềm trong phân hệ tính lương (Payroll):
*   Khi nhân viên nghỉ ốm và có đơn `Sick Leave` được duyệt:
    *   Hệ thống kiểm tra: Nếu ngày nghỉ ốm nằm trong khoảng **28 ngày đầu tiên** kể từ ngày vào làm (`entryDate`), hệ thống mặc định hạch toán các ngày này vào trạng thái **Nghỉ ốm không lương từ doanh nghiệp** (Unpaid Sick Leave).
    *   Nếu ngày nghỉ ốm nằm sau 28 ngày đầu, hệ thống tính lương bình thường (Paid Sick Leave).
    *   Admin có quyền can thiệp chọn trả lương thủ công (Override) cho nhân viên trong 4 tuần đầu nếu muốn.

---

## 4. Quản Lý Tiền Tips (Tiền Boa) & Đối Soát Thuế

Tiền tips nhận từ khách hàng tại Đức có quy định thuế rất đặc thù:
*   **Tính chất thuế:** Tiền tips được khách hàng tự nguyện tặng trực tiếp cho nhân viên là **hoàn toàn miễn thuế thu nhập cá nhân** đối với nhân viên và **không tính vào doanh thu đóng thuế** của doanh nghiệp.
*   **Tiền tips trả qua thẻ (Card Tips):** Khi khách quẹt thẻ và nhập thêm tiền tips, số tiền này sẽ chạy vào tài khoản ngân hàng của nhà hàng. Khi doanh nghiệp trả lại tiền tips này cho nhân viên (chia cuối ngày hoặc cộng vào bảng lương):
    *   Để chứng minh với cơ quan thuế Đức (**Finanzamt**) rằng số tiền này là tiền tips thẻ chuyển trả hoàn toàn cho nhân viên (chứ không phải doanh nghiệp giữ lại làm doanh thu), doanh nghiệp bắt buộc phải lưu giữ **Bản ký nhận tiền Tips (Tips Signing Sheet)**.
    *   Bản ký nhận này ghi rõ: Mã NV, Tên NV, Số tiền tips thực tế được chia, Ngày nhận, và Chữ ký của nhân viên.
*   **Logic phần mềm:** Phân hệ `Payroll` phải hỗ trợ nút bấm xuất tệp PDF/in biểu mẫu **Tips Signing Sheet** chứa đầy đủ danh sách nhân viên đã được chia tips trong tháng từ sổ cái báo cáo thuế (Tax Ledger) để in ra cho nhân viên ký tên xác nhận vật lý.

---

## 5. Khống Chế Trần Lương Minijob

Hợp đồng Minijob tại Đức (còn gọi là việc làm thu nhập thấp) có giới hạn nghiêm ngặt về lương và giờ làm việc:
*   **Mức trần thu nhập:** Cấu hình mặc định tại Đức hiện tại là **603,00 € / tháng**. Nếu vượt quá mốc này dù chỉ 1 cent, hợp đồng sẽ tự động bị chuyển sang nhóm đóng bảo hiểm xã hội thông thường (Midijob/Full-time) và doanh nghiệp sẽ bị phạt nặng hồi tố.
*   **Logic tính toán co giờ (Hour Capping) trong Payroll:**
    *   Hệ thống sử dụng tham số `lowIncomeThreshold` (mức trần Minijob) được cấu hình tại cấu hình HR & Payroll của Brand Settings.
    *   Khi tính toán lương cho nhân sự Minijob, hệ thống chạy thuật toán tự động co giờ làm việc báo cáo thuế:
        $$\text{Số giờ báo cáo tối đa} = \frac{\text{Mức trần Minijob (ví dụ: 603,00 €)}}{\text{Lương giờ hợp đồng}}$$
    *   Toàn bộ số giờ làm việc thực tế vượt quá mức này sẽ được hệ thống tự động bóc tách sang sổ cái nội bộ (Internal Ledger) để chi trả riêng dưới dạng tiền mặt hoặc chuyển đổi sang giờ tích lũy (Flextime/Gleitzeitkonto), đảm bảo sổ cái báo cáo thuế (Tax Ledger) luôn hiển thị tổng lương $\le 603,00$ €.
