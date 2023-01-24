import whLogo from "./white-Mealtime.svg";
import AuthUtils from "../utils/authenticate";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
	const logout = () => {
		AuthUtils.logOut();
		navigate("/");
	};

  return (
    <nav className="navbar is-fixed-top pl-6 pr-6 pt-3 pb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/home">
          <img src={whLogo}></img>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/home" className="navbar-item">
            Home
          </a>

          <a href="/past-mealpacks" className="navbar-item">
            Past Meal Packs
          </a>

          <a href="/profile" className="navbar-item">
            Profile
          </a>
        </div>


        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button logout-button" onClick={logout}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;