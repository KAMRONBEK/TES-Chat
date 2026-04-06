import { decode, encode } from '@msgpack/msgpack';

import type { RealtimeEnvelope } from './types';

export function encodeEnvelope(envelope: RealtimeEnvelope): Uint8Array {
  return encode(envelope) as Uint8Array;
}

export function decodeEnvelope(data: ArrayBuffer | Uint8Array): RealtimeEnvelope {
  const value = decode(data) as RealtimeEnvelope;
  if (typeof value !== 'object' || value === null || (value as RealtimeEnvelope).v !== 1) {
    throw new Error('Invalid realtime envelope');
  }
  return value;
}
