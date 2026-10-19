import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/cn';
import { SelectDropdown } from './SelectDropdown';

export type SelectOption = {
  /** Text displayed for the option. */
  label: string;
  /** Unique value identifying the option. */
  value: string;
  /** Whether the option is disabled and cannot be selected. */
  disabled?: boolean;
};

type TriggerContext = {
  /** Whether the dropdown is currently open. */
  open: boolean;
  /** Option objects corresponding to the currently selected values. */
  selectedOptions: SelectOption[];
  /** Toggles the dropdown between its open and closed states. */
  toggleOpen: () => void;
};

type SharedProps = {
  /** Available options displayed in the dropdown. */
  options: SelectOption[];
  /** Placeholder displayed when no value is selected or when searching. */
  placeholder?: string;
  /** Additional CSS classes applied to the root container. */
  className?: string;
  /** Additional CSS classes applied to the default search input. */
  inputClassName?: string;
  /** Additional CSS classes applied to the trigger container. */
  triggerClassName?: string;
  /** Additional CSS classes applied to the dropdown list container. */
  listClassName?: string;
  /** Additional CSS classes applied to each dropdown option. */
  itemClassName?: string;
  /** Additional CSS classes applied to selected dropdown options. */
  selectedItemClassName?: string;
  /** Additional CSS classes applied to disabled dropdown options. */
  disabledItemClassName?: string;
  /** Width of the select container. Defaults to auto. */
  width?: string;
  /** Height of the default trigger. Defaults to 28px. */
  height?: string;
  /** Whether users can search options by their labels. Defaults to true. */
  searchable?: boolean;
  /** Whether the select and its interactions are disabled. Defaults to false. */
  disabled?: boolean;
  /** Whether to display a button for clearing the current selection. */
  clearable?: boolean;
  /** Message displayed when no options match the search query. */
  emptyMessage?: string;
  /** Whether options are currently loading. */
  loading?: boolean;
  /** Custom content displayed while options are loading. */
  loadingContent?: ReactNode;
  /** Custom content displayed when no options match the search query. */
  emptyContent?: ReactNode;
  /** Controls dropdown placement. Auto chooses based on viewport space. */
  dropdownPlacement?: 'auto' | 'top' | 'bottom';
  /** Maximum height of the dropdown in pixels. */
  dropdownHeight?: number;
  /** Vertical gap between the trigger and dropdown in pixels. */
  dropdownOffset?: number;
  /** Name attribute applied to the default input element. */
  name?: string;
  /** Custom renderer for the trigger. */
  renderTrigger?: (context: TriggerContext) => ReactNode;
  /** Custom renderer for each dropdown option. */
  renderOption?: (option: SelectOption, selected: boolean) => ReactNode;
  /** Renderer for the option content when renderOption is not provided. */
  renderValue?: (option: SelectOption) => ReactNode;
  /** Returns additional CSS classes for an option. */
  getOptionClassName?: (option: SelectOption, selected: boolean) => string;
};

type SingleSelectProps = SharedProps & {
  mode?: 'single';
  value: string | null;
  onChange: (value: string | null) => void;
};

type MultiSelectProps = SharedProps & {
  mode: 'multiple';
  value: string[];
  onChange: (value: string[]) => void;
};

export type SelectProps = SingleSelectProps | MultiSelectProps;

const DEFAULT_DROPDOWN_HEIGHT = 240;
const DEFAULT_DROPDOWN_OFFSET = 6;

/**
 * Reusable select component supporting single and multiple selection,
 * searchable options, custom rendering, loading states, and configurable
 * dropdown placement.
 */
