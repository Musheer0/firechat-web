import CreateChatInput from "@/components/chat/personal/create-chat-input"
import { Id } from "../../../../../../../convex/_generated/dataModel"
import TypewriterEffect from "@/components/shared/typewriter-effect"
import Image from "next/image"


const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
  return (
  <div className="w-full h-full flex-1 flex flex-col p-2 gap-2 items-center justify-center">
    <div className=" w-full flex flex-col p-2 max-w-xl mx-auto">
      <div className="messages">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">Firechat</p>
         <div className="flex items-center gap-2">
          
         <Image src={'/logo.svg'} alt="logo" width={20} height={20}/>
          <TypewriterEffect loop speed={50} text={[
            "Hi ,how can i help you",
            "Asking anything about the selected website",
            "to talk with multiple websites at once you can use the project feature",
            "i can also search for resources online",
            "i don't forget the latest documentation of your pakcage like chat gpt"
          ]}/>
         </div>
        </div>
      </div>
    </div>
    <CreateChatInput id={id as Id<"website">}/>
  </div>
  )
}

export default page
