import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import placeholderIcon from '@/assets/icons/placeholder.svg';
import spinnerIcon from '@/assets/icons/spinner.svg';

import styles from './image-loader.module.css';

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(spinnerIcon);
  const [styleClassName, setStyleClassName] = useState<string | null>(
    styles.loader
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setStyleClassName(null);
    };

    img.onerror = () => {
      setImageSrc(placeholderIcon);
      setStyleClassName(styles.placeholder);
    };
  }, [src]);

  return (
    <img
      src={imageSrc}
      className={clsx(className, styleClassName)}
      alt={alt}
      {...props}
    />
  );
};
