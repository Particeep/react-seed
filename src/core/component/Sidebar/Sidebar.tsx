import * as React from 'react'
import {ReactChild} from 'react'
import {createStyles, Icon, Paper, Slide, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../i18n/I18n'
import {sidebarWith} from './SidebarLayout'
import SidebarHr from './SidebarHr'
import SidebarItem from './SidebarItem'
import {Avatar} from '../../../shared/Avatar'
import {connect} from 'react-redux'
import {RootState} from '../../redux/reducer/index'
import {PaletteColor} from '@material-ui/core/styles/createPalette'
import {NavLink} from 'react-router-dom'
import {IconBtn} from 'react-components'
import Link from '../../../shared/Link/Link'
import {fade} from '@material-ui/core/styles/colorManipulator'

export const sidebarPalette = (t: Theme): PaletteColor => t.palette.primary

const styles = (t: Theme) => createStyles({
  root: {
    top: 0,
    left: 0,
    width: sidebarWith,
    paddingTop: t.spacing.unit,
    paddingBottom: t.spacing.unit,
    position: 'fixed',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // borderRight: `1px solid ${t.palette.divider}`,
    borderRadius: 0,
  },
  head: {
    paddingTop: t.spacing.unit * 2,
    paddingBottom: t.spacing.unit,
  },
  name: {
    marginRight: t.spacing.unit,
    // color: t.palette.primary.main,
    // color: t.palette.text.primary,
    fontSize: t.typography.subheading.fontSize,
  },
  email: {
    color: t.palette.text.secondary,
    // color: fade(t.palette.primary.main, .6),
    fontSize: t.typography.caption.fontSize,
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    transition: t.transitions.create('color'),

    '&:hover': {
      color: t.palette.primary.main,
    }
  },
  main: {
    paddingTop: t.spacing.unit,
    paddingBottom: t.spacing.unit,
    flex: 1,
    overflowY: 'auto',
  },
  foot: {
    paddingTop: t.spacing.unit,
    paddingBottom: t.spacing.unit,
  },
  avatar: {
    background: fade(t.palette.primary.main, .3),
    color: t.palette.primary.main,
    marginLeft: t.spacing.unit,
    marginRight: t.spacing.unit,
  },
})

interface IProps extends ReturnType<typeof state2props>,
  WithI18n,
  WithStyles<typeof styles> {
  basePath?: string;
}

class Sidebar extends React.Component<IProps, {}> {

  static defaultProps = {
    basePath: '',
  }

  render() {
    const {t, connectedUser, classes} = this.props
    return (
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
          <header className={classes.head}>
            <Link to={this.route('profile')}>
              <div className={classes.profile}>
                <Avatar size={50} className={classes.avatar}/>
                <div>
                  <div className={classes.name}>
                    {connectedUser!.first_name}&nbsp;
                    {connectedUser!.last_name}
                  </div>
                  <div className={classes.email}>{connectedUser!.email}</div>
                </div>
              </div>
            </Link>
          </header>
          <SidebarHr/>
          {this.renderHome()}
          <SidebarHr/>
          <main className={classes.main}>
            <SidebarItem to={this.route('users')} icon="people">
              {t.users}
            </SidebarItem>
            <SidebarItem to={this.route('fundraises')} icon="business">
              {t.fundraises}
            </SidebarItem>
            <SidebarItem to={this.route('settings')} icon="settings">
              {t.settings}
            </SidebarItem>
          </main>
          <SidebarHr/>
          <footer className={classes.foot}>
            <SidebarItem href="/logout" icon="power_settings_new">
              {t.logout}
            </SidebarItem>
          </footer>
        </Paper>
      </Slide>
    )
  }

  private renderHome(): ReactChild {
    const {t, classes} = this.props
    return (
      <div style={{display: 'flex', alignItems: 'stretch'}}>
        <SidebarItem to={this.route('dashboard')} icon="home" style={{flex: 1}}>
          {t.dashboard}
        </SidebarItem>
        <Link to="/consumers">
          <IconBtn>
            <Icon>exit_to_app</Icon>
          </IconBtn>
        </Link>
      </div>
    )
  }

  private route(path: string): string {
    const {basePath} = this.props
    return basePath + '/' + path
  }
}

const state2props = (state: RootState) => ({
  connectedUser: state.connectedUser.entity,
})

export default withI18n(withStyles(styles)(connect(state2props, undefined, undefined, {pure: false})(Sidebar)))
