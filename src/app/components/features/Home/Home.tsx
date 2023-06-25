import { getProfile } from "app/components/DashboardHost/services";
import { IProfile } from "app/components/Signup/services";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box,Text } from "ui/basic";

const ShopCard = styled(Box)`
`;


const ShopCardComponent = () => {
  const [profile, setProfile] = useState<IProfile | 0>(0);
  const shopDescription = "Your one-stop shop for trendy clothing.";

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profileData = await getProfile();
        if (profileData !== 0) {
          setProfile(profileData);
        } else {
          setProfile(0);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }

    fetchProfile();
  }, []);
  
  const shopName = profile !== 0 ? profile.shopName : "My Store";
  const shopType = profile !== 0 ? profile.shopType : "";

  return (
    <div>
      <ShopCard j="between" p="2rem 1.5rem">
      <Box fd="c" p="1.5rem 1rem">
        <Text s="22" w={6} mb="0.5rem" c="#013f54" tt="cap">
          {shopName}
        </Text>
        <Text s="12" w={6} mb="0.5rem" tt="cap">{shopType}</Text>
        <Text mb="0.5rem">{shopDescription}</Text>
      </Box>
    </ShopCard>
    
    </div>
    
  );
};

export default ShopCardComponent;
