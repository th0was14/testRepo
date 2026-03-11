# FormEngine Generator

Interface web pour générer et éditer des configurations FormEngine à partir de spécifications OpenAPI Swagger.

## 📋 Aperçu

Le **FormEngine Generator** permet de :

- 📥 **Importer** des fichiers `swagger.json` (spécifications OpenAPI)
- 🚀 **Générer** automatiquement des configurations FormEngine à partir des schémas Swagger
- ✏️ **Éditer** les configurations générées ou existantes
- 👁️ **Prévisualiser** les formulaires
- 📥 **Télécharger** les configurations au format JSON
- 📋 **Copier** les configurations dans le presse-papiers

## 🚀 Utilisation

### 1. Importer un Swagger

Accédez à l'interface du générateur et cliquez sur **📥 Import**.

Uploadez votre fichier `swagger.json`. L'interface détectera automatiquement toutes les ressources disponibles.

### 2. Sélectionner une ressource

Une fois le Swagger importé, passez au mode **⚙️ Generate** et sélectionnez la ressource que vous souhaitez utiliser pour générer le formulaire.

Les ressources disponibles sont celles ayant un schéma de type `{ResourceName}Input` dans le Swagger.

### 3. Générer le formulaire

Cliquez sur **🚀 Generate Form** pour créer automatiquement une configuration FormEngine basée sur le schéma Swagger.

### 4. Éditer la configuration

Passez au mode **✏️ Edit** pour modifier manuellement le JSON généré.

L'éditeur valide le JSON en temps réel et affiche une erreur si le format est invalide.

### 5. Prévisualiser et exporter

Passez au mode **👁️ Preview** pour voir un aperçu de la configuration.

Vous pouvez ensuite :
- Télécharger le fichier JSON
- Copier dans le presse-papiers
- Éditer à nouveau

## 📁 Structure des dossiers

```
pages/GenerateJsonForm/
├── GenerateJsonForm.tsx          # Composant principal de l'interface
├── swaggerToForm.ts              # Utilitaires de conversion
├── swagger.json                  # Spec OpenAPI avec 3 ressources
├── page.tsx                      # Page de la route
└── examples/
    ├── user-form.json            # Exemple de formulaire User
    ├── team-form.json            # Exemple de formulaire Team
    └── project-form.json         # Exemple de formulaire Project
```

## 📊 Ressources disponibles

Le `swagger.json` inclut **3 ressources principales** :

### 1. User
- Champs: firstName, lastName, email, birthDate, isActive
- Types: text, email, date, checkbox

### 2. Team
- Champs: name, description, memberCount, department, budget
- Types: text, textarea, number, select

### 3. Project
- Champs: title, description, startDate, endDate, priority, status, budget
- Types: text, textarea, date, select, number

## 🔄 Conversion Swagger → FormEngine

### Types supportés

| Type Swagger | Type FormEngine | Notes |
|--------------|-----------------|-------|
| string | text | Par défaut |
| string (email) | email | Détecté automatiquement |
| string (date) | date | Détecté automatiquement |
| string (enum) | select | Les enums deviennent des options |
| integer/number | number | Champ numérique |
| boolean | checkbox | Champ booléen |

### Validation

- Les champs **required** du Swagger deviennent des champs **required** dans FormEngine
- Les enums deviennent automatiquement des options de sélection

### Formatage

- Les noms de propriétés camelCase sont convertis en labels lisibles
- Les placeholders sont générés automatiquement basés sur le type de champ

## 💡 Exemples

### Importer le Swagger fourni

1. Téléchargez le fichier `swagger.json` depuis le dossier
2. Uploadez-le dans l'interface
3. Sélectionnez la ressource (User, Team ou Project)
4. Cliquez sur "Generate Form"
5. Consultez les fichiers d'exemple pour comparer

### Créer un Swagger personnalisé

Structurez votre Swagger avec des schémas Input pour chaque ressource :

```json
{
  "components": {
    "schemas": {
      "UserInput": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "email": { "type": "string", "format": "email" }
        },
        "required": ["name", "email"]
      }
    }
  }
}
```

## 🛠️ Fonctionnalités avancées

### Mode Édition

- Validation JSON en temps réel
- Messages d'erreur pour les JSON invalides
- Support de commentaires si le JSON est valide

### Mode Prévisualisation

- Vue globale de la configuration
- Liste des champs avec leurs types
- Affichage des propriétés endpoint et method
- Comptage des sections et champs

## 📝 Notes

- Les IDs sont automatiquement exclus de la génération de formulaire
- Les configurations générées utilisent POST par défaut
- L'endpoint est basé sur le nom de la ressource (ex: `/api/users`)
- Les placeholders texte sont générés automatiquement
- Les messages d'erreur sont détectés et affichés en temps réel

## 🔗 Intégration avec FormEngine

Les configurations générées par cette interface sont directement compatibles avec le composant FormEngine :

```tsx
import FormEngine from "@/form-engine/FormEngine";
import formConfig from "./generated-form.json";

export default function MyForm() {
  return <FormEngine config={formConfig} />;
}
```

---

**Créé le 12 mars 2026** | Utilisez cette interface pour générer rapidement des formulaires professionnels !
