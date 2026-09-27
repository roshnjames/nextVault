import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { TaskContext } from "../context/taskDetails";
import { headerImages } from "../images/imageLoader";
import headerStyles from "../styles/screens/Header/Header.styles";

const Header = () => {
    const { header, disableBackButton } = useContext(TaskContext);
    const {height,width} = useWindowDimensions();
    const styles = headerStyles(height,width);
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View>
                    {!disableBackButton && <TouchableOpacity
                        onPress={()=>navigation?.goBack()}
                    >
                        <Image
                            source={headerImages.BACK_ARROW}
                            style={styles.backArrowStyle}
                        />
                    </TouchableOpacity>
                    }
                </View>
                <Text style={styles.headerTextStyle}>
                    {header}
                </Text>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('home')}
                >
                    <Image
                        source={headerImages.SETTINGS}
                        style={styles.backArrowStyle}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Header;