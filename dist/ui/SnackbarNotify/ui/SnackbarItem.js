var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
var SnackbarItem = function (_a) {
    var customSnackbar = _a.customSnackbar, snackItem = _a.snackItem, hideSnackBar = _a.hideSnackBar;
    var type = snackItem.type, message = snackItem.message, snackbarDuration = snackItem.snackbarDuration;
    useEffect(function () {
        var closeTimeout = setTimeout(close, snackbarDuration);
        return function () { return clearTimeout(closeTimeout); };
    }, []);
    var close = function () {
        hideSnackBar(snackItem.index);
    };
    return (<Animated.View style={[styles.container, styles.aosShadow, { width: '90%', marginTop: 10 }]} entering={FadeInUp} exiting={FadeOutUp}>
            <TouchableOpacity style={[styles.container, styles.iosShadow, { width: '100%' }]} activeOpacity={1} onPress={close}>
                {customSnackbar ?
            customSnackbar({ snackType: type, snackMessage: message })
            : (<View style={[styles.snackBar, { backgroundColor: type === 'error' ? '#fae6e6' : '#eef7ef' }]}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ color: '#2e2e2e', fontSize: 15 }}>{message}</Text>
                                </View>
                            </View>)}
            </TouchableOpacity>
        </Animated.View>);
};
var styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        backgroundColor: 'white',
    },
    iosShadow: __assign({}, Platform.select({
        ios: { shadowColor: "rgb(50, 50, 50, 1)", shadowOpacity: 0.12, shadowRadius: 5, shadowOffset: { height: 3, width: 0 } },
    })),
    aosShadow: __assign({}, Platform.select({
        android: { elevation: 5 }
    })),
    snackBar: {
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
});
export default SnackbarItem;
//# sourceMappingURL=SnackbarItem.js.map