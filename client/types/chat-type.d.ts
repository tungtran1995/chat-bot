interface IChat {
  content: string;
  role: string;
}

interface ChatPart {
  text: String;
}

interface IPostData {
  query: string;
  session_id: string;
}

interface GoogleChat {
  role: string;
  parts: Array<ChatPart>;
}
