import React from 'react';
import { NotifyProvider } from './dist';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NotifyExample from './src';
import SnackBar from './src/Snackbar';

function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <NotifyProvider customSnackbar={SnackBar}>
        <NotifyExample />
      </NotifyProvider>
    </SafeAreaProvider>
  );
}

export default App;
