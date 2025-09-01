import {   Link } from "react-router-dom";

export default function UnauthenticatedRouteGuard({ children, currentUser }) {
  if (currentUser) {
    return <Link to="/home" replace />;
  }
  return children;
}