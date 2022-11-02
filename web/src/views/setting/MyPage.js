import React from "react";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Box, Toolbar, Typography} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

const styles = theme => ({
    mainContainer : {
        flexGrow : 1,
        padding: theme.spacing(3)
    },
    appBarSpacer : theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    contentBox:{
        width: '100%',
        background: 'white',
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 40,
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)'
    },
    contentPadding:{
        width: '100%',
        padding: '0 30px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
    },
    labelText: {
        fontSize: '0.938rem',
        color: 'rgba(102, 102, 102, 0.8)',
        fontWeight: 500,
        marginRight: 0,
        width: 80,
    },
    lineText: {
        justifyContent: 'flex',
        paddingTop: 3,
        alignItems: 'center',
        display: 'flex',
    },
})

class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            second : dayjs().format("YYYY-MM-DD")
        }
    }

    render() {
        const { classes, authStore } = this.props;
        console.log(authStore.loginUser)

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer}>
                    <Toolbar className={classes.mainContent} />

                    <Typography variant="h4" component="h2">
                        마이 페이지
                    </Typography>
                    <Typography>{this.state.second}</Typography>

                    <Box className={classes.contentBox}>
                        <Box className={classes.contentPadding}>
                            <Box className={classes.lineText}>
                                <Stack sx={{ alignItems : 'center' }} >
                                    <TextField
                                        id="id"
                                        label="ID"
                                        defaultValue={authStore.loginUser.id}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    <TextField
                                        id="name"
                                        label="이름"
                                        defaultValue={authStore.loginUser.name}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    <TextField
                                        id="type"
                                        label="가입 유형"
                                        defaultValue={authStore.loginUser.type === "Admin" ? "관리자" : "일반회원"}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    <TextField
                                        id="first-signIn"
                                        label="계정 생성일"
                                        defaultValue={dayjs(authStore.loginUser.createdDatetime).format("YYYY.MM.DD")}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    <TextField
                                        id="renewal-info"
                                        label="정보 갱신 날짜"
                                        defaultValue={dayjs(authStore.loginUser.updatedDatetime).format("YYYY.MM.DD")}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    <TextField
                                        id="status"
                                        label="계정 상태"
                                        defaultValue={authStore.loginUser.enabled ? "활성화" : "휴면"}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: true}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </div>
        )

    }

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('userStore', 'authStore')(
        observer(MyPage)
    )
))));