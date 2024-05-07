import dynamic from "next/dynamic";
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Главная',
}
const HomePage = dynamic(() => import('@/components/Content/HomePage/HomePage'), { ssr: false })
export default function Home() {
  return (
      <HomePage />
  );
}
