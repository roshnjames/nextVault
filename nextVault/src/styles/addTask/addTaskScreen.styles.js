import { StyleSheet } from "react-native";

const addTaskScreenStyles = () => StyleSheet.create({
    majorContainer: {
        flex: 1,
        backgroundColor: 'rgb(71, 141, 195)',
        alignItems:'center',
        justifyContent:'center'
    },
    innerContainer: {
        flex:0.99,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around',
        width: '98%',
        height:'98%',
        borderRadius:'2%',
        backgroundColor:'rgb(22, 11, 65)'
    },
    addTaskScreenTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgb(46, 138, 163)'
    },
});
export default addTaskScreenStyles;