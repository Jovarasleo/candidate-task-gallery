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

export default async (req, res) => {
  console.log("fetch landscape backend");
  const unsplash = createApi({
    accessKey: accessKey,
  });
  let random = unsplash.photos.getRandom({
    featured: true,
    orientation: "landscape",
    count: 20,
  });

  let result = await random;
  return res.status(200).json(result.response);
};
