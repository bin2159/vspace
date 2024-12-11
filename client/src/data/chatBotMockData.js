export const chatResponse =["test1"];

export const fetchChatResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(chatResponse); // Simulates a successful response
      }, 1000); // Simulate a 1-second delay
    });
  };