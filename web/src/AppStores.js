import {serverContextPath} from "./AppConstants";
import AuthRepository from "./repositories/AuthRepository";
import UserRepository from "./repositories/UserRepository";
import LottoRepository from "./repositories/LottoRepository";
import ServerManagementRepository from "./repositories/ServerManagementRepository";

import AuthStore from "./stores/AuthStore";
import UserStore from "./stores/UserStore";
import LottoStore from "./stores/LottoStore";
import ServerManagementStore from "./stores/ServerManagementStore";
import PokemongoStore from "./stores/PokemongoStore";

const repositoryProps = {
    serverContextPath: serverContextPath,
};

const authRepository = new AuthRepository(repositoryProps);
const lottoRepository = new LottoRepository(repositoryProps);
const userRepository = new UserRepository(repositoryProps);
const serverManagementRepository = new ServerManagementRepository(repositoryProps);

const storeProps = {
};

export const stores = {
    authStore: new AuthStore({authRepository, userRepository, ...storeProps}),
    userStore: new UserStore({userRepository, ...storeProps}),
    lottoStore: new LottoStore({lottoRepository, ...storeProps}),
    serverManagementStore: new ServerManagementStore({serverManagementRepository, ...storeProps}),
    pokemongoStore: new PokemongoStore({...storeProps}),
};