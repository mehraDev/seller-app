import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import { Box, Col, Row, Text } from "ui/basic";
import { Card } from "ui/Card";
import Icon, { IconName } from "ui/Icon";
import { LoadingAnimation } from "ui/LoadingAnimation";
import ShopQRCard from "../../ShopQRCard";



const QRWidget: React.FC = () => {
  const theme = useTheme();
  const [popup,setPopup] = useState(false);
  const { profile, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (isLoading) {
    return <LoadingAnimation/>
  }

  if (!profile) {
    return <Box p={'1rem'}>No profile available.</Box>; // Handle the case where profile is null
  }
  const {user}  = profile;
  const handleViewQr = () => {
    setPopup(true);
  }
  return (
      <Row style={{background: theme.neutralColor.bgContainer}} p={'1rem'}  a="center" j="center">
             <Row w="10rem" style={{gap:'.5rem',cursor:'pointer'}}  a="center" j="center"  onClick={handleViewQr}>
                <Icon color={theme.brandColor.primary} width={1} height={1} name={IconName.Qr}/>
                <Text c={theme.brandColor.primary} w={6} s="14" mr="0.5rem">Shop QR</Text>
             </Row>
             {popup &&
                <Backdrop onClose={() => console.log('s')}>
                  <Col p={'2rem 1rem'}>
                    <ShopQRCard userName={user} logo={""} onClose={() => setPopup(false)}/>
                    {/* 
                      <Text c={theme.neutralColor.textSecondary} w={5} s="12">
                        {`@${user}`}
                      </Text>
                    </Col> */}
                  </Col>
                </Backdrop>
             }
      </Row>
  );
};

export default QRWidget;

