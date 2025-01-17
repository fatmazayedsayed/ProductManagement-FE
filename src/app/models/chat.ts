export class ChatDTo {
    question?: string;
    session_name?: string;
    source?: string;
      
}

export class DeleteChatDTo {
    session_name?: string;    
}
export class ChatHistoryRequestBodyDTo {
   
        pageNumber?:number;
        pageSize?:number;
       searchString?:string;
       sorting?:string;
         
}
export class GetChatHistoryDTo {
    id?:string;
    name?:string;
     
}

  export class ChatHistoryResponseBody {
    chats?:GetChatHistoryDTo[];
    totalCount?: number;
  }

  export class CreateChatSessionResponse {
    type?: string;
    title?: string;
    status?: number;
    errors?: {
      [key: string]: string[];
    };
    traceId?: string;
  }

  export class AddMessageToChatDTO {
    sessionId?: string;
    prompt?: string;
    answer?: string;
  }
  
  