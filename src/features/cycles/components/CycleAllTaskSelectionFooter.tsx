import Button from "@/components/button/Button";
import Text from "@/components/common/Text";
import { ArrowUpToLine, Inbox } from "lucide-react";

// interface CycleAllTaskSelectionFooterProps { }

const CycleAllTaskSelectionFooter = () => {
    return (
        <div className="flex w-full items-center justify-between px-4 py-2 bg-black text-white">
            <div className="flex gap-3 items-center">
                <Button variant="primary" className="bg-white/25">
                    {2} selected
                </Button>
                <Text className="text-ink-3">Set status</Text>
                <Text className="text-ink-3">Assign</Text>
                <Button
                    variant="secondary"
                    className="border-ink-3 text-white shadow-none flex items-center gap-1"
                >
                    <ArrowUpToLine strokeWidth={1.5} size={15} /> Add to{" "}
                    {"Sep 18 - Sep 20"}
                </Button>
                <Button
                    variant="secondary"
                    className="border-ink-3 text-white shadow-none flex items-center gap-1"
                >
                    <Inbox strokeWidth={1.5} size={15} /> Move to Backlog
                </Button>
            </div>
        </div>
    );
};

export default CycleAllTaskSelectionFooter;
