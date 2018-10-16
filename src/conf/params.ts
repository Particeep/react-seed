import {AppLang} from '../core/i18n/I18n'
import {IUser} from '../type/user'

interface IParams {
  csrfToken: string;
  currentLang: AppLang;
  connectedUser: IUser;
}

const defaultParams = {
  currentLang: 'fr',
  connectedUser: {},
}

const pc: any = (window as any).pc || defaultParams

export const getAppParams = (): IParams => ({
  csrfToken: pc.csrfToken,
  currentLang: pc.currentLang,
  connectedUser: pc.connectedUser,
})
