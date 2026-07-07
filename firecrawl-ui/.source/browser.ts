// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  components: create.doc("components", {"accordion.mdx": () => import("../content/components/accordion.mdx?collection=components"), "button.mdx": () => import("../content/components/button.mdx?collection=components"), "switch.mdx": () => import("../content/components/switch.mdx?collection=components"), "tabs.mdx": () => import("../content/components/tabs.mdx?collection=components"), }),
  docs: create.doc("docs", {}),
};
export default browserCollections;