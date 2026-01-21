import { useState } from "react";
import { observer } from "mobx-react";
// plane imports
import { Button } from "@plane/propel/button";
import { CheckIcon, InfoIcon } from "@plane/propel/icons";
import { Card } from "@plane/propel/card";
import { ECardDirection, ECardSpacing, ECardVariant } from "@plane/propel/card";
// wrappers
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

export const DemoPage = observer(function DemoPage() {
  // states
  const [count, setCount] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(true);

  return (
    <AuthenticationWrapper>
      <div className="flex h-full w-full items-center justify-center bg-surface-1 p-8">
        <div className="w-full max-w-4xl space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-32 font-semibold text-primary">Demo Page</h1>
            <p className="text-16 text-tertiary">
              This is a demonstration page showcasing various UI components and patterns
            </p>
          </div>

          {/* Counter Card */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG} direction={ECardDirection.COLUMN}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <h2 className="text-20 font-medium">Interactive Counter</h2>
              </div>
              <p className="text-14 text-secondary">Click the buttons below to interact with the counter</p>
              <div className="flex items-center gap-4">
                <Button variant="primary" size="base" onClick={() => setCount(count + 1)}>
                  Increment
                </Button>
                <Button variant="secondary" size="base" onClick={() => setCount(count - 1)}>
                  Decrement
                </Button>
                <Button variant="tertiary" size="base" onClick={() => setCount(0)}>
                  Reset
                </Button>
              </div>
              <div className="rounded-md bg-surface-2 p-4 text-center">
                <p className="text-14 text-tertiary">Current count:</p>
                <p className="text-32 font-bold text-primary">{count}</p>
              </div>
            </div>
          </Card>

          {/* Toggleable Card */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG} direction={ECardDirection.COLUMN}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-20 font-medium">Toggleable Content</h2>
                </div>
                <Button variant="link" size="sm" onClick={() => setIsCardOpen(!isCardOpen)}>
                  {isCardOpen ? "Hide" : "Show"}
                </Button>
              </div>
              {isCardOpen && (
                <div className="space-y-2 rounded-md bg-surface-2 p-4">
                  <p className="text-14 text-secondary">
                    This content can be toggled on and off by clicking the button above.
                  </p>
                  <p className="text-14 text-tertiary">
                    The component uses state management to control visibility and follows the project's conventions for
                    structure and styling.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Button Variants Showcase */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG} direction={ECardDirection.COLUMN}>
            <div className="space-y-4">
              <h2 className="text-20 font-medium">Button Variants</h2>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="base">
                    Primary
                  </Button>
                  <Button variant="secondary" size="base">
                    Secondary
                  </Button>
                  <Button variant="tertiary" size="base">
                    Tertiary
                  </Button>
                  <Button variant="ghost" size="base">
                    Ghost
                  </Button>
                  <Button variant="error-fill" size="base">
                    Error
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="base">
                    Base
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                  <Button variant="primary" size="xl">
                    Extra Large
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="base" prependIcon={<CheckIcon />}>
                    With Icon
                  </Button>
                  <Button variant="secondary" size="base" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" size="base" loading>
                    Loading
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Card Variants Showcase */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.SM} direction={ECardDirection.COLUMN}>
              <h3 className="text-16 font-medium">With Shadow</h3>
              <p className="text-13 text-tertiary">This card has a shadow effect</p>
            </Card>
            <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.SM} direction={ECardDirection.COLUMN}>
              <h3 className="text-16 font-medium">Flat</h3>
              <p className="text-13 text-tertiary">This card is flat without shadow</p>
            </Card>
            <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.SM} direction={ECardDirection.COLUMN}>
              <h3 className="text-16 font-medium">Outlined</h3>
              <p className="text-13 text-tertiary">This card has an outline border</p>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticationWrapper>
  );
});

export default DemoPage;
