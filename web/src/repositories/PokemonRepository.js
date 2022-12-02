import {Repository} from "./Repository";

export default class pokemonRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/pokemon";
    }

    getPokeMonDataList = () => {
        return this.getRequestPromise('get', this.requestPrefix);
    }
}