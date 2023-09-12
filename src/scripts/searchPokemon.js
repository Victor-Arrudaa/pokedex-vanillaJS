const searchInput = document.getElementById("searchInput");
const searchLink = document.getElementById("searchLink");

searchLink.addEventListener("click", async (event) => {
    event.preventDefault();

    const pokemonName = searchInput.value.trim();
    if (pokemonName !== "") {
        try {
            const pokemon = await getPokemonByName(pokemonName);
            console.log(pokemon.id);
            if (pokemon) {
                displayPokemonInfo(pokemon);
            } else {
                console.log("Pokémon não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar o Pokémon:", error);
        }
    } else {
        console.log("Digite o nome do Pokémon na caixa de pesquisa.");
    }
});

// Função para buscar um Pokémon pelo nome usando a API
async function getPokemonByName(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json();
}

// Função para exibir informações do Pokémon
function displayPokemonInfo(pokemon) {
    window.location = `info.html?id=${pokemon.id}`;
}
