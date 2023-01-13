import "./Footer.css";

import { Box } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', p: 2, backgroundColor: 'white' }}>
      <center>&copy; August McAllister</center>
    </Box>
  );
}

export default Footer;
