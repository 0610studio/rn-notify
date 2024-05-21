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
import React, { useCallback, useRef, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useNotify } from '../../model/useNotifyProvider';
var PopOverButton = function (_a) {
    var popOverMenuComponent = _a.popOverMenuComponent, props = __rest(_a, ["popOverMenuComponent"]);
    var _b = useState(), rightX = _b[0], setRightX = _b[1];
    var _c = useState(), bottomY = _c[0], setBottomY = _c[1];
    var buttonRef = useRef(null);
    var showPopOverMenu = useNotify().showPopOverMenu;
    var handlePress = useCallback(function () {
        if (rightX && bottomY) {
            showPopOverMenu({ px: rightX, py: bottomY, component: popOverMenuComponent });
        }
    }, [rightX, bottomY]);
    var onLayout = function (event) {
        var _a;
        (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.measure(function (fx, fy, width, height, px, py) {
            if (px !== undefined && px !== null) {
                var getX = px + width;
                setRightX(getX);
            }
            if (py !== undefined && py !== null) {
                var getY = py + height;
                setBottomY(getY);
            }
        });
    };
    return (<Pressable onPress={handlePress} style={{ alignItems: 'flex-start' }}>
      <View ref={buttonRef} onLayout={onLayout}>
        {props.children}
      </View>
    </Pressable>);
};
export default PopOverButton;
//# sourceMappingURL=PopOverButton.js.map