/* Home page */
(function () {
  CF.strings(
    {
      title: "كلاسيك فود بعلبك | برغر، مشاوي، سوشي وحلويات",
      hero_title: 'طعم <span class="y">كلاسيكي</span><br>بروح عصرية',
      hero_sub: "برغر، مشاوي، شاورما، بيتزا، سوشي، عصائر طازجة وحلويات — كل ما تشتهيه في مكان واحد بقلب بعلبك.",
      cta_menu: "تصفّح المنيو", cta_visit: "كيف توصلنا",
      meta_addr: "شارع رأس العين، مقابل فرنسبنك",
      offer: "🍣 عرض: ٢٠ قطعة سوشي سلمون وكراب بـ ٢٥$",
      k_eyebrow: "مطابخنا", k_title: "ستة مطابخ، <br>عنوان واحد", k_all: "كل المنيو",
      n_eyebrow: "جديد عنّا", n_title: "وصل حديثاً<br>على المنيو", n_lead: "أطباق ومشروبات جديدة انضمّت للقائمة — جرّبها قبل الكل.",
      s_eyebrow: "قصتنا", s_title: "من شارع رأس العين إلى كل بيت ببعلبك",
      s_lead: "كلاسيك فود مطعم من قلب بعلبك، بيجمع الأكل الغربي والمشاوي الشرقية والسوشي والحلويات تحت سقف واحد — بنفس الجودة وبنفس الطعم يلي بتحبّو.",
      f1: "مطبوخ عالطلب", f1d: "كل صنف بيتحضّر لما تطلبو، سخن وطازة.",
      f2: "مكونات منتقاة", f2d: "لحوم ودجاج وخضار وفواكه مختارة بعناية.",
      f3: "للعيلة والأصحاب", f3d: "من الترويقة للعشا، في شي لكل حدا.",
      s_more: "اقرأ قصتنا", stamp: "بعلبك ✦ كلاسيك فود ✦",
      follow: "تابعونا على إنستغرام",
      cta_title: "جوعان؟ نحنا جاهزين.", cta_text: "اتصل أو ابعتلنا على واتساب وطلبك بيكون عندك.",
    },
    {
      title: "Classic Food Baalbek | Burgers, Grills, Sushi & Desserts",
      hero_title: 'Classic <span class="y">taste</span>,<br>modern soul',
      hero_sub: "Burgers, grills, shawarma, pizza, sushi, fresh juices and desserts — everything you crave, under one roof in the heart of Baalbek.",
      cta_menu: "Explore the menu", cta_visit: "Find us",
      meta_addr: "Ras Al Ain St., facing Fransabank",
      offer: "🍣 Offer: 20 pcs salmon & crab sushi — $25",
      k_eyebrow: "Our kitchens", k_title: "Six kitchens,<br>one address", k_all: "Full menu",
      n_eyebrow: "Just added", n_title: "New on<br>the menu", n_lead: "Fresh additions to the menu — be the first to try them.",
      s_eyebrow: "Our story", s_title: "From Ras Al Ain Street to every home in Baalbek",
      s_lead: "Classic Food is a Baalbek restaurant that brings western favourites, oriental grills, sushi and desserts together under one roof — with the quality and taste you love.",
      f1: "Cooked to order", f1d: "Every dish is prepared when you order it — hot and fresh.",
      f2: "Carefully chosen", f2d: "Selected meats, chicken, vegetables and fruit.",
      f3: "For family & friends", f3d: "From breakfast to dinner, something for everyone.",
      s_more: "Read our story", stamp: "BAALBEK ✦ CLASSIC FOOD ✦",
      follow: "Follow on Instagram",
      cta_title: "Hungry? We're ready.", cta_text: "Call us or message us on WhatsApp and your order is on its way.",
    }
  );

  const COVER = { 11: "s21", 116: "s49", 12: "s10", 13: "s13", 17: "s6", 111: "s42" };
  const IG_PICS = ["s21", "s42", "s49", "s9", "s6", "s15", "s51", "s14", "s39", "s37", "s16", "s48"];

  let data;
  function render() {
    const { esc } = CF;
    const L = CF.lang;
    // instagram grid
    document.getElementById("igGrid").innerHTML = IG_PICS.map((p) =>
      `<a href="${CF.IG}" target="_blank" rel="noopener" aria-label="Instagram"><img src="images/sections/${p}.webp" alt="" loading="lazy"></a>`).join("");
    if (!data) return;
    document.getElementById("kitchens").innerHTML = data.categories.map((c) => {
      const n = c.sections.reduce((a, s) => a + s.items.length, 0);
      return `<a class="kcard" href="menu.html#c${c.id}"><img src="images/sections/${COVER[c.id]}.webp" alt="" loading="lazy">
        <div class="kbody"><h3>${esc(L === "en" ? c.en : c.ar)}</h3><span class="kcount">${n} ${L === "en" ? "items" : "صنف"}</span></div></a>`;
    }).join("");
    const fresh = [];
    data.categories.forEach((c) => c.sections.forEach((s) => s.items.forEach((it) => { if (it.new && it.img) fresh.push(it); })));
    document.getElementById("newRail").innerHTML = fresh.map(CF.dish.card).join("");
  }

  CF.onLang(render);
  CF.loadMenu().then((d) => { data = d; CF.dish.register(d); render(); });
})();
