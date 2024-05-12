import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Dimensions, View, Keyboard, Pressable } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import useBottomSheetNotify from './model/useBottomSheetNotify';
import ContentsComponent from './ui/ContentsComponent';
var DEFAULT_BORDER_RADIUS = 24;
var BottomSheetNotify = forwardRef(function (_a, ref) {
    var marginBottomBS = _a.marginBottomBS, bottomSheetPadding = _a.bottomSheetPadding, _b = _a.closeOffset, closeOffset = _b === void 0 ? Dimensions.get('window').height : _b, contentsGestureEnable = _a.contentsGestureEnable, bottomSheetComponent = _a.bottomSheetComponent, isHandleVisible = _a.isHandleVisible, bottomSheetMarginX = _a.bottomSheetMarginX, isBottomRadius = _a.isBottomRadius;
    var _c = useBottomSheetNotify({
        marginBottomBS: marginBottomBS,
        bottomSheetPadding: bottomSheetPadding,
        closeOffset: closeOffset,
        contentsGestureEnable: contentsGestureEnable,
        bottomSheetMarginX: bottomSheetMarginX,
        isHandleVisible: isHandleVisible
    }), bottomSheetVisible = _c.bottomSheetVisible, bsAnimatedStyle = _c.bsAnimatedStyle, onGestureEvent = _c.onGestureEvent, handleVisible = _c.handleVisible, onTapEvent = _c.onTapEvent, handleHeight = _c.handleHeight, openPosition = _c.openPosition, correction = _c.correction, screenWidth = _c.screenWidth, screenHeight = _c.screenHeight, panGestureRef = _c.panGestureRef, listScrollPosition = _c.listScrollPosition, bsModalBgStyle = _c.bsModalBgStyle, backgroundPressHandler = _c.backgroundPressHandler;
    useImperativeHandle(ref, function () { return ({
        handleVisible: handleVisible,
    }); });
    return ((bottomSheetVisible && bottomSheetComponent) ?
        <Animated.View style={[styles.modalBg, bsModalBgStyle]} entering={FadeIn.duration(50)} exiting={FadeOut.duration(50)}>
        <Pressable style={styles.subBg} onPress={backgroundPressHandler}>
          <GestureHandlerRootView style={styles.rootViewWrapper}>
            <GestureDetector gesture={onGestureEvent}>
              <Animated.View style={[styles.sheet, {
                    width: screenWidth,
                    height: screenHeight,
                    paddingHorizontal: bottomSheetPadding,
                    left: bottomSheetMarginX,
                    right: bottomSheetMarginX,
                    borderTopLeftRadius: DEFAULT_BORDER_RADIUS,
                    borderTopRightRadius: DEFAULT_BORDER_RADIUS,
                    borderBottomLeftRadius: isBottomRadius ? DEFAULT_BORDER_RADIUS : 0,
                    borderBottomRightRadius: isBottomRadius ? DEFAULT_BORDER_RADIUS : 0,
                }, bsAnimatedStyle]}>
                <Pressable onPress={function () {
                Keyboard.dismiss();
            }}>
                  {isHandleVisible &&
                <View style={styles.handleContainer}>
                      <View style={styles.handle}/>
                    </View>}

                  <GestureDetector gesture={onTapEvent}>
                    <ContentsComponent panGestureRef={panGestureRef} listScrollPosition={listScrollPosition} handleHeight={handleHeight} openPosition={openPosition} correction={correction} screenHeight={screenHeight} bottomSheetComponent={bottomSheetComponent} bottomSheetPadding={bottomSheetPadding}/>
                  </GestureDetector>
                </Pressable>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </Pressable>
      </Animated.View>
        : null);
});
var styles = StyleSheet.create({
    modalBg: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    subBg: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheet: {
        position: 'absolute',
        zIndex: 9000,
        overflow: 'hidden'
    },
    handleContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 13,
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    handle: {
        backgroundColor: '#E7EDF0',
        width: 50,
        height: 4,
        borderRadius: 2,
    },
    rootViewWrapper: {
        width: '100%', height: '100%'
    },
});
export default BottomSheetNotify;
//# sourceMappingURL=index.js.map