import { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler, Dimensions, Keyboard, Platform } from 'react-native';
import { Gesture, GestureType } from 'react-native-gesture-handler';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    runOnJS,
} from 'react-native-reanimated';

const DIMENSIONS_HEIGHT = Dimensions.get('window').height;
const INPUT_HEIGHT_CORRECTION = 40; // 인풋 높이 보정
const NATURAL_GESTURE_TOP = -17; // 자연스러운 제스쳐를 위해 상단 여유 공간 추가
const NATURAL_GESTURE_X = 8;
const DEFAULT_BG_OPACITY = 40;
const HANDLE_HEIGHT = 35;

const timingConfig100 = {
    duration: 100,
    easing: Easing.inOut(Easing.quad)
};

const timingConfig200 = {
    duration: 200,
    easing: Easing.inOut(Easing.quad)
};

interface Props {
    marginBottomBS: number;
    bottomSheetPadding: number;
    closeOffset: number;
    contentsGestureEnable: boolean;
    isHandleVisible: boolean;
    bottomSheetMarginX: number;
}

const useBottomSheetNotify = ({
    bottomSheetPadding,
    closeOffset,
    contentsGestureEnable,
    bottomSheetMarginX,
    isHandleVisible,
}: Props) => {
    const handleHeight = isHandleVisible ? HANDLE_HEIGHT : 0;
    const panGestureRef = useRef<GestureType>(Gesture.Pan());
    const listScrollPosition = useSharedValue(0);
    const gestureComponent = useSharedValue('');
    const tabAbsoluteY = useSharedValue(0);
    const screenWidth = useSharedValue((Dimensions.get('window').width));
    const screenHeight = useSharedValue(1);
    const openPosition = useSharedValue(0);
    const bsScale = useSharedValue(1);
    const bgOpacity = useSharedValue(DEFAULT_BG_OPACITY);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(closeOffset);
    const fullScreen = useSharedValue(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const bsModalBgStyle = useAnimatedStyle(() => ({
        backgroundColor: `#1E1E1E${bgOpacity.value}`,
    }));

    const bsAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: bsScale.value }
        ],
    }));

    const initBottomSheet = useCallback(() => {
        screenHeight.value = 1;
        openPosition.value = 0;
    }, []);

    const backPressHandler = useCallback(() => {
        if (bottomSheetVisible) {
            setBottomSheetVisible(false);
            return true;
        }
        return false;
    }, [bottomSheetVisible, setBottomSheetVisible]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);

        return () => backHandler.remove();
    }, [backPressHandler]);


    useEffect(() => {
        if (!bottomSheetVisible)
            initBottomSheet();
    }, [bottomSheetVisible]);


    const backgroundPressHandler = () => {
        if (isKeyboardVisible) {
            Keyboard.dismiss();
        } else {
            handleVisible(false);
        };
    };

    const dismissKeyboard = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    const initSize = useCallback(() => {
        bsScale.value = withTiming(1, timingConfig100);
        translateX.value = withTiming(0, timingConfig100);
        bgOpacity.value = DEFAULT_BG_OPACITY;
    }, []);

    // ** 소프트 키보드 핸들링
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', (event) => {
            setIsKeyboardVisible(true);
            if (!fullScreen.value) return;
            const tabAbsoluteYValue = tabAbsoluteY.value;
            const screenTopToTarget = tabAbsoluteYValue - openPosition.value; // 모달 상단에서 인풋까지 거리
            const keyboardHeight = event.endCoordinates.height; // 키보드 높이
            const keyboardLine = DIMENSIONS_HEIGHT - keyboardHeight;

            translateY.value = withTiming(keyboardLine - screenTopToTarget - INPUT_HEIGHT_CORRECTION, timingConfig200);
        });

        const keyboardDidHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
            setIsKeyboardVisible(false);

            // 키보드가 사라질 때 화면의 높이를 원래대로 돌립니다.
            if (!fullScreen.value) return;
            handleVisible(true);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const openBottomSheet = () => {
        setTimeout(() => {
            if (screenHeight.value === 1)
                return openBottomSheet();
            translateY.value = withTiming(openPosition.value, timingConfig200);
            fullScreen.value = true;
        }, 200);
    }

    const handleVisible = (isOpen: boolean) => {
        if (isOpen) {
            setBottomSheetVisible(true);
            openBottomSheet();

        } else {
            translateY.value = withTiming(closeOffset, timingConfig200);
            fullScreen.value = false;
            setTimeout(() => {
                setBottomSheetVisible(false);
            }, 200);
        }
    }

    const onTapEvent = Gesture.Tap()
        .onStart((event) => {
            tabAbsoluteY.value = event.absoluteY;
        })


    const onGestureEvent = Gesture.Pan()
        .onStart((event) => {
            'worklet';
            runOnJS(dismissKeyboard)();

            // 제스쳐 영역
            if ((openPosition.value + handleHeight) > event.absoluteY) {
                gestureComponent.value = 'Handler';
                bsScale.value = withTiming(0.98, timingConfig100);

            } else {
                gestureComponent.value = 'Contents';
                if (contentsGestureEnable)
                    bsScale.value = withTiming(0.98, timingConfig100);
            }
        })
        .onUpdate((event) => {
            'worklet';
            // 제스쳐 제어
            if (!contentsGestureEnable && gestureComponent.value === 'Contents') return;

            const translateXValue = event.translationX;
            const translateYValue = event.translationY;
            const calcBg = Math.round(DEFAULT_BG_OPACITY + (translateYValue * -1));

            // TODO: list가 상단에 닿으면 BottomSheet 동작.
            // if (gestureComponent.value === 'Contents' && fullScreen.value && listScrollPosition.value > 10) return;

            // 백그라운드 컬러
            if (calcBg < 70 && calcBg > DEFAULT_BG_OPACITY) {
                bgOpacity.value = calcBg;
            };

            // 자연스러운 움직임을 위한 상단 여유 공간
            if (NATURAL_GESTURE_X > translateXValue && translateXValue > -NATURAL_GESTURE_X && bsScale.value !== 1) {
                translateX.value = translateXValue;
            };

            if (fullScreen.value && translateYValue < NATURAL_GESTURE_TOP) return;
            if (!fullScreen.value && translateYValue > 0 && translateY.value === closeOffset) return;


            const result = translateYValue + (fullScreen.value ? openPosition.value : (30));
            translateY.value = result;
        })
        .onEnd(() => {
            'worklet';
            runOnJS(initSize)();
            const shouldOpen = translateY.value < openPosition.value + (screenHeight.value / 2);
            if (shouldOpen) {
                runOnJS(handleVisible)(true);
            } else {
                runOnJS(handleVisible)(false);
            }
        })
        .withRef(panGestureRef);


    screenWidth.value = (Dimensions.get('window').width) - (bottomSheetMarginX ? bottomSheetMarginX * 2 : 0);

    return {
        HANDLE_HEIGHT,
        bottomSheetVisible,
        bsAnimatedStyle,
        onGestureEvent,
        handleVisible,
        screenWidth,
        screenHeight,
        handleHeight,
        openPosition,
        bottomSheetPadding,
        onTapEvent,
        panGestureRef,
        listScrollPosition,
        bsModalBgStyle,
        backgroundPressHandler
    }
}


export default useBottomSheetNotify;