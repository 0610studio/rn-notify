import { createContext, useContext, useRef, useState } from 'react';
import { Keyboard, TextProps, TouchableOpacityProps } from 'react-native';
import { AlertActions, BottomSheetRef, HideOption, NotifyProps, NotifyProviderProps, ShowAlertProps, ShowBottomSheetProps, ShowSnackBarProps, SnackType } from './types';
import AlertNotify from '../ui/AlertNotify';
import SnackbarNotify from '../ui/SnackbarNotify';
import BottomSheetNotify from '../ui/BottomSheetNotify';

const NotifyContext = createContext<NotifyProps | null>(null);

export const useNotify = () => {
    const context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }
    return context;
}

export const NotifyProvider: React.FC<NotifyProviderProps> = ({ customSnackbar, children }) => {
    const [title, setTitle] = useState<string>('');
    const [informative, setInformative] = useState<string>('');
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [actions, setActions] = useState<AlertActions>();
    const [isBackgroundTouchClose, setIsBackgroundTouchClose] = useState<boolean>(true);
    const [titleStyle, setTitleStyle] = useState<TextProps['style']>();
    const [informativeStyle, setInformativeStyle] = useState<TextProps['style']>();
    const [secondaryButtonStyle, setSecondaryButtonStyle] = useState<TouchableOpacityProps['style']>();
    const [primaryButtonStyle, setPrimaryButtonStyle] = useState<TouchableOpacityProps['style']>();
    const [secondaryButtonTextStyle, setSecondaryButtonTextStyle] = useState<TextProps['style']>();
    const [primaryButtonTextStyle, setPrimaryButtonTextStyle] = useState<TextProps['style']>();
    const [singleButtonTextStyle, setSingleButtonTextStyle] = useState<TextProps['style']>();

    const [snackVisible, setSnackVisible] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('');
    const [snackType, setSnackType] = useState<SnackType>('');

    const [contentsGestureEnable, setContentsGestureEnable] = useState<boolean>(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
    const [bottomSheetBackgroundColor, setBottomSheetBackgroundColor] = useState<string>('#ffffff');
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
        isBackgroundTouchClose = true,
        titleStyle,
        informativeStyle,
        secondaryButtonStyle,
        primaryButtonStyle,
        secondaryButtonTextStyle,
        primaryButtonTextStyle,
        singleButtonTextStyle
    }: ShowAlertProps) => {
        Keyboard.dismiss();
        setTitle(title);
        setInformative(informative);
        setActions(actions || {} as AlertActions);
        setIsBackgroundTouchClose(isBackgroundTouchClose);
        setAlertVisible(true);

        setTitleStyle(titleStyle);
        setInformativeStyle(informativeStyle);
        setSecondaryButtonStyle(secondaryButtonStyle);
        setPrimaryButtonStyle(primaryButtonStyle);
        setSecondaryButtonTextStyle(secondaryButtonTextStyle);
        setPrimaryButtonTextStyle(primaryButtonTextStyle);
        setSingleButtonTextStyle(singleButtonTextStyle);
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
        marginHorizontal = 10,
        padding = 20,
        marginBottom = 10,
        backgroundColor = '#ffffff',
        isBottomRadius = true
    }: ShowBottomSheetProps) => {
        Keyboard.dismiss();
        setHandleVisible(isHandleVisible);
        setBottomSheetPadding(padding);
        setContentsGestureEnable(contentsGestureEnable);
        setBottomSheetComponent(component);
        setMarginBottomBs(marginBottom);
        setBottomSheetMarginX(marginHorizontal);
        setIsBottomRadius(isBottomRadius);
        setBottomSheetBackgroundColor(backgroundColor);
        bottomSheetRef.current?.handleVisible(true);
    };

    const hideNotify = (option: HideOption) => {
        if (option === 'all') {
            setAlertVisible(false);
            setSnackVisible(false);
            setBottomSheetVisible(false);
        } else if (option === 'alert') {
            setAlertVisible(false);
        } else if (option === 'snack') {
            setSnackVisible(false);
        } else if (option === 'bottomSheet') {
            setBottomSheetVisible(false);
        }
    };


    return (
        <NotifyContext.Provider value={{
            alertVisible,
            setAlertVisible,
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
            showBottomSheet,
            // ---
            hideNotify,
        }}>
            {children}

            <BottomSheetNotify
                ref={bottomSheetRef}
                contentsGestureEnable={contentsGestureEnable}
                bottomSheetComponent={bottomSheetComponent}
                bottomSheetPadding={bottomSheetPadding}
                marginBottomBS={marginBottomBS}
                isHandleVisible={handleVisible}
                bottomSheetMarginX={bottomSheetMarginX}
                isBottomRadius={isBottomRadius}
                bottomSheetBackgroundColor={bottomSheetBackgroundColor}
            />

            <SnackbarNotify
                customSnackbar={customSnackbar}
            />

            <AlertNotify
                title={title}
                informative={informative}
                actions={actions || {} as AlertActions}
                isBackgroundTouchClose={isBackgroundTouchClose}
                titleStyle={titleStyle}
                informativeStyle={informativeStyle}
                secondaryButtonStyle={secondaryButtonStyle}
                primaryButtonStyle={primaryButtonStyle}
                secondaryButtonTextStyle={secondaryButtonTextStyle}
                primaryButtonTextStyle={primaryButtonTextStyle}
                singleButtonTextStyle={singleButtonTextStyle}
            />
        </NotifyContext.Provider>
    );
}
