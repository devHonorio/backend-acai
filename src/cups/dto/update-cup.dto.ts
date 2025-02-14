import { PartialType } from '@nestjs/mapped-types';
import { CreateCupDto } from './create-cup.dto';

export class UpdateCupDto extends PartialType(CreateCupDto) {}
