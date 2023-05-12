import { lazy } from 'react';

const HomeIcon = lazy(() =>
  import('assets/icons/home.svg').then((module) => ({ default: module.ReactComponent })),
);
const BillingIcon = lazy(() =>
  import('assets/icons/billing.svg').then((module) => ({ default: module.ReactComponent })),
);
const OrdersIcon = lazy(() =>
  import('assets/icons/orders.svg').then((module) => ({ default: module.ReactComponent })),
);
const ReportsIcon = lazy(() =>
  import('assets/icons/reports.svg').then((module) => ({ default: module.ReactComponent })),
);
const DeliveryIcon = lazy(() =>
  import('assets/icons/delivery.svg').then((module) => ({ default: module.ReactComponent })),
);
const ProfileIcon = lazy(() =>
  import('assets/icons/profile.svg').then((module) => ({ default: module.ReactComponent })),
);
const CatalogueIcon = lazy(() =>
  import('assets/icons/menu.svg').then((module) => ({ default: module.ReactComponent })),
);
const TransactionsIcon = lazy(() =>
  import('assets/icons/transactions.svg').then((module) => ({ default: module.ReactComponent })),
);

export enum IconEnum {
    Dashboard = "Dashboard",
    Billing = "Billing",
    Orders = "Orders",
    Statistics = "Statistics",
    Delivery = "Delivery",
    Inventory = "Inventory",
    Transactions = "Transactions",
    Catalogue = "Catalogue"
}

interface IconMapType {
    [key: string]: React.FC;
}
  
export const iconMap: IconMapType = {
    [IconEnum.Dashboard]: HomeIcon,
    [IconEnum.Billing]: BillingIcon,
    [IconEnum.Orders]: OrdersIcon,
    [IconEnum.Statistics]: ReportsIcon,
    [IconEnum.Delivery]: DeliveryIcon,
    [IconEnum.Inventory]: ProfileIcon,
    [IconEnum.Transactions]: TransactionsIcon,
    [IconEnum.Catalogue]: CatalogueIcon
};
  