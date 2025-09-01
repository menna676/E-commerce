import "../../styles/PlaceholderProfileAvatar.css";
export default function PlaceholderProfileAvatar({ name }) {
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div
      className="default-profile-pic"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
      }}
    >
      {initial}
    </div>
  );
}
