import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });
    return createdTransaction;
  }

  async findAll() {
    const transactions = this.prisma.transaction.findMany();
    return transactions;
  }

  async findOne(id: string) {
    const transaction = this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
    return transaction;
  }

  async update(
    id: string,
    { category, data, price, title, type }: UpdateTransactionDto,
  ) {
    const updatedTransaction = this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });
    return updatedTransaction;
  }

  async remove(id: string) {
    this.prisma.transaction.delete({
      where: {
        id,
      },
    });
    return;
  }
}
