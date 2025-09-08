//For tidy up my index.html less links ;)

const styles = [
    "./css/cardcolor.css",
    "./css/functionelements.css",
    "./css/header.css",
    "./css/pokecard.css",
];

function loadAllStyleSheets(href) {
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = href;
    cssLink.onerror = () => console.error(`Failed to load style: ${href}`);
    document.head.appendChild(cssLink);
}

styles.forEach(loadAllStyleSheets);

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

function loadAllScripts(src, callback) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = callback;
    s.onerror = () => console.error(`Failed to load: ${src}`);
    document.head.appendChild(s);
}

(function load(index = 0) {
    if (index < scripts.length) {
        loadAllScripts(scripts[index], () => load(index + 1));
    }
})();

