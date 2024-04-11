import dynamic from "next/dynamic";
const HomePage = dynamic(() => import('@/components/Content/HomePage'), { ssr: false })
export default function Home() {
  return (
      <HomePage />
  );
}
