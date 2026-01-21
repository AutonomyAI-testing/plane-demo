import React from "react";
// plane imports
import { cn } from "@plane/utils";
// ui components
import { Button } from "@plane/ui";
import { Card, ECardSpacing, ECardVariant } from "@plane/ui";
// components
import { PageHead } from "@/components/core/page-title";

function DemoPage() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "components" | "features">("overview");

  return (
    <>
      <PageHead title="Demo Page - Plane" />
      <div className="flex h-full w-full flex-col overflow-y-auto">
        {/* Header Section */}
        <div className="border-b border-subtle bg-surface-1 px-8 py-6">
          <h1 className="text-24 font-semibold text-primary">Demo Showcase</h1>
          <p className="text-14 text-secondary mt-2">Explore the different components and features available in Plane</p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-subtle bg-surface-1 px-8">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "border-b-2 px-1 py-3 text-14 font-medium transition-colors",
                activeTab === "overview"
                  ? "border-accent-strong text-accent-primary"
                  : "border-transparent text-secondary hover:text-primary"
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("components")}
              className={cn(
                "border-b-2 px-1 py-3 text-14 font-medium transition-colors",
                activeTab === "components"
                  ? "border-accent-strong text-accent-primary"
                  : "border-transparent text-secondary hover:text-primary"
              )}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={cn(
                "border-b-2 px-1 py-3 text-14 font-medium transition-colors",
                activeTab === "features"
                  ? "border-accent-strong text-accent-primary"
                  : "border-transparent text-secondary hover:text-primary"
              )}
            >
              Features
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-canvas p-8">
          <div className="mx-auto max-w-[1200px] space-y-8">
            {activeTab === "overview" && (
              <>
                {/* Welcome Card */}
                <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
                  <h2 className="text-18 font-semibold text-primary mb-4">Welcome to Demo Page</h2>
                  <p className="text-14 text-secondary mb-6">
                    This page demonstrates various UI components and patterns used throughout the Plane application. Use
                    the tabs above to explore different sections.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="primary" size="md">
                      Get Started
                    </Button>
                    <Button variant="outline-primary" size="md">
                      Learn More
                    </Button>
                  </div>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
                    <div className="text-32 font-bold text-accent-primary mb-2">150+</div>
                    <div className="text-14 font-medium text-primary mb-1">Components</div>
                    <div className="text-13 text-secondary">Reusable UI components</div>
                  </Card>

                  <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
                    <div className="text-32 font-bold text-accent-primary mb-2">50+</div>
                    <div className="text-14 font-medium text-primary mb-1">Features</div>
                    <div className="text-13 text-secondary">Powerful features to explore</div>
                  </Card>

                  <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
                    <div className="text-32 font-bold text-accent-primary mb-2">100%</div>
                    <div className="text-14 font-medium text-primary mb-1">TypeScript</div>
                    <div className="text-13 text-secondary">Fully typed codebase</div>
                  </Card>
                </div>
              </>
            )}

            {activeTab === "components" && (
              <>
                {/* Button Showcase */}
                <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
                  <h2 className="text-18 font-semibold text-primary mb-4">Button Variants</h2>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" size="md">
                      Primary Button
                    </Button>
                    <Button variant="neutral-primary" size="md">
                      Neutral Button
                    </Button>
                    <Button variant="outline-primary" size="md">
                      Outline Button
                    </Button>
                    <Button variant="danger" size="md">
                      Danger Button
                    </Button>
                  </div>
                </Card>

                {/* Button Sizes */}
                <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
                  <h2 className="text-18 font-semibold text-primary mb-4">Button Sizes</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="sm">
                      Small
                    </Button>
                    <Button variant="primary" size="md">
                      Medium
                    </Button>
                    <Button variant="primary" size="lg">
                      Large
                    </Button>
                  </div>
                </Card>

                {/* Card Variants */}
                <div className="space-y-4">
                  <h2 className="text-18 font-semibold text-primary">Card Variants</h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.SM}>
                      <h3 className="text-16 font-medium text-primary mb-2">Card with Shadow</h3>
                      <p className="text-14 text-secondary">
                        This card uses the WITH_SHADOW variant for elevated appearance.
                      </p>
                    </Card>

                    <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.SM}>
                      <h3 className="text-16 font-medium text-primary mb-2">Card with Border</h3>
                      <p className="text-14 text-secondary">
                        This card uses the WITH_BORDER variant for subtle separation.
                      </p>
                    </Card>
                  </div>
                </div>
              </>
            )}

            {activeTab === "features" && (
              <>
                {/* Features List */}
                <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
                  <h2 className="text-18 font-semibold text-primary mb-6">Key Features</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                        <div className="size-5 rounded-full bg-accent-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-16 font-medium text-primary mb-2">Modern UI Components</h3>
                        <p className="text-14 text-secondary">
                          Built with Tailwind CSS and TypeScript for maintainable, type-safe components.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                        <div className="size-5 rounded-full bg-accent-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-16 font-medium text-primary mb-2">Responsive Design</h3>
                        <p className="text-14 text-secondary">
                          All components are designed to work seamlessly across different screen sizes.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
                        <div className="size-5 rounded-full bg-accent-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-16 font-medium text-primary mb-2">Accessible by Default</h3>
                        <p className="text-14 text-secondary">
                          Components follow accessibility best practices for inclusive user experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* CTA Section */}
                <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
                  <div className="text-center">
                    <h2 className="text-18 font-semibold text-primary mb-3">Ready to Get Started?</h2>
                    <p className="text-14 text-secondary mb-6">
                      Explore the full documentation to learn more about all available components.
                    </p>
                    <Button variant="primary" size="lg">
                      View Documentation
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoPage;
