import { Skeleton } from "@/components/ui/skeleton";

export function SalarySkeleton() {
  return (
    <section className="px-4 flex items-center justify-between">
      <article className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <article className="flex flex-col gap-1">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </article>
      </article>
      <Skeleton className="h-6 w-6 rounded" />
    </section>
  );
}
