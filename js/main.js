/**
 * VOLT STORE - RENDER SẢN PHẨM & LOGIC TRANG CHÍNH
 */

// Tạo HTML cho 1 Thẻ sản phẩm (Product Card)
function createProductCardHTML(p) {
  const hasDiscount = p.oldPrice && p.oldPrice > p.price;
  const discountPercent = hasDiscount ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

  return `
        <div class="product-card" onmouseover="showQuickDetail(this)" onmouseout="hideQuickDetail(this)">
            <div class="product-image-wrap">
                ${hasDiscount ? `<span class="badge-discount">-${discountPercent}%</span>` : ""}
                <img src="${p.image}" alt="${p.name}" onerror="handleImageError(this)">
                <div class="quick-detail-box">
                    <strong>Thông số:</strong> ${p.specs}<br>
                    <span>${p.description.substring(0, 50)}...</span>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price-box">
                    <span class="price-current">${formatCurrency(p.price)}</span>
                    ${hasDiscount ? `<span class="price-old">${formatCurrency(p.oldPrice)}</span>` : ""}
                </div>
                <div class="card-actions">
                    <a href="chi-tiet.html?id=${p.id}" class="btn">Xem chi tiết</a>
                    <button class="btn btn-primary" onclick="addToCart('${p.id}')">Thêm giỏ</button>
                </div>
            </div>
        </div>
    `;
}

// Hiệu ứng JavaScript onmouseover / onmouseout
function showQuickDetail(cardElement) {
  cardElement.style.borderColor = "var(--accent-color)";
}
function hideQuickDetail(cardElement) {
  cardElement.style.borderColor = "transparent";
}

// Render các Section ở Trang Chủ
function renderHomePage() {
  const newArrivalsGrid = document.getElementById("grid-moi");
  const bestSellersGrid = document.getElementById("grid-hot");
  const salesGrid = document.getElementById("grid-khuyen-mai");

  if (newArrivalsGrid) {
    const items = products.filter((p) => p.group === "moi").slice(0, 4);
    newArrivalsGrid.innerHTML = items.map(createProductCardHTML).join("");
  }

  if (bestSellersGrid) {
    const items = products.filter((p) => p.group === "hot").slice(0, 4);
    bestSellersGrid.innerHTML = items.map(createProductCardHTML).join("");
  }

  if (salesGrid) {
    const items = products.filter((p) => p.group === "khuyen-mai").slice(0, 4);
    salesGrid.innerHTML = items.map(createProductCardHTML).join("");
  }
}

