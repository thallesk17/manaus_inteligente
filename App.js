import React from 'react';

import RootStack from './navigators/RootStack';
import { UserProvider } from './components/UserContext';

export default function App() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
  );
}
