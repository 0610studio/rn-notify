import { ReactNode } from "react";

export interface NotifyProps {
    alertVisible: boolean;
    setAlertVisible: (visible: boolean) => void;
    actions?: AlertActions;
    isBackgroundTouchClose: boolean;
    title: string;
    informative: string;
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
    showBottomSheet: (props: { isBottomRadius?: boolean; marginHorizontal?: number; isHandleVisible?: boolean; marginBottom?: number; padding?: number; component: React.ReactNode; contentsGestureEnable?: boolean }) => void;
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
}

export interface AlertActions {
    primary: AlertAction;
    secondary?: AlertAction;

}

export type SnackType = 'success' | 'error' | '';

export interface ShowSnackBarProps {
    message: string;
    type?: SnackType;
}

export interface BottomSheetRef {
    handleVisible: (isOpen: boolean) => void;
}