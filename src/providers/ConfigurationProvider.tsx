import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useStorage } from "@storage/useStorage";
import { StorageItems } from "@storage/StorageItems";

interface ConfigurationInterface {
  validationToken: string;
  setValidationToken: (value: string) => void;
  refreshValues: () => void;
}

export const ConfigurationContext = createContext<ConfigurationInterface>({
  validationToken: "",
  setValidationToken: () => {},
  refreshValues: () => {},
});

export const ConfigurationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [validationToken, setValidationToken] = useState<string>("");
  const { getItem, changeValue } = useStorage();

  const refreshValues = () => {
    const token = getItem(StorageItems.JWTToken);
    changeValue(StorageItems.JWTToken, token === null ? "" : token);
    setValidationToken(token === null ? "" : token);
  };

  useEffect(() => {
    refreshValues();
  }, []);

  return (
    <ConfigurationContext.Provider
      value={{
        validationToken,
        setValidationToken,
        refreshValues,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
