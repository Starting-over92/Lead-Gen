"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  max?: number;
  suggestions?: string[];
}

export function TagInput({ value, onChange, placeholder, max, suggestions }: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (!clean || value.includes(clean)) return;
    if (max && value.length >= max) return;
    onChange([...value, clean]);
    setDraft("");
  };

  const removeTag = (tag: string) => onChange(value.filter((item) => item !== tag));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (["Enter", ","].includes(e.key)) {
            e.preventDefault();
            addTag(draft);
          }
        }}
      />
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <Button key={item} type="button" size="sm" variant="outline" onClick={() => addTag(item)}>
              + {item}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
