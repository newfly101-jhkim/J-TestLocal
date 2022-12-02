import {makeAutoObservable} from "mobx";

export default class PokemongoStore {
    constructor(props) {


        makeAutoObservable(this);
    }

}