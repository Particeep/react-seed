import * as React from 'react'
import {
  createStyles,
  LinearProgress,
  TableCell,
  TableRow,
  Theme,
  Tooltip,
  WithStyles,
  withStyles
} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {TableSortCell, AnimateList, withGlobalProgress, withToast} from 'react-components'
import {Datatable, DatatableBody, DatatableHead, DatatableToolbar} from '../../../shared/Datatable'
import autobind from 'autobind-decorator'
import Page from '../../../shared/Page/Page'
import {IFundraise} from '../../../type/enterprise/fundraise'
import PageHead from '../../../shared/PageHead/PageHead'
import Panel from '../../../shared/Panel/Panel'
import {css} from '../../../conf/style'
import {fetchFundraises} from '../../../core/redux/action/fundraiseAction'
import DatatableRow from '../../../shared/Datatable/DatatableRow'

const styles = (t: Theme) => createStyles({
  statusINIT: {
    color: t.palette.text.secondary,
  },
  statusUNDER_REVIEW: {
    color: css.colorInfo,
  },
  statusRUNNING: {
    color: css.colorWarning,
  },
  statusSUCCEEDED: {
    color: css.colorSuccess,
  },
  statusREFUNDED: {
    color: css.colorSuccess,
  },
  statusDELETED: {
    color: t.palette.error.main,
  },
})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class Fundraises extends React.Component<IProps, {}> {

  render() {
    const {t} = this.props
    return (
      <>
        <PageHead title={t.Fundraises_title}/>
        <Page>
          <Panel>
            <Datatable
              name="fundraises"
              action={fetchFundraises}
              toolbar={<DatatableToolbar search="global_search"/>}>
              <DatatableHead>
                <TableSortCell name="created_at">{t.created_at}</TableSortCell>
                <TableSortCell name="name">{t.name}</TableSortCell>
                <TableSortCell name="amount_engaged">{t.amount_engaged}</TableSortCell>
                <TableSortCell name="amount_target">{t.amount_target}</TableSortCell>
                <TableSortCell name="amount_percent">{t.Fundraises_amount_percent}</TableSortCell>
                <TableSortCell name="status">{t.status}</TableSortCell>
                <TableSortCell>{t.Fundraises_fundraise_type}</TableSortCell>
              </DatatableHead>
              <DatatableBody renderRow={this.renderRow}/>
            </Datatable>
          </Panel>
        </Page>
      </>
    )
  }

  @autobind
  private renderRow(f: IFundraise) {
    const {formatAmount, formatDateTime, t, classes} = this.props
    return (
      <DatatableRow>
        <TableCell>{formatDateTime(f.created_at)}</TableCell>
        <TableCell>{f.name}</TableCell>
        <TableCell>{formatAmount(f.amount_engaged)}</TableCell>
        <TableCell>{formatAmount(f.amount_target)}</TableCell>
        <TableCell>
          <Tooltip title={f.amount_percent + '%'}>
            <LinearProgress value={f.amount_percent} variant="determinate"/>
          </Tooltip>
        </TableCell>
        <TableCell>
          <span className={classes['status' + f.status]}>{t['fundraiseStatus_' + f.status]}</span>
        </TableCell>
        <TableCell>
          {t['fundraiseType_' + f.fundraise_type]}
        </TableCell>
      </DatatableRow>
    )
  }
}

export default compose(
  withI18n,
  withStyles(styles),
)(Fundraises)
