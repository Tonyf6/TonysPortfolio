"use client";
import { useMotionValue, MotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { socialMedia } from "@/data";

interface EvervaultCardProps {
  className?: string;
  img?: string;
  url?: string;
}

export const EvervaultCard = ({
  className,
  img,
  url,
}: EvervaultCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    const str = generateRandomString(1500);
    setRandomString(str);
  }

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative cursor-pointer transition-transform duration-300 hover:scale-105",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-44 w-44 rounded-full flex items-center justify-center">
            <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
            {img && (
              <img 
                src={img} 
                alt="social media icon" 
                className="w-20 h-20 z-20 object-contain transform transition-transform group-hover/card:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CardPatternProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
}

export function CardPattern({ mouseX, mouseY, randomString }: CardPatternProps) {
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

export const EvervaultCards = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center p-8">
      {socialMedia.map((social) => (
        <div key={social.id} className="w-full md:w-1/3 aspect-square max-w-xl">
          <EvervaultCard 
            img={social.img} 
            url={social.url}
          />
        </div>
      ))}
    </div>
  );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const generateRandomString = (length: number) => {
  let result = ""; // This needs to remain 'let' as it's modified in the loop
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};