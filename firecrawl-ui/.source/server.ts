// @ts-nocheck
import * as __fd_glob_5 from "../content/learn/installation.mdx?collection=learn"
import * as __fd_glob_4 from "../content/components/tabs.mdx?collection=components"
import * as __fd_glob_3 from "../content/components/switch.mdx?collection=components"
import * as __fd_glob_2 from "../content/components/logo.mdx?collection=components"
import * as __fd_glob_1 from "../content/components/button.mdx?collection=components"
import * as __fd_glob_0 from "../content/components/accordion.mdx?collection=components"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const components = await create.docs("components", "content/components", {}, {"accordion.mdx": __fd_glob_0, "button.mdx": __fd_glob_1, "logo.mdx": __fd_glob_2, "switch.mdx": __fd_glob_3, "tabs.mdx": __fd_glob_4, });

export const docs = await create.docs("docs", "content/docs", {}, {});

export const learn = await create.docs("learn", "content/learn", {}, {"installation.mdx": __fd_glob_5, });