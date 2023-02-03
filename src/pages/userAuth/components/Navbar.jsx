import whLogo from "../../../images/white-Mealtime.svg";
import AuthUtils from "../utils/authenticate";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Popover, OverlayTrigger } from 'react-bootstrap';

const Navbar = (props) => {
	const { image } = props;
	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();
	const logout = () => {
		AuthUtils.logOut();
		navigate("/");
	};

	const goToProfile = () => {
		navigate("/profile")
	}

	const user = JSON.parse(localStorage.getItem("user"));
	const storeName = user.data.storeName;

	const popover = (e) => (
    <Popover id="popover-basic">
      <Popover.Body>
				<button id="profile-button" className="button profile-button" onClick={goToProfile}>Profile</button>
				<button id="logout-button" className="button logout-button" onClick={logout}>Log Out</button>
      </Popover.Body>
    </Popover>
  );

	return (
		<nav
			className="navbar is-fixed-top pl-6 pr-6 pt-3 pb-3"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<a className="navbar-item" href="/home">
					<img src={whLogo}></img>
				</a>

				<a
					onClick={() => setIsActive(!isActive)}
					role="button"
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navMenu"
				>
					<span style={{ color: "white" }} aria-hidden="true"></span>
					<span style={{ color: "white" }} aria-hidden="true"></span>
					<span style={{ color: "white" }} aria-hidden="true"></span>
				</a>
			</div>

			<div
				id="navMenu"
				className={`navbar-menu ${isActive ? "is-active" : ""}`}
			>
				<div id="navbar-start" className="navbar-start">
					<a href="/home" className={`navbar-item ${isActive ? "dark" : ""}`}>
						Home
					</a>
					<a
						href="/favorite-mealpacks"
						className={`navbar-item ${isActive ? "dark" : ""}`}
					>
						Favorites
					</a>
					<a
						href="/all-mealpacks"
						className={`navbar-item ${isActive ? "dark" : ""}`}
					>
						Meal Packs
					</a>
					<a
						href="/profile"
						className={`navbar-item ${isActive ? "dark" : ""}`}
					>
						Profile
					</a>
				</div>
				<div className="navbar-end" style={{display: "flex", alignItems: "center"}}>
					<h5
						className="is-family-primary has-text-weight-normal"
						style={{ color: "white" }}
					>
						User: {storeName}
					</h5>

					<OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover()}>
						<img id="navbar-picture" className="navbar-picture" src={image}></img>
					</OverlayTrigger>

					{/* <div className="navbar-item">
						<div className="buttons">
							<a className="button logout-button" onClick={logout}>
								Log Out
							</a>
						</div>
					</div> */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
