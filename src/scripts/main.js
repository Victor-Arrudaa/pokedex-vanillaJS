import { getPokemons } from "./api.js";

const pokemons = document.querySelector(".pokemons");
addPokemon();

async function addPokemon() {
    const numPokemonsToAdd = 9;
    const currentId = pokemons.querySelectorAll("li").length;

    for (let i = currentId + 1; i <= currentId + numPokemonsToAdd; i++) {
        const pokemon = await getPokemons(i);

        if (pokemon) {
            const officialArtworkUrl =
                pokemon.sprites.other["official-artwork"].front_default;

            const createPokemon = `
                <li>
                    <p>${pokemon.id}</p>
                    <img src="${officialArtworkUrl}" alt="${pokemon.name}">
                    <h3>${pokemon.name}</h3>
                </li>
            `;

            pokemons.innerHTML += createPokemon;
        }
    }
}

// Adiciona um ouvinte de eventos de clique ao botão "Carregar Mais"
const loadMoreButton = document.querySelector("#loadMore");
loadMoreButton.addEventListener("click", addPokemon);
