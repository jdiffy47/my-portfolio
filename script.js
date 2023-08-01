const nav = document.querySelector(".nav");
const navMenu = document.querySelector(".nav-items");
const slideInMenu = document.querySelector(".slide-in-menu");
const btnToggleNav = document.querySelector(".menu-btn");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");

const toggleNav = () => {
  // nav.classList.toggle("hidden");

  slideInMenu.classList.toggle("slide-in-show");

  // Prevent screen from scrolling when menu is opened
  document.body.classList.toggle("lock-screen");

  if (slideInMenu.classList.contains("slide-in-show")) {
    btnToggleNav.textContent = "close";
  } else {
    btnToggleNav.textContent = "menu";
  }
};

  // if (nav.classList.contains("hidden")) {
  //   btnToggleNav.textContent = "menu";
  // } else {
  //   // When menu is opened after transition change text respectively
  //   setTimeout(() => {
  //     btnToggleNav.textContent = "close";
  //   }, 475);
  // }

btnToggleNav.addEventListener("click", toggleNav);

navMenu.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    toggleNav();
  }
});

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && slideInMenu.classList.contains("slide-in-show")) {
    toggleNav();
  }
});

// document.body.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && !nav.classList.contains("hidden")) {
//     toggleNav();
//   }
// });

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});

// Shiny hover effect on cards that follows mouse

// const cards = document.querySelector(".cards");

// cards.addEventListener("mousemove", (e) => {
//   if (e.target.classList.contains("card")) {
//     const { x, y } = e.target.getBoundingClientRect();
//     e.target.style.setProperty("--x", `${e.clientX - x}px`);
//     e.target.style.setProperty("--y", `${e.clientY - y}px`);
//   }
// });

// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem("theme");

switchThemeEl.checked = storedTheme === "dark" || storedTheme === null;

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    switchThemeEl.checked = false;
  } else {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[data-focused="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});


const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = 'Work Inquiry';
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    const mailtoLink = `mailto:recipient@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  });
