import {Id, Url} from './basics'
import {IEntity} from './entity'

export enum SignatureStatus {
  READY = 'READY',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
}

export interface ISignature extends IEntity {
  language: string;
  fileUrl: Url;
  fileToSignUrl: Url;
  fileName: string;
  status: SignatureStatus;
  external_id: Id;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  signedFileUrl: Url;
}
