const styles = [
    "./css/cardcolor.css",
    "./css/functionelements.css",
    "./css/header.css",
    "./css/pokecard.css",
];

function loadStyle(href) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.onerror = () => console.error(`Failed to load style: ${href}`);
    document.head.appendChild(l);
}

styles.forEach(loadStyle);

const scripts = [
    "./scripts/adjustdata.js",
    "./scripts/fetchdata.js",
    "./scripts/mychart.js",
    "./scripts/pokemongens.js",
    "./scripts/scrollbehaviour.js",
    "./scripts/template.js",
    "https://cdn.jsdelivr.net/npm/chart.js",
    "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2",

];

function loadScript(src, callback) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = callback;
    s.onerror = () => console.error(`Failed to load: ${src}`);
    document.head.appendChild(s);
}

(function load(index = 0) {
    if (index < scripts.length) {
        loadScript(scripts[index], () => load(index + 1));
    }
})();

