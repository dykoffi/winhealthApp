import React, { Suspense, useState } from "react";
// import store from "./api/Profils/store";
import { Provider } from "react-redux";
import { Cookies } from "react-cookie";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { navMenu } from "./constants/liens";
import { Pages } from "./constants/pages";
import Navbar from "../../containers/Navbar";

import Clock from "../../components/Clock";
import Topbar from "../../components/Topbar";
import Loading from "../../components/Loading";

const Admin = () => {
  const cookies = new Cookies();
  const [heure, showheure] = useState(true);
  const [title, setTitle] = useState("Accueil");

  function toggleheure() {
    return heure ? showheure(false) : showheure(true);
  }
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  return (
    <div className="col-12 page bg-light" id="admin">
      <div className="row">
        <section className="col-2" id="navbar">
          <Navbar
            user={cookies.get("user", { path: "/" })}
            fonctions={navMenu}
          />
        </section>
        <section
          className="col-10"
          id="principal"
          style={{
            height: "100vh",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <section className="row" id="Topbar">
            <Topbar
              title={title}
              toggleFullscreen={toggleFullscreen}
              toggleheure={toggleheure}
            />
          </section>
          <Suspense fallback={() => <Loading text="chargement en cours" />}>
            <section className="bg-light">
              {Pages.map(({ path, Component, store }, index) => (
                <Route exact key={index} path={path}>
                  {store ? (
                    <Provider store={store}>
                      <Component
                        sendTitle={(title) => {
                          setTitle(title);
                        }}
                      />
                    </Provider>
                  ) : (
                    <Component
                      sendTitle={(title) => {
                        setTitle(title);
                      }}
                    />
                  )}
                </Route>
              ))}
            </section>
          </Suspense>
          <CSSTransition
            in={heure}
            timeout={300}
            classNames="alert"
            unmountOnExit
          >
            <div
              style={{ position: "fixed", bottom: 0, right: 0, opacity: 0.9 }}
            >
              <Clock position="fixed" />
            </div>
          </CSSTransition>
        </section>
      </div>
    </div>
  );
};
export default Admin;
