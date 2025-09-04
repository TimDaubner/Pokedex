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
        if (i == 0)
            _abilities += `${abilities[i].ability.name} and `;
        else
            _abilities += `${abilities[i].ability.name}`;
    }
    return _abilities.trim();
}

function tryParseInt(value) {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
        return false;
    }
    return true;
}