import { ReactNode, useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { CustomSnackbarProps, SnackItem } from "../../../model/types";

const SnackbarItem = ({
    customSnackbar,
    snackItem,
    hideSnackBar,
}: {
    customSnackbar?: (props: CustomSnackbarProps) => ReactNode;
    snackItem: SnackItem;
    hideSnackBar: (index: number) => void;
}) => {
    const { type, message, snackbarDuration } = snackItem;

    useEffect(() => {
        const closeTimeout = setTimeout(close, snackbarDuration);
        return () => clearTimeout(closeTimeout);
    }, []);

    const close = () => {
        hideSnackBar(snackItem.index);
    };

    return (
        <Animated.View
            style={[styles.container, styles.aosShadow, { width: '90%', marginTop: 10 }]}
            entering={FadeInUp}
            exiting={FadeOutUp}
        >
            <TouchableOpacity style={[styles.container, styles.iosShadow, { width: '100%' }]} activeOpacity={1} onPress={close}>
                {
                    customSnackbar ?
                        customSnackbar({ snackType: type, snackMessage: message })
                        : (
                            <View style={[styles.snackBar, { backgroundColor: type === 'error' ? '#fae6e6' : '#eef7ef' }]}>
                                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ color: '#2e2e2e', fontSize: 15 }}>{message}</Text>
                                </View>
                            </View>
                        )
                }
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        backgroundColor: 'white',
    },
    iosShadow: {
        ...Platform.select({
            ios: { shadowColor: "rgb(50, 50, 50, 1)", shadowOpacity: 0.12, shadowRadius: 5, shadowOffset: { height: 3, width: 0 } },
        }),
    },
    aosShadow: {
        ...Platform.select({
            android: { elevation: 5 }
        }),
    },
    snackBar: {
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
});

export default SnackbarItem;