function getHTMLForPokeCard(data, i) {
    return `
    <div id="${data[i].id}" class="poke-card">
    </div> `
}

function getHTMLForDataShow(data, i) {
    return `
        <div id="show_${data[i].id}" class="data show">
            <p>Name: ${capitalizeFirstLetter(data[i].name)} #${data[i].id}</p>
            <p>Type: ${checkMoreTypes(data[i].types)}</p>
        </div>
        <div onclick="toggleInfo(${data[i].id})" class="sprite-frame">
            <img class="sprite" src="${data[i].sprites.other["official-artwork"].front_default}">
        </div>`
}

function getHTMLForDataMain(data, i) {
    return `
        <div id="main_${data[i].id}" class="data main d_none">
            <p>Height: ${data[i].height / 10} m</p>
            <p>Weight: ${data[i].weight} lbs.</p>
            <p>Base Experience: ${data[i].base_experience}</p>
            <p>Abilities: ${checkMoreAbilities(data[i].abilities)}</p>
        </div>`
}

function getHTMLForDataStats(data, i) {
    return `
        <div id="stats_${data[i].id}" class="data main d_none">
            <p>${data[i].stats[0].stat.name} : ${data[i].stats[0].base_stat}</p>
            <p>${data[i].stats[1].stat.name} : ${data[i].stats[1].base_stat}</p>
            <p>${data[i].stats[2].stat.name} : ${data[i].stats[2].base_stat}</p>
            <p>${data[i].stats[3].stat.name} : ${data[i].stats[3].base_stat}</p>
            <p>${data[i].stats[4].stat.name} : ${data[i].stats[4].base_stat}</p>
            <p>${data[i].stats[5].stat.name} : ${data[i].stats[5].base_stat}</p>
        </div>`
}
