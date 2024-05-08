import { createText } from './lib/actions';

export default function Page() {
  return (
    <main className="container-fluid">
      <h2>Hello, Stranger ☕</h2>
      <form className="pico" action={createText}>
        <input type="text" name="text" placeholder="Text" aria-label="Text" />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
