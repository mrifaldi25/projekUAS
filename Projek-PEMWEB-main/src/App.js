import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Routes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <Route
        render={(props) => {
          const isLoginPage = props.location.pathname === "/login";
          return (
            <>
              {/* Header & Footer hanya ditampilkan jika bukan halaman login */}
              {!isLoginPage && <Header {...props} />}
              <Routes />
              {!isLoginPage && <Footer />}
            </>
          );
        }}
      />
    </BrowserRouter>
  );
}

export default App;
