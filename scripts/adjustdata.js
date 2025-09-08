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

function styleCardBackground(types) {
    if (types.length > 1) {
        return `style="background:linear-gradient(45deg,var(--${types[0].type.name}) 0%, var(--${types[1].type.name}) 100% "`
    }
    else {
        return `style="background:linear-gradient(45deg,var(--${types[0].type.name}) 100%)"`
    }
}

function checkMoreAbilities(abilities) {
    let _abilities = '';
    for (let i = 0; i < abilities.length; i++) {
        if (i == 0)
            _abilities += `${abilities[i].ability.name} and `;
        else
            _abilities += `${abilities[i].ability.name}`;
    }
    return _abilities.trim();
}

function filterName(filterWord) {
    pokemonStorage = pokemonSearch.filter(pokemon => {
        return pokemon.name.includes(filterWord);
    });
}

function tryParseInt(value) {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
        return false;
    }
    return true;
}

function screenResolutionDropdown() {
    if (screen.width < 510) {
        document.getElementById('gen').classList.add('d_none');
        document.getElementById('gen_dropdown').classList.remove('d_none');
    }
}