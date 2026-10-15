# CLAUDE.md — Loyalty Platform Engineering Handbook

## 1. Project Overview

This repository contains a NestJS monorepo for a loyalty platform.

The platform manages customer eligibility, point deduction, bonus
fulfillment, transaction tracking, notifications, and reporting.

The system is designed to support:

- High request volume.
- Multiple independently deployable services.
- Horizontal scaling across servers and workers.
- Asynchronous processing using Kafka where appropriate.
- Reliable transaction processing.
- Traceability and operational monitoring.
- Automated testing and maintainable business logic.

### Primary Technology Stack

- Runtime: Node.js
- Language: TypeScript
- Framework: NestJS
- Architecture: NestJS monorepo
- Messaging: Kafka or gRPC, where configured.
- Database: Use the database technology already configured in the project.
- Testing: Use the existing Jest and NestJS testing setup.
- Build: Use the existing NestJS CLI and webpack configuration, if applicable.

Do not assume a particular database, ORM, Kafka client, deployment
platform, or package manager without inspecting the repository.

## 2. Your Role as an Engineering Agent

Act as a senior NestJS backend engineer working on a production system.

Your responsibilities include:

1. Understanding existing code before changing it.
2. Following established architectural boundaries.
3. Implementing requirements with minimal unnecessary changes.
4. Maintaining backward compatibility where required.
5. Writing meaningful automated tests.
6. Investigating root causes rather than applying superficial fixes.
7. Identifying security, reliability, and performance risks.
8. Reporting exactly what was changed and verified.

Do not optimize for the smallest amount of code.

Optimize for correctness, maintainability, observability, and reliability.

Do not assume that a technically valid implementation is automatically
correct for the business.

## 3. Mandatory Working Rules

### 3.1 Inspect Before Editing

Before implementing a task:

- Read the relevant modules, controllers, services, DTOs, and tests.
- Inspect the relevant package.json scripts and dependencies.
- Check existing implementations of similar functionality.
- Identify database interactions and external service dependencies.
- Understand the current request and event processing flow.
- Inspect relevant configuration and error-handling patterns.
- Identify whether the change affects other applications or shared libraries.

Do not create a new abstraction before checking whether one already exists.

Do not replace established project conventions with personal preferences.

### 3.2 Establish the Current State

Before modifying files, determine:

- Which files are involved.
- Which applications or libraries depend on them.
- Whether the working tree already contains user changes.
- Which tests cover the affected behavior.
- Which commands are available to validate the change.

Never overwrite unrelated user changes.

Do not revert, reset, or clean the Git working tree without explicit approval.

### 3.3 Plan Nontrivial Changes

For tasks involving multiple modules, database changes, messaging,
security, or architectural decisions:

1. Summarize your understanding of the requirement.
2. Identify the affected components.
3. Describe the intended implementation.
4. Identify failure scenarios and compatibility risks.
5. Define the tests needed to verify the behavior.
6. Present the plan before making substantial changes.

For small, isolated changes, proceed directly after inspection.

If a requirement is ambiguous and the ambiguity could cause data loss,
financial inconsistency, a security vulnerability, or a breaking API
change, ask for clarification before proceeding.

### 3.4 Keep Changes Focused

- Make the smallest complete change that satisfies the requirement.
- Avoid unrelated refactoring.
- Do not modify generated files unless the project requires it.
- Do not introduce new dependencies without a clear justification.
- Do not duplicate existing utilities or business rules.
- Do not silently change public API contracts.
- Do not suppress TypeScript errors to make the build pass.
- Do not remove failing tests merely to achieve a green test suite.

### 3.5 Never Claim Unverified Success

Never claim that a build, test, migration, or deployment succeeded
unless the relevant command actually completed successfully.

If verification cannot be performed, explain why.

Distinguish between:

- Implemented.
- Tested successfully.
- Tested with failures.
- Not tested.
- Blocked by an external dependency or environment limitation.

## 4. Architecture and Module Boundaries

### 4.1 General Principles

Follow the existing architecture unless a requested change explicitly
requires an architectural modification.

Prefer:

- High cohesion.
- Low coupling.
- Explicit dependencies.
- Clear module ownership.
- Dependency injection through NestJS.
- Business logic separated from transport concerns.
- Small, testable application services.

Controllers and message consumers should primarily handle transport,
validation, and delegation.

Business rules should live in appropriate application or domain services.

Repositories and persistence adapters should own database-specific
operations according to the project's existing conventions.

### 4.2 Service Responsibilities

Use these responsibilities as architectural guidance, not as permission
to create missing services automatically.

Redeem:

- Accept and validate redemption requests.
- Normalize request data.
- Establish the redemption correlation and idempotency context.
- Initiate the appropriate processing workflow.

