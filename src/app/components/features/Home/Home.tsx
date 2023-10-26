import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { useTheme } from "styled-components";
import Popup from "ui/Popup";
import {  Col, Row } from "ui/basic"
import ShopQRCard from "./Components/ShopQRCard";
import { ProductsViewerWidget } from "./Components/Widgets/ProductViewer";
import { ProfileHomeWidget } from "./Components/Widgets";
import QRWidget from "./Components/Widgets/QRWidget/QRWidget";
import { getSellerLogo } from "app/services/Shop";
import { fetchProducts } from "store/modules/productSlice";
const Home = () => {
  const theme = useTheme();
  const [isViewQr,setIsViewQr] = useState(false);
  const { profile } = useSelector((state: RootState) => state.user);
  const userId  = profile?.user ?profile?.user :'Business Name';
  const toggleViewQr = (flag: boolean) => {
    setIsViewQr(flag);
  }
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const profileImageUrl = getSellerLogo();
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Col style={{gap:'0.5rem',background:theme.neutralColor.bgLayout,overflow:'scroll'}} h='100%' ref={homeRef}>
        <Row style={{position:'relative'}}>
            <ProfileHomeWidget/>
        </Row>
        <Row style={{position:'relative'}}>
            <QRWidget/>
        </Row>
        <Row style={{position:'relative',borderTop:'1px dashed ' + theme.neutralColor.borderSecondary}}>
          <ProductsViewerWidget containerRef={homeRef}/>
        </Row>
        <Popup onClose={() => toggleViewQr(false)} isOpen={isViewQr} title={"Shop Qr Code"} >
          <ShopQRCard userName={userId} logo={profileImageUrl} onClose={() => toggleViewQr(false)}/>
          </Popup>
      </Col>
    </>
    
  );
};

export default Home;
