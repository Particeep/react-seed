import * as React from 'react'
import {ReactElement} from 'react'
import {OrderByType} from '../../type/criteria/criteria'
import {withGlobalProgress, withToast, TableSort, TableSortCell} from 'react-components'
import {Checkbox, createStyles, Theme, withStyles, WithStyles} from '@material-ui/core'
import autobind from 'autobind-decorator'
import {datatableConsumer, IDatatableContext} from './Datatable'
import {RootState} from '../../core/redux/reducer/index'
import {connect} from 'react-redux'
import {ITableSortCellProps} from '../../type/lib/tableCellProps'

const styles = (t: Theme) => createStyles({
  root: {
    background: t.palette.background.default,
  }
})

interface IProps extends IDatatableContext, WithStyles<typeof styles> {
  dispatch: any
  children: ReactElement<any>
}

class DatatableHead extends React.Component<IProps & ReturnType<typeof state2props>> {

  render() {
    const {children, criteria, classes, selected, onSelect, isColumnVisible} = this.props
    return (
      <TableSort
        className={classes.root}
        sortBy={criteria.sort_by!}
        orderBy={criteria.order_by!}
        onSort={this.handleSortChange!}>
        {onSelect &&
        <TableSortCell>
          <Checkbox checked={selected.length === criteria.limit}
                    indeterminate={selected.length > 0 && selected.length < criteria.limit}
                    onChange={this.handleSelect}
                    style={{paddingTop: 0, paddingBottom: 0}}/>
        </TableSortCell>
        }
        {React.Children.map(children, (c, i) => isColumnVisible(i) && c)}
      </TableSort>
    )
  }

  componentDidMount() {
    this.publishColumns()
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.children !== this.props.children) {
      this.publishColumns()
    }
  }

  @autobind
  private handleSelect() {
    const {selected, onSelect, criteria} = this.props
    const newSelected: number[] = []
    if (selected.length === 0) for (let i = 0; i < criteria.limit; i++) newSelected.push(i)
    onSelect(newSelected)
  }

  @autobind
  private handleSortChange(sortBy: string, orderBy: OrderByType) {
    const {dispatch, actions} = this.props
    dispatch(actions.sort(sortBy, orderBy))
  }

  private publishColumns() {
    const {children, publishColumns} = this.props
    publishColumns(React.Children.map(children, (c: ReactElement<ITableSortCellProps>) => ({label: c.props.children})))
  }
}

const state2props = (state: RootState, ownProps: IProps) => {
  const paginateState = state.paginate[ownProps.name]
  return {
    criteria: paginateState.criteria,
    data: paginateState.entities,
  }
}

export default datatableConsumer(connect(state2props)(
  withStyles(styles)(DatatableHead)
))
