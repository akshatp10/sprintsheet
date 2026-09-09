import Avatar from "@/components/avatar/Avatar"
import AvatarGroup from "@/components/avatar/AvatarGroups"
import Button from "@/components/button/Button"
import Chip from "@/components/chips/Chip"
import Tabs from "@/components/inputs/Tabs"
import ProgressBar from "@/components/progressBar/ProgressBar"
import { useState } from "react"

export const TestPage = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")

    const testClick = () => { console.log("handleClick") }
    return (
        <div className="text-type-body">
            <Button variant="primary" handleClick={testClick} className="bg-accent-deep text-accent-tint text-type-micro">
                + Button
            </Button>
            <Button variant="secondary" handleClick={testClick}>
                % Backlog
            </Button>
            <Button variant="tertiary" handleClick={testClick}>
                Default
            </Button>
            <Avatar userName="Rohit" isSideBar />
            <AvatarGroup>
                <Avatar userName="Manya" />
                <Avatar userName="Saransh" />
                <Avatar userName="Akshat" />
                <Avatar extraUsers={5} />
            </AvatarGroup>
            <Avatar userName={null} />

            <Tabs
                tabs={[
                    { label: "Table", value: "table" },
                    { label: "Grid", value: "grid" },
                ]}
                activeTab={radioButtonOption}
                onChange={setradioButtonOption}
            />

            <Chip text="this is a chip" variant="secondary" textType="text-type-micro" />
            <ProgressBar progress={90} color="bg-stage-blocked-dot" />

        </div>
    )
}
