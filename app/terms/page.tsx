import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — bokusai',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black pt-16">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-red-500 text-xs tracking-widest uppercase mb-4">Legal</p>
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-white/30 text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/50 leading-relaxed">
          {[
            {
              title: '1. Acceptance of Terms',
              body: 'By accessing or purchasing from bokusai, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
            },
            {
              title: '2. Digital Products',
              body: 'All products sold on bokusai are digital files delivered electronically. By completing a purchase, you acknowledge that the product is digital and will be delivered immediately upon payment confirmation.',
            },
            {
              title: '3. License',
              body: 'Upon purchase, you are granted a non-exclusive, non-transferable license to use the asset in accordance with our License terms. You may not resell, redistribute, or sublicense the raw asset files.',
            },
            {
              title: '4. Refund Policy',
              body: 'Due to the digital nature of our products, all sales are final. We do not offer refunds once a download has been delivered. If you experience a technical issue, please contact us and we will work to resolve it.',
            },
            {
              title: '5. Intellectual Property',
              body: 'All assets on bokusai are owned by bokusai or its licensors. Your purchase grants you a usage license only — it does not transfer ownership or intellectual property rights.',
            },
            {
              title: '6. Prohibited Uses',
              body: 'You may not use bokusai assets in illegal content, hate speech, or material that violates applicable laws. Violations may result in termination of your license without refund.',
            },
            {
              title: '7. Limitation of Liability',
              body: 'bokusai is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products. Our total liability shall not exceed the amount paid for the relevant asset.',
            },
            {
              title: '8. Changes to Terms',
              body: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.',
            },
            {
              title: '9. Contact',
              body: 'For questions about these terms, contact us at contact@bokusai.com.',
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
