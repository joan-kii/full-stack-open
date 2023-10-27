import { Platform } from 'react-native';

const theme = {
  colors: {
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    error: '#d73a4a'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18
  },
  fonts: {
    main: Platform.select({
      default: 'System',
      ios: 'Arial',
      android: 'Roboto'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
