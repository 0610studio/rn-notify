import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
import SnackbarItem from "./ui/SnackbarItem";
var SnackbarNotify = function (_a) {
    var customSnackbar = _a.customSnackbar;
    var top = useSafeAreaInsets().top;
    var _b = useNotify(), snackItemStack = _b.snackItemStack, hideSnackBar = _b.hideSnackBar;
    return snackItemStack ? (<View style={[styles.container, { paddingTop: top }]}>
            {snackItemStack.map(function (snackItem, index) {
            return (<SnackbarItem key={index} customSnackbar={customSnackbar} snackItem={snackItem} hideSnackBar={hideSnackBar}/>);
        })}
        </View>) : null;
};
var styles = StyleSheet.create({
    container: {
        zIndex: 9997,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
    },
});
export default SnackbarNotify;
//# sourceMappingURL=index.js.map