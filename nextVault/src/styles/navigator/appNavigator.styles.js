import { StyleSheet } from "react-native";

const appHolderStyles = () => StyleSheet.create({
    statusBarStyle: {
        backgroundColor: "rgb(255, 255, 255)",
        barStyle: "dark-content"
    },
    safeAreaViewStyle:{
        flex: 1,
    },
    majorContinerStyle: {
        flex: 1,
        backgroundColor: '#0a111fff',
    },
});

export default appHolderStyles;