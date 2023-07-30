import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import { getProfile } from '../DashboardHost/services';
import { IProfile } from '../Signup/services';
import prof from '../../../assets/shop/shop-ph.svg'

const ProfileCard = styled.div`
`;

const Profile: React.FC<IProfile> = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);
  const shopInfo = {
    shopName: profile?.shopName || 'My Shop',
    shopImage: profile?.shopImage || prof,
    location: 'New York',
    description: 'Welcome to our shop!',
  };

  return (
    <ProfileCard>
      <UserInfo info={shopInfo} />
    </ProfileCard>
  );
};

export default Profile;
