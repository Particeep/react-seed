import * as React from 'react'
import {
  createStyles,
  Icon, ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Theme,
  Tooltip,
  WithStyles,
  withStyles
} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../../core/i18n/I18n'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'
import {IContextLoanequity} from '../../../../type/context-loanequity'
import {updateContextLoanequity} from '../../../../core/redux/action/contextLoanequityAction'
import {RootState} from '../../../../core/redux/reducer/index'
import {WithGlobalProgress} from '../../../../type/lib/withGlobalProgress'
import {WithToast} from '../../../../type/lib/withToast'
import {css} from '../../../../conf/style'
import {compose} from 'redux'

const styles = (t: Theme) => createStyles({
  icon: {
    color: t.palette.text.secondary
  },
  iconWarning: {
    color: css.colorWarning,
  },
  hr: {
    borderBottom: `1px solid ${t.palette.divider}`,
  }
})

interface IProps extends WithI18n,
  WithGlobalProgress,
  WithToast,
  WithStyles<typeof styles> {
  name: keyof IContextLoanequity;
  icon?: string
  title: string
  desc?: string
  disabled?: boolean
  warning?: string
}

class SettingsConfigItem extends React.Component<IProps & ReturnType<typeof state2props> & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {classes, warning, name, context, title, desc, disabled, icon} = this.props
    return (
      <ListItem>
        {warning
          ? (
            <Tooltip title={warning}>
              <Icon className={classes.iconWarning}>warning</Icon>
            </Tooltip>
          )
          :
          <Icon className={classes.icon}>{icon || ''}</Icon>
        }
        <ListItemText primary={title} secondary={desc} className={classes.hr}/>
        <ListItemSecondaryAction>
          <Switch
            disabled={disabled}
            checked={context![name]}
            onChange={this.handleToggle(name)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }


  @autobind
  private handleToggle(name: keyof IContextLoanequity) {
    const {update, context, t, toastSuccess, toastError} = this.props
    return async (event) => {
      if (!context) return
      try {
        // TODO Prevent has_loan and has_equity to be both disabled (when disable one, force enable the 2nd)
        await update({id: context.id, [name]: event.target.checked})
        toastSuccess(t.saved)
      } catch (error) {
        toastError(error.msg)
      }
    }
  }
}

const state2props = (state: RootState, ownProps: IProps) => ({
  isUpdating: state.contextLoanEquity.isUpdating,
  context: state.contextLoanEquity.entity,
})

const dispatch2props = (dispatch: any, ownProps: any) => ({
  update: (c: IContextLoanequity) => dispatch(updateContextLoanequity(c)),
})

export default withStyles(styles)(
  connect(state2props, dispatch2props)(
    withGlobalProgress(
      withToast(
        withI18n(
          SettingsConfigItem)
      )
    )
  )
)
