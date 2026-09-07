import { useEffect } from "react";

const useShortcutSearch = (
    key: string,
    callback: () => void
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.ctrlKey &&
                event.key.toLowerCase() === key.toLowerCase()
            ) {
                event.preventDefault();
                callback();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [key, callback]);
};

export default useShortcutSearch;