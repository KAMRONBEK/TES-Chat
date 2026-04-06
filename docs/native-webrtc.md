# WebRTC and native builds

`react-native-webrtc` is included so you can add voice/video after wiring signaling over the MessagePack WebSocket.

## Why Expo Go is not enough

WebRTC requires native modules. Use **development builds** with **EAS Build** (see `eas.json` profile `development`).

## Suggested workflow

1. Install EAS CLI: `npm i -g eas-cli` and run `eas login`.
2. Run `eas build --profile development --platform ios` (or `android`).
3. Install the dev client on a device/simulator and run `npx expo start --dev-client`.

## Signaling

Use `src/shared/lib/webrtc/signaling.ts` as the bridge: exchange SDP/ICE over your `RealtimeWebSocket` envelopes, then attach streams inside a feature or process slice once `loadWebRTC()` returns the native module.
