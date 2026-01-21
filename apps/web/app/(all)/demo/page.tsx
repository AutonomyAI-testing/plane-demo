import { useState } from "react";
import { observer } from "mobx-react";
// plane imports
import { Button } from "@plane/propel/button";
import { Input } from "@plane/propel/input";
// components
import { PageHead } from "@/components/core/page-title";

type FormData = {
  name: string;
  email: string;
};

function DemoPage() {
  // states
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // handlers
  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmittedData(formData);
      setIsLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "" });
    setSubmittedData(null);
  };

  return (
    <>
      <PageHead title="Demo Page" />
      <div className="flex h-full w-full items-center justify-center bg-surface-1">
        <div className="flex w-full max-w-md flex-col gap-6 rounded-lg border border-subtle bg-layer-1 p-8 shadow-raised-200">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-primary">Demo Page</h1>
            <p className="text-13 text-tertiary">
              This is a demonstration page showcasing the use of project components.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-13 font-medium text-primary">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange("name")}
                mode="primary"
                inputSize="sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-13 font-medium text-primary">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange("email")}
                mode="primary"
                inputSize="sm"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                size="base"
                loading={isLoading}
                disabled={!formData.name || !formData.email}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="base"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </form>

          {submittedData && (
            <div className="flex flex-col gap-2 rounded-md border border-subtle bg-surface-2 p-4">
              <h3 className="text-13 font-semibold text-primary">Submitted Data:</h3>
              <div className="flex flex-col gap-1 text-13 text-tertiary">
                <p>
                  <span className="font-medium">Name:</span> {submittedData.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {submittedData.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default observer(DemoPage);
