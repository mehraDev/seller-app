import React, {  useEffect, useState } from 'react';
import SideNav from './SideNav/SideNav';

import DashboardBody from './Body/DashboardBody';
import { DashboardWrapper } from './styles';
import MobileHeader from 'ui/MobileHeader';
import { Feature } from '../DashboardHost/services/getComponentsFromFeatureList';


interface DashboardProps {
    features: Feature[];
    onLogout: () => void;
  }

  const Dashboard: React.FC<DashboardProps> = ({ features }) =>  {
    const [dashboardHeight, setDashboardHeight] = useState(window.innerHeight);
    const [activeFeature, setActiveFeature] = useState<number>(0); 
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const handleFeatureChange = (feature: number) => {
      setActiveFeature(feature);
    };

    useEffect(() => {
      const handleResize = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      const handleOrientationChange = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }, []);

    const sideNavList = features.map((feature) => {
      return {
        name: feature.name,
        icon: feature.icon,
      };
    });

    const activeComponent = features[activeFeature]?.component;

    return (
      <DashboardWrapper height={dashboardHeight}>
        <SideNav
            list={sideNavList}
            activeFeature={activeFeature}
            setActiveFeature={handleFeatureChange}
            show={isSideNavVisible}
            toggleSideNav={setIsSideNavVisible}
        />
        <MobileHeader toggleSideNav={() => setIsSideNavVisible(!isSideNavVisible)}/>
        <DashboardBody activeComponent={activeComponent} />
      </DashboardWrapper>
    );
  };
  
  export default Dashboard;

