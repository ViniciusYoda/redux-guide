import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./App.css";
import Header from "./components/header";
import Products from "./components/products";

const App = () => {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

      timeline
        .from("[data-animate='header']", { y: -24, opacity: 0, duration: 0.5 })
        .from("[data-animate='products'] > div > div", {
          y: 24,
          opacity: 0,
          duration: 0.45,
          stagger: 0.07,
        }, "-=0.2");
    }, pageRef);

    return () => animation.revert();
  }, []);

  return (
    <main ref={pageRef}>
      <div data-animate="header">
        <Header />
      </div>
      <div data-animate="products">
        <Products />
      </div>
    </main>
  );
};

export default App;
