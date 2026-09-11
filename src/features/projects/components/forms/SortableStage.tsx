import { useState } from "react";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";

import type { FieldArrayWithId } from "react-hook-form";
import type { ProjectFormData } from "../../types/projectFormData";

import ProjectStage from "./ProjectStage";

type StageField = FieldArrayWithId<
    ProjectFormData,
    "stages",
    "id"
>;

interface SortableStageProps {
    stage: StageField;
    index: number;
    total: number;
}

const stageColors: Record<string, string> = {
    Backlog: "bg-stage-backlog-dot",
    Todo: "bg-stage-todo-dot",
    "In progress": "bg-stage-progress-dot",
    "In QA": "bg-stage-qa-dot",
    Done: "bg-stage-done-dot",
    Blocked: "bg-stage-blocked-dot",
};

const SortableStage = ({
    stage,
    index,
    total,
}: SortableStageProps) => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    const sortable = useSortable({
        id: stage.id,
        index,
        element,
        modifiers: [
            RestrictToElement.configure({
                element: element?.parentElement,
            }),
        ],
    });


    return (
        <div
            ref={setElement}
            className="flex h-10 items-center rounded-md bg-surface border border-lines-hairline"
        >
            <div
                ref={(node) => sortable.handleRef(node)}
                className="shrink-0 cursor-grab px-3"
            >
                <GripVertical className="h-4 w-4 text-ink-3" />
            </div>

            <div className="min-w-0 flex-1">
                <ProjectStage
                    color={stageColors[stage.name] ?? "bg-ink-3"}
                    label={stage.name}
                    tag={
                        index === 0
                            ? "start"
                            : index === total - 1
                                ? "terminal"
                                : null
                    }
                />
            </div>
        </div>
    );
};

export default SortableStage;
