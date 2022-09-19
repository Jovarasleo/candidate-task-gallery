import { createApi } from "unsplash-js";
const accessKey = process.env.API_KEY;

const getImageById = async (req, res) => {
  const unsplash = createApi({
    accessKey: accessKey,
  });
  const id = req.query.id;

  try {
    const photo = await unsplash.photos.get({
      photoId: id,
    });
    if (photo.status === 200) {
      res.setHeader("Cache-Control", "no-cache");
      const image = photo.response;
      return res.status(200).json({ success: true, image: image });
    }
    if (photo.status !== 200) {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Request Limit Reached" });
  }
};
export default getImageById;
