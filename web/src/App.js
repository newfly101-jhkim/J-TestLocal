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


const styles = () => ({
    root: {
        display: 'flex',
    }
});


@inject('authStore')
@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
            menuOpen: true,
        };

        this.setMobileOpen = this.setMobileOpen.bind(this);
    }

    componentDidMount() {
        // const axiosRequestInterceptors = (config) => {
        //     const token = localStorage.getItem(stores.LocalStorageTokenKey);
        //
        //     if(token) {
        //         config.headers['X-Auth-Token'] = token;
        //     }
        //
        //     return config;
        // };
        //
        // const axiosRequestErrorHandler = (error) => {
        //     return Promise.reject(error);
        // };
        //
        // const axiosResponseInterceptor = (response) => {
        //     if(response.status === 403) {
        //         this.props.authStore.invalidateLogin();
        //     }
        //
        //     return response;
        // };
        //
        // const axiosResponseErrorHandler = (error) => {
        //     if((error.response) && (error.response.status === 403)) {
        //         this.props.authStore.invalidateLogin();
        //     }
        //
        //     return Promise.reject(error);
        // };
        //
        // console.log("========== RGate App componentDidMount ==========");
        // axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        // axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

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
                                  isLoggedIn={loginState === stores.State.Authenticated} />

                        {loginState === stores.State.Authenticated ? (
                            <React.Fragment>
                              <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/home" component={Home} />
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
        inject('authStore') (
            observer(App)
        )
    )
);
