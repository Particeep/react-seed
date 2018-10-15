import * as React from 'react'
import {
  createStyles,
  Icon, List,
  ListItem, ListItemSecondaryAction,
  ListItemText,
  Switch,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../../shared/Page/Page'
import {connect} from 'react-redux'
import {Panel, PanelContent} from '../../../../shared/Panel/index'
import {RootState} from '../../../../core/redux/reducer'
import {toggleDarkTheme} from '../../../../core/redux/action/themeAction'

const styles = (t: Theme) => createStyles({
  icon: {
    color: t.palette.text.secondary
  },
})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class SettingsGeneral extends React.Component<IProps & ReturnType<typeof state2props> & ReturnType<typeof dispatch2props>, {}> {

  render() {
    const {t, classes, isDarkTheme, toggleDarkTheme} = this.props
    return (
      <Page>
        <List>
          <ListItem>
            <Icon className={classes.icon}>brightness_4</Icon>
            <ListItemText primary={t.DarkTheme_title} secondary={t.DarkTheme_desc}/>
            <ListItemSecondaryAction>
              <Switch
                checked={isDarkTheme}
                onChange={toggleDarkTheme}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Page>
    )
  }
}

const state2props = (state: RootState) => ({
  isDarkTheme: state.ui.theme.isDark,
})

const dispatch2props = (dispatch: any, ownProps: any) => ({
  toggleDarkTheme: () => dispatch(toggleDarkTheme())
})

export default compose(
  withI18n,
  withStyles(styles),
  connect(state2props, dispatch2props),
)(SettingsGeneral)
