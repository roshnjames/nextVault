import { StyleSheet } from "react-native";

const headerStyles = (height,width) => StyleSheet.create({
     mainContainer:{
        backgroundColor: '#65656cff',
        height : '8%',
        bottom: 0,
    },
    container:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:width * 0.02
    },
    backArrowStyle:{
        resizeMode: 'contain',
        height: 40,
        width: 40,
    },
    headerTextStyle:{
        fontSize: 25,
        fontWeight: 'bold',
        color:'rgb(0, 0, 0)'
    }
});

export default headerStyles;