/**
 * Placeholder types for a future E2E layer (Signal-style ratchet, etc.).
 * Implement using audited primitives (e.g. react-native-quick-crypto), not ad-hoc crypto.
 */
export type EncryptedPayload = {
  ciphertext: Uint8Array;
  nonce: Uint8Array;
};

export type DeviceKeyPublic = Uint8Array;
