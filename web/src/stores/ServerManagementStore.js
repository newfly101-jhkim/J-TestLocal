import {makeAutoObservable} from "mobx";

export default class ServerManagementStore {
    constructor(props) {
        this.serverManagementRepository = props.serverManagementRepository;

        makeAutoObservable(this);
    }

    *test() {
        try {
            const response = yield this.serverManagementRepository.test();
        } catch (e) {
            console.log(e);
        }
    }
}