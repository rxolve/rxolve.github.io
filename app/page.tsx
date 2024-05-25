import { daylogList } from '@/daylog/daylog-list';

export default function Page() {
  return (
    <main>
      <article>
        <h1>Hello, Stranger ☕</h1>
        <p>이뢰뵈도 12년차 개발자 블로그입니다.</p>
      </article>
      {daylogList.map((daylog) => (
        <article key={daylog.date}>
          <h2>{daylog.title}</h2>
          <p>{daylog.date}</p>
        </article>
      ))}
    </main>
  );
}
