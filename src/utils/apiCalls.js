import axios from "axios";

let { common, genres, apiKey } = require("./../config.json");

async function getTrailer(id, type) {
  const { data } = await axios.get(
    `${common}${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  const obj = data.results.find((o) => o.type.toLowerCase() === "trailer");
  return obj?.key;
}

async function getGenres(type) {
  const { data } = await axios.get(
    `${common}genre/${type}${genres}${process.env.REACT_APP_API_KEY}`
  );
  return data.genres;
}

async function getMedia(type, category) {
  console.log(
    `${common}${category}/${type}${apiKey}${process.env.REACT_APP_API_KEY}`
  );
  const { data } = await axios.get(
    `${common}${category}/${type}${apiKey}${process.env.REACT_APP_API_KEY}`
  );
  data.results.map(async (m) => (m.trailer = await getTrailer(m.id, category)));
  return data.results;
}

export { getGenres, getMedia };
