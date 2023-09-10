import { getPokemons } from "./getApi.js";

const description = document.querySelector(".pokemon-description");

// const typeColors = {
//     Normal: "#A8A878",
//     Fire: "#F08030",
//     Water: "#6890F0",
//     Electric: "#F8D030",
//     Grass: "#78C850",
//     Ice: "#98D8D8",
//     Fighting: "#C03028",
//     Poison: "#A040A0",
//     Ground: "#E0C068",
//     Flying: "#A890F0",
//     Psychic: "#F85888",
//     Bug: "#A8B820",
//     Rock: "#B8A038",
//     Ghost: "#705898",
//     Dragon: "#7038F8",
//     Dark: "#705848",
//     Steel: "#B8B8D0",
//     Fairy: "#EE99AC",
// };

// Função para buscar informações do Pokémon com base no 'id' (exemplo)
async function getPokemonInfo(pokemonId) {
    try {
        const pokemon = await getPokemons(pokemonId);

        if (pokemon) {
            const officialArtworkUrl =
                pokemon.sprites.other["official-artwork"].front_default;

            const pokemonInfo = {
                image: officialArtworkUrl,
                name: pokemon.name,
                height: (pokemon.height / 10).toFixed(1) + "m",
                weight: (pokemon.weight / 10).toFixed(1) + "kg",
                type: pokemon.types[0].type.name,
                abilities: pokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(", "),
            };

            return pokemonInfo;
        } else {
            throw new Error("Pokémon não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao buscar informações do Pokémon:", error);
        return null;
    }
}

// Obtenha o 'id' do Pokémon a partir dos parâmetros da URL
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

// Busque as informações do Pokémon com base no 'id'
getPokemonInfo(pokemonId).then((pokemonInfo) => {
    const typeColor = pokemonInfo.type;

    if (pokemonInfo) {
        // Atualize a página com as informações do Pokémon
        description.innerHTML += `
            <div class="pokemon">
                <img src="${pokemonInfo.image}"/>
                <h4 class = 'name'>${pokemonInfo.name}</h4>
            </div>
            <p class='tag-p'>Type: ${pokemonInfo.type}</p>
            <p class='tag-p'>Height: ${pokemonInfo.height}</p>
            <p class='tag-p'>Weight: ${pokemonInfo.weight}</p>
            <p class='tag-p'>Abilities: ${pokemonInfo.abilities}</p>
            `;
        // document.getElementById(
        //     "pokemonDescription"
        // ).textContent = `Description: ${pokemonInfo.description}`;
        const pokemon = document.querySelector(".pokemon");
        if (typeColor) pokemon.classList.add(typeColor);
        console.log(pokemon.classList);
    } else {
        // Lidar com o caso em que os dados do Pokémon não puderam ser obtidos
        console.error("Os dados do Pokémon não puderam ser obtidos.");
    }
});
