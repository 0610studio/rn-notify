import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, Keyboard, TextProps, TouchableOpacityProps } from 'react-native';
import { AlertActions, BottomSheetRef, HideOption, NotifyProps, NotifyProviderProps, PopOverMenuProps, ShowAlertProps, ShowBottomSheetProps, ShowSnackBarProps, SnackItem } from './types';
import AlertNotify from '../ui/AlertNotify';
import SnackbarNotify from '../ui/SnackbarNotify';
import BottomSheetNotify from '../ui/BottomSheetNotify';
import LoadingNotify from '../ui/LoadingNotify';
import PopOverMenu from '../ui/PopOver/PopOverMenu';

const BS_MAX_HEIGHT = Dimensions.get('window').height - 120;

const NotifyContext = createContext<NotifyProps | null>(null);

export const useNotify = () => {
    const context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }
    return context;
}

export const NotifyProvider: React.FC<NotifyProviderProps> = ({
    customSnackbar,
    loaderComponent,
    children
}) => {
    // Alert
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

    // Snackbar
    const [snackItemStack, setSnackItemStack] = useState<SnackItem[]>([]);

    // BottomSheet
    const [contentsGestureEnable, setContentsGestureEnable] = useState<boolean>(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
    const [bottomSheetBackgroundColor, setBottomSheetBackgroundColor] = useState<string>('#ffffff');
    const [bottomSheetComponent, setBottomSheetComponent] = useState<React.ReactNode>(false);
    const [bottomSheetPadding, setBottomSheetPadding] = useState<number>(0);
    const [bottomSheetMarginX, setBottomSheetMarginX] = useState<number>(0);
    const [bottomSheetMaxHeight, setBottomSheetMaxHeight] = useState<number>(BS_MAX_HEIGHT);
    const [bottomSheetScrollView, setBottomSheetScrollView] = useState<boolean>(true);
    const [isBottomRadius, setIsBottomRadius] = useState<boolean>(true);
    const [handleVisible, setHandleVisible] = useState<boolean>(true);
    const [marginBottomBS, setMarginBottomBs] = useState<number>(0);
    const bottomSheetRef = useRef<BottomSheetRef | null>(null);

    // Loading
    const [loaderVisible, setLoaderVisible] = useState<boolean>(false);

    // PopOver
    const [popOverVisible, setPopOverVisible] = useState<boolean>(false);
    const [popOverLocation, setPopOverLocation] = useState<{ px: PopOverMenuProps['px'], py: PopOverMenuProps['py'] }>({ px: 0, py: 0 });
    const [popOverComponent, setPopOverComponent] = useState<React.ReactNode>(false);

    // ---
    const [fontFamily, setFontFamily] = useState<string | undefined>(undefined);


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
        singleButtonTextStyle,
        fontFamily
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

        setFontFamily(fontFamily);
    };

    const showBottomSheet = ({
        isHandleVisible,
        component,
        contentsGestureEnable,
        marginHorizontal,
        padding,
        marginBottom,
        backgroundColor,
        isBottomRadius,
        maxHeight,
        isScrollView
    }: ShowBottomSheetProps) => {
        Keyboard.dismiss();
        isHandleVisible && setHandleVisible(isHandleVisible);
        padding && setBottomSheetPadding(padding);
        contentsGestureEnable && setContentsGestureEnable(contentsGestureEnable);
        marginBottom && setMarginBottomBs(marginBottom);
        marginHorizontal && setBottomSheetMarginX(marginHorizontal);
        isBottomRadius && setIsBottomRadius(isBottomRadius);
        backgroundColor && setBottomSheetBackgroundColor(backgroundColor);
        maxHeight && setBottomSheetMaxHeight(maxHeight);
        isScrollView && setBottomSheetScrollView(isScrollView);
        setBottomSheetComponent(component);
        bottomSheetRef.current?.handleVisible(true);
    };

    const showLoader = () => {
        setLoaderVisible(true);
    };

    const showPopOverMenu = ({
        px,
        py,
        component
    }: PopOverMenuProps) => {
        setPopOverLocation({ px, py });
        setPopOverComponent(component);
        setPopOverVisible(true);
    }

    const showSnackBar = ({
        message,
        type = 'success',
        index = Date.now(),
        snackbarDuration = 3000
    }: ShowSnackBarProps) => {
        // TODO: 스택 쌓고싶은데 삭제될 때 참조를 잃어서 삭제가 안되는 문제가 있음.
        setSnackItemStack((prev) => {
            if (prev.length === 0) {
                return [...prev, { message, type, index: index, snackbarDuration: snackbarDuration }];
            } else {
                return prev;
            };
        });
    };

    const hideSnackBar = (index: number) => {
        setSnackItemStack((prev) => prev.filter((item) => item.index !== index));
    };

    const hideNotify = useCallback((option: HideOption) => {
        switch (option) {
            case 'alert':
                setAlertVisible(false);
                break;
            case 'snack':
                setSnackItemStack([]);
                break;
            case 'bottomSheet':
                bottomSheetRef.current?.handleVisible(false);
                break;
            case 'loader':
                setLoaderVisible(false);
                break;
            case 'popOver':
                setPopOverVisible(false);
                break;
            case 'all':
                setAlertVisible(false);
                setSnackItemStack([]);
                setLoaderVisible(false);
                setPopOverVisible(false);
                bottomSheetRef.current?.handleVisible(false);
                break;
            default:
                break;
        };
    }, []);


    return (
        <NotifyContext.Provider value={{
            alertVisible,
            setAlertVisible,
            // ---
            snackItemStack,
            hideSnackBar,
            // ---
            bottomSheetVisible,
            setBottomSheetVisible,
            // ---
            loaderVisible,
            // ---
            popOverVisible,
            setPopOverVisible,
            // ---
            showAlert,
            showSnackBar,
            showBottomSheet,
            showLoader,
            showPopOverMenu,
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
                maxHeight={bottomSheetMaxHeight}
                isScrollView={bottomSheetScrollView}
            />

            <PopOverMenu
                px={popOverLocation?.px}
                py={popOverLocation?.py}
                component={popOverComponent}
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
                fontFamily={fontFamily}
            />

            <LoadingNotify
                loaderComponent={loaderComponent}
            />
        </NotifyContext.Provider>
    );
}
