import { StyleSheet } from "react-native";

const addNoteScreenStyles = () => StyleSheet.create({
    majorContainer:{
        flex:1,
        backgroundColor: 'rgb(34, 176, 208)',
        alignItems:'center',
        justifyContent:'center'
    },
    mainContainer:{
        width:'99.5%',
        height:'99.5%',
        flexDirection:'column',
        backgroundColor: '#08031bff',
        alignItems:'center',
    },
    topBarContainer:{
        flex:0.08,
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-evenly',
        backgroundColor:'cyan'
    },
    contentHolder:{
        flex:0.87,
        paddingTop:'10%',
        backgroundColor:'rgb(22, 11, 65)',
        width:'100%',
        alignItems:'center',
        justifyContent:'flex-start',
        borderRadius:10,
        gap:'5%'
    },
    addNoteNameHolder:{
        flex:0.15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    addNoteLabelText:{
        flex:0.3,
        width:'100%',
        fontFamily:'monospace',
        color:'rgb(32, 167, 171)',
        fontWeight:'bold',
        textAlign:'left',
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
    addNoteDetailHolder:{
        flex: 0.6, 
        width:'91%',
        flexDirection:'column',
        alignItems:'center',

    },
    textDetailInputBox:{
        flex:0.9,
        width:'100%',
        borderWidth:0.5,
        borderColor:'rgb(26, 153, 115)',
        borderRadius:10,
        color:'rgb(27, 150, 159)',
        textAlignVertical:'top'
    },
    newNoteHolder : {
        flex:0.13,
        width:'85%',
        alignItems:'center',
        justifyContent:'center',
    },
    newNoteButton:{
        flex:0.7,
        width:'85%',
        borderColor:'cyan',
        borderWidth:1,
        borderRadius:25,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        zIndex:10,
        gap:'3%'
    },
    noteAddButonImage:{
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    noteAddButtonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#879caaff'
    },
});

export default addNoteScreenStyles;