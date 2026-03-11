import { z } from 'zod';
import type { FormConfig, FieldConfig } from '@form-engine/types';

export const buildSchema = (config: FormConfig) => {
    const shape: Record<string, z.ZodTypeAny> = {};

    config.sections.forEach((section) => {
        section.fields.forEach((field: FieldConfig) => {
            let validator: z.ZodTypeAny;

            switch (field.type) {
                case 'text':
                case 'password':
                case 'select':
                case 'radio':
                case 'email':
                case 'phone':
                case 'textarea':
                    validator = z.string().optional();
                    break;
                case 'date':
                    validator = z.string().optional();
                    break;
                case 'number':
                    validator = z.number().or(z.string()).optional();
                    break;
                case 'checkbox':
                    validator = z.boolean().optional();
                    break;
                case 'dateRange':
                    validator = z
                        .object({
                            from: z.string().optional(),
                            to: z.string().optional(),
                        })
                        .optional();
                    break;
                case 'file':
                    validator = z.instanceof(File).optional();
                    break;
                default:
                    validator = z.unknown().optional();
            }

            // Handle required validation
            if (field.validation?.required) {
                const requiredMessage = typeof field.validation.required === 'string' ? field.validation.required : 'This field is required';

                if (field.type === 'checkbox') {
                    validator = validator.refine((val) => val === true, requiredMessage);
                } else if (field.type === 'dateRange') {
                    validator = validator.refine((val) => val && (val.from || val.to), requiredMessage);
                } else {
                    validator = validator.refine((val) => val !== '' && val !== undefined && val !== null, requiredMessage);
                }
            }

            // Handle minLength validation
            if (field.validation?.minLength) {
                const minLengthValue = typeof field.validation.minLength === 'number' ? field.validation.minLength : field.validation.minLength.value;
                const minLengthMessage =
                    typeof field.validation.minLength === 'object' ? field.validation.minLength.message : `Minimum ${minLengthValue} characters`;

                if (validator instanceof z.ZodString || field.type === 'textarea') {
                    validator = validator.min(minLengthValue, minLengthMessage);
                }
            }

            // Handle maxLength validation
            if (field.validation?.maxLength) {
                const maxLengthValue = typeof field.validation.maxLength === 'number' ? field.validation.maxLength : field.validation.maxLength.value;
                const maxLengthMessage =
                    typeof field.validation.maxLength === 'object' ? field.validation.maxLength.message : `Maximum ${maxLengthValue} characters`;

                if (validator instanceof z.ZodString || field.type === 'textarea') {
                    validator = validator.max(maxLengthValue, maxLengthMessage);
                }
            }

            // Handle min validation (for numbers)
            if (field.validation?.min) {
                const minValue = typeof field.validation.min === 'number' ? field.validation.min : field.validation.min.value;
                const minMessage = typeof field.validation.min === 'object' ? field.validation.min.message : `Minimum value is ${minValue}`;

                if (field.type === 'number') {
                    validator = validator.refine((val) => !val || val >= minValue, minMessage);
                }
            }

            // Handle max validation (for numbers)
            if (field.validation?.max) {
                const maxValue = typeof field.validation.max === 'number' ? field.validation.max : field.validation.max.value;
                const maxMessage = typeof field.validation.max === 'object' ? field.validation.max.message : `Maximum value is ${maxValue}`;

                if (field.type === 'number') {
                    validator = validator.refine((val) => !val || val <= maxValue, maxMessage);
                }
            }

            // Handle pattern validation
            if (field.validation?.pattern) {
                let pattern: RegExp;
                let patternMessage: string;

                if (typeof field.validation.pattern === 'string') {
                    // Predefined patterns
                    switch (field.validation.pattern) {
                        case 'email':
                            pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            patternMessage = 'Invalid email address';
                            break;
                        case 'phone':
                            pattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
                            patternMessage = 'Invalid phone number';
                            break;
                        case 'url':
                            pattern = /^https?:\/\/.+/;
                            patternMessage = 'Invalid URL';
                            break;
                        default:
                            pattern = new RegExp(field.validation.pattern);
                            patternMessage = 'Invalid format';
                    }
                } else {
                    pattern = field.validation.pattern.value;
                    patternMessage = field.validation.pattern.message;
                }

                if (validator instanceof z.ZodString) {
                    validator = validator.regex(pattern, patternMessage);
                }
            }

            shape[field.name] = validator;
        });
    });

    return z.object(shape);
};
