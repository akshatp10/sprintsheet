interface OutlineButtonProps {
    buttonText: string;
    textColor: string;
    borderColor: string;
    handleClick: () => void;
}

const OutlineButton = (props: OutlineButtonProps) => {

    const { borderColor, handleClick, textColor, buttonText } = { ...props };

    return (
        <button
            className={`cursor-pointer text-${textColor} border border-${borderColor} bg-transparent w-[90%] text-center m-1 rounded-md`}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    )
}

export default OutlineButton
