// --- Dark/Light Mode Toggle ---
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  document.getElementById("theme-icon").innerText = isDark ? "☀️" : "🌙";
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuBtn.classList.toggle("active"); // This triggers the X animation

  // Check if it's working in console
  console.log("Menu toggled: ", mobileMenu.classList.contains("active"));
});

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll("section, .glass-card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

// 1. Navbar Scroll Effect
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 2. Smooth Scroll Logic
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if it's open
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        document.getElementById("menu-btn").classList.remove("active");
      }

      // Smooth glide to section
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for sticky nav
        behavior: "smooth",
      });
    }
  });
});

// 3. Simple Magnetic Effect for Links
const links = document.querySelectorAll(".nav-link");
links.forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = link;
    const moveX = (x / width - 0.5) * 8;
    const moveY = (y / height - 0.5) * 8;
    link.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  link.addEventListener("mouseleave", () => {
    link.style.transform = `translate(0, 0)`;
  });
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// --- Three.js Background ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const particlesGeom = new THREE.BufferGeometry();
const count = 2000;
const posArray = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
const material = new THREE.PointsMaterial({
  size: 0.005,
  color: 0x6366f1,
});
const mesh = new THREE.Points(particlesGeom, material);
scene.add(mesh);
camera.position.z = 3;

document.addEventListener("mousemove", (e) => {
  mesh.rotation.y = e.clientX * 0.0001;
  mesh.rotation.x = e.clientY * 0.0001;
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.001;
  renderer.render(scene, camera);
}
animate();

// --- EmailJS Integration ---
(function () {
  emailjs.init("CC9QNsBNn3LM1uDw4");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // تغيير نص الزر ليشعر المستخدم أن الإرسال جارٍ
    const btn = this.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;

    emailjs
      .sendForm("service_7j5aynj", "template_xcgysm9", this)
      .then(() => {
        alert("تم إرسال رسالتك بنجاح! سأقوم بالرد عليك قريباً.");
        this.reset(); // مسح البيانات من الفورم بعد الإرسال
      })
      .catch((err) => {
        alert("حدث خطأ ما، يرجى المحاولة لاحقاً: " + JSON.stringify(err));
      })
      .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      });
  });

$(document).ready(function () {
  // 1. Initialize 3D Space Background (VANTA)
  VANTA.NET({
    el: "#vanta-canvas",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 100.0,
    minWidth: 100.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3b82f6,
    backgroundColor: 0x0f172a,
    points: 12.0,
    maxDistance: 22.0,
    spacing: 16.0,
  });

  // 2. Skill Data
  const skills = [
    // --- Original 6 Fixed ---
    {
      name: "Laravel",
      icon: "fab fa-laravel",
      color: "text-red-600",
      level: 95,
    },
    { name: "PHP", icon: "fab fa-php", color: "text-indigo-400", level: 90 },
    {
      name: "MySQL",
      icon: "fas fa-database",
      color: "text-blue-500",
      level: 85,
    },
    {
      name: "Tailwind CSS",
      icon: "fab fa-css3-alt",
      color: "text-cyan-400",
      level: 95,
    },
    {
      name: "React JS",
      icon: "fab fa-react",
      color: "text-sky-400",
      level: 80,
    },
    {
      name: "RESTful API",
      icon: "fas fa-cloud",
      color: "text-orange-400",
      level: 90,
    },

    {
      name: "Docker",
      icon: "fab fa-docker",
      color: "text-blue-600",
      level: 75,
    },
    {
      name: "Git / GitHub",
      icon: "fab fa-github",
      color: "text-slate-300",
      level: 90,
    },
    {
      name: "Postman",
      icon: "fas fa-rocket",
      color: "text-orange-500",
      level: 88,
    },
  ];

  // 3. Inject Cards with jQuery
  const grid = $("#skills-grid");
  skills.forEach((skill) => {
    grid.append(`
      <div class="skill-card p-8 group cursor-pointer" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-glare="true" data-tilt-max-glare="0.3">
        <div class="flex justify-between items-start mb-6">
          <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
            <i class="${skill.icon} ${skill.color} text-3xl neon-icon"></i>
          </div>
          <span class="text-white/30 font-mono text-sm">${skill.level}%</span>
        </div>
        
        <h3 class="text-xl font-bold text-white mb-4 tracking-wide">${skill.name}</h3>
        
        <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" 
               style="width: ${skill.level}%"></div>
        </div>
      </div>
    `);
  });

  // 4. Initialize Tilt on the new elements
  VanillaTilt.init(document.querySelectorAll(".skill-card"));
});

$(document).ready(function () {
  // Initialize Vanta Fog or Rings for a subtle 3D depth
  VANTA.RINGS({
    el: "#footer-3d-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x3b82f6, // Blue glow
    backgroundColor: 0x0f172a, // Dark navy
  });

  // jQuery Animation for the 'Start Project' Button
  $("button")
    .on("mouseenter", function () {
      $(this).animate({ letterSpacing: "2px" }, 200);
    })
    .on("mouseleave", function () {
      $(this).animate({ letterSpacing: "0px" }, 200);
    });
});
