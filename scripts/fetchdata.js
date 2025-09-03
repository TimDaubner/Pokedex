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