import { ChatModel } from "../interface/chat";

export const demoObj = {
  _id: '66708bf4c979a35d981d3fa7',
  name: 'test',
  users: [
    {
      _id: '66703721bb3c300cb28923a2',
      username: 'test',
     
    },
    {
      _id: '66708afca238893aae50ec99',
      username: 'test2',
      firstName: 'test',
      lastName: 'test',
    },
  ],
  messages: [
    {
      _id: '667173e8ff767f1ea4677187',
      text: 'Hey Jane, how are you doing today?',
      userId: '66703721bb3c300cb28923a2',
      chatId: '66708bf4c979a35d981d3fa7',
      senderUserName: 'test'
    },
    {
      _id: '667173e8ff767f1ea4677188',
      text: "Hi John, I'm doing well! What's up?",
      userId: '66708afca238893aae50ec99',
      chatId: '66708bf4c979a35d981d3fa7',
      senderUserName: 'test2'
    },
    {
      _id: '667173e8ff767f1ea4677189',
      text: 'Not much, just hanging out. What are you up to this weekend?',
      userId: '66703721bb3c300cb28923a2',
      chatId: '66708bf4c979a35d981d3fa7',
      senderUserName: 'test'
    },
    {
      _id: '667173e8ff767f1ea467718a',
      text: "I'm going to a movie with friends. Anything fun planned for you?",
      userId: '66708afca238893aae50ec99',
      chatId: '66708bf4c979a35d981d3fa7',
      senderUserName: 'test2'
    },
  ],
}as ChatModel
