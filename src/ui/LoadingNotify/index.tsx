import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNotify } from "../../model/useNotifyProvider";
import { ReactNode } from "react";

const LoadingNotify = ({
    loaderComponent
}: {
    loaderComponent?: () => ReactNode
}) => {
    const {
        loaderVisible,
    } = useNotify();

    return loaderVisible ? (
        <Animated.View
            style={styles.modalBg}
            entering={FadeIn}
            exiting={FadeOut}
        >
            {
                loaderComponent ?
                    loaderComponent()
                    : <ActivityIndicator size="large" color="#fff" />
            }
        </Animated.View>
    ) : null;
}

const styles = StyleSheet.create({
    modalBg: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212B3699',
        zIndex: 9999,
    }
});


export default LoadingNotify;