import { z } from 'zod';

export type OpenAPISchema = {
    components?: {
        schemas?: Record<string, any>;
    };
};

export type SchemaProperty = {
    type?: string;
    format?: string;
    enum?: string[];
    description?: string;
    example?: any;
    items?: any;
};

export type FormFieldConfig = {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    validation?: {
        required?: boolean | string;
        minLength?: number | { value: number; message: string };
        maxLength?: number | { value: number; message: string };
        min?: number | { value: number; message: string };
        max?: number | { value: number; message: string };
    };
};

export type FormSchemaConfig = {
    endpoint: string;
    method: string;
    sections: Array<{
        title: string;
        grid?: number;
        fields: FormFieldConfig[];
    }>;
};

/**
 * Mappe les types TypeScript/OpenAPI vers les types FormEngine
 */
export function mapTypeToFormFieldType(property: SchemaProperty, propertyName: string): string {
    const { type, format, enum: enumValues } = property;

    // Les enums deviennent des selects
    if (enumValues && enumValues.length > 0) {
        return 'select';
    }

    // Marquer les formats spécialisés
    if (type === 'string') {
        if (format === 'email') return 'email';
        if (format === 'date') return 'date';
        if (format === 'phone' || propertyName.toLowerCase().includes('phone')) return 'phone';
        return 'text';
    }

    if (type === 'integer' || type === 'number') {
        return 'number';
    }

    if (type === 'boolean') {
        return 'checkbox';
    }

    return 'text';
}

/**
 * Convertit un schema OpenAPI en champ FormEngine
 */
export function schemaPropertyToFormField(propertyName: string, property: SchemaProperty, isRequired: boolean = false): FormFieldConfig {
    const fieldType = mapTypeToFormFieldType(property, propertyName);

    const field: FormFieldConfig = {
        name: propertyName,
        type: fieldType,
        label: formatLabel(propertyName),
        validation: {
            required: isRequired,
        },
    };

    // Ajouter les options pour les enums
    if (property.enum && property.enum.length > 0) {
        field.options = property.enum.map((value) => ({
            value,
            label: value,
        }));
    }

    // Ajouter le placeholder basé sur le type
    if (fieldType === 'email') {
        field.placeholder = 'exemple@mail.com';
    } else if (fieldType === 'text') {
        field.placeholder = `Entrez ${field.label?.toLowerCase() || propertyName}...`;
    }

    return field;
}

/**
 * Convertit un nom camelCase/snake_case en label formaté
 */
export function formatLabel(name: string): string {
    return name
        .replace(/([A-Z])/g, ' $1') // Ajouter un espace avant les majuscules
        .replace(/_/g, ' ') // Remplacer les underscores par des espaces
        .replace(/\b\w/g, (l) => l.toUpperCase()) // Capitaliser chaque mot
        .trim();
}

/**
 * Génère une configuration FormEngine à partir d'un schema OpenAPI
 */
export function generateFormConfigFromSchema(
    resourceName: string,
    schema: any,
    endpoint: string = '/api/' + resourceName.toLowerCase(),
): FormSchemaConfig {
    const properties = schema.properties || {};
    const required = schema.required || [];

    const fields = Object.entries(properties)
        .filter(([key]) => key !== 'id') // Exclure l'ID
        .map(([propertyName, property]) => schemaPropertyToFormField(propertyName, property as SchemaProperty, required.includes(propertyName)));

    // Diviser les champs en deux colonnes si plus de 4 champs
    const grid = fields.length > 4 ? 2 : 1;

    return {
        endpoint,
        method: 'POST',
        sections: [
            {
                title: `Créer/Modifier ${formatLabel(resourceName)}`,
                grid,
                fields,
            },
        ],
    };
}

/**
 * Extrait les noms des ressources d'un swagger
 */
export function extractResourcesFromSwagger(swagger: OpenAPISchema): string[] {
    const schemas = swagger.components?.schemas || {};
    const inputSchemas = Object.keys(schemas).filter((name) => name.endsWith('Input'));

    // Retourner les noms sans le suffixe "Input"
    return inputSchemas.map((name) => name.replace(/Input$/, '')).sort();
}
