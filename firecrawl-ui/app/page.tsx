"use client";

import { Button } from "@/components/ui/button";
import { Corner } from "@/components/ui/corner";
import { CodeBlock } from "@/components/ui/code-block";
import { ExpandableCode } from "@/components/expandable-code";
import { useState } from "react";

import { ArrowRight } from "lucide-react";

import { SiteNavbar } from "@/components/nav-implementation";
import { CodeInstall } from "@/components/ui/code-install";
import { Sidebar, type SidebarItem } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const SNIPPETS = [
  {
    id: "python",
    label: "Python",
    language: "python",
    code: `# pip install firecrawl-py
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# Scrape a website:
app.scrape('firecrawl.dev')`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    language: "javascript",
    code: `// npm install firecrawl
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({ apiKey: "fc-YOUR_API_KEY"  });

// Scrape a website:
app.scrape('firecrawl.dev')`,
  },
  {
    id: "curl",
    label: "cURL",
    language: "bash",
    code: `curl -X POST 'https://api.firecrawl.dev/v2/scrape' \\
-H 'Authorization: Bearer fc-YOUR_API_KEY' \\
-H 'Content-Type: application/json' \\
-d $'{
  "url": "firecrawl.dev"
}'`,
  },
  {
    id: "cli",
    label: "CLI",
    language: "bash",
    code: `# Install and authenticate (one-time)
npm install -g firecrawl-cli
firecrawl login --api-key fc-YOUR_API_KEY

# Scrape a URL (markdown output)
firecrawl scrape https://firecrawl.dev

# Scrape with options
firecrawl scrape https://firecrawl.dev --only-main-content
firecrawl scrape https://firecrawl.dev --format markdown
firecrawl scrape https://firecrawl.dev --format html
firecrawl scrape https://firecrawl.dev --wait-for 5000

# Crawl an entire site
firecrawl crawl https://firecrawl.dev --limit 100
firecrawl crawl https://firecrawl.dev --max-depth 3
firecrawl crawl https://firecrawl.dev --include "/docs/*"
firecrawl crawl https://firecrawl.dev --exclude "/blog/*"

# Map a site (get all URLs)
firecrawl map https://firecrawl.dev
firecrawl map https://firecrawl.dev --limit 500

# Search the web
firecrawl search "firecrawl documentation"
firecrawl search "web scraping API" --limit 10

# Monitor a page for changes
firecrawl monitor https://firecrawl.dev/pricing
firecrawl monitor https://firecrawl.dev --interval 3600

# Check status
firecrawl status
firecrawl whoami`,
  },
];

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSnippet = SNIPPETS[activeIdx];

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <main className="gap-7 flex flex-col flex-1 items-center bg-[#F9F9F9] font-sans dark:bg-black pt-12 pb-24 overflow-y-auto">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-zinc-50 text-center">
            Firecrawl
            <br /> <span className="text-primary">Design system</span>
          </h1>
          <p className="max-w-md leading-6 text-zinc-600 dark:text-zinc-400 text-center">
            The complete toolkit to search, scrape, and interact with the web at
            scale. It&apos;s also open source.
          </p>

          <Slider defaultValue={[33]} max={100} step={1} className="w-32 max-w-md" />
          <Switch />
          <div className="w-full max-w-2xl flex items-center justify-center">
            <div className="flex border flex-col rounded-md overflow-hidden">
              <Corner />
              <Corner position="top-right" />
              <Corner position="bottom-right" />
              <Corner position="bottom-left" />

              {/* Code with expandable */}
              <ExpandableCode>
                <CodeBlock
                  // code={activeSnippet.code}
                  code={`"use client";

import { Eye, EyeOff, Mail, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/motion/input";

export function InputPreview() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("hunter2");
  const [query, setQuery] = useState("Ada");
  const [show, setShow] = useState(false);

  const emailError =
    email.length > 0 && !email.includes("@") ? "Enter a valid email address." : undefined;

  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail />}
        value={email}
        onChange={setEmail}
        error={emailError}
      />
      <Input
        label="Password"
        type={show ? "text" : "password"}
        value={pass}
        onChange={setPass}
        rightIcon={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="pointer-events-auto"
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        }
      />
      <Input
        label="Search"
        leftIcon={<Search />}
        value={query}
        onChange={setQuery}
        success={query.length > 1}
      />
    </div>
  );
}

                `}
                  language={activeSnippet.language}
                  showLineNumbers={true}
                />
              </ExpandableCode>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
