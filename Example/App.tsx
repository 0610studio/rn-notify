import React from 'react';
import { NotifyProvider } from './dist';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotifyExample from './src';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <NotifyProvider>
        <NotifyExample />
      </NotifyProvider>
    </SafeAreaProvider>
  );
}

export default App;
