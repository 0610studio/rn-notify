import { ReactNode } from "react";
import { TextProps, TouchableOpacityProps } from "react-native";

export interface NotifyProps {
    alertVisible: boolean;
    setAlertVisible: (visible: boolean) => void;
    // ---
    snackVisible: boolean;
    snackMessage: string;
    snackType: SnackType;
    setSnackVisible: (visible: boolean) => void;
    // ---
    bottomSheetVisible: boolean;
    setBottomSheetVisible: (visible: boolean) => void;
    // ---
    showAlert: (props: ShowAlertProps) => void;
    showSnackBar: (props: ShowSnackBarProps) => void;
    showBottomSheet: (props: ShowBottomSheetProps) => void;
    // ---
    hideNotify: (option: HideOption) => void;
}

export interface ShowBottomSheetProps {
    backgroundColor?: string;
    isBottomRadius?: boolean;
    marginHorizontal?: number;
    isHandleVisible?: boolean;
    marginBottom?: number;
    padding?: number;
    component: React.ReactNode;
    contentsGestureEnable?: boolean;
}

export interface CustomSnackbarProps {
    snackType: SnackType;
    snackMessage: string;
}

export interface NotifyProviderProps {
    children: ReactNode;
    customSnackbar?: (props: CustomSnackbarProps) => React.ReactNode;
}

export interface AlertAction {
    label: string;
    onPress?: () => void;
}

export interface ShowAlertProps {
    title: string;
    informative: string;
    actions: AlertActions;
    isBackgroundTouchClose?: boolean;
    titleStyle?: TextProps['style'];
    informativeStyle?: TextProps['style'];
    secondaryButtonStyle?: TouchableOpacityProps['style'];
    primaryButtonStyle?: TouchableOpacityProps['style'];
    secondaryButtonTextStyle?: TextProps['style'];
    primaryButtonTextStyle?: TextProps['style'];
    singleButtonTextStyle?: TextProps['style'];
}

export interface AlertActions {
    primary: AlertAction;
    secondary?: AlertAction;

}

export type SnackType = 'success' | 'error' | '';

export type HideOption = 'all' | 'snack' | 'alert' | 'bottomSheet';

export interface ShowSnackBarProps {
    message: string;
    type?: SnackType;
}

export interface BottomSheetRef {
    handleVisible: (isOpen: boolean) => void;
}