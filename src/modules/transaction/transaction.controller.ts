import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Response } from 'express';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const createdTransaction =
      await this.transactionService.create(createTransactionDto);
    return createdTransaction;
  }

  @Get()
  async findAll() {
    const transactions = await this.transactionService.findAll();
    return transactions;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const transaction = await this.transactionService.findOne(id);
    return transaction;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const updatedTransaction = this.transactionService.update(
      id,
      updateTransactionDto,
    );
    return updatedTransaction;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.transactionService.remove(id);
  }
}
