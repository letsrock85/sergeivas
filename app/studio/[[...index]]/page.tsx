// This is where the studio component is mounted.
"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

// Dynamically import to prevent server-side initialization timeouts
const NextStudio = dynamic(() => 
  import("next-sanity/studio").then(mod => ({ default: mod.NextStudio })), 
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
);

export default function Studio() {
  return <NextStudio config={config} />;
}
