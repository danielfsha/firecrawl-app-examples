import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsDivider, TabsList, TabsTrigger } from "../ui/tabs";

export default function ScrapeInput() {
  return (
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
              strokeOpacity="0.32"
              strokeWidth="1.17656"
              strokeLinecap="square"
            />
          </svg>

          <Input
            placeholder="https://www.github.com"
            className="active:border-none focus:border-none border-none focus-visible:border-none focus-visible:ring-0 text-[16px]!"
          />
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Tabs defaultValue="Search" className={"hidden lg:flex"}>
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
                  <rect x="13" y="5" width="2" height="2" fill="#AFAFAF" />
                  <rect x="1" y="9" width="2" height="2" fill="#D9D9D9" />
                  <rect x="5" y="9" width="2" height="2" fill="#D9D9D9" />
                  <rect x="9" y="9" width="2" height="2" fill="#D9D9D9" />
                  <rect x="13" y="9" width="2" height="2" fill="#D9D9D9" />
                  <rect x="5" y="13" width="2" height="2" fill="#D9D9D9" />
                  <rect x="9" y="13" width="2" height="2" fill="#D9D9D9" />
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
                  <rect x="13" y="1" width="2" height="2" fill="#FFE5DB" />
                  <rect x="1" y="5" width="2" height="2" fill="#FF4C00" />
                  <rect x="5" y="5" width="2" height="2" fill="#FF4C00" />
                  <rect x="9" y="5" width="2" height="2" fill="#FF4C00" />
                  <rect x="13" y="5" width="2" height="2" fill="#FF4C00" />
                  <rect x="1" y="9" width="2" height="2" fill="#FFE5DB" />
                  <rect x="5" y="9" width="2" height="2" fill="#FFE5DB" />
                  <rect x="9" y="9" width="2" height="2" fill="#FFE5DB" />
                  <rect x="13" y="9" width="2" height="2" fill="#FFE5DB" />
                  <rect x="1" y="13" width="2" height="2" fill="#FFE5DB" />
                  <rect x="5" y="13" width="2" height="2" fill="#FFE5DB" />
                  <rect x="9" y="13" width="2" height="2" fill="#FFE5DB" />
                  <rect x="13" y="13" width="2" height="2" fill="#FFE5DB" />
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
                  <rect x="1" y="11" width="2" height="2" fill="#AFAFAF" />
                  <rect x="9" y="11" width="2" height="2" fill="#AFAFAF" />
                  <rect x="13" y="11" width="2" height="2" fill="#AFAFAF" />
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
        <CardFooter className="p-2 flex gap-1 flex-wrap">
          <p className="text-gray-400">Try one:</p>
          <Button variant={"secondary"} size={"sm"}>
            Hacker News
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            Github Trending
          </Button>
          <Button variant={"secondary"} size={"sm"}>
            Wikipedia
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
