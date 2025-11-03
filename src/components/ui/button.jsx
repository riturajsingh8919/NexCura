import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700",
      outline:
        "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:bg-gray-50",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:bg-gray-200",
      ghost: "hover:bg-gray-100 focus:bg-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline focus:underline",
    };

    const sizes = {
      default: "px-4 py-2 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
