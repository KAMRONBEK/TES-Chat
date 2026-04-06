# End-to-end encryption — threat model (draft)

This document is a starting point before implementing crypto. **Do not ship hand-rolled primitives.**

## Goals

- Server and intermediaries should not read message plaintext.
- Compromise of the server DB should not reveal historical plaintext without key material.
- Define a clear story for **multi-device**, **backup**, and **key loss**.

## Non-goals (initially)

- Hiding metadata (who talks to whom, timing) — often handled with separate transport/privacy layers.

## Implementation direction

- Use **audited** libraries (e.g. libsodium / Signal-style stacks via maintained bindings, `react-native-quick-crypto` for performance on native).
- Keep ciphertext shapes in `src/shared/lib/crypto` and domain-specific fields in `src/entities/message` without mixing ad-hoc crypto into UI.

## Next steps

1. Choose protocol: Double Ratchet / MLS / simpler per-chat keys for a prototype.
2. Key distribution: X3DH-like or server-assisted wrapping with client-held keys.
3. Threat review and test plan before enabling in production.
