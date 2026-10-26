/**
 * Case study page logic
 */
(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const project = typeof PROJECTS !== "undefined" ? PROJECTS.find((p) => p.id === id) : null;
  const detail = typeof getProjectDetail === "function" ? getProjectDetail(project) : null;

  const $ = (sel) => document.querySelector(sel);
  const menuButton = $(".nav-toggle");
  const menu = $(".nav-links");
  menuButton?.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      menuButton.focus();
    }
  });

  document.documentElement.setAttribute("data-theme", "dark");
  try { localStorage.removeItem("portfolio-theme"); } catch {}

  const progress = $(".scroll-progress");
  window.addEventListener(
    "scroll",
    () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      if (progress) progress.style.width = `${pct}%`;
    },
    { passive: true }
  );

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  if (!detail) {
    $("#caseTitle").textContent = "Project not found";
    $("#caseLead").textContent = "This project ID is missing or invalid. Return to the works grid to pick another case study.";
    $("#caseCover").style.background = "linear-gradient(135deg,#64748b,#0f172a)";
    $("#caseCover").textContent = "404";
    return;
  }

  document.title = `${detail.title} — Case Study | Glaisa`;

  const hue = detail.hue || 220;
  const bg = `linear-gradient(135deg, hsl(${hue} 65% 48%), hsl(${(hue + 38) % 360} 70% 26%))`;
  const inPages = true;
  const asset = (path) => {
    if (!path) return "";
    if (/^(https?:|data:|\/|\.\.\/)/i.test(path)) return path;
    return `../${path}`;
  };

  $("#caseCategory").textContent = detail.categoryLabel;
  $("#caseTitle").textContent = detail.title;
  $("#caseLead").textContent = detail.desc;
  if (!detail.colors.length && !detail.typography.length) document.querySelector(".case-visual-row")?.remove();
  if (!detail.mockups?.length) $("#mockups")?.remove();
  $("#caseCover").style.background = bg;
  $("#caseCover").textContent = "";
  if (detail.image) {
    $("#caseCover").innerHTML = `<img class="case-cover-img" src="${asset(detail.image)}" alt="${detail.title}" />`;
  } else {
    $("#caseCover").textContent = detail.title;
  }
  $("#caseOverview").textContent = detail.overview;

  const galleryEl = $("#caseUiGallery");
  if (galleryEl) {
    const gallery = (detail.gallery || []).filter(Boolean);
    if (gallery.length) {
      galleryEl.innerHTML = gallery
        .map(
          (src, i) => `
          <figure class="case-ui-shot">
            <img src="${asset(src)}" alt="${detail.title} UI ${i + 1}" loading="lazy" decoding="async"
              onerror="this.closest('figure').remove();" />
          </figure>`
        )
        .join("");
    } else {
      galleryEl.remove();
    }
  }

  const mockupFrames = $("#mockupFrames");
  if (mockupFrames) {
    const mockups = detail.mockups && detail.mockups.length
      ? detail.mockups
      : null;
    if (mockups) {
      mockupFrames.innerHTML = mockups
        .map(
          (src, i) => `
          <div class="frame frame--photo">
            <img src="${asset(src)}" alt="${detail.title} mockup ${i + 1}" loading="lazy" decoding="async"
              onerror="this.parentElement.classList.add('is-empty');this.remove();" />
            <span>Mockup ${i + 1}</span>
          </div>`
        )
        .join("");
    } else {
      mockupFrames.innerHTML = ["Desktop Mockup", "Mobile Mockup"]
        .map((label, i) => {
          const h = (hue + i * 18) % 360;
          return `<div class="frame" style="--frame-bg:linear-gradient(145deg,hsl(${h} 60% ${42 + 6}%),hsl(${(h + 30) % 360} 65% 24%))"><span>${label}</span></div>`;
        })
        .join("");
    }
  }

  if ($("#caseSwatches")) $("#caseSwatches").innerHTML = detail.colors
    .map(
      (c) => `
      <div class="swatch">
        <div class="swatch-color" style="background:${c}"></div>
        <code>${c}</code>
      </div>`
    )
    .join("");
  if ($("#caseSwatches") && !detail.colors.length) $("#caseSwatches").textContent = "Palette details to be added by the author.";

  if ($("#caseType")) $("#caseType").innerHTML = detail.typography.map((t) => `<li>${t}</li>`).join("");

  const els = [...document.querySelectorAll("[data-reveal]")];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => { el.classList.add("reveal-ready"); io.observe(el); });
  } else {
    els.forEach((el) => el.classList.add("is-visible"));
  }
})();
