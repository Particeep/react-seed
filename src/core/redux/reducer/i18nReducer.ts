import {IEntity} from '../../../type/entity'
import {createReducer} from './utils/createReducer'
import {_CHANGE_CURRENT_LANG} from '../action/i18nAction'
import {AppLang} from '../../i18n/I18n'
import {getAppParams} from '../../../conf/params'

interface IThemeState {
  lang: AppLang;
}

export type IThemeReducer = (s: IThemeState, action: any) => IThemeState

const defaultState: IThemeState = {
  lang: getAppParams().currentLang,
}

const toggleDarkTheme: IThemeReducer = <T extends IEntity>(state: IThemeState, action) => ({
  ...state,
  lang: action.lang,
})

export const i18nReducer = createReducer<IThemeState>(defaultState, {
  [_CHANGE_CURRENT_LANG]: toggleDarkTheme,
})


