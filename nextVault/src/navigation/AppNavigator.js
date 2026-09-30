import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { TaskContext } from '../context/taskDetails';
import { initDatabase } from '../database/database';
import AddTaskScreen from '../screens/addtask/AddTaskScreen';
import EditTaskScreen from '../screens/edittask/EditTaskScreen';
import HomeScreen from "../screens/homescreen/HomeScreen";
import ScheduleScreen from '../screens/schedule/ScheduleScreen';
import appHolderStyles from '../styles/navigator/appNavigator.styles';

const Stack = createNativeStackNavigator();
const styles = appHolderStyles();

const AppNavigator = () => {

  const { loading } = useContext(TaskContext);

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <StatusBar
          barStyle={styles.statusBarStyle.barStyle}
          backgroundColor={styles.statusBarStyle.backgroundColor}
        />
        <Header />
        <View style={styles.safeAreaViewStyle}>
          <Stack.Navigator
            initialRouteName="home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="schedule" component={ScheduleScreen} />
            <Stack.Screen name="addTask" component={AddTaskScreen} />
            <Stack.Screen name="editTask" component={EditTaskScreen} />
          </Stack.Navigator>

          <BottomMenu />
        </View>
        <Toast />
        {loading && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 2, 5, 0.5)'
          }}>
            <ActivityIndicator size="large" color="#3cf2f2" />
          </View>
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;
