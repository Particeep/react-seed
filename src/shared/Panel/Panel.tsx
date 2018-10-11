import * as React from 'react'
import {CircularProgress, createStyles, Theme, withStyles, WithStyles} from '@material-ui/core'
import classNames from 'classnames'


const styles = (t: Theme) => createStyles({
  root: {
    borderRadius: 4,
    border: `1px solid ${t.palette.divider}`
  },
  marginBottom: {
    marginBottom: t.spacing.unit * 2,
  },
  hover: {
    transition: t.transitions.create('all'),
    '&:hover': {
      borderColor: t.palette.primary[200],
    }
  }
});

interface IProps extends WithStyles<typeof styles> {
  marginBottom?: boolean;
  loading?: boolean;
  className?: any;
  hoverable?: boolean;
}

class Panel extends React.Component<IProps, {}> {

  render() {
    const {className, marginBottom, classes, children, loading, hoverable, ...other} = this.props;
    return (
      <div {...other} className={classNames(classes.root, className, marginBottom && classes.marginBottom, hoverable && classes.hover)}>
        {loading ? this.renderLoaded() : children}
      </div>
    );
  }

  private renderLoaded() {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100}}>
        <CircularProgress/>
      </div>
    );
  }
}

export default withStyles(styles)(Panel);
