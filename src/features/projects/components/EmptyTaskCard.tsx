import Text from "@/components/common/Text";
import Button from "@/components/button/Button";
import { useState } from "react";
import NewProjectForm from "./forms/NewProjectForm";
import Mascot from "@/components/common/Mascot";

const EmptyTaskCard = () => {
    const [showForm, setShowForm] = useState(false)

    const handleClick = () => { setShowForm(true) }

    return (
        <>
            <Button onClick={handleClick} variant="tertiary" className="flex min-h-40 h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-accent-deep bg-accent-wash-selected">
                <Mascot expression="sleeping" renderAnimation />

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