import { Link } from "react-router-dom";
import PlaceholderProfileAvatar from "./PlaceholderProfileAvatar";
import "../../styles/MainNavigationBar.css";
//done

export default function MainNavigationBar({ currentUser, getTotalItems }) {//pro
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">ShopVibe</div>
        <div className="nav-links">
          <Link to="/home" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link">
            Cart ({getTotalItems()})
          </Link>
          <Link to="/offers" className="nav-link">
            Offers
          </Link>
          <Link to="/members" className="nav-link">
            Members
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
          <Link to="/profile" className="nav-link">
            {currentUser?.profilePicture ? (//if
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="profile-pic-nav"
              />
            ) : (
              <PlaceholderProfileAvatar name={currentUser?.name}  />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