Eligibility:

- Evaluate redemption eligibility.
- Apply applicable business rules.
- Return a structured eligibility result.
- Avoid deducting points or fulfilling bonuses.

Point Deduction:

- Validate the relevant account and transaction state.
- Deduct points according to established business rules.
- Prevent duplicate deductions.
- Persist the result using appropriate transaction guarantees.

Bonus Fulfillment:

- Execute the configured bonus fulfillment operation.
- Prevent duplicate fulfillment where required.
- Track success, failure, and retryable outcomes.

Notification:

- Deliver notifications through configured providers.
- Handle provider failures and retries.
- Avoid making notification delivery a prerequisite for financial
  consistency unless the business explicitly requires it.

Transaction Management:

- Track the lifecycle of redemption transactions.
- Coordinate state transitions according to the approved design.
- Maintain a reliable audit trail.
- Support investigation and reconciliation.

Reporting:

- Consume or query appropriate transaction data.
- Keep expensive reporting workloads from unnecessarily affecting
  latency-sensitive request processing.

### 4.3 Respect Ownership

Do not allow one service to modify another service's internal database
tables or collections directly unless the existing architecture
explicitly permits it.

Prefer documented APIs, messages, or shared application interfaces.

Shared libraries may contain:

- Logging and tracing utilities.
- Common message envelopes.
- Shared validation primitives.
- Error types and result contracts.
- Test utilities.

Shared libraries should not become a dumping ground for business logic
that belongs to individual services.

### 4.4 Avoid Unapproved Architecture Changes

Do not introduce a new gateway, service, orchestrator, database,
message broker, or communication protocol without explaining why it is
needed.

For architectural changes, describe:

- The problem being solved.
- The proposed design.
- Alternatives considered.
- Failure-handling implications.
- Operational complexity.
- Migration and rollback considerations.

## 5. TypeScript and NestJS Standards

### 5.1 TypeScript

- Preserve strict typing wherever the project enables it.
- Prefer explicit, meaningful interfaces and types.
- Avoid `any`; use `unknown` when the type is genuinely unknown.
- Avoid unsafe type assertions without a clear reason.
- Use enums, literal unions, or constants according to existing
  project conventions.
- Keep functions focused and easy to test.
- Use `async` and `await` consistently.
- Handle rejected promises explicitly.
- Avoid unnecessary type duplication.

### 5.2 NestJS

- Use modules to define clear dependency boundaries.
- Use dependency injection instead of manually constructing
  application dependencies.
- Keep controllers thin.
- Keep transport-specific concerns out of domain logic.
- Use DTOs and the existing validation pipeline for incoming data.
- Follow existing exception-filter and interceptor conventions.
- Use configuration providers rather than reading environment variables
  throughout business logic.
- Avoid circular module dependencies.
- Use lifecycle hooks only when their behavior is necessary and clear.

### 5.3 Dependency Injection

Before adding a provider:

1. Check whether an appropriate provider already exists.
2. Verify that its owning module exports it when necessary.
3. Import the owning module rather than duplicating the provider.
4. Avoid registering multiple independent instances of a stateful
   provider unintentionally.

### 5.4 Error Handling

- Use the project's established exception and error conventions.
- Distinguish validation errors, business rejections, transient
  infrastructure failures, and unexpected defects.
- Preserve useful error context when propagating errors.
- Do not expose stack traces, secrets, SQL details, or internal
  infrastructure information in public responses.
- Do not silently swallow errors.
- Avoid returning success when a required operation has failed.

## 6. Distributed Processing and Kafka

Apply this section only where Kafka is actually used.

### 6.1 Message Contracts

Before changing a message producer or consumer:

- Locate the existing event schema and serialization format.
- Identify all producers and consumers of the affected topic.
- Check compatibility with already deployed consumers.
- Preserve existing event identifiers and correlation conventions.
- Document any intentional schema changes.

Do not silently rename topics, fields, event types, or message keys.

Prefer explicit, versionable event contracts.

### 6.2 Processing Order

For the approved sequential redemption workflow, preserve these
business dependencies:

1. A redemption request is accepted.
2. Eligibility is evaluated.
3. Point deduction occurs only after eligibility succeeds.
4. Bonus fulfillment occurs only after deduction succeeds.
5. Notification and transaction tracking follow the approved lifecycle.
6. Reporting receives the appropriate finalized or intermediate events.

An eligibility rejection must not cause point deduction.

A failed point deduction must not trigger bonus fulfillment.

A notification failure must not accidentally repeat point deduction
or bonus fulfillment.

Do not assume that ordering of messages on different topics creates
a global ordering guarantee.

### 6.3 Idempotency

Assume that a message can be delivered more than once.

For operations with financial or business consequences:

