import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aditya.aora",
  projectId: "66c171120020fde88f46",
  databaseId: "66c172da0033c8e58712",
  userCollectionId: "66c1731900017798008d",
  videoCollectionId: "66c17364001b6e8794ae",
  storageId: "66c174f4000ac067a949",
};
// better way to expose it.
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config; // destructuring

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Error in creating user");
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating user");
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error("Error in creating session");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating session");
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("Error in getting user");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (currentUser.documents.length === 0) throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error("Error in getting user");
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    if (!posts) throw new Error("Error in getting posts");
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getting posts");
  }
};
export const getlatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    if (!posts) throw new Error("Error in getting posts");
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getting posts");
  }
};
export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    if (!posts) throw new Error("Error in getting posts");
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getting posts");
  }
};
export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("users", userId),
    ]);
    if (!posts) throw new Error("Error in getting posts");
    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getting posts");
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSessions("current");
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Error in signing out");
  }
};
