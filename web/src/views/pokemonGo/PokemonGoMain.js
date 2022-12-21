import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import React from "react";
import {Box, Button, Toolbar, Typography} from "@material-ui/core";
import {Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow} from "@mui/material";
import TablePaginationActions from "../../common/TablePaginationActions";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
        const {classes, pokemongoStore} = this.props;

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
                        <Box alignItems='flex-end'>
                            <Button onClick={() => pokemongoStore.getPokemonApi(1)}>추가</Button>
                        </Box>
                        <Box className={classes.contentPadding}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">번호</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">이름</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">기본</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">3*</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">이로치</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">그림자</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">정화</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">진화가능</TableCell>
                                        <TableCell style={{ width: '8%', alignItems:'center' }} align="center">최근확인날짜</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {pokemongoStore.pokemonDogamList ? pokemongoStore.pokemonDogamList.map((row, index) => {
                                            return (
                                                <TableRow key={`dogam-${index}`}>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamId}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.name}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamDefault ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamStar3 ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamDiffColor ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamShadow ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamPurify ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.dogamEvolution ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon />}</TableCell>
                                                    <TableCell style={{ width: '8%', alignItems:'center' }} align="center">{row.updatedDatetime}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                        :
                                        <TableRow>
                                            <TableCell align="center" colSpan={9} style={{font:'0.927rem', width: '72%', alignItems:'center' }}>검색 결과가 없습니다.</TableCell>
                                        </TableRow>
                                    }


                                </TableBody>

                                {/*<TableFooter>*/}
                                {/*    <TableRow>*/}
                                {/*        <TablePagination*/}
                                {/*            style={{width: '100%'}}*/}
                                {/*            count={pokemongoStore.pokemonDogamList.length}*/}
                                {/*            page={lottoPage}*/}
                                {/*            onPageChange={this.handleChangePage}*/}
                                {/*            SelectProps={{renderValue: (value) => value}}*/}
                                {/*            rowsPerPage={lottoRowsPerPage}*/}
                                {/*            rowsPerPageOptions={[5,10,25]}*/}
                                {/*            onRowsPerPageChange={this.handleChangeRowsPerPage}*/}
                                {/*            ActionsComponent={TablePaginationActions}*/}
                                {/*        />*/}
                                {/*    </TableRow>*/}
                                {/*</TableFooter>*/}
                            </Table>
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