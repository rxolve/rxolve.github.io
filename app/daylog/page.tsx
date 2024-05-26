import * as fs from 'fs';
import * as path from 'path';

export default function Page() {
  const directoryPath = path.join(process.cwd(), 'daylog');

  let files: { name: string; content: string }[] = [];

  try {
    const filenames = fs.readdirSync(directoryPath);
    files = filenames
      .filter((filename) => !['404.mdx'].includes(filename))
      .map((filename) => {
        const filePath = path.join(directoryPath, filename);
        const content = fs.readFileSync(filePath, 'utf-8');
        return {
          name: filename,
          content,
        };
      });
  } catch (err) {
    console.error('Unable to scan directory:', err);
  }

  console.log(files);

  return (
    <div>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
