import React from 'react';
import {Provider} from 'react-redux';
import Navigator from './src/navigation';
import NavigationService from './src/navigation/NavigationService';
import configureStore from './src/redux/store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
};

export default App;
