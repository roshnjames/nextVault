import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppHolder from './src/holders/appHolder';

const App = () => {
  return (
    <SafeAreaProvider >
      <AppHolder />
    </SafeAreaProvider>
  );
};

export default App;