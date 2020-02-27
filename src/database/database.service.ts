// primero importamos el modulo de typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { Configuration } from '../config/config.keys';

// exportamos una constante con los tipos de conexión, esta para que nuestra app esté
// preparada para cualquier conexión de base de datos
export const databaseProviders = [
    // preparamos un objeto de conexión para postgres
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.HOST),
                port: 5444,
                database: config.get(Configuration.DATABASE),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            } as ConnectionOptions;
        }
    }),
];