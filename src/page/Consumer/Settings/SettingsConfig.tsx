import * as React from 'react'
import {createStyles, Theme, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../../core/i18n/withI18n'
import {compose} from 'redux'
import {AnimateList, IconBtn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../../shared/Page/Page'
import {connect} from 'react-redux'
import {Panel, PanelContent} from '../../../shared/Panel'

const styles = (t: Theme) => createStyles({})

interface IProps extends WithI18n,
  WithStyles<typeof styles> {
}

class SettingsConfig extends React.Component<IProps, {}> {

  render() {
    const {t} = this.props
    return (
      <Page>
        <Panel>
          <PanelContent>
            TAB2
          </PanelContent>
        </Panel>
      </Page>
    )
  }
}

export default compose(
  withI18n,
  withStyles(styles),
  connect(null),
)(SettingsConfig)
