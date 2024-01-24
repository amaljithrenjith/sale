// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import HeaderTable from './components/HeaderTable';
import DetailTable from './components/DetailTable';

const SalesEntry = () => {
  return (
    <Provider store={store}>
      <div>
        <HeaderTable />
        <DetailTable />
      </div>
    </Provider>
  );
};

export default SalesEntry;

