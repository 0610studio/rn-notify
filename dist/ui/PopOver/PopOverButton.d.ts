import React from 'react';
import { ViewProps } from 'react-native';
interface PopOverButtonProps extends ViewProps {
    width: number;
    height: number;
    backgroundColor?: string;
    popOverMenuComponent: React.ReactNode;
}
declare const PopOverButton: React.FC<PopOverButtonProps>;
export default PopOverButton;
//# sourceMappingURL=PopOverButton.d.ts.map