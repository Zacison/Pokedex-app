
import * as Search from './dataModels/Search';

import axios from 'axios';



//Search controller
const pokeSearch = () => {
    //when somebody calls the search function, what happens?

    //get the search value

    //Call the api, and get the data back

    //display the values on the screen
}







//global state
const state = {
    AllPokéProperties: '',
    pokemon: '',
    searchName: '',
    searchType: ''
}



const pokedex = document.getElementById('pokedex');


const displayPokemon = (pokemon) => {
    //console.log(pokemon);
    const markup = pokemon.map(mon => `
    <a class="card-link"> 
        <li class="card">
            <img class="card-image" src="${mon.image}"/>
            <div class="card__text-container">
                <h2 class="card-title">${mon.id}: ${mon.name}</h2>
                <p class="card-subtitle">Type: ${mon.type}</p>
            </div>
        </li>    
    </a>
    `)
    .join('');
    pokedex.innerHTML = markup;
};



let card = document.querySelector('.card');




//Search function
const searchName = document.querySelector('.search__field');
const searchButton = document.querySelector('.search__button');

const searchFunction = () => {
    let input = searchName.value;
    searchName.value = '';
    state.searchName = '';
    state.searchType = '';
    
    if((input === 'normal' || input === 'fighting' || input === 'poison' ||
    input === 'ground' || input === 'rock' || input === 'bug' ||
    input === 'ghost' || input === 'steel' || input === 'fire' ||
    input === 'water' || input === 'grass' || input === 'electric' ||
    input === 'psychic' || input === 'ice' || input === 'dragon' ||
    input === 'dark' || input === 'flying' )) {
        state.searchType = input;
    } else {
        state.searchName = input;
    }

    filteredPokemon();
}



document.addEventListener('click', (e) => {
    if((e.target == searchButton) ) {
        searchFunction();
    } else if(e.target.parentElement.className == 'card-link'
            || e.target.parentElement.className == 'card'
            || e.target.parentElement.className == 'card-image'
            || e.target.parentElement.className == 'card__text-container'
            || e.target.parentElement.className == 'card-title'
            || e.target.parentElement.className == 'card-subtitle'
    ) {
        let passedElement = event.target.closest('li').children[1].children[0].textContent;
        //console.log(passedElement);
        getFullPokeProperties(passedElement);
    } 
    
});
    
document.addEventListener('keypress', (e) => {
    if(e.charCode == 13) {
        searchFunction();     
    }
});

    
const filteredPokemon = () => {   
    //use the data in state to filter through
    //console.log(state);
    let allMons = state.pokemon;
    let searchName = state.searchName;
    let searchType = state.searchType;

    if(searchType != '') {
        const updatedMons = allMons.filter(mon => {
            return mon.type.toLowerCase().includes(searchType.toLowerCase());
        });
        displayUpdate(updatedMons);
    }
    else if(searchName != '') {
        const updatedMons = allMons.filter(mon => {
            return mon.name.toLowerCase().includes(searchName.toLowerCase());
        });
        displayUpdate(updatedMons);
    }

}

const displayUpdate = (pokemon) => {
    pokedex.innerHTML = '';
    displayPokemon(pokemon);
}

// reset button functionality
const resetButton = document.querySelector('.reset__button');

resetButton.addEventListener('click', () => {
    pokedex.innerHTML = '';
    displayPokemon(state.pokemon);
});



//click and display a pokemon in the middle
const iChooseYou = document.querySelectorAll('.card-link');


var getFullPokeProperties = (element) => {
    let pokeName = element.replace(/[0-9]/g, '').substring(2);
    let fullDex = state.AllPokéProperties;
    
    //Search the full database for the matching pokemon
    const match = fullDex.filter(mon => {
        return mon.name.includes(`${pokeName.toString()}`);
    })
    console.log(match);
}



//when the page loads, load the pokemon first


const init = async () => {

    let pokeProperties = await Search.fetchPokemon();
    state.AllPokéProperties = pokeProperties.allPokemon;
    state.pokemon = pokeProperties.pokemon;
    console.log(state);
    displayPokemon(state.pokemon);

    //implement caching for the api
    
}
init();