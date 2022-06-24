export type Sender = {
  emailAddress: {
    address: string;
    name: string;
  };
};

export type HTMLObject = {
  content: string;
  contentType: string;
}

export type Mail = {
  id: string;
  body: HTMLObject;
  receivedDateTime: string;
  sender: Sender;
  subject: string;
};
