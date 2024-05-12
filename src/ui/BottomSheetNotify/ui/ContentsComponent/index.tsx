import { useCallback } from "react";
import { Dimensions, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { GestureType, ScrollView } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

interface Props {
    panGestureRef: React.MutableRefObject<GestureType>;
    listScrollPosition: SharedValue<number>;
    handleHeight: number;
    openPosition: SharedValue<number>;
    correction: number;
    screenHeight: SharedValue<number>;
    bottomSheetComponent: React.ReactNode;
    bottomSheetPadding: number;
}

const ContentsComponent = ({
    panGestureRef,
    listScrollPosition,
    handleHeight,
    openPosition,
    correction,
    screenHeight,
    bottomSheetComponent,
    bottomSheetPadding
}: Props) => {
    const maxHeight = Dimensions.get('window').height - 120;

    const onLayout = (event: LayoutChangeEvent) => {
        let { height } = event.nativeEvent.layout;
        height = height > maxHeight ? maxHeight : height;
        screenHeight.value = (height + handleHeight);
        openPosition.value = Dimensions.get('window').height - height - handleHeight - correction;
    };

    // 현재 스크롤 위치
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        listScrollPosition.value = event.nativeEvent.contentOffset.y;
    }, [listScrollPosition]);


    return (
        <ScrollView
            simultaneousHandlers={[panGestureRef]}
            onScroll={handleScroll}
            style={{ maxHeight: maxHeight }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            bouncesZoom={false}
            showsVerticalScrollIndicator={false}
        >
            <View style={[{ width: '100%', minHeight: 1, paddingBottom: bottomSheetPadding }]} onLayout={onLayout}>
                {bottomSheetComponent}
            </View>
        </ScrollView>
    )
};


export default ContentsComponent;
