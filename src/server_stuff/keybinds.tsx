'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const KeyBinds = () => {
    const router = useRouter();

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                router.push('/circle');
            }
            if (event.key === '1') {
                router.push('/');
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [router]);

    return null;
};

export default KeyBinds;
