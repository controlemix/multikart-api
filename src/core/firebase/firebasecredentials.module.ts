import { Module } from '@nestjs/common';
import { FirebaseCredentials } from './dto/firebasecredentials.dto';

@Module({
  imports: [],  
  providers: [FirebaseCredentials]
})
export class FirebaseCredentialsModule {}


