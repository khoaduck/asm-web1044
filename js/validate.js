/**
 * VOLT STORE - KIỂM TRA FORM THUẦN JAVASCRIPT
 */

// Hàm kiểm tra Email bằng Regex
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Hàm kiểm tra SĐT Việt Nam (10 số, bắt đầu bằng số 0)
function isValidVNPhone(phone) {
  const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return re.test(phone);
}

// Xử lý kiểm tra từng ô Input
function validateField(inputElement, rules) {
  const formGroup = inputElement.closest(".form-group");
  const errorElement = formGroup ? formGroup.querySelector(".error-message") : null;
  let errorMessage = "";

  const value = inputElement.value.trim();

  if (rules.required && value === "") {
    errorMessage = "Vui lòng không để trống trường này.";
  } else if (rules.minLen && value.length < rules.minLen) {
    errorMessage = `Tối thiểu phải có ${rules.minLen} ký tự.`;
  } else if (rules.isEmail && !isValidEmail(value)) {
    errorMessage = "Email không đúng định dạng (VD: example@gmail.com).";
  } else if (rules.isPhone && !isValidVNPhone(value)) {
    errorMessage = "Số điện thoại Việt Nam không hợp lệ (10 số, bắt đầu bằng 0).";
  }

  if (errorMessage) {
    if (formGroup) formGroup.classList.add("has-error");
    inputElement.classList.add("input-error");
    inputElement.classList.remove("input-success");
    if (errorElement) errorElement.innerText = errorMessage;
    return false;
  } else {
    if (formGroup) formGroup.classList.remove("has-error");
    inputElement.classList.remove("input-error");
    inputElement.classList.add("input-success");
    if (errorElement) errorElement.innerText = "";
    return true;
  }
}

// Gắn validation cho Form Liên hệ
function setupContactValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  const fields = [
    { id: "fullname", rules: { required: true, minLen: 2 } },
    { id: "email", rules: { required: true, isEmail: true } },
    { id: "phone", rules: { required: true, isPhone: true } },
    { id: "message", rules: { required: true, minLen: 10 } },
  ];

  // Bắt sự kiện blur (rời khỏi ô nhập)
  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    if (input) {
      input.addEventListener("blur", () => validateField(input, field.rules));
    }
  });

  // Bắt sự kiện submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (input) {
        const fieldValid = validateField(input, field.rules);
        if (!fieldValid) isValid = false;
      }
    });

    if (isValid) {
      showToast("Gửi thông tin liên hệ thành công!");
      form.reset();
      document
        .querySelectorAll(".form-control")
        .forEach((el) => el.classList.remove("input-success"));
    }
  });
}
