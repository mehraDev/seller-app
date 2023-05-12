import React, {  useState } from 'react';
import SideNav from './SideNav/SideNav';
import { ComponentItemType } from 'app/services/DashboardPage/getComponentFromFeatureList';
import DashboardBody from './Body/DashboardBody';
import { DashboardHeader } from './Header/Header';
import { DashboardWrapper } from './styles';

interface DashboardProps {
    features: ComponentItemType[];
  }

  const Dashboard: React.FC<DashboardProps> = ({ features }) => {
    const [activeFeature, setActiveFeature] = useState<string>(""); 
  
    const handleFeatureChange = (feature: string) => {
      setActiveFeature(feature);
    };
  
    const sideNavList = features.map((feature) => {
      return {
        name: feature.name,
        icon: feature.icon,
      };
    });

    const activeComponent = activeFeature
    ? features.find((feature) => feature.name === activeFeature)?.component
    : features[0]?.component;

    return (
      <DashboardWrapper>
        <SideNav list={sideNavList} activeFeature={activeFeature} setActiveFeature={handleFeatureChange} />
        <DashboardHeader onLogout={()=>console.log('logout')}/>
        <DashboardBody activeComponent={activeComponent} />
      </DashboardWrapper>
    );
  };
  
  export default Dashboard;

