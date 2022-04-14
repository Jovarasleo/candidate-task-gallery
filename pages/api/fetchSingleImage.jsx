// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApi } from "unsplash-js";

const accessKey = process.env.API_KEY;

export default async (req, res) => {
  const { id } = req.query;
  console.log("fetch single image backend");
  const unsplash = createApi({
    accessKey: accessKey,
  });
  let random = unsplash.photos.get({ photoId: id });
  let result = await random;
  return res.status(200).json(result.response);
};

// export default async (req, res) => {
//   const { id } = req.query;
//   console.log(id);

//   const unsplash = createApi({
//     accessKey: accessKey,
//   });
//   return new Promise((resolve, reject) => {
//     unsplash.photos
//       .get({ photoId: id })
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
