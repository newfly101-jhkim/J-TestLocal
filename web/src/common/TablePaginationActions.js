import React from 'react';
import {Box, IconButton, Typography} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import {useTheme} from "@emotion/react";


class TablePaginationActions extends React.Component {

    handleFirstPageButtonClick = (event) => {
        this.props.onPageChange(event, 0);
    };

    handleBackButtonClick = (event) => {

        this.props.onPageChange(event,this.props.page - 1);
    };

    handleNextButtonClick = (event) => {
        this.props.onPageChange(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event) => {
        this.props.onPageChange(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    };



    render() {
        const { theme, count, page, rowsPerPage} = this.props;
        // const theme = useTheme();

        return (
            <Box display='flex' alignItems='center' sx={{ flexShrink: 0}}>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                    style={{
                        boxShadow:'0 0 4.9px 0 rgba(0, 0, 0, 0.25)',
                        padding: 3,
                        marginRight: 20
                    }}
                    disableRipple
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <Typography style={{fontSize:'0.875rem', fontFamily: 'Roboto !important', color: '#9d9d9d'}}><span style={{color: '#333'}}>{page + 1}</span> / {Math.ceil(count / rowsPerPage) > 0 ? Math.ceil(count / rowsPerPage) : 1}</Typography>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                    style={{
                        boxShadow:'0 0 4.9px 0 rgba(0, 0, 0, 0.25)',
                        padding: 3,
                        marginLeft: 20
                    }}
                    disableRipple
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
            </Box>
        );
    }
}

// export default class TablePaginationActions;


export default function(props) {
    const theme = useTheme();

    return <TablePaginationActions {...props} theme={theme}/>;
}