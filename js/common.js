/* Classic Food — shared layout, language & helpers */
(function () {
  const PHONE1 = "70900798", PHONE2 = "70900978";
  const IG = "https://www.instagram.com/classic_food";
  const WA = "https://wa.me/961" + PHONE1;
  const MAPS = "https://www.google.com/maps/search/?api=1&query=Classic+Food+Baalbek+Ras+Al+Ain";

  const T = {
    ar: {
      nav_home: "الرئيسية", nav_menu: "المنيو", nav_about: "قصتنا", nav_location: "الموقع",
      call: "اتصل", whatsapp: "واتساب", directions: "الاتجاهات", follow: "تابعونا",
      tagline: "بعلبك · شارع رأس العين",
      foot_about: "برغر، مشاوي، شاورما، بيتزا، سوشي، عصائر وحلويات — طعم كلاسيكي بروح عصرية في قلب بعلبك.",
      foot_pages: "الصفحات", foot_contact: "تواصل معنا", foot_find: "تجدوننا",
      addr: "بعلبك، شارع رأس العين، مقابل فرنسبنك",
      rights: "جميع الحقوق محفوظة", usd: "جميع الأسعار بالدولار الأمريكي",
    },
    en: {
      nav_home: "Home", nav_menu: "Menu", nav_about: "Our Story", nav_location: "Location",
      call: "Call", whatsapp: "WhatsApp", directions: "Directions", follow: "Follow us",
      tagline: "Baalbek · Ras Al Ain Street",
      foot_about: "Burgers, grills, shawarma, pizza, sushi, fresh juices and desserts — classic taste with a modern soul, in the heart of Baalbek.",
      foot_pages: "Pages", foot_contact: "Contact", foot_find: "Find us",
      addr: "Ras Al Ain Street, facing Fransabank, Baalbek",
      rights: "All rights reserved", usd: "All prices are in US dollars",
    },
  };

  const ICON = {
    home: '<path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z"/>',
    menu: '<path d="M8 2v9a3 3 0 0 1-2 2.8V22H4v-8.2A3 3 0 0 1 2 11V2h1.5v6h1V2h1.5v6h1V2zm9 0c2.2 0 4 2.7 4 7 0 2.6-1 4-2.5 4.6V22h-2V2z"/>',
    story: '<path d="M4 3h11l5 5v13H4zm10 1.5V9h4.5zM7 12h10v1.6H7zm0 3.5h10v1.6H7zm0-7h5v1.6H7z"/>',
    pin: '<path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>',
    phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>',
    ig: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.3-3.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>',
    wa: '<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.3-.3-.3-.5-.4z"/>',
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  // ---------- language ----------
  let lang = "ar";
  try { lang = localStorage.getItem("cf_lang") || "ar"; } catch (e) {}
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "ar") lang = q;

  const page = document.body.dataset.page || "home";

  function header() {
    const link = (href, key, id) => `<a href="${href}" class="${page === id ? "active" : ""}" data-t="${key}"></a>`;
    return `
    <div class="wrap">
      <a href="index.html" class="brand" aria-label="Classic Food">
        <img src="images/brand/mark.png" alt="" width="40" height="38">
        <span class="brand-text">CLASSIC<small>FOOD</small></span>
      </a>
      <nav class="mainnav" aria-label="Main">
        ${link("index.html", "nav_home", "home")}${link("menu.html", "nav_menu", "menu")}
        ${link("about.html", "nav_about", "about")}${link("location.html", "nav_location", "location")}
      </nav>
      <div class="top-actions">
        <button class="lang-btn" id="langBtn" type="button" aria-label="Language"></button>
        <a class="call-btn" href="tel:+961${PHONE1}">${svg("phone")}<span data-t="call"></span></a>
      </div>
    </div>`;
  }
  function tabbar() {
    const t = (href, key, id, ic) => `<a href="${href}" class="${page === id ? "active" : ""}">${svg(ic)}<span data-t="${key}"></span></a>`;
    return t("index.html", "nav_home", "home", "home") + t("menu.html", "nav_menu", "menu", "menu") +
      t("about.html", "nav_about", "about", "story") + t("location.html", "nav_location", "location", "pin");
  }
  function footer() {
    return `
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-brand">
          <img src="images/brand/logo.png" alt="Classic Food" width="110">
          <p data-t="foot_about"></p>
        </div>
        <div><h4 data-t="foot_pages"></h4><ul>
          <li><a href="index.html" data-t="nav_home"></a></li><li><a href="menu.html" data-t="nav_menu"></a></li>
          <li><a href="about.html" data-t="nav_about"></a></li><li><a href="location.html" data-t="nav_location"></a></li></ul></div>
        <div><h4 data-t="foot_contact"></h4><ul>
          <li><a href="tel:+961${PHONE1}" dir="ltr">+961 70 900 798</a></li>
          <li><a href="tel:+961${PHONE2}" dir="ltr">+961 70 900 978</a></li>
          <li><a href="${WA}" target="_blank" rel="noopener" data-t="whatsapp"></a></li></ul></div>
        <div><h4 data-t="foot_find"></h4><ul>
          <li data-t="addr"></li>
          <li><a href="${MAPS}" target="_blank" rel="noopener" data-t="directions"></a></li></ul></div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} Classic Food Baalbek — <span data-t="rights"></span></span>
        <div class="socials">
          <a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram">${svg("ig")}</a>
          <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${svg("wa")}</a>
          <a href="tel:+961${PHONE1}" aria-label="Call">${svg("phone")}</a>
        </div>
      </div>
    </div>`;
  }

  function mount() {
    const h = document.querySelector("header.topbar"); if (h) h.innerHTML = header();
    const f = document.querySelector("footer.footer"); if (f) f.innerHTML = footer();
    const tb = document.createElement("nav"); tb.className = "tabbar"; tb.setAttribute("aria-label", "Pages");
    tb.innerHTML = tabbar(); document.body.appendChild(tb);
    const wa = document.createElement("a"); wa.className = "wa-float"; wa.href = WA; wa.target = "_blank"; wa.rel = "noopener";
    wa.setAttribute("aria-label", "WhatsApp"); wa.innerHTML = svg("wa"); document.body.appendChild(wa);
    const showWa = () => wa.classList.toggle("show", scrollY > innerHeight * 0.6);
    addEventListener("scroll", showWa, { passive: true }); showWa();
    document.getElementById("langBtn").addEventListener("click", () => setLang(lang === "ar" ? "en" : "ar"));
  }

  // Page-level strings are registered with CF.strings(ar, en)
  const pageStrings = { ar: {}, en: {} };
  const listeners = [];

  function apply() {
    const dict = Object.assign({}, T[lang], pageStrings[lang]);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-t]").forEach((el) => { const v = dict[el.dataset.t]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-th]").forEach((el) => { const v = dict[el.dataset.th]; if (v != null) el.innerHTML = v; });
    document.querySelectorAll("[data-tp]").forEach((el) => { const v = dict[el.dataset.tp]; if (v != null) el.placeholder = v; });
    const b = document.getElementById("langBtn"); if (b) b.textContent = lang === "ar" ? "EN" : "ع";
    if (dict.title) document.title = dict.title;
    listeners.forEach((fn) => fn(lang));
  }
  function setLang(l) { lang = l; try { localStorage.setItem("cf_lang", l); } catch (e) {} apply(); }

  function reveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  const money = (p) => `<span class="price"><span class="cur">$</span>${Number(p).toFixed(p % 1 ? 2 : 0)}</span>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  let menuP = null;
  const loadMenu = () => (menuP = menuP || fetch("data/menu.json").then((r) => r.json()));

  window.CF = {
    get lang() { return lang; }, setLang, svg, money, esc, loadMenu, WA, IG, MAPS, PHONE1, PHONE2,
    strings(ar, en) { Object.assign(pageStrings.ar, ar); Object.assign(pageStrings.en, en); },
    onLang(fn) { listeners.push(fn); },
    t(key) { return (pageStrings[lang][key] ?? T[lang][key]) || key; },
    refresh() { apply(); reveal(); },
  };

  document.addEventListener("DOMContentLoaded", () => { mount(); apply(); reveal(); });
})();
