import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StaticImageData } from "next/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(image: string | StaticImageData | undefined | null): string {
  if (!image) return '';
  if (typeof image === 'string') {
    // Normalize Windows backslashes
    let clean = image.replace(/\\/g, '/');
    // Normalize legacy /src/assets/ or src/assets/ to /assets/
    clean = clean.replace(/^\/?src\/assets\//i, '/assets/');
    if (!clean.startsWith('/') && !clean.startsWith('http://') && !clean.startsWith('https://') && !clean.startsWith('data:')) {
      clean = '/' + clean;
    }
    return clean;
  }
  return image.src;
}
