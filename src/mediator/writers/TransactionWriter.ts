import { TransactionRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class TransactionWriter {
  private lines: string[] = ["timestamp,amount,currency"];

  write(record: TransactionRecord) {
    // Формуємо CSV рядок
    const line = `${record.timestamp},${record.amount},${record.currency}`;
    this.lines.push(line);
  }

  async finalize() {
    await fs.writeFile("output/transactions.csv", this.lines.join("\n") + "\n", "utf-8");
  }
}
