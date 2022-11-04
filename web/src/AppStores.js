import {serverContextPath} from "./AppConstants";
import AuthRepository from "./repositories/AuthRepository";
import UserRepository from "./repositories/UserRepository";
import LottoRepository from "./repositories/LottoRepository";

import AuthStore from "./stores/AuthStore";
import UserStore from "./stores/UserStore";
import LottoStore from "./stores/LottoStore";

const repositoryProps = {
    serverContextPath: serverContextPath,
};

const authRepository = new AuthRepository(repositoryProps);
const lottoRepository = new LottoRepository(repositoryProps);
const userRepository = new UserRepository(repositoryProps);

const storeProps = {
};

export const stores = {
    authStore: new AuthStore({authRepository, userRepository, ...storeProps}),
    userStore: new UserStore({userRepository, ...storeProps}),
    lottoStore: new LottoStore({lottoRepository, ...storeProps}),
};