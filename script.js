
// async function getPokemnonInfo() {
//     getBadPromise().then((result) => {
//         console.log(result);
//     }).catch((error) => {
//         console.error(error);
//     })
// }

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
    document.getElementById('content').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('content').innerHTML += getHTMLForPokeCard(data, i);
    }
}

function getHTMLForPokeCard(data, i) {
    return `
    <div id="${data[i].id}" class="poke-card">
        <img class="sprite" src="${data[i].sprites.other["official-artwork"].front_default}">
        <div class="data">
            <p>Name: ${capitalizeFirstLetter(data[i].name)}</p>
            <p>Height: ${data[i].height / 10} m</p>
            <p>Weight: ${data[i].weight} lbs.</p>
            <p>Type: ${data[i].types[0].type.name}</p>
        </div>
    </div> `
}

function capitalizeFirstLetter(word) {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    return capitalized;
}

// async function fetchPath(url) {
//     let response = await fetch(url.toString());
//     return await response.json();
// }

function myFetch() {
    console.log(responseData);
}