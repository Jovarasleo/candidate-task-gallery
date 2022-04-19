// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApi } from "unsplash-js";
const accessKey = process.env.API_KEY;

const getImages = async (req, res) => {
  console.log("getPhotos ping");
  const unsplash = createApi({
    accessKey: accessKey,
  });
  const landscape = unsplash.photos.getRandom({
    orientation: "landscape",
    count: 20,
  });
  const portrait = unsplash.photos.getRandom({
    orientation: "portrait",
    count: 20,
  });

  try {
    const landscapeResult = await landscape;
    const portraitResult = await portrait;
    if (landscapeResult.status === 200 && portraitResult.status === 200) {
      const data = {
        landscape: landscapeResult.response,
        portrait: portraitResult.response,
      };
      res.setHeader("Cache-Control", "no-cache");
      return res.status(200).json({ success: true, images: data });
    }
    if (landscapeResult.status !== 200) {
      console.log(landscapeResult.status);
      res.status(500).json({ success: false, error: "Bad request" });
    }
    console.log(landscapeResult.errors);
  } catch (error) {
    // console.log(error);
    // logger.error("Http error", error);
    // throw new Error.status(400);
    return res.status(400).json({ success: false, error: error });
  }
};
export default getImages;
