//Reagcionamos al boton con un evento
//Lo primero que se tiene que ejecutar boton
document.getElementById('search').addEventListener('click', () => {
    displayAquaMorty();
});
//Creamos la función para llamar al pokemon
async function displayAquaMorty() {
    const aquaMortyName = document.getElementById('Aqua-Morty').value;
    const aquaMorty = await getAquaMorty(aquaMortyName);
    addaquaMorty(aquaMorty);
}
async function getAquaMorty(name) {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${name}`);
    return await response.json();
}
//Llamamos a un div 
function addaquaMorty(aquaMorty) {
    const aquaMortyList = document.getElementById('aqua morty-container');
    const element = document.createElement('div');
    element.innerHTML = `
        <strong>Id</strong>: ${aquaMorty.id}
        <strong>Name</strong>: ${aquaMorty.name}
        <strong>STATUS</strong>: ${aquaMorty.status}
        <strong>SPECIES</strong>: ${aquaMorty.species}
    `;
    aquaMortyList.appendChild(element);
}

