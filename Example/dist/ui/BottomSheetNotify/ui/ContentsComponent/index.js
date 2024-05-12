import { useCallback } from "react";
import { Dimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
var ContentsComponent = function (_a) {
    var panGestureRef = _a.panGestureRef, listScrollPosition = _a.listScrollPosition, handleHeight = _a.handleHeight, openPosition = _a.openPosition, correction = _a.correction, screenHeight = _a.screenHeight, bottomSheetComponent = _a.bottomSheetComponent, bottomSheetPadding = _a.bottomSheetPadding;
    var maxHeight = Dimensions.get('window').height - 120;
    var onLayout = function (event) {
        var height = event.nativeEvent.layout.height;
        height = height > maxHeight ? maxHeight : height;
        screenHeight.value = (height + handleHeight);
        openPosition.value = Dimensions.get('window').height - height - handleHeight - correction;
    };
    var handleScroll = useCallback(function (event) {
        listScrollPosition.value = event.nativeEvent.contentOffset.y;
    }, [listScrollPosition]);
    return (<ScrollView simultaneousHandlers={[panGestureRef]} onScroll={handleScroll} style={{ maxHeight: maxHeight }} keyboardShouldPersistTaps="handled" bounces={false} bouncesZoom={false} showsVerticalScrollIndicator={false}>
            <View style={[{ width: '100%', minHeight: 1, paddingBottom: bottomSheetPadding }]} onLayout={onLayout}>
                {bottomSheetComponent}
            </View>
        </ScrollView>);
};
export default ContentsComponent;
//# sourceMappingURL=index.js.map