import styled from "styled-components"

const SideNavWrapper = styled.div`
  position: relative;
  background-image: url('/assets/sidenavBg.png');
  overflow: hidden;
  transition: width 0.2s ease-in-out;
  background: linear-gradient(43deg, rgb(1, 29, 54) 39%, rgb(8, 35, 60) 39%, rgb(7, 31, 54) 100%);
  
  & > div:first-child {
    height: 3rem;
  }
`
export const SideNavListWrapper = styled.nav`
    margin-top: 2.5rem;
    padding: 0 1rem;
`

export const SideNavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none;
  cursor: pointer;
  color: #ffffffcc;
  border-radius: 4px;
  padding: 10px 20px; /* default padding */
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e6f7ff31;
  }

  &.active {
    background-color: #007aea;
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
  }
`
export default SideNavWrapper;