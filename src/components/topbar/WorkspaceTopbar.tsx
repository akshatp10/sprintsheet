import { ChevronDown } from "lucide-react"
import Button from "../button/Button"
import Text from "../common/Text"

const WorkspaceTopbar = () => {
    return (
        <div className="flex justify-between items-center w-full">
            {/* Workspace Dropdown */}
            <Button handleClick={() => { }} variant='tertiary' className='border-0 flex justify-center items-center gap-2'>
                <Text variant="h2">Alter Office</Text>
                <ChevronDown size={15} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
            </Button>


            {/* Right side containing search project and new project buttons */}
            <div className="flex items-center gap-2">
                <input type="text" name="searchProject" id="searchProject"
                    className="bg-surface rounded-md border border-lines-hairline focus:outline-0 px-2 py-1 text-ink placeholder:text-ink-fades-placeholders h-full"
                    placeholder="Seach projects"
                />

                <Button variant="secondary" className="h-full" handleClick={() => { }}>
                    + New Project
                </Button>
            </div>
        </div>
    )
}

export default WorkspaceTopbar
