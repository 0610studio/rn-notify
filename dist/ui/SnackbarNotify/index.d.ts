import React, { ReactNode } from "react";
import { CustomSnackbarProps } from "../../model/types";
declare const SnackbarNotify: ({ customSnackbar }: {
    customSnackbar?: ((props: CustomSnackbarProps) => ReactNode) | undefined;
}) => React.JSX.Element | null;
export default SnackbarNotify;
//# sourceMappingURL=index.d.ts.map