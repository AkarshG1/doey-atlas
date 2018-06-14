import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class HistoryTable extends Component{
  constructor(props){
        super(props)
        this.state = {
            tasklist : props.tasklist
        }
    }

  render(){
      return (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tasklist.map(n => {
                return (
                  <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.taskname}
                    </TableCell>
                    <TableCell numeric>{n.status}</TableCell>
                    <TableCell numeric>{n.start}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );
  }
}

export default withStyles(styles)(HistoryTable);
