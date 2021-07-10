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

export default function UserInfo({ userInfo, username }) {
  const classes = useStyles();

  let name=userInfo.firstName+" "+userInfo.lastName;
  let country=userInfo.country;
  let rating=userInfo.rating+'('+userInfo.rank+')';
  let maxRating=userInfo.maxRating+'('+userInfo.maxRank+')';
  let contribution=userInfo.contribution;

  rows.splice(0,rows.length);
  rows.push({
    name:"Name",
    data: name
  });
  rows.push({
    name: 'Country',
    data: country
  });
  rows.push({
    name: 'Rating',
    data: rating
  });
  rows.push({
    name: 'Max Rating',
    data: maxRating
  });
  rows.push({
    name: 'Contribution',
    data: contribution
  });

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Info of</TableCell>
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
