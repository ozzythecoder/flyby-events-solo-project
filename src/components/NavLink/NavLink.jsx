import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function NavLink({ path, openDrawer, linkTitle, callback }) {

  const handleClick = () => {
    openDrawer(false);
    if (callback) callback();
  }

  return (
    <Link
      className="navLink"
      to={path}
      onClick={handleClick}
    >
      <Typography variant="navLink">
        {linkTitle}
      </Typography>
    </Link>
  )
}