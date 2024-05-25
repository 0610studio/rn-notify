import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useNotify } from "../dist";
import BSTextInput from "../dist/ui/BottomSheetNotify/ui/BSTextInput";
import PopOverButton from "../dist/ui/PopOver/PopOverButton";

const NotifyExample = () => {
    const { showAlert, showSnackBar, showBottomSheet, hideNotify } = useNotify();

    return (
        <SafeAreaView>
            <View style={{ gap: 30, marginTop: 30 }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <PopOverButton
                        width={100}
                        height={30}
                        popOverMenuComponent={
                            <View style={{ paddingVertical: 8, paddingHorizontal: 20, backgroundColor: '#ffffff', borderRadius: 14 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <Text style={{ color: 'red' }}>삭제하기</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <Text style={{ color: 'orange' }}>수정하기</Text>
                                </View>
                            </View>
                        }
                    >
                        <View style={{ paddingRight: 10, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: 'grey', borderRadius: 30, paddingVertical: 10 }}>
                            <Text style={{ color: 'black', paddingLeft: 12 }}>팝오버 메뉴</Text>
                            <View style={{ width: 30, height: 30, borderRadius: 18, borderWidth: 2.2, borderColor: '#ff00ff', marginLeft: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#ff00ff' }}></View>
                                <View style={{ width: 4, height: 4, borderRadius: 2, marginVertical: 3, backgroundColor: '#ff00ff' }}></View>
                                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#ff00ff' }}></View>
                            </View>
                        </View>

                    </PopOverButton>
                </View>

                <Button
                    onPress={() => {
                        showAlert({
                            title: '타이틀 테스트 길어지면 줄바꿈이 될 수 있습니다.',
                            informative: '테스트 informative 길~~~~~~~~어지면 줄바꿈이 될 수 있습니다.',
                            primaryButtonStyle: {
                                backgroundColor: '#FF7F00',
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
                                <View style={{ padding: 50, backgroundColor: 'white' }}>
                                    <View style={{ borderWidth: 1 }}>
                                        <BSTextInput />
                                    </View>

                                    <TouchableOpacity style={{ padding: 30 }} onPress={() => { hideNotify('bottomSheet') }}>
                                        <Text>닫기</Text>
                                    </TouchableOpacity>
                                </View>
                        });
                    }}
                    title="show_BottomSheet"
                    color="#331599"
                />

                <TextInput style={{width:'100%', height:50,borderWidth:1}}></TextInput>
            </View>
        </SafeAreaView>
    )
}

export default NotifyExample;