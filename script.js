// Scroll shadow
if (!sessionStorage.getItem("soybean_user")) {
  window.location.href = "login.html";
}

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  }
});

// Dynamic active link
const navLinks = document.querySelectorAll(".navbar .nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    const offcanvas = document.querySelector("#mobileMenu");
    if (offcanvas && offcanvas.classList.contains("show")) {
      bootstrap.Offcanvas.getInstance(offcanvas).hide();
    }
  });
});

// Growth Stage Chart
document.addEventListener("DOMContentLoaded", function () {
  const growthCtx = document.getElementById("growthChart");
  if (growthCtx) {
    const growthChart = new Chart(growthCtx, {
      type: "pie",
      data: {
        labels: [
          "Seedling",
          "Vegetative",
          "Flowering",
          "Pod Formation",
          "Maturity",
        ],
        datasets: [
          {
            data: [15, 25, 30, 20, 10],
            backgroundColor: [
              "#28a745",
              "#20c997",
              "#17a2b8",
              "#ffc107",
              "#fd7e14",
            ],
            borderColor: [
              "#1e7e34",
              "#1aa179",
              "#117a8b",
              "#d39e00",
              "#e06200",
            ],
            borderWidth: 3,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 13 },
            padding: 12,
            cornerRadius: 10,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value}% (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1500,
          easing: "easeOutQuart",
        },
      },
    });
  }
});

// Chatbot elements - MOVED INSIDE DOMContentLoaded with null checks
document.addEventListener("DOMContentLoaded", function () {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotInput = document.getElementById("chatbotInput");
  const sendBtn = document.getElementById("sendBtn");

  // Toggle chatbot - with null checks
  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.onclick = () => {
      chatbotWindow.classList.toggle("active");
    };
  }

  if (chatbotClose && chatbotWindow) {
    chatbotClose.onclick = () => {
      chatbotWindow.classList.remove("active");
    };
  }

  // Send message - with null checks
  if (sendBtn) {
    sendBtn.onclick = sendMessage;
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  function sendMessage() {
    if (!chatbotInput) return;
    let message = chatbotInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    chatbotInput.value = "";

    setTimeout(() => {
      let reply = getBotResponse(message);
      addMessage(reply, "bot");
    }, 1000);
  }

  function addMessage(text, sender) {
    if (!chatbotMessages) return;
    let messageDiv = document.createElement("div");
    messageDiv.className = "message " + sender + "-message";
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Quick questions - with null checks
  document.querySelectorAll(".quick-question-btn").forEach((btn) => {
    btn.onclick = () => {
      sendQuick(btn.dataset.question);
    };
  });

  function sendQuick(q) {
    addMessage(q, "user");
    setTimeout(() => {
      addMessage(getBotResponse(q), "bot");
    }, 1000);
  }

  function getBotResponse(message) {
    message = message.toLowerCase();
    if (message.includes("disease"))
      return "Soybean diseases include rust, bacterial blight and leaf spot. Proper monitoring helps early detection.";
    if (message.includes("phenotyping"))
      return "Phenotyping studies plant traits like height, leaf color and disease symptoms to improve soybean varieties.";
    if (message.includes("growth"))
      return "Soybean growth improves with proper sunlight, irrigation, and nutrient rich soil.";
    if (message.includes("yield"))
      return "High soybean yield depends on healthy plants, disease control and good soil management.";
    return "I can help with soybean diseases, phenotyping, growth and yield prediction.";
  }
});

// Scroll to Top Button - MOVED INSIDE DOMContentLoaded with null checks
document.addEventListener("DOMContentLoaded", function () {
  // Add scroll to top button to HTML
  const scrollBtnHTML = `
    <button class="scroll-to-top">
        <i class="fas fa-arrow-up"></i>
    </button>
  `;
  document.body.insertAdjacentHTML("beforeend", scrollBtnHTML);

  const scrollBtn = document.querySelector(".scroll-to-top");

  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    });

    scrollBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

// Parallax scroll effect for header
window.addEventListener("scroll", function () {
  const header = document.getElementById("pageHeader");
  if (header) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    header.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for fade-in animation
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const header = document.getElementById("pageHeader");
  if (header) {
    observer.observe(header);
  }
});

// Smooth scroll prevention for mobile
if ("ontouchstart" in window) {
  document.addEventListener("touchmove", function (e) {}, { passive: true });
}

// Preload critical animations
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

/// ================= IMAGE UPLOADER =================

class ImageUploader {
  constructor() {
    this.uploadZone = document.getElementById("uploadZone");
    this.imageInput = document.getElementById("imageInput");
    this.uploadArea = document.getElementById("uploadArea");
    this.previewContainer = document.getElementById("imagePreviewContainer");
    this.previewImage = document.getElementById("previewImage");
    this.previewFilename = document.getElementById("previewFilename");
    this.previewFileType = document.getElementById("previewFileType");
    this.previewFileSize = document.getElementById("previewFileSize");
    this.removeImageBtn = document.getElementById("removeImageBtn");
    this.analyzeBtn = document.getElementById("analyzeBtn");

    this.init();
  }

  init() {
    if (!this.uploadZone || !this.imageInput) return;

    this.uploadZone.addEventListener("click", () => this.imageInput.click());

    this.imageInput.addEventListener("change", (e) => this.handleFileSelect(e));

    if (this.removeImageBtn) {
      this.removeImageBtn.addEventListener("click", () => this.removeImage());
    }
  }

  handleFileSelect(e) {
    const file = e.target.files[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type) || file.size > maxSize) {
      alert("Please upload JPG/PNG image under 10MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      this.previewImage.src = event.target.result;
      this.previewFilename.textContent = file.name;
      this.previewFileType.textContent = file.type.split("/")[1].toUpperCase();
      this.previewFileSize.textContent = this.formatFileSize(file.size);

      this.uploadArea.classList.add("d-none");
      this.previewContainer.classList.remove("d-none");
    };

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageInput.value = "";
    this.uploadArea.classList.remove("d-none");
    this.previewContainer.classList.add("d-none");
  }

  formatFileSize(bytes) {
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  }
}

// ================= FORM HANDLER =================

class PlantFormHandler {
  constructor() {
    this.form = document.getElementById("plantInfoForm");
    this.init();
  }

  init() {
    if (!this.form) return;

    const today = new Date().toISOString().split("T")[0];
    document.getElementById("captureDate").value = today;

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    document
      .getElementById("clearForm")
      .addEventListener("click", () => this.clearForm());

    document
      .getElementById("saveDraft")
      .addEventListener("click", () => this.saveDraft());
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      soybeanVariety: document.getElementById("soybeanVariety").value,
      growthStage: document.getElementById("growthStage").value,
      plantHeight: document.getElementById("plantHeight").value,
      fieldLocation: document.getElementById("fieldLocation").value,
      captureDate: document.getElementById("captureDate").value,
      isHealthy: document.getElementById("isHealthy").checked,
      notes: document.getElementById("notes").value,
    };

    console.log("Form Data:", data);

    alert("Form submitted successfully!");
  }

  clearForm() {
    if (confirm("Clear form?")) {
      this.form.reset();
    }
  }

  saveDraft() {
    const formData = new FormData(this.form);
    const draft = Object.fromEntries(formData);

    localStorage.setItem("soybeanDraft", JSON.stringify(draft));

    alert("Draft saved!");
  }
}

