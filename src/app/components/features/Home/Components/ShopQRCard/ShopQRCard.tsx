import React, { forwardRef, useState } from "react";
import { useTheme } from "styled-components";
import { Box, Col, Img, Row, Text } from "ui/basic";
import { FaShare } from "react-icons/fa";
import QRCode from "qrcode.react"; 
import Icon, { IconName } from "ui/Icon";
import Button from "ui/Button";

interface ShopQRCardProps {
  userName: string;
  logo: string;
  onClose?: () => void;
  onShare?: ( ) => void;
  onDownload?: () => void;
  qrCodeUrl: string
}

const ShopQRCard  = forwardRef<HTMLDivElement,ShopQRCardProps>(({ userName, logo ,onClose,onDownload,onShare,qrCodeUrl},ref) => {
  const theme = useTheme(); 

  return (
    <Col p={'1rem'} style={{background: theme.neutralColor.bgContainer ,gap:'0.5rem'}} a="center">
          <Row j="end"><Icon padding="0.5rem" name={IconName.Close} onClick={onClose}/></Row>
          <Row ref={ref} p='1rem'>
              <QRCode 
                style={{borderRadius:'8px', border :'1px solid ' + theme.neutralColor.borderSecondary}}
                value={qrCodeUrl}
                size={300}
                includeMargin={true}
                renderAs="svg"
                
              />
          </Row>
          
        <Row j="center" style={{gap:'0.5rem',cursor:'pointer'}} a="center" onClick={onShare}>
          <Text s="14" w={5} c={theme.brandColor.primaryTextActive}>{`@${userName}`}</Text>
        </Row>
        <Row style={{gap:'1rem',borderTop:`1px solid ` + theme.neutralColor.borderSecondary}} p={'1rem'}>
          <Button variant="secondary" onClick={onShare} width="100%">Share</Button>
          <Button  variant="secondary" onClick={onDownload} width="100%">Download</Button>
        </Row>
      </Col>
  );
}
);

export default ShopQRCard;
