import { Box, Typography } from "@mui/material"

export default function PageTitle({ title, children, ...props }) {

  const titleText = title || (() => children)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ pt: 1.5 }}
    >
    <Typography variant="h2">
      {titleText}
    </Typography>
  </Box>
  )
}