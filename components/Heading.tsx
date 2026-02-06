import React from "react";

function Heading({ title, text }: { title: string; text?: string }) {
  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight">{title}</h1>
      <p className="text-sm font-medium text-muted-foreground">{text}</p>
    </div>
  );
}

export default Heading;
