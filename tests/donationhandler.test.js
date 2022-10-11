import React from 'react';
import TestRenderer from 'react-test-renderer';
import DonationHandler from '../screens/DonationHandler';

// Prueba en que comprobamos que se haga un handle correcto y sus componentes

test('renders correctly', () => {
    const tree = TestRenderer.create(
        <DonationHandler />
    ).toJSON();
    expect(tree)
        .toMatchSnapshot();
});
