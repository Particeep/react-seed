import * as React from 'react'
import {createStyles, Icon, TableCell, TableRow, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import {TableSortCell} from '../../../shared/TableSort'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import {RouteComponentProps, withRouter} from 'react-router'
import {Datatable, DatatableBody, DatatableHead, DatatableToolbar} from '../../../shared/Datatable'
import Page from '../../../shared/Page/Page'
import {Panel} from '../../../shared/Panel'
import {IUser} from '../../../type/user'
import {css} from '../../../conf/style'
import {PaginateAction} from '../../../core/action/paginateAction'
import {fetchUsers} from '../../../core/action/userAction'

const styles = (t: Theme) => createStyles({
  claimed: {
    color: css.colorSuccess,
  },
  notClaimed: {
    color: t.palette.error.main,
  }
})

interface IProps extends WithI18n,
  RouteComponentProps<any>,
  WithStyles<typeof styles> {
  dispatch: any;
}

const paginateName = 'users'
const paginateAction = fetchUsers
const actions = new PaginateAction<any>(paginateName, paginateAction)

class Users extends React.Component<IProps & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t} = this.props
    return (
      <>
        <PageHead title={t.Users_title}/>
        <Page>
          <Panel>
            <Datatable
              name={paginateName}
              action={paginateAction}
              onSelect={console.log}>
              <DatatableToolbar search="global_search"/>
              <DatatableHead>
                <TableSortCell name="created_at">{t.Users_created_at}</TableSortCell>
                <TableSortCell name="first_name">{t.firstName}</TableSortCell>
                <TableSortCell name="last_name">{t.lastName}</TableSortCell>
                <TableSortCell name="email">{t.email}</TableSortCell>
                <TableSortCell name="phone">{t.phone}</TableSortCell>
                <TableSortCell name="roles">{t.validated}</TableSortCell>
              </DatatableHead>
              <DatatableBody renderRow={this.renderRow}/>
            </Datatable>
          </Panel>
        </Page>
      </>
    )
  }


  @autobind
  private renderRow(t: IUser) {
    const {formatDate, classes} = this.props
    return (
      <TableRow>
        <TableCell>{formatDate(t.created_at)}</TableCell>
        <TableCell>{t.first_name}</TableCell>
        <TableCell>{t.last_name}</TableCell>
        <TableCell>{t.email}</TableCell>
        <TableCell>{t.phone}</TableCell>
        <TableCell>{t.has_been_claimed ? <Icon className={classes.claimed}>check</Icon> : <Icon className={classes.notClaimed}>clear</Icon>}</TableCell>
      </TableRow>
    )
  }

  @autobind
  private updateCriteria(name: string) {
    return (event) => this.props.updateCriteria(name, event.target.value)
  }
}

const dispatch2props = (dispatch: any) => ({
  updateCriteria: (name: string, value: any) => dispatch(actions.updateCriteria(name, value)),
})

export default compose(
  withRouter,
  withI18n,
  withStyles(styles),
  connect(null, dispatch2props),
)(Users)
