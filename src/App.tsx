import { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/scroll-to-top";
import BackToTop from "@/components/back-to-top";
import CookieBanner from "@/components/cookie-banner";
import { ErrorBoundary } from "@/components/error-boundary";
import { ReadingProgressBar } from "@/components/progress-bar";
import { initAnalytics } from "@/lib/analytics";

const AiChat = lazy(() => import("@/components/ai-chat"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Solutions = lazy(() => import("@/pages/solutions"));
const SolutionDetail = lazy(() => import("@/pages/solution-detail"));
const Products = lazy(() => import("@/pages/products"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const Industries = lazy(() => import("@/pages/industries"));
const Academy = lazy(() => import("@/pages/academy"));
const Insights = lazy(() => import("@/pages/insights"));
const InsightDetail = lazy(() => import("@/pages/insight-detail"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const SitemapPage = lazy(() => import("@/pages/sitemap"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const CaseStudyDetail = lazy(() => import("@/pages/case-study-detail"));
const Partners = lazy(() => import("@/pages/partners"));
const Careers = lazy(() => import("@/pages/careers"));
const Press = lazy(() => import("@/pages/press"));
const Portal = lazy(() => import("@/pages/portal"));
const RequestDemo = lazy(() => import("@/pages/request-demo"));
const CompanyProfile = lazy(() => import("@/pages/company-profile"));
const WebMobileSaaS = lazy(() => import("@/pages/web-mobile-saas"));

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/solutions/web-mobile-saas-platforms" component={WebMobileSaaS} />
          <Route path="/solutions/:slug" component={SolutionDetail} />
          <Route path="/products" component={Products} />
          <Route path="/products/:slug" component={ProductDetail} />
          <Route path="/industries" component={Industries} />
          <Route path="/academy" component={Academy} />
          <Route path="/insights" component={Insights} />
          <Route path="/insights/:slug" component={InsightDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/sitemap" component={SitemapPage} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/case-studies/:slug" component={CaseStudyDetail} />
          <Route path="/partners" component={Partners} />
          <Route path="/careers" component={Careers} />
          <Route path="/press" component={Press} />
          <Route path="/portal" component={Portal} />
          <Route path="/request-demo" component={RequestDemo} />
          <Route path="/company-profile" component={CompanyProfile} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  const [showAiChat, setShowAiChat] = useState(false);

  useEffect(() => {
    initAnalytics();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "aicore_cookie_consent") initAnalytics();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const requestIdleCallback = idleWindow.requestIdleCallback;
    const usingIdleCallback = typeof requestIdleCallback === "function";
    const handle = usingIdleCallback
      ? requestIdleCallback(() => setShowAiChat(true), { timeout: 3000 })
      : window.setTimeout(() => setShowAiChat(true), 2000);

    return () => {
      if (usingIdleCallback && typeof idleWindow.cancelIdleCallback === "function") {
        idleWindow.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ReadingProgressBar />
            <Router />
          </WouterRouter>
          <CookieBanner />
          {showAiChat && (
            <Suspense fallback={null}>
              <AiChat />
            </Suspense>
          )}
          <BackToTop />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
