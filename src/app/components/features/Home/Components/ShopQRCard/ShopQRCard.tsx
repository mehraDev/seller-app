import React, { forwardRef } from "react";
import { useTheme } from "styled-components";
import {  Col, Img, Row, Text } from "ui/basic";
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
  name: string
}

const ShopQRCard  = forwardRef<HTMLDivElement,ShopQRCardProps>(({name, userName, logo ,onClose,onDownload,onShare,qrCodeUrl},ref) => {
  const theme = useTheme(); 
  
  return (
    <Col p={'1rem'} style={{background: theme.neutralColor.bgContainer ,gap:'0.5rem'}} a="center">
          <Row j="end"><Icon padding="0.5rem" name={IconName.Close} onClick={onClose}/></Row>
          <Col  p='1rem' a="center" style={{gap:'1rem', maxWidth:'280px'}}>
             {logo && <Img src={logo} alt="logo" w="8rem" h='8rem'/>}
                <Col ref={ref}  a="center"  style={{gap:'1rem' }} p={'1rem'}>
                <Text s="16" w={6} >{name}</Text>
                <QRCode 
                  style={{borderRadius:'8px', border :'1px solid ' + theme.neutralColor.borderSecondary}}
                  value={qrCodeUrl}
                  size={240}
                  includeMargin={true}
                  renderAs="svg"
                  
                />
                <Row j="between">
                  <Text s="12" w={5} c={theme.brandColor.primary}>
                  {`@${userName}`}
                  </Text>
                  <Text s="10" w={4}>
                    Powered by Digibhoomi
                  </Text>
                </Row>
                </Col>
          </Col>
        <Row style={{gap:'1rem',borderTop:`1px solid ` + theme.neutralColor.borderSecondary}} p={'1rem'}>
          <Button variant="secondary" onClick={onShare} width="100%">Share</Button>
          <Button  variant="secondary" onClick={onDownload} width="100%">Download</Button>
        </Row>
      </Col>
  );
}
);

export default ShopQRCard;
