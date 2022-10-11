import React from 'react';
import TestRenderer from 'react-test-renderer';
import DonationScreen from '../screens/DonationScreen';

// comprobamos que se hace el render correcto de los componentes de DonationScreen

test('renders correctly', () => {
    const tree = TestRenderer.create(<DonationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});