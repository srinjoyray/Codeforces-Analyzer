import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../../pages/Versus.css'
const useStyles = makeStyles({
    table: {
        // maxWidth: 500,
        // minWidth: 450
    },
});

const rows = [];

const VersusUserContest = ({ userContest1, userContest2 }) => {
    const classes = useStyles();
    
    let username1 = userContest1.length>0 ? userContest1[0].handle : '';
    userContest1 = Array.from(userContest1);
    let bestRank1 = Math.min.apply(null, userContest1.map(function (item) {
        return item.rank;
    }));
    let worstRank1 = Math.max.apply(null, userContest1.map(function (item) {
        return item.rank;
    }));
    let maxUp1 = Math.max.apply(null, userContest1.map(function (item) {
        return item.newRating - item.oldRating;
    }));
    let maxDown1 = Math.min.apply(null, userContest1.map(function (item) {
        return item.newRating - item.oldRating;
    }));

    let username2 = userContest2.length>0 ? userContest2[0].handle : '';
    
    userContest2 = Array.from(userContest2);
    let bestRank2 = Math.min.apply(null, userContest2.map(function (item) {
        return item.rank;
    }));
    let worstRank2 = Math.max.apply(null, userContest2.map(function (item) {
        return item.rank;
    }));
    let maxUp2 = Math.max.apply(null, userContest2.map(function (item) {
        return item.newRating - item.oldRating;
    }));
    let maxDown2 = Math.min.apply(null, userContest2.map(function (item) {
        return item.newRating - item.oldRating;
    }));

    rows.splice(0, rows.length);
    rows.push({
        name: "No of contests",
        data1: userContest1.length,
        data2: userContest2.length,
    });
    rows.push({
        name: 'Best Rank',
        data1: bestRank1,
        data2: bestRank2
    });
    rows.push({
        name: 'Worst Rank',
        data1: worstRank1,
        data2: worstRank2
    });
    rows.push({
        name: 'Max Up',
        data1: maxUp1,
        data2: maxUp2
    });
    rows.push({
        name: 'Max Down',
        data1: maxDown1,
        data2: maxDown2
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className="versus-table-head">
                    <TableRow>
                        <TableCell>Contests of</TableCell>
                        <TableCell align="right">{username1}</TableCell>
                        <TableCell align="right">{username2}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className="versus-table-body">
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.data1}</TableCell>
                            <TableCell align="right">{row.data2}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default VersusUserContest
