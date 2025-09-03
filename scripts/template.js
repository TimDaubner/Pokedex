function getHTMLForPokeCard(pokemon) {
    return `
    <div class="poke-card">
        <div onclick="openPokemon(${pokemon.id})" id="${pokemon.id}" class="frame-poke-card"></div>
    </div> `
}

function getHTMLForDataShow(pokemon, color, color2) {
    return `
        <div id="show_${pokemon.id}" class="data show">
            <p>Name: ${capitalizeFirstLetter(pokemon.name)} #${pokemon.id}</p>
            <p>Type: ${checkMoreTypes(pokemon.types)}</p>
        </div>
        <div class="sprite-frame ${color}-${color2}-card">
            <img class="sprite" src="${pokemon.sprites.other["official-artwork"].front_default}">
        </div>`
}

function getHTMLForDataMain(pokemon) {
    return `
        <div id="main_${pokemon.id}" class="data main">
            <p>Height: ${pokemon.height / 10} m</p>
            <p>Weight: ${pokemon.weight} lbs.</p>
            <p>Base Experience: ${pokemon.base_experience}</p>
            <p>Abilities: ${checkMoreAbilities(pokemon.abilities)}</p>
        </div>`
}

function getHTMLForDataStats(pokemon) {
    return `
        <div id="stats_${pokemon.id}" class="data stats">
            <p>${pokemon.stats[0].stat.name} : ${pokemon.stats[0].base_stat}</p>
            <p>${pokemon.stats[1].stat.name} : ${pokemon.stats[1].base_stat}</p>
            <p>${pokemon.stats[2].stat.name} : ${pokemon.stats[2].base_stat}</p>
            <p>${pokemon.stats[3].stat.name} : ${pokemon.stats[3].base_stat}</p>
            <p>${pokemon.stats[4].stat.name} : ${pokemon.stats[4].base_stat}</p>
            <p>${pokemon.stats[5].stat.name} : ${pokemon.stats[5].base_stat}</p>
        </div>`
}
