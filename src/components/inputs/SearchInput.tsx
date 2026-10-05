import { Search } from 'lucide-react';

import { cn } from '@/lib/cn';
import Input from './Input';

type SearchInputProps = {
  /** Current search query displayed in the input and kept in sync with the parent component. */
  value: string;

  /** Handles changes to the search query and receives the updated input value on each keystroke. */
  onChange: (value: string) => void;

  /** Additional CSS classes applied to the search input's outer container, allowing its size, spacing, positioning, or other styles to be customized. */
  className?: string;

  /** Placeholder text displayed inside the input when no search query has been entered. Defaults to `Search`. */
  placeholder?: string;

  /** Automatically focuses the search input when the component mounts. Defaults to `false`. */
  autoFocus?: boolean;

  /** Id to be linked with searchbox to remove trigerring multiple elements in a single call. */
  searchElementId: string;
};
const SearchInput = ({
  value,
  onChange,
  className,
  placeholder = 'Search',
  autoFocus = false,
}: SearchInputProps) => {
  return (
    <div className="relative">
      <Search
        size={14}
        strokeWidth={1.5}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-fades-placeholders"
      />

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn('w-64 py-1 pl-8 placeholder:font-medium', className)}
        autoFocus={autoFocus}
        id="search"
      />
    </div>
  );
};

export default SearchInput;
