import { createApi } from "unsplash-js";

const accessKey = process.env.API_KEY;
const imageCount = 20;

const getImages = async (req, res) => {
  const unsplash = createApi({
    accessKey: accessKey,
  });

  try {
    const landscape = await unsplash.photos.getRandom({
      orientation: "landscape",
      count: imageCount,
    });
    const portrait = await unsplash.photos.getRandom({
      orientation: "portrait",
      count: imageCount,
    });

    if (landscape.status === 200 && portrait.status === 200) {
      console.log("request");
      function formatData() {
        let dataArray = [];
        for (let i = 0; i < 20; i++) {
          let pairArray = [];
          if (i % 2 === 0) {
            pairArray.push(landscape?.response[i]);
            pairArray.push(portrait?.response[i]);
          }
          if (i % 2 === 1) {
            pairArray.push(portrait?.response[i]);
            pairArray.push(landscape?.response[i]);
          }
          dataArray.push(pairArray);
        }
        return dataArray;
      }

      const data = formatData();
      res.setHeader("Cache-Control", "no-cache");
      return res.status(200).json({ success: true, images: data });
    }

    if (landscape.status !== 200) {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Request Limit Reached" });
  }
};
export default getImages;
