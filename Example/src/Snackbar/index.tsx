import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const SnackBar = ({ snackType, snackMessage }: any) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={() => { }}
            style={[styles.snackbar, { backgroundColor: snackType === 'error' ? '#fae6e6' : '#eef7ef' }]}>
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
    snackbar: {
        width: '100%',
        borderRadius: 0,
        paddingHorizontal: 15,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
    }
});

export default SnackBar;