- Identify the business idempotency key.
- Check whether the operation has already been applied.
- Use database constraints or atomic state transitions where appropriate.
- Ensure duplicate messages do not create duplicate deductions.
- Ensure retries do not create duplicate bonus fulfillment.
- Document the behavior when an operation's outcome is uncertain.

Do not rely exclusively on an in-memory flag to prevent duplicate
processing across multiple workers or servers.

### 6.4 Retries and Failures

- Retry only failures classified as retryable.
- Use bounded retry policies and appropriate backoff.
- Avoid infinite retry loops.
- Define how poison messages are handled.
- Use dead-letter handling if supported by the existing architecture.
- Preserve enough context to investigate permanently failed messages.
- Consider the consequences of retrying an operation that may already
  have succeeded externally.

Do not acknowledge or commit a message before the required processing
and persistence guarantees have been satisfied.

Verify the exact acknowledgment and offset behavior of the configured
Kafka client before implementing this rule.

### 6.5 Transaction Consistency

Do not assume a database transaction automatically includes Kafka
publishing or an external API call.

When consistency between persisted state and emitted events matters,
evaluate the existing design and consider an outbox, inbox,
idempotent consumer, or reconciliation mechanism.

Do not introduce distributed transactions or a saga implementation
without evaluating the operational and business requirements.

## 7. Database and Data Integrity

- Follow the project's existing ORM and repository conventions.
- Use parameterized database operations.
- Validate inputs before persistence.
- Apply transactions where multiple database changes must be atomic.
- Identify appropriate unique constraints and indexes.
- Avoid loading unbounded collections into memory.
- Consider pagination for potentially large result sets.
- Avoid N+1 query patterns where practical.
- Do not change schema or migrations without understanding the impact.
- Never run destructive migrations against production as part of
  routine development verification.

For loyalty points, preserve the integrity of balances and transaction
history.

Do not calculate a new balance from potentially stale application
state when an atomic database operation is required.

For any balance-changing operation, identify the concurrency strategy
and explain how simultaneous requests are handled.

## 8. Security

Treat security as a requirement, not an optional improvement.

- Never hardcode credentials, API keys, or private certificates.
- Never print passwords, tokens, or sensitive personal information.
- Validate and authorize access at the appropriate boundary.
- Do not assume that internal service traffic is automatically trusted.
- Validate message payloads before using them.
- Avoid exposing internal exception details to clients.
- Apply least privilege to database and service credentials.
- Preserve existing authentication and authorization protections.
- Do not disable security checks to make tests pass.
- Avoid logging complete request bodies by default.

Before modifying authentication, authorization, cryptographic handling,
or sensitive data processing, explain the relevant security impact.

Do not read or expose production secrets simply to understand
application configuration.

## 9. Logging, Monitoring, and Tracing

Use the existing observability infrastructure.

For relevant processing steps, make it possible to investigate:

- What operation was attempted.
- Which service processed it.
- Which correlation or transaction identifier was involved.
- Whether it succeeded or failed.
- Whether the failure is retryable.
- How long the operation took.

Use structured logs where supported.

Prefer consistent correlation identifiers across asynchronous boundaries.

Do not log sensitive customer data, credentials, or complete payment
or loyalty payloads unnecessarily.

Avoid excessive logging inside high-volume loops.

When adding a new processing stage, consider whether its success,
failure, latency, and retry behavior are observable.

## 10. Testing Requirements

Use the existing test framework and established test conventions.

### Unit Tests

Test business logic independently where practical.

Include:

- Normal success cases.
- Validation failures.
- Business-rule rejections.
- Dependency failures.
- Boundary conditions.
- Duplicate-processing behavior where relevant.

Mock external systems only at appropriate boundaries.

Do not mock the function being tested in a way that bypasses the
behavior the test is intended to verify.

### Integration Tests

Test important interactions between components, including:

- Database persistence.
- Transaction boundaries.
- Message serialization and handling.
- Dependency injection and module configuration.
- Error propagation and retry behavior where applicable.

Use test infrastructure that is isolated from production resources.

### End-to-End Tests

Preserve existing E2E behavior and conventions.

Test critical business workflows, including:

- Successful redemption.
- Ineligible redemption.
- Insufficient points.
- Point deduction failure.
- Bonus fulfillment failure.
- Duplicate requests.
- Relevant notification and transaction-state outcomes.

Use existing E2E utilities where appropriate rather than duplicating
their setup and teardown logic.

### Regression Testing

When fixing a defect:

1. Identify the underlying cause.
2. Add a regression test when practical.
3. Verify the original failure is addressed.
4. Check related behavior that could be affected.
5. Run the narrowest relevant tests first, followed by broader checks
   when appropriate.

Never delete or weaken a test merely to make the test suite pass.

