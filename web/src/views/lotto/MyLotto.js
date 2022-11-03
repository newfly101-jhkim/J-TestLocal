import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import React from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import dayjs from "dayjs";


const styles = theme => ({
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

})

class MyLotto extends React.Component {
    
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

    render () {
        const {classes, lottoStore, authStore} = this.props;
        return (
            <Box className={classes.mainContent}>
                <Box>
                    <Typography>이번주 예상 추첨 회차 : {lottoStore.lottoToday} 회</Typography>
                    <Button disableRipple className={classes.lottoButton} onClick={() => lottoStore.createUserRandomLotto(authStore.login.id)}>
                        로또번호 추첨
                    </Button> {/*onClick 시간 추가 조건인 경우에 버튼 비활성화, 아닌 경우 번호 추첨 누르기*/}
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lottoStore.userLottoList && lottoStore.userLottoList.map((user, index) => {
                            return (
                                <TableRow key={`user-random-${index}`}>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{index+1}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[0]}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[1]}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[2]}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[3]}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[4]}</TableCell>
                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{user[5]}</TableCell>
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