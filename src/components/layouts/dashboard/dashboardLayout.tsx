import { ReactNode } from "react";
import { AuthGuard } from "../../../guards";
import { VerticalLayout } from "./verticalLayout";

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

export const Layout = (props: LayoutProps) => {
    const { children } = props;
    return (
        <AuthGuard>
            <VerticalLayout>
                {children}
            </VerticalLayout>
        </AuthGuard>
    );
};