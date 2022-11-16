import React from 'react';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Box, Button} from "@mui/material";

const styles = theme => ({


});

class ServerManagement extends React.Component {

    render() {
        const {serverManagementStore} = this.props;
        return (
            <div>
                <Box>
                    <Box pt={20}>
                        <Button onClick={() => serverManagementStore.test()}>
                            불러온다.
                        </Button>
                    </Box>
                </Box>
            </div>
            )
    }

}

export default withSnackbar(withRouter((withStyles(styles) (
    inject('serverManagementStore')(
        observer(ServerManagement)
    )
))));