import React from "react";
import { Img } from "./Avatar.styles";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 40 }) => (
  <Img src={src} alt={alt} size={size} />
);

export default Avatar;
