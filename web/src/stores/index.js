import { default as AuthStore } from "./AuthStore";
import { default as LottoStore } from "./LottoStore";
import LottoRepository from "../repositories/LottoRepository";

const lottoRepository = new LottoRepository();


export const stores = {
    authStore:  new AuthStore(),
    lottoStore: new LottoStore(lottoRepository),
};