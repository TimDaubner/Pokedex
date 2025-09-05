function getHTMLForPokeCard(pokemon) {
    return `
    <div class="poke-card">
        <div onclick="openPokemon(${pokemon.id})" id="${pokemon.id}" class="frame-poke-card"></div>
    </div> `
}

function getHTMLForDataShow(pokemon) {
    return `
        <div id="show_${pokemon.id}" class="data show">
            <p>Name: ${capitalizeFirstLetter(pokemon.name)} #${pokemon.id}</p>
            <p>Type: ${checkMoreTypes(pokemon.types)}</p>
        </div>
        <div class="sprite-frame" ${styleCardBackground(pokemon.types)}>
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
            <canvas id="myChart"></canvas>
            <div class="arrow-btns">
                <button onclick="changePokemon('left',${pokemon.id})" class="previous-btn btn-gen">Past</button>
                <button onclick="changePokemon('right',${pokemon.id})" class="next-btn btn-gen">Next</button>
            </div>
        </div>`
}
