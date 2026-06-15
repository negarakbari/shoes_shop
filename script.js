const splash = document.getElementById("splash");
    const app = document.getElementById("app");
    const slider = document.getElementById("slider");

    let current = 0;
    let isAnimating = false;

    setTimeout(() => {
      splash.style.opacity = "0";

      setTimeout(() => {
        splash.style.display = "none";
        app.classList.remove("hidden");
      }, 500);
    }, 2500);

    function goToSlide(index) {
      current = index;
      isAnimating = true;

      slider.scrollTo({
        left: current * window.innerWidth,
        behavior: "smooth"
      });

      setTimeout(() => {
        isAnimating = false;
      }, 700);
    }

    // اسکرول ماوس برای صفحه اول
    window.addEventListener("wheel", (e) => {
      if (isAnimating) return;

      // فقط وقتی روی صفحه اول هستیم
      if (current === 0 && e.deltaY > 30) {
        goToSlide(1);
      }

      // امکان برگشت با اسکرول بالا
      else if (current === 1 && e.deltaY < -30) {
        goToSlide(0);
      }
    });

    // سوایپ موبایل
    let startX = 0;
    let startY = 0;

    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    slider.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;

      let diffX = startX - endX;
      let diffY = startY - endY;

      const totalSlides = slider.children.length;

      // سوایپ افقی
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50 && current < totalSlides - 1) {
          goToSlide(current + 1);
        } else if (diffX < -50 && current > 0) {
          goToSlide(current - 1);
        }
      }
      // سوایپ عمودی فقط برای صفحه اول
      else {
        if (diffY > 50 && current === 0) {
          goToSlide(1);
        } else if (diffY < -50 && current === 1) {
          goToSlide(0);
        }
      }
    });




      const onboarding = document.getElementById("app");
const loginPage = document.getElementById("loginPage");
const loginBtn = document.getElementById("loginBtn");
const remember = document.getElementById("remember");
const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

window.addEventListener("DOMContentLoaded", () => {

  function checkInputs() {
    if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
      loginBtn.disabled = false;
      loginBtn.classList.remove("bg-gray-400");
      loginBtn.classList.add("bg-black");
    } else {
      loginBtn.disabled = true;
      loginBtn.classList.add("bg-gray-400");
      loginBtn.classList.remove("bg-black");
    }
  }

  emailInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);

  checkInputs(); 
});
function showLogin() {

    onboarding.classList.add("hidden");
    loginPage.classList.remove("hidden");

}


function togglePassword() {

    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {

        password.type = "text";

        eyeIcon.innerHTML = `
            <path d="m15 18-.722-3.25"></path>
            <path d="M2 8a10.645 10.645 0 0 0 20 0"></path>
            <path d="m20 15-1.726-2.05"></path>
            <path d="m4 15 1.726-2.05"></path>
            <path d="m9 18 .722-3.25"></path>
        `;

    } else {

        password.type = "password";

        eyeIcon.innerHTML = `
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;

    }
}
const API_URL = "https://6a2e61f2c9776ca6c0c48c19.mockapi.io/user";



document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) return;

  // ذخیره وضعیت لاگین
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);

  // رفتن به صفحه home
  window.location.href = "index.html";
});
