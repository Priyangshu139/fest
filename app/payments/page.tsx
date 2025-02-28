'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    // Create UPI payment URL
    const upiUrl = `upi://pay?pa=6206070538@pthdfc&pn=Pratik_Kumar&am=${amount}&cu=INR`;
    setPaymentUrl(upiUrl);
  }, [amount]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Complete Your Payment
        </h1>

        <div className="text-center mb-6">
          <p className="text-gray-600 mb-2">Amount to Pay:</p>
          <p className="text-3xl font-bold text-green-600">₹{amount}</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
            <QRCodeSVG
              value={paymentUrl}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-gray-600 mb-2">
            Scan this QR code with any UPI app to pay
          </p>
          <p className="text-xs text-gray-500">
            Supported apps: Google Pay, PhonePe, Paytm, etc.
          </p>
        </div>

        <button
          onClick={() => router.push('/orders')}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Orders
        </button>
      </div>
    </div>
  );
}