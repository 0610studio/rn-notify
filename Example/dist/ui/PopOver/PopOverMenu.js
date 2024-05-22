import { BackHandler, Dimensions, Pressable, StyleSheet } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
import Animated, { FadeIn, FadeInUp, FadeOut, FadeOutUp } from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
var PopOverMenu = function (_a) {
    var px = _a.px, py = _a.py, component = _a.component;
    var _b = useState(false), isContentsVisible = _b[0], setIsContentsVisible = _b[1];
    var _c = useState(0), width = _c[0], setWidth = _c[1];
    var _d = useNotify(), popOverVisible = _d.popOverVisible, setPopOverVisible = _d.setPopOverVisible;
    var backPressHandler = useCallback(function () {
        if (popOverVisible) {
            setIsContentsVisible(false);
            setPopOverVisible(false);
            return true;
        }
        return false;
    }, [popOverVisible, setIsContentsVisible]);
    useEffect(function () {
        var backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);
        return function () { return backHandler.remove(); };
    }, [backPressHandler]);
    var onLayout = function (event) {
        var _a;
        setWidth(((_a = event.nativeEvent.layout) === null || _a === void 0 ? void 0 : _a.width) || 0);
    };
    useEffect(function () {
        if (popOverVisible) {
            setTimeout(function () {
                setIsContentsVisible(true);
            }, 200);
        }
        ;
    }, [popOverVisible]);
    return (popOverVisible ?
        <Animated.View style={styles.modalBg} entering={FadeIn} exiting={FadeOut}>
                <Pressable style={{ width: '100%', height: '100%' }} onPress={function () { setPopOverVisible(false); }}>
                    {isContentsVisible && (<Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                                <Pressable style={{ position: 'absolute', top: py, left: px - width }} onLayout={onLayout}>
                                    {component}
                                </Pressable>
                            </Animated.View>)}
                </Pressable>
            </Animated.View>
        : null);
};
var styles = StyleSheet.create({
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
//# sourceMappingURL=PopOverMenu.js.map