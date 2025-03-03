/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function Payment() {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": "bf8d54b7-9f1d-4209-b723-9a59a0c1c54b",
      },
      body: JSON.stringify({
        amount: 1.24,
        currency: "EUR",
        returnUrl: "https://gdocx.vercel.app",
        paymentId: "119318-123-test-2",
        webhookUrl: "https://gdocx.vercel.app/api/webhook",
        description: "Order 1234-DS-1",
        customerId: "CID-012456789-2",
        email: "jhone@gmail.com",
        ipAddress: "117.208.167.10",
      }),
    };

    try {
      const response = await fetch("https://api.stage.noda.live/api/payments", options);
      const data = await response.json();
      console.log(data)
      if (data.url) {
        setPaymentUrl(data.url);
      } else {
        throw new Error("Payment URL not found");
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Noda Checkout Payment</h1>
      <button
        onClick={handlePayment}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Start Payment"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {paymentUrl && (
        <div className="mt-4">
          <p className="text-green-600">Payment URL:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {paymentUrl}
          </a>
        </div>
      )}
    </div>
  );
}
