import { Suspense } from "react";
import KanjiListPage from "./KanjiListPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <KanjiListPage />
    </Suspense>
  );
}