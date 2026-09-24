import { StyleSheet } from "react-native";

const homeScreenStyles = () => StyleSheet.create({
    majorContainer:{
        flex:1,
        backgroundColor: '#a4d022ff',
        alignItems:'center',
        justifyContent:'center'
    },
    mainContainer:{
        width:'99%',
        height:'99%',
        flexDirection:'column',
        backgroundColor: 'rgb(25, 177, 200)',
        alignItems:'center',
    },
    filterContainer:{
        flex:0.1,
        flexDirection:'row',
        width:'100%',
        backgroundColor:'rgb(4, 30, 59)',
        justifyContent:'space-around',
        alignItems:'center'
    },
    filterText:{
        fontFamily:'monospace',
        fontSize:18,
        color:'cyan'
    },
    filterButtonContainer:{
        flex:0.5,
        height:'80%',
        backgroundColor:'rgb(88, 178, 14)',
        justifyContent:'center',
        alignItems:'center'
    },
    tasksCOntainer:{
        flex:0.9,
        width:'100%',
        backgroundColor:'rgb(13, 125, 142)',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default homeScreenStyles;
