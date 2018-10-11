import * as React from 'react'
import {ReactChild, ReactElement} from 'react'
import {Table, TableFooter, TablePagination, TableRow} from '@material-ui/core'
import {Criteria, OrderByType} from '../../type/criteria/criteria'
import autobind from 'autobind-decorator'
import {RootState} from '../../core/redux'
import {PaginateAction} from '../../core/action/paginateAction'
import {connect} from 'react-redux'
import {WithGlobalProgress} from '../../type/lib/withGlobalProgress'
import {WithToast} from '../../type/lib/withToast'
import {withGlobalProgress, withToast} from 'react-components'

const DatatableContext = React.createContext({})

export const datatableConsumer = <P extends object>(
  Component: React.ComponentType<P & IDatatableContext>
): React.SFC<any> => (props: Pick<P, Exclude<keyof P, keyof IDatatableContext>>) => (
  <DatatableContext.Consumer>
    {(ctx: any) => <Component {...props} {...ctx}/>}
  </DatatableContext.Consumer>
)

interface IProps extends WithGlobalProgress,
  WithToast {
  name: string
  action: (c?: Criteria) => (dispatch, getState: () => RootState) => Promise<any>
  dispatch: any
  children: Array<ReactElement<any>>
  onSelect?: (indexes: number[]) => void
}

export interface IDatatableColumn {
  label: ReactChild;
}

export interface IDatatableContext {
  name: string
  actions: PaginateAction<any>
  selected: number[]
  onSelect: (indexes: number[]) => void
  columns: IDatatableColumn[]
  publishColumns: (columns: IDatatableColumn[]) => void
  hiddenColumnsIndexes: boolean[]
  onToggleColumnVisibility: (index: number) => void
  isColumnVisible: (index: number) => boolean
}

class Datatable extends React.Component<IProps & ReturnType<typeof state2props>, IDatatableContext> {

  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      actions: new PaginateAction<any>(props.name, props.action),
      selected: [],
      onSelect: props.onSelect && this.handleSelect,
      columns: [],
      publishColumns: this.handlePublishColumns,
      hiddenColumnsIndexes: [],
      onToggleColumnVisibility: this.ToggleColumnVisibility,
      isColumnVisible: this.isColumnVisible,
    }
  }

  render() {
    const {children, criteria, size, page} = this.props
    return (
      <DatatableContext.Provider value={this.state}>
        <Table>
          {children}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={size || 0}
                rowsPerPage={criteria.limit}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </DatatableContext.Provider>
    )
  }

  componentDidMount() {
    const {data} = this.props
    if (!data) this.search()
  }

  private async search() {
    const {dispatch, criteria, action, progressEnd, progressStop, toastError, progressStart} = this.props
    progressStart()
    try {
      await dispatch(action(criteria))
      progressEnd()
    } catch (error) {
      console.error(error)
      toastError(error.msg)
      progressStop()
    }
  }

  @autobind
  private handleChangeRowsPerPage(event) {
    const {dispatch} = this.props
    if (this.state.actions)
      dispatch(this.state.actions.updateCriteria('limit', event.target.value))
  }

  @autobind
  private handleSortChange(sortBy: string, orderBy: OrderByType) {
    const {dispatch} = this.props
    dispatch(this.state.actions.sort(sortBy, orderBy))
  }

  @autobind
  private handleChangePage(e, newPage: number) {
    const {dispatch} = this.props
    if (this.state.actions)
      dispatch(this.state.actions.goToPage(newPage))
  }

  @autobind
  private handleSelect(selected: number[]) {
    const {onSelect} = this.props
    this.setState({selected})
    onSelect && onSelect(selected)
  }

  @autobind
  private handlePublishColumns(columns: IDatatableColumn[]) {
    this.setState({columns})
  }

  @autobind
  private isColumnVisible(i: number): boolean {
    const {hiddenColumnsIndexes} = this.state
    return !hiddenColumnsIndexes[i]
  }

  @autobind
  private ToggleColumnVisibility(i: number) {
    const {hiddenColumnsIndexes} = this.state
    hiddenColumnsIndexes[i] = !hiddenColumnsIndexes[i]
    this.setState({hiddenColumnsIndexes: [...hiddenColumnsIndexes]})
  }
}

const state2props = (state: RootState, ownProps: IProps) => {
  const paginateState = state.paginate[ownProps.name]
  return {
    isFetching: paginateState.isFetching,
    page: paginateState.criteria.offset / paginateState.criteria.limit,
    criteria: paginateState.criteria,
    size: paginateState.total_size,
    data: paginateState.entities,
  }
}

export default withGlobalProgress(withToast(connect(state2props)(Datatable)))
