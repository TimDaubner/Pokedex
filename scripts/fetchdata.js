
function getBaseUrl() {
    let baseURL = "https://pokeapi.co/api/v2";
    return baseURL;
}

async function getPokemonGenInfo(start, end) {
    offsetPokemon = start;
    switchLoadingContent(true);
    try {
        let response = await fetch(`${getBaseUrl()}/pokemon?offset=${start}&limit=${end}`);
        let pokemonGen = await response.json();
        pokemonSearch = pokemonGen.results;

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

async function filterAndShowNames(filterWord) {
    filterName(filterWord);
    try {
        let promises = pokemonStorage.map(async pokemon => {
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

async function filterAndShowID(filterWord) {
    pokemonStorage = pokemonSearch.filter(pokemon => {
        return pokemon.id == filterWord;
    });
    try {
        let promises = pokemonStorage.map(async pokemon => {
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