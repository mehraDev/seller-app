import styled from "styled-components";
import media from "ui/Utils/Media/media";

const MobileHeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100vw;
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: center;
    border-bottom: 1px solid #c9c9c980;
    height: 3.5rem;
    & > svg {
        left: 0;
        margin-left: 1rem;
        position: absolute;
    border-bottom: 1px solid #c9c9c980;
    ${media.desktop}{
        display: none;
    }
  }
  ${media.desktop}{
        display: none;
    }

`
interface IconEmptyWrapperProps {
    width?: number;
    height?: number;
    color?: string;
  }
  
export  const IconEmptyWrapper = styled.span<IconEmptyWrapperProps>`
    display: inline-block;
    width: ${props => `${props.width ?? 1}rem`};
    height: ${props => `${props.height ?? 1}rem`};
    background-color: ${props => props.color ?? 'white'};
  `;
export default MobileHeaderWrapper;