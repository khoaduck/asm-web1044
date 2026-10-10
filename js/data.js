// js/data.js

// 1. Hàm xử lý khi ảnh bị lỗi (Fallback Image)
function handleImageError(imageElement) {
  imageElement.onerror = null; // Ngăn lặp vô tận nếu ảnh thay thế bị lỗi
  imageElement.src = "https://placehold.co/600x600/111827/ffffff?text=VOLT+STORE";
}
window.handleImageError = handleImageError;

// 2. Hàm định dạng tiền tệ
function formatCurrency(amount) {
  if (typeof amount !== "number") return "0đ";
  return amount.toLocaleString("vi-VN") + "đ";
}

// 3. Mảng 18 sản phẩm đầy đủ của VOLT Store
const products = [
  // --- ĐIỆN THOẠI (6 sản phẩm) ---
  {
    id: "sp01",
    name: "Google Pixel 8 Pro",
    price: 22990000,
    oldPrice: 24990000,
    category: "dien-thoai",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    description: "Smartphone flagship sở hữu camera AI tiên tiến và hệ điều hành mượt mà nhất.",
    specs: "RAM 12GB, ROM 128GB, Màn hình 6.7 inch OLED 120Hz",
  },
  {
    id: "sp02",
    name: "iPhone 15 Pro Max",
    price: 29990000,
    oldPrice: 32990000,
    category: "dien-thoai",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop",
    description: "Khung vỏ Titan siêu nhẹ, chip A17 Pro cùng nút Action Button hoàn toàn mới.",
    specs: "RAM 8GB, ROM 256GB, Camera zoom quang 5x",
  },
  {
    id: "sp03",
    name: "Samsung Galaxy S24 Ultra",
    price: 27990000,
    oldPrice: 31990000,
    category: "dien-thoai",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop",
    description: "Quyền năng Galaxy AI đỉnh cao, tích hợp bút S-Pen tiện lợi cho công việc.",
    specs: "RAM 12GB, ROM 256GB, Snap 8 Gen 3 for Galaxy",
  },
  {
    id: "sp04",
    name: "Xiaomi 14 Ultra",
    price: 24990000,
    oldPrice: 27990000,
    category: "dien-thoai",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop",
    description: "Ống kính Leica thế hệ mới cho chất lượng ảnh chụp chuẩn điện ảnh.",
    specs: "RAM 16GB, ROM 512GB, Cảm biến 1-inch Leica",
  },
  {
    id: "sp05",
    name: "ASUS ROG Phone 8 Pro",
    price: 26490000,
    oldPrice: 28990000,
    category: "dien-thoai",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop",
    description: "Quái vật gaming với tản nhiệt cải tiến và màn hình tần số quét siêu cao.",
    specs: "RAM 16GB, ROM 512GB, Màn hình 165Hz AMOLED",
  },
  {
    id: "sp06",
    name: "iPhone 13 128GB",
    price: 13990000,
    oldPrice: 16990000,
    category: "dien-thoai",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop",
    description: "Lựa chọn điện thoại hiệu năng tốt, giá cả hợp lý với thiết kế bền bỉ.",
    specs: "RAM 4GB, ROM 128GB, Chip A15 Bionic",
  },

  // --- LAPTOP (5 sản phẩm) ---
  {
    id: "sp07",
    name: "MacBook Pro 14 M3 Pro",
    price: 39990000,
    oldPrice: 42990000,
    category: "laptop",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    description: "Máy trạm di động hiệu năng vô địch với màn hình Liquid Retina XDR tuyệt đẹp.",
    specs: "Chip M3 Pro, RAM 18GB, SSD 512GB, Màn 14.2 inch",
  },
  {
    id: "sp08",
    name: "Dell XPS 13 Plus",
    price: 35990000,
    oldPrice: 38990000,
    category: "laptop",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop",
    description: "Thiết kế tương lai với bàn phím tràn viền và hàng phím cảm ứng hiện đại.",
    specs: "Intel Core i7 Gen 13, RAM 16GB, SSD 1TB, Màn 3.5K OLED",
  },
  {
    id: "sp09",
    name: "ASUS ROG Zephyrus G14",
    price: 32990000,
    oldPrice: 36990000,
    category: "laptop",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop",
    description: "Laptop gaming mỏng nhẹ bậc nhất kết hợp màn hình OLED chuẩn màu đồ họa.",
    specs: "Ryzen 9 8945HS, RTX 4060, RAM 16GB, SSD 1TB",
  },
  {
    id: "sp10",
    name: "Lenovo ThinkPad X1 Carbon G11",
    price: 38490000,
    oldPrice: 41990000,
    category: "laptop",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop",
    description: "Biểu tượng laptop doanh nhân với độ bền chuẩn quân đội và bàn phím gõ êm.",
    specs: "Intel Core i7 1355U, RAM 32GB, SSD 1TB, Màn 14 inch",
  },
  {
    id: "sp11",
    name: "MacBook Air 13 M2",
    price: 24990000,
    oldPrice: 27990000,
    category: "laptop",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop",
    description: "Mỏng nhẹ tinh tế, thời lượng pin cả ngày đáp ứng mọi nhu cầu học tập, làm việc.",
    specs: "Chip M2, RAM 8GB, SSD 256GB, Màn Retina 13.6 inch",
  },

  // --- ÂM THANH (4 sản phẩm) ---
  {
    id: "sp12",
    name: "Tai nghe Sony WH-1000XM5",
    price: 8490000,
    oldPrice: 9490000,
    category: "am-thanh",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    description: "Công nghệ chống ồn ANC hàng đầu thế giới cho không gian âm nhạc trọn vẹn.",
    specs: "Thời lượng pin 30h, Bluetooth 5.2, Micro đàm thoại rõ nét",
  },
  {
    id: "sp13",
    name: "Apple AirPods Pro 2 USB-C",
    price: 5890000,
    oldPrice: 6490000,
    category: "am-thanh",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop",
    description: "Chống ồn chủ động gấp 2 lần cùng cổng sạc USB-C đồng bộ tiện lợi.",
    specs: "Chip H2, Kháng nước IP54, Thời lượng pin tới 30h",
  },
  {
    id: "sp14",
    name: "Loa Bluetooth JBL Charge 5",
    price: 3690000,
    oldPrice: 4290000,
    category: "am-thanh",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop",
    description: "Âm thanh JBL Original Pro mạnh mẽ, chống nước chống bụi IP67 siêu bền.",
    specs: "Công suất 40W, Pin 20h, Hỗ trợ sạc ngược cho thiết bị khác",
  },
  {
    id: "sp15",
    name: "Tai nghe Marshall Major IV",
    price: 3290000,
    oldPrice: 3890000,
    category: "am-thanh",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop",
    description: "Thiết kế cổ điển đặc trưng Marshall cùng khả năng chơi nhạc liên tục 80 giờ.",
    specs: "Pin 80+ giờ, Sạc không dây, Núm điều khiển đa năng",
  },

  // --- PHỤ KIỆN (3 sản phẩm) ---
  {
    id: "sp16",
    name: "Bàn phím cơ Keychron K2 V2",
    price: 1950000,
    oldPrice: 2300000,
    category: "phu-kien",
    group: "hot",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    description: "Bàn phím cơ không dây kết nối đa thiết bị, tương thích hoàn hảo Mac và Windows.",
    specs: "Layout 75%, Gateron Switch, Đèn LED RGB, Pin 4000mAh",
  },
  {
    id: "sp17",
    name: "Chuột Logitech MX Master 3S",
    price: 2490000,
    oldPrice: 2890000,
    category: "phu-kien",
    group: "moi",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    description: "Chuột công thái học cao cấp nhất cho công việc với con lăn MagSpeed siêu tốc.",
    specs: "Cảm biến 8000 DPI, Click chống ồn, Kết nối 3 thiết bị",
  },
  {
    id: "sp18",
    name: "Sạc dự phòng Anker 20000mAh 87W",
    price: 1290000,
    oldPrice: 1590000,
    category: "phu-kien",
    group: "khuyen-mai",
    image:
      "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?q=80&w=600&auto=format&fit=crop",
    description: "Dung lượng lớn sạc nhanh đồng thời cho cả Laptop và Điện thoại.",
    specs: "Công suất 87W, Cổng Type-C Power Delivery, Cáp đính kèm",
  },
];
