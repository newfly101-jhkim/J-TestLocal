import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {Avatar, Box, Button, CircularProgress, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Checkbox from '@material-ui/core/Checkbox';

import * as store from "../stores/AuthStore";
import {LocalStorageUserId} from "../stores/AuthStore";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
        height: '100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    lockOpenAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    lockOutAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '440px',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {

    componentDidMount() {
    const {authStore} = this.props;
        const checkedUserId = localStorage.getItem(LocalStorageUserId);
        if(checkedUserId) {
            authStore.changeLoginId(checkedUserId);
            authStore.handleIsCheckedUserId(true);
        } else {
            authStore.handleIsCheckedUserId(false);
            authStore.invalidateLogin();
        }
    }

    handleChangeId = (e) => {
        this.props.authStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.authStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.authStore.doLogin({
                moveTo: () => this.props.history.replace('/')
            });
        }
    }

    handleSubmitForm = () => {
        this.props.authStore.doLogin({
            moveTo: () => this.props.history.replace('/')
        });
    }

    render() {
        const { classes, authStore } = this.props;

        return (
            <Box className={classes.mainContainer}>
                <Box className={classes.appBarSpacer} />
                <Box className={classes.paper}>
                    <Avatar className={classes.lockOutAvatar}><LockOutlinedIcon/></Avatar>
                    <Typography component="h1" variant="h5">
                        {authStore.loginState === store.State.NotAuthenticated && authStore.loginUserState ? authStore.loginUserState : '로그인'}
                    </Typography>
                    <Box className={classes.form}>
                        <TextField id="id"
                                   name="id"
                                   label="ID"
                                   variant="outlined"
                                   margin="normal"
                                   value={authStore.login.id}
                                   onChange={this.handleChangeId}
                                   required fullWidth />
                        <TextField id="password"
                                   name="password"
                                   label="Password"
                                   type="password"
                                   variant="outlined"
                                   margin="normal"
                                   value={authStore.login.password}
                                   onChange={this.handleChangePassword}
                                   onKeyUp={this.handleKeyUpPassword}
                                   required fullWidth />
                        <Checkbox
                            checked={authStore.isCheckedUserId}
                            onChange={(e) =>authStore.handleIsCheckedUserId(e.target.checked)}
                            name="UserIdChecked"
                            color="primary"
                        />
                        <label>아이디 기억하기</label>
                        <Button type="submit"
                                className={classes.submit}
                                color="primary"
                                variant="contained"
                                disabled={authStore.loginState === store.State.Pending}
                                onClick={this.handleSubmitForm}
                                fullWidth >
                            {authStore.loginState === store.State.Pending ? <CircularProgress size={22}/> : 'Sign In'}
                        </Button>
                    </Box>

                </Box>
            </Box>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
    inject('authStore')(
        observer(SignIn)
    )
)));