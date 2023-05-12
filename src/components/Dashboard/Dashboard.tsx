import {useSelector, useDispatch} from 'react-redux'
import {Route, Link, useLocation, Routes} from 'react-router-dom'
import Header from '../../app/components/Dashboard/Header/Header'
import SideNav from '../../app/components/Dashboard/SideNav/SideNav'
import styled from 'styled-components'
import {fetchMenu} from 'store/menu/menuSlice'
import {useState, useEffect} from 'react'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'sidenav header'
    'sidenav main';
  height: 100vh;
  width: 100vw;
  position: fixed;
  .header {
    grid-area: header;
  }

  .sidenav {
    grid-area: sidenav;
  }

  .main {
    grid-area: main;
  }
`

const Main = styled.div`
  background-color: white;
  overflow-y: auto; /* add this to enable vertical scrolling */
  height: calc(100vh - 64px); /* subtract the height of the header to avoid overlap */
`

const Card = styled.div`
  background-color: #fff;
`
interface DashboardProps {
  menuItems: any
}

function Dashboard({menuItems}: DashboardProps) {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(null)
  const dispatch = useDispatch()
  const items = useSelector((state) => state.menu.items)

  useEffect(() => {
    const inventoryItem = menuItems.find((item) => item.name === 'Inventory')

    if (inventoryItem) {
      dispatch(fetchMenu('sellerId'))
    }
  }, [dispatch, menuItems])
  // Find the menu item that matches the current URL path
  const activeMenuItem = menuItems.find((item) =>
    location.pathname.startsWith(`/${item.name.toLowerCase()}`),
  )
  if (activeMenuItem && activeItem !== activeMenuItem.name) {
    setActiveItem(activeMenuItem.name)
  }

  return (
    <Wrapper>
      <SideNav menuItems={menuItems} className="sidenav" />
      <Header className="header" />
      <Main className="main">
        <Card>
          <Routes>
            {menuItems.map((item) => (
              <Route key={item.name} path={`/${item.name.toLowerCase()}`}>
                {item.route}
              </Route>
            ))}
          </Routes>
        </Card>
      </Main>
    </Wrapper>
  )
}

export default Dashboard
