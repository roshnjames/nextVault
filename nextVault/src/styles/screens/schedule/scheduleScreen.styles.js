import { StyleSheet } from "react-native";

const scheduleScreenStyles = (height) => StyleSheet.create({
    majorContainer: {
        flex: 1,
        backgroundColor: '#08031bff',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        height: "8%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2%'
    },
    heading: {
        fontSize: height * 0.025,
        fontWeight: 'bold',
        color: '#879caaff',
        lineHeight: height * 0.028,
    },
    calendarContainer: {
        marginVertical: height * 0.01,
        backgroundColor: '#ffffff',
        width: '90%',
        borderColor: '#adb6b2ff',
        borderRadius: '2%',
        padding: '1%'
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
});

export default scheduleScreenStyles;