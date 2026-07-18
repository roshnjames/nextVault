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
        padding:'3%',
        backgroundColor:'rgb(22, 11, 65)'
    },
    contentHolder:{
        flex:1,
        paddingTop:'5%',
        backgroundColor:'rgb(22, 11, 65)',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        gap:'5%'
    },
    taskNameHolder:{
        flex:0.1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    addTaskLabelText:{
        flex:0.4,
        height:'100%',
        fontFamily:'monospace',
        color:'rgb(32, 167, 171)',
        fontWeight:'bold',
        textAlign:'center',
        textAlignVertical:'center',
    },
    textInputBox:{
        flex:0.6,
        height:'100%',
        borderWidth:2,
        borderColor:'rgb(26, 153, 115)',
        borderRadius:10,
    },
    addTaskScreenTextStyle:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgb(46, 138, 163)'
    },
    dropDownPicker:{
        flex:0.6,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    addTaskPicker:{
        width:'60%'
    },
    addTaskSwitchText:{
        height:'100%',
        fontSize:20,
        fontFamily:'sans-serif',
        color:'rgb(32, 167, 171)',
        fontWeight:'bold',
        textAlign:'right',
        textAlignVertical:'center',
    },
    addTaskCameraBtn:{
        width: '60%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20
    }
});
export default addTaskScreenStyles;