let pokemonStorage = [];
let currentPokemon = [];
let offsetPokemon = -1;

function init() {
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

function filterAndShowNames(filterWord) {
    pokemonStorage = currentPokemon.filter(name => name.inculdes(filterWord));
}

function searchPokemon() {
    console.log(document.getElementById('input_pokemon').value);
}

function highlightButton(number) {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gen_${i}`).classList.remove('highlight');
    }
    document.getElementById(`gen_${number}`).classList.add('highlight');
}

function openPokemon(id) {
    let pokeInfoRef = document.getElementById('dialog_pokemon_info');
    let currentPokemonRef = currentPokemon[id - 1 - offsetPokemon];

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
        id--;
        closePokemon();
        openPokemon(currentPokemon[id - 1 - offsetPokemon].id);
    }
    else if (direction == "right" && id != currentPokemon.length + offsetPokemon) {
        id++;
        closePokemon();
        openPokemon(currentPokemon[id - 1 - offsetPokemon].id);
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