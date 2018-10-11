interface IParams {
  csrfToken: string;
}

export const getAppParams = (): IParams => ({
  // csrfToken: 'fc809ce5a8d3b9dd954ee3eb31cf9999163269da-1530174519223-6ca66c70304f0e5b46d34a38',
  csrfToken: (window as any).pc && (window as any).pc.csrfToken,
});
