// Общая шапка, тема и табы для всех страниц
(function () {
  const PAGES = [
    ["", "Коротко"],
    ["skhema/", "Схема SEO"],
    ["klienty/", "Типы клиентов"],
    ["skrytyy-spros/", "Скрытый спрос"],
    ["linkbilding/", "Ссылки и площадки"],
    ["zavody/", "Наш завод и Васин"],
    ["benchmarki/", "Свежие данные"],
    ["komanda/", "Команда SEO"],
    ["baza/", "База знаний"],
  ];
  const root = document.documentElement.dataset.root || "./";
  const here = document.documentElement.dataset.page || "";

  try {
    const t = localStorage.getItem("seo-karta-theme");
    if (t) document.documentElement.dataset.theme = t;
  } catch (e) {}

  const top = document.createElement("div");
  top.className = "top";
  top.innerHTML =
    '<div class="wrap"><a class="brand" href="' + root + '"><b>SEO</b><span> · карта</span></a><nav class="nav">' +
    PAGES.map(([p, n]) => '<a href="' + root + p + '"' + (p === here ? ' aria-current="page"' : "") + ">" + n + "</a>").join("") +
    '</nav><button class="theme" title="Тема" aria-label="Сменить тему">◐</button></div>';
  document.body.prepend(top);
  const cur = top.querySelector("[aria-current]");
  if (cur) cur.scrollIntoView({ inline: "center", block: "nearest" });

  top.querySelector(".theme").addEventListener("click", () => {
    const d = document.documentElement;
    const dark = d.dataset.theme ? d.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    d.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("seo-karta-theme", d.dataset.theme); } catch (e) {}
  });

  // табы: <div class="tabs" data-group="x"><button data-tab="a">…  + <div class="panel" data-group="x" data-tab="a">
  document.querySelectorAll(".tabs[data-group]").forEach((tabs) => {
    const g = tabs.dataset.group;
    const btns = tabs.querySelectorAll("button[data-tab]");
    const show = (id) => {
      btns.forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === id));
      document.querySelectorAll('.panel[data-group="' + g + '"]').forEach((p) => (p.hidden = p.dataset.tab !== id));
    };
    btns.forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
    if (btns[0]) show(btns[0].dataset.tab);
  });

  const f = document.createElement("footer");
  f.innerHTML = '<div class="wrap">Внутренний разбор, 24.10.2026. Цифры – с источником и датой; то, что не проверено, так и помечено.</div>';
  document.body.append(f);
})();
