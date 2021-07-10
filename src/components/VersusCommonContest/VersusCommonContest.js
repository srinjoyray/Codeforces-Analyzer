import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import '../../pages/Versus.css';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        //   maxHeight: 440,
    },
    one: {

    },
    two: {

    },
    draw: {

    }
});

const VersusCommonContest = ({ userContest1, userContest2 }) => {
    const classes = useStyles();

    let contest1 = new Map();
    let username1, username2;
    if (userContest2.length > 0) {
        username1 = userContest1[0].handle;
        username2 = userContest2[0].handle;
    }

    for (let i = 0; i < userContest1.length; i++) {
        contest1.set(userContest1[i].contestId, userContest1[i]);
    }
    let rows = [];

    for (let i = 0; i < userContest2.length; i++) {
        if (!contest1.has(userContest2[i].contestId)) {
            continue;
        }

        rows.push({
            name: userContest2[i].contestName,
            user1: contest1.get(userContest2[i].contestId).rank,
            user2: userContest2[i].rank,
            diff: contest1.get(userContest2[i].contestId).rank - userContest2[i].rank,
        })
    }
    rows = rows.reverse();
    // console.log(rows);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'name', label: 'Common Contest', minWidth: 170, align: 'left', },
        { id: 'rank1', label: username1, minWidth: 100, align: 'right', },
        { id: 'rank2', label: username2, minWidth: 100, align: 'right', },
        { id: 'diff', label: 'Difference', minWidth: 100, align: 'right', },
    ];
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className="versus-table-head">
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ backgroundColor: "#8ba3cf" }}
                                    // style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody className="versus-table-body">
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                
                                <TableRow key={row.name} style={row.diff>0 ? {backgroundColor: "rgb(201 177 207)"} : {backgroundColor: "#f0d6f6"}}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.user1}</TableCell>
                                    <TableCell align="right">{row.user2}</TableCell>
                                    <TableCell align="right">{Math.abs(row.diff)}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                className="versus-table-head"
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        
    )
}

export default VersusCommonContest
