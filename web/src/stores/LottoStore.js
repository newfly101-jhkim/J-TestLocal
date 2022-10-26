import {makeAutoObservable} from "mobx";

export default class lottoStore {
    constructor(props) {
        this.lottoRepository = props.lottoRepository;

        makeAutoObservable(this);
    }

    lottoList = {};

    *getLottoList(week) {
        try{
        const response = yield this.lottoRepository.getLottoList(week);

        this.lottoList = response.data;
        console.log("this.lottoList : ",this.lottoList);
        } catch(e) {
            console.log(e);
        }
    }
}