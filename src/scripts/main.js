import { getPokemons } from "./getApi.js";

const pokemons = document.querySelector(".pokemons");
addPokemon();

async function addPokemon() {
    const numPokemonsToAdd = 10;
    const currentId = pokemons.querySelectorAll("li").length;

    for (let i = currentId + 1; i <= currentId + numPokemonsToAdd; i++) {
        const pokemon = await getPokemons(i);

        if (pokemon) {
            const officialArtworkUrl =
                pokemon.sprites.other["official-artwork"].front_default;

            const createPokemon = `
                <a href="info.html?id=${pokemon.id}">
                    <li>
                        <p>${pokemon.id}</p>
                        <img src="${officialArtworkUrl}" alt="${pokemon.name}">
                        <h3>${pokemon.name}</h3>
                    </li>
                </a>
            `;

            pokemons.innerHTML += createPokemon;
        }
    }
    // Dentro da função 'addPokemon'
    const pokemonLinks = pokemons.querySelectorAll("a");

    pokemonLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            // Impede o comportamento padrão do link para que ele não navegue imediatamente
            event.preventDefault();

            // Obtenha o URL da página "info.html" do atributo 'href' do link
            const infoPageURL = link.getAttribute("href");

            // Redirecione para a página "info.html"
            window.location.href = infoPageURL;
        });
    });
}

// Adiciona um ouvinte de eventos de clique ao botão "Carregar Mais"
const loadMoreButton = document.querySelector("#loadMore");
loadMoreButton.addEventListener("click", addPokemon);
