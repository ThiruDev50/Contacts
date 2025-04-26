export type OptionType = {
  label: string;
  value: string;
};

export type PopoverMenuProps = {
  label: string;
  options: OptionType[];
  selected: OptionType;
  onSelect: (option: OptionType) => void;
  showSelected?: boolean;
};