> ### ⚠️ Project Archived
> 
> 이 프로젝트는 **아카이브** 상태입니다.
> 프로젝트의 주요 기능은 **ZS-ui**로 통합되었습니다.
> 
> 👉 [ZS-ui](https://github.com/0610studio/zs-ui)로 이동


https://github.com/0610studio/rn-notify/assets/39161206/15e46840-3c79-4310-972e-421316913be8


## 설치

```bash
"react-native-gesture-handler": "^2.16.0",
"react-native-reanimated": "^3.8.1",
"react-native-safe-area-context": "^4.9.0"

npm i @0610studio/rn-notify
```

## 사용법

- App.tsx

```tsx
<SafeAreaProvider>
    <NotifyProvider>
        ...
    </NotifyProvider>
</SafeAreaProvider>
```

- target component.tsx

```tsx
const { showAlert, showSnackBar, showBottomSheet } = useNotify();

showAlert({
    title: '타이틀 테스트 길어지면 줄바꿈이 될 수 있습니다.',
    informative: '테스트 informative 길어지면 줄바꿈이 될 수 있습니다.',
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


showSnackBar({
    message: Date.now().toString(),
    type: 'success',
});


showBottomSheet({
    component:
    <View style={{ padding: 50 }}>
        <View style={{ borderWidth: 1 }}>
            <BSTextInput />
        </View>
    </View>
});

// 스크롤 사용시
showBottomSheet({
    isHandleVisible: true,
    marginHorizontal: 0,
    marginBottom: 0,
    padding: 0,
    isBottomRadius: false,
    maxHeight: 500,
    contentsGestureEnable: false,
    component:
        <View style={{ width: '100%', paddingVertical: 30, backgroundColor: '#ff00ff' }}>
            {
                [...Array(11)].map((_, index) => {
                    return (
                        <View key={index} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ paddingVertical: 30 }}>{index}</Text>
                        </View>
                    )
                })
            }
        </View>
});


// 팝 오버 메뉴
<PopOverButton
    width={180}
    height={30}
    popOverMenuComponent={
        <View style={{ paddingVertical: 8, paddingHorizontal: 100, backgroundColor: '#ffffff', borderRadius: 14 }}>
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

```

.

### BottomSheet 내부 정의
showBottomSheet를 사용해서 component 전달시 component 내부에 정의된 함수가 갱신되지 않기 때문에 동적으로 사용하려면 아래 처럼 사용. 
```tsx
const bottomSheetRef = useRef<BottomSheetRef | null>(null);

const showBottomSheet = () => {
    bottomSheetRef.current?.handleVisible(true);
}

<BottomSheetNotify
    ref={bottomSheetRef}
    bottomSheetComponent={
        <View style={{ padding: 50 }}>
            <TextInput style={{ borderWidth: 1 }}></TextInput>
        </View>
    }
/>
```
