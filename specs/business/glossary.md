# Business Glossary

## 1. Purpose

This document defines the business terminology used throughout the
Loyalty System.

All business requirements, workflows, technical specifications, and
implementation decisions should use these terms consistently.

When implementing a feature, the AI agent must refer to this glossary
to understand the intended meaning of business terms.

If a term is ambiguous or its definition conflicts with an existing
business requirement, ask for clarification before making assumptions.

---

## 2. General Loyalty Terms

### Loyalty Program

A business program that rewards customers for qualifying activities,
purchases, or other business-defined actions.

### Customer

An individual or entity participating in a loyalty program.

A customer may have a loyalty account containing points, membership
information, and redemption history.

### Loyalty Account

The account associated with a customer that stores or references
their loyalty-related information, such as point balances and account
status.

### Loyalty Point

A unit of value awarded to a customer according to the rules of a
loyalty program.

Points may be earned, redeemed, adjusted, or expired according to
business rules.

### Point Balance

The amount of loyalty points currently available to a customer for
eligible activities.

The system must distinguish between the available balance and any
other balance categories if the business introduces concepts such as
reserved or pending points.

### Reward

A benefit that a customer can receive through the loyalty program.

Examples include vouchers, products, services, discounts, or other
business-defined benefits.

### Redemption

The business process through which a customer exchanges loyalty
points for a reward or another eligible benefit.

A redemption may involve several processing steps, including
eligibility validation, point deduction, and reward fulfillment.

### Redemption Request

A request to redeem a reward using a customer's loyalty account.

A redemption request contains the information required to identify
the customer, requested reward, point cost, and relevant business
context.

The exact request fields are defined in the applicable technical
contract.

---

## 3. Redemption Processing Terms

### Redemption ID

A unique identifier assigned to a redemption operation.

It is used to correlate processing steps, logs, messages, and
related records across services.

### Redemption Status

The current business state of a redemption operation.

Possible statuses must be defined by the approved redemption
workflow and transaction-state specification.

Do not introduce new statuses without reviewing the relevant
business requirements.

### Eligibility Check

The process of determining whether a redemption request satisfies
the applicable business rules.

Examples of eligibility criteria may include:

- Customer account status
- Available point balance
- Reward availability
- Reward-specific restrictions
- Redemption limits
- Campaign validity

The actual criteria depend on the applicable business requirements.

### Eligible Redemption

A redemption request that has passed all required eligibility checks.

Eligibility approval does not necessarily mean that the redemption
has completed successfully.

### Point Deduction

The operation that subtracts the required number of loyalty points
from a customer's account.

Point deduction must only proceed after the required eligibility
checks have passed.

The implementation must follow the approved consistency and
idempotency requirements.

### Bonus Fulfillment

The process of delivering or activating the benefit associated
with a successful redemption.

Depending on the reward type, fulfillment may involve an external
system, an internal service, or another business process.

Successful point deduction does not automatically guarantee
successful bonus fulfillment.

### Fulfillment Failure

A condition in which the system cannot complete the required
reward fulfillment.

The expected recovery behavior, including retries, compensation,
or manual intervention, must be defined by the approved business
rules.

### Compensation

A corrective business operation performed to address a previously
completed operation that cannot be finalized as intended.

For example, a business-approved process might restore points
after a fulfillment failure.

Compensation must not be assumed to be automatic. Its eligibility,
conditions, and execution rules require explicit business approval.

---

## 4. Transaction Terms

### Business Transaction

A business operation that represents a meaningful unit of work,
such as a redemption.

A business transaction may involve multiple services and
asynchronous processing steps.

### Transaction Record

A persistent record used to track a business operation and its
relevant state, history, or outcome.

The exact responsibilities and schema of transaction records are
defined in the architecture and data specifications.

### Transaction Status

The recorded state of a business transaction.

Transaction status and redemption status must not be treated as
interchangeable unless the approved domain model explicitly
defines them as the same concept.

### Idempotency

A property that ensures repeating the same logical operation does
not produce unintended duplicate business effects.

For example, processing the same redemption message more than
once must not deduct the same points multiple times.

### Duplicate Request

A request that represents the same logical business operation as
a request already received or processed.

The system must distinguish a legitimate retry from a new
redemption request.

### Retry

An attempt to process an operation again after a temporary or
recoverable failure.

