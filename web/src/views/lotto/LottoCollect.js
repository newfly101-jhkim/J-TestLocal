import React from 'react';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Box, Button, CircularProgress, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import {LottoState, LottoTabIndex} from "../../stores/LottoStore";

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
            lottoValue : ''
        })
    }

    handleChangeTab = (tab) => {
        this.setState({
            tab : tab
        })
    }

    handleChangeLottoManagementTab = (event, tabIndex) => {
        this.props.lottoStore.lottoManagementTabIndex = tabIndex;
    }
    handleFindLotto = () => {
        const { lottoStore } = this.props;
        if (lottoStore.searchLottoValue !== undefined && lottoStore.searchLottoValue !== null && lottoStore.searchLottoValue > 0){
            lottoStore.checkSingleLotto(lottoStore.searchLottoValue);
        }
        // 검색하면 다음거 입력하기 좋게 searchBox를 삭제해준다.
        lottoStore.searchLottoValue = '';
    }

    render() {
        const {classes, lottoStore} = this.props;
        const { lottoManagementTabIndex } = lottoStore;

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
                            <Box className={classes.lineText}>
                                <Typography className={classes.labelText}> 회차 </Typography>
                                <Typography className={classes.labelText}> 날짜 </Typography>
                                <Typography className={classes.labelText}> 번호1 </Typography>
                                <Typography className={classes.labelText}> 번호2 </Typography>
                                <Typography className={classes.labelText}> 번호3 </Typography>
                                <Typography className={classes.labelText}> 번호4 </Typography>
                                <Typography className={classes.labelText}> 번호5 </Typography>
                                <Typography className={classes.labelText}> 번호6 </Typography>
                                <Typography className={classes.labelText}> 번호7 </Typography>
                            </Box>
                            {lottoManagementTabIndex === LottoTabIndex.Lotto ?
                                lottoStore.lottoArrayList && lottoStore.lottoArrayList.map((row, index) => {
                                    return (
                                        <Box key={`lotto-${index}`} className={classes.lineText}>
                                            <Typography className={classes.labelText}> {row.drawId} </Typography>
                                            <Typography className={classes.labelText}> {row.drawDatetime} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo1} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo2} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo3} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo4} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo5} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo6} </Typography>
                                            <Typography className={classes.labelText}> {row.lottoNo7Bonus} </Typography>
                                        </Box>
                                    );
                                })
                            :
                                ''
                            }
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