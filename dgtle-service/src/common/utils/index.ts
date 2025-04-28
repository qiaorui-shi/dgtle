import { v4 as uuid4 } from 'uuid';
/**
 * @return {string} 生成的uuid
 * */
export function generateUUID() {
  // 生成的uuid类似550e8400-e29b-41d4-a716-446655440000
  const uuid = uuid4();
  return uuid.replaceAll('-', '');
}
