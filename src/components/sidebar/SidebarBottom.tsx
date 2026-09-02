import SettingsButton from "../button/SettingsButton"
import UserPanelSidebar from "./UserPanelSidebar"

const SidebarBottom = () => {
    return (
        <div className="flex flex-col justify-center gap-3">
            <SettingsButton isAdmin />
            <hr className="text-lines-hairline" />
            <UserPanelSidebar userName="Akshat Pratyush" />
        </div>
    )
}

export default SidebarBottom
