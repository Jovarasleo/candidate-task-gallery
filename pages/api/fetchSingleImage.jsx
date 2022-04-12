// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createApi } from "unsplash-js";

const accessKey = process.env.API_KEY;
// export default async (req, res) => {
//   const { id } = req.query;
//   let resultObj;
//   console.log(id);
//   const unsplash = createApi({
//     accessKey: "YU9UjPnfvLHmui-mKSvRPLouH8q8MC3JJPX6V9AZsiM",
//   });
//   unsplash.photos.get({ photoId: id }).then((result) => {
//     if (result.errors) {
//       // handle error here
//       console.log("error occurred: ", result.errors[0]);
//       return res.status(404).json({ photo: "not found" });
//     } else {
//       // handle success here
//       resultObj = result.response;
//       return res.status(200).json(resultObj);
//     }
//   });
//   return res.status(200);
// };
export default async (req, res) => {
  const { id } = req.query;
  console.log(id);

  const unsplash = createApi({
    accessKey: accessKey,
  });
  return new Promise((resolve, reject) => {
    unsplash.photos
      .get({ photoId: id })
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=180000");
        res.end(JSON.stringify(result.response));
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(405).end();
        resolve();
      });
  });
};
