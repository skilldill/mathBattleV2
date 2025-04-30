import React, { ReactNode } from 'react';
import { useUserStore } from '../../store/userStore';

interface BlockForAuthUserProps {
    children: ReactNode;
}

export const BlockForAuthUser: React.FC<BlockForAuthUserProps> = ({ children }) => {
    const userId = useUserStore((state: { userId: string | undefined }) => state.userId);

    if (!userId) {
        return null;
    }

    return <>{children}</>;
};
