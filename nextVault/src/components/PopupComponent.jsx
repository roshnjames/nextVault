import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { popupComponentImages } from "../images/imageLoader";
import { commonTexts } from "../strings/textLoader";
import popupComponentStyles from "../styles/popupComponent/popupComponent.styles";

const PopupComponent = ({
    visible = false,
    buttonCount = 1,
    popupText = '',
    setClosePopup
}) => {

    const styles = popupComponentStyles();
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <SafeAreaView style={styles.safeArea}>

                <View style={styles.majorContainer}>
                    <View style={styles.mainContainer}>
                        <View style={styles.iconHolder}>
                            <Image 
                                source = {popupComponentImages.INFO_ICON}
                                style = {styles.infoIcon}
                            />
                        </View>
                        <View style={styles.textHolder}>
                            <Text style={styles.popupText} adjustsFontSizeToFit >{popupText}</Text>
                        </View>
                        <View style={styles.buttonHolder}>
                            <TouchableOpacity 
                            style={styles.buttonStyle}
                            onPress={()=>setClosePopup(false)}
                            >
                            <Text style={styles.buttonText}>{commonTexts.OK}</Text>
                            </TouchableOpacity>
                            {buttonCount === 2 && (
                                <TouchableOpacity 
                                style={styles.buttonStyle}
                                onPress={()=>setClosePopup(false)}
                                >
                                <Text style={styles.buttonText}>{commonTexts.CANCEL}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    
                </View>
            </SafeAreaView>

        </Modal>
    )
};

export default PopupComponent;