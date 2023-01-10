import { Link } from "react-router-dom";



export default function NavLink({ path, openDrawer, linkTitle }) {

  return (
    <Link
      className="navLink"
      to={path}
      onClick={() => { openDrawer(false) }}
    >
      {linkTitle}
    </Link>
  )
}