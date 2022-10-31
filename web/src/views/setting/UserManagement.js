import React from 'react';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const styles = theme => ({


});

class UserManagement extends React.Component {

    render() {
        return (
            null
            )
    }

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('userStore')(
        observer(UserManagement)
    )
))));