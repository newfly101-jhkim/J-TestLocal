import {makeAutoObservable} from "mobx";

export default class PokemongoStore {
    constructor(props) {
        this.pokemonRepository = props.pokemonRepository;

        makeAutoObservable(this);
    }

    pokemonDogamList = [];
    pokemon = {
        count: 1118,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
        previous: null,
        results: [
            {
                name: '이상해씨',
                url: 'https://pokeapi.co/api/v2/pokemon/1/'
            },
            {
                name: '이상해풀',
                url: 'https://pokeapi.co/api/v2/pokemon/2/'
            },
            {
                name: '이상해꽃',
                url: 'https://pokeapi.co/api/v2/pokemon/3/'
            },
            {
                name: '파이리',
                url: 'https://pokeapi.co/api/v2/pokemon/4/'
            },
            {
                name: '리자드',
                url: 'https://pokeapi.co/api/v2/pokemon/5/'
            },
            {
                name: '리자몽',
                url: 'https://pokeapi.co/api/v2/pokemon/6/'
            },
            {
                name: '꼬부기',
                url: 'https://pokeapi.co/api/v2/pokemon/7/'
            },
            {
                name: '어니부기',
                url: 'https://pokeapi.co/api/v2/pokemon/8/'
            },
            {
                name: '거북왕',
                url: 'https://pokeapi.co/api/v2/pokemon/9/'
            },
            {
                name: '피카츄',
                url: 'https://pokeapi.co/api/v2/pokemon/25/'
            },
            {
                name: '이브이',
                url: 'https://pokeapi.co/api/v2/pokemon/133/'
            }
        ]
    };

    *getPokeMonDataList() {
        try{
            this.pokemonDogamList = yield this.pokemonRepository.getPokeMonDataList();
            console.log("response => ",this.pokemonDogamList);

        } catch (e) {
            console.log(e);
        }
    }

    *getPokemonApi(resJsonData) {
        try {
            const response = yield this.pokemonRepository.getPokemonApi(resJsonData);
            console.log("getPokemonApi : =>>>>>>>",response.data);
        } catch (e) {
            console.log(e);
        }
    }

}