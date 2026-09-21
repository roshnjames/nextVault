import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { TaskContextProvider } from '../context/taskDetails';
import HomeScreen from "../screens/homescreen/HomeScreen";
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import appHolderStyles from '../styles/navigator/appNavigator.styles';
import AddTaskScreen from '../styles/screens/addtask/AddTaskScreen';

const Stack = createNativeStackNavigator();
const styles = appHolderStyles();

const AppNavigator = () => {
  return (
    <TaskContextProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <StatusBar
            barStyle={styles.statusBarStyle.barStyle}
            backgroundColor={styles.statusBarStyle.backgroundColor}
          />
          <Header/>
          <View style={styles.safeAreaViewStyle}>
            <Stack.Navigator
              initialRouteName="schedule"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="schedule" component={ScheduleScreen} />
              <Stack.Screen name="addTask" component={AddTaskScreen} />
            </Stack.Navigator>

            <BottomMenu />
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </TaskContextProvider>
  );
};

export default AppNavigator;
