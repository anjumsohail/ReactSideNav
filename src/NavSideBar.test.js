// src/MyComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import NavSideBar from './NavSideBar';

test('renders MyComponent correctly', () => {
  const { getByText } = render(<NavSideBar />);

});
