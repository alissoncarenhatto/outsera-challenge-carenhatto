export interface TableColumn {
  key: string;
  label: string;
  isFilter?: boolean;
  type?: 'input' | 'select';
  options?: { value: any; viewValue: string }[];
  width?: string;
  align?: 'left' | 'center' | 'right';
}