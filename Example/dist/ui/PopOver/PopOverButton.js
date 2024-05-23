var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef, useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useNotify } from '../../model/useNotifyProvider';
var PopOverButton = function (_a) {
    var width = _a.width, height = _a.height, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? 'transparent' : _b, popOverMenuComponent = _a.popOverMenuComponent, children = _a.children, props = __rest(_a, ["width", "height", "backgroundColor", "popOverMenuComponent", "children"]);
    var buttonRef = useRef(null);
    var showPopOverMenu = useNotify().showPopOverMenu;
    var handlePress = useCallback(function () {
        var _a;
        (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.measure(function (fx, fy, measuredWidth, measuredHeight, pageX, pageY) {
            if (pageX !== undefined && pageY !== undefined) {
                var rbX = pageX + measuredWidth;
                var rbY = pageY + measuredHeight;
                showPopOverMenu({ px: rbX, py: rbY, component: popOverMenuComponent });
            }
        });
    }, [showPopOverMenu, popOverMenuComponent]);
    return (<Pressable onPress={handlePress} style={styles.pressable}>
      <View ref={buttonRef} style={[styles.button, { width: width, height: height, backgroundColor: backgroundColor }]} {...props}>
        {children}
      </View>
    </Pressable>);
};
var styles = StyleSheet.create({
    pressable: {
        alignItems: 'flex-start',
    },
    button: {
        justifyContent: 'center',
    },
});
export default PopOverButton;
//# sourceMappingURL=PopOverButton.js.map