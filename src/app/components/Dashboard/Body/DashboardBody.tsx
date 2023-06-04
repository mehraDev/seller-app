import React, { ReactNode, Suspense } from 'react';
import DashboardBodyWrapper from '../styles';
import Loading from 'ui/Loading/Loading';
import BodyWrapper from './styles';

interface DashboardBodyProps {
  activeComponent: React.ComponentType<any> | undefined;
}


const DashboardBody: React.FC<DashboardBodyProps> = ({ activeComponent: ActiveComponent }) => {
  return (
    <BodyWrapper className='main'>
      {ActiveComponent ? (
        <LazyComponentWrapper>
            <ActiveComponent/>
        </LazyComponentWrapper>
       
      ) : (
        <div>No component found for the active feature.</div>
      )}
    </BodyWrapper>
  );
};

const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);
  
type LazyComponentWrapperProps = {
  children: ReactNode;
};
export default DashboardBody;

