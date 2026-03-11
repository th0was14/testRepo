# Guide d'Utilisation FormEngine - Version 2.0

## Table des matières
1. [Introduction](#introduction)
2. [Utilisation basique](#utilisation-basique)
3. [Structure du fichier JSON](#structure-du-fichier-json)
4. [Types de champs disponibles](#types-de-champs-disponibles)
5. [Validation avancée](#validation-avancée)
6. [Visibilité conditionnelle](#visibilité-conditionnelle)
7. [Scalabilité - Ajouter de nouveaux fields](#scalabilité---ajouter-de-nouveaux-fields)
8. [Mise en page et grilles](#mise-en-page-et-grilles)
9. [Exemples avancés](#exemples-avancés)
10. [Bonnes pratiques](#bonnes-pratiques)

---

## Introduction

**FormEngine 2.0** est un moteur de formulaire déclaratif basé sur JSON pour React. Il utilise `Controller` de react-hook-form pour une meilleure intégration et une gestion des erreurs avancée.

### Caractéristiques principales
- 🎯 **Déclaratif** : Définissez les formulaires en JSON
- ✅ **Validation avancée** : Validation côté client avec Zod + 12 types de champs
- 👁️ **Visibilité conditionnelle** : Affichez/masquez les champs selon les conditions
- 🔌 **Extensible** : Ajoutez facilement de nouveaux types de champs via Controller
- 📱 **Responsive** : Système de grille CSS intégré
- 🔄 **API prête** : Soumission automatique vers un endpoint
- 🎨 **Messages d'erreur** : Affichage automatique avec indicateurs visuels

### Améliorations v2.0
- **Controller** : Utilisation de Controller au lieu de register pour meilleure intégration
- **12 types de champs** : De nouveaux champs comme email, phone, number, textarea, dateRange, file
- **Messages personnalisés** : Messages d'erreur customisables pour chaque validation
- **Validation avancée** : Pattern, minLength, maxLength, min, max avec messages

---

## Utilisation basique

### Étape 1 : Importer et utiliser FormEngine

```tsx
import FormEngine from "@/form-engine/FormEngine";
import formConfig from "./form.json";

export default function MyPage() {
  return (
    <div className="p-8">
      <h1>Mon Formulaire</h1>
      <FormEngine config={formConfig} />
    </div>
  );
}
```

### Étape 2 : Créer un fichier `form.json`

```json
{
  "endpoint": "/api/my-endpoint",
  "method": "POST",
  "sections": [
    {
      "title": "Informations personnelles",
      "grid": 2,
      "fields": [
        {
          "name": "firstName",
          "label": "Prénom",
          "type": "text",
          "validation": {
            "required": true,
            "minLength": 2
          }
        }
      ]
    }
  ]
}
```

---

## Structure du fichier JSON

### Configuration racine

```json
{
  "version": "2.0",
  "endpoint": "/api/users",
  "method": "POST",
  "sections": [...]
}
```

| Propriété | Type | Requis | Description |
|-----------|------|--------|-------------|
| `endpoint` | string | ✅ | URL cible pour la soumission POST/PUT |
| `method` | string | ❌ | Méthode HTTP (défaut: "POST") |
| `sections` | array | ✅ | Tableau des sections de formulaire |
| `version` | string | ❌ | Version du schéma (pour la compatibilité) |

### Structure d'une section

```json
{
  "title": "Titre de la section",
  "grid": 2,
  "fields": []
}
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `title` | string | Titre affiché en haut de la section |
| `grid` | number | Nombre de colonnes (1-4, défaut: 1) |
| `fields` | array | Tableau des configurations de champs |

### Structure d'un champ

```json
{
  "name": "firstName",
  "type": "text",
  "label": "Prénom",
  "placeholder": "Entrez votre prénom",
  "rows": 4,
  "validation": {
    "required": true,
    "minLength": { "value": 2, "message": "Minimum 2 caractères" }
  },
  "visibleWhen": {
    "field": "country",
    "equals": "FR"
  }
}
```

| Propriété | Type | Description |
|-----------|------|-------------|
| `name` | string | Identifiant unique du champ (clé dans les données soumises) |
| `type` | string | Type de champ (10+ types disponibles) |
| `label` | string | Étiquette affichée au-dessus du champ |
| `placeholder` | string | Texte placeholder du champ |
| `rows` | number | Nombre de lignes (pour textarea) |
| `accept` | string | Types de fichiers acceptés (pour file) |
| `maxSize` | number | Taille maximale en bytes (pour file) |
| `validation` | object | Règles de validation |
| `visibleWhen` | object | Condition de visibilité du champ |

---

## Types de champs disponibles

### 1. TextField (text, password, date)

Champ texte simple pour entrée utilisateur avec Controller.

```json
{
  "name": "firstName",
  "type": "text",
  "label": "Prénom",
  "placeholder": "Entrez votre prénom",
  "validation": {
    "required": true,
    "minLength": { "value": 2, "message": "Minimum 2 caractères" }
  }
}
```

**Types supportés** :
- `text` : Champ texte ordinaire
- `password` : Champ de mot de passe
- `date` : Champ date (HTML5 date input)

---

### 2. EmailField

Champ spécialisé pour les adresses email avec validation regex automatique.

```json
{
  "name": "email",
  "type": "email",
  "label": "Adresse email",
  "placeholder": "exemple@mail.com",
  "validation": {
    "required": true
  }
}
```

**Validation** : Pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` appliqué automatiquement

---

### 3. PhoneField

Champ spécialisé pour les numéros téléphoniques internationaux.

```json
{
  "name": "phone",
  "type": "phone",
  "label": "Téléphone",
  "placeholder": "+1 (555) 000-0000",
  "validation": {
    "required": true
  }
}
```

**Formats supportés** : `+1 (555) 000-0000`, `+33 1 23 45 67 89`, etc.

---

### 4. NumberField

Champ pour les nombres avec validation min/max.

```json
{
  "name": "quantity",
  "type": "number",
  "label": "Quantité",
  "validation": {
    "required": true,
    "min": { "value": 0, "message": "Minimum 0" },
    "max": { "value": 999, "message": "Maximum 999" }
  }
}
```

---

### 5. TextAreaField

Champ texte multi-lignes pour du contenu plus long.

```json
{
  "name": "description",
  "type": "textarea",
  "label": "Description",
  "rows": 6,
  "placeholder": "Entrez une description...",
  "validation": {
    "required": true,
    "minLength": { "value": 10, "message": "Minimum 10 caractères" },
    "maxLength": { "value": 500, "message": "Maximum 500 caractères" }
  }
}
```

**Options** :
- `rows` : Nombre de lignes (défaut: 4)

---

### 6. DateRangeField

Champ pour sélectionner une plage de dates.

```json
{
  "name": "dateRange",
  "type": "dateRange",
  "label": "Période",
  "validation": {
    "required": true
  }
}
```

**Valeur soumise** : `{ "from": "2024-01-01", "to": "2024-12-31" }`

---

### 7. SelectField

Champ de sélection avec dropdown.

```json
{
  "name": "country",
  "type": "select",
  "label": "Pays",
  "options": [
    { "value": "FR", "label": "France" },
    { "value": "BE", "label": "Belgique" },
    { "value": "CH", "label": "Suisse" }
  ],
  "validation": {
    "required": true
  }
}
```

---

### 8. RadioField

Champ radio pour sélection unique.

```json
{
  "name": "gender",
  "type": "radio",
  "label": "Genre",
  "options": [
    { "value": "M", "label": "Homme" },
    { "value": "F", "label": "Femme" },
    { "value": "O", "label": "Autre" }
  ]
}
```

---

### 9. CheckboxField

Champ checkbox pour sélection booléenne.

```json
{
  "name": "newsletter",
  "type": "checkbox",
  "label": "S'abonner à la newsletter"
}
```

**Notes** : La valeur soumise est un booléen (true/false)

---

### 10. FileField

Champ pour l'upload de fichiers.

```json
{
  "name": "document",
  "type": "file",
  "label": "Charger un document",
  "accept": ".pdf,.doc,.docx",
  "maxSize": 5242880,
  "validation": {
    "required": true
  }
}
```

**Options** :
- `accept` : Types de fichiers acceptés (ex: `.pdf,.doc` ou `image/*`)
- `maxSize` : Taille maximale en bytes (5242880 = 5MB)

---

## Validation avancée

### Règles supportées

FormEngine supporte **6 types de règles de validation** :

```json
{
  "validation": {
    "required": true,
    "minLength": { "value": 5, "message": "Minimum 5 caractères" },
    "maxLength": { "value": 50, "message": "Maximum 50 caractères" },
    "min": { "value": 0, "message": "Minimum 0" },
    "max": { "value": 100, "message": "Maximum 100" },
    "pattern": { "value": "^[A-Z]{3}$", "message": "Format: ABC" }
  }
}
```

### Tableau de compatibilité

| Règle | text | textarea | email | phone | number | date | select | radio | checkbox | file |
|-------|------|----------|-------|-------|--------|------|--------|-------|----------|------|
| required | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| minLength | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| maxLength | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| min | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| max | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| pattern | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Formats de validation

**Simple (nombre)** :
```json
{
  "required": true,
  "minLength": 5
}
```

**Avancé (objet avec message)** :
```json
{
  "required": "Ce champ est obligatoire",
  "minLength": {
    "value": 5,
    "message": "Minimum 5 caractères requis"
  }
}
```

### Patterns prédéfinis

```json
{
  "validation": {
    "pattern": "email"    // Pour emails (EmailField le fait automatiquement)
  }
}
```

**Patterns disponibles** : `email`, `phone`, `url`

### Affichage des erreurs

FormEngine affiche automatiquement les erreurs avec :
- ⚠️ Icône d'alerte
- 🔴 Bordure rouge autour du champ
- 📝 Message personnalisé ou message par défaut

---

## Visibilité conditionnelle

Affichez/masquez les champs selon les valeurs d'autres champs.

### Condition simple

```json
{
  "name": "province",
  "type": "text",
  "label": "Province",
  "visibleWhen": {
    "field": "country",
    "equals": "CA"
  }
}
```

Le champ `province` n'est affiché que si `country` égale "CA".

### Condition multiple (ALL)

```json
{
  "name": "stateCode",
  "type": "text",
  "label": "Code d'État",
  "visibleWhen": {
    "all": [
      { "field": "country", "equals": "US" },
      { "field": "hasAddress", "equals": true }
    ]
  }
}
```

Le champ n'est affiché que si TOUS les conditions sont vraies.

### Exemple complet

```json
{
  "sections": [
    {
      "title": "Adresse",
      "grid": 2,
      "fields": [
        {
          "name": "country",
          "type": "select",
          "label": "Pays",
          "options": [
            { "value": "FR", "label": "France" },
            { "value": "CA", "label": "Canada" },
            { "value": "US", "label": "États-Unis" }
          ],
          "validation": { "required": true }
        },
        {
          "name": "province",
          "type": "text",
          "label": "Province",
          "visibleWhen": { "field": "country", "equals": "CA" }
        },
        {
          "name": "state",
          "type": "text",
          "label": "État",
          "visibleWhen": { "field": "country", "equals": "US" }
        }
      ]
    }
  ]
}
```

---

## Scalabilité - Ajouter de nouveaux fields

Tous les fields utilisent `Controller` de react-hook-form pour une meilleure intégration.

### Étape 1 : Créer le composant

```tsx
// src/form-engine/fields/MyCustomField.tsx
import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "@form-engine/types";

const MyCustomField = ({ field, control, error }: FieldComponentProps) => (
  <Controller
    name={field.name}
    control={control}
    rules={field.validation}
    defaultValue=""
    render={({ field: fieldProps }) => (
      <div className="space-y-2">
        {field.label && (
          <label className="block text-sm font-medium text-white">
            {field.label}
            {field.validation?.required && (
              <span className="text-red-400 ml-1">*</span>
            )}
          </label>
        )}

        <input
          {...fieldProps}
          type="text"
          placeholder={field.placeholder}
          className={`w-full px-3 py-2 bg-slate-700 border rounded text-white transition ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-slate-600 focus:border-purple-500 focus:ring-purple-500"
          }`}
        />

        {error && (
          <p className="text-sm text-red-400 flex items-center gap-1">
            <span>⚠</span>
            {error.message}
          </p>
        )}
      </div>
    )}
  />
);

export default MyCustomField;
```

### Étape 2 : Enregistrer dans le registry

```tsx
// src/form-engine/registry/fieldRegistry.ts
import MyCustomField from "@form-engine/fields/MyCustomField";

export const fieldRegistry: Record<string, FieldComponent> = {
  // ... autres champs
  myCustom: MyCustomField,
};
```

### Étape 3 : Utiliser dans le formulaire

```json
{
  "name": "myField",
  "type": "myCustom",
  "label": "Mon champ personnalisé"
}
```

---

## Mise en page et grilles

### Système de grille

La propriété `grid` contrôle le nombre de colonnes (1-4) :

```json
{
  "sections": [
    { "title": "1 colonne", "grid": 1, "fields": [...] },
    { "title": "2 colonnes", "grid": 2, "fields": [...] },
    { "title": "3 colonnes", "grid": 3, "fields": [...] }
  ]
}
```

---

## Exemples avancés

### Exemple 1 : Formulaire d'inscription complet

```json
{
  "endpoint": "/api/register",
  "method": "POST",
  "sections": [
    {
      "title": "Identité",
      "grid": 2,
      "fields": [
        {
          "name": "firstName",
          "type": "text",
          "label": "Prénom",
          "validation": {
            "required": "Prénom requis",
            "minLength": { "value": 2, "message": "Minimum 2 caractères" }
          }
        },
        {
          "name": "lastName",
          "type": "text",
          "label": "Nom",
          "validation": {
            "required": "Nom requis",
            "minLength": { "value": 2, "message": "Minimum 2 caractères" }
          }
        },
        {
          "name": "birthDate",
          "type": "date",
          "label": "Date de naissance"
        },
        {
          "name": "gender",
          "type": "radio",
          "label": "Genre",
          "options": [
            { "value": "M", "label": "Homme" },
            { "value": "F", "label": "Femme" }
          ]
        }
      ]
    },
    {
      "title": "Contact",
      "grid": 2,
      "fields": [
        {
          "name": "email",
          "type": "email",
          "label": "Email",
          "validation": { "required": true }
        },
        {
          "name": "phone",
          "type": "phone",
          "label": "Téléphone",
          "validation": { "required": true }
        }
      ]
    },
    {
      "title": "Compte",
      "grid": 1,
      "fields": [
        {
          "name": "password",
          "type": "password",
          "label": "Mot de passe",
          "validation": {
            "required": true,
            "minLength": { "value": 8, "message": "Minimum 8 caractères" }
          }
        },
        {
          "name": "newsletter",
          "type": "checkbox",
          "label": "S'abonner à la newsletter"
        }
      ]
    }
  ]
}
```

### Exemple 2 : Formulaire avec champs conditionnels

```json
{
  "endpoint": "/api/feedback",
  "method": "POST",
  "sections": [
    {
      "title": "Votre expérience",
      "grid": 1,
      "fields": [
        {
          "name": "satisfaction",
          "type": "radio",
          "label": "Êtes-vous satisfait ?",
          "options": [
            { "value": "yes", "label": "Oui" },
            { "value": "no", "label": "Non" }
          ],
          "validation": { "required": true }
        },
        {
          "name": "feedback",
          "type": "textarea",
          "label": "Commentaires",
          "rows": 5,
          "visibleWhen": { "field": "satisfaction", "equals": "no" },
          "validation": {
            "required": true,
            "minLength": { "value": 10, "message": "Minimum 10 caractères" }
          }
        },
        {
          "name": "email",
          "type": "email",
          "label": "Email de contact",
          "visibleWhen": { "field": "satisfaction", "equals": "no" },
          "validation": { "required": true }
        }
      ]
    }
  ]
}
```

---

## Bonnes pratiques

### 1. Validation multi-niveaux
- Validez côté formulaire (JSON)
- Validez aussi côté serveur (backend)

### 2. Messages clairs
Utilisez des messages d'erreur spécifiques et utiles

### 3. Organisation
Groupez logiquement les champs par sections

### 4. Performance
- Max 15 champs par section
- Utilisez `visibleWhen` pour masquer les champs non nécessaires

### 5. Accessibilité
- Utilisez des labels clairs
- Indiquez les champs requis avec `*`

---

**FormEngine v2.0** — Créé le 11 mars 2026  
Pour toute question, consultez le code source ou créez un issue.
