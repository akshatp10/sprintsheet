import Button from '@/components/button/Button';
import Text from '@/components/common/Text';
import { X } from 'lucide-react';

interface PopupHeaderProps {
  /** Callback triggered when the user clicks the close (`X`) button, allowing the parent popup to handle closing or exit confirmation. */
  onClose: () => void;

  /** Text displayed as the popup header title, identifying the content or purpose of the popup. Defaults to an empty string. */
  label?: string;
}

const PopupHeader = ({ onClose, label = '' }: PopupHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Text variant="h1">{label}</Text>

      <Button type="button" onClick={onClose} className="border-none" variant="tertiary">
        <X strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default PopupHeader;
