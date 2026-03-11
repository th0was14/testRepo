import type { ComponentType } from 'react';
import type { FieldValues } from 'react-hook-form';
import TextField from '@form-engine/fields/TextField';
import SelectField from '@form-engine/fields/SelectField';
import CheckboxField from '@form-engine/fields/CheckboxField';
import RadioField from '@form-engine/fields/RadioField';
import TextAreaField from '@form-engine/fields/TextAreaField';
import DateRangeField from '@form-engine/fields/DateRangeField';
import NumberField from '@form-engine/fields/NumberField';
import EmailField from '@form-engine/fields/EmailField';
import PhoneField from '@form-engine/fields/PhoneField';
import FileField from '@form-engine/fields/FileField';
import type { FieldComponentProps } from '@form-engine/types';

type FieldComponent = ComponentType<FieldComponentProps<FieldValues>>;

export const fieldRegistry: Record<string, FieldComponent> = {
    text: TextField,
    date: TextField,
    password: TextField,
    select: SelectField,
    radio: RadioField,
    checkbox: CheckboxField,
    textarea: TextAreaField,
    dateRange: DateRangeField,
    number: NumberField,
    email: EmailField,
    phone: PhoneField,
    file: FileField,
};