// Render Trang Danh Mục (san-pham.html) có đọc URL ?cat=
function renderCategoryPage() {
  const gridEl = document.getElementById("category-product-grid");
  const titleEl = document.getElementById("category-title");
  const countEl = document.getElementById("product-count");
  const sortSelect = document.getElementById("sort-select");

  if (!gridEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("cat");
  const searchQuery = urlParams.get("search");

  let filteredList = [...products];

  // Lọc theo Category
  if (catParam) {
    filteredList = filteredList.filter((p) => p.category === catParam);
    const catMap = {
      "dien-thoai": "Điện Thoại",
      laptop: "Laptop",
      "am-thanh": "Âm Thanh",
      "phu-kien": "Phụ Kiện",
    };
    if (titleEl) titleEl.innerText = catMap[catParam] || "Sản Phẩm";
  } else if (searchQuery) {
    filteredList = filteredList.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (titleEl) titleEl.innerText = `Kết quả tìm kiếm: "${searchQuery}"`;
  } else {
    if (titleEl) titleEl.innerText = "Tất Cả Sản Phẩm";
  }

  // Cập nhật số lượng
  if (countEl) countEl.innerText = `(${filteredList.length} sản phẩm)`;

  // Xử lý Sắp xếp bằng sort()
  function applySortAndRender() {
    const sortVal = sortSelect ? sortSelect.value : "default";
    let sortedList = [...filteredList];

    if (sortVal === "price-asc") {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-desc") {
      sortedList.sort((a, b) => b.price - a.price);
    }

    gridEl.innerHTML = sortedList.map(createProductCardHTML).join("");
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", applySortAndRender);
  }

  applySortAndRender();
}

// Render Trang Chi Tiết (chi-tiet.html) có đọc URL ?id=
function renderDetailPage() {
  const detailContainer = document.getElementById("product-detail-container");
  const relatedGrid = document.getElementById("related-products-grid");

  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const product = products.find((p) => p.id === productId) || products[0];

  detailContainer.innerHTML = `
        <div class="product-detail-layout">
            <div class="detail-gallery">
                <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this)">
            </div>
            <div class="detail-info">
                <span class="category-tag">DANH MỤC: ${product.category.toUpperCase()}</span>
                <h1>${product.name}</h1>
                <div class="detail-price">${formatCurrency(product.price)}</div>
                <p class="detail-desc">${product.description}</p>
                <div class="detail-specs">
                    <strong>Thông số kỹ thuật chính:</strong><br>
                    ${product.specs}
                </div>
                <div class="quantity-control">
                    <span>Số lượng:</span>
                    <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
                    <input type="number" id="detail-qty" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
                </div>
                <button class="btn btn-primary" style="padding: 14px 28px; width: 100%;" onclick="addDetailToCart('${product.id}')">
                    THÊM VÀO GIỎ HÀNG
                </button>
            </div>
        </div>
    `;

  // Render sản phẩm liên quan (Cùng Category)
  if (relatedGrid) {
    const related = products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    relatedGrid.innerHTML = related.map(createProductCardHTML).join("");
  }
}

function adjustDetailQty(delta) {
  const input = document.getElementById("detail-qty");
  if (input) {
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    input.value = val;
  }
}

function addDetailToCart(productId) {
  const input = document.getElementById("detail-qty");
  const qty = input ? parseInt(input.value) : 1;
  addToCart(productId, qty);
}

// Render Trang Giỏ Hàng (gio-hang.html)
function renderCartPage() {
  const cartTableBody = document.getElementById("cart-table-body");
  const cartSummaryContainer = document.getElementById("cart-summary-box");
  const emptyCartMsg = document.getElementById("empty-cart-msg");
  const cartContent = document.getElementById("cart-content-wrapper");

  if (!cartTableBody) return;

  const cart = loadCart();

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyCartMsg) emptyCartMsg.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "block";
  if (emptyCartMsg) emptyCartMsg.style.display = "none";

  let totalMoney = 0;

  cartTableBody.innerHTML = cart
    .map((item) => {
      const subtotal = item.price * item.quantity;
      totalMoney += subtotal;

      return `
            <tr>
                <td style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.image}" width="60" style="border-radius: 6px;">
                    <strong>${item.name}</strong>
                </td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td><strong>${formatCurrency(subtotal)}</strong></td>
                <td>
                    <button class="btn" style="color: red; border-color: red;" onclick="removeFromCart('${item.id}')">Xoá</button>
                </td>
            </tr>
        `;
    })
    .join("");

  if (cartSummaryContainer) {
    cartSummaryContainer.innerHTML = `
            <h3>TỔNG CỘNG HÓA ĐƠN</h3>
            <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px;">
                <span>Tổng tiền:</span>
                <span style="color: var(--accent-color);">${formatCurrency(totalMoney)}</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-bottom: 10px;" onclick="alert('Đặt hàng thành công! VOLT sẽ liên hệ với bạn sớm nhất.')">TIẾN HÀNH THANH TOÁN</button>
            <button class="btn" style="width: 100%;" onclick="clearCart()">XOÁ TOÀN BỘ GIỎ HÀNG</button>
        `;
  }
}

// Xử lý Tìm kiếm chung ở Header
function setupHeaderSearch() {
  const searchForm = document.getElementById("header-search-form");
  const searchInput = document.getElementById("header-search-input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `san-pham.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

// Điều hướng khởi chạy hàm theo từng trang
document.addEventListener("DOMContentLoaded", () => {
  setupHeaderSearch();
  renderHomePage();
  renderCategoryPage();
  renderDetailPage();
  renderCartPage();
});
