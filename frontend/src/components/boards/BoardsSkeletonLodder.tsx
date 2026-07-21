import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BoardsSkeletonLodder = () => {
  return (
    <Card className="relative bg-white/5 border border-white/10 rounded-2xl shadow-xl min-h-40 flex flex-col justify-between overflow-hidden">
      <CardContent className="pt-5 pb-0 px-5">
        <div className="absolute top-4 right-4">
          <Skeleton className="w-5 h-5 rounded-full bg-white/10" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-lg bg-white/10 mt-2" />
        <Skeleton className="h-3 w-1/2 rounded-md bg-white/10 mt-3" />
      </CardContent>
      <CardFooter className="px-5 pb-4 flex justify-end">
        <Skeleton className="w-5 h-5 rounded-full bg-white/10" />
      </CardFooter>
    </Card>
  );
};

export default BoardsSkeletonLodder;
