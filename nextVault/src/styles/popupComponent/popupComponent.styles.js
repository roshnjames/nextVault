import { StyleSheet } from "react-native";

const popupComponentStyles = () => StyleSheet.create({
    safeArea:{
        flex:1
    },
    majorContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(165, 188, 192, 0.5)',
    },
    mainContainer:{
        minHeight: '35%',
        width:'85%',
        backgroundColor:'rgb(7, 13, 74)',
        borderWidth:1,
        borderColor:'cyan',
        borderRadius:'5%',
        padding:'5%',
        alignItems:'center',
        justifyContent:'space-between',
        gap:'2%'
    },
    iconHolder:{
        flex:0.15,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    infoIcon:{
        height:'99%',
        width:'20%',
        resizeMode:'contain',
    },
    textHolder:{
        flex:0.6,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        padding:'3%',
    },
    popupText:{
        fontFamily:'monospace',
        fontSize:18,
        color:'cyan',
        textAlign:'center'
    },
    buttonHolder:{
        flex:0.25,
        flexDirection:'row',
        gap:'3%',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    buttonStyle:{
        flex:1,
        height:'90%',
        backgroundColor:'cyan',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25
    },
    buttonText:{
        fontFamily:'monospace',
        fontSize:18,
        color:'black'
    }
});

export default popupComponentStyles;