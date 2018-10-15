import * as React from 'react'
import {createStyles, Grid, Theme, Typography, WithStyles, withStyles} from '@material-ui/core'
import {WithI18n, withI18n} from '../../core/i18n/withI18n'
import {connect} from 'react-redux'
import {RootState} from '../../core/redux/reducer/index'
import {compose} from 'redux'
import {loadConsumers} from '../../core/redux/action/consumerAction'
import ConsumerCard from './ConsumerCard'
import {AnimateList, Btn, withGlobalProgress, withToast} from 'react-components'
import Page from '../../shared/Page/Page'
import {WithGlobalProgress} from '../../type/lib/withGlobalProgress'
import {WithToast} from '../../type/lib/withToast'
import ConsumerCardAdd from './ConsumerCardAdd'

const styles = (t: Theme) => createStyles({
  head: {
    marginTop: t.spacing.unit * 4,
  },
  body: {
    marginTop: t.spacing.unit * 6,
    marginBottom: t.spacing.unit,
  }
})

interface IProps extends WithI18n,
  WithGlobalProgress,
  WithToast,
  WithStyles<typeof styles>,
  ReturnType<typeof state2props>,
  ReturnType<typeof dispatch2props> {
}

class Consumers extends React.Component<IProps, any> {

  render() {
    const {consumers, t, classes} = this.props
    return (
      <Page>
        <div className={classes.head}>
          <Typography variant="h5" gutterBottom>{t.Consumers_title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>{t.Consumers_content}</Typography>
          <Btn href="https://api.particeep.com/swagger" target="_blank" color="primary" icon="help" variant="outlined">
            {t.Consumers_doc}
          </Btn>
        </div>
        <div className={classes.body}>
          <Typography variant="caption" gutterBottom>{t.Consumers_list_title}</Typography>
        </div>
        <Grid container>
          {consumers &&
          <AnimateList>
            <Grid item md={4} sm={6}>
              <ConsumerCardAdd/>
            </Grid>
            {consumers.map(c =>
              <Grid item md={4} sm={6} key={c.id}>
                <ConsumerCard consumer={c}/>
              </Grid>
            )}
          </AnimateList>
          }
        </Grid>
      </Page>
    )
  }

  async componentDidMount() {
    const {getConsumers, toastError, promisesWithProgress} = this.props
    promisesWithProgress(
      getConsumers().catch(err => toastError(err.msg))
    )
  }
}

const state2props = (state: RootState) => ({
  isFetching: state.consumers.isFetching,
  consumers: state.consumers.entities,
  error: state.consumers.error,
})

const dispatch2props = (dispatch) => ({
  getConsumers: () => dispatch(loadConsumers()),
})

export default compose(
  withI18n,
  withStyles(styles),
  withGlobalProgress,
  withToast,
  connect(state2props, dispatch2props),
)(Consumers)
