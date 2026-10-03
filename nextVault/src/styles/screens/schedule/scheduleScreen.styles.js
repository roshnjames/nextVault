import { StyleSheet } from "react-native";

const scheduleScreenStyles = (height, width) => StyleSheet.create({
    majorContainer: {
        flex: 1,
        backgroundColor: '#08031bff',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    calendarContainer: {
        marginVertical: height * 0.01,
        backgroundColor: '#ffffff',
        width: '90%',
        borderColor: '#adb6b2ff',
        borderRadius: '2%',
        padding: '1%',
    },
    calendarTheme: {
        calendarBackground: '#2375b4ff',
        monthTextColor: '#000000ff',
        textMonthFontWeight: 'bold',
        textMonthFontSize: 20,
        textSectionTitleColor: '#210d50ff',
        dayTextColor: '#43136fff',
        todayTextColor: '#0baf0eff',
        selectedDayBackgroundColor: '#1bcd21ff',
        selectedDayTextColor: '#ffffff',
        arrowColor: '#000000ff',
        textDayFontSize: 18,
        textDayHeaderFontSize: 16,
    },
    markedDate: {
        selected: true,
        selectedColor: '#209274ff',
    },
    bottomSectionContainer: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 'auto',
        height: '47%',
        gap: height * 0.05,
    },
    displayDayDetailsContainer: {
        alignItems:'center',
        justifyContent:'space-between',
        height : height * 0.06,
        width : '100%',
    },
    displayDayDetailDateContainer: {
        alignItems:'center',
        justifyContent:'center'
    },
    displayDayDetailTasksContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    dayDetailsDateText:{
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:18,
        color:'rgb(18, 185, 185)',
        textAlign:'center'
    },
    dayDetailsTasksText:{
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:16,
        color:'rgb(18, 124, 185)',
        textAlign:'center'
    },
    addTaskContainer: {
        width: "75%",
        height: height * 0.1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    addTaskButtonStyles: {
        flexDirection: 'row',
        width: "100%",
        height: '80%',
        borderColor: '#2ce9d6ff',
        borderWidth: 0.2,
        borderRadius: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: width * 0.03
    },
    addTaskImageStyle: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    addTaskButtonTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#879caaff'
    },
    bottomSectionLowerContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        width: "100%",
        height: '100%'
    },
    bottomSectionLowerIconStyles: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    lowerButtonsStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    lowerButtonTextStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c79a2aff'
    }
});

export default scheduleScreenStyles;