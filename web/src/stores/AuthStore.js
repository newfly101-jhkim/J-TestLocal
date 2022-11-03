import {makeAutoObservable, toJS} from "mobx";
import {AuthTokenStorageKey} from "../repositories/Repository";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';
export const LocalStorageUserId = '_BASKITOP_AUTHENTICATION_USERID_';

const EmptyLogin = {
    id: '',
    password: '',
};

const EmptyUser = {
    id: '',
    name: '',
    type: '',
    createdDatetime: '',
    updatedDatetime: '',
};

const AuthState = {
    None: 'None',
    Authenticating: 'Authenticating',
    Authenticated: 'Authenticated',
    Error: 'Error',
}
const LoginState = {
    AuthenticationFailed : 'AuthenticationFailed',
    AuthenticationEnabledError : 'AuthenticationEnabledError',
    AuthenticationPasswordError : 'AuthenticationPasswordError',
    AuthenticationUserIdError : 'AuthenticationUserIdError',
}

// const LogPrefix = '[AuthStore] ';

export default class AuthStore {
    constructor(props) {
        this.authRepository = props.authRepository;
        this.userRepository = props.userRepository; // 추가 - repository 이름 조심히 만들 것 / 철자 주의.

        this.authState = AuthState.None;

        makeAutoObservable(this);
    }

    userArrayList = [];
    userInfo = {}; // 객체 값인데 list 명칭은 이상함
    login = Object.assign({}, EmptyLogin);
    loginState = State.NotAuthenticated;
    loginToken = '';
    loginUser = Object.assign({}, EmptyUser);
    loginUserState = null;
    isCheckedUserId = false;
    realUpdateTime = 0;
    renameSwitch = true;
    realStatus = '';
    realBoolean = '';

    convertStatus = () => {
        this.realBoolean = this.loginUser.enabled ? "활성화" : "비활성화";
        this.realStatus = this.realBoolean
    }

    handleOnChangeId = (changeId) => {
        this.loginUser.id = changeId;
    }

    handleOnChangeName = (changeName) => {
        this.loginUser.name = changeName;
    }

    handleOnChangeStatus = (changeStatus) => {
        this.realStatus = changeStatus.target.value;
        this.loginUser.enabled = this.realStatus === "활성화" ? true : false;
    }

    CanChangeInfo = () => {
        this.renameSwitch = false
    }

    EndChangeInfo = () => {
        let nowTime = Date();
        this.renameSwitch = true;
        this.loginUser.updatedDatetime = nowTime;
        this.getUserList(this.loginUser); // 데이터 값을 db로 던지기 위한 스위치
    }

    changeLoginId = (id) => {
        this.login.id = id;
    };

    changeLoginPassword = (password) => {
        this.login.password = password;
    };

    invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginUser = Object.assign({}, EmptyUser);
        this.loginUserState = null;
    };

    handleIsCheckedUserId = (check) => {
        this.isCheckedUserId = check;
    };
    handleChangeUpdateDatetime = (time) => {  // 추가된 부분
        this.loginUser.updatedDatetime = time;
    }

    *getUserList() {  //modifyUserInfo
        // console.log("변경할 유저 정보 : ",loginUser); //this.loginUser
        // this.isLoading = true;
        try{
            this.userInfo = {
                id: this.loginUser.id,
                name: this.loginUser.name,
                // type: this.loginUser.type,
                isEnabled: this.loginUser.enabled,
                // updatedDatetime: this.loginUser.updatedDatetime
            }
            // const response = yield this.UserRepository.getUserList(loginUser);
            // this.userArrayList = yield this.UserRepository.getUserDataList(loginUser);


            const response = yield this.userRepository.getUserDataList(this.userInfo);
            console.log(response);

            // this.userArrayList.push(toJS(this.userInfo));
            //
            // this.isLoading = false;
        } catch (e) {
            console.log("get UserList Failed",e)

            // this.isLoading = false;
        }
    }

    // *getAxiosUser(loginUser) {
    //     try {
    //         const response = yield this.UserRepository.getUserList(loginUser);
    //         console.log("getSingleUser : =>>", response.data);
    //
    //         this.userInfo = {
    //              id: response.data.id,
    //              name: response.data.name,
    //              type: response.data.type,
    //              enabled: response.data.enabled,
    //              updatedDatetime: response.data.updatedDatetime,
    //              createdDatetime: response.data.createdDatetime,
    //         }
    //     } catch(e) {
    //         console.log("axios Error: ", e);
    //     }
    // } // 추가된 부분 종료

    *doLogin(callbacks) {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield this.authRepository.signIn(param);
            const token = response.token;
            const user = response.user;

            if(this.isCheckedUserId) {
                localStorage.setItem(LocalStorageUserId, this.login.id);
            } else {
                localStorage.removeItem(LocalStorageUserId);
            }
            callbacks.moveTo();
            console.log(this);

            this.loginState = State.Authenticated;
            this.loginUserState = null;
            this.loginToken = token;
            this.loginUser = user;
        } catch (e) {
            console.log(e.response);
            let errorCode = e.response.data.errorCode;
            if (errorCode === LoginState.AuthenticationEnabledError) {
                this.loginUserState = "사용 불가능한 계정입니다.";
            } else if (errorCode === LoginState.AuthenticationUserIdError) {
                this.loginUserState = "등록되지 않은 계정입니다.";
            } else if (errorCode === LoginState.AuthenticationPasswordError) {
                this.loginUserState = "계정정보가 일치하지 않습니다.";
            }
            this.login.id = localStorage.getItem(LocalStorageUserId);
            this.login.password = '';
            this.loginState = State.NotAuthenticated;
            this.loginUser = Object.assign({}, EmptyUser);
        }
    }

    *checkLogin() {
        const token = sessionStorage.getItem(AuthTokenStorageKey);

        if(token) {
            try {
                const user = yield this.authRepository.signCheck();
                this.loginState = State.Authenticated;
                this.loginUser = user;
            } catch(e) {
                this.login = Object.assign({}, EmptyLogin);
                this.loginState = State.NotAuthenticated;
                this.loginUser = Object.assign({}, EmptyUser);
            }
        }
    }

    *doLogout() {
        sessionStorage.removeItem(AuthTokenStorageKey);

        try {
            yield this.authRepository.signOut();
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginUser = Object.assign({}, EmptyUser);
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginUser = Object.assign({}, EmptyUser);
        }
    }
}