"use client";

import { config } from "@/lib/config";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const ScreenStart = () => {
  const [showScreenStart, setShowScreenStart] = useState(true);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setFadeClass("opacity-100");
    }, 100);

    return () => {
      clearTimeout(fadeInTimer);
    };
  }, []);

  if (!showScreenStart) {
    return null;
  }

  return (
    <div
      className={` text-white flex flex-col justify-center items-center min-h-screen transition-opacity duration-1000 ${fadeClass}`}
    >
      <TypeAnimation
        sequence={[
          "THE WEDDING OF",
          1000,
          config.coupleNames.toUpperCase(),
          500,
          () => {
            setFadeClass("opacity-0");
            setTimeout(() => setShowScreenStart(false), 1000);
          },
        ]}
        wrapper="span"
        speed={35}
        style={{
          fontSize: "2em",
          display: "inline-block",
        }}
        className="font-legan text-sm"
        repeat={0}
      />
    </div>
  );
};

export default ScreenStart;