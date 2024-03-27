import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = <T>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParams = useCallback(
    (params: Partial<T>) => {
      const urlSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          urlSearchParams.delete(key);
        } else {
          urlSearchParams.set(key, String(value));
        }
      });

      const search = urlSearchParams.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return { queryParams: searchParams, setQueryParams };
};
