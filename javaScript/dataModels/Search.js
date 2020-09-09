import axios from 'axios';

//fetch pokemon is called when the search calls it
/*
const fetchPokemon = async () => {

export default class Search {
    constructor(search) {
        this.search = search
    }
}   


    
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}


*/

export const fetchPokemon = async () => {
    

        const promises = [];
        for (let i = 1; i < 150; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(await fetch(url).then((res) => res.json()));
            
        }

        let pokemon = promises.map((data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            type: data.types.map( type => type.type.name).join(', ')
        }));

       
        return {
            allPokemon: promises,
            pokemon: pokemon,
        }
};