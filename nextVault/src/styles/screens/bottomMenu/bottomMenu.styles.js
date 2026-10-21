import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../../utils/dropDownValues";

const bottomMenuStyles = () => StyleSheet.create({
    mainContainer:{
        backgroundColor: '#65656cff',
        height : '9%',
        top: 0,
    },
    container:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    menuItem:{
        height: '100%',
        width: '25%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    bottomMenuImageStyle :{
        resizeMode: 'contain',
        height: '50%',
        width: '50%',

    },
    bottomMenuTextStyle:{
        fontSize: scaleFontSize(12),
        fontWeight: 'bold',
        lineHeight: 18,
    }
});

export default bottomMenuStyles;