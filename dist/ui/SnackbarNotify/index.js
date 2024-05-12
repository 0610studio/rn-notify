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
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Platform } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
var CLOSED_POSITION = -100;
var OPEN_POSITION_OFFSET = 10;
var SNACKBAR_DURATION = 4000;
var ANIMATION_DURATION = 200;
var DELAY_BEFORE_OPEN = 300;
var SnackbarNotify = function (_a) {
    var customSnackbar = _a.customSnackbar;
    var top = useSafeAreaInsets().top;
    var _b = useNotify(), snackVisible = _b.snackVisible, setSnackVisible = _b.setSnackVisible, snackMessage = _b.snackMessage, snackType = _b.snackType;
    var snackbarPosition = useState(new Animated.ValueXY({ x: 0, y: CLOSED_POSITION }))[0];
    useEffect(function () {
        if (snackVisible) {
            open();
            var closeTimeout_1 = setTimeout(close, SNACKBAR_DURATION);
            return function () { return clearTimeout(closeTimeout_1); };
        }
        return function () { };
    }, [snackVisible]);
    var open = function () {
        Animated.timing(snackbarPosition, {
            toValue: { x: 0, y: top + OPEN_POSITION_OFFSET },
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
            delay: DELAY_BEFORE_OPEN,
        }).start();
    };
    var close = function () {
        Animated.timing(snackbarPosition, {
            toValue: { x: 0, y: CLOSED_POSITION },
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
        }).start(function () { return setSnackVisible(false); });
    };
    return snackVisible ? (<Animated.View style={[styles.container, { top: snackbarPosition.y }]}>
            {customSnackbar ?
            customSnackbar({ snackType: snackType, snackMessage: snackMessage })
            : (<TouchableOpacity activeOpacity={1} onPress={function () { }} style={[styles.snackbar, { borderColor: snackType === 'error' ? '#f7cdcd' : '#c6e4c9', backgroundColor: snackType === 'error' ? '#fae6e6' : '#eef7ef' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ color: '#2e2e2e', fontSize: 15 }}>{snackMessage}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>)}
        </Animated.View>) : null;
};
var styles = StyleSheet.create({
    container: {
        zIndex: 99999,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
    },
    snackbar: __assign({ width: '90%', borderRadius: 14, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 12 }, Platform.select({
        ios: { shadowColor: "rgb(50, 50, 50)", shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { height: 1, width: 1 } },
        android: { elevation: 5 }
    }))
});
export default SnackbarNotify;
//# sourceMappingURL=index.js.map