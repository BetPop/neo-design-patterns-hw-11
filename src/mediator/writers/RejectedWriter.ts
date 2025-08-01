import { DataRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class RejectedWriter {
  private lines: string[] = [];

  write(record: DataRecord, error: string) {
    const rejectedEntry = {
      record,
      error,
    };
    this.lines.push(JSON.stringify(rejectedEntry));
  }

  async finalize() {
    await fs.writeFile("output/rejected.jsonl", this.lines.join("\n") + "\n", "utf-8");
  }
}
