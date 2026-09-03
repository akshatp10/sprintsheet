import Text from '@/components/common/Text'
import { Check } from 'lucide-react'

interface FormStepCompontentProps {
    currentStep: number
    step: number
}

const FormStepCompontent = ({ currentStep, step }: FormStepCompontentProps) => {
    return (
        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${currentStep > step ? "bg-accent" : currentStep === step ? "border border-accent" : "border border-lines-control"}`}>
            {currentStep > step ?
                <Check className="text-accent-tint mt-px" size={10} />
                : <Text variant="mono" className={`pt-px ${currentStep === step ? "text-accent" : "text-ink-3"}`}>{step}</Text>}
        </div>
    )
}

export default FormStepCompontent