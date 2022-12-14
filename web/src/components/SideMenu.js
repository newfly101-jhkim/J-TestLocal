import React from "react";
import {Link} from "react-router-dom";

import {Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ComputerIcon from '@material-ui/icons/Computer';

const logoWidth = 129;
const logoHeight = 22;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        width: theme.drawerWidth,
        paddingLeft: 0,
        paddingRight: 0,
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: theme.drawerWidth,
        height: '100%',
        border: 'none',
    },
    toolbar: {
        width: theme.drawerWidth,
        backgroundColor: theme.palette.primary.main,
        paddingLeft: 0,
        paddingRight: 0,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    logo: {
        width: logoWidth,
        height: logoHeight,
        marginLeft: (theme.drawerWidth - logoWidth) / 2,
        marginRight: (theme.drawerWidth - logoWidth) / 2,
    },
    menu: {
        borderRight: '1px solid rgba(0,0,0,0.12)',
        height: '100%',
    },

    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, setMobileOpen, isLoggedIn, initLottoList } = props;

    const handleListItemClick = () => {
        initLottoList();
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={classes.menu}>
            <List>
                {/*<ListSubheader inset>관리</ListSubheader>*/}

                <Link to="/home" className={classes.link}>
                    <ListItem button disableRipple onClick={() => handleListItemClick()}>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="홈" />
                    </ListItem>
                </Link>

                <Link to="/lotto" className={classes.link}>
                    <ListItem button disableRipple onClick={() => handleListItemClick()}>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="로또 생성기" />
                    </ListItem>
                </Link>
                <Link to="/myPage" className={classes.link}>
                    <ListItem button disableRipple onClick={() => handleListItemClick()}>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="마이페이지" />
                    </ListItem>
                </Link>

                <Link to="/pokemonGo" className={classes.link}>
                    <ListItem button disableRipple onClick={() => handleListItemClick()}>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="포켓몬고" />
                    </ListItem>
                </Link>

                <Link to="/serverManage" className={classes.link}>
                    <ListItem button disableRipple onClick={() => handleListItemClick()}>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="서버 관리" />
                    </ListItem>
                </Link>
            </List>

            <Divider />
        </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">

                <Drawer variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                >
                    <Toolbar className={classes.toolbar}>
                        <Link to='/' className={classes.link}>
                            <img src="/images/logo_onthelive.png" alt="onthelive" className={classes.logo}/>
                        </Link>
                    </Toolbar>
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}

                        open
                >
                    <Toolbar className={classes.toolbar}>
                        <Link to='/' className={classes.link}>
                            <img src="/images/logo_onthelive.png" alt="onthelive" className={classes.logo}/>
                        </Link>
                    </Toolbar>
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
        </nav>
    );
};