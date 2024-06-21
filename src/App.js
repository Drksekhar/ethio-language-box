import React, { createContext, useState } from "react";
import { Button, Icon, Menu, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  HashRouter,
  Link,
  Outlet,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./comp/Home";
import Languages from "./comp/Languages";
import Culture from "./comp/Culture";

import Topics from "./comp/Topics";
import Topics3 from "./comp/Topics3";
import Topics4 from "./comp/Topics4";
import Topics5 from "./comp/Topics5";
import Topics6 from "./comp/Topics6";

import Languages7 from "./comp/Languages7";
import Languages8 from "./comp/Languages8";
import Languages9 from "./comp/Languages9";
import Statements from "./comp/Statements";
export const MyContext = createContext(null);

export default function App() {
  let oldTheme = false;
  if (localStorage.getItem("theme")) {
    oldTheme = JSON.parse(localStorage.getItem("theme"));
  }
  const [theme, setTheme] = useState(oldTheme);
  function Mainmenu() {
    const location = useLocation();
    const path = location.pathname;
    return (
      <>
        <Menu icon="labeled" compact widths={6} size="mini" inverted={theme}>
          <Menu.Item as={Link} to="" active={path === "/"}>
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="languages" active={path === "/languages"}>
            <Icon name="translate" />
            Language
          </Menu.Item>
          {/* <Menu.Item as={Link} to="languages7" active={path === "languages7"}>
            <Icon name="translate" /> Languages7
          </Menu.Item>
          <Menu.Item as={Link} to={"Languages8"} active={path === "Languages8"}>
            <Icon name="language" />
            Languages8
          </Menu.Item>

          <Menu.Item as={Link} to={"Languages9"} active={path === "Languages9"}>
            <Icon name="list" /> Languages9
          </Menu.Item> */}
          <Menu.Item as={Link} to="Topics" active={path === "Topics"}>
            <Icon name="list" /> Topics
          </Menu.Item>
          <Menu.Item as={Link} to="Statements" active={path === "Statements"}>
            <Icon name="list" /> Statements
          </Menu.Item>

          {/* 
            <Menu.Item as={Link} to="Topics3" active={path === "Topics3"}>
            <Icon name="list" />
            Topics3
          </Menu.Item><Menu.Item as={Link} to="Topics4" active={path === "Topics4"}>
            <Icon name="mail" /> Topics4
          </Menu.Item> 
          <Menu.Item as={Link} to="Topics5" active={path === "Topics5"}>
            <Icon name="list" />
            Topics5
          </Menu.Item>
          <Menu.Item as={Link} to="Topics6" active={path === "Topics6"}>
            <Icon name="list" /> Topics6
          </Menu.Item>
          */}
          <Menu.Item onClick={() => setTheme(!theme)}>
            <Icon name={!theme ? "moon" : "sun outline"} />
            {theme ? "dark" : "light"}
          </Menu.Item>
        </Menu>
        <Segment inverted={theme}>
          <Outlet />
        </Segment>
      </>
    );
  }
  return (
    <div>
      <MyContext.Provider value={{ theme }}>
        <HashRouter>
          <Routes>
            <Route path="" element={<Mainmenu />}>
              <Route path="" element={<Home />} />
              <Route path="languages" element={<Languages />} />
              {/* <Route path="languages7" element={<Languages7 />} />
              <Route path="Languages8" element={<Languages8 />} />
              <Route path="Languages9" element={<Languages9 />} /> */}
              <Route path="Topics" element={<Topics />} />
              <Route path="Statements" element={<Statements />} />
              {/*  <Route path="Topics3" element={<Topics3 />} />
              <Route path="culture" element={<Culture />} />
              <Route path="Topics5" element={<Topics5 />} />
              <Route path="Topics6" element={<Topics6 />} />*/}
            </Route>
          </Routes>
        </HashRouter>
      </MyContext.Provider>
    </div>
  );
}
