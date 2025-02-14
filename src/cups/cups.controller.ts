import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CupsService } from './cups.service';
import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';
import { Cup } from './dto/entities/cup';

@Controller('cups')
export class CupsController {
  constructor(private readonly cupsService: CupsService) {}

  @Post()
  create(@Body() { size, id }: CreateCupDto) {
    const cup = new Cup({ size, id });
    return this.cupsService.create(cup.toJSON());
  }

  @Get()
  findAll() {
    return this.cupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCupDto: UpdateCupDto) {
    return this.cupsService.update(id, updateCupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cupsService.remove(id);
  }
}
