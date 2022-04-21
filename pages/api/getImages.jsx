import { createApi } from "unsplash-js";
const accessKey = process.env.API_KEY;

const getImages = async (_, res) => {
  const unsplash = createApi({
    accessKey: accessKey,
  });

  try {
    const landscape = await unsplash.photos.getRandom({
      orientation: "landscape",
      count: 20,
    });
    const portrait = await unsplash.photos.getRandom({
      orientation: "portrait",
      count: 20,
    });

    if (landscape.status === 200 && portrait.status === 200) {
      const data = {
        landscape: landscape.response,
        portrait: portrait.response,
      };
      res.setHeader("Cache-Control", "no-cache");
      return res.status(200).json({ success: true, images: data });
    }
    if (landscape.status !== 200) {
      console.log(landscape.status);
      res.status(500).json({ success: false });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Request Limit Reached" });
  }
};
export default getImages;
