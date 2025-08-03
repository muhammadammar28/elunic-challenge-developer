import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserMessage } from '../apps/backend/src/entities/user-message.entity';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.APP_DB_HOST || 'localhost',
    port: parseInt(process.env.APP_DB_PORT || '3306'),
    username: process.env.APP_DB_USER || 'app',
    password: process.env.APP_DB_PASS || 'app',
    database: process.env.APP_DB_NAME || 'app',
    entities: [UserMessage],
    synchronize: false,
    logging: true,
  });

  await dataSource.initialize();

  const messageRepository = dataSource.getRepository(UserMessage);

  const testMessages = [
    { name: 'John Doe', email: 'john@example.com', message: 'This is test message 1. Testing pagination functionality.' },
    { name: 'Jane Smith', email: 'jane@example.com', message: 'This is test message 2. Great application!' },
    { name: 'Bob Johnson', email: 'bob@example.com', message: 'This is test message 3. Looking forward to more features.' },
    { name: 'Alice Brown', email: 'alice@example.com', message: 'This is test message 4. The UI looks amazing!' },
    { name: 'Charlie Davis', email: 'charlie@example.com', message: 'This is test message 5. Keep up the good work.' },
    { name: 'Eva Wilson', email: 'eva@example.com', message: 'This is test message 6. Very user-friendly interface.' },
    { name: 'Frank Miller', email: 'frank@example.com', message: 'This is test message 7. Pagination works perfectly!' },
    { name: 'Grace Lee', email: 'grace@example.com', message: 'This is test message 8. Love the design.' },
    { name: 'Henry Taylor', email: 'henry@example.com', message: 'This is test message 9. Excellent implementation.' },
    { name: 'Iris Martin', email: 'iris@example.com', message: 'This is test message 10. Everything works smoothly!' },
  ];

  for (const msg of testMessages) {
    const message = messageRepository.create(msg);
    await messageRepository.save(message);
  }

  console.log('Seeded 10 test messages successfully!');
  await dataSource.destroy();
}

seed().catch(console.error);
