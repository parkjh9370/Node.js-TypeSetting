import * as userRepository from "./auth.js";

type TweetData = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

// 기존 TweetData + 추가 타입 정의
type Tweet = TweetData & {
  username?: string;
  name?: string;
  url?: string;
};

let tweets: TweetData[] = [
  {
    id: "1",
    text: "화이팅!!",
    createdAt: new Date(),
    userId: "1",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date(),
    userId: "1",
  },
];

export async function getAll(): Promise<Tweet[]> {
  return Promise.all(
    tweets.map(async (tweet) => {
      const user = await userRepository.findById(tweet.userId);
      // username: user가 존재하면 username 전달,
      // name: user가 존재하면 user.name 전달
      return {
        ...tweet,
        username: user?.username,
        name: user?.name,
        url: user?.url,
      };
    })
  );
}

export async function getAllByUsername(username: string): Promise<Tweet[]> {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

// Promise 형태로 Tweet 타입 혹은 null 타입
export async function getById(id: string): Promise<Tweet | null> {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.findById(found.userId);
  return {
    ...found,
    username: user?.username,
    name: user?.name,
    url: user?.url,
  };
}

export async function create(text: string, userId: string): Promise<Tweet> {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  // null 타입일 수 없으므로 무조건 타입 확정지어 줄 수 있음(null 이 아니라고)
  return (await getById(tweet.id))!;
}

export async function update(id: string, text: string): Promise<Tweet | null> {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(id);
}

export async function remove(id: string): Promise<void> {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
