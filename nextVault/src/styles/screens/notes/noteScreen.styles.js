import { StyleSheet } from "react-native";

const noteScreenStyles = () => StyleSheet.create({
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
    notesListContainer: {
        flex: 0.92,
        width: '100%',
        backgroundColor: '#08031bff',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop:'2%'
    },
    notesList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    noteItemContainer: {
        width: '97%',
        height: 160,
        flexDirection: 'row',
        backgroundColor:'rgb(9, 187, 160)',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgb(82, 231, 8)', 
        overflow: 'hidden',  
    },
    noteItemIndexContainer:{
        flex:0.1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    noteItemIndexText:{
        fontSize:25,
        fontWeight:'bold',
        fontFamily:'monospace',
        fontStyle:'normal'
    },
    noteItemContentContainer:{
        flex:0.9,
        height:'100%',
        alignItems:'center',
        backgroundColor: 'rgb(171, 255, 248)',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        overflow:'hidden'
    },
    noteItemContentHeader:{
        flex:0.25,
        width:'100%',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft:'5%'
    },
    noteItemContentHeaderText:{
        fontSize:15,
        fontWeight:'bold',
        fontFamily:'monospace',
        fontStyle:'normal'
    },
    noteItemContentItem:{
        flex:0.7,
        width:'100%',
        margin:'2%',
        borderTopColor:'black',
        borderTopWidth:1,
        borderTopRadius:50,
        paddingLeft:'5%',
        paddingTop:'3%',
    },
    noteItemContentItemText:{
        fontSize:14,
        fontWeight:'black',
        fontStyle:'normal'
    },
    newNoteHolder : {
        bottom:'2%',
        height:'8%',
        width:'85%',
        borderColor:'cyan',
        borderWidth:2,
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
    }
});

export default noteScreenStyles;