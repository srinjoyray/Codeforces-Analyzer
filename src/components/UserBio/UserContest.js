import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './UserBio.css'
const useStyles = makeStyles({
  table: {
    // maxWidth: 500,
    // minWidth: 450
  },
});

const rows = [

];

export default function UserContest({ userContest, username }) {
  const classes = useStyles();

  userContest = Array.from(userContest);
  let bestRank = Math.min.apply(null, userContest.map(function (item) {
    return item.rank;
  }));
  
  let worstRank = Math.max.apply(null, userContest.map(function (item) {
    return item.rank;
  }));
  let maxUp = Math.max.apply(null, userContest.map(function (item) {
    return item.newRating - item.oldRating;
  }));

  let maxDown = Math.min.apply(null, userContest.map(function (item) {
    return item.newRating - item.oldRating;
  }));

  rows.splice(0,rows.length);
  rows.push({
    name:"No of contests",
    data: userContest.length
  });
  rows.push({
    name: 'Best Rank',
    data: bestRank
  });
  rows.push({
    name: 'Worst Rank',
    data: worstRank
  });
  rows.push({
    name: 'Max Up',
    data: maxUp
  });
  rows.push({
    name: 'Max Down',
    data: maxDown
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Contests of</TableCell>
            <TableCell align="right">{username}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.data}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
