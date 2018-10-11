import * as React from 'react'
import {CardContent as MuiCardContent, createStyles, Theme, withStyles, WithStyles} from '@material-ui/core'
import classNames from 'classnames'


const styles = (t: Theme) => createStyles({
  root: {
    borderRadius: 2,
  }
});

interface IProps extends WithStyles<typeof styles> {
  className?: any;
}

class PanelContent extends React.Component<IProps, {}> {
  render() {
    const {className, classes, children, ...other} = this.props;
    return (
      <MuiCardContent {...other} className={classNames(classes.root, className)}>
        {children}
      </MuiCardContent>
    );
  }
}

export default withStyles(styles)(PanelContent);
