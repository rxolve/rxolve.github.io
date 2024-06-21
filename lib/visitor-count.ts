import { getVisitor, updateVisitor } from "@/lib/api";
import { emojiNumber } from "./emoji-number";

export const udpateVisitorCount = async () => {
  await updateVisitor();
  const count = await getVisitor();
  return emojiNumber(count);
};
