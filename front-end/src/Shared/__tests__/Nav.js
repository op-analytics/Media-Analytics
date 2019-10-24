import React from 'react';
import { shallow } from 'enzyme';
import Nav from '../Nav';

const links = [
  [
    { href: '/', text: 'Home' },
    { href: '/timeline', text: 'Timeline' },
    { href: '/sentiment-analasis', text: 'Sentiment Analysis' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
  ],
  [
    { href: '/about', text: 'About' },
    { href: '/docs', text: 'Docs' },
    { href: '/paper', text: 'Paper' },
  ],
];

const linksNoDivider = [
  [
    { href: '/', text: 'Home' },
    { href: '/timeline', text: 'Timeline' },
    { href: '/sentiment-analasis', text: 'Sentiment Analysis' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
  ],
];

const getWrapperWithDivider = () => shallow(<Nav title="Title" links={links} />);

const getWrapper = () => shallow(<Nav title="Title" links={linksNoDivider} />);

describe('Nav', () => {
  it('Should render', () => {
    const nav = getWrapper();
    expect(nav.exists('nav')).toEqual(true);
  });

  it('Should render correctly without divider', () => {
    const nav = getWrapper();
    expect(nav).toMatchSnapshot();
  });

  it('Should render correctly with divider', () => {
    const nav = getWrapperWithDivider();
    expect(nav).toMatchSnapshot();
  });
});
