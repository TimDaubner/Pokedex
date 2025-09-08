let pokemonStorage = [];
let currentPokemon = [];
let pokemonSearch = [];
let offsetPokemon = -1;

function init() {
    addGenButtons(document.getElementById('gen'));
    addGenButtons(document.getElementById('gen_content'));
    highlightButton(1);
    getPokemonGenInfo(0, 151);
}

function switchLoadingContent(isLoading) {
    if (!isLoading) {
        document.getElementById('load_content').classList.add('d_none');
        document.getElementById('header').classList.remove('d_none');
        document.getElementById('gen').classList.remove('d_none');
        document.getElementById('content').classList.remove('d_none');
        document.getElementById('wrapper').classList.remove('d_none');
    }
    else if (isLoading) {
        document.getElementById('load_content').classList.remove('d_none');
        document.getElementById('header').classList.add('d_none');
        document.getElementById('gen').classList.add('d_none');
        document.getElementById('content').classList.add('d_none');
        document.getElementById('wrapper').classList.add('d_none');
    }
}

function renderPokemon(data) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const pokemon = data[i];
        content.innerHTML += getHTMLForPokeCard(pokemon);
        if (pokemon.types.length > 1) {
            document.getElementById(pokemon.id).innerHTML += getHTMLForDataShow(pokemon, pokemon.types[0].type.name, pokemon.types[1].type.name);
        }
        else {
            document.getElementById(pokemon.id).innerHTML += getHTMLForDataShow(pokemon, pokemon.types[0].type.name, "no");
        }
    }
    screenResolutionDropdown();
}

function searchPokemon() {
    let filterWord = document.getElementById('input_pokemon').value;
    if (tryParseInt(filterWord)) {
        filterAndShowID(filterWord);
        return;
    }
    if (filterWord.length < 3 && filterWord.length != 0) {
        document.getElementById('warning').classList.remove('d_none');
        return;
    }
    if (filterWord.trim() === '') {
        renderPokemon(currentPokemon);
    }
    filterWord = filterWord.toString().toLowerCase();
    filterAndShowNames(filterWord);
    document.getElementById('warning').classList.add('d_none');
}

function closeWarning() {
    document.getElementById('warning').classList.add('d_none');
}

function highlightButton(number) {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gen_${i}`).classList.remove('highlight');
    }
    document.getElementById(`gen_${number}`).classList.add('highlight');
}

function addGenButtons(genRef) {
    for (let i = 0; i < 9; i++) {
        genRef.innerHTML += `<button id="gen_${i + 1}" onclick="getPokemonGenInfo(${pokemonGens[i].start},${pokemonGens[i].end}), highlightButton(${i + 1})" class="btn-gen">Gen ${i + 1}</button>`
    }
}

function openPokemon(id) {
    let pokeInfoRef = document.getElementById('dialog_pokemon_info');
    let currentPokemonRef;
    for (let i = 0; i < currentPokemon.length; i++) {
        if (id == currentPokemon[i].id) {
            currentPokemonRef = currentPokemon[i];
        }
    }
    hideElementsForOverlay();
    checkTypesOfPokemon(pokeInfoRef, currentPokemonRef);
    pokeInfoRef.innerHTML += getHTMLForDataMain(currentPokemonRef);
    pokeInfoRef.innerHTML += getHTMLForDataStats(currentPokemonRef);
    createChart(currentPokemonRef);
    hideNextOrPastBtn(currentPokemonRef);
}

function hideElementsForOverlay() {
    document.body.style.overflow = "hidden";
    document.getElementById('dialog_pokemon').classList.remove('d_none');
    document.getElementById('myBtn').style.zIndex = "0";
}

function checkTypesOfPokemon(pokeInfoRef, currentPokemonRef) {
    pokeInfoRef.innerHTML += getHTMLForDataShow(currentPokemonRef);
}

function closePokemon() {
    document.body.style.overflow = "visible";
    document.getElementById('dialog_pokemon_info').innerHTML = '';
    document.getElementById('dialog_pokemon').classList.add('d_none');
    document.getElementById('myBtn').style.zIndex = "1";
}

function changePokemon(direction, id) {
    const index = currentPokemon.findIndex(p => p.id === id);
    if (direction == "left" && index > 0) {
        checkNextOrPast(-1, index);
    }
    else if (direction == "right" && index < currentPokemon.length - 1) {
        if (currentPokemon.length == id) return;
        checkNextOrPast(1, index)
    }
}

function checkNextOrPast(identifier, index) {
    closePokemon();
    const nextPokemon = currentPokemon[index + identifier];
    openPokemon(nextPokemon.id);
}

function hideNextOrPastBtn(nextPokemon) {
    if (nextPokemon.id == currentPokemon[currentPokemon.length - 1].id) {
        document.getElementById(`change_right_${nextPokemon.id}`).classList.add('d_none');
    }
    if (nextPokemon == currentPokemon[0]) {
        document.getElementById(`change_left_${nextPokemon.id}`).classList.add('d_none');
    }
}

function toggleInfo(id) {
    if (document.getElementById(`main_${id}`).classList.contains('d_none')) {
        document.getElementById(`main_${id}`).classList.remove('d_none');
        document.getElementById(`stats_${id}`).classList.remove('d_none');
    }
    else {
        document.getElementById(`main_${id}`).classList.add('d_none');
        document.getElementById(`stats_${id}`).classList.add('d_none');
    }
}

function stopBubbling(event) {
    event.stopPropagation();
}