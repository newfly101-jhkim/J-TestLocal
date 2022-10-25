import {makeAutoObservable} from "mobx";

export default class lottoStore {
    constructor(props) {
        this.lottoRepository = props.lottoRepository;

        makeAutoObservable(this);
    }

    lottoList = {};

    *getLottoList() {
        try{
        const response = yield this.lottoRepository.getLottoList(1003);

        this.lottoList = response.data;
        console.log("this.lottoList : ",this.lottoList);
        } catch(e) {
            console.log(e);
        }
    }
}