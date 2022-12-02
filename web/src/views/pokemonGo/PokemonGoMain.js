import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import React from "react";
import {Box, Toolbar, Typography} from "@material-ui/core";

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
    lineText: {
        justifyContent: 'flex',
        paddingTop: 3,
        alignItems: 'center',
        display: 'flex',
        paddingLeft: 20,
    },
});

class PokemonGoMain extends React.Component {
    constructor(props) {
        super(props);

        this.props.pokemongoStore.getPokeMonDataList();
    }

    componentDidMount() {

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer}/>
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" component="h2">
                            포켓몬 고 도감작 확인
                        </Typography>
                    </Toolbar>
                    <Box className={classes.contentBox}>
                        <Box className={classes.contentPadding}>
                        </Box>
                    </Box>
                </div>
            </div>
        );
    }
}

export default withSnackbar(withRouter(withStyles(styles) (
    inject('pokemongoStore')(
        observer(PokemonGoMain)
    )
)));