import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Dimensions, View, ViewProps, Keyboard } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import useBottomSheetNotify from './model/useBottomSheetNotify';
import { BottomSheetNotifyRef } from './types';
import ContentsComponent from './ui/ContentsComponent';

const DEFAULT_BORDER_RADIUS = 24;
const BS_MAX_HEIGHT = Dimensions.get('window').height - 120;

interface Props extends ViewProps {
  marginBottomBS?: number;
  bottomSheetBackgroundColor?: string;
  bottomSheetPadding?: number;
  closeOffset?: number;
  contentsGestureEnable?: boolean;
  isHandleVisible?: boolean;
  bottomSheetMarginX?: number;
  isBottomRadius?: boolean;
  maxHeight?: number;
  isScrollView?: boolean;
  bottomSheetComponent: React.ReactNode;
}

const BottomSheetNotify = forwardRef<BottomSheetNotifyRef, Props>(({
  marginBottomBS = 10,
  bottomSheetPadding = 20,
  bottomSheetBackgroundColor = '#ffffff',
  closeOffset = Dimensions.get('window').height,
  contentsGestureEnable = true,
  isHandleVisible = true,
  bottomSheetMarginX = 10,
  isBottomRadius = true,
  isScrollView = true,
  maxHeight = BS_MAX_HEIGHT,
  bottomSheetComponent
}, ref) => {
  const {
    HANDLE_HEIGHT,
    bottomSheetVisible,
    bsAnimatedStyle,
    onGestureEvent,
    handleVisible,
    onTapEvent,
    openPosition,
    screenWidth,
    screenHeight,
    panGestureRef,
    listScrollPosition,
    bsModalBgStyle,
    backgroundPressHandler
  } = useBottomSheetNotify({
    marginBottomBS,
    bottomSheetPadding,
    closeOffset,
    contentsGestureEnable,
    bottomSheetMarginX,
    isHandleVisible,
  });

  useImperativeHandle(ref, () => ({
    handleVisible,
  }));


  return (
    (bottomSheetVisible && bottomSheetComponent) ?
      <Animated.View
        style={[styles.modalBg, bsModalBgStyle]}
        entering={FadeIn.duration(50)}
        exiting={FadeOut.duration(50)}
        onTouchEnd={backgroundPressHandler}
      >
        <GestureHandlerRootView style={styles.rootViewWrapper}>
          <GestureDetector gesture={onGestureEvent}>
            <Animated.View
              onTouchEnd={(e) => {
                e.stopPropagation();
                Keyboard.dismiss();
              }}
              style={[styles.sheet, {
                width: screenWidth,
                height: screenHeight,
                paddingHorizontal: bottomSheetPadding,
                left: bottomSheetMarginX,
                right: bottomSheetMarginX,
                borderTopLeftRadius: DEFAULT_BORDER_RADIUS,
                borderTopRightRadius: DEFAULT_BORDER_RADIUS,
                borderBottomLeftRadius: isBottomRadius ? DEFAULT_BORDER_RADIUS : 0,
                borderBottomRightRadius: isBottomRadius ? DEFAULT_BORDER_RADIUS : 0,
                backgroundColor: bottomSheetBackgroundColor,
              }, bsAnimatedStyle]}>
              {
                isHandleVisible &&
                <View style={[styles.handleContainer, { height: HANDLE_HEIGHT }]}>
                  <View style={styles.handle} />
                </View>
              }

              <GestureDetector gesture={onTapEvent}>
                <ContentsComponent
                  HANDLE_HEIGHT={HANDLE_HEIGHT}
                  panGestureRef={panGestureRef}
                  listScrollPosition={listScrollPosition}
                  openPosition={openPosition}
                  marginBottomBS={marginBottomBS}
                  screenHeight={screenHeight}
                  bottomSheetComponent={bottomSheetComponent}
                  bottomSheetPadding={bottomSheetPadding}
                  maxHeight={maxHeight}
                  isScrollView={isScrollView}
                />
              </GestureDetector>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </Animated.View>
      : null
  );
});

const styles = StyleSheet.create({
  modalBg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    bottom: 0
  },
  sheet: {
    position: 'absolute',
    zIndex: 9000,
    overflow: 'hidden'
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 13,
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
