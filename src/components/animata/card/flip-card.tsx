// src/components/animata/card/flip-card.tsx
import { cn } from "@/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  title: string;
  description: string;
  subtitle?: string;
  rotate?: "x" | "y";
  children?: React.ReactNode; // For custom front content
}

export default function FlipCard({
  image,
  title,
  description,
  subtitle,
  rotate = "y",
  className,
  children,
  ...props
}: FlipCardProps) {
  const rotationClass = {
    x: ["group-hover/card:rotate-x-180", "rotate-x-180"],
    y: ["group-hover/card:rotate-y-180", "rotate-y-180"],
  } as const;

  return (
    <div className={cn("group/card h-72 w-56 perspective-[1000px]", className)} {...props}>
      <div
        className={cn(
          "relative h-full rounded-2xl transition-transform duration-500 transform-3d",
          rotationClass[rotate][0],
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-2xl shadow-black/20 flex flex-col items-center justify-center p-6">
          {children ? (
            // Custom front content (like icons)
            <div>
              {children}
              <div className="mt-4 text-xl font-bold text-gray-800 text-center">{title}</div>
            </div>
          ) : image ? (
            // Image fallback
            <>
              <img
                src={image}
                alt={title}
                className="h-full w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
              />
              <div className="absolute bottom-4 left-4 text-xl font-bold text-white">{title}</div>
            </>
          ) : (
            // Text fallback display
            <div>
              <div className="mt-4 text-xl font-bold text-gray-800 text-center">{title}</div>
            </div>
          )}
        </div>
        
        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white backface-hidden",
            rotationClass[rotate][1],
          )}
        >
          <div className="flex min-h-full flex-col gap-2">
            {subtitle && (
              <h2 className="text-lg font-bold text-white">{subtitle}</h2>
            )}
            <p className="mt-2 border-t border-t-white/30 pt-4 text-base font-medium leading-relaxed">
              {description}
            </p>
            <div className="mt-auto pt-4">
              <span className="inline-block text-sm font-semibold text-white/80">
                Click to explore →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}