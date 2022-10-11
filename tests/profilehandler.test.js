import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileHandler from '../screens/ProfileHandle';

// comprobamos que la información del usuario se compruebe correctamente
// requerimos ver el uso de la base de datos.

test('renders correctly', () => {
    const tree = TestRenderer.create(<ProfileHandler />).toJSON();
    expect(tree).toMatchSnapshot();
});