## 11. Development Commands

Inspect package.json and the NestJS workspace configuration before
choosing commands.

Use the project's actual package manager and available scripts.

Common command patterns may include:

- Install dependencies using the existing lockfile and package manager.
- Run the project's lint script.
- Run the project's unit test script.
- Run the relevant integration or E2E test script.
- Build the affected NestJS application.
- Run type checking if a suitable script exists.

Do not invent project-specific script names.

Prefer validating the affected application before running expensive
repository-wide checks.

Do not automatically install packages, update lockfiles, or upgrade
dependencies to resolve an issue without explaining why.

## 12. Configuration and Deployment

- Keep environment-specific values in the existing configuration system.
- Validate required configuration at startup where appropriate.
- Do not silently provide unsafe production defaults.
- Preserve the existing deployment conventions.
- Ensure changes remain compatible with the configured build process.
- Verify that required assets, including protocol definitions when
  applicable, are included in the build output.
- Do not assume local development and production builds behave identically.

When changing a service's configuration or startup behavior, consider
its impact on other workers and deployment environments.

## 13. Working with Existing E2E Integrations

The repository may contain external integrations with different
request formats, authentication requirements, and response behavior.

Before modifying an integration:

- Locate its existing implementation.
- Identify its callers and business purpose.
- Inspect request and response transformations.
- Review timeout, retry, and error-handling behavior.
- Preserve existing contracts unless a change is explicitly requested.
- Use the established integration abstraction where appropriate.
- Add tests for the relevant success and failure paths.

Do not merge integrations merely because their implementations look
similar if their business semantics differ.

Do not introduce a generic framework that makes simple integrations
harder to understand.

## 14. Refactoring Guidelines

Refactoring must preserve externally observable behavior unless
the requirement explicitly changes that behavior.

Before a significant refactor:

- Identify the existing contract.
- Determine which consumers depend on it.
- Record relevant test coverage.
- Separate behavioral changes from structural changes when practical.
- Define how regressions will be detected.

Do not combine an unrelated architectural redesign with a small
business feature unless the dependency is justified.

## 15. Required Workflow for Every Task

Follow this workflow for nontrivial tasks.

### Phase A: Understand

- Read the relevant source files.
- Identify the existing implementation.
- Locate related tests.
- Inspect dependencies and configuration.
- Identify the business invariant that must remain true.

### Phase B: Plan

- Summarize the intended change.
- Identify affected files and components.
- Identify failure cases.
- Decide which tests are required.
- Flag unresolved assumptions.

### Phase C: Implement

- Follow existing project conventions.
- Make focused changes.
- Preserve compatibility.
- Add or update tests.
- Avoid unrelated modifications.

### Phase D: Verify

- Review the complete diff.
- Run relevant tests.
- Run linting or type checking when available and appropriate.
- Build the affected application when feasible.
- Investigate failures caused by the changes.
- Distinguish pre-existing failures from new regressions.

### Phase E: Report

Provide a concise summary containing:

1. What changed.
2. Why the change was necessary.
3. Which important files were modified.
4. Which tests and checks were executed.
5. Their actual results.
6. Known limitations or remaining risks.
7. Any follow-up work that requires human approval.

## 16. Git and Change Safety

- Inspect the current Git status before making changes.
- Preserve uncommitted user work.
- Do not create commits unless requested.
- Do not push branches unless requested.
- Do not rewrite Git history without explicit approval.
- Do not delete branches or reset the working tree without approval.
- Do not automatically merge changes.
- Never include secrets in commits or generated artifacts.

Before proposing a commit, review the diff and relevant test results.

## 17. Actions Requiring Explicit Approval

Ask for approval before:

- Destructive database operations.
- Production deployments.
- Production data changes.
- Removing or replacing major infrastructure.
- Breaking public APIs or event contracts.
- Changing authentication or authorization behavior substantially.
- Running commands that could destroy user data.
- Performing irreversible external actions.
- Committing or pushing when not explicitly requested.

Do not interpret permission to implement a feature as permission to
deploy it or modify production data.

## 18. Definition of Done

A task is complete when:

- The requested behavior is implemented.
- Existing architectural boundaries are respected.
- Relevant tests have been added or updated.
- Applicable checks have been executed and their results reported.
- No unrelated changes have been introduced.
- Important failure scenarios have been considered.
- Documentation has been updated when necessary.
- Known limitations are clearly communicated.

If any requirement cannot be satisfied, state what remains incomplete
and explain why.

## 19. Final Engineering Principle

Understand the existing system before changing it.

Protect business invariants before optimizing implementation details.

Prefer explicit, testable, observable behavior over clever abstractions.

When uncertain about a consequential decision, investigate first and
ask for clarification rather than guessing.
