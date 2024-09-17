import { ActivityIndicator, StyleSheet, BackHandler } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ReactNode, useEffect } from "react";
import { useNotify } from "../../model/useNotify";
import { modalBgColor } from "../../model/constants";

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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backgroundColor: modalBgColor,
        ...StyleSheet.absoluteFillObject
    }
});


export default LoadingNotify;