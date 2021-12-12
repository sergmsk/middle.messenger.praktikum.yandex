import pages from '../../pages';

import getRoute from "./getRoute";

/**
 * Роутер
 * - Получаем страницу
 * - Загружаем в страницу state
 * - Отдаем строку для render
 * @return { string } - строка для render
 */
export default (): string => {
  const route: string = getRoute();
  const checkRoute: boolean = pages.hasOwnProperty(route);
  return checkRoute ? route : '_404';
};