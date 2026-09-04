import { ChevronDown } from "lucide-react"
import Button from "../button/Button"
import Text from "../common/Text"
import { useState } from "react"
import SearchInput from "../inputs/SearchInput"
import NewProjectForm from "@/features/projects/components/forms/NewProjectForm"

const WorkspaceTopbar = () => {
    const [searchProject, setSearchProject] = useState("")
    const [showForm, setShowForm] = useState(false)

    const handleClick = () => { setShowForm(true) }
    return (
        <>
            <div className="flex justify-between items-center w-full">
                {/* Workspace Dropdown */}
                <Button handleClick={() => { }} variant='tertiary' className='border-0 flex justify-center items-center gap-2'>
                    <Text variant="h2">Alter Office</Text>
                    <ChevronDown size={15} strokeWidth={1.5} className="text-ink-fades-ghost-rows" />
                </Button>


                {/* Right side containing search project and new project buttons */}
                <div className="flex items-center gap-2">
                    <SearchInput value={searchProject} onChange={setSearchProject} placeholder="Search projects, tasks..." />

                    <Button variant="secondary" className="h-full font-medium" handleClick={handleClick}>
                        + New Project
                    </Button>
                </div>
            </div>

            {showForm && <NewProjectForm onClose={() => setShowForm(false)} />}
        </>
    )
}

export default WorkspaceTopbar
