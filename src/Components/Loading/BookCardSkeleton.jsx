import React from "react";

const BookCardSkeleton = () => {
  return (
    <div className="bg-base-100 border border-base-200 rounded-xl shadow-sm flex flex-col h-[320px] w-full">
      {/* Top Image Area Skeleton */}
      <div className="skeleton h-[65%] w-full rounded-b-none rounded-t-xl"></div>

      {/* Info Area Skeleton */}
      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div className="space-y-2">
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-3 w-1/2"></div>
        </div>

        {/* Button Skeleton */}
        <div className="skeleton h-8 w-full rounded-lg"></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;