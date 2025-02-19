import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
const UserPropertiesValues = {
  PHONE_LENGTH: 11,
  LENGTH_FOR_NAME: 2,
} as const;

export class User implements CreateUserDto {
  readonly id?: string;
  readonly name: string;
  readonly phone: string;
  readonly password: string;
  constructor(data: CreateUserDto) {
    this.id = `${data.id}`;
    this.name = this.nameValidator(data.name);
    this.phone = this.phoneValidator(data.phone);
    this.password = data.password;
  }

  private phoneValidator(phone = '') {
    if (this.removePhoneStr(phone).length !== UserPropertiesValues.PHONE_LENGTH)
      throw new BadRequestException('Telefone deve conter 11 digitos.', {
        description: 'Phone Invalid',
      });

    return phone;
  }

  private removePhoneStr(phone: string) {
    return phone.replace(/[^0-9]/g, '');
  }

  private nameValidator(name = '') {
    const trimmedName = this.removeUnwantedCharactersOfName(name.trim());
    const splitName = trimmedName.split(' ');

    if (splitName.length < 2)
      throw new BadRequestException('Envie nome e sobrenome.', {
        description: 'Name Invalid',
      });

    splitName.forEach((name) => {
      this.validatorShortName(name);
    });

    return trimmedName;
  }

  private validatorShortName(name: string) {
    if (name.length < UserPropertiesValues.LENGTH_FOR_NAME) {
      throw new BadRequestException(
        `Nome deve conter ao menos ${UserPropertiesValues.LENGTH_FOR_NAME} letras e não deve ser abreviado.`,
        { description: 'Name Invalid' },
      );
    }
  }

  private removeUnwantedCharactersOfName(fullname: string) {
    return fullname.replace(/[^a-zA-Z\sçãẽĩõũâêîôûéóáíú]/g, '');
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      password: this.password,
    };
  }
}
