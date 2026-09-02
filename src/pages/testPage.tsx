import OutlineButton from "@/components/button/Button"
import GlobalChip from "@/components/chips/GlobalChip"
import ProgressBar from "@/components/common/ProgressBar"
import AvatarGroup from "@/components/identity/AvatarGroups"
import ChipAvatar from "@/components/identity/ChipAvatar"
import UserAvatar from "@/components/identity/UserAvatar"
import { RadioButton } from "@/components/inputs/RadioButton"
import { useState } from "react"

export const TestPage = () => {

    const [radioButtonOption, setradioButtonOption] = useState("table")

    const testClick = () => { console.log("handleClick") }
    return (
        <div className="text-type-body">
            <OutlineButton variant="primary" handleClick={testClick} className="bg-accent-deep text-accent-tint text-type-micro">
                + Button
            </OutlineButton>
            <OutlineButton variant="secondary" handleClick={testClick}>
                % Backlog
            </OutlineButton>
            <OutlineButton variant="tertiary" handleClick={testClick}>
                Default
            </OutlineButton>
            <UserAvatar userName="Rohit" variant="amber" isSideBar />
            <AvatarGroup>
                <UserAvatar userName="Manya" variant="rose" />
                <UserAvatar userName="Saransh" variant="blue" />
                <UserAvatar userName="Akshat" variant="purple" />
                <ChipAvatar extraUsers={5} />
            </AvatarGroup>

            <RadioButton
                options={[
                    { label: "Table", value: "table" },
                    { label: "Grid", value: "grid" },
                ]}
                value={radioButtonOption}
                onChange={setradioButtonOption}
            />

            <GlobalChip text="this is a chip" variant="secondary" textType="text-type-micro" />
            <ProgressBar progress={9} color="bg-stage-blocked-dot" />

        </div>
    )
}
