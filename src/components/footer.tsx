import { Facebook, Instagram, Twitter } from "lucide-react";
import { KyratLogo } from "./icons";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container flex flex-col items-center justify-between gap-6 px-4 py-8 md:px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <KyratLogo className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold font-headline">KYRAT Festival</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} KYRAT Festival. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
