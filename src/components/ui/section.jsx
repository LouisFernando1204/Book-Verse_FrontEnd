/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const Section = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    (<motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [40, 0, 0],
      }}
      transition={{
        duration: 1,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className={cn(
        "py-10 h-full flex flex-col lg:border-r relative group/feature",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-300 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-300 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-white">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-white max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>)
  );
};

export default Section;