// ================= AI ANALYSIS CONTROLLER =================

// ================= AI ANALYSIS CONTROLLER =================

class AnalysisController {
  constructor() {
    this.overlay = document.getElementById("loadingOverlay");
    this.analyzeBtn = document.getElementById("analyzeBtn");
    this.progressBar = document.getElementById("analysisProgress");
    this.stages = document.querySelectorAll(".stage");
    this.cancelBtn = document.getElementById("cancelAnalysis");

    this.isCancelled = false;

    this.init();
  }

  init() {
    if (this.analyzeBtn) {
      this.analyzeBtn.addEventListener("click", () => this.startAnalysis());
    }

    if (this.cancelBtn) {
      this.cancelBtn.addEventListener("click", () => this.cancelAnalysis());
    }
  }

  async startAnalysis() {
    const imageInput = document.getElementById("imageInput");

    if (!imageInput.files[0]) {
      this.showToast("Please upload an image first!", "danger");
      return;
    }

    this.isCancelled = false;

    this.showOverlay();

    await this.simulateAI();

    if (!this.isCancelled) {
      this.hideOverlay();
      this.showToast(
        "🌱 Analysis Complete! Plant report generated.",
        "success",
      );
    }
  }

  showOverlay() {
    document.body.style.overflow = "hidden";
    this.overlay.classList.remove("d-none");

    this.progressBar.style.width = "0%";

    this.stages.forEach((s) => s.classList.remove("active"));
    this.stages[0].classList.add("active");
  }

