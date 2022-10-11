import React from 'react';
import TestRenderer from 'react-test-renderer';
import Auth from '../screens/Auth';

test('renders correctly', () => {
    const tree = TestRenderer.create(<Auth />).toJSON();
    expect(tree).toMatchSnapshot();
});
