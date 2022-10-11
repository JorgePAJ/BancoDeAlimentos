import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileScreen from '../screens/ProfileScreen';

test('renders correctly', () => {
    const tree = TestRenderer
        .create(
            <ProfileScreen />
        )
        .toJSON();
    expect(tree)
        .toMatchSnapshot();
});
