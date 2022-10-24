import {serverContextPath} from "./AppConstants";
import AuthRepository from "./repositories/AuthRepository";
// import {UserRepository} from "./repositories/UserRepository";

import AuthStore from "./stores/AuthStore";

const repositoryProps = {
    serverContextPath: serverContextPath,
};

const authRepository = new AuthRepository(repositoryProps);
// const userRepository = new UserRepository(repositoryProps);

const storeProps = {
};

export const stores = {
    authStore: new AuthStore({authRepository, ...storeProps}),
};