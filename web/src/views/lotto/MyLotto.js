import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import React from 'react';
import {Box, Button, CircularProgress, Typography} from "@material-ui/core";
import {Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import dayjs from "dayjs";
import {LottoState} from "../../stores/LottoStore";


const styles = theme => ({
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    lottoButton: {
        paddingLeft:5,
        backgroundColor:'#005ba9',
        color:'#ffffff',
        height:30,
        '&:hover': {
            color:'#ffffff',
            backgroundColor:'#005ba9',
        }
    },
    lineText: {
        justifyContent: 'flex',
        paddingTop: 3,
        alignItems: 'center',
        display: 'flex',
        paddingLeft: 20,
    },
    lottoFalse: {
        width: '8%',
        align:"center",
        alignItems: 'center',
    },
    lottoBasicTrue: {
        width: 'calc(1em / 0.7)',
        height: 'calc(1em / 0.7)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2em',
        color: 'rgb(218,30,30)',
        border: '2px solid rgb(218,30,30)',
    },
    lottoBonusTrue: {
        width: 'calc(1em / 0.7)',
        height: 'calc(1em / 0.7)',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2em',
        color: 'rgb(7,50,225)',
        border: '2px solid rgb(7,50,225)',
    },

})

class MyLotto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           toggleWeekButton: false,
        };
    }
    
    // *** 추가 조건

    // 매일 6시부터 24시까지 1년 365일 연중무휴 판매합니다.
    // 추첨일(토요일)에는 오후 8시에 판매 마감합니다.
    // 추첨일 오후 8시부터 다음날(일요일) 오전 6시까지는 판매가 정지됩니다.

    componentDidMount() {
        const {lottoStore, authStore} = this.props;
        const LottoSatDay = dayjs(dayjs().day(6));
        // console.log(LottoSatDay.format("YYYY-MM-DD HH:mm:ss"));
        if (dayjs(dayjs()).isBefore(LottoSatDay)) {// 오늘이 토요일보다 전인가?
            lottoStore.setTodayLotto(LottoSatDay.diff(this.props.lottoStore.defaultLottoDate, "week")+1);
        } else {
            lottoStore.setTodayLotto(LottoSatDay.diff(this.props.lottoStore.defaultLottoDate, "week")+2);
        }
        // console.log("이번주 예상 회차 번호 : ",lottoStore.lottoToday);

        lottoStore.getUserRandomLotto(authStore.login.id);
    }

    handleToggleWeekButton = (userId) => {
        const {lottoStore} = this.props;
        if(this.state.toggleWeekButton) {
            lottoStore.getUserLastWeekRandomLotto(userId, 1);
        } else {
            lottoStore.getUserLastWeekRandomLotto(userId, 0);
        }
        this.setState({
            toggleWeekButton: !this.state.toggleWeekButton
        })
    }

    render () {
        const {classes, lottoStore, authStore} = this.props;
        return (
            <Box className={classes.mainContent}>
                <Box className={classes.lineText}>
                    <Typography style={{paddingRight:10, font: '1.028rem solid black'}}>이번주 예상 추첨 회차 : {lottoStore.lottoToday} 회</Typography>
                    {/*onClick 시간 추가 조건인 경우에 버튼 비활성화, 아닌 경우 번호 추첨 누르기*/}
                    {!this.state.toggleWeekButton &&
                        <Button disableRipple className={classes.lottoButton} onClick={() => lottoStore.createUserRandomLotto(authStore.login.id)}
                                disabled={lottoStore.lottoState === LottoState.Pending}>
                            {lottoStore.lottoState === LottoState.Pending ?
                                <CircularProgress style={{color: '#ffffff'}} size={22}/>
                                :
                                '번호 추첨'
                            }
                        </Button>
                    }
                    <Button disableRipple className={classes.lottoButton} onClick={() => this.handleToggleWeekButton(authStore.login.id)}
                            disabled={lottoStore.lottoState === LottoState.Pending}>
                        {this.state.toggleWeekButton ? '이번 주' : '저번 주'}
                    </Button>

                </Box>
                {lottoStore.userLottoList.length !== 0 ?
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">#No</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택1</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택2</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택3</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택4</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택5</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">선택6</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">보너스</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lottoStore.startLottoDate !== null &&
                        <TableRow key={`user-random-last-week`}>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.drawId}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo1}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo2}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo3}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo4}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo5}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#ff0000' }} align="center">{lottoStore.startLottoDate.lottoNo6}</TableCell>
                            <TableCell style={{ width: '8%', alignItems:'center', color:'#309400' }} align="center">{lottoStore.startLottoDate.lottoNo7Bonus}</TableCell>
                        </TableRow>
                        }
                        {lottoStore.userLottoList && lottoStore.userLottoList.map((user, index) => {
                            return (
                                <TableRow key={`user-random-${index}`}>
                                    <TableCell align="center" className={classes.lottoFalse}>{index+1}</TableCell>
                                    <TableCell align="center" className={classes.lottoFalse}>
                                        {lottoStore.findLottoNumberInResult(user.expNo1) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo1}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo1) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo1}</Box>
                                                :
                                                user.expNo1
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} >
                                        {lottoStore.findLottoNumberInResult(user.expNo2) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo2}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo2) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo2}</Box>
                                                :
                                               user.expNo2
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} >
                                        {lottoStore.findLottoNumberInResult(user.expNo3) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo3}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo3) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo3}</Box>
                                                :
                                               user.expNo3
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} >
                                        {lottoStore.findLottoNumberInResult(user.expNo4) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo4}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo4) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo4}</Box>
                                                :
                                               user.expNo4
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} >
                                        {lottoStore.findLottoNumberInResult(user.expNo5) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo5}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo5) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo5}</Box>
                                                :
                                               user.expNo5
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} >
                                        {lottoStore.findLottoNumberInResult(user.expNo6) === 1 ?
                                            <Box className={classes.lottoBasicTrue}>{user.expNo6}</Box>
                                            :
                                            lottoStore.findLottoNumberInResult(user.expNo6) === -1 ?
                                                <Box className={classes.lottoBonusTrue}>{user.expNo6}</Box>
                                                :
                                               user.expNo6
                                        }
                                    </TableCell>
                                    <TableCell align="center" className={classes.lottoFalse} />
                                </TableRow>
                            )}
                        )}
                    </TableBody>
                </Table>
                    :
                    ''
                }
            </Box>
        )
    }

}

export default withSnackbar(withRouter(withStyles(styles) (
    inject('lottoStore', 'authStore')(
        observer(MyLotto)
    )
)));