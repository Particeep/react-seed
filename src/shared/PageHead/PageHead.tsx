import * as React from 'react'
import {ReactElement} from 'react'
import {createStyles, Slide, Tabs, Theme, Typography, WithStyles, withStyles} from '@material-ui/core'
import {css} from '../../conf/style'
import {RouteComponentProps, withRouter} from 'react-router'
import {IPageHeadLinkProps} from './PageHeadLink'

const styles = (t: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${t.palette.divider}`,
  },
  body: {
    width: css.pageWidth,
    margin: 'auto',
    display: 'flex',
    minHeight: 72,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  tabs: {
    width: css.pageWidth,
    margin: 'auto',
  }
})

interface IProps extends WithStyles<typeof styles>,
  RouteComponentProps<any> {
  title: string;
  actions?: any;
}

class PageHead extends React.Component<IProps, any> {

  render() {
    const {classes, title, actions, children} = this.props
    return (
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <div className={classes.root}>
          <div className={classes.body}>
            <div className={classes.title}>
              <Typography noWrap variant="h5">{title}</Typography>
            </div>
            {actions && <div className={classes.actions}>{actions}</div>}
          </div>
          {children &&
          <Tabs
            value={this.getTabIndex()}
            className={classes.tabs}
            indicatorColor="primary"
            textColor="primary">
            {children}
          </Tabs>
          }
        </div>
      </Slide>
    )
  }

  private getChildrenRoutes(): string[] {
    const {children} = this.props
    return React.Children.map(children, (c: ReactElement<IPageHeadLinkProps>) => c.props.to)
  }

  private getTabIndex(): number {
    const {location} = this.props
    const index = this.getChildrenRoutes().indexOf(location.pathname)
    return Math.max(0, index)
  }
}

export default withRouter(withStyles(styles)(PageHead))
