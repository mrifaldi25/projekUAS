import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Kritik from "../pages/Kritik";
import Notifikasi from "../pages/Notifikasi";

import * as Config from "../constants/Config";

// Komponen pembungkus untuk proteksi login
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <Switch>
      {/* Halaman login tetap bebas akses dan harus di paling atas */}
      <Route path="/login" component={Login} />

      {/* Rute yang paling spesifik harus di atas */}
      <PrivateRoute
        path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
        component={Catalog}
      />
      <PrivateRoute path={`/${Config.HOME_PAGE}/:category/:id`} component={Detail} />
      
      {/* Rute spesifik lainnya */}
      <PrivateRoute path={`/${Config.HOME_PAGE}/notifikasi`} component={Notifikasi} />
      <PrivateRoute path={`/${Config.HOME_PAGE}/kritik`} component={Kritik} />

      {/* Rute yang kurang spesifik */}
      <PrivateRoute path={`/${Config.HOME_PAGE}/:category`} component={Catalog} />
      
      {/* Rute dasar dengan exact, harus di bawah rute spesifik lainnya */}
      <PrivateRoute path={`/${Config.HOME_PAGE}`} exact component={Home} />

      {/* Redirect semua route tak dikenal ke halaman utama (harus paling akhir) */}
      <Redirect to={`/${Config.HOME_PAGE}`} />
    </Switch>
  );
};

export default Routes;
