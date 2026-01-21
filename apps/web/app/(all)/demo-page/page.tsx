import { observer } from "mobx-react";
// plane imports
import { useTranslation } from "@plane/i18n";
import { Button } from "@plane/propel/button";
import { Card, ECardVariant, ECardSpacing } from "@plane/propel/card";
// wrappers
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

const DemoPage = observer(function DemoPage() {
  const { t } = useTranslation();

  return (
    <AuthenticationWrapper>
      <div className="flex h-screen w-full items-center justify-center bg-surface-1">
        <div className="w-full max-w-4xl space-y-6 px-8">
          <div className="space-y-2 text-center">
            <h1 className="text-24 font-semibold text-primary">Welcome to Demo Page</h1>
            <p className="text-14 text-secondary">
              This is a new page created in your workspace. You can customize it as needed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <div className="space-y-3">
                <h2 className="text-16 font-medium text-primary">Card Example 1</h2>
                <p className="text-13 text-tertiary">
                  This is a demonstration card component showing how to structure content with proper spacing and
                  typography.
                </p>
                <Button variant="primary" size="sm">
                  Primary Action
                </Button>
              </div>
            </Card>

            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <div className="space-y-3">
                <h2 className="text-16 font-medium text-primary">Card Example 2</h2>
                <p className="text-13 text-tertiary">
                  Another card demonstrating the component structure. Cards can contain various types of content.
                </p>
                <Button variant="secondary" size="sm">
                  Secondary Action
                </Button>
              </div>
            </Card>
          </div>

          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
            <div className="space-y-4">
              <h2 className="text-16 font-medium text-primary">Full Width Section</h2>
              <p className="text-13 text-tertiary">
                This full-width card demonstrates how content can be organized in different layouts. You can add more
                components, forms, or data displays here.
              </p>
              <div className="flex gap-3">
                <Button variant="primary" size="base">
                  Get Started
                </Button>
                <Button variant="tertiary" size="base">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AuthenticationWrapper>
  );
});

export default DemoPage;
