// import { debates } from "@/lib/tweets";
// import type { GroupedByUsername } from "@/lib/types";

// export const getTweetId = (tweet: string) => {
//   const tweetId = tweet.split("/").pop();

//   if (!tweetId) {
//     throw new Error("Invalid tweet URL");
//   }

//   return tweetId;
// };

// // export const getTweetWithCache = async (id: string) => {
// //   const response = await fetch(
// //     `https://baku-hantam.vercel.app/api/tweet/${id}`,
// //   );

// //   if (!response.ok) {
// //     return null;
// //   }

// //   return response.json();
// // };

// export const checkDuplicateTweets = () => {
//   const duplicateTweets = debates
//     .flatMap((d) => {
//       return d.tweets.map((t) => t);
//     })
//     .filter((value, index, self) => {
//       return self.indexOf(value) !== index;
//     });

//   if (duplicateTweets.length > 0) {
//     console.error("Duplicate tweets", duplicateTweets);
//   }
// };

// // SPAGHETTI CODE
// // IF YOU WANT TO HELP ME TO REFACTOR THIS FUNCTION, PLEASE DO
// // I'M SURE THERE'S A BETTER WAY TO DO THIS
// // I'M JUST TOO LAZY TO THINK ABOUT IT
// // THANKS

// export const groupByUsername = async () => {
//   const groupedByUsername = debates
//     .reduce(
//       (acc, debate) => {
//         const tweets = debate.tweets.map((tweet) => {
//           return {
//             url: tweet,
//             topic: debate.slug,
//           };
//         });

//         return acc.concat(tweets);
//       },
//       [] as { url: string; topic: string }[],
//     )
//     .reduce((acc, tweet) => {
//       const username = tweet.url.split("/")[3];

//       if (!username) {
//         return acc;
//       }

//       const user = acc.find((u) => u.username === username);

//       if (user) {
//         user.tweets.push(tweet);
//       } else {
//         acc.push({
//           username,
//           tweets: [tweet],
//           rank: 0,
//         });
//       }

//       return acc;
//     }, [] as GroupedByUsername);

//   const sortByTweetsLength = groupedByUsername.sort((a, b) => {
//     return b.tweets.length - a.tweets.length;
//   });

//   // add rank by number of tweets
//   // if the number of tweets is the same, the rank is the same
//   sortByTweetsLength.forEach((user, index) => {
//     const previousUser = sortByTweetsLength[index - 1];

//     if (previousUser && previousUser.tweets.length === user.tweets.length) {
//       user.rank = previousUser.rank;
//     } else {
//       user.rank = index + 1;
//     }
//   });

//   const addProfilePromises = sortByTweetsLength.map(async (user) => {
//     const response = await getTweetWithCache(getTweetId(user.tweets[0].url));

//     if (!response) {
//       return user;
//     }

//     const { user: profile } = response as {
//       user: {
//         id_str: string;
//         name: string;
//         profile_image_url_https: string;
//         screen_name: string;
//         verified: boolean;
//         is_blue_verified: boolean;
//         profile_image_shape: string;
//       };
//     };

//     return {
//       ...user,
//       profile: profile,
//     };
//   });

//   const addProfile = (await Promise.all(addProfilePromises)) as {
//     username: string;
//     tweets: { url: string; topic: string }[];
//     rank: number;
//     profile?: {
//       id_str: string;
//       name: string;
//       profile_image_url_https: string;
//       screen_name: string;
//       verified: boolean;
//       is_blue_verified: boolean;
//       profile_image_shape: string;
//     };
//   }[];

//   const sortByRankAndAlphabet = addProfile.sort((a, b) => {
//     if (a.rank === b.rank) {
//       return a.username.localeCompare(b.username);
//     }

//     return a.rank - b.rank;
//   });

//   return sortByRankAndAlphabet;
// };

export const createTweetUrl = (username: string, tweetId: string) => {
  return `https://twitter.com/${username}/status/${tweetId}`;
};
