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
import Languages2 from "./comp/Languages2";
import Lang3 from "./comp/Lang3";
import LangP4 from "./comp/LangP4";
import Lp4 from "./comp/Lp4";
import Lp5 from "./comp/Lp5";
import Topics from "./comp/Topics";
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
          {/* <Menu.Item as={Link} to="culture" active={path === "/culture"}>
            <Icon name="person" /> Culture
          </Menu.Item>
          <Menu.Item as={Link} to="languages2" active={path === "/languags2"}>
            <Icon name="list" /> Languages2
          </Menu.Item>
          <Menu.Item as={Link} to="lang3" active={path === "lang3"}>
            <Icon name="phone" /> Lang3
          </Menu.Item>

          <Menu.Item as={Link} to="langp4" active={path === "langP4"}>
            <Icon name="language" /> LangP4
          </Menu.Item>
          <Menu.Item as={Link} to="lP4" active={path === "lP4"}>
            <Icon name="list" /> LP4
          </Menu.Item>
          <Menu.Item as={Link} to="Lp5" active={path === "Lp5"}>
            <Icon name="mail" /> Lp5
          </Menu.Item>*/}
          <Menu.Item as={Link} to="Topics" active={path === "Topics"}>
            <Icon name="list" /> Topics
          </Menu.Item>

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

              <Route path="Topics" element={<Topics />} />
              {/*} <Route path="culture" element={<Culture />} />
              <Route path="languages2" element={<Languages2 />} />
              <Route path="lang3" element={<Lang3 />} />
              <Route path="langP4" element={<LangP4 />} />
                            <Route path="lP4" element={<Lp4 />} />
              <Route path="Lp5" element={<Lp5 />} />*/}
            </Route>
          </Routes>
        </HashRouter>
      </MyContext.Provider>
    </div>
  );
}
