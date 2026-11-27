/* Entry animation built from the real logo image.
   The logo (images/brand/logo.png, 325×361) is cut into horizontal slices with clip-path:
   the burger layers drop from above and stack, then "CLASSIC" rises and "FOOD" opens up —
   the final frame is exactly the restaurant logo. Plays once per visit; tap to skip. */
(function () {
  var root = document.documentElement;
  var seen = false;
  try { seen = sessionStorage.getItem("cf_intro") === "1"; } catch (e) {}
  if (location.search.indexOf("intro=1") > -1) seen = false;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (seen || reduce) return;
  root.classList.add("intro-on");

  var H = 361; // logo height in px; cuts follow the shared outlines between layers
  var slices = [
    // [top, bottom, class]  — listed in the order they appear
    [159, 200, "drop d1"], // bottom bun
    [134, 159, "drop d2"], // lower patty
    [104, 134, "drop d3"], // middle layer + cheese
    [80, 104, "drop d4"],  // upper layer
    [0, 80, "drop d5"],    // top bun with sesame
    [200, 283, "word w1"], // CLASSIC
    [283, 361, "word w2"], // FOOD
  ];
  var pct = function (v) { return (v / H * 100).toFixed(3) + "%"; };

  function build() {
    var el = document.createElement("div");
    el.className = "intro";
    el.setAttribute("role", "presentation");
    var html = '<div class="intro-logo">';
    slices.forEach(function (s) {
      html += '<div class="slice ' + s[2] + '" style="clip-path:inset(' + pct(s[0]) + " 0 " + pct(H - s[1]) + ')"></div>';
    });
    html += '<div class="slice full"></div></div>' +
      '<div class="intro-sub">BAALBEK · بعلبك</div>' +
      '<button class="intro-skip" type="button">Skip ›</button>';
    el.innerHTML = html;
    document.body.appendChild(el);

    var done = false;
    function finish() {
      if (done) return; done = true;
      try { sessionStorage.setItem("cf_intro", "1"); } catch (e) {}
      el.classList.add("out");
      root.classList.remove("intro-on");
      setTimeout(function () { el.remove(); }, 900);
    }
    el.addEventListener("click", finish);
    setTimeout(finish, 3700);
  }
  if (document.body) build(); else document.addEventListener("DOMContentLoaded", build);
})();
