import React from 'react';
import TestRenderer from 'react-test-renderer';
import WelcomeScreen from '../screens/WelcomeScreen';

//verificamos que se renderice correctamente la pantalla de inicio.

test('renders correctly', () => {
    const tree = TestRenderer.create(<WelcomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});
