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
import { useRef } from "react";
import { Platform, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
var BSTextInput = function (_a) {
    var props = __rest(_a, []);
    var textInputRef = useRef(null);
    return (Platform.OS === 'ios' ?
        <Pressable onPress={function () { var _a; (_a = textInputRef === null || textInputRef === void 0 ? void 0 : textInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }}>
                <TextInput ref={textInputRef} pointerEvents='none' {...props}/>
            </Pressable>
        :
            <TextInput ref={textInputRef} {...props}/>);
};
export default BSTextInput;
//# sourceMappingURL=index.js.map