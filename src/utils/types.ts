export type RegisterFormData = {
  displayName: string;
  email: string;
  password: string;
  file: Blob | Uint8Array | ArrayBuffer | string;
}

export type LoginFormData = {
  email: string;
  password: string;
}

export enum ImageSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
  BIG = 'BIG',
}

export type AppError = {
  code: number;
  message: string;
} | null;

export type LoadingState = {
  message: string;
  visible: boolean;
}
