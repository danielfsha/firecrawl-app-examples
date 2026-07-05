import { loadRegistryItem, RegistryItemNotFoundError } from "shadcn/registry";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_request: NextRequest, ctx: any) {
  const { name } = await ctx.params;

  try {
    const item = await loadRegistryItem(name);

    return Response.json(item);
  } catch (error) {
    if (error instanceof RegistryItemNotFoundError) {
      return Response.json(
        { error: `Registry item "${name}" was not found.` },
        { status: 404 }
      );
    }

    console.error(error);

    return Response.json(
      { error: "Failed to load registry item." },
      { status: 500 }
    );
  }
}
