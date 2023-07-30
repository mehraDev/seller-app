import React from 'react';
import { Box, Img,Text } from 'ui/basic';

interface IUserInfo {
  info: {
    shopName: string;
    shopImage: string;
    location: string;
    description: string;
  };
}

const UserInfo: React.FC<IUserInfo> = ({ info }) => {
  const { shopName, shopImage, description, location } = info;
  return (
    <Box a='center' j='around' m={[1]}>
      <Img w='100px' h='100px' src={shopImage} alt="Shop Image" />
      <Box fd='c' w='initial'>
        <Text s='24' w={5} c='#000000b5'>{shopName}</Text>
        {/* <Text>{description}</Text>
        <Text>{location}</Text> */}
      </Box>
    </Box>
  );
};

export default UserInfo;
