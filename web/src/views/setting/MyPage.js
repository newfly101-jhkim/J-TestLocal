import React from "react";
import {withRouter} from "react-router-dom";
import {withSnackbar} from "notistack";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Box, Toolbar, Typography} from "@material-ui/core";

const styles = theme => ({
    mainContainer : {
        flexGrow : 1,
        padding: theme.spacing(3)
    },
    appBarSpacer : theme.mixins.toolbar,
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
        fontSize: '0.938rem',
        color: 'rgba(102, 102, 102, 0.8)',
        fontWeight: 500,
        marginRight: 0,
        width: 190,
    },
    lineText: {
        justifyContent: 'flex',
        paddingTop: 3,
        alignItems: 'center',
        display: 'flex',
    },
})


class MyPage extends React.Component {

    render() {
        const { classes, authStore } = this.props;

        return (
            <div className={classes.mainContainer}>
                <div className={classes.appBarSpacer}>
                    <Toolbar className={classes.mainContent} />
                    <Typography variant="h4" component="h2">
                        마이 페이지
                    </Typography>
                    <Box className={classes.contentBox}>
                        <Box className={classes.contentPadding}>
                            <Box className={classes.lineText}>
                                <Typography className={classes.labelText}>
                                    이름
                                </Typography>
                                <input
                                    name="name"
                                    id="name"
                                    type="search"
                                    value={authStore.loginUser.name && authStore.loginUser.name}
                                    onChange={(e) => authStore.handleChangeUserName(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </div>
            </div>
        )

    }

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('authStore')(
        observer(MyPage)
    )
))));