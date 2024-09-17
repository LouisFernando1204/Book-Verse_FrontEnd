/* eslint-disable react/prop-types */
"use client";
import { cn } from "../../lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";

export const HeroHighlight = ({
    children,
    className,
    containerClassName
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY
    }) {
        if (!currentTarget) return;
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        (<div
            className={cn(
                "relative flex items-center bg-gray-900 justify-center h-full w-full group py-16 md:py-28",
                containerClassName
            )}
            onMouseMove={handleMouseMove}>
            <div
                className="absolute inset-0 bg-dot-thick-white pointer-events-none" />
            <motion.div
                className="pointer-events-none bg-dot-thick-blue-500 absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                    maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                }} />
            <div className={cn("relative z-20", className)}>{children}</div>
        </div>)
    );
};

export const Highlight = ({
    children,
    className
}) => {
    return (
        (<motion.span
            initial={{
                backgroundSize: "0% 100%",
            }}
            animate={{
                backgroundSize: "100% 100%",
            }}
            transition={{
                duration: 1,
                ease: "linear",
                delay: 0.5,
            }}
            style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left center",
                display: "inline",
            }}
            className={cn(
                `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-300`,
                className
            )}>
            {children}
        </motion.span>)
    );
};