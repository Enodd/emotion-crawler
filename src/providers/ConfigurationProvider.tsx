import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useStorage } from "@storage/useStorage";
import { StorageItems } from "@storage/StorageItems";
import { User } from "@models/UserModel";

interface ConfigurationInterface {
  validationToken: string;
  localUser?: User;
  dispatchUser: (user: User) => void;
  setValidationToken: (value: string) => void;
  removeUser: () => void;
  refreshValues: () => { token: string };
}

export const ConfigurationContext = createContext<ConfigurationInterface>({
  validationToken: "",
  dispatchUser: () => {},
  setValidationToken: () => {},
  removeUser: () => {},
  refreshValues: () => {
    return { token: "" };
  },
});

export const ConfigurationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [validationToken, setValidationToken] = useState<string>("");
  const [localUser, setLocalUser] = useState<User>();
  const { getItem, changeValue, removeItem } = useStorage();

  const dispatchUser = (user: User) => {
    changeValue(StorageItems.User, JSON.stringify(user));
    changeValue(StorageItems.JWTToken, user.JWTToken);
  };

  const removeUser = async () => {
    await removeItem(StorageItems.User);
    await removeItem(StorageItems.JWTToken);
  };

  const refreshValues = () => {
    const token = getItem(StorageItems.JWTToken);
    const userJSON = getItem(StorageItems.User);
    changeValue(StorageItems.JWTToken, token === null ? "" : token);
    changeValue(StorageItems.User, userJSON === null ? "" : userJSON);
    setValidationToken(token === null ? "" : token);
    setLocalUser(
      userJSON === null || userJSON.length === 0 ? "" : JSON.parse(userJSON),
    );
    if (userJSON === null || userJSON.length === 0) {
      return {
        token: undefined,
      };
    }
    return {
      token: JSON.parse(userJSON as string).JWTToken,
    };
  };

  useEffect(() => {
    refreshValues();
  }, []);

  return (
    <ConfigurationContext.Provider
      value={{
        localUser,
        validationToken,
        dispatchUser,
        setValidationToken,
        removeUser,
        refreshValues,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
};
