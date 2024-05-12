## 사용법

- App.tsx

```tsx
<NotifyProvider>
  ...
</NotifyProvider>
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
            cardRegist();
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
    isHandleVisible: false,
    marginHorizontal: 0,
    marginBottom: 0,
    padding: 0,
    isBottomRadius: false,
    component:
    <View style={{ padding: 50 }}>
        <View style={{ borderWidth: 1 }}>
            <BSTextInput />
        </View>
    </View>
});

```