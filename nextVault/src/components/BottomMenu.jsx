import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { bottomMenuImages } from "../images/imageLoader";
import { bottomMenuTexts } from "../strings/textLoader";
import bottomMenuStyles from "../styles/screens/bottomMenu/bottomMenu.styles";

const BottomMenu = () => {
    const styles = bottomMenuStyles();
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('home')}
                >
                    <Image
                        source = {bottomMenuImages.CURRENT_TASK}  
                        style={styles.bottomMenuImageStyle} 
                    />
                    <Text style={styles.bottomMenuTextStyle}>
                        {bottomMenuTexts.CURRENT_TASK}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigation.navigate('schedule')}
                >
                    <Image
                        source = {bottomMenuImages.CALENDAR}  
                        style={styles.bottomMenuImageStyle} 
                    />
                    <Text style={styles.bottomMenuTextStyle}>
                        {bottomMenuTexts.CALENDAR}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.menuItem}
                >
                    <Image
                        source = {bottomMenuImages.EDIT_TASKS}  
                        style={styles.bottomMenuImageStyle} 
                    />
                    <Text style={styles.bottomMenuTextStyle}>
                        {bottomMenuTexts.EDIT_TASKS}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default BottomMenu;