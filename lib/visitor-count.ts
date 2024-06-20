import { getVisitor, updateVisitor } from "@/lib/actions";

export const udpateVisitorCount = async () => {
  await updateVisitor();
  const count = await getVisitor();
  return count;
};
