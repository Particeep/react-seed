import {AppLang} from '../core/i18n/I18n'

interface IParams {
  csrfToken: string;
  currentLang: AppLang;
}

const defaultParams = {
  currentLang: 'fr',
}

const pc: any = (window as any).pc || defaultParams

export const getAppParams = (): IParams => ({
  csrfToken: pc.csrfToken,
  currentLang: pc.currentLang,
})
