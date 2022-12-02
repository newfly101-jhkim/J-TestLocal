import {makeAutoObservable} from "mobx";

export default class PokemongoStore {
    constructor(props) {
        this.pokemonRepository = props.pokemonRepository;

        makeAutoObservable(this);
    }

    pokemonDogamList = [];

    *getPokeMonDataList() {
        try{
            this.pokemonDogamList = yield this.pokemonRepository.getPokeMonDataList();
            console.log("response => ",this.pokemonDogamList);

        } catch (e) {
            console.log(e);
        }
    }

}