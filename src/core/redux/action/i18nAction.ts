import {AppLangs} from '../../i18n/I18n'

export const _CHANGE_CURRENT_LANG = '_CHANGE_CURRENT_LANG'

export const changeCurrentLang = (lang: keyof typeof AppLangs) => dispatch => dispatch({type: _CHANGE_CURRENT_LANG, lang})
