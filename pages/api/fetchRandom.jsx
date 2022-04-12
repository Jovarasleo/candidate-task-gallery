// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApi } from "unsplash-js";

const accessKey = process.env.API_KEY;

export default async (_, res) => {
  const unsplash = createApi({
    accessKey: accessKey,
  });
  let random = unsplash.photos.getRandom({
    featured: true,
    orientation: "portrait",
    count: 10,
  });

  let result = await random;
  console.log(result);
  return res.status(200).json(result.response);
};
