const fetchPokemon = () => {


    const promises = [];
    for (let i = 387; i < 494; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        
    }
    //promise. runs all promises, then lets us have the array of all promises afer they are done
    Promise.all(promises).then((results) => {
        //console.log(results);
        state.AllPokéProperties = results;
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types.map( type => type.type.name).join(', ')
        }));
        state.pokemon = pokemon;
        displayPokemon(pokemon);
        //console.log(state);
    });
};

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

fetchPokemon();

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
    } else {
        console.log(e.target.parentElement);
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


const middleStep = (e) => {
 console.log(e.target);
}

const iChooseYou = document.querySelectorAll('.card-link')

console.log(iChooseYou);
