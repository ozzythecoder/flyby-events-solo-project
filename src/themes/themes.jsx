import { createTheme } from "@mui/material";

const mainFont = "'Cabin', sans-serif"
const titleFont = "'Rowdies', cursive"

const theme = createTheme({
  palette: {
    primary: {
      main: '#994741'
    }
  },
  typography: {
    fontFamily: mainFont,
    title: {
      fontFamily: titleFont,
      fontSize: '26px'
    },
    subheading: {
      fontSize: '16px',
      color: '#5A5A5A'
    },
    h2: {
      fontSize: '28px',
      fontWeight: 700
    },
    h3: {
      fontSize: '26px',
      fontWeight: 600
    },
    body1: {
      fontSize: '18px',
    },
    bodyLink: {
      color: '#994741',
      fontWeight: 500
    },
    bigDay: {
      fontSize: '40px'
    }
  }
})

export default theme;