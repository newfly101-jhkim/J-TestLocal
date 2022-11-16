import {Repository} from "./Repository";


export default class ServerManagementRepository extends Repository {
    constructor(props) {
        super();

        this.requestPrefix = props.serverContextPath + "/api/v1/serverManage";
    }

    test = () => {
        return this.getRequestPromise('post', this.requestPrefix);
    }

}