import { decodeEnvelope, encodeEnvelope } from './msgpackCodec';
import type { RealtimeEnvelope } from './types';

async function toUint8Array(data: unknown): Promise<Uint8Array> {
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  if (data instanceof Uint8Array) {
    return data;
  }
  if (typeof Blob !== 'undefined' && data instanceof Blob) {
    const ab = await data.arrayBuffer();
    return new Uint8Array(ab);
  }
  throw new Error('Unsupported WebSocket message payload');
}

export type RealtimeHandlers = {
  onOpen?: () => void;
  onClose?: (ev: { code: number; reason: string }) => void;
  onError?: (err: unknown) => void;
  onEnvelope?: (env: RealtimeEnvelope) => void;
};

const defaultBackoff = (attempt: number) => Math.min(1000 * 2 ** attempt, 30_000);

export class RealtimeWebSocket {
  private ws: WebSocket | null = null;
  private closedByUser = false;
  private reconnectAttempt = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly url: string,
    private readonly handlers: RealtimeHandlers = {},
    private readonly backoffMs: (attempt: number) => number = defaultBackoff
  ) {}

  connect() {
    this.closedByUser = false;
    this.openSocket();
  }

  private openSocket() {
    if (this.closedByUser) return;
    try {
      this.ws = new WebSocket(this.url);
    } catch (e) {
      this.handlers.onError?.(e);
      this.scheduleReconnect();
      return;
    }
    this.ws.binaryType = 'arraybuffer';
    this.ws.onopen = () => {
      this.reconnectAttempt = 0;
      this.handlers.onOpen?.();
    };
    this.ws.onclose = (ev) => {
      this.handlers.onClose?.({ code: ev.code, reason: ev.reason });
      if (!this.closedByUser) {
        this.scheduleReconnect();
      }
    };
    this.ws.onerror = (ev) => {
      this.handlers.onError?.(ev);
    };
    this.ws.onmessage = async (ev) => {
      try {
        const buf = await toUint8Array(ev.data);
        const envelope = decodeEnvelope(buf);
        this.handlers.onEnvelope?.(envelope);
      } catch (err) {
        this.handlers.onError?.(err);
      }
    };
  }

  private scheduleReconnect() {
    if (this.closedByUser) return;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    const delay = this.backoffMs(this.reconnectAttempt++);
    this.reconnectTimer = setTimeout(() => this.openSocket(), delay);
  }

  send(envelope: RealtimeEnvelope) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }
    const bytes = encodeEnvelope(envelope);
    this.ws.send(bytes);
  }

  close() {
    this.closedByUser = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }
}
