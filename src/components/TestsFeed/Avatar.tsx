import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40 }) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #eee",
      background: "#fafafa",
    }}
  />
);

export default Avatar;
