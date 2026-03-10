/**
 * Exemple d'utilisation de React Query
 *
 * import { useApiQuery } from "@/hooks/useApi";
 *
 * const { data, isLoading, error } = useApiQuery(
 *   ["users"], // clé unique pour la query
 *   async () => {
 *     const response = await fetch("/api/users");
 *     return response.json();
 *   }
 * );
 */

export default function QueryExample() {
  return (
    <div className="p-4">
      <h2>React Query Example</h2>
      <p>
        Voir <code>src/examples/QueryExample.tsx</code> pour des exemples
        d&apos;utilisation de React Query.
      </p>

      <h3 className="mt-4">Hooks disponibles:</h3>
      <ul className="list-disc pl-5">
        <li>
          <code>useApiQuery</code> - Pour les requêtes GET
        </li>
        <li>
          <code>useApiMutation</code> - Pour les mutations POST/PUT/DELETE
        </li>
      </ul>

      <h3 className="mt-4">Configuration:</h3>
      <p>
        La configuration de React Query se trouve dans{" "}
        <code>src/lib/queryClient.ts</code>
      </p>
      <ul className="list-disc pl-5 text-sm">
        <li>staleTime: 5 minutes</li>
        <li>gcTime: 10 minutes</li>
        <li>retry: 1</li>
        <li>refetchOnWindowFocus: false</li>
      </ul>
    </div>
  );
}
