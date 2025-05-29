import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Requests } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async create(data: { guestPhone: string; requestText: string }): Promise<Requests> {
    return this.prisma.requests.create({
      data: {
        guestPhone: data.guestPhone,
        requestText: data.requestText,
      },
    });
  }

  async getAllPending(): Promise<Requests[]> {
    return this.prisma.requests.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' },
    });
  }
}
