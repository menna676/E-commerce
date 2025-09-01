import { useState } from "react";
import MainNavigationBar from "../layout/MainNavigationBar";
import SiteFooter from "../layout/SiteFooter";
import PlaceholderProfileAvatar from "../layout/PlaceholderProfileAvatar";
import "../../styles/UserProfilePage.css";

export default function UserProfilePage({
  currentUser,
  getTotalItems,
  handleProfilePictureChange,
  removeProfilePicture,
  handleLogout,
  setCurrentUser,
  users,
  setUsers,
  setSelectedCategory,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentUser?.name || "");
  const [editedEmail, setEditedEmail] = useState(currentUser?.email || "");

  const handleSaveProfile = () => {
    const updatedUser = {
      ...currentUser,
      name: editedName,
      email: editedEmail,
    };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setIsEditing(false);
  };

  return (
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      <div className="profile-content">
        <h1>Profile Settings</h1>
        <div className="profile-card">
          <div className="profile-avatar-section">
            {currentUser?.profilePicture ? (
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="profile-avatar"
              />
            ) : (
              <PlaceholderProfileAvatar name={currentUser?.name} size="100" />
            )}
            <div className="profile-picture-controls">
              <input
                type="file"
                id="profile-picture-input"
                accept="image/*"
                onChange={(e) =>
                  handleProfilePictureChange(e, setCurrentUser, setUsers)
                }
                style={{ display: "none" }}
              />
              <button
                className="change-photo-btn"
                onClick={() =>
                  document.getElementById("profile-picture-input").click()
                }
              >
                Change Photo
              </button>
              {currentUser?.profilePicture && (
                <button
                  className="remove-photo-btn"
                  onClick={() => removeProfilePicture(setCurrentUser, setUsers)}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="profile-edit-form">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Email"
                />
                <div className="profile-buttons">
                  <button onClick={handleSaveProfile} className="save-btn">
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-display">
                <h2>{currentUser?.name}</h2>
                <p>{currentUser?.email}</p>
                <div className="profile-buttons">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-btn"
                  >
                    Edit Profile
                  </button>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
