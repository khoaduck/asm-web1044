/**
 * VOLT STORE - QUẢN LÝ GIỎ HÀNG (Cart & LocalStorage)
 */

const CART_STORAGE_KEY = "VOLT_SHOP_CART";

// Lấy danh sách giỏ hàng từ LocalStorage
function loadCart() {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Lưu giỏ hàng vào LocalStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(productId, quantity = 1) {
  const cart = loadCart();
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const existingIndex = cart.findIndex((item) => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCart(cart);
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// Xoá sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
  let cart = loadCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  if (typeof renderCartPage === "function") renderCartPage();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(productId, newQty) {
  if (newQty < 1) return;
  const cart = loadCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = parseInt(newQty);
    saveCart(cart);
    if (typeof renderCartPage === "function") renderCartPage();
  }
}

// Xoá toàn bộ giỏ hàng
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadge();
  if (typeof renderCartPage === "function") renderCartPage();
}

// Cập nhật số lượng trên Icon Giỏ hàng ở Header
function updateCartBadge() {
  const cart = loadCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll(".cart-badge");
  badgeElements.forEach((badge) => {
    badge.innerText = totalCount;
  });
}

// Hiển thị thông báo Toast
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Khởi tạo badge ngay khi load trang
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
