import { SelectOption } from './SelectOption';

import type { SelectOption as SelectOptionType } from './types';

import { dropdownStyle } from './Select.css';

type SelectDropdownProps = {
  options: SelectOptionType[];
  placement: 'top' | 'bottom';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconSize: number;
  selectedValue: string | number | undefined;
  onSelect: (value: string | number) => void;
};

export const SelectDropdown = ({
  options,
  placement,
  size,
  iconSize,
  selectedValue,
  onSelect,
}: SelectDropdownProps) => {
  return (
    <div className={dropdownStyle({ placement })} role='listbox'>
      {options.map((option) => (
        <SelectOption
          key={option.value}
          option={option}
          size={size}
          iconSize={iconSize}
          isSelected={option.value === selectedValue}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
