// 11월 2일 회원 정보 렌더 / 날짜 포맷 변경 / stack을 활용한 정렬

import React from "react";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Box, Toolbar, Typography} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
// import moment from 'moment';

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
        // height: '600px',
        padding: '0 30px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
    },
    labelText: {
        fontSize: '0.938rem',
        color: 'rgba(102, 102, 102, 0.8)',
        fontWeight: 500,
        marginRight: 0,
        width: 80, // label의 길이( input 거리 )
    },
    lineText: {
        justifyContent: 'flex',
        paddingTop: 3,
        alignItems: 'center',
        display: 'flex',
        // flexDirection: 'column',
    },
})


class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first : '2004-05-23',
            second : dayjs().format("YYYY-MM-DD") // 현재 시간을 특정 형식으로 변경 성공
        }
    }

    handleDayJs = () => {
        this.setState({
            first : dayjs(this.state.first).format("YYYY-MM") // 지정일자를 특정 형식으로 변경 성공
        })
    }

    // handleDateType = () => {
    //     const realTime = moment().format();
    //     return realTime
    // }

    render() {
        const { classes, authStore } = this.props;
        console.log(authStore.loginUser)
        // const now = dayjs()
        // const first = new Date('2004-05-22')

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer}>
                    <Toolbar className={classes.mainContent} />

                    <Typography variant="h4" component="h2">
                        마이 페이지
                        <Typography>{this.state.second}</Typography>
                        {/*  Stack row로 묶으면 상하 위치가 난리나고 Typography 내부에 넣으면 culumn 유지  */}
                    </Typography>

                    <Stack direction={"row"} spacing={1}>
                        <Typography>{this.state.first}</Typography>
                        <button onClick={this.handleDayJs}>날짜 변경</button>
                    </Stack>
                    {/*<Typography>{this.state.first}</Typography>*/}
                    {/*<Typography>{dayjs('2003-03-22', ['yyyy'])}</Typography>*/}
                    <Box className={classes.contentBox}>
                        <Box className={classes.contentPadding}>
                            <Box className={classes.lineText}>
                                {/*<Box style={{flexDirection:'column', width:'100%'}}>*/}
                                {/*    <Stack direction={"row"}>*/}
                                {/*        <Typography className={classes.labelText}>*/}
                                {/*            이름*/}
                                {/*        </Typography>*/}
                                {/*        <input*/}
                                {/*            name="name"*/}
                                {/*            id="name"*/}
                                {/*            type="search"*/}
                                {/*            value={authStore.loginUser.name && authStore.loginUser.name}*/}
                                {/*            onChange={(e) => authStore.handleChangeUserName(e.target.value)}*/}
                                {/*        />*/}
                                {/*    </Stack>*/}

                                {/*    <Stack direction={"row"}>*/}
                                {/*        <Typography className={classes.labelText}>*/}
                                {/*            이름*/}
                                {/*        </Typography>*/}
                                {/*        <input*/}
                                {/*            name="name"*/}
                                {/*            id="name"*/}
                                {/*            type="search"*/}
                                {/*            value={authStore.loginUser.name && authStore.loginUser.name}*/}
                                {/*            onChange={(e) => authStore.handleChangeUserName(e.target.value)}*/}
                                {/*        />*/}
                                {/*    </Stack>*/}

                                {/*    <Stack direction={"row"}>*/}
                                {/*        <Typography className={classes.labelText}>*/}
                                {/*            ID*/}
                                {/*        </Typography>*/}
                                {/*        <TextField*/}
                                {/*            sx={{*/}
                                {/*                m: 1,*/}
                                {/*                width: 200,*/}
                                {/*                borderRadius: 5,*/}
                                {/*            }}*/}
                                {/*            required*/}
                                {/*            id="outlined-readOnly"*/}
                                {/*            InputProps={{*/}
                                {/*                readOnly: true,*/}
                                {/*            }}*/}
                                {/*            defaultValue={authStore.loginUser.id}*/}
                                {/*        />*/}
                                {/*    </Stack>*/}

                                {/*</Box>*/}

                                {/*<Typography className={classes.labelText}>*/}
                                {/*    이름*/}
                                {/*</Typography>*/}
                                {/*<input*/}
                                {/*    name="name"*/}
                                {/*    id="name"*/}
                                {/*    type="search"*/}
                                {/*    value={authStore.loginUser.name && authStore.loginUser.name}*/}
                                {/*    onChange={(e) => authStore.handleChangeUserName(e.target.value)}*/}
                                {/*/>*/}
                                {/*<Typography className={classes.labelText}>*/}
                                {/*    ID*/}
                                {/*</Typography>*/}
                                {/*<TextField*/}
                                {/*    sx={{*/}
                                {/*        m: 1,*/}
                                {/*        width: 200,*/}
                                {/*        borderRadius: 5,*/}
                                {/*    }}*/}
                                {/*    required*/}
                                {/*    id="outlined-readOnly"*/}
                                {/*    InputProps={{*/}
                                {/*        readOnly: true,*/}
                                {/*    }}*/}
                                {/*    defaultValue={authStore.loginUser.id}*/}
                                {/*/>*/}
                                <Stack sx={{ alignItems : 'center' }} >
                                    {/*<button>1</button>*/}
                                    {/*<button>2</button>*/}
                                    {/*<Typography>hello</Typography>*/}
                                    <TextField
                                        id="id"
                                        label="ID"
                                        defaultValue={authStore.loginUser.id}
                                        InputLabelProps={
                                            {shrink: true}
                                            // label 상단에 고정으로 위치
                                        }
                                        inputProps={
                                            {readOnly: true}
                                            // 수정하기 버튼 누르면 false로 전환
                                        }
                                        sx={
                                            {m:2}
                                        }
                                        // onChange={handleChange}
                                        // variant="filled"
                                        // name/id/type/is_enabled/created_datetime/updated_datetime
                                    />
                                    <TextField
                                        id="name"
                                        label="이름"
                                        defaultValue={authStore.loginUser.name}
                                        // onChange={handleChange}
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
                                        // onChange={handleChange}
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
                                        // defaultValue={()=>{this.handleDateType()}}  // 완전히 이상한 숫자가 등장
                                        defaultValue={dayjs(authStore.loginUser.createdDatetime).format("YYYY.MM.DD")}
                                        // onChange={handleChange}
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
                                        // onChange={handleChange}
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
                                        // onChange={handleChange}
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
                                {/*<button>ddd</button>*/}
                                {/*<Typography className={classes.labelText}>*/}
                                {/*    계정 생성일*/}
                                {/*</Typography>*/}
                                {/*<Box*/}
                                {/*    sx={{*/}
                                {/*        width : 20*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <TextField*/}
                                {/*        sx={{*/}
                                {/*            m: 1,*/}
                                {/*            width: 200,*/}
                                {/*            borderRadius: 5,*/}
                                {/*        }}*/}
                                {/*        required*/}
                                {/*        id="outlined-readOnly"*/}
                                {/*        InputProps={{*/}
                                {/*            readOnly: true,*/}
                                {/*        }}*/}
                                {/*        // label="Required"*/}
                                {/*        defaultValue={authStore.loginUser.createdDatetime}*/}
                                {/*    />*/}
                                {/*</Box>*/}
                                {/*<Typography className={classes.labelText}>*/}
                                {/*    계정 생성일*/}
                                {/*</Typography>*/}
                                {/*<Box*/}
                                {/*    sx={{*/}
                                {/*        width : 20*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <TextField*/}
                                {/*        sx={{*/}
                                {/*            m: 1,*/}
                                {/*            width: 200,*/}
                                {/*            borderRadius: 5,*/}
                                {/*        }}*/}
                                {/*        required*/}
                                {/*        id="outlined-readOnly"*/}
                                {/*        InputProps={{*/}
                                {/*            readOnly: true,*/}
                                {/*        }}*/}
                                {/*        // label="Required"*/}
                                {/*        defaultValue={authStore.loginUser.createdDatetime}*/}
                                {/*    />*/}
                                {/*</Box>*/}
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