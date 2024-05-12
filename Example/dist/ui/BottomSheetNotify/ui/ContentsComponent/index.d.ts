/// <reference types="react" />
import { GestureType } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";
interface Props {
    panGestureRef: React.MutableRefObject<GestureType>;
    listScrollPosition: SharedValue<number>;
    handleHeight: number;
    openPosition: SharedValue<number>;
    correction: number;
    screenHeight: SharedValue<number>;
    bottomSheetComponent: React.ReactNode;
    bottomSheetPadding: number;
}
declare const ContentsComponent: ({ panGestureRef, listScrollPosition, handleHeight, openPosition, correction, screenHeight, bottomSheetComponent, bottomSheetPadding }: Props) => import("react").JSX.Element;
export default ContentsComponent;
//# sourceMappingURL=index.d.ts.map