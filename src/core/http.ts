import axios, {AxiosInstance} from 'axios'
import {config} from '../conf/config'
import {getAppParams} from '../conf/params'

export interface IPcHttpError {
  code?: number;
  msg: string;
}

class PcHttp {

  private http: AxiosInstance

  constructor(baseURL: string, timeout = 30000) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Csrf-Token': getAppParams().csrfToken,
        'X-Requested-With': 'particeep-product',
      },
      timeout
    })
  }

  get(url: string, data?: object): Promise<any> {
    const qs = data ? '?' + this.toQueryString(data) : ''
    return this.http.get(url + qs).then(this.mapData).catch(this.mapError)
  }

  post(url: string, data?: object): Promise<any> {
    return this.http.post(url, data).then(this.mapData).catch(this.mapError)
  }

  put(url: string, data?: object): Promise<any> {
    return this.http.put(url, data).then(this.mapData).catch(this.mapError)
  }

  delete(url: string): Promise<any> {
    return this.http.delete(url).then(this.mapData).catch(this.mapError)
  }

  /**
   * To upload file, we want to wrap them in a FormData.
   * Parse only 1 file ATM.
   */
  parseFile(file: File): FormData {
    const formData = new FormData()
    formData.append('file', file)
    return formData
  }

  private mapData(response: any): any {
    return response.data
  }

  private mapError(e: any): Promise<IPcHttpError> {
    console.info(e)
    if (e && e.response && e.response.data && e.response.data[0]) {
      const data = e.response.data[0]
      console.log(data.message || data.code ? `${data.message} (${data.code})` : 'Une erreur s\'est produite')
      return Promise.reject({
        code: data.technicalCode,
        msg: data.message || data.code ? `${data.message} (${data.code})` : 'Une erreur s\'est produite'
      })
    }
    return Promise.reject({
      msg: 'Action impossible',
    })
  }

  toQueryString(obj: object): string {
    const qs: string[] = []
    for (const p in obj) {
      if (obj[p]) {
        qs.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      }
    }
    return qs.join('&')
  }
}

const pcHttp = new PcHttp(config.baseUrl)
export default pcHttp
