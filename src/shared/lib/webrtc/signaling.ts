import { Platform } from 'react-native';

export type SignalingMessage = {
  type: 'offer' | 'answer' | 'candidate';
  sdp?: string;
  candidate?: string;
};

/**
 * Placeholder for signaling over your MessagePack WebSocket.
 * Wire RTCPeerConnection with react-native-webrtc in a dev build (see docs/native-webrtc.md).
 */
export function createSignalingSender(_send: (msg: SignalingMessage) => void) {
  return {
    sendOffer: (_sdp: string) => {
      if (Platform.OS === 'web') return;
      // Integrate with RTCPeerConnection + localDescription
    },
  };
}

export function loadWebRTC(): typeof import('react-native-webrtc') | null {
  if (Platform.OS === 'web') {
    return null;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('react-native-webrtc') as typeof import('react-native-webrtc');
  } catch {
    return null;
  }
}
