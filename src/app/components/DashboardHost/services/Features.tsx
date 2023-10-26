import { lazy } from 'react';
import { IconEnum } from '../../../../ui/Icon/IconSidenav';

const CatalogGenerator = lazy(() => import('app/components/features/CatalogGenerator/CatalogGenerator'));
const DashboardComponent = lazy(() => import('app/components/features/Home/Home'));
const BillingComponent = lazy(() => import('app/components/features/Billing/Billing'));
const OrdersComponent = lazy(() => import('app/components/features/Orders/Orders'));
const StatisticsComponent = lazy(() => import('app/components/features/Statistics/Statistics'));
const DeliveryComponent = lazy(() => import('app/components/features/Delivery/Delivery'));
const ProductsManager = lazy(() => import('app/components/features/ProductManager/ProductManager'));
const TransactionsComponent = lazy(() => import('app/components/features/Transactions/Transactions'));
const ImagePoolManager = lazy(() => import('app/components/features/ImagePoolManager/ImagePoolManager'));

export interface IFeature {
  name: string;
  component: React.ComponentType;
  icon: IconEnum;
}

type ComponentListType = {
  [key in FeaturesEnum]: IFeature;
};

export enum FeaturesEnum {
  Home = "Home",
  Billing = "Billing",
  Orders = "Orders",
  Statistics = "Statistics",
  Delivery = "Delivery",
  Inventory = "Inventory",
  Transactions = "Transactions",
  Products = "Products",
  ImagePoolManager = 'ImagePoolManager',
  CatalogGenerator = 'CatalogGenerator'
}

const Features : ComponentListType= {
    Home: {
      name: 'Home',
      component: DashboardComponent,
      icon: IconEnum.Home,
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
    Products: {
      name: 'Products Manager',
      component: ProductsManager,
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
    },
    ImagePoolManager: {
      name: 'Image Pool Manager',
      component: ImagePoolManager,
      icon: IconEnum.Catalogue
    },
    CatalogGenerator: {
      name: 'Catalog Generator',
      component: CatalogGenerator,
      icon: IconEnum.Catalogue
    }
};

export default Features