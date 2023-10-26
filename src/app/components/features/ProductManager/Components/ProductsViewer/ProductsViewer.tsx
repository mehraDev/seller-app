import React, {  useEffect, useRef, useState } from "react";
import { IProduct } from "app/interfaces";
import { Col, Row,Text } from "ui/basic";
import { EShop } from "app/enums";
import { useTheme } from "styled-components";
import InputSearch from "ui/Form/Inputs/InputSearch";
import { addImageUrlsToProducts } from "../../services";
import {  useSelector } from "react-redux";
import {  RootState } from "store/store";
import { LoadingAnimation } from "ui/LoadingAnimation";
import supportedProductViewers, { IViewer } from "./Shops/supportedProductViewers";
import { Sticky } from "ui/Sticky";

export interface IProductsViewer {
  shop: EShop;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

const ProductsViewer: React.FC<IProductsViewer> = ({  shop,scrollRef }) => {
  
  const { list: products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const viewerRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const absoluteImageProducts: IProduct[] = addImageUrlsToProducts(products,shop);
  const [searchContainerHeight, setSearchContainerHeight] = useState(0);
  const [viewerTopPosition, setViewerTopPosition] = useState(0);
  const theme = useTheme();
  let Viewer = supportedProductViewers[shop] as React.FC<IViewer>;

  const [preview,setPreview] = useState<IProduct | null>(null)
  const [searchTerm , setSearchTerm] = useState("");

  const handlePreviewProduct = (prodcut:IProduct | null) => {
    setPreview(prodcut);
  }
  useEffect(() => {
    if (viewerRef.current) {
        const topPosition = viewerRef.current.getBoundingClientRect().top;
        setViewerTopPosition(topPosition - searchContainerHeight + 10);
    }
}, [searchContainerHeight]);

  useEffect(() => {
    if (searchContainerRef.current) {
      const height = searchContainerRef.current.offsetHeight;
      setSearchContainerHeight(height);
    }
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };
  const filterProducts = absoluteImageProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
    return (
  <>
  <Col p='0 0 7rem' h="100%" style={{overflow: 'scroll'}} ref={viewerRef}>
    {
      isLoading ? 
      <LoadingAnimation/>
      : 
      <Col style={{gap:'1rem'}}>
            <Sticky height={searchContainerHeight ? searchContainerHeight : undefined } at={viewerTopPosition} stickyStyle={{position:'fixed',top:0, zIndex:1,boxShadow: theme.shadow.boxShadowTertiary}} containerRef={scrollRef? scrollRef: viewerRef}>
              <Row ref={searchContainerRef} p='0.5rem 1rem' style={{background:theme.neutralColor.bgContainer}}>
                <InputSearch placeholder="Search in products..." value={searchTerm} onChange={handleSearch} onClear={() => setSearchTerm('')}/>
              </Row>
            </Sticky>
         {
          !filterProducts.length
          ?
           <Row h='500px' j="center"  p={'2rem 1rem'}><Text c={theme.neutralColor.textSecondary} s='14' w={5}>No Produts Found</Text></Row>
          :
           <Viewer products={filterProducts}/>
         }
      </Col>
    }
  </Col>
  </>
  );
}

export default ProductsViewer;
