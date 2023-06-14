import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MyComponent from './MyComponent';
const App = () => {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
};
export default App; 