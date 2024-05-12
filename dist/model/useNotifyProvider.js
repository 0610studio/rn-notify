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
    var _g = useState(false), snackVisible = _g[0], setSnackVisible = _g[1];
    var _h = useState(''), snackMessage = _h[0], setSnackMessage = _h[1];
    var _j = useState(''), snackType = _j[0], setSnackType = _j[1];
    var _k = useState(false), contentsGestureEnable = _k[0], setContentsGestureEnable = _k[1];
    var _l = useState(false), bottomSheetVisible = _l[0], setBottomSheetVisible = _l[1];
    var _m = useState(false), bottomSheetComponent = _m[0], setBottomSheetComponent = _m[1];
    var _o = useState(0), bottomSheetPadding = _o[0], setBottomSheetPadding = _o[1];
    var _p = useState(0), bottomSheetMarginX = _p[0], setBottomSheetMarginX = _p[1];
    var _q = useState(true), isBottomRadius = _q[0], setIsBottomRadius = _q[1];
    var _r = useState(true), handleVisible = _r[0], setHandleVisible = _r[1];
    var _s = useState(0), marginBottomBS = _s[0], setMarginBottomBs = _s[1];
    var bottomSheetRef = useRef(null);
    var showAlert = function (_a) {
        var title = _a.title, informative = _a.informative, actions = _a.actions, _b = _a.isBackgroundTouchClose, isBackgroundTouchClose = _b === void 0 ? true : _b;
        Keyboard.dismiss();
        setTitle(title);
        setInformative(informative);
        setActions(actions);
        setIsBackgroundTouchClose(isBackgroundTouchClose);
        setAlertVisible(true);
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
        var _c = _a.isHandleVisible, isHandleVisible = _c === void 0 ? true : _c, component = _a.component, _d = _a.contentsGestureEnable, contentsGestureEnable = _d === void 0 ? true : _d, _e = _a.marginHorizontal, marginHorizontal = _e === void 0 ? 20 : _e, _f = _a.padding, padding = _f === void 0 ? 20 : _f, _g = _a.marginBottom, marginBottom = _g === void 0 ? 0 : _g, _h = _a.isBottomRadius, isBottomRadius = _h === void 0 ? true : _h;
        Keyboard.dismiss();
        setHandleVisible(isHandleVisible);
        setBottomSheetPadding(padding);
        setContentsGestureEnable(contentsGestureEnable);
        setBottomSheetComponent(component);
        setMarginBottomBs(marginBottom);
        setBottomSheetMarginX(marginHorizontal);
        setIsBottomRadius(isBottomRadius);
        (_b = bottomSheetRef.current) === null || _b === void 0 ? void 0 : _b.handleVisible(true);
    };
    return (<NotifyContext.Provider value={{
            alertVisible: alertVisible,
            setAlertVisible: setAlertVisible,
            actions: actions,
            isBackgroundTouchClose: isBackgroundTouchClose,
            title: title,
            informative: informative,
            snackVisible: snackVisible,
            snackMessage: snackMessage,
            snackType: snackType,
            setSnackVisible: setSnackVisible,
            bottomSheetVisible: bottomSheetVisible,
            setBottomSheetVisible: setBottomSheetVisible,
            showAlert: showAlert,
            showSnackBar: showSnackBar,
            showBottomSheet: showBottomSheet
        }}>
            {children}

            <AlertNotify />
            <SnackbarNotify customSnackbar={customSnackbar}/>
            <BottomSheetNotify ref={bottomSheetRef} contentsGestureEnable={contentsGestureEnable} bottomSheetComponent={bottomSheetComponent} bottomSheetPadding={bottomSheetPadding} marginBottomBS={marginBottomBS} isHandleVisible={handleVisible} bottomSheetMarginX={bottomSheetMarginX} isBottomRadius={isBottomRadius}/>
        </NotifyContext.Provider>);
};
//# sourceMappingURL=useNotifyProvider.js.map