import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PopupComponent from "../../components/PopupComponent";
import useSettingsViewModel from "../../viewmodels/settings/useSettingsViewModel";

const SettingsScreen = () => {
    const settingsModel = useSettingsViewModel();

    useFocusEffect(
        useCallback(() => {
            settingsModel.setHeader(settingsModel.settingsScreenTexts.HEADER);
        }, [])
    );

    return (
        <View style={settingsModel.styles.majorContainer}>
            <View style={settingsModel.styles.mainContainer}>
                <ScrollView
                    style={settingsModel.styles.itemScroller}
                    showsVerticalScrollIndicator={true}
                >
                    {settingsModel?.settingsScreenContentList?.map((item, index) => {
                        return (
                            <View style={settingsModel.styles.itemContainer} key={index}>
                                <TouchableOpacity 
                                    style={settingsModel.styles.itemButton}
                                    {...(item?.value !== 0 && {
                                        onPress: () => {
                                            settingsModel.setSelectedItem(item?.value),
                                            settingsModel.handleSettingsItemPress(index)},
                                    })}
                                >
                                    <View style={settingsModel.styles.itemHeader}>
                                        <Text style={settingsModel.styles.itemHeaderText}>
                                            {item?.label}
                                        </Text>
                                    </View>
                                    <View style={settingsModel.styles.itemDetails}>
                                        <Text style={settingsModel.styles.itemDetailsText}>
                                            {typeof item?.details === 'function'
                                                ? item?.details()
                                                : item?.details
                                            }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )})
                    }
                </ScrollView>
            </View>
            {settingsModel.popupVisible && (
                <PopupComponent 
                    visible={settingsModel.popupVisible}
                    popupText={settingsModel.popupText}
                    setClosePopup={settingsModel.setPopupVisible}
                />
            )}
            {settingsModel.settingsPopupVisible && (
                    <PopupComponent
                        visible={settingsModel.settingsPopupVisible}
                        buttonCount={2}
                        popupText={settingsModel.settingsPopupText}
                        handleLeftButtonClick={()=>settingsModel.handleLeftButtonPress()}
                        setClosePopup={()=>settingsModel.setSettingsPopupVisible(false)}
                    />
                )} 
        </View>
    )
};

export default SettingsScreen;