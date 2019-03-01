import React      from 'react';
import { render } from 'react-testing-library';

const HelloWorld = () => <h1>Hello World</h1>;
const { debug } = render( <HelloWorld /> );
debug();
// <div>
//   <h1>Hello World</h1>
// </div>
// you can also pass an element: debug(getByTestId('messages'))
