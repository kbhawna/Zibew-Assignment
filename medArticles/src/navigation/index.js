import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ArticleScreen, ArticleDetailScreen} from '../containers';

export const ARTICLE_SCREEN_ROUTE = 'ArticleScreen';
export const ARTICLE_DETAIL_SCREEN_ROUTE = 'ArticleDetailScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ArticleScreen"
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen
        name="ArticleDetailScreen"
        component={ArticleDetailScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
