import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";
import { FaShare } from "react-icons/fa";
import QRCode from "qrcode.react"; 
import Icon, { IconName } from "ui/Icon";
import Button from "ui/Button";

interface ShopQRCardProps {
  userName: string;
  logo: string; // Pass the logo URL as a prop
  onClose: () => void
}

const ShopQRCard: React.FC<ShopQRCardProps> = ({ userName, logo ,onClose}) => {
  const theme = useTheme();
  const baseUrl = "digibhoomi.com";
  const qrCodeUrl = `https://${baseUrl}/${userName}`;

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Shop QR Code",
        url: qrCodeUrl,
      });
    }
  };
  const handleOpenClick = () => {
    window.open(qrCodeUrl, '_blank');
  };

  return (
    <Col p={'1rem'} style={{background: theme.neutralColor.bgContainer ,gap:'0.5rem'}} a="center">
          <Row j="end"><Icon padding="0.5rem" name={IconName.Close} onClick={onClose}/></Row>
          <QRCode
            style={{borderRadius:'8px', border :'1px solid ' + theme.neutralColor.borderSecondary}}
            value={qrCodeUrl}
            size={300}
            includeMargin={true}
            renderAs="svg"
            
          />
        <Row j="center" style={{gap:'0.5rem',cursor:'pointer'}} a="center" onClick={handleShareClick}>
          <Text s="14" w={5} c={theme.brandColor.primaryTextActive}>{`@${userName}`}</Text>
        </Row>
        <Row style={{gap:'1rem',borderTop:`1px solid ` + theme.neutralColor.borderSecondary}} p={'1rem'}>
          <Button variant="secondary" onClick={handleShareClick} width="100%">Share</Button>
          <Button onClick={handleOpenClick} width="100%">Open My Shop</Button>
        </Row>
      </Col>
  );
};

export default ShopQRCard;
