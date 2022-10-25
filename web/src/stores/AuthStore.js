import {makeAutoObservable} from "mobx";
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

        this.authState = AuthState.None;

        makeAutoObservable(this);
    }


    login = Object.assign({}, EmptyLogin);
    loginState = State.NotAuthenticated;
    loginToken = '';
    loginUser = Object.assign({}, EmptyUser);
    loginUserState = '';
    isCheckedUserId = false;


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
    };

    handleIsCheckedUserId = (check) => {
        this.isCheckedUserId = check;
    };

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

            this.loginState = State.Authenticated;
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