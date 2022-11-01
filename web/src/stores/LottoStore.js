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

export const DataBaseErrorCode = {
    NoLottoData : 'NoLottoData',
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
    lottoViewList = [];
    lottoList = {};
    lottoState = LottoState.Waiting;
    getAxiosLottoData = LottoState.Waiting;
    lottoManagementTabIndex = LottoTabIndex.Lotto;
    searchLottoValue = '';
    lottoDataBaseCode = '';
    lottoPage = 0;
    lottoRowsPerPage = 5;
    lottoSearch = '';
    // search = false;



    initLottoList = () => {
        this.lottoArrayList = [];
        this.lottoViewList = [];
        this.lottoList = {};
        this.lottoState = LottoState.Waiting;
        this.getAxiosLottoData = LottoState.Waiting;
        this.lottoManagementTabIndex = LottoTabIndex.Lotto;
        this.searchLottoValue = '';
    }

    handleChangeLottoValue = (value) => {
        this.searchLottoValue = value;
    }

    setLottoPage = (page) => {
        this.lottoPage = page;
    }
    setLottoRowsPerPage = (rowsPerPage) => {
        this.lottoRowsPerPage = rowsPerPage;
    }

    setLottoViewList = () => {
        this.lottoViewList = this.lottoArrayList.sort(function compare(a, b) {
            return a.drawId - b.drawId;
        });
    }

    *getLottoList() {
        try{
            this.lottoState = LottoState.Pending;
            this.lottoArrayList = yield this.lottoRepository.getLottoDataList();
            // console.log("DB에서 LottoDataList 받아옴 => ",this.lottoArrayList);
            this.setLottoViewList();

            this.lottoState = LottoState.Success;
        } catch (e) {
            console.log("get LottoList Failed");
            this.lottoState = LottoState.Failed;
        }
    }

    // DB에서 lotto 차수로 검색하면 그 결과 값을 lottoList에 담아줌
    *checkSingleLotto(week) {
        this.lottoViewList = [];
        try{
            this.lottoState = LottoState.Pending;
            this.lottoList = yield this.lottoRepository.getCheckLotto(week);
            this.lottoViewList.push(toJS(this.lottoList));
            console.log("****checkSingleLotto() : ",this.lottoList);
            this.lottoState = LottoState.Success;
        } catch (error) {
            // DB에 데이터가 없는 경우 ErrorCode를 던짐 => axios로 data받아옴
            this.lottoDataBaseCode = error.response.data.errorCode;
            this.getAxiosLotto(week);
            this.lottoState = LottoState.Failed;
        }
    }
    // DB에 없는 경우 axios로 api 호출해서 받아옴
    *getAxiosLotto(week) {
        try {
            this.getAxiosLottoData = LottoState.Pending;
            const response = yield this.lottoRepository.getLottoList(week);
            console.log("getSingleLotto : =>>>>>>>",response.data);

            this.lottoList = {
                drawId: response.data.drwNo,
                drawDatetime: response.data.drwNoDate,
                firstPrisePerMoney: response.data.firstWinamnt,
                firstPriseMoney: response.data.firstAccumamnt,
                firstPriseMember: response.data.firstPrzwnerCo,
                lottoNo1: response.data.drwtNo1,
                lottoNo2: response.data.drwtNo2,
                lottoNo3: response.data.drwtNo3,
                lottoNo4: response.data.drwtNo4,
                lottoNo5: response.data.drwtNo5,
                lottoNo6: response.data.drwtNo6,
                lottoNo7Bonus: response.data.bnusNo,
                totalSellAmount: response.data.totSellamnt
            }
            // this.lottoArrayList.push(toJS(this.lottoList));
            this.getAxiosLottoData = LottoState.Success;
            this.createSingleLotto(this.lottoList);
        } catch(e) {
            console.log("axios ERROR: ",e);
            this.getAxiosLottoData = LottoState.Failed;
        }
    }
    // axios해서 성공하면 데이터를 DB에 넣어줌
    *createSingleLotto() {
        this.lottoViewList = [];
        try {
            this.lottoState = LottoState.Pending;

            const response = yield this.lottoRepository.createLottoData(this.lottoList);
            console.log("createSingleLotto() : ",response);
            this.lottoList = {
                drawId: response.drawId,
                drawDatetime: response.drawDatetime,
                firstPrisePerMoney: response.firstPrisePerMoney,
                firstPriseMoney: response.firstPriseMoney,
                firstPriseMember: response.firstPriseMember,
                lottoNo1: response.lottoNo1,
                lottoNo2: response.lottoNo2,
                lottoNo3: response.lottoNo3,
                lottoNo4: response.lottoNo4,
                lottoNo5: response.lottoNo5,
                lottoNo6: response.lottoNo6,
                lottoNo7Bonus: response.lottoNo7Bonus,
                totalSellAmount: response.totalSellAmount
            };
            // view 부분에 출력해줌
            this.lottoViewList.push(toJS(this.lottoList));
            this.lottoState = LottoState.Success;
        } catch (error) {
            // insert할 데이터가 null인 경우 예외처리
            this.lottoDataBaseCode = error.response.data.errorCode;
            this.lottoState = LottoState.Failed;
        }
    }
}