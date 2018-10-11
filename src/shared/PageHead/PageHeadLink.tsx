import * as React from 'react'
import {Tab} from '@material-ui/core'
import Link from '../Link/Link'
import {TabProps} from '@material-ui/core/Tab'

export interface IPageHeadLinkProps extends TabProps {
  to: string;
  className?: string;
}

class PageHeadLink extends React.Component<IPageHeadLinkProps, any> {

  render() {
    const {to, ...other} = this.props
    return (
      <Link to={to}>
        <Tab label="config" {...other}/>
      </Link>
    )
  }
}

export default PageHeadLink
