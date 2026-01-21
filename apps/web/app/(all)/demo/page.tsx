import { useState } from "react";
// plane imports
import { Button } from "@plane/propel/button";
import { Card } from "@plane/propel/card";
import { Input } from "@plane/propel/input";
import { ECardSpacing, ECardVariant } from "@plane/propel/card";
// helpers
import { EPageTypes } from "@/helpers/authentication.helper";
// wrappers
import { AuthenticationWrapper } from "@/lib/wrappers/authentication-wrapper";

type FormData = {
  name: string;
  email: string;
  message: string;
};

function DemoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setIsSubmitting(false);

    // eslint-disable-next-line no-console
    console.log("Form submitted:", formData);
  };

  return (
    <AuthenticationWrapper pageType={EPageTypes.PUBLIC}>
      <div className="flex min-h-screen items-center justify-center bg-surface-1 p-4">
        <div className="w-full max-w-2xl">
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG} className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-20 font-semibold text-primary">Demo Page</h1>
              <p className="text-13 text-tertiary">
                This is a demo page showcasing the basic UI components from the propel package.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-13 font-medium text-primary">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  hasError={!!errors.name}
                  placeholder="Enter your name"
                  inputSize="md"
                  mode="primary"
                />
                {errors.name && <p className="text-13 text-danger-primary">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-13 font-medium text-primary">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  hasError={!!errors.email}
                  placeholder="Enter your email"
                  inputSize="md"
                  mode="primary"
                />
                {errors.email && <p className="text-13 text-danger-primary">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-13 font-medium text-primary">
                  Message
                </label>
                <Input
                  id="message"
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  hasError={!!errors.message}
                  placeholder="Enter your message"
                  inputSize="md"
                  mode="primary"
                />
                {errors.message && <p className="text-13 text-danger-primary">{errors.message}</p>}
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" size="base" loading={isSubmitting} disabled={isSubmitting}>
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="base"
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      message: "",
                    });
                    setErrors({});
                  }}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <h3 className="text-13 font-medium text-primary">Card with Shadow</h3>
              <p className="mt-2 text-13 text-tertiary">This card uses the shadow variant.</p>
            </Card>

            <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
              <h3 className="text-13 font-medium text-primary">Flat Card</h3>
              <p className="mt-2 text-13 text-tertiary">This card uses the flat variant.</p>
            </Card>

            <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
              <h3 className="text-13 font-medium text-primary">Outlined Card</h3>
              <p className="mt-2 text-13 text-tertiary">This card uses the outlined variant.</p>
            </Card>
          </div>
        </div>
      </div>
    </AuthenticationWrapper>
  );
}

export default DemoPage;
