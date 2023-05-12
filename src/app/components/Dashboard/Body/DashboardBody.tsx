import React from 'react';
import DashboardBodyWrapperStyle from '../styles';

interface DashboardBodyProps {
  activeComponent: React.ComponentType<any> | undefined;
}

const DashboardBody: React.FC<DashboardBodyProps> = ({ activeComponent: ActiveComponent }) => {
  return (
    <DashboardBodyWrapperStyle className='main'>
      {ActiveComponent ? (
        <ActiveComponent />
      ) : (
        <div>No component found for the active feature.</div>
      )}
    </DashboardBodyWrapperStyle>
  );
};

export default DashboardBody;

