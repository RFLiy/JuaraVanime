const SkeletonLoading = () => {
  return (
    <div className="animate-pulse bg-slate-700 rounded-lg overflow-hidden shadow-lg h-80 w-full">
      <div className="bg-slate-600 h-2/3 w-full"></div>
      <div className="p-4">
        <div className="h-4 bg-slate-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-600 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
