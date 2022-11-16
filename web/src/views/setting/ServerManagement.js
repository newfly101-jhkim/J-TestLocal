import React from 'react';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({


});

class ServerManagement extends React.Component {

    render() {
        return (
            null
            )
    }

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('userStore')(
        observer(ServerManagement)
    )
))));