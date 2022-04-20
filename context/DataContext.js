import { createContext, useState } from "react";

const DEFAULT = {
  error: null,
  data: [],
};

const DataContext = createContext();
function DataProvider({ children }) {
  const [portraitImages, setPortraitImages] = useState(DEFAULT.data);
  const [landscapeImages, setLandscapeImages] = useState(DEFAULT.data);
  const [error, setError] = useState(DEFAULT.error);

  return (
    <DataContext.Provider
      value={{
        portraitImages,
        setPortraitImages,
        landscapeImages,
        setLandscapeImages,
        error,
        setError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export default DataContext;
export { DataProvider };
