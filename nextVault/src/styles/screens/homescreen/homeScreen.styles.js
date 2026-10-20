import { StyleSheet } from "react-native";

const homeScreenStyles = (height, width) => StyleSheet.create({
    majorContainer:{
        flex:1,
        backgroundColor: 'rgb(34, 176, 208)',
        alignItems:'center',
        justifyContent:'center'
    },
    mainContainer:{
        width:'99%',
        height:'99%',
        flexDirection:'column',
        backgroundColor: '#08031bff',
        alignItems:'center',
    },
    noTaskContainer:{
        flex:1,
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    taskAddButton:{
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addtaskItemImage:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    addTaskText:{
        fontFamily:'monospace',
        fontWeight:'bold',
        fontFamily:'normal',
        fontSize:18,
        color:'cyan',
        marginTop:'2%'
    },
    filterContainer:{
        flex:0.075,
        flexDirection:'row',
        width:'100%',
        backgroundColor:'rgb(4, 30, 59)',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    filterButton:{
        width:'70%',
        height:'60%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    },
    filterText:{
        fontFamily:'monospace',
        fontSize:14,
        color:'cyan',
    },
    filterDateText:{
        fontFamily:'monospace',
        fontSize:13,
        color:'cyan',
        color:'black'
    },
    filterButtonContainer:{
        flex:0.4,
        height:'70%',
        backgroundColor:'rgb(14, 164, 178)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        borderWidth:2,
        borderColor:'rgb(166, 216, 234)'
    },
    tasksContainer: {
        flex: 0.925,
        width: '100%',
        backgroundColor: '#08031bff',
        paddingTop:'2%'
    },
    tasksList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    taskItemContainer: {
        width: '90%',
        height: height * 0.55,
        flexDirection: 'column',
        backgroundColor: 'rgb(18, 52, 124)',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%',
        borderRadius: 10,
        borderWidth: 5,
        borderColor: 'rgb(18, 52, 124)', 
        overflow: 'hidden',  
    },
    taskItemContent:{
        flex: 0.899,
        width: '98%',
        flexDirection: 'column',
    },
    taskItemNameContainer:{
        flex: 0.11,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:'2%',
    },
    taskItemIndexContainer:{
        width:'7%',
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:4,
        backgroundColor:'rgba(176, 176, 176, 0.53)'
    },
    taskItemIndexText:{
        fontSize:16,
        fontWeight:'bold',
        fontFamily:'monospace',
        fontStyle:'normal'
    },
    taskItemNameMainContainer:{
        width:'80%',
        overflow:'hidden',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    taskItemNameText:{
        fontSize:15,
        fontWeight:'bold',
        fontFamily:'monospace',
        fontStyle:'normal',
        color:'rgb(241, 234, 238)'
    },
    taskItemAlarmContainer:{
        width:'7%',
        alignItems:'center',
        justifyContent:'center'
    },
    taskItemAlarmImage:{
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    taskItemDetailsContainer:{
        flex: 0.89,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    taskItemDetailsMainContainer:{
        height:'50%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        borderTopWidth: 1,
        borderTopColor: 'rgb(122, 160, 231)',
    },
    taskItemDetailsText:{
        textAlign:'center',
        fontFamily:'monospace',
        fontSize:13,
        fontStyle:'normal',
        color:'cyan',
        padding:'1.5%'
    },
    taskItemImage:{
        height:'50%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
        borderWidth:2,
        borderColor:'black'
    },
    taskItemButtonsContainer: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: 'rgb(122, 160, 231)'
    },
    taskItemButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskItemButtonImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

export default homeScreenStyles;