Retries must follow the approved retry policy and must not bypass
business validation or create duplicate effects.

### Reconciliation

A process that compares records across relevant systems to
identify and resolve inconsistencies.

Examples include comparing redemption records, point deductions,
and fulfillment outcomes.

---

## 5. Service and Messaging Terms

### Redemption Gateway

The entry point that receives redemption requests and initiates
the redemption workflow.

Its exact responsibilities, validation boundaries, and response
behavior are defined in the architecture specification.

### Eligibility Service

The service responsible for evaluating redemption eligibility
according to the applicable business rules.

### Point Deduction Service

The service responsible for executing point deduction according
to the approved point-accounting rules.

### Bonus Fulfillment Service

The service responsible for fulfilling the reward associated
with an eligible redemption.

### Notification Service

The service responsible for coordinating or sending customer
notifications related to redemption events.

Notifications communicate business outcomes but must not be
treated as the authoritative source of transaction state.

### Reporting Service

The service responsible for providing reporting data and
business insights.

Reporting responsibilities must be separated from operations
that authoritatively modify redemption or point-accounting state.

### Message Broker

Infrastructure that transports messages between producers
and consumers.

The current implementation uses Apache Kafka for asynchronous
communication between processing components.

### Producer

A component that publishes a message to a message broker.

### Consumer

A component that receives and processes messages from a message
broker.

### Topic

A named stream of messages in Kafka.

Examples in the current workflow include:

- redeem
- eligibility
- deduct
- bonus
- notification

These names describe the currently discussed workflow and should
be verified against the actual implementation.

### Correlation ID

An identifier used to associate related operations or messages
belonging to the same broader business workflow.

### Message ID

A unique identifier for an individual message.

A message ID and a redemption ID serve different purposes:
one identifies a message, while the other identifies a business
operation.

### Dead-Letter Queue (DLQ)

A designated destination for messages that cannot be processed
under the configured retry and failure-handling policy.

The exact retry limits, routing rules, and recovery procedures
must be defined in the messaging specification.

---

## 6. Business Rules and Constraints

### Business Rule

A requirement that defines how the loyalty system must behave
from a business perspective.

Business rules are documented in:

- `specs/business/business-rules.md`
- Relevant workflow specifications under `specs/business/flows/`

### Processing Order

The required order in which business operations must occur.

For the redemption workflow, the minimum established constraints
are:

1. Eligibility must pass before point deduction begins.
2. Point deduction must succeed before bonus fulfillment begins.

Additional ordering requirements must be documented in the
approved workflow specification.

### Successful Redemption

A redemption that satisfies the approved definition of business
success.

The exact conditions for success, including the required
fulfillment outcome, must be explicitly defined in the redemption
workflow.

### Failed Redemption

A redemption that cannot reach the approved successful outcome.

Failure handling must follow the relevant workflow and
compensation specifications.

---

## 7. Terminology Rules for Development

When implementing or reviewing the system:

1. Use the terms in this glossary consistently.
2. Prefer established domain terms over ambiguous names.
3. Do not use "transaction", "redemption", and "request" as
   interchangeable terms.
4. Do not assume eligibility approval means redemption success.
5. Do not assume point deduction means bonus fulfillment succeeded.
6. Do not assume a retry is safe unless idempotency is addressed.
7. Do not assume a failed fulfillment automatically restores points.
8. Do not introduce new business statuses or transitions without
   updating the relevant specifications.
9. If the glossary conflicts with an approved workflow, flag the
   conflict instead of silently choosing one interpretation.
10. When a new business term is introduced, update this glossary
    as part of the requirements change.

---

## 8. Open Questions

The following definitions require confirmation from the business
owner or project architect.

- What exactly constitutes a successful redemption?
- Which redemption statuses are required?
- Are redemption status and transaction status separate concepts?
- What should happen if point deduction succeeds but bonus
  fulfillment permanently fails?
- Can a customer cancel a redemption after point deduction?
- Are points restored automatically under any failure conditions?
- What is the authoritative source for a customer's point balance?
- Which operations require synchronous responses to the caller?
- What are the retry limits and manual recovery procedures?
- Does each redemption request require a client-provided idempotency
  key, or will the system generate one?

These questions must be resolved in the appropriate business or
architecture specifications before implementing behavior that
depends on their answers.
