import DeviceSizeIndicator from "@/components/DeviceSizeIndicator";
import config from "@/config/site.config.json";

import { Outfit } from "next/font/google";
const outfit = Outfit({
  weight: ["200", "300", "400", "500"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-outfit",
});

import localFont from "next/font/local";
const melodrama = localFont({
  src: "../public/fonts/melodrama/Melodrama-Variable.woff2",
  fontFamily: "Melodrama",
  variable: "--font-melodrama",
});

import AOS from "aos";
import { useEffect } from "react";

import "@/styles/styles.scss";
import "aos/dist/aos.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      disable: "tablet",
    });
  }, []);

  const deviceIndicator = config.settings.deviceIndicator;

  return (
    <section
      className={`${outfit.variable} ${melodrama.variable} font-primary`}
    >
      <DeviceSizeIndicator enable={deviceIndicator} />
      <Component {...pageProps} />
    </section>
  );
};
export default App;