  hideOverlay() {
    document.body.style.overflow = "";
    this.overlay.classList.add("d-none");
  }

  cancelAnalysis() {
    this.isCancelled = true;
    this.hideOverlay();
    this.showToast("Analysis cancelled.", "warning");
  }

  async simulateAI() {
    await this.step(33, 0, 3000);
    if (this.isCancelled) return;

    await this.step(66, 1, 5000);
    if (this.isCancelled) return;

    await this.step(100, 2, 4000);
  }

  async step(percent, stageIndex, delay) {
    const interval = 50;
    const steps = delay / interval;
    const startWidth = parseInt(this.progressBar.style.width) || 0;
    const increment = (percent - startWidth) / steps;

    for (let i = 0; i < steps; i++) {
      if (this.isCancelled) return;

      await new Promise((resolve) => setTimeout(resolve, interval));

      const newWidth = startWidth + increment * i;
      this.progressBar.style.width = newWidth + "%";
    }

    this.progressBar.style.width = percent + "%";

    this.stages.forEach((s) => s.classList.remove("active"));
    this.stages[stageIndex].classList.add("active");
  }

  showToast(message, type) {
    const toast = document.createElement("div");

    toast.innerHTML = `
      <div class="alert alert-${type} position-fixed fade show"
      style="top:20px; right:20px; z-index:10000; min-width:260px;">
        ${message}
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}

// ================= INITIALIZE EVERYTHING =================

document.addEventListener("DOMContentLoaded", () => {
  new ImageUploader();
  new PlantFormHandler();
  new AnalysisController();

  // Load saved draft
  const draft = localStorage.getItem("soybeanDraft");

  if (draft) {
    const data = JSON.parse(draft);

    Object.keys(data).forEach((key) => {
      const el = document.getElementById(key);
      if (el) el.value = data[key];
    });
  }
});

// COMPARISION.HTML
/* ── Variety data ── */
const VARIETIES = {
  "Williams 82": {
    yield: 92,
    disease: 88,
    protein: 42,
    oil: 20,
    maturity: 110,
    drought: 70,
    cold: 65,
  },
  Forrest: {
    yield: 74,
    disease: 75,
    protein: 40,
    oil: 19,
    maturity: 120,
    drought: 85,
    cold: 60,
  },
  Braxton: {
    yield: 88,
    disease: 82,
    protein: 45,
    oil: 18,
    maturity: 115,
    drought: 68,
    cold: 55,
  },
  Davis: {
    yield: 72,
    disease: 70,
    protein: 39,
    oil: 21,
    maturity: 95,
    drought: 60,
    cold: 80,
  },
  Hutcheson: {
    yield: 90,
    disease: 92,
    protein: 43,
    oil: 20,
    maturity: 118,
    drought: 74,
    cold: 58,
  },
};
const COLORS = [
  "rgba(25,135,84,.75)",
  "rgba(32,201,151,.75)",
  "rgba(255,193,7,.75)",
];
const COLORS_SOLID = ["#198754", "#20c997", "#ffc107"];

let selected = [];
let radarInst, barInst;

function selectVariety(card, name) {
  if (card.classList.contains("selected")) {
    card.classList.remove("selected");
    selected = selected.filter((v) => v !== name);
  } else {
    if (selected.length >= 3) {
      alert("Maximum 3 varieties allowed.");
      return;
    }
    card.classList.add("selected");
    selected.push(name);
  }
  document.getElementById("selectionCount").textContent =
    selected.length + " of 3 selected";
  document.getElementById("compareBtn").disabled = selected.length < 2;
}

function clearSelection() {
  document
    .querySelectorAll(".variety-card")
    .forEach((c) => c.classList.remove("selected"));
  selected = [];
  document.getElementById("selectionCount").textContent = "0 of 3 selected";
  document.getElementById("compareBtn").disabled = true;
  document.getElementById("resultsSection").style.display = "none";
}

function runComparison() {
  document.getElementById("resultsSection").style.display = "block";
  document
    .getElementById("resultsSection")
    .scrollIntoView({ behavior: "smooth" });

  /* table headers */
  for (let i = 0; i < 3; i++) {
    document.getElementById("th" + (i + 1)).textContent = selected[i] || "—";
  }

  /* table rows */
  const traits = [
    { key: "yield", label: "Yield Score", suffix: "/100" },
    { key: "disease", label: "Disease Resistance", suffix: "/100" },
    { key: "protein", label: "Protein Content", suffix: "%" },
    { key: "oil", label: "Oil Content", suffix: "%" },
    { key: "maturity", label: "Days to Maturity", suffix: " days" },
    { key: "drought", label: "Drought Tolerance", suffix: "/100" },
    { key: "cold", label: "Cold Hardiness", suffix: "/100" },
  ];

  let tbody = "";
  traits.forEach((t) => {
    const vals = selected.map((v) => VARIETIES[v][t.key]);
    const maxVal = Math.max(...vals);
    tbody +=
      '<tr><td class="ps-4 fw-semibold text-success">' + t.label + "</td>";
    selected.forEach((v, i) => {
      const val = VARIETIES[v][t.key];
      const badge =
        val === maxVal && selected.length > 1
          ? '<span class="badge bg-success ms-2">Best</span>'
          : "";
      tbody += '<td class="text-center">' + val + t.suffix + badge + "</td>";
    });
    for (let i = selected.length; i < 3; i++)
      tbody += '<td class="text-center text-muted">—</td>';
    tbody += "</tr>";
  });
  document.getElementById("compTable").innerHTML = tbody;

  /* Radar chart */
  if (radarInst) radarInst.destroy();
  const radarCtx = document.getElementById("radarChart").getContext("2d");
  radarInst = new Chart(radarCtx, {
    type: "radar",
    data: {
      labels: ["Yield", "Disease Res.", "Protein", "Oil", "Drought", "Cold"],
      datasets: selected.map((v, i) => ({
        label: v,
        data: [
          VARIETIES[v].yield,
          VARIETIES[v].disease,
          VARIETIES[v].protein * 2,
          VARIETIES[v].oil * 4,
          VARIETIES[v].drought,
          VARIETIES[v].cold,
        ],
        backgroundColor: COLORS[i],
        borderColor: COLORS_SOLID[i],
        borderWidth: 2,
        pointRadius: 4,
      })),
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { r: { min: 0, max: 100 } },
    },
  });

  /* Bar chart */
  if (barInst) barInst.destroy();
  const barCtx = document.getElementById("barChart").getContext("2d");
  barInst = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: selected,
      datasets: [
        {
          label: "Yield Score",
          data: selected.map((v) => VARIETIES[v].yield),
          backgroundColor: COLORS_SOLID,
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } },
    },
  });
}

// CONTACT.HTML
/* ── Character counter ── */
document.getElementById("cMessage").addEventListener("input", function () {
  const len = this.value.length;
  document.getElementById("charCount").textContent = len + " / 500";
  if (len > 500) this.value = this.value.substring(0, 500);
});

/* ── Send message ── */
function sendMessage() {
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const subject = document.getElementById("cSubject").value;
  const message = document.getElementById("cMessage").value.trim();
  const btn = document.getElementById("sendBtn");

  /* Hide alerts */
  document.getElementById("successAlert").classList.add("d-none");
  document.getElementById("errorAlert").classList.add("d-none");

  /* Validate */
  if (!name || !email || !subject || !message) {
    document.getElementById("errorMsg").textContent =
      "Please fill in all required fields.";
    document.getElementById("errorAlert").classList.remove("d-none");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("errorMsg").textContent =
      "Please enter a valid email address.";
    document.getElementById("errorAlert").classList.remove("d-none");
    return;
  }

  /* Loading state */
  btn.disabled = true;
  document.getElementById("sendIcon").className = "fas fa-spinner fa-spin";
  document.getElementById("sendText").textContent = "Sending…";

  /* Simulate sending (replace with real backend call) */
  setTimeout(function () {
    btn.disabled = false;
    document.getElementById("sendIcon").className = "fas fa-paper-plane";
    document.getElementById("sendText").textContent = "Send Message";

    /* Show success */
    document.getElementById("successAlert").classList.remove("d-none");

    /* Clear form */
    document.getElementById("cName").value = "";
    document.getElementById("cEmail").value = "";
    document.getElementById("cPhone").value = "";
    document.getElementById("cSubject").value = "";
    document.getElementById("cMessage").value = "";
    document.getElementById("charCount").textContent = "0 / 500";

    /* Scroll to top of form */
    document
      .getElementById("successAlert")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }, 1400);
}

/* ── FAQ accordion ── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains("open");

  /* Close all */
  document.querySelectorAll(".faq-btn").forEach((b) => {
    b.classList.remove("open");
    b.nextElementSibling.classList.remove("open");
  });

  /* Open clicked (if it was closed) */
  if (!isOpen) {
    btn.classList.add("open");
    answer.classList.add("open");
  }
}
