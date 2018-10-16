import * as React from 'react'
import {ReactChild} from 'react'
import {Chip, createStyles, Icon, TableCell, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/I18n'
import {compose} from 'redux'
import {Animate, AnimateList, IconBtn, TableSortCell, withGlobalProgress, withToast} from 'react-components'
import autobind from 'autobind-decorator'
import {connect} from 'react-redux'
import PageHead from '../../../shared/PageHead/PageHead'
import {RouteComponentProps, withRouter} from 'react-router'
import {Datatable, DatatableBody, DatatableHead, DatatableToolbar} from '../../../shared/Datatable'
import Page from '../../../shared/Page/Page'
import {Panel} from '../../../shared/Panel'
import {IUser} from '../../../type/user'
import {css} from '../../../conf/style'
import {PaginateAction} from '../../../core/redux/action/paginateAction'
import {fetchUsers} from '../../../core/redux/action/userAction'
import DatatableRow from '../../../shared/Datatable/DatatableRow'
import Link from '../../../shared/Link/Link'

const styles = (t: Theme) => createStyles({
  claimed: {
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
              toolbar={<DatatableToolbar search="global_search"/>}
              onSelect={console.log}>
              <DatatableHead>
                <TableSortCell name="created_at">{t.Users_created_at}</TableSortCell>
                <TableSortCell name="first_name">{t.firstName}</TableSortCell>
                <TableSortCell name="last_name">{t.lastName}</TableSortCell>
                <TableSortCell name="email">{t.email}</TableSortCell>
                <TableSortCell name="phone">{t.phone}</TableSortCell>
                <TableSortCell name="roles">{t.validated}</TableSortCell>
                <TableSortCell/>
              </DatatableHead>
              <DatatableBody renderRow={this.renderRow}/>
            </Datatable>
          </Panel>
        </Page>
      </>
    )
  }


  @autobind
  private renderRow(u: IUser) {
    const {formatDate, classes} = this.props
    return (
      <DatatableRow expendedChild={this.renderExpendedRow(u)}>
        <TableCell>{formatDate(u.created_at)}</TableCell>
        <TableCell>{u.first_name}</TableCell>
        <TableCell>{u.last_name}</TableCell>
        <TableCell>{u.email}</TableCell>
        <TableCell>{u.phone}</TableCell>
        <TableCell>
          {u.has_been_claimed ?
            <Icon className={classes.claimed}>check</Icon> :
            <Icon className={classes.notClaimed}>clear</Icon>
          }
        </TableCell>
        <TableCell numeric>
          <Link to={`user/${u.id}`}>
            <IconBtn>
              <Icon>keyboard_arrow_right</Icon>
            </IconBtn>
          </Link>
        </TableCell>
      </DatatableRow>
    )
  }

  private renderExpendedRow(u: IUser): ReactChild {
    return (
      <>
        <div>
          <Chip/>
        </div>
        {u.address &&
        <div>
          {u.address.number}
          {u.address.street}
          {u.address.city}
          {u.address.zip}
          {u.address.country}
        </div>
        }
        {u.bio}
      </>
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
