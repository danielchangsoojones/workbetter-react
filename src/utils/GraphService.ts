import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { User } from "microsoft-graph";

import { Mail } from "../type/MailBoxType";

let graphClient: Client | undefined = undefined;

function ensureClient(authProvider: AuthCodeMSALBrowserAuthenticationProvider) {
  if (!graphClient) {
    graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }

  return graphClient;
}

export async function getUser(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<User> {
  ensureClient(authProvider);

  // Return the /me API endpoint result as a User object
  const user: User = await graphClient!
    .api("/me")
    // Only retrieve the specific fields needed
    .select("displayName,mail,mailboxSettings,userPrincipalName")
    .get();

  return user;
}

export async function getAllMails(
  authProvider: AuthCodeMSALBrowserAuthenticationProvider
): Promise<Array<Mail>> {
  ensureClient(authProvider);

  const response = await graphClient!
    .api("/me/messages")
    .select("subject,sender,toRecipients,body,receivedDateTime")
    .get();
  const mails: Array<Mail> = response.value;
  console.log(mails)

  return mails;
}
