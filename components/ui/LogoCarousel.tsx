"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface LogoCarouselProps {
  size?: number;
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ size = 8 }) => {
  // List of logos
  const logos = [
    { src: "/salesforce.svg", alt: "Salesforce" },
    { src: "/mailchimp.png", alt: "Mailchimp" },
    { src: "/classy.jpg", alt: "Classy" },
    { src: "/give_lively.jpg", alt: "GiveLively" },
    { src: "/brevo.jpg", alt: "Brevo" },
    { src: "/bloomerang.jpg", alt: "Bloomerang" },
    { src: "/constant-contact.png", alt: "Constant Contact" },
    { src: "/blackbaud.jpeg", alt: "Blackbaud" },
    { src: "/hubspot.jpg", alt: "HubSpot" },
  ];

  // Duplicated row for seamless animation
  const allLogos = [...logos, ...logos];
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // When all images are loaded, measure the width of one row
  useEffect(() => {
    if (imagesLoaded >= allLogos.length && rowRef.current) {
      // Only measure the first set
      const children = rowRef.current.children;
      let width = 0;
      for (let i = 0; i < logos.length; i++) {
        width += (children[i] as HTMLElement).offsetWidth + (i < logos.length - 1 ? 24 : 0); // 24px gap-6
      }
      setRowWidth(width);
    }
  }, [imagesLoaded, allLogos.length, logos.length]);

  // Fallback: recalculate rowWidth after a short delay in case images are cached
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (rowRef.current) {
        const children = rowRef.current.children;
        let width = 0;
        for (let i = 0; i < logos.length; i++) {
          width += (children[i] as HTMLElement).offsetWidth + (i < logos.length - 1 ? 24 : 0);
        }
        setRowWidth(width);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [allLogos.length, logos.length]);

  // Reset imagesLoaded on mount or when allLogos changes
  useEffect(() => {
    setImagesLoaded(0);
  }, [allLogos.length]);

  return (
    <div className="w-full flex flex-col items-center mb-2">
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6"
          ref={rowRef}
          style={{ width: 'max-content' }}
          animate={rowWidth ? { x: [0, -rowWidth] } : false}
          transition={rowWidth ? { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } : {}}
        >
          {allLogos.map((logo, idx) => (
            <Image
              key={idx + logo.src}
              src={logo.src}
              alt={logo.alt}
              width={64}
              height={64}
              className="mx-2"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;
