import { createContext, useContext, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import AlertNotify from '../ui/AlertNotify';
import SnackbarNotify from '../ui/SnackbarNotify';
import BottomSheetNotify from '../ui/BottomSheetNotify';
var NotifyContext = createContext(null);
export var useNotify = function () {
    var context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }
    return context;
};
export var NotifyProvider = function (_a) {
    var customSnackbar = _a.customSnackbar, children = _a.children;
    var _b = useState(''), title = _b[0], setTitle = _b[1];
    var _c = useState(''), informative = _c[0], setInformative = _c[1];
    var _d = useState(false), alertVisible = _d[0], setAlertVisible = _d[1];
    var _e = useState(), actions = _e[0], setActions = _e[1];
    var _f = useState(true), isBackgroundTouchClose = _f[0], setIsBackgroundTouchClose = _f[1];
    var _g = useState(), titleStyle = _g[0], setTitleStyle = _g[1];
    var _h = useState(), informativeStyle = _h[0], setInformativeStyle = _h[1];
    var _j = useState(), secondaryButtonStyle = _j[0], setSecondaryButtonStyle = _j[1];
    var _k = useState(), primaryButtonStyle = _k[0], setPrimaryButtonStyle = _k[1];
    var _l = useState(), secondaryButtonTextStyle = _l[0], setSecondaryButtonTextStyle = _l[1];
    var _m = useState(), primaryButtonTextStyle = _m[0], setPrimaryButtonTextStyle = _m[1];
    var _o = useState(), singleButtonTextStyle = _o[0], setSingleButtonTextStyle = _o[1];
    var _p = useState(false), snackVisible = _p[0], setSnackVisible = _p[1];
    var _q = useState(''), snackMessage = _q[0], setSnackMessage = _q[1];
    var _r = useState(''), snackType = _r[0], setSnackType = _r[1];
    var _s = useState(false), contentsGestureEnable = _s[0], setContentsGestureEnable = _s[1];
    var _t = useState(false), bottomSheetVisible = _t[0], setBottomSheetVisible = _t[1];
    var _u = useState('#ffffff'), bottomSheetBackgroundColor = _u[0], setBottomSheetBackgroundColor = _u[1];
    var _v = useState(false), bottomSheetComponent = _v[0], setBottomSheetComponent = _v[1];
    var _w = useState(0), bottomSheetPadding = _w[0], setBottomSheetPadding = _w[1];
    var _x = useState(0), bottomSheetMarginX = _x[0], setBottomSheetMarginX = _x[1];
    var _y = useState(true), isBottomRadius = _y[0], setIsBottomRadius = _y[1];
    var _z = useState(true), handleVisible = _z[0], setHandleVisible = _z[1];
    var _0 = useState(0), marginBottomBS = _0[0], setMarginBottomBs = _0[1];
    var bottomSheetRef = useRef(null);
    var showAlert = function (_a) {
        var title = _a.title, informative = _a.informative, actions = _a.actions, _b = _a.isBackgroundTouchClose, isBackgroundTouchClose = _b === void 0 ? true : _b, titleStyle = _a.titleStyle, informativeStyle = _a.informativeStyle, secondaryButtonStyle = _a.secondaryButtonStyle, primaryButtonStyle = _a.primaryButtonStyle, secondaryButtonTextStyle = _a.secondaryButtonTextStyle, primaryButtonTextStyle = _a.primaryButtonTextStyle, singleButtonTextStyle = _a.singleButtonTextStyle;
        Keyboard.dismiss();
        setTitle(title);
        setInformative(informative);
        setActions(actions || {});
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
    var showSnackBar = function (_a) {
        var message = _a.message, _b = _a.type, type = _b === void 0 ? 'success' : _b;
        Keyboard.dismiss();
        setSnackMessage(message);
        setSnackType(type);
        setSnackVisible(true);
    };
    var showBottomSheet = function (_a) {
        var _b;
        var _c = _a.isHandleVisible, isHandleVisible = _c === void 0 ? true : _c, component = _a.component, _d = _a.contentsGestureEnable, contentsGestureEnable = _d === void 0 ? true : _d, _e = _a.marginHorizontal, marginHorizontal = _e === void 0 ? 10 : _e, _f = _a.padding, padding = _f === void 0 ? 20 : _f, _g = _a.marginBottom, marginBottom = _g === void 0 ? 10 : _g, _h = _a.backgroundColor, backgroundColor = _h === void 0 ? '#ffffff' : _h, _j = _a.isBottomRadius, isBottomRadius = _j === void 0 ? true : _j;
        Keyboard.dismiss();
        setHandleVisible(isHandleVisible);
        setBottomSheetPadding(padding);
        setContentsGestureEnable(contentsGestureEnable);
        setBottomSheetComponent(component);
        setMarginBottomBs(marginBottom);
        setBottomSheetMarginX(marginHorizontal);
        setIsBottomRadius(isBottomRadius);
        setBottomSheetBackgroundColor(backgroundColor);
        (_b = bottomSheetRef.current) === null || _b === void 0 ? void 0 : _b.handleVisible(true);
    };
    var hideNotify = function (option) {
        if (option === 'all') {
            setAlertVisible(false);
            setSnackVisible(false);
            setBottomSheetVisible(false);
        }
        else if (option === 'alert') {
            setAlertVisible(false);
        }
        else if (option === 'snack') {
            setSnackVisible(false);
        }
        else if (option === 'bottomSheet') {
            setBottomSheetVisible(false);
        }
    };
    return (<NotifyContext.Provider value={{
            alertVisible: alertVisible,
            setAlertVisible: setAlertVisible,
            snackVisible: snackVisible,
            snackMessage: snackMessage,
            snackType: snackType,
            setSnackVisible: setSnackVisible,
            bottomSheetVisible: bottomSheetVisible,
            setBottomSheetVisible: setBottomSheetVisible,
            showAlert: showAlert,
            showSnackBar: showSnackBar,
            showBottomSheet: showBottomSheet,
            hideNotify: hideNotify,
        }}>
            {children}

            <BottomSheetNotify ref={bottomSheetRef} contentsGestureEnable={contentsGestureEnable} bottomSheetComponent={bottomSheetComponent} bottomSheetPadding={bottomSheetPadding} marginBottomBS={marginBottomBS} isHandleVisible={handleVisible} bottomSheetMarginX={bottomSheetMarginX} isBottomRadius={isBottomRadius} bottomSheetBackgroundColor={bottomSheetBackgroundColor}/>

            <SnackbarNotify customSnackbar={customSnackbar}/>

            <AlertNotify title={title} informative={informative} actions={actions || {}} isBackgroundTouchClose={isBackgroundTouchClose} titleStyle={titleStyle} informativeStyle={informativeStyle} secondaryButtonStyle={secondaryButtonStyle} primaryButtonStyle={primaryButtonStyle} secondaryButtonTextStyle={secondaryButtonTextStyle} primaryButtonTextStyle={primaryButtonTextStyle} singleButtonTextStyle={singleButtonTextStyle}/>
        </NotifyContext.Provider>);
};
//# sourceMappingURL=useNotifyProvider.js.map