import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
