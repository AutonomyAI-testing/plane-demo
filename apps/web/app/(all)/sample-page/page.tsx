import { useState } from "react";
import { observer } from "mobx-react";
// plane imports
import { useTranslation } from "@plane/i18n";
import { Button } from "@plane/propel/button";
import { Card, ECardVariant, ECardSpacing } from "@plane/propel/card";
import { Input } from "@plane/propel/input";
// components
import { PageHead } from "@/components/core/page-title";
// wrappers
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

const SamplePage = observer(function SamplePage() {
  const { t } = useTranslation();
  // local state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <AuthenticationWrapper>
      <PageHead title={t("Sample Page")} />
      <div className="h-full w-full overflow-y-auto bg-surface-1">
        <div className="mx-auto max-w-4xl p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-28 font-semibold text-primary mb-2">Sample Page</h1>
            <p className="text-16 text-tertiary">
              This is a demonstration page showcasing the use of Plane&apos;s Propel components.
            </p>
          </div>

          {/* Main Content Card */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG} className="mb-6">
            <h2 className="text-20 font-semibold text-primary mb-6">Contact Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-14 font-medium text-secondary mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  mode="primary"
                  inputSize="md"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-14 font-medium text-secondary mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  mode="primary"
                  inputSize="md"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="your.email@example.com"
                  className="w-full"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-14 font-medium text-secondary mb-2">
                  Message
                </label>
                <Input
                  id="message"
                  name="message"
                  type="text"
                  mode="primary"
                  inputSize="md"
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  placeholder="Enter your message"
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" size="lg" loading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </Button>
                <Button type="button" variant="secondary" size="lg" onClick={handleReset} disabled={isSubmitting}>
                  Reset
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.SM}>
              <h3 className="text-16 font-semibold text-primary mb-2">Feature One</h3>
              <p className="text-13 text-tertiary">
                This card demonstrates the card component with shadow variant and medium spacing.
              </p>
            </Card>

            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.SM}>
              <h3 className="text-16 font-semibold text-primary mb-2">Feature Two</h3>
              <p className="text-13 text-tertiary">
                Cards can be used to group related content and maintain visual hierarchy.
              </p>
            </Card>

            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.SM}>
              <h3 className="text-16 font-semibold text-primary mb-2">Feature Three</h3>
              <p className="text-13 text-tertiary">All components follow the project&apos;s design system and styling conventions.</p>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticationWrapper>
  );
});

export default SamplePage;
