import React from "react";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {withStyles} from "@material-ui/core/styles";
import {Box, CssBaseline} from "@material-ui/core";

// import axios from "axios";

import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import * as stores from "./stores/AuthStore";
import MyPage from "./views/setting/MyPage";
import LottoCollect from "./views/lotto/LottoCollect";
import UserManagement from "./views/setting/ServerManagement";
import PokemonGoMain from "./views/pokemonGo/PokemonGoMain";


const styles = () => ({
    root: {
        display: 'flex',
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        require('cors');

        this.state = {
            mobileOpen: false,
            menuOpen: true,
        };

        this.setMobileOpen = this.setMobileOpen.bind(this);
    }

    componentDidMount() {
        this.props.authStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    handleDrawerToggle = () =>  {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        const { classes } = this.props;
        const { loginState } = this.props.authStore;

        return (
            <Box className={classes.root} display="flex" flexDirection="row" justifyContent="space-between" alignItems="stretch">
                <Router>
                    <CssBaseline />

                    <Route path="/" component={ScrollToTop}>
                        <TopBar mobileOpen={this.state.mobileOpen}
                                setMobileOpen={this.setMobileOpen}
                                isLoggedIn={loginState === stores.State.Authenticated}
                                doLogout={() => this.props.authStore.doLogout()} />
                        <SideMenu mobileOpen={this.state.mobileOpen}
                                  setMobileOpen={this.setMobileOpen}
                                  initLottoList={() => this.props.lottoStore.initLottoList()}
                                  isLoggedIn={loginState === stores.State.Authenticated} />

                        {loginState === stores.State.Authenticated ? (
                            <React.Fragment>
                              <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/myPage" component={MyPage} />
                                <Route exact path="/lotto" component={LottoCollect} />
                                <Route exact path="/serverManage" component={UserManagement} />
                                <Route exact path="/pokemonGo" component={PokemonGoMain} />
                              </Switch>
                            </React.Fragment>
                        ) : (
                            <Route path="/" component={SignIn} />
                        )}
                  </Route>
                </Router>

            </Box>
        );
    }
}

export default withRouter(withStyles(styles) (
        inject('authStore', 'lottoStore', 'userStore') (
            observer(App)
        )
    )
);
