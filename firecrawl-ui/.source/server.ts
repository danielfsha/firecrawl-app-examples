// @ts-nocheck
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs";
import * as __fd_glob_1 from "../content/components/tabs.mdx?collection=components";
import * as __fd_glob_0 from "../content/components/button.mdx?collection=components";
import { server } from "fumadocs-mdx/runtime/server";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ["extractedReferences"] } });

export const components = await create.docs(
  "components",
  "content/components",
  {},
  { "button.mdx": __fd_glob_0, "tabs.mdx": __fd_glob_1 }
);

export const docs = await create.docs(
  "docs",
  "content/docs",
  {},
  { "index.mdx": __fd_glob_2 }
);
