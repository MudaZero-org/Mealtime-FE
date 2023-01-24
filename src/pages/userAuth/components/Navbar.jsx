import whLogo from "./white-Mealtime.svg";

const Navbar = () => {
  return (
    <nav class="navbar is-fixed-top pl-6 pr-6 pt-3 pb-3" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/home">
          <img src={whLogo}></img>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a href="/home" class="navbar-item">
            Home
          </a>

          <a href="/past-mealpacks" class="navbar-item">
            Past Meal Packs
          </a>

          <a href="/profile" class="navbar-item">
            Profile
          </a>
        </div>


        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button logout-button">
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