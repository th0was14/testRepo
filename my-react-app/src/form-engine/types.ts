import type { FieldValues, Control } from 'react-hook-form';

export interface FieldOption {
    value: string;
    label: string;
}

export interface FieldConfig {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    options?: FieldOption[];
    validation?: {
        required?: boolean | string;
        minLength?: number | { value: number; message: string };
        maxLength?: number | { value: number; message: string };
        min?: number | { value: number; message: string };
        max?: number | { value: number; message: string };
        pattern?: string | { value: RegExp; message: string };
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
    control: Control<T>;
    error?: {
        message?: string;
    };
}
