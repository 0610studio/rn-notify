import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Dimensions, View, ViewProps, Keyboard, Pressable } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import useBottomSheetNotify from './model/useBottomSheetNotify';
import { BottomSheetNotifyRef } from './types';
import ContentsComponent from './ui/ContentsComponent';

const DEFAULT_BORDER_RADIUS = 24;

interface Props extends ViewProps {
  marginBottomBS: number;
  bottomSheetPadding: number;
  closeOffset?: number;
  contentsGestureEnable: boolean;
  bottomSheetComponent: React.ReactNode;
  isHandleVisible: boolean;
  bottomSheetMarginX: number;
  isBottomRadius: boolean;
}

const BottomSheetNotify = forwardRef<BottomSheetNotifyRef, Props>(({
  marginBottomBS,
  bottomSheetPadding,
  closeOffset = Dimensions.get('window').height,
  contentsGestureEnable,
  bottomSheetComponent,
  isHandleVisible,
  bottomSheetMarginX,
  isBottomRadius
}, ref) => {
  const {
    bottomSheetVisible,
    bsAnimatedStyle,
    onGestureEvent,
    handleVisible,
    onTapEvent,
    handleHeight,
    openPosition,
    correction,
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
    isHandleVisible
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
      >
        <Pressable
          style={styles.subBg}
          onPress={backgroundPressHandler}
        >
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
                <Pressable
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  {
                    isHandleVisible &&
                    <View style={styles.handleContainer}>
                      <View style={styles.handle} />
                    </View>
                  }

                  <GestureDetector gesture={onTapEvent}>
                    <ContentsComponent
                      panGestureRef={panGestureRef}
                      listScrollPosition={listScrollPosition}
                      handleHeight={handleHeight}
                      openPosition={openPosition}
                      correction={correction}
                      screenHeight={screenHeight}
                      bottomSheetComponent={bottomSheetComponent}
                      bottomSheetPadding={bottomSheetPadding}
                    />
                  </GestureDetector>
                </Pressable>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
        </Pressable>
      </Animated.View>
      : null
  );
});

const styles = StyleSheet.create({
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
    zIndex: 5005,
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
