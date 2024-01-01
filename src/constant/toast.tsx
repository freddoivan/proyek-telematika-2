export const DEFAULT_TOAST_MESSAGE = {
    loading: 'Loading...',
    success: 'Success',
    error: (err: any) =>
      err?.response?.data?.message ?? 'Something is wrong, please try again',
  };
  