import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../../utils/dropDownValues";

const addTaskScreenStyles = () => StyleSheet.create({
    loadingOverlay:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 2, 5, 0.5)'
    },
    majorContainer: {
        flex: 1,
        backgroundColor: 'rgb(7, 4, 41)',
        alignItems:'center',
        justifyContent:'center'
    },
    innerContainer: {
        flex:0.99,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'flex-start',
        width: '98%',
        height:'98%',
        padding:'3%',
    },
    contentHolder:{
        flex:0.9,
        paddingTop:'5%',
        backgroundColor:'rgb(22, 11, 65)',
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        borderRadius:10,
        gap:'2.5%'
    },
    taskNameHolder:{
        flex:0.13,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    addTaskLabelText:{
        flex:0.35,
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
        borderWidth:0.5,
        borderColor:'rgb(26, 153, 115)',
        borderRadius:10,
        color:'rgb(27, 150, 159)'
    },
     filterDateText:{
        height:'80%',
        width:'60%',
        textAlign:'center',
        textAlignVertical:'center',
        fontFamily:'monospace',
        fontSize:scaleFontSize(13),
        color:'cyan',
        backgroundColor:'rgb(44, 55, 108)',
        borderRadius:15,
        borderColor:'cyan',
        borderWidth:1,
    },
    addTaskScreenTextStyle:{
        fontSize:scaleFontSize(17),
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
        width:'60%',
        color:'rgb(32, 167, 171)'
    },
    addTaskSwitchText:{
        height:'100%',
        fontSize:scaleFontSize(19),
        fontFamily:'sans-serif',
        color:'rgb(32, 167, 171)',
        fontWeight:'bold',
        textAlign:'right',
        textAlignVertical:'center',
    },
    addTaskCameraBtn:{
        width: '60%',
        height: '70%',
        backgroundColor: 'rgb(44, 55, 108)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20
    },
    addTaskImageCaptured:{
        height:'70%',
        width:'80%',
        backgroundColor:'cyan',
        borderRadius:10
    },
    addTaskSubmitBtnHolder:{
        flex:0.1,
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    addTaskBtn:{
        height:'85%',
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'rgb(32, 167, 171)',
        borderRadius:15
    },
    addTaskBtnText:{
        fontSize:scaleFontSize(19),
        fontFamily:'Times New Roman',
        fontStyle:'italic',
        fontWeight:'bold',
        color:'rgb(32, 167, 171)'
    }
});
export default addTaskScreenStyles;