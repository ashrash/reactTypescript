import * as React from 'react';
import { describe, expect, it } from '@jest/globals';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
  it('should render Header component', () => {
    const wrapper = shallow(
      <Header />
    );
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('tr').text()).toEqual('User Hobbies');
  });
});
