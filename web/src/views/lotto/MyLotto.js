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


    render () {
        const {classes, lottoStore} = this.props;
        return (
            <Box className={classes.mainContent}>
                <Box>
                    <Button disableRipple className={classes.lottoButton} onClick={() => lottoStore.setUserRandomLottoList()}>
                        로또번호 추첨
                    </Button>
                    <Button>

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
    inject('lottoStore')(
        observer(MyLotto)
    )
)));