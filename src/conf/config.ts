export const isDev: boolean = process.env.NODE_ENV === 'development';

export const config = {
  baseUrl: isDev ? 'http://local.particeep.com:9000' : '',
  basePath: '/app',
  dateFormat: 'dd/MM/yyyy',
  defaultCurrency: 'EUR',
};
