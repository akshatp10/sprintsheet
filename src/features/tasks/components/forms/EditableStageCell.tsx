import type { Stage } from '@/lib/services/stages/type';
import StageSelect from '../inputs/StageSelect';

interface EditableStageCellProps {
  stage: Stage;
  stages: Stage[];
  onChange: (stageId: string) => void;
  isDone?: boolean;
}

const EditableStageCell = ({ stage, stages, onChange, isDone }: EditableStageCellProps) => {
  return <StageSelect stages={stages} value={stage.id} onChange={onChange} isDone={isDone} />;
};

export default EditableStageCell;
