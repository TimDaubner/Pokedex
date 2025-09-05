let pokemonStorage = [];
let currentPokemon = [];
let pokemonSearch = [];
let offsetPokemon = -1;

function init() {
    addGenButtons();
    highlightButton(1);
    getPokemonGenInfo(0, 151);
}

function switchLoadingContent(isLoading) {
    if (!isLoading) {
        document.getElementById('load_content').classList.add('d_none');
        document.getElementById('header').classList.remove('d_none');
        document.getElementById('gen').classList.remove('d_none');
        document.getElementById('content').classList.remove('d_none');
    }
    else if (isLoading) {
        document.getElementById('load_content').classList.remove('d_none');
        document.getElementById('header').classList.add('d_none');
        document.getElementById('gen').classList.add('d_none');
        document.getElementById('content').classList.add('d_none');
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
}

function searchPokemon() {
    console.log(pokemonSearch);
    let filterWord = document.getElementById('input_pokemon').value;
    if (tryParseInt(filterWord)) {
        filterAndShowID(filterWord);
        return;
    }
    if (filterWord.length <= 3) {
        document.getElementById('input_pokemon').placeholder = 'min. 3 letters...'
        document.getElementById('input_pokemon').value = '';
        return;
    }
    filterWord = filterWord.toString().toLowerCase();
    filterAndShowNames(filterWord);
}

function highlightButton(number) {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gen_${i}`).classList.remove('highlight');
    }
    document.getElementById(`gen_${number}`).classList.add('highlight');
}

function addGenButtons() {
    let pokemonGens = [{ start: 0, end: 151 }, { start: 151, end: 100 }, { start: 251, end: 135 }, { start: 386, end: 107 }, { start: 493, end: 156 }, { start: 649, end: 72 }, { start: 721, end: 88 }, { start: 809, end: 96 }, { start: 905, end: 120 }];
    let genRef = document.getElementById('gen');
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
}

function hideElementsForOverlay() {
    document.body.style.overflow = "hidden";
    document.getElementById('dialog_pokemon').classList.remove('d_none');
    document.getElementById('myBtn').style.zIndex = "0";
}

function checkTypesOfPokemon(pokeInfoRef, currentPokemonRef) {
    if (currentPokemonRef.types.length > 1) {
        pokeInfoRef.innerHTML += getHTMLForDataShow(currentPokemonRef, currentPokemonRef.types[0].type.name, currentPokemonRef.types[1].type.name);
    }
    else {
        pokeInfoRef.innerHTML += getHTMLForDataShow(currentPokemonRef, currentPokemonRef.types[0].type.name, "no");
    }
}

function closePokemon() {
    document.body.style.overflow = "visible";
    document.getElementById('dialog_pokemon_info').innerHTML = '';
    document.getElementById('dialog_pokemon').classList.add('d_none');
    document.getElementById('myBtn').style.zIndex = "1";
}

function changePokemon(direction, id) {
    if (direction == "left" && id != offsetPokemon + 1) {
        closePokemon();
        for (let i = 0; i < currentPokemon.length; i++) {
            if (id == currentPokemon[i].id) {
                openPokemon(currentPokemon[i - 1].id);
            }
        }
    }
    else if (direction == "right") {
        closePokemon();
        for (let i = 0; i < currentPokemon.length; i++) {
            if (id == currentPokemon[i].id && i != currentPokemon.length - 1) {
                openPokemon(currentPokemon[i + 1].id);
            }
        }
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

//TODO: chain get with name ?!
// async function getEvoChain(id) {
//     try {
//         let response = await fetch(`${getBaseUrl()}/evolution-chain/${id}`);
//         let evoChain = await response.json();
//         //return species.name f.e. "bulbasaur"
//         console.log(evoChain.chain.species.name);
//         if (evoChain.chain.evolves_to[0]) {
//             console.log(evoChain.chain.evolves_to[0]);
//         }
//         if (evoChain.chain.evolves_to[0].evolves_to[0]) {
//             console.log(evoChain.chain.evolves_to[0].species.name);
//         }
//         if (evoChain.chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
//             console.log(evoChain.chain.evolves_to[0].species.name);
//         }
//         // console.log(evoChain.chain.evolves_to[0].evolves_to[0].species.name);
//         // getPokemonEvolutions(evoChain.results);
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

//TODO: check if i wanna use it
// async function getPokemonEvolutions(pokemonEvolutions) {
//     try {
//         let promises = pokemonEvolutions.map(async (evo) => {
//             let res = await fetch(evo.evolves_to[0].species.name);
//             return await res.json();
//         });

//         let storage = await Promise.all(promises);
//         return storage;


//     } catch (error) {
//         console.error(error);
//     }
// }