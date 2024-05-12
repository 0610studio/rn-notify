import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, Keyboard, Platform } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS, } from 'react-native-reanimated';
import { useNotify } from '../../../model/useNotifyProvider';
var DIMENSIONS_HEIGHT = Dimensions.get('window').height;
var INPUT_HEIGHT_CORRECTION = 55;
var NATURAL_GESTURE_TOP = -17;
var NATURAL_GESTURE_X = 8;
var DEFAULT_BG_OPACITY = 40;
var HANDLE_HEIGHT = 37;
var timingConfig100 = {
    duration: 100,
    easing: Easing.inOut(Easing.quad)
};
var timingConfig200 = {
    duration: 200,
    easing: Easing.inOut(Easing.quad)
};
var useBottomSheetNotify = function (_a) {
    var marginBottomBS = _a.marginBottomBS, bottomSheetPadding = _a.bottomSheetPadding, closeOffset = _a.closeOffset, contentsGestureEnable = _a.contentsGestureEnable, bottomSheetMarginX = _a.bottomSheetMarginX, isHandleVisible = _a.isHandleVisible;
    var _b = useNotify(), bottomSheetVisible = _b.bottomSheetVisible, setBottomSheetVisible = _b.setBottomSheetVisible;
    var handleHeight = isHandleVisible ? HANDLE_HEIGHT : 0;
    var correction = marginBottomBS
        + HANDLE_HEIGHT
        + (Platform.OS === 'android' ? -12 : 0);
    var panGestureRef = useRef(Gesture.Pan());
    var listScrollPosition = useSharedValue(0);
    var gestureComponent = useSharedValue('');
    var tabAbsoluteY = useSharedValue(0);
    var screenWidth = useSharedValue((Dimensions.get('window').width));
    var screenHeight = useSharedValue(1);
    var openPosition = useSharedValue(0);
    var bsScale = useSharedValue(1);
    var bgOpacity = useSharedValue(DEFAULT_BG_OPACITY);
    var translateX = useSharedValue(0);
    var translateY = useSharedValue(closeOffset);
    var fullScreen = useSharedValue(false);
    var _c = useState(false), isKeyboardVisible = _c[0], setIsKeyboardVisible = _c[1];
    var bsModalBgStyle = useAnimatedStyle(function () { return ({
        backgroundColor: "#1E1E1E".concat(bgOpacity.value),
    }); });
    var bsAnimatedStyle = useAnimatedStyle(function () { return ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: bsScale.value }
        ],
    }); });
    var backPressHandler = useCallback(function () {
        if (bottomSheetVisible) {
            setBottomSheetVisible(false);
            return true;
        }
        return false;
    }, [bottomSheetVisible, setBottomSheetVisible]);
    useEffect(function () {
        var backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);
        return function () { return backHandler.remove(); };
    }, [backPressHandler]);
    var backgroundPressHandler = function () {
        if (isKeyboardVisible) {
            Keyboard.dismiss();
        }
        else {
            handleVisible(false);
        }
        ;
    };
    var dismissKeyboard = useCallback(function () {
        Keyboard.dismiss();
    }, []);
    var initSize = useCallback(function () {
        bsScale.value = withTiming(1, timingConfig100);
        translateX.value = withTiming(0, timingConfig100);
        bgOpacity.value = DEFAULT_BG_OPACITY;
    }, []);
    useEffect(function () {
        var keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', function (event) {
            setIsKeyboardVisible(true);
            if (!fullScreen.value)
                return;
            var tabAbsoluteYValue = tabAbsoluteY.value;
            var screenTopToTarget = tabAbsoluteYValue - openPosition.value;
            var keyboardHeight = event.endCoordinates.height;
            var keyboardLine = DIMENSIONS_HEIGHT - keyboardHeight;
            translateY.value = withTiming(keyboardLine - screenTopToTarget - INPUT_HEIGHT_CORRECTION, timingConfig200);
        });
        var keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', function () {
            setIsKeyboardVisible(false);
            if (!fullScreen.value)
                return;
            handleVisible(true);
        });
        return function () {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    var openBottomSheet = function () {
        setTimeout(function () {
            if (screenHeight.value === 1)
                return openBottomSheet();
            translateY.value = withTiming(openPosition.value, timingConfig200);
            fullScreen.value = true;
        }, 100);
    };
    var handleVisible = function (isOpen) {
        if (isOpen) {
            setBottomSheetVisible(true);
            openBottomSheet();
        }
        else {
            translateY.value = withTiming(closeOffset, timingConfig200);
            fullScreen.value = false;
            setTimeout(function () {
                setBottomSheetVisible(false);
            }, 200);
        }
    };
    var onTapEvent = Gesture.Tap()
        .onStart(function (event) {
        tabAbsoluteY.value = event.absoluteY;
    });
    var onGestureEvent = Gesture.Pan()
        .onStart(function (event) {
        'worklet';
        runOnJS(dismissKeyboard)();
        bsScale.value = withTiming(0.98, timingConfig100);
        if ((openPosition.value + handleHeight + correction) > event.absoluteY) {
            gestureComponent.value = 'Handler';
        }
        else {
            gestureComponent.value = 'Contents';
        }
    })
        .onUpdate(function (event) {
        'worklet';
        var translateXValue = event.translationX;
        var translateYValue = event.translationY;
        var calcBg = Math.round(DEFAULT_BG_OPACITY + (translateYValue * -1));
        if (calcBg < 70 && calcBg > DEFAULT_BG_OPACITY) {
            bgOpacity.value = calcBg;
        }
        ;
        if (NATURAL_GESTURE_X > translateXValue && translateXValue > -NATURAL_GESTURE_X && bsScale.value !== 1) {
            translateX.value = translateXValue;
        }
        ;
        if (!contentsGestureEnable && gestureComponent.value === 'Contents')
            return;
        if (fullScreen.value && translateYValue < NATURAL_GESTURE_TOP)
            return;
        if (!fullScreen.value && translateYValue > 0 && translateY.value === closeOffset)
            return;
        var result = translateYValue + (fullScreen.value ? openPosition.value : (30));
        translateY.value = result;
    })
        .onEnd(function () {
        'worklet';
        runOnJS(initSize)();
        var shouldOpen = translateY.value < openPosition.value + (screenHeight.value / 2);
        if (shouldOpen) {
            runOnJS(handleVisible)(true);
        }
        else {
            runOnJS(handleVisible)(false);
        }
    })
        .withRef(panGestureRef);
    screenWidth.value = (Dimensions.get('window').width) - (bottomSheetMarginX ? bottomSheetMarginX * 2 : 0);
    return {
        bottomSheetVisible: bottomSheetVisible,
        bsAnimatedStyle: bsAnimatedStyle,
        onGestureEvent: onGestureEvent,
        handleVisible: handleVisible,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        handleHeight: handleHeight,
        openPosition: openPosition,
        correction: correction,
        bottomSheetPadding: bottomSheetPadding,
        onTapEvent: onTapEvent,
        panGestureRef: panGestureRef,
        listScrollPosition: listScrollPosition,
        bsModalBgStyle: bsModalBgStyle,
        backgroundPressHandler: backgroundPressHandler
    };
};
export default useBottomSheetNotify;
//# sourceMappingURL=useBottomSheetNotify.js.map