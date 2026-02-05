const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Chargement en cours...</p>
      <p className="mt-1 text-sm text-gray-400">Veuillez patienter</p>
    </div>
  </div>
);

export default Loading;