import { Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import ImageWithFallback from "ui/ImageWithFallback";
import placeholderProfileImage from '../../../../../assets/shop/profile-placeholder.png'
import ContactBar from "./ContactBar/ContactBar";
import { ISellerProfile } from "app/interfaces"; // Import ISellerProfile interface
import React from "react";


interface IProfileCard {
  profile: ISellerProfile;
  logo:string;
};

const ProfileCard: React.FC<IProfileCard> = ({ logo, profile}) => {
  const theme = useTheme();
    const { name, about, address }: ISellerProfile = profile;
    const profileBasic = (
      <>
        <ImageWithFallback src={logo} fallbackImage={placeholderProfileImage} alt='Logo' />
        <Text tt="cap" s="20" w={6} type="heading" c={theme.neutralColor.text}>
        {name}
      </Text>
      <About tags={about} />
      {address && (
        <Row
          a="center"
          w="initial"
          p="6px"
          style={{
            border: " 1px solid #ca1a193d",
            borderLeft: "0px",
            borderRight: "0px",
          }}
        >
          <Icon
            name={IconName.Location}
            width={1}
            padding="0"
            color={"#CA1919"}
            borderRadius={0.35}
            height={1}
          />
          <Text
            tt="cap"
            ml="8px"
            c={theme.neutralColor.textSecondary}
            s="12"
            w={5}
          >
            {address}
          </Text>
        </Row>
      )}
        <Col
          w="initial"
          style={{ gap: "8px", position: "absolute", right: "1rem",top:'3rem' }}
        >
          <ContactBar/>
        </Col>
      </>
    );

    return (
      <Col a="center" p={'1rem'} style={{gap:'0.5rem',background: theme.neutralColor.bgContainer,boxShadow: 'rgba(0, 0, 0, 0.069) 0px 1px 4px',position:'relative'}}>
         {profileBasic}
      </Col>
    );
};

export default ProfileCard;



const About: React.FC<{ tags: string[] }> = ({ tags }) => {
  const theme = useTheme();
  const shouldDisplayLeafIcon = tags.some((tag) =>
    "Pure-Veg".toLowerCase().includes(tag.toLowerCase())
  );
  return (
    <>
      {tags.length > 0 && (
        <Row j="center" a="center">
          {shouldDisplayLeafIcon && (
            <Icon
              name={IconName.Leaf}
              width={1}
              height={1}
              padding="0"
              color={"#43A047"}
              style={{ marginRight: "2px" }}
            />
          )}
          {tags.map((item, index) => (
            <React.Fragment key={index}>
              <Text  tt="cap" c={theme.neutralColor.textSecondary} s="14">
                {item}
              </Text>
              {index < tags.length - 1 && (
                <Icon
                  name={IconName.Diamond}
                  width={0.3}
                  height={0.3}
                  color={"#FFA000"}
                />
              )}
            </React.Fragment>
          ))}
        </Row>
      )}
    </>
  );
};

