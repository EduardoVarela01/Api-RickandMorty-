//Asignación para un historial
//Prueba
let pokemonHistory = [];
document.getElementById('search').addEventListener('click', () => {
    displayPokemon();
    //Llamamos al pokemon y lo iniciamos como vacio
    document.getElementById('pokemon').value = '';
});
//Llamamos al ID de el historial y le asignamos la función de el historial
document.getElementById('show-history').addEventListener('click', () => {
    displayPokemonHistory();
});
//Llamamos ala variable para un nuevo tema y la inicializamos en vacio
//Llamamos otro ID para un nuevo equipo y la inicializamos en true 
document.getElementById('new-team').addEventListener('click', () => {
    disableElements(false);
    document.getElementById('pokemon-container').innerHTML='';
    document.getElementById('pokemon-alert').innerHTML = '';
    document.getElementById('new-team').disabled = true;
});

async function displayPokemon() {
    const pokemonName = document.getElementById('pokemon').value;
    //Agregamos un if y lo inicializamos como vacio para que el usuario en dado caso que no lo llene el campo y
    //entre la alerta
    if(!pokemonName) {
        showAlert('Empty field, please write something!');
        return;
    }
    const pokemon = await getPokemon(pokemonName);
    addPokemon(pokemon);
}
//creamos una función para obtener el pokemon
//También agregamos un if para en caso de que el dispositivo se encuentre sin conexión lance el error 404
//Tambien si ponemos otra cosa que no sea un pokemon que diga no se ah encontrado 
async function getPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(response.status === 404) {
            showAlert('Pokemon not found');
            return;
        }
        return await response.json();
    } catch(err) {
        showAlert("Bad connection? Try again");
    }
}

function addPokemon(pokemon) {
    pokemonHistory.push(pokemon);
    const pokemonList = document.getElementById('pokemon-container');
    const element = document.createElement('div');
    element.innerHTML = `
        <img src=${pokemon.sprites.front_default}
        <strong>Id</strong>: ${pokemon.id}
        <strong>Name</strong>: ${pokemon.name}
        <strong>Base Experience</strong>: ${pokemon.base_experience}
        <strong>First Ability</strong>: ${pokemon.abilities[0].ability.name}
    `;
    pokemonList.appendChild(element);
    if (pokemonList.childElementCount >= 3) {
        document.getElementById('new-team').disabled = false;
        disableElements(true);
        showAlert("You already completed your team! Go and fight");
    }
    pokemonHistory.sort((a, b) => {
        return a.base_experience - b.base_experience;
    });
}

function disableElements(status) {
    document.getElementById('pokemon').disabled = status;
    document.getElementById('search').disabled = status;
}

function showAlert(message) {
    document.getElementById('pokemon-alert').innerHTML='';
    const pokemonAlert = document.getElementById('pokemon-alert');
    const element =  document.createElement('div');
    element.innerHTML = `
        <h2>${message}</h2>
    `;
    pokemonAlert.appendChild(element);
}

function displayPokemonHistory() {
    const pokemonHistoryContainer = document.getElementById('history-container');
    pokemonHistory.innerHTML = "";
    pokemonHistory.forEach((pokemon) => {
    const element =  document.createElement('div');
    console.log(pokemon);
    element.innerHTML = `
        <img src='${pokemon.sprites.front_default}'>
        <strong>Id</strong>: ${pokemon.id}
        <strong>Name</strong>: ${pokemon.name}
        <strong>Base Experience</strong>: ${pokemon.base_experience}
        <strong>First Ability</strong>: ${pokemon.abilities[0].ability.name}
    `;
    pokemonHistoryContainer.appendChild(element);
    });
}
 