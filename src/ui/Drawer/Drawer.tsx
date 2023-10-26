// import { ReactNode, useEffect, useState } from "react";
// import styled, { useTheme } from "styled-components";
// import { Box, Col } from "ui/basic";

// interface IDrawer {
//   bg?: string;
//   isOpen: boolean;
//   onClose?: () => void;
//   children: ReactNode;
//   h? : string
//   j? : 'center'  | 'start' | 'end'
// }

// const Drawer: React.FC<IDrawer> = ({bg, onClose, children ,isOpen,h = '90%',j='center'}) => {
//   const theme = useTheme();
//   const [openDrawer,setOpenDrawer] = useState(false);
//   const [closeDrawer,setCloseDrawer] = useState(true);
//   const [wrapperHeight, setWrapperHeight] = useState<string>('100%'); // Initialize with 100% or some default value
  
//   useEffect(() => {
//     const updateWrapperHeight = () => {
//       const vh = window.innerHeight || document.documentElement.clientHeight;
//       setWrapperHeight(`${vh}px`);
//     };
    
//     window.addEventListener("resize", updateWrapperHeight);
//     updateWrapperHeight(); // Set initial height
    
//     return () => {
//       window.removeEventListener("resize", updateWrapperHeight);
//     };
//   }, []);

//   useEffect(() => { 
//     if(isOpen){
//       setCloseDrawer(false);
//       const timeoutId = setTimeout(() => {
//         setOpenDrawer(true);
//       }, 0);
//       return () => clearTimeout(timeoutId);
//     } else{
//           setOpenDrawer(false);
//           const timeoutId = setTimeout(() => {
//             setCloseDrawer(true);
//           }, 220);
//       return () => clearTimeout(timeoutId);
//       }
     
//   }, [isOpen])

//   if(closeDrawer){
//     return null
//   }

//   return (
//     <Wrapper dynamicHeight={wrapperHeight} style={{ 
//       background:bg ? bg :  theme.neutralColor.bgMask }}>
//       <Col
//         h={h}
//         j={j}
//         a="end"
//         style={{
//         transform: openDrawer ? "translateY(0)" : "translateY(100%)",
//         transition: "transform 0.3s ease",}}
//       >
//         {children}
//       </Col>
//     </Wrapper>
//   );
// };

// const Wrapper = styled(Box)<{ dynamicHeight: string }>`
//   width: 100%;
//   position: fixed;
//   display: flex;

//   flex-direction: column;
//   justify-content: end;
//   height: ${({ dynamicHeight }) => dynamicHeight};
//   left: 0;
//   bottom: 0;
//   z-index: 9;
// `;

// export default Drawer;
import { ReactNode, useEffect, useState } from "react";
import styled, { useTheme, keyframes } from "styled-components";
import { Box, Col } from "ui/basic";

interface IDrawer {
  bg?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  h? : string;
  j? : 'center' | 'start' | 'end';
}


const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0.5;
  }
`;

const Drawer: React.FC<IDrawer> = ({ bg, onClose, children, isOpen, h = '90%', j = 'center' }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setRenderDrawer(true);
      setOpenDrawer(true);
    } else {
      setOpenDrawer(false);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!openDrawer) {
      setRenderDrawer(false);
    }
  };

  if (!renderDrawer) {
    return null;
  }

  return (
    <Wrapper dynamicHeight="100%" style={{ background: bg || theme.neutralColor.bgMask }}>
      <AnimatedCol
        h={h}
        j={j}
        a="end"
        open={openDrawer}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </AnimatedCol>
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ dynamicHeight: string }>`
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: ${({ dynamicHeight }) => dynamicHeight};
  left: 0;
  bottom: 0;
  z-index: 9;
`;

const AnimatedCol = styled(Col)<{ open: boolean }>`
  animation: ${props => props.open ? slideUp : slideDown} 0.3s ease-out forwards;
`;

export default Drawer;
