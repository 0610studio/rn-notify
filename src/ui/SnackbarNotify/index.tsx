import React, { ReactNode, useEffect, useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, Animated, Text, TouchableOpacity, Platform } from "react-native";
import { useNotify } from "../../model/useNotifyProvider";
import { CustomSnackbarProps } from "../../model/types";

const CLOSED_POSITION = -100;
const OPEN_POSITION_OFFSET = 10;
const SNACKBAR_DURATION = 4000;
const ANIMATION_DURATION = 200;
const DELAY_BEFORE_OPEN = 300;




const SnackbarNotify = ({
    customSnackbar
}: { customSnackbar?: (props: CustomSnackbarProps) => ReactNode }) => {
    const { top } = useSafeAreaInsets();
    const { snackVisible, setSnackVisible, snackMessage, snackType } = useNotify();
    const [snackbarPosition] = useState(new Animated.ValueXY({ x: 0, y: CLOSED_POSITION }));

    useEffect(() => {
        if (snackVisible) {
            open();
            const closeTimeout = setTimeout(close, SNACKBAR_DURATION);
            return () => clearTimeout(closeTimeout);
        }
        return () => { };
    }, [snackVisible]);

    const open = () => {
        Animated.timing(snackbarPosition, {
            toValue: { x: 0, y: top + OPEN_POSITION_OFFSET },
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
            delay: DELAY_BEFORE_OPEN,
        }).start();
    };

    const close = () => {
        Animated.timing(snackbarPosition, {
            toValue: { x: 0, y: CLOSED_POSITION },
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
        }).start(() => setSnackVisible(false));
    };

    return snackVisible ? (
        <Animated.View style={[styles.container, { top: snackbarPosition.y }]}>
            {
                customSnackbar ?
                    customSnackbar({ snackType, snackMessage })
                    : (
                        <TouchableOpacity activeOpacity={1} onPress={() => { }}
                            style={[styles.snackbar, { borderColor: snackType === 'error' ? '#f7cdcd' : '#c6e4c9', backgroundColor: snackType === 'error' ? '#fae6e6' : '#eef7ef' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ color: '#2e2e2e', fontSize: 15 }}>{snackMessage}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
            }
        </Animated.View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        zIndex: 99999,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
    },
    snackbar: {
        width: '90%',
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 12,
        ...Platform.select({
            ios: { shadowColor: "rgb(50, 50, 50)", shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { height: 1, width: 1 } },
            android: { elevation: 5 }
        })
    }
});

export default SnackbarNotify;
