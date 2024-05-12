import { createContext, useContext, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { AlertActions, BottomSheetRef, NotifyProps, NotifyProviderProps, ShowAlertProps, ShowSnackBarProps, SnackType } from './types';
import AlertNotify from '../ui/AlertNotify';
import SnackbarNotify from '../ui/SnackbarNotify';
import BottomSheetNotify from '../ui/BottomSheetNotify';

const ThemeContext = createContext<NotifyProps | null>(null);

export const useNotify = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useNotify must be used within a ThemeProvider');
    }
    return context;
}

export const NotifyProvider: React.FC<NotifyProviderProps> = ({ customSnackbar, children }) => {
    const [title, setTitle] = useState<string>('');
    const [informative, setInformative] = useState<string>('');
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [actions, setActions] = useState<AlertActions>();
    const [isBackgroundTouchClose, setIsBackgroundTouchClose] = useState<boolean>(true);

    const [snackVisible, setSnackVisible] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');
    const [snackType, setSnackType] = useState<SnackType>('');

    const [contentsGestureEnable, setContentsGestureEnable] = useState<boolean>(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
    const [bottomSheetComponent, setBottomSheetComponent] = useState<React.ReactNode>(false);
    const [bottomSheetPadding, setBottomSheetPadding] = useState<number>(0);
    const [bottomSheetMarginX, setBottomSheetMarginX] = useState<number>(0);
    const [isBottomRadius, setIsBottomRadius] = useState<boolean>(true);
    const [handleVisible, setHandleVisible] = useState<boolean>(true);
    const [marginBottomBS, setMarginBottomBs] = useState<number>(0);
    const bottomSheetRef = useRef<BottomSheetRef | null>(null);


    const showAlert = ({
        title,
        informative,
        actions,
        isBackgroundTouchClose = true
    }: ShowAlertProps) => {
        Keyboard.dismiss();
        setTitle(title);
        setInformative(informative);
        setActions(actions);
        setIsBackgroundTouchClose(isBackgroundTouchClose);
        setAlertVisible(true);
    };

    const showSnackBar = ({
        message,
        type = 'success'
    }: ShowSnackBarProps) => {
        Keyboard.dismiss();
        setSnackMessage(message);
        setSnackType(type);
        setSnackVisible(true);
    };

    const showBottomSheet = ({
        isHandleVisible = true,
        component,
        contentsGestureEnable = true,
        marginHorizontal = 20,
        padding = 20,
        marginBottom = 0,
        isBottomRadius = true
    }: {
        isHandleVisible?: boolean;
        component: React.ReactNode;
        contentsGestureEnable?: boolean;
        marginHorizontal?: number;
        padding?: number;
        marginBottom?: number;
        isBottomRadius?: boolean;
    }) => {
        Keyboard.dismiss();
        setHandleVisible(isHandleVisible);
        setBottomSheetPadding(padding);
        setContentsGestureEnable(contentsGestureEnable);
        setBottomSheetComponent(component);
        setMarginBottomBs(marginBottom);
        setBottomSheetMarginX(marginHorizontal);
        setIsBottomRadius(isBottomRadius);
        bottomSheetRef.current?.handleVisible(true);
    };

    return (
        <ThemeContext.Provider value={{
            alertVisible,
            setAlertVisible,
            actions,
            isBackgroundTouchClose,
            title,
            informative,
            // ---
            snackVisible,
            snackMessage,
            snackType,
            setSnackVisible,
            // ---
            bottomSheetVisible,
            setBottomSheetVisible,
            // ---
            showAlert,
            showSnackBar,
            showBottomSheet
        }}>
            {children}

            <AlertNotify />
            <SnackbarNotify
                customSnackbar={customSnackbar}
            />
            <BottomSheetNotify
                ref={bottomSheetRef}
                contentsGestureEnable={contentsGestureEnable}
                bottomSheetComponent={bottomSheetComponent}
                bottomSheetPadding={bottomSheetPadding}
                marginBottomBS={marginBottomBS}
                isHandleVisible={handleVisible}
                bottomSheetMarginX={bottomSheetMarginX}
                isBottomRadius={isBottomRadius}
            />
        </ThemeContext.Provider>
    );
}
