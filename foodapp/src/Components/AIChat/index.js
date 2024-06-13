import OpenAI from "openai";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./spinner.js";


const AIChat = ({context}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [messageQueue, setMessageQueue] = useState([
    {
      role: "system",
      content:
        "You are Garam-APP, Greet the user in maximum 10 words. Reply impersonating Garam-APP in 1st person if user asks any question using the following data. Be a little creative if the question is not directly related to the below data.",
    },
  ]);

 const key = "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"
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true,
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("submitButton").click();
      // Or you can call the function directly that you want to trigger
    }
  };
  const pushMessage = async () => {
    setMessageQueue((prevQueue) => [
      ...prevQueue,
      {
        role: "user",
        content: question,
      },
    ]);

    // Note: Even with this approach, setMessageQueue does not return a promise,
    // so you cannot use await with it. However, this ensures that the update
    // is applied correctly based on the most recent state.

    setQuestion("");
    // Update the message queue with the new message
    // Reset the question input for the next message

    // Assuming createMessage sends the updated message queue to OpenAI and handles the response
  };

  const createMessage = async () => {
    // const threadMessages = await openai.beta.threads.messages.create(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     { role: "user", content: question }
    //   );

    //   const run = await openai.beta.threads.runs.create(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     {
    //       assistant_id: "asst_4VmL0io5Xysdjzg5E1Zv6CPW"
    //     }
    //   );

    //   let status = await openai.beta.threads.runs.retrieve(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl",
    //     run.id
    //   );

    //   while (status.status === "in_progress") {
    //     await new Promise(resolve => setTimeout(resolve, 500));

    //     // Retrieve the status again
    //     status = await openai.beta.threads.runs.retrieve( "thread_z9J0Z3sL1xrEeNBhH23Wmlyl", run.id);
    //     console.log("Status RUN",status.status);

    //   }

    //   const messages = await openai.beta.threads.messages.list(
    //     "thread_z9J0Z3sL1xrEeNBhH23Wmlyl"
    //   );

    //   setMessage(messages.data[0].content[0].text.value);
    //   setQuestion("")

    setIsLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messageQueue,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(response);

      const newResponse = [...messageQueue, response.choices[0].message];

      setMessageQueue(newResponse);
    } catch (error) {
      const newResponse = [
        ...messageQueue,
        { role: "assistant", content: "Please try after some time" },
      ];
      setMessageQueue(newResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const retQueue = () => {
    return (
      <ul>
        {messageQueue.slice(1, messageQueue.length).map((a, index) => (
          <li
            key={index}
            className="rounded-lg  text-gray-900 border shadow-sm border-gray-200 m-2 bg-cyan-50 p-2"
          >
            {a.role === "user" ? (
              <div className="flex flex-col">
                <div className="float-left text-black font-bold">You:</div>
                <div>{a.content}</div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="float-left text-black font-bold">Garam App:</div>
                <div>{a.content}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    // This code runs after `messageQueue` has been updated
    console.log("messageQueue has been updated", messageQueue);
    scrollToBottom();

    // If you need to call createMessage or any other function after messageQueue updates, call it here

    if (
      messageQueue[messageQueue.length - 1].role === "system" ||
      messageQueue[messageQueue.length - 1].role === "user"
    ) {
      createMessage();
    }
  }, [messageQueue]);

  return (
    <div className="flex gap-2 m-4">
    <div className="w-2/12  h-[87vh] bg-teal-100 border-amber-400 border-x border-y 
 rounded-md border-dashed "></div>
    <div className="w-10/12 h-[87vh]">
    <div className="  text-base gap-2 rounded-lg  flex flex-col h-full">
      <div className="  overflow-y-auto    border-amber-400 border-x border-y 
 rounded-md border-dashed  h-full ">
        {retQueue()} <div ref={endOfMessagesRef} />{" "}
      </div>
      <div className="h-28 p-2  border-amber-400 border-x border-y 
 rounded-md border-dashed  bg-teal-100  shadow-md flex-row flex justify-between">
        <textarea
          className="w-full text-black font-medium rounded-lg mr-2 p-2 h-[12vh]"
          value={question}
          placeholder="I'm Garam App, ask me anything!"
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuestion(e.target.value)}
        />{" "}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="h-24 w-2/12 z-10 border-gray-400 border rounded-lg hover:border-black hover:scale-105">
            <button
              className="rounded-lg h-full w-full "
              id="submitButton"
              onClick={pushMessage}
            >
              Send
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
    </div>
  );
};

export default AIChat;
