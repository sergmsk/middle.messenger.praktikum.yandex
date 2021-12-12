import pages from '../../pages';

export default (route: string): string => {
  const pagesTyped: {
    [key: string]: string;
  } = pages;

  return pagesTyped[route];
};