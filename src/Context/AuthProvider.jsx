import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- FIXED: Added async/await and manual state update ---
  const updateUserProfile = async (name, photo) => {
    // 1. Update the data on Firebase servers
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });

    // 2. IMPORTANT: Manually update the local 'user' state.
    // We spread the currentUser into a new object to force React to re-render components.
    setUser({
      ...auth.currentUser,
      displayName: name,
      photoURL: photo
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = { 
    user, 
    loading, 
    theme, 
    toggleTheme, 
    handleLogout,
    updateUserProfile 
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;