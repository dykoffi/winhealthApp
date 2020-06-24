import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Cookies } from "react-cookie";

//les themes
import ThemeContext, { Info } from "./global/context";

//importation des differentes applications
const Connexion = React.lazy(() => import("./connexion"));
const Admin = React.lazy(() => import("./admin"));
const Gap = React.lazy(() => import("./gap"));
const Dpi = React.lazy(() => import("./dpi"));
const Qr = React.lazy(() => import("./qr"));

const App = () => {
  return (
    <div id="App" className="row">
      <ThemeContext.Provider value={Info}>
        <Route
          render={(match) => {
            const cookies = new Cookies();
            return (match.location.pathname === "/qr") ? (<Redirect to="/qr" />) : cookies.get("user", { path: "/" }) ?
              (<Redirect to={`/${cookies.get("currentPage", { path: "/" })}/`} />) :
              (<Redirect to="/connexion" />);
          }}
        />
        {/* ces routes representent les differentes application */}
        <Route path="/connexion" component={Connexion} />
        <Route path="/admin" component={Admin} />
        <Route path="/gap" component={Gap} />
        <Route path="/dpi" component={Dpi} />
        <Route path="/qr" component={Qr} />
      </ThemeContext.Provider>
    </div>
  );
};
export default App;
