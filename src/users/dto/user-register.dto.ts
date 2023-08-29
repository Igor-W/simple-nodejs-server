import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Is not correct email' })
	email: string;

	@IsString({ message: 'Password is not defined' })
	password: string;

	@IsString({ message: 'Name is not defined' })
	name: string;
}
