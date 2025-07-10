import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { TransactionType } from '@prisma/client';

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

async findAll(skip?: number, take?: number) {
    const transactions = await this.prisma.transaction.findMany({
      skip: skip,
      take: take,
    });
    return transactions;
  }

  async getOverallTotals() {
    const totalIncomeResult = await this.prisma.transaction.aggregate({
      _sum: {
        price: true,
      },
      where: {
        type: TransactionType.INCOME,
      },
    });

    const totalOutcomeResult = await this.prisma.transaction.aggregate({
      _sum: {
        price: true,
      },
      where: {
        type: TransactionType.OUTCOME,
      },
    });

    const totalIncome = totalIncomeResult._sum.price || 0;
    const totalOutcome = totalOutcomeResult._sum.price || 0;
    const total = totalIncome - totalOutcome;

    return {
      totalIncome,
      totalOutcome,
      total,
    };
  }

  async findOne(id: string) {
    const foundTransaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return foundTransaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
    return updatedTransaction;
  }

  async remove(id: string) {
    const foundTransaction = await this.findOne(id);

    if (!foundTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
