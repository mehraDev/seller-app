import React from 'react';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
// import Dashboard from './Dashboard';
import Billing from 'components/Billing/Billing';
// import Orders from './Orders';
// import Statistics from './Statistics';
// import Delivery from './Delivery';
// import Inventory from './Inventory';
// import PublicWebsite from './PublicWebsite';
// import Discounts from './Discounts';
// import Settings from './Settings';

const NavWrapper = styled.nav`
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  color: #fff;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #666;

  &:last-child {
    border-bottom: none;
  }

  a {
    color: #fff;
    text-decoration: none;

    &.active {
      font-weight: bold;
    }

    &:hover {
      color: #aaa;
    }
  }
`;

function SideNav() {
  return (
    <Router>
      <NavWrapper>
        <NavList>
          <NavItem><NavLink  to="/" >Dashboard</NavLink></NavItem>
          <NavItem><NavLink to="/billing" >Billing</NavLink></NavItem>
          <NavItem><NavLink to="/orders" >Orders</NavLink></NavItem>
          <NavItem><NavLink to="/statistics" >Statistics</NavLink></NavItem>
          <NavItem><NavLink to="/delivery" >Delivery</NavLink></NavItem>
          <NavItem><NavLink to="/inventory" >Inventory</NavLink></NavItem>
          <NavItem><NavLink to="/public-website" >Public Website</NavLink></NavItem>
          <NavItem><NavLink to="/discounts" >Discounts</NavLink></NavItem>
          <NavItem><NavLink to="/settings" >Settings</NavLink></NavItem>
          <NavItem><NavLink to="/logout" >Logout</NavLink></NavItem>
        </NavList>
      </NavWrapper>
      <Routes>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route path="/billing" Component={Billing} />
        {/* <Route path="/orders" component={Orders} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/public-website" component={PublicWebsite} />
        <Route path="/discounts" component={Discounts} />
        <Route path="/settings" component={Settings} /> */}
        {/* add any additional routes you need here */}
      </Routes>
    </Router>
  );
}

export default SideNav;
