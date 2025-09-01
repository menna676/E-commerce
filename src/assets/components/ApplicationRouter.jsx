import { Routes, Route, Link, Navigate } from "react-router-dom";
import ProtectedRoute from "./ui/AuthenticatedRouteGuard";
import AuthRoute from "./utils/UnauthenticatedRouteGuard";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import SpecialOffersPage from "./pages/SpecialOffersPage";
import TeamMembersPage from "./pages/TeamMembersPage";
import ContactUsPage from "./pages/ContactUsPage";
import UserProfilePage from "./pages/UserProfilePage";
import PrivacyPolicyDocumentPage from "./pages/PrivacyPolicyDocumentPage";
import TermsOfServiceDocumentPage from "./pages/TermsOfServiceDocumentPage";
import AuthenticationLoginPage from "./pages/AuthenticationLoginPage";
import AccountCreationPage from "./pages/AccountCreationPage";
import mockUsers from "../data/mockUserData";
import { useState, useEffect } from "react";

export default function ApplicationRouter() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const response1 = await fetch("https://dummyjson.com/products?limit=50");
    const data1 = await response1.json();
    const response2 = await fetch(
      "  https://dummyjson.com/products/category/smartphones  "
    );
    const data2 = await response2.json();
    const response3 = await fetch(
      "https://dummyjson.com/products/category/mobile-accessories  "
    );
    const data3 = await response3.json();
    const response4 = await fetch(
      "https://dummyjson.com/products/category/laptops  "
    );
    const data4 = await response4.json();
    const response5 = await fetch(
      "https://dummyjson.com/products/category/sports-accessories  "
    );
    const data5 = await response5.json();
    const allProducts = [
      ...(data1.products || []),
      ...(data2.products || []),
      ...(data3.products || []),
      ...(data4.products || []),
      ...(data5.products || []),
    ];
    setProducts(allProducts);
    setLoading(false);
  };

  const getAvailableCategories = () => {
    const categoryCounts = {};
    products.forEach((product) => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });
    return Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => a.category.localeCompare(b.category));
  };

  const availableCategories = getAvailableCategories();

  const handleLogin = (email, password) => {
    if (email.trim()) {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setCurrentUser(existingUser);
      } else {
        const newUser = {
          id: users.length + 1,
          name: email.split("@")[0],
          email,
          password: password || "default",
          profilePicture: null,
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);
      }
      return true;
    }
    return false;
  };

  const handleSignup = (name, email, password) => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      profilePicture: null,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setAddedItems([]);
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, cartId: Date.now(), quantity: 1 }]);
    }
    if (!addedItems.includes(product.id)) {
      setAddedItems([...addedItems, product.id]);
    }
  };

  const removeFromCart = (cartId) => {
    const itemToRemove = cart.find((item) => item.cartId === cartId);
    setCart(cart.filter((item) => item.cartId !== cartId));
    if (
      itemToRemove &&
      !cart.some(
        (item) => item.id === itemToRemove.id && item.cartId !== cartId
      )
    ) {
      setAddedItems(addedItems.filter((id) => id !== itemToRemove.id));
    }
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
    } else {
      setCart(
        cart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProfilePictureChange = (event, setCurrentUser, setUsers) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedUser = {
          ...currentUser,
          profilePicture: e.target.result,
        };
        setCurrentUser(updatedUser);
        setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = (setCurrentUser, setUsers) => {
    const updatedUser = {
      ...currentUser,
      profilePicture: null,
    };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const getOfferedProducts = () => {
    return products.filter((product) => product.discountPercentage > 10);
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute currentUser={currentUser}>
            <AuthenticationLoginPage handleLogin={handleLogin} />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute currentUser={currentUser}>
            <AccountCreationPage handleSignup={handleSignup} users={users} />
          </AuthRoute>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <PrivacyPolicyDocumentPage
            currentUser={currentUser}
            getTotalItems={getTotalItems}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <TermsOfServiceDocumentPage
            currentUser={currentUser}
            getTotalItems={getTotalItems}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <ProductCatalogPage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              products={products}
              availableCategories={availableCategories}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
              addedItems={addedItems}
              loading={loading}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <ShoppingCartPage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              setSelectedCategory={setSelectedCategory}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/offers"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <SpecialOffersPage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              getOfferedProducts={getOfferedProducts}
              addToCart={addToCart}
              addedItems={addedItems}
              loading={loading}
              setSelectedCategory={setSelectedCategory}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/members"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <TeamMembersPage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              setSelectedCategory={setSelectedCategory}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <ContactUsPage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              setSelectedCategory={setSelectedCategory}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <UserProfilePage
              currentUser={currentUser}
              getTotalItems={getTotalItems}
              handleProfilePictureChange={handleProfilePictureChange}
              removeProfilePicture={removeProfilePicture}
              handleLogout={handleLogout}
              setCurrentUser={setCurrentUser}
              users={users}
              setUsers={setUsers}
              setSelectedCategory={setSelectedCategory}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
