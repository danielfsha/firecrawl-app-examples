// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({
  dir: "content/docs"
});
var components = defineDocs({
  dir: "content/components"
});
var source_config_default = defineConfig();
export {
  components,
  source_config_default as default,
  docs
};
