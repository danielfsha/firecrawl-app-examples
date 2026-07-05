"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Corner } from "@/components/ui/corner";
import { CodeBlock } from "@/components/ui/code-block";
import { ExpandableCode } from "@/components/expandable-code";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsDivider } from "@/components/ui/tabs";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";

import { SiteNavbar } from "@/components/nav-implementation";
import { CodeInstall } from "@/components/ui/code-install";
import { Sidebar, type SidebarItem } from "@/components/ui/sidebar";
import {
  GridLoaderCross,
  GridLoaderDense,
  GridLoaderSparse,
  GridLoaderRadial,
} from "@/components/ui/grid-loader";

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Tabs", href: "#tabs" },
  { label: "Switch", href: "#switch" },
  { label: "Input", href: "#input" },
  { label: "Button", href: "#button" },
  { label: "Card", href: "#card" },
  { label: "Accordion", href: "#accordion" },
  { label: "Code Block", href: "#code-block" },
  { label: "Code Install", href: "#code-install" },
  { label: "Grid Loaders", href: "#grid-loaders" },
  { label: "Corner", href: "#corner" },
  { label: "Navbar", href: "#navbar" },
  { label: "Separator", href: "#separator" },
  { label: "Flip Counter", href: "#flip-counter" },
  { label: "Logo", href: "#logo" },
];

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
      <SiteNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="gap-7 flex flex-col flex-1 items-center bg-[#F9F9F9] font-sans dark:bg-black pt-12 pb-24 overflow-y-auto">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-zinc-50 text-center">
            Firecrawl
            <br /> <span className="text-primary">Design system</span>
          </h1>
          <p className="max-w-md text-lg leading-6 text-zinc-600 dark:text-zinc-400 text-center">
            The complete toolkit to search, scrape, and interact with the web at
            scale. It&apos;s also open source.
          </p>

          <div className="flex border h-18">
            <div className="relative px-8 h-full border-r flex items-center justify-center">
              <Corner />
              <Corner position="top-right" />
              <Corner position="bottom-right" />
              <Corner position="bottom-left" />
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </div>
            <div className="relative px-8 h-full border-r flex items-center justify-center">
              <Corner />
              <Corner position="top-right" />
              <Corner position="bottom-right" />
              <Corner position="bottom-left" />
              <Switch />
            </div>
            <div className="relative px-8 h-full flex items-center justify-center">
              <Corner />
              <Corner position="top-right" />
              <Corner position="bottom-right" />
              <Corner position="bottom-left" />
              <Button variant="secondary" size="lg">
                Read Docs
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-[684px]  flex items-center justify-center">
            <Card className="w-full">
              <CardHeader className="flex items-center justify-start gap-1">
                <svg
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.295 19.2534C15.3021 19.2534 18.5504 16.0051 18.5504 11.998C18.5504 7.99087 15.3021 4.74249 11.295 4.74249M11.295 19.2534C7.28787 19.2534 4.03949 16.0051 4.03949 11.998C4.03949 7.99087 7.28787 4.74249 11.295 4.74249M11.295 19.2534C9.45391 19.2534 7.96136 16.0051 7.96136 11.998C7.96136 7.99087 9.45391 4.74249 11.295 4.74249M11.295 19.2534C13.1361 19.2534 14.6285 16.0051 14.6285 11.998C14.6285 7.99087 13.1361 4.74249 11.295 4.74249M18.3544 11.998H4.23558"
                    stroke="#262626"
                    stroke-opacity="0.32"
                    stroke-width="1.17656"
                    stroke-linecap="square"
                  />
                </svg>

                <Input
                  placeholder="https://www.github.com"
                  className="active:border-none focus:border-none border-none focus-visible:border-none focus-visible:ring-0 text-[16px]!"
                />
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Tabs defaultValue="account">
                  <TabsList>
                    <TabsTrigger value="Search">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="5" y="1" width="2" height="2" fill="#D9D9D9" />
                        <rect x="9" y="1" width="2" height="2" fill="#D9D9D9" />
                        <rect x="1" y="5" width="2" height="2" fill="#AFAFAF" />
                        <rect x="5" y="5" width="2" height="2" fill="#AFAFAF" />
                        <rect x="9" y="5" width="2" height="2" fill="#AFAFAF" />
                        <rect
                          x="13"
                          y="5"
                          width="2"
                          height="2"
                          fill="#AFAFAF"
                        />
                        <rect x="1" y="9" width="2" height="2" fill="#D9D9D9" />
                        <rect x="5" y="9" width="2" height="2" fill="#D9D9D9" />
                        <rect x="9" y="9" width="2" height="2" fill="#D9D9D9" />
                        <rect
                          x="13"
                          y="9"
                          width="2"
                          height="2"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="5"
                          y="13"
                          width="2"
                          height="2"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="9"
                          y="13"
                          width="2"
                          height="2"
                          fill="#D9D9D9"
                        />
                      </svg>
                      Search
                    </TabsTrigger>
                    <TabsDivider />
                    <TabsTrigger value="Scrape">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="1" y="1" width="2" height="2" fill="#FFE5DB" />
                        <rect x="5" y="1" width="2" height="2" fill="#FFE5DB" />
                        <rect x="9" y="1" width="2" height="2" fill="#FFE5DB" />
                        <rect
                          x="13"
                          y="1"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                        <rect x="1" y="5" width="2" height="2" fill="#FF4C00" />
                        <rect x="5" y="5" width="2" height="2" fill="#FF4C00" />
                        <rect x="9" y="5" width="2" height="2" fill="#FF4C00" />
                        <rect
                          x="13"
                          y="5"
                          width="2"
                          height="2"
                          fill="#FF4C00"
                        />
                        <rect x="1" y="9" width="2" height="2" fill="#FFE5DB" />
                        <rect x="5" y="9" width="2" height="2" fill="#FFE5DB" />
                        <rect x="9" y="9" width="2" height="2" fill="#FFE5DB" />
                        <rect
                          x="13"
                          y="9"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                        <rect
                          x="1"
                          y="13"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                        <rect
                          x="5"
                          y="13"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                        <rect
                          x="9"
                          y="13"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                        <rect
                          x="13"
                          y="13"
                          width="2"
                          height="2"
                          fill="#FFE5DB"
                        />
                      </svg>
                      Scrape
                    </TabsTrigger>
                    <TabsDivider />
                    <TabsTrigger value="Map">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="1" y="3" width="2" height="2" fill="#D9D9D9" />
                        <rect x="1" y="7" width="2" height="2" fill="#D9D9D9" />
                        <rect x="5" y="7" width="2" height="2" fill="#D9D9D9" />
                        <rect x="9" y="7" width="2" height="2" fill="#D9D9D9" />
                        <rect
                          x="1"
                          y="11"
                          width="2"
                          height="2"
                          fill="#AFAFAF"
                        />
                        <rect
                          x="9"
                          y="11"
                          width="2"
                          height="2"
                          fill="#AFAFAF"
                        />
                        <rect
                          x="13"
                          y="11"
                          width="2"
                          height="2"
                          fill="#AFAFAF"
                        />
                      </svg>
                      Map
                    </TabsTrigger>
                    <TabsDivider />
                    <TabsTrigger value="Crawl">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="2" y="2" width="3" height="3" fill="#D9D9D9" />
                        <rect x="3" y="3" width="1" height="1" fill="#AFAFAF" />
                        <rect x="5" y="5" width="2" height="2" fill="#D9D9D9" />
                        <rect
                          width="3"
                          height="3"
                          transform="matrix(-1 0 0 1 14 2)"
                          fill="#D9D9D9"
                        />
                        <rect
                          width="1"
                          height="1"
                          transform="matrix(-1 0 0 1 13 3)"
                          fill="#AFAFAF"
                        />
                        <rect
                          width="2"
                          height="2"
                          transform="matrix(-1 0 0 1 11 5)"
                          fill="#D9D9D9"
                        />
                        <rect
                          width="3"
                          height="3"
                          transform="matrix(1 0 0 -1 2 14)"
                          fill="#D9D9D9"
                        />
                        <rect
                          width="1"
                          height="1"
                          transform="matrix(1 0 0 -1 3 13)"
                          fill="#AFAFAF"
                        />
                        <rect
                          width="2"
                          height="2"
                          transform="matrix(1 0 0 -1 5 11)"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="3"
                          height="3"
                          transform="rotate(180 14 14)"
                          fill="#D9D9D9"
                        />
                        <rect
                          x="13"
                          y="13"
                          width="1"
                          height="1"
                          transform="rotate(180 13 13)"
                          fill="#AFAFAF"
                        />
                        <rect
                          x="11"
                          y="11"
                          width="2"
                          height="2"
                          transform="rotate(180 11 11)"
                          fill="#D9D9D9"
                        />
                        <rect x="7" y="7" width="2" height="2" fill="#D9D9D9" />
                      </svg>
                      Crawl
                    </TabsTrigger>
                  </TabsList>
                  {/* <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent> */}
                </Tabs>
                <CardAction>
                  <Button className={"w-16 p-1!"} variant="default" size="lg">
                    <ArrowRight />
                  </Button>
                </CardAction>
              </CardContent>
              <CardFooter className="p-2">
                <p className="text-gray-400">Try one:</p>
                <div className="flex gap-1">
                  <Button variant={"secondary"} size={"sm"}>
                    Hacker News
                  </Button>
                  <Button variant={"secondary"} size={"sm"}>
                    Github Trending
                  </Button>
                  <Button variant={"secondary"} size={"sm"}>
                    Wikipedia
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Code Snippets */}
          <div className="w-full max-w-2xl flex items-center justify-center">
            <CodeInstall
              tabs={[
                {
                  label: "npm",
                  code: "npx shadcn@latest init --preset [CODE] --template next",
                },
                {
                  label: "pnpm",
                  code: "pnpm dlx shadcn@latest init --preset [CODE] --template next",
                },
                {
                  label: "yarn",
                  code: "yarn dlx shadcn@latest init --preset [CODE] --template next",
                },
                {
                  label: "bun",
                  code: "bunx --bun shadcn@latest init --preset [CODE] --template next",
                },
              ]}
            />
          </div>

          <div className="w-full max-w-2xl flex items-center justify-center">
            <div className="flex border flex-col rounded-md overflow-hidden">
              <Corner />
              <Corner position="top-right" />
              <Corner position="bottom-right" />
              <Corner position="bottom-left" />

              {/* Tabs */}
              {/* <LayoutGroup>
            <div className="flex items-center gap-0 border-b border-[var(--fc-border-faint)] px-4 pt-3">
              {SNIPPETS.map((snippet, idx) => (
                <Fragment key={snippet.id}>
                  {idx > 0 && (
                    <svg width="1" height="12" viewBox="0 0 1 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <rect width="1" height="12" fill="black" fillOpacity="0.12" />
                    </svg>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`px-4 py-2 text-[13px] font-mono transition-colors relative cursor-pointer ${
                      activeIdx === idx
                        ? "text-[var(--fc-accent-black)]"
                        : "text-[var(--fc-black-alpha-40)]"
                    }`}
                  >
                    {snippet.label}
                    {activeIdx === idx && (
                      <motion.span
                        layoutId="snippet-tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                </Fragment>
              ))}
            </div>
          </LayoutGroup> */}

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

          {/* Accordion */}
          <div className="w-full max-w-2xl flex items-center justify-center">
            <Accordion>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Firecrawl?</AccordionTrigger>
                <AccordionContent>
                  Firecrawl turns any website into LLM-ready data. Scrape,
                  crawl, and extract structured content from any URL with a
                  single API call.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does pricing work?</AccordionTrigger>
                <AccordionContent>
                  Firecrawl offers a generous free tier for developers. Paid
                  plans scale based on the number of pages crawled per month.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I self-host Firecrawl?</AccordionTrigger>
                <AccordionContent>
                  Yes. Firecrawl is open source and can be self-hosted. Check
                  the GitHub repository for deployment guides.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Grid Loaders */}
          <div className="w-full max-w-2xl flex items-center justify-center gap-8 py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-black dark:bg-zinc-900 rounded-md flex items-center justify-center">
                <GridLoaderCross />
              </div>
              <span className="text-xs text-muted-foreground">Cross</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-black dark:bg-zinc-900 rounded-md flex items-center justify-center">
                <GridLoaderDense />
              </div>
              <span className="text-xs text-muted-foreground">Dense</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-black dark:bg-zinc-900 rounded-md flex items-center justify-center">
                <GridLoaderSparse />
              </div>
              <span className="text-xs text-muted-foreground">Sparse</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-black dark:bg-zinc-900 rounded-md flex items-center justify-center">
                <GridLoaderRadial />
              </div>
              <span className="text-xs text-muted-foreground">Radial</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
