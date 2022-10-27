import { default as AuthStore } from "./AuthStore";
import { default as LottoStore } from "./LottoStore";

export const stores = {
    authStore:  new AuthStore(),
    lottoStore: new LottoStore(),
};