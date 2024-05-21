import React, { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useNotify } from '../../model/useNotifyProvider';
import { AlertActions, ShowAlertProps } from '../../model/types';

const AlertNotify = ({
  actions,
  title,
  informative,
  isBackgroundTouchClose,
  titleStyle,
  informativeStyle,
  secondaryButtonStyle,
  primaryButtonStyle,
  secondaryButtonTextStyle,
  primaryButtonTextStyle,
  singleButtonTextStyle,
  fontFamily
}: ShowAlertProps) => {
  const {
    alertVisible,
    setAlertVisible
  } = useNotify();

  const modalWidth = Dimensions.get('window').width - 60;

  const handleButtonPress = useCallback((onPressFunction: any) => () => {
    if (onPressFunction) {
      onPressFunction();
    }
    setAlertVisible(false);
  }, [setAlertVisible]);

  const backPressHandler = useCallback(() => {
    if (alertVisible) {
      setAlertVisible(false);
      return true;
    }
    return false;
  }, [alertVisible, setAlertVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);

    return () => backHandler.remove();
  }, [backPressHandler]);

  const content = useMemo(() => {
    const { primary, secondary } = actions || {} as AlertActions;

    return (
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={FadeOutDown.duration(100)}
      >
        <Pressable
          style={[styles.contentContainer, { width: modalWidth }]}
        >
          {title && <Text style={[styles.title, { fontFamily: fontFamily }, titleStyle]}>{title}</Text>}
          {informative && <Text style={[styles.informative, { fontFamily: fontFamily }, informativeStyle]}>{informative}</Text>}
          {actions && (
            <View style={styles.buttonContainer}>
              {secondary ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#E7E7E7', marginRight: 8 }, secondaryButtonStyle]}
                    onPress={handleButtonPress(secondary?.onPress)}>
                    <Text numberOfLines={1} style={[styles.buttonText, { color: '#393939', fontFamily: fontFamily }, secondaryButtonTextStyle]}>{secondary.label}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ff9225' }, primaryButtonStyle]}
                    onPress={handleButtonPress(primary?.onPress)}>
                    <Text numberOfLines={1} style={[styles.buttonText, { color: 'white', fontFamily: fontFamily }, primaryButtonTextStyle]}>{primary?.label}</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={handleButtonPress(primary?.onPress)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text numberOfLines={1} style={[styles.buttonText, { color: '#FF7F00', textAlign: 'right', marginBottom: 5, marginRight: 5, fontFamily: fontFamily }, singleButtonTextStyle]}>{primary?.label}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Pressable>
      </Animated.View>
    )
  }, [title, informative, actions, handleButtonPress]);

  return alertVisible ? (
    <Pressable
      style={styles.modalBg}
      onPress={() => {
        if (isBackgroundTouchClose) setAlertVisible(false);
      }}
    >
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        {content}
      </KeyboardAvoidingView>
    </Pressable>
  ) : null;
};

export default AlertNotify;

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212B3688',
    zIndex: 9998,
  },
  title: {
    color: '#232323',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: 'bold',
    width: '100%',
    paddingHorizontal: 4
  },
  informative: {
    color: '#3F3F3F',
    fontSize: 13,
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 4
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  avoidingView: {
    flex: 1,
    justifyContent: 'center'
  },
  contentContainer: {
    alignItems: 'center', backgroundColor: 'white', borderRadius: 22, paddingBottom: 18, paddingTop: 24, paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 13,
  }
});
