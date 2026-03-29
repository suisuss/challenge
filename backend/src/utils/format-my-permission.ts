import { getAccessItemHierarchy } from './get-access-item-hierarchy';

interface Permission {
  id: number;
  name: string;
  path: string;
  icon?: string;
  parent_path: string | null;
  hierarchy_id: number;
  type: string;
}

export const formatMyPermission = (permissions: Permission[]) => {
  const menuList = ['menu', 'menu-screen'];
  const menus = permissions.filter((p) => menuList.includes(p.type));
  const hierarchialMenus = getAccessItemHierarchy(menus);
  const uis = permissions.filter((p) => p.type !== 'api');
  const apis = permissions.filter((p) => p.type === 'api');

  return {
    hierarchialMenus,
    uis,
    apis
  };
};
