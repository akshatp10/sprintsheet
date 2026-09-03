import { Search } from "lucide-react";

import { InputText } from "./InputText";
import { cn } from "@/lib/cn";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
};

const SearchInput = ({
    value,
    onChange,
    className,
    placeholder = "Search",
}: SearchInputProps) => {
    return (
        <div className={cn("relative", className)}>
            <Search
                size={14}
                strokeWidth={1.5}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-fades-placeholders pointer-events-none"
            />

            <InputText
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-8 w-64 py-1"
            />
        </div>
    );
};

export default SearchInput;