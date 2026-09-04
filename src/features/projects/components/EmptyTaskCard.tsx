import Text from "@/components/common/Text";
import EmptyTask from "@/assets/animations/Task_empty.svg"
import Button from "@/components/button/Button";
import { useState } from "react";
import NewProjectForm from "./forms/NewProjectForm";

const EmptyTaskCard = () => {
    const [showForm, setShowForm] = useState(false)

    const handleClick = () => { setShowForm(true) }

    return (
        <>
            <Button handleClick={handleClick} variant="tertiary" className="flex min-h-40 h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-accent-deep">
                <img
                    src={EmptyTask}
                    alt="Empty project"
                    className="h-16 w-16 object-contain"
                />

                <Text className="text-ink">
                    Start a project
                </Text>

                <Text className="text-ink-2" variant="body-sm">
                    Blank or from the standard sheet
                </Text>
            </Button>

            {showForm && <NewProjectForm onClose={() => setShowForm(false)} />}
        </>
    );
};

export default EmptyTaskCard;