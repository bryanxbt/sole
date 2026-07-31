import Image, { type ImageProps } from "next/image";
import { withBase } from "@/lib/paths";

type Props = Omit<ImageProps, "src"> & {
  src: string;
};

/** next/image wrapper that prefixes src with basePath for GH Pages. */
export function AssetImage({ src, alt, ...props }: Props) {
  return <Image src={withBase(src)} alt={alt} {...props} />;
}
