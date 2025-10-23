import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ClassCardSkeleton() {
  return (
    <Card className="hover:shadow-md w-fit transition-shadow gap-0 py-4 px-5">
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-1 p-0 pb-0">
        <section className="flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        </section>
        <section className="flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
        </section>
        <div className="flex-1 my-3">
          <Skeleton className="h-px w-full" />
        </div>
        <div className="flex justify-between text-xs gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
