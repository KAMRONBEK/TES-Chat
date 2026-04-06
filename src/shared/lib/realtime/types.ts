/**
 * Versioned binary envelope for WebSocket frames (MessagePack body).
 */
export type RealtimeEnvelopeV1 = {
  v: 1;
  type: string;
  id: string;
  payload: unknown;
};

export type RealtimeEnvelope = RealtimeEnvelopeV1;
