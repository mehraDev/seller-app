import styled from "styled-components";

export const DashboardWrapper = styled.div`
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
`;


const DashboardBodyWrapperStyle = styled.div`
  background-color: #f5f5f5;
  height: calc(100vh - 3rem);
`;




export default DashboardBodyWrapperStyle;