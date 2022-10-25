import React from "react";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";
import {withStyles} from "@material-ui/core/styles";
import {inject} from "mobx-react";

const styles = theme => ({

})


class MyPage extends React.Component {

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('userStore')
    (MyPage)
    )
)));