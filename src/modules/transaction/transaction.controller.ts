import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const transaction = await this.transactionService.findOne(id);
    return transaction;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const updatedTransaction = await this.transactionService.update(
      id,
      updateTransactionDto,
    );
    return updatedTransaction;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.transactionService.remove(id);
  }
}
