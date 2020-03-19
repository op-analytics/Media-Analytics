import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
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

const mockStore = configureStore();

const getWrapper = authenticated => {
  const initialState = { user: { authenticated } };
  const store = mockStore(initialState);
  //eslint-disable-next-line react/display-name
  return storyFn =>
    mount(
      <Provider store={store}>
        <Router>{storyFn()}</Router>
      </Provider>,
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
