import { createContext, useContext } from "react";
import MockYoutubeClient from "../api/mockYoutubeClient";
import Youtube from "../api/youtube";

export const YoutubeApiContext = createContext();

const client = new MockYoutubeClient();
const youtube= new Youtube(client);

export function YoutubeApiProvider({children}) {
  return <YoutubeApiContext.Provider value={{youtube}}>{children}</YoutubeApiContext.Provider>
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext)
}