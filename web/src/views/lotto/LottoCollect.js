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
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";

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
        // const emptyRows = this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.rows.length) : 0;
    }

    handleChangeTab = (tab) => {
        this.setState({
            tab : tab
        })
    }

    handleChangeLottoManagementTab = (event, tabIndex) => {
        this.props.lottoStore.lottoManagementTabIndex = tabIndex;
    }

    handleFindLotto = (e) => {
        const { lottoStore } = this.props;
        // if(e.keyCode === 13) {
        //     lottoStore.checkSingleLotto(lottoStore.searchLottoValue);
        // }
        if (lottoStore.searchLottoValue !== undefined && lottoStore.searchLottoValue !== null && lottoStore.searchLottoValue > 0){
            lottoStore.checkSingleLotto(lottoStore.searchLottoValue);
        }
        // 검색하면 다음거 입력하기 좋게 searchBox를 삭제해준다.
        lottoStore.searchLottoValue = '';
    }

    handleChangePage = (event, newPage) => {
        const {lottoStore} = this.props;
        console.log("lottoPage : ",event.target.value);
        lottoStore.lottoPage = lottoStore.lottoPage + newPage;
    }
    handleChangeRowsPerPage = (event) => {
        const {lottoStore} = this.props;
        lottoStore.lottoPage = 0;
        console.log("lottoRowsPerPage : ",event.target.value);
        lottoStore.lottoRowsPerPage = parseInt(event.target.value, 10);
    }


    render() {
        const {classes, lottoStore} = this.props;
        const { lottoManagementTabIndex, lottoPage, lottoRowsPerPage  } = lottoStore;

        return (
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
                            <Box display='flex' alignItems='center' justifyContent='flex-end'>
                                <Box>
                                    <input
                                        name="lottoSearch"
                                        id="lottoSearch"
                                        value={lottoStore.searchLottoValue}
                                        type="search"
                                        onChange={(e) => lottoStore.handleChangeLottoValue(e.target.value)}
                                    />
                                        <Button style={{backgroundColor:'#005ba9', color:'#ffffff'}} onClick={() => this.handleFindLotto()}
                                                disabled={(lottoStore.lottoState === LottoState.Pending || lottoStore.getAxiosLottoData === LottoState.Pending)}
                                        >
                                            {(lottoStore.lottoState === LottoState.Pending || lottoStore.getAxiosLottoData === LottoState.Pending) ?
                                                <CircularProgress style={{color: '#ffffff'}} size={22}/>
                                                :
                                                '검색'
                                            }
                                        </Button>
                                </Box>
                            </Box>



                            <Table>
                                <TableHead>
                                    {/*<TableBody key="lotto-table-header">*/}
                                        <TableRow >
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
                                    {/*</TableBody>*/}
                                </TableHead>
                                <TableBody>
                                {lottoManagementTabIndex === LottoTabIndex.Lotto ?
                                    lottoStore.lottoArrayList && lottoStore.lottoArrayList.map((row, index) => {
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
                                    ''
                                }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            style={{width: '100%'}}
                                            // component="div"
                                            count={lottoStore.lottoArrayList.length}
                                            page={lottoPage}
                                            onPageChange={(e) => this.handleChangePage(e, 1)}
                                            rowsPerPage={lottoRowsPerPage}
                                            rowsPerPageOptions={[5,10,25]}
                                            onRowsPerPageChange={(e) => this.handleChangeRowsPerPage(e)}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Box>
                    </Box>
                </div>
            </div>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
    inject('lottoStore') (
        observer(LottoCollect)
    )
)));