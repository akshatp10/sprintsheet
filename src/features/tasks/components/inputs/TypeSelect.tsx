import Select, { type SelectOption } from '@/components/select/Select';

type ProjectType = {
  id: string;
  name: string;
};

type TypeSelectProps = {
  projectTypes: ProjectType[];
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  className?: string;
};

export default function TypeSelect({
  projectTypes,
  value,
  onChange,
  disabled = false,
  className,
}: TypeSelectProps) {
  const options: SelectOption[] = projectTypes.map((type) => ({
    label: type.name,
    value: type.id,
  }));

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select type"
      aria-label="Task type"
      searchable={false}
      disabled={disabled}
      className={className}
      height="32px"
      width="120px"
      triggerClassName="rounded-md border border-lines-hairline bg-surface px-2.5 text-type-caption text-ink-2 transition-colors hover:border-lines"
    />
  );
}
