import React, { useState, ReactNode } from 'react';

interface DashboardFeatureContextProps {
  activeFeature: string;
  setActiveFeature: React.Dispatch<React.SetStateAction<string>>;
  setData: (featureName: string, data: any) => void;
  data: Record<string, any>;
}

export const DashboardFeatureContext = React.createContext<DashboardFeatureContextProps | undefined>(undefined);

interface DashboardFeatureProviderProps {
  children: ReactNode;
}
export const useDashboardFeatureContext = () => {
  const context = React.useContext(DashboardFeatureContext);
  if (!context) {
    throw new Error(
      "useDashboardFeatureContext must be used within a DashboardFeatureProvider"
    );
  }
  return context;
};
export const DashboardFeatureProvider: React.FC<DashboardFeatureProviderProps> = ({ children }) => {
  const [data, setDataState] = useState<Record<string, any>>({});
  const [activeFeature, setActiveFeature] = useState<string>(''); 
  
  const setData = (featureName: string, data: any) => {
    setDataState((prev) => ({ ...prev, [featureName]: data }));
  };
  
  return (
    <DashboardFeatureContext.Provider value={{ activeFeature, setActiveFeature, data, setData }}>
      {children}
    </DashboardFeatureContext.Provider>
  );
};
