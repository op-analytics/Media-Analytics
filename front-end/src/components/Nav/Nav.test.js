import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider, createStore, action } from 'easy-peasy';
import Nav from '.';

const linksNoDivider = [
  [
    { href: '/', text: 'Home' },
    { href: '/timeline', text: 'Timeline' },
    { href: '/sentiment-analysis', text: 'Sentiment Analysis' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
  ],
];

const getWrapper = authenticated => {
  const initialState = { user: { authenticated, logout: action(() => ({})) } };
  const store = createStore(initialState);
  // eslint-disable-next-line react/display-name
  return storyFn =>
    mount(
      <StoreProvider store={store}>
        <Router>{storyFn()}</Router>
      </StoreProvider>,
    );
};

const authenticated = getWrapper(true);
const unauthenticated = getWrapper(false);

describe('Nav', () => {
  it('Should render a logout button when authenticated', () => {
    const nav = authenticated(() => (
      <Nav title="Title" links={linksNoDivider} />
    ));
    expect(nav.exists('[data-test="logout"]')).toBe(true);
  });

  it('Should render a login button when unauthenticated', () => {
    const nav = unauthenticated(() => (
      <Nav title="Title" links={linksNoDivider} />
    ));
    expect(nav.exists('[data-test="login"]')).toBe(true);
  });
});
