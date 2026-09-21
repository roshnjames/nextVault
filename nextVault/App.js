import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskContextProvider } from './src/context/taskDetails';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider >
      <TaskContextProvider>
        <AppNavigator />
      </TaskContextProvider>
    </SafeAreaProvider>
  );
};

export default App;