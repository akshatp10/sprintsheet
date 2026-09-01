interface OutlineButtonProps {
    children: React.ReactNode;
    textColor: string;
    borderColor: string;
    handleClick: () => void;
    height?: string;
    width?: string;
}

const OutlineButton = (props: OutlineButtonProps) => {

    const { borderColor, handleClick, textColor, children, height, width } = { ...props };

    return (
        <button
            className={`cursor-pointer text-${textColor} border border-${borderColor} bg-transparent text-center m-1 px-2 text-type-body rounded-md ${height} ${width}`}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

export default OutlineButton
