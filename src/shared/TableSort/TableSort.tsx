import * as React from 'react'
import {ReactElement} from 'react'
import {TableHead, TableRow} from '@material-ui/core'
import {OrderByType} from '../../type/criteria/criteria'
import {ITableSortCellProps} from './TableSortCell'
import autobind from 'autobind-decorator'

interface IProps {
  sortBy: string;
  orderBy: OrderByType;
  onSort: (sortBy: string, orderBy: OrderByType) => void;
}

class TableSort extends React.Component<IProps, {}> {

  render() {
    const {orderBy, sortBy, children} = this.props
    return (
      <TableHead>
        <TableRow>
          {React.Children.toArray(children).map((step: ReactElement<ITableSortCellProps>) =>
            React.cloneElement(step, {
              active: step.props.name === sortBy,
              orderBy,
              ...(step.props.name && {onSort: this.sort(step.props.name)}),
            })
          )}
        </TableRow>
      </TableHead>
    )
  }

  @autobind
  private sort(name: string) {
    return () => {
      const {sortBy, orderBy} = this.props
      const newOrderBy = (name === sortBy && orderBy === 'asc')
        ? 'desc'
        : 'asc'
      this.props.onSort(name, newOrderBy)
    }
  }
}

export default TableSort
