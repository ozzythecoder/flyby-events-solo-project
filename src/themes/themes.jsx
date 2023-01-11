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
      fontSize: '28px'
    },
    body1: {
      fontSize: '18px'
    }
  }
})

export default theme;