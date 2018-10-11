import {Id, Url} from './basics'

export enum SignatureStatus {
  READY = 'READY',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
}

export interface ISignature {
  id: Id;
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
