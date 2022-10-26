import {makeAutoObservable} from "mobx";


export default class UserStore {
    constructor(props) {
        this.userRepository = props.userRepository;

        makeAutoObservable(this);
    }

}