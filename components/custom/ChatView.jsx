"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { userDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import { useConvex, useMutation } from "convex/react";
import Image from "next/image";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown"
import { useSidebar } from "../ui/sidebar";
import { toast } from "sonner";


export const countToken =(inputText) => {
  return inputText.trim().split(/\s+/).filter(word => word).length;
}



function ChatView() {
  const { id } = useParams(); 
  const convex = useConvex(); 
  const {userDetail, setUserDetail} = useContext(userDetailContext)
  const { messages, setMessages } = useContext(MessagesContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages)
  const {toggleSidebar} = useSidebar()
  const UpdateTokens = useMutation(api.users.UpdateToken)


  useEffect(() => {
    if (id) {
      GetWorkspaceData(); // Fetch workspace data whenever the ID changes
    }
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspace, {
        workspaceId: id,
      });
      setMessages(result?.messages ); // Update the context with fetched messages or an empty array
      console.log("Fetched messages:", result?.messages);
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(()=>{
    if(messages?.length>0){
        const role=messages[messages?.length-1].role;
        if(role=='user'){
            GetAiResponse();
        }
    }

  },[messages])



  const GetAiResponse=async()=>{
    setLoading(true);
    const PROMPT=JSON.stringify(messages)+Prompt.CHAT_PROMPT;
    const result = await axios.post('/api/ai-chat',{
      prompt:PROMPT
    });
      const aiResp = {
        role:'ai',
        content:result.data.result
      }
      setMessages(prev=>[...prev, aiResp])

      // console.log('LEN', countToken(JSON.stringify(aiResp)));


      await UpdateMessages({
        messages: [...messages, aiResp],
        workspaceId:id
      })

      const token = Number(userDetail?.token)-Number(countToken(JSON.stringify(aiResp)));
      setUserDetail(prev=>({
        ...prev,
        token:token
      }))
      // Update tokens to database
      await UpdateTokens({
        userId: userDetail?._id,
        token: token,
        
      })

      setLoading(false)
  }

  const onGenerate = (input)=>{
    if(userDetail?.token<10){
        toast("You don't have enough tokens!")
          return ;
    }
      setMessages(prev=>[...prev,{
        role:'user',
        content:input
      }])
      setUserInput('');
  }

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide pl-5">
      {messages && messages.length > 0 ? ( 
        messages.map((msg, index) => (
          <div key={index} 
          className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
          style={{
            backgroundColor:Colors.CHAT_BACKGROUND
          }}>
            {msg?.role=='user' &&
            <Image src={userDetail?.picture} alt='userImage' width={35} height={35} className="rounded-full"/>}
            <ReactMarkdown className="flex flex-col">{msg.content}</ReactMarkdown> 

          </div>
        ))
      ) : (
        <div>
          
        </div>
      )}
          {loading && <div className="p-3 rounded-lg mb-2 flex gap-2 items-start" style={{
            backgroundColor: Colors.CHAT_BACKGROUND
          }}>
                      <Loader2Icon className="animate-spin"/>
                      <h2>Generating response...</h2>
            </div>}
    </div>

    {/* Input Section */}
    <div className="flex gap-2 items-end">
      {userDetail && <Image  src={userDetail?.picture} alt="user" height={30} width={30} onClick={toggleSidebar} className="rounded-full cursor-pointer" />}
    
    <div className="p-5 border rounded-xl max-w-xl w-full mt-3" style={{backgroundColor: Colors.BACKGROUND}}>
        <div className="flex gap-2">
          <textarea placeholder={Lookup.placeholder} className="outline-none bg-transparent w-full h-32 max-h-56 resize-none" value={userInput}
          onChange={(event) => setUserInput(event.target.value)}/>
          {userInput && <ArrowRight 
          onClick={()=>onGenerate(userInput) }
          className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer" />}
        </div>
        <div className="h-5 w-5">
          <Link />
        </div>
      </div>
      </div>


    </div>
  );
}

export default ChatView;
