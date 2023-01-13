import { Box } from "@mui/material";

function Footer() {

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    p: 2,
    backgroundColor: "rgb(255, 255, 255, 0.85)",
  }

  return (
    <Box sx={footerStyle}>
      <center>&copy; August McAllister</center>
    </Box>
  );
}

export default Footer;
