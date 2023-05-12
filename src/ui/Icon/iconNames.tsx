
import { faBell, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export enum IconName {
  Notification = 'notification',
  LeftArrow = 'leftArrow',
  RightArrow = 'rightArrow'
  // add more icon names here
}

interface Icons {
  [name: string]: any;
}

export const icons: Icons = {
  notification: faBell,
  leftArrow: faArrowLeft,
  rightArrow: faArrowRight,
  // add more icons here
};


