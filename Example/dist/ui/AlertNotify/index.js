import React, { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useNotify } from '../../model/useNotifyProvider';
var AlertNotify = function (_a) {
    var actions = _a.actions, title = _a.title, informative = _a.informative, isBackgroundTouchClose = _a.isBackgroundTouchClose, titleStyle = _a.titleStyle, informativeStyle = _a.informativeStyle, secondaryButtonStyle = _a.secondaryButtonStyle, primaryButtonStyle = _a.primaryButtonStyle, secondaryButtonTextStyle = _a.secondaryButtonTextStyle, primaryButtonTextStyle = _a.primaryButtonTextStyle, singleButtonTextStyle = _a.singleButtonTextStyle;
    var _b = useNotify(), alertVisible = _b.alertVisible, setAlertVisible = _b.setAlertVisible;
    var modalWidth = Dimensions.get('window').width - 60;
    var handleButtonPress = useCallback(function (onPressFunction) { return function () {
        if (onPressFunction) {
            onPressFunction();
        }
        setAlertVisible(false);
    }; }, [setAlertVisible]);
    var backPressHandler = useCallback(function () {
        if (alertVisible) {
            setAlertVisible(false);
            return true;
        }
        return false;
    }, [alertVisible, setAlertVisible]);
    useEffect(function () {
        var backHandler = BackHandler.addEventListener('hardwareBackPress', backPressHandler);
        return function () { return backHandler.remove(); };
    }, [backPressHandler]);
    var content = useMemo(function () {
        var _a = actions || {}, primary = _a.primary, secondary = _a.secondary;
        return (<Animated.View entering={FadeInDown.duration(300)} exiting={FadeOutDown.duration(100)}>
        <Pressable style={[styles.contentContainer, { width: modalWidth }]}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {informative && <Text style={[styles.informative, informativeStyle]}>{informative}</Text>}
          {actions && (<View style={styles.buttonContainer}>
              {secondary ? (<>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#E7E7E7', marginRight: 8 }, secondaryButtonStyle]} onPress={handleButtonPress(secondary === null || secondary === void 0 ? void 0 : secondary.onPress)}>
                    <Text numberOfLines={1} style={[styles.buttonText, { color: '#393939' }, secondaryButtonTextStyle]}>{secondary.label}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, { backgroundColor: '#26B0EB' }, primaryButtonStyle]} onPress={handleButtonPress(primary === null || primary === void 0 ? void 0 : primary.onPress)}>
                    <Text numberOfLines={1} style={[styles.buttonText, { color: 'white' }, primaryButtonTextStyle]}>{primary === null || primary === void 0 ? void 0 : primary.label}</Text>
                  </TouchableOpacity>
                </>) : (<TouchableOpacity onPress={handleButtonPress(primary === null || primary === void 0 ? void 0 : primary.onPress)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <Text numberOfLines={1} style={[styles.buttonText, { color: '#0074E9', textAlign: 'right', marginBottom: 5, marginRight: 5 }, singleButtonTextStyle]}>{primary === null || primary === void 0 ? void 0 : primary.label}</Text>
                </TouchableOpacity>)}
            </View>)}
        </Pressable>
      </Animated.View>);
    }, [title, informative, actions, handleButtonPress]);
    return alertVisible ? (<Pressable style={styles.modalBg} onPress={function () {
            if (isBackgroundTouchClose)
                setAlertVisible(false);
        }}>
      <KeyboardAvoidingView style={styles.avoidingView} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        {content}
      </KeyboardAvoidingView>
    </Pressable>) : null;
};
export default AlertNotify;
var styles = StyleSheet.create({
    modalBg: {
        flex: 1,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212B3699',
        zIndex: 9999,
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
//# sourceMappingURL=index.js.map