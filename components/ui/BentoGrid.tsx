'use client';
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";
import { BackgroundLines } from "./BackgroundLines";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from '@/data/confetti.json'
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,

  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;

  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('Tonyf6@ymail.com')
    setCopied(true)
  }

  const handleResume = () => {
    const resumeUrl = '../Antonios_resume.pdf'; 
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Antonios_resume.pdf';
    link.click();
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none  dark:bg-black dark:border-white/[0.2] bg-white justify-between flex flex-col space-y-4 border border-white/[0.1]",
        className
      )}
      style={{
        // background: "rgb(238,174,202)",

        background:'linear-gradient(129deg, rgba(33,47,98,1) 46%, rgba(33,128,214,1) 100%)'
      }}
    >
      <div className={`${id === 6 && "flex justify-center h-full"}`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          }`}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className={"object-cover object-center w-full h-full"}
            />
          )}
        </div>

        {id === 6 && (
          //render animation
          <BackgroundGradientAnimation>
            <div className="absolute z-50 flex items-center justify-center text-white font-bold"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition dura†ion-200 relative md:h-full min-h-40 flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight text-neutral-200 text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg text-neutral-200 lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && (
            <BackgroundLines>
              <div></div>
            </BackgroundLines>
          )}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit relative -right-3 lg:right-2">
              <div className="flex flex-col relative gap-3 lg:gap-8">
                {["React.js", "Next.js", "Typescript"].map((item) => (
                  <span
                    key={item}
                    className="py-3 lg:py-4 lg:px-5 px-3 mt-3 text-sx lg:text-base opacity-50 lg:opacity-100 rounded-xl text-center bg-blue-950 "
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col relative gap-3 lg:gap-8">
                {["HTML", "CSS", "Javascript"].map((item) => (
                  <span
                    key={item}
                    className="py-3 lg:py-4 lg:px-5 px-3 mt-3 text-sx lg:text-base opacity-50 lg:opacity-100 rounded-xl text-center bg-blue-950 "
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col relative gap-3 lg:gap-8">
                {["C#", "Tailwind", "MySQL"].map((item) => (
                  <span
                    key={item}
                    className="py-3 lg:py-4 lg:px-5 px-3 mt-3 text-sx lg:text-base opacity-50 lg:opacity-100 rounded-xl text-center bg-blue-950 "
                  >
                    {item}
                  </span>
                ))}

              </div>
            </div>
          )}

          {id === 6 && (
            <div className=" relative">
              <div className="absolute -bottom-5 right-0">
                <Lottie
                  options={{
                    loop:copied,
                    autoplay:copied,
                    animationData,
                    rendererSettings: {
                      preserveAspectRatio:'xMidYMid slice',
                    }
                  }}
                />
              </div>
              <MagicButton
                title={copied ? 'Email copied': 'Copy my Email'}
                icon={<IoCopyOutline/>}
                position="left"
                otherClasses="z-10"
                handleClick={handleCopy}
    
              />
                <MagicButton
                title={"Download my Resume"}
                icon={<IoCopyOutline/>}
                position="left"
                otherClasses="z-10"
                handleClick={handleResume}
    
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};