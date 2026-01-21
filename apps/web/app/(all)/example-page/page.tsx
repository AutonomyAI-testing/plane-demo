import React from "react";
// plane imports
import { Button } from "@plane/propel/button";
// components
import DefaultLayout from "@/layouts/default-layout";
// wrappers
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

function ExamplePage() {
  return (
    <DefaultLayout>
      <AuthenticationWrapper>
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-surface-1 p-8">
          <div className="flex w-full max-w-2xl flex-col gap-4 rounded-md border border-subtle bg-layer-1 p-8 shadow-raised-100">
            <h1 className="text-24 font-semibold text-primary">Example Page</h1>
            <p className="text-16 text-secondary">
              This is a new page created following the project structure and coding standards.
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="primary" size="base">
                Primary Action
              </Button>
              <Button variant="secondary" size="base">
                Secondary Action
              </Button>
            </div>
          </div>
        </div>
      </AuthenticationWrapper>
    </DefaultLayout>
  );
}

export default ExamplePage;
