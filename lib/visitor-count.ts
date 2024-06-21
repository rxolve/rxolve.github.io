import { getVisitor, updateVisitor } from "@/lib/api";

export const udpateVisitorCount = async () => {
  await updateVisitor();
  const count = await getVisitor();
  return count;
};
