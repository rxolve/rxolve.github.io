import { getVisitorCount, updateVisitorCount } from "@/lib/api";
import { emojiNumber } from "./emoji-number";

export const checkVisitorCount = async () => {
  await updateVisitorCount();
  const count = await getVisitorCount();
  return emojiNumber(count);
};
