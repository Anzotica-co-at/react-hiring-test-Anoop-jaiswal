import MainLayout from "../layouts/MainLayout";
import Carousel from "../components/Carousel/Carousel";
import { useEffect, useState } from "react";

export default function Home() {
  const [visibleCarousels, setVisibleCarousels] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCarousels((prev) => (prev < 5 ? prev + 1 : prev));
    }, 300); // load each after 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <Carousel />
    </MainLayout>
  );
}
