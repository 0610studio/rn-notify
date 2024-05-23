var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';
import AlertNotify from '../ui/AlertNotify';
import SnackbarNotify from '../ui/SnackbarNotify';
import BottomSheetNotify from '../ui/BottomSheetNotify';
import LoadingNotify from '../ui/LoadingNotify';
import PopOverMenu from '../ui/PopOver/PopOverMenu';
var BS_MAX_HEIGHT = Dimensions.get('window').height - 120;
var NotifyContext = createContext(null);
export var useNotify = function () {
    var context = useContext(NotifyContext);
    if (!context) {
        throw new Error('useNotify must be used within a NotifyProvider');
    }
    return context;
};
export var NotifyProvider = function (_a) {
    var customSnackbar = _a.customSnackbar, loaderComponent = _a.loaderComponent, children = _a.children;
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
    var _p = useState([]), snackItemStack = _p[0], setSnackItemStack = _p[1];
    var _q = useState(false), contentsGestureEnable = _q[0], setContentsGestureEnable = _q[1];
    var _r = useState(false), bottomSheetVisible = _r[0], setBottomSheetVisible = _r[1];
    var _s = useState('#ffffff'), bottomSheetBackgroundColor = _s[0], setBottomSheetBackgroundColor = _s[1];
    var _t = useState(false), bottomSheetComponent = _t[0], setBottomSheetComponent = _t[1];
    var _u = useState(0), bottomSheetPadding = _u[0], setBottomSheetPadding = _u[1];
    var _v = useState(0), bottomSheetMarginX = _v[0], setBottomSheetMarginX = _v[1];
    var _w = useState(BS_MAX_HEIGHT), bottomSheetMaxHeight = _w[0], setBottomSheetMaxHeight = _w[1];
    var _x = useState(true), isBottomRadius = _x[0], setIsBottomRadius = _x[1];
    var _y = useState(true), handleVisible = _y[0], setHandleVisible = _y[1];
    var _z = useState(0), marginBottomBS = _z[0], setMarginBottomBs = _z[1];
    var bottomSheetRef = useRef(null);
    var _0 = useState(false), loaderVisible = _0[0], setLoaderVisible = _0[1];
    var _1 = useState(false), popOverVisible = _1[0], setPopOverVisible = _1[1];
    var _2 = useState({ px: 0, py: 0 }), popOverLocation = _2[0], setPopOverLocation = _2[1];
    var _3 = useState(false), popOverComponent = _3[0], setPopOverComponent = _3[1];
    var _4 = useState(undefined), fontFamily = _4[0], setFontFamily = _4[1];
    var showAlert = function (_a) {
        var title = _a.title, informative = _a.informative, actions = _a.actions, _b = _a.isBackgroundTouchClose, isBackgroundTouchClose = _b === void 0 ? true : _b, titleStyle = _a.titleStyle, informativeStyle = _a.informativeStyle, secondaryButtonStyle = _a.secondaryButtonStyle, primaryButtonStyle = _a.primaryButtonStyle, secondaryButtonTextStyle = _a.secondaryButtonTextStyle, primaryButtonTextStyle = _a.primaryButtonTextStyle, singleButtonTextStyle = _a.singleButtonTextStyle, fontFamily = _a.fontFamily;
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
        setFontFamily(fontFamily);
    };
    var showBottomSheet = function (_a) {
        var _b;
        var _c = _a.isHandleVisible, isHandleVisible = _c === void 0 ? true : _c, component = _a.component, _d = _a.contentsGestureEnable, contentsGestureEnable = _d === void 0 ? true : _d, _e = _a.marginHorizontal, marginHorizontal = _e === void 0 ? 10 : _e, _f = _a.padding, padding = _f === void 0 ? 20 : _f, _g = _a.marginBottom, marginBottom = _g === void 0 ? 10 : _g, _h = _a.backgroundColor, backgroundColor = _h === void 0 ? '#ffffff' : _h, _j = _a.isBottomRadius, isBottomRadius = _j === void 0 ? true : _j, _k = _a.maxHeight, maxHeight = _k === void 0 ? BS_MAX_HEIGHT : _k;
        Keyboard.dismiss();
        setHandleVisible(isHandleVisible);
        setBottomSheetPadding(padding);
        setContentsGestureEnable(contentsGestureEnable);
        setBottomSheetComponent(component);
        setMarginBottomBs(marginBottom);
        setBottomSheetMarginX(marginHorizontal);
        setIsBottomRadius(isBottomRadius);
        setBottomSheetBackgroundColor(backgroundColor);
        setBottomSheetMaxHeight(maxHeight);
        (_b = bottomSheetRef.current) === null || _b === void 0 ? void 0 : _b.handleVisible(true);
    };
    var showLoader = function () {
        setLoaderVisible(true);
    };
    var showPopOverMenu = function (_a) {
        var px = _a.px, py = _a.py, component = _a.component;
        setPopOverLocation({ px: px, py: py });
        setPopOverComponent(component);
        setPopOverVisible(true);
    };
    var showSnackBar = function (_a) {
        var message = _a.message, _b = _a.type, type = _b === void 0 ? 'success' : _b, _c = _a.index, index = _c === void 0 ? Date.now() : _c, _d = _a.snackbarDuration, snackbarDuration = _d === void 0 ? 3000 : _d;
        setSnackItemStack(function (prev) {
            if (prev.length === 0) {
                return __spreadArray(__spreadArray([], prev, true), [{ message: message, type: type, index: index, snackbarDuration: snackbarDuration }], false);
            }
            else {
                return prev;
            }
            ;
        });
    };
    var hideSnackBar = function (index) {
        setSnackItemStack(function (prev) { return prev.filter(function (item) { return item.index !== index; }); });
    };
    var hideNotify = useCallback(function (option) {
        switch (option) {
            case 'alert':
                setAlertVisible(false);
                break;
            case 'snack':
                setSnackItemStack([]);
                break;
            case 'bottomSheet':
                setBottomSheetVisible(false);
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
                setBottomSheetVisible(false);
                setLoaderVisible(false);
                break;
            default:
                break;
        }
        ;
    }, []);
    return (<NotifyContext.Provider value={{
            alertVisible: alertVisible,
            setAlertVisible: setAlertVisible,
            snackItemStack: snackItemStack,
            hideSnackBar: hideSnackBar,
            bottomSheetVisible: bottomSheetVisible,
            setBottomSheetVisible: setBottomSheetVisible,
            loaderVisible: loaderVisible,
            popOverVisible: popOverVisible,
            setPopOverVisible: setPopOverVisible,
            showAlert: showAlert,
            showSnackBar: showSnackBar,
            showBottomSheet: showBottomSheet,
            showLoader: showLoader,
            showPopOverMenu: showPopOverMenu,
            hideNotify: hideNotify,
        }}>
            {children}

            <BottomSheetNotify ref={bottomSheetRef} contentsGestureEnable={contentsGestureEnable} bottomSheetComponent={bottomSheetComponent} bottomSheetPadding={bottomSheetPadding} marginBottomBS={marginBottomBS} isHandleVisible={handleVisible} bottomSheetMarginX={bottomSheetMarginX} isBottomRadius={isBottomRadius} bottomSheetBackgroundColor={bottomSheetBackgroundColor} maxHeight={bottomSheetMaxHeight}/>

            <PopOverMenu px={popOverLocation === null || popOverLocation === void 0 ? void 0 : popOverLocation.px} py={popOverLocation === null || popOverLocation === void 0 ? void 0 : popOverLocation.py} component={popOverComponent}/>

            <SnackbarNotify customSnackbar={customSnackbar}/>

            <AlertNotify title={title} informative={informative} actions={actions || {}} isBackgroundTouchClose={isBackgroundTouchClose} titleStyle={titleStyle} informativeStyle={informativeStyle} secondaryButtonStyle={secondaryButtonStyle} primaryButtonStyle={primaryButtonStyle} secondaryButtonTextStyle={secondaryButtonTextStyle} primaryButtonTextStyle={primaryButtonTextStyle} singleButtonTextStyle={singleButtonTextStyle} fontFamily={fontFamily}/>

            <LoadingNotify loaderComponent={loaderComponent}/>
        </NotifyContext.Provider>);
};
//# sourceMappingURL=useNotifyProvider.js.map