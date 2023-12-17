import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import { Box, Col, Row, Text } from "ui/basic";
import { Card } from "ui/Card";
import Icon, { IconName } from "ui/Icon";
import { LoadingAnimation } from "ui/LoadingAnimation";
import ShopQRCard from "../../ShopQRCard";
import Button from "ui/Button";
import html2canvas from 'html2canvas';


const ToolBar: React.FC = () => {
  const theme = useTheme();
  const [popup,setPopup] = useState(false);
  const shopQRRef = useRef(null);

  const { profile, isLoading } = useSelector(
    (state: RootState) => state.user
  );

  if (isLoading) {
    return <LoadingAnimation/>
  }

  if (!profile) {
    return <Box p={'1rem'}>No profile available.</Box>; // Handle the case where profile is null
  }
  const {user,name }  = profile;
  const handleViewQr = () => {
    setPopup(true);
  }

  const baseUrl = "digibhoomi.com";
  const shopUrl = `https://${baseUrl}/${user}`;

  const handleShareClick = async () => {
    const nameUppercase = name.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    const title = `Explore ${nameUppercase}`;
    const text = `Welcome to ${nameUppercase}! Explore our menu and more at ${shopUrl}.`;
  
    try {
      const imageData = await getImage();
      if (navigator.share) {
        const shareData : ShareData = {
          title: title,
          url: shopUrl,
          text: text
        };
        if (imageData) {
          const response = await fetch(imageData);
          const blob = await response.blob();
          const file = new File([blob], 'shop-qr-code.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        }
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error('Error in sharing:', error);
    }
  };
  
  const handleOpenApp= () => {
    window.open(shopUrl, '_blank');
  };
 

  const downloadImage = async () => {
    const imageData = await  getImage();
    if(imageData){
        const downloadLink = document.createElement('a');
        downloadLink.href = imageData;
        downloadLink.download = 'shop-qr-code.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
  };

  const getImage = async () => {
    const element = shopQRRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      return canvas.toDataURL('image/png');
    }
    return null;
  };
  
  
  return ( 
    <Row style={{background: theme.neutralColor.bgContainer}} p={'1rem'}  a="center" j="center">
        <Row j="between"  >
            <Button variant="secondary" padding="0.25rem 0.5rem" onClick={handleOpenApp}>
                <Icon color={theme.brandColor.primary} width={0.8} height={0.8} name={IconName.Web}/>
                <Text c={theme.brandColor.primary}  s="14" >Open App</Text>
            </Button>
            <Row w='initial' style={{gap:'1rem'}} j="between">
                <Button variant="secondary" padding="0.25rem 0.5rem" onClick={handleShareClick}>
                    <Icon color={theme.brandColor.primary} width={0.8} height={0.8} name={IconName.Share}/>
                    <Text c={theme.brandColor.primary}   s="14"  >Share</Text>
                </Button>
                <Button variant="secondary" padding="0.25rem 0.5rem" onClick={handleViewQr}>
                    <Icon color={theme.brandColor.primary} width={0.8} height={0.8} name={IconName.Qr} />
                    <Text c={theme.brandColor.primary}  s="14" >QR</Text>
                </Button>
            </Row>
        </Row>
        <div style={{display:'none'}}>
            <ShopQRCard ref={shopQRRef} userName={user} logo={""} qrCodeUrl={shopUrl}/>
        </div>
        {popup &&
                 <Backdrop  >
                  <Col p={'2rem 1rem'}>
                   <ShopQRCard onDownload={downloadImage} onShare={handleShareClick}  userName={user} logo={""} onClose={() => setPopup(false)} qrCodeUrl={shopUrl}/> 
                   </Col>
                </Backdrop>
              }
    </Row>
  );
};

export default ToolBar;

