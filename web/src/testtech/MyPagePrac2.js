import React from "react";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Box, Toolbar, Typography} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

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
        marginTop: 20,
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
            second : dayjs().format("YYYY-MM-DD"),
            renameSwitch : true,
            realUpdateTime : this.props.authStore.loginUser.updatedDatetime,
            useName: this.props.authStore.loginUser.enabled ? "활성화" : "휴면", // 이렇게 할 거라면 loginUser.enabled 값을 radio button으로 바꿔줘야 가능.
            number : 1,
            // newName: "휴면",
            // realEnabled : this.props.authStore.loginUser.enabled,
        }
    }

    CanChangeInfo = () => {
        this.setState({
            renameSwitch : false
        })
    }

    EndChangeInfo = () => {
        let nowTime = Date();
        // console.log("현재시간 : ", nowTime) // 1번
        this.setState({
            renameSwitch : true,
            realUpdateTime: nowTime,
            // realUpdateTime: Date(),
        }, () => {console.log("real : ", this.state.realUpdateTime)}) // 3번
        console.log("현재시간 : ", nowTime) // 2번
        // this.handleEnabled(e)
    }

    handleEnabled = (e) => {
        this.setState({
            useName : e.target.value
            // realEnabled : e.target.value
        }, ()=>{
            console.log(e.target.value)
            // this.setState({
            //     useName: "휴면"
            // })
        })
    }

    // 원하는 대로 작동함
    // handleNumber = (e) => {
    //     this.setState({
    //         number : e.target.value
    //     }, ()=>{console.log(e.target.value)})
    // }

    componentWillUnmount() {
        this.setState({
            realEnabled : this.props.authStore.loginUser.enabled
        })
    }

    render() {
        const { classes, authStore } = this.props;
        console.log(authStore.loginUser)
        console.log(this.state.realEnabled, authStore.loginUser.enabled)

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
                                            {readOnly: this.state.renameSwitch}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    {this.state.renameSwitch ? "" : <span style={{color : "green"}}>ID 변경 가능합니다.</span>}
                                    <TextField
                                        id="name"
                                        label="이름"
                                        defaultValue={authStore.loginUser.name}
                                        InputLabelProps={
                                            {shrink: true}
                                        }
                                        inputProps={
                                            {readOnly: this.state.renameSwitch}
                                        }
                                        sx={
                                            {m:2}
                                        }
                                    />
                                    {this.state.renameSwitch ? "" : <span style={{color : "green"}}>이름 변경 가능합니다.</span>}
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
                                        // defaultValue={this.state.realUpdateTime.format("YYYY.MM.DD")}
                                        // defaultValue={dayjs(authStore.loginUser.updatedDatetime).format("YYYY.MM.DD")}
                                        defaultValue={dayjs(this.state.realUpdateTime).format("YYYY.MM.DD")}
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
                                    {/*<TextField*/}
                                    {/*    id="status"*/}
                                    {/*    label="계정 상태"*/}
                                    {/*    defaultValue={authStore.loginUser.enabled ? "활성화" : "휴면"}*/}
                                    {/*    InputLabelProps={*/}
                                    {/*        {shrink: true}*/}
                                    {/*    }*/}
                                    {/*    inputProps={*/}
                                    {/*        {readOnly: true}*/}
                                    {/*    }*/}
                                    {/*    sx={*/}
                                    {/*        {m:2}*/}
                                    {/*    }*/}
                                    {/*/>*/}
                                    {this.state.renameSwitch
                                        ? <TextField
                                            id="status"
                                            label="계정 상태"
                                            // value={"활성화"}
                                            value={this.state.useName}
                                            // value={this.state.useName}
                                            // defaultValue={this.state.realEnabled === "활성화" ? "활성화" : "휴면"}
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
                                        : <FormControl>
                                            <FormLabel>계정 상태</FormLabel>
                                            <RadioGroup
                                                row
                                                value={this.state.useName} // 스위치를 쓰는 건 어떨까. DB를 받아와 view에 뿌림.
                                                // defaultValue={this.state.realEnabled === "활성화" ? "활성화" : "휴면"} // 스위치를 쓰는 건 어떨까. DB를 받아와 view에 뿌림.
                                                onChange={(e)=>this.handleEnabled(e)}
                                            >
                                                <FormControlLabel control={<Radio/>} label={"활성화"} value={"활성화"} />
                                                <FormControlLabel control={<Radio/>} label={"휴면"} value={"휴면"} />
                                            </RadioGroup>
                                        </FormControl>

                                        // 원하는 대로 작동함
                                        // : <FormControl>
                                        //     <FormLabel>계정 상태</FormLabel>
                                        //     <RadioGroup
                                        //         row
                                        //         value={this.state.number} // 스위치를 쓰는 건 어떨까. DB를 받아와 view에 뿌림.
                                        //         // defaultValue={this.state.realEnabled === "활성화" ? "활성화" : "휴면"} // 스위치를 쓰는 건 어떨까. DB를 받아와 view에 뿌림.
                                        //         onChange={(e)=>this.handleNumber(e)}
                                        //     >
                                        //         <FormControlLabel control={<Radio/>} label={"활성화"} value={1} />
                                        //         <FormControlLabel control={<Radio/>} label={"휴면"} value={2} />
                                        //     </RadioGroup>
                                        // </FormControl>
                                    }
                                    {/*<FormControl>*/}
                                    {/*    <FormLabel>계정 상태</FormLabel>*/}
                                    {/*    <RadioGroup*/}
                                    {/*        row*/}
                                    {/*        value={authStore.loginUser.enabled ? "활성화" : "휴면"} // 스위치를 쓰는 건 어떨까. DB를 받아와 view에 뿌림.*/}
                                    {/*        onChange={this.handleEnabled}*/}
                                    {/*    >*/}
                                    {/*        <FormControlLabel control={<Radio/>} label={"활성화"} value={"활성화"} />*/}
                                    {/*        <FormControlLabel control={<Radio/>} label={"휴면"} value={"휴면"} />*/}
                                    {/*    </RadioGroup>*/}
                                    {/*</FormControl>*/}
                                    {this.state.renameSwitch
                                        ? <button onClick={this.CanChangeInfo}>정보 수정</button>
                                        : <button onClick={this.EndChangeInfo}>수정 완료</button>}
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