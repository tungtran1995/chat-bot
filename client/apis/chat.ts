import axios from "axios";

export function postLangChainQuestionsApiCall(data: {
  dataToPost: {
    session_id: string;
    query: string;
  };
}) {
  const { dataToPost } = data;
  console.log(dataToPost);

  return axios({
    method: "post",
    url: `http://127.0.0.1:5001/api/v1/chatbot`,
    data: dataToPost,
  });
}
