# Customer Badge Class

```mermaid
---
config:
  layout: elk
---
%%{ init: { 'flowchart': { 'curve': 'stepBefore' }, 'themeVariables': { 'curve': 'basis' } } }%%
classDiagram
  direction LR

  class CustomerBadge:::collection {
    +String name
    +String description
    +String experience_name
    +Date created_at
    +Date updated_at
    +Date deleted_at
  }

  CustomerBadge "*" --() "1" segmentation_customer_most_redeem-KeywordEligibility


  classDef collection fill:#fff,stroke:#000,color:#000;
  classDef subdocument fill:#00a666,stroke:#1d3d60,color:#fff;
  classDef takeout fill:#941919,stroke:#1d3d60,color:#fff;
  classDef untrack fill:#947b19,stroke:#1d3d60,color:#fff;
```
