import React from 'react';
import { NavLink, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Billing from './Billing';
import Orders from './Orders';
import Statistics from './Statistics';
import Delivery from './Delivery';
import Inventory from './Inventory';
import PublicWebsite from './PublicWebsite';
import Discounts from './Discounts';
import Settings from './Settings';

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
          <NavItem><NavLink exact to="/" activeClassName="active">Dashboard</NavLink></NavItem>
          <NavItem><NavLink to="/billing" activeClassName="active">Billing</NavLink></NavItem>
          <NavItem><NavLink to="/orders" activeClassName="active">Orders</NavLink></NavItem>
          <NavItem><NavLink to="/statistics" activeClassName="active">Statistics</NavLink></NavItem>
          <NavItem><NavLink to="/delivery" activeClassName="active">Delivery</NavLink></NavItem>
          <NavItem><NavLink to="/inventory" activeClassName="active">Inventory</NavLink></NavItem>
          <NavItem><NavLink to="/public-website" activeClassName="active">Public Website</NavLink></NavItem>
          <NavItem><NavLink to="/discounts" activeClassName="active">Discounts</NavLink></NavItem>
          <NavItem><NavLink to="/settings" activeClassName="active">Settings</NavLink></NavItem>
          <NavItem><NavLink to="/logout" activeClassName="active">Logout</NavLink></NavItem>
        </NavList>
      </NavWrapper>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/billing" component={Billing} />
        <Route path="/orders" component={Orders} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/public-website" component={PublicWebsite} />
        <Route path="/discounts" component={Discounts} />
        <Route path="/settings" component={Settings} />
        {/* add any additional routes you need here */}
      </Switch>
    </Router>
  );
}

export default SideNav;
