import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider >
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;