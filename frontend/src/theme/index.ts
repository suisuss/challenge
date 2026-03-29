import { createTheme } from '@mui/material';
import { components } from './components';

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  components: components
});
