import { Image, Modal, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { popupComponentImages } from "../images/imageLoader";
import popupComponentStyles from "../styles/popupComponent/popupComponent.styles";

const PopupComponent = ({
    visible = false,
    buttonCount = 1,
    popupText = ''
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
                            <Text style={styles.popupText}>renderedddd</Text>
                        </View>
                        <View style={styles.buttonHolder}>
                            <Text>isoifisifjsoij</Text>
                        </View>
                    </View>
                    
                </View>
            </SafeAreaView>

        </Modal>
    )
};

export default PopupComponent;