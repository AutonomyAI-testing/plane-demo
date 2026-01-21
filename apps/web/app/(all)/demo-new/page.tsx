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

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function DemoNewPage() {
  const [formData, setFormData] = useState<TFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<TFormData>>({});
  const [submitCount, setSubmitCount] = useState(0);

  const handleInputChange = (field: keyof TFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: Partial<TFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number format";
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

    // Increment submit count and reset form
    setSubmitCount((prev) => prev + 1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setIsSubmitting(false);

    // eslint-disable-next-line no-console
    console.log("Form submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });
    setErrors({});
  };

  return (
    <AuthenticationWrapper pageType={EPageTypes.PUBLIC}>
      <div className="flex min-h-screen items-center justify-center bg-surface-1 p-4">
        <div className="w-full max-w-3xl space-y-6">
          {/* Header Card */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
            <div className="space-y-2">
              <h1 className="text-20 font-semibold text-primary">Welcome to New Demo Page</h1>
              <p className="text-13 text-tertiary">
                This is a demonstration page showcasing form components from the propel design system. Fill out the form
                below to see validation and submission in action.
              </p>
              {submitCount > 0 && (
                <div className="mt-4 rounded-md bg-layer-1 p-3 text-13 text-primary">
                  <span className="font-medium">Success!</span> Form has been submitted {submitCount}{" "}
                  {submitCount === 1 ? "time" : "times"}.
                </div>
              )}
            </div>
          </Card>

          {/* Form Card */}
          <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-13 font-medium text-primary">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    hasError={!!errors.firstName}
                    placeholder="Enter your first name"
                    inputSize="md"
                    mode="primary"
                    autoComplete="given-name"
                  />
                  {errors.firstName && <p className="text-13 text-danger-primary">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-13 font-medium text-primary">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    hasError={!!errors.lastName}
                    placeholder="Enter your last name"
                    inputSize="md"
                    mode="primary"
                    autoComplete="family-name"
                  />
                  {errors.lastName && <p className="text-13 text-danger-primary">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-13 font-medium text-primary">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  hasError={!!errors.email}
                  placeholder="your.email@example.com"
                  inputSize="md"
                  mode="primary"
                  autoComplete="email"
                />
                {errors.email && <p className="text-13 text-danger-primary">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-13 font-medium text-primary">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  hasError={!!errors.phone}
                  placeholder="+1 (555) 123-4567"
                  inputSize="md"
                  mode="primary"
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-13 text-danger-primary">{errors.phone}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button type="submit" variant="primary" size="base" loading={isSubmitting} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </Button>
                <Button type="button" variant="secondary" size="base" onClick={handleReset} disabled={isSubmitting}>
                  Reset Form
                </Button>
              </div>
            </form>
          </Card>

          {/* Info Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <div className="space-y-2">
                <h3 className="text-13 font-medium text-primary">Form Validation</h3>
                <p className="text-13 text-tertiary">All fields are required and include format validation.</p>
              </div>
            </Card>

            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <div className="space-y-2">
                <h3 className="text-13 font-medium text-primary">Loading States</h3>
                <p className="text-13 text-tertiary">Submit button shows loading indicator during submission.</p>
              </div>
            </Card>

            <Card variant={ECardVariant.WITH_SHADOW} spacing={ECardSpacing.LG}>
              <div className="space-y-2">
                <h3 className="text-13 font-medium text-primary">Error Feedback</h3>
                <p className="text-13 text-tertiary">Inline error messages appear below invalid fields.</p>
              </div>
            </Card>
          </div>

          {/* Additional Info Card */}
          <Card variant={ECardVariant.WITHOUT_SHADOW} spacing={ECardSpacing.LG}>
            <div className="space-y-2">
              <h3 className="text-13 font-medium text-primary">Component Architecture</h3>
              <p className="text-13 text-tertiary">
                This page demonstrates the usage of propel design system components including Button, Card, and Input.
                All components follow the project's coding standards with Tailwind CSS utilities and proper TypeScript
                typing.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AuthenticationWrapper>
  );
}

export default DemoNewPage;
