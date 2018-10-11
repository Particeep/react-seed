import * as React from 'react'
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core'
import classNames from 'classnames'


const styles = (t: Theme) => createStyles({
  root: {
    borderRadius: 4,
    background: t.palette.background.default,
    padding: t.spacing.unit * 1.5,
    display: 'block',
    lineHeight: 1.5,
    fontFamily: '"Roboto Mono", monospace',
    fontSize: 13,
    // border: `1px solid ${t.palette.divider}`,
  }
});

interface IProps extends WithStyles<typeof styles> {
  className?: any;
}

class Code extends React.Component<IProps, {}> {
  render() {
    const {className, classes, children, ...other} = this.props;
    return (
      <code {...other} className={classNames(classes.root, className)}>{children}</code>
    );
  }
}

export default withStyles(styles)(Code);
