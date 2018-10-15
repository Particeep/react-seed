import {IEntity} from '../../../type/entity'
import {createReducer} from './utils/createReducer'
import {_TOGGLE_DARK_THEME} from '../action/themeAction'

interface IThemeState {
  isDark: boolean;
}

export type IThemeReducer = (s: IThemeState, action: any) => IThemeState

const defaultState: IThemeState = {
  isDark: false,
}

const toggleDarkTheme: IThemeReducer = <T extends IEntity>(state: IThemeState, action) => ({
  ...state,
  isDark: !state.isDark,
})

export const themeReducer = createReducer<IThemeState>(defaultState, {
  [_TOGGLE_DARK_THEME]: toggleDarkTheme,
})


