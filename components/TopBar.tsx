import { site } from "@/lib/config";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
} from "./Icons";

export default function TopBar() {
  return (
    <div className="border-b border-line bg-cream text-[12px] text-muted">
      <div className="container-x flex h-9 items-center justify-end">
        <div className="flex items-center gap-3 text-muted">
          <a href={site.social.facebook} aria-label="Facebook" className="hover:text-brand">
            <FacebookIcon className="h-3.5 w-3.5" />
          </a>
          <a href={site.social.twitter} aria-label="Twitter" className="hover:text-brand">
            <TwitterIcon className="h-3.5 w-3.5" />
          </a>
          <a href={site.social.instagram} aria-label="Instagram" className="hover:text-brand">
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
          <a href={site.social.pinterest} aria-label="Pinterest" className="hover:text-brand">
            <PinterestIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
