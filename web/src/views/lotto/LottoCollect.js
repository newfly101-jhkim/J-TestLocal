import React from 'react';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {
    Box,
    Button,
    CircularProgress,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from "@material-ui/core";
import {LottoState, LottoTabIndex} from "../../stores/LottoStore";
import {
    Backdrop,
    IconButton,
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import TablePaginationActions from "../../common/TablePaginationActions";
import RefreshIcon from '@material-ui/icons/Refresh';
import MyLotto from "./MyLotto";

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
    contentBox:{
        width: '100%',
        background: '#fff',
        marginTop: 40,
        paddingTop: 10,
        paddingBottom: 40,
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)'
    },
    contentPadding:{
        width: '100%',
        padding: '0 30px',
        boxSizing: 'border-box'
    },
    labelText: {
        fontSize: '1.038rem',
        color: 'rgba(102, 102, 102, 0.8)',
        fontWeight: 500,
        marginRight: 0,
        width: 140,
    },
    lineText: {
        justifyContent: 'flex',
        paddingTop: 20,
        alignItems: 'center',
        display: 'flex',
    },
});

class LottoCollect extends React.Component {
    componentDidMount() {

        this.setState({
            lottoValue : '',
            page: 0,
            rowsPerPage : 5,
        })
        this.props.lottoStore.getLottoList();
    }

    handleChangeTab = (tab) => {
        this.setState({
            tab : tab
        })
    }

    handleChangeLottoManagementTab = (event, tabIndex) => {
        this.props.lottoStore.setLottoManagementTabIndex(tabIndex);
    }

    // DB랑 통신하지 않고, 처음에 rendering할때 불러온 값에서 검색하는 기능
    handleAutoFindLotto = (value) => {
        const { lottoStore } = this.props;
        lottoStore.setLottoPage(0);
        lottoStore.handleChangeLottoValue(value);
        lottoStore.setFilterLottoViewList();

        if (lottoStore.searchLottoValue === null || lottoStore.searchLottoValue === undefined || lottoStore.searchLottoValue === '') {
            lottoStore.setLottoViewList();
        }
    }

    // Enter키 입력 시 자동 검색 버튼 눌림
    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.handleFindLotto();
        }
    }

    handleFindLotto = () => { // 125
        const { lottoStore } = this.props;
        lottoStore.setLottoPage(0);
        // console.log("view길이 : ",lottoStore.lottoViewList.length,"view : ",lottoStore.lottoViewList);
        if (lottoStore.lottoViewList.length === 0){
            // 특정 검색한 로또만 화면에 표출 => api호출
            lottoStore.checkSingleLotto(lottoStore.searchLottoValue);
        }
        // 검색하면 다음거 입력하기 좋게 searchBox를 삭제해준다.
        lottoStore.handleChangeLottoValue('');
    }

    handleChangePage = (event, newPage) => {
        const {lottoStore} = this.props;
        lottoStore.setLottoPage(newPage);
    }
    handleChangeRowsPerPage = (event) => {
        const {lottoStore} = this.props;
        lottoStore.setLottoPage(0);
        lottoStore.setLottoRowsPerPage(parseInt(event.target.value, 10));
    }


    render() {
        const {classes, lottoStore} = this.props;
        const { lottoManagementTabIndex, lottoPage, lottoRowsPerPage  } = lottoStore;

        return (
            <>
                {lottoStore.isLoading ?
                <Backdrop style={{color:'#fff', backgroundColor:'#949494' ,zIndex: (theme) => theme.zIndex.drawer + 1}} open={lottoStore.isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            :
                <div className={classes.mainContainer}>
                    <div className={classes.appBarSpacer}/>
                    <div className={classes.mainContent}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h4" component="h2">
                                동행 복권 (Lottery)
                            </Typography>
                        </Toolbar>
                        <Box className={classes.contentBox}>
                            <Box className={classes.contentPadding}>
                                <Box>
                                    <Tabs
                                        value={lottoManagementTabIndex}
                                        onChange={this.handleChangeLottoManagementTab}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                    >
                                        <Tab
                                            key={"presentation-tab"}
                                            value={LottoTabIndex.Lotto}
                                            // className={clsx(classes.colorTabStyle, classes.colorTab)}
                                            disableRipple
                                            label="동행 복권 로또"
                                        />
                                        <Tab
                                            key={"waiting-tab"}
                                            // className={clsx(classes.colorTabStyle, classes.colorTab)}
                                            value={LottoTabIndex.MyLotto}
                                            disableRipple
                                            label='나의 로또'
                                        />
                                    </Tabs>
                                </Box>

                                {lottoManagementTabIndex === LottoTabIndex.Lotto ?
                                    <>
                                        <Box display='flex' alignItems='center' justifyContent='flex-end'>
                                            <Box pr={2}>
                                                <IconButton onClick={() => lottoStore.getLottoList()}>
                                                    <RefreshIcon/>
                                                </IconButton>
                                            </Box>
                                            <Box pr={2}>
                                                <input
                                                    name="lottoSearch"
                                                    style={{height:30}}
                                                    id="lottoSearch"
                                                    value={lottoStore.searchLottoValue}
                                                    type="search"
                                                    onChange={(e) => this.handleAutoFindLotto(e.target.value)}
                                                    onKeyUp={this.handleKeyUpPassword}
                                                />
                                            </Box>
                                            <Box>
                                                <Button style={{paddingLeft:5, backgroundColor:'#005ba9', color:'#ffffff', height:30}} onClick={() => this.handleFindLotto()}
                                                        disabled={(lottoStore.searchState === LottoState.Pending || lottoStore.getAxiosLottoData === LottoState.Pending)}
                                                >
                                                    {(lottoStore.searchState === LottoState.Pending || lottoStore.getAxiosLottoData === LottoState.Pending) ?
                                                        <CircularProgress style={{color: '#ffffff'}} size={22}/>
                                                        :
                                                        '검색'
                                                    }
                                                </Button>
                                            </Box>
                                        </Box>

                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">회차</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">날짜</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호1</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호2</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호3</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호4</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호5</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호6</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호7</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>

                                                {lottoStore.lottoViewList ? lottoStore.lottoViewList.slice(lottoPage * lottoRowsPerPage, lottoPage * lottoRowsPerPage + lottoRowsPerPage).map((row, index) => {
                                                    return (
                                                        <TableRow key={`lotto-${index}`}>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.drawId}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.drawDatetime}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo1}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo2}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo3}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo4}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo5}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo6}</TableCell>
                                                            <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.lottoNo7Bonus}</TableCell>
                                                        </TableRow>
                                                        )
                                                    })
                                                :
                                                <TableRow>
                                                    <TableCell align="center" colSpan={9} style={{font:'0.927rem', width: '72%', alignItems:'center' }}>검색 결과가 없습니다.</TableCell>
                                                </TableRow>
                                                }


                                            </TableBody>

                                            <TableFooter>
                                                <TableRow>
                                                    <TablePagination
                                                        style={{width: '100%'}}
                                                        count={lottoStore.lottoViewList.length}
                                                        page={lottoPage}
                                                        onPageChange={this.handleChangePage}
                                                        SelectProps={{renderValue: (value) => value}}
                                                        rowsPerPage={lottoRowsPerPage}
                                                        rowsPerPageOptions={[5,10,25]}
                                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                                        ActionsComponent={TablePaginationActions}
                                                    />
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </>
                                    :
                                    <MyLotto />
                                }
                            </Box>
                        </Box>
                    </div>
                </div>
            }
            </>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
    inject('lottoStore') (
        observer(LottoCollect)
    )
)));