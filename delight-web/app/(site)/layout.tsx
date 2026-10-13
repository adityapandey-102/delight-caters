import SmoothScroll from "@/components/shell/SmoothScroll";
import Header from "@/components/shell/Header";
import Footer from "@/components/shell/Footer";
import SiteLoader from "@/components/shell/SiteLoader";
import { EnquiryDialog } from "@/modules/enquiry/components/EnquiryDialog";
import { FloatingActions } from "@/modules/enquiry/components/FloatingActions";

/**
 * The public website (no login): header, footer, smooth scroll. Phase 2's
 * signed-in areas (customer portal, staff dashboard) get their own route
 * groups beside this one, as needleye-web does with (public) / (app) / (auth).
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SmoothScroll>
      <SiteLoader />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingActions />
      <EnquiryDialog />
    </SmoothScroll>
  );
}
