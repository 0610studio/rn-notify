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
            style={[styles.container, { width: '90%', backgroundColor: '#ffffff' }]}
            entering={FadeInUp}
            exiting={FadeOutUp}
        >
            <TouchableOpacity activeOpacity={1} onPress={close}>
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
        width: '90%',
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 10,
        ...Platform.select({
            ios: { shadowColor: "rgb(50, 50, 50)", shadowOpacity: 0.1, shadowRadius: 3, shadowOffset: { height: 1, width: 1 } },
            android: { elevation: 5 }
        })
    },
    snackBar: {
        paddingHorizontal: 10,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    }
});


export default SnackbarItem;