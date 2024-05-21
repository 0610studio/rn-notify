import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useNotify } from "../../model/useNotifyProvider";
var LoadingNotify = function (_a) {
    var loaderComponent = _a.loaderComponent;
    var loaderVisible = useNotify().loaderVisible;
    return loaderVisible ? (<Animated.View style={styles.modalBg} entering={FadeIn} exiting={FadeOut}>
            {loaderComponent ?
            loaderComponent()
            : <ActivityIndicator size="large" color="#fff"/>}
        </Animated.View>) : null;
};
var styles = StyleSheet.create({
    modalBg: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212B3688',
        zIndex: 9999,
    }
});
export default LoadingNotify;
//# sourceMappingURL=index.js.map