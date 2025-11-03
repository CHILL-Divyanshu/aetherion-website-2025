import { NavLink, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function Navbar() {
  const getNavLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <nav className="navbar-glow fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-xl px-5 py-3 backdrop-blur-md bg-black/40 border border-white/10 shadow-lg">
      <div className="flex items-center justify-between w-full">
        {/* Logo / Brand */}
        <Link to="/" className="logo flex items-center gap-3">
          <span className="text-2xl font-extrabold gradient-text tracking-wider">
            AETHERION
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links hidden md:flex ml-auto w-1/2 justify-around items-center">
          <a href="/#intel" className="nav-link">
            News
          </a>
          <NavLink to="/world" className={getNavLinkClass}>
            World
          </NavLink>
          <NavLink to="/guardians" className={getNavLinkClass}>
            Guardians
          </NavLink>
          <NavLink to="/dev-hub" className={getNavLinkClass}>
            Dev Hub
          </NavLink>
          <NavLink to="/community" className={getNavLinkClass}>
            Community
          </NavLink>
        </div>

        {/* Spacer / Optional Buttons */}
        <div className="hidden md:flex items-center gap-3 ml-6">
          {/* Placeholder for join button or icons if needed */}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex md:hidden ml-auto">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;