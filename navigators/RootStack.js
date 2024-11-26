import React from 'react';

import { Colors } from './../components/styles';
const { darkLight, brand, primary, tertiary, secondary } = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import LocalScreen from './../screens/LocalScreen';
import LocalDetailScreen from './../screens/LocalDetailScreen';
import UserScreen from './../screens/UserScreen';
import ExploreScreen from './../screens/ExploreScreen';
import FavoriteScreen from './../screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer style={{ backgroundColor: 'red' }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          options={{
            headerTintColor: primary,
          }}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen name="Locais" component={LocalScreen} />
        <Stack.Screen name="LocalDetailScreen" component={LocalDetailScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
