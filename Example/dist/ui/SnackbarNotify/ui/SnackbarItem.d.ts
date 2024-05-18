import { ReactNode } from "react";
import { CustomSnackbarProps, SnackItem } from "../../../model/types";
declare const SnackbarItem: ({ customSnackbar, snackItem, hideSnackBar, }: {
    customSnackbar?: ((props: CustomSnackbarProps) => ReactNode) | undefined;
    snackItem: SnackItem;
    hideSnackBar: (index: number) => void;
}) => import("react").JSX.Element;
export default SnackbarItem;
//# sourceMappingURL=SnackbarItem.d.ts.map