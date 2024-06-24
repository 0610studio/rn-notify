import { BackHandler, Dimensions, LayoutChangeEvent, Pressable, StyleSheet } from "react-native";
import { PopOverMenuProps } from "../../model/types";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp } from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
import { useNotify } from "../../model/useNotify";

const WINDOW_HEIGHT = Dimensions.get('window').height;

const PopOverMenu = ({
    px,
    py,
    component
}: PopOverMenuProps) => {
    const [isContentsVisible, setIsContentsVisible] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
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
        setHeight(event.nativeEvent.layout?.height || 0);
    };

    useEffect(() => {
        if (popOverVisible) {
            setTimeout(() => {
                setIsContentsVisible(true);
            }, 200);
        };
    }, [popOverVisible]);

    const isVerticalReverse = WINDOW_HEIGHT < (py + height);
    const isHorizontalReverse = Dimensions.get('window').width > (px + width);

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
                                <Pressable style={{ position: 'absolute', top: py - (isVerticalReverse ? (height + 10) : 0), left: px - width + (isHorizontalReverse ? width : 0) }} onLayout={onLayout}>
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