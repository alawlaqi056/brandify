import { useState } from 'react';

interface OrderPayload {
  category: string;
  categoryAr?: string;
  productSelections: Record<string, any>;
  packagingSelections?: Record<string, any>;
  quantity: number;
  estimatedPrice: number;
  logoUrl?: string;
  referenceImageUrl?: string;
  aiRecommendation?: Record<string, any>;
}

export function useSubmitOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPayload, setOrderPayload] = useState<OrderPayload | null>(null);

  const submitOrder = (payload: OrderPayload) => {
    setOrderPayload(payload);
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    orderPayload,
    submitOrder,
  };
}
