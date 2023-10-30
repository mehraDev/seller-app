import { ReactNode, useEffect, useState } from "react";
import styled, { keyframes, useTheme } from "styled-components";
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
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);

  }
  100% {
    transform: translateY(100%);
  }
`;

const Drawer: React.FC<IDrawer> = ({ bg, children, isOpen, h = '90%', j = 'end' }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(false);
  
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

  if ( !renderDrawer) {
    return null;
  }

  return (
      <Box j="end" a="end" h="100%" style={{position:'fixed',left:0,bottom:0,zIndex:9 ,background: bg ? bg : theme.neutralColor.bgMask}}>
      <AnimatedCol
        h={h}
        j={j}
        open={openDrawer}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </AnimatedCol>
      </Box>
  );
};

const AnimatedCol = styled(Col)<{ open: boolean }>`
  animation: ${props => props.open ? slideUp : slideDown} 0.3s  forwards;
`;

export default Drawer;
