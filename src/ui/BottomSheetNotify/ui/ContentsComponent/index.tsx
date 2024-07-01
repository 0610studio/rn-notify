import { useCallback } from "react";
import { Dimensions, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, Platform, View } from "react-native";
import { GestureType, ScrollView } from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ANDROID_STATUS_BAR_HEIGHT = Platform.OS === 'android' ? 25 : 0;

interface Props {
    HANDLE_HEIGHT: number;
    panGestureRef: React.MutableRefObject<GestureType>;
    listScrollPosition: SharedValue<number>;
    openPosition: SharedValue<number>;
    marginBottomBS: number;
    screenHeight: SharedValue<number>;
    bottomSheetComponent: React.ReactNode;
    bottomSheetPadding: number;
    maxHeight: number;
    isScrollView: boolean;
}

const ContentsComponent = ({
    HANDLE_HEIGHT,
    panGestureRef,
    listScrollPosition,
    openPosition,
    marginBottomBS,
    screenHeight,
    bottomSheetComponent,
    bottomSheetPadding,
    maxHeight,
    isScrollView
}: Props) => {
    const { bottom } = useSafeAreaInsets();

    const onLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        const contentMaxHeight = maxHeight + HANDLE_HEIGHT;
        const resultHeight = height > contentMaxHeight ? contentMaxHeight : height;
        screenHeight.value = resultHeight + HANDLE_HEIGHT;
        openPosition.value = Dimensions.get('window').height - resultHeight - marginBottomBS - bottom - ANDROID_STATUS_BAR_HEIGHT - HANDLE_HEIGHT;
    };

    // 현재 스크롤 위치
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        listScrollPosition.value = event.nativeEvent.contentOffset.y;
    }, [listScrollPosition]);


    return (
        isScrollView ? (
            <ScrollView
                simultaneousHandlers={[panGestureRef]}
                onScroll={handleScroll}
                style={{ maxHeight: maxHeight }}
                keyboardShouldPersistTaps="handled"
                bounces={false}
                bouncesZoom={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <View style={[{ width: '100%', minHeight: 1, paddingBottom: bottomSheetPadding }]} onLayout={onLayout}>
                    {bottomSheetComponent}
                </View>
            </ScrollView>
        ) : (
            <View style={[{ width: '100%', minHeight: 1, paddingBottom: bottomSheetPadding, maxHeight: maxHeight }]} onLayout={onLayout}>
                {bottomSheetComponent}
            </View>
        )
    )
};


export default ContentsComponent;
