import {Repository} from "./Repository";
import axios from "axios";

export default class pokemonRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/pokemon";
    }

    getPokeMonDataList = () => {
        return this.getRequestPromise('get', this.requestPrefix);
    }

    getPokemonApi = (resJsonData) => {
        return new Promise((resolve, reject) => {
            axios.get('https://pokeapi.co/api/v2/pokemon/'+resJsonData)
                .then(data => {
                    // console.log("lotto this week",data);
                    resolve(data);
                })
                .catch(e => {
                    console.log("CORS error exception : ", e);
                    reject(e);
                })
        })
    }

    // getPokemonApi = (resJsonData) => {
    //     rest.get('https://pokeapi.co/api/v2/pokemon/', async (req, res, ctx) => {
    //         return res(ctx.delay(1000), ctx.status(200), ctx.json(resJsonData));
    //     });
    //
    // }
}