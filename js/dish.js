/* Dish cards, rows and the detail sheet — shared by Home and Menu */
(function () {
  const { esc, money } = CF;
  CF.strings(
    { new_badge: "جديد", order_this: "اطلب على واتساب", no_photo: "", close: "إغلاق" },
    { new_badge: "NEW", order_this: "Order on WhatsApp", no_photo: "", close: "Close" }
  );
  const index = new Map(); // id -> {item, section, category}

  const name = (it) => (CF.lang === "en" ? it.en || it.ar : it.ar);
  const altName = (it) => (it.en ? (CF.lang === "en" ? it.ar : it.en) : "");
  const desc = (it) => (CF.lang === "en" ? it.de || it.d : it.d) || "";
  const secName = (s) => (CF.lang === "en" ? s.en || s.ar : s.ar);

  function register(data) {
    data.categories.forEach((c) => c.sections.forEach((s) => s.items.forEach((it) => index.set(it.id, { it, s, c }))));
  }

  function card(it) {
    return `<button class="dish" type="button" data-id="${it.id}">
      <div class="ph"><img src="${it.img}" alt="${esc(name(it))}" loading="lazy" decoding="async">
        ${it.new ? `<span class="badge-new">${CF.t("new_badge")}</span>` : ""}</div>
      <div class="db"><h4>${esc(name(it))}</h4>${desc(it) ? `<p class="dd">${esc(desc(it))}</p>` : ""}
        <div class="pr">${money(it.p)}<span class="add" aria-hidden="true">+</span></div></div>
    </button>`;
  }

  const CAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 7.2 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.2L15 3zm3 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>';
  function row(it) {
    return `<button class="row" type="button" data-id="${it.id}">
      <span class="rt">
        <span class="rline"><span class="nm">${esc(name(it))}</span>${it.new ? `<span class="tag-new">${CF.t("new_badge")}</span>` : ""}
          <span class="dots" aria-hidden="true"></span>${money(it.p)}</span>
        ${desc(it) ? `<p class="dd">${esc(desc(it))}</p>` : ""}
      </span>
      <span class="chev" aria-hidden="true">${it.img ? CAM : "›"}</span></button>`;
  }

  // ---------- sheet ----------
  let sheet, lastFocus;
  function open(id) {
    const rec = index.get(+id); if (!rec) return;
    const { it, s } = rec;
    sheet = document.getElementById("sheet");
    lastFocus = document.activeElement;
    const msg = encodeURIComponent(`${CF.lang === "en" ? "Hello Classic Food, I'd like to order" : "مرحبا كلاسيك فود، بدي اطلب"}: ${name(it)} ($${it.p})`);
    sheet.innerHTML = `<div class="sheet-backdrop" data-close></div>
      <div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
        <button class="sheet-close" type="button" data-close aria-label="${CF.t("close")}">×</button>
        <div class="sheet-img ${it.img ? "" : "none"}">${it.img ? `<img src="${it.img}" alt="${esc(name(it))}">` : `<img src="images/brand/logo.png" alt="">`}</div>
        <div class="sheet-body">
          <span class="cat">${esc(secName(s))}</span>
          <h3 id="sheetTitle">${esc(name(it))}</h3>
          ${altName(it) ? `<p class="alt">${esc(altName(it))}</p>` : ""}
          ${desc(it) ? `<p class="desc">${esc(desc(it))}</p>` : ""}
          <div class="sheet-foot">${money(it.p)}
            <a class="btn btn-yellow" href="${CF.WA}?text=${msg}" target="_blank" rel="noopener">${CF.t("order_this")}</a></div>
        </div>
      </div>`;
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    sheet.querySelector(".sheet-close").focus();
  }
  function close() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true; document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return close();
    const d = e.target.closest(".dish[data-id], .row[data-id]");
    if (d) open(d.dataset.id);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  CF.dish = { card, row, register, name, secName, open };
})();
