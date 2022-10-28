import {Repository} from "./Repository";
import axios from "axios";

export default class LottoRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath;
    }

    getCheckLotto = (week) => {
        return this.getRequestPromise('post', this.requestPrefix + `/${week}`);
    }

    getLottoList = (week) => {
        return new Promise((resolve, reject) => {
            axios.get('dhlottery/https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo='+week)
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
}