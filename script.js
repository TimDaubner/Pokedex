let pokemonStorage = [];
let currentPokemon = [];
let offsetPokemon = -1;

function init() {
    highlightButton(1);
    getPokemonGenInfo(0, 151);
}

function getBaseUrl() {
    let baseURL = "https://pokeapi.co/api/v2";
    return baseURL;
}

async function language(lang) {
    try {
        let response = await fetch(`${getBaseUrl()}/pokemon-species/1/`);
        let langDE = await response.json();
        console.log(langDE);

    } catch (error) {
        console.error(error);
    }
}

async function getPokemonGenInfo(start, end) {
    if (offsetPokemon == start) return;

    offsetPokemon = start;
    switchLoadingContent(true);
    try {
        let response = await fetch(`${getBaseUrl()}/pokemon?offset=${start}&limit=${end}`);
        let pokemonGen = await response.json();

        getPokemonProperties(pokemonGen.results);
    } catch (error) {
        console.error(error);
    }
}

async function getPokemonProperties(pokemonGen) {
    try {
        let promises = pokemonGen.map(async pokemon => {
            let response = await fetch(pokemon.url);
            return await response.json();
        });

        let storage = await Promise.all(promises);
        currentPokemon = storage;
        switchLoadingContent(false);
        renderPokemon(storage);

    } catch (error) {
        console.error(error);
    }
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

function highlightButton(number) {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gen_${i}`).classList.remove('highlight');
    }
    document.getElementById(`gen_${number}`).classList.add('highlight');
}

function openPokemon(id) {
    let pokeInfoRef = document.getElementById('dialog_pokemon_info');
    document.body.style.overflow = "hidden";
    document.getElementById('dialog_pokemon').classList.remove('d_none');
    document.getElementById('myBtn').style.zIndex = "-1";
    let currentPokemonRef = currentPokemon[id - 1 - offsetPokemon];
    if (currentPokemonRef.types.length > 1) {
        pokeInfoRef.innerHTML += getHTMLForDataShow(currentPokemonRef, currentPokemonRef.types[0].type.name, currentPokemonRef.types[1].type.name);
    }
    else {
        pokeInfoRef.innerHTML += getHTMLForDataShow(currentPokemonRef, currentPokemonRef.types[0].type.name, "no");
    }
    pokeInfoRef.innerHTML += getHTMLForDataMain(currentPokemonRef);
    pokeInfoRef.innerHTML += getHTMLForDataStats(currentPokemonRef);

}

function closePokemon() {
    document.body.style.overflow = "visible";
    document.getElementById('dialog_pokemon_info').innerHTML = '';
    document.getElementById('dialog_pokemon').classList.add('d_none');
    document.getElementById('myBtn').style.zIndex = "1";
}

function changePokemon(direction, id) {
    if (direction == "left") {
        openPokemon(currentPokemon[id - 1].id);
    }
    else if (direction == "right") {
        openPokemon(currentPokemon[id + 1].id);
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

function capitalizeFirstLetter(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

function checkMoreTypes(types) {
    let _types = '';
    for (let i = 0; i < types.length; i++) {
        _types += types[i].type.name + ' ';
    }
    return _types.trim();
}

function checkMoreAbilities(abilities) {
    let _abilities = '';
    for (let i = 0; i < abilities.length; i++) {
        _abilities += abilities[i].ability.name + ' ';
    }
    return _abilities.trim();
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