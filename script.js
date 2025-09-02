let pokemonStorage = [];
let currentPokemon = [];

function init() {
    getPokemonGenInfo(0, 151);
}

function getBaseUrl() {
    let baseURL = "https://pokeapi.co/api/v2";
    return baseURL;
}

async function getPokemonGenInfo(start, end) {
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
        let promises = pokemonGen.map(async (pokemon) => {
            let res = await fetch(pokemon.url);
            return await res.json();
        });

        let storage = await Promise.all(promises);
        currentPokemon = storage;

        renderPokemon(storage);
        document.getElementById('load_content').classList.add('d_none');

    } catch (error) {
        console.error(error);
    }
}

function renderPokemon(data) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const pokemon = data[i];
        content.innerHTML += getHTMLForPokeCard(pokemon);
        document.getElementById(pokemon.id).innerHTML += getHTMLForDataShow(pokemon, pokemon.types[0].type.name);
    }
}

function filterAndShowNames(filterWord) {
    pokemonStorage = currentPokemon.filter(name => name.inculdes(filterWord));
}

function openPokemon(id) {
    document.getElementById('dialog_pokemon').classList.remove('d_none');

    document.getElementById('dialog_pokemon_info').innerHTML += getHTMLForDataShow(currentPokemon[id - 1], currentPokemon[id - 1].types[0].type.name);
    document.getElementById('dialog_pokemon_info').innerHTML += getHTMLForDataMain(currentPokemon[id - 1]);
    document.getElementById('dialog_pokemon_info').innerHTML += getHTMLForDataStats(currentPokemon[id - 1]);
}

function closePokemon() {
    document.getElementById('dialog_pokemon_info').innerHTML = '';
    document.getElementById('dialog_pokemon').classList.add('d_none');
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