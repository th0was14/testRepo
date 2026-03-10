import type { FieldValues, UseFormRegister } from "react-hook-form";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  options?: FieldOption[];
  validation?: {
    required?: boolean;
    minLength?: number;
  };
  visibleWhen?:
    | {
        field: string;
        equals: unknown;
      }
    | {
        all: Array<{
          field: string;
          equals: unknown;
        }>;
      };
  [key: string]: unknown;
}

export interface SectionConfig {
  title: string;
  grid?: number;
  fields: FieldConfig[];
  [key: string]: unknown;
}

export interface FormConfig {
  sections: SectionConfig[];
  endpoint: string;
  method?: string;
  [key: string]: unknown;
}

export interface FieldComponentProps<T extends FieldValues = FieldValues> {
  field: FieldConfig;
  register: UseFormRegister<T>;
  error?: {
    message?: string;
  };
}
