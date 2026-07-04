import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appHolderStyles from '../styles/holders/appHolder.styles';

const AppHolder = () => {
    const styles = appHolderStyles();
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <StatusBar
               barStyle={styles.statusBarStyle.barStyle}
               backgroundColor={styles.statusBarStyle.backgroundColor}
            />
            <View style={styles.majorContinerStyle}>
                <Text>
                    hELLO WORLD!
                </Text>
            </View>
        </SafeAreaView>
    );
}


export default AppHolder;