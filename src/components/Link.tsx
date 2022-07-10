import { ReactNode } from 'react';
import { useRouter } from '../router';

export default function Link({
    children,
    route,
}: {
    children: ReactNode;
    route: string;
}) {
    const router = useRouter();
    return (
        <span
            onClick={() => router.setRoute(route)}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </span>
    );
}
