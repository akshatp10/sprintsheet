import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import type { SelectOption } from './Select';
import SearchInput from '../inputs/SearchInput';

type SelectDropdownProps = {
  /** Options to display in the dropdown list. */
  options: SelectOption[];

  /** Values of the currently selected options. */
  selectedValues: string[];

  /** Whether the dropdown supports searching options. */
  searchable: boolean;

  /** Whether the select uses a custom trigger instead of the default input trigger. */
  customTrigger: boolean;

  /** Current search query used to filter options by label. */
  search: string;

  /** Whether to display the loading state instead of the options list. */
  loading: boolean;

  /** Custom content to display while options are loading. */
  loadingContent?: ReactNode;

  /** Custom content to display when no options match the search query. */
  emptyContent?: ReactNode;

  /** Message to display when no options match and no custom empty content is provided. */
  emptyMessage: string;

  /** Maximum height of the dropdown and its scrollable options list, in pixels. */
  dropdownHeight: number;

  /** Additional CSS classes applied to the dropdown container. */
  className?: string;

  /** Additional CSS classes applied to each option. */
  itemClassName?: string;

  /** Additional CSS classes applied to selected options. */
  selectedItemClassName?: string;

  /** Additional CSS classes applied to disabled options. */
  disabledItemClassName?: string;

  /** Callback invoked when the search query changes. */
  onSearchChange: (value: string) => void;

  /** Callback invoked when an option is selected or deselected. */
  onSelect: (option: SelectOption) => void;

  /** Custom renderer for an option, receiving the option and its selected state. */
  renderOption?: (option: SelectOption, selected: boolean) => ReactNode;

  /** Custom renderer for an option's value when renderOption is not provided. */
  renderValue?: (option: SelectOption) => ReactNode;

  /** Returns additional CSS classes for an option based on its selected state. */
  getOptionClassName?: (option: SelectOption, selected: boolean) => string;

  /** Placeholder displayed when no value is selected or when searching. */
  placeholder?: string;
};

export function SelectDropdown({
  options,
  selectedValues,
  searchable,
  customTrigger,
  search,
  loading,
  loadingContent,
  emptyContent,
  emptyMessage,
  dropdownHeight,
  className,
  itemClassName,
  selectedItemClassName,
  disabledItemClassName,
  onSearchChange,

  onSelect,
  renderOption,
  renderValue,
  getOptionClassName,
  placeholder,
}: SelectDropdownProps) {
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div
      className={cn(
        'absolute z-50 w-full overflow-hidden rounded-md',
        'border border-lines-hairline bg-surface shadow-md',
        className,
      )}
      style={{ maxHeight: dropdownHeight }}
    >
      {customTrigger && searchable && (
        <div className="border-b border-lines-hairline p-2">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={!!placeholder ? placeholder : 'Search options...'}
            searchElementId="select-search"
            className="w-full"
          />
        </div>
      )}

      <div className="overflow-y-auto p-1" style={{ maxHeight: dropdownHeight }}>
        {loading
          ? (loadingContent ?? <p className="px-2 py-2 text-type-caption text-ink-3">Loading…</p>)
          : filteredOptions.length === 0
            ? (emptyContent ?? (
                <p className="px-2 py-2 text-type-caption text-ink-3">{emptyMessage}</p>
              ))
            : filteredOptions.map((option) => {
                const selected = selectedValues.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    aria-pressed={selected}
                    onClick={() => onSelect(option)}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-sm px-2 py-1.5',
                      'text-left text-type-body-sm',
                      'hover:bg-surface-raised',
                      selected && 'bg-surface-raised',
                      itemClassName,
                      selected && selectedItemClassName,
                      option.disabled && 'cursor-not-allowed opacity-50',
                      option.disabled && disabledItemClassName,
                      getOptionClassName?.(option, selected),
                    )}
                  >
                    <span className="min-w-0 flex-1">
                      {renderOption
                        ? renderOption(option, selected)
                        : renderValue
                          ? renderValue(option)
                          : option.label}
                    </span>

                    {selected && !renderOption && <Check size={14} className="shrink-0 text-ink" />}
                  </button>
                );
              })}
      </div>
    </div>
  );
}
