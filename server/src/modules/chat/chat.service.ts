import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

@Injectable()
export class ChatService {
  startSocket() {
    const io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >({
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    io.on('connection', (socket) => {
      console.log(`${socket.id} user just connected!`);
      socket.on('disconnect', () => {
        console.log('A user disconnect');
      });
    });
  }
}
