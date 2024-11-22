import { primary } from './colors';

export const getPrimary = (preset: string): unknown => {
  switch (preset) {
    case 'primary':
      return primary;
    default:
      console.error(
        'Invalid color preset.'
      );
      return [primary];
  }
};
