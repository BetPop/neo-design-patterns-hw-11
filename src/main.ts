import * as fs from "fs/promises";
import { DataRecord } from "./models/DataRecord";
import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";

const handlerMap = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  // Зчитування вхідних даних
  const raw = await fs.readFile("src/data/records.json", "utf-8");

  const records: DataRecord[] = JSON.parse(raw);

  // Створення посередника
  const mediator = new ProcessingMediator();

  let success = 0;
  let failed = 0;

  for (const record of records) {
    const builder = handlerMap[record.type];
    if (!builder) {
      mediator.onRejected(record, "Unknown record type");
      failed++;
      continue;
    }

    // Створюємо ланцюг обробників
    const handler = builder();

    try {
      // Обробляємо запис
      const result = handler.handle(record);

      // Передаємо результат посереднику
      mediator.onSuccess(result);
      success++;
    } catch (e: any) {
      // В разі помилки — реєструємо відхилений запис
      mediator.onRejected(record, e.message);
      failed++;
    }
  }

  // Записуємо всі накопичені результати у файли
  await mediator.finalize();

  // Вивід звіту
  console.log(`[INFO] Завантажено записів: ${records.length}`);
  console.log(`[INFO] Успішно оброблено: ${success}`);
  console.log(`[WARN] Відхилено з помилками: ${failed}`);
  console.log(`[INFO] Звіт збережено у директорії output/`);
}

main();
