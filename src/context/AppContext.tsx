import React, {
  useContext,
  createContext,
  useState,
  MouseEventHandler,
  useEffect,
} from "react";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

import config from "../utils/Config";
import { getAllMails, getUser } from "../utils/GraphService";
import { Mail } from "../type/MailBoxType";

export interface AppUser {
  displayName?: string;
  email?: string;
  avatar?: string;
  mails?: Mail[];
}

export interface AppError {
  message: string;
  debug?: string;
}

type AppContext = {
  user?: AppUser;
  mails?: Mail[];
  error?: AppError;
  signIn?: MouseEventHandler<HTMLElement>;
  signOut?: MouseEventHandler<HTMLElement>;
  getMails?: Function;
  getMailByID?: Function;
  displayError?: Function;
  clearError?: Function;
  authProvider?: AuthCodeMSALBrowserAuthenticationProvider;
};

const appContext = createContext<AppContext>({
  user: undefined,
  mails: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  getMails: undefined,
  getMailByID: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined,
});

export function useAppContext(): AppContext {
  return useContext(appContext);
}

interface ProvideAppContextProps {
  children: React.ReactNode;
}

export default function ProvideAppContext({
  children,
}: ProvideAppContextProps) {
  const auth = useProvideAppContext();
  return <appContext.Provider value={auth}>{children}</appContext.Provider>;
}

function useProvideAppContext() {
  const [user, setUser] = useState<AppUser | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);
  const [mails, setMails] = useState<Mail[] | undefined>(undefined);

  const msal = useMsal();

  const displayError = (message: string, debug?: string) => {
    setError({ message, debug });
  };

  const clearError = () => {
    setError(undefined);
  };

  // Used by the Graph SDK to authenticate API calls
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    }
  );

  useEffect(() => {
    const checkUser = async () => {
      if (!user) {
        try {
          // Check if user is already signed in
          const account = msal.instance.getActiveAccount();
          if (account) {
            // Get the user from Microsoft Graph
            const user = await getUser(authProvider);

            setUser({
              displayName: user.displayName || "",
              email: user.mail || user.userPrincipalName || "",
            });

            await getMails();
          }
        } catch (err: any) {
          displayError(err.message);
        }
      }
    };
    checkUser();
  });

  const signIn = async () => {
    await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: "select_account",
    });

    // Get the user from Microsoft Graph
    const user = await getUser(authProvider);

    console.log(user);

    setUser({
      displayName: user.displayName || "",
      email: user.mail || user.userPrincipalName || "",
    });
  };

  const signOut = async () => {
    await msal.instance.logoutPopup();
    setUser(undefined);
  };

  const getMails = async () => {
    try {
      const response: Array<Mail> = await getAllMails(authProvider);
      setMails(response);
    } catch (err: any) {
      displayError!(err.message);
    }
  };

  const getMailByID = (mailId: string) => {
    const mail = mails?.filter((mail) => mail.id == mailId);

    return mail;
  };

  return {
    user,
    mails,
    error,
    signIn,
    signOut,
    getMails,
    getMailByID,
    displayError,
    clearError,
    authProvider,
  };
}
