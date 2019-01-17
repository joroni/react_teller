import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ActiveList from './ActiveList';
import FormDialog from './FormDialog';
import HoldList from './HoldList';
import Button from '@material-ui/core/Button';
//import Button from '@material-ui/core/Button';
//import Paper from './Paper';
//import FullWidthGrid from './FullWidthGrid';
import PendingList from './PendingList';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    spacing:'0'
  },
});

function FullWidthGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>  <button onClick={this.handleClick}  value="ACTIVE" className="btn btn-primary">Serve</button> 
        <button onClick={this.handleClick}  value="HOLD" className="btn btn-primary">Hold</button> 
       <button onClick={this.handleClick}  value="NOSHOW" className="btn btn-primary">No Show</button>
       <button onClick={this.handleClick}  value="RETURN" className="btn btn-primary">Return</button>
       <button onClick={this.handleClick}  value="DONE" className="btn btn-primary">Done</button>
</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}><PendingList/></Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>
          <Grid item xs={12} sm={12} lg={12}>
          <Paper className={classes.paper}><ActiveList/></Paper>
          </Grid>
         <Grid item xs={12} sm={12} lg={12}>
          <Paper className={classes.paper}><HoldList/></Paper>
        </Grid>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);