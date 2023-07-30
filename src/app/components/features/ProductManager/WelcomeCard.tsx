import React from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { Card } from "ui/Card";
import {  Box, Text } from "ui/basic";

interface Props {
  onAddProductClick: () => void;
  onUploadFromFileClick: () => void;
}

const WelcomeCard: React.FC<Props> = ({ onAddProductClick, onUploadFromFileClick }) => {
  const theme  = useTheme();
  return (
    <Card a="center" p='1rem' m='1rem'>
      <Text c={theme.neutralColor.text} type="heading" s="24" w={6} mb="1rem">Welcome!</Text>
      <Text mb="1rem" style={{textAlign:"center"}}>Let's start adding products and make your mark in the marketplace.</Text>
      <Box a="center" j="center" style={{gap:'1rem'}}>
      <Button width="40%" onClick={onAddProductClick}>Add Product</Button>
      <Button   width="40%" onClick={onUploadFromFileClick}>Upload from File</Button>
      </Box>
    </Card>
  );
};

export default WelcomeCard;
