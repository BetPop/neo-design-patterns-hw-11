# 🧩 Neo Design Patterns HW11

This project demonstrates the **Chain of Responsibility** and **Mediator** design patterns to process different types of structured records: `transaction`, `access_log`, and `system_error`. Each record type is validated and transformed through handler chains and ultimately written to separate output files.

## 📁 Project Structure

```
neo-design-patterns-hw-11/
├── data/                    # Input JSON data
│   └── records.json
├── output/                  # Generated output files
│   ├── transactions.csv
│   ├── access_logs.json
│   ├── system_errors.log
│   └── rejected.json
├── src/                     # TypeScript source code
│   ├── main.ts              # Entry point
│   ├── models/              # Data model interfaces
│   ├── chain/               # Handlers and chains
│   ├── mediator/            # Mediator and writers
│   └── utils/               # (Optional) helper functions
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Input Data

Place a valid `records.json` file inside the `data/` directory. Each object must have a `type` field:  
`"transaction"`, `"access_log"`, or `"system_error"`.

Example:

```json
[
  {
    "type": "transaction",
    "timestamp": "2025-08-01T12:00:00Z",
    "amount": "100.50",
    "currency": "usd"
  },
  {
    "type": "access_log",
    "timestamp": "2025-08-01T13:00:00Z",
    "userId": "user123",
    "ip": "192.168.0.1"
  }
]
```

### 3. Run the Program

```bash
npx ts-node src/main.ts
```

Or if using a script in `package.json`:

```bash
npm run start
```

## 🛠 Features

- ✅ **Chain of Responsibility**: Each record type goes through a dedicated handler chain for validation and transformation.
- ✅ **Mediator Pattern**: Centralizes output responsibilities.
- ✅ **Robust Error Handling**: Invalid records are collected in a `rejected.json` file.
- ✅ **File Output**:
  - `transactions.csv`
  - `access_logs.json`
  - `system_errors.log`
  - `rejected.json`

## 🧪 Development Tips

- Ensure paths like `"data/records.json"` or `"output/transactions.csv"` are **relative to the root**, since execution starts there.
- Use `ts-node` for quick development or compile using `tsc` if needed.

## 🧼 Cleanup

To clear generated files:

```bash
rm output/*
```

Or add a script in `package.json`:

```json
"scripts": {
  "clean": "rm -rf output/*"
}
```

## 📄 License

MIT (or add your own license here).
