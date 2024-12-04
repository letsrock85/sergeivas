import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Highlight&Play',
  description: 'Privacy Policy for the Highlight&Play Chrome Extension',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy for Highlight&Play Chrome Extension</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Last Updated: December 4, 2023</h2>
              <p className="mb-4">
                This Privacy Policy describes how Highlight&Play (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) handles information when you use our Chrome Extension.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Information Collection</h2>
              <p className="mb-4">
                Highlight&Play is designed with privacy in mind and collects minimal data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We only process the text you actively highlight on web pages to search for album names.</li>
                <li>This processing happens locally in your browser.</li>
                <li>We do not store or retain any highlighted text.</li>
                <li>We do not collect any personal information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Usage</h2>
              <p className="mb-4">
                When you highlight text, our extension:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sends the highlighted text to the Deezer API to search for matching albums.</li>
                <li>Displays preview results directly in your browser.</li>
                <li>Does not store search history or queries.</li>
                <li>Does not track your browsing activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Third-Party Services</h2>
              <p className="mb-4">
                We only interact with the Deezer API to provide music preview functionality. When using our extension:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your highlighted text is sent to Deezer&apos;s search API.</li>
                <li>Audio previews are streamed directly from Deezer.</li>
                <li>Please refer to <a href="https://www.deezer.com/legal/privacy" className="text-blue-600 hover:underline">Deezer&apos;s Privacy Policy</a> for information about their data practices.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Storage</h2>
              <p className="mb-4">
                Highlight&Play does not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Store any user data locally or remotely.</li>
                <li>Use cookies or similar tracking technologies.</li>
                <li>Create user profiles or analytics.</li>
                <li>Share any information with third parties beyond the necessary Deezer API interactions.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the &quot;Last Updated&quot; date at the top of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
                <a href="mailto:me@sergeivas.com" className="text-blue-600 hover:underline ml-1">me@sergeivas.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
} 