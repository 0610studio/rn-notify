/// <reference types="react" />
import { ViewProps } from 'react-native';
import { BottomSheetNotifyRef } from './types';
interface Props extends ViewProps {
    marginBottomBS: number;
    bottomSheetPadding: number;
    bottomSheetBackgroundColor: string;
    closeOffset?: number;
    contentsGestureEnable: boolean;
    bottomSheetComponent: React.ReactNode;
    isHandleVisible: boolean;
    bottomSheetMarginX: number;
    isBottomRadius: boolean;
    maxHeight: number;
}
declare const BottomSheetNotify: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<BottomSheetNotifyRef>>;
export default BottomSheetNotify;
//# sourceMappingURL=index.d.ts.map