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

export const LottoTabIndex = {
    Lotto : 'Lotto',
    MyLotto : 'MyLotto'
}

export default class LottoStore {
    constructor(props) {
        this.lottoRepository = props.lottoRepository;

        makeAutoObservable(this);
    }

    lottoArrayList = [];
    lottoList = {};
    lottoState = LottoState.Waiting;
    lottoManagementTabIndex = LottoTabIndex.Lotto;
    searchLottoValue = '';

    hanldeConsolelogLotto = () => {
        console.log("모든 회차 lottoArrayList",this.lottoArrayList);
    }
    handleChangeLottoValue = (value) => {
        this.searchLottoValue = value;
    }

    handleGetSingleLotto = (week) => {
        try {
            this.getLottoList(week);
        } catch (e) {
            console.log(e);
        }
    }

    handleGetLottoList = (week) => {
        try {
            this.getLottoList(week);
        } catch (e) {
            console.log(e);
        }
        if ( this.lottoState === LottoState.Success) {
            this.lottoState = LottoState.Waiting;
            this.hanldeConsolelogLotto();
        }
    }

    *getSingleLotto(week) {
        try {
            this.lottoState = LottoState.Pending;
            const response = yield this.lottoRepository.getCheckLotto(week);
            console.log(response);
            // const response = yield this.lottoRepository.getLottoList(week);

            // this.lottoList = {
            //     lottoNo7Bonus: response.data.bnusNo,
            //     drawNo: response.data.drwNo,
            //     drawNoDate: response.data.drwNoDate,
            //     lottoNo1: response.data.drwtNo1,
            //     lottoNo2: response.data.drwtNo2,
            //     lottoNo3: response.data.drwtNo3,
            //     lottoNo4: response.data.drwtNo4,
            //     lottoNo5: response.data.drwtNo5,
            //     lottoNo6: response.data.drwtNo6,
            //     firstPrise: response.data.firstAccumamnt,
            //     firstPriseMember: response.data.firstPrzwnerCo,
            //     firstPriseMoney: response.data.firstWinamnt,
            //     result: response.data.returnValue,
            //     totalSellAmount: response.data.totSellamnt,
            // }
            // this.lottoArrayList.push(toJS(this.lottoList));
        } catch(e) {
            console.log(e);
            this.lottoState = LottoState.Failed;
        } finally {
            this.lottoState = LottoState.Success;
        }
    }

    *getLottoList(week) {
        this.lottoArrayList = [];

        try {
            this.lottoState = LottoState.Pending;
            for (let i =1; i<= week; i++) {
                const response = yield this.lottoRepository.getLottoList(i);

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
                console.log(`async data [${i}] : `,this.lottoList);
                this.lottoArrayList.push(toJS(this.lottoList));
            }
        } catch(e) {
            console.log(e);
        } finally {
            this.lottoState = LottoState.Success;
        }
    }
}