interface OutlineButtonProps {
    buttonText: string;
    textColor: string;
    borderColor: string;
    handleClick: () => void;
    height?: string;
    width?: string;
}

const OutlineButton = (props: OutlineButtonProps) => {

    const { borderColor, handleClick, textColor, buttonText, height, width } = { ...props };

    return (
        <button
            className={`cursor-pointer text-${textColor} border border-${borderColor} bg-transparent text-center m-1 px-2 text-type-body rounded-md ${height} ${width}`}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    )
}

export default OutlineButton
