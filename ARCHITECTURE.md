# Architecture

```text
Ticket text → explainable keyword rules → category + priority
                                      ├── SLA deadline
                                      └── safe reply draft
```

The triage engine returns matched category terms and urgent signals, so an operator can understand every decision. This deterministic layer is suitable as a fallback around an LLM classifier and makes SLA behaviour testable.
