import type { SVGProps } from "react";

export function KyratLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12c.9.6 1.8 1 2.8 1.2C7.3 13.8 10 16 10 16s3-2 5-2.2c1-.2 2-.5 2.8-1" />
      <path d="M2 17c.9.6 1.8 1 2.8 1.2C7.3 18.8 10 21 10 21s3-2 5-2.2c1-.2 2-.5 2.8-1" />
      <path d="M2 7c.9.6 1.8 1 2.8 1.2C7.3 8.8 10 11 10 11s3-2 5-2.2c1-.2 2-.5 2.8-1" />
      <path d="M19.5 17.1c.9-.5 1.7-1.1 2.5-1.9" />
      <path d="M19.5 12.1c.9-.5 1.7-1.1 2.5-1.9" />
      <path d="M19.5 7.1c.9-.5 1.7-1.1 2.5-1.9" />
      <path d="M4.5 17.1c-.9-.5-1.7-1.1-2.5-1.9" />
      <path d="M4.5 12.1c-.9-.5-1.7-1.1-2.5-1.9" />
      <path d="M4.5 7.1c-.9-.5-1.7-1.1-2.5-1.9" />
    </svg>
  );
}
