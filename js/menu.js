/* Menu page */
(function () {
  CF.strings(
    {
      title: "المنيو | كلاسيك فود بعلبك",
      m_eyebrow: "قائمة الطعام", m_title: "المنيو", m_lead: "أكثر من ٤٦٠ صنف — اضغط على أي صنف لتشوف التفاصيل وتطلبه على واتساب.",
      search: "ابحث عن صنف… مثلاً: برغر، موهيتو، سوشي", items: "صنف", more: "أصناف إضافية",
      results: "نتيجة", nores: "ما لقينا شي", nores2: "جرّب كلمة تانية أو تصفّح الأقسام.",
    },
    {
      title: "Menu | Classic Food Baalbek",
      m_eyebrow: "Our menu", m_title: "The Menu", m_lead: "460+ items — tap any dish for details and order it on WhatsApp.",
      search: "Search… e.g. burger, mojito, sushi", items: "items", more: "More in this section",
      results: "results", nores: "Nothing found", nores2: "Try another word or browse the sections.",
    }
  );

  const COVER = { 11: "s21", 116: "s49", 12: "s10", 13: "s13", 17: "s6", 111: "s42" };
  const FALLBACK = { 11: "s21", 116: "s49", 12: "s9", 13: "s13", 17: "s6", 111: "s42" };
  let data, cat, view = "grid", query = "";
  try { view = localStorage.getItem("cf_view") || "grid"; } catch (e) {}

  const $ = (id) => document.getElementById(id);
  const body = $("menuBody"), tabs = $("catTabs"), chips = $("secChips"), search = $("search"), clr = $("clearSearch");

  const norm = (s) => (s || "").toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[ً-ْ]/g, "");

  function sectionHTML(s, c, items) {
    const { esc } = CF;
    const withImg = view === "grid" ? items.filter((i) => i.img) : [];
    const noImg = view === "grid" ? items.filter((i) => !i.img) : items;
    const img = s.img || `images/sections/${FALLBACK[c.id]}.webp`;
    let h = `<section class="msec" id="s${s.id}" data-sec="${s.id}">
      <div class="msec-head"><img src="${img}" alt="" loading="lazy"><div>
        <h2>${esc(CF.dish.secName(s))}</h2><span class="count">${items.length} ${CF.t("items")}</span></div></div>`;
    if (withImg.length) h += `<div class="grid">${withImg.map(CF.dish.card).join("")}</div>`;
    if (noImg.length) {
      const title = view === "grid" && withImg.length ? `<div class="rows-title">${CF.t("more")}</div>` : "";
      h += `<div class="rows">${title}${noImg.map(CF.dish.row).join("")}</div>`;
    }
    return h + `</section>`;
  }

  function renderTabs() {
    const L = CF.lang;
    tabs.innerHTML = data.categories.map((c) =>
      `<button class="cat-tab ${c.id === cat && !query ? "active" : ""}" role="tab" aria-selected="${c.id === cat}" data-cat="${c.id}">
        <img src="images/sections/${COVER[c.id]}.webp" alt="">${CF.esc(L === "en" ? c.en : c.ar)}</button>`).join("");
    const c = data.categories.find((x) => x.id === cat);
    chips.innerHTML = query ? "" : c.sections.map((s, i) =>
      `<button class="sec-chip ${i === 0 ? "active" : ""}" data-go="${s.id}">${CF.esc(CF.dish.secName(s))}</button>`).join("");
    const act = tabs.querySelector(".active"); if (act) act.scrollIntoView({ block: "nearest", inline: "center" });
  }

  function render() {
    if (!data) return;
    renderTabs();
    if (query) {
      const q = norm(query); let n = 0, h = "";
      data.categories.forEach((c) => c.sections.forEach((s) => {
        const hits = s.items.filter((it) => norm([it.ar, it.en, it.d, it.de, s.ar, s.en].join(" ")).includes(q));
        if (hits.length) { n += hits.length; h += sectionHTML(s, c, hits); }
      }));
      body.innerHTML = n ? `<p style="margin-top:18px;color:var(--ink-3)">${n} ${CF.t("results")}</p>` + h
        : `<div class="empty"><b>${CF.t("nores")}</b>${CF.t("nores2")}</div>`;
      return;
    }
    const c = data.categories.find((x) => x.id === cat);
    body.innerHTML = c.sections.map((s) => sectionHTML(s, c, s.items)).join("");
    spy();
  }

  // scroll-spy for section chips
  let io;
  function spy() {
    if (io) io.disconnect();
    if (!("IntersectionObserver" in window)) return;
    io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.dataset.sec;
        chips.querySelectorAll(".sec-chip").forEach((b) => {
          const on = b.dataset.go === id; b.classList.toggle("active", on);
          if (on) chips.scrollTo({ left: b.offsetLeft - chips.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    body.querySelectorAll(".msec").forEach((s) => io.observe(s));
  }

  function stickyOffset() {
    const tb = document.querySelector(".topbar").offsetHeight;
    return tb + document.querySelector(".menu-sticky").offsetHeight + 8;
  }
  function scrollToEl(el) { window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - stickyOffset(), behavior: "smooth" }); }

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    cat = +b.dataset.cat; query = ""; search.value = ""; clr.hidden = true;
    history.replaceState(null, "", "#c" + cat);
    render();
    if (body.getBoundingClientRect().top < stickyOffset()) scrollToEl(body);
  });
  chips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]"); if (!b) return;
    const el = document.getElementById("s" + b.dataset.go); if (el) scrollToEl(el);
  });
  let t;
  search.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => { query = search.value.trim(); clr.hidden = !query; render(); }, 140);
  });
  clr.addEventListener("click", () => { search.value = ""; query = ""; clr.hidden = true; render(); search.focus(); });
  document.querySelectorAll("[data-view]").forEach((b) => {
    b.classList.toggle("on", b.dataset.view === view);
    b.addEventListener("click", () => {
      view = b.dataset.view; try { localStorage.setItem("cf_view", view); } catch (e) {}
      document.querySelectorAll("[data-view]").forEach((x) => x.classList.toggle("on", x === b));
      render();
    });
  });

  CF.onLang(render);
  CF.loadMenu().then((d) => {
    data = d; CF.dish.register(d);
    const m = location.hash.match(/^#c(\d+)/);
    cat = m && d.categories.some((c) => c.id === +m[1]) ? +m[1] : d.categories[0].id;
    render();
  });
})();
