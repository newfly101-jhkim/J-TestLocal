import {Repository} from "./Repository";
import axios from "axios";

export default class LottoRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/lotto";
    }
    getLottoDataList = () => {
        return this.getRequestPromise('get', this.requestPrefix);
    }

    getCheckLotto = (week) => {
        return this.getRequestPromise('post', this.requestPrefix + `/${week}`, week);
    }
    createLottoData = (lotto) => {
        return this.getRequestPromise('put', this.requestPrefix +'/create', lotto);
    }

    createRandomLottoData = (lottoRandom) => {
        return this.getRequestPromise('put', this.requestPrefix+'/create/random', lottoRandom);
    }
    getRandomLottoDataList = (expDrawId, userId) => {
        return this.getRequestPromise('get', this.requestPrefix+`/mylotto?expDrawId=${expDrawId}&userId=${userId}`);
    }
    getLottoDataLists = (expDrawId, userId) => {
        return this.getRequestPromise('get', this.requestPrefix+`/mylotto/number?expDrawId=${expDrawId}&userId=${userId}`);
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