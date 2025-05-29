import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/requests')
export class AppController {
  constructor(private readonly requestsService: AppService) { }

  @Post()
  create(@Body() body: { guestPhone: string; requestText: string }) {
    return this.requestsService.create(body);
  }

  @Get()
  getAllPending() {
    console.log(this.requestsService.getAllPending())
    return this.requestsService.getAllPending();
  }
}
