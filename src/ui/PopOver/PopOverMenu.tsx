import { Dimensions, Pressable, StyleSheet } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
import { PopOverMenuProps } from "../../model/types";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const PopOverMenu = ({
    px,
    py,
    component
}: PopOverMenuProps) => {
    const {
        popOverVisible,
        setPopOverVisible
    } = useNotify();

    return (
        popOverVisible ?
            <Animated.View
                style={styles.modalBg}
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Pressable style={{ width: '100%', height: '100%' }} onPress={() => { setPopOverVisible(false); }}>
                    <Pressable style={{ position: 'absolute', top: py, left: px }}>
                        {component}
                    </Pressable>
                </Pressable>
            </Animated.View>
            : null
    )
}

const styles = StyleSheet.create({
    modalBg: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212B3688',
        zIndex: 9997,
    }
});

export default PopOverMenu;