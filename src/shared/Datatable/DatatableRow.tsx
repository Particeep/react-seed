import * as React from 'react'
import {ReactChild, ReactElement} from 'react'
import {Animate, TableSort, TableSortCell, withGlobalProgress, withToast, Btn} from 'react-components'
import {CardActions, createStyles, TableCell, TableRow, Theme, WithStyles, withStyles} from '@material-ui/core'
import {datatableConsumer, IDatatableContext} from './Datatable'
import {RootState} from '../../core/redux/reducer/index'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {withI18n} from '../../core/i18n'
import {compose} from 'redux'
import {WithI18n} from '../../core/i18n/withI18n'
import PanelContent from '../Panel/PanelContent'
import classNames from 'classnames'

const styles = (t: Theme) => createStyles({
  root: {
    transition: t.transitions.create('all'),
    opacity: 0,
    transform: 'translate(60px, 60px)',
  },
  root_appeared: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  expend: {
    // margin: `-1px -${t.spacing.unit}px`,
    background: t.palette.background.paper,
    // minHeight: 50,
    // boxShadow: t.shadows[2],
    // position: 'relative',
    // top: 48
    // padding: t.spacing.unit,
  },
  row: {
    '& > td:first-child': {
      borderLeft: `2px solid ${t.palette.primary.main}`
    }
  },
  cell: {
    borderLeft: `2px solid ${t.palette.primary.main}`
  }
})

interface IProps extends IDatatableContext,
  WithI18n,
  WithStyles<typeof styles> {
  children: ReactElement<any>
  expend?: boolean
  index: number
  expendedChild?: ReactChild
}

class DatatableRow extends React.Component<IProps & ReturnType<typeof state2props>> {

  state = {
    appeared: false,
  }
  private timeout: any

  render() {
    const {t, children, expendedChild, classes} = this.props
    const onClick = expendedChild ? {onClick: this.toggle} : {}
    return (
      <>
        <TableRow hover {...onClick}
                  className={classNames(classes.root, this.state.appeared && classes.root_appeared, this.isExpended() ? classes.row : '')}>
          {children}
        </TableRow>
        {this.isExpended() &&
        <TableRow>
          <TableCell colSpan={100} className={classes.cell}>
            <PanelContent>
              {expendedChild}
            </PanelContent>
            <CardActions>
              <Btn color="primary" variant="outlined" onClick={this.toggle}>{t.close}</Btn>
            </CardActions>
          </TableCell>
        </TableRow>
        }
      </>
    )
  }

  componentDidMount() {
    const {index} = this.props
    this.timeout = setTimeout(() => this.setState({appeared: true}), index * 30)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  isExpended(): boolean {
    const {index, expendedRow} = this.props
    return index === expendedRow
  }

  @autobind
  private toggle() {
    const {index, expendRow} = this.props
    expendRow(index)
  }
}

const state2props = (state: RootState, ownProps: IProps) => {
  const paginateState = state.paginate[ownProps.name]
  return {
    criteria: paginateState.criteria,
    data: paginateState.entities,
  }
}

export default compose(
  withI18n,
  datatableConsumer,
  connect(state2props),
  withStyles(styles),
)(DatatableRow)
