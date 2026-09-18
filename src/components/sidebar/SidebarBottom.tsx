import { currentUserEmail } from "@/config/features"
import ExtraOptionButton from "../button/ExtraOptionButton"
import SettingsButton from "../button/SettingsButton"
import UserPanel from "./UserPanel"

const SidebarBottom = () => {
    return (
        <div className="flex flex-col justify-center gap-3">
            <SettingsButton isAdmin />
            <hr className="text-lines-hairline" />
            <div className="flex w-full justify-between items-center">
                <UserPanel userName={currentUserEmail} isSidebar textVariant="h2" textColor="text-ink-2" />
                <ExtraOptionButton handleClick={() => { }} />
            </div>
        </div>
    )
}

export default SidebarBottom
