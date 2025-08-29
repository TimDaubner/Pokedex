async function getPokemonInfo(start, end) {
    try {
        let response = (await fetch(`${fetchBaseDataPokemonAPI()}/pokemon?offset=${start}&limit=${end}`));
        let pokemonGen = await response.json();
        getPokemonProperties(pokemonGen);
    } catch (error) {
        console.error(error);
    }
}

async function getPokemonProperties(pokemonGen) {
    try {
        let storage = [];
        for (let i = 0; i < pokemonGen.results.length; i++) {
            let data = pokemonGen.results[i].url;
            responsePokemonData = await fetch(data);
            responsePokemonData = await responsePokemonData.json();
            storage[i] = responsePokemonData;
        }
        await loadPokemon(storage);
    } catch (error) {
        console.error(error);
    }
}

function fetchBaseDataPokemonAPI() {
    let baseURL = "https://pokeapi.co/api/v2";
    return baseURL;
}

function loadPokemon(data) {
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        content.innerHTML += getHTMLForPokeCard(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataShow(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataMain(data, i);
        document.getElementById(data[i].id).innerHTML += getHTMLForDataStats(data, i);
    }
}


function getHTMLForEvolution(data, i) {
    return `  
        <div id="evo_chain_${data[i].id}" class="data main d_none">
            <p>${checkForEvoChain()}</p>
        </div>`
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

function checkForEvoChain(evoChain) {
    let _evoChain = '';
    for (let i = 0; i < evoChain.length; i++) {
        _evoChain += evoChain[i].ability.name + ' ';
    }
    return _evoChain.trim();
}

function myFetch() {
    console.log(responseData);
}