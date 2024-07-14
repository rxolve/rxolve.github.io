interface TagItem {
  tag: string;
  count: number;
}

interface TagParams {
  tag: string;
  date: string;
  isEn?: boolean;
}

interface TagDatePageProps {
  params: TagParams;
}

interface TagPageProps {
  params: {
    tag: string;
  };
}
