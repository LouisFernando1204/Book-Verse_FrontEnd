/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const ImageWithSkeleton = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageLoaded(true); // Handle errors as well
    }
  }, [src]);

  return (
    <div className="relative h-80 w-full">
      {!imageLoaded ? (
        <Skeleton className="h-80 w-full rounded-lg" />
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-80 w-full rounded-lg object-cover object-top"
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;