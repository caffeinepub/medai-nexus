import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14 fade-up">
          <span className="section-badge">📬 Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We&apos;d Love to Hear From You
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have questions about our courses or want to partner with us? Drop us
            a message and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Form */}
          <div className="slide-left">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full py-16 text-center"
                data-ocid="contact.success_state"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500">
                  Thank you for reaching out. We&apos;ll respond within 24
                  hours.
                </p>
                <Button
                  className="mt-6 rounded-full bg-edu-blue hover:bg-edu-blue-hover text-white px-6"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  data-ocid="contact.secondary_button"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#EAF4FF] rounded-2xl p-8 shadow-card"
                data-ocid="contact.panel"
              >
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-gray-700 mb-1.5 block"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                      className="rounded-xl border-gray-200 bg-white focus:border-edu-blue focus:ring-edu-blue"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-gray-700 mb-1.5 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                      className="rounded-xl border-gray-200 bg-white focus:border-edu-blue focus:ring-edu-blue"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-semibold text-gray-700 mb-1.5 block"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      required
                      rows={5}
                      className="rounded-xl border-gray-200 bg-white focus:border-edu-blue focus:ring-edu-blue resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-edu-blue hover:bg-edu-blue-hover text-white font-semibold py-2.5"
                    data-ocid="contact.submit_button"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Contact info */}
          <div className="slide-right flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Contact Information
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our support team is available Monday through Friday, 9am–6pm
                EST. We typically respond within a few hours.
              </p>
            </div>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "hello@edusmart.io",
                color: "text-edu-blue bg-blue-50",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+1 (800) 555-EDU1",
                color: "text-purple-600 bg-purple-50",
              },
              {
                icon: MapPin,
                label: "Office",
                value: "123 Learning Blvd, San Francisco, CA 94102",
                color: "text-pink-600 bg-pink-50",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}
                >
                  <item.icon size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}

            {/* Map card */}
            <div className="mt-2 rounded-2xl overflow-hidden bg-[#EAF4FF] h-48 flex items-center justify-center shadow-card">
              <div className="text-center text-gray-400">
                <MapPin
                  size={40}
                  className="mx-auto mb-2 text-edu-blue opacity-50"
                />
                <p className="text-sm font-medium text-gray-500">
                  San Francisco, CA
                </p>
                <p className="text-xs text-gray-400">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
