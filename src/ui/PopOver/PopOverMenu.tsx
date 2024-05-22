import { BackHandler, Dimensions, LayoutChangeEvent, Pressable, StyleSheet } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
import { PopOverMenuProps } from "../../model/types";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp } from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";

const PopOverMenu = ({
    px,
    py,
    component
}: PopOverMenuProps) => {
    const [isContentsVisible, setIsContentsVisible] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const {
        popOverVisible,
        setPopOverVisible
    } = useNotify();

    const backPressHandler = useCallback(() => {
        if (popOverVisible) {
            setIsContentsVisible(false);
            setPopOverVisible(false);
            return true;
        }
        return false;
    }, [popOverVisible, setIsContentsVisible]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);

        return () => backHandler.remove();
    }, [backPressHandler]);

    const onLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout?.width || 0);
    };

    useEffect(() => {
        if (popOverVisible) {
            setTimeout(() => {
                setIsContentsVisible(true);
            }, 200);
        };
    }, [popOverVisible]);

    return (
        popOverVisible ?
            <Animated.View
                style={styles.modalBg}
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Pressable style={{ width: '100%', height: '100%' }} onPress={() => { setPopOverVisible(false); }}>
                    {
                        isContentsVisible && (
                            <Animated.View
                                entering={FadeInUp}
                                exiting={FadeOutUp}
                            >
                                <Pressable style={{ position: 'absolute', top: py, left: px - width }} onLayout={onLayout}>
                                    {component}
                                </Pressable>
                            </Animated.View>
                        )
                    }
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