let offset = 0
const limit = 5
const loadMoreButton = document.getElementById('loudMoreButton')
const pokemonList = document.getElementById("pokemonList")
const maxRecords = 15

function loadPokemonsItens(offset , limit){
    pokeApi.getPokemons(offset,limit).then((pokemons => {
        const newHtml = pokemons.map((pokemon => {
            return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                <div class="detail">
                <ol class="types">
                ${pokemon.types.map((typeSlot) => `<li class="type ${typeSlot}">${typeSlot}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                alt="${pokemon.name}">
                </div> 
        </li>
        `
        })).join('')
        pokemonList.innerHTML += newHtml
    }))
}

// Carrega os primeiros pokémons ao abrir a página
loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
debugger
    offset += limit
    const qtdRecordNextPage = offset + limit
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
loadPokemonsItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
            loadPokemonsItens(offset, limit)
    }
})