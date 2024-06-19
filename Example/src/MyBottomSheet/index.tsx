import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import BSTextInput from "../../dist/ui/BottomSheetNotify/ui/BSTextInput";
import { useNotify } from "../../dist";

// Define the props interface
interface MyBottomSheetProps {
    event?: () => void;
}

// Use the props interface in the component definition
const MyBottomSheet: React.FC<MyBottomSheetProps> = ({
    event
}) => {
    const { hideNotify } = useNotify();

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <BSTextInput />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => { event && event() }}>
                <Text>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => hideNotify('bottomSheet')}>
                <Text>닫기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 50,
        backgroundColor: 'white',
    },
    inputContainer: {
        borderWidth: 1,
    },
    button: {
        padding: 30,
    },
});

export default MyBottomSheet;