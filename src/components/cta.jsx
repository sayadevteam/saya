import { ArrowBigRight, ArrowRight } from "lucide-react";
import React from "react";

function ButtonCreativeTop() {
  return (
    <div className="group relative cursor-pointer px-2 py-3 w-28 h-12 border bg-white rounded-full overflow-hidden text-black text-center text-sm font-medium">
      <span className="inline-block translate-y-0 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
        Our Work
      </span>

      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-1 bg-orange-400 text-white opacity-0 translate-y-8 transition-all duration-300 rounded-full group-hover:translate-y-0 group-hover:opacity-100 group-hover:rounded-none">
        <span className="text-sm">Our Work</span>
      </div>
    </div>
  );
}

export default ButtonCreativeTop;
