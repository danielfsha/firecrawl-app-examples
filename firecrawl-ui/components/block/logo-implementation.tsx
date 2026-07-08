"use client";

import { Logo, LogoMenuItem, LogoMenuSeparator } from "../ui/Logo";

export default function LogoImplementaion() {
  return (
    <Logo>
      <LogoMenuItem
        onClick={() => window.open("https://firecrawl.dev", "_blank")}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 5.25H12.75V12.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.25 12.75L12.75 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Open in new tab
      </LogoMenuItem>
      <LogoMenuSeparator />
      <LogoMenuItem
        onClick={() => {
          const svg =
            document.querySelector("[data-slot='button'] svg")?.outerHTML || "";
          navigator.clipboard.writeText(svg);
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z"
            fill="currentColor"
          />
        </svg>
        Copy logo as SVG
      </LogoMenuItem>
      <LogoMenuItem
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/firecrawl-brand-assets.zip";
          link.download = "firecrawl-brand-assets.zip";
          link.click();
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8334 10.8334L10.4715 13.1953C10.2111 13.4557 9.78904 13.4557 9.52869 13.1953L7.16675 10.8334M10.0001 3.83337V13.1667M14.8334 16.1667H5.16675"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download brand assets
      </LogoMenuItem>
      <LogoMenuSeparator />
      <LogoMenuItem
        onClick={() => window.open("https://firecrawl.dev/brand", "_blank")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0001 7.16663C10.0001 6.06206 10.8955 5.16663 12.0001 5.16663H15.8334C16.3857 5.16663 16.8334 5.61434 16.8334 6.16663V13.8333C16.8334 14.3856 16.3857 14.8333 15.8334 14.8333H12.1847C11.7311 14.8333 11.2865 14.9427 10.9006 15.1812C10.5148 15.4197 10.2029 15.7609 10.0001 16.1666M10.0001 7.16663C10.0001 6.06206 9.10465 5.16663 8.00008 5.16663H4.16675C3.61446 5.16663 3.16675 5.61434 3.16675 6.16663V13.8333C3.16675 14.3856 3.61446 14.8333 4.16675 14.8333H7.81541C8.26902 14.8333 8.71367 14.9427 9.09953 15.1812C9.48539 15.4197 9.79722 15.7609 10.0001 16.1666M10.0001 7.16663V16.1666"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Visit brand guidelines
      </LogoMenuItem>
    </Logo>
  );
}
