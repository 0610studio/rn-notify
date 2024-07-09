import { ActivityIndicator, Dimensions, StyleSheet, BackHandler } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ReactNode, useEffect } from "react";
import { useNotify } from "../../model/useNotify";

const LoadingNotify = ({
    loaderComponent
}: {
    loaderComponent?: () => ReactNode
}) => {
    const { loaderVisible } = useNotify();

    useEffect(() => {
        const handleBackPressed = () => {
            if (loaderVisible) return true;
            return false;
        };

        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPressed,
        );
        return () => handler.remove();
    }, [loaderVisible]);

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
        backgroundColor: '#212B3688',
        zIndex: 9999,
        bottom: 0
    }
});


export default LoadingNotify;