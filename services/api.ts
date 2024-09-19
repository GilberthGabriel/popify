import { Artist, Track } from "@/types/dto";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.deezer.com",
});

const getChart = async () => {
  const res = await api.get<{
    tracks: {
      data: Track[];
    };
    artists: {
      data: Artist[];
    };
  }>("/chart");

  return res;
};

const getSearch = async (q: string) => {
  const res = await api.get<{
    data: Track[];
  }>(`/search?q=${q}`);

  return res;
};

export { api, getChart, getSearch };
