import { CodeInstall } from "../ui/code-install";

export default function CodeInstallSnippet() {
  return (
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
  );
}
