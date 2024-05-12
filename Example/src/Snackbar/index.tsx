import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const SnackBar = ({ snackType, snackMessage }: any) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => { }}
            style={[styles.snackbar, { borderColor: snackType === 'error' ? '#f7cdcd' : '#c6e4c9', backgroundColor: snackType === 'error' ? '#fae6e6' : '#eef7ef' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    snackType === 'success' ? (
                        <Image style={{ width: 30, height: 30 }} source={require('./assets/ic_toast_suc.png')} resizeMode='cover' />
                    ) : (
                        <Image style={{ width: 30, height: 30 }} source={require('./assets/ic_prohibition.png')} resizeMode='cover' />
                    )
                }

                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, justifyContent: 'center' }}>
                    <Text style={{ color: '#2e2e2e', fontSize: 17 }}>{snackMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

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

export default SnackBar;