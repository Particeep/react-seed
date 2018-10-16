import * as React from 'react'
import {
  createStyles,
  Icon,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Switch,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../../core/i18n/I18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../../shared/Page/Page'
import {connect} from 'react-redux'
import {RootState} from '../../../../core/redux/reducer'
import {toggleDarkTheme} from '../../../../core/redux/action/themeAction'
import Select from 'src/shared/input/Select/Select'
import {changeCurrentLang} from '../../../../core/redux/action/i18nAction'
import autobind from 'autobind-decorator'

const styles = (t: Theme) => createStyles({
  icon: {
    color: t.palette.text.secondary
  },
})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class SettingsGeneral extends React.Component<IProps & ReturnType<typeof state2props> & typeof dispatch2props, {}> {

  render() {
    const {t, classes, isDarkTheme, toggleDarkTheme, lang, availableLangs} = this.props
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
          <ListItem>
            <Icon className={classes.icon}>translate</Icon>
            <ListItemText primary={t.chooseLanguage}/>
            <ListItemSecondaryAction>
              <Select value={lang} onChange={this.handleLangChange}>
                {availableLangs.map(l =>
                  <MenuItem value={l} key={l}>{t['lang_' + l]}</MenuItem>
                )}
              </Select>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Page>
    )
  }

  @autobind
  private handleLangChange(event: any) {
    const {changeCurrentLang} = this.props
    // TODO Send a request to backend in the same time
    changeCurrentLang(event.target.value)
  }
}

const state2props = (state: RootState) => ({
  isDarkTheme: state.ui.theme.isDark,
  lang: state.ui.i18n.lang,
})

const dispatch2props = {
  toggleDarkTheme,
  changeCurrentLang
}

export default compose(
  withI18n,
  withStyles(styles),
  connect(state2props, dispatch2props),
)(SettingsGeneral)
