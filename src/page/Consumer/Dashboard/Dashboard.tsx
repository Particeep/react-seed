import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/I18n'
import {compose} from 'redux'
import {AnimateList, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../shared/Page/Page'
import PageHead from '../../../shared/PageHead/PageHead'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class Dashboard extends React.Component<IProps, {}> {

  render() {
    const {t} = this.props
    return (
      <>
        <PageHead title={t.dashboard}/>
        <Page>
        </Page>
      </>
    )
  }
}

export default compose(
  withI18n,
  withStyles(styles),
)(Dashboard)
