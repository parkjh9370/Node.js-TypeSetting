type Tweet = {
  id: string;
  text: string;
  createdAt: Date;
  name: string;
  username: string;
  url?: string;
};

// tweet : Tweet의 배열
const tweets: Tweet[] = [
  {
    id: "1",
    text: "하이하이",
    createdAt: new Date(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "하이하이222",
    createdAt: new Date(),
    name: "Sam",
    username: "sam",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

// Function getAll() : Promise 형태로 Tweet 타입의 배열을 리턴
export async function getAll(): Promise<Tweet[]> {
  return tweets;
}
