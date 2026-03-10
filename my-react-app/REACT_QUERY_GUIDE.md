# React Query Integration

Cette application utilise **@tanstack/react-query** v5 pour la gestion des états de requêtes asynchrones.

## Configuration

La configuration de React Query se trouve dans `src/lib/queryClient.ts` avec les paramètres par défaut:

- **staleTime**: 5 minutes - Temps avant que les données soient considérées comme obsolètes
- **gcTime**: 10 minutes - Temps de conservation des données en cache (anciennement cacheTime)
- **retry**: 1 - Nombre de tentatives en cas d'erreur
- **refetchOnWindowFocus**: false - Ne pas refetch lors du retour dans la fenêtre

## Utilisation

### 1. Requête Simple (GET)

```tsx
import { useApiQuery } from "@/hooks/useApi";

function UserList() {
  const { data, isLoading, error } = useApiQuery(
    ["users"], // clé unique
    async () => {
      const response = await fetch("/api/users");
      return response.json();
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 2. Requête avec Paramètres

```tsx
const { data } = useApiQuery(
  ["user", userId], // la clé change si userId change
  async () => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);
```

### 3. Mutation (POST/PUT/DELETE)

```tsx
import { useApiMutation } from "@/hooks/useApi";

function CreateUser() {
  const { mutate, isPending } = useApiMutation(
    async (newUser) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        // Les queries sont automatiquement invalidées
        console.log("User created!");
      },
    }
  );

  return (
    <button onClick={() => mutate({ name: "John" })} disabled={isPending}>
      Create User
    </button>
  );
}
```

### 4. Options Personnalisées

```tsx
const { data } = useApiQuery(
  ["users"],
  fetchUsers,
  {
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    enabled: isReady, // conditional fetching
  }
);
```

## Provider Setup

Le QueryClientProvider est configuré dans `src/main.tsx` et enveloppe toute l'application.

## Hooks Personnalisés

### `useApiQuery<T>`

Wrapper autour de `useQuery` avec types TypeScript automatiques.

**Options:**
- `key` - Clé unique pour la query
- `queryFn` - Fonction qui retourne une Promise
- `options` - Options React Query (optionnel)

### `useApiMutation<TData, TVariables>`

Wrapper autour de `useMutation` avec invalidation automatique des queries.

**Options:**
- `mutationFn` - Fonction qui exécute la mutation
- `options` - Options React Query (optionnel)

## Bonnes Pratiques

1. **Utilisez des clés structurées:**
   ```tsx
   ["users", "list"] // plutôt que ["usersList"]
   ["user", id] // pour les requêtes avec paramètres
   ```

2. **Typez vos données:**
   ```tsx
   const { data } = useApiQuery<User[]>(["users"], fetchUsers);
   ```

3. **Gérez les erreurs:**
   ```tsx
   if (error instanceof Error) {
     console.error(error.message);
   }
   ```

4. **Utilisez l'invalidation intelligente:**
   ```tsx
   const { mutate } = useApiMutation(
     updateUser,
     {
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["user", id] });
       }
     }
   );
   ```

## DevTools (Optionnel)

Pour installer les DevTools React Query:

```bash
pnpm add -D @tanstack/react-query-devtools
```

Puis intégrez dans votre application:

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Dans votre layout principal
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

## Ressources

- [Documentation React Query](https://tanstack.com/query/latest)
- [Migration from v4 to v5](https://tanstack.com/query/latest/docs/react/guides/important-defaults)
