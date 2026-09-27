import { StyleSheet } from "react-native";

const homeScreenStyles = () => StyleSheet.create({
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
        flex:0.05,
        flexDirection:'row',
        width:'100%',
        backgroundColor:'rgb(4, 30, 59)',
        justifyContent:'space-around',
        alignItems:'center'
    },
    filterText:{
        fontFamily:'monospace',
        fontSize:16,
        color:'cyan'
    },
    filterButtonContainer:{
        flex:0.5,
        height:'80%',
        backgroundColor:'rgb(88, 178, 14)',
        justifyContent:'center',
        alignItems:'center'
    },
    tasksContainer: {
        flex: 0.95,
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
        height: 220,
        flexDirection: 'column',
        backgroundColor: 'rgb(32, 78, 131)',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgb(1, 3, 0)', 
        overflow: 'hidden',  
    },
    taskItemContent:{
        flex: 0.78,
        width: '98%',
        flexDirection: 'column',
    },
    taskItemNameContainer:{
        flex: 0.28,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal:'2%'
    },
    taskItemIndexContainer:{
        width:'7%',
        borderWidth:1,
        borderColor:'black',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:4
    },
    taskItemIndexText:{
        fontSize:16,
        fontWeight:'bold',
        fontFamily:'monospace',
        fontStyle:'normal'
    },
    taskItemNameMainContainer:{
        maxWidth:'80%',
        overflow:'hidden',
        alignItem:'center',
        justifyContent:'center'
    },
    taskItemNameText:{
        fontSize:15,
        fontWeight:'400',
        fontFamily:'monospace',
        fontStyle:'normal'
    },
    taskItemAlarmContainer:{
        width:'3%',
        alignItems:'center',
        justifyContent:'center'
    },
    taskItemAlarmImage:{
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    taskItemDetailsContainer:{
        flex: 0.72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskItemDetailsMainContainer:{
        width:'49%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        backgroundColor:'rgb(39, 28, 118)'
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
        width: '50%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    taskItemButtonsContainer: {
        flex: 0.2,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgb(80, 176, 32)'
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
