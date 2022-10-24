import {makeAutoObservable} from "mobx";
import axios from "axios";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';

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



    changeLoginId = (id) => {
        this.login.id = id;
    };

    changeLoginPassword = (password) => {
        this.login.password = password;
    };

    invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
    };

    handleCreateUser = () => {
        console.log("user생성 버튼 클릭");
    }

    *doLogin(callbacks) {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem(LocalStorageTokenKey, token);

            console.log('doLogin');
            console.log(this);

            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
        } catch (e) {
            this.loginState = State.Failed;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    };

    *checkLogin() {
        const token = localStorage.getItem(LocalStorageTokenKey);

        if(token) {
            try {
                const response = yield axios.get('/api/v1/authentications/signcheck');
                const token = response.data.token;
                const user = response.data.user;

                this.loginState = State.Authenticated;
                this.loginToken = token;
                this.loginUser = user;
            } catch(e) {
                this.loginState = State.NotAuthenticated;
                this.loginToken = '';
                this.loginUser = Object.assign({}, EmptyUser);
            }
        }
    };

    *doLogout() {
        localStorage.removeItem(LocalStorageTokenKey);

        try {
            yield axios.post('/api/v1/authentications/signout');

            console.log(this);
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    };
}