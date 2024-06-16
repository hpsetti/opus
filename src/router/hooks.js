import { getServices } from '../apis/marketPlace';
import { getSubscribedPlans, getMapping } from '../apis/plans';
import { getPermissionsData } from '../apis/rbac';
// import EventBus from '../utils/event-bus';
import { getCookie } from '../utils/common';
import checkSmartExchangeProjects from '../apis/smartExchange';
import { getUserData } from '../apis/profile';

const NotAuthorizedPaths = [
  'login',
  'register',
  'forgot',
  'reset',
  'confirmregister',
  'termsofservice'
];
function checkAuthorization(to) {
  return NotAuthorizedPaths.indexOf(to.name) > -1 && getCookie('Authorization');
}
export const pathNotAllowed = [
  'Registration Tracker',
  'Regulatory Watch',
  'Regulatory Intelligence',
  'Smart Builder',
  'Product Classification'
];

export async function beforeEach(to, from, next) {
  const roleId = parseInt(localStorage.getItem('roleId'), 10);
  let permissionsFlag = false;
  // if (import.meta.env.VITE_NODE_ENV === 'production' && to.path === '/' && !getCookie('Authorization')) {
  //   window.location.href = 'https://opus.emergobyul.com';
  //   return;
  // }
  if (roleId === 13 && !['compliancewire', 'ContactUs', 'Cart'].includes(to.name)) {
    next({
      path: '/compliancewire-marketplace',
    });
  }
  if (to.path === '/') {
    next({ path: '/login' });
    return;
  }
  if (checkAuthorization(to)) {
    if (roleId === 13) {
      next({
        path: '/compliancewire-marketplace',
      });
    } else {
      next({
        path: '/home',
      });
    }
    return;
  }
  if (
    localStorage.getItem('userData') &&
    JSON.parse(localStorage.getItem('userData'))
  ) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'Pageview',
      pagePath: to.path,
      pageTitle: to.meta.title,
      UserID: JSON.parse(localStorage.getItem('userId')),
      CompanyID: JSON.parse(localStorage.getItem('userData')).company
    });
  }
  if (roleId && roleId === 10) {
    if (to.meta.title === 'Smart Exchange') {
      const userData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : await getUserData();
      const token = getCookie('Authorization').split('Bearer ')[1];
      const projects = await checkSmartExchangeProjects(token);
      if (projects && userData.account_type_id === 2) {
        next();
        this.emitter.emit('activeMenuTitle', to.meta.title);
      } else {
        next({
          path: '/submission-builder'
        });
      }
    } else if (to.meta.title === 'Smart Builder') {
      next();
      this.emitter.emit('activeMenuTitle', to.meta.title);
    } else {
      next({
        path: '/submission-builder'
      });
    }
  } else if (
    pathNotAllowed.indexOf(to.meta.title) >= 0 &&
    getCookie('Authorization')
  ) {
    const services = JSON.parse(localStorage.getItem('services'))
      ? JSON.parse(localStorage.getItem('services'))
      : await getServices();
    let addedServiceIds = [];
    const addedServices = await getSubscribedPlans(
      localStorage.getItem('accountId')
    );
    const mappingPlansIds = JSON.parse(localStorage.getItem('mappingServices'))
      ? JSON.parse(localStorage.getItem('mappingServices'))
      : await getMapping();
    addedServices.forEach((plan) => {
      const planService = mappingPlansIds.find(
        (each) => each.plan_id === plan.id
      );
      if (planService) {
        addedServiceIds = [
          ...new Set(addedServiceIds.concat(planService.service_id))
        ];
      }
    });
    const serviceIndex = services.findIndex(
      (service) => service.name === to.meta.title
    );
    const serviceId = services[serviceIndex].id;
    const addedIndex = addedServiceIds.findIndex(
      (addservice) => addservice === serviceId
    );
    if (addedIndex < 0) {
      next({
        path: `/market-place/service/${serviceId}`
      });
    } else {
      if (to.meta.title === 'Registration Tracker') {
        const servicesAndModulesList = [];
        const permissionsList = await getPermissionsData();
        permissionsList.forEach((service) => {
          if (service.access) {
            servicesAndModulesList.push(service.key);
            service.modules.forEach((module) => {
              if (module.access) {
                servicesAndModulesList.push(module.key);
              }
            });
          }
        });
        switch (to.path) {
          case '/trackplusdashboard':
            if (servicesAndModulesList.indexOf('REG_TRACKER') === -1) {
              permissionsFlag = true;
            }
            break;
          case '/registration':
            if (servicesAndModulesList.indexOf('REG_TRACKER_RECORDS') === -1) {
              permissionsFlag = true;
            }
            break;
          case '/report/summary':
            if (servicesAndModulesList.indexOf('REG_TRACKER_REPORTS') === -1) {
              permissionsFlag = true;
            }
            break;
          case '/report/device':
            if (servicesAndModulesList.indexOf('REG_TRACKER_REPORTS') === -1) {
              permissionsFlag = true;
            }
            break;
          case '/report/country':
            if (servicesAndModulesList.indexOf('REG_TRACKER_REPORTS') === -1) {
              permissionsFlag = true;
            }
            break;
          default:
            break;
        }
      }
      if (permissionsFlag) {
        next({
          path: '/PermissionAccess'
        });
      } else {
        next();
        this.emitter.emit('activeMenuTitle', to.meta.title);
      }
    }
  } else if (to.meta.title === 'Smart Exchange') {
    if (roleId && roleId === 5) {
      next();
      this.emitter.emit('activeMenuTitle', to.meta.title);
    } else {
      const userData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : await getUserData();
      const token = getCookie('Authorization').split('Bearer ')[1];
      const projects = await checkSmartExchangeProjects(token);
      if (projects && userData.account_type_id === 2) {
        next();
        this.emitter.emit('activeMenuTitle', to.meta.title);
      } else {
        const userId = localStorage.getItem('roleId');
        if (userId === '13') {
          next({
            path: '/compliancewire-marketplace',
          });
        } else {
          next({
            path: '/home',
          });
        }
      }
    }
  } else {
    next();
    this.emitter.emit('activeMenuTitle', to.meta.title);
  }
}
