function init() {
    getPokemonGenInfo(0, 151);
    //WHERE?!
    // getEvoChain(1, 78);
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
        loadFirstPokemon(storage);

    } catch (error) {
        console.error(error);
    }
}

//TODO: chain get with name ?!
async function getEvoChain(id) {
    try {
        let response = await fetch(`${getBaseUrl()}/evolution-chain/${id}`);
        let evoChain = await response.json();
        //return species.name f.e. "bulbasaur"
        console.log(evoChain.chain.species.name);
        if (evoChain.chain.evolves_to[0]) {
            console.log(evoChain.chain.evolves_to[0]);
        }
        if (evoChain.chain.evolves_to[0].evolves_to[0]) {
            console.log(evoChain.chain.evolves_to[0].species.name);
        }
        if (evoChain.chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
            console.log(evoChain.chain.evolves_to[0].species.name);
        }
        // console.log(evoChain.chain.evolves_to[0].evolves_to[0].species.name);
        // getPokemonEvolutions(evoChain.results);
    }
    catch (error) {
        console.error(error);
    }
}

//TODO: check if i wanna use it
async function getPokemonEvolutions(pokemonEvolutions) {
    try {
        let promises = pokemonEvolutions.map(async (evo) => {
            let res = await fetch(evo.evolves_to[0].species.name);
            return await res.json();
        });

        let storage = await Promise.all(promises);
        return storage;


    } catch (error) {
        console.error(error);
    }
}

//TODO: split it and rearange that
function loadFirstPokemon(data) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    let cacheNumber = 0;
    for (let i = 0; i < data.length / 8; i++) {
        content.innerHTML += getHTMLForPokeCard(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataMain(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataStats(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataShow(data, i, data[i].types[0].type.name);
        // document.getElementById(data[i].id).innerHTML += `${getPokemonEvolutions()}`;
        cacheNumber = i;
    }
    loadRestPokemon(data, cacheNumber);

}

function loadRestPokemon(data, cacheNumber) {
    for (cacheNumber; cacheNumber < data.length; cacheNumber++) {
        content.innerHTML += getHTMLForPokeCard(data, cacheNumber);
        document.getElementById(data[cacheNumber].id).innerHTML += getHTMLForDataMain(data, cacheNumber);
        document.getElementById(data[cacheNumber].id).innerHTML += getHTMLForDataStats(data, cacheNumber);
        document.getElementById(data[cacheNumber].id).innerHTML += getHTMLForDataShow(data, cacheNumber, data[cacheNumber].types[0].type.name);
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