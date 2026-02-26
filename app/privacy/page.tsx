import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — bokusai',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">Legal</p>
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-white/30 text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="space-y-8 text-white/50 text-sm leading-relaxed">
          {[
            {
              title: '1. Information We Collect',
              body: 'When you make a purchase, we collect your email address and payment information. Payment details are processed directly by Stripe and are never stored on our servers. We do not collect credit card numbers or banking information.',
            },
            {
              title: '2. How We Use Your Information',
              body: 'We use your email address solely to deliver your purchase confirmation and download link. We do not send marketing emails unless you have explicitly opted in.',
            },
            {
              title: '3. Third-Party Services',
              body: 'We use Stripe for payment processing. Stripe\'s privacy policy governs how your payment information is handled. We may also use analytics tools to understand site usage in aggregate — no personally identifiable information is shared.',
            },
            {
              title: '4. Data Retention',
              body: 'We retain purchase records (email, asset purchased, date) for accounting and support purposes. We do not retain payment details.',
            },
            {
              title: '5. Cookies',
              body: 'Our website may use essential cookies for functionality. We do not use tracking or advertising cookies.',
            },
            {
              title: '6. Your Rights',
              body: 'You have the right to request access to, correction of, or deletion of your personal data. Contact us at contact@bokusai.com to exercise these rights.',
            },
            {
              title: '7. Security',
              body: 'We take reasonable measures to protect your information. All transactions are encrypted via HTTPS and processed through Stripe\'s secure infrastructure.',
            },
            {
              title: '8. Changes',
              body: 'We may update this policy from time to time. The date at the top of this page reflects when it was last revised.',
            },
            {
              title: '9. Contact',
              body: 'For privacy-related questions, contact us at contact@bokusai.com.',
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-white/80 font-semibold text-base mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
