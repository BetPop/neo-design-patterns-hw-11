// mediator/ProcessingMediator.ts
import { AccessLogWriter } from "./writers/AccessLogWriter";
import { TransactionWriter } from "./writers/TransactionWriter";
import { ErrorLogWriter } from "./writers/ErrorLogWriter";
import { RejectedWriter } from "./writers/RejectedWriter";
import { DataRecord } from "../models/DataRecord";

export class ProcessingMediator {
  private accessLogWriter = new AccessLogWriter();
  private transactionWriter = new TransactionWriter();
  private errorWriter = new ErrorLogWriter();
  private rejectedWriter = new RejectedWriter();

  onSuccess(record: DataRecord) {
    switch (record.type) {
      case "access_log":
        this.accessLogWriter.write(record);
        break;
      case "transaction":
        this.transactionWriter.write(record);
        break;
      case "system_error":
        this.errorWriter.write(record);
        break;
    }
  }

  onRejected(record: DataRecord, error: string) {
    this.rejectedWriter.write(record, error);
  }

  async finalize() {
    await Promise.all([
      this.accessLogWriter.finalize(),
      this.transactionWriter.finalize(),
      this.errorWriter.finalize(),
      this.rejectedWriter.finalize(),
    ]);
  }
}
