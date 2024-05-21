import React, { useCallback, useRef, useState } from 'react';
import { View, Pressable, ViewProps, LayoutChangeEvent } from 'react-native';
import { useNotify } from '../../model/useNotifyProvider';

interface PopOverButtonProps extends ViewProps {
  popOverMenuComponent: React.ReactNode;
}

const PopOverButton = ({
  popOverMenuComponent,
  ...props
}: PopOverButtonProps) => {
  const [rightX, setRightX] = useState<number>();
  const [bottomY, setBottomY] = useState<number>();
  const buttonRef = useRef<View>(null);
  const {
    showPopOverMenu
  } = useNotify();

  const handlePress = useCallback(() => {
    if (rightX && bottomY) {
      showPopOverMenu({ px: rightX, py: bottomY, component: popOverMenuComponent });
    }
  }, [rightX, bottomY]);

  const onLayout = (event: LayoutChangeEvent) => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      if (px !== undefined && px !== null) {
        const getX = px + width;
        setRightX(getX)
      }
      if (py !== undefined && py !== null) {
        const getY = py + height;
        setBottomY(getY);
      }
    });
  };


  return (
    <Pressable onPress={handlePress} style={{ alignItems: 'flex-start' }}>
      <View ref={buttonRef} onLayout={onLayout}>
        {props.children}
      </View>
    </Pressable>
  );
};

export default PopOverButton;
