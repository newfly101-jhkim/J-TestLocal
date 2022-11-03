import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Toolbar, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" component="h2">
                            Home
                        </Typography>
                    </Toolbar>
                </div>
            </div>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
        inject('authStore', 'lottoStore') (
            observer(Home)
    )
)));