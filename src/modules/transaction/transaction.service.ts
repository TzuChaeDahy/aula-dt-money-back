import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title: payload.title,
        category: payload.category,
        data: payload.data,
        price: payload.price,
        type: payload.type,
      },
    });
    return createdTransaction;
  }

  async findAll() {
    const transactions = await this.prisma.transaction.findMany();
    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    return transaction;
  }

  async update(id: string, payload: UpdateTransactionDto) {
    try {
      const updatedTransaction = await this.prisma.transaction.update({
        where: {
          id,
        },
        data: {
          title: payload.title,
          category: payload.category,
          data: payload.data,
          price: payload.price,
          type: payload.type,
        },
      });
      return updatedTransaction;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Transaction with ID "${id}" not found.`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.transaction.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Transaction with ID "${id}" not found.`);
      }
      throw error;
    }
  }
}
