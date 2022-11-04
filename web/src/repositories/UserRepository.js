import {Repository} from "./Repository";


export default class UserRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/user";
    }
    getUserDataList = (userInfo) => {
        return this.getRequestPromise('post', this.requestPrefix, userInfo);
    }

}