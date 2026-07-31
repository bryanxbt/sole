import { withBase } from "@/lib/paths";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  draggable?: boolean;
  sizes?: string;
  fill?: boolean;
};

/**
 * Plain <img> for public assets on GitHub Pages.
 * next/image re-applies basePath on the client and was double-prefixing
 * (/sole/sole/images/...), which broke every image after hydration.
 */
export function AssetImage({
  src,
  alt,
  width,
  height,
  className = "",
  style,
  priority = false,
  draggable,
  fill = false,
}: Props) {
  const resolved = withBase(src);

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...style,
        }}
        draggable={draggable}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      draggable={draggable}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
