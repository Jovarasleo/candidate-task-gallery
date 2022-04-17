// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApi } from "unsplash-js";
const accessKey = process.env.API_KEY;

// export default async (req, res) => {
//   const { display } = req.query;
//   const unsplash = createApi({
//     accessKey: accessKey,
//   });
//   console.log("request made", display);
//   return new Promise((resolve, reject) => {
//     unsplash.photos
//       .getRandom({
//         featured: true,
//         orientation: display,
//         count: 20,
//       })
//       .then((result) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.setHeader("Cache-Control", "max-age=180000");
//         res.end(JSON.stringify(result.response));
//         resolve();
//       })
//       .catch((error) => {
//         res.json(error);
//         res.status(405).end();
//         resolve();
//       });
//   });
// };

const getImages = async (req, res) => {
  console.log("fetch landscape backend");
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
  const landscapeResult = await landscape;
  const portraitResult = await portrait;
  if (landscapeResult.status === 200 && portraitResult.status === 200) {
    const data = {
      landscape: landscapeResult.response,
      portrait: portraitResult.response,
    };
    return res.status(200).json({ success: true, images: data });
  } else res.status(400).json({ success: false, error: "Bad request" });
};
export default getImages;
