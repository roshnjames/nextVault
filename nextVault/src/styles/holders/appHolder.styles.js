import { StyleSheet } from "react-native";

const appHolderStyles = () => StyleSheet.create({
    statusBarStyle: {
        backgroundColor: "#ffffffff",
        barStyle: "dark-content"
    },
    safeAreaViewStyle:{
        flex: 1,
    },
    majorContinerStyle: {
        flex: 1,
        backgroundColor: '#2258cdff',
    },
});

export default appHolderStyles;