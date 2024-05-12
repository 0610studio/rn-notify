import { Button, SafeAreaView, View } from "react-native"
import { useNotify } from "../dist";
import BSTextInput from "../dist/ui/BottomSheetNotify/ui/BSTextInput";

const NotifyExample = () => {
    const { showAlert, showSnackBar, showBottomSheet } = useNotify();

    return (
        <SafeAreaView>
            <View style={{ gap: 30, marginTop: 30 }}>
                <Button
                    onPress={() => {
                        showAlert({
                            title: '타이틀 테스트 길어지면 줄바꿈이 될 수 있습니다.',
                            informative: '테스트 informative 길어지면 줄바꿈이 될 수 있습니다.',
                            primaryButtonStyle: {
                                backgroundColor: 'red',
                            },
                            actions: {
                                primary: {
                                    label: '확인',
                                    onPress: () => {
                                        console.log('확인');
                                    },
                                },
                                // 옵셔널, 없으면 단일 Text 버튼
                                secondary: {
                                    label: '취소',
                                    onPress: () => {
                                        console.log('취소');
                                    },
                                }
                            }
                        });

                    }}
                    title="show_Alert"
                    color="#841584"
                />

                <Button
                    onPress={() => {
                        showSnackBar({
                            message: Date.now().toString(),
                            type: 'success',
                        });
                    }}
                    title="show_SnackBar"
                    color="#841500"
                />

                <Button
                    onPress={() => {
                        showBottomSheet({
                            isHandleVisible: true,
                            marginHorizontal: 10,
                            marginBottom: 10,
                            padding: 0,
                            isBottomRadius: true,
                            component:
                                <View style={{ padding: 50,backgroundColor:'white' }}>
                                    <View style={{ borderWidth: 1 }}>
                                        <BSTextInput />
                                    </View>
                                </View>
                        });
                    }}
                    title="show_BottomSheet"
                    color="#331599"
                />
            </View>
        </SafeAreaView>
    )
}

export default NotifyExample;