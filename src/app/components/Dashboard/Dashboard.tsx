import React, {  lazy, useEffect, useState } from 'react';
import SideNav from './SideNav/SideNav';
import DashboardBody from './Body/DashboardBody';
import MobileHeader from 'app/components/Dashboard/Header/MobileHeader';
import { IFeature } from '../DashboardHost/services/Features';
import styled from 'styled-components';
import { Box } from 'ui/basic';
import { OptionsProvider } from './Header/MobileHeader/OptionsProvider';
import {  useDispatch } from 'react-redux';
import { fetchProfile } from 'store/modules/profileSlice';
import { StorageKeys, saveToSessionStorage } from 'utils/sessionStorageManager';
import { AppDispatch } from 'store/store';
import { fetchContacts } from 'store/modules/contactsSlice';
import { useDashboardFeatureContext } from 'app/contexts/Dashboard/DashboardFeatureContext';

const SellerProfile = lazy(() => import('../Profile/Profile'));
export const PROFILE_FEATURE_NAME = 'Profile';
interface DashboardProps {
    features: IFeature[];
    onLogout?: () => void;
  }

  const Dashboard: React.FC<DashboardProps> = ({ features }) =>  {
    const { activeFeature, setActiveFeature } = useDashboardFeatureContext();
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const [isActiveFeatureProfile,setIsActiveFeatureProfile] = useState(false);

    useEffect(() => {
      if(features.length > 0 && !activeFeature) {
        setActiveFeature(features[0].name);
      }
    }, [features, activeFeature, setActiveFeature]);

    const handleSideNavProfileClick = () => {
      setIsActiveFeatureProfile(true);
      setActiveFeature(PROFILE_FEATURE_NAME);
    }
    const handleFeatureChange = (feature: string) => {
      setActiveFeature(feature);
      setIsActiveFeatureProfile(false)
      saveToSessionStorage(StorageKeys.ACTIVE_FEATURE, feature);
    };

    const sideNavList = features.map((feature) => {
      return {
        name: feature.name,
        icon: feature.icon,
      };
    });

    let activeComponent;
    if(isActiveFeatureProfile){
      activeComponent = SellerProfile;
    }else{
      activeComponent = features.find(feature => feature.name === activeFeature)?.component;
    }
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
      if (!activeFeature && features.length > 0) {
        setActiveFeature(features[0].name);
      }
    }, [features, setActiveFeature, activeFeature]);

    useEffect(() => {
      dispatch(fetchProfile());
      dispatch(fetchContacts());
    }, [dispatch]);

    return (
      <OptionsProvider>
      <DashboardWrapper>
        <SideNav
            navList={sideNavList}
            activeItem={activeFeature}
            onItemClick={handleFeatureChange}
            hidden={!isSideNavVisible}
            hideSideNav={() => setIsSideNavVisible(false)}
            onProfileClick={() => handleSideNavProfileClick()}
        />
        <MobileHeader heading={activeFeature} 
          toggleSideNav={() => setIsSideNavVisible(!isSideNavVisible)}/>
        <DashboardBody activeComponent={activeComponent} />
      </DashboardWrapper>
      </OptionsProvider>
    );
  };
  
  const DashboardWrapper = styled(Box)`
  min-width: 256px;
  position: fixed;
  height:100%
  `
  
  export default Dashboard;

