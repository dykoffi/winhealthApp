import React, { useState } from "react";
import { Provider } from "react-redux";
import { Cookies } from "react-cookie";
import { Route } from "react-router-dom";

import { navMenu } from "./constants/liens";
import { Pages } from "./constants/pages";
import Navbar from "../../containers/Sidebar/";

import Topbar from "../../components/Topbar";

const Gap = () => {
  const cookies = new Cookies();
  const [title, setTitle] = useState("Accueil");
  const [fullscreen, setfullscreen] = useState(false);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setfullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setfullscreen(false);
      }
    }
  }
  return (
    <div className="col-12 page" id="gap">
      <div className="row">
        <section
          id="navbar"
          style={{
            flex: "none",
          }}
        >
          <Navbar
            user={cookies.get("user", { path: "/" })}
            fonctions={navMenu}
          />
        </section>
        <section
          className="white"
          id="principal"
          style={{
            flex: 1,
            height: "100vh",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
          <section className="col-12 grey lighten-4" id="Topbar">
            <Topbar
            title={title}
              user={`${cookies.get("user", { path: "/" }).nomuser} ${
                cookies.get("user", { path: "/" }).prenomsuser
              } - ${
                cookies.get("user", { path: "/" }).labelprofil
              }`}
              toggleFullscreen={toggleFullscreen}
              fullscreen={fullscreen}
            />
          </section>
          <section className="col-12">
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
        </section>
      </div>
    </div>
  );
};

export default Gap;
