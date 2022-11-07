import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Box, Toolbar, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {Button} from "@mui/material";


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
        const { classes, authStore, lottoStore } = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" component="h2">
                            Home
                        </Typography>
                    </Toolbar>
                    <Box display='flex' alignItems='center' style={{width:'100%', justifyContent:'flex'}}>
                        <Typography> Jkim의 이것 저것</Typography>
                        <Typography> 뭐가 있지</Typography>
                    </Box>
                    <Button onClick={() => lottoStore.getAlterLottoUserData(authStore.loginUser.id)}>로또 구조 변경</Button>
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