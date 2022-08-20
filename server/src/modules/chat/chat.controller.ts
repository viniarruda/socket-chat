import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service'

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  startSocket(): void {
    return this.chatService.startSocket();
  }
}
