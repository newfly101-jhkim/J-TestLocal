import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(props) {

        makeAutoObservable(this);
    }


}