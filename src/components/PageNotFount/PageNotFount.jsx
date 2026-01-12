const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-5xl font-bold text-textDarkColor font-clashDisplay">
        404
      </h1>

     <p className="mt-2 text-base text-gray-500">
  This page is currently under construction.  
  We apologize for the inconvenience and appreciate your patience.
</p>


      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 px-6 py-3 mt-8 text-sm font-semibold transition-all rounded-full
                   text-primaryColor bg-primaryColor/10 hover:bg-primaryColor/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M8 7V11L2 6L8 1V5H13C17.4183 5 21 8.58172 21 13C21 17.4183 17.4183 21 13 21H4V19H13C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7H8Z" />
        </svg>
        Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
