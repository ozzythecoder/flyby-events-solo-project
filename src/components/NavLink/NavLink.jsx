import { Link } from "react-router-dom";



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
      {linkTitle}
    </Link>
  )
}