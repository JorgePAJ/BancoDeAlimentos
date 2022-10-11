import React from 'react';
import TestRenderer from 'react-test-renderer';
import SendDonation from '../screens/SendDonation';

// comprobamos que se hace el render del button sheet de mandar donacion

test('renders correctly', () => {
    const tree = TestRenderer.create(<SendDonation />).toJSON();
    expect(tree).toMatchSnapshot();
});
