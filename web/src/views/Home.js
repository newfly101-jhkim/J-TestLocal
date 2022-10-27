import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Box, Button, CircularProgress, Toolbar, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {LottoState} from "../stores/LottoStore";


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
});

class Home extends React.Component {

    componentDidMount() {
        // this.props.enqueueSnackbar("Welcome", {
        //     variant: 'info'
        // });
        // this.props.lottoStore.handleGetLottoList(103);
    }

    handleClickLotto = () => {
        this.props.lottoStore.handleGetLottoList(100);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" component="h2">
                            Home
                        </Typography>
                    </Toolbar>
                    <Box display='flex' alignItems='center' style={{width:'100%', justifyContent:'flex'}}>
                        <Typography> Jkim의 이것 저것</Typography>
                        <Typography> 뭐가 있지</Typography>
                    </Box>
                    <Box>
                        <Button onClick={() => this.handleClickLotto()} disabled={this.props.lottoStore.lottoState === LottoState.Pending}>
                            { this.props.lottoStore.lottoState === LottoState.Pending ?
                                <CircularProgress size={22}/>
                            :
                                '유저 만들기'
                            }
                        </Button>
                    </Box>
                    {this.props.lottoStore.lottoList &&
                    <Box>
                        <Typography> {this.props.lottoStore.lottoList.drawNo}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.drawNoDate}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo1}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo2}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo3}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo4}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo5}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo6}</Typography>
                        <Typography> {this.props.lottoStore.lottoList.lottoNo7Bonus}</Typography>
                    </Box>
                    }
                </div>
            </div>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
        inject('authStore', 'lottoStore') (
            observer(Home)
    )
)));