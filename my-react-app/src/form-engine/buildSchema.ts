import { z } from "zod";
import type { FormConfig, FieldConfig } from "@form-engine/types";

export const buildSchema = (config: FormConfig) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  config.sections.forEach((section) => {
    section.fields.forEach((field: FieldConfig) => {
      let validator: z.ZodTypeAny;

      switch (field.type) {
        case "text":
        case "password":
        case "select":
        case "radio":
          validator = z.string().optional();
          break;
        case "checkbox":
          validator = z.boolean().optional();
          break;
        default:
          validator = z.unknown();
      }

      if (field.validation?.required) {
        validator = validator.refine(
          (val) => val !== "" && val !== undefined && val !== null,
          "This field is required",
        );
      }

      if (field.validation?.minLength) {
        if (validator instanceof z.ZodString) {
          validator = validator.min(
            field.validation.minLength,
            `Minimum ${field.validation.minLength} characters`,
          );
        }
      }

      shape[field.name] = validator;
    });
  });

  return z.object(shape);
};
