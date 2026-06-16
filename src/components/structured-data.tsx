import { useEffect, useMemo } from "react";

type StructuredDataProps = {
  id: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function StructuredData({ id, data }: StructuredDataProps) {
  const json = useMemo(() => JSON.stringify(Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data), [data]);

  useEffect(() => {
    const scriptId = `structured-data-${id}`;
    document.getElementById(scriptId)?.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = json;
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [id, json]);

  return null;
}
