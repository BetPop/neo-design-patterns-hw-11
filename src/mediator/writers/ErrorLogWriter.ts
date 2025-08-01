import { SystemErrorRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class ErrorLogWriter {
  private lines: string[] = [];

  write(record: SystemErrorRecord) {
    // Конвертуємо запис у JSON-рядок і додаємо до масиву
    this.lines.push(JSON.stringify(record));
  }

  async finalize() {
    // Записуємо всі рядки у файл errors.jsonl, кожен з нового рядка
    await fs.writeFile("output/errors.jsonl", this.lines.join("\n") + "\n", "utf-8");
  }
}
