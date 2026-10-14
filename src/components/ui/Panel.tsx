import React from "react";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "stone" | "dark" | "book" | "slot" | "dirt";
  bordered?: boolean;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  variant = "stone",
  bordered = true,
  className = "",
  style,
  ...props
}) => {
  let variantClasses = "";

  switch (variant) {
    case "dark":
      variantClasses = `
        bg-[#1b1c20]/95 text-white
        ${bordered ? "border-t-4 border-l-4 border-[#3a3b42] border-b-4 border-r-4 border-[#0b0c0e] shadow-2xl" : ""}
      `;
      break;

    case "book":
      variantClasses = `
        bg-[#f5e9c9] text-[#2c1d11]
        ${bordered ? "border-t-4 border-l-4 border-[#e0cba0] border-b-4 border-r-4 border-[#78542c] shadow-2xl" : ""}
      `;
      break;

    case "slot":
      variantClasses = `
        bg-[#8b8b8b]
        ${bordered ? "border-t-2 border-l-2 border-[#373737] border-b-2 border-r-2 border-[#ffffff]" : ""}
      `;
      break;

    case "dirt":
      variantClasses = `
        bg-[#382618] text-[#e0e0e0]
        ${bordered ? "border-t-4 border-l-4 border-[#523722] border-b-4 border-r-4 border-[#1f150d] shadow-2xl" : ""}
      `;
      break;

    default: // classic stone GUI panel
      variantClasses = `
        bg-[#c6c6c6] text-[#222222]
        ${bordered ? "border-t-4 border-l-4 border-[#ffffff] border-b-4 border-r-4 border-[#555555] shadow-2xl" : ""}
      `;
      break;
  }

  return (
    <div
      className={`relative ${variantClasses} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
