import { AuthModal } from "@/components/block/auth-modal";
import CodeInstallSnippet from "@/components/block/code-install-snippet";
import LogoImplementaion from "@/components/block/logo-implementation";
import ScrapeInput from "@/components/block/scrape-input";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Corner } from "@/components/ui/corner";
import { GutterLayout } from "@/components/ui/gutter-layout";

export default async function ComponentDetailPage(props: {
  params: Promise<{ id: string[] }>;
}) {
  return (
    <GutterLayout
      className="h-screen"
      left={
        <div className="relative">
          <Corner position="top-right" />
        </div>
      }
      right={
        <div className="relative">
          <Corner position="top-left" />
        </div>
      }
    >
       <BrowserFrame url="Logo" className="border-0 border-t">
        {/* Your block content here */}
        <div className="flex items-center justify-center p-4 py-20 lg:p-20">
          <LogoImplementaion />
        </div>
      </BrowserFrame>


      <BrowserFrame url="Auth Modal" className="border-0">
        {/* Your block content here */}
        <AuthModal />
      </BrowserFrame>

      <BrowserFrame url="Scrape Input" className="border-0 border-t">
        {/* Your block content here */}
        <div className="flex items-center justify-center p-4 py-20 lg:p-20">
          <ScrapeInput />
        </div>
      </BrowserFrame>

      <BrowserFrame url="Code Install" className="border-0 border-t">
        {/* Your block content here */}
        <div className="flex items-center justify-center p-4 py-20 lg:p-20">
          <CodeInstallSnippet />
        </div>
      </BrowserFrame>
    </GutterLayout>
  );
}
