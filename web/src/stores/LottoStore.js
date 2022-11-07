import {makeAutoObservable, toJS} from "mobx";
import dayjs from "dayjs";

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
    searchState = LottoState.Waiting;
    getAxiosLottoData = LottoState.Waiting;
    isLoading = false;
    lottoManagementTabIndex = LottoTabIndex.Lotto;
    searchLottoValue = '';
    lottoDataBaseCode = '';
    lottoPage = 0;
    lottoRowsPerPage = 5;
    lottoSearch = '';

    defaultLottoDate = dayjs('2002-12-07').day(6);
    lottoToday = '';

    myLottoLastWeek='';



    userLottoList = [];
    matchLottoList = [];
    matchLottoBonus = '';
    startLottoDate = null;



    initLottoList = () => {
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
    setLottoManagementTabIndex = (tabIndex) => {
        this.lottoManagementTabIndex = tabIndex;
    }

    setFilterLottoViewList = () => {
        this.lottoViewList = this.lottoArrayList.filter(list =>
            list.drawId === this.searchLottoValue
        );
    }

    setLottoViewList = () => {
        this.lottoViewList = this.lottoArrayList.sort(function compare(a, b) {
            return a.drawId - b.drawId;
        });
    }

    // <MyLotto />
    setUserRandomLottoList = () => {
        let list = [];
        for (let i = 0; i < 6; i++) {
            const number = Math.random()*(45-1) + 1;
            if (!list.includes(Math.floor(number))) {
                list.push(Math.floor(number));
            } else {
                i--;
            }
        }
        list = list.sort(function compare(a,b){ return a - b});
        // this.userLottoList.push(list);  // 구조 변경되어서 [1, 2, 3, 4, 5 ,6] 의 구조로 찍히는 부분을 제거
        // db insert 할때 성공 시 집어넣는 것으로 변경
        // console.log("@@@@@@user list : ",this.userLottoList);
        return list;
    }

    setTodayLotto = (todayDrawId) => {
        this.lottoToday = todayDrawId;
    }
    findLottoNumberInResult = (userLottoNumber) => {
        const result = this.myLottoLastWeek.filter(lottoNum => {
            return lottoNum === userLottoNumber
        });

        if (result.length !== 0) {
            return 1;
        } else {
            if (userLottoNumber === this.matchLottoBonus) {
                return -1;
            }
            return 0;
        }
    }


    // myLotto Data List => 유저 별로 random 데이터를 불러옴
    *getMyLottoDataList(userId, num) {
        // 회차 setting
        this.setTodayLotto(dayjs(dayjs().day(6)).diff(this.defaultLottoDate, "week")+num);
        // 초기화
        this.userLottoList = [];
        this.myLottoLastWeek = [];
        this.matchLottoBonus = '';
        try {
            this.lottoState = LottoState.Pending;
            const response = yield this.lottoRepository.getLottoDataLists(this.lottoToday, userId);

            this.startLottoDate = yield this.lottoRepository.getCheckLotto(this.lottoToday);

            this.myLottoLastWeek = response;
            // console.log("변경된 구조로 값 불러오기 => ",response);
            console.log("변경된 data 구조 불러오기 => ",this.myLottoLastWeek);

            this.matchLottoList.push(this.startLottoDate.lottoNo1);
            this.matchLottoList.push(this.startLottoDate.lottoNo2);
            this.matchLottoList.push(this.startLottoDate.lottoNo3);
            this.matchLottoList.push(this.startLottoDate.lottoNo4);
            this.matchLottoList.push(this.startLottoDate.lottoNo5);
            this.matchLottoList.push(this.startLottoDate.lottoNo6);
            this.matchLottoBonus = this.startLottoDate.lottoNo7Bonus;

            this.lottoState = LottoState.Success;
        } catch (e) {
            console.log("getUser's Random Data list",e);
            this.startLottoDate = null;
            this.lottoState = LottoState.Failed;
        }
    }



    *getUserRandomLotto(userId) {
        try {
            this.lottoState = LottoState.Pending;
            this.userLottoList = yield this.lottoRepository.getRandomLottoDataList(this.lottoToday, userId);


            // createdDatetime: "2022-11-03T17:17:08"
            // expCount: "1"
            // expDrawId: "1040"
            // expNo1: "3"
            // expNo2: "9"
            // expNo3: "15"
            // expNo4: "16"
            // expNo5: "21"
            // expNo6: "37"
            // id: 1
            // userId: "jhkim"

            this.lottoState = LottoState.Success;
        } catch (e) {
            console.log("getUser's Random Data list",e);
            this.lottoState = LottoState.Failed;
        }
    }

    *getUserLastWeekRandomLotto(userId, num) {
        this.userLottoList = [];
        this.matchLottoList = [];
        this.matchLottoBonus = '';
        this.setTodayLotto(dayjs(dayjs().day(6)).diff(this.defaultLottoDate, "week")+num);
        try {
            this.lottoState = LottoState.Pending;
            this.userLottoList = yield this.lottoRepository.getRandomLottoDataList(this.lottoToday, userId);

            const response = yield this.lottoRepository.getLottoDataLists(this.lottoToday, userId);
            console.log("response@@@@@@@@@@@@@@@@@@@",response);

            this.lottoState = LottoState.Success;
            this.startLottoDate = yield this.lottoRepository.getCheckLotto(this.lottoToday);
            this.matchLottoList.push(this.startLottoDate.lottoNo1);
            this.matchLottoList.push(this.startLottoDate.lottoNo2);
            this.matchLottoList.push(this.startLottoDate.lottoNo3);
            this.matchLottoList.push(this.startLottoDate.lottoNo4);
            this.matchLottoList.push(this.startLottoDate.lottoNo5);
            this.matchLottoList.push(this.startLottoDate.lottoNo6);
            this.matchLottoBonus = this.startLottoDate.lottoNo7Bonus;
        } catch (e) {
            console.log("getUser's Random Data list",e);
            this.startLottoDate = null;
            this.lottoState = LottoState.Failed;
        }
    }


    *createUserRandomLotto(userId) {
        try {
            this.lottoState = LottoState.Pending;
            // console.log("이번주 : ",this.startLottoDate);
            let list = this.setUserRandomLottoList();
            const param = {
                userId : userId,
                expDrawId : this.lottoToday,
                expCount : this.userLottoList.length,
                expNo1 : list[0],
                expNo2 : list[1],
                expNo3 : list[2],
                expNo4 : list[3],
                expNo5 : list[4],
                expNo6 : list[5]
            }
            const response = yield this.lottoRepository.createRandomLottoData(param);
            // console.log("input random lottoData in DB : ",response);

            this.userLottoList.push(response);
            this.lottoState = LottoState.Success;
        } catch (e) {
            console.log(e.response.errorCode);
            this.lottoState = LottoState.Failed;
        }

    }


    *getLottoList() {
        this.isLoading = true;
        try{
            this.lottoState = LottoState.Pending;
            this.lottoArrayList = yield this.lottoRepository.getLottoDataList();
            // console.log("DB에서 LottoDataList 받아옴 => ",this.lottoArrayList);
            this.setLottoViewList();

            this.lottoState = LottoState.Success;
            this.isLoading = false;
        } catch (e) {
            console.log("get LottoList Failed");
            this.lottoState = LottoState.Failed;
            this.isLoading = false;
        }
    }

    // DB에서 lotto 차수로 검색하면 그 결과 값을 lottoList에 담아줌
    *checkSingleLotto(week) {
        this.lottoViewList = [];
        try{
            this.searchState = LottoState.Pending;
            this.lottoList = yield this.lottoRepository.getCheckLotto(week);
            this.lottoViewList.push(toJS(this.lottoList));
            console.log("****checkSingleLotto() : ",this.lottoList);
            this.searchState = LottoState.Success;
        } catch (error) {
            // DB에 데이터가 없는 경우 ErrorCode를 던짐 => axios로 data받아옴
            this.lottoDataBaseCode = error.response.data.errorCode;
            this.getAxiosLotto(week);
            this.searchState = LottoState.Failed;
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
            this.searchState = LottoState.Pending;

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
            // view 부분에 출력해줌 + DB에 추가해 주었기 때문에 viewList 뿐만 아니라 ArrayList에 추가하게 되면, re-rendering 할 이유가 없다.
            // 처음에 한번만 불러오는 거 외에 웹 반응 속도를 위해서 두개의 list에 추가해준다.
            this.lottoArrayList.push(toJS(this.lottoList));
            this.lottoViewList.push(toJS(this.lottoList));
            this.searchState = LottoState.Success;
        } catch (error) {
            // insert할 데이터가 null인 경우 예외처리
            this.lottoDataBaseCode = error.response.data.errorCode;
            this.searchState = LottoState.Failed;
        }
    }
}