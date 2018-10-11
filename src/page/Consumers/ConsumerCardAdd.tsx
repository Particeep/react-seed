import * as React from 'react'
import {createStyles, Icon, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../core/i18n/withI18n'
import {compose} from 'redux'
import Card from '../../shared/Panel/Panel'

const styles = (t: Theme) => createStyles({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  icon: {
    fontSize: 64,
    color: t.palette.primary.main,
  }
})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class ConsumerCardAdd extends React.Component<IProps, any> {

  state = {
    showForm: false
  }

  render() {
    const {classes} = this.props
    return (
      <Card hoverable className={classes.root}>
        <Icon className={classes.icon}>add</Icon>
      </Card>
    )
  }
}

export default compose(
  withI18n,
  withStyles(styles),
)(ConsumerCardAdd)

