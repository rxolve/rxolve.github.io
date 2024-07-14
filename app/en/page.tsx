import { metadata } from "@/lib/metadata";
import Home from "../page";

export const generateMetadata = async () => {
  return metadata("SOSR", "Rxolve to solve", ["SOSR", "rxolve"]);
};
const EnHome = () => {
  return Home({ isEn: true });
};

export default EnHome;
