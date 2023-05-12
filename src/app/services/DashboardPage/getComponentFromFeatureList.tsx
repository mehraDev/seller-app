import { lazy } from 'react';
import { IconEnum } from './SideNav/getSideNavIcons';
import { FeaturesEnum } from './featureList';

const DashboardComponent = lazy(() => import('app/components/features/Dashboard/Dashboard'));
const BillingComponent = lazy(() => import('app/components/features/Billing/Billing'));
const OrdersComponent = lazy(() => import('app/components/features/Orders/Orders'));
const StatisticsComponent = lazy(() => import('app/components/features/Statistics/Statistics'));
const DeliveryComponent = lazy(() => import('app/components/features/Delivery/Delivery'));
const ProductCatalogueFeature = lazy(() => import('app/components/features/Inventory/ProductCatalogueHost'));
const TransactionsComponent = lazy(() => import('app/components/features/Transactions/Transactions'));


export interface ComponentItemType {
  name: string;
  component: React.ComponentType;
  icon: IconEnum;
}

type ComponentListType = {
  [key in FeaturesEnum]: ComponentItemType;
};

const ComponentList : ComponentListType= {
    Dashboard: {
      name: 'Dashboard',
      component: DashboardComponent,
      icon: IconEnum.Dashboard,
    },
    Billing: {
      name: 'Billing',
      component: BillingComponent,
      icon: IconEnum.Billing,
    },
    Orders: {
      name: 'Orders',
      component: OrdersComponent,
      icon: IconEnum.Orders,
    },
    Statistics: {
      name: 'Statistics',
      component: StatisticsComponent,
      icon: IconEnum.Statistics,
    },
    Delivery: {
      name: 'Delivery',
      component: DeliveryComponent,
      icon: IconEnum.Delivery,
    },
    Catalogue: {
      name: 'Catalogue',
      component: ProductCatalogueFeature,
      icon: IconEnum.Catalogue,
    },
    Transactions: {
      name: 'Transactions',
      component: TransactionsComponent,
      icon: IconEnum.Transactions,
    },
    Inventory: {
      name: 'Inventory',
      component: DeliveryComponent,
      icon: IconEnum.Inventory,
    }
};

function getComponentFromFeatureList(featureList: FeaturesEnum[]) :ComponentItemType[]{
  return featureList.map((feature) => ComponentList[feature]);
}

export default getComponentFromFeatureList;