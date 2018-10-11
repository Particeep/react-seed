import * as React from 'react'
import {createStyles, Icon, Paper, Slide, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../i18n/withI18n'
import {sidebarWith} from './SidebarLayout'
import SidebarHr from './SidebarHr'
import SidebarItem from './SidebarItem'
import {Avatar} from '../../../shared/Avatar'
import {connect} from 'react-redux'
import {RootState} from '../../redux'
import {PaletteColor} from '@material-ui/core/styles/createPalette'
import {NavLink} from 'react-router-dom'
import {IconBtn} from 'react-components'
import Link from '../../../shared/Link/Link'
import {ReactChild} from 'react'

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
    textAlign: 'center',
    paddingTop: t.spacing.unit * 2,
    paddingBottom: t.spacing.unit,
    display: 'block',
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
    background: t.palette.divider,
    margin: 'auto',
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
    const {t, classes, basePath} = this.props
    return (
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
          <header className={classes.head}>
            <Avatar size={100} className={classes.avatar}/>
          </header>
          <SidebarHr/>
          {this.renderHome()}
          <SidebarHr/>
          <main className={classes.main}>
            <SidebarItem to={basePath + '/users'} icon="people">
              {t.users}
            </SidebarItem>
            <SidebarItem to={basePath + '/fundraises'} icon="business">
              {t.fundraises}
            </SidebarItem>
            <SidebarItem to={basePath + '/settings'} icon="settings">
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
    const {t, classes, basePath} = this.props
    return (
      <div style={{display: 'flex', alignItems: 'stretch'}}>
        <SidebarItem to={basePath + '/dashboard'} icon="home" style={{flex: 1}}>
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
}

const state2props = (state: RootState) => ({})

export default withI18n(withStyles(styles)(connect(state2props, undefined, undefined, {pure: false})(Sidebar)))
