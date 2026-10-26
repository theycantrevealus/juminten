# Bank Class

```mermaid
---
config:
  layout: elk
---
%%{ init: { 'flowchart': { 'curve': 'stepBefore' }, 'themeVariables': { 'curve': 'basis' } } }%%
classDiagram
  direction LR

  class Bank:::collection {
    +Number cpn_prg_id
    +String program_name
    +String bank
    +String ip_address
    +Account created_by
    +Date created_at
    +Date updated_at
    +Date deleted_at
  }

  Bank "0..1" --() "*" KeywordMobileBanking


  classDef collection fill:#fff,stroke:#000,color:#000;
  classDef subdocument fill:#00a666,stroke:#1d3d60,color:#fff;
  classDef takeout fill:#941919,stroke:#1d3d60,color:#fff;
  classDef untrack fill:#947b19,stroke:#1d3d60,color:#fff;
```
