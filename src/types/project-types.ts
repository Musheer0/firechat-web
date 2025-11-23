export type Tproject = {
  name: string;
  entry_ids: string[];
  icon?: string;
  websites: string[]; // assuming v.id("website") → string
  threadId: string;
  initial_prompt: string; 
  user_id: string;
  _id:string
   _creationTime:number
};
