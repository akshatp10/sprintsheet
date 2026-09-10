// features/tasks/components/inputs/TagInput.tsx
import { useState } from "react";
import { Plus, X } from "lucide-react";
import Input from "@/components/inputs/Input";
import { cn } from "@/lib/cn";
import Button from "@/components/button/Button";
import Text from "@/components/common/Text";

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
}

export function TagInput({ value, onChange }: TagInputProps) {
    const [input, setInput] = useState("");
    const [adding, setAdding] = useState(false);

    const addTag = () => {
        const tag = input.trim();
        if (!tag || value.includes(tag)) {
            setAdding(false);
            setInput("");
            return;
        }
        onChange([...value, tag]);
        setInput("");
        setAdding(false);
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    const commonClass = "flex items-center gap-1 rounded-md border border-lines-hairline bg-surface-2 px-2.5 py-1 text-ink-2"

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            {value.map((tag) => (
                <Text
                    variant="micro"
                    key={tag}
                    className={commonClass}
                >
                    {tag}
                    <Button variant="tertiary" type="button" onClick={() => removeTag(tag)} className="text-ink-3 hover:text-ink p-0 border-none">
                        <X className="w-3 h-3" />
                    </Button>
                </Text>
            ))}

            {adding ? (
                <Input
                    value={input}
                    onChange={setInput}
                    autoFocus
                    placeholder="Tag name"
                    className="w-24 h-6 px-1.5 py-0 text-type-caption"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                        }
                        if (e.key === "Escape") {
                            setAdding(false);
                            setInput("");
                        }
                    }}
                    onBlur={addTag}
                />
            ) : (
                <Button
                    variant="tertiary"
                    type="button"
                    onClick={() => setAdding(true)}
                    className={cn(commonClass, "border-dashed text-ink-3 hover:text-ink-2")}
                >
                    <Plus className="w-3 h-3" />
                    <Text variant="micro">
                        Add tag
                    </Text>
                </Button>
            )}
        </div>
    );
}