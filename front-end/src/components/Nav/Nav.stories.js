import React from 'react';
import { StoreProvider, createStore, action } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from '.';

export default {
  title: 'Components/Navbar',
  component: Nav,
};

const getWrapper = authenticated => {
  const initialState = { user: { authenticated, logout: action(() => ({})) } };
  const store = createStore(initialState);

  // eslint-disable-next-line react/display-name
  return storyFn => (
    <StoreProvider store={store}>
      <Router>{storyFn()}</Router>
    </StoreProvider>
  );
};

const authenticated = getWrapper(true);
const unauthenticated = getWrapper(false);

const links = [
  [
    { href: '/', text: 'Home' },
    { href: '/timeline', text: 'Timeline' },
    { href: '/sentiment-analysis', text: 'Sentiment Analysis' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
  ],
];

export const NavbarNoDivider = () =>
  unauthenticated(() => <Nav title="navbar" links={links} />);

export const NavbarWithDivider = () =>
  unauthenticated(() => (
    <Nav
      title="navbar-divider"
      links={[
        [
          { href: '/', text: 'Home' },
          { href: '/timeline', text: 'Timeline' },
          { href: '/sentiment-analysis', text: 'Sentiment Analysis' },
          { href: '/topic-modeling', text: 'Topic Modeling' },
          { href: '/latent-association', text: 'Latent Association' },
        ],
        [
          { href: '/about', text: 'About' },
          { href: '/docs', text: 'Docs' },
          { href: '/paper', text: 'Paper' },
        ],
      ]}
    />
  ));

export const NavbarAuthenticated = () =>
  authenticated(() => <Nav title="navbar" links={links} />);
