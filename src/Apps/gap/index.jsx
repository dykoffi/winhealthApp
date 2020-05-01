import React, { useState } from "react";
import { Provider } from "react-redux";
import { Cookies } from "react-cookie";
import { Route } from "react-router-dom";

import { navMenu } from "./constants/liens";
import { Pages } from "./constants/pages";
import Navbar from "../../containers/Sidebar/";

import Topbar from "../../components/Topbar";

const Admin = () => {
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
    <div className="col-12 page grey lighten-5" id="gap">
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
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
           <section className="row grey lighten-4" id="Topbar">
            <Topbar
              title={title}
              toggleFullscreen={toggleFullscreen}
              fullscreen={fullscreen}
            />
          </section> 
          <section>
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

export default Admin;
