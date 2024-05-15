/// <reference types="react" />
import { GestureType } from 'react-native-gesture-handler';
interface Props {
    marginBottomBS: number;
    bottomSheetPadding: number;
    closeOffset: number;
    contentsGestureEnable: boolean;
    isHandleVisible: boolean;
    bottomSheetMarginX: number;
}
declare const useBottomSheetNotify: ({ marginBottomBS, bottomSheetPadding, closeOffset, contentsGestureEnable, bottomSheetMarginX, isHandleVisible, }: Props) => {
    bottomSheetVisible: boolean;
    bsAnimatedStyle: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
        } | {
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
        })[];
    };
    onGestureEvent: import("react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture").PanGesture;
    handleVisible: (isOpen: boolean) => void;
    screenWidth: import("react-native-reanimated").SharedValue<number>;
    screenHeight: import("react-native-reanimated").SharedValue<number>;
    handleHeight: number;
    openPosition: import("react-native-reanimated").SharedValue<number>;
    correction: number;
    bottomSheetPadding: number;
    onTapEvent: import("react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture").TapGesture;
    panGestureRef: import("react").MutableRefObject<GestureType>;
    listScrollPosition: import("react-native-reanimated").SharedValue<number>;
    bsModalBgStyle: {
        backgroundColor: string;
    };
    backgroundPressHandler: () => void;
};
export default useBottomSheetNotify;
//# sourceMappingURL=useBottomSheetNotify.d.ts.map