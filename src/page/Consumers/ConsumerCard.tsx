import * as React from 'react'
import {ReactChild} from 'react'
import {createStyles, Icon, Theme, Typography, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../core/i18n/withI18n'
import {compose} from 'redux'
import {IConsumer} from '../../type/consumer'
import {Em, H1} from '../../shared/tag/tag'
import Link from '../../shared/Link/Link'
import {Panel, PanelContent} from '../../shared/Panel'

const styles = (t: Theme) => createStyles({
  tag: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-of-type)': {
      marginBottom: t.spacing.unit,
    }
  },
  tag_i: {
    color: t.palette.text.secondary,
    marginRight: t.spacing.unit,
  }
})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
  consumer: IConsumer;
}

class ConsumerCard extends React.Component<IProps, any> {

  render() {
    const {formatDate, consumer, t} = this.props
    return (
      <Link to={`/consumer/${consumer.key}`}>
        <Panel hoverable>
          <PanelContent>
            <Em>{formatDate(consumer.created_at)}</Em>
            <H1 paragraph noWrap gutterBottom>{consumer.name}</H1>
            {this.renderTag('style', t['Template_' + consumer.template])}
            {this.renderTag('payment', consumer.wallet_service)}
            {this.renderTag('gesture', consumer.signature_service)}
          </PanelContent>
        </Panel>
      </Link>
    )
  }

  private renderTag(icon: string, label?: string): ReactChild {
    const {classes} = this.props
    return (
      <div className={classes.tag}>
        <Icon className={classes.tag_i}>{icon}</Icon>
        <Typography noWrap>{label}</Typography>
      </div>
    )
  }
}

export default compose(
  withI18n,
  withStyles(styles),
)(ConsumerCard)

