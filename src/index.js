import './style/style.css';
import "flowbite";
import routes from './js/routes';
import pageDetails from './js/pageDetails';
import pageList from './js/pageList';

const callRoute = () => {
  const { hash } = window.location;

  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', () => callRoute());
window.addEventListener('DOMContentLoaded', () => callRoute());