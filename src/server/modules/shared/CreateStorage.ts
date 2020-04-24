import { Storage } from "@google-cloud/storage";
import path from "path";

export const storage = new Storage({
  keyFilename: path.join(__dirname, "../../../../GCS-Blog-8745d75d4af0.json"),
  projectId: "white-welder-264719"
});

export const BlogBucket = storage.bucket("switchtitle-blog-images");
