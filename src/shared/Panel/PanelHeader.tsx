import * as React from 'react'
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core'
import classNames from 'classnames'

const styles = (t: Theme) => createStyles({
  root: {
    borderRadius: 2,
    background: t.palette.background.default,
    borderBottom: `1px solid ${t.palette.divider}`,
    minHeight: 48,
    paddingRight: t.spacing.unit * 2,
    paddingLeft: t.spacing.unit * 2,
  }
})

interface IProps extends WithStyles<typeof styles> {
  className?: any;
}

class PanelHeader extends React.Component<IProps, {}> {
  render() {
    const {className, classes, children, ...other} = this.props
    return (
      <div {...other} className={classNames(classes.root, className)}>
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(PanelHeader)
