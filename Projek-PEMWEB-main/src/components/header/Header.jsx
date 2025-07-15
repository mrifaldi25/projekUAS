import React, { useEffect, useRef, useState } from "react"; // Tambahkan 'useState'
import { Link, useLocation, useHistory } from "react-router-dom";

import "./header.scss";
import logo from "./../../assets/Logo_1.png";
import * as Config from "./../../constants/Config";

const headerNav = [
  {
    display: "Home",
    path: `/${Config.HOME_PAGE}`,
  },
  {
    display: "Movies",
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    display: "Channel",
    path: `/${Config.HOME_PAGE}/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const history = useHistory();

  // PERBAIKAN PENTING DI SINI: Gunakan state untuk user
  const [user, setUser] = useState(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Perbarui state user setelah logout
    history.push("/login");
  };

  useEffect(() => {
    // Pindahkan logika pengambilan user ke dalam useEffect
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Pengecekan krusial: pastikan ada data
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user"); // Bersihkan data yang rusak
      }
    }

    // Logika untuk shrink header
    const shrinkHeader = () => {
      if (!headerRef.current) return;
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);
    return () => window.removeEventListener("scroll", shrinkHeader);
  }, []); // [] agar useEffect hanya berjalan saat mount

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`/${Config.HOME_PAGE}`}>MovieVerse</Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}

          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registrasi">Register</Link>
              </li>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin/dashboard">Admin</Link>
                </li>
              )}
              <li className="user-name">Hi, {user.name}</li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
