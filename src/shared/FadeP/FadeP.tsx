import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {fade} from '@material-ui/core/styles/colorManipulator'
import classNames from 'classnames'

const styles = (t: Theme) => createStyles({
  root: {
    overflow: 'hidden',
    position: 'relative',
    // paddingTop: t.spacing.unit / 2,
    // padding: `${t.spacing.unit * 2}px ${t.spacing.unit * 2}px 0 ${t.spacing.unit * 2}px`,

    '&:after': {
      background: `linear-gradient(top, ${fade(t.palette.background.paper, 0)}, ${t.palette.background.paper} 100%)`,
      content: '""',
      position: 'absolute',
      height: '90%',
      bottom: 0,
      right: 0,
      left: 0,
    }
  },
});


interface IProps extends WithStyles<typeof styles> {
  className?: any;
  height?: number;
}

class FadeP extends React.Component<IProps, any> {

  render() {
    const {classes, children, className, height} = this.props;
    return (
      <div className={classNames(className, classes.root)} style={{height: height || 90}}>{children}</div>
    );
  }
}

export default withStyles(styles)(FadeP);
