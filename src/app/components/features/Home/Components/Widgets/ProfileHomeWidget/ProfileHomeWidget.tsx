import React from "react";
import ProfileCard from "app/components/Profile/Components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { Col } from "ui/basic";
import theme from "ui/Utils/Media/Theme/theme";
import { LoadingAnimation } from "ui/LoadingAnimation";
import { getSellerLogo } from "app/services/Shop";

interface IProfileHomeWidget {}

const ProfileHomeWidget: React.FC<IProfileHomeWidget> = () => {
  const { profile, isLoading } = useSelector((state: RootState) => state.user);
  
  const logoUrl = getSellerLogo();

  if (isLoading || !profile) {
    return (
      <Col style={{background: theme.neutralColor.fillQuaternary}}>
      {
        isLoading ? 
        <LoadingAnimation />  :
        <div>Oops! Some error occured.</div>
      }
      </Col>
    );
  }

  
  return (
    <>
      <ProfileCard profile={profile} logo={logoUrl}/>
    </>
  );
};

export default ProfileHomeWidget;
