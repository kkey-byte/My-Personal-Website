/**
 * Main portfolio interactions
 */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const Observer = window.IntersectionObserver || class {
    constructor(callback) { this.callback = callback; }
    observe(target) { this.callback([{ target, isIntersecting: true }]); }
    unobserve() {}
    disconnect() {}
  };

  /* ---------- Portfolio intro ---------- */
  const intro = $("#portfolioIntro");
  const INTRO_MS = 2000;

  function finishIntro() {
    if (!intro || intro.dataset.done === "1") return;
    intro.dataset.done = "1";
    intro.classList.add("is-leaving");
    intro.classList.remove("is-visible", "is-timing");
    document.body.classList.remove("is-intro-lock");
    setTimeout(() => {
      intro.setAttribute("aria-hidden", "true");
      intro.remove();
    }, 950);
  }

  function startIntro() {
    if (!intro) return;
    document.body.classList.add("is-intro-lock");
    intro.setAttribute("aria-hidden", "false");
    intro.classList.add("is-visible");
    requestAnimationFrame(() => intro.classList.add("is-timing"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 1800 : INTRO_MS;
    const timer = setTimeout(finishIntro, hold);

    intro.querySelector(".intro-skip")?.addEventListener(
      "click",
      () => {
        clearTimeout(timer);
        finishIntro();
      },
      { once: true }
    );
  }

  window.addEventListener("load", () => {
    startIntro();
  });

  /* ---------- Theme (dark only) ---------- */
  document.documentElement.setAttribute("data-theme", "dark");
  try { localStorage.removeItem("portfolio-theme"); } catch {}
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav ---------- */
  const nav = $(".nav");
  const navLinks = $(".nav-links");
  const navToggle = $(".nav-toggle");
  const sectionLinks = $$(".nav-links a[href^='#']");

  navToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  sectionLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("is-open");
      navToggle?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks?.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      navToggle.focus();
    }
  });
  /* ---------- Scroll progress / sticky / back top / active nav ---------- */
  const progress = $(".scroll-progress");
  const backTop = $(".back-top");
  const sections = $$("section[id]");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
    nav?.classList.toggle("is-scrolled", scrollTop > 24);
    backTop?.classList.toggle("is-visible", scrollTop > 500);

    let current = "";
    sections.forEach((sec) => {
      if (scrollTop >= sec.offsetTop - 120) current = sec.id;
    });
    sectionLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      link.classList.toggle("is-active", href === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  /* ---------- Custom cursor ---------- */
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (finePointer && !reducedMotion && dot && ring) {
    document.body.classList.add("has-custom-cursor");
    let x = 0, y = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    $$("a, button, .project-card, .skill-card, .soft-card, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ---------- Typed roles ---------- */
  const roleEl = $(".role-text");
  if (roleEl && typeof SITE !== "undefined") {
    const roles = SITE.roles;
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRole() {
      const current = roles[roleIndex];
      roleEl.textContent = current.slice(0, charIndex);

      if (!deleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeRole, 70);
      } else if (!deleting && charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
      } else if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeRole, 36);
      } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 300);
      }
    }
    typeRole();
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new Observer(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      if (el.parentElement?.classList.contains("stagger")) {
        el.style.setProperty("--i", String(i % 8));
      }
      el.classList.add("reveal-ready");
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Counters ---------- */
  const counters = $$("[data-count]");
  const counterObs = new Observer(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObs.observe(el));

  /* ---------- Skill bars ---------- */
  const bars = $$(".progress-bar");
  const barObs = new Observer(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const bar = entry.target;
        bar.style.width = `${bar.dataset.level || 0}%`;
        barObs.unobserve(bar);
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach((bar) => barObs.observe(bar));

  /* ---------- Render skills ---------- */
  const skillsGrid = $("#skillsGrid");
  if (skillsGrid && typeof SKILLS !== "undefined") {
    const icons = {
      layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
      palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.3-1.6-.4-.7-.3-1.6.4-2.1.5-.4 1.2-.3 1.7.1.6.5 1.5.5 2.1 0C20.2 15.8 22 13.2 22 10c0-4.4-3.6-8-8-8h-2z"/></svg>`,
      film: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5"/></svg>`,
      code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    };

    skillsGrid.innerHTML = SKILLS.map(
      (s) => `
      <article class="skill-card" data-reveal>
        <div class="skill-top">
          <div class="skill-icon">${icons[s.icon] || icons.code}</div>
          <div>
            <h3>${s.category}</h3>
            <p>${s.description}</p>
          </div>
        </div>
        <div class="skill-items">
          ${s.items.map((i) => `<span class="skill-chip">${i}</span>`).join("")}
        </div>
      </article>`
    ).join("");

    // re-observe new elements
    $$(".skill-card[data-reveal]", skillsGrid).forEach((el) => {
      if ("IntersectionObserver" in window) {
        const io2 = new Observer(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                io2.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        el.classList.add("reveal-ready");
        io2.observe(el);
      } else el.classList.add("is-visible");
    });
    $$(".progress-bar", skillsGrid).forEach((bar) => barObs.observe(bar));
  }

  /* ---------- Software ---------- */
  const softwareGrid = $("#softwareGrid");
  if (softwareGrid && typeof SOFTWARE !== "undefined") {
    const inPages = /\/pages\//.test(window.location.pathname) || window.location.pathname.endsWith("/pages");
    softwareGrid.innerHTML = SOFTWARE.map((s) => {
      const logoSrc =
        s.logo && inPages && !s.logo.startsWith("../") ? `../${s.logo}` : s.logo;
      const mark = logoSrc
        ? `<img class="soft-logo" src="${logoSrc}" alt="" width="48" height="48" loading="lazy" decoding="async" />`
        : (() => {
            const initials = s.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            return `<div class="soft-dot">${initials}</div>`;
          })();
      return `
        <article class="soft-card" style="--soft-color:${s.color}" data-reveal>
          <div class="soft-mark">${mark}</div>
          <h3>${s.name}</h3>
        </article>`;
    }).join("");
  }

  /* ---------- Process ---------- */
  const processTrack = $("#processTrack");
  if (processTrack && typeof PROCESS !== "undefined") {
    const icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
    processTrack.innerHTML = PROCESS.map(
      (p) => `
      <article class="process-card" data-reveal>
        <div class="process-icon">${icon}</div>
        <div class="process-step">${p.step}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </article>`
    ).join("");
  }

  /* ---------- Projects (stacked category banners) ---------- */
  const worksCategories = $("#worksCategories");
  const emptyState = $("#projectsEmpty");
  let searchQuery = "";

  function categoryLabel(cat) {
    return typeof CATEGORY_LABELS !== "undefined" ? CATEGORY_LABELS[cat] || cat : cat;
  }

  function projectPageHref(id) {
    const inPages = /\/pages\//.test(window.location.pathname);
    return inPages ? `project.html?id=${id}` : `pages/project.html?id=${id}`;
  }

  function toolBadge(toolName) {
    const meta = (typeof TOOL_META !== "undefined" && TOOL_META[toolName]) || {
      short: (toolName || "?").slice(0, 2),
      color: "#38bdf8",
      label: toolName || "Tool",
    };
    return `<span class="tool-badge" style="--tool:${meta.color}" title="${meta.label}">
      <span class="tool-badge-icon">${meta.short}</span>
      <span class="tool-badge-name">${meta.label}</span>
    </span>`;
  }

  function assetPath(path) {
    if (!path) return "";
    if (/^(https?:|data:|\/|\.\.\/)/i.test(path)) return path;
    const inPages = /\/pages\//.test(window.location.pathname) || window.location.pathname.endsWith("/pages");
    return inPages ? `../${path}` : path;
  }

  function posterCardHTML(p) {
    const bg = `linear-gradient(145deg, hsl(${p.hue} 70% 52%), hsl(${(p.hue + 40) % 360} 65% 28%))`;
    const img = p.image
      ? `<img class="poster-img" src="${assetPath(p.image)}" alt="${p.title}" loading="lazy" decoding="async" onerror="this.remove();" />`
      : "";
    return `
      <article class="poster-card" data-id="${p.id}" aria-label="${p.title}">
        <div class="poster-visual" style="background:${bg}">
          ${img}
          ${p.tool ? toolBadge(p.tool) : ""}
          <span class="poster-title">${p.title}</span>
        </div>
      </article>`;
  }

  function tshirtCardHTML(p) {
    const src = assetPath(p.image);
    const media = src
      ? `<img src="${src}" alt="${p.title}" loading="lazy" decoding="async" onerror="this.style.display='none';this.parentElement.classList.add('is-empty');" />`
      : "";
    return `
      <article class="tshirt-card" data-id="${p.id}" aria-label="${p.title}">
        <div class="tshirt-photo${src ? "" : " is-empty"}">
          ${media}
          <span class="tshirt-photo-fallback">${p.title}</span>
        </div>
      </article>`;
  }

  function projectCardHTML(p) {
    const bg = `linear-gradient(135deg, hsl(${p.hue} 65% 48%), hsl(${(p.hue + 38) % 360} 70% 28%))`;
    const isVideo = p.category === "video";
    const isUiux = p.category === "uiux";
    const meta = isVideo
      ? `<div class="project-meta"><span>${p.duration || ""}</span><span>${p.software || ""}</span></div>`
      : "";
    const actionLabel = isVideo ? "Play Preview" : "View Project";
    const overlayInner = isVideo
      ? `<button class="project-play" aria-label="Play ${p.title}" data-project-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>`
      : `<a class="btn btn-primary" href="${projectPageHref(p.id)}">${actionLabel}</a>`;
    const thumbMedia = p.image
      ? `<img class="project-thumb-img" src="${assetPath(p.image)}" alt="${p.title}" loading="lazy" decoding="async" />`
      : `<div class="project-thumb-bg" style="background:${bg}" data-label="${p.title}"></div>`;

    return `
      <article class="project-card" data-category="${p.category}" data-id="${p.id}">
        <div class="project-thumb">
          ${thumbMedia}
          <div class="project-overlay">${overlayInner}</div>
        </div>
        <div class="project-body">
          <div class="project-cat">${categoryLabel(p.category)}</div>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          ${meta}
          ${isUiux ? `<div class="project-meta"><a href="${projectPageHref(p.id)}">View project →</a></div>` : ""}
        </div>
      </article>`;
  }

  function videoCardHTML(p) {
    const bg = `linear-gradient(165deg, hsl(${p.hue} 65% 48%), hsl(${(p.hue + 38) % 360} 70% 24%))`;
    const tool = p.software;
    const poster = p.poster ? assetPath(p.poster) : "";
    const video = p.video ? assetPath(p.video) : "";
    const media = video
      ? `<video class="phone-video" src="${video}#t=0.1" ${poster ? `poster="${poster}"` : ""} muted playsinline preload="metadata" aria-hidden="true" tabindex="-1"></video>`
      : poster
        ? `<img class="phone-poster" src="${poster}" alt="${p.title}" loading="lazy" decoding="async" />`
        : "";
    return `
      <article class="video-card" data-id="${p.id}" data-project-id="${p.id}" role="button" tabindex="0" aria-label="Open ${p.title} video">
        <div class="phone-frame">
          <div class="phone-screen" style="background:${bg}">
            ${media}
            ${tool ? toolBadge(tool) : ""}
            <span class="video-play-mark" aria-hidden="true">▶</span>
            <div class="phone-caption">
              <strong>${p.title}</strong>
              <span>${p.duration || ""}</span>
            </div>
          </div>
        </div>
      </article>`;
  }

  function playPhoneVideos() {
    // Preview frames stay still; full playback starts only when a card is opened.
  }

  function socialPhotoHTML(src, alt, landscape = false) {
    const path = assetPath(src);
    return `
      <figure class="social-photo${landscape ? " social-photo--landscape" : ""}">
        <img src="${path}" alt="${alt}" loading="lazy" decoding="async"
          onerror="this.style.display='none';this.parentElement.classList.add('is-empty');" />
        <span class="social-photo-fallback" aria-hidden="true"></span>
      </figure>`;
  }

  function socialSectionPhotosHTML(section, brandName) {
    const isLandscape = section.layout === "landscape";
    const photos = (section.images || [])
      .map((img, i) => socialPhotoHTML(img, `${brandName} ${i + 1}`, isLandscape))
      .join("");
    if (!photos) return "";
    return `<div class="social-photo-grid${isLandscape ? " social-photo-grid--landscape" : ""}">${photos}</div>`;
  }

  function socialBrandHTML(brand) {
    const photoSections = (brand.sections || [])
      .map((section) => socialSectionPhotosHTML(section, brand.name || "Social"))
      .filter(Boolean)
      .join("");

    if (brand.layout === "section-only") {
      if (!photoSections) return "";
      return `
        <article class="social-brand social-brand--section" data-brand="${brand.id}">
          <div class="social-feed-section">
            <div class="social-feed-head">
              <h4 class="social-feed-title">${brand.name}</h4>
              ${brand.tagline ? `<p class="social-feed-subtitle">${brand.tagline}</p>` : ""}
            </div>
            ${photoSections}
          </div>
        </article>`;
    }

    const logoSrc = assetPath(brand.logo);
    const paragraphs = (brand.description || [])
      .map((p) => `<p>${p}</p>`)
      .join("");
    const meta = (brand.meta || [])
      .map(
        (row) => `
        <div class="social-meta-row">
          <span class="social-meta-label">${row.label}</span>
          <span class="social-meta-value">${row.value}</span>
        </div>`
      )
      .join("");

    // Nested titled sections (when photos live under the brand card)
    const nestedSections = (brand.sections || [])
      .filter((section) => (section.images || []).length > 0)
      .map((section) => {
        const isLandscape = section.layout === "landscape";
        const photos = (section.images || [])
          .map((img, i) => socialPhotoHTML(img, `${brand.name} — ${section.title || ""} ${i + 1}`, isLandscape))
          .join("");
        return `
          <div class="social-feed-section${isLandscape ? " social-feed-section--landscape" : ""}">
            ${
              section.title
                ? `<div class="social-feed-head">
                    <h4 class="social-feed-title">${section.title}</h4>
                    ${section.subtitle ? `<p class="social-feed-subtitle">${section.subtitle}</p>` : ""}
                  </div>`
                : ""
            }
            <div class="social-photo-grid${isLandscape ? " social-photo-grid--landscape" : ""}">${photos}</div>
          </div>`;
      })
      .join("");

    return `
      <article class="social-brand" data-brand="${brand.id}">
        <header class="social-brand-head">
          <div class="social-brand-logo">
            ${logoSrc ? `<img src="${logoSrc}" alt="${brand.name} logo" loading="lazy" decoding="async" />` : ""}
            <span class="social-brand-logo-fallback">${(brand.name || "?").slice(0, 1)}</span>
          </div>
          <div class="social-brand-copy">
            <div class="social-brand-identity">
              <h3 class="social-brand-name">${brand.name}<span class="social-brand-dot">.</span></h3>
              ${brand.tagline ? `<p class="social-brand-tagline">${brand.tagline}</p>` : ""}
            </div>
            <div class="social-brand-desc">${paragraphs}</div>
          </div>
          <aside class="social-brand-meta">${meta}</aside>
        </header>
        ${nestedSections ? `<div class="social-brand-sections">${nestedSections}</div>` : ""}
      </article>`;
  }

  function renderSocialMedia(q) {
    const brands = typeof SOCIAL_MEDIA_BRANDS !== "undefined" ? SOCIAL_MEDIA_BRANDS : [];
    const filtered = !q
      ? brands
      : brands.filter((b) => {
          const hay = [
            b.name,
            b.tagline,
            ...(b.description || []),
            ...(b.sections || []).map((s) => s.title || ""),
          ]
            .join(" ")
            .toLowerCase();
          return hay.includes(q);
        });

    const html = filtered.map(socialBrandHTML).filter(Boolean).join("");
    if (!html) return `<p class="category-empty">No matching works</p>`;
    return `<div class="social-brands">${html}</div>`;
  }

  function renderCategoryItems(bannerId, items, q = "") {
    if (bannerId === "social") {
      return renderSocialMedia(q);
    }
    if (!items.length) return `<p class="category-empty">No matching works</p>`;

    if (bannerId === "graphic") {
      return `<div class="poster-grid">${items.map(posterCardHTML).join("")}</div>`;
    }
    if (bannerId === "tshirt") {
      return `<div class="tshirt-grid">${items.map(tshirtCardHTML).join("")}</div>`;
    }
    if (bannerId === "video") {
      return `<div class="video-grid">${items.map(videoCardHTML).join("")}</div>`;
    }
    return `<div class="projects-grid">${items.map(projectCardHTML).join("")}</div>`;
  }

  function renderProjects() {
    if (!worksCategories || typeof PROJECTS === "undefined") return;

    const banners =
      typeof CATEGORY_BANNERS !== "undefined"
        ? CATEGORY_BANNERS
        : [
            { id: "social", line1: "SOCIAL MEDIA", line2: "DESIGNS" },
            { id: "graphic", line1: "POSTER", line2: "DESIGN" },
            { id: "video", line1: "VIDEO", line2: "EDITS" },
            { id: "tshirt", line1: "T-SHIRT", line2: "DESIGNS" },
            { id: "uiux", line1: "UI UX", line2: "DESIGN" },
          ];

    const q = searchQuery.trim().toLowerCase();
    let totalVisible = 0;

    worksCategories.innerHTML = banners
      .map((banner) => {
        const items =
          banner.id === "social"
            ? []
            : PROJECTS.filter((p) => {
                if (p.category !== banner.id) return false;
                if (!q) return true;
                return (
                  p.title.toLowerCase().includes(q) ||
                  p.desc.toLowerCase().includes(q) ||
                  categoryLabel(p.category).toLowerCase().includes(q)
                );
              });

        const content = renderCategoryItems(banner.id, items, q);
        const hasContent = banner.id === "social"
          ? content.indexOf("category-empty") === -1
          : items.length > 0;
        if (hasContent) totalVisible += banner.id === "social" ? 1 : items.length;

        return `
          <section class="category-block" id="works-${banner.id}" aria-label="${banner.line1} ${banner.line2}">
            <div class="category-banner-bg" aria-hidden="true"></div>
            <div class="folder-frame">
              <div class="folder-tab" aria-hidden="true">
                <span class="folder-tab-label">${banner.nav || banner.line1}</span>
              </div>
              <div class="folder-body">
                <header class="folder-header">
                  <h2 class="category-title">
                    <span class="deco deco-a" aria-hidden="true"></span>
                    <span class="line1">${banner.line1}</span>
                    <span class="line2">${banner.line2}</span>
                    <span class="deco deco-b" aria-hidden="true"></span>
                  </h2>
                  <p class="category-desc">${banner.desc || ""}</p>
                </header>
              </div>
            </div>
            <div class="category-works">
              <div class="container">${content}</div>
            </div>
          </section>`;
      })
      .join("");

    if (q && totalVisible === 0) {
      emptyState?.classList.add("is-visible");
      worksCategories.style.display = "none";
    } else {
      emptyState?.classList.remove("is-visible");
      worksCategories.style.display = "";
    }

    playPhoneVideos();
  }

  renderProjects();

  /* ---------- Works side nav scroll spy ---------- */
  const sideNav = $("#worksSideNav");
  if (sideNav) {
    const sideLinks = $$("a[data-works-nav]", sideNav);

    sideLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        const target = id ? $(id) : null;
        if (!target) return;
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });

    const spySections = ["social", "graphic", "video", "tshirt", "uiux"]
      .map((id) => $(`#works-${id}`))
      .filter(Boolean);

    const updateSideNav = () => {
      let current = spySections[0]?.id?.replace("works-", "") || "social";
      spySections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 160) {
          current = sec.id.replace("works-", "");
        }
      });
      sideLinks.forEach((link) => {
        link.classList.toggle("is-active", link.dataset.worksNav === current);
      });
    };

    window.addEventListener("scroll", updateSideNav, { passive: true });
    updateSideNav();
  }

  /* ---------- Modal ---------- */
  const modal = $("#projectModal");
  const modalMedia = $("#modalMedia");
  const modalCat = $("#modalCat");
  const modalTitle = $("#modalTitle");
  const modalDesc = $("#modalDesc");
  const modalLink = $("#modalLink");
  let modalTrigger = null;

  function openModal(project) {
    if (!modal || !project) return;
    modalTrigger = document.activeElement;
    modal.inert = false;
    modal.setAttribute("aria-hidden", "false");
    const bg = `linear-gradient(135deg, hsl(${project.hue || 220} 65% 48%), hsl(${((project.hue || 220) + 38) % 360} 70% 28%))`;
    modalMedia.style.background = bg;
    modalMedia.classList.toggle("is-video", project.category === "video");

    if (project.category === "video" && project.video) {
      modalMedia.innerHTML = `
        <video class="modal-video" src="${assetPath(project.video)}" ${project.poster ? `poster="${assetPath(project.poster)}"` : ""} controls playsinline autoplay></video>`;
    } else if (project.image) {
      modalMedia.innerHTML = `<img class="modal-image" src="${assetPath(project.image)}" alt="${project.title}" />`;
    } else if (project.category === "video") {
      modalMedia.innerHTML = `<div class="modal-fallback">${project.title}<br><span>${project.duration || ""} · ${project.software || ""}</span></div>`;
    } else {
      modalMedia.innerHTML = `<div class="modal-fallback">${project.title}</div>`;
    }

    modalCat.textContent = categoryLabel(project.category);
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    const actions = modalLink?.closest(".modal-actions");
    if (project.category === "uiux") {
      modalLink.href = projectPageHref(project.id);
      modalLink.style.display = "";
      modalLink.textContent = "View Project";
      if (actions) actions.style.display = "";
    } else {
      modalLink.style.display = "none";
      if (actions) actions.style.display = "none";
    }
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close")?.focus();
  }

  function closeModal() {
    if (!modal?.classList.contains("is-open")) return;
    const playing = modal?.querySelector("video");
    if (playing) {
      playing.pause();
      playing.removeAttribute("src");
      playing.load();
    }
    modalMedia?.classList.remove("is-video");
    modal?.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modal.inert = true;
    document.body.style.overflow = "";
    modalTrigger?.focus();
  }
  if (modal) modal.inert = true;
  modal?.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = $$("button, a[href], video[controls]", modal).filter(el => el.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });

  worksCategories?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project-id]");
    if (!btn || typeof PROJECTS === "undefined") return;
    const project = PROJECTS.find((p) => p.id === btn.dataset.projectId);
    if (!project) return;
    // Posters: no modal. Videos + UI/UX cards: open modal.
    if (project.category === "graphic") return;
    openModal(project);
  });

  worksCategories?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".video-card[data-project-id]");
    if (!card || typeof PROJECTS === "undefined") return;
    e.preventDefault();
    const project = PROJECTS.find((p) => p.id === card.dataset.projectId);
    if (project) openModal(project);
  });

  modal?.querySelector(".modal-backdrop")?.addEventListener("click", closeModal);
  modal?.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Testimonials ---------- */
  const track = $("#testimonialTrack");
  const dotsWrap = $("#sliderDots");
  let slideIndex = 0;
  let autoTimer;

  function renderTestimonials() {
    if (!track || typeof TESTIMONIALS === "undefined") return;
    track.innerHTML = TESTIMONIALS.map(
      (t) => `
      <div class="testimonial-slide">
        <article class="testimonial-card">
          <div class="testimonial-stars">${"★".repeat(t.rating)}</div>
          <blockquote>“${t.comment}”</blockquote>
          <div class="testimonial-author">
            <div class="avatar">${t.avatar}</div>
            <div>
              <strong>${t.name}</strong>
              <span>${t.role}</span>
            </div>
          </div>
        </article>
      </div>`
    ).join("");

    if (dotsWrap) {
      dotsWrap.innerHTML = TESTIMONIALS.map(
        (_, i) => `<button class="slider-dot${i === 0 ? " is-active" : ""}" aria-label="Go to slide ${i + 1}" data-index="${i}"></button>`
      ).join("");
    }
  }

  function goToSlide(i) {
    if (!track || typeof TESTIMONIALS === "undefined") return;
    slideIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    $$(".slider-dot", dotsWrap).forEach((d, idx) => d.classList.toggle("is-active", idx === slideIndex));
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(slideIndex + 1), 5500);
  }

  renderTestimonials();
  $("#sliderPrev")?.addEventListener("click", () => {
    goToSlide(slideIndex - 1);
    startAuto();
  });
  $("#sliderNext")?.addEventListener("click", () => {
    goToSlide(slideIndex + 1);
    startAuto();
  });
  dotsWrap?.addEventListener("click", (e) => {
    const dot = e.target.closest(".slider-dot");
    if (!dot) return;
    goToSlide(Number(dot.dataset.index));
    startAuto();
  });
  startAuto();

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  const formStatus = $("#formStatus");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      if (formStatus) formStatus.textContent = "Please fill in name, email, and message.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (formStatus) formStatus.textContent = "Please enter a valid email address.";
      return;
    }

    // Frontend-only: open mailto as graceful fallback
    const mailSubject = subject || `Portfolio inquiry from ${name}`;
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:${SITE?.email || "hello@example.com"}?subject=${encodeURIComponent(mailSubject)}&body=${body}`;
    if (formStatus) {
      formStatus.textContent = "Opening your email client… Thank you for reaching out!";
    }
    window.location.href = mailto;
    form.reset();
  });

  /* ---------- Hero title typewriter ---------- */
  const typedEl = $("[data-hero-typed]");
  if (typedEl) {
    const roles = ["Graphic Designer", "UI/UX Designer", "Video Editor"];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = false;

    if (reduced) {
      typedEl.textContent = roles[0];
    } else {
      const typeMs = 75;
      const deleteMs = 42;
      const holdMs = 1600;
      const gapMs = 420;

      const tick = () => {
        const current = roles[roleIndex];

        if (!deleting) {
          charIndex += 1;
          typedEl.textContent = current.slice(0, charIndex);
          if (charIndex >= current.length) {
            deleting = true;
            setTimeout(tick, holdMs);
            return;
          }
          setTimeout(tick, typeMs);
          return;
        }

        charIndex -= 1;
        typedEl.textContent = current.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, gapMs);
          return;
        }
        setTimeout(tick, deleteMs);
      };

      typedEl.textContent = roles[0];
      setTimeout(() => {
        deleting = true;
        tick();
      }, holdMs);
    }
  }

  /* ---------- Hero parallax ---------- */
  const shapes = $$(".hero-shape");
  if (shapes.length) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y > window.innerHeight) return;
        shapes.forEach((shape, i) => {
          const speed = (i + 1) * 0.08;
          shape.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Site name inject ---------- */
  if (typeof SITE !== "undefined") {
    $$("[data-site-name]").forEach((el) => {
      el.textContent = SITE.name;
    });
    $$("[data-site-email]").forEach((el) => {
      el.textContent = SITE.email;
      if (el.tagName === "A") {
        el.href = `mailto:${SITE.email}`;
      } else {
        const link = el.closest("a");
        if (link) link.href = `mailto:${SITE.email}`;
      }
    });
    $$("a[data-resume]").forEach((el) => {
      const inPages = /\/pages\//.test(window.location.pathname) || window.location.pathname.endsWith("/pages");
      if (!SITE.resume) return;
      const path = SITE.resume;
      el.href = inPages && !path.startsWith("../") ? `../${path}` : path;
    });
    const socialMap = SITE.social || {};
    Object.keys(socialMap).forEach((key) => {
      $$(`a[data-social="${key}"]`).forEach((el) => {
        el.href = socialMap[key];
      });
    });
  }

  /* ---------- Stats ---------- */
  const statsGrid = $("#statsGrid");
  if (statsGrid && typeof SITE !== "undefined") {
    statsGrid.innerHTML = SITE.stats
      .map(
        (s) => `
      <article class="stat-card" data-reveal>
        <div class="stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0</div>
        <div class="stat-label">${s.label}</div>
      </article>`
      )
      .join("");
    $$("[data-count]", statsGrid).forEach((el) => counterObs.observe(el));
    $$(".stat-card[data-reveal]", statsGrid).forEach((el) => {
      const io = new Observer(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      el.classList.add("reveal-ready");
      io.observe(el);
    });
  }

  /* Re-bind reveal for dynamically inserted software/process */
  function observeDynamicReveals() {
    $$("#softwareGrid [data-reveal], #processTrack [data-reveal]").forEach((el) => {
      const io = new Observer(
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
      el.classList.add("reveal-ready");
      io.observe(el);
    });
  }
  observeDynamicReveals();
})();

