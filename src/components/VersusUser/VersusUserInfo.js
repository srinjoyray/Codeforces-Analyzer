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

const rows = [

];

const VersusUserInfo = ({ userInfo1, userInfo2}) => {
    const classes = useStyles();
    let username1 = userInfo1.handle;
    let name1 = userInfo1.firstName + " " + userInfo1.lastName;
    let country1 = userInfo1.country;
    let rating1 = userInfo1.rating + '(' + userInfo1.rank + ')';
    let maxRating1 = userInfo1.maxRating + '(' + userInfo1.maxRank + ')';
    let contribution1 = userInfo1.contribution;

    let username2 = userInfo2.handle;
    let name2 = userInfo2.firstName + " " + userInfo2.lastName;
    let country2 = userInfo2.country;
    let rating2 = userInfo2.rating + '(' + userInfo2.rank + ')';
    let maxRating2 = userInfo2.maxRating + '(' + userInfo2.maxRank + ')';
    let contribution2 = userInfo2.contribution;

    rows.splice(0, rows.length);
    rows.push({
        name: "Name",
        data1: name1,
        data2: name2
    });
    rows.push({
        name: 'Country',
        data1: country1,
        data2: country2
    });
    rows.push({
        name: 'Rating',
        data1: rating1,
        data2: rating2
    });
    rows.push({
        name: 'Max Rating',
        data1: maxRating1,
        data2: maxRating2
    });
    rows.push({
        name: 'Contribution',
        data1: contribution1,
        data2: contribution2
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead className="versus-table-head">
                    <TableRow>
                        <TableCell>Info of</TableCell>
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

export default VersusUserInfo
