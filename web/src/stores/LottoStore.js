import {makeAutoObservable, toJS} from "mobx";

// const Lotto = {
//     lottoNo7Bonus: '',
//     drawNo: '',
//     drawNoDate: '',
//     lottoNo1: '',
//     lottoNo2: '',
//     lottoNo3: '',
//     lottoNo4: '',
//     lottoNo5: '',
//     lottoNo6: '',
//     firstPrise: '',
//     firstPriseMember: '',
//     firstPriseMoney: '',
//     result: '',
//     totalSellAmount: '',
// }

export const LottoState = {
    Success : 'Success',
    Waiting : 'Waiting',
    Failed : 'Failed',
    Pending : 'Pending'
}

export default class lottoStore {
    constructor(props) {
        this.lottoRepository = props.lottoRepository;

        makeAutoObservable(this);
    }

    lottoArrayList = [];
    lottoList = {};
    lottoState = LottoState.Waiting;

    hanldeConsolelogLotto = () => {
        console.log("모든 회차 lottoArrayList",this.lottoArrayList);
    }

    handleGetLottoList = (week) => {
        try{
            this.lottoArrayList = [];
            this.lottoState = LottoState.Pending;
            for (let i = 1; i<=week; i++) {
                this.getLottoList(i);
            }
            this.lottoState = LottoState.Success;
            this.hanldeConsolelogLotto();
            this.lottoState = LottoState.Waiting;
            return false;
        } catch (e) {
            console.log("get lotto List error : ",e);
            this.lottoState = LottoState.Failed;
        }

    }

    *getLottoList(week) {
        try {
        const response = yield this.lottoRepository.getLottoList(week);

        // this.lottoList = Object.assign({}, response.data);
        this.lottoList = {
            lottoNo7Bonus: response.data.bnusNo,
            drawNo: response.data.drwNo,
            drawNoDate: response.data.drwNoDate,
            lottoNo1: response.data.drwtNo1,
            lottoNo2: response.data.drwtNo2,
            lottoNo3: response.data.drwtNo3,
            lottoNo4: response.data.drwtNo4,
            lottoNo5: response.data.drwtNo5,
            lottoNo6: response.data.drwtNo6,
            firstPrise: response.data.firstAccumamnt,
            firstPriseMember: response.data.firstPrzwnerCo,
            firstPriseMoney: response.data.firstWinamnt,
            result: response.data.returnValue,
            totalSellAmount: response.data.totSellamnt,
        }
        console.log("async data : ",this.lottoList);
        } catch(e) {
            console.log(e);
        } finally {
            this.lottoArrayList.push(toJS(this.lottoList));
        }
    }
}