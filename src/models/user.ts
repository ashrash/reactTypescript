import { Hobby } from "./hobby";

export interface User {
  _id: number;
  name: string;
}

export interface UserData {
  _id: number;
  name: string;
  hobbies: [Hobby];
}