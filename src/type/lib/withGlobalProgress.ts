export interface WithGlobalProgress {
  readonly progressStart: (steps?: number) => void;
  readonly progressStop: () => void;
  readonly progressEnd: () => void;
  readonly progressNext: () => void;
  readonly promisesWithProgress: (...p: Array<Promise<any>>) => void;
}