export default function Select(props: SelectProps) {
  const {
    options,
    placeholder = 'Select an option',
    className,
    inputClassName,
    triggerClassName,
    listClassName,
    itemClassName,
    selectedItemClassName,
    disabledItemClassName,
    width = 'auto',
    height = '28px',
    searchable = true,
    disabled = false,
    clearable = false,
    emptyMessage = 'No options found',
    loading = false,
    loadingContent,
    emptyContent,
    dropdownPlacement = 'auto',
    dropdownHeight = DEFAULT_DROPDOWN_HEIGHT,
    dropdownOffset = DEFAULT_DROPDOWN_OFFSET,
    name,
    renderTrigger,
    renderOption,
    renderValue,
    getOptionClassName,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openUpward, setOpenUpward] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValues =
    props.mode === 'multiple' ? props.value : props.value === null ? [] : [props.value];

  const selectedOptions = options.filter(({ value }) => selectedValues.includes(value));

  const selectedLabel = selectedOptions.map(({ label }) => label).join(', ');

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  const toggleOpen = () => {
    if (disabled) return;

    if (open) {
      close();
    } else {
      setSearch('');
      setOpen(true);
    }
  };

  const selectOption = (option: SelectOption) => {
    if (disabled || option.disabled) return;

    if (props.mode === 'multiple') {
      props.onChange(
        props.value.includes(option.value)
          ? props.value.filter((value) => value !== option.value)
          : [...props.value, option.value],
      );
    } else {
      props.onChange(option.value);
      close();
    }
  };

  const clearSelection = () => {
    if (disabled) return;

    if (props.mode === 'multiple') {
      props.onChange([]);
    } else {
      props.onChange(null);
    }

    setSearch('');
  };

  useEffect(() => {
    if (!open || dropdownPlacement !== 'auto') return;

    const updatePlacement = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenUpward(spaceBelow < dropdownHeight + dropdownOffset && spaceAbove > spaceBelow);
    };

    updatePlacement();
    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [open, dropdownPlacement, dropdownHeight, dropdownOffset]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  const openAbove = dropdownPlacement === 'top' || (dropdownPlacement === 'auto' && openUpward);

  return (
    <div
      ref={containerRef}
      className={cn('relative min-w-0', className)}
      style={width === 'auto' ? undefined : { width }}
    >
      {renderTrigger ? (
        <div className={triggerClassName}>
          {renderTrigger({ open, selectedOptions, toggleOpen })}
        </div>
      ) : (
        <div
          className={cn(
            'flex w-full min-w-0 items-center gap-1 rounded-md',
            'border border-lines-hairline bg-surface px-2 py-0.5',
            'font-medium text-type-body-sm',
            disabled && 'cursor-not-allowed opacity-50',
            triggerClassName,
          )}
          style={{ height, boxSizing: 'border-box' }}
        >
          <input
            name={name}
            autoComplete="off"
            disabled={disabled}
            readOnly={!searchable}
            placeholder={placeholder}
            value={open && searchable ? search : selectedLabel}
            onChange={(event) => {
              setSearch(event.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => {
              if (!disabled && !open) {
                setSearch('');
                setOpen(true);
              }
            }}
            className={cn(
              'h-full w-full min-w-0 flex-1 bg-transparent',
              'border-none p-0 text-inherit outline-none',
              'placeholder:text-ink-fades-placeholders focus:outline-none focus:ring-0',
              inputClassName,
            )}
          />

          {clearable && selectedValues.length > 0 && (
            <button
              type="button"
              aria-label="Clear selection"
              disabled={disabled}
              onClick={clearSelection}
              className="shrink-0 text-ink-3 hover:text-ink"
            >
              <X size={14} />
            </button>
          )}

          <button
            type="button"
            aria-label={open ? 'Close options' : 'Open options'}
            aria-expanded={open}
            disabled={disabled}
            onClick={toggleOpen}
            className="shrink-0 text-ink-3 hover:text-ink"
          >
            <ChevronDown size={15} className={cn('transition-transform', open && 'rotate-180')} />
          </button>
        </div>
      )}

      {open && !disabled && (
        <div
          className={cn('absolute z-50 w-full', openAbove ? 'bottom-full' : 'top-full')}
          style={{
            marginTop: openAbove ? 0 : dropdownOffset,
            marginBottom: openAbove ? dropdownOffset : 0,
          }}
        >
          <SelectDropdown
            options={options}
            selectedValues={selectedValues}
            searchable={searchable}
            customTrigger={Boolean(renderTrigger)}
            search={search}
            loading={loading}
            loadingContent={loadingContent}
            emptyContent={emptyContent}
            emptyMessage={emptyMessage}
            dropdownHeight={dropdownHeight}
            className={cn('relative', listClassName)}
            itemClassName={itemClassName}
            selectedItemClassName={selectedItemClassName}
            disabledItemClassName={disabledItemClassName}
            onSearchChange={setSearch}
            onSelect={selectOption}
            renderOption={renderOption}
            renderValue={renderValue}
            getOptionClassName={getOptionClassName}
            placeholder={placeholder}
          />
        </div>
      )}
    </div>
  );
}
