import { StyleSheet } from "react-native";
import { scaleFontSize } from "../../../utils/dropDownValues";

const settingsScreenStyles = (height,width) => StyleSheet.create({
     majorContainer:{
        flex:1,
        backgroundColor: 'rgb(34, 176, 208)',
        alignItems:'center',
        justifyContent:'center'
    },
    mainContainer:{
        width:'99.5%',
        height:'99.5%',
        backgroundColor: '#08031bff',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    topBarContainer: {
        flex: 0.08,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    itemScroller:{
        flex:1,
        width:'100%'
    },
    itemContainer:{
        marginHorizontal:'5%',
        height:height * 0.12,
        width:'90%',
        paddingHorizontal:'4%',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'center',
        borderBottomColor:'cyan',
        borderBottomWidth:0.25,
    },
    itemButton:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    itemHeader:{
        flex:0.5,
        width:'100%',
        alignItems:'flex-start',
        justifyContent:'flex-end'
    },
    itemHeaderText:{
        fontSize:scaleFontSize(20),
        fontFamily:'monospace',
        color:'cyan',
        fontWeight:'condensed'
    },
    itemDetails:{
        flex:0.25,
        width:'100%',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    itemDetailsText:{
        fontSize:scaleFontSize(10),
        fontFamily:'monospace',
        color:'rgb(11, 139, 167)',
        fontWeight:'400'
    },
});

export default settingsScreenStyles;