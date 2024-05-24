import React, { createContext, useState } from 'react'
import { Button, Icon, Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import { HashRouter, Link, Outlet, Route, Router, Routes, useLocation } from 'react-router-dom'
import Home from './comp/Home';
import Languages from './comp/Languages';
import Culture from './comp/Culture';
export const MyContext = createContext(null)

export default function App() {
    let oldTheme = false
  if (localStorage.getItem('theme')) {
    oldTheme = JSON.parse(localStorage.getItem('theme'))
  }
  const [theme, setTheme] = useState(oldTheme)
  function Mainmenu(){
        const location = useLocation();
    const path = location.pathname;
    return(
    <>
      <Menu icon='labeled' compact widths={6} size='mini' inverted={theme}>

        <Menu.Item as={Link} to='' active={path === '/'}>
          <Icon name='home' />Home
        </Menu.Item>

        <Menu.Item as={Link} to='languages' active={path === '/languages'}>
          <Icon name='translate' />Language
        </Menu.Item>
        <Menu.Item as={Link} to='culture' active={path === '/culture'}>
        <Icon name='culture'/> Culture
        </Menu.Item>
      </Menu>
      <Segment inverted={theme}>
        <Outlet />
      </Segment>
    </>
    )
  }
  return (
    <div>
      <MyContext.Provider value={{ theme }}>
        <HashRouter>
          <Routes>
            <Route path='' element={<Mainmenu />}>
              <Route path='' element={<Home />} />
              <Route path='languages' element={<Languages />} />
              <Route path='culture' element={<Culture />} />
            </Route>
          </Routes>
        </HashRouter>
      </MyContext.Provider>
    </div>
  )
}
