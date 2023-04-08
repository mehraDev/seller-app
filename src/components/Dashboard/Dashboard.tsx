import SideNav from 'components/NavBar/Navbar';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #333;
  /* add any other styles you want to apply to the whole dashboard here */
`;

function Dashboard() {
  return (
    <Wrapper>
      Dashboard
      <SideNav/>
      {/* add any other components or content you want to include in the dashboard here */}
    </Wrapper>
  );
}

export default Dashboard;
