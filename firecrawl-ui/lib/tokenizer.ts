import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "shiki/langs/shellscript.mjs";
import javascript from "shiki/langs/javascript.mjs";
import python from "shiki/langs/python.mjs";
import typescript from "shiki/langs/typescript.mjs";
import json from "shiki/langs/json.mjs";
import vitesseDark from "shiki/themes/vitesse-dark.mjs";

export type TokenType =
  | "comment"
  | "keyword"
  | "string"
  | "number"
  | "command"
  | "classname"
  | "option"
  | "symbol"
  | "text";

export interface CodeChar {
  id: string;
  char: string;
  type: TokenType;
}

let highlighter: ReturnType<typeof createHighlighterCoreSync> | null = null;

function getHighlighter() {
  if (!highlighter) {
    try {
      highlighter = createHighlighterCoreSync({
        themes: [vitesseDark],
        langs: [bash, javascript, python, typescript, json],
        engine: createJavaScriptRegexEngine(),
      });
    } catch {
      return null;
    }
  }
  return highlighter;
}

const LANG_MAP: Record<string, string> = {
  bash: "shellscript",
  javascript: "javascript",
  python: "python",
  typescript: "typescript",
  json: "json",
};

// Map vitesse-dark hex colors to our token types
function colorToTokenType(color: string | undefined): TokenType {
  if (!color) return "text";
  const c = color.toLowerCase();
  // Vitesse dark theme colors:
  // #758575 = comments (gray-green)
  // #c98a7d = strings (salmon/orange)
  // #d8a657, #4C9A91 = strings alt
  // #80a665 = functions/keywords (green)
  // #4d9375 = keywords alt (teal-green)
  // #cb7676 = numbers/constants (red)
  // #c099ff = class names (purple)
  // #666666 = punctuation (dark gray)
  switch (c) {
    case "#758575":
    case "#6b737c":
      return "comment";
    case "#c98a7d":
    case "#c98a7d77":
    case "#d8a657":
    case "#4c9a91":
      return "string";
    case "#4c9a91":
      return "string";
    case "#cb7676":
      return "number";
    case "#80a665":
      return "command";
    case "#4d9375":
      return "keyword";
    case "#c099ff":
      return "classname";
    case "#666666":
    case "#444444":
      return "symbol";
    default:
      // Heuristic: greenish = keyword/command, reddish/orange = string
      if (c.startsWith("#")) {
        const r = parseInt(c.slice(1, 3), 16);
        const g = parseInt(c.slice(3, 5), 16);
        const b = parseInt(c.slice(5, 7), 16);
        if (isNaN(r)) return "text";
        // Gray (low saturation, low brightness) = comment or symbol
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        if (sat < 0.15 && max < 140) return "symbol";
        if (sat < 0.15 && max >= 140) return "text";
        // Green dominant = keyword/command
        if (g > r && g > b) return "keyword";
        // Red/orange dominant = string
        if (r > g && r > b * 1.2) return "string";
        // Blue/purple = classname
        if (b > r && b > g) return "classname";
      }
      return "text";
  }
}

export function codeToChars(code: string, language: string): CodeChar[][] {
  const lang = LANG_MAP[language] || language;

  let tokens;
  try {
    const hl = getHighlighter();
    if (!hl) throw new Error("No highlighter");
    tokens = hl.codeToTokens(code, {
      lang: lang as "shellscript",
      theme: "vitesse-dark",
    });
  } catch {
    // Fallback: return plain text chars
    return code.split("\n").map((line, lineIdx) => {
      return line.split("").map((char, charIdx) => ({
        id: `l${lineIdx}-c${charIdx}`,
        char,
        type: "text" as TokenType,
      }));
    });
  }

  return tokens.tokens.map((line, lineIdx) => {
    let charIdx = 0;
    const chars: CodeChar[] = [];

    line.forEach((token) => {
      const type = colorToTokenType(token.color);
      const content = token.content;
      const trimmed = content.trim();

      // Force common keywords to plain text (no highlight)
      const PLAIN_KEYWORDS = [
        "const",
        "let",
        "var",
        "new",
        "import",
        "from",
        "export",
        "default",
        "async",
        "await",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "extends",
        "def",
        "in",
        "as",
        "with",
        "try",
        "except",
        "finally",
        "raise",
        "yield",
        "lambda",
      ];
      if (PLAIN_KEYWORDS.includes(trimmed)) {
        content.split("").forEach((char) => {
          chars.push({ id: `l${lineIdx}-c${charIdx++}`, char, type: "text" });
        });
        return;
      }

      // Detect PascalCase or ALL_CAPS (class names, HTTP methods)
      if (
        type !== "comment" &&
        type !== "string" &&
        (/^[A-Z][a-zA-Z0-9]+$/.test(content.trim()) ||
          /^[A-Z]{2,}$/.test(content.trim()))
      ) {
        content.split("").forEach((char) => {
          chars.push({
            id: `l${lineIdx}-c${charIdx++}`,
            char,
            type: "classname",
          });
        });
        return;
      }

      content.split("").forEach((char) => {
        chars.push({ id: `l${lineIdx}-c${charIdx++}`, char, type });
      });
    });

    // Post-process: mark identifiers after a dot as "command"
    for (let i = 0; i < chars.length; i++) {
      if (chars[i].char === "." && chars[i].type === "symbol") {
        // Mark following identifier chars as command
        for (let j = i + 1; j < chars.length; j++) {
          if (/[a-zA-Z0-9_]/.test(chars[j].char)) {
            chars[j].type = "command";
          } else {
            break;
          }
        }
      }
    }

    return chars;
  });
}
