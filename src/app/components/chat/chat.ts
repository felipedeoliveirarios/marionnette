export class Chat {
  public static CHAT_IGNORE_FIELDS = ['id', 'usage'];

  id: string =  'chat_' + new Date().valueOf();
  messages: Message[] = [];
  model: string = '';
  stream: boolean = false;
  usage: Usage = new Usage();
}



export class ChatCompletion {
  choices: Choice[] = [];
  created: Date = new Date();
  model: string = '';
  usage: Usage = new Usage();
}

export class Message {
  content: string = '';
  role: 'user' | 'system' | 'assistant' = 'user';
}

export class Choice {
  finish_reason: string = '';
  message: Message = new Message();
}

export class Usage {
  completion_tokens: number = 0;
  prompt_tokens: number = 0;
  total_tokens: number = 0;
}

