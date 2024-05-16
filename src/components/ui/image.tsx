"use client";
import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends Omit<NextImageProps, "src" | "placeholder"> {
  src?: string | null;
  placeholder?: Pick<NextImageProps, "placeholder"> & "shimmer";
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#9a9898" offset="20%" />
      <stop stop-color="#676767" offset="50%" />
      <stop stop-color="#9a9898" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#9a9898" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function Image({ src, placeholder, ...props }: ImageProps) {
  if (placeholder === "shimmer") {
    return (
      <NextImage
        src={src ?? "/property_placeholder.jpg"}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        onError={(e) => {
          e.currentTarget.src = "/property_placeholder.jpg";
        }}
        {...props}
      />
    );
  }
  return (
    <NextImage
      src={src ?? "/property_placeholder.jpg"}
      placeholder={placeholder}
      // onError={(e) => {
      //   e.currentTarget.src = '/property_placeholder.jpg';
      // }}
      {...props}
    />
  );
}

export default Image;
